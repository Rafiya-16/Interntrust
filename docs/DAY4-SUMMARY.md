# DAY4-SUMMARY.md — InternTrust

## ✅ What Was Completed Today

**Backend — Auth**
- `controllers/authController.js` — signup (bcrypt hash + JWT issue) and login (bcrypt compare + JWT issue)
- `routes/auth.js` — `POST /api/auth/signup`, `POST /api/auth/login`
- Verified via Thunder Client: signup returns 201 + token, login returns 200 + token

**Backend — Profile**
- `controllers/profileController.js` — `getMyProfile` (returns null if none exists yet), `upsertMyProfile` (create-or-update in one call, with validation matching SCHEMA.md enums)
- `routes/profile.js` — `GET /api/profile/me`, `PUT /api/profile/me`, both behind `authGuard`
- Verified via Thunder Client: 401 when unauthenticated, 200 with real data when authenticated

**Frontend — Auth**
- `pages/Signup.jsx` and `pages/Login.jsx` — replaced placeholders with real forms wired to the backend
- `context/AuthContext.jsx` — updated to decode the JWT (via `jwt-decode`) so login state survives a page refresh, not just the token string

**Frontend — Profile**
- `pages/Profile.jsx` — replaced placeholder with a full form: name, tag-style skill input, experience level (radio), location preference (radio), domain interest
- Loads existing profile on mount, pre-fills form, saves via `PUT /profile/me`, shows success/error messaging

**New dependency**: `jwt-decode` (frontend) — added to decode JWT payload client-side without a backend round-trip.

**Verified end-to-end**: sign up → redirected to profile → fill and save profile → refresh browser → data still present. This confirms the full chain (React → Express → MongoDB) works for real user data, not just the Day 3 health check.

## 🚧 What's Ready to Build Tomorrow

- Posting submission form + backend endpoint
- Seed script for 10-15 real demo postings
- Basic (unstyled) feed page listing all postings

## 🎯 Tomorrow's Objective (Day 5, per Blueprint)

Let logged-in users submit internship postings, and seed the database with real, credible postings so the feed isn't empty for the rest of the build. Builds directly on today's working auth — postings will be linked to `submittedBy` using the same `req.userId` pattern established today.
