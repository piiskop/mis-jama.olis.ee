# Lugude lahenduskäikude täpsustus · 28.10.2026

Kasutaja tellitud täpsustus puudutab 22.–27. oktoobri 24 olemasolevat lugu. Kahekümne loo juurde lisati loo sees eraldi lahenduskäigu, ajutise töövõtte või diagnostika ja tulemuse kirjeldus. Algne päeva lõpu seis säilib. Hilisemaid sündmusi ei esitata varasema päeva tulemusena.

| Päev | Täiendatud lood | Konkreetne täiendus |
|---|---|---|
| 22.10 | PayPal, rämpspost, GitHubi kommentaar | Inboxi menüütee; Spam-nupu asukoht ja tulemus; kommentaari olemasolu kontroll enne kordussaatmist |
| 23.10 | Undo/Redo, pildi kleepimine, valem, Whitebophir, päeviku avaldamine | Stricti menüüteed ja uuesti avamine; Ctrl+Shift+R; redigeerimise ja arvutuse eraldi kontroll; eelvaate täpse URL-mustri teabelünk; Nginxi ja Certboti taastatud käsud |
| 24.10 | Valemiriba, DCIM/MTP, Brave 4K | Tühi valemiriba + Ctrl+V; failide olemasolu kontroll telefonis; Quality → 1080p ja puhvri tulemus |
| 25.10 | Ühine töövihik | Algsest ja parandatud töövihikust kontrollitud Q2/Q12/AB2 valemid, 39 struktureeritud viidet, 5XX/5555/55 käsitlus, eraldi üleslaadimine ja ühiskasutuse kontroll |
| 26.10 | Explorer, USB-kaart, Android Auto | Klõpsuga fookuse taastamine; kaablikatse piir; Peugeot NAC telefoni sümboliga menüünupp umbes 10 sekundit ja taasühendamine |
| 27.10 | OBS, SMPlayer, kõrvaklapid, ChatGPT vastus, versiooniajalugu | OBS-i ja Interacti katse tulemus; xdg-mime/gio kontrollkäsud ja kinnitamata seadistusettepanek; pw-top ERR ja UB500; nurjunud värskenduskatsed; raporteerimine ja kinnitamata kõrvutamise ettepanek |

Nelja loo senised diagnoosi- ja katsekirjeldused jäid muutmata: 22.10 ChatGPT „Jätka”, Nextcloudi topeltkaustad ja Motorola asukoht ning 23.10 „Jätka”. Nende jaoks ei taastatud uut konkreetset lahendussammu; neid ei märgitud lahendatuks.

## Allikakontroll

- Algvestlustest taastati tegevuste kirjeldused ja kasutaja kinnitused. Assistendi soovitus ja kasutaja tehtud katse on tekstis eristatud.
- Töövihiku valemeid võrreldi 25.10 öösel üles laaditud algse ja parandatud XLSX-i XML-andmetest. Avaldatud on ainult arvutusloogika; algseid töövihikuid, õpilaste nimesid ja tulemusi ei lisata hoidlasse.
- Whitebophiri toimiva eelvaate täielik URL-muster ei taastunud. MTP taastumise täpset toimingut ei kinnitatud. Kumbagi puuduvat lahendussammu ei oletata.
- Varasemaid pilte ja nende viiteid ei muudetud.

## Paigaldamine

Serveri hetktõmmiste kaitse peatab automaatse uuenduse, kuni kuue olemasoleva päevafaili tellitud täpsustus on paigaldatud. `server/install-story-details.py` kontrollib kõik lähte- ja sihtfailid enne kirjutamist, kasutab uuendajaga sama lukku, teeb varukoopiad ning taastab juba asendatud failid vea korral. Uus manifest kirjeldab samu täpsustatud faile.

Kontrollitud: JavaScripti süntaks, piltide muutumatus, paigaldamine, korduskäivitus, ootamatu kohaliku muudatuse korral katkestamine enne kirjutamist ning mitme faili paigaldamisel tõrke korral taastamine. Avalik server muutub alles käsitsi paigaldamise järel; GitHubi commit ei ole avaliku lehe nähtavuskontroll.
