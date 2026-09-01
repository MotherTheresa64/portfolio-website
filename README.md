# Noah Ragan — Software Engineering Portfolio

A recruiter-first interactive portfolio built with React, TypeScript, Vite, Framer Motion, and a deliberately small client-side architecture.

**Live:** https://noahragan-portfolio.vercel.app/

## Experience design

Visitors get two equally valid routes from the first screen:

- **Interactive challenge mode** — solve six small multiple-choice code gates to grow the project map.
- **View everything now** — immediately reveal the same portfolio content with no challenge requirement.

Challenge mode is personality, not access control. The resume, GitHub, LinkedIn, contact route, Aegis summary, and direct recruiter path are available immediately.

## Challenge behavior

Each challenge is React-controlled and keyboard/touch accessible:

1. Choose from four code options.
2. First incorrect choice is marked unavailable and reveals a useful hint.
3. Second incorrect choice reveals and explains the correct answer, then progresses automatically.
4. A correct choice gives success feedback and progresses naturally.

Challenge state lives in `src/challenge-engine.ts`; the UI lives in `src/components/ChallengeCard.tsx`. There are no MutationObservers, hidden answer inputs, synthetic React clicks, or post-render DOM patches.

## Portfolio hierarchy

- **Aegis** is the flagship/capstone and receives the strongest visual and content hierarchy.
- **Planora** emphasizes structured planning and current per-user Firestore sync with local fallback.
- **Threadline** emphasizes real-time shared Firestore workspaces, roles, discussions, decisions, and versioned knowledge with documented snapshot-model tradeoffs.
- **Wanderline** emphasizes consumer group travel workflows while clearly identifying cloud collaboration as a remaining integration boundary.
- **Ledgerly** emphasizes a full-stack finance domain with Firebase identity, Flask token verification, PostgreSQL data, and tests.

Project wording is intentionally implementation-specific instead of repeating a generic “product complete” label.

## Accessibility and responsive behavior

- semantic controls and visible focus states
- keyboard-completable challenge flow
- `role="dialog"`, `aria-modal`, focus trap, Escape close, focus return, and body scroll locking
- `aria-live` challenge/form feedback
- non-color correct/incorrect labels
- responsive desktop map and stacked mobile route wording
- touch-friendly dock and controls
- reduced-motion support
- narrow-phone and phone-landscape layout passes

## Quality gates

```bash
npm ci
npm run check
```

`npm run check` runs:

- ESLint
- Node challenge/data tests
- static portfolio invariants (no DOM patching, typed answers, stale Aegis branch/Terraform copy, etc.)
- TypeScript + Vite production build

GitHub Actions runs the same command on pull requests and `main`.

## Source map

```text
src/
├── App.tsx                         portfolio/map orchestration
├── challenge-engine.ts            pure challenge + unlock logic
├── portfolio-data.ts              recruiter-facing data and links
├── styles.css                     consolidated visual/responsive system
├── components/
│   ├── ChallengeCard.tsx           accessible multiple-choice challenge UI
│   ├── ContactPanel.tsx            Formspree + direct fallback contact
│   ├── DetailDialog.tsx            accessible modal behavior
│   └── PortfolioViews.tsx          skills/projects/Aegis/contact detail views
└── hooks/
    └── useCompactLayout.ts         layout-aware route copy
```

The portfolio is intentionally a static/client application. Deeper backend architecture belongs in Aegis and the other project repositories rather than being invented for the portfolio itself.
