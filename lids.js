// Artwork, detail pages, and precise coordinates come from Pokémon Local Acts.
// The order is a suggested visit sequence; Google Maps chooses the roads.
const lids = [
  {name:'Utazu',prefecture:'Kagawa',lat:34.3134259,lng:133.8075257,image:'46149907aafef8ebbb532d3adedfc0a6',page:97},
  {name:'Otoyo',prefecture:'Kōchi',lat:33.749067,lng:133.684166,image:'05938aa1104a2226b71dbc2b1e6de194',page:392},
  {name:'Motoyama',prefecture:'Kōchi',lat:33.75877,lng:133.59448,image:'9c0a595989dd526afbd07bf111d7a2d3',page:452},
  {name:'Kami',prefecture:'Kōchi',lat:33.695608,lng:133.874784,image:'9b80e14141a8c41fc519beaa1bde69f8',page:390},
  {name:'Toyo',prefecture:'Kōchi',lat:33.54316884,lng:134.29495896722574,image:'299ea9629aaed7f41bf1554d2a09b05a',page:437},
  {name:'Muroto',prefecture:'Kōchi',lat:33.325698,lng:134.195181,image:'d9bd03a57b3501b93226b157abadbb2d',page:432},
  {name:'Nahari',prefecture:'Kōchi',lat:33.425249,lng:134.017781,image:'9326f1ab7b66840ba918c10e7c8478b2',page:391},
  {name:'Yasuda',prefecture:'Kōchi',lat:33.47986,lng:133.99983,image:'902cc23866cd95b207c0938bbefff0dd',page:451},
  {name:'Aki',prefecture:'Kōchi',lat:33.5043207,lng:133.9065445,image:'551bad185b3f9a9d17c5f6f40d7febfc',page:433},
  {name:'Konan',prefecture:'Kōchi',lat:33.534367,lng:133.75346,image:'c1359eed647d0b370136b487d0854b70',page:436},
  {name:'Kochi',prefecture:'Kōchi',lat:33.56701662,lng:133.5431367,image:'c788095c5594cd56004ce5193f87f011',page:449},
  {name:'Hidaka',prefecture:'Kōchi',lat:33.5335561,lng:133.3712561,image:'4ac408636042cae5deaff75207b9bf30',page:393},
  {name:'Niyodogawa',prefecture:'Kōchi',lat:33.561104,lng:133.129433,image:'b616658313fb3050e2608e53805bbe69',page:453},
  {name:'Tsuno',prefecture:'Kōchi',lat:33.476856,lng:133.004184,image:'7fc86d8a52fce05b93042fe1a127342a',page:394},
  {name:'Susaki',prefecture:'Kōchi',lat:33.39238098,lng:133.2926446,image:'c4bd71337c16e241b3b9203a89f970e8',page:434},
  {name:'Mihara',prefecture:'Kōchi',lat:32.922536,lng:132.83982,image:'207a12127b5a99f94f0fa04d69543a4a',page:396},
  {name:'Sukumo',prefecture:'Kōchi',lat:32.915754,lng:132.712575,image:'d0827223105f6648da72d7595907c786',page:435},
  {name:'Otsuki',prefecture:'Kōchi',lat:32.767739,lng:132.627259,image:'31ea84ec8f10061d987ef8d7fc15c1da',page:395},
  {name:'Tosashimizu',prefecture:'Kōchi',lat:32.791142,lng:132.862367,image:'3ab25d9876c61cc403ff6fd8bb3987c8',page:450}
];

const imageUrl = lid => `https://local.pokemon.jp/img/p/manhole/${lid.image}_l.png`;
const sourceUrl = lid => `https://local.pokemon.jp/en/manhole/desc/${lid.page}/?is_modal=1`;
const placeUrl = lid => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lid.lat},${lid.lng}`)}`;
const coordinates = lid => `${lid.lat},${lid.lng}`;
const overviewId = '1vFhuouiMc7A9emfC47ubvwCRfH1UN_0';
const overviewEmbedUrl = `https://www.google.com/maps/d/embed?mid=${overviewId}&ehbc=2E312F`;
const overviewUrl = `https://www.google.com/maps/d/viewer?mid=${overviewId}`;
const embedPlaceUrl = lid => `https://www.google.com/maps?q=${coordinates(lid)}&language=en&z=15&output=embed`;
const search = document.getElementById('lid-search');
const list = document.getElementById('lid-list');
const resultCount = document.getElementById('result-count');
const selectedCard = document.getElementById('selected-card');
const routeLegs = document.getElementById('route-legs');
const mapFrame = document.getElementById('map');
const filters = [...document.querySelectorAll('.filter')];
let currentFilter = 'all';
let selected = null;

function visibleLids() {
  const query = search.value.trim().toLocaleLowerCase();
  return lids.filter(lid => (currentFilter === 'all' || lid.prefecture === currentFilter) &&
    `${lid.name} ${lid.prefecture}`.toLocaleLowerCase().includes(query));
}

