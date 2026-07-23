# ARCHITECTURE.md — InternTrust

## Tech Stack (Locked Day 2)

| Layer | Choice | Why |
|---|---|---|
| Frontend | React (Vite) | Fast dev server, minimal config, prior React experience |
| Backend | Node.js + Express | One language end-to-end, proves real full-stack ownership |
| Database | MongoDB Atlas (free tier) | Flexible schema for skill arrays, free forever tier |
| Auth | Custom JWT (Express + bcrypt + jsonwebtoken) | Free, no vendor lock-in, demonstrates real auth implementation |
| AI | Google Gemini API (free tier) | Genuine free tier, supports structured JSON output |
| Hosting | Vercel (frontend) + Render (backend) | Both free, auto-deploy from GitHub |
| Other libs | mongoose, cors, dotenv, axios, react-router-dom | Standard, free, well-documented |

## Component Diagram

```mermaid
graph TD
    subgraph Client["React Client — Vercel"]
        UI[UI Components<br/>Feed / Profile / Submit / Auth]
    end

    subgraph Server["Express API — Render"]
        Routes[Routes Layer]
        MW[Auth Middleware<br/>JWT verification]
        Ctrl[Controllers]
        SvcMatch[Matching Service]
        SvcAI[AI Scoring Service]
    end

    DB[(MongoDB Atlas<br/>users / profiles / postings)]
    AI[Google Gemini API]

    UI -->|HTTPS + JSON, JWT in header| Routes
    Routes --> MW --> Ctrl
    Ctrl --> DB
    Ctrl --> SvcMatch
    Ctrl --> SvcAI
    SvcAI -->|posting text| AI
    AI -->|score + reason JSON| SvcAI
    SvcMatch --> DB
```

## Data Flow — Signup & Login

```mermaid
sequenceDiagram
    participant U as Student (Browser)
    participant C as React Client
    participant S as Express API
    participant D as MongoDB Atlas

    U->>C: Fill signup form
    C->>S: POST /api/auth/signup {email, password}
    S->>S: Hash password (bcrypt)
    S->>D: Insert new user document
    D-->>S: User created
    S->>S: Sign JWT
    S-->>C: 201 {token, user}
    C->>C: Store token (memory/localStorage)
    C-->>U: Redirect to Profile Setup
```

## Data Flow — Submit Posting (with AI Scoring)

```mermaid
sequenceDiagram
    participant U as Student
    participant C as React Client
    participant S as Express API
    participant AI as Gemini API
    participant D as MongoDB Atlas

    U->>C: Fill + submit posting form
    C->>S: POST /api/postings {JWT header, posting data}
    S->>S: Verify JWT (auth middleware)
    S->>AI: Send posting details, request JSON {score, reason}
    AI-->>S: {score, reason}
    S->>D: Insert posting with score + reason
    D-->>S: Posting saved
    S-->>C: 201 {posting}
    C-->>U: Show posting in feed with score badge
```

**Implementation decision (locked Day 2):** scoring runs **synchronously** on submit (call AI, wait for response, then save). Simpler to build and test than an async/pending-then-update flow, and demo-scale posting volume won't expose performance issues.

## Data Flow — Fetch Ranked Feed

```mermaid
sequenceDiagram
    participant U as Student
    participant C as React Client
    participant S as Express API
    participant D as MongoDB Atlas

    U->>C: Open Feed page
    C->>S: GET /api/postings {JWT header}
    S->>S: Verify JWT, get userId
    S->>D: Fetch user's profile
    S->>D: Fetch all postings
    S->>S: computeMatchScore(profile, posting) for each
    S->>S: Sort postings by match score desc
    S-->>C: 200 {postings: [...ranked]}
    C-->>U: Render ranked, scored feed
```

## External Services

- **MongoDB Atlas** — persistent storage (free tier, 512MB)
- **Google Gemini API** — legitimacy scoring (free tier)
- **Render** — backend hosting (free web service, auto-deploy from GitHub)
- **Vercel** — frontend hosting (free, auto-deploy from GitHub)
