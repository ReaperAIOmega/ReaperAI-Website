const form = document.getElementById('intake-form');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');
const CREDIT_INQUIRY_SERVICE = 'Credit Repair Inquiry';
const jurisdictionEl = document.getElementById('state');
const serviceEl = document.getElementById('serviceNeeded');
const creditOption = document.getElementById('credit-inquiry-option');
const creditMessage = document.getElementById('credit-jurisdiction-message');

function updateCreditEligibilityChoice() {
  const isGeorgia = jurisdictionEl?.value === 'GA';
  if (creditOption) creditOption.disabled = isGeorgia;
  if (isGeorgia && serviceEl?.value === CREDIT_INQUIRY_SERVICE) {
    serviceEl.value = '';
  }
  if (creditMessage) {
    creditMessage.textContent = isGeorgia
      ? 'Personalized Georgia consumer credit repair is unavailable. Free self-help resources are available without enrollment.'
      : 'Out-of-state credit inquiries are for eligibility review only. No service, price, or outcome is approved by submitting this form.';
  }
}
jurisdictionEl?.addEventListener('change', updateCreditEligibilityChoice);
serviceEl?.addEventListener('change', updateCreditEligibilityChoice);
updateCreditEligibilityChoice();

const INTAKE_ENDPOINT = 'https://itswbmjvuxumfjqkkqgx.supabase.co/functions/v1/submit-intake';

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

  const selectedState = jurisdictionEl?.value;
  const selectedService = serviceEl?.value;
  if (selectedService === CREDIT_INQUIRY_SERVICE && selectedState === 'GA') {
    statusMessage.textContent = 'Georgia credit repair is unavailable. Use the free credit self-help resource center.';
    return;
  }
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
    state: document.getElementById('state').value,
    service_type: document.getElementById('serviceNeeded').value,
    credit_score_estimate: null, // no consumer credit data collected through business intake
    funding_amount_needed: selectedService === CREDIT_INQUIRY_SERVICE ? null : parseMoney(document.getElementById('fundingAmount').value),
    notes: combinedNotes || null,
    companyWebsite: document.getElementById('companyWebsite')?.value || '',
  };

  try {
    const response = await fetch(INTAKE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok || !body.ok) {
      if (response.status === 429) {
        statusMessage.textContent = 'Too many intake attempts were received. Please wait before trying again.';
      } else if (body.error === 'georgia_credit_service_unavailable') {
        statusMessage.textContent = 'Georgia consumer credit repair is unavailable. Use our free credit self-help resources.';
      } else if (body.error === 'valid_state_required') {
        statusMessage.textContent = 'Select your state of residence before submitting.';
      } else {
        statusMessage.textContent = 'We could not submit your intake. Please review your entries and try again.';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Intake';
      return;
    }

    if (selectedService === CREDIT_INQUIRY_SERVICE) {
      statusMessage.textContent = 'Credit eligibility inquiry received. This is not service enrollment; jurisdiction and compliance review must occur first.';
      form.reset();
      updateCreditEligibilityChoice();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Intake';
    } else {
      window.location.href = 'thank-you.html';
    }
  } catch (error) {
    console.error('Intake submission error:', error);
    statusMessage.textContent = 'The secure intake service is temporarily unavailable. Please try again.';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Intake';
  }
});
