# API.md — InternTrust v1.0 Endpoints

Base URL (local): `http://localhost:<port>/api`
Base URL (production): set via frontend env var pointing at the deployed Render URL.

Auth convention: protected routes require `Authorization: Bearer <jwt>` header.

---

## Auth

### `POST /api/auth/signup`
- **Purpose**: create a new account
- **Request body**: `{ email, password }`
- **Response**: `201 { token, user: { id, email } }`
- **Validation**: valid email format, password ≥ 6 chars
- **Auth**: none required
- **Errors**: `400` invalid input, `409` email already exists

### `POST /api/auth/login`
- **Purpose**: authenticate existing user
- **Request body**: `{ email, password }`
- **Response**: `200 { token, user: { id, email } }`
- **Validation**: both fields required
- **Auth**: none required
- **Errors**: `400` missing fields, `401` invalid credentials

---

## Profile

### `GET /api/profile/me`
- **Purpose**: fetch the logged-in user's profile
- **Request**: none (JWT in header)
- **Response**: `200 { profile }` or `200 { profile: null }` if not yet created
- **Auth**: required
- **Errors**: `401` invalid/missing token

### `PUT /api/profile/me`
- **Purpose**: create or update the logged-in user's profile
- **Request body**: `{ name, skills: [...], experienceLevel, locationPref, domainInterest }`
- **Response**: `200 { profile }`
- **Validation**: `skills` non-empty array; `experienceLevel`/`locationPref` must match allowed enums
- **Auth**: required
- **Errors**: `400` invalid fields, `401` unauthorized

---

## Postings

### `POST /api/postings`
- **Purpose**: submit a new internship posting
- **Request body**: `{ title, company, description, requiredSkills, stipend, location, applyLink }`
- **Response**: `201 { posting }` (includes AI-generated `legitimacyScore`/`legitimacyReason`)
- **Validation**: required fields present, `applyLink` is a valid URL
- **Auth**: required
- **Errors**: `400` invalid input, `401` unauthorized, `502` if AI scoring fails (posting still saved with `legitimacyScore: null`, status `"pending review"`)

### `GET /api/postings`
- **Purpose**: fetch the feed, ranked by fit against the logged-in user's profile
- **Request**: optional query params `?skill=`, `?location=`
- **Response**: `200 { postings: [{ ...posting, matchScore, matchReasons }] }`
- **Validation**: none (query params optional)
- **Auth**: required (returns unranked list if no profile exists yet)
- **Errors**: `401` unauthorized

### `GET /api/postings/:id`
- **Purpose**: fetch a single posting's full detail
- **Request**: none
- **Response**: `200 { posting }`
- **Auth**: required
- **Errors**: `404` not found, `401` unauthorized

### `POST /api/postings/:id/flag`
- **Purpose**: flag a posting as suspicious
- **Request**: none (user identified via JWT)
- **Response**: `200 { posting }` with updated `flaggedBy`
- **Validation**: user hasn't already flagged this posting
- **Auth**: required
- **Errors**: `404` not found, `409` already flagged by this user, `401` unauthorized

---

## Health

### `GET /api/health`
- **Purpose**: confirm backend is running (used in deployment checks)
- **Response**: `200 { status: "ok" }`
- **Auth**: none
