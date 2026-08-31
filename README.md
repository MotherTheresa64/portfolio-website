# Noah Ragan — Developer Portfolio

Recruiter-focused portfolio for my full-stack software engineering work.

## Live portfolio

**Canonical site:** https://noahragan-portfolio.vercel.app/

> Note: `noah-portfolio.vercel.app` is not my portfolio and should not be used.

## Flagship / capstone — Aegis

**Aegis** is a production-oriented **Real-Time Incident Operations Platform** for engineering teams. It is intentionally the capstone because it demonstrates systems engineering beyond a standard CRUD application.

The architecture and product scope include:

- React + TypeScript frontend
- Python + FastAPI backend
- PostgreSQL + SQLAlchemy
- Redis for cache, rate limiting, queues, and realtime event fanout
- WebSockets for organization-scoped realtime updates
- Celery background workers for retryable/asynchronous jobs
- Multi-tenant organizations, memberships, and RBAC
- Service catalog and dependency-aware health
- Alert ingestion, normalization, and deduplication
- Incident rooms, timelines, tasks, and participant workflows
- Public status communication
- Audit/security history
- Postmortem workflows and analytics
- Docker Compose local infrastructure
- GitHub Actions CI/CD
- OpenTelemetry-ready observability
- Terraform-oriented production infrastructure path

Source: https://github.com/MotherTheresa64/Aegis

The active production foundation currently lives on `build/foundation` while the project is merged through normal feature-branch / pull-request workflow.

## Selected product work

### Planora
A product-complete planning and execution workspace built around the goal → plan → milestones → tasks → schedule → progress lifecycle, with Kanban, scheduling/calendar views, Today workflows, search, analytics, resources, responsive layouts, persistence, CI, and Firebase-ready synchronization boundaries.

- Live: https://planora-zlxv.onrender.com/
- Source: https://github.com/MotherTheresa64/Planora

### Threadline
A product-complete collaboration and knowledge workspace designed to keep discussions connected to decisions and durable documentation. It includes multi-workspace flows, channels, search, deep-linked threads, replies/reactions, bookmarks, resolutions, knowledge documents, version history, board/timeline views, inbox/activity flows, responsive navigation, CI, and optional Firestore-backed shared workspaces with role-aware security rules.

- Live: https://threadline-ga8w.onrender.com/
- Source: https://github.com/MotherTheresa64/Threadline

### Wanderline
A product-complete collaborative travel planner covering trip creation, traveler data, itineraries, lodging/reservations, budgets/expenses, packing, saved places, live weather, sharing, mobile-first navigation, privacy-safe demo content, Google Maps integration, CI, and Firebase-ready account persistence.

- Live: https://wanderline-s1yv.onrender.com/
- Source: https://github.com/MotherTheresa64/Wanderline

### Ledgerly
A product-complete personal-finance application with financial accounts, transactions, transfers, budgets, savings goals, reports, CSV import/export, responsive dark themes, mobile navigation, a Flask REST API, PostgreSQL models, automated tests, CI/CD, and user-scoped architecture prepared for finalized Firebase identity configuration.

- Live: https://ledgerly-web-knmt.onrender.com/
- Source: https://github.com/MotherTheresa64/Ledgerly

## Additional engineering

### Advanced Service API
A deployed Flask REST API with PostgreSQL, SQLAlchemy, Marshmallow, Swagger/OpenAPI documentation, pytest coverage, Gunicorn, and CI/CD.

- Swagger: https://advanced-api-final.onrender.com/apidocs/
- Source: https://github.com/MotherTheresa64/Advanced-API-Final

## Portfolio stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Formspree
- Vercel

## Local development

```bash
git clone https://github.com/MotherTheresa64/portfolio-website.git
cd portfolio-website
npm install
npm run dev
```

## Links

- Portfolio: https://noahragan-portfolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/njragandev/
- GitHub: https://github.com/MotherTheresa64
