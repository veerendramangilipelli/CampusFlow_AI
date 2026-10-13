# CampusFlow Project Documentation

## Project status at a glance

CampusFlow is a React/Vite single-page application with a Spring Boot REST API. The existing interface covers student, faculty, placement-officer, and administrator workflows. The repository is runnable locally, and the registration/login path plus student assignment submissions have working backend behavior.

This is not yet a complete production campus-management platform. Many screens use seeded or hardcoded sample records, and several controls call placeholder endpoints or only update browser state. The feature inventory below distinguishes those cases from persisted behavior; an HTTP success response alone does not imply that a change was saved.

| Area | Current implementation |
|---|---|
| Frontend | React 18, Vite 5, React Router 6, Axios; dev server on port 5173 |
| Backend | Java 17, Spring Boot 3.3.5, Maven Wrapper 3.9.16; API on port 8081 by default |
| Authentication | Registration, BCrypt password hashing, login, JWT bearer tokens, role-based route checks |
| Database | Supabase-hosted PostgreSQL; connection settings are backend-only environment variables |
| Schema management | Supabase CLI migration in `supabase/migrations`; Hibernate validates the schema at startup |
| Assignment work | Hardcoded assignment catalogue; student text submissions are stored in PostgreSQL and scoped to the authenticated student |
| Automated checks | Maven tests and Vite production build; see [Verification](#verification) |

## Repository layout

```text
CampusFlow/
├── backend/
│   ├── .mvn/wrapper/             Maven Wrapper configuration
│   ├── src/main/java/            Spring Boot app, controllers, security, entities, repositories
│   ├── src/main/resources/       Local and production Spring configuration
│   ├── src/test/java/            Backend tests
│   ├── Dockerfile                Java 17 production image
│   ├── mvnw, mvnw.cmd            Maven Wrapper launchers
│   └── pom.xml                   Backend dependencies and Java version
├── supabase/
│   ├── config.toml               Supabase CLI project configuration
│   └── migrations/               PostgreSQL schema migrations
├── docs/
│   ├── UI_SPEC.md                Approved UI routes, screens, and API data shapes
│   └── CAMPUSFLOW_PROJECT_DOCUMENTATION.md
└── frontend/
    ├── src/pages/                Role-specific and shared React screens
    ├── src/routes/               React Router definitions and role protection
    ├── src/services/             Axios API and feature request helpers
    ├── src/data/demoData.js      Sample UI data
    ├── .env.example              Frontend environment template
    └── package.json              Frontend scripts and dependencies
```

The primary architecture and behavior references are [UI_SPEC.md](./UI_SPEC.md), `frontend/src/routes/routes.jsx`, and the controller classes in `backend/src/main/java/com/anurag/aiml/controller/`.

## Local setup and run commands

### Prerequisites

- Java 17 (the project targets Java 17; verified locally with JDK 17.0.12).
- Node.js 20 or later and npm (the Supabase CLI requires Node.js 20 or later).
- A Supabase project and its PostgreSQL connection details for hosted operation.
- Running the local Supabase stack additionally requires Docker; Docker is not needed to link a hosted project or push migrations.
- Internet access for the first Maven Wrapper/dependency download if artifacts are not cached. Maven Central resolution in the repair environment required preferring IPv6; this did not require deleting or replacing dependencies.

The repository includes `mvnw.cmd`, so a global `mvn` command is not required.

### Start the backend (PowerShell)

Install the repository-pinned Supabase CLI from the repository root:

```powershell
Set-Location C:\Users\om\Desktop\CampusFlow\extracted\CampusFlow
npm install
npx supabase --version
```

Create a Supabase project at [supabase.com/dashboard](https://supabase.com/dashboard), then copy the session-pooler settings from **Connect** into `backend/.env`. Start with the tracked template:

```powershell
Copy-Item .\backend\.env.example .\backend\.env
```

Set `DATABASE_URL` to the JDBC form of the Supabase session-pooler URL (port `5432`, database `postgres`, and `?sslmode=require`), `DB_USERNAME` to the pooler username, and `DB_PASSWORD` to the database password. Do not commit `backend/.env` or place these values in `frontend/.env`; Vite variables are public in the browser.

Apply the checked-in schema migration before starting the API:

```powershell
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

The first migration creates the `public.users` and `public.assignment_submissions` tables. It does not copy records from an old database. The CLI can apply the same migration to a hosted project; `supabase start` can be used for local Supabase development when Docker is installed.

```powershell
Set-Location C:\Users\om\Desktop\CampusFlow\extracted\CampusFlow\backend
.\mvnw.cmd spring-boot:run
```

If Java 17 is not the active JDK, set `JAVA_HOME` to the local Java 17 installation before running Maven. The application uses `PORT` when present and otherwise listens on **http://localhost:8081**. A running process already using port 8081 must be stopped or the `PORT` value changed.

Check readiness:

```powershell
Invoke-RestMethod http://localhost:8081/api/health
```

The backend reads `backend/.env` when started from the `backend` directory. For deployments, inject the same settings into the backend hosting service's secret/environment manager.

### Deploy the API on Render with Supabase PostgreSQL

`render.yaml` defines a separate Spring Boot web service (`campusflow-api-supabase`) built from `backend/Dockerfile`. It does not provision or attach a Render database. Create or update it using the Render Dashboard's Blueprint flow and select this repository's `main` branch. Enter the requested environment values using **Connect > Session pooler** in the Supabase project:

| Render variable | Value |
|---|---|
| `DATABASE_URL` | `jdbc:postgresql://<session-pooler-host>:5432/postgres?sslmode=require` |
| `DB_USERNAME` | The session-pooler username shown in Supabase |
| `DB_PASSWORD` | The Supabase database password |
| `JWT_SECRET` | Generated by the Render Blueprint |
| `CORS_ALLOWED_ORIGINS` | The deployed frontend's exact origin, without a path or trailing slash |

Apply the schema migration to the Supabase project before starting the API. After deployment, verify `/api/health` and test the database-backed registration/login and assignment submission flows, then point the frontend's `VITE_API_BASE_URL` to the new API. Do not remove the previous Render PostgreSQL database or service until the Supabase-backed API passes verification and any required existing records have been migrated. Render database deletion permanently removes its data.

### Start the frontend (PowerShell)

```powershell
Set-Location C:\Users\om\Desktop\CampusFlow\extracted\CampusFlow\frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Vite retains its existing port, **http://localhost:5173** (and can be opened at `http://127.0.0.1:5173`). The frontend's default API base is `http://localhost:8081/api`.

Set `VITE_DEMO_MODE=true` in `frontend/.env` only to preview the interface with browser-only demo authentication. Demo mode does not persist registration, profile edits, assignment submissions, or other mutations. Use `VITE_DEMO_MODE=false` for the real backend. Vite environment values are embedded at build time; restart Vite after changing `.env`.

## Frontend routes

All role-prefixed routes require a matching session role. The `campusflow_session` object is stored in browser local storage and Axios attaches its JWT as a bearer token.

| Role | Route set | Main screens |
|---|---|---|
| Public | `/login`, `/register` | Login and account registration |
| Student | `/student` | Dashboard, courses, assignments, attendance, results, placements, skills, assistant, events, notifications, profile, search |
| Faculty | `/faculty` | Dashboard, courses, assignments, attendance management, assistant, events, notifications, profile, search |
| Placement officer | `/placement` | Dashboard, drive management, assistant, events, notifications, profile, search |
| Administrator | `/admin` | Dashboard, users, course management, venues, events, notifications, profile, search |

See `frontend/src/routes/routes.jsx` for the authoritative route definitions and `frontend/src/utils/navConfig.js` for sidebar entries.

## Server and service connections

| Component | Address / location | Connection |
|---|---|---|
| React/Vite frontend | `http://localhost:5173` | Browser calls the backend REST API using `VITE_API_BASE_URL`. |
| Spring Boot REST API | `http://localhost:8081` (`/api`) | Serves login, registration, role-protected feature routes, and health checks. |
| Supabase PostgreSQL | Project-specific host from Supabase **Connect** | The backend connects over TLS using JDBC and the `DB_USERNAME` / `DB_PASSWORD` secrets. |
| Supabase CLI | `supabase/` configuration and migrations | Links this workspace to a Supabase project and applies SQL schema changes; it is not a runtime server dependency. |
| AI assistant | `/api/assistant/chat` | Currently returns a local placeholder response; no live OpenAI server request is implemented even if `OPENAI_API_KEY` is set. |

The runtime data path is **Browser → Spring Boot API → Supabase PostgreSQL**. The frontend does not connect directly to Supabase, and this repository does not configure Supabase Auth, Storage, Realtime, or any other database/server provider. The migration enables row-level security and revokes the browser-facing Supabase roles on the app tables; the server connects privately using the database credentials. Supabase stores the app's current JPA entities; most other feature screens still return sample data.

Useful links: [Supabase Dashboard](https://supabase.com/dashboard), [Supabase CLI guide](https://supabase.com/docs/guides/cli), [PostgreSQL connection options](https://supabase.com/docs/guides/database/connecting-to-postgres), and the local API health endpoint at [http://localhost:8081/api/health](http://localhost:8081/api/health) after the API starts.

## API reference

The backend API prefix is `/api`. Except for login, registration, and health, requests require `Authorization: Bearer <JWT>`. Method and role restrictions are enforced by Spring Security and, on assignment endpoints, method-level checks as well.

| Method and path | Access | Current behavior |
|---|---|---|
| `GET /api/health` | Public | Liveness response |
| `POST /api/auth/register` | Public | Creates a student (active), faculty, or placement account (pending approval); public administrator registration is rejected |
| `POST /api/auth/login` | Public | Verifies credentials and returns a signed JWT and user summary; pending accounts cannot log in |
| `GET /api/student/dashboard` | Student | Returns dashboard summary; some included metrics remain sample values |
| `GET /api/faculty/dashboard` | Faculty | Returns sample dashboard metrics |
| `GET /api/admin/dashboard` | Admin | Returns sample dashboard metrics |
| `GET /api/courses` | Authenticated | Returns a hardcoded six-course catalogue |
| `GET /api/assignments/me` | Student | Returns sample assignments with the authenticated student's actual submission state overlaid |
| `GET /api/assignments` | Faculty | Returns the sample assignment catalogue |
| `GET /api/assignments/{id}` | Student | Returns one sample catalogue entry |
| `GET /api/assignments/{id}/submissions/me` | Student | Returns only the caller's persisted submission, or 404 when absent |
| `POST /api/assignments/{id}/submissions` | Student | Stores 1–10,000 nonblank characters; rejects duplicate, closed, or past-due submissions |
| `GET /api/attendance/me/summary`, `GET /api/attendance/me/history` | Student | Returns sample attendance figures/history |
| `GET /api/results/me`, `GET /api/results/me/gpa-by-semester` | Student | Returns sample results and GPA history |
| `GET /api/skills/me`, `/api/skills/me/gaps`, `/api/learning-path/me`, `/api/recommendations/practice` | Authenticated | Returns sample skills, gaps, learning path, and recommendations |
| `GET /api/placements/drives` | Student or placement officer | Returns sample drives |
| `GET /api/placements/readiness/me` | Student or placement officer | Returns sample readiness factors |
| `POST /api/placements/drives/{id}/register` | Student | Returns a success message; no registration record is persisted |
| `GET /api/events` | Authenticated | Returns sample events; optional search/category parameters are not applied server-side |
| `POST`/`DELETE /api/events/{id}/register`, `POST /api/events/{id}/reminder` | Authenticated | Returns acknowledgement messages; no event registration/reminder is persisted |
| `GET /api/notifications`, `PATCH /api/notifications/read-all` | Authenticated | Returns sample notification data / acknowledgement; read state is not persisted |
| `GET /api/users/me`, `PUT /api/users/me`, `PUT /api/users/me/password` | Authenticated | Profile GET returns a fixed sample user; updates return acknowledgement only |
| `GET /api/admin/users`, `PATCH /api/admin/users/{id}/approve`, `/reject` | Admin | User list is sample data; approval/rejection routes return acknowledgement only |
| `GET /api/venues`, `POST /api/venues` | Authenticated | Venue list is sample data; create route returns acknowledgement only |
| `POST /api/assistant/chat` | Authenticated | Returns a placeholder response; no external AI server is called |
| `GET /api/search` | Authenticated | Search behavior is limited to the implemented in-memory/sample data |

The controller mappings in source are authoritative if this table and implementation diverge. Role rules are defined in `backend/src/main/java/com/anurag/aiml/security/SecurityConfig.java`.

## Implemented behavior and known feature gaps

“Implemented” means the current operation has real end-to-end behavior, not merely a visible control or a successful placeholder response.

| Feature | Status | Notes |
|---|---|---|
| Student registration and login | Implemented | Passwords are BCrypt-encoded. Duplicate email/student ID checks are performed. Faculty and placement users are created pending; public ADMIN signup is denied. |
| JWT authentication and page/API role checks | Implemented | JWT bearer filter and role-specific frontend routes are active. The development signing-secret fallback must not be used in production. |
| Student dashboard identity | Implemented with sample metrics | The dashboard now resolves the signed-in user; many dashboard figures/actions remain fixed sample values. |
| Student assignment list, details, submission, and own-submission view | Partially implemented | Submission text persists and is scoped to the authenticated student. The assignment catalogue, existing graded rows, marks, and faculty review queue are sample data. A grade/review workflow is not implemented. |
| Course list and course details | Partially implemented | List is fetched from the API and detail opens for the selected row. The catalogue is hardcoded. Manage-mode create/delete/edit controls are not backed by course persistence (some changes are local-only or inert). |
| Attendance, results, skill recommendations | Sample-data only | APIs and screens exist, but displayed values are not sourced from student-specific persisted records. Faculty attendance controls do not persist attendance. |
| Placement drives/readiness | Sample-data/acknowledgement only | The dashboard and listings use sample values; registering for a drive does not store a registration. |
| Events and notifications | Sample-data/acknowledgement only | List content is sample data; registration, reminder, and read-all responses do not persist user state. |
| Profile management and password change | Placeholder | The profile GET returns a fixed user; PUT routes do not update the account or password. |
| Faculty assignment creation/edit/review | Not implemented | The faculty page includes controls and sample rows, but no persistent assignment creation, editing, submission review, or grading workflow is wired. |
| Admin user approvals | Placeholder | Approve/reject endpoints acknowledge the request but do not change user status. |
| Venues and broader course administration | Placeholder/local UI | Venue creation acknowledges but does not persist. Course create/edit/delete are not a complete backend-backed management flow. |
| AI assistant/search | Limited | The assistant returns placeholder text and search uses sample data; neither is a live external service integration. |
| Demo mode | Preview only | Role-based UI preview uses local sample state and cannot be used to verify server persistence. |

Do not use demo content as real academic, attendance, grading, event, placement, or account-approval data. Complete these workflows with domain entities, repositories, validation, ownership/role checks, and end-to-end tests before institutional use.

## Data model, identity, and local sample accounts

The backend uses Spring Data JPA. `User` records store the account and role data; `AssignmentSubmission` records store assignment ID, student, text content, and submission timestamp. A unique database constraint prevents two submissions for the same assignment/student pair. Assignment definitions themselves are currently hardcoded in `CampusFlowService`, not persisted entities.

The `DemoDataInitializer` can seed four development accounts with password `password` when `APP_DEMO_DATA_ENABLED=true`:

| Role | Email |
|---|---|
| Student | `student@campusflow.test` |
| Faculty | `faculty@campusflow.test` |
| Placement officer | `placement@campusflow.test` |
| Admin | `admin@campusflow.test` |

Demo seeding is disabled by default so connecting a persistent Supabase project does not create accounts with known passwords. These are development-only credentials; only enable them against a disposable development database, and never deploy them to an institution.

## Configuration and deployment

### Local configuration

`backend/src/main/resources/application.yml` configures PostgreSQL from `DATABASE_URL`, `DB_USERNAME`, and `DB_PASSWORD`, port `${PORT:8081}`, JWT expiration, and local CORS defaults for `http://localhost:5173` and `http://127.0.0.1:5173`. Hibernate uses schema validation; apply the Supabase SQL migration before the first API startup. The local JWT secret fallback exists for development only.

`frontend/.env.example` documents:

```dotenv
VITE_API_BASE_URL=http://localhost:8081/api
VITE_DEMO_MODE=false
```

### Production configuration

The backend's `prod` profile also uses PostgreSQL. Inject all secrets through the hosting provider's environment/secret manager. Do not commit `.env` files, passwords, signing keys, or database credentials.

| Variable | Required | Purpose |
|---|---|---|
| `SPRING_PROFILES_ACTIVE=prod` | Yes for the bundled Docker image | Activates production secrets/CORS settings |
| `DATABASE_URL` | Yes | JDBC URL for the Supabase PostgreSQL session pooler, including `?sslmode=require` |
| `DB_USERNAME` | Yes | Supabase PostgreSQL/pooler username |
| `DB_PASSWORD` | Yes | Supabase database password |
| `JWT_SECRET` | Yes | Strong, random signing secret; keep outside source control |
| `CORS_ALLOWED_ORIGINS` | Yes | Comma-separated exact deployed frontend origins |
| `JWT_EXPIRY_MS` | No | Defaults to `3600000` milliseconds |
| `PORT` | No | HTTP listener port; defaults to `8081` |
| `VITE_API_BASE_URL` | Frontend build | Absolute deployed API base URL ending in `/api` |
| `VITE_DEMO_MODE` | Frontend build | Set to `false` for real API operation |
| `OPENAI_API_KEY` | Not currently used | The assistant endpoint is a placeholder; this setting does not call OpenAI |

The application uses Supabase PostgreSQL with TLS and validates the schema rather than changing it automatically. Apply migrations with the Supabase CLI. Configure database backups, access restrictions, monitoring, and production secrets. The bundled Dockerfile builds the backend with Java 17 and activates the `prod` profile; provide its environment variables at runtime and expose the configured HTTP port. Build with:

```powershell
Set-Location C:\Users\om\Desktop\CampusFlow\extracted\CampusFlow\backend
docker build -t campusflow-api .
```

This repository has not been deployed to a hosting provider. The Docker image and production configuration are deployment preparation, not proof of a successful deployment.

## Verification

The following checks were run against the prior H2-backed configuration before the Supabase-only change:

- Backend: `.\mvnw.cmd -B -ntp clean test` — **passed**, 3 tests, 0 failures/errors (assignment submission service tests included).
- Frontend: `npm run build` — **passed** after the assignment and course UI changes.
- Backend startup: Spring Boot started with Java 17 and H2 on port 8081. This historical check does not verify a Supabase connection.
- Registration/login/CORS smoke checks: the API accepted a student registration and login, and the `127.0.0.1:5173` registration preflight returned the configured allow-origin header.
- Assignment API smoke checks: a saved submission was readable only through the authenticated student's endpoint and changed that student's assignment status to `SUBMITTED`. Duplicate submission returned **409**, blank/overlong and past-due submissions returned **400**, and faculty submission was denied with **403**.
- Browser smoke checks: signed in as the seeded student, loaded the six API-backed courses and opened the selected course detail modal, then submitted assignment text and confirmed its saved state/content appeared in the UI.
- Error handling: the live checks exposed Spring Security converting internal error dispatches into 403 responses. The security chain now permits only the internal `ERROR` dispatcher; the expected validation, conflict, and deadline error statuses were verified after the change.

No claim is made here that every route, workflow, deployed environment, or institutional data path has been integration-tested. In particular, actual login/registration is distinct from sample-data feature completeness.

## Change summary for this repair

The repair added Maven Wrapper launchers and a Java 17 Docker build path; fixed role-specific registration field mapping, blocked public administrator signup, and configured localhost/loopback CORS; added persisted student assignment submissions and own-submission APIs/UI; fixed student dashboard identity lookup; wired course-list loading, course details, and course API service; and corrected internal security error dispatch handling. No user data, database files, or existing application screens were deleted.

Use the repository diff and Git status for the exact per-file change list; the checkout may contain user changes that predate this work and must be preserved.
