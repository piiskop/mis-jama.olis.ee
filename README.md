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

## Sisupiltide paigutuse ühekordne parandus

23. oktoobri Whitebophiri loo kolm kuvatõmmist on nüüd ka loo dialoogis ja avanevad suuremalt. Varem paigaldatud serveri päevakaitse ei kirjuta vana päeva üle. Värskenda oma kloon selle paranduse commit'ile ning käivita `sudo python3 server/install-story-images.py`. See kontrollib seniste failide SHA-256 väärtusi, teeb varukoopia `/var/backups/mis-jama-story-images/` alla ja asendab ainult 23. oktoobri `app.js` ning `style.css` failid. Seejärel käivita `sudo systemctl start mis-jama-update.service`. Kuni parandus pole serveris rakendatud, katkestab päevakaitse uue manifesti lugemise olemasoleva päeva erinevuse tõttu. Pärast paigaldust jätkab olemasolev taimer tavapärast tööd. Brauseris tee Ctrl+Shift+R.
