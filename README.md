# Mindful Slave

A bilingual (English / Bengali) Islamic daily-companion web app: Hijri-date home screen,
a Sunnah-based daily Qur'an recitation schedule, dhikr counters, and a du'a collection.
Frontend is static HTML/CSS/JS (hostable on GitHub Pages); user accounts and dhikr history
are stored in a Google Sheet via a Google Apps Script backend.

## 1. Project layout

```
index.html            entry point
css/style.css          all styling (dark-gray theme, Berkshire Swash header)
js/data.js              all bilingual content: home messages, recitation items, dhikr & du'a text
js/hijri.js             Hijri-date calculation + which home message to show today
js/api.js               client wrapper around the Apps Script backend
js/app.js               state, routing, and screen rendering
apps-script/Code.gs      Google Apps Script backend (deploy separately, see below)
```

## 2. Deploy the backend (Google Apps Script)

1. Create a new Google Sheet (this will hold your users' data).
2. In the Sheet, go to **Extensions > Apps Script**.
3. Delete the boilerplate `Code.gs` content and paste in `apps-script/Code.gs` from this repo.
4. Click **Deploy > New deployment**, type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the generated `.../exec` URL.
6. Paste it into `js/api.js` as the value of `GAS_WEB_APP_URL`.

The script auto-creates two tabs the first time it runs: `About` (user profiles, PINs stored
as SHA-256 hashes) and `Dhikr` (one row per user/date/dhikr-type count).

## 3. Deploy the frontend (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Repo **Settings > Pages** > Deploy from branch > `main` / root.
3. Your app will be live at `https://<username>.github.io/<repo>/`.

No build step is required — it's plain HTML/CSS/JS.

## 4. Design decisions & assumptions worth knowing about

- **4-digit PIN vs 6-digit recovery PIN.** The brief asks for a 4-digit PIN at signup and
  separately a 6-digit PIN when restoring a profile on a new device. Rather than treating
  these as the same value, the app generates a **separate 6-digit Recovery PIN** at signup
  (shown once, exactly like a "save this password" moment) and asks for that specific PIN
  when a profile needs to be restored. The 4-digit PIN remains available for quick,
  same-device account edits. Adjust this in `handleSignup()` / `screenPinPrompt()` in
  `js/app.js` if you intended something different.
- **Hijri date.** Computed client-side via the browser's built-in ICU Islamic (Umm al-Qura)
  calendar — no external API or library needed, but it's a tabular approximation and can be
  a day off from local moon-sighting announcements. Swap `getHijriDate()` in `js/hijri.js`
  for a moon-sighting API if exact regional accuracy matters.
- **Home-screen message priority**, from highest to lowest, when more than one rule could
  apply on the same day: `Ashura` / `Arafah` (shown the day before) → `Ramadan begins` →
  `six days of Shawwal` (shown from 2 days after Eid onward) → `White Days` reminder (shown
  the day before the 13th–15th) → `Friday` → `Thursday: reminder of Friday` → `Sunday/
  Wednesday: tomorrow's voluntary fast` → `Monday/Thursday: fasting check-in` → plain
  morning/evening message. Because the brief lists both a Monday/Thursday message and a
  Thursday-specific message, Thursdays currently show the "reminder of Friday" message —
  swap the order in `pickHomeMessage()` in `js/hijri.js` if you'd rather prioritize the
  fasting check-in on Thursdays.
- **Screens A–R.** The brief names 18 lettered screens (A–I in English, their Bengali twins
  J–R). Since each pair is the same content in two languages, they're implemented as 9 data
  entries in `RECITATION_ITEMS` that re-render in whichever language is currently active —
  functionally identical, easier to maintain than 18 near-duplicate screens.
  Content copy fidelity to your source document is otherwise preserved verbatim.
- **Dhikr "+ " button.** Implemented as "add one of the extra authentic dhikr from the
  reference library" (there are a few more in your source text beyond the 6 named capsules).
  If you intended free-text custom dhikr entry instead, that's a small change in
  `openAddDhikr()` in `js/app.js`.
- **Country field** ships with a short common-country dropdown ending in "Other" — edit
  `COUNTRY_LIST` in `js/app.js` to use your own list.
- **Security note.** PINs are hashed (SHA-256, no per-user salt) before being written to the
  Sheet — better than plaintext, but still an MVP-level scheme. If this app will hold real
  user data at scale, consider a proper auth provider instead of hand-rolled PIN storage.
- **Offline-first.** All dhikr counts and profile data are also kept in `localStorage`, so
  the counters/screens work even before you've deployed the Apps Script backend (`api.js`
  logs a console warning and no-ops until `GAS_WEB_APP_URL` is set).

