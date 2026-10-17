import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const load = (path) => readFile(new URL('../' + path, import.meta.url), 'utf8');

test('public intake contains business offers but no consultation or credit-repair signup', async () => {
  const html = await load('intake.html');
  for (const offered of ['Business Setup', 'Business Funding', 'Automation / AI Systems', 'Platform Setup']) {
    assert.ok(html.includes('<option value="' + offered + '">'), 'Missing expected business offer: ' + offered);
  }
  for (const unavailable of ['Consultation', 'Credit Audit', 'Credit Repair']) {
    assert.ok(!html.includes('<option value="' + unavailable + '">'), 'Restricted intake offering reintroduced: ' + unavailable);
  }
  assert.match(html, /not currently offered through this intake/i);
});

test('consumer credit informational page cannot solicit a credit-repair engagement', async () => {
  const html = await load('credit-repair.html');
  assert.match(html, /not currently accepting new credit-report dispute/i);
  assert.match(html, /No new paid credit engagements/i);
  assert.ok(!html.includes('Request Eligibility Review'));
  assert.ok(!html.includes('Complete Intake</a>'));
});

test('marketing pages do not advertise direct consultations', async () => {
  for (const page of ['index.html','services.html','pricing.html']) {
    const html = await load(page);
    assert.ok(!/<h[23]>Consult(?:ation|ing)/i.test(html), 'Direct consultation card found: ' + page);
  }
});

test('homepage and service page label credit material informational', async () => {
  for (const page of ['index.html','services.html']) {
    const html = await load(page);
    assert.match(html, /Consumer Credit Information/i);
  }
});

test('navigation and terms identify consumer credit as information only until clearance', async () => {
  const nav = await load('navbar-public.html');
  const terms = await load('terms.html');
  assert.match(nav, /Credit Information/);
  assert.doesNotMatch(nav, /Credit Services/);
  assert.match(terms, /not currently available through this platform/);
});
