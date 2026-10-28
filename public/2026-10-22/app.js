'use strict';

const statusLabels = { open: 'Lahti', clarified: 'Selgunud', resolved: 'Korras' };
const stories = [
  {
    id: 'jatka', number: '01', service: 'ChatGPT', category: 'KASUTAJALIIDES', status: 'open',
    title: '„Jätka” ei viinud edasi.',
    description: 'Nupp oli aktiivne, aga nähtavat tulemust polnud. Veast teatamisel takerdus ka diagnostikafailide üleslaadimine.',
    lead: 'Tootepaneeli „Jätka” nupu vajutamine ei andnud oodatud nähtavat tulemust. Probleem kordus mitmes brauseris.',
    happened: 'Paneel ei sulgunud ega andnud selget märki, et järgmine samm oleks toimunud. Toode oli juba sõnumiväljal, mistõttu jäi ka nupu tegelik mõju arusaamatuks.',
    tried: ['Proovitud Brave’i tava- ja privaataknas ning Chrome’is.', 'Toe jaoks kogutud HAR ja konsooli veateated.', 'Diagnostika edastamisel ebaõnnestus nii HAR- kui ka TXT-faili üleslaadimine, sealhulgas väikese TXT-faili saatmine.'],
    state: '22. oktoobri seisuga ei olnud kasutaja jaoks toimiv lahendus kinnitatud. Ka tõrke tõendite edastamine tekitas omaette takistuse.',
    artwork: '<div class="mini-button">Jätka <small>↗</small></div><svg class="mini-cursor" viewBox="0 0 40 52" aria-hidden="true"><path d="M4 3 35 29 22 30 17 46Z" fill="#fcfbf2" stroke="#718565" stroke-width="2"/><path d="m22 30 7 14-7 4-6-15" fill="#fcfbf2" stroke="#718565" stroke-width="2"/></svg>'
  },
  {
    id: 'nextcloud', number: '02', service: 'Nextcloud', category: 'FAILID', status: 'open',
    title: 'Ühest kaustast sai kaks.',
    description: 'Androidis teisest rakendusest Nextcloudi jagades ilmusid kaustad topelt. Tavavaates seda ei juhtunud.',
    lead: 'Sama failiruum näitas eri teed pidi avades erinevat pilti: jagamise vaates olid kaustad kahekordselt.',
    happened: 'Topeltkirjed ilmusid Androidi teistest rakendustest Nextcloudi jagamisel. Nextcloudi tavavaates sama nähtust ei olnud.',
    tried: ['Juhtumit arutati GitHubi veateates.', 'Arendaja ei saanud probleemi enda keskkonnas korrata.', 'Täpsustamist ootasid SMB/CIFS-i ja kasutusviisiga seotud andmed.'],
    state: 'Veateate seis oli „needs info”. Püsivat parandust ega probleemi lõplikku lahendust ei olnud kinnitatud.',
    artwork: '<div class="folder-pair"><svg viewBox="0 0 80 64" aria-hidden="true"><path d="M4 16V8a4 4 0 0 1 4-4h24l9 10h30a4 4 0 0 1 4 4v39a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill="#cad6e7" stroke="#8b9fb9"/><path d="M4 20h71v37a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill="#edf2f7" stroke="#8b9fb9"/></svg><span class="equals-mark">=</span><svg viewBox="0 0 80 64" aria-hidden="true"><path d="M4 16V8a4 4 0 0 1 4-4h24l9 10h30a4 4 0 0 1 4 4v39a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill="#cad6e7" stroke="#8b9fb9"/><path d="M4 20h71v37a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" fill="#edf2f7" stroke="#8b9fb9"/></svg></div>'
  },
  {
    id: 'github', number: '03', service: 'GitHub', category: 'KOMMENTAARID', status: 'clarified',
    title: 'Kommentaar kadus. Või siis…',
    description: 'Pärast brauserikaardi taasavamist tundus kommentaar kadunud olevat. Üle vaadates leidus sama tekst hoopis kaks korda.',
    lead: 'Kommentaari saatmise järel sai brauserikaart suletud. Selle uuesti avamine tekitas mulje, et kirjutatu on kadunud.',
    happened: 'Asja üle vaadates selgus, et sama sisuga kommentaar oli avaldatud kaks korda. Kadumise asemel oli tekkinud topeltpostitus.',
    tried: ['Avatud suletud brauserikaart uuesti.', 'Kontrollitud kommentaare veateate juures.', 'Soovitatud üleliigne kommentaar kustutada ning veateade avatuks jätta.'],
    state: 'Segaduse põhjus sai selgemaks: kommentaar oli olemas, isegi topelt. Üleliigse koopia kustutamist ei olnud vestluses kinnitatud.',
    artwork: '<div class="comment-bubbles"><div class="comment-bubble"><span></span><span></span></div><div class="comment-bubble"><span></span><span></span></div></div>'
  },
  {
    id: 'motorola', number: '04', service: 'Motorola Edge 60', category: 'ASUKOHT', status: 'open',
    title: 'Telefon jäi vanasse kohta.',
    description: 'Vananenud GPS-koordinaatide mure jätkus. Toega suhtlemine jõudis järgmise tehnilise vastuse koostamiseni.',
    lead: 'Telefoni salvestatud asukoht ei vastanud tegelikule kohale. Sama vananenud asukoha probleem oli juba varem korduvalt esinenud.',
    happened: 'Moto Camera Pro fotode asukohaandmed jäid vanaks. Varasemates katsetes oli vale asukoht näha ka kaardirakenduses, seega puudutas mure enamat kui üht fotot.',
    tried: ['Varasemates katsetes puhastatud rakenduste ja asukohateenuste andmeid ning kontrollitud asukohaseadeid.', 'Probleem oli Motorola kasutajatoele edastatud.', '22. oktoobri õhtul arutatud, kuidas toele tehniliselt täpne vastus koostada.'],
    state: 'Püsiv lahendus ei olnud kinnitatud. Tehnilise vastuse koostamist arutati, kuid selle saatmist ega tulemust ei olnud veel teada.',
    artwork: '<div class="map-drawing"><div class="map-road"></div><div class="map-road"></div><svg viewBox="0 0 36 48" aria-hidden="true"><path d="M18 2A15 15 0 0 0 3 17c0 11 15 28 15 28s15-17 15-28A15 15 0 0 0 18 2Z" fill="#c69770" stroke="#a47b57"/><circle cx="18" cy="17" r="5" fill="#faeddb"/></svg><span class="map-clock">◷</span></div>'
  },
  {
    id: 'paypal', number: '05', service: 'PayPal', category: 'TEAVITUSED', status: 'resolved',
    title: 'See üks lugemata sõnum.',
    description: 'Sõnum oli juba avatud, kuid kellukese juures püsis oranž „1”. See tähis kadus pärast postkasti avamist.',
    lead: 'PayPal näitas üht lugemata sõnumit ka siis, kui vastav sõnum oli juba läbi vaadatud.',
    happened: 'Kellukese ja Inboxi juures püsis „1”, kuigi 1. oktoobri sõnum oli avatud. Kasutaja küsis, miks märge endiselt alles on.',
    tried: ['Avatud PayPali Inbox.', 'Vaadatud sõnum ja teavituse seis uuesti üle.', 'Kasutaja kinnitas, et märge oli juba kadunud.'],
    state: 'Korras. Lugemata sõnumi tähis kadus; lisaks pakutud sundvärskendamist ei läinud vaja.',
    artwork: '<div class="notification-drawing"><div class="bell-circle"><svg viewBox="0 0 32 38" fill="none" aria-hidden="true"><path d="M5 27h22l-4-6V13a7 7 0 0 0-14 0v8Z" fill="#dfe6ca" stroke="#899969" stroke-width="1.5"/><path d="M12 30a4 4 0 0 0 8 0M16 4V2" stroke="#899969" stroke-width="1.5"/></svg><span class="bell-one">1</span></div><span class="notify-arrow">→</span><span class="notify-zero">0</span></div>'
  },
  {
    id: 'spam', number: '06', service: 'E-post', category: 'RÄMPSPOST', status: 'resolved',
    title: 'Vähemalt üks asi sai märgitud.',
    description: 'Soovimatu kiri tuli rämpspostiks märkida. Õige nupp leidus Archive’i ja Delete’i vahel.',
    lead: 'Postkasti jõudnud Derila kiri vajas rämpspostiks märkimist.',
    happened: 'Kuvatõmmise järgi tuli üles leida rämpsposti märkimise nupp. See asus ülal tööriistaribal arhiveerimise ja kustutamise vahel.',
    tried: ['Leitud tööriistaribalt „Spam” nupp.', 'Kiri märgitud rämpspostiks.'],
    state: 'Tehtud. Kiri sai rämpspostiks märgitud. See on selle päeva lõpetatud toiming; edaspidiste kirjade filtreerimise tulemust siit ei järeldu.',
    artwork: '<div class="spam-drawing"><div class="envelope"></div><span class="notify-arrow">→</span><span class="spam-check">✓</span></div>'
  }
];

