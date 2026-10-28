'use strict';

const statusLabels = { open: 'Lahti', clarified: 'Selgunud', resolved: 'Korras' };
const stories = [
  {
    "id": "jatka",
    "service": "ChatGPT",
    "category": "KASUTAJALIIDES",
    "status": "open",
    "title": "„Jätka” jäi ikka samasse kohta.",
    "description": "Nupu tõrge sai ekraanisalvestusele. Toimivat parandust päeva lõpuks veel ei olnud.",
    "lead": "Eelmise päeva takistus jätkus: tootepaneeli „Follow up / Jätka” vajutamine ei viinud oodatud järgmise sammuni.",
    "happened": "Paneel jäi avatuks ega viinud sõnumi kirjutamiseni. Ekraanisalvestus näitas probleemi kasutajatoele nähtaval kujul.",
    "tried": [
      "Probleem salvestati ekraanivideona.",
      "Kontrolliti, et salvestus näitab just nupuvajutuse järel tekkivat takistust."
    ],
    "state": "Tõrke kirjeldamiseks oli parem tõend olemas. Parandust ega edukat järgmisele sammule jõudmist ei olnud kinnitatud.",
    "number": "01",
    "artwork": "<div class=\"mini-button\">Jätka ↗</div>"
  },
  {
    "id": "undo",
    "service": "ONLYOFFICE",
    "category": "TAGASIVÕTMINE",
    "status": "resolved",
    "title": "Tagasi sai. Edasi ka.",
    "description": "Ctrl+Z ja Ctrl+Y käitusid veidralt. Pärast faili uuesti avamist töötasid mõlemad.",
    "lead": "Valemi muutmise järel ei taastanud tagasivõtmine ja taastamine oodatud seisusid.",
    "happened": "Fast-režiimis ei taastunud muudatus Ctrl+Y abil. Strict-režiimis ei töötanud algul ka Ctrl+Z.",
    "tried": [
      "Vahetati koostöörežiim Stricti peale.",
      "Fail suleti ja avati uuesti.",
      "Kasutaja proovis mõlemat käsku ning kinnitas, et need töötavad."
    ],
    "state": "Kasutaja kinnitas mõlema käsu toimimist. See kinnitab selle korra taastumist, mitte püsiva tarkvaraparanduse paigaldamist.",
    "number": "02",
    "artwork": "<div class=\"mini-button\">Ctrl + Z</div>"
  },
  {
    "id": "valem",
    "service": "ONLYOFFICE",
    "category": "ARVUTAMINE",
    "status": "open",
    "title": "Valemil oli mitu vastust.",
    "description": "Hinnete arvutamise valemi kontroll takerdus veateadetesse. Kindlalt toimiv lõpptulemus jäi kinnitamata.",
    "lead": "Tabel pidi arvestama eri kaaludega hindeid ning tühjade lahtrite ja X-ide kokkulepitud väärtusi.",
    "happened": "Valemi parandamise ja tabeliviidete kontrollimise käigus ilmusid veateated ning tulemused ei olnud usaldusväärselt korratavad.",
    "tried": [
      "Kontrolliti tabeli viiteid ja valemi osi.",
      "Prooviti valemi lihtsustamist.",
      "Faili redigeerimise takistus kadus pärast sulgemist ja uuesti avamist, kuid see ei kinnitanud arvutuse õigsust."
    ],
    "state": "23. oktoobri lõpuks ei olnud kasutaja kinnitanud, et kokkuvõtte valem annab õige tulemuse. Veateate põhjust ei esitata siin tõestatud tarkvaraveana.",
    "number": "03",
    "artwork": "<div class=\"mini-button\">= ?</div>"
  },
  {
    "id": "paste",
    "service": "ChatGPT",
    "category": "LÕIKELAUD",
    "status": "resolved",
    "title": "Pilt ei kleepunud. Siis kleepus.",
    "description": "Ctrl+V ei toonud vestlusse midagi. Ctrl+Shift+R järel sai pilti jälle kleepida.",
    "lead": "Pildi vestlusse kleepimine ei andnud nähtavat tulemust ka pärast korduvat proovimist.",
    "happened": "Tavaline Ctrl+V ei lisanud pilti sõnumisse. Kasutaja täpsustas hiljem, millise klahvikombinatsiooni järel kleepimine taastus.",
    "tried": [
      "Prooviti pilti vestlusse kleepida.",
      "Tehti Ctrl+Shift+R abil lehe sundvärskendus.",
      "Kasutaja parandas varasema klahvikombinatsiooni kirjeldust: toimiv võte oli Ctrl+Shift+R."
    ],
    "state": "Kleepimine taastus kasutaja kinnituse järgi pärast sundvärskendust. Tõrke algpõhjust ei olnud kindlaks tehtud.",
    "number": "04",
    "artwork": "<div class=\"mini-button\">Ctrl + V</div>"
  },
  {
    "id": "wbo",
    "service": "Whitebophir",
    "category": "TAHVLID",
    "status": "clarified",
    "title": "Tühi vaade ei tähendanud tühja tahvlit.",
    "description": "Tahvli sisu leidus õiges eelvaates. Viimati kasutatud tahvlite leidmise küsimus jäi eraldi teemaks.",
    "lead": "Enda loodud tahvli avamisel paistis sisu puuduvat ning viimaste tahvlite nimekiri tekitas segadust.",
    "happened": "Kontrollimisel selgus aadresside erinevus: kasutatud tahvlivaade ei näidanud oodatud sisu, kuid õige eelvaade näitas seda.",
    "tried": [
      "Võrreldi eri aadresse ja vaateid.",
      "Kontrolliti sisu õiges eelvaates.",
      "Eristati tahvli sisu säilimist viimaste tahvlite nimekirja käitumisest."
    ],
    "state": "Konkreetse tahvli sisu säilimine sai selgemaks. Sellest ei järeldu, et viimaste tahvlite nimekirja või teiste kasutajate tahvlite küsimused oleksid lahendatud.",
    "number": "05",
    "artwork": "<div class=\"mini-button\">tahvel ↗</div>"
  },
  {
    "id": "paevik",
    "service": "Jamapäevik",
    "category": "AVALDAMINE",
    "status": "clarified",
    "title": "Jamad said oma aadressi.",
    "description": "mis-jama.olis.ee jõudis oma serverisse ja HTTPS hakkas tööle. Igapäevane lisamine oli veel pooleli.",
    "lead": "Lõpetatud päevade arhiiv sai aadressi, mis loeb välja „mis jama oli see?”.",
    "happened": "Domeeni nimelahendus sai korda, veebifailid paigaldati ONS-i Nginxi alla ning HTTPS-i sertifikaat väljastati edukalt.",
    "tried": [
      "Seadistati domeeni A-kirje.",
      "Laaditi staatilised veebifailid serverisse ja kontrolliti Nginxi vastust.",
      "Seadistati HTTPS ning avati nii arhiiv kui ka 22. oktoobri leht avaliku aadressi kaudu."
    ],
    "state": "23. oktoobri lõpuks olid avalik sait ja HTTPS olemas. Igapäevane automaatne koostamine ja avaldamine ei olnud selle päeva lõpuks veel kinnitatud.",
    "number": "06",
    "artwork": "<div class=\"mini-button\">olis.ee</div>"
  }
];