function renderList(preserveScroll = false) {
  const previousScroll = preserveScroll ? list.scrollTop : 0;
  const matching = visibleLids();
  resultCount.textContent = `${matching.length} place${matching.length === 1 ? '' : 's'} to discover`;
  list.innerHTML = matching.length ? matching.map(lid => `
    <button class="lid-item ${lid === selected ? 'active' : ''}" data-page="${lid.page}" type="button" aria-pressed="${lid === selected}">
      <img src="${imageUrl(lid)}" alt="${lid.name} Poké Lid artwork" loading="lazy">
      <span class="lid-item-copy"><strong>${lid.name}</strong><small>${lid.prefecture} Prefecture · Quagsire</small></span>
      <span class="lid-item-num">${String(lids.indexOf(lid) + 1).padStart(2,'0')}</span>
    </button>`).join('') : '<p class="empty-state">No lids found. Try another town or prefecture.</p>';
  for (const button of list.querySelectorAll('.lid-item')) {
    button.addEventListener('click', () => selectLid(lids.find(lid => lid.page === Number(button.dataset.page))));
  }
  list.scrollTop = previousScroll;
}

function renderSelected() {
  if (!selected) {
    selectedCard.innerHTML = `<img src="assets/quagsire/quagsire-official.webp" alt="Quagsire official artwork">
      <div class="selected-copy"><span class="selected-overline">GOOGLE MY MAPS · KŌCHI</span>
        <h3>Kōchi overview</h3><p>18 Kōchi lids. Select a lid to focus its location; Utazu is in Kagawa.</p>
        <div class="selected-actions"><a href="${overviewUrl}" target="_blank" rel="noopener noreferrer">Open Google map ↗</a></div>
      </div>`;
    return;
  }
  selectedCard.innerHTML = `<img src="${imageUrl(selected)}" alt="${selected.name} Poké Lid artwork">
    <div class="selected-copy"><span class="selected-overline">LID ${String(lids.indexOf(selected)+1).padStart(2,'0')} / 19 · ${selected.prefecture.toUpperCase()}</span>
      <h3>${selected.name}</h3><p>Quagsire is waiting here.</p>
      <div class="selected-actions"><a href="${placeUrl(selected)}" target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href="${sourceUrl(selected)}" target="_blank" rel="noopener noreferrer">Lid details ↗</a></div>
    </div>`;
}

function selectLid(lid) {
  if (!lid) return;
  selected = lid;
  mapFrame.src = embedPlaceUrl(lid);
  mapFrame.title = `Google map of the ${lid.name} Poké Lid in ${lid.prefecture}`;
  renderSelected();
  renderList(true);
}

function showOverview() {
  selected = null;
  if (mapFrame.src !== overviewEmbedUrl) mapFrame.src = overviewEmbedUrl;
  mapFrame.title = 'Google My Maps overview of Quagsire Poké Lids in Kōchi';
  renderSelected();
  renderList(true);
}

function directionsUrl(stops) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api','1');
  url.searchParams.set('origin',coordinates(stops[0]));
  url.searchParams.set('destination',coordinates(stops.at(-1)));
  url.searchParams.set('travelmode','driving');
  if (stops.length > 2) url.searchParams.set('waypoints',stops.slice(1,-1).map(coordinates).join('|'));
  return url.toString();
}

function renderRoute() {
  const starts = [0,4,8,12,16];
  const titles = ['From Kagawa to the hills','Across the eastern cape','Back toward the city','Into the western rivers','The Pacific finish'];
  routeLegs.innerHTML = starts.map((start,index) => {
    const stops = lids.slice(start,Math.min(start+5,lids.length));
    return `<a class="leg" href="${directionsUrl(stops)}" target="_blank" rel="noopener noreferrer" aria-label="Open leg ${index+1}, ${stops[0].name} to ${stops.at(-1).name}, in Google Maps">
      <div class="leg-top"><span class="leg-number">0${index+1}</span><span class="leg-arrow" aria-hidden="true">↗</span></div>
      <h3>${titles[index]}</h3><p>${stops[0].name} → ${stops.at(-1).name}<br>${stops.length} lids along this leg</p>
      <span class="leg-route">OPEN IN GOOGLE MAPS <span aria-hidden="true">↗</span></span>
    </a>`;
  }).join('');
}

filters.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filters.forEach(item => {const active = item === button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  if (currentFilter === 'Kagawa') selectLid(lids[0]);
  else showOverview();
}));
search.addEventListener('input',() => {
  const matching = visibleLids();
  if (matching.length === 1) selectLid(matching[0]);
  else if (selected && !matching.includes(selected)) showOverview();
  else renderList();
});
document.getElementById('fit-map').addEventListener('click',showOverview);
renderSelected();
renderList();
renderRoute();
