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

22.10.2026 kokkuvõte on ONS-is avalik ja HTTPS töötab. Serveri allalaadimistaimer ning ChatGPT igapäevane koostamisülesanne vajavad enne kasutuselevõttu eraldi paigaldamist ja prooviuuendust. Hoidla olemasolu ei tähenda nende käivitumist.
