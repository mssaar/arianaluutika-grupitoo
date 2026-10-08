import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as XLSX from 'xlsx';
import { parseKuludTulud, parseTooaeg, parsePalgad, parseKontroll } from '../web/js/parse.js';
import { arvuta } from '../web/js/calc.js';

const kaust = resolve('../../Grupikaaslastele/andmed');

const failid = readdirSync(kaust).filter((f) => f.endsWith('.xlsx') && !f.startsWith('~$'));
const loe = (f) => {
  const wb = XLSX.read(readFileSync(join(kaust, f)));
  return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, raw: true, defval: null });
};
const vali = (re, parse) => failid.filter((f) => re.test(f.normalize('NFC'))).flatMap((f) => parse(loe(f), f));

const sisend = {
  kuludTulud: vali(/^DataCorp O. Dimensiooni Projekt detailne aruanne/i, parseKuludTulud),
  tooaeg: vali(/^T..aeg/i, parseTooaeg),
  palgad: vali(/^Tasude ja tundide aruanne/i, parsePalgad),
  kontroll: vali(/^palga kontroll/i, parseKontroll),
};
console.log('Loetud ridu:', Object.fromEntries(Object.entries(sisend).map(([k, v]) => [k, v.length])));

const r = arvuta(sisend, {});

const ws = XLSX.utils.json_to_sheet(r.lopptabel);
const csv1 = XLSX.utils.sheet_to_csv(ws);
const outPath1 = join(kaust, "PowerBI_Koondandmed.csv");
writeFileSync(outPath1, csv1, "utf-8");
console.log('Salvestatud:', outPath1);

// 1. Projekti koondtabel (nagu R skripti projekti_koond_df)
const projMap = new Map();
for (const row of r.lopptabel) {
  const k = row.projekti_kood;
  if (!projMap.has(k)) projMap.set(k, { kood: k, nimetus: row.nimetus, tulu_kokku: 0, kulu_kokku: 0 });
  const p = projMap.get(k);
  if (row.summa > 0) p.tulu_kokku += row.summa;
  else p.kulu_kokku += Math.abs(row.summa);
}
const projKoond = Array.from(projMap.values()).map(p => {
  const kasum = p.tulu_kokku - p.kulu_kokku;
  return {
    projekti_kood: p.kood,
    projekti_nimetus: p.nimetus,
    tulu_kokku: p.tulu_kokku,
    kulu_kokku: p.kulu_kokku,
    kasum: kasum,
    kasumimarginaal_pct: p.tulu_kokku > 0 ? (kasum / p.tulu_kokku) * 100 : -100
  };
});
writeFileSync(join(kaust, "PowerBI_Projekti_Koond.csv"), XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(projKoond)), "utf-8");
console.log('Salvestatud: PowerBI_Projekti_Koond.csv');

// 2. Töötaja tunnihind (nagu R skripti tootaja_tunnihind - anomaaliate tabeli jaoks)
const tunnihinnadArendatud = r.tunnihinnad.map(t => ({
  kuu: t.kuu,
  tootaja_nimi: t.tootaja_nimi,
  palk: t.palk,
  tunnid: t.tunnid,
  tunnihind: t.tunnihind,
  tyyp: t.tunnihind < 10 ? 1 : (t.tunnihind >= 30 ? 2 : 0) // 1 = alla 10, 2 = üle 30
}));
writeFileSync(join(kaust, "PowerBI_Tootaja_Tunnihind.csv"), XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(tunnihinnadArendatud)), "utf-8");
console.log('Salvestatud: PowerBI_Tootaja_Tunnihind.csv');

// 3. Palgakulu kuupõhiselt (nagu R skripti palgakulu_kuupohiselt)
const palgakuluKuud = r.kuud.map(k => ({
  kuu: k.kuu,
  kokku_palgakulu: k.palgafond
}));
writeFileSync(join(kaust, "PowerBI_Palgakulu_Kuupohiselt.csv"), XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(palgakuluKuud)), "utf-8");
console.log('Salvestatud: PowerBI_Palgakulu_Kuupohiselt.csv');

process.exit(0);
