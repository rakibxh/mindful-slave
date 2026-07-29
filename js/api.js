/**
 * api.js
 * Thin client for the Google Apps Script backend (see /apps-script/Code.gs).
 *
 * Configure GAS_WEB_APP_URL after you deploy the Apps Script project as a
 * Web App ("Execute as: Me", "Who has access: Anyone"). See README.md.
 */

const GAS_WEB_APP_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

async function gasCall(action, payload = {}) {
  if (!GAS_WEB_APP_URL || GAS_WEB_APP_URL.startsWith("PASTE_")) {
    console.warn("Apps Script URL not configured yet — using local-only mode.");
    return { ok: false, offline: true };
  }
  try {
    const res = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight on Apps Script
      body: JSON.stringify({ action, ...payload })
    });
    return await res.json();
  } catch (err) {
    console.error("Apps Script call failed:", err);
    return { ok: false, error: String(err) };
  }
}

const Api = {
  signup: (profile) => gasCall("signup", { profile }),
  verifyRecoveryPin: (username, recoveryPin) => gasCall("verifyRecoveryPin", { username, recoveryPin }),
  updateAccount: (username, fields) => gasCall("updateAccount", { username, fields }),
  getAccount: (username) => gasCall("getAccount", { username }),
  logDhikr: (username, dhikrId, count, dateStr) => gasCall("logDhikr", { username, dhikrId, count, date: dateStr }),
  getRecentDhikr: (username, dhikrId, days = 3) => gasCall("getRecentDhikr", { username, dhikrId, days }),
  getDhikrForDate: (username, dateStr) => gasCall("getDhikrForDate", { username, date: dateStr })
};
