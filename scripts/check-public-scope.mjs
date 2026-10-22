import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const credit = read('credit-self-help.html');
const legacy = read('credit-repair.html');
const homepage = read('index.html');
const services = read('services.html');
const nav = read('navbar-public.html');
const intake = read('intake.html');
const submit = read('intake.js');
const pricing = read('pricing.html');

for (const link of [
  'https://www.annualcreditreport.com/',
  'https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/',
  'https://consumer.ftc.gov/articles/sample-letter-credit-bureaus-disputing-errors-credit-reports',
  'https://www.identitytheft.gov/',
]) {
  assert(credit.includes(link), `Free resource ${link} missing`);
}
assert(credit.includes('no client'), 'Free access notice missing');
assert(credit.includes('no client') || credit.includes('no client account'));
assert(credit.includes('not currently accepting personalized consumer credit-repair'), 'GA personalized work must remain on hold');
for (const html of [homepage, services, nav, legacy]) {
  assert(html.includes('credit-self-help.html'), 'Public link must lead to self-help page');
}
assert(legacy.includes('href="intake.html"'), 'State eligibility inquiry entry missing');
assert(legacy.includes('outside Georgia'), 'Non-GA inquiry limitation missing');
assert(legacy.includes('Georgia residents'), 'GA restriction notice missing');
assert(intake.includes('value="Credit Repair Inquiry"'), 'Outside-GA credit eligibility inquiry missing');
assert(submit.includes("selectedState === 'GA'"), 'GA submit guard missing');
assert(submit.includes("creditOption.disabled = isGeorgia"), 'GA service choice guard missing');
assert(!intake.includes('value="Credit Audit"'), 'General intake cannot advertise restricted credit audit');
assert(!intake.includes('id="creditScore"'), 'Business intake must not collect consumer score');
assert(!submit.includes("getElementById('creditScore')"), 'JS must not access removed input');
assert(submit.includes('credit_score_estimate: null'), 'No credit scores should be sent from business intake');
assert(pricing.includes('Free Credit Resource Center'), 'Pricing separation disclosure missing');
assert(homepage.includes('href="credit-repair.html"'), 'Homepage must expose credit-service eligibility inquiry');
console.log('Public optional credit-resource and intake separation checks passed.');
