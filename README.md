# ROSv4 — Johnson Strategic Solutions

Integrated website and client operations application, recovered from the existing ReaperAI repositories and ROSv4 specifications.

Public routes: `/`, `/services`, `/privacy`, `/terms`.
Authenticated client routes: `/intake`, `/portal`.
Operator route: `/admin`.
API: `/api/ros/*`.

Uses the Sites Vinext Worker starter, platform sign-in, D1 records, and R2 documents. Server-side Checkout and email adapters are implemented but disabled until configured and verified. The free readiness brief is rules-based; paid strategy release requires operator review.

See `docs/RECOVERY-AUDIT.md` for source findings, `docs/RUNBOOK.md` for operation/activation, and `docs/VALIDATION.md` for test evidence and limits.

Preserve the pnpm lockfile and `.openai/hosting.json` Site identity. Do not commit credentials, generated build output, or `.sites-runtime`. Build through the Sites plugin's `build-site.mjs`; tests run with `node tests/integration.mjs` and `node tests/signatures.mjs`.
