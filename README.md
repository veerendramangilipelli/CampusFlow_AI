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
