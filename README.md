# Thakur Tour & Travel — MERN app

React (Vite, Tailwind) + Express + MongoDB. Deploy: client → Vercel (`npm run build`, output `dist`), server → Render (`npm start`), DB → MongoDB Atlas.

## Setup
```bash
npm run install:all
cp server/.env.example server/.env   # fill MONGO_URI, JWT_SECRET, ADMIN_*
cp client/.env.example client/.env
npm run seed          # creates admin, settings, sample destinations/tours/vehicles
npm run dev:server    # http://localhost:5000
npm run dev:client    # http://localhost:5173  (admin: /admin/login)
```
Set `CLIENT_URL` on Render to your Vercel URL and `VITE_API_URL` on Vercel to `https://<render-app>/api`.

## API (all under /api)
`auth/{register,login,me}` · `tours` `destinations` `vehicles` `testimonials` `gallery` `blog` (public GET, staff write) · `bookings` `inquiries` (public POST, staff manage; `bookings/mine` for customers) · `settings` (public GET, admin PUT) · `dashboard`, `users` (staff/admin).
List endpoints accept `page`, `limit`, `q`, `sort` and exact-match field filters.

## Security
Helmet, CORS allow-list, rate limits, NoSQL-injection sanitising, bcrypt (12 rounds), JWT, role middleware, public writes strip status/amount fields.

## Not yet built
Image upload (URLs only), password reset, blog/destination/gallery/about/contact public pages, sitemap, WebP pipeline, form-based admin editors (JSON editor for now).
