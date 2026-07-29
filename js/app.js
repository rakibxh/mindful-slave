/**
 * app.js
 * Application state, routing and screen rendering for Mindful Slave.
 * Vanilla JS, no build step — designed to be served as-is from GitHub Pages.
 */

const LS_KEYS = {
  lang: "ms_lang",
  theme: "ms_theme",
  user: "ms_user",
  dhikr: (username) => `ms_dhikr_${username}`,
  customDhikr: (username) => `ms_customDhikr_${username}`
};

const state = {
  lang: localStorage.getItem(LS_KEYS.lang) || "en",
  theme: localStorage.getItem(LS_KEYS.theme) || "dark",
  user: JSON.parse(localStorage.getItem(LS_KEYS.user) || "null"),
  screen: "signup",
  param: null,
  menuOpen: false
};

function t(key) { return UI_STRINGS[state.lang][key] || key; }
function todayStr(d = new Date()) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatDisplayDate(dateStr, lang) {
  const d = new Date(dateStr + "T00:00:00");
  const dd = String(d.getDate()).padStart(2, "0"), mm = String(d.getMonth() + 1).padStart(2, "0"), yy = d.getFullYear();
  const weekday = (lang === "bn" ? WEEKDAYS_BN : WEEKDAYS_EN)[d.getDay()];
  const dateNum = lang === "bn" ? `${toBnNumber(dd)}.${toBnNumber(mm)}.${toBnNumber(yy)}` : `${dd}.${mm}.${yy}`;
  return `${dateNum}, ${weekday}`;
}

function saveUser() { localStorage.setItem(LS_KEYS.user, JSON.stringify(state.user)); }
function setScreen(screen, param = null) { state.screen = screen; state.param = param; state.menuOpen = false; render(); window.scrollTo(0, 0); }

/* ---------------------- local dhikr storage ---------------------- */
function getDhikrStore() {
  if (!state.user) return {};
  return JSON.parse(localStorage.getItem(LS_KEYS.dhikr(state.user.username)) || "{}");
}
function setDhikrStore(store) {
  localStorage.setItem(LS_KEYS.dhikr(state.user.username), JSON.stringify(store));
}
function addDhikrCount(dhikrId, amount) {
  const store = getDhikrStore();
  const day = todayStr();
  store[day] = store[day] || {};
  store[day][dhikrId] = Math.min(99999, (store[day][dhikrId] || 0) + amount);
  setDhikrStore(store);
  Api.logDhikr(state.user.username, dhikrId, store[day][dhikrId], day);
  return store[day][dhikrId];
}
function getRecentDays(dhikrId, n = 3) {
  const store = getDhikrStore();
  return Object.keys(store)
    .filter(d => store[d][dhikrId] !== undefined)
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, n)
    .map(d => ({ date: d, count: store[d][dhikrId] }));
}
function getCustomDhikrIds() {
  if (!state.user) return [];
  return JSON.parse(localStorage.getItem(LS_KEYS.customDhikr(state.user.username)) || "[]");
}
function addCustomDhikr(id) {
  const list = getCustomDhikrIds();
  if (!list.includes(id)) { list.push(id); localStorage.setItem(LS_KEYS.customDhikr(state.user.username), JSON.stringify(list)); }
}

