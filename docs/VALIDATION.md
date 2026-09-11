# Release validation

September 11, 2026

- 28 integration checks passed against the actual API handlers with ephemeral D1 and R2.
- 5 webhook-signature checks passed.
- TypeScript no-emit check passed.
- Hosted Worker build passed; final source rebuild required for any later edits.

Covered: missing identity, invalid intake rollback, durable case and automatic brief creation, idempotent submission, cross-client read and download denial, operator-only actions, cross-origin mutation rejection, written scope requirements and exact-version acceptance, disabled checkout, signature rejection, upload/download roundtrip, spoofed file rejection, reminder idempotency and consent withdrawal, immutable released documents, credit-lane checkout exclusion, scheduler authorization, amount/currency/mode payment matching, replayed payments, draft visibility, reviewer attestation, final release, and exclusion of test payments from live revenue.

No real messages, charges, or applications were sent. Test identity and payment helpers exist only inside the test bundle. Hosted sign-in, browser visuals, live checkout, external webhook delivery, and scheduled email remain unverified until their services are accessible and activated.
