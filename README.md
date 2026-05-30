# Clearstone Foundation Website

Live site: https://clearstoneteam.com
Studio: https://clearstone.sanity.studio

## Stack
- Vite + React + TypeScript
- Tailwind + shadcn/ui
- Sanity (CMS) — content lives here
- Supabase (contact form submissions only)
- Vercel (hosting, auto-deploys from main)

## Local dev
- Frontend: `npm run dev` (port 5173)
- Studio: `cd studio; npm run dev` (port 3333)

## Deploying
- Frontend: push to main, Vercel auto-deploys
- Studio: `cd studio; npx sanity deploy`

## Environment variables (Vercel)
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SANITY_PROJECT_ID
- VITE_SANITY_DATASET

## Adding a new content type
1. Add schema in `studio/schemas/`
2. Update `studio/schemas/index.ts`
3. Add TypeScript type in `src/types/sanity.ts`
4. Deploy Studio: `cd studio; npx sanity deploy`
5. Use in components via `useSanityQuery`