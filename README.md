# Credit Trust Score

AI-powered trust scoring platform for digital financing in Nigeria — built for Squad Hackathon 3.0.

## Architecture

The project uses a **pseudo-microservice architecture** with tRPC as the API gateway:

- **Pseudo services** — `general`, `identification`, and `payments` live under `src/services/` and are linked directly to tRPC routers. Because tRPC lets us call TypeScript functions with full type safety across the wire, these colocated services feel like microservices without the overhead of separate deployables. Each service folder has a corresponding router in `src/server/api/routers/` that's registered in `src/server/api/root.ts`.

- **Real ML microservice** — The `ml` service under `src/services/ml/` is a proper separate Python/FastAPI service. Credit scoring requires Python ML libraries (XGBoost, scikit-learn, SHAP) that can't run in the Node.js runtime, so it runs as an independent service. Training data is in `src/services/ml/training-data/`.

## Prerequisites

- **Node.js** >= 20
- **pnpm** — `corepack enable pnpm` (Node >= 22) or `npm i -g pnpm`
- **Docker** (for the local PostgreSQL database)
- **Python 3.11+** (for the ML service)

## Setup

### 1. Clone and install dependencies

```bash
pnpm install
```

### 2. Environment variables

Copy the example env file and fill in the values:

```bash
cp .env.example .env
```

Required variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (default works with Docker) |
| `BETTER_AUTH_SECRET` | Secret for Better Auth — run `openssl rand -base64 32` |
| `BETTER_AUTH_GITHUB_CLIENT_ID` | GitHub OAuth App client ID |
| `BETTER_AUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret |

To get GitHub OAuth credentials:
1. Go to **Settings > Developer settings > OAuth Apps > New OAuth App**
2. Set the callback URL to `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and generate a Client Secret

### 3. Start the database

```bash
./start-database.sh
```

This spins up a PostgreSQL container using Docker.

### 4. Push the database schema

```bash
pnpm db:migrate
```

### 5. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 6. (Optional) ML service

The Python ML service lives in `src/services/ml/`. Set up and run:

```bash
cd src/services/ml
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start Next.js dev server (with Turbopack) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm db:push` | Push Drizzle schema to the database |
| `pnpm db:studio` | Open Drizzle Studio (GUI database viewer) |
| `pnpm db:generate` | Generate a new Drizzle migration |
| `pnpm db:migrate` | Run pending migrations |

## Project structure

```
src/
├── app/                  # Next.js App Router pages
├── server/
│   ├── api/
│   │   ├── routers/      # tRPC routers (one per service)
│   │   ├── root.ts       # App router — register new routers here
│   │   └── trpc.ts       # tRPC initialization & context
│   ├── better-auth/      # Authentication config
│   └── db/               # Drizzle schema & client
├── services/
│   ├── general/          # General service (pseudo)
│   ├── identification/   # Identity verification service (pseudo)
│   ├── payments/         # Payments service (pseudo)
│   └── ml/               # ML scoring service (real microservice — Python/FastAPI)
└── trpc/                 # tRPC client utilities
```

## Further reading

- [PRD.md](./PRD.md) — Full Product Requirements Document: user flows, API integrations, Behavioral Trust Score mechanics, and monetisation model.
- [REPORT.md](./REPORT.md) — Research report: market analysis, ML algorithm breakdowns, Squad API integration plans, and the hackathon build strategy.
