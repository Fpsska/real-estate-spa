# Real Estate SPA

A full-stack real estate listing application: a React single-page app for browsing and filtering apartment/plot listings, backed by a NestJS REST API.

**Live demo:** https://Fpsska.github.io/real-estate-spa

## Tech Stack

**Frontend** (`frontend/`)

- React 18 + TypeScript
- Vite
- Redux Toolkit + RTK Query
- React Router v7
- Sass

**Backend** (`backend/`)

- NestJS 11
- class-validator / class-transformer
- Jest (unit + e2e)

**Tooling**

- ESLint 9 (flat config) + Prettier, shared base config at the repo root
- Husky pre-commit hook (lints both projects before every commit)
- GitHub Actions: lint on every push, build & deploy to GitHub Pages on version tags

## Project Structure

This is a two-project repository — `frontend` and `backend` are independent npm projects (no workspaces), each with its own `package.json`, dependencies, and lint/test setup.

```
real-estate-spa/
├── frontend/                # React SPA (Feature-Sliced Design)
│   └── src/
│       ├── app/              # app-wide setup: routing, store, providers
│       ├── pages/             # route-level pages
│       ├── widgets/            # composite UI blocks (layout, header, filter-panel, ...)
│       ├── features/            # user-facing features (filters, burger menu, ...)
│       ├── entities/              # domain entities (cards)
│       └── shared/                 # reusable UI kit, libs, hooks
├── backend/                 # NestJS REST API
│   └── src/
│       ├── cards/             # cards CRUD resource (controller/service/dto)
│       └── card-templates/     # card templates resource
├── eslint.config.mjs         # shared ESLint base config (imported by both projects)
└── .github/workflows/        # CI: linting.yml, deploy.yml
```

The frontend follows **Feature-Sliced Design**: each slice/segment exposes its public API through an `index.ts`, and layers only import from layers below them (`app` → `pages` → `widgets` → `features` → `entities` → `shared`).

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

Since there's no root package.json, install each project separately:

```bash
git clone https://github.com/Fpsska/real-estate-spa.git
cd real-estate-spa

cd frontend && npm install
cd ../backend && npm install
```

Running `npm install` in either project sets up the shared Husky git hooks (`prepare` script).

### Running locally

```bash
# backend — starts the API on http://localhost:8080
cd backend
npm run start:dev

# frontend — starts the Vite dev server
cd frontend
npm run start
```

## Available Scripts

### frontend

| Script                              | Description                        |
| ----------------------------------- | ---------------------------------- |
| `npm run start`                     | Start the Vite dev server          |
| `npm run build`                     | Production build                   |
| `npm run preview`                   | Preview a production build locally |
| `npm run lint` / `lint:fix`         | Lint / lint & auto-fix             |
| `npm run prettier` / `prettier:fix` | Check / fix formatting             |

### backend

| Script                      | Description                 |
| --------------------------- | --------------------------- |
| `npm run start:dev`         | Start the API in watch mode |
| `npm run build`             | Compile with the Nest CLI   |
| `npm run lint` / `lint:fix` | Lint / lint & auto-fix      |
| `npm run test` / `test:e2e` | Unit tests / e2e tests      |
| `npm run test:cov`          | Test coverage report        |

## Linting & Formatting

Both projects share a common ESLint rule set defined in the root `eslint.config.mjs` (flat config), extended by `frontend/eslint.config.mjs` and `backend/eslint.config.mjs` with their own project-specific rules (React/import rules for the frontend, TypeScript project-aware rules for the backend). Prettier is wired in as an ESLint plugin (`prettier/prettier`) rather than run separately.

A Husky `pre-commit` hook runs `npm run lint` in both `frontend` and `backend` before every commit.

## CI/CD

- **`.github/workflows/linting.yml`** — runs `npm run lint` for both projects on every push.
- **`.github/workflows/deploy.yml`** — on a version tag push (`vX.Y.Z`), builds the frontend and deploys it to GitHub Pages.
