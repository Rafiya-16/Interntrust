# PROJECT-STRUCTURE.md — InternTrust

```
interntrust/
├── client/                      # React (Vite) frontend
│   ├── src/
│   │   ├── pages/               # Signup, Login, Profile, Feed, SubmitPosting
│   │   ├── components/          # PostingCard, ProfileForm, PostingForm, Navbar
│   │   ├── api/                 # axios instance + API call functions
│   │   ├── context/              # Auth context (stores JWT + user state)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                      # Express backend
│   ├── models/                  # User.js, Profile.js, Posting.js (Mongoose schemas)
│   ├── routes/                  # auth.js, profile.js, postings.js, health.js
│   ├── controllers/             # authController.js, profileController.js, postingsController.js
│   ├── middleware/               # authGuard.js (JWT verification)
│   ├── services/                 # aiScoring.js, matching.js
│   ├── scripts/                  # seedPostings.js
│   ├── .env                      # local only — never committed
│   ├── server.js                 # entry point
│   └── package.json
│
├── docs/                         # ARCHITECTURE.md, SCHEMA.md, API.md, UI-WIREFRAMES.md, PROJECT-STRUCTURE.md
├── .gitignore
└── README.md
```

## Folder Responsibilities

| Folder/File | Responsibility |
|---|---|
| `client/src/pages/` | One file per full screen (Signup, Login, Profile, Feed, SubmitPosting) — top-level route targets |
| `client/src/components/` | Reusable UI pieces used across multiple pages (e.g. `PostingCard` used in Feed, `Navbar` used everywhere) |
| `client/src/api/` | Centralized axios instance + one function per backend endpoint — pages never call `axios` directly |
| `client/src/context/` | React Context for auth state (JWT + current user) so any component can check login status without prop-drilling |
| `server/models/` | Mongoose schemas — one file per collection (`User`, `Profile`, `Posting`), matching SCHEMA.md exactly |
| `server/routes/` | Defines URL paths and HTTP methods, delegates to controllers — matches API.md exactly |
| `server/controllers/` | Business logic for each route — validates input, calls services, talks to models |
| `server/middleware/` | Cross-cutting logic that runs before controllers, starting with `authGuard.js` (verifies JWT) |
| `server/services/` | Isolated logic used by controllers: `aiScoring.js` (Gemini calls, Day 6) and `matching.js` (ranking logic, Day 7) |
| `server/scripts/` | One-off utility scripts, e.g. `seedPostings.js` (Day 5) — run manually, not part of the live server |
| `docs/` | All system design documentation generated in Day 1–2, kept in the repo as the ongoing source of truth |

## Why This Structure

- **`client` and `server` are fully separated** — they deploy independently (Vercel and Render), so keeping them as sibling folders with their own `package.json` avoids any build tooling conflicts.
- **Inside `server`, each concern has its own folder** (`models` vs `routes` vs `controllers` vs `services`) so later features — like Day 6's AI scoring or Day 7's matching — get a clean, isolated file rather than being buried inside route handlers. This keeps each day's work additive, not a rewrite of existing files.
- **`docs/` lives in the repo, not just in chat** — so the design decisions travel with the code and are visible to anyone (including a future fresh AI chat) who opens the project.

*Status: matches the structure created during Day 2 repository setup. No changes needed as of Day 3.*
