# InternTrust

AI-verified, skill-matched internship discovery for CS students — built for the AB Talks 60-Day Claude AI Challenge (10-day capstone).

**Live app:** https://interntrust.vercel.app
**Backend API:** https://interntrust-api.onrender.com

> Note: the backend runs on Render's free tier, which sleeps after inactivity. The first request after idle time may take 30–60 seconds to respond while it wakes up.

## What it does

InternTrust replaces noisy WhatsApp groups and unfiltered feeds with a single place where every internship posting is:

- **AI-screened for legitimacy** — flagged for red flags like no verifiable company presence, upfront payment requests, vague descriptions, or unrealistic promises
- **Ranked by personal fit** — matched against the student's own skills, experience level, and location preference
- **Community-verified** — students can flag suspicious postings as an added safety layer on top of AI scoring

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | Custom JWT (bcrypt + jsonwebtoken) |
| AI | Google Gemini API (`gemini-2.0-flash-lite`, free tier) |
| Hosting | Vercel (frontend) + Render (backend) |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for full system design.

## Core Features (v1.0)

- Student profile (skills, experience level, location preference)
- Submit an internship posting
- AI legitimacy scoring with visible trust badge and reasoning
- Manual flagging of suspicious postings
- Feed ranked by fit against the logged-in student's profile

## Running Locally

Full setup instructions: [`docs/SETUP.md`](docs/SETUP.md)

Quick start:
```bash
git clone https://github.com/Rafiya-16/interntrust.git
cd interntrust

# Backend
cd server
npm install
# create server/.env — see docs/ENVIRONMENT.md for required variables
node server.js

# Frontend (separate terminal)
cd client
npm install
# create client/.env with VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Documentation

- [`docs/PRD.md`](docs/PRD.md) — full product requirements
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system architecture, data flow diagrams
- [`docs/SCHEMA.md`](docs/SCHEMA.md) — database design
- [`docs/API.md`](docs/API.md) — API reference
- [`docs/UI-WIREFRAMES.md`](docs/UI-WIREFRAMES.md) — user flow and wireframes
- [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) — folder structure and responsibilities
- [`docs/SETUP.md`](docs/SETUP.md) — local installation guide
- [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) — environment variables reference
- [`docs/PROJECT-LOG.md`](docs/PROJECT-LOG.md) — day-by-day build log

## Scope

**In v1.0:** student profiles, posting submission, AI legitimacy scoring, manual flagging, profile-based matching, live deployment.

**Deliberately out of v1.0 (planned for v2):** full community upvote/downvote trust voting, resume upload with AI parsing, notifications, admin moderation dashboard, expansion beyond CS students / beyond one university.

## Author

Rafiya — B.Tech Computer Science & Engineering, Integral University, Lucknow
[LinkedIn](https://linkedin.com/in/rafiya-16-khan) · [GitHub](https://github.com/Rafiya-16)

---

*Built with Claude as part of the AB Talks 60-Day Claude AI Challenge.*