# Independent JSS client sign-in

User requirement: no OpenAI or ChatGPT branding or account requirement in the client experience.

The /login route is a prepared JSS email-code sign-in screen. It is intentionally disabled and does not collect or send credentials. It is not wired into the live portal yet. The current authenticated portal remains protected by its existing identity checks until a complete replacement is verified.

Activation requires a connected independent identity provider (Supabase connection requested), verified branded email sender, and a confirmed independent hosting/domain path. Sites dispatch-owned authentication and the host interface must not be disguised by renaming their controls. A custom domain alone does not replace authentication.

Before switching: implement provider-verified server sessions, secure HttpOnly cookies, expiration and revocation, provider rate limits, CSRF protection, same-origin redirects, and signed-out/loading/error states. Replace identity reads in portal, intake, admin and every API; never accept a client-supplied email as proof of identity. Keep operator authorization server-side. Existing case ownership IDs require an explicit verified account-linking process, not automatic email matching.

Verify first registration, returning login, wrong/expired/reused codes, logout, independent client isolation, operator access, and upload/payment ownership before publishing the new authentication flow. Keep live payments disabled until the separate payment acceptance gates pass.
