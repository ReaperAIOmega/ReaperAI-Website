# Independent JSS client sign-in

User requirement: no OpenAI or ChatGPT branding or account requirement in the client experience.

## Implemented

JSS email-code sign-in and explicit new-account registration, code entry and resend, same-origin logout, secure HttpOnly host-only cookies, and provider-verified server identity. Portal, intake, operator access, and every existing case/document/payment API now use the independent identity adapter. No application flow calls the previous ChatGPT sign-in route. Existing case IDs are not automatically relinked by email.

The adapter uses Supabase Auth HTTP APIs, with credentials supplied by runtime SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY. It sends no emails until AUTH_EMAIL_READY=true. Provider rate limits apply. Sessions last at most one hour (or the shorter provider expiry); this version requires email reauthentication after expiration instead of keeping refresh tokens. Logout clears the browser cookie and attempts provider session logout. As with bearer access tokens generally, copied tokens may remain valid until their short expiry; do not claim global immediate revocation.

## Connected project

The connected reaperai-platform project was inactive. Restoration was requested through Supabase. Restoration must reach ACTIVE_HEALTHY before activation. No new paid project was created. The publishable key was retrieved without printing or committing it. No real OTP email was sent during development.

## Activation

Verify and configure the email provider, JSS sender name, and the Magic Link email template to include {{ .Token }}. The connector available in this session does not expose auth configuration or SMTP updates. The default Supabase mail service is restricted to team addresses and is unsuitable for public clients; do not enable this flow without verifying production SMTP.

Set SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY and AUTH_EMAIL_READY only after the template and sender are verified. Configure provider code expiration, rate limits and abuse protection. Use an independently hosted HTTPS origin on the business domain for the client release. Sites-hosted review remains subject to host-owned access controls and interface; replacing app authentication does not remove that host layer.

Existing case ownership values use the old identity namespace. New identities use supabase:<verified provider user ID>. Any data migration must explicitly verify account linkage and preserve its audit trail. Operator access still requires a verified email in the server allowlist.

## Verification

28 existing workflow integration checks passed with the test-only identity shim updated. Twelve authentication scenarios passed against mocked provider responses: request origin checks, disabled service, invalid email/code, registration choice, verified secure cookie, anonymous/invalid/unconfirmed identities, identity namespace, and logout. No credentials are returned to browser JavaScript. Actual provider OTP delivery, duplicate/expired code rejection, signed-in browser behavior, sender branding and domain routing still require acceptance testing. Do not present mocked tests as live acceptance.

Official references:
https://supabase.com/docs/guides/auth/auth-email-passwordless
https://supabase.com/docs/guides/auth/auth-smtp
