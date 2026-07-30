# DAY9-SUMMARY.md — InternTrust

## ✅ What Was Completed Today

**Manual Flagging (carried over from Day 8)**
- `flagPosting` controller + `POST /api/postings/:id/flag` route
- `PostingCard.jsx` — "Flag as suspicious" button, disabled after flagging, shows flag count banner on the card
- Verified: flag persists across refresh, duplicate flag attempt correctly returns 409

**Release Readiness Review**
- `README.md` — full project overview, live links, tech stack, setup instructions, documentation index
- `LICENSE` — MIT license
- `client/index.html` — proper page title, meta description, Open Graph + Twitter Card metadata
- `client/public/favicon.svg` — custom InternTrust favicon (checkmark-in-circle, brand teal)
- `client/public/robots.txt` — valid crawler directives
- `pages/NotFound.jsx` — custom 404 page with return-home link
- `components/ProtectedRoute.jsx` — redirects logged-out users away from `/feed`, `/profile`, `/submit` to `/login`
- `client/vercel.json` — SPA rewrite rule, fixing direct-link/refresh 404s on Vercel
- `server/.env.example` and `client/.env.example` — templates for anyone cloning the repo
- `<main>` landmark added around routed content (accessibility fix)
- Lighthouse audit on the **live production build**: **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**

**Debugging note:** flagging initially appeared broken on the live site — root cause was, again, code not yet deployed (same lesson as Day 8). Separately, local testing briefly broke because `client/.env` wasn't picked up until a full dev server restart (Vite only reads `.env` at startup).

## 🎯 Tomorrow's Objective (Day 10, per Blueprint)

Final QA pass, demo rehearsal, and official capstone wrap-up. No new features — pure stabilization, a rehearsed live walkthrough, and final documentation/portfolio polish.
