# Power BI Juhised Grupile

See fail sisaldab tehnilisi juhiseid, kuidas luua Power BI Dashboard valmis eeltöödeldud andmete põhjal. 
Oleme teie jaoks teinud kõige raskema andmetöötluse juba ära! Palkade, tundide, erandite, üldkulu ja projektipõhise marginaali arvutamise keeruline loogika on eeltöödeldud otse ühte koondfaili.

## 1. Mida ja kust laadida?
Kõik vajalik asub `andmed/` kaustas. Kõige olulisem fail, mida Power BI-s kasutada, on **`PowerBI_Koondandmed.csv`**.

**Power BI sammud:**
1. Ava Power BI Desktop.
2. Vali "Get Data" -> "Text/CSV" ja vali `andmed/PowerBI_Koondandmed.csv`.
3. Selles tabelis on koos nii reaalsed projektide tulud-kulud kui ka proportsionaalselt jaotatud palgakulu (otsene kulu ja üldkulu).
   * **Veerg `summa`**: sisaldab finantsilist väärtust (tulud on positiivsed, kulud on negatiivsed).
   * **Veerg `projekti_kood`**: unikaalne projekti identifikaator (või "KONTO_YLDKULU" vms abirida).
   * **Veerg `nimetus`**: projekti või kulu nimetus.
   * **Veerg `kuu`**: kalendrikuu (nt "202401").
   * **Veerg `konto_nimetus`**: tulude/kulude raamatupidamislik sisu.

*(Soovi korral võite juurde laadida ka faili `PowerBI_Kuud.csv`, mis sisaldab igakuiseid agregeeritud KPI-sid nagu kogu palgafond, keskmine tunnihind jne. See on abiks, kui tahate eraldiseisvaid "High-level" kaarte teha).*

## 2. Milliseid visuaale ehitada?
Vastavalt meie `Executive_Summary.md` failile, peab Dashboard olema suunatud juhatusele (selge ja ilma liigse mürata). Soovitatavad visuaalid:

1. **KPI Kaardid (High-level ülevaade kogu ettevõtte kohta):**
   - **Kogukasum / Marginaal:** Loo DAX mõõdik `Total = SUM(PowerBI_Koondandmed[summa])`.
   - **Kogukulud vs Tulud:** Filtreeri summa vastavalt sellele, kas see on positiivne (tulu) või negatiivne (kulu).

2. **Projektide tasuvus (Scatter Plot või Clustered Bar Chart):**
   - **Telg (Axis):** Projekti `nimetus`.
   - **Väärtus (Values):** `summa` (kui see on negatiivne, on projekt kahjumis).
   - *Filtreeri välja* (Exclude) read, kus `projekti_kood` pole otseselt projekt, näiteks üldkulude rida. See näitab selgelt, millised projektid toovad kasumit.

3. **Kulustruktuur (Donut Chart või Waterfall Chart):**
   - **Kategooria (Legend):** `konto_nimetus`.
   - **Väärtus (Values):** `summa` (ainult negatiivsed väärtused).
   - Näitab juhtkonnale visuaalselt, kas suurim kulu on töötasu (otsene või üldkulu jaotus) või hoopis materjalikulu (abimaterjalid jne).

## 3. Lõppviimistlus
- Palun kasutage loetavaid ja juhtkonnale harjumuspäraseid värve (nt roheline positiivse kasumi/tulu puhul, punane kahjumi/kulu puhul).
- Jälgige disainis visuaalset hierarhiat – olulised numbrid (KPI-d) suuremalt ülal, detailsemad graafikud all.
- Valmis töö salvestage `.pbix` failina. Jõudu tööle!
