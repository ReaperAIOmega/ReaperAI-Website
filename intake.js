import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://itswbmjvuxumfjqkkqgx.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_lgBKt5K8CQCPSC-MaC7s6g_M2iTdWEN';
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const form = document.getElementById('intake-form');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');

const parseInteger = (value) => {
  if (!value) return null;
  const number = Number(String(value).replace(/[^0-9]/g, ''));
  return Number.isFinite(number) ? number : null;
};

const parseMoney = (value) => {
  if (!value) return null;
  const number = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(number) ? number : null;
};

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const honeypot = document.getElementById('companyWebsite');
  if (honeypot?.value) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  statusMessage.textContent = 'Sending your intake securely...';

  const businessStatus = document.getElementById('businessStatus').value;
  const notes = document.getElementById('notes').value.trim();
  const combinedNotes = [
    businessStatus ? `Business status: ${businessStatus}` : '',
    notes,
  ].filter(Boolean).join('\n\n');

  const payload = {
    full_name: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim().toLowerCase(),
    phone: document.getElementById('phone').value.trim() || null,
    service_type: document.getElementById('serviceNeeded').value,
    credit_score_estimate: parseInteger(document.getElementById('creditScore').value),
    funding_amount_needed: parseMoney(document.getElementById('fundingAmount').value),
    notes: combinedNotes || null,
    source: 'website',
    status: 'new',
  };

  const { error } = await supabase.from('intakes').insert(payload);

  if (error) {
    console.error('Intake submission error:', error);
    statusMessage.textContent = 'We could not submit your intake. Please try again or contact support.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Intake';
    return;
  }

  window.location.href = 'thank-you.html';
});
