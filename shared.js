/* Community 729 — Shared site logic
   Data, cart, drawers, modals, toast — used across all pages. */

// ─────── DATA ───────
let PRACTITIONERS = [
  { id: 'p1',  name: 'Mira Halvorsen',  discipline: 'meditation',  practice: 'Vipassana &amp; Sound', bio: 'Twelve years of Vipassana training in Burma. Now leads our Sunday morning sittings and Wednesday sound baths. Known for the long silence.', price: 85, glyph: 'meditation' },
  { id: 'p2',  name: 'Elena Wójcik',    discipline: 'reiki',       practice: 'Reiki Master · Usui', bio: 'Certified Reiki Master in the Usui lineage. Sessions are quiet, hands-on or hands-off, and held with deep care. Sliding scale available.', price: 95, glyph: 'reiki' },
  { id: 'p3',  name: 'Takeshi Ramirez', discipline: 'qigong',      practice: 'Qi Gong &amp; Tai Chi', bio: 'Studied under Master Liu Ying-Tao for nine years. Teaches with humor and patience. Mornings in the courtyard, weather permitting.', price: 30, glyph: 'qigong' },
  { id: 'p4',  name: 'Aarav Joshi',     discipline: 'yoga',        practice: 'Hatha &amp; Yin', bio: 'Soft-spoken, slow-paced, and deeply traditional. Anatomy-aware. Welcomes complete beginners and deeply experienced students alike.', price: 25, glyph: 'yoga' },
  { id: 'p5',  name: 'Liesel Chen',     discipline: 'breath',      practice: 'Breathwork Facilitator', bio: 'Trained in conscious connected breathing and holotropic breathwork. Sessions are intense, transformative, and held with full presence.', price: 110, glyph: 'breath' },
  { id: 'p6',  name: 'Noor Khatun',     discipline: 'sound',       practice: 'Sound Healer · Crystal Bowls', bio: 'Performs with seven crystal bowls tuned to the chakra system, plus Tibetan bowls and a gong. Lie down. Receive.', price: 65, glyph: 'sound' },
  { id: 'p7',  name: 'Benedikt Ohlsen', practice: 'Kundalini Yoga &amp; Meditation', discipline: 'yoga', bio: 'Twenty-year practitioner of Kundalini in the lineage of Yogi Bhajan. Mantra, breath, and movement woven into one hour.', price: 30, glyph: 'yoga' },
  { id: 'p8',  name: 'Saoirse O\'Connor', practice: 'Reiki &amp; Shamanic Energy', discipline: 'reiki', bio: 'Combines Reiki Level III certification with shamanic energy clearing. Sessions begin and end with the breath. Sliding scale.', price: 95, glyph: 'reiki' },
  { id: 'p9',  name: 'Yusuf al-Rashid', practice: 'Sufi Meditation', discipline: 'meditation', bio: 'Teaches meditation in the Sufi tradition — silent dhikr, walking practice, and the heart-centered remembrance.', price: 40, glyph: 'meditation' },
];

let EVENTS = [
  { id: 'e1', day: 'MON', date: 'JUN 23',  num: 23, title: 'Morning Meditation', titleEm: '', time: '7:00 AM', host: 'Mira Halvorsen', price: 15, room: 'East Room', desc: 'Begin your week in stillness. Forty-five minutes of guided sitting, twenty in silence. Tea after.', badge: '' },
  { id: 'e2', day: 'MON', date: 'JUN 23',  num: 23, title: 'Hatha Yoga · ', titleEm: 'Slow Flow', time: '6:00 PM', host: 'Aarav Joshi', price: 20, room: 'East Room', desc: 'Anatomy-aware. Beginner-friendly. Bring your own mat or borrow one of ours.', badge: '' },
  { id: 'e3', day: 'TUE', date: 'JUN 24',  num: 24, title: 'Qi Gong in the ', titleEm: 'Courtyard', time: '7:30 AM', host: 'Takeshi Ramirez', price: 25, room: 'Courtyard', desc: 'Outdoor practice. Eight forms, gentle pace. Bring a sweater for shoulders.', badge: '' },
  { id: 'e4', day: 'TUE', date: 'JUN 24',  num: 24, title: 'Crystal Bowl ', titleEm: 'Sound Bath', time: '7:30 PM', host: 'Noor Khatun', price: 30, room: 'East Room', desc: 'Lie down. Close your eyes. Let seven crystal bowls and a single gong reset your nervous system.', badge: 'featured' },
  { id: 'e5', day: 'WED', date: 'JUN 25',  num: 25, title: 'Reiki ', titleEm: 'Open House', time: '6:00 PM', host: 'Elena Wójcik', price: 0, room: 'West Room', desc: 'Free 15-minute Reiki samples for those curious about energy work. Drop in. No registration.', badge: 'new' },
  { id: 'e6', day: 'THU', date: 'JUN 26',  num: 26, title: 'Kundalini Yoga &amp; ', titleEm: 'Mantra', time: '6:30 PM', host: 'Benedikt Ohlsen', price: 30, room: 'East Room', desc: 'Kriya, breath of fire, and mantra. Wear white if you have it. Otherwise, wear what you have.', badge: '' },
  { id: 'e7', day: 'FRI', date: 'JUN 27',  num: 27, title: 'Conscious Connected ', titleEm: 'Breathwork', time: '7:00 PM', host: 'Liesel Chen', price: 45, room: 'East Room', desc: 'A two-hour journey held by a trained facilitator. Intense and transformative. Not for beginners.', badge: 'full' },
  { id: 'e8', day: 'SAT', date: 'JUN 28',  num: 28, title: 'Full Moon ', titleEm: 'Ceremony', time: '8:00 PM', host: 'Mira &amp; Noor', price: 25, room: 'Courtyard', desc: 'Cacao, ritual, sound, and the moon. We gather monthly. Bring a journal and a friend.', badge: 'featured' },
  { id: 'e9', day: 'SUN', date: 'JUN 29',  num: 29, title: 'Sunday Sitting · ', titleEm: '90 Minutes', time: '9:00 AM', host: 'Yusuf al-Rashid', price: 20, room: 'East Room', desc: 'Silent meditation in the Sufi tradition. Begin with breath, settle into stillness. Long sitting.', badge: '' },
  { id: 'e10', day: 'SUN', date: 'JUN 29', num: 29, title: 'Awaken Your Soul ', titleEm: 'Retreat', time: '10:00 AM', host: 'Multiple Guides', price: 150, room: 'All Spaces', desc: 'A full-day immersion: breath, movement, sound, silence, and shared lunch. Limited to 18.', badge: 'new' },
];

