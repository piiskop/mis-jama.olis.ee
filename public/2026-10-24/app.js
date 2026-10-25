'use strict';

const statusLabels = { open: 'Lahti', clarified: 'Selgunud', resolved: 'Korras' };
const stories = [
  {
    "id": "valem",
    "service": "ONLYOFFICE",
    "category": "LÕIKELAUD",
    "status": "open",
    "title": "Valemiriba tahtis enne tühjaks saada.",
    "description": "Tühja valemiribasse kleepimine töötas. Olemasoleva valemi asendamine rikkus sisu.",
    "lead": "Desktop Editors 10.0.0.169 Windowsi exe-versioonis ei käitunud valemi asendamine ootuspäraselt.",
    "happened": "Kasutaja kinnitas, et Ctrl+V toimis pärast valemiriba tühjendamist. Olemasoleva valemiga ribale kleepimisel läks sisu valeks.",
    "tried": [
      "Valemiriba tühjendati enne kleepimist.",
      "Kontrolliti programmi täpset versiooni ja paigaldajat.",
      "Kasutaja palus koostada veaaruande. Tagasivõtmise ja taastamise toimimist kinnitas ta eraldi."
    ],
    "state": "Tühjendamine oli kinnitatud töövõte. Valemi otse asendamise viga jäi lahendamata; Undo ja Redo toimimine ei tõesta kleepimisvea parandamist. Allikas: kasutaja kinnitused 24.10 kell 03.35–03.50 Eesti aja järgi.",
    "number": "01",
    "artwork": "<div class=\"mini-button\">Ctrl + V</div>"
  },
  {
    "id": "mtp",
    "service": "Windows · Motorola",
    "category": "FAILIVAADE",
    "status": "clarified",
    "title": "Tühi DCIM ei tähendanud kadunud faile.",
    "description": "Windowsi MTP-vaade näitas telefonikausta ajutiselt tühjana. Telefonis olid failid alles.",
    "lead": "Telefoni failide vaatamine arvutist tekitas kahtluse, kas kausta sisu on säilinud.",
    "happened": "Motorola Edge 60 DCIM-kaust paistis Windowsi MTP-ühenduses ajutiselt tühi. Kasutaja kinnitas, et telefonis olid failid alles ja ühendus taastus.",
    "tried": [
      "Võrreldi arvuti failivaadet telefonis nähtava sisuga.",
      "Ühendus taastus; otse telefonis ümbernimetamine ei olnud võimalik."
    ],
    "state": "Failide säilimine ja ühenduse taastumine olid kasutaja kinnitatud. Tühja vaate algpõhjus ning ümbernimetamise takistus jäid selgitamata. Allikas: kasutaja kinnitus 24.10 kell 02.17 Eesti aja järgi.",
    "number": "02",
    "artwork": "<div class=\"mini-button\">DCIM ↗</div>"
  },
  {
    "id": "brave",
    "service": "Brave · YouTube",
    "category": "VIDEO",
    "status": "open",
    "title": "4K jäi jälle laadimisringi.",
    "description": "2160p-esitus seiskus korduvalt. 1080p andis toimiva ajutise väljapääsu.",
    "lead": "Linuxi Brave’is kordus kõrge eraldusvõimega video puhverdamise tõrge ka pärast brauseri taaskäivitamist.",
    "happened": "24. oktoobri testiaruandes on kirjas korduv seiskumine, laadimisring ja Buffer Health: 0.00 s. Paigaldatud Brave’i versioon oli 1.98.60.",
    "tried": [
      "Laaditi leht uuesti ja prooviti 1080p-esitust: video mängis sujuvalt ning puhver kasvas ligikaudu 82 sekundini.",
      "Uuendati filtriloendeid, kuid paranemine jäi ajutiseks.",
      "Prooviti uuesti pärast Brave’i taaskäivitamist; 4K-tõrge kordus."
    ],
    "state": "1080p töötas ajutise lahendusena. 4K-probleemi kadumist ei kinnitatud. 2160p katsed kasutasid VP9 ja 1080p katse AV1 koodekit, mistõttu eraldusvõime ja koodeki mõju ei saa eraldi järeldada. Allikas: 24.10 testiaruanne brave_youtube_4k_report.md, salvestatud kell 23.52 Eesti aja järgi.",
    "number": "03",
    "artwork": "<div class=\"mini-button\">4K …</div>"
  }
];

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
    <section class="dialog-state"><h3>24. OKTOOBRI SEIS</h3><p>${escapeHTML(story.state)}</p></section>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');


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
  openStory('brave', event.currentTarget);
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
