# Power BI Juhised Grupile

See fail sisaldab tehnilisi juhiseid, kuidas laadida andmed Power BI-sse ja milliseid visuaale peaksite ehitama, et Dashboard toetaks valminud `Executive_Summary.md` dokumenti.

## 1. Mida ja kust laadida?
Kõik vajalikud andmefailid asuvad teie töölaual olevas `andmed/` kaustas. Need on anonümiseeritud ja muudetud Exceli failid:

- **Tasude ja tundide aruanded** (nt `Tasude ja tundide aruanne DATACORP OÜ...`, `...TestLab OÜ...`): Need failid sisaldavad töötajate palkade ja tasuliikide infot. 
- **Detailne aruanne / Tööaeg** (nt `DataCorp OÜ Dimensiooni Projekt detailne aruanne...` ja `Tööaeg_2024-01-01-2026-07-31_Projektid.xlsx`): Need sisaldavad projektidesse panustatud aega (tunde) ja seotud otseseid kulusid.

**Power BI sammud:**
1. Ava Power BI Desktop.
2. Vali "Get Data" -> "Excel workbook" (või lae need sisse "Folder" funktsiooniga, et koondada mitu tabelit üheks päringuks).
3. Kasuta Power Query Editori, et andmed puhastada (nt eemalda tühjad read, veendu andmetüüpides – summad on *Decimal* vms).
4. Seo tabelid omavahel kokku (Relationships) näiteks "Projekti nime", "Isiku" või "Kuupäeva/Kuu" alusel. 

## 2. Milliseid visuaale ehitada?
Vastavalt meie `Executive_Summary.md` failile, peab Dashboard olema suunatud juhatusele (selge ja ilma liigse mürata). Soovitatavad visuaalid:

1. **KPI Kaardid (High-level ülevaade):**
   - Koguettevõtte tööjõukulud kokku.
   - Tasustatud töötunnid kokku.
   - Kasumlikkus / keskmine marginaal (kui saame andmetest tuletada tulud vs kulud).

2. **Projektide tasuvus (Scatter Plot või Bar Chart):**
   - **X-telg või kategooria:** Projekti nimi / Tekst.
   - **Y-telg:** Tulu või Kulu.
   - See näitab kohe ära, millised projektid neelavad kõige rohkem eelarvet.

3. **Ressursside koormus (Donut Chart või Stacked Bar):**
   - Tunnitasulised vs kuupalgalised kulud.
   - Või jagunemine tütarettevõtete kaupa (DataCorp vs TestLab).

## 3. Lõppviimistlus
- Palun kasutage loetavaid värve (nt roheline hea tulemuse puhul, punane kahjumi puhul).
- Valmis töö salvestage `.pbix` failina.
- Kogu lahendus (Dashboard + Executive Summary) peaks näitama juhatusele, millised projektid toovad raha sisse ja millised on ebaefektiivsed. Jõudu tööle!
