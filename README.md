# Lamena Website

Production-ready Lamena website rebuild with a modern React frontend and a Vercel serverless contact endpoint.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Resend for contact email delivery

## Scripts

```bash
npm install
npm run dev          # frontend only (Vite)
npm run dev:api      # Vercel dev server for /api/contact (port 3000)
npm run build
npm run lint
npm run optimize:images
```

For local contact-form testing, run `npm run dev:api` in one terminal and `VITE_API_PROXY=http://127.0.0.1:3000 npm run dev` in another.

## Routes

- `/` main one-page website
- `/privacy` privacy policy
- `/terms` terms and conditions
- `/api/contact` Vercel serverless contact endpoint

## Contact Form

The contact form sends inquiries to `holger@rumscheidt.de` by default. Configure these environment variables in Vercel:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=holger@rumscheidt.de
CONTACT_FROM_EMAIL="Lamena Website <website@lws98.de>"
```

`CONTACT_FROM_EMAIL` must be a full address on a domain verified in Resend (e.g. `website@lws98.de`), not the domain name alone.

## Deployment

Deploy on Vercel. The `vercel.json` rewrite keeps SPA routes working while leaving `/api/contact` available as a serverless function.
