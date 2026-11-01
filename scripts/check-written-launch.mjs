import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { publicParityPaths } from './public-parity-paths.mjs';

const read = (name) => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const pages = Object.fromEntries(['index.html', 'services.html', 'pricing.html', 'funding.html', 'intake.html', 'privacy.html', 'terms.html'].map(name => [name, read(name)]));

for (const name of ['index.html', 'services.html', 'pricing.html', 'funding.html']) {
  const page = pages[name];
  assert(!/<h[1-6][^>]*>\s*(?:consultations?|credit repair(?: services)?)\s*<\/h[1-6]>/i.test(page), name + ': a retired paid-service heading has returned');
  assert(!/href=["'][^"']*(?:calendly|acuityscheduling|book-a-call)[^"']*["']/i.test(page), name + ': booking flow is not in the written-only offer');
  assert(page.includes('intake.html') || name === 'services.html', name + ': no defined intake path');
}
assert(pages['index.html'].includes('written deliverables'), 'Home must advertise written deliverables');
assert(pages['services.html'].includes('Written Business Advisory'), 'Services must retain written advisory');
assert(pages['pricing.html'].includes('Written Business Advisory'), 'Pricing cannot restore the consultation product');
assert(pages['pricing.html'].includes('Financing outcomes are not guaranteed'), 'Pricing must preserve financing disclaimer');
assert(pages['funding.html'].includes('We do not promise financing'), 'Funding must disclaim financing guarantee');
assert(pages['funding.html'].includes('lender-placement or application assistance is not part'), 'Funding must exclude lender placement/application assistance');
assert(!/<option[^>]*value=["'](?:Consultation|Credit Repair|Credit Audit)["']/i.test(pages['intake.html']), 'Restricted intake service option resurfaced');
assert(pages['intake.html'].includes('state') && pages['intake.html'].includes('business'), 'Business jurisdiction/intake controls are missing');
assert(pages['privacy.html'].includes('Information we collect'), 'Public privacy notice missing');
assert(pages['terms.html'].includes('No guaranteed outcomes'), 'Public terms must retain outcomes disclaimer');

// The live-byte gate must cover scripts enforcing intake scope and public navigation.
assert.equal(new Set(publicParityPaths).size, publicParityPaths.length, 'Duplicate live parity path');
for (const name of publicParityPaths) assert.doesNotThrow(() => read(name), 'Missing parity source: ' + name);
for (const name of ['intake.html', 'intake.js', 'funding-objective.mjs', 'navbar-public.html', 'load-navbar.js', 'credit-self-help.html', 'credit-repair.html', 'pricing.html', 'services.html']) {
  assert(publicParityPaths.includes(name), 'Critical live parity path omitted: ' + name);
}
console.log('Written-only public-launch source contract and parity inventory passed.');
