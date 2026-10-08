# Power BI Juhised Grupile

See fail sisaldab tehnilisi juhiseid, kuidas luua Power BI Dashboard valmis eeltöödeldud andmete põhjal. 
Oleme teie jaoks teinud kõige raskema andmetöötluse juba ära!

## 1. Mida ja kust laadida?
Kõik vajalik asub ndmed/ kaustas. Seal on neli valmis genereeritud CSV-faili, mida saate otse Power BI-sse tõmmata ilma lisatöötluseta:

1. **PowerBI_Koondandmed.csv**
   Kõik ettevõtte tulud ja kulud detailse reatasemega. Siin on ka töötajate otsene palgakulu ja üldkulu (jaotatud proportsionaalselt) juba objektidele otsa arvutatud!

2. **PowerBI_Projekti_Koond.csv**
   Iga projekti kohta üks rida: kogu tulu, kogu kulu, kasum (eurodes) ja kasumimarginaal (protsentides). Suurepärane kiireteks tulpdiagrammideks ja KPI-deks.

3. **PowerBI_Tootaja_Tunnihind.csv**
   Iga töötaja tegelik tunnihind iga kuu lõikes. Sisaldab ka 	yyp veergu anomaaliate filtreerimiseks (1 = alla 10 eur, 2 = üle 30 eur). 

4. **PowerBI_Palgakulu_Kuupohiselt.csv**
   Lihtne kahe veeruga tabel: kuu ja ettevõtte kogu palgafond. Hea kuise palgakulu dünaamika (joondiagramm) kuvamiseks.

**Power BI sammud:**
1. Ava Power BI Desktop.
2. Vali "Get Data" -> "Text/CSV" ja lae kõik neli tabelit.

## 2. Milliseid visuaale ehitada?

Vastavalt algsele R-projektile ja Executive Summaryle, võite luua sarnased visuaalid:

1. **Projektide tasuvus (Bar Chart):**
   - Kasuta PowerBI_Projekti_Koond.csv tabelit.
   - Sorteeri projektid kasumi (või kasumimarginaali) järgi. Nii näeb juhtkond kohe kõige tulusamaid ja kõige kahjumlikumaid objekte.

2. **Töötajate tunnihinna anomaaliad (Table / Matrix):**
   - Kasuta PowerBI_Tootaja_Tunnihind.csv.
   - Filtreeri välja read, kus 	yyp on 0 (jäta ainult 1 ja 2). See toob välja vead tööaja raporteerimisel või ekstreemsed ületunnid.

3. **Kuine palgakulu ja kulujaotus (Line / Donut Chart):**
   - Kasuta PowerBI_Palgakulu_Kuupohiselt.csv kuu kaupa palgafondi trendi näitamiseks.
   - Kasuta PowerBI_Koondandmed.csv kulu- ja tulustruktuuri visualiseerimiseks (Donut Chart: Legend = konto_nimetus).

## 3. Lõppviimistlus
- Palun kasutage loetavaid ja juhtkonnale harjumuspäraseid värve (nt roheline positiivse kasumi puhul, punane kahjumi puhul).
- Jälgige disainis visuaalset hierarhiat – olulised numbrid (KPI-d) suuremalt ülal, detailsemad graafikud all.
- Valmis töö salvestage .pbix failina.
