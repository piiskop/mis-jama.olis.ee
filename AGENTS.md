# Jamapäeviku avaldamine

- Kirjuta eesti keeles ja säilita hele kujundus. Allkiri: `peacecop kalmer:`.
- Host on `https://mis-jama.olis.ee/`, pealkiri „Mis jama oli see?”. Igal lõpetatud päeval on oma kuupäevaga aadress.
- Uue päeva sisu põhineb ainult selle päeva kinnitatud vestlustel. Leia allikad Personal Contexti kaudu, vajadusel loe vastavad Library failid. Ära avalda paroole, võtmeid, isiklikke kontaktandmeid, õpilaste tuvastatavat infot ega privaatseid piletinumbreid.
- Ära mõtle juhtumeid, lahendusi ega tulemusi välja. Kui päeva kohta ei saa piisavat kontrollitud infot, ära avalda sisutut või oletuslikku päeva; teata takistusest.
- Vanad `public/YYYY-MM-DD/` kataloogid on lõpetatud hetktõmmised: ära neid muuda ega kustuta. Hilisemad arengud lähevad uue päeva kokkuvõttesse.
- Lisa uus päev koos kõigi oma failidega ning säilita vanad lingid `public/index.html` failis.
- Uuenda `public/manifest.json` pikkused ja SHA-256 väärtused. Skeem on `build-manifest.py` failis. Avalda uue päeva failid, arhiivi avaleht ja manifest ühe commit'ina `main` harusse. Kasuta harupea kontrolli, et mitte teiste muudatusi kaotada.
- GitHubi ühenduse blob/tree/commit/ref tööriistad võimaldavad atomaarset avaldamist. Loe tulemus samast commit'ist tagasi. Seejärel kontrolli avalikku ONS-i aadressi; serveri viieminutiline taimer peab olema eraldi paigaldatud. Ära nimeta GitHubi kirjutamist ONS-is avaldamiseks enne kontrolli.
- Serveri viieminutiline allalaadimine on paigaldatud ja 23. oktoobri pärislehega avalikult kontrollitud. Igapäevase koostamise ülesanne „Eilse päeva jamapäevik” on aktiivne: iga päev 08.00 Europe/Tallinn. Loe `AUTOMATION.md`. Ajastuse aktiveerimine ei tõenda jooksu tulemust; kontrolli iga kord GitHubi commit'i ja avalikku kuupäevaaadressi eraldi.

- Pildid: säilita avalehe `#pildid` pildilisa ja selle suurendatav vaade. Lisa uute päevade lugude juurde olemasolevad kontrollitud kuvatõmmised, kui need aitavad juhtumit mõista. Avalda ainult avaldamiseks sobiv pildifail: peida tundlik info failist endast, mitte CSS-iga. Ära lavasta ega genereeri veatõendi pähe kuvatõmmiseid. Märgi pildistamise aeg, kui see erineb loo päevast. Uue päeva pildid paiguta sama päeva kataloogi ja lisa manifesti; server lubab kuni 20 faili, kuni 2 MB faili ja kuni 10 MB päeva kohta. Kui sobivat pilti ei ole, avalda lugu ilma pildita.

- Sisupilt peab näitama konkreetset juhtumit (tõrge, veateade, probleemne vaade või selle lahendust selgitav võrdlus). Ära lisa päeviku enda kuvatõmmist sisupildi asemele. Avalehe kolm algset kuvatõmmist seostuvad Whitebophiri looga; säilita nende allkirjad ja seosed.

- Kasutaja tellis 24.10.2026 olemasoleva Whitebophiri loo sisupiltide paigutuse paranduse: kolm algset pilti peavad olema ka loo dialoogis, mitte ainult arhiivi avalehel. See üks visuaalne erand puudutab 23.10.2026 app.js-i ja style.css-i; loo faktid ja seisud säilivad. Serveris rakendatakse see käsitsi `server/install-story-images.py` abil, mis kontrollib vanu räsisid ja teeb varukoopia. Tulevaste päevade pildid paiguta kohe loo sisse.
