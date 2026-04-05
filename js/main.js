/* ══ SMART API URL ══ */
const BASE_API = (function(){
  var h = window.location.hostname;
  return (!h || h === 'localhost' || h === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : 'https://devbhoomi-travels.onrender.com/api';
})();

console.log("JS LOADED");
/* ═══════════════════════════════════════
   DATA + JAVASCRIPT
═══════════════════════════════════════ */
/* ─── Package data ─── */
const PKG = {
  chardham:{title:'Complete Char Dham Yatra',reg:'Uttarakhand — 4 Dhams',img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=85',price:'₹28,999',nights:'11',rating:'5.0',rev:'2,100',desc:'The holiest pilgrimage of Hinduism — Yamunotri, Gangotri, Kedarnath & Badrinath. Expert spiritual guides, 3★ stays, helicopter option for Kedarnath, 24/7 medical support.',hl:['✈️ Flight Tickets','🚁 Helicopter Option','🏨 3★ Hotel Stays','🍽️ All Meals','🧭 Spiritual Guide','🚌 Full AC Transport','🆘 Medical Support','🙏 All Darshan']},
  rishikesh:{title:'Rishikesh Adventure Rush',reg:'Rishikesh, Dehradun District',img:'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=900&q=85',price:'₹9,499',nights:'4',rating:'4.9',rev:'1,100',desc:'Grade 4–5 Ganges rapids, 83m bungee jump, river beach camping under stars and sunrise yoga sessions by the holy Ganga — adrenaline meets serenity.',hl:['🛶 Grade 4–5 Rafting','🪂 Bungee Jump 83m','⛺ River Camping','🧘 Sunrise Yoga','🏨 Camp + Hotel','🍽️ All Meals','🎯 Zipline & Swing','🚌 AC Transport']},
  auli:{title:'Auli Ski & Snow Getaway',reg:'Auli, Chamoli District',img:'https://images.unsplash.com/photo-1516692296811-9b28e9eb9a87?w=900&q=85',price:'₹14,999',nights:'5',rating:'4.8',rev:'640',desc:'India\'s premier ski resort at 2,519–3,049m altitude. Asia\'s longest 4km gondola, Nanda Devi views, certified instructors for all levels and cozy mountain resort evenings.',hl:['⛷️ Ski All Levels','🚡 Longest Gondola','🏔️ Nanda Devi View','🏨 Mountain Resort','❄️ Snow Gear Included','🍽️ All Meals','🔥 Bonfire Evenings','🎿 Certified Instructors']},
  corbett:{title:'Jim Corbett Tiger Safari',reg:'Jim Corbett National Park',img:'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=900&q=85',price:'₹12,999',nights:'3',rating:'4.9',rev:'870',desc:'India\'s oldest national park — Bengal tigers, leopards, elephants and 600+ bird species. Expert naturalist guides lead dawn safaris through Dhikala zone.',hl:['🐯 Jeep Safari Dhikala','🐘 Elephant Safari','🦅 Bird Walk 600+','🏨 Jungle Resort','🍽️ All Meals','📸 Photography Guide','🌅 Sunrise Safari','🧭 Naturalist Guide']},
  vof:{title:'Valley of Flowers Trek',reg:'Valley of Flowers, Chamoli',img:'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=900&q=85',price:'₹9,499',nights:'6',rating:'5.0',rev:'530',desc:'UNESCO World Heritage — 500+ wildflower species bloom July–September. Combined with Hemkund Sahib Gurudwara at 4,329m — a once in a lifetime alpine experience.',hl:['🌸 500+ Wildflowers','🛕 Hemkund Sahib','🥾 Alpine Trek 8km','⛺ Camp Ghangaria','🏔️ Snow Peak Views','📸 Photo Guide','🍽️ All Meals','🧭 Trek Guide']},
  nainital:{title:'Nainital Family Fun',reg:'Nainital, Kumaon Division',img:'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=900&q=85',price:'₹7,999',nights:'3',rating:'4.8',rev:'1,500',desc:'The Lake District of India — Naini Lake boating, Snow View cable car panoramas, Mall Road evenings and Naina Devi temple. Perfect for families of all ages.',hl:['⛵ Naini Lake Boating','🚡 Snow View Cable Car','🏔️ Himalayan Sunrise','🐦 Bird Watching','🛍️ Mall Road Walk','🏨 Lake-View Hotel','🍽️ All Meals','🌳 Forest Walk']},
  mussoorie:{title:'Mussoorie Honeymoon Special',reg:'Mussoorie, Dehradun',img:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&q=85',price:'₹11,999',nights:'4',rating:'4.9',rev:'820',desc:'Queen of the Hills — candlelight dinners with Himalayan panoramas, heritage hotel with flower decoration, Kempty Falls and private couples ayurvedic spa.',hl:['🌹 Floral Room Decor','🍷 Candlelight Dinner','💆 Couples Spa','🏨 Heritage Hotel','💧 Kempty Falls','🚡 Gunhill Cable Car','📸 Photoshoot','🎁 Honeymoon Hamper']},
  chopta:{title:'Chopta Tungnath Trek',reg:'Chopta–Tungnath, Rudraprayag',img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',price:'₹5,999',nights:'3',rating:'4.9',rev:'410',desc:'Mini Switzerland at 2,680m — world\'s highest Shiva temple, then Chandrashila peak at 4,130m for 360° panorama of Nanda Devi, Trishul, Kedarnath, Chaukhamba.',hl:['⛪ Tungnath Temple','🏔️ Chandrashila 4130m','🌿 Rhododendron Forest','⛺ Glamping','🔭 Stargazing','🦅 Himalayan Birds','🍽️ All Meals','🧭 Expert Guide']},
  bungee:{title:'Bungee & Zipline Thrill',reg:'Rishikesh — Highest in India',img:'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=900&q=85',price:'₹3,499',nights:'1',rating:'4.8',rev:'920',desc:'India\'s highest bungee at 83m over the Ganges gorge, giant swing, zipline across the river and cliff jumping. Pure adrenaline in Rishikesh.',hl:['🪂 Bungee Jump 83m','🎢 Giant Swing','🏞️ River Zipline','🌊 Cliff Jumping','🎥 GoPro Video','🏨 Hotel Stay','🍽️ Meals','📜 Certificate']},
  kedar:{title:'Kedarnath Yatra & Trek',reg:'Kedarnath, Rudraprayag',img:'https://images.unsplash.com/photo-1605537964076-47cda6c1e20e?w=900&q=85',price:'₹8,499',nights:'5',rating:'5.0',rev:'1,200',desc:'Trek to Lord Shiva\'s abode at 3,583m — one of the 12 Jyotirlingas surrounded by eternal snow peaks. Spiritual guide narrates ancient stories throughout.',hl:['🛕 Kedarnath Darshan','🏔️ Snow Peaks','🚁 Helicopter Option','🏨 Comfortable Stays','🧭 Spiritual Guide','🍽️ Sattvic Meals','🚌 AC Transport','🆘 Medical Support']},
  para:{title:'Paragliding Adventure Camp',reg:'Bir Billing, Kangra Valley',img:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=85',price:'₹4,999',nights:'2',rating:'4.7',rev:'560',desc:'Asia\'s top paragliding destination — tandem flights from 2,430m with APPI-certified pilots over stunning Himalayan valleys. Includes GoPro video.',hl:['🪂 Tandem Paragliding','🎥 GoPro Video','⛺ Valley Camping','🏔️ Mountain Views','🧗 Pre-Flight Training','🍽️ All Meals','📜 Certificate','🚌 Transport']},
  haridwar:{title:'Haridwar Ganga Aarti',reg:'Haridwar, Haridwar District',img:'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=85',price:'₹4,499',nights:'2',rating:'4.9',rev:'1,800',desc:'Legendary Ganga Aarti at Har Ki Pauri, ancient temple walks, holy dip at Brahm Kund and dawn yoga on the river ghats with a spiritual guide.',hl:['🙏 Ganga Aarti','🛕 Temple Walk','🧘 Dawn Yoga','🌊 Holy Dip','🏨 Ganga-View Hotel','🍽️ Sattvic Meals','🧭 Priest Guide','🚌 AC Transport']},
  biking:{title:'Himalayan Mountain Biking',reg:'Rishikesh to Devprayag',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',price:'₹6,999',nights:'4',rating:'4.8',rev:'320',desc:'Epic 5-day downhill trail from Himalayan foothills through forests, riverside paths and ancient villages to the sacred Devprayag confluence.',hl:['🚵 Premium Bikes','🏔️ Himalayan Trail','🌲 Forest Paths','🙏 Devprayag Confluence','⛺ Camp Stays','🍽️ All Meals','🧰 Repair Kit & Helmet','🧭 Local Guide']}
};

/* ─── Gallery images ─── */
const GALIMGS = [
  'https://plus.unsplash.com/premium_photo-1673240367277-e1d394465b56?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1665413791165-b25d42542b80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdhbmdhJTIwYWFydGl8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1661889971049-6f0a39a3476f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cml2ZXIlMjByYWZ0aW5nJTIwcmlzaGlrZXNofGVufDB8fDB8fHww',
  'https://media.istockphoto.com/id/515855602/photo/kedarnath-in-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=sA9PWiQg2pJCXqLy36bC2MXH05igruwhMHGe5w-LFLk=',
  'https://media.istockphoto.com/id/2196545732/photo/cosmos-blooming-in-a-park.webp?a=1&b=1&s=612x612&w=0&k=20&c=cUwf4sKUDDFI3UCK-lsmJK9jjqFhtuKvuC5PmuEE9eM=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc8zokzr3zjK85TWrZN4A6UIA9UzxL83JszA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDU1sgimPSS6TSPBP4yJyhTlRCsTUHOuhzNQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaOsrf7cxEFCAqyUAg52Oi6twcfNhP96j3CQ&s',
  'https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=900&q=85',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=85',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=900&q=85',
];
let lbIdx = 0;

/* ─── PAGE NAVIGATION ─── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');

  // update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');

  // scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Detail Modal ─── */
function openDetail(key) {
  const d = PKG[key]; if (!d) return;
  document.getElementById('dImg').src = d.img;
  document.getElementById('dTitle').textContent = d.title;
  document.getElementById('dReg').textContent = d.reg;
  document.getElementById('dPrice').innerHTML = d.price + ' <small>/person</small>';
  document.getElementById('dDesc').textContent = d.desc;
  document.getElementById('dStats').innerHTML =
    `<div><div class="d-sv">${d.nights}</div><div class="d-sl">Nights</div></div>
     <div><div class="d-sv">⭐ ${d.rating}</div><div class="d-sl">Rating</div></div>
     <div><div class="d-sv">${d.rev}</div><div class="d-sl">Reviews</div></div>
     <div><div class="d-sv">✅</div><div class="d-sl">Free Cancel</div></div>`;
  document.getElementById('dHl').innerHTML = d.hl.map(h => `<div class="d-hi">${h}</div>`).join('');
  document.getElementById('detailOv').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeDetail() {
  document.getElementById('detailOv').classList.remove('show');
  document.body.style.overflow = '';
}

/* ─── Filter Destinations ─── */
function filterDest(btn, cat) {
  document.querySelectorAll('#destTabs .ftab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('#destGrid .d-card');
  let visible = 0;
  cards.forEach(c => {
    const match = cat === 'All' || c.dataset.cat === cat;
    c.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  document.getElementById('destCount').textContent = visible + ' destination' + (visible !== 1 ? 's' : '');
}

/* ─── Filter Packages ─── */
function filterPkgs(btn, cat) {
  document.querySelectorAll('#pkgTabs .ftab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const feat = document.getElementById('featPkg');
  const cards = document.querySelectorAll('#pkgGrid .p-card');
  let visible = 0;
  if (cat === 'All' || cat === 'Spiritual') { feat.style.display = ''; visible++; }
  else feat.style.display = 'none';
  cards.forEach(c => {
    const match = cat === 'All' || c.dataset.cat === cat;
    c.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  const noRes = document.getElementById('pkgNoRes');
  if (noRes) noRes.classList.toggle('show', visible === 0);
  document.getElementById('pkgCount').textContent = visible + ' package' + (visible !== 1 ? 's' : '');
}

/* ─── Sort Packages ─── */
function sortPkgs(v) {
  const g = document.getElementById('pkgGrid');
  const cards = [...g.querySelectorAll('.p-card:not(.no-res)')];
  cards.sort((a, b) => {
    if (v === 'price-low') return +a.dataset.price - +b.dataset.price;
    if (v === 'price-high') return +b.dataset.price - +a.dataset.price;
    if (v === 'days') return +a.dataset.days - +b.dataset.days;
    return 0;
  });
  cards.forEach(c => g.appendChild(c));
}

/* ─── Filter Gallery ─── */
function filterGal(btn, cat) {
  document.querySelectorAll('#galTabs .ftab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#galGrid .g-item').forEach(item => {
    const match = cat === 'All' || item.dataset.cat === cat;
    item.style.display = match ? '' : 'none';
  });
}

/* ─── Lightbox ─── */
function openLb(idx) {
  lbIdx = idx;
  document.getElementById('lbImg').src = GALIMGS[lbIdx];
  document.getElementById('lbOv').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lbOv').classList.remove('show');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbIdx = (lbIdx + dir + GALIMGS.length) % GALIMGS.length;
  document.getElementById('lbImg').src = GALIMGS[lbIdx];
}

/* ─── Contact Form ─── */
async function submitContact() {
  const btn       = document.getElementById('cfBtn');
  const firstName = (document.getElementById('cf-fname')?.value || '').trim();
  const lastName  = (document.getElementById('cf-lname')?.value || '').trim();
  const email     = (document.getElementById('cf-email')?.value || '').trim();
  const phone     = (document.getElementById('cf-phone')?.value || '').trim();
  const travelDate= (document.getElementById('cf-date')?.value  || '');
  const travelers = parseInt(document.getElementById('cf-travelers')?.value) || 1;
  const pkg       = (document.getElementById('cf-package')?.value || document.getElementById('cf-pkg')?.value || '').trim();
  const message   = (document.getElementById('cf-msg')?.value  || '').trim();

  if (!firstName) { showToast('⚠️ Please enter your name'); return; }
  if (!email)     { showToast('⚠️ Please enter your email'); return; }
  if (!message)   { showToast('⚠️ Please enter your message'); return; }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res  = await fetch(BASE_API + '/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, name: (firstName + ' ' + lastName).trim(), email, phone, package: pkg, travelDate, travelers, message })
    });
    const data = await res.json();
    if (data.success) {
      btn.textContent = '✅ Message Sent!';
      btn.classList.add('sent');
      showToast('✅ Message mil gaya! Hum 24 ghante mein reply karenge.' + (data.ticketId ? ' Ticket: ' + data.ticketId : ''));
      // Reset form
      ['cf-fname','cf-lname','cf-email','cf-phone','cf-date','cf-travelers','cf-msg'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
    } else {
      showToast('❌ ' + (data.message || 'Kuch error aaya, dobara try karein'));
      btn.textContent = 'Send Message 🏔️';
      btn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Server se connect nahi ho pa raha. Dobara try karein.');
    btn.textContent = 'Send Message 🏔️';
    btn.disabled = false;
  }
}

/* ─── Wishlist ─── */
function wishToggle(e, btn) {
  e.stopPropagation();
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '❤️' : '🤍';
}

/* ─── Auth ─── */
function openAuth(t) {
  // Close drawer
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('hamBtn').classList.remove('open');
  // Get modal
  var modalId = t === 'login' ? 'loginMod' : 'signupMod';
  var modal = document.getElementById(modalId);
  // Force show with inline styles for mobile
  modal.classList.add('show');
  modal.style.cssText = 'display:flex !important; position:fixed !important; z-index:999999 !important; top:0 !important; left:0 !important; width:100% !important; height:100% !important; align-items:center !important; justify-content:center !important;';
  document.body.style.overflow = 'hidden';
}
function openForgotPassword() {
  closeAuth('loginMod');
  var modal = document.getElementById('forgotMod');
  if (!modal) return;
  modal.style.cssText = 'display:flex !important; position:fixed !important; z-index:999999 !important; top:0 !important; left:0 !important; width:100% !important; height:100% !important; align-items:center !important; justify-content:center !important;';
  document.body.style.overflow = 'hidden';
}
function closeAuth(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('show');
  el.style.display = 'none';
  document.body.style.overflow = '';
}
function switchAuth(c, o) {
  closeAuth(c);
  setTimeout(() => document.getElementById(o).classList.add('show'), 180);
}
function socialAuth(btn, prov, mode) {

  if (prov === "google") {
    window.location.href = "https://devbhoomi-travels.onrender.com/auth/google";
    return;
  }

  if (prov === "facebook") {
    alert("Facebook login coming soon");
  }
}

/* ─── Toast ─── */
let toastT;
function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ─── Nav scroll & progress ─── */
window.addEventListener('scroll', () => {
  const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('sp').style.width = p +'%';
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── Loader ─── */
// Force loader off immediately
(function() {
  function hideLdr() {
    var l = document.getElementById('ldr');
    if (!l) return;
    l.style.opacity = '0';
    l.style.pointerEvents = 'none';
    l.style.visibility = 'hidden';
    setTimeout(function(){ l.style.display = 'none'; }, 600);
  }
  // Run at 800ms max — no waiting
  setTimeout(hideLdr, 800);
  document.addEventListener('DOMContentLoaded', function() { setTimeout(hideLdr, 500); });
})();

/* ─── Hamburger / Drawer ─── */
function toggleDrawer() {
  document.getElementById('drawer').classList.toggle('open');
  document.getElementById('hamBtn').classList.toggle('open');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('hamBtn').classList.remove('open');
}

/* ─── ESC key closes everything ─── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeDetail();
    closeLb();
    closeAuth('loginMod');
    closeAuth('signupMod');
    closeBooking();
    closeCmp();
    closeSearch();
  }
});

// loginUser is an alias for doLogin (kept for compatibility)
async function loginUser() { if (window.doLogin) window.doLogin(); }
/* ══════════════════════════════════════
   FEATURE 1: VIDEO BACKGROUND
══════════════════════════════════════ */
let videoOn = false;
function toggleHeroVideo() {
  const bg = document.getElementById('heroBg');
  const vid = document.getElementById('heroVid');
  const btn = document.getElementById('vidToggleBtn');
  videoOn = !videoOn;
  if (videoOn) {
    bg.style.opacity = '0';
    vid.classList.remove('hidden');
    btn.innerHTML = '🖼️ Switch to Photo';
  } else {
    bg.style.opacity = '1';
    vid.classList.add('hidden');
    btn.innerHTML = '🎥 Switch to Video';
  }
}

/* ══════════════════════════════════════
   FEATURE 2: SEARCH
══════════════════════════════════════ */
const ALL_ITEMS = [
  {key:'chardham',name:'Char Dham Yatra',sub:'Spiritual · 12 days',price:'₹28,999',img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=120&q=70',type:'package',cat:'Spiritual'},
  {key:'rishikesh',name:'Rishikesh Adventure Rush',sub:'Adventure · 5 days',price:'₹9,499',img:'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=120&q=70',type:'package',cat:'Adventure'},
  {key:'auli',name:'Auli Ski & Snow Getaway',sub:'Ski · 6 days',price:'₹14,999',img:'https://images.unsplash.com/photo-1516692296811-9b28e9eb9a87?w=120&q=70',type:'package',cat:'Ski'},
  {key:'corbett',name:'Jim Corbett Tiger Safari',sub:'Wildlife · 4 days',price:'₹12,999',img:'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=120&q=70',type:'package',cat:'Wildlife'},
  {key:'vof',name:'Valley of Flowers Trek',sub:'Nature · 7 days',price:'₹9,499',img:'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=120&q=70',type:'package',cat:'Nature'},
  {key:'nainital',name:'Nainital Family Fun',sub:'Family · 4 days',price:'₹7,999',img:'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=120&q=70',type:'package',cat:'Family'},
  {key:'mussoorie',name:'Mussoorie Honeymoon Special',sub:'Honeymoon · 5 days',price:'₹11,999',img:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=120&q=70',type:'package',cat:'Honeymoon'},
  {key:'chopta',name:'Chopta Tungnath Trek',sub:'Nature · 4 days',price:'₹5,999',img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&q=70',type:'package',cat:'Nature'},
  {key:'kedar',name:'Kedarnath Yatra & Trek',sub:'Spiritual · 6 days',price:'₹8,499',img:'https://images.unsplash.com/photo-1605537964076-47cda6c1e20e?w=120&q=70',type:'package',cat:'Spiritual'},
  {key:'haridwar',name:'Haridwar Ganga Aarti',sub:'Spiritual · 3 days',price:'₹4,499',img:'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=120&q=70',type:'package',cat:'Spiritual'},
  {key:'para',name:'Paragliding Adventure Camp',sub:'Adventure · 3 days',price:'₹4,999',img:'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=120&q=70',type:'package',cat:'Adventure'},
  {key:'biking',name:'Himalayan Mountain Biking',sub:'Adventure · 5 days',price:'₹6,999',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=70',type:'package',cat:'Adventure'},
];

function openSearch() {
  document.getElementById('searchOv').classList.add('show');
  document.getElementById('searchInput').focus();
  document.body.style.overflow = 'hidden';
  renderSearchResults('');
}
function closeSearch() {
  document.getElementById('searchOv').classList.remove('show');
  document.body.style.overflow = '';
}
function renderSearchResults(q) {
  const container = document.getElementById('searchResults');
  const filtered = q.length < 1
    ? ALL_ITEMS
    : ALL_ITEMS.filter(i =>
        i.name.toLowerCase().includes(q.toLowerCase()) ||
        i.cat.toLowerCase().includes(q.toLowerCase()) ||
        i.sub.toLowerCase().includes(q.toLowerCase())
      );
  if (filtered.length === 0) {
    container.innerHTML = '<div class="s-empty">🔍 No results found for "<strong>' + q + '</strong>"</div>';
    return;
  }
  container.innerHTML = filtered.map(i => `
    <div class="s-res-item" onclick="closeSearch();openDetail('${i.key}')">
      <img class="s-res-img" src="${i.img}" alt=""/>
      <div><div class="s-res-name">${i.name}</div><div class="s-res-sub">${i.sub}</div></div>
      <div class="s-res-price">${i.price}</div>
    </div>`).join('');
}




/* ══════════════════════════════════════
   FEATURE 6: REVIEWS — api.js mein handle hota hai (real server call)
══════════════════════════════════════ */

/* ══════════════════════════════════════
   FEATURE 7: TRIP COMPARISON
══════════════════════════════════════ */
let compareList = [];
function addToCompare(key, btn) {
  if (compareList.includes(key)) {
    compareList = compareList.filter(k => k !== key);
    btn.classList.remove('in-cmp');
    btn.innerHTML = '⚖️';
    showToast('Removed from comparison');
  } else if (compareList.length >= 3) {
    showToast('⚠️ Max 3 packages can be compared');
    return;
  } else {
    compareList.push(key);
    btn.classList.add('in-cmp');
    btn.innerHTML = '✓ Added';
    showToast('✅ Added to comparison!');
  }
  updateCmpBar();
}
function updateCmpBar() {
  const bar = document.getElementById('cmpBar');
  const itemsEl = document.getElementById('cmpBarItems');
  if (compareList.length === 0) {
    bar.classList.remove('visible');
    return;
  }
  bar.classList.add('visible');
  let html = '';
  compareList.forEach(k => {
    const p = PKG[k];
    html += `<div class="cmp-bar-item">📦 ${p.title.split(' ').slice(0,2).join(' ')} · ${p.price}<button class="cmp-x" onclick="removeFromCmp('${k}')">✕</button></div>`;
  });
  for (let i = compareList.length; i < 3; i++) {
    html += `<div class="cmp-bar-slot">+ Add package ${i+1}</div>`;
  }
  itemsEl.innerHTML = html;
  document.getElementById('btnDoCmp').disabled = compareList.length < 2;
}
function removeFromCmp(key) {
  compareList = compareList.filter(k => k !== key);
  document.querySelectorAll('.cmp-btn').forEach(btn => {
    if (btn.onclick && btn.onclick.toString().includes(key)) {
      btn.classList.remove('in-cmp');
      btn.innerHTML = '⚖️';
    }
  });
  updateCmpBar();
}
function clearCompare() {
  compareList = [];
  document.querySelectorAll('.cmp-btn').forEach(b => { b.classList.remove('in-cmp'); b.innerHTML = '⚖️'; });
  updateCmpBar();
}
function openCmp() {
  if (compareList.length < 2) { showToast('⚠️ Select at least 2 packages to compare'); return; }
  const items = compareList.map(k => PKG[k]);
  const cols = items.map(p => `<th class="cmp-pkg-head"><img class="cmp-pkg-img" src="${p.img}" alt=""/><div class="cmp-pkg-name">${p.title}</div></th>`).join('');
  const rows = [
    ['💰 Price', items.map(p => `<td class="cmp-price-cell">${p.price}<small>/person</small></td>`).join('')],
    ['🌙 Duration', items.map(p => `<td>${p.nights} nights</td>`).join('')],
    ['⭐ Rating', items.map(p => `<td>⭐ ${p.rating} (${p.rev} reviews)</td>`).join('')],
    ['✅ Free Cancel', items.map(() => `<td class="cmp-tick">✔</td>`).join('')],
    ['🚌 Transport', items.map(() => `<td class="cmp-tick">✔</td>`).join('')],
    ['🍽️ Meals', items.map(() => `<td class="cmp-tick">✔</td>`).join('')],
    ['🧭 Guide', items.map(() => `<td class="cmp-tick">✔</td>`).join('')],
    ['📸 Photography', items.map((p,i) => i===0 ? `<td class="cmp-tick">✔</td>` : `<td class="cmp-cross">–</td>`).join('')],
    ['🚁 Helicopter', items.map((p) => p.hl.some(h=>h.includes('🚁')) ? `<td class="cmp-tick">✔</td>` : `<td class="cmp-cross">–</td>`).join('')],
    ['', items.map(p => `<td><button class="btn-bk" onclick="closeCmp();openBooking('${Object.keys(PKG).find(k=>PKG[k]===p)}')">Book Now →</button></td>`).join('')],
  ].map(([label, cells]) => `<tr><td class="cmp-row-label">${label}</td>${cells}</tr>`).join('');
  document.getElementById('cmpTable').innerHTML = `<table><thead><tr><th>Feature</th>${cols}</tr></thead><tbody>${rows}</tbody></table>`;
  document.getElementById('cmpOv').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCmp() {
  document.getElementById('cmpOv').classList.remove('show');
  document.body.style.overflow = '';
}

/* ─── WhatsApp ─── */
function openWhatsApp() {
  window.open('https://wa.me/9027591352?text=Namaste! I want to book a trip to Uttarakhand 🏔️', '_blank');
}


/* ══════════ HOTEL PAGE JS ══════════ */
const HOTELS = {
  ananda:{name:'Ananda in the Himalayas',loc:'Narendra Nagar, Rishikesh',stars:5,rating:5.0,ratingLbl:'World-class',price:'₹22,000',desc:'One of Asia\'s top luxury spa resorts perched 1,000 metres above the Ganges. Immerse yourself in personalised Ayurvedic programmes, Yoga & Vedanta sessions, and world-class cuisine sourced from the resort\'s own organic farm.',imgs:['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80'],amenities:['♾️ Infinity Pool','🧘 Yoga Pavilion','💆 Ayurvedic Spa','🍽️ Fine Dining','🌅 Himalayan Views','🏋️ Fitness Center','🛎️ Butler Service','🌿 Organic Farm','🎾 Tennis Court','🛁 Private Jacuzzi','📚 Library','🚗 Airport Transfer'],rooms:[{name:'Deluxe Room',price:'₹22,000',feats:['King Bed','Valley View','Free WiFi','Minibar']},{name:'Suite',price:'₹38,000',feats:['Living Room','Balcony','Private Plunge Pool','Butler']},{name:'Palace Suite',price:'₹65,000',feats:['3BHK','Grand Terrace','Private Pool','Personalized Butler']}],reviews:[{name:'Meera Kapoor',date:'Jan 2025',stars:'★★★★★',text:'The most transformative experience of my life. The Ayurvedic doctors are world-class.'},{name:'Rajan Nair',date:'Dec 2024',stars:'★★★★★',text:'Absolute perfection. The infinity pool at sunset with Nanda Devi — worth every rupee.'},{name:'Prerna Sood',date:'Nov 2024',stars:'★★★★★',text:'Perfect anniversary stay. Nothing else comes close in India.'}]},
  glasshouse:{name:'Glasshouse on the Ganges',loc:'Rishikesh, Uttarakhand',stars:5,rating:4.9,ratingLbl:'Exceptional',price:'₹18,000',desc:'A hidden gem where 200-year-old colonial architecture meets the sacred Ganges. Luxury stone cottages in mango and lychee groves with private balconies overlooking the sacred river.',imgs:['https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=900&q=85','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=80'],amenities:['🌊 River View','♾️ Infinity Pool','🧘 Yoga Deck','🍽️ Restaurant','🚁 Helipad','🐘 Elephant Bath','🛶 River Trips','🌿 Nature Walks','🔭 Stargazing','🎣 Fishing','🚗 Transfer','📶 Free WiFi'],rooms:[{name:'Luxury Cottage',price:'₹18,000',feats:['River View','King Bed','Private Balcony','Outdoor Bathtub']},{name:'Garden Room',price:'₹12,000',feats:['Garden View','Queen Bed','Sit-out','Minibar']}],reviews:[{name:'Aryan Shah',date:'Feb 2025',stars:'★★★★★',text:'The most peaceful place in India. Waking to the Ganges and stargazing at night — magical.'},{name:'Ritika Joshi',date:'Jan 2025',stars:'★★★★★',text:'Perfect honeymoon. The outdoor bathtub with river view is unforgettable.'}]},
  savoy:{name:'The Savoy Mussoorie',loc:'Mussoorie, Uttarakhand',stars:5,rating:4.8,ratingLbl:'Exceptional',price:'₹8,500',desc:'Uttarakhand\'s oldest hotel, established in 1902. Grand Victorian architecture, sprawling manicured lawns, antique-furnished rooms and timeless colonial elegance in the Queen of Hills.',imgs:['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85','https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&q=80','https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80'],amenities:['🏛️ Heritage Property','🌿 2-Acre Gardens','🍽️ Fine Dining','♟️ Billiards Room','🎭 Live Music','💆 Spa','🏋️ Gym','🎳 Bowling','📚 Library','🎪 Ballroom','🚗 Vintage Car','📶 WiFi'],rooms:[{name:'Superior Room',price:'₹8,500',feats:['Valley View','Victorian Decor','King Bed','Clawfoot Tub']},{name:'Heritage Suite',price:'₹16,000',feats:['2-Room Suite','Antique Furniture','Fireplace','Private Balcony']}],reviews:[{name:'Suresh Menon',date:'Dec 2024',stars:'★★★★★',text:'Staying at The Savoy is like stepping back in time. Simply superb.'},{name:'Nandita Roy',date:'Nov 2024',stars:'★★★★',text:'Beautiful heritage property. The evening live music was a wonderful touch.'}]},
  corbett_h:{name:'Corbett Jungle Lodge',loc:'Jim Corbett National Park',stars:4,rating:4.9,ratingLbl:'Exceptional',price:'₹12,000',desc:'Award-winning luxury jungle lodge bordering Jim Corbett National Park. Wake up to birdsong and wild elephant sightings from your private deck with expert naturalist guides.',imgs:['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=85','https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=500&q=80','https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=500&q=80'],amenities:['🐯 Jeep Safari','🌿 Nature Walk','♾️ Pool','🍽️ Jungle Restaurant','🔭 Observatory','📸 Photography','🐘 Elephant Sightings','🦅 Bird Walks','🔥 Campfire','🧘 Yoga','🚗 Pickup','🎥 Film Screening'],rooms:[{name:'Jungle Chalet',price:'₹12,000',feats:['Forest View','King Bed','Open Deck','Outdoor Shower']},{name:'Tree House Suite',price:'₹20,000',feats:['Canopy Level','360° Forest View','Kitchenette','Plunge Pool']}],reviews:[{name:'Rohit Agarwal',date:'Jan 2025',stars:'★★★★★',text:'Saw 3 tigers in 2 safari days! Best wildlife experience in India.'},{name:'Kavya Iyer',date:'Dec 2024',stars:'★★★★★',text:'The tree house is worth every rupee. Waking in the forest canopy is unforgettable.'}]},
  corbett:{name:'Corbett Riverside Resort',loc:'Ramnagar, Jim Corbett',stars:4,rating:4.9,ratingLbl:'Exceptional',price:'₹12,000',desc:'Luxury resort on the banks of Kosi river adjoining Jim Corbett National Park. Spacious cottages, naturalist-guided safaris, and serene riverside evenings with bonfires.',imgs:['https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=900&q=85','https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=80','https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=500&q=80'],amenities:['🐯 Tiger Safari','🌊 Riverside','♾️ Pool','🍽️ Multi-cuisine','🔥 Bonfire','🦅 Bird Walks','🌿 Nature Trails','🧘 Yoga','🚗 Airport Transfer','📶 WiFi','🐘 Elephant Safaris','🌅 Sunrise Walks'],rooms:[{name:'River Cottage',price:'₹12,000',feats:['River View','King Bed','Private Sit-out','Minibar']},{name:'Deluxe Room',price:'₹8,500',feats:['Garden View','Queen Bed','Free WiFi','Breakfast']}],reviews:[{name:'Deepak Sharma',date:'Feb 2025',stars:'★★★★★',text:'Stunning riverside location and superb tiger sightings. Staff is exceptional.'},{name:'Pooja Mehta',date:'Jan 2025',stars:'★★★★★',text:'The bonfire evenings by the river were magical. Will definitely return.'}]},
  nainital_h:{name:'The Naini Retreat',loc:'Nainital, Kumaon',stars:4,rating:4.8,ratingLbl:'Excellent',price:'₹7,500',desc:'A colonial boutique retreat perched above Naini Lake with panoramic views of the Himalayan ranges. Elegant rooms, heritage architecture and warm Kumaoni hospitality.',imgs:['https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=900&q=85','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80','https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&q=80'],amenities:['⛵ Lake View','🏔️ Mountain Views','🍽️ Restaurant','☕ Cafe','🌿 Garden','🛶 Boating','🚡 Cable Car Access','📶 WiFi','🚗 Transfers','🍳 Breakfast','🎣 Fishing','🌸 Nature Walk'],rooms:[{name:'Lake View Room',price:'₹7,500',feats:['Naini Lake View','King Bed','Balcony','WiFi']},{name:'Mountain Suite',price:'₹12,000',feats:['360° Views','Living Room','Fireplace','Butler']}],reviews:[{name:'Sunita Verma',date:'Mar 2025',stars:'★★★★★',text:'The lake view from the room is breathtaking. Perfect romantic getaway.'},{name:'Rahul Gupta',date:'Feb 2025',stars:'★★★★',text:'Charming boutique hotel with great food and outstanding views of Nainital.'}]},
  auli_h:{name:'Auli Resort & Ski Lodge',loc:'Auli, Chamoli District',stars:4,rating:4.7,ratingLbl:'Excellent',price:'₹15,000',desc:'India\'s premier ski resort accommodation at 2,519m altitude. Cozy mountain chalets with panoramic views of Nanda Devi, equipped ski rooms, heated interiors and hearty mountain cuisine.',imgs:['https://images.unsplash.com/photo-1516692296811-9b28e9eb9a87?w=900&q=85','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80'],amenities:['⛷️ Ski-in Ski-out','🏔️ Nanda Devi View','🚡 Gondola Access','🍽️ Mountain Cuisine','🔥 Fireplace','❄️ Ski Equipment','🧘 Yoga Room','♨️ Hot Springs','📶 WiFi','🚗 Transfers','🏂 Snowboarding','🌟 Stargazing'],rooms:[{name:'Mountain Chalet',price:'₹15,000',feats:['Snow View','King Bed','Fireplace','Ski Storage']},{name:'Deluxe Room',price:'₹10,000',feats:['Valley View','Twin/King Bed','Heated Floor','Minibar']}],reviews:[{name:'Vikram Singh',date:'Jan 2025',stars:'★★★★★',text:'Best ski accommodation in India. The Nanda Devi view at sunrise is absolutely stunning.'},{name:'Anjali Khanna',date:'Dec 2024',stars:'★★★★★',text:'Cozy chalets, excellent food and right next to the gondola. Perfect ski holiday.'}]},
  chopta_h:{name:'Chopta Meadows Camp',loc:'Chopta, Rudraprayag',stars:3,rating:4.9,ratingLbl:'Exceptional',price:'₹3,500',desc:'Award-winning eco-camp in the pristine rhododendron forests of Chopta at 2,680m. Luxury tents with real beds, warm quilts, attached baths and stargazing decks under unpolluted Himalayan skies.',imgs:['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80','https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80'],amenities:['⛺ Luxury Tents','🔭 Stargazing','🌿 Forest Walks','🍽️ Camp Meals','🔥 Bonfire','🦅 Bird Watching','🥾 Trekking','🏔️ Peak Views','♨️ Hot Water','🌸 Rhododendron Forest','📷 Photography','🧭 Guide'],rooms:[{name:'Luxury Tent',price:'₹3,500',feats:['Real Bed','Attached Bath','Hot Water','Forest View']},{name:'Premium Tent',price:'₹5,000',feats:['King Bed','Private Deck','Wood Heater','Panoramic View']}],reviews:[{name:'Aditya Kumar',date:'Apr 2025',stars:'★★★★★',text:'The stars from Chopta are unlike anything I have seen. The camp is cozy and the food is delicious.'},{name:'Shreya Nair',date:'Mar 2025',stars:'★★★★★',text:'Best glamping experience in Uttarakhand. The rhododendron forest is magical in bloom.'}]},
  vivanta:{name:'Vivanta Rishikesh',loc:'Rishikesh, Uttarakhand',stars:5,rating:4.8,ratingLbl:'Excellent',price:'₹14,000',desc:'Taj\'s flagship luxury property in Rishikesh — contemporary design with Himalayan aesthetics, spa, infinity pool and gourmet dining with panoramic valley views.',imgs:['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80'],amenities:['♾️ Infinity Pool','💆 Spa','🍽️ Multi-cuisine','🧘 Yoga Studio','🌅 Valley Views','🏋️ Fitness Center','🛎️ Concierge','🎾 Tennis','🚗 Airport Transfer','📶 WiFi','🛁 Jacuzzi','🌿 Garden'],rooms:[{name:'Deluxe Valley View',price:'₹14,000',feats:['Valley View','King Bed','Balcony','Minibar']},{name:'Premium Suite',price:'₹25,000',feats:['Living Room','Private Pool','Butler','Panoramic View']}],reviews:[{name:'Neha Kapoor',date:'Mar 2025',stars:'★★★★★',text:'Impeccable service, stunning views and the best spa in Rishikesh.'},{name:'Sanjay Mishra',date:'Feb 2025',stars:'★★★★★',text:'Luxury at its finest. The infinity pool view of the Ganges valley is unmatched.'}]},
  zostel:{name:'Zostel Rishikesh',loc:'Tapovan, Rishikesh',stars:2,rating:4.6,ratingLbl:'Very Good',price:'₹1,800',desc:'India\'s favourite backpacker hostel brand in the adventure capital of India. Clean dorms and private rooms, rooftop yoga, cafe, and the best social atmosphere for solo travelers.',imgs:['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=900&q=85','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80','https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=500&q=80'],amenities:['🧘 Rooftop Yoga','☕ Cafe','📶 Fast WiFi','🎮 Game Zone','🗺️ Travel Desk','🛶 Rafting Bookings','🔒 Locker','🌿 Eco-Friendly','🎵 Music Room','🤝 Community Events','🏪 Convenience Store','🚿 Hot Showers'],rooms:[{name:'Dormitory Bed',price:'₹1,800',feats:['AC Dorm','Locker','Free WiFi','Breakfast']},{name:'Private Room',price:'₹3,500',feats:['Private Bathroom','Double Bed','AC','Mountain View']}],reviews:[{name:'Riya Pandey',date:'Apr 2025',stars:'★★★★★',text:'Best hostel vibes in India. Met amazing travelers and the staff organized a bonfire night.'},{name:'Kabir Khan',date:'Mar 2025',stars:'★★★★',text:'Super clean, great location for rafting and bungee, and the rooftop yoga is amazing.'}]},
  manor:{name:'The Manor Bhowali',loc:'Bhowali, Nainital',stars:4,rating:4.7,ratingLbl:'Excellent',price:'₹9,500',desc:'A 1930s colonial manor nestled in Kumaon hills with apple orchards, pine forests and sweeping Himalayan panoramas. Authentic heritage rooms, home-cooked meals and peaceful Kumaoni living.',imgs:['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900&q=85','https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=500&q=80','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80'],amenities:['🍎 Apple Orchards','🌲 Pine Forest','🏔️ Himalayan Views','🍽️ Home Cooking','🔥 Fireplace','📚 Library','🌿 Nature Walks','🎣 Trout Fishing','🚗 Transfers','📶 WiFi','🧘 Meditation Garden','🌸 Flower Garden'],rooms:[{name:'Heritage Room',price:'₹9,500',feats:['Antique Decor','Mountain View','Fireplace','Breakfast']},{name:'Orchard Suite',price:'₹14,000',feats:['Sitting Room','Orchard View','Four-poster Bed','Private Garden']}],reviews:[{name:'Priya Bhatia',date:'Feb 2025',stars:'★★★★★',text:'Like staying in a family home from the 1930s. The food made by the local cook is outstanding.'},{name:'Sameer Joshi',date:'Jan 2025',stars:'★★★★★',text:'The most authentic Kumaon experience. Woke up to birdsong and picked apples from the garden.'}]},
  bythe:{name:'By The Ganges Camp',loc:'Shivpuri, Rishikesh',stars:3,rating:4.8,ratingLbl:'Excellent',price:'₹4,500',desc:'Premium riverside camping on the banks of the Ganges in Shivpuri — the ultimate adventure base camp. Luxury tents, rafting at your doorstep, bonfires under stars, and fresh mountain air.',imgs:['https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=900&q=85','https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=500&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80'],amenities:['🌊 Riverside','🛶 Rafting Access','⛺ Luxury Tents','🔥 Bonfire','🍽️ Camp Dining','🧘 Yoga','🤿 Kayaking','🏊 River Swimming','📶 WiFi','🌅 Sunrise Views','🌿 Nature Walks','📷 Photography'],rooms:[{name:'Deluxe Tent',price:'₹4,500',feats:['River View','Real Bed','Attached Bath','Hot Water']},{name:'Premium Cottage',price:'₹7,000',feats:['AC Room','Private Sit-out','River View','Minibar']}],reviews:[{name:'Tanuj Sharma',date:'Mar 2025',stars:'★★★★★',text:'Waking up to the Ganges right outside your tent is an experience you cannot get anywhere else.'},{name:'Divya Malhotra',date:'Feb 2025',stars:'★★★★★',text:'The rafting from the camp was incredible and the bonfire dinner was perfect.'}]},
  devbhoomi_stay:{name:'DevBhoomi Boutique Stay',loc:'Haridwar, Uttarakhand',stars:3,rating:4.7,ratingLbl:'Excellent',price:'₹6,000',desc:'Our own curated boutique property in the holy city of Haridwar. Spiritual ambiance, Ganga-view rooftop, sattvic meals and guided Aarti experiences at Har Ki Pauri — just 5 minutes walk away.',imgs:['https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=900&q=85','https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80','https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80'],amenities:['🕉️ Ganga View','🙏 Aarti Access','🧘 Morning Yoga','🍽️ Sattvic Meals','🌿 Rooftop Garden','📶 WiFi','🚗 Transfers','🛕 Temple Walk','♨️ Hot Water','🌅 Sunrise View','📚 Spiritual Library','🤝 Priest Guided Tours'],rooms:[{name:'Ganga View Room',price:'₹6,000',feats:['River View','Double Bed','AC','Breakfast']},{name:'Deluxe Suite',price:'₹9,500',feats:['Rooftop Access','King Bed','Living Area','Sattvic Meals']}],reviews:[{name:'Ramesh Tiwari',date:'Apr 2025',stars:'★★★★★',text:'Staying here was a deeply spiritual experience. The guided Aarti tour was unforgettable.'},{name:'Geeta Sharma',date:'Mar 2025',stars:'★★★★★',text:'Perfect location, sattvic food and the rooftop Ganga view at dawn is pure magic.'}]},
  ganga_inn:{name:'Ganga Inn Budget Stay',loc:'Rishikesh, Uttarakhand',stars:2,rating:4.5,ratingLbl:'Very Good',price:'₹2,200',desc:'Clean, comfortable and affordable rooms steps from the Ganges ghats. Perfect base for budget travelers who want to explore Rishikesh — rafting, yoga, bungee — without breaking the bank.',imgs:['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=900&q=85','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80','https://images.unsplash.com/photo-1501117716987-c8c394bb29df?w=500&q=80'],amenities:['🌊 Ganga Steps','☕ Cafe','📶 WiFi','🚿 Hot Showers','🗺️ Travel Desk','🛶 Rafting Bookings','🔒 Safe Lockers','🌿 Rooftop','🕉️ Yoga Classes','🏍️ Bike Rentals','🍽️ Restaurant','🚗 Taxi Service'],rooms:[{name:'Standard Room',price:'₹2,200',feats:['AC','Double Bed','WiFi','Hot Water']},{name:'Deluxe Room',price:'₹3,500',feats:['Ganga View','King Bed','AC','Breakfast Included']}],reviews:[{name:'Amit Patel',date:'Apr 2025',stars:'★★★★★',text:'Best budget option in Rishikesh. Clean rooms, helpful staff and perfect location.'},{name:'Siya Kapoor',date:'Mar 2025',stars:'★★★★',text:'Excellent value for money. Steps from the Ganga and all adventure activities.'}]},
  kedar_h:{name:'Hotel Shiv Lok Kedarnath',loc:'Gaurikund Base, Kedarnath, Rudraprayag',stars:3,rating:4.8,ratingLbl:'Excellent',price:'₹5,500',desc:'Best-located property for Kedarnath Yatra pilgrims. Warm rooms with direct Himalayan views, hot meals and helicopter booking assistance. Perfect Char Dham base camp for devotees.',imgs:['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80','https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80'],amenities:['⛰️ Himalaya View','🕉️ Temple Nearby','🍽️ Sattvic Meals','🔥 Room Heater','🧳 Luggage Store','🚁 Heli Booking','🛕 Puja Arrangements','♨️ Hot Water','📶 WiFi','🚗 Transfers','🥾 Yatra Guide','🌅 Sunrise View'],rooms:[{name:'Standard Room',price:'₹5,500',feats:['Mountain View','Double Bed','Room Heater','Hot Water']},{name:'Deluxe Room',price:'₹8,000',feats:['Temple View','King Bed','Heater','Sattvic Meals']}],reviews:[{name:'Rajesh Kumar',date:'May 2025',stars:'★★★★★',text:'Perfect base for Kedarnath Yatra. Staff helped arrange helicopter and puja. Highly recommended.'},{name:'Sunita Devi',date:'Apr 2025',stars:'★★★★★',text:'Very comfortable stay with hot meals. The mountain view from room is divine.'}]},
  vof_h:{name:'Snow Crest Inn Joshimath',loc:'Joshimath, Chamoli, Uttarakhand',stars:3,rating:4.7,ratingLbl:'Excellent',price:'₹4,200',desc:'Gateway hotel for Valley of Flowers & Hemkund Sahib treks. Expert trek guides, route planning, gear rental and freshly cooked Pahari food. UNESCO World Heritage experience starts here.',imgs:['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80'],amenities:['🌸 Valley Views','🥾 Trek Support','🍽️ Restaurant','☀️ Terrace','🗺️ Guide Desk','🎒 Gear Rental','📶 WiFi','🚗 Transfers','♨️ Hot Water','🌿 Nature Walk','📷 Photography','🏔️ Peak Views'],rooms:[{name:'Standard Room',price:'₹4,200',feats:['Mountain View','Double Bed','Hot Water','WiFi']},{name:'Trek Suite',price:'₹6,500',feats:['Valley View','King Bed','Gear Room','Guide Service']}],reviews:[{name:'Aditya Singh',date:'Aug 2025',stars:'★★★★★',text:'Perfect base for Valley of Flowers. The guide they provided was extremely knowledgeable.'},{name:'Priya Nair',date:'Jul 2025',stars:'★★★★★',text:'Lovely property in Joshimath. Food was delicious and staff very helpful for trek planning.'}]},
  lansdowne_h:{name:'Trishul Resort Lansdowne',loc:'Lansdowne, Pauri Garhwal, Uttarakhand',stars:3,rating:4.6,ratingLbl:'Very Good',price:'₹6,500',desc:'Hidden gem resort amidst dense oak and pine forests of Lansdowne. Panoramic views of the Trishul and Nanda Devi peaks. Perfect quiet escape from city chaos — only 5 hours from Delhi.',imgs:['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=85','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80'],amenities:['🌲 Pine Forest','🏔️ Trishul View','♾️ Pool','🍽️ Restaurant','🚶 Nature Trails','🔥 Bonfire','📶 WiFi','🚗 Transfers','🌅 Sunrise Point','🎣 Fishing','🦅 Bird Watching','🧘 Yoga'],rooms:[{name:'Forest Room',price:'₹6,500',feats:['Forest View','Double Bed','WiFi','Breakfast']},{name:'Mountain Suite',price:'₹10,000',feats:['Peak View','King Bed','Private Balcony','Bonfire']}],reviews:[{name:'Neha Sharma',date:'Mar 2025',stars:'★★★★★',text:'Most peaceful resort I have ever stayed in. The pine forest walks are magical.'},{name:'Rohit Verma',date:'Feb 2025',stars:'★★★★',text:'Hidden gem indeed! The Trishul peak view at sunrise is absolutely stunning.'}]},
  kausani_h:{name:'Kausani Tea Estate Resort',loc:'Kausani, Bageshwar, Uttarakhand',stars:4,rating:4.8,ratingLbl:'Excellent',price:'₹5,000',desc:"India's Switzerland — stunning 300km Himalayan panorama including Trishul, Nanda Devi and Panchachuli from your room. Set amidst lush Kausani tea gardens. Gateway to Pindari Glacier trek.",imgs:['https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=85','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80'],amenities:['🍵 Tea Garden','🏔️ Panchachuli View','🌅 Sunrise Point','🥾 Pindari Trek Base','🧘 Yoga','🍽️ Restaurant','📶 WiFi','🚗 Transfers','🌿 Garden Walk','🔭 Stargazing','🎨 Art Classes','📚 Library'],rooms:[{name:'Garden Room',price:'₹5,000',feats:['Tea Garden View','Double Bed','WiFi','Pahari Breakfast']},{name:'Himalayan Suite',price:'₹8,500',feats:['300km Panorama','King Bed','Private Sit-out','Yoga Mat']}],reviews:[{name:'Kavita Mehta',date:'Oct 2024',stars:'★★★★★',text:'The 300km Himalayan view from the room is unbelievable. Gandhiji was right to love Kausani!'},{name:'Suresh Joshi',date:'Sep 2024',stars:'★★★★★',text:'Best tea and best views in Uttarakhand. The sunrise from the resort is unmissable.'}]},
  binsar_h:{name:'Binsar Wildlife Retreat',loc:'Binsar Wildlife Sanctuary, Almora',stars:4,rating:4.7,ratingLbl:'Excellent',price:'₹7,800',desc:'Secluded eco-retreat inside Binsar Wildlife Sanctuary at 2,400m. 300km Himalayan view from Zero Point. Ancient Jageshwar temple cluster just 11km away. Birdwatching paradise with 200+ species.',imgs:['https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=900&q=85','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80','https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80'],amenities:['🦅 Birdwatching','🌲 Forest Walks','🏔️ Zero Point View','🍽️ Organic Meals','🛕 Jageshwar Nearby','📶 WiFi','🚗 Transfers','🌿 Eco Stay','🔭 Stargazing','🎣 Fishing','📷 Photography','🧘 Meditation'],rooms:[{name:'Eco Cottage',price:'₹7,800',feats:['Forest View','Double Bed','Organic Meals','Nature Guide']},{name:'Premium Cottage',price:'₹12,000',feats:['Zero Point View','King Bed','Private Garden','Birdwatching Kit']}],reviews:[{name:'Rajat Khanna',date:'Nov 2024',stars:'★★★★★',text:'Saw 80+ bird species in 2 days. The Zero Point view is one of the best in Uttarakhand.'},{name:'Meena Rao',date:'Oct 2024',stars:'★★★★★',text:'The most peaceful forest retreat. Jageshwar temples nearby are absolutely stunning.'}]},
  haridwar_h:{name:'Sattvik Ganga Retreat',loc:'Har Ki Pauri Road, Haridwar',stars:3,rating:4.6,ratingLbl:'Very Good',price:'₹3,800',desc:'Spiritual haven 2 minutes walk from the sacred Har Ki Pauri ghat. Watch the iconic Ganga Aarti from the hotel rooftop every evening. Pure veg sattvic kitchen, Ayurvedic treatments and daily meditation.',imgs:['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85','https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&q=80','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80'],amenities:['🕉️ Aarti View','🌊 Ghat Access','🧘 Meditation Hall','🍃 Ayurvedic Spa','🛕 Temple Walks','🍽️ Sattvic Meals','📶 WiFi','🚗 Transfers','♨️ Hot Water','🌅 Sunrise Aarti','🙏 Puja Arrangements','📚 Spiritual Library'],rooms:[{name:'Ganga View Room',price:'₹3,800',feats:['River View','Double Bed','AC','Sattvic Meals']},{name:'Rooftop Suite',price:'₹6,500',feats:['Aarti View Rooftop','King Bed','Meditation Corner','Ayurvedic Kit']}],reviews:[{name:'Alok Sharma',date:'Apr 2025',stars:'★★★★★',text:'Watching Ganga Aarti from the rooftop every evening was deeply spiritual. Perfect Haridwar stay.'},{name:'Rekha Gupta',date:'Mar 2025',stars:'★★★★★',text:'The sattvic food was outstanding and the meditation sessions at dawn are priceless.'}]}
};

function openHotelDetail(key) {
  const h = HOTELS[key];
  if (!h) { showToast('Details coming soon!'); return; }
  document.getElementById('hdImg1').src = h.imgs[0];
  document.getElementById('hdImg2').src = h.imgs[1];
  document.getElementById('hdImg3').src = h.imgs[2];
  document.getElementById('hdStars').textContent = '★'.repeat(h.stars);
  document.getElementById('hdName').textContent = h.name;
  document.getElementById('hdLoc').textContent = '📍 ' + h.loc;
  document.getElementById('hdPrice').innerHTML = h.price + ' <small>/night</small>';
  document.getElementById('hdPriceBottom').innerHTML = h.price + ' <small>/night</small>';
  document.getElementById('hdRatingNum').textContent = h.rating;
  document.getElementById('hdRatingLbl').textContent = h.ratingLbl;
  document.getElementById('hdDesc').textContent = h.desc;
  document.getElementById('hdAmenGrid').innerHTML = h.amenities.slice(0,6).map(a=>`<div class="hd-amen-item">${a}</div>`).join('');
  document.getElementById('hdFullAmen').innerHTML = h.amenities.map(a=>`<div class="hd-amen-item">${a}</div>`).join('');
  document.getElementById('hdRoomsList').innerHTML = h.rooms.map(r=>`<div class="hd-room"><div class="hd-room-info"><div class="hd-room-name">${r.name}</div><div class="hd-room-feats">${r.feats.map(f=>`<span class="hd-room-feat">${f}</span>`).join('')}</div></div><div class="hd-room-price">${r.price}<small style="font-family:'Nunito',sans-serif;font-size:.66rem;color:var(--stone);font-weight:400">/night</small></div><button class="btn-hbook" onclick="closeHotelDetail();openHotelBooking(document.getElementById('hdName')?.textContent, '${r.price.replace(/[₹,]/g,'')}')">Book</button></div>`).join('');
  document.getElementById('hdRevList').innerHTML = h.reviews.map(r=>`<div class="hd-rev"><div class="hd-rev-top"><div><div class="hd-rev-name">${r.name}</div><div class="hd-rev-date">${r.date}</div></div><div class="hd-rev-stars">${r.stars}</div></div><div class="hd-rev-text">"${r.text}"</div></div>`).join('');
  // Reset tabs
  document.querySelectorAll('.hd-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.hd-tab-panel').forEach(p=>p.classList.remove('active'));
  document.querySelector('.hd-tab').classList.add('active');
  document.getElementById('hdOverview').classList.add('active');
  document.getElementById('hdOv').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeHotelDetail() {
  document.getElementById('hdOv').classList.remove('show');
  document.body.style.overflow = '';
}
function switchHotelTab(btn, panelId) {
  document.querySelectorAll('.hd-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.hd-tab-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}
function filterHotels(btn, cat) {
  document.querySelectorAll('#hotelTabs .ftab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('#hotelGrid .hotel-card');
  let visible = 0;
  cards.forEach(c => {
    const match = cat === 'All' || c.dataset.cat === cat;
    c.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  document.getElementById('hotelCount').textContent = visible + ' hotel' + (visible!==1?'s':'');
}
function hotelSearchFilter(q) {
  const cards = document.querySelectorAll('#hotelGrid .hotel-card');
  let visible = 0;
  cards.forEach(c => {
    const match = !q || c.innerText.toLowerCase().includes(q.toLowerCase());
    c.classList.toggle('hidden', !match);
    if (match) visible++;
  });
  document.getElementById('hotelCount').textContent = visible + ' hotel' + (visible!==1?'s':'');
}
function sortHotels(v) {
  const grid = document.getElementById('hotelGrid');
  const cards = [...grid.querySelectorAll('.hotel-card')];
  cards.sort((a,b) => {
    if (v==='price-low') return +a.dataset.price - +b.dataset.price;
    if (v==='price-high') return +b.dataset.price - +a.dataset.price;
    if (v==='rating') return +b.dataset.rating - +a.dataset.rating;
    return 0;
  });
  cards.forEach(c => grid.appendChild(c));
}
function hotelSearch() {
  const checkin = document.getElementById('hbbCheckin').value;
  const checkout = document.getElementById('hbbCheckout').value;
  if (checkin && checkout && checkin >= checkout) {
    showToast('⚠️ Check-out must be after check-in'); return;
  }
  showToast('🔍 Searching available rooms…');
  setTimeout(() => showToast('✅ 12 hotels available for your dates!'), 1200);
}
// Set today as min for check-in
(function() {
  const today = new Date().toISOString().split('T')[0];
  const ci = document.getElementById('hbbCheckin');
  const co = document.getElementById('hbbCheckout');
  if (ci) { ci.min = today; ci.value = today; }
  if (co) { co.min = today; }
})();

/* ══════════════════════════════════════
   NEW FEATURES v2.0
══════════════════════════════════════ */

/* ── FAQ Accordion ── */
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── Scroll Reveal ── */
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
})();

/* ── Animated Counter ── */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = (target / duration) * 16;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + (suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.h-snum');
      nums.forEach(n => {
        const txt = n.textContent;
        if (txt.includes('K')) animateCounter(n, parseInt(txt) * 1000, 'K+');
        else if (txt.includes('+')) animateCounter(n, parseInt(txt), '+');
        else if (txt.includes('.')) {
          // rating - just show
        }
      });
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.home-stats-grid');
if (statsGrid) counterObserver.observe(statsGrid);

/* ── Set hero date default ── */
(function() {
  const hd = document.getElementById('heroDate');
  if (hd) {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    hd.value = d.toISOString().split('T')[0];
    hd.min = new Date().toISOString().split('T')[0];
  }
})();

/* ── Fix hero video toggle ── */
function toggleHeroVideo() {
  const bg = document.querySelector('.hero-bg');
  const vid = document.getElementById('heroVid');
  const btn = document.getElementById('vidToggleBtn');
  videoOn = !videoOn;
  if (videoOn) {
    if (bg) bg.style.opacity = '0';
    if (vid) vid.classList.remove('hidden');
    if (btn) btn.innerHTML = '🖼️ Switch to Photo';
  } else {
    if (bg) bg.style.opacity = '1';
    if (vid) vid.classList.add('hidden');
    if (btn) btn.innerHTML = '🎥 Switch to Video';
  }
}

/* ── subscribeNewsletter — api.js mein real server call ke saath hai ── */

/* ── Booking flow ── api.js mein handle hota hai ── */
function closeBooking() {
  document.getElementById('bookOv').classList.remove('show');
  document.body.style.overflow = '';
}
function updateBookSummary(priceStr, persons) {
  const price = parseInt(String(priceStr).replace(/[^0-9]/g,'')) || 0;
  const n = parseInt(persons) || 1;
  const sub = price * n;
  const tax = Math.round(sub * 0.05);
  const total = sub + tax;
  const fmt = v => '₹' + v.toLocaleString('en-IN');
  const s = document.getElementById('bsSubtotal');
  const t = document.getElementById('bsTax');
  const tt = document.getElementById('bsTotal');
  if(s) s.textContent = fmt(sub);
  if(t) t.textContent = fmt(tax);
  if(tt) tt.textContent = fmt(total);
}
/* ── confirmBooking, doLogin, doSignup, submitReview, subscribeNewsletter
      — ye sab api.js mein real server calls ke saath hain ── */

/* ── Search results rendering ── */
function renderSearchResults(q) {
  const res = document.getElementById('searchResults');
  if (!res) return;
  const filtered = q
    ? ALL_ITEMS.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.cat.toLowerCase().includes(q.toLowerCase()) || i.sub.toLowerCase().includes(q.toLowerCase()))
    : ALL_ITEMS;
  if (filtered.length === 0) {
    res.innerHTML = '<p style="color:var(--stone);padding:1rem 0;font-size:.87rem">No trips found. Try "Rishikesh", "Adventure", or "Spiritual".</p>';
    return;
  }
  res.innerHTML = filtered.map(i => `
    <div class="sr-item" onclick="closeSearch();openDetail('${i.key}')">
      <img class="sr-img" src="${i.img}" alt="${i.name}" loading="lazy"/>
      <div class="sr-info">
        <div class="sr-name">${i.name}</div>
        <div class="sr-sub">${i.sub}</div>
      </div>
      <div class="sr-price">${i.price}</div>
    </div>
  `).join('');
}

/* ── Auth doLogin ── */
window.doLogin = async function () {
  const email    = (document.getElementById('lEmail')?.value || '').trim();
  const password = (document.getElementById('lPass')?.value  || '');
  const btn      = document.getElementById('lSubmitBtn');

  if (!email)    { showToast('⚠️ Email likhein'); return; }
  if (!password) { showToast('⚠️ Password likhein'); return; }

  if (btn) { btn.disabled = true; btn.textContent = '⏳ Logging in…'; }
  try {
    const res  = await fetch(BASE_API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      showToast('✅ ' + data.message);
      closeAuth('loginMod');
      setTimeout(() => { window.location.href = 'user-dashboard.html'; }, 800);
    } else {
      showToast('❌ ' + (data.message || 'Login failed'));
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Server error. Dobara try karein.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Log In →'; }
  }
};

/* ── Forgot Password ── */
window.doForgotPassword = async function() {
  const email = (document.getElementById('fpEmail')?.value || '').trim();
  const btn   = document.getElementById('fpBtn');
  const msg   = document.getElementById('fpMsg');
  if (!email) { showToast('⚠️ Email likhein'); return; }
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Sending…'; }
  if (msg) { msg.style.display = 'none'; }
  try {
    const res  = await fetch(BASE_API + '/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (msg) {
      msg.style.display = 'block';
      msg.style.color   = data.success ? '#2d6a4f' : '#b33';
      msg.textContent   = data.message || (data.success ? 'Reset link sent!' : 'Error occurred.');
    }
    if (data.success) { showToast('✅ Reset link bhej diya!'); }
  } catch {
    if (msg) { msg.style.display = 'block'; msg.style.color = '#b33'; msg.textContent = 'Server se connect nahi ho pa raha.'; }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Send Reset Link →'; }
  }
};

/* ── Reveal observer init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Re-run reveal observer for dynamically loaded content
  const newRevObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        newRevObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => newRevObserver.observe(el));
  
  // Render initial search results
  if (document.getElementById('searchResults')) renderSearchResults('');
});

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('.m-close').forEach(btn => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.m-ov');
      if (modal) {
        modal.classList.remove('show');
        modal.style.display = "none";
      }
    });
  });

});

window.doSignup = async function () {
  const name     = (document.getElementById('sName')?.value  || '').trim();
  const email    = (document.getElementById('sEmail')?.value || '').trim();
  const phone    = (document.getElementById('sPhone')?.value || '').trim();
  const password = (document.getElementById('sPass')?.value  || '');
  const btn      = document.getElementById('sSubmitBtn');

  // ── Validations ──
  if (!name || name.length < 2) { showToast('⚠️ Apna poora naam likhein (min 2 characters)'); return; }

  // Strict email format check: must have local@domain.ext pattern
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!email)                    { showToast('⚠️ Email likhein'); return; }
  if (!emailRegex.test(email))   { showToast('⚠️ Valid email daalo (jaise: rahul@gmail.com)'); return; }

  // Phone validation (optional but if filled must be valid Indian number)
  if (phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/[\s\-+]/g, '').replace(/^91/, '');
    if (!phoneRegex.test(cleanPhone)) { showToast('⚠️ Valid 10-digit mobile number daalo'); return; }
  }

  if (!password || password.length < 8) { showToast('⚠️ Password kam se kam 8 characters ka hona chahiye'); return; }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) { showToast('⚠️ Password mein letter aur number dono hone chahiye'); return; }

  if (btn) { btn.disabled = true; btn.textContent = '⏳ Creating account…'; }

  try {
    const res    = await fetch(BASE_API + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const result = await res.json();
    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      showToast('✅ ' + result.message);
      closeAuth('signupMod');
      setTimeout(() => { window.location.href = 'user-dashboard.html'; }, 800);
    } else {
      showToast('❌ ' + (result.message || 'Signup failed'));
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Server error. Dobara try karein.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Create Account →'; }
  }
};

/* ── Load & Render Approved Reviews ── */
const REVIEW_COLORS = ['#c0392b','#2d6a4f','#a84070','#1a3c5e','#7d4e1b','#6d2b8c','#1a6e7a','#8c6b1a'];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)   return mins + ' minutes ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)    return hrs + ' hour' + (hrs > 1 ? 's' : '') + ' ago';
  const days = Math.floor(hrs / 24);
  if (days < 7)    return days + ' day' + (days > 1 ? 's' : '') + ' ago';
  const wks = Math.floor(days / 7);
  if (wks < 5)     return wks + ' week' + (wks > 1 ? 's' : '') + ' ago';
  const mons = Math.floor(days / 30);
  if (mons < 12)   return mons + ' month' + (mons > 1 ? 's' : '') + ' ago';
  return Math.floor(mons / 12) + ' year(s) ago';
}

function starsHtml(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function renderReviewCard(r, idx) {
  const initials = r.initials || (r.name || '?').trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const color    = REVIEW_COLORS[idx % REVIEW_COLORS.length];
  const ago      = r.createdAt ? timeAgo(r.createdAt) : '';
  const meta     = [r.city, ago].filter(Boolean).join(' · ');
  const pkg      = r.packageName ? `<span class="rev-pkg-tag">${r.packageName}</span>` : '';
  return `
    <div class="rev-card">
      <div class="rev-top">
        <div class="rev-person">
          <div class="rev-av-ph" style="background:${color}">${initials}</div>
          <div>
            <div class="rev-name">${r.name}</div>
            ${meta ? `<div class="rev-meta">${meta}</div>` : ''}
          </div>
        </div>
        <div class="rev-stars-sm" style="color:#f59e0b">${starsHtml(r.rating)}</div>
      </div>
      <div class="rev-text">"${r.text}"</div>
      ${pkg}
    </div>`;
}

const FALLBACK_REVIEWS = [
  { name:'Priya Sharma',    city:'Mumbai',    rating:5, text:'Char Dham trip was beyond spiritual — every detail was perfect. Our guide Ramesh knew every story.',      packageName:'Char Dham Yatra',         initials:'PS', createdAt: new Date(Date.now()-12*24*3600*1000).toISOString() },
  { name:'Arjun Mehta',     city:'Bangalore', rating:5, text:'Rishikesh Adventure Rush was the best 5 days of my life. Grade-4 rafting was both safe and thrilling!', packageName:'Rishikesh Adventure',      initials:'AM', createdAt: new Date(Date.now()-30*24*3600*1000).toISOString() },
  { name:'Sneha Gupta',     city:'Delhi',     rating:5, text:'Valley of Flowers in August — I didn\'t know India had something this magical. Zero hassle, flawless planning.',packageName:'Valley of Flowers Trek', initials:'SG', createdAt: new Date(Date.now()-20*24*3600*1000).toISOString() }
];

async function loadReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;

  try {
    const res  = await fetch(BASE_API + '/reviews?limit=20');
    const data = await res.json();

    if (data.success && data.data && data.data.length > 0) {
      // Only re-render if count changed (avoids flicker on every poll tick)
      if (data.total !== _lastReviewCount) {
        _lastReviewCount = data.total;

        // Update avg score & total
        const scoreEl = document.getElementById('revAvgScore');
        const starsEl = document.getElementById('revAvgStars');
        const totalEl = document.getElementById('revTotalCount');
        if (scoreEl) scoreEl.textContent = data.avgRating || '4.9';
        if (starsEl) starsEl.textContent = '★'.repeat(Math.round(data.avgRating || 5));
        if (totalEl) totalEl.textContent = data.total + (data.total === 1 ? ' review' : ' reviews');

        // Smooth update — fade out → update → fade in
        list.style.transition = 'opacity 0.3s';
        list.style.opacity = '0';
        setTimeout(() => {
          list.innerHTML = data.data.map((r, i) => renderReviewCard(r, i)).join('');
          list.style.opacity = '1';

          // If a new review just appeared, show a subtle toast
          if (_lastReviewCount > 0 && data.total > _lastReviewCount - (data.total - _lastReviewCount)) {
            const newCount = data.total - (_lastReviewCount - data.data.length > 0 ? _lastReviewCount - data.data.length : 0);
          }
        }, 300);
      }
    } else {
      // Server returned 0 approved reviews — show fallback (only on first load)
      if (_lastReviewCount === 0) {
        list.innerHTML = FALLBACK_REVIEWS.map((r, i) => renderReviewCard(r, i)).join('');
      }
    }
  } catch (e) {
    // Network error or server down — show fallback silently (only on first load)
    if (_lastReviewCount === 0) {
      list.innerHTML = FALLBACK_REVIEWS.map((r, i) => renderReviewCard(r, i)).join('');
    }
  }
}

// ── Review Polling ──
// Only runs on pages that have #reviewsList
// Polls every 30s, pauses when tab is hidden, stops after 10min of inactivity

let _reviewPollTimer   = null;
let _lastReviewCount   = 0;
let _pollInactiveTimer = null;
const POLL_INTERVAL_MS = 30 * 1000;       // 30 seconds
const POLL_STOP_MS     = 10 * 60 * 1000;  // stop after 10 min

function startReviewPolling() {
  if (!document.getElementById('reviewsList')) return; // not on this page

  // Initial load
  loadReviews();

  // Polling loop
  _reviewPollTimer = setInterval(async () => {
    if (document.hidden) return; // tab not visible — skip this tick
    await loadReviews();
  }, POLL_INTERVAL_MS);

  // Auto-stop polling after 10 min (battery / bandwidth friendly)
  _pollInactiveTimer = setTimeout(() => {
    clearInterval(_reviewPollTimer);
    _reviewPollTimer = null;
  }, POLL_STOP_MS);

  // Resume polling when user comes back to tab
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && _reviewPollTimer === null) {
      // Tab became visible again after being hidden — do one immediate refresh
      loadReviews();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startReviewPolling);
} else {
  startReviewPolling();
}

/* ── Submit Review ── */
window.submitReview = async function () {
  const name    = (document.getElementById('revName')?.value  || '').trim();
  const city    = (document.getElementById('revCity')?.value  || '').trim();
  const pkgEl   = document.getElementById('revPkg');
  const pkgName = pkgEl ? pkgEl.value : '';
  const text    = (document.getElementById('revText')?.value  || '').trim();
  const ratingEl = document.querySelector('input[name="star"]:checked');
  const rating  = ratingEl ? parseInt(ratingEl.value) : 0;

  if (!name)   { showToast('⚠️ Apna naam likhein'); return; }
  if (!rating) { showToast('⚠️ Rating select karein'); return; }
  if (!text || text.length < 10) { showToast('⚠️ Review thodi lambi likhein (min 10 characters)'); return; }

  const btn = document.querySelector('.btn-rev-sub');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Submitting…'; }

  try {
    const res  = await fetch(BASE_API + '/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, city, packageName: pkgName, packageKey: '', rating, text })
    });
    const data = await res.json();
    if (data.success) {
      showToast('✅ Review submit ho gayi! Approve hone ke baad dikhai degi.');
      // Reset form
      if (document.getElementById('revName'))  document.getElementById('revName').value  = '';
      if (document.getElementById('revCity'))  document.getElementById('revCity').value  = '';
      if (document.getElementById('revText'))  document.getElementById('revText').value  = '';
      if (pkgEl) pkgEl.value = '';
      document.querySelectorAll('input[name="star"]').forEach(r => r.checked = false);
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Review ⭐'; }
      // Refresh reviews list from server (approved ones will appear)
      _lastReviewCount = 0; // force re-render on next poll/load
      loadReviews();
    } else {
      showToast('❌ ' + (data.message || 'Kuch error aaya'));
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Review ⭐'; }
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Server se connect nahi ho pa raha.');
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Review ⭐'; }
  }
};

/* ── Newsletter Subscribe ── */
window.subscribeNewsletter = async function (inputId, source) {
  const email = (document.getElementById(inputId)?.value || '').trim();
  if (!email || !email.includes('@')) { showToast('⚠️ Valid email likhein'); return; }

  try {
    const res  = await fetch(BASE_API + '/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: source || 'website' })
    });
    const data = await res.json();
    if (data.success) {
      showToast('✅ ' + data.message);
      const el = document.getElementById(inputId);
      if (el) el.value = '';
    } else {
      showToast('❌ ' + (data.message || 'Kuch error aaya'));
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Server se connect nahi ho pa raha.');
  }
};

/* ═══════════════════════════════════════════════════════════════
   vehicle.js  —  DevBhoomi Travels
   Vehicle.html ke liye saare missing JS functions
   Include karo Vehicle.html mein:
     <script src="js/vehicle.js"></script>
   (main.js ke BAAD)
═══════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   VEHICLE DATA
────────────────────────────────────────────────────────────── */
const VEHICLES = {
  fortuner: {
    name: 'Toyota Fortuner',
    sub: 'Luxury SUV · 7 Seater · 4x4 AWD',
    price: '₹5,500',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85',
    desc: 'Uttarakhand\'s favourite luxury mountain vehicle. 4×4 AWD with permanent traction control handles the toughest Himalayan passes with ease. Premium leather interiors, JBL surround sound, dual-zone AC and a professional mountain driver make every journey feel like a VIP experience — perfect for honeymoon trips, corporate travel and high-altitude adventures.',
    feats: ['🏆 4x4 AWD', '❄️ Dual AC', '💎 Leather Seats', '🎵 JBL Sound', '📡 GPS', '🛎️ VIP Service', '🔦 Fog Lamps', '🧳 Roof Carrier'],
    routes: [
      { route: 'Dehradun → Kedarnath', km: '250 km', price: '₹6,000' },
      { route: 'Haridwar → Auli', km: '320 km', price: '₹7,500' },
      { route: 'Rishikesh → Char Dham', km: '500 km', price: '₹12,000' },
      { route: 'Dehradun → Jim Corbett', km: '280 km', price: '₹7,000' },
    ],
    reviews: [
      { name: 'Arjun Mehta', rating: 5, text: 'Best ride to Kedarnath! Driver was very experienced on mountain roads. Highly recommend.' },
      { name: 'Priya Singh', rating: 5, text: 'Fortuner handled the snowy Auli roads perfectly. Very comfortable and spacious.' },
    ],
  },
  innova_c: {
    name: 'Toyota Innova Crysta',
    sub: 'SUV · 7 Seater · Most Popular',
    price: '₹3,500',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=85',
    desc: 'The most trusted vehicle for Uttarakhand travel. Innova Crysta combines generous cabin space with a powerful diesel engine that handles mountain inclines effortlessly. Push-back seats, individual reading lights and a quiet cabin make it the top choice for families and pilgrim groups alike.',
    feats: ['❄️ AC', '📡 GPS', '🎵 Music System', '⛽ Diesel Engine', '💺 7 Recliner Seats', '🔦 Fog Lamps', '🧳 Boot Space', '📞 Charging Points'],
    routes: [
      { route: 'Dehradun → Mussoorie', km: '35 km', price: '₹1,200' },
      { route: 'Haridwar → Rishikesh', km: '24 km', price: '₹900' },
      { route: 'Dehradun → Kedarnath', km: '250 km', price: '₹4,500' },
      { route: 'Rishikesh → Nainital', km: '310 km', price: '₹5,500' },
    ],
    reviews: [
      { name: 'Sunita Rawat', rating: 5, text: 'Very comfortable for our family pilgrimage. Driver was helpful and punctual.' },
      { name: 'Rakesh Gupta', rating: 4, text: 'Good vehicle, smooth ride on mountain roads. Will book again.' },
    ],
  },
  tempo: {
    name: 'Tempo Traveller 12-Seater',
    sub: 'Group Vehicle · AC · Push-back Seats',
    price: '₹5,500',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=85',
    desc: 'Ideal for medium-sized groups travelling together. The 12-seater Tempo Traveller features individual reclining seats, a roof carrier for extra luggage, full AC and a professional driver experienced with mountain routes. Great value for group pilgrimages, school trips and corporate outings.',
    feats: ['❄️ Full AC', '💺 12 Recliner Seats', '🧳 Roof Rack', '📡 GPS', '🎵 Music System', '💡 Interior Lighting', '🔌 Charging Points', '🛡️ Insured'],
    routes: [
      { route: 'Haridwar → Kedarnath', km: '255 km', price: '₹7,000' },
      { route: 'Dehradun → Char Dham Yatra', km: '500 km', price: '₹14,000' },
      { route: 'Rishikesh → Valley of Flowers', km: '280 km', price: '₹8,000' },
    ],
    reviews: [
      { name: 'Gaurav Sharma', rating: 5, text: 'Our group of 10 had a fantastic trip. Seats were very comfortable even on long stretches.' },
      { name: 'Meena Agarwal', rating: 5, text: 'Driver was very courteous. AC worked perfectly in the hills. Highly recommended.' },
    ],
  },
  bolero: {
    name: 'Mahindra Bolero / Scorpio',
    sub: 'Hill Expert · 4x4 · Off-Road',
    price: '₹3,000',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=85',
    desc: 'The Bolero and Scorpio are legendary on Uttarakhand\'s mountain trails. Built for rugged terrain, these 4×4 diesel workhorses tackle snow, mud and steep inclines where other vehicles hesitate. Perfect for trekking base camps, remote villages and off-beat destinations.',
    feats: ['🏔️ 4x4 Drive', '⛽ Turbo Diesel', '🔦 Fog Lamps', '📡 GPS', '🛡️ Off-Road Ready', '🧳 Roof Carrier', '❄️ AC', '💪 High Ground Clearance'],
    routes: [
      { route: 'Dehradun → Chopta', km: '230 km', price: '₹4,000' },
      { route: 'Rishikesh → Gangotri', km: '250 km', price: '₹4,500' },
      { route: 'Haridwar → Hemkund Sahib', km: '290 km', price: '₹5,000' },
    ],
    reviews: [
      { name: 'Vikram Negi', rating: 5, text: 'Amazing on the rough roads to Chopta. Felt very safe even in snow.' },
      { name: 'Anita Rawat', rating: 4, text: 'Powerful vehicle. Great for remote places. Driver knew every turn.' },
    ],
  },
  ertiga: {
    name: 'Maruti Ertiga',
    sub: 'Family Sedan · 7 Seater · Budget',
    price: '₹2,200',
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=85',
    desc: 'The most budget-friendly option for families who need 7 seats without breaking the bank. The Ertiga\'s CNG/petrol engine keeps running costs low, while its compact dimensions make it easy to navigate narrow hill roads. Comfortable for distances up to 300 km.',
    feats: ['❄️ AC', '💺 7 Seats', '⛽ CNG / Petrol', '🎵 Music System', '📡 GPS', '🔌 USB Charging', '💡 LED Cabin Light', '💰 Budget-Friendly'],
    routes: [
      { route: 'Dehradun → Mussoorie', km: '35 km', price: '₹900' },
      { route: 'Rishikesh → Haridwar', km: '24 km', price: '₹700' },
      { route: 'Dehradun → Lansdowne', km: '165 km', price: '₹2,800' },
    ],
    reviews: [
      { name: 'Pooja Verma', rating: 4, text: 'Good value for money. Comfortable for a day trip. Will book again.' },
      { name: 'Rohan Bisht', rating: 5, text: 'Perfect for our small family. Clean car and friendly driver.' },
    ],
  },
  crysta_etios: {
    name: 'Etios / Swift Dzire',
    sub: 'Compact Sedan · 4 Seater · Best Value',
    price: '₹1,800',
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=85',
    desc: 'Our most economical option for solo travellers and couples. The Etios and Swift Dzire are fuel-efficient, easy to park and comfortable for the city and hills alike. Air-conditioned, GPS-equipped and driven by a verified professional driver.',
    feats: ['❄️ AC', '⛽ Fuel Efficient', '🎵 Music System', '📡 GPS', '💺 4 Seats', '🔌 USB Charging', '💰 Most Economical', '🚗 Easy on Hill Roads'],
    routes: [
      { route: 'Dehradun City Transfer', km: 'Local', price: '₹800' },
      { route: 'Dehradun → Mussoorie', km: '35 km', price: '₹700' },
      { route: 'Haridwar → Rishikesh', km: '24 km', price: '₹600' },
      { route: 'Dehradun → Chakrata', km: '90 km', price: '₹1,500' },
    ],
    reviews: [
      { name: 'Kiran Joshi', rating: 5, text: 'Very affordable and clean. Driver was on time. Perfect for a quick trip.' },
      { name: 'Amit Thakur', rating: 4, text: 'Good for solo travel. AC was great. Would recommend.' },
    ],
  },
  tempo17: {
    name: 'Tempo Traveller 17-Seater',
    sub: 'Large Group · AC Recliner · Group Favourite',
    price: '₹7,500',
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=900&q=85',
    desc: 'Our largest Tempo Traveller, seating up to 17 passengers with full recliner seats, a roof luggage carrier, flat-screen TV, PA music system and powerful full-AC. Ideal for large family groups, pilgrimage tours, school picnics and corporate team outings.',
    feats: ['❄️ Full AC', '💺 17 Recliner Seats', '🧳 Roof Carrier', '📺 Flat Screen TV', '🎵 PA Music System', '📡 GPS', '🔌 Charging Points', '🛡️ Fully Insured'],
    routes: [
      { route: 'Dehradun → Char Dham Yatra', km: '500 km', price: '₹18,000' },
      { route: 'Haridwar → Kedarnath', km: '255 km', price: '₹10,000' },
      { route: 'Rishikesh → Valley of Flowers', km: '280 km', price: '₹11,000' },
      { route: 'Dehradun → Jim Corbett', km: '280 km', price: '₹11,500' },
    ],
    reviews: [
      { name: 'Suresh Patel', rating: 5, text: 'Our group of 15 had an amazing Char Dham trip. TV kept everyone entertained. Excellent!' },
      { name: 'Rekha Nainwal', rating: 4, text: 'Very comfortable seats. Driver was experienced and safe. Will book again.' },
    ],
  },
  bus50: {
    name: 'Luxury Coach 50-Seater',
    sub: 'Large Groups · Pilgrimage · Corporate',
    price: '₹18,000',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85',
    desc: 'Our flagship luxury coach for very large groups — pilgrimages, corporate events, school tours and weddings. Features 50 recliner seats, full AC, two flat-screen TVs, a PA sound system, onboard toilet and GPS tracking. A professional driver with a dedicated helper ensures a smooth and safe journey across Uttarakhand.',
    feats: ['❄️ Full AC', '💺 50 Recliner Seats', '📺 2 Flat Screen TVs', '🎵 PA Sound System', '🚻 Onboard Toilet', '📡 GPS Tracked', '🛡️ Fully Insured', '🧑‍✈️ Driver + Helper'],
    routes: [
      { route: 'Haridwar → Char Dham Yatra', km: '500 km', price: '₹35,000' },
      { route: 'Dehradun → Badrinath', km: '300 km', price: '₹25,000' },
      { route: 'Delhi → Haridwar (One Way)', km: '220 km', price: '₹22,000' },
      { route: 'Rishikesh → Kedarnath', km: '220 km', price: '₹24,000' },
    ],
    reviews: [
      { name: 'Rajesh Tiwari', rating: 5, text: 'Took 45 people to Char Dham. Coach was pristine and driver was excellent. 10/10.' },
      { name: 'Savita Pandey', rating: 4, text: 'Very organised. TV and AC worked throughout. Highly recommend for large groups.' },
    ],
  },
};

/* ──────────────────────────────────────────────────────────────
   1.  FILTER VEHICLES (tabs)
────────────────────────────────────────────────────────────── */
function filterVehicles(tab, type) {
  // Active tab update
  document.querySelectorAll('#vehTabs .ftab').forEach(t => t.classList.remove('active'));
  if (tab) tab.classList.add('active');

  const cards = document.querySelectorAll('#vehGrid .veh-card');
  let shown = 0;
  cards.forEach(card => {
    const match = type === 'All' || card.dataset.type === type;
    card.style.display = match ? '' : 'none';
    if (match) shown++;
  });

  const countEl = document.getElementById('vehCount');
  if (countEl) countEl.textContent = shown + ' vehicle' + (shown !== 1 ? 's' : '');
}

/* ──────────────────────────────────────────────────────────────
   2.  SORT VEHICLES
────────────────────────────────────────────────────────────── */
function sortVehicles(value) {
  const grid = document.getElementById('vehGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.veh-card'));

  cards.sort((a, b) => {
    if (value === 'price-low')  return +a.dataset.price - +b.dataset.price;
    if (value === 'price-high') return +b.dataset.price - +a.dataset.price;
    if (value === 'rating')     return +b.dataset.rating - +a.dataset.rating;
    return 0;
  });

  cards.forEach(c => grid.appendChild(c));
}

/* ──────────────────────────────────────────────────────────────
   3.  VEHICLE SEARCH (book bar)
────────────────────────────────────────────────────────────── */
function vehicleSearch() {
  const pickup = document.getElementById('vbbPickup')?.value.trim();
  const drop   = document.getElementById('vbbDrop')?.value.trim();
  const date   = document.getElementById('vbbDate')?.value;

  if (!pickup) {
    document.getElementById('vbbPickup')?.focus();
    showToast('📍 Please enter a pickup location');
    return;
  }
  if (!drop) {
    document.getElementById('vbbDrop')?.focus();
    showToast('📍 Please enter a drop location');
    return;
  }
  if (!date) {
    document.getElementById('vbbDate')?.focus();
    showToast('📅 Please select a journey date');
    return;
  }

  // Show all cards and scroll down
  document.querySelectorAll('#vehGrid .veh-card').forEach(c => (c.style.display = ''));
  document.getElementById('vehGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast(`🔍 Showing vehicles for ${pickup} → ${drop}`);
}

/* ──────────────────────────────────────────────────────────────
   4.  OPEN VEHICLE DETAIL MODAL
────────────────────────────────────────────────────────────── */
function openVehicleDetail(id) {
  const v = VEHICLES[id];
  if (!v) return;

  // Basic info
  document.getElementById('vdImg').src        = v.img;
  document.getElementById('vdImg').alt        = v.name;
  document.getElementById('vdName').textContent = v.name;
  document.getElementById('vdSub').textContent  = v.sub;
  document.getElementById('vdPrice').innerHTML  = v.price + '<small>/day</small>';
  document.getElementById('vdPriceBottom').innerHTML = v.price + '<small>/day</small>';
  document.getElementById('vdDesc').textContent = v.desc;

  // Features grid
  document.getElementById('vdFeatList').innerHTML = v.feats
    .map(f => `<div class="vd-feat-item">${f}</div>`).join('');

  // Routes table
  document.getElementById('vdRouteList').innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:.85rem">
      <thead>
        <tr style="background:var(--mist)">
          <th style="padding:.6rem .8rem;text-align:left;color:var(--forest)">Route</th>
          <th style="padding:.6rem .8rem;text-align:center;color:var(--forest)">Distance</th>
          <th style="padding:.6rem .8rem;text-align:right;color:var(--forest)">Rate</th>
        </tr>
      </thead>
      <tbody>
        ${v.routes.map((r, i) => `
        <tr style="border-bottom:1px solid rgba(0,0,0,.06);background:${i % 2 === 0 ? 'transparent' : 'var(--mist)'}">
          <td style="padding:.55rem .8rem;color:var(--stone)">${r.route}</td>
          <td style="padding:.55rem .8rem;text-align:center;color:var(--stone)">${r.km}</td>
          <td style="padding:.55rem .8rem;text-align:right;font-weight:700;color:var(--pine)">${r.price}</td>
        </tr>`).join('')}
      </tbody>
    </table>`;

  // Reviews
  document.getElementById('vdRevList').innerHTML = v.reviews.map(r => `
    <div style="border-bottom:1px solid rgba(0,0,0,.07);padding:.9rem 0">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem">
        <span style="font-weight:700;font-size:.88rem;color:var(--forest)">${r.name}</span>
        <span style="color:#f59e0b;font-size:.85rem">${'⭐'.repeat(r.rating)}</span>
      </div>
      <p style="font-size:.83rem;color:var(--stone);line-height:1.65;margin:0">${r.text}</p>
    </div>`).join('');

  // Reset tabs to Overview
  switchVdTab(
    document.querySelector('.vd-tab'),
    'vdOverview'
  );

  // Show overlay
  const ov = document.getElementById('vdOv');
  if (ov) {
    ov.style.display = 'flex';
    requestAnimationFrame(() => ov.classList.add('show'));
    document.body.style.overflow = 'hidden';
  }
}

/* ──────────────────────────────────────────────────────────────
   5.  CLOSE VEHICLE DETAIL MODAL
────────────────────────────────────────────────────────────── */
function closeVehicleDetail() {
  const ov = document.getElementById('vdOv');
  if (ov) {
    ov.classList.remove('show');
    setTimeout(() => { ov.style.display = 'none'; }, 280);
    document.body.style.overflow = '';
  }
}

/* Close on backdrop click */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('vdOv')?.addEventListener('click', function (e) {
    if (e.target === this) closeVehicleDetail();
  });
});

/* ──────────────────────────────────────────────────────────────
   6.  SWITCH TABS IN VEHICLE DETAIL MODAL
────────────────────────────────────────────────────────────── */
function switchVdTab(btn, panelId) {
  document.querySelectorAll('.vd-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.vd-panel').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

/* ──────────────────────────────────────────────────────────────
   7.  OPEN BOOKING MODAL
────────────────────────────────────────────────────────────── */
function openBooking(vehicleName) {
  closeVehicleDetail();
  const name  = vehicleName || 'Selected Vehicle';
  const vKey  = Object.keys(VEHICLES).find(k => VEHICLES[k].name === name);
  const price = vKey ? VEHICLES[vKey].price.replace('₹', '').replace(',', '') : '';

  const ov = document.getElementById('bookOv');
  if (!ov) return;

  document.getElementById('bookTitle').textContent    = 'Book Your Vehicle';
  document.getElementById('bookPkgName').textContent  = name;
  document.getElementById('bookPkgName2').textContent = name;
  document.getElementById('bookPkgPrice').textContent = price ? '₹' + (+price).toLocaleString('en-IN') + '/day' : '—';

  // Reset form fields
  ['bookName', 'bookPhone', 'bookDate', 'bookMsg'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const personsEl = document.getElementById('bookPersons');
  if (personsEl) personsEl.value = '1';

  updateBookSummary(price, 1);

  ov.style.display = 'flex';
  requestAnimationFrame(() => ov.classList.add('show'));
  document.body.style.overflow = 'hidden';
}

/* Close booking on backdrop click */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('bookOv')?.addEventListener('click', function (e) {
    if (e.target === this) closeBooking();
  });
});

/* ──────────────────────────────────────────────────────────────
   8.  CONFIRM BOOKING
────────────────────────────────────────────────────────────── */
async function confirmBooking() {
  const name      = document.getElementById('bookName')?.value.trim();
  const phone     = document.getElementById('bookPhone')?.value.trim();
  const date      = document.getElementById('bookDate')?.value;
  const email     = document.getElementById('bookEmail')?.value.trim() || '';
  const persons   = parseInt(document.getElementById('bookPersons')?.value) || 1;
  const notes     = document.getElementById('bookMsg')?.value.trim() || '';
  const pkgKey    = document.getElementById('bookPkgKey')?.value || '';
  const pkgName   = document.getElementById('bookPkgName')?.textContent || document.getElementById('bookPkgName2')?.textContent || '';
  const pkgPrice  = document.getElementById('bookPkgPrice')?.textContent || '';
  const totalEl   = document.getElementById('bsTotal');
  const totalAmt  = totalEl ? parseFloat((totalEl.textContent||'').replace(/[₹,]/g,'')) || 0 : 0;

  if (!name)  { document.getElementById('bookName')?.focus();  showToast('👤 Apna naam likhein'); return; }
  if (!phone) { document.getElementById('bookPhone')?.focus(); showToast('📞 Mobile number likhein'); return; }
  if (!date)  { document.getElementById('bookDate')?.focus();  showToast('📅 Travel date select karein'); return; }

  const btn = document.getElementById('bookConfirmBtn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Booking ho rahi hai…'; }

  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const res  = await fetch(BASE_API + '/bookings', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        packageKey: pkgKey,
        packageName: pkgName,
        packagePrice: pkgPrice,
        name, phone, email,
        travelDate: date,
        persons,
        totalAmount: totalAmt,
        gstAmount: Math.round(totalAmt * 0.05),
        finalAmount: Math.round(totalAmt * 1.05),
        specialRequests: notes,
        source: 'website'
      })
    });
    const data = await res.json();
    if (data.success) {
      closeBooking();
      showToast('🎉 Booking query submit ho gayi! Booking ID: ' + (data.bookingId || '') + ' — Hum jaldi call karenge!');
      if (btn) { btn.disabled = false; btn.textContent = '✅ Confirm Booking →'; }
    } else {
      showToast('❌ ' + (data.message || 'Kuch error aaya'));
      if (btn) { btn.disabled = false; btn.textContent = '✅ Confirm Booking →'; }
    }
  } catch (err) {
    console.error(err);
    showToast('❌ Server se connect nahi ho pa raha. Dobara try karein.');
    if (btn) { btn.disabled = false; btn.textContent = '✅ Confirm Booking →'; }
  }
}

/* ──────────────────────────────────────────────────────────────
   CSS — vd-ov active state (agar style.css mein nahi hai)
   Yeh block sirf tab kaam karega jab vd-ov display:none ho
   by default. Adjust karo apni style.css ke hisaab se.
────────────────────────────────────────────────────────────── */
(function injectVdStyles() {
  if (document.getElementById('_vdStyles')) return;
  const s = document.createElement('style');
  s.id = '_vdStyles';
  s.textContent = `
    #vdOv { display:none; position:fixed; inset:0; background:rgba(26,58,42,.7);
            backdrop-filter:blur(10px); z-index:9000; align-items:flex-start;
            justify-content:center; padding:1.5rem 1rem; overflow-y:auto; }
    #vdOv.show { display:flex; animation:ovFade .25s ease; }
    .vd-feat-item { background:var(--mist,#f4f6f0); border-radius:8px;
                    padding:.5rem .8rem; font-size:.82rem; color:var(--forest,#1a3d2b);
                    font-weight:600; }
    .vd-feat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
                    gap:.5rem; }
    .vd-panel { display:none; }
    .vd-panel.active { display:block; animation:fadeUp .3s ease both; }
    #bookOv { display:none; position:fixed; inset:0; background:rgba(26,58,42,.65);
              backdrop-filter:blur(10px); z-index:99999; align-items:center;
              justify-content:center; padding:1rem; }
    #bookOv.show { display:flex; animation:ovFade .25s ease; }
  `;
  document.head.appendChild(s);
})();
/* ══════════════════════════════════════════════════════════════
   FIX 1: NAV UPDATE AFTER LOGIN — Login hone ke baad nav mein
           "Log In / Sign Up" ki jagah user name + Logout dikhao
══════════════════════════════════════════════════════════════ */
function updateNavForLoginState() {
  const userStr = localStorage.getItem('user');
  const token   = localStorage.getItem('token');
  if (!userStr || !token) return;

  let user;
  try { user = JSON.parse(userStr); } catch { return; }

  const displayName = user.name || user.email || 'Account';

  // Update every .nav-btns and .drawer-btns block on the page
  document.querySelectorAll('.nav-btns, .drawer-btns').forEach(function(wrap) {
    // Remove old login/signup buttons
    wrap.querySelectorAll('.btn-ln, .btn-su').forEach(function(b) { b.remove(); });

    // Add user greeting + dashboard + logout if not already added
    if (!wrap.querySelector('.nav-user-info')) {
      const greeting = document.createElement('a');
      greeting.className = 'nav-user-info';
      greeting.href = 'user-dashboard.html';
      greeting.style.cssText = 'font-size:.82rem;font-weight:700;color:var(--pine,#2d6a4f);cursor:pointer;padding:0 .3rem;text-decoration:none;display:inline-flex;align-items:center;gap:.3rem;border:1.5px solid rgba(45,106,79,.25);border-radius:50px;padding:.4rem .85rem;transition:all .2s;';
      greeting.textContent = '👤 ' + displayName.split(' ')[0];
      greeting.title = 'My Dashboard';

      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'btn-ln';
      logoutBtn.textContent = 'Logout';
      logoutBtn.onclick = function() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showToast('✅ Logout ho gaye!');
        setTimeout(function() { location.reload(); }, 700);
      };

      wrap.appendChild(greeting);
      wrap.appendChild(logoutBtn);
    }
  });
}

// Run on every page load
document.addEventListener('DOMContentLoaded', function() {
  updateNavForLoginState();
});

/* ══════════════════════════════════════════════════════════════
   HOTEL & VEHICLE BOOKING — handled by inline scripts in Hotel.html / Vehicle.html
   These stubs exist as fallback only if inline script somehow fails
══════════════════════════════════════════════════════════════ */
if (!window.openHotelBooking) {
  window.openHotelBooking = function(n,p){ console.warn('openHotelBooking fallback called'); };
}
if (!window.openVehicleBooking) {
  window.openVehicleBooking = function(n,p){ console.warn('openVehicleBooking fallback called'); };
}

/* ══════════════════════════════════════════════════════════════
   INJECT HOTEL & VEHICLE BOOKING MODALS + CSS into DOM
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {

  /* ── Shared CSS for both modals ── */
  const css = document.createElement('style');
  css.textContent = `
    #hotelBookOv, #vehicleBookOv {
      display:none; position:fixed; inset:0; background:rgba(0,0,0,.6);
      z-index:9500; align-items:center; justify-content:center;
      opacity:0; transition:opacity .28s ease;
    }
    #hotelBookOv.active, #vehicleBookOv.active { opacity:1; }
    .hv-book-box {
      background:#fff; border-radius:20px; width:min(600px,95vw);
      max-height:90vh; overflow-y:auto; box-shadow:0 24px 80px rgba(0,0,0,.25);
      font-family:'Nunito',sans-serif;
    }
    .hv-book-head {
      background:linear-gradient(135deg,var(--pine,#2d6a4f),var(--forest,#1a3d2b));
      color:#fff; padding:1.4rem 1.6rem; border-radius:20px 20px 0 0;
      position:relative;
    }
    .hv-book-head h2 { margin:0; font-size:1.1rem; font-weight:800; }
    .hv-book-head p  { margin:.2rem 0 0; font-size:.82rem; opacity:.85; }
    .hv-book-close {
      position:absolute; top:1rem; right:1rem; background:rgba(255,255,255,.15);
      border:none; color:#fff; width:30px; height:30px; border-radius:50%;
      cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center;
    }
    .hv-book-body { padding:1.4rem 1.6rem; }
    .hv-selected-bar {
      background:var(--mist,#f4f6f0); border-radius:12px;
      padding:.9rem 1.1rem; margin-bottom:1.2rem;
      display:flex; justify-content:space-between; align-items:center;
    }
    .hv-sel-name { font-weight:700; color:var(--forest,#1a3d2b); font-size:.88rem; }
    .hv-sel-price { font-family:'Cormorant Garamond',serif; font-size:1.2rem; color:var(--pine,#2d6a4f); font-weight:700; }
    .hv-field-row { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; margin-bottom:.8rem; }
    .hv-field-row.single { grid-template-columns:1fr; }
    .hv-field { display:flex; flex-direction:column; gap:.3rem; }
    .hv-field label { font-size:.75rem; font-weight:700; color:var(--stone,#666); text-transform:uppercase; letter-spacing:.4px; }
    .hv-field input, .hv-field select, .hv-field textarea {
      border:1.5px solid #e0e7e0; border-radius:10px; padding:.55rem .85rem;
      font-family:'Nunito',sans-serif; font-size:.88rem; color:var(--forest,#1a3d2b);
      outline:none; transition:border-color .18s;
    }
    .hv-field input:focus, .hv-field select:focus, .hv-field textarea:focus {
      border-color:var(--pine,#2d6a4f);
    }
    .hv-summary {
      background:var(--mist,#f4f6f0); border-radius:12px; padding:1rem 1.1rem; margin:1rem 0;
    }
    .hv-summary-title { font-size:.72rem; font-weight:800; color:var(--stone,#666); text-transform:uppercase; letter-spacing:.5px; margin-bottom:.7rem; }
    .hv-sum-row { display:flex; justify-content:space-between; font-size:.82rem; color:var(--stone,#666); margin-bottom:.3rem; }
    .hv-sum-total { display:flex; justify-content:space-between; font-weight:800; color:var(--forest,#1a3d2b); font-size:.95rem; border-top:1px solid rgba(82,169,122,.2); padding-top:.5rem; margin-top:.4rem; }
    .hv-sum-total span:last-child { font-family:'Cormorant Garamond',serif; font-size:1.15rem; color:var(--pine,#2d6a4f); }
    .hv-confirm-btn {
      width:100%; padding:.9rem; background:linear-gradient(135deg,var(--gold,#c9a227),#e8b84b);
      color:var(--forest,#1a3d2b); border:none; border-radius:12px; font-family:'Nunito',sans-serif;
      font-size:.95rem; font-weight:800; cursor:pointer; transition:opacity .2s;
      margin-top:.5rem;
    }
    .hv-confirm-btn:hover { opacity:.92; }
    .hv-confirm-btn:disabled { opacity:.6; cursor:not-allowed; }
    .hv-safe-note { text-align:center; font-size:.72rem; color:var(--stone,#666); margin-top:.6rem; }
    @media(max-width:520px){ .hv-field-row { grid-template-columns:1fr; } }
  `;
  document.head.appendChild(css);

  /* ── Hotel Booking Modal HTML ── */
  const hotelModal = document.createElement('div');
  hotelModal.id = 'hotelBookOv';
  hotelModal.innerHTML = `
    <div class="hv-book-box">
      <div class="hv-book-head">
        <h2>🏨 Hotel Booking</h2>
        <p id="hbHotelName">Selected Hotel</p>
        <button class="hv-book-close" onclick="closeHotelBooking()">✕</button>
      </div>
      <div class="hv-book-body">
        <div class="hv-selected-bar">
          <div class="hv-sel-name" id="hbHotelName2">Hotel</div>
          <div class="hv-sel-price" id="hbPricePerNight">—</div>
        </div>
        <div class="hv-field-row">
          <div class="hv-field">
            <label>Your Full Name *</label>
            <input type="text" id="hbGuestName" placeholder="Rahul Sharma"/>
          </div>
          <div class="hv-field">
            <label>Mobile Number *</label>
            <input type="tel" id="hbPhone" placeholder="+91 98765 43210"/>
          </div>
        </div>
        <div class="hv-field-row single">
          <div class="hv-field">
            <label>Email (optional)</label>
            <input type="email" id="hbEmail" placeholder="you@example.com"/>
          </div>
        </div>
        <div class="hv-field-row">
          <div class="hv-field">
            <label>Check-in Date *</label>
            <input type="date" id="hbCheckin" onchange="calcHotelTotal()"/>
          </div>
          <div class="hv-field">
            <label>Check-out Date *</label>
            <input type="date" id="hbCheckout" onchange="calcHotelTotal()"/>
          </div>
        </div>
        <div class="hv-field-row">
          <div class="hv-field">
            <label>Number of Rooms</label>
            <select id="hbRooms" onchange="calcHotelTotal()">
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
              <option value="4">4 Rooms</option>
            </select>
          </div>
          <div class="hv-field">
            <label>Total Guests</label>
            <select id="hbGuests">
              <option value="1">1 Guest</option>
              <option value="2" selected>2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>
        </div>
        <div class="hv-field-row single">
          <div class="hv-field">
            <label>Special Requests (optional)</label>
            <input type="text" id="hbRequests" placeholder="Veg food, ground floor room, anniversary…"/>
          </div>
        </div>
        <div class="hv-summary">
          <div class="hv-summary-title">Booking Summary</div>
          <div class="hv-sum-row"><span>Duration</span><span id="hbNights">—</span></div>
          <div class="hv-sum-row"><span>Room Charges</span><span id="hbSubtotal">—</span></div>
          <div class="hv-sum-row"><span>GST</span><span id="hbGst">—</span></div>
          <div class="hv-sum-total"><span>Total Amount</span><span id="hbTotal">—</span></div>
        </div>
        <button class="hv-confirm-btn" id="hbConfirmBtn" onclick="confirmHotelBooking()">🏨 Confirm Hotel Booking →</button>
        <p class="hv-safe-note">🔒 Secure booking · Free cancellation within 48 hrs · Pay 30% advance</p>
      </div>
    </div>
  `;
  document.body.appendChild(hotelModal);
  hotelModal.addEventListener('click', function(e) {
    if (e.target === hotelModal) closeHotelBooking();
  });

  /* ── Vehicle Booking Modal HTML ── */
  const vehicleModal = document.createElement('div');
  vehicleModal.id = 'vehicleBookOv';
  vehicleModal.innerHTML = `
    <div class="hv-book-box">
      <div class="hv-book-head">
        <h2>🚗 Vehicle Booking</h2>
        <p id="vbVehicleName">Selected Vehicle</p>
        <button class="hv-book-close" onclick="closeVehicleBooking()">✕</button>
      </div>
      <div class="hv-book-body">
        <div class="hv-selected-bar">
          <div class="hv-sel-name" id="vbVehicleName2">Vehicle</div>
          <div class="hv-sel-price" id="vbPricePerDay">—</div>
        </div>
        <div class="hv-field-row">
          <div class="hv-field">
            <label>Your Full Name *</label>
            <input type="text" id="vbGuestName" placeholder="Rahul Sharma"/>
          </div>
          <div class="hv-field">
            <label>Mobile Number *</label>
            <input type="tel" id="vbPhone" placeholder="+91 98765 43210"/>
          </div>
        </div>
        <div class="hv-field-row single">
          <div class="hv-field">
            <label>Email (optional)</label>
            <input type="email" id="vbEmail" placeholder="you@example.com"/>
          </div>
        </div>
        <div class="hv-field-row">
          <div class="hv-field">
            <label>Pickup Location *</label>
            <input type="text" id="vbPickup" placeholder="Dehradun Railway Station"/>
          </div>
          <div class="hv-field">
            <label>Drop Location</label>
            <input type="text" id="vbDropoff" placeholder="Rishikesh / Mussoorie…"/>
          </div>
        </div>
        <div class="hv-field-row">
          <div class="hv-field">
            <label>Pickup Date *</label>
            <input type="date" id="vbStartDate" onchange="calcVehicleTotal()"/>
          </div>
          <div class="hv-field">
            <label>Return Date</label>
            <input type="date" id="vbEndDate" onchange="calcVehicleTotal()"/>
          </div>
        </div>
        <div class="hv-field-row single">
          <div class="hv-field">
            <label>Special Requests (optional)</label>
            <input type="text" id="vbRequests" placeholder="Early morning pickup, child seat, return trip…"/>
          </div>
        </div>
        <div class="hv-summary">
          <div class="hv-summary-title">Booking Summary</div>
          <div class="hv-sum-row"><span>Duration</span><span id="vbDays">—</span></div>
          <div class="hv-sum-row"><span>Vehicle Charges</span><span id="vbSubtotal">—</span></div>
          <div class="hv-sum-row"><span>GST (5%)</span><span id="vbGst">—</span></div>
          <div class="hv-sum-total"><span>Total Amount</span><span id="vbTotal">—</span></div>
        </div>
        <button class="hv-confirm-btn" id="vbConfirmBtn" onclick="confirmVehicleBooking()">🚗 Confirm Vehicle Booking →</button>
        <p class="hv-safe-note">🔒 Secure booking · Driver included · Fuel charges may apply</p>
      </div>
    </div>
  `;
  document.body.appendChild(vehicleModal);
  vehicleModal.addEventListener('click', function(e) {
    if (e.target === vehicleModal) closeVehicleBooking();
  });

}); // end DOMContentLoaded

/* ══════════════════════════════════════════════════════════════
   LOCAL BOOKING STORAGE — fallback when backend is offline
══════════════════════════════════════════════════════════════ */
window.saveBookingLocally = function(payload) {
  try {
    var existing = JSON.parse(localStorage.getItem('devbhoomi_local_bookings') || '[]');
    var booking = Object.assign({}, payload, {
      id:        'local_' + Date.now(),
      bookingId: 'BK-' + Date.now().toString().slice(-6),
      status:    'Query Received',
      createdAt: new Date().toISOString(),
      _isLocal:  true
    });
    existing.unshift(booking);
    localStorage.setItem('devbhoomi_local_bookings', JSON.stringify(existing));
    console.log('✅ Booking saved locally:', booking.bookingId);
  } catch(e) {
    console.error('Local save failed:', e);
  }
};
