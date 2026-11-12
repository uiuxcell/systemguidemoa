/* 빌드: node build.js  (저장소 루트에서 실행)
   src/ui.src.html의 토큰을 치환해 index.html, preview/ui.preview.html을 만듭니다.
   data/ 폴더 내용은 빌드 내장본(오프라인용)으로 들어가고, 실행 중에는 src/gemini.js의
   moaLoadDb()가 최신 data/ 파일을 다시 읽어 덮어씁니다. 파싱 규칙은 moaParseGuide와 같게 유지하세요. */
const fs = require('fs');
const path = require('path');
const R = (p) => fs.readFileSync(path.join(__dirname, p), 'utf8');

const src  = R('src/ui.src.html');
const font = R('assets/pretendard-inline.css');
const gem  = R('src/gemini.js');
const imgs = JSON.parse(R('assets/images.json'));

const LABEL = { DimmedShadow: 'Dimmed & Shadow', CTAButtonIcon: 'CTA Button Icon' };
const label = (key) => {
  const b = key.replace(/^\d+[_\-.]\s*/, '');
  if (LABEL[b]) return LABEL[b];
  return b.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
};
const SKIP_SEC = /^(메타|관련 피그마 좌표)/;
const SKIP_TEXT = /^DB 등록:/m;
const clean = (s) => {
  let t = s.replace(/^#+\s*/, '').replace(/[`*]/g, '').trim();
  t = t.replace(/^\d+(\.\d+)*\.?\s*/, '').trim();
  if (/^\[.*\]$/.test(t)) t = t.slice(1, -1).trim();
  return t;
};
const splitCsv = (line) => {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (c === ',' && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
};

/* data/DB_guide → MOA_DB */
const chunks = [];
for (const name of fs.readdirSync(path.join(__dirname, 'data/DB_guide')).sort()) {
  if (name === 'README.md' || !/\.(md|csv)$/i.test(name)) continue;
  const base = label(name.replace(/\.(md|csv)$/i, ''));
  const raw = R('data/DB_guide/' + name).replace(/^\uFEFF/, '');
  if (/\.csv$/i.test(name)) {
    const rows = raw.trim().split(/\r?\n/).map(splitCsv);
    const head = rows.shift().map(h => h.trim());
    for (const row of rows) {
      if (!row.length || row.every(c => !c.trim())) continue;
      const rec = {};
      head.forEach((h, i) => rec[h] = (row[i] || '').trim());
      chunks.push({ source: name, topic: base, group: base, section: base, text: head.map(h => `${h}: ${rec[h]}`).join(', '), kind: 'csv', row: rec });
    }
    continue;
  }
  let group = '', section = '', buf = [];
  const flush = () => {
    const text = buf.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    buf = [];
    if (!text || !section) return;
    if (SKIP_SEC.test(group) || SKIP_SEC.test(section)) return;
    if (SKIP_TEXT.test(text) || text.length < 12) return;
    chunks.push({ source: name, topic: base, group, section, text, kind: 'md' });
  };
  for (const line of raw.split(/\r?\n/)) {
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const l = clean(h[2]);
      if (!l) continue;
      flush();
      if (h[1].length <= 2) { group = l; section = l; } else section = l;
    } else buf.push(line);
  }
  flush();
}

/* data/prompts → MOA_PROMPTS */
const PROMPT_FILES = ['01_role.md', '02_exception.md', '03_output.md'];
const promptBody = (md) => {
  let L = md.replace(/\r/g, '').split('\n');
  const i = L.findIndex(l => /^\*\*\[/.test(l.trim()));
  if (i > 0) L = L.slice(i);
  return L.filter(l => !/^!\[/.test(l.trim())).join('\n').replace(/\n{3,}/g, '\n\n').trim();
};
const prompts = PROMPT_FILES.map(f => ({ file: f, text: promptBody(R('data/prompts/' + f)) }));

/* data/db_glossary → MOA_GLOSSARY_DB  (카테고리 = 가장 가까운 ##/### 제목, 괄호 안 영문 우선) */
const glossary = [];
const item = /^\s*-\s*`([^`]+)`\s*:\s*(.+)$/;
let cat = '';
for (const l of R('data/db_glossary/glossary.md').replace(/\r/g, '').split('\n')) {
  const h = /^(#{2,3})\s+(.*)$/.exec(l);
  if (h) {
    if (/^#/.test(h[2])) continue;
    let t = clean(h[2]);
    const p = /\(([^)]*[A-Za-z][^)]*)\)\s*$/.exec(t);
    t = p && !/[가-힣]/.test(p[1]) ? p[1].trim() : t.replace(/\s*\([^)]*\)\s*$/, '').trim();
    if (t) cat = t;
    continue;
  }
  const m = item.exec(l);
  if (m) glossary.push({ term: m[1].trim(), category: cat, aliases: m[2].split(',').map(s => s.trim()).filter(Boolean), source: 'glossary.md' });
}
for (const l of R('data/db_glossary/ko_en.md').replace(/\r/g, '').split('\n')) {
  const m = item.exec(l);
  if (m && !/영어 용어/.test(m[1])) glossary.push({ term: m[1].trim(), category: '한글 표기', aliases: m[2].split(',').map(s => s.trim()).filter(Boolean), source: 'ko_en.md' });
}

const tokens = R('data/DB_tokens/tokens.json');
const easteregg = fs.existsSync(path.join(__dirname, 'data/easteregg.md')) ? R('data/easteregg.md') : '';

const map = {
  __IMG_HOME__: 'home', __IMG_KEY__: 'key', __IMG_KEYBG__: 'keybg', __IMG_SAD__: 'sad',
  __IMG_MASCOT__: 'mascot', __IMG_PROFILE__: 'profile', __IMG_SMALL__: 'small', __IMG_INTROBG__: 'introbg', __IMG_MOAHI__: 'moahi'
};
const esc = (s) => s.replace(/<\//g, '<\\/');
const build = (get) => {
  let h = src
    .split('__FONT_CSS__').join(font)
    .split('__DB_JSON__').join(esc(JSON.stringify(chunks)))
    .split('__GEMINI_JS__').join(gem)
    .split('__TOKENS_JSON__').join(esc(tokens))
    .split('__PROMPTS_JSON__').join(esc(JSON.stringify(prompts)))
    .split('__GLOSSARY_JSON__').join(esc(JSON.stringify(glossary)))
    .split('__EASTEREGG_JSON__').join(esc(JSON.stringify(easteregg)));
  for (const [tok, name] of Object.entries(map)) h = h.split(tok).join(get(name));
  if (/__(IMG|DB|GEMINI|FONT|PROMPTS|TOKENS|GLOSSARY|EASTEREGG)_/.test(h)) throw new Error('unresolved token');
  return h;
};

fs.writeFileSync(path.join(__dirname, 'index.html'), build(n => imgs[n]));
fs.mkdirSync(path.join(__dirname, 'preview'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'preview/ui.preview.html'),
  build(n => n === 'moahi' ? '../assets/moa_hi_sequence.webp' : `../assets/img-${n}.${/^data:image\/jpe?g/.test(imgs[n]) ? 'jpg' : 'png'}`));

const by = {};
chunks.forEach(c => by[c.source] = (by[c.source] || 0) + 1);
console.log(`chunks: ${chunks.length} · glossary: ${glossary.length} · prompts: ${prompts.length}`);
Object.entries(by).forEach(([f, n]) => console.log(`  ${f}  ${n}`));
