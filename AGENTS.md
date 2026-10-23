# Jamapäeviku avaldamine

- Kirjuta eesti keeles ja säilita hele kujundus. Allkiri: `peacecop kalmer:`.
- Host on `https://mis-jama.olis.ee/`, pealkiri „Mis jama oli see?”. Igal lõpetatud päeval on oma kuupäevaga aadress.
- Uue päeva sisu põhineb ainult selle päeva kinnitatud vestlustel. Leia allikad Personal Contexti kaudu, vajadusel loe vastavad Library failid. Ära avalda paroole, võtmeid, isiklikke kontaktandmeid, õpilaste tuvastatavat infot ega privaatseid piletinumbreid.
- Ära mõtle juhtumeid, lahendusi ega tulemusi välja. Kui päeva kohta ei saa piisavat kontrollitud infot, ära avalda sisutut või oletuslikku päeva; teata takistusest.
- Vanad `public/YYYY-MM-DD/` kataloogid on lõpetatud hetktõmmised: ära neid muuda ega kustuta. Hilisemad arengud lähevad uue päeva kokkuvõttesse.
- Lisa uus päev koos kõigi oma failidega ning säilita vanad lingid `public/index.html` failis.
- Uuenda `public/manifest.json` pikkused ja SHA-256 väärtused. Skeem on `build-manifest.py` failis. Avalda uue päeva failid, arhiivi avaleht ja manifest ühe commit'ina `main` harusse. Kasuta harupea kontrolli, et mitte teiste muudatusi kaotada.
- GitHubi ühenduse blob/tree/commit/ref tööriistad võimaldavad atomaarset avaldamist. Loe tulemus samast commit'ist tagasi. Seejärel kontrolli avalikku ONS-i aadressi; serveri viieminutiline taimer peab olema eraldi paigaldatud. Ära nimeta GitHubi kirjutamist ONS-is avaldamiseks enne kontrolli.
- Igapäevane ajastus pole veel seadistatud. Ära väida, et automaatika töötab ilma salvestatud ajastuse ja kontrollitud serveripoolse uuenduseta.
