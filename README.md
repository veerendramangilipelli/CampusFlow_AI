# CampusFlow

Smarter Learning. Personalized Guidance. Better Campus Management.

```
CampusFlow/
├── frontend/              React + JavaScript UI (finished, see docs/)
├── backend/               Spring Boot API (Java 17, MySQL 8): add your existing backend here
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

Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, H2 (in-memory), port 8081.
The endpoints the UI needs are listed per screen in `docs/UI_SPEC.md`.
See `docs/CAMPUSFLOW_PROJECT_DOCUMENTATION.md` for the current feature inventory, API behaviors, run instructions, and deployment limitations.

### Run the backend (PowerShell)

```powershell
cd .\backend
.\mvnw.cmd spring-boot:run
```

The Maven Wrapper uses Maven 3.9.16, so a global `mvn` installation is not required. Set `JAVA_HOME` to a Java 17 installation if it is not already the active JDK. The default backend URL is `http://localhost:8081`; set `PORT` to override it.

For production, activate the `prod` Spring profile and provide `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, and `CORS_ALLOWED_ORIGINS` through the hosting platform's secret/environment settings. `DB_PORT` and `DB_NAME` can also be set to match the managed MySQL service. Configure `VITE_API_BASE_URL` at frontend build time to the deployed API URL. The default H2 database is in-memory and is for local development only; use persistent managed MySQL for deployment.

The backend Dockerfile builds a Java 17 image and activates the `prod` profile. From `backend/`, build it with `docker build -t campusflow-api .`; at deployment, inject the production variables above as secrets and publish the container's `8081` port. Do not put production credentials in the image or commit them.
