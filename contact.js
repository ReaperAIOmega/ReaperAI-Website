const form = document.getElementById('contact-form');
const button = document.getElementById('contact-submit');
const status = document.getElementById('contact-status');
const ENDPOINT = 'https://itswbmjvuxumfjqkkqgx.supabase.co/functions/v1/submit-contact';

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = 'Sending your inquiry securely…';
  const payload = {
    full_name: document.getElementById('contact-name').value.trim(),
    email: document.getElementById('contact-email').value.trim().toLowerCase(),
    phone: document.getElementById('contact-phone').value.trim() || null,
    subject: document.getElementById('contact-subject').value.trim() || null,
    message: document.getElementById('contact-message').value.trim(),
    companyWebsite: document.getElementById('companyWebsite')?.value || '',
  };
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || !body.ok) {
      status.textContent = response.status === 429
        ? 'Too many messages were submitted recently. Please wait before trying again.'
        : 'Your message could not be sent. Please review the form and try again.';
      return;
    }
    form.reset();
    status.textContent = 'Your inquiry was received securely. Johnson Strategic Solutions will review it.';
  } catch (error) {
    console.error('Contact submission error', error);
    status.textContent = 'The contact service is temporarily unavailable. Please try again.';
  } finally {
    button.disabled = false;
    button.textContent = 'Send secure inquiry';
  }
});
