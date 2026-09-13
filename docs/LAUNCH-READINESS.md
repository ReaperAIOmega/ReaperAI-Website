# JSS launch work independent of DNS

Updated September 13, 2026. This file describes the saved build, not proof that the public site runs it.

## Completed in this revision

Individual client quotes replace the fixed $300 amount. The operator must enter an explicit USD price and written scope. Client acceptance is bound to the exact quote version. Checkout takes its price from server-stored scope data, and verified payment must match that amount, currency, case and quote version. Paid quotes cannot be replaced. A case with a checkout cannot silently replace its quote; resolve the existing order first. Credit-review engagements retain separate review requirements and cannot enter generic checkout.

Quote presentation is available across the supported non-credit service lanes. Automatic funding working drafts remain specific to funding; other service lanes receive a working draft based on their actual agreed scope for operator completion. A successful payment does not claim the work is complete.

Reminder timing now starts at scope approval or verified live payment, not at intake creation. A missed scheduler run selects only the latest due reminder. Pending reminders are rechecked against consent, case status, payment, scope revision, recipient and uploaded documents, including immediately before sending. Test payments do not trigger document reminders. A one-day interval separates sent case reminders. Bounded queue scans remain limited to 200 cases/pending records and 20 send candidates; pagination is required before larger volumes.

## Still needed without DNS changes

Verify each exact offer with the payment processor before activation; the available Stripe context is a sandbox. Configure a restricted runtime payment key and a signed webhook on a reachable endpoint. Finish Supabase SMTP and code-template settings using the prepared JSS template after sender verification. Complete actual OTP, separate-account isolation, checkout and delivery acceptance tests. Configure the scheduled queue caller and authorize outgoing service messages before enabling it.

Finish client-specific scope and delivery content during review. The system prepares drafts; it does not independently verify lender eligibility, credit reporting facts, or legal claims. Browser/mobile acceptance remains unverified.

## DNS or independent hosting dependencies

The Resend auth.reaperai.com DNS records are prepared in EMAIL-ACTIVATION.md. They have not been verified as installed. The current owner-private Sites publication still uses the earlier authentication release. The new independent login and client quotes are saved on the GitHub work branch. Independent hosting and business-domain routing remain outstanding. Do not label the public site or first paying automated client as complete.

## Pricing decision

All paid work is priced per client after review. There is no automatic fixed fee based on budget, score, or service label. Initial rules-based readiness brief remains free. The public repository main branch pricing.html was updated to individual quotes and its test payment links removed. Live website propagation remains unverified; historical fixed offers are not the new pricing policy.
