/**
 * hijri.js
 * Lightweight Hijri date support.
 *
 * NOTE (architecture decision): true Hijri dates depend on local moon
 * sighting and vary slightly by region/authority. For an MVP we use the
 * browser's built-in ICU "islamic" calendar (tabular Umm al-Qura
 * approximation) via Intl.DateTimeFormat, which is available in all
 * modern evergreen browsers without any extra dependency or network
 * call. If the app later needs moon-sighting-accurate dates, swap
 * getHijriDate() below for a call to a Hijri API/library — nothing
 * else in the app needs to change.
 */

function getHijriDate(date = new Date()) {
  try {
    const fmt = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
      day: "numeric", month: "numeric", year: "numeric"
    });
    const parts = fmt.formatToParts(date);
    const day = +parts.find(p => p.type === "day").value;
    const month = +parts.find(p => p.type === "month").value; // 1-12
    const year = +parts.find(p => p.type === "year").value;
    return { day, month, year };
  } catch (e) {
    // Fallback: very rough estimate if ICU islamic calendar isn't supported
    const epoch = new Date("622-07-16T00:00:00Z");
    const days = Math.floor((date - epoch) / 86400000);
    const hYear = Math.floor(days / 354.36667) + 1;
    const dayOfYear = Math.floor(days % 354.36667);
    const month = Math.min(12, Math.floor(dayOfYear / 29.53) + 1);
    const day = Math.max(1, dayOfYear - Math.floor((month - 1) * 29.53));
    return { day, month, year: hYear };
  }
}

function formatHijriDate(date = new Date(), lang = "en") {
  const h = getHijriDate(date);
  const weekday = date.getDay();
  if (lang === "bn") {
    const monthName = HIJRI_MONTHS_BN[h.month - 1];
    const weekdayName = WEEKDAYS_BN[weekday];
    return `${toBnNumber(h.day)} ${monthName}, ${toBnNumber(h.year)}, ${weekdayName}`;
  }
  const monthName = HIJRI_MONTHS_EN[h.month - 1];
  const weekdayName = WEEKDAYS_EN[weekday];
  return `${h.day} ${monthName}, ${h.year}, ${weekdayName}`;
}

/**
 * Days in a given tabular Hijri month/year (Umm al-Qura via Intl is not
 * directly queryable for month length, so we probe day-by-day — cheap,
 * runs once per home-screen render).
 */
function hijriMonthLength(hYear, hMonth) {
  // Probe forward from a known day in the month until the month rolls over.
  const probe = new Date();
  // Binary-search-free simple scan across +/- 40 days from today is enough
  // in practice since we only ever need "is tomorrow still this month".
  return null; // not required directly; see isLastDayOfHijriMonth below
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/**
 * Chooses which 2nd-paragraph message to show on the Home screen today,
 * following the priority rules in the brief. Special-occasion messages
 * (Arafah, Ashura, Ramadan start, Shawwal six) take priority over the
 * weekly-recurring ones, which in turn take priority over the plain
 * morning/evening/common message.
 */
function pickHomeMessage(now = new Date()) {
  const today = getHijriDate(now);
  const tomorrow = getHijriDate(addDays(now, 1));
  const weekday = now.getDay(); // 0=Sun ... 6=Sat
  const hour = now.getHours();

  // Day of Ashura: 10 Muharram -> show one day prior (i.e. today is 9 Muharram)
  if (today.month === 1 && today.day === 9) return HOME_MESSAGES.ashura;

  // Day of Arafah: 9 Dhu al-Hijjah -> show one day prior (today is 8 Dhu al-Hijjah)
  if (today.month === 12 && today.day === 8) return HOME_MESSAGES.arafah;

  // Beginning of Ramadan: show on 1 Ramadan itself
  if (today.month === 9 && today.day === 1) return HOME_MESSAGES.ramadanStart;

  // Six days of Shawwal: show starting 2 days after Ramadan ends, i.e. from 3 Shawwal onward
  if (today.month === 10 && today.day >= 3 && today.day <= 9) return HOME_MESSAGES.shawwalSix;

  // White Days: 13th, 14th or 15th of any Hijri month -> show the reminder the day before (12-14)
  if (tomorrow.day === 13 || tomorrow.day === 14 || tomorrow.day === 15) return HOME_MESSAGES.whiteDays;

  // Friday itself
  if (weekday === 5) return HOME_MESSAGES.friday;

  // Thursday: reminder of Friday tomorrow
  if (weekday === 4) return HOME_MESSAGES.reminderOfFridayThu;

  // Sunday & Wednesday: reminder for tomorrow's voluntary fast (Mon/Thu)
  if (weekday === 0 || weekday === 3) return HOME_MESSAGES.fastTomorrowSunWed;

  // Monday & Thursday: loving check-in about today's fast
  if (weekday === 1 || weekday === 4) return HOME_MESSAGES.fastingCheckInMonThu;

  // Fallback: time-of-day message
  if (hour >= 4 && hour < 12) return HOME_MESSAGES.morning;
  if (hour >= 16 || hour < 4) return HOME_MESSAGES.evening;
  return HOME_MESSAGES.common;
}
