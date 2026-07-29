/**
 * Code.gs — Google Apps Script backend for Mindful Slave.
 *
 * Deploy as a Web App:
 *   Deploy > New deployment > Type: Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the resulting /exec URL into js/api.js -> GAS_WEB_APP_URL.
 *
 * Data model (single Google Sheet, bound to this script):
 *   Tab "About"  — one row per user: Username | Name | Email | Phone | Gender | Country | PIN(hash) | RecoveryPIN(hash) | CreatedAt
 *   Tab "Dhikr"  — one row per (user, date, dhikrId): Username | Date | DhikrId | Count | UpdatedAt
 *
 * SECURITY NOTE: PINs are hashed with a simple SHA-256 digest before being
 * stored, but this is still an MVP-level scheme (no per-user salt, no
 * rate-limiting). Do not reuse these PINs anywhere sensitive, and consider
 * a stronger auth provider (Firebase Auth, etc.) before shipping widely.
 */

const ABOUT_SHEET = "About";
const DHIKR_SHEET = "Dhikr";
const ABOUT_HEADERS = ["Username", "Name", "Email", "Phone", "Gender", "Country", "PinHash", "RecoveryPinHash", "CreatedAt"];
const DHIKR_HEADERS = ["Username", "Date", "DhikrId", "Count", "UpdatedAt"];

function doPost(e) {
  return handle(e);
}
function doGet(e) {
  return handle(e);
}

function handle(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { /* GET fallback below */ }
  if (!body.action && e.parameter && e.parameter.action) body = e.parameter;

  let result;
  try {
    switch (body.action) {
      case "signup": result = doSignup(body.profile); break;
      case "verifyRecoveryPin": result = doVerifyRecoveryPin(body.username, body.recoveryPin); break;
      case "updateAccount": result = doUpdateAccount(body.username, body.fields); break;
      case "getAccount": result = doGetAccount(body.username); break;
      case "logDhikr": result = doLogDhikr(body.username, body.dhikrId, body.count, body.date); break;
      case "getRecentDhikr": result = doGetRecentDhikr(body.username, body.dhikrId, body.days || 3); break;
      case "getDhikrForDate": result = doGetDhikrForDate(body.username, body.date); break;
      default: result = { ok: false, error: "Unknown action" };
    }
  } catch (err) {
    result = { ok: false, error: String(err) };
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function getSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
  }
  return sh;
}

function hash(value) {
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(value));
  return digest.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, "0")).join("");
}

function findRowByUsername(sh, username) {
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username) return { rowIndex: i + 1, row: data[i] };
  }
  return null;
}

function doSignup(profile) {
  const sh = getSheet(ABOUT_SHEET, ABOUT_HEADERS);
  const existing = findRowByUsername(sh, profile.username);
  const row = [
    profile.username, profile.name, profile.email, profile.phone || "",
    profile.gender, profile.country, hash(profile.pin), hash(profile.recoveryPin),
    new Date().toISOString()
  ];
  if (existing) {
    sh.getRange(existing.rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sh.appendRow(row);
  }
  return { ok: true };
}

function doVerifyRecoveryPin(username, recoveryPin) {
  const sh = getSheet(ABOUT_SHEET, ABOUT_HEADERS);
  const found = findRowByUsername(sh, username);
  if (!found) return { ok: false, error: "No such user" };
  const match = found.row[7] === hash(recoveryPin);
  return { ok: match };
}

function doUpdateAccount(username, fields) {
  const sh = getSheet(ABOUT_SHEET, ABOUT_HEADERS);
  const found = findRowByUsername(sh, username);
  if (!found) return { ok: false, error: "No such user" };
  const row = found.row.slice();
  if (fields.name) row[1] = fields.name;
  if (fields.email) row[2] = fields.email;
  if (fields.phone) row[3] = fields.phone;
  if (fields.gender) row[4] = fields.gender;
  if (fields.country) row[5] = fields.country;
  if (fields.pin) row[6] = hash(fields.pin);
  sh.getRange(found.rowIndex, 1, 1, row.length).setValues([row]);
  return { ok: true };
}

function doGetAccount(username) {
  const sh = getSheet(ABOUT_SHEET, ABOUT_HEADERS);
  const found = findRowByUsername(sh, username);
  if (!found) return { ok: false, error: "No such user" };
  const [Username, Name, Email, Phone, Gender, Country] = found.row;
  return { ok: true, profile: { Username, Name, Email, Phone, Gender, Country } };
}

function doLogDhikr(username, dhikrId, count, dateStr) {
  const sh = getSheet(DHIKR_SHEET, DHIKR_HEADERS);
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === dateStr && data[i][2] === dhikrId) {
      sh.getRange(i + 1, 4).setValue(count);
      sh.getRange(i + 1, 5).setValue(new Date().toISOString());
      return { ok: true };
    }
  }
  sh.appendRow([username, dateStr, dhikrId, count, new Date().toISOString()]);
  return { ok: true };
}

function doGetRecentDhikr(username, dhikrId, days) {
  const sh = getSheet(DHIKR_SHEET, DHIKR_HEADERS);
  const data = sh.getDataRange().getValues();
  const rows = data.slice(1)
    .filter(r => r[0] === username && r[2] === dhikrId)
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .slice(0, days)
    .map(r => ({ date: r[1], count: r[3] }));
  return { ok: true, rows };
}

function doGetDhikrForDate(username, dateStr) {
  const sh = getSheet(DHIKR_SHEET, DHIKR_HEADERS);
  const data = sh.getDataRange().getValues();
  const rows = data.slice(1)
    .filter(r => r[0] === username && r[1] === dateStr)
    .map(r => ({ dhikrId: r[2], count: r[3] }));
  return { ok: true, rows };
}
