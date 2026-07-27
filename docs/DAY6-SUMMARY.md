# DAY6-SUMMARY.md — InternTrust

## ✅ What Was Completed Today

**AI Legitimacy Scoring**
- `services/aiScoring.js` — calls Google Gemini API (free tier, model `gemini-2.0-flash-lite` after `gemini-2.0-flash` proved rate-limited/unavailable on the free tier), with retry logic on HTTP 429 and a graceful "Pending review" fallback on failure
- Wired into `createPosting` — every new posting is scored synchronously on submission (per the Day 2 architecture decision)
- `scripts/rescorePostings.js` — backfilled AI scores onto all 15 Day 5 seed postings, with a 5s delay between calls to respect free-tier rate limits
- Confirmed working: realistic postings scored high (green), the two intentionally sketchy seed postings scored low (red/yellow) with accurate AI-generated reasoning

**Frontend**
- `components/PostingCard.jsx` — updated to display a color-coded trust badge (green ≥70, yellow 40-69, red <40, gray "Pending" if scoring failed) plus the AI's one-sentence reasoning
- `components/Footer.jsx` — new footer component: "Built with Claude as part of the AB Talks 60-Day Claude AI Challenge." — added to `App.jsx`, visible on every page

**Deployment (moved up from Day 9)**
- Backend deployed to **Render** (free tier): `https://interntrust-api.onrender.com`
- Frontend deployed to **Vercel** (free tier): `https://interntrust.vercel.app`
- `axiosInstance.js` updated to use `VITE_API_URL` environment variable instead of a hardcoded localhost URL, so the same codebase works in both local dev and production

**Debugging resolved today**
- Gemini API returned 429 (quota exceeded) on `gemini-2.0-flash` — switched to `gemini-2.0-flash-lite`, which had working free-tier quota
- Vercel deployment initially still called `localhost:5000` in production — root cause was the `VITE_API_URL` environment variable not being present at build time; fixed with a forced redeploy after confirming the variable was set correctly

## 🚧 What Still Needs Polishing

- Profile-based matching/ranking (feed is currently unranked — scheduled for Day 7, not skipped, just not yet built)
- Manual flagging feature (Day 8)
- Visual/UI consistency pass across all pages (Day 8)
- Cold-start delay on Render's free tier (first request after inactivity can take 30-60s) — acceptable for now, worth mentioning during a live demo

## 🎯 Tomorrow's Objective (Day 7, per Blueprint)

Build profile-based matching: rank the feed by fit against the logged-in student's skills, experience level, and location preference, with visible "why this matched" reasoning — turning today's flat, unranked feed into the personalized experience the PRD describes.
