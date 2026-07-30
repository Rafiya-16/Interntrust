# daily-build-prompt.md — InternTrust 30-Day Growth Plan

Reusable prompt template. Copy this into a fresh AI chat each day, replacing only `[DAY NUMBER]`. Keep everything else identical throughout the month.

---

## Prompt Template

```
Day [DAY NUMBER] of my InternTrust 30-Day Growth Plan, continuing after the original
10-day AB Talks Claude AI Challenge capstone.

Read the following documents, which are the source of truth for this project:
- README.md (project overview, live URLs, tech stack)
- docs/PRD.md (original v1.0 product requirements)
- docs/ARCHITECTURE.md, docs/SCHEMA.md, docs/API.md (original system design)
- future-scope.md (the direction this growth plan follows)
- 30-day-growth-plan.md (today's specific milestone is listed under "Day [DAY NUMBER]")
- challenge-retrospective.md (context on decisions made and why, during the original build)

If any of these files are not available to you, ask me to upload them before continuing.

Today's objective is ONLY the task listed for Day [DAY NUMBER] in 30-day-growth-plan.md.
Do not redesign existing features, do not start future days' work, and do not introduce
scope beyond what that day's line item describes.

Standing rules:
- Assume I have working knowledge of this specific codebase (I built it) but explain new
  concepts/libraries when they're introduced.
- Whenever I need to perform a manual step (installing a package, configuring a service,
  deploying, running a command), give me exact step-by-step instructions with real
  button/menu names and terminal commands. Wait for my confirmation before continuing.
- Generate complete, final file contents — never snippets, placeholders, or
  "...existing code..." shortcuts. State clearly whether each file is new or replaces
  an existing one, and its exact path.
- Use only free-tier tools/APIs/services unless I explicitly approve a paid one.
- Build one milestone at a time; pause for my confirmation after meaningful chunks,
  especially before deployments or anything visual.
- If something breaks, debug it fully before moving forward — do not build on top of
  broken code.
- Use only free tools, APIs, SDKs, hosting platforms, and services already established
  in this project (React, Node/Express, MongoDB Atlas, Gemini API, Vercel, Render)
  unless todays's task specifically requires something new — and if so, confirm it has
  a genuine free tier before recommending it.

At the end of today's session:
- Verify today's feature works, both locally and after deployment.
- Update any documentation affected by today's change (README.md, docs/API.md, etc.).
- Help me write a clear commit message and push to GitHub.
- Add a one-line entry to docs/PROJECT-LOG.md summarizing today's addition.
- Give me a concise summary: what was completed today, and what Day [DAY NUMBER + 1]
  will focus on per the growth plan.

My repo: https://github.com/Rafiya-16/interntrust
My live app: https://interntrust.vercel.app
```

---

## Usage Notes

- Replace `[DAY NUMBER]` in the first line and in the "Standing rules" section with the actual day (1-30).
- On Day 7, 14, 21, and 30, this prompt naturally routes to a buffer/catch-up or release day — the AI should treat those instructions from `30-day-growth-plan.md` normally, same process.
- If you fall behind schedule, it's fine to reuse the same day number's prompt across two real-world days — just don't skip a day number, since each one assumes the prior day's work is done.
