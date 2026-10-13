# CampusFlow

Smarter Learning. Personalized Guidance. Better Campus Management.

```
CampusFlow/
├── frontend/              React + JavaScript UI (finished, see docs/)
├── backend/               Spring Boot API (Java 17) connected to Supabase PostgreSQL
├── supabase/               Supabase CLI config and database migrations
├── docs/                  UI_SPEC.md, screens/*.png, CampusFlow_UI_Document.pdf
└── AGENT_INSTRUCTIONS.md  Rules for the VS Code agent
```

## Run the frontend

```
cd frontend
cp .env.example .env     # Windows: copy .env.example .env
npm install
npm run dev              # http://localhost:5173
```

Set `VITE_DEMO_MODE=true` in `.env` to preview all four role dashboards without a backend
(sign in with an email starting with `student`, `faculty`, `placement` or `admin`, any password).
Set it back to `false` and set `VITE_API_BASE_URL` (default `http://localhost:8081/api`) when the backend is ready.

## Backend

Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, PostgreSQL (Supabase), port 8081.
The endpoints the UI needs are listed per screen in `docs/UI_SPEC.md`.
See `docs/CAMPUSFLOW_PROJECT_DOCUMENTATION.md` for the current feature inventory, API behaviors, run instructions, and deployment limitations.

### Supabase CLI

The repository pins the Supabase CLI as a development dependency. Install it with Node.js 20 or later:

```powershell
npm install
npx supabase --version
```

### Run the backend (PowerShell)

Create a project at [supabase.com/dashboard](https://supabase.com/dashboard) before running these commands. Use **Connect > Session pooler** for the backend's connection settings. Run the CLI commands from the repository root so it can find `supabase/config.toml`.

```powershell
Copy-Item .\backend\.env.example .\backend\.env
# Fill backend\.env with the Supabase session-pooler URL, username, and database password.
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
cd .\backend
.\mvnw.cmd spring-boot:run
```

The backend talks to Supabase over PostgreSQL; the browser must continue to call the Spring API and must never contain the database password. See the project documentation for the full connection map, environment variables, and Docker deployment notes.

### Deploy the API on Render

`render.yaml` defines a separate Spring API service with no Render PostgreSQL dependency. It prompts for the Supabase connection, JWT secret, and deployed frontend origin. Create or update the service from the Render Dashboard's Blueprint flow, select this repository's `main` branch, and provide:

- `DATABASE_URL`: the Supabase **session pooler** connection converted to JDBC form, for example `jdbc:postgresql://<session-pooler-host>:5432/postgres?sslmode=require`.
- `DB_USERNAME` and `DB_PASSWORD`: the database credentials shown by Supabase under **Connect > Session pooler**.
- `CORS_ALLOWED_ORIGINS`: the exact deployed frontend origin, such as `https://your-site.vercel.app` (no path or trailing slash).

The Blueprint generates a JWT secret. Confirm `/api/health` is healthy and test login, registration, and assignment submissions on the new service before switching the frontend API URL. Keep the existing Render service and database until the Supabase-backed API is verified and any data that needs to be retained has been migrated.
