# Mis jama oli see?

Avalik jamapäevik: https://mis-jama.olis.ee/

Veebilehte teenindab ONS-i Nginx. See hoidla sisaldab avalikke päevakokkuvõtteid ning serveri allalaadimisprogrammi. GitHub Actionsit ega GitHub Pagesi ei kasutata.

## Avaldamine

1. Lisa uus lõpetatud päev kataloogi `public/YYYY-MM-DD/`, koos oma HTML-i, stiilide ja skriptidega.
2. Lisa avalehele `public/index.html` selle päeva link, säilitades varasemad lingid.
3. Käivita `python3 build-manifest.py`.
4. Salvesta kõik ühe commit'ina harusse `main`.

Varasemaid kuupäevakatalooge ei muudeta. Server kontrollib SHA-256 räsisid, keeldub varasema päeva muudatustest ning avaldab avalehe alles pärast uute päevade edukat allalaadimist. Korduskäivitus ei dubleeri päevi.

`server/` on ühekordselt paigaldatav kood. Taimer laadib alla ainult `public/` faile ega uuenda või käivita hoidlast programmikoodi.

## Seis

22. ja 23.10.2026 kokkuvõtted on ONS-is avalikud ning HTTPS töötab. Serveri viieminutiline allalaadimistaimer paigaldati 24.10.2026; tegelik prooviuuendus lisas 23. oktoobri lehe automaatselt ja see avati avaliku HTTPS-aadressi kaudu.

Igapäevase koostamisülesande loomise katse 24.10.2026 ebaõnnestus: konto piirang on viis ajastatud ülesannet ja kõik kohad on kasutusel. Päeviku koostamise ajastust EI LOODUD. Kavandatud aeg on iga päev kell 08.00 Europe/Tallinn. Jätkamiseks peab kasutaja valima, millise olemasoleva ülesande peatada. Tööjuhis on failis `AUTOMATION.md`.

## Lugude sisupiltide ühine paigaldus

Pildid on ette valmistatud kuue loo sisse mõlemal päeval, allkirjade ja suurendusvaatega. Kõik 12 lugu on üle vaadatud: täpne seis on failis IMAGE-AUDIT.md. See ei tähenda, et kõik lood oleksid piltidega valmis.

Serveris värskenda kloon selle paranduse commit'ile, käivita `sudo python3 server/install-story-images.py` ja seejärel `sudo systemctl start mis-jama-update.service`. Ühine paigaldaja sobib nii algse versiooni kui ka varasema Whitebophiri paranduse peale. See kontrollib kõiki seniseid faile enne muutmist, teeb varukoopia ning asendab ainult mõlema päeva app.js ja style.css failid. Tundmatu kohaliku muudatuse korral katkestab enne kirjutamist. Kuni parandus pole rakendatud, ei lase vana päevakaitse muutunud päevade manifestiga uuendust läbi. Pärast paigaldust jätkab taimer tööd. Brauseris Ctrl+Shift+R.
