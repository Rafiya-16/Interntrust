# future-scope.md — InternTrust

How this specific project could evolve beyond v1.0, grounded in the PRD's already-documented v2 backlog and the actual architecture built.

## Next 3 Months: Trust & Data Depth

**Goal: make the core trust signal genuinely robust, not just AI-first-pass + single flags.**

- **Community trust voting** (from PRD v2 scope): upgrade `flaggedBy` from a simple array into a weighted trust score — combine AI score + flag density + time-decay (older flags matter less) into one composite number
- **Resume upload + AI parsing**: use Gemini's document understanding to auto-extract skills/experience from an uploaded resume, pre-filling the profile form instead of manual tag entry — directly reduces signup friction
- **Posting source verification**: for submitted (non-seeded) postings, add a lightweight check — does the company name resolve to a real domain? (simple heuristic, not full web scraping)
- **Expand seed data**: grow from 15 to 100+ real postings across more companies/domains, sourced periodically, to make the feed feel genuinely alive rather than static

## Next 6 Months: Personalization & Reach

**Goal: go from "one smart feed" to "a system that actively works for the student."**

- **Notifications**: email or in-app alert when a new posting matches a student's profile above a threshold score (requires a scheduled job — e.g. a cron-triggered Render service checking new postings against active profiles)
- **Admin moderation dashboard**: a protected `/admin` route for reviewing flagged postings, overriding AI scores, and removing confirmed scams — currently flagging just displays a warning, this closes the loop
- **Expand beyond CS**: generalize `domainInterest` from a free-text field into a structured taxonomy (e.g. Engineering, Design, Business), and broaden seed data and matching logic to match non-CS skill sets
- **Expand beyond Integral University**: remove the implicit single-university assumption — add an optional college/university field to profiles, and allow filtering the feed by "my university" vs "all"

## Next 12 Months: Platform Maturity

**Goal: InternTrust as a real, multi-institution product, not a single-campus tool.**

- **Multi-college network effects**: once several universities are represented, cross-campus posting sharing becomes valuable — a posting flagged as a scam at one college warns students everywhere, instantly
- **Analytics for students**: "you've applied to 12 postings this month, 8 were high-trust" — light usage insights, no new infrastructure beyond querying existing data differently
- **Public trust API**: expose a read-only endpoint (`GET /api/postings/verify?url=...`) so other student tools/browser extensions could check a posting's trust score without building their own scoring pipeline — turns InternTrust's core asset (the scoring data) into a reusable service
- **Migrate off free tiers deliberately, not by necessity**: at meaningful scale, Render's cold-start and MongoDB Atlas's 512MB cap would become real constraints — the migration path (paid Render tier or a VPS, larger Atlas cluster) is well understood today precisely because the free-tier architecture was built cleanly from the start

## What Won't Change

The core architectural decisions from Day 2 — separated client/server, explainable (non-ML) matching, JWT auth — are built to support all of the above without a rewrite. Every item here is additive to the existing schema and API surface, not a replacement of it.
