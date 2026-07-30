# 30-day-growth-plan.md — InternTrust

A realistic day-by-day roadmap taking InternTrust from v1.0 MVP to a significantly more complete product. Each day builds on the previous one. Assumes a similar ~1-3 hr/day pace to the original capstone, adjustable to your actual availability.

## Week 1: Data & Trust Depth (Days 1-7)

- **Day 1:** Audit current seed data quality; source and add 15 new real postings (target: 30 total)
- **Day 2:** Refactor `flaggedBy` into a proper `Flag` sub-schema (userId, timestamp, optional reason) instead of a bare ObjectId array
- **Day 3:** Build a composite trust score: combine `legitimacyScore` (AI) with flag density into one weighted `trustScore` field, recomputed on each flag
- **Day 4:** Update `PostingCard` to display the new composite trust score instead of the raw AI score alone
- **Day 5:** Add a "why flagged" optional reason field to the flag endpoint and UI (small form on flag click)
- **Day 6:** Write and run a script auditing all existing postings against the new composite score; spot-check for accuracy
- **Day 7:** Buffer/catch-up day — fix anything from Days 1-6 that didn't fully land; deploy and verify live

## Week 2: Resume Upload & Profile Intelligence (Days 8-14)

- **Day 8:** Research Gemini's document/file input API; confirm free-tier support for PDF/text extraction
- **Day 9:** Build a backend endpoint accepting a resume file upload (PDF), extracting raw text
- **Day 10:** Prompt Gemini to extract structured skills/experience from resume text, return JSON
- **Day 11:** Wire extracted data into the Profile form as pre-filled (editable) suggestions, not silent auto-save
- **Day 12:** Add file upload UI to the Profile page (drag-and-drop or file picker), with loading state during parsing
- **Day 13:** Handle edge cases: unparseable PDFs, scanned image resumes (out of scope — show clear "couldn't read this file" message), oversized files
- **Day 14:** End-to-end test resume upload → parsed → profile pre-filled → saved; deploy and verify live

## Week 3: Notifications & Admin Tools (Days 15-21)

- **Day 15:** Design the notification data model — what triggers one, what it contains, delivery method (start with email via a free service like Resend's free tier)
- **Day 16:** Build a scheduled check (Render cron job or simple interval) comparing new postings against active profiles for high-match alerts
- **Day 17:** Integrate email sending for match notifications; test with your own account
- **Day 18:** Build the `/admin` protected route — restrict via a manual `isAdmin` flag on your own user account
- **Day 19:** Admin dashboard: list all flagged postings, sorted by flag count, with an override-score action
- **Day 20:** Admin action to remove/hide a confirmed scam posting from the public feed
- **Day 21:** Buffer/catch-up day — deploy and verify all Week 3 features live

## Week 4: Reach & Polish (Days 22-30)

- **Day 22:** Add a `university` field to Profile (optional, free-text or dropdown); update matching to slightly boost same-university postings
- **Day 23:** Generalize `domainInterest` from free text into a small fixed taxonomy (Engineering, Design, Business, Other)
- **Day 24:** Add basic usage analytics to the Profile page — postings viewed, applied (track via a simple "I applied" button and count)
- **Day 25:** Performance pass — check bundle size, lazy-load routes if the app has grown, re-run Lighthouse
- **Day 26:** Accessibility re-audit with the new features (Week 2-3 additions), fix anything new that Lighthouse flags
- **Day 27:** Write updated documentation (README, API.md) reflecting all new endpoints and features added this month
- **Day 28:** Full end-to-end regression test — every v1.0 feature plus everything added this month, on the live site
- **Day 29:** Record a new demo video/updated screenshots showing the expanded feature set
- **Day 30:** Tag and release **v1.1.0** on GitHub; write release notes summarizing the month's additions

## Notes

- Each day assumes the previous day's work is deployed and stable before starting the next — same discipline as the original 10-day sprint.
- If a day's task is too large for your available time, split it across two days rather than skipping verification steps.
- Use `daily-build-prompt.md` (companion file) to start each day's session with full context, exactly like the original capstone's daily structure.