/* ---------------------------- icons ---------------------------- */
const ICONS = {
  burger: `<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  quran: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 4.5c3 0 4.5 1 8 1s5-1 8-1v15c-3 0-4.5 1-8 1s-5-1-8-1V4.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 5.5v14" stroke="currentColor" stroke-width="1.6"/></svg>`,
  dhikr: `<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="17.5" cy="8.5" r="1.6" fill="currentColor"/><circle cx="17.5" cy="15.5" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/><circle cx="6.5" cy="15.5" r="1.6" fill="currentColor"/><circle cx="6.5" cy="8.5" r="1.6" fill="currentColor"/></svg>`,
  dua: `<span style="font-size:20px;line-height:1">🤲</span>`,
  account: `<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 20c1.6-3.6 4.6-5.5 7.5-5.5s5.9 1.9 7.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  theme: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  lang: `<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="20" height="20"><rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`
};

/* ---------------------------- header ---------------------------- */
function renderHeader() {
  const loggedIn = !!state.user;
  return `
    <header class="app-header">
      <span class="app-title">${UI_STRINGS[state.lang].appTitle}</span>
      ${loggedIn
        ? `<button class="icon-btn burger-btn" onclick="toggleMenu()">${ICONS.burger}</button>`
        : `<button class="lang-switch" onclick="toggleLang()">${state.lang === "en" ? "En / Bn" : "En / Bn"}</button>`}
    </header>
    ${loggedIn ? renderMenu() : ""}
  `;
}

function renderMenu() {
  if (!state.menuOpen) return "";
  return `
    <div class="menu-ribbon">
      <button class="menu-icon" onclick="toggleLang()" title="${t('language')}">${ICONS.lang}<span>${state.lang === "en" ? "Bn" : "En"}</span></button>
      <button class="menu-icon" onclick="toggleTheme()" title="${t('theme')}">${ICONS.theme}<span>${state.theme === "dark" ? "Light" : "Dark"}</span></button>
      <button class="menu-icon" onclick="setScreen('account')" title="${t('account')}">${ICONS.account}<span>${t('account')}</span></button>
      <div class="menu-divider"></div>
      <button class="menu-icon" onclick="setScreen('recitation')" title="${t('recitation')}">${ICONS.quran}<span>${t('recitation')}</span></button>
      <button class="menu-icon" onclick="setScreen('dhikrMain')" title="${t('dhikr')}">${ICONS.dhikr}<span>${t('dhikr')}</span></button>
      <button class="menu-icon" onclick="setScreen('dua')" title="${t('dua')}">${ICONS.dua}<span>${t('dua')}</span></button>
      <div class="menu-divider"></div>
      <button class="menu-icon" onclick="setScreen('home')" title="${t('home')}">🏠<span>${t('home')}</span></button>
    </div>
  `;
}

function toggleMenu() { state.menuOpen = !state.menuOpen; render(); }
function toggleLang() { state.lang = state.lang === "en" ? "bn" : "en"; localStorage.setItem(LS_KEYS.lang, state.lang); render(); }
function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem(LS_KEYS.theme, state.theme);
  document.body.classList.toggle("theme-light", state.theme === "light");
  render();
}

/* ---------------------------- SIGN UP ---------------------------- */
function screenSignup() {
  return `
    <div class="screen card-screen">
      <h1 class="screen-title">${t('signupTitle')}</h1>
      <form id="signupForm" class="form" onsubmit="return handleSignup(event)">
        <label>${t('username')}<input required name="username" type="text" autocomplete="off"></label>
        <label>${t('name')}<input required name="name" type="text"></label>
        <label>${t('email')}<input required name="email" type="email"></label>
        <label class="gender-label">${t('gender')}
          <div class="switcher" id="genderSwitch">
            <button type="button" class="switch-opt active" data-value="male" onclick="pickGender(this)">${t('male')}</button>
            <button type="button" class="switch-opt" data-value="female" onclick="pickGender(this)">${t('female')}</button>
          </div>
        </label>
        <label>${t('country')}
          <select required name="country">${COUNTRY_OPTIONS}</select>
        </label>
        <label>${t('pin')}<input required name="pin" type="password" inputmode="numeric" pattern="\\d{4}" maxlength="4"></label>
        <button type="submit" class="btn-primary">${t('signup')}</button>
      </form>
    </div>`;
}
const COUNTRY_LIST = ["Bangladesh","India","Pakistan","Saudi Arabia","United Arab Emirates","United Kingdom","United States","Malaysia","Indonesia","Canada","Australia","Other"];
const COUNTRY_OPTIONS = COUNTRY_LIST.map(c => `<option value="${c}">${c}</option>`).join("");

function pickGender(btn) {
  btn.parentElement.querySelectorAll(".switch-opt").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

async function handleSignup(e) {
  e.preventDefault();
  const f = e.target;
  const gender = f.querySelector("#genderSwitch .switch-opt.active").dataset.value;
  const profile = {
    username: f.username.value.trim(),
    name: f.name.value.trim(),
    email: f.email.value.trim(),
    gender, country: f.country.value,
    pin: f.pin.value,
    recoveryPin: String(Math.floor(100000 + Math.random() * 900000))
  };
  await Api.signup(profile);
  state.user = profile;
  saveUser();
  setScreen("recoveryPin");
  return false;
}

function screenRecoveryPin() {
  return `
    <div class="screen card-screen">
      <h1 class="screen-title">${t('recoveryPinTitle')}</h1>
      <div class="pin-display">${state.user.recoveryPin}</div>
      <p class="muted">${t('recoveryPinBody')}</p>
      <button class="btn-primary" onclick="setScreen('home')">${t('continue')}</button>
    </div>`;
}

function screenPinPrompt() {
  return `
    <div class="screen card-screen">
      <h1 class="screen-title">${t('pinPromptTitle')}</h1>
      <p class="muted">${t('pinPromptBody')}</p>
      <form class="form" onsubmit="return handlePinUnlock(event)">
        <input required name="rpin" type="password" inputmode="numeric" pattern="\\d{6}" maxlength="6" class="pin-input">
        <button type="submit" class="btn-primary">${t('unlock')}</button>
      </form>
    </div>`;
}
async function handlePinUnlock(e) {
  e.preventDefault();
  const rpin = e.target.rpin.value;
  const res = await Api.verifyRecoveryPin(state.user?.username, rpin);
  if (res.offline || (res.ok !== false)) { setScreen("home"); }
  else { alert(state.lang === "bn" ? "ভুল পিন" : "Incorrect PIN"); }
  return false;
}

/* ---------------------------- HOME ---------------------------- */
function screenHome() {
  const dateStr = formatHijriDate(new Date(), state.lang);
  const msg = pickHomeMessage(new Date())[state.lang];
  return `
    <div class="screen">
      <p class="p1">${state.lang === "bn" ? "আজ" : "Today is"} <strong>${dateStr}</strong>.</p>
      <div class="msg-card">
        ${msg.title ? `<h3>${msg.title}</h3>` : ""}
        <p>${msg.body}</p>
      </div>
      <div class="home-links">
        <button class="link-card" onclick="setScreen('recitation')">${ICONS.quran}<span>${t('recitation')}</span></button>
        <button class="link-card" onclick="setScreen('dhikrMain')">${ICONS.dhikr}<span>${t('dhikr')}</span></button>
        <button class="link-card" onclick="setScreen('dua')">${ICONS.dua}<span>${t('dua')}</span></button>
      </div>
    </div>`;
}

/* ---------------------- DAILY RECITATION SCHEDULE ---------------------- */
function screenRecitation() {
  const L = state.lang;
  const rows = RECITATION_SCHEDULE_GROUPS.map(g => {
    if (g.items) {
      return g.items.map(id => {
        const it = RECITATION_ITEMS[id][L];
        return `<li><button class="link-line" onclick="setScreen('recitationDetail','${id}')">${it.verse}</button></li>`;
      }).join("");
    }
    const it = RECITATION_ITEMS[g.timeKey][L];
    return `<li><button class="link-line" onclick="setScreen('recitationDetail','${g.timeKey}')">${it.verse}</button></li>`;
  });
  const headings = {
    afterFard: RECITATION_ITEMS.afterFard[L].heading,
    morningEvening: RECITATION_ITEMS.morningEvening[L].heading,
    beforeSleep: RECITATION_ITEMS.ayatKursiSleep[L].heading,
    everyNight: RECITATION_ITEMS.everyNight[L].heading,
    everyFriday: RECITATION_ITEMS.everyFriday[L].heading,
    fridayFajr: RECITATION_ITEMS.fridayFajr[L].heading
  };
  return `
    <div class="screen">
      <h1 class="screen-title">${L === "bn" ? "দৈনন্দিন সুন্নাহভিত্তিক কুরআন তিলাওয়াতের আমল" : "Practical Daily Sunnah Schedule"}</h1>
      <div class="sched-group"><h4>${headings.afterFard}</h4><ul>${rows[0]}</ul></div>
      <div class="sched-group"><h4>${headings.morningEvening}</h4><ul>${rows[1]}</ul></div>
      <div class="sched-group"><h4>${headings.beforeSleep}</h4><ul>${rows[2]}</ul></div>
      <div class="sched-group"><h4>${headings.everyNight}</h4><ul>${rows[3]}</ul></div>
      <div class="sched-group"><h4>${headings.everyFriday}</h4><ul>${rows[4]}</ul></div>
      <div class="sched-group"><h4>${headings.fridayFajr}</h4><ul>${rows[5]}</ul></div>
    </div>`;
}

function screenRecitationDetail(id) {
  const it = RECITATION_ITEMS[id][state.lang];
  return `
    <div class="screen card-screen">
      <button class="back-btn" onclick="setScreen('recitation')">←</button>
      <h1 class="screen-title">${it.verse}</h1>
      <p class="eyebrow">${it.heading}</p>
      <div class="hadith-card">
        <p>${it.hadith}</p>
        <p class="ref">${it.ref}</p>
      </div>
    </div>`;
}

/* ---------------------------- DHIKR TOOLS ---------------------------- */
function screenDhikrMain() {
  const ids = [...DHIKR_DEFAULT_IDS, ...getCustomDhikrIds()];
  const capsules = ids.map(id => `<button class="capsule" onclick="setScreen('dhikrDetail','${id}')">${DHIKR_LIBRARY[id][state.lang].name}</button>`).join("");
  return `
    <div class="screen">
      <h1 class="screen-title">${t('dhikr')}</h1>
      <div class="capsule-row">${capsules}</div>
      <button class="add-btn" onclick="openAddDhikr()">+</button>
      <div id="addDhikrPanel"></div>
    </div>`;
}

function openAddDhikr() {
  const existing = new Set([...DHIKR_DEFAULT_IDS, ...getCustomDhikrIds()]);
  const options = Object.keys(DHIKR_LIBRARY).filter(id => !existing.has(id));
  const panel = document.getElementById("addDhikrPanel");
  if (!options.length) { panel.innerHTML = `<p class="muted">—</p>`; return; }
  panel.innerHTML = `
    <div class="add-panel">
      ${options.map(id => `<button class="capsule outline" onclick="addCustomDhikr('${id}'); render();">${DHIKR_LIBRARY[id][state.lang].name}</button>`).join("")}
    </div>`;
}

function screenDhikrDetail(id) {
  const item = DHIKR_LIBRARY[id][state.lang];
  const store = getDhikrStore();
  const todayCount = (store[todayStr()] && store[todayStr()][id]) || 0;
  const recent = getRecentDays(id, 3);
  const recentHtml = recent.length
    ? recent.map(r => `<div class="recent-row">${formatDisplayDate(r.date, state.lang)}: ${state.lang === "bn" ? toBnNumber(r.count) : r.count} ${t('times')}</div>`).join("")
    : `<div class="muted">${t('noRecords')}</div>`;
  return `
    <div class="screen">
      <button class="back-btn" onclick="setScreen('dhikrMain')">←</button>
      <h1 class="dhikr-title">${item.name}</h1>
      <div class="counter-box" id="counterBox">${state.lang === "bn" ? toBnNumber(todayCount) : todayCount.toLocaleString()}</div>
      <p class="counter-label">${t('dailyDhikrCount')}</p>
      <div class="tap-row">
        <button class="tap-btn" onclick="tapDhikr('${id}',1)">1</button>
        <button class="tap-btn" onclick="tapDhikr('${id}',20)">20</button>
        <button class="tap-btn" onclick="tapDhikr('${id}',100)">100</button>
      </div>
      <div class="recent-section">
        <h4>${t('recentDhikr')}</h4>
        ${recentHtml}
      </div>
      <div class="ref-section">
        <h4>${t('authenticRef')}</h4>
        ${item.arabic ? `<p class="arabic">${item.arabic}</p>` : ""}
        <p>${item.hadith}</p>
        <p class="ref">${item.ref}</p>
      </div>
    </div>`;
}
function tapDhikr(id, amount) {
  const newVal = addDhikrCount(id, amount);
  const box = document.getElementById("counterBox");
  if (box) box.textContent = state.lang === "bn" ? toBnNumber(newVal) : newVal.toLocaleString();
  const recentWrap = document.querySelector(".recent-section");
  if (recentWrap) {
    const recent = getRecentDays(id, 3);
    recentWrap.innerHTML = `<h4>${t('recentDhikr')}</h4>` + (recent.length
      ? recent.map(r => `<div class="recent-row">${formatDisplayDate(r.date, state.lang)}: ${state.lang === "bn" ? toBnNumber(r.count) : r.count} ${t('times')}</div>`).join("")
      : `<div class="muted">${t('noRecords')}</div>`);
  }
}

/* ---------------------------- DU'A ---------------------------- */
function screenDua() {
  const cards = DUA_LIST.map(d => `
    <div class="dua-card">
      <h4>${d.emoji} ${d[state.lang].title}</h4>
      <p class="arabic">${d.arabic}</p>
      ${d.translit ? `<p class="translit">${d.translit}</p>` : ""}
      <p>${d.en_body}</p>
      <p>${d.bn_body}</p>
      <p class="ref">${d.ref}</p>
    </div>`).join("");
  return `<div class="screen"><h1 class="screen-title">${t('dua')}</h1>${cards}</div>`;
}

/* ---------------------------- ACCOUNT ---------------------------- */
function screenAccount() {
  const u = state.user;
  const dateSel = todayStr();
  return `
    <div class="screen">
      <h1 class="screen-title">${t('accountCredentials')}</h1>
      <form class="form" onsubmit="return handleAccountSave(event)">
        <label>${t('name')}<input name="name" value="${u.name || ""}"></label>
        <label>${t('email')}<input name="email" type="email" value="${u.email || ""}"></label>
        <label>${t('phone')}<input name="phone" type="tel" value="${u.phone || ""}"></label>
        <label>${t('pin')}<input name="pin" type="password" inputmode="numeric" pattern="\\d{4}" maxlength="4" value="${u.pin || ""}"></label>
        <button type="submit" class="btn-primary">${t('save')}</button>
      </form>

      <h2 class="section-title">${t('dailyDhikrRecord')}</h2>
      <label class="date-picker">${ICONS.calendar}
        <input type="date" id="recordDate" value="${dateSel}" onchange="renderDhikrRecord(this.value)">
      </label>
      <div id="dhikrRecordList"></div>
    </div>`;
}
function renderDhikrRecordOnLoad() { renderDhikrRecord(todayStr()); }
function renderDhikrRecord(dateStr) {
  const store = getDhikrStore();
  const day = store[dateStr] || {};
  const ids = Object.keys(day);
  const wrap = document.getElementById("dhikrRecordList");
  if (!wrap) return;
  if (!ids.length) { wrap.innerHTML = `<p class="muted">${t('noRecords')}</p>`; return; }
  wrap.innerHTML = ids.map(id => {
    const name = DHIKR_LIBRARY[id] ? DHIKR_LIBRARY[id][state.lang].name : id;
    const count = state.lang === "bn" ? toBnNumber(day[id]) : day[id];
    return `<div class="record-row"><span>${name}</span><span>${count} ${t('times')}</span></div>`;
  }).join("");
}
async function handleAccountSave(e) {
  e.preventDefault();
  const f = e.target;
  state.user.name = f.name.value; state.user.email = f.email.value;
  state.user.phone = f.phone.value; state.user.pin = f.pin.value;
  saveUser();
  await Api.updateAccount(state.user.username, state.user);
  return false;
}

/* ---------------------------- ROUTER / RENDER ---------------------------- */
function render() {
  document.body.classList.toggle("theme-light", state.theme === "light");
  const root = document.getElementById("app");
  let body = "";
  if (!state.user) {
    body = screenSignup();
  } else if (state.screen === "recoveryPin") {
    body = screenRecoveryPin();
  } else if (state.screen === "pinPrompt") {
    body = screenPinPrompt();
  } else if (state.screen === "recitation") {
    body = screenRecitation();
  } else if (state.screen === "recitationDetail") {
    body = screenRecitationDetail(state.param);
  } else if (state.screen === "dhikrMain") {
    body = screenDhikrMain();
  } else if (state.screen === "dhikrDetail") {
    body = screenDhikrDetail(state.param);
  } else if (state.screen === "dua") {
    body = screenDua();
  } else if (state.screen === "account") {
    body = screenAccount();
  } else {
    body = screenHome();
  }
  root.innerHTML = renderHeader() + body;
  if (state.screen === "account") renderDhikrRecordOnLoad();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.toggle("theme-light", state.theme === "light");
  render();
});
