// Read-only release acceptance: compare exact public HTTP bytes against this checkout.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const pages = ['index.html', 'services.html', 'pricing.html', 'funding.html', 'intake.html', 'intake.js', 'credit-self-help.html', 'privacy.html', 'terms.html'];
let failures = 0;
for (const path of pages) {
  const expected = readFileSync(new URL('../' + path, import.meta.url));
  const url = new URL(path, 'https://reaperai.com/');
  let status = 'request_failed', liveHash = 'unavailable', finalUrl = '';
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Accept: 'text/html,*/*' },
      signal: AbortSignal.timeout(12000),
    });
    status = String(response.status);
    finalUrl = response.url;
    if (response.ok) liveHash = digest(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    status = error?.name || 'request_failed';
  }
  const expectedHash = digest(expected);
  const matches = status === '200' && liveHash === expectedHash;
  console.log(JSON.stringify({ path, status, expected_sha256: expectedHash, live_sha256: liveHash, matches, final_url: finalUrl }));
  if (!matches) failures++;
}
if (failures) {
  console.error('RELEASE HOLD: ' + failures + ' public files could not be verified against this source commit. Verify domain, CDN and deployment provenance; do not treat indexed content as live-byte proof.');
  process.exitCode = 1;
} else {
  console.log('All public source files matched the independently retrieved live HTTP bytes.');
}
