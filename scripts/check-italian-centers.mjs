import assert from 'node:assert/strict'
import fs from 'node:fs'
const rows=JSON.parse(fs.readFileSync(new URL('../src/data/italianCenters.json',import.meta.url)))
assert.ok(rows.length>=94)
assert.equal(new Set(rows.map(r=>r.id)).size,rows.length)
for(const r of rows){
 assert.equal(r.country,'Italy');assert.equal(r.verification.status,'verified')
 assert.ok(r.address&&r.city&&r.name&&(r.contact_phone||r.email))
 assert.ok(r.lat>=35.4&&r.lat<=47.2&&r.lng>=6.5&&r.lng<=18.6)
 assert.ok(['https:','http:'].includes(new URL(r.contact_web).protocol))
 assert.equal(new URL(r.verification.sourceUrl).protocol,'https:')
 assert.equal(new URL(r.verification.coordinateSourceUrl).protocol,'https:')
 for(const l of ['es','en','ru','fr','ar','zh'])assert.ok(r.translations.name[l]&&r.translations.description[l])
 assert.equal(r.cost,undefined);assert.equal(r.languages,undefined);assert.equal(r.open24,undefined)
}
console.log(`PASS: ${rows.length} verified Italian reception points; source URLs, contacts, coordinates and six-language cards.`)