## 5. Where to extend next

- Wire real push/local notifications for prayer-time-based reminders.
- Add a proper "forgot 4-digit PIN" flow (currently only the 6-digit Recovery PIN restores a
  profile).
- Localize the country list and add more languages by extending `UI_STRINGS` in `js/data.js`.

## 6. Changelog (latest revision)

- **Sign in / recover.** Signup now shows "Already have an account? Recover it here" below the
  Sign Up button, leading to a new Sign In screen (username + 6-digit Recovery PIN). This calls
  the same `verifyRecoveryPin` / `getAccount` Apps Script endpoints already in `Code.gs` — no
  backend redeploy needed.
- **Header.** Title is now centered (CSS grid: back-button / title / burger, each in their own
  column). A back button appears on the left whenever there's somewhere to go back to
  (`state.navStack` in `js/app.js` tracks one level of history per navigation).
- **Menu.** Added a working Sign Out icon, renamed "Daily Recitation Schedule" to "Qur'an Plan",
  added a Dashboard icon directly above Home, and the ribbon now closes on any tap outside it
  (a capture-phase click listener on `document`).
- **Dashboard screen.** The calendar-driven "Daily Dhikr Record" block that used to live on the
  Account screen now lives here instead; Account is back to just credentials.
  Menu order: Language, Theme, Account, Sign out — Qur'an Plan, Dhikr Tools, Du'a — Dashboard, Home.
- **Icons.** Home and Du'a now use flat line-icon SVGs (matching the rest of the icon set)
  instead of emoji. Theme toggle shows a sun icon next to "Light" and a vertical crescent moon
  next to "Dark".
- **Fonts.** `fonts/HasanProtivas-Regular.ttf` (the file you supplied) is wired in via
  `@font-face` and used for the header title whenever the UI language is Bengali (English still
  uses Berkshire Swash). All Bengali body text now uses Hind Siliguri (Google Fonts) instead of
  Noto Sans Bengali. Bengali app title is now মগ্নচৈতন্য ভৃত্য.
- **Pinch-zoom** is disabled (`user-scalable=no` + `touch-action: manipulation`) so the app
  behaves like a normal installed app rather than a zoomable webpage.
- **PWA icons.** `manifest.json`, `sw.js`, and an `icons/` folder are now part of this project.
  Drop your prepared `icon-192.png` and `icon-512.png` straight into `icons/` — the manifest and
  `index.html` already point at those exact filenames.
- **Dhikr screen.** The middle tap button is now labeled "10" (was "20") and adds 10 per tap.
- **Qur'an Plan screen.** English heading is now "Daily Qur'an Recitation Sunnah Schedule".
  Detail screens for Āyat al-Kursī (both occurrences) and the last two verses of Al-Baqarah now
  embed the actual Arabic verse text plus a plain-language rendering, sourced from quran.com.
  Every other Surah's detail screen now has a "Read the Surah" capsule linking out to quran.com.
- **Du'a screen.** Cards now show only the current UI language (title + meaning), not both
  languages stacked together, and every entry has a pronunciation/transliteration line below its
  Arabic. References for entries that only ship an English citation are auto-translated into
  Bengali via a small dictionary (`REF_TRANSLATE_PAIRS` / `translateRef()` in `js/data.js`) that
  also covers Sunan at-Tirmidhī, Sunan Abū Dāwūd, Ṣaḥīḥ, and Ḥasan wherever they appear.
