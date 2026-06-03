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
npm run dev
npm run build
npm run lint
```

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
CONTACT_FROM_EMAIL="Lamena Website <website@lamena.ae>"
```

`CONTACT_FROM_EMAIL` must be a sender/domain verified in Resend before production email delivery can work.

## Deployment

Deploy on Vercel. The `vercel.json` rewrite keeps SPA routes working while leaving `/api/contact` available as a serverless function.
