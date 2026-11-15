import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const rows = JSON.parse(readFileSync(new URL('../src/data/spanishCenters.json', import.meta.url)))
assert.equal(rows.length, 503)
assert.equal(new Set(rows.map(c => c.id)).size, rows.length)
const addresses = new Set()
for (const c of rows) {
  assert.equal(c.country, 'Spain')
  assert.equal(c.verification.status, 'verified')
  assert.ok(c.name && c.city && c.address && c.description)
  assert.ok(c.contact_phone || c.email)
  assert.ok(c.lat >= 27.5 && c.lat <= 43.9 && c.lng >= -18.3 && c.lng <= 4.5)
  for (const field of ['contact_web']) assert.ok(['https:', 'http:'].includes(new URL(c[field]).protocol))
  for (const field of ['sourceUrl', 'coordinateSourceUrl']) assert.equal(new URL(c.verification[field]).protocol, 'https:')
  for (const lang of ['es', 'en', 'ru', 'fr', 'ar', 'zh']) {
    assert.ok(c.translations.name[lang] && c.translations.description[lang])
  }
  assert.deepEqual(c.categories, ['women_support'])
  // Unknown eligibility/cost/spoken languages must not become promises.
  assert.equal(c.cost, undefined)
  assert.equal(c.languages, undefined)
  assert.equal(c.open24, undefined)
  const addressKey = `${c.city}|${c.address}`.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
  assert.ok(!addresses.has(addressKey), c.id)
  addresses.add(addressKey)
}
console.log(`PASS: ${rows.length} verified Spanish centers; unique IDs/addresses; coordinates, contacts, source URLs and six translations present.`)
