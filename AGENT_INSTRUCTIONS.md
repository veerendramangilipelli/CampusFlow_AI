# Instructions for the VS Code agent

This folder contains the **finished CampusFlow frontend**. Read `docs/UI_SPEC.md` and look at the images in `docs/screens/` first.
Your only job is to connect this UI to the Spring Boot backend and make the data real.

## Do not
- Do not redesign, restyle, rename, move or rewrite anything in `frontend/src/styles/`, `frontend/src/components/` or `frontend/src/layouts/`.
- Do not add pages, features, libraries, dependencies, dashboards, tests, scripts or documents that are not listed in `docs/UI_SPEC.md`.
- Do not use Python or any non-Java backend. The stack is fixed: Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL 8, React, JavaScript.
- Do not delete or duplicate existing backend code. Keep the backend base package `com.anurag.aiml`. Inspect the existing backend first and reuse what works.

## Do
1. Put the backend in `backend/` and this UI in `frontend/` (see the folder structure in `docs/UI_SPEC.md`).
2. Work **one screen at a time**, in the order of `docs/UI_SPEC.md`. For each screen: build the backend endpoints listed under "Data needed", then replace the demo data in that page with a call through a file in `frontend/src/services/`. Use the same field names as `frontend/src/data/demoData.js` ("Record shapes" in the spec).
3. Keep the existing markup. Inside it you may add loading, error and empty states using the existing `Skeleton`, `Alert` and `EmptyState` components.
4. Enforce roles in the backend (Spring Security) for every endpoint. The frontend route guard is not security.
5. After each screen: build the backend, run the frontend (`npm run dev`), check it against its screenshot, and confirm earlier screens still work. Stop if something is broken.
6. Secrets (database password, JWT secret, AI key) come from environment variables or a git-ignored local config. Never commit them.
7. Backend rules: BCrypt passwords, JWT with expiry, public registration only for STUDENT, faculty and placement accounts need admin approval, admin accounts are provisioned by the system, students cannot edit attendance or results.
8. AI assistant: Java/Spring only. Without an API key it must return `mode: "DEMO"` so the UI shows its demo warning. Never invent college-specific facts.
9. Report real results only. Do not say something works unless you ran it.
