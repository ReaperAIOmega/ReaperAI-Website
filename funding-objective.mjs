// Business funding objective only. Reject malformed strings rather than silently changing the client's amount.
export function parseFundingObjective(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return null; // Optional field.
  const format = /^\$?(?:[1-9]\d{0,2}(?:,\d{3})+|[1-9]\d*|0)(?:\.\d{1,2})?$/;
  if (!format.test(raw)) throw new RangeError('invalid_funding_objective');
  const amount = Number(raw.replace(/[$,]/g, ''));
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(Math.round(amount * 100))) {
    throw new RangeError('invalid_funding_objective');
  }
  return amount;
}
