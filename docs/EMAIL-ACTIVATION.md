# JSS sign-in email activation

Resend connected and inspected September 11, 2026. No preexisting domains or templates were present. Created auth.reaperai.com for transactional authentication email, sending enabled, receiving disabled, region us-east-1, enforced TLS, open and click tracking disabled. Verification is pending. No emails have been sent.

Authoritative nameservers returned by public DNS: ns77.domaincontrol.com and ns78.domaincontrol.com. Configure the reaperai.com zone at its DNS provider (these are GoDaddy nameservers). Add the following new records, leaving unrelated records intact. Names below are relative to reaperai.com. TTL Auto, or provider default.

| Type | Name | Value | Priority |
|---|---|---|---|
| TXT | resend._domainkey.auth | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXOn1aotZHlw9uOvPBTAht7RHdCBc4euYBlA0exUVjUIyTyGAsNtMpTbcgTYOpq/9pph4lAe7GiY0/t9Sr8Lnz6WLOUCm6f9WvYr2UGCPeYzxpbg/sH+ZxoHUyaHZibT95iHdNcxqVEt+LTDlWeKhwAZ64omLGGfqKmCDWMRoALwIDAQAB | — |
| MX | send.auth | feedback-smtp.us-east-1.amazonses.com | 10 |
| TXT | send.auth | v=spf1 include:amazonses.com ~all | — |
| CNAME | rsend.auth | send.forge.rmta.net | — |

These exact values came from Resend's create-domain response. After they are saved, trigger verification for domain 89fb676e-2bba-4cab-89f3-da6867654a64 and confirm status verified. No runtime activation before verification.

## Supabase configuration

Project: reaperai-platform (itswbmjvuxumfjqkkqgx), restored to ACTIVE_HEALTHY.

In Authentication > Email > SMTP Settings, set:

- Sender name: Johnson Strategic Solutions
- Sender email: access@auth.reaperai.com
- Host: smtp.resend.com
- Port: 465
- Username: resend
- Password: a domain-scoped, sending-only Resend API key entered through secure account settings. No API key has been created for this handoff.

Use subject "Your JSS sign-in code" and emails/jss-sign-in.html as the Magic Link email template. The {{ .Token }} placeholder is expanded by Supabase, not by the JSS app or a Resend template. Verify the signup/confirmation email configuration also supplies a code for first-time users; test first registration separately from returning login. Configure a short OTP expiration and provider rate limits. Do not disable email verification.

The available Supabase connector does not expose SMTP/auth-settings mutations, and no connected DNS management capability was found. These two account-setting steps remain incomplete; connecting Resend alone does not configure Supabase SMTP.

After sender/template configuration, run explicitly authorized test delivery and verify code success, invalid/expired/reused codes and separate client ownership. Then enable AUTH_EMAIL_READY on the chosen independent HTTPS hosting environment. The current Sites owner-private deployment is not the independent branded public release.

References:
https://resend.com/docs/send-with-supabase-smtp
https://supabase.com/docs/guides/auth/auth-email-passwordless
https://supabase.com/docs/guides/auth/auth-smtp
