# Power BI Juhised Grupile (Samm-sammult algajale)

Tere grupikaaslased! Siin on väga lihtne, nullist alustav juhend, kuidas need andmed Power BI-sse saada ja valmis graafikuteks muuta. Kui te pole Power BI-d varem kasutanud, siis järgige lihtsalt neid samme!

---

## 1. Mida sul vaja on?
1. **Power BI Desktop** programm (saad tasuta alla laadida Microsoft Store'ist või aadressilt powerbi.microsoft.com).
2. Selles kaustas olevad CSV-failid:
   - PowerBI_Koondandmed.csv
   - PowerBI_Projekti_Koond.csv
   - PowerBI_Tootaja_Tunnihind.csv
   - PowerBI_Palgakulu_Kuupohiselt.csv

---

## 2. Kuidas andmed Power BI-sse laadida?

1. Ava Power BI Desktop. Kui avaneb algusaken (pop-up) ja küsib sisselogimist, võid selle ristist kinni panna.
2. Üleval menüüs klõpsa **"Get Data"** (või "Hangi andmed").
3. Vali nimekirjast **"Text/CSV"**.
4. Otsi oma arvutist üles fail **PowerBI_Projekti_Koond.csv** ja vali see.
5. Avaneb eelvaate aken. Klõpsa all kollast nuppu **"Load"** (Laadi).
6. Korda samme 2-5 ka teiste failidega (PowerBI_Koondandmed.csv, jne).
7. Nüüd näed paremas ääres (paneelil "Data" / "Fields") oma laetud tabeleid. Klõpsates tabeli nime ees olevale noolekesele, näed seal sees olevaid veerge (nagu *kasum*, *projekti_nimetus* jne).

---

## 3. Teeme esimese graafiku: Projektide Kasum (Tulpdiagramm)

Ehitame graafiku, mis näitab, millised projektid toovad kõige rohkem kasumit.

1. Mine paremale poole **"Visualizations"** (Visuaalid) paneelile.
2. Klõpsa ikoonil **"Stacked column chart"** (tavaline püstine tulpdiagramm). Sinu ekraani keskele ilmub tühi hall kast.
3. Tee kast aktiivseks (klõpsa selle peale).
4. Mine **"Data"** paneeli peale paremal ja tee lahti tabel **PowerBI_Projekti_Koond**.
5. Lohista veerg **projekti_nimetus** otse "Visualizations" paneeli kasti nimega **"X-axis"**.
6. Lohista veerg **kasum** kasti nimega **"Y-axis"**.
7. Valmis! Näed tulpdiagrammi. Kui tahad seda sorteerida, klõpsa graafiku üleval paremas nurgas olevale kolmele täpile (...) -> "Sort axis" -> "kasum".

---

## 4. Teeme esimese KPI kaardi: Kogu ettevõtte kasum

Juhatus tahab alati näha ühte suurt numbrit!

1. Klõpsa kuskil *tühjal valgel alal* (et sa eelmisele graafikule asju juurde ei paneks).
2. Klõpsa "Visualizations" paneelil ikoonil **"Card"** (näeb välja nagu väike ristkülik numbriga 123). Ekraanile ilmub väike tühi kast.
3. Paneeli "Data" all (tabelist PowerBI_Projekti_Koond) lohista veerg **kasum** lahtrisse **"Fields"**.
4. Nüüd näed suurt numbrit, mis on kõikide projektide summaarne kasum! 

---

## 5. Teeme anomaaliate tabeli: Kes on kahtlaselt kallis või odav?

1. Klõpsa jälle tühjal alal.
2. Klõpsa "Visualizations" paneelil ikoonil **"Table"** (väike ruudustikuga tabel).
3. Tee lahti tabel **PowerBI_Tootaja_Tunnihind**.
4. Lohista kastikesse **"Columns"** järjekorras:
   - kuu
   - 	ootaja_nimi
   - 	unnihind
   - 	yyp
5. See näitab kõiki töötajaid. Aga me tahame ainult ebatavalisi! 
6. Mine paneeli **"Filters"** (filtrid) peale (see on "Visualizations" kõrval).
7. Leia sealt "Filters on this visual" alt **	yyp**.
8. Klõpsa selle peal, ava "Filter type", vali **"Basic filtering"**.
9. Pane linnukesed numbrite **1** (ebatavaliselt madal) ja **2** (ebatavaliselt kõrge) ette. Number 0 jäta märkimata.
10. Valmis! Tabelis on nüüd ainult anomaaliad, mida juhatus peaks uurima. (PS: Nimed on andmekaitse mõttes asendatud suvaliste eesti nimedega).

---

## 6. Kuidas värve muuta?

Kui soovid näiteks kahjumi punaseks muuta:
1. Klõpsa graafikul.
2. "Visualizations" paneelil klõpsa keskmist nuppu, mis näeb välja nagu väike **pintsel** või pliiats ("Format your visual").
3. Otsi üles "Columns" või "Data colors". Sealt saad muuta tulpade värvi.

Salvestage oma valmis Dashboard (File -> Save as -> valige endale sobiv nimi, nt Grupitoo.pbix). Jõudu tööle!
