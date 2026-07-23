# SETUP.md — InternTrust

Complete installation and setup guide to get InternTrust running locally from scratch.

## Prerequisites

| Tool | Purpose |
|---|---|
| Node.js + npm | Runs both the React frontend and Express backend |
| VS Code | Code editor |
| VS Code extension: MongoDB for VS Code | Browse database collections visually |
| VS Code extension: Thunder Client | Test API endpoints without the frontend |
| MongoDB Atlas account (free tier) | Cloud database — no local install needed |
| Google AI Studio account | Provides the Gemini API key for AI legitimacy scoring (used from Day 6) |

## 1. Clone the repository

```
git clone https://github.com/Rafiya-16/interntrust.git
cd interntrust
```

## 2. Backend setup

```
cd server
npm install
```

Create `server/.env` with:
```
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string, with database name "interntrust" added>
JWT_SECRET=<any long random string>
GEMINI_API_KEY=<your Gemini API key from Google AI Studio>
```

Run the backend:
```
node server.js
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

## 3. Frontend setup

In a second terminal:
```
cd client
npm install
npm run dev
```

Expected output: a local URL, typically `http://localhost:5173/`. Open it in your browser.

## 4. Verify everything works

- Visit `http://localhost:5000/api/health` in your browser — should return `{"status":"ok"}`
- Visit `http://localhost:5173/` — should show the InternTrust navbar and landing page
- Click Login / Signup in the navbar — pages should switch without a full reload

## MongoDB Atlas setup (first-time only)

1. Register at https://www.mongodb.com/cloud/atlas/register
2. Create a free **M0** cluster
3. Create a database user (username + password) under **Database Access**
4. Under **Network Access**, allow access from **0.0.0.0/0** (needed for later deployment on Render)
5. Click **Connect → Drivers** to get your connection string
6. Insert your password and add `/interntrust` before the `?` in the string

## Gemini API key setup (first-time only)

1. Go to https://aistudio.google.com/app/apikey
2. Click **Create API key**, choose or create a Gemini project
3. Copy the generated key into `server/.env` as `GEMINI_API_KEY`
