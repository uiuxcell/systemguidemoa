/* Design Chatbot Moa — plugin main thread */

/* Dev Mode(보기 전용 사용자도 실행 가능, 읽기 전용): 파일 수정 기능은 막고 위치 이동·챗봇만 사용 */
var IS_DEV = figma.editorType === 'dev';
figma.showUI(__html__, { width: 360, height: 600, themeColors: false });

function hexToRgb(hex) {
  var h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length === 4) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
  };
}

function notifyUI(text) {
  figma.ui.postMessage({ type: 'toast', text: text });
}

function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, ''); }

/* '피그마에서 보기' 위치 이동은 이 가이드 파일에서만 동작
   https://www.figma.com/design/kRa5Cvu91TDxXNldNgwd7p/Design-system_v1.6_SEC_update.ver */
var GUIDE_FILE_KEY = 'kRa5Cvu91TDxXNldNgwd7p';
var GUIDE_FILE_NAME = 'Design-system_v1.6_SEC_update.ver';

/* 지금 열린 파일이 가이드 파일인지: fileKey(manifest enablePrivatePluginApi 필요)로 확인, 없으면 파일 이름으로 확인 */
function isGuideFile() {
  if (figma.fileKey) return figma.fileKey === GUIDE_FILE_KEY;
  return norm(figma.root.name) === norm(GUIDE_FILE_NAME);
}

async function findByName(name) {
  var cur = figma.currentPage.findOne(function (n) { return n.name === name; });
  if (cur) return cur;
  await figma.loadAllPagesAsync();
  for (var i = 0; i < figma.root.children.length; i++) {
    var p = figma.root.children[i];
    if (p === figma.currentPage) continue;
    var hit = p.findOne(function (n) { return n.name === name; });
    if (hit) return hit;
  }
  return null;
}

/* 링크가 없을 때: 섹션 → 카테고리 이름으로 찾음. 우선순위:
   1) 페이지 위쪽 '설명(가이드)' 영역 > 하단 컴포넌트 모음집(컴포넌트·컴포넌트 세트·인스턴스 안)
   2) 이름이 같음 > 이름에 포함
   3) 페이지에서 더 위에 있는 것 > 더 상위 레벨
   프레임 이름이 안 맞으면 설명 영역의 제목 텍스트(같은 글자)로도 찾아 그 텍스트를 감싼 프레임으로 이동 */
var FIND_TYPES = ['FRAME', 'SECTION', 'COMPONENT_SET', 'COMPONENT', 'GROUP'];
var COMP_TYPES = ['COMPONENT_SET', 'COMPONENT', 'INSTANCE'];
function depth(n) { var d = 0; while (n.parent && n.parent.type !== 'PAGE') { n = n.parent; d++; } return d; }
function inComponent(n) {
  for (var p = n; p && p.type !== 'PAGE'; p = p.parent) if (COMP_TYPES.indexOf(p.type) > -1) return true;
  return false;
}
function topY(n) { var b = n.absoluteBoundingBox; return b ? b.y : 0; }
function frameOf(n) {
  var p = n.parent;
  while (p && p.type !== 'PAGE' && FIND_TYPES.indexOf(p.type) < 0) p = p.parent;
  return p && p.type !== 'PAGE' ? p : n;
}
function bestIn(root, key, exactOnly) {
  var hits = rankHits(root, key, exactOnly);
  if (!hits.length) return null;
  return hits[0].text ? frameOf(hits[0].n) : hits[0].n;
}
function rankHits(root, key, exactOnly) {
  if (!key || !('findAll' in root)) return [];
  var hits = [];
  root.findAll(function (n) {
    if (n.id.charAt(0) === 'I') return false; // 인스턴스 내부 레이어(id가 I로 시작)는 제외
    var isText = n.type === 'TEXT';
    if (!isText && FIND_TYPES.indexOf(n.type) < 0) return false;
    var k = norm(isText ? n.characters : n.name); if (!k) return false;
    var exact = k === key;
    if (!exact && (isText || exactOnly || key.length < 3 || k.indexOf(key) < 0)) return false; // 텍스트는 제목처럼 글자가 같을 때만
    hits.push({ n: n, comp: inComponent(n), exact: exact, text: isText, y: topY(n), d: depth(n) });
    return false;
  });
  hits.sort(function (a, b) {
    return (a.comp - b.comp) || (b.exact - a.exact) || (a.y - b.y) || (a.text - b.text) || (a.d - b.d);
  });
  return hits;
}
/* 이름이 달라 자동으로 못 찾는 카테고리: 가이드 파일의 페이지/프레임 node-id로 고정 (키 = norm(카테고리 이름)) */
var TOPIC_SCOPE = {
  ctabutton: '18455:38717',      // 페이지 'Button (CTA)'
  ctabuttonicon: '18455:38717'
};
/* ── 설명 문서 프레임(doc frame) 우선 ──
   가이드 페이지 구조: 맨 위에 설명 문서 프레임들(예: "element / button(cta) / icon / light_bg", doc_header 포함)이 있고
   맨 아래에 컴포넌트 모음집이 있음. 이동은 항상 페이지 바로 아래의 설명 문서 프레임으로 함.
   찾는 순서: ① 문서 프레임 이름에 키워드 단어가 모두 있음 ② 문서 안에 같은 글자의 텍스트(doc_header 제목 등)나
   이름에 키워드가 든 레이어/인스턴스가 있음 ③ 키워드 이름의 컴포넌트를 문서 안에서 인스턴스로 쓰고 있음 */
