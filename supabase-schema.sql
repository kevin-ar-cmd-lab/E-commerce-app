-- =====================================================================
-- JumaTech Shopper: Supabase schema expected by the app
-- Run in the Supabase SQL Editor (or save as a migration).
--
-- Derived from the code in kevin-ar-cmd-lab/E-commerce-app:
--   profiles    -> written in RegisterClient.tsx and AuthContext.tsx
--   products    -> joined by CartContext.tsx: products(id, name, price)
--   cart_items  -> read/inserted/deleted in CartContext.tsx
--
-- Key decisions:
--   * products.id is TEXT because the storefront catalog (lib/catalog.ts)
--     uses slug ids like 'probook-elite-g8'. This is what makes the cart
--     join line up with the local catalog.
--   * Row Level Security is ON for every table. The anon key ships to the
--     browser, so RLS is the only thing protecting user data.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. profiles
--    One row per auth user. The app writes id + (username | full_name,
--    email), so all of those columns exist and are nullable.
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text,
  full_name   text,
  email       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);


-- ---------------------------------------------------------------------
-- 2. products
--    Mirrors lib/catalog.ts so the cart can join to it. Publicly
--    readable, writable only with the service role (no write policies).
--    price is numeric; the catalog uses whole KES amounts.
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id           text primary key,
  name         text not null,
  category     text,
  price        numeric(12, 2) not null check (price >= 0),
  description  text,
  image        text,
  created_at   timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "products_read_all" on public.products;
create policy "products_read_all"
  on public.products for select
  to anon, authenticated
  using (true);


-- ---------------------------------------------------------------------
-- 3. cart_items
--    One row per cart line. The app inserts (user_id, product_id,
--    quantity = 1), deletes by id, and deletes all rows by user_id.
-- ---------------------------------------------------------------------
create table if not exists public.cart_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  product_id  text not null references public.products (id) on delete cascade,
  quantity    integer not null default 1 check (quantity > 0),
  created_at  timestamptz not null default now()
);

create index if not exists cart_items_user_id_idx
  on public.cart_items (user_id);

-- Prevent duplicate lines for the same product. NOTE: the current
-- addItem() always inserts a new row, so adding the same product twice
-- will now raise a unique-violation error (which the app silently
-- ignores). Remove this index if you prefer duplicate lines, or change
-- the app to upsert and increment quantity.
create unique index if not exists cart_items_user_product_uidx
  on public.cart_items (user_id, product_id);

alter table public.cart_items enable row level security;

drop policy if exists "cart_select_own" on public.cart_items;
create policy "cart_select_own"
  on public.cart_items for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "cart_insert_own" on public.cart_items;
create policy "cart_insert_own"
  on public.cart_items for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "cart_update_own" on public.cart_items;
create policy "cart_update_own"
  on public.cart_items for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "cart_delete_own" on public.cart_items;
create policy "cart_delete_own"
  on public.cart_items for delete
  to authenticated
  using (auth.uid() = user_id);


-- ---------------------------------------------------------------------
-- 4. Seed products (copied from lib/catalog.ts)
--    The repo's catalog has ~5 items; only the 3 I read in full are
--    listed here. Add the rest from lib/catalog.ts, keeping the same ids.
-- ---------------------------------------------------------------------
insert into public.products (id, name, category, price, description, image) values
  ('probook-elite-g8', 'ProBook Elite G8', 'Laptops', 65000,
   'A reliable performance laptop for developers, students, and business use.',
   'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'),
  ('bassmaster-wireless', 'BassMaster Wireless', 'Audio', 8500,
   'Noise-isolating wireless headphones with deep bass and all-day battery life.',
   'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80'),
  ('fittrack-series-5', 'FitTrack Series 5', 'Wearables', 12000,
   'Smart fitness tracker with heart-rate monitoring and sleep analytics.',
   'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80')
on conflict (id) do nothing;


-- ---------------------------------------------------------------------
-- 5. Optional: auto-create a profile when a user signs up
--    Removes the need for the client to insert into profiles (and the
--    conflict between AuthContext's insert and RegisterClient's upsert).
--    RegisterClient passes full_name in user metadata, which this reads.
--    If you adopt this, you can drop the client-side profile writes.
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, username)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'username'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
