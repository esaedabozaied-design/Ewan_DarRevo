/* إيوان × دار ريفو — نموذج تجربة اختيار المطبخ أثناء زيارة المشروع
   كل الأرقام والأسعار في هذا الملف توضيحية. عدّلها من كتلة CONFIG أدناه ثم أعد تحميل الصفحة. */
(() => {
'use strict';

/* ============================== 1) الإعدادات (CONFIG) ============================== */
const CFG = {
  clientName: 'دار ريفو',
  projectDefault: 'مشروعكم السكني',
  whatsapp: '966504618348',             // رقم مبيعات إيوان للمشاريع (يُؤكد قبل الاعتماد)
  fallbackURL: 'https://esaedabozaied-design.github.io/Ewan_DarRevo/', // يُستخدم فقط عند الفتح كملف محلي
  vat: 0.15,
  rangePct: 0.06,                        // نطاق التقدير ± 6%
  rate: { A: 4600, B: 4900, C: 5200 },   // ر.س لكل متر طولي (توضيحي)
  islandRate: 7200,                      // ر.س لكل متر جزيرة
  fridgeBay: 1400, pantryTall: 2600,     // أعمدة ثابتة
  installPerM: 350, transport: 800,
  version: 'v1 · 24 أكتوبر 2026'
};

const UNITS = [
  { id: 'a', code: 'A', name: 'الوحدة A', type: 'غرفتان وصالة', W: 300, D: 380, door: 30 },
  { id: 'b', code: 'B', name: 'الوحدة B', type: '3 غرف وصالة', W: 380, D: 440, door: 40 },
  { id: 'c', code: 'C', name: 'الوحدة C', type: 'دوبلكس / بنتهاوس', W: 460, D: 520, door: 50 }
];
const PKGS = {
  A: { id: 'A', name: 'مساحة عملية', layout: 'توزيع خطي', short: 'صف واحد على جدار الخدمات', img: 'k3-small-warm-grey.jpg',
       blurb: 'صف واحد متصل يترك مساحة الحركة مفتوحة ويغطي الغسيل والتحضير والطهي.', need: 'عرض 2.4 م فأكثر' },
  B: { id: 'B', name: 'توازن يومي', layout: 'توزيع حرف L', short: 'صف رئيسي وجانب مع عمود تموين', img: 'k4-l-tall-units-beige.jpg',
       blurb: 'امتداد جانبي يضاعف سطح التحضير ويضيف عمود تموين لتخزين أوسع.', need: 'عرض 2.6 م وعمق 3.0 م فأكثر' },
  C: { id: 'C', name: 'تخزين أوسع', layout: 'حرف L مع جزيرة', short: 'صفان وجزيرة تحضير وضيافة', img: 'k1-u-island-walnut.jpg',
       blurb: 'تخزين أوسع مع جزيرة للتحضير والضيافة، بشرط ممرات عمل لا تقل عن 1.0 م.', need: 'عرض 3.6 م وعمق 4.0 م فأكثر' }
};
const FINISHES = [
  { id: 'walnut',   name: 'جوز داكن',     color: '#6B432B', perM: 380, img: 'c1-walnut.jpg' },
  { id: 'oak',      name: 'بلوط فاتح',    color: '#C9A27A', perM: 0,   img: 'c1-oak.jpg' },
  { id: 'ivory',    name: 'أبيض عاجي',    color: '#F3EFE6', perM: 0,   img: 'c1-ivory.jpg' },
  { id: 'beige',    name: 'بيج دافئ',     color: '#D9CBB8', perM: 90,  img: 'c1-beige.jpg' },
  { id: 'grey',     name: 'رمادي دافئ',   color: '#8F8881', perM: 140, img: 'c1-grey.jpg' },
  { id: 'charcoal', name: 'فحمي مطفي',    color: '#2E2D2B', perM: 260, img: 'c1-charcoal.jpg' }
];
const TOPS = [
  { id: 'quartz', name: 'كوارتز عاجي',     note: 'مشمول', color: '#EAE4D8', perM: 0 },
  { id: 'porcelain', name: 'بورسلان بعروق دافئة', note: 'مقاوم للحرارة', color: '#F5F2EC', perM: 620 },
  { id: 'stone', name: 'حجري جرافيت',      note: 'ملمس مطفي', color: '#3F3D3A', perM: 480 }
];
const HANDLES = [
  { id: 'jpull', name: 'حافة J بلا مقبض', note: 'مشمول', color: '#D9C7AC', price: 0 },
  { id: 'gold',  name: 'قضيب ذهبي مطفي',  note: '+650',  color: '#C9A15A', price: 650 },
  { id: 'black', name: 'قضيب أسود مطفي',  note: '+450',  color: '#26221F', price: 450 }
];
const ADDONS = [
  { id: 'drawer', name: 'تقسيم أدراج خشبي', desc: 'فواصل منظمة للأدوات', price: 950,  img: 'i1-drawer-organizer.jpg' },
  { id: 'corner', name: 'ركن زاوية دوّار',   desc: 'استغلال كامل للزاوية', price: 1650, img: 'i2-corner-pullout.jpg' },
  { id: 'pantry', name: 'سحب تموين كامل',    desc: 'سلال تخرج بالكامل',   price: 2400, img: 'i5-pantry-pullout.jpg' },
  { id: 'led',    name: 'إضاءة LED مخفية',   desc: 'أسفل الوحدات العلوية', price: 1200, img: null }
];
const STATUS = ['جديد', 'تم التواصل', 'معاينة مجدولة', 'عرض معتمد'];

/* ============================== 2) أدوات عامة ============================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const n0 = n => Math.round(n).toLocaleString('en-US');
const SAR = n => `<span class="num">${n0(n)}</span> ر.س`;
const m2 = cm => (cm / 100).toFixed(2);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* التخزين غير متاح */ } }
};
const toast = (() => { let t; return msg => { const el = $('#toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(t); t = setTimeout(() => el.classList.remove('on'), 2400); }; })();
const byId = (arr, id) => arr.find(x => x.id === id);
let uid = 0;

const prefs = Object.assign({ project: '', wa: CFG.whatsapp, qrUrl: '' }, store.get('ewan_dr_prefs', {}));
const projectName = () => prefs.project.trim() || CFG.projectDefault;
const savePrefs = () => store.set('ewan_dr_prefs', prefs);

/* ============================== 3) حالة تجربة الزائر ============================== */
const DEFAULT = { unit: 'b', pkg: 'B', finish: 'walnut', top: 'quartz', handle: 'jpull', addons: [] };
const B = Object.assign({}, DEFAULT, { step: 'cam', view: 'photo', tri: false, dims: true, src: 'show' });
const FLOW = ['unit', 'layout', 'custom', 'quote', 'request'];
const FLOW_LABEL = { unit: 'الوحدة', layout: 'التوزيع', custom: 'التخصيص', quote: 'السعر', request: 'الطلب' };
let lastRef = null;

function readHash() {
  const h = new URLSearchParams(location.hash.slice(1));
  const u = h.get('u'), p = h.get('p'), f = h.get('f'), t = h.get('t'), hd = h.get('h'), a = h.get('a');
  if (byId(UNITS, u)) B.unit = u;
  if (PKGS[p]) B.pkg = p;
  if (byId(FINISHES, f)) B.finish = f;
  if (byId(TOPS, t)) B.top = t;
  if (byId(HANDLES, hd)) B.handle = hd;
  if (a != null) B.addons = a.split(',').filter(x => byId(ADDONS, x));
  { const u0 = byId(UNITS, B.unit); if (!feasible(u0, B.pkg).ok) B.pkg = feasible(u0, 'B').ok ? 'B' : 'A'; }
  const q = new URLSearchParams(location.search).get('src');
  if (['show', 'office', 'handover'].includes(q)) B.src = q;
  return !!(u || p);
}
function hashOf() {
  return `#u=${B.unit}&p=${B.pkg}&f=${B.finish}&t=${B.top}&h=${B.handle}&a=${B.addons.join(',')}`;
}
function shareURL() { return baseURL() + hashOf(); }
function baseURL() {
  if (prefs.qrUrl) return prefs.qrUrl.split('#')[0].split('?')[0];
  return location.protocol.startsWith('http') ? location.origin + location.pathname : CFG.fallbackURL;
}
const isLocalFile = () => !location.protocol.startsWith('http');
const SRC_LABEL = { show: 'مطبخ شقة العرض', office: 'مكتب المبيعات', handover: 'كتيّب تسليم المشتري' };

/* ============================== 4) محرك المخطط ============================== */
function feasible(u, p) {
  if (p === 'A') return u.W >= 240 ? { ok: true } : { ok: false, why: PKGS.A.need };
  if (p === 'B') return u.W >= 260 && u.D >= 300 ? { ok: true } : { ok: false, why: PKGS.B.need };
  return u.W >= 360 && u.D >= 400 ? { ok: true } : { ok: false, why: PKGS.C.need };
}
function geom(u, p) {
  const W = u.W, D = u.D, depth = 60, fridgeW = 70;
  const run = W - fridgeW;
  const g = { W, D, depth, fridgeW, run, side: 0, island: null, pantry: false };
  g.sx = Math.round(run * 0.30);               // مركز الحوض
  g.hx = Math.round(run * 0.80);               // مركز الموقد
  g.fr = { x: W - fridgeW, y: 0, w: fridgeW, h: 65 };
  if (p === 'B' || p === 'C') { g.side = Math.min(D - depth - 110, 260); g.pantry = true; }
  if (p === 'C') {
    const ix = depth + 100, iw = Math.min(200, W - ix - 100), iy = depth + 110;
    g.island = { x: ix, y: iy, w: iw, h: 90 };
  }
  g.counter = run + g.side + (g.island ? g.island.w : 0);
  g.billed = { main: run, side: g.side, island: g.island ? g.island.w : 0 };
  // مثلث العمل
  const P = { sink: [g.sx, 26], hob: [g.hx, 30], fridge: [W - fridgeW / 2, 32] };
  const d = (a, b) => Math.round(Math.hypot(a[0] - b[0], a[1] - b[1]));
  g.P = P; g.legs = [d(P.sink, P.hob), d(P.hob, P.fridge), d(P.fridge, P.sink)]; g.legSum = g.legs.reduce((a, b) => a + b, 0);
  g.prep = g.counter - 80 - 60;
  return g;
}
function checksFor(u, p, g) {
  const out = [];
  const L = g.legSum;
  out.push(L <= 790
    ? { c: 'ok', t: `مثلث العمل (حوض ← موقد ← ثلاجة) ${m2(L)} م — ضمن النطاق الشائع للتصميم (حتى 7.9 م).` }
    : { c: 'w', t: `مثلث العمل ${m2(L)} م أطول من المعتاد؛ يُراجع موقع الثلاجة مع مهندس إيوان.` });
  out.push(g.prep >= 120
    ? { c: 'ok', t: `سطح تحضير حر ≈ ${m2(g.prep)} م بعد الحوض والموقد.` }
    : { c: 'w', t: `سطح التحضير الحر ${m2(g.prep)} م فقط؛ يُنصح بتوزيع أوسع.` });
  if (p === 'C') out.push({ c: 'ok', t: 'ممرات العمل حول الجزيرة 1.00–1.10 م، ومناسبة لفتح الأدراج والأبواب.' });
  else out.push({ c: 'ok', t: `مساحة الحركة أمام الوحدات ${m2(u.D - g.depth)} م، ولا تتعارض مع حركة الباب.` });
  out.push({ c: 'ok', t: 'نقاط السباكة والكهرباء على جدار الخدمات؛ أي نقل يخرج عن هذا التقدير.' });
  return out;
}

function planSVG(u, p, o = {}) {
  const id = 'pl' + (++uid);
  const g = geom(u, p), W = u.W, D = u.D, mini = !!o.mini;
  const fin = byId(FINISHES, o.finish || B.finish);
  const fillBase = shade(fin.color, 0.0), stroke = '#6a4a2f';
  const dark = (parseInt(fin.color.slice(1, 3), 16) * .3 + parseInt(fin.color.slice(3, 5), 16) * .59 + parseInt(fin.color.slice(5, 7), 16) * .11) < 120;
  const pad = mini ? 18 : 64;
  const vb = `${-pad} ${-pad} ${W + pad * 2} ${D + pad * 2 + (mini ? 0 : 6)}`;
  const fs = mini ? 0 : Math.max(12.5, (W + pad * 2) / 25);
  const t = (x, y, s, fill = '#44291C', st = '') => `<text x="${x}" y="${y}" font-size="${fs}" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="600" fill="${fill}" style="${st}">${s}</text>`;
  const seg = [];
  seg.push(`<defs><pattern id="${id}f" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#EFE6D8" stroke-width="1.2"/></pattern>
    <marker id="${id}a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#8A5A25"/></marker></defs>`);
  // الجدران والأرضية
  seg.push(`<rect x="-14" y="-14" width="${W + 28}" height="${D + 28}" rx="6" fill="#44291C"/>`);
  seg.push(`<rect x="0" y="0" width="${W}" height="${D}" fill="#fff"/><rect x="0" y="0" width="${W}" height="${D}" fill="url(#${id}f)"/>`);
  // نافذة
  seg.push(`<rect x="${g.sx - 60}" y="-14" width="120" height="14" fill="#F7F1E6"/><path d="M${g.sx - 60} -9H${g.sx + 60}M${g.sx - 60} -5H${g.sx + 60}" stroke="#C9A27A" stroke-width="1.4"/>`);
  // باب
  const dw = 90, dx = u.door;
  seg.push(`<rect x="${dx}" y="${D}" width="${dw}" height="14" fill="#F7F1E6"/>`);
  seg.push(`<path d="M${dx} ${D}V${D - dw}" stroke="#44291C" stroke-width="3"/><path d="M${dx + dw} ${D}A${dw} ${dw} 0 0 0 ${dx} ${D - dw}" fill="none" stroke="#B9A184" stroke-width="1.6" stroke-dasharray="5 5"/>`);
  // الوحدات
  const cab = (x, y, w, h, cls = '', fill = fillBase) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="2.2" ${cls}/>`;
  seg.push(cab(0, 0, g.run, g.depth));
  for (let x = 60; x < g.run - 20; x += 60) seg.push(`<path d="M${x} 6V${g.depth}" stroke="${stroke}" stroke-opacity=".35" stroke-width="1.2"/>`);
  const tall = shade(fin.color, -0.12);
  seg.push(cab(g.fr.x, g.fr.y, g.fr.w, g.fr.h, '', tall));
  seg.push(`<path d="M${g.fr.x + 6} 6L${g.fr.x + g.fr.w - 6} ${g.fr.h - 6}M${g.fr.x + g.fr.w - 6} 6L${g.fr.x + 6} ${g.fr.h - 6}" stroke="${stroke}" stroke-opacity=".5" stroke-width="1.4"/>`);
  if (g.side) {
    seg.push(cab(0, g.depth, g.depth, g.side));
    for (let y = g.depth + 60; y < g.depth + g.side - 60; y += 60) seg.push(`<path d="M6 ${y}H${g.depth}" stroke="${stroke}" stroke-opacity=".35" stroke-width="1.2"/>`);
    seg.push(cab(0, g.depth + g.side - 60, 60, 60, '', tall));
  }
  // الحوض والموقد
  seg.push(`<rect x="${g.sx - 40}" y="8" width="80" height="44" rx="5" fill="#fff" stroke="#8A5A25" stroke-width="2"/><rect x="${g.sx - 33}" y="14" width="66" height="32" rx="4" fill="#F4EEE4" stroke="#8A5A25" stroke-opacity=".5"/><circle cx="${g.sx}" cy="8" r="4" fill="#8A5A25"/>`);
  seg.push(`<rect x="${g.hx - 30}" y="4" width="60" height="52" rx="5" fill="#fff" stroke="#8A5A25" stroke-width="2"/>` +
    [[-13, 14], [13, 14], [-13, 38], [13, 38]].map(([a, b]) => `<circle cx="${g.hx + a}" cy="${b}" r="8" fill="none" stroke="#44291C" stroke-width="2"/>`).join(''));
  // الجزيرة
  if (g.island) {
    const I = g.island;
    seg.push(cab(I.x, I.y, I.w, I.h, '', shade(fin.color, -0.04)));
    seg.push(`<rect x="${I.x + 6}" y="${I.y + 6}" width="${I.w - 12}" height="${I.h - 12}" fill="none" stroke="${stroke}" stroke-opacity=".3"/>`);
    const n = Math.max(2, Math.floor(I.w / 55));
    for (let i = 0; i < n; i++) seg.push(`<circle cx="${I.x + (I.w / n) * (i + .5)}" cy="${I.y + I.h + 24}" r="17" fill="#E9D7BC" stroke="#8A5A25" stroke-width="1.6"/>`);
  }
  // مثلث العمل
  if (o.tri) {
    const { sink, hob, fridge } = g.P;
    seg.push(`<polygon points="${sink.join(',')} ${hob.join(',')} ${fridge.join(',')}" fill="rgba(138,90,37,.10)" stroke="#8A5A25" stroke-width="3" stroke-dasharray="9 7" stroke-linejoin="round"/>`);
    [sink, hob, fridge].forEach(pt => seg.push(`<circle cx="${pt[0]}" cy="${pt[1]}" r="6" fill="#8A5A25"/>`));
  }
  if (!mini) {
    // أبعاد
    const dimH = (x1, x2, y, label) => `<g stroke="#6B5A4E" stroke-width="1.5"><path d="M${x1} ${y}H${x2}" marker-start="url(#${id}a)" marker-end="url(#${id}a)"/><path d="M${x1} ${y - 8}V${y + 8}M${x2} ${y - 8}V${y + 8}"/></g>${t((x1 + x2) / 2, y - 9, label)}`;
    const dimV = (y1, y2, x, label) => `<g stroke="#6B5A4E" stroke-width="1.5"><path d="M${x} ${y1}V${y2}" marker-start="url(#${id}a)" marker-end="url(#${id}a)"/><path d="M${x - 8} ${y1}H${x + 8}M${x - 8} ${y2}H${x + 8}"/></g><text transform="translate(${x - 9} ${(y1 + y2) / 2}) rotate(-90)" font-size="${fs}" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="600" fill="#44291C">${label}</text>`;
    if (o.dims !== false) {
      seg.push(dimH(0, W, -38, `${m2(W)} م`));
      seg.push(dimV(0, D, -38, `${m2(D)} م`));
      if (g.island) {
        const I = g.island;
        seg.push(`<g stroke="#8A5A25" stroke-width="1.6" fill="none"><path d="M${I.x + I.w / 2} ${g.depth}V${I.y}" marker-start="url(#${id}a)" marker-end="url(#${id}a)"/><path d="M${g.depth} ${I.y + 50}H${I.x}" marker-start="url(#${id}a)" marker-end="url(#${id}a)"/></g>`);
        seg.push(t(I.x + I.w / 2 + 28, (g.depth + I.y) / 2 + 5, '110', '#8A5A25'));
        seg.push(t((g.depth + I.x) / 2, I.y + 40, '100', '#8A5A25'));
      }
    }
    // تسميات
    const lb = (x, y, s) => t(x, y, s, '#6B5A4E', `font-size:${fs * .86}px;font-weight:500`);
    seg.push(lb(g.sx, 72 + fs * .1, 'حوض'));
    seg.push(lb(g.hx, 72 + fs * .1, 'موقد'));
    seg.push(lb(g.fr.x + g.fr.w / 2, g.fr.h + fs + 2, 'ثلاجة'));
    if (g.side) seg.push(`<text transform="translate(${g.depth / 2 + fs * .3} ${g.depth + 70}) rotate(-90)" font-size="${fs * .8}" text-anchor="end" font-family="Cairo,sans-serif" fill="${dark ? '#F1E9DD' : '#6B5A4E'}">وحدات جانبية</text>`);
    if (g.island) seg.push(t(g.island.x + g.island.w / 2, g.island.y + g.island.h / 2 + fs * .3, 'جزيرة'));
    seg.push(lb(dx + dw / 2, D - dw * .35, 'المدخل'));
    // علامات الخدمات
    seg.push(`<path d="M${g.sx} 2l-7 -11h14z" fill="#8A5A25"/><path d="M${g.hx} 2l-7 -11h14z" fill="#8A5A25"/>`);
    seg.push(`<text x="${g.sx}" y="${-17 - fs * .2}" font-size="${fs * .78}" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="600" fill="#8A5A25">سباكة</text>`);
    seg.push(`<text x="${g.hx}" y="${-17 - fs * .2}" font-size="${fs * .78}" text-anchor="middle" font-family="Cairo,sans-serif" font-weight="600" fill="#8A5A25">كهرباء</text>`);
    if (o.tri) {
      const { sink, hob, fridge } = g.P;
      const mid = (a, b, k) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + k];
      const l = [[sink, hob], [hob, fridge], [fridge, sink]];
      const off = [-14, 46, 82];
      l.forEach((pr, i) => { const m = mid(pr[0], pr[1], off[i]); seg.push(`<rect x="${m[0] - fs * 1.6}" y="${m[1] - fs}" width="${fs * 3.2}" height="${fs * 1.4}" rx="${fs * .5}" fill="#fff" stroke="#8A5A25"/>` + t(m[0], m[1] + fs * .05, `${m2(g.legs[i])}`, '#8A5A25')); });
    }
  }
  return `<svg viewBox="${vb}" role="img" aria-label="مخطط ${esc(u.name)} بتوزيع ${PKGS[p].layout}" xmlns="http://www.w3.org/2000/svg">${seg.join('')}</svg>`;
}
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = v => Math.max(0, Math.min(255, Math.round(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))));
  return '#' + [f(r), f(g), f(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}

/* ============================== 5) محرك السعر ============================== */
function pricing(s = B) {
  const u = byId(UNITS, s.unit), g = geom(u, s.pkg), fin = byId(FINISHES, s.finish), top = byId(TOPS, s.top), hd = byId(HANDLES, s.handle);
  const rate = CFG.rate[s.pkg], lines = [];
  const mMain = g.billed.main / 100, mSide = g.billed.side / 100, mIsl = g.billed.island / 100;
  lines.push({ l: 'وحدات الصف الرئيسي', sub: `${mMain.toFixed(2)} م × ${n0(rate)}`, a: mMain * rate });
  if (mSide) lines.push({ l: 'وحدات الصف الجانبي', sub: `${mSide.toFixed(2)} م × ${n0(rate)}`, a: mSide * rate });
  lines.push({ l: 'عمود الثلاجة وأبواب علوية', sub: 'مبلغ ثابت', a: CFG.fridgeBay });
  if (g.pantry) lines.push({ l: 'عمود التموين', sub: 'مبلغ ثابت', a: CFG.pantryTall });
  if (mIsl) lines.push({ l: 'الجزيرة', sub: `${mIsl.toFixed(2)} م × ${n0(CFG.islandRate)}`, a: mIsl * CFG.islandRate });
  const totalM = mMain + mSide + mIsl;
  if (fin.perM) lines.push({ l: `تشطيب ${fin.name}`, sub: `${totalM.toFixed(2)} م × ${n0(fin.perM)}`, a: totalM * fin.perM });
  if (top.perM) lines.push({ l: `سطح ${top.name}`, sub: `${totalM.toFixed(2)} م × ${n0(top.perM)}`, a: totalM * top.perM });
  if (hd.price) lines.push({ l: hd.name, sub: 'مبلغ ثابت', a: hd.price });
  s.addons.forEach(id => { const a = byId(ADDONS, id); lines.push({ l: a.name, sub: 'إضافة', a: a.price }); });
  lines.push({ l: 'التوريد والتركيب', sub: `${totalM.toFixed(2)} م × ${n0(CFG.installPerM)} + نقل`, a: totalM * CFG.installPerM + CFG.transport });
  const subtotal = lines.reduce((a, x) => a + x.a, 0), vat = subtotal * CFG.vat, total = subtotal + vat;
  const r100 = v => Math.round(v / 100) * 100;
  return { lines, subtotal, vat, total, lo: r100(total * (1 - CFG.rangePct)), hi: r100(total * (1 + CFG.rangePct)), totalM, g, u };
}

/* ============================== 6) واجهة الزائر ============================== */
function qrSVG(text) {
  try {
    const q = qrcode(0, 'M'); q.addData(text); q.make();
    return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }).replace('<svg', '<svg shape-rendering="crispEdges" role="img" aria-label="رمز QR"');
  } catch (e) { return '<svg viewBox="0 0 10 10"><text x="1" y="6" font-size="2">QR</text></svg>'; }
}
const ic = {
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  plan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h8M11 3v6M11 21v-8h10"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.4c.7.7 1 1.4 1 2.6h6c0-1.2.3-1.9 1-2.6A6 6 0 0 0 12 3z"/></svg>'
};

const RAIL = [
  { k: 'cam',     t: 'امسح الرمز',        d: 'من ستاند شقة العرض أو الكتيّب، بلا تطبيق وبلا تسجيل.' },
  { k: 'unit',    t: 'اختر نموذج الوحدة', d: 'التجربة تبدأ من مخطط الوحدة المعتمد وليس من كتالوج عام.' },
  { k: 'layout',  t: 'قارن التوزيعات',    d: 'ثلاث باقات تُفحص مقاساتها على المخطط قبل عرضها.' },
  { k: 'custom',  t: 'خصّص التفاصيل',     d: 'تشطيبات وأسطح ومقابض وإضافات مع صور وتسعير فوري.' },
  { k: 'quote',   t: 'اعرف التقدير',      d: 'نطاق سعر أولي واضح البنود، يُعتمد بعد القياس.' },
  { k: 'request', t: 'احفظ واطلب معاينة', d: 'يصل الطلب لفريق المبيعات مكتملًا، مع رابط الاختيارات.' }
];
const stepIndexOf = k => k === 'cam' ? 0 : k === 'land' ? 0 : k === 'done' ? 5 : 1 + FLOW.indexOf(k);

function renderVisitor() {
  const p = $('#p-visitor');
  p.innerHTML = `
  <div class="stage">
    <aside class="rail" aria-label="رحلة الزائر">
      <div>
        <span class="eyebrow">تجربة الزائر · مقترح لمشروع <span id="rail-proj">${esc(projectName())}</span></span>
        <h1>من مسح الرمز إلى طلب المعاينة، في دقيقتين</h1>
        <p class="lead">اضغط على أي خطوة لتنتقل إليها في الهاتف، أو جرّب التجربة بنفسك كما يراها الزائر.</p>
      </div>
      <ol class="journey" id="journey">${RAIL.map((r, i) => `<li><button type="button" data-rail="${r.k}"><b>${i + 1}</b><span><strong>${r.t}</strong><small>${r.d}</small></span></button></li>`).join('')}</ol>
      <div class="brief" aria-live="polite"><h3><span>ما يصل لفريق المبيعات</span><span class="tag-demo">توضيحي</span></h3><dl id="brief"></dl></div>
      <p class="muted" style="font-size:12.5px;color:#a8977f">اختصارات: 1–4 للأقسام · ← → للخطوات · R إعادة التجربة · Shift+R مسح الطلبات التجريبية</p>
    </aside>
    <div class="phone-wrap">
      <div class="phone" aria-label="محاكاة هاتف الزائر">
        <div class="screen" id="screen">
          <div class="notch" aria-hidden="true"></div>
          <div class="app-bar"><img src="assets/brand/ewan-logo-horizontal-reverse.svg" alt="إيوان"><div class="proj" id="app-proj"></div></div>
          <div id="steps-wrap"></div>
          <div class="app-body" id="app-body" tabindex="-1"></div>
          <div class="app-foot" id="app-foot"></div>
          <div class="cam" id="cam"></div>
        </div>
      </div>
    </div>
  </div>`;
  $('#journey').addEventListener('click', e => { const b = e.target.closest('[data-rail]'); if (b) goto(b.dataset.rail); });
  $('#app-body').addEventListener('click', onBodyClick);
  $('#app-body').addEventListener('input', onBodyInput);
  $('#app-foot').addEventListener('click', onFootClick);
  $('#steps-wrap').addEventListener('click', onFootClick);
  $('#cam').addEventListener('click', e => { if (e.target.closest('[data-scan]')) scan(); });
  paintApp();
}

function goto(k) {
  if (k === 'cam') { B.step = 'cam'; } else if (k === 'land') B.step = 'land'; else B.step = k;
  paintApp(true);
}
function scan() {
  const cam = $('#cam'); cam.classList.add('off');
  B.step = 'land'; paintApp(true);
}
function next(dir = 1) {
  const order = ['cam', 'land', ...FLOW];
  let i = order.indexOf(B.step); if (B.step === 'done') i = order.length - 1;
  const n = Math.max(0, Math.min(order.length - 1, i + dir));
  B.step = order[n]; paintApp(true);
}

function paintApp(resetScroll) {
  if (!$('#screen')) return;
  const body = $('#app-body'), foot = $('#app-foot'), cam = $('#cam');
  // حالة الكاميرا
  if (B.step === 'cam') {
    cam.classList.remove('off');
    cam.innerHTML = `<h2>وجّه الكاميرا نحو الرمز</h2>
      <div class="vf" aria-hidden="true">${qrSVG(srcURL(B.src))}<span class="scanline"></span></div>
      <p>الرمز موضوع على ستاند في ${SRC_LABEL[B.src]}.<br>لا تحتاج تطبيقًا ولا حسابًا.</p>
      <button class="btn gold" type="button" data-scan>محاكاة مسح الرمز</button>`;
    body.innerHTML = ''; foot.innerHTML = ''; $('#steps-wrap').innerHTML = '';
  } else cam.classList.add('off');
  $('#app-proj').innerHTML = `${esc(projectName())}<small>بالتعاون مع ${CFG.clientName}</small>`;
  if (B.step !== 'cam') {
    const prev = body.scrollTop;
    body.innerHTML = VIEWS[B.step] ? VIEWS[B.step]() : '';
    foot.innerHTML = footHTML();
    $('#steps-wrap').innerHTML = stepsHTML();
    body.scrollTop = resetScroll ? 0 : prev;
    afterView();
  }
  $$('#journey button').forEach(b => { b.removeAttribute('aria-current'); });
  const act = B.step === 'land' ? 'cam' : B.step === 'done' ? 'request' : B.step;
  const cur = $(`#journey [data-rail="${act}"]`); if (cur) cur.setAttribute('aria-current', 'step');
  paintBrief();
}
function srcURL(src) { return `${baseURL()}?src=${src}`; }
function stepsHTML() {
  const idx = FLOW.indexOf(B.step === 'done' ? 'request' : B.step);
  if (idx < 0) return '';
  return `<div class="steps" aria-hidden="true">${FLOW.map((_, i) => `<i class="${i <= idx ? 'on' : ''}"></i>`).join('')}</div>
          <div class="steps-l"><span>${idx + 1} من ${FLOW.length} · ${FLOW_LABEL[FLOW[idx]]}</span>${B.step === 'done' ? '' : '<button class="back" type="button" data-prev>رجوع ‹</button>'}</div>`;
}
function footHTML() {
  const P = pricing();
  const price = `<div class="sum"><small>التقدير الأولي شامل الضريبة</small><strong>${SAR(P.lo)}<small style="display:inline;font-size:12px;color:var(--muted)"> – </small>${SAR(P.hi)}</strong></div>`;
  switch (B.step) {
    case 'land': return `<button class="btn primary" style="flex:1" type="button" data-next>ابدأ تصميم مطبخك</button>`;
    case 'unit': return `${price}<button class="btn primary" type="button" data-next>التالي</button>`;
    case 'layout': return `${price}<button class="btn primary" type="button" data-next>التالي</button>`;
    case 'custom': return `${price}<button class="btn primary" type="button" data-next>عرض السعر</button>`;
    case 'quote': return `<button class="btn" type="button" data-prev>تعديل</button><button class="btn primary" style="flex:1" type="button" data-next>احفظ واطلب معاينة</button>`;
    case 'request': return `<button class="btn" type="button" data-prev>رجوع</button><button class="btn primary" style="flex:1" type="submit" form="lead-form">أرسل الطلب</button>`;
    case 'done': return `<button class="btn" style="flex:1" type="button" data-restart>ابدأ تجربة جديدة</button>`;
  }
  return '';
}
function paintFoot() { $('#app-foot').innerHTML = footHTML(); paintBrief(); }
function paintBrief() {
  const b = $('#brief'); if (!b) return;
  const P = pricing(), u = P.u;
  b.innerHTML = `<dt>مصدر الزيارة</dt><dd>${SRC_LABEL[B.src]}</dd><dt>الوحدة</dt><dd>${u.name} · ${u.type}</dd><dt>التوزيع</dt><dd>${PKGS[B.pkg].layout}</dd>
    <dt>التشطيب</dt><dd>${byId(FINISHES, B.finish).name}</dd><dt>السطح</dt><dd>${byId(TOPS, B.top).name}</dd><dt>الإضافات</dt><dd>${B.addons.length || 'بدون'}</dd>
    <dd class="tot" style="grid-column:1/-1">${SAR(P.lo)} – ${SAR(P.hi)}</dd>`;
  const rp = $('#rail-proj'); if (rp) rp.textContent = projectName();
}

const VIEWS = {
  land() {
    return `<div class="land-hero"><img src="assets/img/k1-u-island-walnut.jpg" alt="مطبخ بجزيرة وتشطيب خشبي دافئ (صورة توضيحية)"><div class="cap"><small>تجربة ${esc(projectName())}</small><h2>صمّم مطبخ وحدتك واعرف تكلفته</h2></div></div>
      <p class="sub">اختر نموذج وحدتك، قارن بين ثلاثة توزيعات، وخصّص التشطيبات. التقدير الأولي يظهر فورًا ويراجعه فريق إيوان قبل الاعتماد.</p>
      <div class="pills">
        <div>${ic.plan}<span><b>مربوط بمخطط وحدتك</b><br><small class="muted">التوزيعات تُفحص على المقاسات</small></span></div>
        <div>${ic.tag}<span><b>سعر واضح البنود</b><br><small class="muted">نطاق أولي، والنهائي بعد القياس</small></span></div>
        <div>${ic.phone}<span><b>بلا تطبيق وبلا تسجيل</b><br><small class="muted">احفظ اختياراتك في رابط</small></span></div>
      </div>
      <p class="src-note">تم المسح من: ${SRC_LABEL[B.src]}</p>`;
  },
  unit() {
    return `<h2 class="h-step">اختر نموذج وحدتك</h2><p class="sub">في المشروع الفعلي تظهر هنا نماذج ${esc(projectName())} المعتمدة. هذه نماذج توضيحية.</p>
      <div class="opts" role="radiogroup" aria-label="نموذج الوحدة">${UNITS.map(u => `
        <button class="opt" type="button" role="radio" data-k="unit" data-v="${u.id}" aria-checked="${B.unit === u.id}">
          <span class="th">${planSVG(u, 'A', { mini: true, finish: B.finish })}</span>
          <span><span class="oh">${u.name} <small class="muted" style="font-weight:400">· ${u.type}</small></span>
          <span class="op">مطبخ ${m2(u.W)} × ${m2(u.D)} م</span>
          <span class="meta"><span class="chip">${(u.W * u.D / 10000).toFixed(1)} م²</span><span class="chip line">${Object.keys(PKGS).filter(k => feasible(u, k).ok).length} توزيعات متاحة</span></span></span>
          <span class="tick" aria-hidden="true">✓</span></button>`).join('')}</div>
      <p class="fine-print" style="margin-top:12px">المقاسات الفعلية تُتحقق على الطبيعة قبل التصنيع.</p>`;
  },
  layout() { return `<h2 class="h-step">قارن توزيعات مطبخك</h2><p class="sub">${byId(UNITS, B.unit).name} · ${m2(byId(UNITS, B.unit).W)} × ${m2(byId(UNITS, B.unit).D)} م</p><div id="layout-dyn"></div>
      <div class="opts" role="radiogroup" aria-label="التوزيع" id="pkg-list">${Object.values(PKGS).map(pk => {
        const u = byId(UNITS, B.unit), f = feasible(u, pk.id), P = pricing(Object.assign({}, B, { pkg: pk.id }));
        return `<button class="opt" type="button" role="radio" data-k="pkg" data-v="${pk.id}" ${f.ok ? '' : 'disabled'} aria-checked="${B.pkg === pk.id}">
          <span class="th"><img src="assets/img/${pk.img}" alt="" loading="lazy"></span>
          <span><span class="oh">${pk.id} · ${pk.name}</span><span class="op">${f.ok ? pk.blurb : `<b>غير متاحة لهذه الوحدة:</b> تتطلب ${f.why}.`}</span>
          <span class="meta"><span class="chip">${pk.layout}</span>${f.ok ? `<span class="chip line">من ${SAR(P.lo)}</span>` : ''}</span></span>
          ${f.ok ? '<span class="tick" aria-hidden="true">✓</span>' : '<span class="lock">لا تناسب المساحة</span>'}</button>`;
      }).join('')}</div>`;
  },
  custom() {
    const fin = byId(FINISHES, B.finish);
    return `<h2 class="h-step">خصّص التفاصيل</h2>
      <div class="viz" id="viz"><img class="cur" src="assets/img/${fin.img}" alt="مطبخ بتشطيب ${fin.name} (صورة توضيحية)"><span class="lab" id="viz-lab">${fin.name}</span><span class="ai">صورة توضيحية</span></div>
      <div class="seg-t" role="tablist" aria-label="طريقة العرض"><button type="button" role="tab" data-view="photo" aria-selected="${B.view === 'photo'}">صورة التشطيب</button><button type="button" role="tab" data-view="plan" aria-selected="${B.view === 'plan'}">المخطط بالألوان</button></div>
      <div id="viz-plan" ${B.view === 'plan' ? '' : 'hidden'}></div>
      <div class="grp"><h3>لون الواجهات</h3><small id="fin-name">${fin.name}</small></div>
      <div class="sw" id="sw-fin">${FINISHES.map(f => `<button type="button" data-k="finish" data-v="${f.id}" aria-pressed="${B.finish === f.id}"><i style="background:${f.color}"></i>${f.name}<small>${f.perM ? '+' + f.perM + ' ر.س/م' : 'مشمول'}</small></button>`).join('')}</div>
      <div class="grp"><h3>سطح العمل</h3></div>
      <div class="sw">${TOPS.map(f => `<button type="button" data-k="top" data-v="${f.id}" aria-pressed="${B.top === f.id}"><i style="background:${f.color}"></i>${f.name}<small>${f.perM ? '+' + f.perM + ' ر.س/م' : 'مشمول'}</small></button>`).join('')}</div>
      <div class="grp"><h3>المقابض</h3></div>
      <div class="sw">${HANDLES.map(f => `<button type="button" data-k="handle" data-v="${f.id}" aria-pressed="${B.handle === f.id}"><i style="background:${f.color}"></i>${f.name}<small>${f.note}</small></button>`).join('')}</div>
      <div class="grp"><h3>إضافات التنظيم</h3><small>اختيارية</small></div>
      <div class="stack">${ADDONS.map(a => `<button class="tog" type="button" data-k="addon" data-v="${a.id}" aria-pressed="${B.addons.includes(a.id)}">
        ${a.img ? `<img src="assets/img/${a.img}" alt="" loading="lazy">` : `<span class="ic">${ic.bulb}</span>`}<span><strong>${a.name}</strong><small>${a.desc}</small></span><span class="pr">+${n0(a.price)}</span></button>`).join('')}</div>`;
  },
  quote() {
    const P = pricing(), u = P.u, fin = byId(FINISHES, B.finish), top = byId(TOPS, B.top), hd = byId(HANDLES, B.handle);
    return `<h2 class="h-step">تقدير مطبخك</h2>
      <div class="q-hero"><small>التقدير الأولي شامل ضريبة القيمة المضافة 15%</small><div class="big">${n0(P.lo)} <span>إلى</span> ${n0(P.hi)} <span>ر.س</span></div><p>أسعار توضيحية للنموذج. السعر المعتمد يصدر بعد مراجعة المقاسات والعينات وتأكيد مهندس إيوان.</p></div>
      <div class="plan-card">${planSVG(u, B.pkg, { tri: false, dims: true })}</div>
      <dl class="spec"><dt>الوحدة</dt><dd>${u.name} · ${u.type}</dd><dt>التوزيع</dt><dd>${B.pkg} · ${PKGS[B.pkg].layout}</dd><dt>الواجهات</dt><dd>${fin.name}</dd><dt>السطح</dt><dd>${top.name}</dd><dt>المقابض</dt><dd>${hd.name}</dd><dt>الطول الكلي</dt><dd>${P.totalM.toFixed(2)} م</dd></dl>
      <table class="bd" aria-label="تفصيل التقدير">${P.lines.map(l => `<tr><td>${l.l}<small>${l.sub}</small></td><td>${SAR(l.a)}</td></tr>`).join('')}
        <tr class="sub"><td>المجموع قبل الضريبة</td><td>${SAR(P.subtotal)}</td></tr><tr class="sub"><td>ضريبة القيمة المضافة (15%)</td><td>${SAR(P.vat)}</td></tr><tr class="tot"><td>الإجمالي التقديري</td><td>${SAR(P.total)}</td></tr></table>
      <div class="inc"><div><h4>يشمل التقدير</h4><ul><li>التصميم وفق مخطط الوحدة والتصنيع</li><li>الواجهات والسطح والمقابض والإضافات المختارة</li><li>التوريد والتركيب في الوحدة</li></ul></div>
        <div><h4>لا يشمل</h4><ul><li>الأجهزة الكهربائية</li><li>تعديل نقاط السباكة والكهرباء</li><li>أي تغيير في مخطط الوحدة المعتمد</li></ul></div></div>
      <p class="fine-print">السعر أولي. يتحول إلى سعر معتمد بعد القياس ومراجعة المخططات واعتماد العينات.</p>`;
  },
  request() {
    const P = pricing();
    return `<h2 class="h-step">احفظ اختياراتك واطلب معاينة</h2><p class="sub">البيانات اختيارية عدا رقم الجوال، وتُستخدم فقط للتواصل بخصوص هذا الطلب.</p>
      <div class="link-box"><button class="btn sm dark" type="button" data-copy>نسخ</button><input readonly value="${esc(shareURL())}" aria-label="رابط اختياراتك" id="share-in"></div>
      <p class="fine-print" style="margin:6px 0 14px">أي شخص يفتح الرابط يرى اختياراتك فقط، دون أي بيانات شخصية.</p>
      <form id="lead-form" novalidate>
        <label class="field"><span>الاسم</span><input name="name" autocomplete="name" placeholder="اسمك الكريم"></label>
        <label class="field"><span>رقم الجوال *</span><input name="phone" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="05XXXXXXXX" required><span class="err" id="e-phone" hidden>أدخل رقم جوال سعودي صحيح يبدأ بـ 05.</span></label>
        <label class="field"><span>رقم الوحدة أو القطعة</span><input name="unitNo" placeholder="اختياري"></label>
        <label class="field"><span>أفضل وقت للتواصل</span><select name="when"><option>صباحًا</option><option>بعد الظهر</option><option>مساءً</option><option>أي وقت</option></select></label>
        <label class="check"><input type="checkbox" name="ok" required><span>أوافق على تواصل فريق إيوان معي بخصوص هذا الطلب.</span></label>
        <span class="err" id="e-ok" hidden style="color:var(--bad);font-size:13px">الموافقة مطلوبة لإرسال الطلب.</span>
      </form>
      <p class="fine-print" style="margin-top:12px">التقدير الحالي: ${SAR(P.lo)} – ${SAR(P.hi)}.</p>`;
  },
  done() {
    const P = pricing();
    const msg = encodeURIComponent(`السلام عليكم، طلب معاينة من تجربة ${projectName()} (${lastRef}).\n${P.u.name} · ${PKGS[B.pkg].layout}\nالتشطيب: ${byId(FINISHES, B.finish).name}\nالتقدير: ${n0(P.lo)}–${n0(P.hi)} ر.س\n${shareURL()}`);
    return `<div class="ok-card"><div class="big-ok" aria-hidden="true">✓</div><h2 class="h-step" style="margin:0">وصل طلبك</h2>
      <div class="ref num">${lastRef}</div>
      <p class="sub">سيتواصل معك فريق إيوان لتأكيد موعد القياس ومراجعة التقدير. اختياراتك محفوظة في الرابط.</p>
      <div class="stack" style="margin-top:12px">
        <a class="btn primary" target="_blank" rel="noopener" href="https://wa.me/${esc(prefs.wa)}?text=${msg}">إرسال تفاصيل الطلب عبر واتساب</a>
        <button class="btn" type="button" data-print>طباعة بطاقة المواصفات</button>
      </div></div>`;
  }
};

function afterView() {
  if (B.step === 'layout') paintLayout();
  if (B.step === 'custom') paintVizPlan();
  syncPressed();
}
function paintLayout() {
  const u = byId(UNITS, B.unit), host = $('#layout-dyn'); if (!host) return;
  const g = geom(u, B.pkg);
  host.innerHTML = `<div class="plan-card">${planSVG(u, B.pkg, { tri: B.tri, dims: B.dims })}
    <div class="plan-tools"><button class="tg" type="button" data-tog="tri" aria-pressed="${B.tri}">مثلث العمل</button><button class="tg" type="button" data-tog="dims" aria-pressed="${B.dims}">الأبعاد</button></div></div>
    <ul class="checks">${checksFor(u, B.pkg, g).map(c => `<li class="${c.c === 'w' ? 'w' : ''}"><i>${c.c === 'w' ? '!' : '✓'}</i><span>${c.t}</span></li>`).join('')}</ul>
    <p class="fine-print" style="margin-bottom:14px">فحص أولي على المخطط التوضيحي. يُعاد الفحص على مخطط المشروع المعتمد.</p>`;
}
function paintVizPlan() {
  const h = $('#viz-plan'); if (!h) return;
  h.innerHTML = `<div class="plan-card">${planSVG(byId(UNITS, B.unit), B.pkg, { dims: false, finish: B.finish })}</div>`;
  $('#viz').hidden = B.view === 'plan'; h.hidden = B.view !== 'plan';
}
function syncPressed() {
  $$('#app-body [data-k]').forEach(b => {
    const k = b.dataset.k, v = b.dataset.v; let on = false;
    if (k === 'addon') on = B.addons.includes(v); else on = B[k] === v;
    if (b.hasAttribute('aria-checked')) b.setAttribute('aria-checked', on); else b.setAttribute('aria-pressed', on);
  });
}
function setViz(fin) {
  const viz = $('#viz'); if (!viz) return;
  const cur = viz.querySelector('img.cur'); if (!cur) return;
  const im = new Image(); im.className = 'in'; im.alt = `مطبخ بتشطيب ${fin.name} (صورة توضيحية)`;
  im.onload = () => {
    viz.insertBefore(im, viz.querySelector('.lab')); requestAnimationFrame(() => { im.classList.remove('in'); });
    setTimeout(() => { viz.querySelectorAll('img').forEach(el => { if (el !== im) el.remove(); }); im.classList.add('cur'); }, 470);
  };
  im.src = `assets/img/${fin.img}`;
  $('#viz-lab').textContent = fin.name; $('#fin-name').textContent = fin.name;
}

function onBodyClick(e) {
  const t = e.target;
  const k = t.closest('[data-k]');
  if (k && !k.disabled) {
    const key = k.dataset.k, v = k.dataset.v;
    if (key === 'addon') { B.addons = B.addons.includes(v) ? B.addons.filter(x => x !== v) : [...B.addons, v]; }
    else if (key === 'unit') { B.unit = v; const u = byId(UNITS, v); if (!feasible(u, B.pkg).ok) B.pkg = feasible(u, 'B').ok ? 'B' : 'A'; }
    else B[key] = v;
    if (key === 'finish') setViz(byId(FINISHES, v));
    if (key === 'pkg') { paintLayout(); paintPkgPrices(); }
    if (key === 'finish' || key === 'top' || key === 'handle' || key === 'unit' || key === 'pkg') { if (B.step === 'custom') paintVizPlan(); }
    syncPressed(); paintFoot(); return;
  }
  const tg = t.closest('[data-tog]'); if (tg) { B[tg.dataset.tog] = !B[tg.dataset.tog]; paintLayout(); return; }
  const vw = t.closest('[data-view]'); if (vw) { B.view = vw.dataset.view; $$('[data-view]').forEach(b => b.setAttribute('aria-selected', b.dataset.view === B.view)); paintVizPlan(); return; }
  if (t.closest('[data-copy]')) { copyText(shareURL()); return; }
  if (t.closest('[data-print]')) { printSpec(); return; }
}
function paintPkgPrices() { /* الأسعار في بطاقات التوزيع لا تتغير بتغيير الباقة */ }
function onBodyInput() { /* لا شيء */ }
function onFootClick(e) {
  if (e.target.closest('[data-next]')) {
    if (B.step === 'unit') { /* انتقال مباشر */ }
    next(1);
  } else if (e.target.closest('[data-prev]')) next(-1);
  else if (e.target.closest('[data-restart]')) resetDemo(true);
}
document.addEventListener('submit', e => {
  if (e.target.id !== 'lead-form') return;
  e.preventDefault();
  const f = e.target, fd = new FormData(f), phone = String(fd.get('phone') || '').replace(/[\s-]/g, '').replace(/^\+?966/, '0');
  const okPhone = /^05\d{8}$/.test(phone), okChk = f.elements.ok.checked;
  $('#e-phone').hidden = okPhone; $('#e-ok').hidden = okChk;
  if (!okPhone) { f.elements.phone.focus(); return; }
  if (!okChk) return;
  const leads = store.get('ewan_dr_leads', []);
  const P = pricing();
  const ref = 'EW-' + String(1000 + leads.length + 1);
  leads.unshift({ ref, t: Date.now(), name: String(fd.get('name') || '').trim(), phone: phone.slice(0, 4) + '••••' + phone.slice(-2), unit: B.unit, pkg: B.pkg, finish: B.finish, top: B.top, lo: P.lo, hi: P.hi, src: B.src, when: fd.get('when'), unitNo: String(fd.get('unitNo') || ''), status: 0, link: shareURL() });
  store.set('ewan_dr_leads', leads.slice(0, 60));
  lastRef = ref; B.step = 'done'; location.hash = hashOf().slice(1); paintApp(true); toast('تم إرسال الطلب إلى لوحة المبيعات');
});
function copyText(s) {
  const done = () => toast('تم نسخ الرابط');
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(done, () => fallbackCopy(s, done)); else fallbackCopy(s, done);
}
function fallbackCopy(s, cb) { const i = $('#share-in') || document.createElement('input'); i.value = s; i.select && i.select(); try { document.execCommand('copy'); } catch (e) { } cb(); }
function resetDemo(keepLeads) {
  Object.assign(B, DEFAULT, { step: 'cam', view: 'photo', tri: false, dims: true }); B.addons = [];
  history.replaceState(null, '', location.pathname + location.search);
  if (!keepLeads) store.set('ewan_dr_leads', []);
  paintApp(true); toast('أُعيدت التجربة من البداية');
}
function printSpec() {
  const P = pricing(), u = P.u, fin = byId(FINISHES, B.finish), top = byId(TOPS, B.top), hd = byId(HANDLES, B.handle);
  let ps = $('#print-sheet'); if (!ps) { ps = document.createElement('div'); ps.id = 'print-sheet'; document.body.appendChild(ps); }
  ps.innerHTML = `<header class="ps-h"><div><h1>بطاقة مواصفات مطبخ — ${esc(projectName())}</h1><p>تقدير أولي توضيحي · ${new Date().toLocaleDateString('ar-SA-u-nu-latn')}</p></div><div class="ps-b"><img src="assets/brand/ewan-logo-horizontal.svg" alt="إيوان" height="46"></div></header>
   <div class="ps-g"><div>${planSVG(u, B.pkg, { dims: true, finish: B.finish })}</div><dl class="spec"><dt>الوحدة</dt><dd>${u.name} · ${u.type}</dd><dt>التوزيع</dt><dd>${B.pkg} · ${PKGS[B.pkg].layout}</dd><dt>الواجهات</dt><dd>${fin.name}</dd><dt>السطح</dt><dd>${top.name}</dd><dt>المقابض</dt><dd>${hd.name}</dd><dt>الإضافات</dt><dd>${B.addons.map(a => byId(ADDONS, a).name).join('، ') || 'بدون'}</dd><dt>الطول الكلي</dt><dd>${P.totalM.toFixed(2)} م</dd></dl></div>
   <table class="bd">${P.lines.map(l => `<tr><td>${l.l}<small>${l.sub}</small></td><td>${SAR(l.a)}</td></tr>`).join('')}<tr class="sub"><td>ضريبة القيمة المضافة 15%</td><td>${SAR(P.vat)}</td></tr><tr class="tot"><td>الإجمالي التقديري (نطاق ${n0(P.lo)} – ${n0(P.hi)})</td><td>${SAR(P.total)}</td></tr></table>
   <p class="fine-print">تقدير أولي توضيحي يتحول إلى سعر معتمد بعد القياس ومراجعة المخططات. لا يشمل الأجهزة وتعديل الخدمات.</p><p class="fine-print">رابط الاختيارات: ${esc(shareURL())}</p>`;
  document.body.classList.add('ps'); window.print(); setTimeout(() => document.body.classList.remove('ps'), 500);
}

/* ============================== 7) لوحة المبيعات ============================== */
function prng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const SEED = (() => {
  const r = prng(20261024), days = [];
  for (let i = 0; i < 30; i++) days.push(Math.round(8 + i * 0.55 + r() * 9 + (i % 7 === 4 || i % 7 === 5 ? 7 : 0)));
  const sessions = days.reduce((a, b) => a + b, 0);
  return { days, sessions, unit: Math.round(sessions * .81), custom: Math.round(sessions * .54), quote: Math.round(sessions * .43), saved: Math.round(sessions * .21), req: Math.round(sessions * .088),
    approved: 6, pkgs: { A: 31, B: 46, C: 23 }, fins: { walnut: 29, oak: 21, ivory: 17, beige: 13, grey: 11, charcoal: 9 }, tops: { quartz: 52, porcelain: 31, stone: 17 },
    leads: [
      { ref: 'EW-0942', ago: 1, unit: 'b', pkg: 'B', finish: 'walnut', lo: 31200, hi: 35100, src: 'show', status: 1, demo: true },
      { ref: 'EW-0938', ago: 2, unit: 'a', pkg: 'A', finish: 'ivory', lo: 14200, hi: 16000, src: 'office', status: 2, demo: true },
      { ref: 'EW-0931', ago: 4, unit: 'c', pkg: 'C', finish: 'oak', lo: 61400, hi: 69100, src: 'show', status: 3, demo: true },
      { ref: 'EW-0927', ago: 5, unit: 'b', pkg: 'A', finish: 'beige', lo: 18700, hi: 21000, src: 'handover', status: 1, demo: true }
    ] };
})();

function renderSales() {
  const live = store.get('ewan_dr_leads', []);
  const L = live.length;
  const S = { sessions: SEED.sessions + L, unit: SEED.unit + L, custom: SEED.custom + L, quote: SEED.quote + L, saved: SEED.saved + L, req: SEED.req + L, approved: SEED.approved };
  const pct = (a, b) => (b ? Math.round(a / b * 1000) / 10 : 0);
  const kp = [
    ['جلسات المسح', n0(S.sessions), 'جلسة فريدة خلال 30 يومًا، دون جلسات الفريق'],
    ['إكمال التخصيص', pct(S.custom, S.sessions) + '%', 'من الجلسات التي وصلت إلى شاشة التخصيص'],
    ['روابط محفوظة', n0(S.saved), 'اختيارات نُسخ رابطها أو حُفظت'],
    ['طلبات المعاينة', n0(S.req), `نسبة ${pct(S.req, S.sessions)}% من الجلسات`],
    ['عروض معتمدة', n0(S.approved), 'بعد القياس ومراجعة إيوان']
  ];
  const fun = [['مسح الرمز', S.sessions], ['اختيار الوحدة', S.unit], ['إكمال التخصيص', S.custom], ['عرض السعر', S.quote], ['طلب معاينة', S.req]];
  const days = SEED.days; const maxD = Math.max(...days), cw = 640, ch = 190;
  const pts = days.map((v, i) => [30 + i * ((cw - 50) / 29), ch - 26 - (v / maxD) * (ch - 56)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
  const area = line + `L${pts[29][0]} ${ch - 26}L${pts[0][0]} ${ch - 26}Z`;
  const bars = (obj, names, tot) => Object.entries(obj).map(([k, v]) => `<div class="fr"><span>${names(k)}</span><div class="bar"><i style="width:${v / tot * 100}%"></i></div><b>${v}%</b></div>`).join('');
  const rows = [...live.map(l => ({ ...l, live: true })), ...SEED.leads.map(l => ({ ...l, t: Date.now() - l.ago * 86400000 }))];
  p_sales.innerHTML = `
  <div class="sec-head"><div><span class="eyebrow">لوحة فريق المبيعات في ${CFG.clientName}</span><h1>ما الذي يعرفه فريقكم عن اهتمام الزوار؟</h1><p>كل مسح وكل اختيار يتحول إلى مؤشر واضح، وكل طلب يصل مكتملًا بالوحدة والتوزيع والتقدير.</p></div>
    <button class="btn gold" type="button" id="btn-csv">تصدير الطلبات CSV</button></div>
  <div class="banner" role="note"><b>بيانات توضيحية:</b> الأرقام المعروضة مولّدة لشرح الفكرة، ولا تمثل أداءً فعليًا. الطلبات التي ترسلها من تجربة الزائر تظهر هنا مباشرة.</div>
  <div class="kpis">${kp.map(k => `<div class="kpi"><small>${k[0]}<span class="tag-demo">توضيحي</span></small><strong class="num">${k[1]}</strong><span>${k[2]}</span></div>`).join('')}</div>
  <div class="dash">
    <div class="card w8"><h3>الجلسات اليومية خلال 30 يومًا</h3>
      <svg class="chart" viewBox="0 0 ${cw} ${ch}" role="img" aria-label="رسم خطي للجلسات اليومية يرتفع تدريجيًا من ${days[0]} إلى ${days[29]}"><defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8A5A25" stop-opacity=".28"/><stop offset="1" stop-color="#8A5A25" stop-opacity="0"/></linearGradient></defs>
      ${[0, .5, 1].map(f => `<line x1="30" x2="${cw - 20}" y1="${ch - 26 - f * (ch - 56)}" y2="${ch - 26 - f * (ch - 56)}" stroke="#E4D6C3" stroke-dasharray="3 4"/><text x="22" y="${ch - 22 - f * (ch - 56)}" font-size="11" text-anchor="end" fill="#6B5A4E">${Math.round(maxD * f)}</text>`).join('')}
      <path d="${area}" fill="url(#ga)"/><path d="${line}" fill="none" stroke="#8A5A25" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${pts[29][0]}" cy="${pts[29][1]}" r="5" fill="#44291C"/><text x="${pts[29][0] - 8}" y="${pts[29][1] - 10}" font-size="12" font-weight="700" fill="#44291C">${days[29]}</text>
      <text x="30" y="${ch - 6}" font-size="11" fill="#6B5A4E">قبل 30 يومًا</text><text x="${cw - 20}" y="${ch - 6}" font-size="11" text-anchor="end" fill="#6B5A4E">اليوم</text></svg></div>
    <div class="card w4"><h3>مسار الزائر</h3><div class="funnel">${fun.map(f => `<div class="fr" style="grid-template-columns:104px 1fr 56px"><span>${f[0]}</span><div class="bar"><i style="width:${f[1] / S.sessions * 100}%"></i></div><b class="num">${n0(f[1])}</b></div>`).join('')}</div></div>
    <div class="card w4"><h3>التوزيع الأكثر اختيارًا</h3><div class="hb">${bars(SEED.pkgs, k => `${k} · ${PKGS[k].layout}`, 100)}</div></div>
    <div class="card w4"><h3>التشطيبات المفضلة</h3><div class="hb">${bars(SEED.fins, k => byId(FINISHES, k).name, 100)}</div></div>
    <div class="card w4"><h3>أسطح العمل</h3><div class="hb">${bars(SEED.tops, k => byId(TOPS, k).name, 100)}</div></div>
    <div class="card w12"><h3>صندوق الطلبات <span class="muted" style="font-weight:400;font-size:14px">· ${L ? `${L} طلب جديد من تجربتك الآن` : 'أرسل طلبًا من تجربة الزائر لتراه هنا'}</span></h3>
      <div class="tbl-wrap"><table class="t"><thead><tr><th>المرجع</th><th>الوقت</th><th>الوحدة</th><th>التوزيع</th><th>التشطيب</th><th>التقدير (ر.س)</th><th>المصدر</th><th>الحالة</th></tr></thead><tbody>
      ${rows.map(r => `<tr class="${r.live ? 'live' : ''}"><td><b class="num">${r.ref}</b> ${r.live ? '<span class="badge new">جديد</span>' : '<span class="tag-demo">توضيحي</span>'}</td><td>${rel(r.t)}</td><td>${byId(UNITS, r.unit).name}</td><td>${r.pkg} · ${PKGS[r.pkg].layout}</td><td>${byId(FINISHES, r.finish).name}</td><td><span class="num">${n0(r.lo)}–${n0(r.hi)}</span></td><td>${SRC_LABEL[r.src]}</td>
      <td>${r.live ? `<select class="st" data-ref="${r.ref}" aria-label="حالة ${r.ref}">${STATUS.map((s, i) => `<option value="${i}" ${i === r.status ? 'selected' : ''}>${s}</option>`).join('')}</select>` : `<span class="badge">${STATUS[r.status]}</span>`}</td></tr>`).join('')}
      </tbody></table></div>
      <p class="fine-print">يُحفظ رقم الجوال مقنّعًا في هذه الشاشة. في التشغيل الفعلي يتحدد من يرى البيانات الكاملة وفق الاتفاق.</p></div>
    <div class="card w12"><h3>ربط الوحدات بالتوزيعات المتاحة</h3><p class="muted" style="font-size:14px">يُفحص كل توزيع على مقاسات الوحدة قبل عرضه للزائر، فلا يرى مطبخًا لا يناسب مساحته.</p>
      <div class="units">${UNITS.map(u => `<div><div style="max-width:210px;margin:auto">${planSVG(u, u.W >= 360 ? 'C' : 'B', { mini: true })}</div><h4>${u.name} · ${u.type}</h4><p>${m2(u.W)} × ${m2(u.D)} م · ${(u.W * u.D / 10000).toFixed(1)} م²</p><div class="pk">${['A', 'B', 'C'].map(k => `<span class="${feasible(u, k).ok ? '' : 'no'}">${k}</span>`).join('')}</div></div>`).join('')}</div></div>
  </div>`;
  $$('select.st', p_sales).forEach(s => s.addEventListener('change', () => { const ls = store.get('ewan_dr_leads', []); const l = ls.find(x => x.ref === s.dataset.ref); if (l) { l.status = +s.value; store.set('ewan_dr_leads', ls); toast('تم تحديث حالة الطلب'); } }));
  $('#btn-csv').addEventListener('click', () => exportCSV(rows));
}
function rel(t) { const m = Math.round((Date.now() - t) / 60000); if (m < 2) return 'الآن'; if (m < 60) return `قبل ${m} دقيقة`; const h = Math.round(m / 60); if (h < 24) return `قبل ${h} ساعة`; const d = Math.round(h / 24); return d === 1 ? 'أمس' : d === 2 ? 'قبل يومين' : `قبل ${d} أيام`; }
function exportCSV(rows) {
  const head = ['المرجع', 'النوع', 'الوحدة', 'التوزيع', 'التشطيب', 'التقدير الأدنى', 'التقدير الأعلى', 'المصدر', 'الحالة'];
  const out = [head, ...rows.map(r => [r.ref, r.live ? 'طلب فعلي من التجربة' : 'توضيحي', byId(UNITS, r.unit).name, r.pkg, byId(FINISHES, r.finish).name, r.lo, r.hi, SRC_LABEL[r.src], STATUS[r.status]])];
  const csv = '﻿' + out.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = 'ewan-dar-revo-requests.csv'; document.body.appendChild(a); a.click(); a.remove(); toast('تم تجهيز ملف CSV');
}
let p_sales;

/* ============================== 8) ستاند الـQR ============================== */
const PLACES = [
  { k: 'show', t: 'مطبخ شقة العرض', d: 'ستاند على الجزيرة أو الجدار المقابل. الزائر يرى المطبخ الحقيقي ثم يمسح لتخصيصه.' },
  { k: 'office', t: 'مكتب المبيعات', d: 'بطاقة على الطاولة أثناء شرح الوحدات، ويمسحها الزائر أمام مندوب المبيعات.' },
  { k: 'handover', t: 'كتيّب تسليم المشتري', d: 'رمز في صفحة التجهيزات بعد الشراء، لمن يريد تجهيز مطبخه قبل الاستلام.' }
];
function renderQR() {
  const p = $('#p-qr'); const url = srcURL('show');
  p.innerHTML = `
  <div class="sec-head"><div><span class="eyebrow">مواد الموقع</span><h1>ستاند الـQR لـ ${esc(projectName())}</h1><p>رمز مستقل لكل موقع داخل المشروع، فيعرف فريقكم أين يتفاعل الزوار أكثر.</p></div>
    <div class="noprint" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn gold" type="button" id="btn-print-stand">طباعة الستاند</button></div></div>
  <div class="qr-grid">
    <div class="stand" id="stand">
      <div class="cobrand"><img src="assets/brand/dar-revo-logo-gold.png" alt="دار ريفو"><span>×</span><img src="assets/brand/ewan-logo-horizontal-reverse.svg" alt="إيوان"></div>
      <h2>امسح الرمز وصمّم مطبخ وحدتك</h2>
      <div class="qrbox" id="stand-qr">${qrSVG(url)}</div>
      <div class="how"><span>بلا تطبيق</span><span>·</span><span>بلا تسجيل</span><span>·</span><span>تقدير فوري</span></div>
      <div class="url num">${esc(url)}</div>
      <div class="fine">${esc(projectName())} · بالتعاون مع إيوان للمطابخ والخزائن</div>
    </div>
    <div class="place noprint">
      ${isLocalFile() ? `<div class="warn-box"><b>تنبيه قبل التوزيع:</b> الصفحة مفتوحة كملف على الجهاز، فالرمز يشير إلى الرابط المقترح بعد النشر. انشر مجلد النموذج على رابط عام ثم افتحه من الرابط، أو اكتب الرابط النهائي أدناه فيُعاد توليد الرموز.</div>` : ''}
      <div class="card"><h3>رابط التجربة</h3><p class="muted" style="font-size:14px;margin-bottom:6px">يُولَّد الرمز من هذا الرابط. غيّره عند نشر النموذج على عنوانه النهائي.</p>
        <div class="url-in"><input id="in-qr" value="${esc(baseURL())}" aria-label="رابط التجربة"><button class="btn dark" type="button" id="btn-qr">تحديث الرموز</button></div></div>
      ${PLACES.map(pl => `<div class="card"><div class="qrs">${qrSVG(srcURL(pl.k))}</div><div><h3>${pl.t}</h3><p>${pl.d}</p><p class="num" style="font-size:12px;margin-top:4px;color:var(--bronze)">?src=${pl.k}</p></div></div>`).join('')}
      <p class="fine-print" style="color:#a8977f">قبل الطباعة: اختبر كل رمز بهاتفين مختلفين من خارج شبكة المكتب، وتأكد من فتح الصفحة بدقة.</p>
    </div>
  </div>`;
  $('#btn-qr').addEventListener('click', () => { const v = $('#in-qr').value.trim(); if (!/^https?:\/\//i.test(v)) { toast('أدخل رابطًا يبدأ بـ https://'); return; } prefs.qrUrl = v; savePrefs(); renderQR(); toast('تم تحديث رموز QR'); });
  $('#btn-print-stand').addEventListener('click', () => { p.classList.add('print-me'); window.print(); setTimeout(() => p.classList.remove('print-me'), 400); });
}

/* ============================== 9) نموذج التعاون ============================== */
const CHECK = [
  ['project', 'تحديد المشروع التجريبي', 'مشروع واحد قريب من الجاهزية ويستقبل زوارًا.'],
  ['plans', 'مخطط وحدة معتمد (PDF أو DWG)', 'نموذج واحد على الأقل مع مواقع السباكة والكهرباء.'],
  ['coord', 'تسمية منسق من دار ريفو', 'يعتمد الصور والنصوص ويستقبل الملاحظات.'],
  ['brand', 'اعتماد ظهور الهوية', 'الشعار ولغة الصفحة والستاند بإذن كتابي.'],
  ['show', 'موعد زيارة شقة العرض', 'للقياس واختيار مكان الستاند.'],
  ['legal', 'مرجع العلاقة التعاقدية', 'الجهة المخولة بالتوقيع وصيغة الاتفاق المنفصل.']
];
function renderModel() {
  const done = store.get('ewan_dr_check', {});
  $('#p-model').innerHTML = `
  <div class="sec-head"><div><span class="eyebrow">نموذج التعاون المقترح</span><h1>تجربة محدودة، ومسؤوليات واضحة، وقياس قبل التوسع</h1><p>نبدأ بمشروع واحد ونموذج وحدة واحد، ثم يقرر الطرفان بناءً على نتائج التجربة.</p></div></div>
  <div class="model">
    <div class="two">
      <div class="card role"><h3>إيوان</h3><ul class="list"><li>إعداد التصاميم والخامات والتسعير المرجعي للنماذج.</li><li>بناء صفحة المشروع والستاند وربطهما بمخطط الوحدة.</li><li>مراجعة المقاسات وإصدار عرض السعر المعتمد.</li><li>التعاقد المباشر مع المشتري والتصنيع والتركيب وخدمة ما بعد البيع.</li><li>تقرير دوري بمؤشرات التجربة.</li></ul></div>
      <div class="card role"><h3>${CFG.clientName}</h3><ul class="list"><li>ترشيح مشروع ونموذج وحدة للتجربة.</li><li>توفير المخطط واعتماد طريقة ظهور الهوية.</li><li>السماح بوضع الستاند وتعريف الزوار بالخدمة.</li><li>تسمية منسق من فريق المبيعات.</li><li>مراجعة التقرير الدوري وقرار التوسع.</li></ul></div>
    </div>
    <div class="card"><h3>المسار الزمني المقترح</h3><p class="muted" style="font-size:14px">المدد تقديرية وقابلة للاتفاق، وتبدأ بعد اعتماد المخطط.</p>
      <div class="timeline">
        <div class="tl"><b>1</b><div><h4>اعتماد النطاق</h4><p>المشروع، النموذج، المنسقان، شروط الاتفاق.</p><em>أسبوع</em></div></div>
        <div class="tl"><b>2</b><div><h4>التجهيز</h4><p>المخطط، الصور، العينات، الأسعار المرجعية.</p><em>أسبوعان تقريبًا</em></div></div>
        <div class="tl"><b>3</b><div><h4>الاختبار</h4><p>استضافة الرابط، اختبار الرموز، تدريب المبيعات.</p><em>أيام</em></div></div>
        <div class="tl pilot"><b>4</b><div><h4>تشغيل تجريبي</h4><p>الستاند في الموقع وقياس التفاعل.</p><em>30 يومًا</em></div></div>
        <div class="tl"><b>5</b><div><h4>مراجعة وقرار</h4><p>نراجع النتائج ثم نقرر التوسع أو التعديل.</p><em>اجتماع</em></div></div>
      </div></div>
    <div><h2 style="font-size:22px;color:#fff;margin:6px 0 12px">خيارات العلاقة التجارية للنقاش</h2>
      <div class="three">
        <div class="card opt-model rec"><span class="k">الخيار 1</span><h3>تعاقد مباشر مع المشتري</h3><p>يتعاقد المشتري مع إيوان مباشرة. لا عمولة في الصيغة الأولى، وقيمة دار ريفو تأتي من تجربة زائر أفضل وتجهيزات أسرع للمشترين.</p><p class="pc">الأبسط تشغيليًا.</p></div>
        <div class="card opt-model"><span class="k">الخيار 2</span><h3>إحالة باتفاق مكتوب</h3><p>تُحتسب مكافأة إحالة عن الطلبات المتعاقد عليها فقط، وتُحدد النسبة والشروط في اتفاق منفصل بين الطرفين.</p><p class="pc">يحتاج تتبعًا واضحًا للطلبات.</p></div>
        <div class="card opt-model"><span class="k">الخيار 3</span><h3>ضمن باقة تسليم الوحدة</h3><p>تُعرض الخدمة كجزء من باقة التسليم، ويختار المشتري المطبخ من التجربة وفق شروط تتفق عليها الأطراف.</p><p class="pc">الأعمق تكاملًا، ويحتاج اتفاقًا أوسع.</p></div>
      </div></div>
    <div class="two">
      <div class="card"><h3>ما نقيسه في التجربة</h3><ul class="list"><li>جلسات المسح الفريدة دون جلسات الفريق.</li><li>نسبة إكمال التخصيص من الجلسات التي بدأته.</li><li>الروابط المحفوظة وطلبات المعاينة.</li><li>العروض المعتمدة والتعاقدات اللاحقة.</li></ul><p class="fine-print">لا نعد بنسبة زيادة في مبيعات الوحدات. نقيس التفاعل ونعرض النتائج كما هي.</p></div>
      <div class="card"><h3>الخصوصية والهوية</h3><ul class="list"><li>التصفح والحفظ بدون تسجيل. رقم الجوال لا يُطلب إلا عند طلب المعاينة وبموافقة الزائر.</li><li>لا تظهر هوية ${CFG.clientName} إلا بعد اعتماد كتابي للصيغة النهائية.</li><li>الصور والأسعار الحالية توضيحية، وتُستبدل بعينات حقيقية قبل التشغيل.</li></ul></div>
    </div>
    <div class="card"><h3>ما نحتاجه منكم للبدء</h3><p class="muted" style="font-size:14px">علّم ما اتفقنا عليه أثناء الاجتماع.</p>
      <div class="checklist">${CHECK.map(c => `<label><input type="checkbox" data-ck="${c[0]}" ${done[c[0]] ? 'checked' : ''}><span><b>${c[1]}</b><small>${c[2]}</small></span></label>`).join('')}</div></div>
    <div class="ask"><h3>المطلوب من اجتماع اليوم</h3><ol><li>اختيار مشروع ونموذج وحدة للتجربة.</li><li>تسمية منسق من كل طرف.</li><li>تحديد موعد لتسليم المخطط وزيارة شقة العرض.</li></ol></div>
  </div>`;
  $$('[data-ck]', $('#p-model')).forEach(c => c.addEventListener('change', () => { const d = store.get('ewan_dr_check', {}); d[c.dataset.ck] = c.checked; store.set('ewan_dr_check', d); }));
}

/* ============================== 10) الهيكل العام ============================== */
const TABS = ['visitor', 'sales', 'qr', 'model'];
let tab = 'visitor';
function show(t, focus) {
  tab = t;
  TABS.forEach(k => { const on = k === t; const b = $(`#tab-${k}`); b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; $(`#p-${k}`).hidden = !on; });
  if (t === 'sales') renderSales(); if (t === 'qr') renderQR(); if (t === 'model') renderModel();
  if (focus) $(`#tab-${t}`).focus();
  window.scrollTo({ top: 0 });
}
function bind() {
  $('.tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) show(b.dataset.tab); });
  $('.tabs').addEventListener('keydown', e => {
    const i = TABS.indexOf(tab);
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(TABS[(i + 1) % 4], true); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(TABS[(i + 3) % 4], true); }
  });
  document.addEventListener('keydown', e => {
    if (e.target.closest('input,select,textarea,dialog') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (/^[1-4]$/.test(e.key)) show(TABS[+e.key - 1]);
    else if (tab === 'visitor' && e.key === 'ArrowLeft' && !e.target.closest('.tabs')) next(1);
    else if (tab === 'visitor' && e.key === 'ArrowRight' && !e.target.closest('.tabs')) next(-1);
    else if ((e.key === 'r' || e.key === 'R') && tab === 'visitor') resetDemo(!e.shiftKey);
  });
  const dlg = $('#dlg-project');
  $('#btn-project').addEventListener('click', () => { $('#in-project').value = prefs.project; $('#in-wa').value = prefs.wa; dlg.showModal(); $('#in-project').focus(); });
  $('#form-project').addEventListener('submit', e => {
    if (e.submitter && e.submitter.value === 'ok') {
      prefs.project = $('#in-project').value.slice(0, 40); const wa = $('#in-wa').value.replace(/\D/g, ''); if (wa.length >= 11) prefs.wa = wa; savePrefs();
      paintApp(); if (tab === 'qr') renderQR(); if (tab === 'sales') renderSales(); toast('تم تخصيص العرض');
    }
  });
  window.addEventListener('hashchange', () => { if (location.hash && readHash()) paintApp(); });
}
function init() {
  p_sales = $('#p-sales');
  const fromLink = readHash();
  const hasSrc = ['show', 'office', 'handover'].includes(new URLSearchParams(location.search).get('src'));
  if (fromLink) B.step = 'quote';
  else if (hasSrc) B.step = 'land';
  renderVisitor();
  bind();
}
init();
})();
