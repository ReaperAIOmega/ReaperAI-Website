import assert from 'node:assert/strict';
import { parseFundingObjective } from '../funding-objective.mjs';

assert.equal(parseFundingObjective(''), null);
assert.equal(parseFundingObjective('   '), null);
assert.equal(parseFundingObjective('25000'), 25000);
assert.equal(parseFundingObjective('$25,000.00'), 25000);
assert.equal(parseFundingObjective('0.01'), 0.01);
assert.equal(parseFundingObjective('1,250.75'), 1250.75);
for (const bad of ['-100', '+100', '0', '$0.00', '1e6', '12.345', '12..34', '20foo', '1,00', '12,34', '1,000,00', '$$500', 'NaN', 'Infinity', '100 00']) {
  assert.throws(() => parseFundingObjective(bad), RangeError, 'Unexpected acceptance: ' + bad);
}
console.log('Funding amount parsing rejects ambiguous monetary input.');