let PRODUCTS = [
  // ─── Singing Bowls ───
  { id: 's1',  name: 'OM Singing Bowl',                cat: 'bowls',     catLabel: 'Tibetan · Hand-Hammered',  price: 65,    flag: 'bestseller', glyph: 'bowl' },
  { id: 's2',  name: 'Crystal Quartz Bowl',            cat: 'bowls',     catLabel: 'With Bag &amp; Striker',       price: 354,   flag: 'new',        glyph: 'crystalBowl' },
  { id: 's3',  name: 'Crystal Sound Bowl',             cat: 'bowls',     catLabel: 'Pure Quartz',              price: 55,    flag: '',           glyph: 'crystalBowl' },
  { id: 's4',  name: 'Tree of Life Singing Bowl',      cat: 'bowls',     catLabel: 'Engraved · Tibetan',       price: 49.5,  flag: '',           glyph: 'bowl' },
  { id: 's5',  name: 'Black Japanese Bowl',            cat: 'bowls',     catLabel: 'Professionally Tuned',      price: 250,   flag: '',           glyph: 'bowl' },
  { id: 's6',  name: 'Double Resonance Bowl',          cat: 'bowls',     catLabel: 'Twin-Tone',                price: 295,   flag: 'bestseller', glyph: 'bowl' },
  { id: 's7',  name: 'Himalayan Copper Singing Bowl',  cat: 'bowls',     catLabel: 'Hand-Forged',              price: 495,   flag: '',           glyph: 'bowl' },
  { id: 's8',  name: 'White Frosted Crystal Bowl',     cat: 'bowls',     catLabel: 'Professionally Tuned',     price: 375,   flag: '',           glyph: 'crystalBowl' },

  // ─── Gongs &amp; Chimes ───
  { id: 's10', name: 'Tibetan Gong',                   cat: 'gongs',     catLabel: 'Hand-Hammered · Large',    price: 995,   flag: '',           glyph: 'gong' },
  { id: 's11', name: 'Wind Gong',                      cat: 'gongs',     catLabel: 'Atmospheric Resonance',     price: 999,   flag: 'sold',       glyph: 'gong' },
  { id: 's12', name: 'Magical Wind Chimes',            cat: 'gongs',     catLabel: 'Tuned to G Major',         price: 56,    flag: 'sold',       glyph: 'chimes' },
  { id: 's13', name: 'Brass Tingsha · Cymbals',        cat: 'gongs',     catLabel: 'Pair · Tuned',             price: 48,    flag: '',           glyph: 'tingsha' },

  // ─── Ritual Tools ───
  { id: 's20', name: 'Large Dorj · Vajra',             cat: 'ritual',    catLabel: 'Ceremonial Tool',          price: 125,   flag: 'sold',       glyph: 'dorj' },
  { id: 's21', name: 'Mala · 108 Sandalwood Beads',    cat: 'ritual',    catLabel: 'Hand-Strung',              price: 38,    flag: '',           glyph: 'mala' },
  { id: 's22', name: 'Ceremonial Cacao · Single Origin', cat: 'ritual',  catLabel: 'Guatemalan',               price: 32,    flag: '',           glyph: 'cacao' },

  // ─── Incense &amp; Resins ───
  { id: 's30', name: 'OM Incense · Variety 20-Pack',   cat: 'incense',   catLabel: 'Bestseller',                price: 2,     flag: 'bestseller', glyph: 'incense' },
  { id: 's31', name: 'Mystic Temple Incense',          cat: 'incense',   catLabel: 'Hand-Rolled',              price: 4,     flag: 'bestseller', glyph: 'incense' },
  { id: 's32', name: 'Tales of India Incense',         cat: 'incense',   catLabel: 'Imported',                 price: 4,     flag: '',           glyph: 'incense' },
  { id: 's33', name: 'Marsala Chai Incense',           cat: 'incense',   catLabel: 'Warm &amp; Spiced',            price: 4,     flag: '',           glyph: 'incense' },
  { id: 's34', name: 'Mamarami Dream Incense',         cat: 'incense',   catLabel: 'Sleep Blend',              price: 4,     flag: '',           glyph: 'incense' },
  { id: 's35', name: 'Sandalwood Incense',             cat: 'incense',   catLabel: 'Hand-Rolled',              price: 18,    flag: 'new',        glyph: 'incense' },
  { id: 's36', name: 'Dragon Blood Resin',             cat: 'incense',   catLabel: 'Loose Resin',              price: 18,    flag: '',           glyph: 'resin' },
  { id: 's37', name: 'Black Copal Resin',              cat: 'incense',   catLabel: 'On Sale · was $8',         price: 7,     flag: 'sale',       glyph: 'resin' },
  { id: 's38', name: 'Frankincense Resin',             cat: 'incense',   catLabel: 'On Sale · was $7',         price: 6,     flag: 'sale',       glyph: 'resin' },
  { id: 's39', name: 'Myrrh Resin',                    cat: 'incense',   catLabel: 'On Sale · was $8',         price: 7,     flag: 'sale',       glyph: 'resin' },
  { id: 's40', name: 'Sage Bundle',                    cat: 'incense',   catLabel: 'White Sage',               price: 5,     flag: 'sold',       glyph: 'sage' },
  { id: 's41', name: 'Chakra Sage Bundle',             cat: 'incense',   catLabel: 'On Sale · was $7.99',      price: 6.99,  flag: 'sale',       glyph: 'sage' },

  // ─── Fragrance &amp; Body ───
  { id: 's50', name: 'Fragrance Oil · Cinnamon',       cat: 'body',      catLabel: 'Bestseller · Multiple Scents', price: 5,  flag: 'bestseller', glyph: 'oil' },
  { id: 's51', name: 'Scentsual Body Oil',             cat: 'body',      catLabel: 'Sparkling Gold',           price: 9,     flag: '',           glyph: 'oil' },
  { id: 's52', name: 'Organico Essential Oil',         cat: 'body',      catLabel: 'Organic · Multiple Scents', price: 4,    flag: '',           glyph: 'oil' },
  { id: 's53', name: 'Moonglow Magnesium Body Cream',  cat: 'body',      catLabel: '8oz Jar',                  price: 29.99, flag: '',           glyph: 'cream' },
  { id: 's54', name: 'Moonglow Minerals',              cat: 'body',      catLabel: 'Two Sizes Available',      price: 49.99, flag: '',           glyph: 'cream' },

  // ─── Apparel ───
  { id: 's60', name: 'Buddha T-Shirt',                 cat: 'apparel',   catLabel: '100% Cotton',              price: 25.99, flag: '',           glyph: 'tee' },
  { id: 's61', name: 'Ganesha T-Shirt',                cat: 'apparel',   catLabel: 'New Arrival',              price: 25.99, flag: 'new',        glyph: 'tee' },
  { id: 's62', name: 'Octopus Design Tee',             cat: 'apparel',   catLabel: 'Bestseller',                price: 25.99, flag: 'bestseller', glyph: 'tee' },
  { id: 's63', name: 'Casual Cool Top',                cat: 'apparel',   catLabel: '100% Cotton',              price: 22.5,  flag: '',           glyph: 'top' },
  { id: 's64', name: 'Black V-Neck Dress',             cat: 'apparel',   catLabel: 'Elegant',                  price: 79.5,  flag: '',           glyph: 'dress' },
  { id: 's65', name: 'Soft Pant Suit',                 cat: 'apparel',   catLabel: 'Casual &amp; Classy',          price: 79,    flag: '',           glyph: 'pantsuit' },
  { id: 's66', name: 'Multicolor Print Dress · Blue',  cat: 'apparel',   catLabel: 'Flowing Fit',              price: 75,    flag: '',           glyph: 'dress' },
  { id: 's67', name: 'Yellow Accent Dress',            cat: 'apparel',   catLabel: 'New Arrival · Also Blue',  price: 75,    flag: 'new',        glyph: 'dress' },
  { id: 's68', name: 'White Flowy Dress',              cat: 'apparel',   catLabel: 'New Arrival',              price: 79.99, flag: 'new',        glyph: 'dress' },
  { id: 's69', name: 'Butterfly Dress · 100% Cotton',  cat: 'apparel',   catLabel: 'Cotton Top',               price: 64,    flag: '',           glyph: 'dress' },
  { id: 's70', name: 'Cool Cotton Zipper Top',         cat: 'apparel',   catLabel: 'Casual &amp; Classy',          price: 46,    flag: '',           glyph: 'top' },
  { id: 's71', name: 'Scallop V-Neck',                 cat: 'apparel',   catLabel: 'Lush Scalloping Hem',      price: 54,    flag: '',           glyph: 'top' },
  { id: 's72', name: 'Feather Detail Top',             cat: 'apparel',   catLabel: 'Other Colors Available',   price: 18,    flag: '',           glyph: 'top' },
  { id: 's73', name: 'Soft Lightweight Shirt',         cat: 'apparel',   catLabel: 'Other Colors',             price: 75.5,  flag: '',           glyph: 'top' },
  { id: 's74', name: 'Fall Long-Sleeve',               cat: 'apparel',   catLabel: 'New Season',               price: 84,    flag: '',           glyph: 'top' },
  { id: 's75', name: 'Hand-Dyed Meditation Shawl',     cat: 'apparel',   catLabel: 'Limited · 12 made',        price: 88,    flag: 'new',        glyph: 'shawl' },
  { id: 's76', name: 'Linen Practice Tee',             cat: 'apparel',   catLabel: 'Natural Linen',            price: 42,    flag: '',           glyph: 'tee' },

  // ─── Tapestries ───
  { id: 's80', name: 'Mandala Tapestry · 82×94"',      cat: 'tapestry',  catLabel: '100% Cotton · India',      price: 58,    flag: '',           glyph: 'tapestry' },
  { id: 's81', name: 'Eye of Ra Tapestry · 102×66"',   cat: 'tapestry',  catLabel: 'Hand-Printed',             price: 47,    flag: '',           glyph: 'tapestry' },
  { id: 's82', name: 'Tie-Dye Spiral · 84×100"',       cat: 'tapestry',  catLabel: 'New · 100% Cotton',        price: 58,    flag: 'new',        glyph: 'tapestry' },
  { id: 's83', name: 'Celestial Zodiac · 67×104"',     cat: 'tapestry',  catLabel: '100% Cotton',              price: 47,    flag: 'sold',       glyph: 'tapestry' },
  { id: 's84', name: 'Vibrant OM Tapestry · 104×67"',  cat: 'tapestry',  catLabel: 'New Arrival',              price: 47,    flag: 'new',        glyph: 'tapestry' },

  // ─── Cards &amp; Donations ───
  { id: 's90', name: 'Gift Card · Any Amount',         cat: 'card',      catLabel: 'Digital · Email Delivery', price: 50,    flag: '',           glyph: 'card' },
  { id: 's91', name: 'Donation to Community 729',      cat: 'card',      catLabel: 'Support Sacred Space',     price: 20,    flag: '',           glyph: 'donate' },
];


