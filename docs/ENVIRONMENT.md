# ENVIRONMENT.md — InternTrust

Documents every environment variable, tool, and configuration used in the project.

## Backend Environment Variables (`server/.env`)

| Variable | Purpose | Example / Notes |
|---|---|---|
| `PORT` | Port the Express server listens on locally | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string, including database name | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/interntrust?appName=Cluster0` |
| `JWT_SECRET` | Secret key used to sign and verify login tokens | Any long random string, kept private |
| `GEMINI_API_KEY` | Authenticates calls to Google's Gemini API | Used starting Day 6 (AI legitimacy scoring) |

**`server/.env` is never committed to GitHub** — it's excluded via `.gitignore`. Anyone setting up the project locally must create their own copy using SETUP.md as a guide.

## Frontend Configuration

Currently the frontend calls the backend directly at `http://localhost:5000/api` (hardcoded in `client/src/api/axiosInstance.js`). This will be converted to an environment variable (`VITE_API_URL`) on Day 9 when we deploy, so the frontend can point at the live Render URL instead of localhost without changing code.

## External Accounts / Services in Use

| Service | Purpose | Tier |
|---|---|---|
| MongoDB Atlas | Database hosting | Free (M0, 512MB) |
| Google AI Studio (Gemini API) | AI legitimacy scoring | Free tier |
| GitHub | Version control + source of truth | Free |
| Render *(from Day 9)* | Backend hosting | Free web service |
| Vercel *(from Day 9)* | Frontend hosting | Free |

## VS Code Extensions in Use

| Extension | Purpose |
|---|---|
| MongoDB for VS Code | Visually browse database collections/documents |
| Thunder Client | Test API endpoints directly from the editor |
| ESLint | Linting for the React frontend (chosen during `npm create vite`) |

## Local Ports

| Service | Port | URL |
|---|---|---|
| Backend (Express) | 5000 | http://localhost:5000 |
| Frontend (Vite dev server) | 5173 | http://localhost:5173 |

## Frontend Dependencies (notable additions)
- jwt-decode — decodes JWT payload client-side to restore login state on page refresh