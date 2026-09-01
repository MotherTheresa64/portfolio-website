# Noah Ragan — Software Engineering Portfolio

A recruiter-first interactive portfolio built with React, TypeScript, Vite, Framer Motion, and a deliberately small client-side architecture.

**Live:** https://noahragan-portfolio.vercel.app/

## Experience design

Visitors get two equally valid routes from the first screen:

- **Interactive challenge mode** — solve six small multiple-choice code gates to grow the project map.
- **View everything now** — immediately reveal the same portfolio content with no challenge requirement.

Challenge mode adds personality without gatekeeping the information a recruiter needs. The resume, GitHub, LinkedIn, contact route, Aegis summary, and direct recruiter path are available immediately.

The visual system uses a dark charcoal/near-black foundation with lilac, lavender, and soft-violet accents. Responsive behavior is designed around both viewport size and input capability so touch devices receive a vertical exploration model instead of desktop-only directional language.

## Challenge behavior

Each challenge is React-controlled and keyboard/touch accessible:

1. Choose from four code options.
2. The first incorrect choice is marked unavailable and reveals a useful hint.
3. The second incorrect choice reveals and explains the correct answer.
4. The revealed answer remains visible until the visitor explicitly chooses **Continue**.
5. A correct choice gives success feedback and progresses naturally.

Challenge state lives in `src/challenge-engine.ts`; the UI lives in `src/components/ChallengeCard.tsx`. There are no MutationObservers, hidden answer inputs, synthetic React clicks, or post-render DOM patches.

## Portfolio hierarchy

- **Aegis** is the flagship/capstone and receives the strongest visual and content hierarchy, including architecture, engineering decisions, operations, source, live deployment, and API documentation.
- **Planora** emphasizes structured planning, derived application state, local-first versioned persistence, production hosting, responsive workflow design, and an explicit future hosted-data boundary rather than claiming cloud sync that is not currently implemented.
- **Threadline** emphasizes real-time shared Firestore workspaces, roles, discussions, decisions, and versioned knowledge with documented snapshot-model tradeoffs.
- **Wanderline** emphasizes consumer group-travel workflows, expense calculations, maps/weather integration, and responsive UX while clearly identifying cloud collaboration as a remaining integration boundary.
- **Ledgerly** emphasizes a full-stack finance domain with Firebase identity, Flask token verification, PostgreSQL data ownership, CSV workflows, lifecycle controls, and tests.

Featured products are presented as compact engineering case studies with current implementation status, architecture, engineering highlights, quality signals, important tradeoffs, source, and live-demo links. Project wording is intentionally implementation-specific instead of repeating generic completion labels or fabricated metrics.

## Accessibility and responsive behavior

- semantic controls and visible lilac focus states
- keyboard-completable challenge flow
- `role="dialog"`, `aria-modal`, focus trap, Escape close, focus return, and body scroll locking
- `aria-live` challenge/form feedback
- non-color correct/incorrect labels
- responsive desktop map and stacked mobile route wording
- touch-aware compact-layout detection
- touch-friendly dock and controls with safe-area handling
- reduced-motion support
- narrow-phone and phone-landscape layout passes
- no hover-only access to core content

## Motion and performance approach

Motion is used for hierarchy, state changes, route activity, reveal feedback, and lightweight ambient personality. Reduced-motion users receive the same content without depending on animations to finish.

The implementation favors CSS and the existing Framer Motion dependency rather than adding another large animation framework. The portfolio remains a static/client application; deeper backend complexity belongs in the projects being presented rather than in the portfolio shell itself.

## SEO and production metadata

The production shell includes canonical metadata, Open Graph/Twitter previews, structured Person data, theme color, favicon, web manifest, `robots.txt`, and a sitemap for the deployed Vercel origin.

## Quality gates

```bash
npm ci
npm run check
```

`npm run check` runs:

- ESLint
- Node challenge/data tests
- static portfolio invariants for architecture, accessibility, responsive behavior, lilac design tokens, factual project boundaries, and challenge UX
- TypeScript + Vite production build

GitHub Actions runs the same command on pull requests and `main`.

## Source map

```text
src/
├── App.tsx                         portfolio/map orchestration
├── challenge-engine.ts            pure challenge + unlock logic
├── portfolio-data.ts              recruiter-facing data, case studies, and links
├── styles.css                     consolidated visual/motion/responsive system
├── components/
│   ├── ChallengeCard.tsx           accessible multiple-choice challenge UI
│   ├── ContactPanel.tsx            Formspree + direct fallback contact
│   ├── DetailDialog.tsx            accessible modal behavior
│   └── PortfolioViews.tsx          skills/projects/Aegis/contact detail views
└── hooks/
    └── useCompactLayout.ts         viewport + input-aware route copy
```

## Design principle

The portfolio can be playful, but it should never make evaluation harder. A recruiter can skip the challenge immediately; a technical reviewer can open the source and find deliberate state logic, responsive architecture, accessibility behavior, factual project boundaries, and automated quality checks behind the presentation.