// ─────── GLYPH LIBRARY (illustrations for products & practitioners) ───────
function glyph(name, fg='#16140F', bg='#F2EDE2') {
  const glyphs = {
    bowl: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="125" rx="62" ry="14" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <path d="M40 125 Q40 175, 100 175 Q160 175, 160 125" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <ellipse cx="100" cy="125" rx="55" ry="10" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.5"/>
      <ellipse cx="100" cy="138" rx="48" ry="7" fill="none" stroke="${fg}" stroke-width="0.7" opacity="0.4"/>
      <ellipse cx="100" cy="155" rx="36" ry="5" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.3"/>
      <line x1="100" y1="80" x2="100" y2="115" stroke="${fg}" stroke-width="1"/>
      <circle cx="100" cy="78" r="4" fill="${fg}"/>
      <line x1="92" y1="80" x2="108" y2="80" stroke="${fg}" stroke-width="0.8"/>
    </svg>`,
    crystalBowl: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${fg}" stop-opacity="0.2"/><stop offset="100%" stop-color="${fg}" stop-opacity="0.05"/></linearGradient></defs>
      <ellipse cx="100" cy="115" rx="65" ry="12" fill="url(#cg)" stroke="${fg}" stroke-width="1.5"/>
      <path d="M35 115 L 50 175 L 150 175 L 165 115" fill="url(#cg)" stroke="${fg}" stroke-width="1.5"/>
      <line x1="50" y1="175" x2="150" y2="175" stroke="${fg}" stroke-width="1.5"/>
      <ellipse cx="100" cy="115" rx="58" ry="9" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <line x1="60" y1="120" x2="68" y2="170" stroke="${fg}" stroke-width="0.5" opacity="0.4"/>
      <line x1="100" y1="121" x2="100" y2="173" stroke="${fg}" stroke-width="0.5" opacity="0.4"/>
      <line x1="140" y1="120" x2="132" y2="170" stroke="${fg}" stroke-width="0.5" opacity="0.4"/>
    </svg>`,
    gong: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="35" x2="40" y2="170" stroke="${fg}" stroke-width="1.5"/>
      <line x1="160" y1="35" x2="160" y2="170" stroke="${fg}" stroke-width="1.5"/>
      <line x1="35" y1="35" x2="165" y2="35" stroke="${fg}" stroke-width="1.5"/>
      <line x1="80" y1="35" x2="80" y2="55" stroke="${fg}" stroke-width="0.8"/>
      <line x1="120" y1="35" x2="120" y2="55" stroke="${fg}" stroke-width="0.8"/>
      <circle cx="100" cy="115" r="50" fill="none" stroke="${fg}" stroke-width="2"/>
      <circle cx="100" cy="115" r="42" fill="none" stroke="${fg}" stroke-width="0.7" opacity="0.5"/>
      <circle cx="100" cy="115" r="34" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <circle cx="100" cy="115" r="25" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <circle cx="100" cy="115" r="6" fill="${fg}" opacity="0.4"/>
    </svg>`,
    dorj: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="30" x2="100" y2="170" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="10" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <g stroke="${fg}" stroke-width="1.4" fill="none">
        <path d="M85 50 Q85 70, 100 70 Q115 70, 115 50"/>
        <path d="M75 35 Q75 60, 100 60"/>
        <path d="M125 35 Q125 60, 100 60"/>
        <path d="M85 150 Q85 130, 100 130 Q115 130, 115 150"/>
        <path d="M75 165 Q75 140, 100 140"/>
        <path d="M125 165 Q125 140, 100 140"/>
      </g>
      <circle cx="100" cy="35" r="3" fill="${fg}"/>
      <circle cx="100" cy="165" r="3" fill="${fg}"/>
    </svg>`,
    incense: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="80" x2="100" y2="160" stroke="${fg}" stroke-width="1.5"/>
      <line x1="60" y1="160" x2="140" y2="160" stroke="${fg}" stroke-width="2"/>
      <ellipse cx="100" cy="160" rx="22" ry="4" fill="none" stroke="${fg}" stroke-width="0.8"/>
      <circle cx="100" cy="80" r="3" fill="${fg}"/>
      <path d="M100 75 Q 90 60, 100 45 Q 110 30, 100 15" fill="none" stroke="${fg}" stroke-width="1" opacity="0.6"/>
      <path d="M100 75 Q 110 60, 100 45 Q 90 30, 100 15" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.4"/>
    </svg>`,
    cacao: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="105" rx="50" ry="45" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <ellipse cx="100" cy="105" rx="50" ry="12" fill="none" stroke="${fg}" stroke-width="1"/>
      <line x1="50" y1="105" x2="50" y2="135" stroke="${fg}" stroke-width="1.5"/>
      <line x1="150" y1="105" x2="150" y2="135" stroke="${fg}" stroke-width="1.5"/>
      <path d="M50 135 Q 100 165, 150 135" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <path d="M75 95 Q 80 90, 85 95" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.5"/>
      <path d="M115 95 Q 120 90, 125 95" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.5"/>
      <path d="M70 85 Q 100 70, 130 85" fill="none" stroke="${fg}" stroke-width="0.7" opacity="0.4"/>
    </svg>`,
    tingsha: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="100" r="35" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="130" cy="100" r="35" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="70" cy="100" r="28" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.5"/>
      <circle cx="130" cy="100" r="28" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.5"/>
      <circle cx="70" cy="100" r="4" fill="${fg}"/>
      <circle cx="130" cy="100" r="4" fill="${fg}"/>
      <path d="M70 100 Q 100 60, 130 100" fill="none" stroke="${fg}" stroke-width="1" stroke-dasharray="2 3"/>
    </svg>`,
    mala: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g fill="${fg}">
        <circle cx="100" cy="40" r="6"/>
      </g>
      <g fill="none" stroke="${fg}" stroke-width="1">
        <circle cx="100" cy="100" r="55"/>
      </g>
      <g fill="${fg}">
        <circle cx="100" cy="45" r="3"/><circle cx="118" cy="48" r="3"/><circle cx="135" cy="58" r="3"/><circle cx="148" cy="73" r="3"/><circle cx="155" cy="92" r="3"/><circle cx="155" cy="112" r="3"/><circle cx="148" cy="130" r="3"/><circle cx="135" cy="143" r="3"/><circle cx="118" cy="153" r="3"/><circle cx="100" cy="155" r="3"/><circle cx="82" cy="153" r="3"/><circle cx="65" cy="143" r="3"/><circle cx="52" cy="130" r="3"/><circle cx="45" cy="112" r="3"/><circle cx="45" cy="92" r="3"/><circle cx="52" cy="73" r="3"/><circle cx="65" cy="58" r="3"/><circle cx="82" cy="48" r="3"/>
      </g>
      <line x1="100" y1="46" x2="100" y2="60" stroke="${fg}" stroke-width="0.8"/>
      <path d="M95 165 L 100 175 L 105 165" fill="none" stroke="${fg}" stroke-width="1"/>
    </svg>`,
    tote: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 70 L 50 170 L 150 170 L 150 70 Z" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <path d="M70 70 Q 70 30, 100 30 Q 130 30, 130 70" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <g transform="translate(100,120)">
        <g stroke="${fg}" stroke-width="0.5" fill="none" opacity="0.85">
          <circle cx="0" cy="-15" r="15"/>
          <g transform="rotate(20)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(40)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(60)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(80)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(100)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(120)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(140)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(160)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(180)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(200)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(220)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(240)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(260)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(280)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(300)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(320)"><circle cx="0" cy="-15" r="15"/></g>
          <g transform="rotate(340)"><circle cx="0" cy="-15" r="15"/></g>
        </g>
        <circle r="9" fill="${bg}"/>
        <text text-anchor="middle" y="3" font-family="Cormorant Garamond" font-size="10" font-weight="500" font-style="italic" fill="${fg}" letter-spacing="-0.3">729</text>
      </g>
    </svg>`,
    shawl: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 60 L 100 50 L 160 60 L 150 165 L 100 175 L 50 165 Z" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="50" x2="100" y2="175" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <g stroke="${fg}" stroke-width="0.5" opacity="0.4" fill="none">
        <line x1="50" y1="100" x2="150" y2="100"/>
        <line x1="48" y1="130" x2="152" y2="130"/>
      </g>
      <g fill="${fg}" opacity="0.5">
        <circle cx="60" cy="170" r="1.5"/><circle cx="80" cy="173" r="1.5"/><circle cx="100" cy="175" r="1.5"/><circle cx="120" cy="173" r="1.5"/><circle cx="140" cy="170" r="1.5"/>
      </g>
      <line x1="60" y1="170" x2="58" y2="180" stroke="${fg}" stroke-width="0.5"/>
      <line x1="80" y1="173" x2="79" y2="183" stroke="${fg}" stroke-width="0.5"/>
      <line x1="100" y1="175" x2="100" y2="185" stroke="${fg}" stroke-width="0.5"/>
      <line x1="120" y1="173" x2="121" y2="183" stroke="${fg}" stroke-width="0.5"/>
      <line x1="140" y1="170" x2="142" y2="180" stroke="${fg}" stroke-width="0.5"/>
    </svg>`,
    tee: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 40 L 40 60 L 55 75 L 65 65 L 65 165 L 135 165 L 135 65 L 145 75 L 160 60 L 140 40 L 115 40 Q 100 55, 85 40 Z" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <g transform="translate(100,110)" stroke="${fg}" stroke-width="0.5" fill="none" opacity="0.7">
        <circle cx="0" cy="-12" r="12"/>
        <g transform="rotate(20)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(40)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(60)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(80)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(100)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(120)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(140)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(160)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(180)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(200)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(220)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(240)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(260)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(280)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(300)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(320)"><circle cx="0" cy="-12" r="12"/></g>
        <g transform="rotate(340)"><circle cx="0" cy="-12" r="12"/></g>
      </g>
    </svg>`,
    card: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="55" width="130" height="90" rx="3" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <rect x="35" y="55" width="130" height="20" fill="${fg}" opacity="0.85"/>
      <line x1="50" y1="100" x2="100" y2="100" stroke="${fg}" stroke-width="0.8"/>
      <line x1="50" y1="115" x2="120" y2="115" stroke="${fg}" stroke-width="0.6" opacity="0.6"/>
      <text x="100" y="138" text-anchor="middle" font-family="Cormorant Garamond" font-size="14" font-style="italic" fill="${fg}">community 729</text>
    </svg>`,
    chimes: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="40" x2="160" y2="40" stroke="${fg}" stroke-width="1.5"/>
      <line x1="60" y1="40" x2="60" y2="120" stroke="${fg}" stroke-width="1.2"/>
      <line x1="85" y1="40" x2="85" y2="140" stroke="${fg}" stroke-width="1.2"/>
      <line x1="110" y1="40" x2="110" y2="155" stroke="${fg}" stroke-width="1.2"/>
      <line x1="135" y1="40" x2="135" y2="135" stroke="${fg}" stroke-width="1.2"/>
      <circle cx="60" cy="125" r="3" fill="${fg}"/>
      <circle cx="85" cy="145" r="3" fill="${fg}"/>
      <circle cx="110" cy="160" r="3" fill="${fg}"/>
      <circle cx="135" cy="140" r="3" fill="${fg}"/>
      <circle cx="100" cy="55" r="6" fill="none" stroke="${fg}" stroke-width="1"/>
    </svg>`,
    resin: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="155" rx="55" ry="6" fill="none" stroke="${fg}" stroke-width="1"/>
      <g fill="${fg}" opacity="0.7">
        <circle cx="80" cy="110" r="14"/>
        <circle cx="115" cy="100" r="11"/>
        <circle cx="105" cy="130" r="10"/>
        <circle cx="135" cy="125" r="8"/>
        <circle cx="65" cy="135" r="9"/>
      </g>
      <g fill="${fg}" opacity="1">
        <circle cx="92" cy="118" r="5"/>
        <circle cx="125" cy="115" r="4"/>
      </g>
      <path d="M 80 110 Q 78 80, 95 75" fill="none" stroke="${fg}" stroke-width="0.7" opacity="0.4"/>
      <path d="M 115 100 Q 130 70, 110 50" fill="none" stroke="${fg}" stroke-width="0.7" opacity="0.4"/>
    </svg>`,
    sage: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="92" y="60" width="16" height="100" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <line x1="88" y1="80" x2="112" y2="80" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <line x1="88" y1="100" x2="112" y2="100" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <line x1="88" y1="120" x2="112" y2="120" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <line x1="88" y1="140" x2="112" y2="140" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <ellipse cx="80" cy="85" rx="10" ry="20" fill="none" stroke="${fg}" stroke-width="1" transform="rotate(-30 80 85)"/>
      <ellipse cx="120" cy="85" rx="10" ry="20" fill="none" stroke="${fg}" stroke-width="1" transform="rotate(30 120 85)"/>
      <line x1="100" y1="60" x2="100" y2="35" stroke="${fg}" stroke-width="0.7"/>
      <line x1="100" y1="160" x2="100" y2="170" stroke="${fg}" stroke-width="0.7"/>
      <path d="M 100 35 Q 92 25, 100 15 Q 108 5, 100 -5" fill="none" stroke="${fg}" stroke-width="0.7" opacity="0.4" transform="translate(0, 0)"/>
    </svg>`,
    oil: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="50" width="40" height="14" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <path d="M82 64 Q82 85, 75 95 L 75 165 Q 75 175, 85 175 L 115 175 Q 125 175, 125 165 L 125 95 Q 118 85, 118 64 Z" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <line x1="78" y1="115" x2="122" y2="115" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <text x="100" y="155" text-anchor="middle" font-family="Cormorant Garamond" font-size="13" font-style="italic" fill="${fg}">729</text>
      <line x1="92" y1="42" x2="108" y2="42" stroke="${fg}" stroke-width="2"/>
    </svg>`,
    cream: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="62" y="60" width="76" height="14" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <rect x="62" y="74" width="76" height="100" rx="2" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <rect x="68" y="105" width="64" height="40" fill="${fg}" opacity="0.08"/>
      <text x="100" y="130" text-anchor="middle" font-family="Cormorant Garamond" font-size="14" font-style="italic" fill="${fg}">moonglow</text>
      <text x="100" y="160" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="6" letter-spacing="2" fill="${fg}">8 OZ · MAGNESIUM</text>
    </svg>`,
    top: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 45 L 50 65 L 60 80 L 72 70 L 72 165 L 128 165 L 128 70 L 140 80 L 150 65 L 130 45 L 115 45 Q 100 58, 85 45 Z" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <path d="M 85 45 Q 100 55, 115 45" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.5"/>
      <line x1="72" y1="100" x2="128" y2="100" stroke="${fg}" stroke-width="0.5" opacity="0.3"/>
    </svg>`,
    dress: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M75 35 L 60 55 L 75 70 L 75 95 L 50 175 L 150 175 L 125 95 L 125 70 L 140 55 L 125 35 L 115 35 Q 100 48, 85 35 Z" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <line x1="75" y1="95" x2="125" y2="95" stroke="${fg}" stroke-width="0.5" opacity="0.4"/>
      <path d="M 85 35 Q 100 45, 115 35" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.5"/>
      <line x1="65" y1="135" x2="135" y2="135" stroke="${fg}" stroke-width="0.4" opacity="0.3"/>
    </svg>`,
    pantsuit: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M75 35 L 60 50 L 70 65 L 78 60 L 78 95 L 65 100 L 70 175 L 95 175 L 100 100 L 105 175 L 130 175 L 135 100 L 122 95 L 122 60 L 130 65 L 140 50 L 125 35 L 115 35 Q 100 48, 85 35 Z" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <line x1="100" y1="100" x2="100" y2="170" stroke="${fg}" stroke-width="0.5" opacity="0.4"/>
    </svg>`,
    tapestry: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="35" width="120" height="135" fill="none" stroke="${fg}" stroke-width="1.3"/>
      <line x1="35" y1="35" x2="165" y2="35" stroke="${fg}" stroke-width="2"/>
      <g transform="translate(100,103)">
        <circle r="35" fill="none" stroke="${fg}" stroke-width="0.7"/>
        <circle r="22" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.7"/>
        <circle r="10" fill="${fg}" opacity="0.5"/>
        <g stroke="${fg}" stroke-width="0.5" opacity="0.55" fill="none">
          <line x1="0" y1="-35" x2="0" y2="35"/>
          <line x1="-35" y1="0" x2="35" y2="0"/>
          <line x1="-25" y1="-25" x2="25" y2="25"/>
          <line x1="-25" y1="25" x2="25" y2="-25"/>
        </g>
      </g>
      <g fill="${fg}" opacity="0.65">
        <circle cx="50" cy="178" r="1"/><circle cx="60" cy="180" r="1"/><circle cx="70" cy="178" r="1"/>
        <circle cx="80" cy="180" r="1"/><circle cx="90" cy="178" r="1"/><circle cx="100" cy="180" r="1"/>
        <circle cx="110" cy="178" r="1"/><circle cx="120" cy="180" r="1"/><circle cx="130" cy="178" r="1"/>
        <circle cx="140" cy="180" r="1"/><circle cx="150" cy="178" r="1"/>
      </g>
    </svg>`,
    donate: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 165 C 70 145, 45 125, 45 95 C 45 75, 60 60, 80 60 C 90 60, 100 70, 100 80 C 100 70, 110 60, 120 60 C 140 60, 155 75, 155 95 C 155 125, 130 145, 100 165 Z" fill="none" stroke="${fg}" stroke-width="1.4"/>
      <text x="100" y="115" text-anchor="middle" font-family="Cormorant Garamond" font-size="22" font-weight="500" font-style="italic" fill="${fg}">729</text>
    </svg>`,
    // Practitioner glyphs
    meditation: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="70" r="20" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <path d="M55 165 Q 55 130, 100 110 Q 145 130, 145 165" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <line x1="40" y1="165" x2="160" y2="165" stroke="${fg}" stroke-width="1.5"/>
      <g transform="translate(100,165)" opacity="0.5">
        <line x1="0" y1="-50" x2="0" y2="-30" stroke="${fg}" stroke-width="0.5" stroke-dasharray="2 2"/>
      </g>
    </svg>`,
    yoga: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="40" r="14" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="54" x2="100" y2="135" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="55" y2="55" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="145" y2="55" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="135" x2="65" y2="170" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="135" x2="135" y2="170" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="55" cy="55" r="3" fill="${fg}"/>
      <circle cx="145" cy="55" r="3" fill="${fg}"/>
    </svg>`,
    qigong: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 30 C 65 50, 65 110, 100 130 C 135 110, 135 50, 100 30 Z" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="100" cy="55" r="6" fill="${fg}"/>
      <circle cx="100" cy="105" r="6" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="130" x2="100" y2="170" stroke="${fg}" stroke-width="1.5"/>
      <path d="M75 145 L 100 165 L 125 145" fill="none" stroke="${fg}" stroke-width="1.5"/>
    </svg>`,
    reiki: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="22" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="${fg}" stroke-width="0.8" stroke-dasharray="3 3"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="${fg}" stroke-width="0.6" stroke-dasharray="2 4"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="${fg}" stroke-width="0.5" stroke-dasharray="1 5"/>
      <line x1="100" y1="20" x2="100" y2="35" stroke="${fg}" stroke-width="1.5"/>
      <line x1="100" y1="165" x2="100" y2="180" stroke="${fg}" stroke-width="1.5"/>
      <line x1="20" y1="100" x2="35" y2="100" stroke="${fg}" stroke-width="1.5"/>
      <line x1="165" y1="100" x2="180" y2="100" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="6" fill="${fg}"/>
    </svg>`,
    sound: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="115" rx="60" ry="14" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <path d="M40 115 Q 40 165, 100 165 Q 160 165, 160 115" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <path d="M55 80 Q 100 50, 145 80" fill="none" stroke="${fg}" stroke-width="1" opacity="0.5"/>
      <path d="M65 65 Q 100 35, 135 65" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.4"/>
      <path d="M75 50 Q 100 25, 125 50" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.3"/>
    </svg>`,
    breath: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" fill="none" stroke="${fg}" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="35" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.6"/>
      <circle cx="100" cy="100" r="20" fill="none" stroke="${fg}" stroke-width="0.6" opacity="0.4"/>
      <circle cx="100" cy="100" r="6" fill="${fg}"/>
      <path d="M100 35 Q 80 25, 100 15" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.6"/>
      <path d="M100 35 Q 120 25, 100 15" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.6"/>
      <path d="M100 165 Q 80 175, 100 185" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.6"/>
      <path d="M100 165 Q 120 175, 100 185" fill="none" stroke="${fg}" stroke-width="0.8" opacity="0.6"/>
    </svg>`,
  };
  return glyphs[name] || glyphs.bowl;
}


