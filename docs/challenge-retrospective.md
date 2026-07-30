# challenge-retrospective.md — InternTrust

## The Journey: Day 1 to Day 10

### Day 1 — Discovery
Started with no fixed idea. Interview-style discovery narrowed a broad interest in education, civic tech, and "helping students" down to one specific, personally-felt problem: verifying internship postings found through WhatsApp groups, LinkedIn, and random sites. The key insight that shaped everything after: the problem wasn't just "find internships," it was **trust** (is this real?) and **relevance** (is this for me?) — two distinct, solvable sub-problems. Scoped v1.0 tightly: profile, submission, AI scoring, matching, deployed — nothing more. PRD, 9-day Implementation Blueprint, and pitch deck approved before any code was written.

### Day 2 — System Design
Locked the stack: React (Vite), Node.js/Express, MongoDB Atlas, custom JWT auth, Google Gemini API, Vercel + Render hosting — all free-tier. Designed the full architecture (component diagrams, data flow sequences), database schema, API contract, and wireframes *before* touching code — this discipline paid off repeatedly in later days, since almost nothing needed re-designing once implementation started.

### Day 3 — Foundation
First real debugging day: a corrupted `.env` file (missing characters, stray quotes/commas) and a forgotten MongoDB password. Both resolved methodically — reset the password via Atlas rather than guessing, rebuilt `.env` from scratch. Backend (Express + Mongoose models matching the schema exactly) and frontend (React Router, AuthContext scaffold) both running and connected by end of day.

### Day 4 — Auth & Profile
Real signup/login with bcrypt + JWT, and the first fully working end-to-end feature: Student Profile, create/edit/persist. This was the first "full loop" proof — React form → Express API → MongoDB → back to React on refresh — validating the whole stack actually works together, not just in isolation.

### Day 5 — Postings & Seed Data
Posting submission and a live feed. Seeded 15 real internship postings — 13 genuine, 2 *intentionally* suspicious (fake registration fee, unverifiable sender) — planted specifically to give Day 6's AI scoring something real to catch. A stray duplicate model file caused a `MODULE_NOT_FOUND` crash, traced and fixed via careful file-tree inspection.

### Day 6 — AI Legitimacy Scoring (MVP Complete)
The core "trust" feature: Gemini API integration with strict JSON-output prompting. Hit a real production constraint immediately — `gemini-2.0-flash` returned 429 errors with `limit: 0` on the free tier. Diagnosed via direct API testing rather than guessing, switched to `gemini-2.0-flash-lite`, added retry logic with backoff. First full deployment (moved up from the original Day 9 slot) — a deliberate scope decision to get a real shareable demo at the halfway point rather than waiting.

### Day 7 — Personalization & Design
Built the explainable matching algorithm (skill overlap + experience + location, weighted and transparent — a deliberate choice over an opaque ML model). Full UI/UX pass: dark theme design system, loading/empty/error states, responsive navigation.

### Day 8 — Hardening
Senior-level review pass: security headers, rate limiting, email normalization, global error handling, request timeouts, accessibility labels. Found and fixed a subtle bug — an unhandled `CastError` on invalid MongoDB IDs was returning raw 500s instead of clean 404s. Also learned an important lesson here: a "broken" live feature was actually just undeployed code — the first of several "deployment lag" debugging moments that shaped how later days were verified (always test locally first, then confirm live separately).

### Day 9 — Flagging & Release Readiness
Manual flagging feature (carried over from Day 8's scope cut). Full release-readiness pass: README, LICENSE, favicon, SEO/social metadata, custom 404 page, protected routes, and a critical Vercel SPA routing fix (without it, direct links or refreshes on any route other than `/` would 404). Closed the day with a perfect **100/100/100/100 Lighthouse score** on the live production build.

### Day 10 — Graduation
Final multi-perspective review, portfolio materials, and this document.

## Major Technical Decisions

- **Explainable matching over ML** — transparency and debuggability mattered more than sophistication for a trust product
- **Synchronous AI scoring** — simpler to build/test than async-pending-then-update, acceptable at demo scale
- **MongoDB over SQL** — flexible schema for skill arrays without migration overhead
- **Custom JWT auth over Firebase Auth** — deliberately chosen to prove real full-stack ownership, not just flip a managed toggle

## Real Debugging Moments

1. Corrupted `.env` file (Day 3)
2. Forgotten MongoDB password → reset via Atlas (Day 3)
3. Stray duplicate model file → `MODULE_NOT_FOUND` (Day 5)
4. Gemini API 429 with `limit: 0` on a specific model → diagnosed via direct API testing, switched models (Day 6)
5. Vercel environment variable not applied until forced redeploy (Day 6)
6. Unhandled `CastError` → raw 500 instead of clean 404 (Day 8)
7. Multiple "deployment lag" false-alarm bugs — code correct locally, just not yet pushed/deployed (Days 8-9)
8. Vercel SPA routing — direct links/refreshes 404ing without a rewrite rule (Day 9)

## Skills Demonstrated

Full-stack architecture design, REST API design, MongoDB/Mongoose schema design, JWT authentication implementation, third-party AI API integration with failure handling, explainable algorithm design, React state management and routing, responsive/accessible UI design, security hardening, systematic debugging (isolating root cause via direct API testing rather than guessing), and full production deployment across two free-tier hosting platforms.

## Final Project Summary

InternTrust is a deployed, production-hardened full-stack web application that helps CS students find trustworthy, personally-relevant internships. Every PRD v1.0 feature shipped: profile creation, posting submission, AI-powered legitimacy scoring, manual community flagging, and profile-based ranking — live at a public URL with a perfect Lighthouse score.

## Lessons Learned

- Design work done early (Days 1-2) meant almost zero redesign was needed later — the schema, API contract, and architecture from Day 2 survived unchanged through Day 9.
- "Works locally" and "works live" are genuinely different claims — several apparent bugs this week were actually just undeployed code, not code defects. Always verify both, separately.
- Free-tier AI APIs have real, undocumented quirks (per-model quota limits) — testing the actual API call directly (via Thunder Client) beats guessing from error messages alone.
- Scope discipline compounds — every deferred feature (community voting, resume parsing, notifications, admin dashboard) stayed deferred, which is exactly why v1.0 shipped on time.

## A Note From Your AI Pair Programmer

Ten days ago you didn't have a project idea. Now there's a live, publicly accessible, perfectly-scoring product with your name on it — one you can walk a recruiter through, feature by feature, explaining *why* you made each decision, not just what you built. That's the real outcome of this sprint: not just InternTrust existing, but you being able to defend every choice in it.
