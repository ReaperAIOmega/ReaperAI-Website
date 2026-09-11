# ROSv4 recovery and launch audit

Reviewed September 11, 2026. This is a source-grounded recovery record, not a claim that all previously discussed engines have been deployed.

## Source inventory

| Source | Verified state |
|---|---|
| ReaperAIOmega/ReaperAI-Website, main 5eabeb4d1036d794a68bd8d46f058aaccd03f790 | 17 tracked static files. reaperai.com website. Intake calls Google Apps Script; pricing uses three Stripe test links. |
| ReaperAIOmega/ReaperAI-Admin, main 73912541a53d35234405a53cedda8f0a3fb839e9 | Static admin pages with hard-coded counts and example activity; no authenticated data backend found. |
| ReaperAIOmega/ReaperAI-Portal, main ed07f4484deaab269da59830d6ef9a903e56eebb | Static client pages and document/payment navigation. No case ownership enforcement found in source. |
| ReaperAIOmega/ReaperAi-Core, main 3239db4d18c888601de77f0737f14571bb1d138b | All returned tree paths are inside venv; no application source outside it. |
| ReaperAIOmega/Reaper-Options-Bot | Separate trading repository discovered; excluded from client-service launch. |
| REAPER AI — ROS(3).docx, June 10, 2026 | ROSv4.1 Apps Script decision engine, six routing lanes, tiers T1–T5, module stacks, lead/client sheets, payment promotion, reminders and production alerts. Configuration includes placeholder Sheet ID and operator email. |
| ROSv4 System Audit.pdf, June 9, 2026 | Flags unspecified scoring coefficients, thresholds, event catalog, funding specification, and review path. Opinions in this historical audit are not treated as verified legal or technical facts. |
| REAPER_JARVIS_Production_2.0_Audit_Dossier.pdf, September 7, 2026 | Desktop engineering audit; reports 10 passing checks and one knowledge-index failure. Desktop voice and UI work is distinct from this hosted client backend. |
| REAPER JARVIS Consolidated Production Release Engineering Report | Recovered as a separate historical artifact; not proof of a current client-service production deployment. |

Duplicates of the ROS document and audit dossier were found. Their presence is not evidence of distinct deployed versions. The connected Google Drive and Stripe apps were reported connected during this work, but their callable account tools were not exposed in this execution registry. The Stripe CLI was also absent. No account configuration or live product verification is claimed.

## Concrete defects in the previous public website

1. login.html submitted the password as a GET query parameter and provided direct dashboard links. It did not authenticate.
2. intake.html treated a non-JSON 2xx response as successful, allowing false success on an HTML response.
3. Intake posted URL-encoded form fields while the recovered backend parsed JSON. Current deployed Apps Script source was not accessible, so the live mismatch remains unconfirmed.
4. Website fields did not match the historical required field map.
5. All three pricing links used Stripe test URLs: consultation $50, Funding Blueprint $300, generic deposit $200. No verified live revenue flow.
6. Admin counts 12/8/3/17 and named sample clients were literal HTML, not database queries.
7. Recovered Stripe event handling routed by JSON shape; signature verification and immutable payment matching were not established.
8. Reminder windows in the historical script could run repeatedly without durable per-stage delivery idempotency.

## This release

One integrated hosted application now implements the website, identity-aware intake, persistent cases, server-side role/ownership checks, R2 documents, automatic free readiness briefs, draft/release workflow, reviewed written scopes and client acceptance, server-side Checkout adapter, signature-checked webhook handling, payment reconciliation, an audit trail, and a durable reminder outbox.

The free assessment is explicitly rules-based. The personalized paid strategy remains an operator-reviewed deliverable. No model, lender database, legal engine, or automatic dispute submission is represented as connected.

## Live launch blockers

- Verify processor account eligibility for the exact business-planning offer. Stripe expressly prohibits credit monitoring, repair, and counseling; do not relabel such services to evade this restriction.
- Configure a restricted server key and webhook signing secret; confirm live/test mode and provider approval. Current payment activation is off.
- Register the webhook on a reachable public endpoint. Owner-private review URLs are not accessible to unauthenticated Stripe delivery.
- Activate email with a verified sender and explicit authorization. Current sender integration is implemented but not connected or enabled.
- Connect an external scheduler to POST /api/ros/tick with a secret bearer token. The Site does not currently schedule this endpoint on its own.
- Review business terms, privacy operations, service eligibility and jurisdiction before a paid launch.
- Complete actual signed-in browser and live processor acceptance checks. Local integration tests do not validate third-party authentication or payment accounts.
- Publish the approved client-facing release to the intended audience and arrange domain routing. reaperai.com and its existing public repositories are not silently overwritten.

## Primary sources

- https://github.com/ReaperAIOmega/ReaperAI-Website
- https://github.com/ReaperAIOmega/ReaperAI-Admin
- https://github.com/ReaperAIOmega/ReaperAI-Portal
- https://github.com/ReaperAIOmega/ReaperAi-Core
- https://www.ftc.gov/legal-library/browse/statutes/credit-repair-organizations-act
- https://stripe.com/legal/restricted-businesses

FTC describes the prohibition on demanding advance payment for credit repair, written contract requirements, and cancellation rights. Stripe's prohibited-business list expressly lists credit monitoring, credit repair, and counseling. Funding/business consulting eligibility is not assumed from the absence of a matching label.
