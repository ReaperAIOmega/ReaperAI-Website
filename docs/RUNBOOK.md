# ROSv4 operations and activation

## Operating the release

Open /admin using the configured operator email. A new client signs in at /intake, completes the form, and receives a rules-based readiness brief in /portal. Client identifiers use the hosting authentication subject, not a client-supplied email.

The operator reviews evidence and moves an eligible business-funding case to scope_approved, entering a specific written scope, deliverables, timing, and cancellation terms. The client accepts that exact scope version. Only then can the separately activated checkout create a $300 order. Generic credit-service deposits are intentionally absent.

Verified payment creates an editable working draft, not an unreviewed final recommendation. Edit and save the draft, attest to evidence/scope review, and release it. The client sees released content only. Released records are immutable in this release; additional revisions need a new document version workflow rather than overwriting client history.

## Runtime settings

Use the hosting platform's secret management. Never put credentials in Git, the browser, URLs, or chat messages.

| Name | Purpose | Initial state |
|---|---|---|
| OWNER_EMAILS | Comma-separated verified operator email allowlist | Configured from the connected account; verify it matches your ChatGPT sign-in |
| SITE_ORIGIN | Canonical HTTPS origin for payment return URLs | Private review origin |
| STRIPE_SECRET_KEY | Restricted server key with only required Checkout/read permissions | Not configured |
| STRIPE_WEBHOOK_SECRET | Signing secret for the registered endpoint | Not configured |
| PROCESSOR_APPROVED | Set true only after exact offer eligibility is verified | false |
| PAYMENTS_ENABLED | Explicit payment activation | false |
| RESEND_API_KEY | Server-only email provider credential | Not configured |
| EMAIL_FROM | Verified sender identity | Not configured |
| EMAIL_ENABLED | Explicit delivery activation after message authorization | false |
| AUTOMATION_TOKEN | Secret bearer token for scheduled queue work | Not configured |

Restricted Stripe keys with rk_test_ and rk_live_ prefixes are supported. The API version is pinned to 2026-07-29.dahlia. Register checkout.session.completed and checkout.session.async_payment_succeeded for /api/ros/webhook. Signature verification checks raw bytes and a five-minute timestamp tolerance; the handler then retrieves the session from Stripe and checks price, currency, mode, case, and offer. The return URL also reconciles server-side; browser query parameters alone never prove payment.

Owner-private Site publishing is for operator review. Stripe and a scheduler cannot access private routes without a platform-supported exposure path; make the intended audience and endpoint reachability explicit before activation. Do not disable signature or bearer authentication to solve access failures.

## Scheduler and email

A separate scheduler must POST /api/ros/tick using Authorization: Bearer <AUTOMATION_TOKEN>. A scheduler is not provisioned by merely setting that token. The admin button only evaluates and queues due reminders; it does not send email.

The outbox has unique per-case reminder identifiers, bounded batches, leases, provider idempotency keys, exponential retry delays, and a five-attempt limit. Delivery is off in the review deployment. Client consent withdrawal cancels pending messages. No real client communications were sent during build/testing.

## Validation

Run `node tests/integration.mjs`, `node tests/signatures.mjs`, and `node node_modules/typescript/bin/tsc --noEmit` from the project. Tests use ephemeral D1/R2 and a test-only identity shim that is never imported by the production app. They do not prove real OAuth, processor, sender, scheduler, or domain configuration.

Generate schema changes with the project's Drizzle tool; inspect SQL before publishing. Never mutate schema at request time. Already-applied migrations are immutable.

## Remaining acceptance gates

Use a real signed-in operator and a separate client to verify isolation through the deployed platform. Verify the live business identity and approved offer. Test processor success, cancellation, asynchronous confirmation, duplicate events, and failure. Finalize tax treatment and service terms before enabling collections. Test reminder consent and scheduled execution after authorized email setup. Inspect desktop and mobile browser behavior before public rollout. WebMCP read-case registration is feature-detected; runtime WebMCP validation was unavailable in this execution.

## Data and retention

Uploads are restricted to PDF/PNG/JPEG, 10 MB each, 30 per case, and always served as attachments with ownership checks. The current file signature check is not malware scanning. Require redacted documents for review and select a scanning/retention policy before scaling sensitive-document intake. Operator case lists are bounded to 200 and client lists to 100; add cursor pagination before those volumes.

No credit report API, automated dispute sending, legal-case database, lender eligibility feed, AI document analysis, desktop voice service, or broker/trading access is connected in this release. Those are separate ROSv4 engines, not hidden functionality.
