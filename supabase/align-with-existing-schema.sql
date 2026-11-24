-- =====================================================================
-- JumaTech Shopper: bring the app and the existing Supabase database
-- into line. Run once in the Supabase SQL Editor. Safe to re-run.
--
-- Written against the tables that already exist in the project:
--   profiles, cart, products, wishlist, orders, order_items,
--   mpesa_payments  (all have Row Level Security ON)
--
-- Findings this file fixes (checked against the live schema + policies):
--   1. Only `profiles` had RLS policies. cart/products/wishlist had RLS
--      enabled with NO policies, which blocks every read and write.
--   2. products had no `category` column (the search page filters on it)
--      and was empty.
--   3. profiles.username is required + unique, and there is no `email`
--      column, so the old client-side profile insert always failed.
--
-- NOT changed on purpose:
--   * orders, order_items, mpesa_payments keep RLS ON with no policies
--     (fully locked). Checkout does not use them yet. Add policies when
--     checkout is built; payment callbacks should write with the
--     service role, never from the browser.
--   * Existing profiles policies are left alone. There are overlapping
--     pairs ("Read own profile" / "Users can read own profile", and the
--     same for update). They are harmless; remove the duplicates later
--     if you want a tidier policy list.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. products: add category, seed the storefront catalog
-- ---------------------------------------------------------------------
alter table public.products
  add column if not exists category text;

-- Seeded from the old hardcoded lib/catalog.ts. Rows are matched by name
-- so re-running does not create duplicates. `stock` values are
-- PLACEHOLDERS: set real stock levels in the dashboard.
insert into public.products
  (id, name, description, image_url, price, stock, category, created_at)
select
  gen_random_uuid(), v.name, v.description, v.image_url,
  v.price, v.stock, v.category, v.created_at
from (values
  ('ProBook Elite G8',
   'A reliable performance laptop for developers, students, and business use.',
   'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
   65000, 25, 'Laptops', now() - interval '4 seconds'),
  ('BassMaster Wireless',
   'Noise-isolating wireless headphones with deep bass and all-day battery life.',
   'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
   8500, 25, 'Audio', now() - interval '3 seconds'),
  ('FitTrack Series 5',
   'Smart fitness tracker with heart-rate monitoring and sleep analytics.',
   'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
   12000, 25, 'Wearables', now() - interval '2 seconds'),
  ('EcoCharge Powerbank',
   'Compact 20,000mAh powerbank with fast charging for phones and tablets.',
   '/images/powerbank.svg',
   3200, 25, 'Accessories', now() - interval '1 second')
) as v(name, description, image_url, price, stock, category, created_at)
where not exists (
  select 1 from public.products p where p.name = v.name
);


-- ---------------------------------------------------------------------
-- 2. products: anyone can read, nobody can write from the browser
--    (add/edit products in the dashboard or with the service role)
-- ---------------------------------------------------------------------
drop policy if exists "Products are viewable by everyone" on public.products;
create policy "Products are viewable by everyone"
  on public.products for select
  to anon, authenticated
  using (true);


-- ---------------------------------------------------------------------
-- 3. cart: each signed-in user manages only their own rows
-- ---------------------------------------------------------------------
-- One row per product per user; the app increments quantity instead of
-- inserting a duplicate line.
create unique index if not exists cart_user_product_uidx
  on public.cart (user_id, product_id);

drop policy if exists "Users can read own cart" on public.cart;
create policy "Users can read own cart"
  on public.cart for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can add to own cart" on public.cart;
create policy "Users can add to own cart"
  on public.cart for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own cart" on public.cart;
create policy "Users can update own cart"
  on public.cart for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own cart" on public.cart;
create policy "Users can delete own cart"
  on public.cart for delete
  to authenticated
  using (auth.uid() = user_id);


-- ---------------------------------------------------------------------
-- 4. wishlist: same own-rows rule (the app does not use it yet)
-- ---------------------------------------------------------------------
drop policy if exists "Users can read own wishlist" on public.wishlist;
create policy "Users can read own wishlist"
  on public.wishlist for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can add to own wishlist" on public.wishlist;
create policy "Users can add to own wishlist"
  on public.wishlist for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own wishlist" on public.wishlist;
create policy "Users can update own wishlist"
  on public.wishlist for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own wishlist" on public.wishlist;
create policy "Users can delete own wishlist"
  on public.wishlist for delete
  to authenticated
  using (auth.uid() = user_id);


-- ---------------------------------------------------------------------
-- 5. Create the profile automatically when someone signs up
--
-- Why a trigger: the browser cannot reliably insert the profile. When
-- email confirmation is on, sign-up returns no session, so the
-- "Insert own profile" policy (auth.uid() = id) rejects the write.
-- username is required + unique, so it is taken from sign-up metadata,
-- else from the email name; on a clash a short id suffix is added.
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  full_name_value text;
begin
  base_username := lower(regexp_replace(
    coalesce(nullif(new.raw_user_meta_data ->> 'username', ''),
             split_part(coalesce(new.email, ''), '@', 1)),
    '[^a-zA-Z0-9_.]', '', 'g'));
  base_username := left(base_username, 30);
  if base_username = '' then
    base_username := 'user';
  end if;

  full_name_value := nullif(new.raw_user_meta_data ->> 'full_name', '');

  begin
    insert into public.profiles (id, username, full_name)
    values (new.id, base_username, full_name_value)
    on conflict (id) do nothing;
  exception when unique_violation then
    -- username already taken by someone else: make it unique
    insert into public.profiles (id, username, full_name)
    values (new.id,
            base_username || '_' || substr(replace(new.id::text, '-', ''), 1, 6),
            full_name_value)
    on conflict (id) do nothing;
  end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