const solutionDetails = {"undo": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Taastunud Undo ja Redo: tehtud sammud</h3><ol><li>Vali koostöörežiimiks <strong>Strict</strong>. Alguses soovitatud tee oli <strong>Collaboration → Co-editing Mode → Strict</strong>. Sama päeva hilisemas vaates kinnitati asukoht <strong>File → Advanced Settings → Co-editing mode → Strict</strong>.</li><li>Sulge töövihik ja ava see uuesti.</li><li>Proovi muudatust tagasi võtta klahvidega <strong>Ctrl+Z</strong> ning seejärel taastada klahvidega <strong>Ctrl+Y</strong>.</li></ol><p><strong>Kontroll ja tulemus.</strong> Kasutaja kinnitas pärast uuesti avamist mõlema käsu toimimist. Eraldi soovitatud kontrollnäide oli lahtri muutmine 123 → 456: Ctrl+Z peaks näitama 123 ja Ctrl+Y uuesti 456.</p><p>Strict üksi ei olnud tõestatud parandus: tagasivõtmine tõrkus algul ka selles režiimis. Kinnitatud oli toimimine pärast faili uuesti avamist.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>", "paste": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Kuidas pildi kleepimine taastati</h3><ol><li>Ava ChatGPT vestlus, kus lõikelaual oleva pildi kleepimine ei anna tulemust.</li><li>Vajuta <strong>Ctrl+Shift+R</strong> ja lase lehel uuesti laadida.</li><li>Proovi pilti uuesti sõnumiväljale kleepida. Kontrolli enne saatmist, kas sõnumile tekkis pildi eelvaade.</li></ol><p><strong>Kontroll ja tulemus.</strong> Kasutaja kinnitas kleepimise taastumist just Ctrl+Shift+R järel. Ta parandas varasema klahvikombinatsiooni kirjelduse.</p><p>See oli sundvärskendusega taastunud toimimine, mitte tõend kleepimisvea püsivast parandusest.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>", "valem": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Mis taastati ja mis jäi lahti</h3><ol><li>Töövihiku redigeerimist takistanud seansi puhul sulge fail ja ava see uuesti.</li><li>Kontrolli seejärel eraldi, kas faili saab muuta ja kas arvutus annab oodatud tulemuse.</li></ol><p><strong>Kontroll ja tulemus.</strong> Uuesti avamine taastas redigeerimise, kuid 23. oktoobril ei kinnitatud kokkuvõtte valemi õiget tulemust. Redigeeritav fail ja õige arvutus on kaks eraldi kontrolli.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>", "wbo": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Mida aadresside võrdlus selgitas</h3><ol><li>Võrdle avatud tahvli aadressi selle tahvli varasema lingiga; tühi joonistusala üksi ei tõenda sisu kustumist.</li><li>Selle juhtumi õiges eelvaates olid ratsionaalarvude märkmed ja joonised nähtavad. Võrdle loo kolme algset kuvatõmmist: tühi vaade, vale eelvaate veateade ja sisuga eelvaade.</li></ol><p><strong>Kontroll ja tulemus.</strong> Sisu olemasolu eelvaates kinnitati. Viimaste tahvlite loendi toimimist ei taastatud.</p><p>Algvestluse täpset toimivat URL-mustrit ei õnnestunud taastada. Seetõttu ei esitata oletuslikku /preview/-aadressi lahendusena.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>", "paevik": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Veebiserveri ja HTTPS-i konkreetsed osad</h3><ol><li>Domeeni A-kirje pidi suunama ONS-i serverile. Staatiliste failide veebijuur oli <code>/var/www/mis-jama.olis.ee</code> ja Nginxi saidiseadistus <code>/etc/nginx/sites-available/mis-jama.olis.ee</code>.</li><li>Nginxi seadistuse kontrolli käsk: <pre><code>sudo nginx -t</code></pre></li><li>Pärast HTTP-saidi seadistamist väljastati sertifikaat ja lisati HTTPS-i suunamine käsuga <pre><code>sudo certbot --nginx -d mis-jama.olis.ee --redirect</code></pre></li><li>Ava HTTPS-i kaudu nii arhiivi avaleht kui ka päeva aadress ja kontrolli mõlema sisu.</li></ol><p><strong>Kontroll ja tulemus.</strong> Arhiiv ja 22. oktoobri leht avanesid avaliku HTTPS-aadressi kaudu.</p><p>Need on selle paigalduse taastatud konkreetsed osad, mitte täielik juhend tühja serveri seadistamiseks. 23. oktoobri lõpuseis ei kinnitanud veel igapäevase koostamise automaatikat.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>"};

const grid = document.querySelector('#story-grid');
const search = document.querySelector('#story-search');
const empty = document.querySelector('#empty-state');
const count = document.querySelector('#result-count');
const dialog = document.querySelector('#story-dialog');
let activeFilter = 'all';
let lastTrigger = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function normalize(value) {
  return value.toLocaleLowerCase('et').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function renderStories() {
  const query = normalize(search.value.trim());
  const visible = stories.filter(story => (activeFilter === 'all' || story.status === activeFilter) && normalize([story.service, story.title, story.description, story.category, story.happened, statusLabels[story.status]].join(' ')).includes(query));
  grid.innerHTML = visible.map(story => `<article class="story-card" id="lugu-${story.id}" aria-labelledby="title-${story.id}">
    <div class="card-art art-${story.id}" aria-hidden="true"><span class="art-number">/ ${story.number}</span><span class="art-category">${escapeHTML(story.category)}</span>${story.artwork}</div>
    <div class="card-copy"><span class="card-service">${escapeHTML(story.service)}</span><h3 id="title-${story.id}">${escapeHTML(story.title)}</h3><p class="card-description">${escapeHTML(story.description)}</p>
    <div class="card-bottom"><span class="status status-${story.status}">${statusLabels[story.status]}</span><button class="story-open" data-open-story="${story.id}" aria-label="Loe lugu: ${escapeHTML(story.service)}">Loe lugu <span aria-hidden="true">↗</span></button></div></div></article>`).join('');
  empty.hidden = visible.length !== 0;
  count.textContent = `Näitan ${visible.length} lugu ${stories.length}-st`;
}

function setFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll('.filter').forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  renderStories();
}

function openStory(id, trigger) {
  const story = stories.find(item => item.id === id);
  if (!story) return;
  lastTrigger = trigger;
  document.querySelector('#dialog-content').innerHTML = `<div class="dialog-meta"><span>${escapeHTML(story.service)}</span><span class="status status-${story.status}">${statusLabels[story.status]}</span></div>
    <h2 id="dialog-title">${escapeHTML(story.title)}</h2><p class="dialog-lead">${escapeHTML(story.lead)}</p>
    <section class="dialog-section"><h3>Mis juhtus?</h3><p>${escapeHTML(story.happened)}</p></section>
    <section class="dialog-section"><h3>Mida tehti?</h3><ul>${story.tried.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></section>
    <section class="dialog-state"><h3>23. OKTOOBRI SEIS</h3><p>${escapeHTML(story.state)}</p></section>`;
  document.querySelector('#dialog-content').insertAdjacentHTML('beforeend', solutionDetails[story.id] || '');
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  const imageIds = {"jatka": ["jatka-upload"], "paste": ["paste-check"], "wbo": ["wbo-empty", "wbo-error", "wbo-content"]}[id];
  if (imageIds) addStoryImages(imageIds);

}

let storyImagesPromise;
async function addStoryImages(imageIds) {
  const section = document.createElement('section');
  section.className = 'story-images';
  section.innerHTML = '<h3>Juhtumi kuvatõmmised</h3><p class="image-loading" role="status">Laadin pilte…</p>';
  document.querySelector('#dialog-content .dialog-state').before(section);
  try {
    storyImagesPromise ||= fetch('../', { cache: 'no-cache' }).then(response => {
      if (!response.ok) throw new Error('Pildilisa ei avanenud');
      return response.text();
    }).then(html => {
      const source = new DOMParser().parseFromString(html, 'text/html');
      return source;
    }).catch(error => { storyImagesPromise = null; throw error; });
    const source = await storyImagesPromise;
    const images = imageIds.map(id => {
      const card=source.querySelector('#pilt-'+id);
      const image=card?.querySelector('img');
      const caption=card?.querySelector('figcaption p');
      const title=card?.querySelector('h3');
      if (!image || !caption || !title || !/^data:image\/(png|jpeg);base64,/.test(image.getAttribute('src'))) throw new Error('Pilt puudub');
      return {src:image.getAttribute('src'),alt:image.alt,title:title.textContent,caption:caption.textContent};
    });
    if (!section.isConnected) return;
    section.querySelector('.image-loading').remove();
    images.forEach(item => {
      const figure = document.createElement('figure');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'story-image-open';
      button.setAttribute('aria-label', 'Suurenda: ' + item.title);
      button.setAttribute('aria-haspopup', 'dialog');
      const image = document.createElement('img');
      image.src = item.src; image.alt = item.alt; image.loading = 'lazy';
      button.append(image);
      const hint = document.createElement('span'); hint.textContent = 'Vaata suuremalt ↗'; button.append(hint);
      button.addEventListener('click', () => showStoryImage(item, button));
      const caption = document.createElement('figcaption');
      const title = document.createElement('strong'); title.textContent = item.title;
      const detail = document.createElement('p'); detail.textContent = item.caption;
      caption.append(title, detail); figure.append(button, caption); section.append(figure);
    });
  } catch {
    if (section.isConnected) section.querySelector('.image-loading').innerHTML = 'Pildid ei laadinud. <a href="../#pildid">Ava juhtumi pildilisa ↗</a>';
  }
}

function showStoryImage(item, trigger) {
  const viewer = document.createElement('dialog');
  viewer.className = 'story-image-dialog';
  viewer.setAttribute('aria-label', item.title);
  const close = document.createElement('button'); close.type = 'button'; close.className = 'story-image-close'; close.textContent = 'Sulge pilt ×';
  close.addEventListener('click', () => viewer.close());
  const image = document.createElement('img'); image.src = item.src; image.alt = item.alt;
  const caption = document.createElement('p'); caption.textContent = item.caption;
  viewer.append(close, image, caption); document.body.append(viewer);
  viewer.addEventListener('close', () => { viewer.remove(); trigger.focus({ preventScroll: true }); }, { once: true });
  viewer.showModal();
}

function closeStory() { dialog.close(); }

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
document.querySelectorAll('[data-summary-filter]').forEach(link => link.addEventListener('click', () => {
  search.value = '';
  setFilter(link.dataset.summaryFilter);
}));
search.addEventListener('input', renderStories);
document.querySelector('#reset-search').addEventListener('click', () => {
  search.value = '';
  setFilter('all');
  search.focus();
});
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-open-story]');
  if (trigger) openStory(trigger.dataset.openStory, trigger);
});
document.querySelector('.illustration-button').addEventListener('click', event => {
  event.preventDefault();
  openStory('jatka', event.currentTarget);
});
document.querySelector('.close-dialog').addEventListener('click', closeStory);
document.querySelector('.dialog-done').addEventListener('click', closeStory);
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus({ preventScroll: true });
});
let startedOutside = false;
dialog.addEventListener('pointerdown', event => { startedOutside = event.target === dialog; });
dialog.addEventListener('click', event => {
  if (event.target !== dialog || !startedOutside) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeStory();
});

renderStories();