// ─────── CART STATE ───────
// Cart persists across pages via sessionStorage (clears when browser tab closes)
let cart = [];
try {
  const stored = sessionStorage.getItem('c729_cart');
  if (stored) cart = JSON.parse(stored);
} catch (e) { cart = []; }

function persistCart() {
  try { sessionStorage.setItem('c729_cart', JSON.stringify(cart)); } catch (e) {}
}

// ─────── CART LOGIC ───────
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || product.flag === 'sold') return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name: product.name, cat: product.catLabel, price: product.price, qty: 1, glyph: product.glyph });
  }
  persistCart();
  showToast(`Added · ${product.name}`);
  updateCartUI();
  if (typeof renderProducts === 'function') renderProducts();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  persistCart();
  updateCartUI();
  if (typeof renderProducts === 'function') renderProducts();
}

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    persistCart();
    updateCartUI();
  }
}

function updateCartUI() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const total = subtotal; // shipping calc'd at checkout

  // Nav badge
  const cartCountEl = document.getElementById('cartCount');
  const headCount = document.getElementById('cartHeadCount');
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  if (!cartCountEl || !headCount || !body || !foot) return;

  if (count > 0) {
    cartCountEl.style.display = 'flex';
    cartCountEl.textContent = count;
  } else {
    cartCountEl.style.display = 'none';
  }

  // Cart head
  headCount.textContent = count === 0 ? '— empty' : `· ${count} ${count === 1 ? 'item' : 'items'}`;

  // Cart body
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="glyph">
          <svg viewBox="0 0 100 100">
            <g transform="translate(50,50)">
              <g stroke="currentColor" stroke-width="0.5" fill="none">
                <circle cx="0" cy="-22" r="22"/>
                <g transform="rotate(20)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(40)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(60)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(80)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(100)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(120)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(140)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(160)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(180)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(200)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(220)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(240)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(260)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(280)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(300)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(320)"><circle cx="0" cy="-22" r="22"/></g>
                <g transform="rotate(340)"><circle cx="0" cy="-22" r="22"/></g>
              </g>
            </g>
          </svg>
        </div>
        <p>Your basket is empty.</p>
        <small>Browse the marketplace below — singing bowls, ritual tools, and ceremonial goods await.</small>
      </div>
    `;
    foot.style.display = 'none';
  } else {
    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${glyph(item.glyph)}</div>
        <div class="cart-item-info">
          <span class="cat">${item.cat}</span>
          <span class="name">${item.name}</span>
          <div class="qty-row">
            <button class="qty-btn" onclick="updateQty('${item.id}', -1)" aria-label="Decrease">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}', 1)" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `).join('');
    foot.style.display = 'block';
  }

  document.getElementById('cartSubtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
}

