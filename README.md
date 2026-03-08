# JumaTech Shopper

JumaTech Shopper is a Next.js e-commerce storefront configured for Netlify deployment. The project includes product browsing, cart flows, authentication with Supabase, and checkout UX.

## Requirements

- Node.js 22+
- Netlify CLI (already available in this environment)
- Supabase project with public URL and anon key

## Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Local Development

Use Netlify's local runtime so redirects/functions/platform behavior match production:

```bash
/opt/buildhome/node-deps/node_modules/.bin/netlify dev
```

The local site runs on `http://localhost:8888`.

## Scripts

```bash
npm run lint
npm run build
npm run start
```

## Deployment

The repository includes `netlify.toml` with default build settings:

- Build command: `npm run build`
- Publish directory: `.next`

Deploy with the Netlify UI or CLI:

```bash
netlify deploy --build
netlify deploy --prod --build
```
