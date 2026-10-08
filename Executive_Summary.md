# Executive Summary: DataCorp OÜ projektide kasumlikkuse ja ressursside analüüs

## 1. Probleemi püstitus ja äriline vajadus
DataCorp OÜ (ning selle tütarettevõtted nagu TestLab OÜ) on kiirelt kasvav ettevõte, kus töötajate ajakasutus ja projektide tasuvus on muutunud üha raskemini jälgitavaks. Juhatusel ja nõukogul puudub hetkel tsentraalne ja reaalajas uuenev ülevaade sellest, millised projektid toodavad kasumit, millised on kahjumlikud ning kuidas jaotub töötajate tööaeg (näiteks tunnitasu vs. kombineeritud tasu proportsioon). 

**Äriline vajadus:** Juhatus vajab selget, interaktiivset ja visuaalselt arusaadavat tööriista (dashboard'i), mis võimaldaks:
1. Jälgida projektide koondkasumlikkust erinevate perioodide lõikes.
2. Tuvastada ebaefektiivseid projekte, kus tööjõukulud ületavad planeeritud eelarvet.
3. Hinnata ressursside (töötajate) koormust ja palgakulusid reaalajas, tegemata selleks manuaalset tööd kümnetes Exceli tabelites.

## 2. Kasutatud andmed
Lahenduse loomiseks on kasutatud DataCorp OÜ pseudonümiseeritud palga-, aja- ja finantsandmeid perioodist 2024–2026. Andmestik koosneb mitmest allikast (Exceli tabelid), mis sisaldavad:
- **Tööaja ja projektide detailandmeid:** Projektide lõikes raporteeritud töötunnid.
- **Palga ja tasude andmeid:** Töötajate (anonümiseeritud kujul, nt "Isik 1", "Isik 2") lõikes väljamakstud palgad, töötasuliigid (kuupalk, tunnitasu) ja reservid.
- **Koondaruandeid:** Erinevate osakondade ja tütarettevõtete (sh TestLab OÜ) lõplikud aruanded.

*Märkus: Kõik isikuandmed ja finantsnumbrid on konfidentsiaalsuse tagamiseks skaleeritud ja anonümiseeritud ning on ohutud avalikuks esitlemiseks või hindamiseks.*

## 3. Loodud lahendus (Power BI Dashboard)
Andmete põhjal luuakse Power BI töövihik, mille keskmes on juhatusele suunatud peamine töölaud (Executive Dashboard). Dashboard koosneb järgmistest peamistest vaadetest:
- **High-level ülevaade (KPI-d):** Koguettevõtte tulud, tööjõukulud ja keskmine projekti marginaal. 
- **Projektide tasuvusmaatriks:** Visuaal (nt *scatter plot* või *bar chart*), mis toob selgelt esile kõige tulusamad ja kõige kahjumlikumad projektid.
- **Ressursside jaotus:** Ülevaade sellest, kuidas jaguneb tasustatud tööaeg ja millised on osakondade (või isikute) lõikes peamised kuluallikad.

Lahendus on disainitud lähtudes juhtkonna vajadustest – vähem müra, rohkem selgeid indikaatoreid. Visuaalne hierarhia on loodud selliselt, et esmane pilk koondub kõige kriitilisematele mõõdikutele (punased vs rohelised indikaatorid).

## 4. Järeldused ja soovitused
Ehkki lõplikud numbrid sõltuvad dünaamilisest andmemudelist, võimaldab loodud analüütiline vaade teha järgmisi põhjapanevaid järeldusi:
1. **Fookus tulusamatele teenustele:** Mõned mahukad projektid võivad näida tulutoovad, kuid sissearvestatud töötunnid ja kombineeritud tasud vähendavad tegelikku kasumimarginaali. Dashboard aitab edaspidi vältida sarnaste, madala tasuvusega lepingute sõlmimist.
2. **Kulude optimeerimine:** Tunnitasuliste ja kuupalgaliste töötajate efektiivsuse võrdlus annab võimaluse optimeerida meeskondade struktuuri, eriti TestLab OÜ ja teiste üksuste üleselt.
3. **Andmepõhine juhtimine:** Tsentraalse Power BI mudeli kasutuselevõtt vähendab finantsosakonna manuaalset koormust aruannete koostamisel hinnanguliselt mitmekümne tunni võrra kuus, võimaldades neil keskenduda strateegilisele analüüsile.

Käesolev lahendus annab juhatusele vajaliku selguse kiirete ja faktipõhiste otsuste langetamiseks.