const solutionDetails = {"paypal": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Tehtud töövõte</h3><ol><li>Ava PayPali ülariba paremas osas teavituste kellukese menüü, mille juures on lugemata teadete arv.</li><li>Ava sealt <strong>Inbox (1)</strong> ning vaata postkasti ja teavituse loendurit uuesti.</li></ol><p><strong>Kontroll ja tulemus.</strong> Pärast Inboxi avamist kadus tähis „1”; kasutaja kinnitas kadumist. Sundvärskendamist ei läinud vaja.</p><p>See oli teavituse oleku taastumine selles juhtumis. Eraldi „märgi kõik loetuks” käsku ei kasutatud.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>", "spam": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Kuidas kiri rämpspostiks märgiti</h3><ol><li>Ava või vali soovimatu kiri.</li><li>Vajuta kirjavaate ülemisel tööriistaribal nuppu <strong>Spam</strong>; selles vaates asus see <strong>Archive</strong> ja <strong>Delete</strong> vahel.</li></ol><p><strong>Kontroll ja tulemus.</strong> Kiri märgiti rämpspostiks. See toiming ei tõesta, et kõik sama saatja tulevased kirjad automaatselt filtreeritakse.</p><p>Juhis kirjeldab kuvatõmmisel olnud kirjavaadet; rakenduse nime ei ole algallikast üheselt kinnitatud.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>", "github": "<section class=\"solution-detail\" aria-label=\"Lahenduskäigu täpsustus\"><h3>Kontroll enne kommentaari kordussaatmist</h3><ol><li>Ava sama GitHubi veateade uuesti ja vaata selle kommentaaride ajalugu.</li><li>Otsi enda viimast teksti enne selle uuesti saatmist. Selles juhtumis leidus sama tekst juba kaks korda.</li></ol><p><strong>Kontroll ja tulemus.</strong> Kommentaar polnud kadunud. Üleliigse koopia kustutamist soovitati, kuid kustutamise tulemust ei kinnitatud.</p><p style=\"font-size:.85em\">Lahenduskäik täpsustatud 28.10.2026 algallikate põhjal.</p></section>"};

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
    <section class="dialog-state"><h3>22. OKTOOBRI SEIS</h3><p>${escapeHTML(story.state)}</p></section>`;
  document.querySelector('#dialog-content').insertAdjacentHTML('beforeend', solutionDetails[story.id] || '');
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
  const imageIds = {"jatka": ["jatka-upload"], "nextcloud": ["nextcloud-report"], "github": ["github-comment"]}[id];
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
