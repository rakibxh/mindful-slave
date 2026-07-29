/**
 * data.js
 * All static bilingual (EN / BN) content for Mindful Slave.
 * Kept separate from app.js so content can be edited without touching logic.
 */

const HIJRI_MONTHS_EN = [
  "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
  "Jumada al-ula", "Jumada al-thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

const HIJRI_MONTHS_BN = [
  "মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি",
  "জুমাদা আল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান",
  "রমজান", "শাওয়াল", "জুল-ক্বাদাহ্", "জুল-হিজ্জাহ্"
];

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_BN = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

function toBnNumber(n) {
  return String(n).split("").map(ch => (/\d/.test(ch) ? BN_DIGITS[+ch] : ch)).join("");
}

/* ---------------------------------------------------------------
 * HOME SCREEN — 2nd paragraph message bank
 * Each entry: { id, en:{title,body}, bn:{title,body} }
 * Selection priority handled in hijri.js -> pickHomeMessage()
 * ------------------------------------------------------------- */
const HOME_MESSAGES = {
  common: {
    en: { title: "", body: "Let's ask myself, \u201CAm I ready to meet my Lord today?\u201D Let's take according preparations, dear brothers and sisters!" },
    bn: { title: "", body: "চলুন, আমরা নিজেদেরকে প্রশ্ন করি, \u201Cআমি কি আজ আমার রবের সাক্ষাতের জন্য প্রস্তুত?\u201D আসুন, প্রিয় ভাই ও বোনেরা, সেই অনুযায়ী আজ থেকেই আমাদের প্রস্তুতি গ্রহণ করি।" }
  },
  morning: {
    en: { title: "Every Morning", body: "☀️ Allah has blessed us with another day to remember Him. Begin your morning with gratitude, adhk\u0101r, and sincere intention, perhaps today will be the day that changes your Hereafter." },
    bn: { title: "প্রতিদিন সকালে", body: "☀️ আল্লাহ আমাদের আরেকটি নতুন দিন দান করেছেন, তাঁকে স্মরণ করার, তাঁর ইবাদত করার এবং তাঁর সন্তুষ্টি অর্জনের জন্য। কৃতজ্ঞতা, সকালবেলার যিকির-আযকার এবং আন্তরিক নিয়তের মাধ্যমে দিনটি শুরু করুন। কে জানে, হয়তো আজকের এই দিনটিই আপনার আখিরাতের সফলতার মোড় ঘুরিয়ে দিতে পারে।" }
  },
  evening: {
    en: { title: "Every Evening", body: "🌙 As the day comes to an end, seek Allah's forgiveness, forgive others, and sleep with a heart that hopes in His mercy. Every night is another chance to return to Him." },
    bn: { title: "প্রতিদিন সন্ধ্যায়", body: "🌙 দিনের সমাপ্তিতে আল্লাহর কাছে ক্ষমা প্রার্থনা করুন, মানুষকে ক্ষমা করে দিন এবং তাঁর অসীম রহমতের আশা নিয়ে ঘুমাতে যান। প্রতিটি রাতই আল্লাহর দিকে ফিরে আসার, নিজের ভুলগুলো শুধরে নেওয়ার এবং নতুন আশায় আগামীকালকে বরণ করার আরেকটি মূল্যবান সুযোগ।" }
  },
  friday: {
    en: { title: "Jumu'ah \u2014 S\u016brah al-Kahf & Adhk\u0101r", body: "🕌 Jumu'ah Mub\u0101rak! \u201CWhoever recites S\u016brah al-Kahf on Friday will have a light that shines for him until the next Friday.\u201D (al-\u1e24\u0101kim, authenticated by al-Alb\u0101n\u012b) May Allah illuminate your week with His guidance. Today is the best day upon which the sun has risen. Increase your \u1e63al\u0101h upon the Prophet \uFDFA, recite S\u016brah al-Kahf, and remember Allah often. May your Friday be full of barakah." },
    bn: { title: "জুমু'আ \u2014 সূরা আল-কাহফ ও আযকার", body: "🕌 জুমু'আ মুবারক! রাসূলুল্লাহ ﷺ বলেছেন, \u201Cযে ব্যক্তি জুমু'আর দিনে সূরা আল-কাহফ তিলাওয়াত করবে, তার জন্য এ জুমু'আ থেকে পরবর্তী জুমু'আ পর্যন্ত একটি নূর (আলো) থাকবে।\u201D আল্লাহ তাআলা তাঁর হিদায়াতের নূর দিয়ে আপনার পুরো সপ্তাহকে আলোকিত করুন। আজ সেই মহিমান্বিত দিন, যেদিন সূর্য সর্বোত্তম দিনের আলো নিয়ে উদিত হয়েছে। আজ বেশি বেশি দরূদ পাঠ করুন, সূরা আল-কাহফ তিলাওয়াত করুন এবং আল্লাহর যিকিরে হৃদয়কে সজীব রাখুন। আল্লাহ আপনার জুমু'আকে বরকতময় করুন।" }
  },
  fastTomorrowSunWed: {
    en: { title: "Reminder for Tomorrow's Fast", body: "🌙 Tomorrow is an opportunity to draw closer to Allah through a voluntary fast. Prepare your intention tonight, perhaps this simple act will be among the deeds most beloved to Allah. Our beloved Prophet \uFDFA loved to fast on Mondays and Thursdays. May Allah grant us the strength to follow his beautiful Sunnah tomorrow." },
    bn: { title: "আগামীকালের রোজার স্মরণিকা", body: "🌙 আগামীকাল একটি নফল রোজার মাধ্যমে আল্লাহর আরও নৈকট্য অর্জনের সুবর্ণ সুযোগ। আজ রাতেই নিয়ত করে নিন; হয়তো এই ছোট্ট আমলটিই আল্লাহর কাছে আপনার সবচেয়ে প্রিয় আমলগুলোর একটি হয়ে যাবে। আমাদের প্রিয় নবী ﷺ সোমবার ও বৃহস্পতিবার নফল রোজা রাখতে ভালোবাসতেন। আল্লাহ আমাদের সবাইকে আগামীকাল তাঁর এই সুন্দর সুন্নাহ অনুসরণ করার তাওফীক দান করুন।" }
  },
  fastingCheckInMonThu: {
    en: { title: "A Loving Check-in", body: "🤲 How is your blessed fast today? The Prophet \uFDFA said: \u201CDeeds are presented on Mondays and Thursdays, and I love that my deeds be presented while I am fasting.\u201D (J\u0101mi\u02BF al-Tirmidh\u012b 747) May Allah accept your fasting and all your righteous deeds. May Allah make today's fast a means of forgiveness, purification, and closeness to Him." },
    bn: { title: "ভালোবাসার স্মরণিকা", body: "🤲 আজকের বরকতময় রোজাটি কেমন চলছে? রাসূলুল্লাহ ﷺ বলেছেন, \u201Cসোমবার ও বৃহস্পতিবার মানুষের আমল আল্লাহর কাছে পেশ করা হয়। আর আমি ভালোবাসি, আমার আমল যেন রোজা অবস্থায় পেশ করা হয়।\u201D আল্লাহ আপনার রোজা ও সকল নেক আমল কবুল করুন। আল্লাহ আজকের রোজাকে আপনার গুনাহ মাফ, আত্মশুদ্ধি এবং তাঁর নৈকট্য লাভের মাধ্যম বানিয়ে দিন।" }
  },
  reminderOfFridayThu: {
    en: { title: "Reminder of Friday", body: "🌿 Tomorrow is Jumu'ah; the best day on which the sun has risen, as our Prophet \uFDFA said. Prepare tonight by renewing your intention for worship, du\u02BF\u0101\u02BE, and abundant \u1e63al\u0101h upon the Messenger of Allah \uFDFA. Ask Allah for forgiveness, make sincere du\u02BF\u0101\u02BE, and look forward to the blessed hour in which du\u02BF\u0101\u02BE is answered." },
    bn: { title: "জুমু'আর স্মরণিকা", body: "🌿 আগামীকাল জুমু'আ; সপ্তাহের শ্রেষ্ঠ দিন, যেদিন সূর্য উদিত হয়েছে। আজ রাত থেকেই ইবাদতের প্রস্তুতি নিন, বেশি বেশি দরূদ পড়ুন, দু'আ করুন এবং আল্লাহর সন্তুষ্টি অর্জনের দৃঢ় নিয়ত করুন। জুমু'আর প্রস্তুতি শুধু পোশাকে নয়, হৃদয়েও হোক।" }
  },
  whiteDays: {
    en: { title: "The White Days", body: "🌕 Tomorrow begins one of the White Days. The Prophet \uFDFA encouraged fasting these blessed days every month. \u201CFasting three days of every month is like fasting for a lifetime.\u201D (\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b; \u1e62a\u1e25\u012b\u1e25 Muslim) May Allah make us among those who remain constant in small but beloved deeds." },
    bn: { title: "আইয়্যামুল বীয", body: "🌕 আগামীকাল আইয়্যামুল বীযের (চাঁদের আলোয় উজ্জ্বল দিনগুলোর) একটি। রাসূলুল্লাহ ﷺ প্রতি মাসে এই দিনগুলোতে রোজা রাখার উৎসাহ দিয়েছেন। \u201Cপ্রতি মাসে তিন দিন রোজা রাখা যেন সারা জীবন রোজা রাখার সমান।\u201D আল্লাহ আমাদের নিয়মিত নেক আমলকারীদের অন্তর্ভুক্ত করুন।" }
  },
  arafah: {
    en: { title: "The Day of \u02BFArafah", body: "🌿 Tomorrow is the Day of \u02BFArafah. The Prophet \uFDFA said: \u201CFasting the Day of \u02BFArafah expiates the sins of the previous year and the coming year.\u201D" },
    bn: { title: "ইয়াওমে আরাফাহ", body: "🌿 আগামীকাল ইয়াওমে আরাফাহ। রাসূলুল্লাহ ﷺ বলেছেন, \u201Cআরাফার দিনের রোজা গত এক বছর ও আগামী এক বছরের গুনাহের কাফফারা হয়ে যায়।\u201D আল্লাহ আমাদের এই মহান সুযোগ থেকে বঞ্চিত না করুন।" }
  },
  ashura: {
    en: { title: "The Day of \u02BF\u0100sh\u016br\u0101\u02BE", body: "🌙 Tomorrow is the Day of \u02BF\u0100sh\u016br\u0101\u02BE. The Prophet \uFDFA said: \u201CI hope from Allah that fasting the Day of \u02BF\u0100sh\u016br\u0101\u02BE will expiate the sins of the previous year.\u201D" },
    bn: { title: "আশুরার দিন", body: "🌙 আগামীকাল আশুরার দিন। রাসূলুল্লাহ ﷺ বলেছেন, \u201Cআমি আল্লাহর কাছে আশা করি, আশুরার দিনের রোজা পূর্ববর্তী এক বছরের গুনাহের কাফফারা হবে।\u201D আল্লাহ আমাদের এ মহান সুন্নাহ পালন করার তাওফীক দান করুন।" }
  },
  ramadanStart: {
    en: { title: "The Month of Mercy", body: "🌙 The month of mercy has arrived. \u201CWhoever fasts Rama\u1e0d\u0101n with faith and hoping for reward, his previous sins will be forgiven.\u201D" },
    bn: { title: "রহমতের মাস", body: "🌙 রহমত, মাগফিরাত ও নাজাতের মাস রমযান এসে গেছে। রাসূলুল্লাহ ﷺ বলেছেন, \u201Cযে ব্যক্তি ঈমানের সাথে এবং সওয়াবের আশায় রমযানের রোজা রাখবে, তার পূর্বের গুনাহসমূহ ক্ষমা করে দেওয়া হবে।\u201D আল্লাহ আমাদের রমযানকে সফলতার মাস বানিয়ে দিন।" }
  },
  shawwalSix: {
    en: { title: "Six Days of Shaww\u0101l", body: "🌿 Rama\u1e0d\u0101n may have ended, but the rewards continue. \u201CWhoever fasts Rama\u1e0d\u0101n and follows it with six days of Shaww\u0101l, it is as though he fasted the entire year.\u201D" },
    bn: { title: "শাওয়ালের ছয় রোজা", body: "🌿 রমযান শেষ হয়েছে, কিন্তু নেক আমলের ধারা থেমে যায়নি। রাসূলুল্লাহ ﷺ বলেছেন, \u201Cযে ব্যক্তি রমযানের রোজা রাখার পর শাওয়ালের ছয়টি রোজা রাখে, সে যেন পুরো বছর রোজা রাখল।\u201D আল্লাহ আমাদের এই মহান সুন্নাহ পালনের তাওফীক দিন।" }
  }
};

/* ---------------------------------------------------------------
 * DAILY RECITATION SCHEDULE
 * One entry per practical item. `id` is used for routing; the
 * lettered "Screen A..R" naming in the brief maps 1:1 to these
 * items (English screen + its Bengali twin merge into one item
 * that simply re-renders in the active UI language).
 * ------------------------------------------------------------- */
const RECITATION_SCHEDULE_GROUPS = [
  { id: "afterFard", timeKey: "afterFard" },
  { id: "morningEvening", timeKey: "morningEvening" },
  { id: "beforeSleep", timeKey: "beforeSleep", items: ["ayatKursiSleep", "kafirun", "ikhlasFalaqNas", "lastTwoBaqarah"] },
  { id: "everyNight", timeKey: "everyNight" },
  { id: "everyFriday", timeKey: "everyFriday" },
  { id: "fridayFajr", timeKey: "fridayFajr" }
];

const RECITATION_ITEMS = {
  afterFard: {
    en: { heading: "After Every Far\u1e0d Prayer", verse: "\u0100yat al-Kurs\u012b", hadith: "\u201CWhoever recites \u0100yat al-Kurs\u012b after every prescribed prayer, nothing prevents him from entering Paradise except death.\u201D", ref: "Al-Mu'jam al-Kab\u012br of al-\u1e6cabar\u0101n\u012b; Al-Nas\u0101'\u012b (\u02BFAmal al-Yawm wa al-Laylah). Authenticated by a number of scholars, including Al-Alb\u0101n\u012b." },
    bn: { heading: "প্রত্যেক ফরয সালাতের পর", verse: "আয়াতুল কুরসী", hadith: "\u201Cযে ব্যক্তি প্রত্যেক ফরয সালাতের পর আয়াতুল কুরসী পাঠ করবে, তার জান্নাতে প্রবেশে মৃত্যু ছাড়া আর কোনো বাধা থাকবে না।\u201D", ref: "আল-মু'জামুল কাবীর (ত্বাবারানী); ইমাম নাসাঈ, 'আমালুল ইয়াওমি ওয়াল লাইলাহ (সহীহ বলে প্রমাণিত)।" }
  },
  morningEvening: {
    en: { heading: "Morning & Evening", verse: "Al-Ikhl\u0101\u1e63 \u00D73, Al-Falaq \u00D73, Al-N\u0101s \u00D73", hadith: "\u201CRecite 'Qul huwa Allahu Ahad,' 'Qul a'udhu bi Rabbil-Falaq,' and 'Qul a'udhu bi Rabbin-Nas' three times every morning and every evening; they will suffice you against everything.\u201D", ref: "Sunan al-Tirmidh\u012b, 3575 (\u1e62a\u1e25\u012b\u1e25)" },
    bn: { heading: "প্রতিদিন সকালে - সন্ধ্যায়", verse: "সূরা আল-ইখলাস ×৩, সূরা আল-ফালাক ×৩, সূরা আন-নাস ×৩", hadith: "\u201Cপ্রতিদিন সকাল ও সন্ধ্যায় 'কুল হুয়াল্লাহু আহাদ', 'কুল আ'উযু বিরাব্বিল ফালাক' এবং 'কুল আ'উযু বিরাব্বিন নাস' তিনবার করে পাঠ করো; এগুলো তোমাকে সব ধরনের অনিষ্ট থেকে যথেষ্ট হবে।\u201D", ref: "সুনান আত-তিরমিযী, ৩৫৭৫ (সহীহ)" }
  },
  ayatKursiSleep: {
    en: { heading: "Before Sleep", verse: "\u0100yat al-Kurs\u012b", hadith: "\u201CWhen you go to your bed, recite \u0100yat al-Kurs\u012b\u2026 Allah will appoint a guardian over you, and no devil will come near you until morning.\u201D The Prophet \uFDFA said: \u201CHe told you the truth although he is a liar.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b, 2311" },
    bn: { heading: "ঘুমানোর পূর্বে", verse: "আয়াতুল কুরসী", hadith: "\u201Cযখন তুমি শয্যায় যাবে, তখন আয়াতুল কুরসী পাঠ করবে। এতে আল্লাহ তোমার জন্য একজন রক্ষক নিযুক্ত করবেন এবং সকাল পর্যন্ত শয়তান তোমার নিকটবর্তী হতে পারবে না।\u201D পরে নবী ﷺ বলেন, \u201Cসে সত্য বলেছে, যদিও সে মিথ্যাবাদী।\u201D", ref: "সহীহ আল-বুখারী, ২৩১১" }
  },
  kafirun: {
    en: { heading: "Before Sleep", verse: "S\u016brah Al-K\u0101fir\u016bn", hadith: "\u201CRecite 'Qul y\u0101 ayyuhal-k\u0101fir\u016bn' before sleeping, for it is a declaration of freedom from shirk.\u201D", ref: "Sunan Ab\u016b D\u0101w\u016bd, 5055; Sunan al-Tirmidh\u012b" },
    bn: { heading: "ঘুমানোর পূর্বে", verse: "সূরা আল-কাফিরূন", hadith: "\u201Cঘুমানোর আগে 'কুল ইয়া আইয়ুহাল কাফিরূন' পাঠ করো; কেননা এটি শির্ক থেকে মুক্তির ঘোষণা।\u201D", ref: "সুনান আবূ দাউদ, ৫০৫৫; সুনান আত-তিরমিযী" }
  },
  ikhlasFalaqNas: {
    en: { heading: "Before Sleep", verse: "Al-Ikhl\u0101\u1e63, Al-Falaq & Al-N\u0101s", hadith: "Whenever the Prophet \uFDFA went to bed, he would recite S\u016brah Al-Ikhl\u0101\u1e63, Al-Falaq and Al-N\u0101s, blow into his palms, and wipe over his body. He repeated this three times.", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b, 5017; \u1e62a\u1e25\u012b\u1e25 Muslim" },
    bn: { heading: "ঘুমানোর পূর্বে", verse: "সূরা আল-ইখলাস, আল-ফালাক, আন-নাস", hadith: "নবী ﷺ যখন শয্যায় যেতেন, তখন সূরা ইখলাস, ফালাক ও নাস তিলাওয়াত করে দুই হাতের তালুতে ফুঁ দিতেন এবং তা দিয়ে শরীর মুছে নিতেন। তিনি এভাবে তিনবার করতেন।", ref: "সহীহ আল-বুখারী, ৫০১৭; সহীহ মুসলিম" }
  },
  lastTwoBaqarah: {
    en: { heading: "Before Sleep", verse: "Last Two Verses of S\u016brah Al-Baqarah", hadith: "\u201CWhoever recites the last two verses of S\u016brah Al-Baqarah during the night, they will suffice him.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b, 5009; \u1e62a\u1e25\u012b\u1e25 Muslim, 808" },
    bn: { heading: "ঘুমানোর পূর্বে", verse: "সূরা আল-বাকারার শেষ দুই আয়াত", hadith: "\u201Cযে ব্যক্তি রাতে সূরা আল-বাকারার শেষ দুই আয়াত তিলাওয়াত করবে, তা তার জন্য যথেষ্ট হবে।\u201D", ref: "সহীহ আল-বুখারী, ৫০০৯; সহীহ মুসলিম, ৮০৮" }
  },
  everyNight: {
    en: { heading: "Every Night", verse: "S\u016brah Al-Mulk", hadith: "\u201CThere is a s\u016brah in the Qur'an consisting of thirty verses which interceded for a man until he was forgiven. It is: 'Tab\u0101raka alladh\u012b biyadihi al-mulk.'\u201D", ref: "Sunan al-Tirmidh\u012b, 2891 (\u1e24asan); also 2892 regarding the Prophet's \uFDFA practice of reciting Al-Mulk before sleeping." },
    bn: { heading: "প্রতি রাতে", verse: "সূরা আল-মুলক", hadith: "\u201Cকুরআনে ত্রিশ আয়াতবিশিষ্ট একটি সূরা রয়েছে, যা একজন ব্যক্তির জন্য সুপারিশ করতে থাকে, অবশেষে তাকে ক্ষমা করে দেওয়া হয়। সেটি হলো 'তাবারাকাল্লাযী বিইয়াদিহিল মুলক' (সূরা আল-মুলক)।\u201D", ref: "সুনান আত-তিরমিযী, ২৮৯১ (হাসান); এছাড়া সুনান আত-তিরমিযী, ২৮৯২" }
  },
  everyFriday: {
    en: { heading: "Every Friday", verse: "S\u016brah Al-Kahf", hadith: "\u201CWhoever recites S\u016brah Al-Kahf on Friday will have a light that will shine for him between the two Fridays.\u201D", ref: "Al-Mustadrak of al-\u1e24\u0101kim, 3392; authenticated by al-\u1e24\u0101kim and al-Dhahab\u012b." },
    bn: { heading: "প্রতি জুমু'আর দিনে", verse: "সূরা আল-কাহফ", hadith: "\u201Cযে ব্যক্তি জুমু'আর দিনে সূরা আল-কাহফ তিলাওয়াত করবে, তার জন্য এ জুমু'আ থেকে পরবর্তী জুমু'আ পর্যন্ত একটি নূর দান করা হবে।\u201D", ref: "আল-মুস্তাদরাক, ইমাম হাকিম, ৩৩৯২ (ইমাম হাকিম ও ইমাম যাহাবী কর্তৃক সহীহ)" }
  },
  fridayFajr: {
    en: { heading: "Friday Fajr", verse: "S\u016brah Al-Sajdah & S\u016brah Al-Ins\u0101n", hadith: "Abu Hurayrah narrated that the Messenger of Allah \uFDFA used to recite S\u016brah Al-Sajdah and S\u016brah Al-Ins\u0101n in the Fajr prayer on Fridays.", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b, 891; \u1e62a\u1e25\u012b\u1e25 Muslim, 879" },
    bn: { heading: "জুমু'আর ফজরের সালাতে", verse: "সূরা আস-সাজদাহ ও সূরা আল-ইনসান", hadith: "আবূ হুরাইরা (রাঃ) বর্ণনা করেন, রাসূলুল্লাহ ﷺ জুমু'আর দিনের ফজরের সালাতে নিয়মিত সূরা আস-সাজদাহ এবং সূরা আল-ইনসান তিলাওয়াত করতেন।", ref: "সহীহ আল-বুখারী, ৮৯১; সহীহ মুসলিম, ৮৭৯" }
  }
};

/* ---------------------------------------------------------------
 * DHIKR — default capsules shown on the Dhikr Tools main screen,
 * plus a small extra library offered behind the "+" (add) button.
 * ------------------------------------------------------------- */
const DHIKR_DEFAULT_IDS = ["subhanallah", "alhamdulillah", "allahuAkbar", "astaghfirullah", "laIlahaIllallah", "salawat"];

const DHIKR_LIBRARY = {
  subhanallah: {
    en: { name: "Subh\u0101nall\u0101h", arabic: "\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E \u0627\u0644\u0644\u0651\u0647\u0650 \u0631 \u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650 \u0631 \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0670\u0647\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0644\u0651\u0647\u064F \u0631 \u0627\u0644\u0644\u0651\u0647\u064F \u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F", hadith: "The Messenger of Allah \uFDFA said: \u201CThe most beloved words to Allah are: 'Sub\u1e25\u0101nall\u0101h, Al\u1e25amdulill\u0101h, L\u0101 il\u0101ha illall\u0101h and All\u0101hu Akbar.' There is no harm in whichever of them you begin with.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 Muslim (2137)" },
    bn: { name: "সুবহানাল্লাহ", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cআল্লাহর নিকট সর্বাধিক প্রিয় বাক্য চারটি: 'সুবহানাল্লাহ, আলহামদুলিল্লাহ, লা ইলাহা ইল্লাল্লাহ এবং আল্লাহু আকবার।' এদের যেকোনোটি দিয়ে শুরু করলে তাতে কোনো অসুবিধা নেই।\u201D", ref: "সহীহ মুসলিম, ২১৩৭" }
  },
  alhamdulillah: {
    en: { name: "Al\u1e25amdulill\u0101h", arabic: "\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650", hadith: "The Messenger of Allah \uFDFA said: \u201CPurification is half of faith, and 'Al\u1e25amdulill\u0101h' fills the Scale.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 Muslim (223)" },
    bn: { name: "আলহামদুলিল্লাহ", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cপবিত্রতা ঈমানের অর্ধেক, আর 'আলহামদুলিল্লাহ' (সমস্ত প্রশংসা আল্লাহর) মীযানকে পূর্ণ করে দেয়।\u201D", ref: "সহীহ মুসলিম, ২২৩" }
  },
  allahuAkbar: {
    en: { name: "All\u0101hu Akbar", arabic: "\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E \u0627\u0644\u0644\u0651\u0647\u0650 \u06F3\u06F3\u060C \u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u0647\u0650 \u06F3\u06F3\u060C \u0627\u0644\u0644\u0651\u0647\u064F \u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064F \u06F3\u06F3", hadith: "The Messenger of Allah \uFDFA said: \u201CSay 'Sub\u1e25\u0101nall\u0101h' thirty-three times, 'Al\u1e25amdulill\u0101h' thirty-three times, and 'All\u0101hu Akbar' thirty-three times after every obligatory prayer. Whoever does so will attain a reward that those with wealth cannot surpass except by doing the same.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b (843); \u1e62a\u1e25\u012b\u1e25 Muslim (595)" },
    bn: { name: "আল্লাহু আকবার", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cপ্রত্যেক ফরয সালাতের পর তেত্রিশবার 'সুবহানাল্লাহ', তেত্রিশবার 'আলহামদুলিল্লাহ' এবং তেত্রিশবার 'আল্লাহু আকবার' বলো। যে তা করবে, সে এমন সওয়াব লাভ করবে যা ধনীদের দান-সদকার সওয়াবের সমতুল্য।\u201D", ref: "সহীহ আল-বুখারী, ৮৪৩; সহীহ মুসলিম, ৫৯৫" }
  },
  astaghfirullah: {
    en: { name: "Astaghfirull\u0101h", arabic: "\u0623\u064E\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0644\u0651\u0647\u064E", hadith: "The Messenger of Allah \uFDFA said: \u201CIndeed, a covering comes upon my heart, so I seek Allah's forgiveness one hundred times every day.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 Muslim (2702)" },
    bn: { name: "আস্তাগফিরুল্লাহ", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cনিশ্চয়ই কখনও কখনও আমার অন্তরে এক ধরনের আবরণ এসে যায়; তাই আমি প্রতিদিন একশতবার আল্লাহর নিকট ক্ষমা প্রার্থনা করি।\u201D", ref: "সহীহ মুসলিম, ২৭০২" }
  },
  laIlahaIllallah: {
    en: { name: "L\u0101 il\u0101ha illall\u0101h", arabic: "\u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0670\u0647\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0644\u0651\u0647\u064F \u0648\u064E\u062D\u0652\u062F\u064E\u0647\u064F \u0644\u064E\u0627 \u0634\u064E\u0631\u0650\u064A\u0643\u064E \u0644\u064E\u0647\u064F", hadith: "The Messenger of Allah \uFDFA said: \u201CWhoever says this one hundred times in a day will receive the reward of freeing ten slaves, one hundred good deeds will be written for him, one hundred sins will be erased, and he will be protected from Satan until evening.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b (6403); \u1e62a\u1e25\u012b\u1e25 Muslim (2691)" },
    bn: { name: "লা ইলাহা ইল্লাল্লাহ", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cযে ব্যক্তি দিনে একশতবার এই যিকির পাঠ করবে, সে দশজন দাস মুক্ত করার সমপরিমাণ সওয়াব পাবে এবং একশত নেকি লেখা হবে।\u201D", ref: "সহীহ আল-বুখারী, ৬৪০৩; সহীহ মুসলিম, ২৬৯১" }
  },
  salawat: {
    en: { name: "\u1e62alaw\u0101t upon the Prophet \uFDFA", arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0635\u064E\u0644\u0651\u0650 \u0639\u064E\u0644\u064E\u0649 \u0645\u064F\u062D\u064E\u0645\u0651\u064E\u062F\u064D", hadith: "The Messenger of Allah \uFDFA said: \u201CWhoever sends one blessing upon me, Allah will send ten blessings upon him.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 Muslim (408)" },
    bn: { name: "দরূদ শরীফ", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cযে ব্যক্তি আমার ওপর একবার দরূদ পাঠ করবে, আল্লাহ তার ওপর দশটি রহমত নাযিল করবেন।\u201D", ref: "সহীহ মুসলিম, ৪০৮" }
  },
  subhanallahiWaBihamdih: {
    en: { name: "Sub\u1e25\u0101nall\u0101hi wa bi\u1e25amdih", arabic: "\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E \u0627\u0644\u0644\u0651\u0647\u0650 \u0648\u064E\u0628\u0650\u062D\u064E\u0645\u0652\u062F\u0650\u0647\u0650", hadith: "The Messenger of Allah \uFDFA said: \u201CWhoever says 'Sub\u1e25\u0101nall\u0101hi wa bi\u1e25amdih' one hundred times in a day, his sins will be forgiven even if they are like the foam of the sea.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b, 6405; \u1e62a\u1e25\u012b\u1e25 Muslim, 2691" },
    bn: { name: "সুবহানাল্লাহি ওয়া বিহামদিহি", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201Cযে ব্যক্তি দিনে একশতবার 'সুবহানাল্লাহি ওয়া বিহামদিহি' পাঠ করবে, তার গুনাহসমূহ ক্ষমা করে দেওয়া হবে, যদিও তা সমুদ্রের ফেনার ন্যায় অসংখ্য হয়।\u201D", ref: "সহীহ আল-বুখারী, ৬৪০৫; সহীহ মুসলিম, ২৬৯১" }
  },
  lahawla: {
    en: { name: "L\u0101 \u1e25awla wa l\u0101 quwwata ill\u0101 bill\u0101h", arabic: "\u0644\u064E\u0627 \u062D\u064E\u0648\u0652\u0644\u064E \u0648\u064E\u0644\u064E\u0627 \u0642\u064F\u0648\u0651\u064E\u0629\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0628\u0650\u0627\u0644\u0644\u0651\u0647\u0650", hadith: "The Messenger of Allah \uFDFA said: \u201C'L\u0101 \u1e25awla wa l\u0101 quwwata ill\u0101 bill\u0101h' is a treasure from the treasures of Paradise.\u201D", ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b (4205); \u1e62a\u1e25\u012b\u1e25 Muslim (2704)" },
    bn: { name: "লা হাওলা ওয়ালা কুওয়াতা", hadith: "রাসূলুল্লাহ ﷺ বলেছেন: \u201C'লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ' জান্নাতের ভাণ্ডারসমূহের একটি অমূল্য ভাণ্ডার।\u201D", ref: "সহীহ আল-বুখারী, ৪২০৫; সহীহ মুসলিম, ২৭০৪" }
  }
};

/* ---------------------------------------------------------------
 * DU'A SCREEN
 * ------------------------------------------------------------- */
const DUA_LIST = [
  { id: "sleep", emoji: "🌙", en: { title: "Before Sleeping" }, bn: { title: "ঘুমানোর পূর্বে" },
    arabic: "\u0628ِ\u0627\u0633ْمِكَ \u0627للَّهُمَّ \u0623َمُوتُ \u0648َ\u0623َحْيَا", translit: "Bismika All\u0101humma am\u016btu wa a\u1e25y\u0101.",
    en_body: "In Your Name, O Allah, I die and I live.",
    bn_body: "হে আল্লাহ! আপনারই নামে আমি নিদ্রিত হই (মৃত্যুর ন্যায়) এবং আপনারই নামে পুনরায় জেগে উঠি।",
    ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b 6324" },

  { id: "waking", emoji: "🌅", en: { title: "Upon Waking" }, bn: { title: "ঘুম থেকে জাগার পর" },
    arabic: "\u0627لْحَمْدُ لِلَّهِ \u0627لَّذِي \u0623َحْيَانَا بَعْدَ مَا \u0623َمَاتَنَا \u0648َ\u0625ِلَيْهِ \u0627لنُّشُورُ",
    en_body: "All praise is due to Allah who gave us life after causing us to die, and to Him is the resurrection.",
    bn_body: "সকল প্রশংসা আল্লাহর, যিনি আমাদের মৃত্যুর ন্যায় নিদ্রার পর পুনরায় জীবন দান করেছেন; আর তাঁর কাছেই পুনরুত্থান।",
    ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b 6312" },

  { id: "enterToilet", emoji: "🚪", en: { title: "Entering the Toilet" }, bn: { title: "টয়লেটে প্রবেশ করার সময়" },
    arabic: "\u0627للَّهُمَّ \u0625ِنِّي \u0623َعُوذُ بِكَ مِنَ \u0627لْخُبُثِ \u0648َ\u0627لْخَبَائِثِ",
    en_body: "O Allah, I seek refuge in You from the male and female devils.",
    bn_body: "হে আল্লাহ! আমি আপনার নিকট সকল পুরুষ ও নারী শয়তানের অনিষ্ট থেকে আশ্রয় প্রার্থনা করছি।",
    ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b 142, \u1e62a\u1e25\u012b\u1e25 Muslim 375" },

  { id: "leaveToilet", emoji: "🚿", en: { title: "Leaving the Toilet" }, bn: { title: "টয়লেট থেকে বের হওয়ার সময়" },
    arabic: "\u063A\u064F\u0641\u0652\u0631\u064E\u0627\u0646َكَ", translit: "Ghufr\u0101naka",
    en_body: "I seek Your forgiveness.",
    bn_body: "হে আল্লাহ! আমি আপনার ক্ষমা প্রার্থনা করছি।",
    ref: "Sunan at-Tirmidh\u012b 7 (\u1e62a\u1e25\u012b\u1e25)" },

  { id: "beforeEating", emoji: "🍽", en: { title: "Before Eating" }, bn: { title: "খাওয়ার পূর্বে" },
    arabic: "\u0628ِسْمِ \u0627للَّهِ", translit: "Bismill\u0101h",
    en_body: "In the Name of Allah.",
    bn_body: "আল্লাহর নামে (খাওয়া শুরু করছি)।",
    ref: "\u1e62a\u1e25\u012b\u1e25 Muslim 2022" },

  { id: "afterEating", emoji: "🍽", en: { title: "After Eating" }, bn: { title: "খাওয়ার পরে" },
    arabic: "\u0627لْحَمْدُ لِلَّهِ \u0627لَّذِي \u0623َطْعَمَنِي هَذَا \u0648َرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي \u0648َلَا قُوَّةٍ",
    en_body: "Praise be to Allah who fed me this and provided it for me without any power or strength from myself.",
    bn_body: "সকল প্রশংসা আল্লাহর, যিনি আমাকে এ আহার দান করেছেন এবং আমার নিজের কোনো শক্তি বা সামর্থ্য ছাড়াই এর রিযিক দিয়েছেন।",
    ref: "Sunan Ab\u016b D\u0101w\u016bd 4023, Sunan at-Tirmidh\u012b 3458 (\u1e24asan)" },

  { id: "rizq", emoji: "💰", en: { title: "Seeking Rizq" }, bn: { title: "রিযিক প্রার্থনায়" },
    arabic: "\u0627للَّهُمَّ \u0627كْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ \u0648َ\u0623َغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    en_body: "O Allah, suffice me with what You have made lawful instead of what You have made unlawful, and enrich me by Your bounty so that I need no one besides You.",
    bn_body: "হে আল্লাহ! আপনার হালাল দ্বারা আমাকে হারাম থেকে অমুখাপেক্ষী করে দিন এবং আপনার অনুগ্রহে আমাকে এমনভাবে সমৃদ্ধ করুন যেন আপনার ছাড়া কারো মুখাপেক্ষী না হই।",
    ref: "Sunan at-Tirmidh\u012b 3563 (\u1e24asan)" },

  { id: "distress", emoji: "😔", en: { title: "Distress & Anxiety" }, bn: { title: "দুশ্চিন্তা ও উদ্বেগে" },
    arabic: "\u064A\u064E\u0627 حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ \u0623َسْتَغِيثُ",
    en_body: "O Ever-Living, O Self-Sustaining, by Your mercy I seek Your help.",
    bn_body: "হে চিরঞ্জীব! হে সর্বকিছুর ধারক ও পালনকর্তা! আপনার রহমতের উসিলায় আমি আপনার সাহায্য প্রার্থনা করছি।",
    ref: "Sunan at-Tirmidh\u012b 3524 (\u1e24asan)" },

  { id: "hardship", emoji: "😞", en: { title: "During Hardship" }, bn: { title: "কষ্টের সময়" },
    arabic: "\u0644َ\u0627 \u0625ِلَٰهَ \u0625ِلَّا \u0627للَّهُ \u0627لْعَظِيمُ \u0627لْحَلِيمُ\u2026",
    en_body: "There is no deity worthy of worship except Allah, the Most Great, the Most Forbearing\u2026",
    bn_body: "মহামহিমান্বিত, পরম সহনশীল আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই\u2026",
    ref: "\u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b 6346, \u1e62a\u1e25\u012b\u1e25 Muslim 2730" },

  { id: "forgiveness", emoji: "🤲", en: { title: "Seeking Forgiveness" }, bn: { title: "ক্ষমা প্রার্থনায়" },
    arabic: "رَبِّ \u0627غْفِرْ لِي \u0648َتُبْ عَلَيَّ، \u0625ِنَّكَ \u0623َنْتَ \u0627لتَّوَّابُ \u0627لرَّحِيمُ",
    en_body: "My Lord, forgive me and accept my repentance. Indeed, You are the Acceptor of repentance, the Most Merciful.",
    bn_body: "হে আমার রব! আমাকে ক্ষমা করুন এবং আমার তাওবা কবুল করুন। নিশ্চয়ই আপনিই তাওবা কবুলকারী, পরম দয়ালু।",
    ref: "Sunan Ab\u016b D\u0101w\u016bd 1516 (\u1e62a\u1e25\u012b\u1e25)" },

  { id: "bestDua", emoji: "❤️", en: { title: "The Best General Du\u02BF\u0101\u02BE" }, bn: { title: "সর্বোত্তম দোয়া" },
    arabic: "رَبَّنَا \u0622تِنَا فِي \u0627لدُّنْيَا حَسَنَةً \u0648َفِي \u0627لْآخِرَةِ حَسَنَةً \u0648َقِنَا عَذَابَ \u0627لنَّارِ",
    en_body: "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    bn_body: "হে আমাদের রব! আমাদের দুনিয়ায় কল্যাণ দান করুন, আখিরাতেও কল্যাণ দান করুন এবং আমাদের জাহান্নামের শাস্তি থেকে রক্ষা করুন।",
    ref: "Qur'an 2:201; \u1e62a\u1e25\u012b\u1e25 al-Bukh\u0101r\u012b 6389, \u1e62a\u1e25\u012b\u1e25 Muslim 2690" },

  { id: "bestInLife", emoji: "🌟", en: { title: "Asking for the Best in This Life and the Next" }, bn: { title: "দুনিয়া ও আখিরাতের কল্যাণ কামনায়" },
    arabic: "\u0627للَّهُمَّ \u0625ِنِّي \u0623َسْأَلُكَ \u0627لْهُدَى \u0648َ\u0627لتُّقَى \u0648َ\u0627لْعَفَافَ \u0648َ\u0627لْغِنَى",
    en_body: "O Allah, I ask You for guidance, piety, chastity, and contentment (or self-sufficiency).",
    bn_body: "হে আল্লাহ! আমি আপনার নিকট হিদায়াত, তাকওয়া, পবিত্রতা এবং অমুখাপেক্ষিতা প্রার্থনা করছি।",
    ref: "\u1e62a\u1e25\u012b\u1e25 Muslim 2721" },

  { id: "enterMasjid", emoji: "🕌", en: { title: "Entering the Masjid" }, bn: { title: "মসজিদে প্রবেশের সময়" },
    arabic: "\u0627للَّهُمَّ \u0627فْتَحْ لِي \u0623َبْوَابَ رَحْمَتِكَ",
    en_body: "O Allah, open for me the doors of Your mercy.",
    bn_body: "হে আল্লাহ! আমার জন্য আপনার রহমতের দরজাগুলো খুলে দিন।",
    ref: "\u1e62a\u1e25\u012b\u1e25 Muslim 713" },

  { id: "leaveMasjid", emoji: "🚶", en: { title: "Leaving the Masjid" }, bn: { title: "মসজিদ থেকে বের হওয়ার সময়" },
    arabic: "\u0627للَّهُمَّ \u0625ِنِّي \u0623َسْأَلُكَ مِنْ فَضْلِكَ",
    en_body: "O Allah, I ask You for Your bounty.",
    bn_body: "হে আল্লাহ! আমি আপনার অনুগ্রহ ও অফুরন্ত দান প্রার্থনা করছি।",
    ref: "\u1e62a\u1e25\u012b\u1e25 Muslim 713" }
];

const UI_STRINGS = {
  en: {
    appTitle: "Mindful Slave",
    signupTitle: "Create your account",
    username: "Username", name: "Name", email: "Email Address",
    gender: "Gender", male: "Male", female: "Female",
    country: "Country", pin: "4-digit PIN", signup: "Sign Up",
    haveAccount: "Already have an account? Log in",
    recoveryPinTitle: "Your Recovery PIN",
    recoveryPinBody: "Save this 6-digit PIN somewhere safe. You'll need it to restore your account after reinstalling the app or on a new device.",
    continue: "Continue",
    pinPromptTitle: "Enter your 6-digit Recovery PIN",
    pinPromptBody: "We found this profile on a new device. Enter your Recovery PIN to continue.",
    unlock: "Unlock",
    home: "Home", recitation: "Daily Recitation Schedule", dhikr: "Dhikr Tools", dua: "Du\u2019a",
    account: "Account", language: "Language", theme: "Theme", logout: "Log out",
    dailyDhikrCount: "Daily Dhikr Count", recentDhikr: "Recent Dhikr", authenticRef: "Authentic Reference:",
    addDhikr: "Add a Dhikr", accountCredentials: "Account Credentials", dailyDhikrRecord: "Daily Dhikr Record",
    save: "Save", phone: "Phone Number", selectDate: "Select date", noRecords: "No dhikr recorded for this date.",
    times: "times"
  },
  bn: {
    appTitle: "মাইন্ডফুল স্লেভ",
    signupTitle: "আপনার অ্যাকাউন্ট তৈরি করুন",
    username: "ইউজারনেম", name: "নাম", email: "ইমেইল ঠিকানা",
    gender: "লিঙ্গ", male: "পুরুষ", female: "নারী",
    country: "দেশ", pin: "৪-সংখ্যার পিন", signup: "সাইন আপ",
    haveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে? লগ ইন করুন",
    recoveryPinTitle: "আপনার রিকভারি পিন",
    recoveryPinBody: "এই ৬-সংখ্যার পিনটি নিরাপদ স্থানে সংরক্ষণ করুন। অ্যাপ পুনরায় ইনস্টল করলে বা নতুন ডিভাইসে অ্যাকাউন্ট ফিরিয়ে আনতে এটি প্রয়োজন হবে।",
    continue: "চালিয়ে যান",
    pinPromptTitle: "আপনার ৬-সংখ্যার রিকভারি পিন দিন",
    pinPromptBody: "এই প্রোফাইলটি একটি নতুন ডিভাইসে পাওয়া গেছে। চালিয়ে যেতে আপনার রিকভারি পিন দিন।",
    unlock: "আনলক করুন",
    home: "হোম", recitation: "দৈনন্দিন তিলাওয়াতের সময়সূচি", dhikr: "যিকির টুলস", dua: "দোয়া",
    account: "অ্যাকাউন্ট", language: "ভাষা", theme: "থিম", logout: "লগ আউট",
    dailyDhikrCount: "দৈনিক যিকির সংখ্যা", recentDhikr: "সাম্প্রতিক যিকির", authenticRef: "প্রামাণ্য রেফারেন্স:",
    addDhikr: "যিকির যুক্ত করুন", accountCredentials: "অ্যাকাউন্ট তথ্য", dailyDhikrRecord: "দৈনিক যিকির রেকর্ড",
    save: "সংরক্ষণ করুন", phone: "ফোন নম্বর", selectDate: "তারিখ নির্বাচন করুন", noRecords: "এই তারিখে কোনো যিকির রেকর্ড নেই।",
    times: "বার"
  }
};
