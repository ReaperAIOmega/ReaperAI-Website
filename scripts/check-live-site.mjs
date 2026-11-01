// Read-only release acceptance: compare exact public HTTP bytes against this checkout.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { publicParityPaths } from './public-parity-paths.mjs';
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
let failures = 0;
for (const path of publicParityPaths) {
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
  const sameOrigin = Boolean(finalUrl && new URL(finalUrl).origin === url.origin);
  const matches = status === '200' && sameOrigin && liveHash === expectedHash;
  console.log(JSON.stringify({ path, status, expected_sha256: expectedHash, live_sha256: liveHash, same_origin: sameOrigin, matches, final_url: finalUrl }));
  if (!matches) failures++;
}
if (failures) {
  console.error('RELEASE HOLD: ' + failures + ' public files could not be verified against this source commit and canonical origin. Verify domain, CDN and deployment provenance; do not treat indexed content as live-byte proof.');
  process.exitCode = 1;
} else {
  console.log('All public source files matched the independently retrieved live HTTP bytes at the canonical origin.');
}
