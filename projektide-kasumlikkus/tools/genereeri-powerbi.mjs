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

const ws2 = XLSX.utils.json_to_sheet(r.kuud);
const csv2 = XLSX.utils.sheet_to_csv(ws2);
const outPath2 = join(kaust, "PowerBI_Kuud.csv");
writeFileSync(outPath2, csv2, "utf-8");
console.log('Salvestatud:', outPath2);

process.exit(0);
