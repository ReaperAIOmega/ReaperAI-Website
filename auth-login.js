import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://itswbmjvuxumfjqkkqgx.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_lgBKt5K8CQCPSC-MaC7s6g_M2iTdWEN';

const params = new URLSearchParams(window.location.search);
if (params.get('next') === 'admin') {
  window.location.replace('https://admin.reaperai.com/login.html');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

const form = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const submitButton = document.getElementById('login-submit');
const status = document.getElementById('login-status');
const redirectTo = 'https://portal.reaperai.com/';

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput?.value.trim().toLowerCase();
  if (!email) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Sending secure link...';
  status.textContent = '';

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    status.textContent = 'Sign-in could not be started. Confirm that this email has portal access, then try again.';
    submitButton.disabled = false;
    submitButton.textContent = 'Send secure sign-in link';
    return;
  }

  status.textContent = 'Check your email for the secure Johnson Strategic Solutions sign-in link.';
  submitButton.textContent = 'Link sent';
});