function words(s) { return String(s || '').toLowerCase().split(/[^a-z0-9가-힣]+/).filter(Boolean); }
function nameHas(name, key) {
  var kw = words(key); if (!kw.length) return false;
  var nw = words(name);
  return kw.every(function (w) { return nw.indexOf(w) > -1; }) || norm(name) === norm(key);
}
function docFrames(scope) {
  var out = [];
  var kids = scope.children || [];
  kids.forEach(function (n) {
    if (COMP_TYPES.indexOf(n.type) > -1 || !n.visible) return;
    if (n.type === 'SECTION') {
      (n.children || []).forEach(function (c) { if (c.type === 'FRAME' && c.visible) out.push(c); });
    } else if (n.type === 'FRAME' || n.type === 'GROUP') out.push(n);
  });
  out.sort(function (a, b) { return (topY(a) - topY(b)) || ((a.absoluteBoundingBox ? a.absoluteBoundingBox.x : 0) - (b.absoluteBoundingBox ? b.absoluteBoundingBox.x : 0)); });
  return out;
}
function docHasInside(doc, key) {
  var nk = norm(key);
  return !!doc.findOne(function (n) {
    if (n.type === 'TEXT') return norm(n.characters) === nk;
    if (n.type === 'INSTANCE' || n.type === 'FRAME') return nameHas(n.name, key);
    return false;
  });
}
async function docUsingComponent(docs, scope, key) {
  var comps = scope.findAll(function (n) { return (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && nameHas(n.name, key); });
  if (!comps.length) return null;
  for (var i = 0; i < docs.length; i++) {
    var insts = docs[i].findAll(function (n) { return n.type === 'INSTANCE' && n.id.charAt(0) !== 'I'; });
    for (var j = 0; j < insts.length; j++) {
      var mc = null; try { mc = await insts[j].getMainComponentAsync(); } catch (e) {}
      if (mc && (comps.indexOf(mc) > -1 || (mc.parent && comps.indexOf(mc.parent) > -1))) return docs[i];
    }
  }
  return null;
}
async function findDoc(scope, key) {
  if (!key || !('findAll' in scope)) return null;
  var docs = docFrames(scope), i;
  for (i = 0; i < docs.length; i++) if (nameHas(docs[i].name, key)) return docs[i];
  for (i = 0; i < docs.length; i++) if (docHasInside(docs[i], key)) return docs[i];
  return await docUsingComponent(docs, scope, key);
}

async function findByTopic(topic, section) {
  var tk = norm(topic), sk = norm(section);
  if (!tk && !sk) return null;
  await figma.loadAllPagesAsync();
  var sec = sk && sk !== tk ? section : '';
  var pinned = null;
  if (TOPIC_SCOPE[tk]) { try { pinned = await figma.getNodeByIdAsync(TOPIC_SCOPE[tk]); } catch (e) {} }
  var scope;
  if (pinned && pinned.type !== 'DOCUMENT') scope = [pinned];
  else {
    var pages = figma.root.children.slice();
    var tp = tk ? pages.filter(function (p) { return norm(p.name).indexOf(tk) > -1; }) : [];
    scope = tp.length ? tp : [figma.currentPage].concat(pages.filter(function (p) { return p !== figma.currentPage; }));
    pinned = tp[0] || null;
  }
  var i, hit;
  if (sec) for (i = 0; i < scope.length; i++) { hit = await findDoc(scope[i], sec); if (hit) return hit; }
  if (topic) for (i = 0; i < scope.length; i++) {
    if (pinned) { hit = await findDoc(scope[i], topic); if (hit) return hit; }
    else { /* 카테고리 페이지가 없으면(예: Spacing) 엉뚱한 곳 방지: 문서 프레임 이름이 맞을 때만 */
      var ds = docFrames(scope[i]);
      for (var d = 0; d < ds.length; d++) if (nameHas(ds[d].name, topic)) return ds[d];
    }
  }
  /* 문서 프레임으로 못 찾으면 예전 방식(하위 프레임·텍스트 이름) → 그래도 없으면 카테고리 페이지의 맨 위 문서 프레임 */
  if (sec) for (i = 0; i < scope.length; i++) { hit = bestIn(scope[i], sk); if (hit) return hit; }
  if (pinned) { var top = docFrames(pinned)[0]; return top || pinned; }
  return null;
}

async function gotoNode(msg) {
  var node = null;
  if (!isGuideFile()) {
    notifyUI('위치 이동은 디자인 시스템 가이드 파일에서만 할 수 있어요');
    return;
  }
  if (msg.nodeId) { try { node = await figma.getNodeByIdAsync(msg.nodeId); } catch (e) {} }
  if (msg.layer && (!node || node.type === 'DOCUMENT')) { var byName = await findByName(msg.layer); if (byName) node = byName; }
  if (!node || node.type === 'DOCUMENT') { var byTopic = await findByTopic(msg.topic, msg.section); if (byTopic) node = byTopic; }
  if (!node || node.type === 'DOCUMENT') {
    notifyUI('이 파일에서 해당 위치를 찾지 못했어요');
    return;
  }
  var page = node;
  while (page && page.type !== 'PAGE') page = page.parent;
  if (page && page !== figma.currentPage) {
    try { await figma.setCurrentPageAsync(page); }
    catch (e) { try { figma.currentPage = page; } catch (e2) { notifyUI('이 모드에서는 페이지를 옮길 수 없어요'); return; } }
  }
  if (node.type !== 'PAGE') {
    try { figma.viewport.scrollAndZoomIntoView([node]); } catch (e) {}
    try { figma.currentPage.selection = [node]; } catch (e) {}
  }
  notifyUI('‘' + node.name + '’ 위치로 이동했어요');
}


figma.ui.onmessage = async function (msg) {
  try {
    await handle(msg);
  } catch (e) {
    notifyUI('적용 중 오류가 발생했어요');
    console.error(e);
  }
};

async function handle(msg) {
  if (msg.type === 'open-url') {
    if (/^https:\/\//.test(msg.url || '')) figma.openExternal(msg.url);
    return;
  }
  if (msg.type === 'close') {
    figma.closePlugin();
    return;
  }

  /* API 키: Figma clientStorage에 저장 (이 기기·이 계정에만 남고, 다음 실행 때 자동 입력) */
  if (msg.type === 'save-key') {
    await figma.clientStorage.setAsync('moa-gemini-key', msg.key || '');
    return;
  }
  if (msg.type === 'load-key') {
    var k = await figma.clientStorage.getAsync('moa-gemini-key');
    if (k) figma.ui.postMessage({ type: 'key', key: k });
    return;
  }

  /* 대화 히스토리: 최근 질문 30개 (UI에서 잘라서 보냄) */
  if (msg.type === 'save-history') {
    await figma.clientStorage.setAsync('moa-history', msg.data || '');
    return;
  }
  if (msg.type === 'load-history') {
    var hst = await figma.clientStorage.getAsync('moa-history');
    figma.ui.postMessage({ type: 'history', data: hst || '' });
    return;
  }

  /* 피그마 위치 이동: 노드 ID → 이미지 레이어명(img_…) 순으로 찾고, 이 파일에 없으면 가이드 파일 링크를 엶 */
  if (msg.type === 'figma-goto') {
    await gotoNode(msg);
    return;
  }

  if (IS_DEV && (msg.type === 'apply-fill' || msg.type === 'apply-fontsize')) {
    notifyUI('Dev Mode(보기 전용)에서는 파일에 적용할 수 없어요');
    return;
  }
  if (msg.type === 'apply-fill') {
    var sel = figma.currentPage.selection;
    if (!sel.length) { notifyUI('요소를 먼저 선택해 주세요'); return; }
    var c = hexToRgb(msg.hex);
    var paint = { type: 'SOLID', color: { r: c.r, g: c.g, b: c.b }, opacity: c.a };
    var n = 0;
    for (var i = 0; i < sel.length; i++) {
      var node = sel[i];
      if (!('fills' in node) || node.locked) continue;
      try { node.fills = [paint]; n++; } catch (e) {}
    }
    notifyUI(n ? msg.name + ' 적용 완료' : '적용할 수 없는 요소예요');
    return;
  }

  if (msg.type === 'apply-fontsize') {
    var sel2 = figma.currentPage.selection;
    var texts = sel2.filter(function (n) { return n.type === 'TEXT'; });
    if (!texts.length) { notifyUI('텍스트를 먼저 선택해 주세요'); return; }
    var done = 0;
    for (var j = 0; j < texts.length; j++) {
      var t = texts[j];
      if (t.locked) continue;
      try {
        var fonts = t.characters.length ? t.getRangeAllFontNames(0, t.characters.length) : [t.fontName];
        await Promise.all(fonts.map(function (f) { return figma.loadFontAsync(f); }));
        t.fontSize = msg.size;
        done++;
      } catch (e) {}
    }
    notifyUI(done ? msg.label + ' 적용 완료' : '적용할 수 없는 텍스트예요');
    return;
  }
}