// ─────── CART DRAWER ───────
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

async function handleCheckout() {
  if (cart.length === 0) return;
  showToast('Opening secure checkout...');
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(item => ({ id: item.id, qty: item.qty, name: item.name }))
      })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Checkout is not connected yet.');
    window.location.href = payload.url;
  } catch (error) {
    showToast(error.message || 'Checkout is not connected yet.');
  }
}

// ─────── MODAL (practitioner / event) ───────
function openPractitionerModal(id) {
  const p = PRACTITIONERS.find(x => x.id === id);
  if (!p) return;
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-head">
      <span class="label">${p.discipline.toUpperCase()} · ${p.practice}</span>
      <h3>Book a session<br>with <em>${p.name}</em></h3>
    </div>
    <div class="modal-body">
      <p>${p.bio}</p>
      <p>Sessions are held privately at Community 729. Standard appointments are 60 minutes. Arrive 10 minutes early to settle. Cancellations made within 24 hours are refundable.</p>
      <dl class="meta-grid">
        <div><dt>Duration</dt><dd>60 minutes</dd></div>
        <div><dt>Location</dt><dd>East / West Room</dd></div>
        <div><dt>Rate</dt><dd>$${p.price}</dd></div>
        <div><dt>Sliding Scale</dt><dd>Available</dd></div>
      </dl>
    </div>
    <div class="modal-foot">
      <span style="font-family: var(--font-display); font-style: italic; font-size: 1.4rem; color: var(--ink);">$${p.price}<span style="font-family: var(--font-mono); font-style: normal; font-size: 0.65rem; letter-spacing: 0.2em; color: var(--brass); margin-left: 0.5rem;">/ 60 MIN</span></span>
      <div class="booking-fields">
        <input id="bookingName" type="text" placeholder="Your name" aria-label="Your name">
        <input id="bookingEmail" type="email" placeholder="your@email.com" aria-label="Email for booking confirmation">
      </div>
      <button class="btn brass" onclick="confirmBooking('${p.id}')">Confirm Booking <span class="arrow">→</span></button>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openEventModal(id) {
  const e = EVENTS.find(x => x.id === id);
  if (!e) return;
  const content = document.getElementById('modalContent');
  const isFull = e.badge === 'full';
  content.innerHTML = `
    <div class="modal-head">
      <span class="label">${e.day} · ${e.date} · ${e.time}</span>
      <h3>${e.title}<em>${e.titleEm}</em></h3>
    </div>
    <div class="modal-body">
      <p>${e.desc}</p>
      <p>Held in ${e.room}. Facilitated by ${e.host}. Drop-ins welcome at most weekly classes; ceremonies and retreats require advance reservation.</p>
      <dl class="meta-grid">
        <div><dt>Date</dt><dd>${e.date}</dd></div>
        <div><dt>Time</dt><dd>${e.time}</dd></div>
        <div><dt>Room</dt><dd>${e.room}</dd></div>
        <div><dt>Price</dt><dd>${e.price === 0 ? 'Free' : '$' + e.price}</dd></div>
      </dl>
    </div>
    <div class="modal-foot">
      <span style="font-family: var(--font-display); font-style: italic; font-size: 1.4rem; color: var(--ink);">${e.price === 0 ? 'Free' : '$' + e.price}<span style="font-family: var(--font-mono); font-style: normal; font-size: 0.65rem; letter-spacing: 0.2em; color: var(--brass); margin-left: 0.5rem;">${e.price === 0 ? 'DROP IN' : 'PER PERSON'}</span></span>
      <div class="booking-fields">
        <input id="eventName" type="text" placeholder="Your name" aria-label="Your name">
        <input id="eventEmail" type="email" placeholder="your@email.com" aria-label="Email for reservation confirmation">
      </div>
      <button class="btn brass" onclick="confirmEvent('${e.id}')" ${isFull ? '' : ''}>${isFull ? 'Join Waitlist' : 'Reserve Spot'} <span class="arrow">→</span></button>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

async function confirmBooking(id) {
  const p = PRACTITIONERS.find(x => x.id === id);
  if (!p) return;
  const name = document.getElementById('bookingName')?.value.trim();
  const email = document.getElementById('bookingEmail')?.value.trim();
  if (!email) {
    showToast('Enter an email to request a session');
    return;
  }
  try {
    const response = await fetch('/api/practitioner-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        practitionerId: p.id,
        practitionerName: p.name,
        name,
        email
      })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Booking is not connected yet.');
    closeModal();
    showToast(`Booking with ${p.name.split(' ')[0]} requested`);
  } catch (error) {
    showToast(error.message || 'Booking is not connected yet.');
  }
}
async function confirmEvent(id) {
  const e = EVENTS.find(x => x.id === id);
  if (!e) return;
  const name = document.getElementById('eventName')?.value.trim();
  const email = document.getElementById('eventEmail')?.value.trim();
  if (!email) {
    showToast('Enter an email to reserve a spot');
    return;
  }

  try {
    const isPaid = Number(e.price || 0) > 0;
    const endpoint = isPaid ? '/api/checkout' : '/api/reservations';
    const body = isPaid
      ? { email, items: [{ id: e.id, qty: 1, name: `${e.title}${e.titleEm || ''}` }] }
      : {
          eventId: e.id,
          eventTitle: `${e.title}${e.titleEm || ''}`,
          date: e.date,
          time: e.time,
          name,
          email,
          waitlist: e.badge === 'full'
        };
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Reservation is not connected yet.');
    if (payload.url) {
      window.location.href = payload.url;
      return;
    }
    closeModal();
    showToast('Spot reserved · check your email for confirmation');
  } catch (error) {
    showToast(error.message || 'Reservation is not connected yet.');
  }
}


// ─────── TOAST ───────
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}


// ─────── NEWSLETTER ───────
function handleNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  showToast(`Subscribed · welcome to the room`);
  e.target.reset();
}

// ─────── ESC TO CLOSE ───────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeModal();
    closeMobile();
  }
});


// ─────── REVEAL ON SCROLL ───────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.08 });
document.querySelectorAll('section').forEach(s => {
  s.classList.add('reveal');
  observer.observe(s);
});


// ─────── MOBILE DRAWER ───────
// ─────── MOBILE DRAWER ───────
function openMobile() {
  document.getElementById('mobileDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobile() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('menuBtn')?.addEventListener('click', openMobile);

// ─────── COMMON INIT ───────
// Wire up cart drawer
document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
// Wire up mobile drawer
document.getElementById('menuBtn')?.addEventListener('click', openMobile);
// Wire up modal close
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});
// Reveal-on-scroll
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('section').forEach(s => {
    s.classList.add('reveal');
    observer.observe(s);
  });
}
// Update cart UI on every page load
updateCartUI();

// ─────── BACKEND CONTENT HYDRATION ───────
async function hydrateBackendContent() {
  try {
    const response = await fetch('/api/content');
    if (!response.ok) return;
    const payload = await response.json();

    if (Array.isArray(payload.products) && payload.products.length) PRODUCTS = payload.products;
    if (Array.isArray(payload.events) && payload.events.length) EVENTS = payload.events;
    if (Array.isArray(payload.practitioners) && payload.practitioners.length) PRACTITIONERS = payload.practitioners;

    updateCartUI();
    if (typeof populateCategoryCounts === 'function') populateCategoryCounts();
    if (typeof renderProducts === 'function') renderProducts(true);
    if (typeof populatePractitionerCounts === 'function') populatePractitionerCounts();
    if (typeof renderPractitioners === 'function') renderPractitioners();
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof renderFeaturedEvents === 'function') renderFeaturedEvents();
    if (typeof renderProductDetail === 'function') renderProductDetail();
    if (typeof renderPractitionerDetail === 'function') renderPractitionerDetail();
  } catch (error) {
    console.warn('Content backend unavailable; using built-in fallback data.');
  }
}

window.addEventListener('load', hydrateBackendContent);
