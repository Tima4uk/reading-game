// Переиспользуемый модуль «Прописи» (Canvas Letter Tracer)
// Позволяет обводить букву пальцем или мышкой по пунктирному контуру с проверкой заполнения

import { sound } from './audio.js?v=31';

export const TRACER_COLORS = [
  { hex: '#f43f5e', names: { ru: 'Розовый мелок', pl: 'Różowa kredka', en: 'Pink crayon' } },
  { hex: '#2563eb', names: { ru: 'Синий мелок', pl: 'Niebieska kredka', en: 'Blue crayon' } },
  { hex: '#10b981', names: { ru: 'Зелёный мелок', pl: 'Zielona kredka', en: 'Green crayon' } },
  { hex: '#8b5cf6', names: { ru: 'Фиолетовый мелок', pl: 'Fioletowa kredka', en: 'Purple crayon' } },
  { hex: '#f59e0b', names: { ru: 'Оранжевый мелок', pl: 'Pomarańczowa kredka', en: 'Orange crayon' } }
];

const MASK_SIZE = 120;
const CHECKPOINT_SPACING = 9;
const SETTLE_COMPLETE_MS = 450;
const TRACER_PREFS_KEY = 'reading_game_tracer_prefs';

export function loadTracerPrefs() {
  const fallback = { letterCase: 'upper', letterStyle: 'print' };
  try {
    if (typeof localStorage === 'undefined') return fallback;
    const raw = localStorage.getItem(TRACER_PREFS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      letterCase: parsed && parsed.letterCase === 'lower' ? 'lower' : 'upper',
      letterStyle: parsed && parsed.letterStyle === 'cursive' ? 'cursive' : 'print'
    };
  } catch (_) {
    return fallback;
  }
}

export function saveTracerPrefs({ letterCase, letterStyle } = {}) {
  const safe = {
    letterCase: letterCase === 'lower' ? 'lower' : 'upper',
    letterStyle: letterStyle === 'cursive' ? 'cursive' : 'print'
  };
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TRACER_PREFS_KEY, JSON.stringify(safe));
    }
  } catch (_) {}
  return safe;
}

export function getLetterRenderSpec(letterCase = 'upper', letterStyle = 'print', lang = 'ru') {
  const isLower = letterCase === 'lower';
  const isCursive = letterStyle === 'cursive';

  if (!isCursive) {
    if (!isLower) {
      return {
        fontWeight: '900',
        fontFamily: '"Nunito", "Comfortaa", Arial, sans-serif',
        baseFontSize: 82,
        baselineY: 92,
        maskExtraStroke: 0,
        visibleBrush: 12,
        paintMaskWidth: 13,
        checkpointSpacing: 9
      };
    }
    return {
      fontWeight: '900',
      fontFamily: '"Nunito", "Comfortaa", Arial, sans-serif',
      baseFontSize: 86,
      baselineY: 88,
      maskExtraStroke: 0,
      visibleBrush: 11,
      paintMaskWidth: 12,
      checkpointSpacing: 8
    };
  }

  const isPl = lang === 'pl';
  if (!isLower) {
    return {
      fontWeight: '400',
      fontFamily: isPl ? '"Playwrite PL", "Marck Script", cursive' : '"Marck Script", cursive',
      baseFontSize: isPl ? 66 : 88,
      baselineY: isPl ? 84 : 88,
      maskExtraStroke: 3.5,
      visibleBrush: 9.5,
      paintMaskWidth: 10.5,
      checkpointSpacing: 8
    };
  }

  return {
    fontWeight: '400',
    fontFamily: isPl ? '"Playwrite PL", "Marck Script", cursive' : '"Marck Script", cursive',
    baseFontSize: isPl ? 70 : 92,
    baselineY: isPl ? 82 : 84,
    maskExtraStroke: 3.5,
    visibleBrush: 9.5,
    paintMaskWidth: 10.5,
    checkpointSpacing: 8
  };
}

export function extractStrokeCheckpoints(rgbaData, size = MASK_SIZE, spacing = CHECKPOINT_SPACING) {
  const total = size * size;
  const dist = new Uint16Array(total);
  const INF = 65535;

  for (let y = 0; y < size; y++) {
    const rowOffset = y * size;
    const isEdgeY = y === 0 || y === size - 1;
    for (let x = 0; x < size; x++) {
      const idx = rowOffset + x;
      if (rgbaData[idx * 4 + 3] > 120) {
        dist[idx] = (isEdgeY || x === 0 || x === size - 1) ? 3 : INF;
      }
    }
  }

  for (let y = 1; y < size - 1; y++) {
    const rowOffset = y * size;
    for (let x = 1; x < size - 1; x++) {
      const idx = rowOffset + x;
      if (dist[idx] === 0) continue;
      let m = dist[idx];
      const dUp = dist[idx - size] + 3;
      const dLeft = dist[idx - 1] + 3;
      const dUpLeft = dist[idx - size - 1] + 4;
      const dUpRight = dist[idx - size + 1] + 4;
      if (dUp < m) m = dUp;
      if (dLeft < m) m = dLeft;
      if (dUpLeft < m) m = dUpLeft;
      if (dUpRight < m) m = dUpRight;
      dist[idx] = m;
    }
  }

  for (let y = size - 2; y >= 1; y--) {
    const rowOffset = y * size;
    for (let x = size - 2; x >= 1; x--) {
      const idx = rowOffset + x;
      if (dist[idx] === 0) continue;
      let m = dist[idx];
      const dDown = dist[idx + size] + 3;
      const dRight = dist[idx + 1] + 3;
      const dDownRight = dist[idx + size + 1] + 4;
      const dDownLeft = dist[idx + size - 1] + 4;
      if (dDown < m) m = dDown;
      if (dRight < m) m = dRight;
      if (dDownRight < m) m = dDownRight;
      if (dDownLeft < m) m = dDownLeft;
      dist[idx] = m;
    }
  }

  const minDistSq = spacing * spacing;
  const selectFromThreshold = (minDist) => {
    const candidates = [];
    for (let y = 0; y < size; y++) {
      const rowOffset = y * size;
      const isEdgeY = y === 0 || y === size - 1;
      for (let x = 0; x < size; x++) {
        const idx = rowOffset + x;
        const d = dist[idx];
        if (d < minDist) continue;
        const nbrSum = (isEdgeY || x === 0 || x === size - 1)
          ? 0
          : dist[idx - 1] + dist[idx + 1] + dist[idx - size] + dist[idx + size];
        candidates.push({ x, y, d, nbrSum });
      }
    }

    candidates.sort((a, b) => (b.d - a.d) || (b.nbrSum - a.nbrSum));

    const picked = [];
    for (let i = 0; i < candidates.length; i++) {
      const c = candidates[i];
      let farEnough = true;
      for (let j = 0; j < picked.length; j++) {
        const dx = c.x - picked[j].x;
        const dy = c.y - picked[j].y;
        if (dx * dx + dy * dy < minDistSq) {
          farEnough = false;
          break;
        }
      }
      if (farEnough) {
        picked.push({ x: c.x, y: c.y });
      }
    }
    return picked;
  };

  let checkpoints = selectFromThreshold(9);
  if (checkpoints.length === 0) checkpoints = selectFromThreshold(6);
  if (checkpoints.length === 0) checkpoints = selectFromThreshold(3);
  return checkpoints;
}

export function computeOffTrackLimits(targetCount) {
  const safeCount = Math.max(0, Number(targetCount) || 0);
  return {
    offLimit: Math.max(Math.round(safeCount * 0.25), 140),
    outsideGlyphLimit: Math.max(Math.round(safeCount * 0.65), 320)
  };
}

export function loadTracedLetters(lang = 'ru') {
  try {
    if (typeof localStorage === 'undefined') return new Set();
    const raw = localStorage.getItem(`reading_game_traced_${lang}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.map(ch => String(ch).toUpperCase()) : []);
  } catch (_) {
    return new Set();
  }
}

export function markLetterTraced(letter, lang = 'ru') {
  const set = loadTracedLetters(lang);
  if (!letter) return set;
  const upper = String(letter).toUpperCase();
  set.add(upper);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`reading_game_traced_${lang}`, JSON.stringify([...set]));
    }
  } catch (_) {}
  return set;
}

export function loadTracedVariants(lang = 'ru') {
  try {
    if (typeof localStorage === 'undefined') return new Set();
    const raw = localStorage.getItem(`reading_game_traced_variants_${lang}`);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.map(v => String(v)) : []);
  } catch (_) {
    return new Set();
  }
}

export function markVariantTraced(letter, letterCase = 'upper', letterStyle = 'print', lang = 'ru') {
  const set = loadTracedVariants(lang);
  if (!letter) return set;
  const upper = String(letter).toUpperCase();
  const safeCase = letterCase === 'lower' ? 'lower' : 'upper';
  const safeStyle = letterStyle === 'cursive' ? 'cursive' : 'print';
  set.add(`${upper}_${safeCase}_${safeStyle}`);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`reading_game_traced_variants_${lang}`, JSON.stringify([...set]));
    }
  } catch (_) {}
  return set;
}

const UI_COPY = {
  ru: {
    hintStart: 'Веди пальцем или мышкой по букве!',
    hintOffTrack: 'Ой, вышло за контур! Нажми ↺ и обведи аккуратно по линии ✨',
    hintAlmost: 'Ещё чуть-чуть — докрась контур до конца!',
    doneText: '⭐ Отлично! Буква красиво обведена!',
    clearLabel: 'Очистить',
    guideLabel: 'Подсказка',
    guideTitle: 'Показать контур и послушать звук',
    progressLabel: 'Обведено',
    caseGroupLabel: 'Размер буквы',
    upperLabel: 'Большая',
    lowerLabel: 'маленькая',
    styleGroupLabel: 'Шрифт буквы',
    printLabel: 'Печатная',
    cursiveLabel: 'Прописная'
  },
  pl: {
    hintStart: 'Prowadź palcem lub myszką po literze!',
    hintOffTrack: 'Ups, wyszło poza linię! Kliknij ↺ i obrysuj po śladzie ✨',
    hintAlmost: 'Jeszcze troszkę — dokończ cały ślad!',
    doneText: '⭐ Brawo! Litera pięknie napisana!',
    clearLabel: 'Wyczyść',
    guideLabel: 'Podpowiedź',
    guideTitle: 'Pokaż ślad i posłuchaj głoski',
    progressLabel: 'Ślad',
    caseGroupLabel: 'Wielkość litery',
    upperLabel: 'Wielka',
    lowerLabel: 'mała',
    styleGroupLabel: 'Styl pisma',
    printLabel: 'Drukowana',
    cursiveLabel: 'Pisana'
  },
  en: {
    hintStart: 'Trace along the dotted letter with your finger or mouse!',
    hintOffTrack: 'Oops, outside the lines! Tap ↺ and trace neatly along the letter ✨',
    hintAlmost: 'Almost there — fill in the rest of the letter!',
    doneText: '⭐ Awesome! Letter traced cleanly!',
    clearLabel: 'Clear',
    guideLabel: 'Guide',
    guideTitle: 'Highlight guide and hear sound',
    progressLabel: 'Traced',
    caseGroupLabel: 'Letter case',
    upperLabel: 'Big',
    lowerLabel: 'small',
    styleGroupLabel: 'Letter style',
    printLabel: 'Print',
    cursiveLabel: 'Cursive'
  }
};

export class LetterTracer {
  constructor(options = {}) {
    this.container = options.container;
    this.letter = String(options.letter || 'А').toUpperCase();
    this.lang = options.lang || 'ru';
    this.compact = Boolean(options.compact);
    this.soundType = options.soundType || 'consonant';
    this.onComplete = options.onComplete || (() => {});
    this.onProgress = options.onProgress || (() => {});
    this.onModeChange = options.onModeChange || (() => {});

    const prefs = loadTracerPrefs();
    this.letterCase = (options.letterCase === 'lower' || options.letterCase === 'upper') ? options.letterCase : prefs.letterCase;
    this.letterStyle = (options.letterStyle === 'cursive' || options.letterStyle === 'print') ? options.letterStyle : prefs.letterStyle;

    this.displaySize = this.compact ? 220 : 280;
    this.activeColor = this.soundType === 'vowel' ? TRACER_COLORS[0].hex : TRACER_COLORS[1].hex;

    this.completed = false;
    this.hasDrawn = false;
    this.destroyed = false;
    this.isDrawing = false;
    this.activePointerId = null;
    this.lastPt = null;
    this.moveCount = 0;

    this.guideCanvas = null;
    this.toleranceCanvas = null;
    this.paintCanvas = null;
    this.targetIndices = [];
    this.targetCount = 0;
    this.checkpoints = [];
    this.glyphLayout = null;
    this.glyphMask = new Uint8Array(MASK_SIZE * MASK_SIZE);
    this.toleranceMask = new Uint8Array(MASK_SIZE * MASK_SIZE);

    this.canvasEl = null;
    this.ctx = null;
    this.paintCtx = null;
    this.demoTimer = null;
    this.speakTimer = null;
    this.settleTimer = null;
    this.guideHighlightActive = false;

    if (this.container) {
      this.render();
      this.setupCanvases();
      this.attachEvents();
      this.watchFonts();
    }
  }

  getCopy() {
    return UI_COPY[this.lang] || UI_COPY.ru;
  }

  getDisplayGlyph() {
    return this.letterCase === 'lower' ? this.letter.toLowerCase() : this.letter.toUpperCase();
  }

  getRenderSpec() {
    return getLetterRenderSpec(this.letterCase, this.letterStyle, this.lang);
  }

  getCanvasFont(fontSize, spec = this.getRenderSpec()) {
    return `${spec.fontWeight} ${fontSize}px ${spec.fontFamily}`;
  }

  isCurrentVariantTraced() {
    const variantKey = `${this.letter}_${this.letterCase}_${this.letterStyle}`;
    if (loadTracedVariants(this.lang).has(variantKey)) return true;
    return this.letterCase === 'upper'
      && this.letterStyle === 'print'
      && loadTracedLetters(this.lang).has(this.letter);
  }

  setMode({ letterCase, letterStyle } = {}) {
    const nextCase = (letterCase === 'lower' || letterCase === 'upper') ? letterCase : this.letterCase;
    const nextStyle = (letterStyle === 'cursive' || letterStyle === 'print') ? letterStyle : this.letterStyle;
    if (nextCase === this.letterCase && nextStyle === this.letterStyle) return;

    this.letterCase = nextCase;
    this.letterStyle = nextStyle;
    saveTracerPrefs({ letterCase: this.letterCase, letterStyle: this.letterStyle });

    this.clearSettleTimer();
    this.clearMissedHints();
    if (this.demoTimer) {
      clearTimeout(this.demoTimer);
      this.demoTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    this.completed = false;
    this.hasDrawn = false;
    this.isDrawing = false;
    this.activePointerId = null;
    this.lastPt = null;
    this.moveCount = 0;
    this.guideHighlightActive = false;
    this.glyphLayout = null;

    if (this.container) {
      this.render();
      this.setupCanvases();
      this.attachEvents();
      this.watchFonts();
    }
    this.onProgress(0);
    this.onModeChange({
      letterCase: this.letterCase,
      letterStyle: this.letterStyle,
      glyph: this.getDisplayGlyph()
    });
  }

  clearSettleTimer() {
    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
      this.settleTimer = null;
    }
  }

  clearMissedHints() {
    const layer = this.container && this.container.querySelector('#lt-hint-layer');
    if (layer) layer.innerHTML = '';
  }

  renderMissedHints(unhit) {
    const layer = this.container && this.container.querySelector('#lt-hint-layer');
    if (!layer) return;
    if (!unhit || unhit.length === 0) {
      layer.innerHTML = '';
      return;
    }

    const maxDots = 6;
    const picked = [];
    if (unhit.length <= maxDots) {
      picked.push(...unhit);
    } else {
      for (let i = 0; i < maxDots; i++) {
        const idx = Math.min(unhit.length - 1, Math.floor((i * unhit.length) / maxDots));
        picked.push(unhit[idx]);
      }
    }

    layer.innerHTML = picked.map(cp => {
      const left = ((cp.x / MASK_SIZE) * 100).toFixed(2);
      const top = ((cp.y / MASK_SIZE) * 100).toFixed(2);
      return `<span class="lt-miss-dot" style="left: ${left}%; top: ${top}%"></span>`;
    }).join('');
  }

  watchFonts() {
    if (typeof document === 'undefined' || !document.fonts) return;
    const spec = this.getRenderSpec();
    const fontSpec = this.getCanvasFont(spec.baseFontSize, spec);
    const glyph = this.getDisplayGlyph();
    const loadPromise = typeof document.fonts.load === 'function'
      ? document.fonts.load(fontSpec, glyph).catch(() => {})
      : Promise.resolve();
    const readyPromise = document.fonts.ready ? document.fonts.ready.catch(() => {}) : Promise.resolve();

    Promise.all([loadPromise, readyPromise]).then(() => {
      if (this.destroyed || this.hasDrawn || this.completed || !this.canvasEl) return;
      this.buildMasks();
      this.drawBaseGuide();
    }).catch(() => {});
  }

  render() {
    const copy = this.getCopy();
    const isPreviouslyTraced = this.isCurrentVariantTraced();
    const upperChar = this.letter.toUpperCase();
    const lowerChar = this.letter.toLowerCase();
    const pairChar = `${upperChar}${lowerChar}`;
    const glyph = this.getDisplayGlyph();
    const isCursive = this.letterStyle === 'cursive';
    const cursiveCls = isCursive ? `is-cursive lang-${this.lang}` : '';

    this.container.innerHTML = `
      <div class="lt-wrap ${this.compact ? 'lt-compact' : ''}">
        <div class="lt-mode-bar">
          <div class="lt-seg-group" role="group" aria-label="${copy.caseGroupLabel}">
            <button type="button"
                    class="lt-seg-btn ${this.letterCase === 'upper' ? 'active' : ''}"
                    data-case="upper"
                    aria-pressed="${this.letterCase === 'upper' ? 'true' : 'false'}">
              <span class="lt-seg-glyph ${cursiveCls}">${upperChar}</span>
              <span class="lt-seg-text">${copy.upperLabel}</span>
            </button>
            <button type="button"
                    class="lt-seg-btn ${this.letterCase === 'lower' ? 'active' : ''}"
                    data-case="lower"
                    aria-pressed="${this.letterCase === 'lower' ? 'true' : 'false'}">
              <span class="lt-seg-glyph ${cursiveCls}">${lowerChar}</span>
              <span class="lt-seg-text">${copy.lowerLabel}</span>
            </button>
          </div>

          <div class="lt-seg-group" role="group" aria-label="${copy.styleGroupLabel}">
            <button type="button"
                    class="lt-seg-btn ${!isCursive ? 'active' : ''}"
                    data-style="print"
                    aria-pressed="${!isCursive ? 'true' : 'false'}">
              <span class="lt-seg-glyph">${pairChar}</span>
              <span class="lt-seg-text">${copy.printLabel}</span>
            </button>
            <button type="button"
                    class="lt-seg-btn ${isCursive ? 'active' : ''}"
                    data-style="cursive"
                    aria-pressed="${isCursive ? 'true' : 'false'}">
              <span class="lt-seg-glyph is-cursive lang-${this.lang}">${pairChar}</span>
              <span class="lt-seg-text">${copy.cursiveLabel}</span>
            </button>
          </div>
        </div>

        <div class="lt-toolbar">
          <div class="lt-colors" role="group" aria-label="Crayon color">
            ${TRACER_COLORS.map((c, idx) => `
              <button type="button"
                      class="lt-color-btn ${this.activeColor === c.hex ? 'active' : ''}"
                      data-color="${c.hex}"
                      style="--lt-swatch: ${c.hex}"
                      aria-label="${c.names[this.lang] || c.names.ru}"
                      aria-pressed="${this.activeColor === c.hex ? 'true' : 'false'}"
                      data-idx="${idx}"></button>
            `).join('')}
          </div>

          <div class="lt-actions">
            <span class="lt-progress-pill" id="lt-progress-pill">
              ${copy.progressLabel}: <strong id="lt-pct-val">0%</strong>
            </span>
            ${isPreviouslyTraced ? '<span class="lt-saved-pill" title="✓">✓</span>' : ''}
            <button type="button" class="lt-tool-btn lt-guide-btn" id="lt-btn-guide" title="${copy.guideTitle}" aria-label="${copy.guideTitle}">
              ✨
            </button>
            <button type="button" class="lt-tool-btn lt-clear-btn" id="lt-btn-clear" title="${copy.clearLabel}" aria-label="${copy.clearLabel}">
              ↺
            </button>
          </div>
        </div>

        <div class="lt-progress-track">
          <div class="lt-progress-fill" id="lt-progress-fill" style="width: 0%"></div>
        </div>

        <div class="lt-canvas-box" id="lt-canvas-box" style="--lt-size: ${this.displaySize}px">
          <canvas class="lt-canvas" id="lt-canvas" aria-label="${glyph}"></canvas>
          <div class="lt-hint-layer" id="lt-hint-layer" aria-hidden="true"></div>
        </div>

        <div class="lt-feedback" id="lt-feedback" aria-live="polite">${copy.hintStart}</div>
      </div>
    `;

    this.canvasEl = this.container.querySelector('#lt-canvas');
  }

  setupCanvases() {
    if (!this.canvasEl || typeof document === 'undefined') return;
    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1;

    this.canvasEl.width = Math.round(this.displaySize * dpr);
    this.canvasEl.height = Math.round(this.displaySize * dpr);
    this.ctx = this.canvasEl.getContext('2d');
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!this.guideCanvas) {
      this.guideCanvas = document.createElement('canvas');
      this.guideCanvas.width = MASK_SIZE;
      this.guideCanvas.height = MASK_SIZE;
    }
    if (!this.toleranceCanvas) {
      this.toleranceCanvas = document.createElement('canvas');
      this.toleranceCanvas.width = MASK_SIZE;
      this.toleranceCanvas.height = MASK_SIZE;
    }
    if (!this.paintCanvas) {
      this.paintCanvas = document.createElement('canvas');
      this.paintCanvas.width = MASK_SIZE;
      this.paintCanvas.height = MASK_SIZE;
      this.paintCtx = this.paintCanvas.getContext('2d', { willReadFrequently: true });
    }

    this.buildMasks();
    this.clearPaintMask();
    this.drawBaseGuide();
  }

  computeFittedGlyphLayout(ctx, glyph, spec) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    let fontSize = spec.baseFontSize;
    ctx.font = this.getCanvasFont(fontSize, spec);
    let m = ctx.measureText(glyph);

    const getBounds = (metrics, fs) => {
      const left = metrics.actualBoundingBoxLeft !== undefined
        ? metrics.actualBoundingBoxLeft
        : (metrics.width || fs * 0.5) / 2;
      const right = metrics.actualBoundingBoxRight !== undefined
        ? metrics.actualBoundingBoxRight
        : (metrics.width || fs * 0.5) / 2;
      const ascent = metrics.actualBoundingBoxAscent !== undefined
        ? metrics.actualBoundingBoxAscent
        : fs * 0.72;
      const descent = metrics.actualBoundingBoxDescent !== undefined
        ? metrics.actualBoundingBoxDescent
        : fs * 0.22;
      return { left, right, width: left + right, ascent, descent, height: ascent + descent };
    };

    let bounds = getBounds(m, fontSize);
    const extra = spec.maskExtraStroke;
    const maxBox = MASK_SIZE - 16 - extra;

    if (bounds.width > maxBox || bounds.height > maxBox) {
      const scaleFactor = Math.min(
        maxBox / Math.max(bounds.width, 1),
        maxBox / Math.max(bounds.height, 1)
      );
      fontSize = Math.max(36, Math.floor(fontSize * scaleFactor));
      ctx.font = this.getCanvasFont(fontSize, spec);
      m = ctx.measureText(glyph);
      bounds = getBounds(m, fontSize);
    }

    let cx = 60;
    if (m.actualBoundingBoxLeft !== undefined && m.actualBoundingBoxRight !== undefined) {
      cx = Math.max(46, Math.min(74, 60 + (m.actualBoundingBoxLeft - m.actualBoundingBoxRight) / 2));
    }

    let baselineY = spec.baselineY;
    const minY = 8 + extra / 2;
    const maxY = MASK_SIZE - 8 - extra / 2;
    if (baselineY - bounds.ascent < minY) {
      baselineY = minY + bounds.ascent;
    }
    if (baselineY + bounds.descent > maxY) {
      baselineY = Math.max(minY + bounds.ascent, maxY - bounds.descent);
    }

    ctx.restore();
    return { fontSize, cx, baselineY };
  }

  buildMasks() {
    if (!this.guideCanvas || !this.toleranceCanvas) return;

    const glyph = this.getDisplayGlyph();
    const spec = this.getRenderSpec();

    const gCtx = this.guideCanvas.getContext('2d', { willReadFrequently: true });
    gCtx.clearRect(0, 0, MASK_SIZE, MASK_SIZE);
    const layout = this.computeFittedGlyphLayout(gCtx, glyph, spec);
    this.glyphLayout = layout;

    gCtx.save();
    gCtx.fillStyle = '#000000';
    gCtx.strokeStyle = '#000000';
    gCtx.font = this.getCanvasFont(layout.fontSize, spec);
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'alphabetic';
    if (spec.maskExtraStroke > 0) {
      gCtx.lineJoin = 'round';
      gCtx.lineCap = 'round';
      gCtx.lineWidth = spec.maskExtraStroke;
      gCtx.strokeText(glyph, layout.cx, layout.baselineY);
    }
    gCtx.fillText(glyph, layout.cx, layout.baselineY);
    gCtx.restore();

    const gData = gCtx.getImageData(0, 0, MASK_SIZE, MASK_SIZE).data;
    const indices = [];
    this.glyphMask.fill(0);
    for (let i = 0; i < MASK_SIZE * MASK_SIZE; i++) {
      if (gData[i * 4 + 3] > 120) {
        indices.push(i);
        this.glyphMask[i] = 1;
      }
    }
    this.targetIndices = indices;
    this.targetCount = indices.length;
    this.checkpoints = extractStrokeCheckpoints(gData, MASK_SIZE, spec.checkpointSpacing);

    const tCtx = this.toleranceCanvas.getContext('2d', { willReadFrequently: true });
    tCtx.clearRect(0, 0, MASK_SIZE, MASK_SIZE);
    tCtx.save();
    tCtx.font = this.getCanvasFont(layout.fontSize, spec);
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'alphabetic';
    tCtx.lineJoin = 'round';
    tCtx.lineCap = 'round';
    tCtx.lineWidth = 6 + spec.maskExtraStroke;
    tCtx.strokeStyle = '#000000';
    tCtx.fillStyle = '#000000';
    tCtx.strokeText(glyph, layout.cx, layout.baselineY);
    tCtx.fillText(glyph, layout.cx, layout.baselineY);
    tCtx.restore();

    const tData = tCtx.getImageData(0, 0, MASK_SIZE, MASK_SIZE).data;
    this.toleranceMask.fill(0);
    for (let i = 0; i < MASK_SIZE * MASK_SIZE; i++) {
      if (tData[i * 4 + 3] > 80) {
        this.toleranceMask[i] = 1;
      }
    }
  }

  clearPaintMask() {
    if (this.paintCtx) {
      this.paintCtx.clearRect(0, 0, MASK_SIZE, MASK_SIZE);
    }
  }

  drawGuidelines(ctx) {
    const s = this.displaySize;
    const scale = s / MASK_SIZE;
    const spec = this.getRenderSpec();
    const baseY = Math.round(spec.baselineY * scale);
    const topY = Math.round(Math.max(14, (spec.baselineY - 56) * scale));
    const midY = Math.round((spec.baselineY - 36) * scale);
    const descY = Math.round(Math.min(s - 10, (spec.baselineY + 18) * scale));

    ctx.save();
    if (this.letterStyle === 'cursive' && this.lang !== 'pl') {
      // Косые линии прописи (~65°) для русского и английского курсива
      ctx.save();
      ctx.beginPath();
      ctx.rect(14, 8, s - 28, s - 16);
      ctx.clip();
      const step = Math.round(36 * scale);
      const slantShift = Math.round(s * 0.44);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.32)';
      ctx.beginPath();
      for (let x = -slantShift; x <= s + slantShift; x += step) {
        ctx.moveTo(x + slantShift * 0.5, 8);
        ctx.lineTo(x - slantShift * 0.5, s - 8);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Мягкие горизонтальные строки прописи
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#dbeafe';
    ctx.beginPath();
    ctx.moveTo(14, topY);
    ctx.lineTo(s - 14, topY);
    ctx.stroke();

    ctx.strokeStyle = '#bfdbfe';
    ctx.beginPath();
    ctx.moveTo(14, baseY);
    ctx.lineTo(s - 14, baseY);
    ctx.stroke();

    ctx.setLineDash([5, 6]);
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(14, midY);
    ctx.lineTo(s - 14, midY);
    ctx.stroke();

    if (this.letterStyle === 'cursive') {
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(14, descY);
      ctx.lineTo(s - 14, descY);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBaseGuide() {
    if (!this.ctx) return;
    const s = this.displaySize;
    const scale = s / MASK_SIZE;
    const spec = this.getRenderSpec();
    const layout = this.glyphLayout || {
      fontSize: spec.baseFontSize,
      cx: 60,
      baselineY: spec.baselineY
    };
    const glyph = this.getDisplayGlyph();
    const cx = layout.cx * scale;
    const cy = layout.baselineY * scale;
    const fontPx = Math.round(layout.fontSize * scale);

    this.ctx.clearRect(0, 0, s, s);
    this.drawGuidelines(this.ctx);

    this.ctx.save();
    this.ctx.font = this.getCanvasFont(fontPx, spec);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'alphabetic';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    // Мягкая заливка-призрак
    const ghostFill = this.guideHighlightActive ? '#fef08a' : '#e2e8f0';
    if (spec.maskExtraStroke > 0) {
      this.ctx.lineWidth = spec.maskExtraStroke * scale;
      this.ctx.strokeStyle = ghostFill;
      this.ctx.strokeText(glyph, cx, cy);
    }
    this.ctx.fillStyle = ghostFill;
    this.ctx.fillText(glyph, cx, cy);

    // Пунктирный контур
    this.ctx.lineWidth = this.guideHighlightActive ? 3 : 2.2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.strokeStyle = this.guideHighlightActive ? '#f59e0b' : '#94a3b8';
    this.ctx.strokeText(glyph, cx, cy);
    this.ctx.restore();
  }

  drawCelebrationFill() {
    if (!this.ctx) return;
    const s = this.displaySize;
    const scale = s / MASK_SIZE;
    const spec = this.getRenderSpec();
    const layout = this.glyphLayout || {
      fontSize: spec.baseFontSize,
      cx: 60,
      baselineY: spec.baselineY
    };
    const glyph = this.getDisplayGlyph();
    const cx = layout.cx * scale;
    const cy = layout.baselineY * scale;
    const fontPx = Math.round(layout.fontSize * scale);

    this.ctx.save();
    this.ctx.font = this.getCanvasFont(fontPx, spec);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'alphabetic';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.shadowColor = 'rgba(16, 185, 129, 0.35)';
    this.ctx.shadowBlur = 12;

    if (spec.maskExtraStroke > 0) {
      const ribbonW = Math.max(3, spec.maskExtraStroke * scale);
      this.ctx.lineWidth = ribbonW + 2.5;
      this.ctx.strokeStyle = '#059669';
      this.ctx.strokeText(glyph, cx, cy);
      this.ctx.shadowBlur = 0;
      this.ctx.lineWidth = ribbonW;
      this.ctx.strokeStyle = '#10b981';
      this.ctx.strokeText(glyph, cx, cy);
      this.ctx.fillStyle = '#10b981';
      this.ctx.fillText(glyph, cx, cy);
    } else {
      this.ctx.fillStyle = '#10b981';
      this.ctx.fillText(glyph, cx, cy);
      this.ctx.shadowBlur = 0;
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#059669';
      this.ctx.strokeText(glyph, cx, cy);
    }
    this.ctx.restore();
  }

  getNormalizedPoint(e) {
    const rect = this.canvasEl.getBoundingClientRect();
    const w = rect.width || this.displaySize;
    const h = rect.height || this.displaySize;
    const x = Math.max(0, Math.min(this.displaySize, ((e.clientX - rect.left) / w) * this.displaySize));
    const y = Math.max(0, Math.min(this.displaySize, ((e.clientY - rect.top) / h) * this.displaySize));
    return { x, y };
  }

  drawStrokeSegment(fromPt, toPt) {
    if (!this.ctx || !this.paintCtx) return;
    const scale = this.displaySize / MASK_SIZE;
    const maskScale = MASK_SIZE / this.displaySize;
    const spec = this.getRenderSpec();

    // Видимый штрих на основном холсте
    const brushWidth = spec.visibleBrush * scale;
    this.ctx.save();
    this.ctx.strokeStyle = this.activeColor;
    this.ctx.fillStyle = this.activeColor;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = brushWidth;

    if (fromPt.x === toPt.x && fromPt.y === toPt.y) {
      this.ctx.beginPath();
      this.ctx.arc(toPt.x, toPt.y, brushWidth / 2, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      this.ctx.beginPath();
      this.ctx.moveTo(fromPt.x, fromPt.y);
      this.ctx.lineTo(toPt.x, toPt.y);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // Зеркальный штрих в маске проверки (120x120)
    const mx1 = fromPt.x * maskScale;
    const my1 = fromPt.y * maskScale;
    const mx2 = toPt.x * maskScale;
    const my2 = toPt.y * maskScale;

    this.paintCtx.save();
    this.paintCtx.strokeStyle = '#000000';
    this.paintCtx.fillStyle = '#000000';
    this.paintCtx.lineCap = 'round';
    this.paintCtx.lineJoin = 'round';
    this.paintCtx.lineWidth = spec.paintMaskWidth;

    if (mx1 === mx2 && my1 === my2) {
      this.paintCtx.beginPath();
      this.paintCtx.arc(mx2, my2, spec.paintMaskWidth / 2, 0, Math.PI * 2);
      this.paintCtx.fill();
    } else {
      this.paintCtx.beginPath();
      this.paintCtx.moveTo(mx1, my1);
      this.paintCtx.lineTo(mx2, my2);
      this.paintCtx.stroke();
    }
    this.paintCtx.restore();
  }

  completeTracing() {
    this.clearSettleTimer();
    this.clearMissedHints();

    const pointerIdToRelease = this.activePointerId;
    this.completed = true;
    this.isDrawing = false;
    this.activePointerId = null;
    this.lastPt = null;

    if (this.canvasEl && pointerIdToRelease !== null) {
      try {
        if (this.canvasEl.hasPointerCapture(pointerIdToRelease)) {
          this.canvasEl.releasePointerCapture(pointerIdToRelease);
        }
      } catch (_) {}
    }

    this.drawCelebrationFill();
    markLetterTraced(this.letter, this.lang);
    markVariantTraced(this.letter, this.letterCase, this.letterStyle, this.lang);

    const pctEl = this.container.querySelector('#lt-pct-val');
    const fillEl = this.container.querySelector('#lt-progress-fill');
    const clearBtn = this.container.querySelector('#lt-btn-clear');
    if (pctEl) pctEl.textContent = '100%';
    if (fillEl) {
      fillEl.style.width = '100%';
      fillEl.classList.remove('is-warn');
    }
    if (clearBtn) clearBtn.classList.remove('is-pulse');
    this.onProgress(100);

    const boxEl = this.container.querySelector('#lt-canvas-box');
    if (boxEl) boxEl.classList.add('is-completed');

    const copy = this.getCopy();
    const feedbackEl = this.container.querySelector('#lt-feedback');
    if (feedbackEl) {
      feedbackEl.textContent = copy.doneText;
      feedbackEl.classList.remove('is-warn');
      feedbackEl.classList.add('is-done');
    }

    sound.playSuccess();
    if (this.speakTimer) clearTimeout(this.speakTimer);
    this.speakTimer = setTimeout(() => {
      this.speakTimer = null;
      if (!this.destroyed) {
        sound.speakPhoneme(this.letter, this.lang);
      }
    }, 240);

    this.onComplete(this.letter, {
      letterCase: this.letterCase,
      letterStyle: this.letterStyle,
      glyph: this.getDisplayGlyph()
    });
  }

  evaluateCoverage({ allowComplete = false, showHints = false, forceHints = false } = {}) {
    if (!this.paintCtx || this.targetCount === 0) return;

    const pData = this.paintCtx.getImageData(0, 0, MASK_SIZE, MASK_SIZE).data;

    let covered = 0;
    for (let k = 0; k < this.targetIndices.length; k++) {
      const idx = this.targetIndices[k];
      if (pData[idx * 4 + 3] > 60) {
        covered++;
      }
    }

    let offTargetCount = 0;
    let outsideGlyphCount = 0;
    for (let i = 0; i < MASK_SIZE * MASK_SIZE; i++) {
      if (pData[i * 4 + 3] > 60) {
        if (this.toleranceMask[i] === 0) {
          offTargetCount++;
        }
        if (this.glyphMask[i] === 0) {
          outsideGlyphCount++;
        }
      }
    }

    let hitCount = 0;
    const unhit = [];
    for (let j = 0; j < this.checkpoints.length; j++) {
      const cp = this.checkpoints[j];
      const idx = cp.y * MASK_SIZE + cp.x;
      if (pData[idx * 4 + 3] > 60) {
        hitCount++;
      } else {
        unhit.push(cp);
      }
    }

    const rawCoverage = covered / this.targetCount;
    const { offLimit, outsideGlyphLimit } = computeOffTrackLimits(this.targetCount);
    const isOffTrack = offTargetCount > offLimit || outsideGlyphCount > outsideGlyphLimit;
    const cpTotal = this.checkpoints.length;
    const cpRatio = cpTotal > 0 ? hitCount / cpTotal : rawCoverage;
    const isCompleteReady = (cpTotal > 0 ? hitCount === cpTotal : rawCoverage >= 0.85)
      && rawCoverage >= 0.55
      && !isOffTrack;

    const displayPct = this.completed ? 100 : Math.min(99, Math.round(cpRatio * 100));

    const pctEl = this.container.querySelector('#lt-pct-val');
    const fillEl = this.container.querySelector('#lt-progress-fill');
    const clearBtn = this.container.querySelector('#lt-btn-clear');
    if (pctEl) pctEl.textContent = `${displayPct}%`;
    if (fillEl) fillEl.style.width = `${displayPct}%`;

    this.onProgress(displayPct);

    if (this.completed) return;

    const copy = this.getCopy();
    const feedbackEl = this.container.querySelector('#lt-feedback');

    if (isOffTrack) {
      this.clearSettleTimer();
      this.clearMissedHints();
      if (fillEl) fillEl.classList.add('is-warn');
      if (clearBtn) clearBtn.classList.add('is-pulse');
      if (feedbackEl) {
        feedbackEl.textContent = copy.hintOffTrack;
        feedbackEl.classList.remove('is-done');
        feedbackEl.classList.add('is-warn');
      }
      return;
    }

    if (fillEl) fillEl.classList.remove('is-warn');
    if (clearBtn) clearBtn.classList.remove('is-pulse');

    if (isCompleteReady) {
      if (allowComplete) {
        this.completeTracing();
        return;
      }
      if (feedbackEl) {
        feedbackEl.textContent = copy.hintAlmost;
        feedbackEl.classList.remove('is-warn', 'is-done');
      }
      return;
    }

    this.clearSettleTimer();
    if (((showHints && cpRatio >= 0.65) || forceHints) && unhit.length > 0) {
      this.renderMissedHints(unhit);
    }

    if (feedbackEl) {
      feedbackEl.textContent = cpRatio >= 0.55 ? copy.hintAlmost : copy.hintStart;
      feedbackEl.classList.remove('is-warn', 'is-done');
    }
  }

  triggerGuideDemo() {
    sound.playLetterClick();
    sound.speakPhoneme(this.letter, this.lang);

    if (this.completed) return;

    if (this.hasDrawn) {
      this.evaluateCoverage({ allowComplete: false, forceHints: true });
      return;
    }

    if (this.demoTimer) clearTimeout(this.demoTimer);
    this.guideHighlightActive = true;
    this.drawBaseGuide();
    const boxEl = this.container.querySelector('#lt-canvas-box');
    if (boxEl) boxEl.classList.add('guide-flash');

    this.demoTimer = setTimeout(() => {
      this.demoTimer = null;
      this.guideHighlightActive = false;
      if (boxEl) boxEl.classList.remove('guide-flash');
      if (!this.hasDrawn && !this.completed && !this.destroyed) {
        this.drawBaseGuide();
      }
    }, 900);
  }

  clear() {
    this.clearSettleTimer();
    this.clearMissedHints();
    if (this.demoTimer) {
      clearTimeout(this.demoTimer);
      this.demoTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    this.completed = false;
    this.hasDrawn = false;
    this.isDrawing = false;
    this.activePointerId = null;
    this.lastPt = null;
    this.moveCount = 0;
    this.guideHighlightActive = false;

    this.clearPaintMask();
    this.drawBaseGuide();

    const copy = this.getCopy();
    const pctEl = this.container.querySelector('#lt-pct-val');
    const fillEl = this.container.querySelector('#lt-progress-fill');
    const clearBtn = this.container.querySelector('#lt-btn-clear');
    const feedbackEl = this.container.querySelector('#lt-feedback');
    const boxEl = this.container.querySelector('#lt-canvas-box');

    if (pctEl) pctEl.textContent = '0%';
    if (fillEl) {
      fillEl.style.width = '0%';
      fillEl.classList.remove('is-warn');
    }
    if (clearBtn) clearBtn.classList.remove('is-pulse');
    if (boxEl) boxEl.classList.remove('is-completed', 'guide-flash');
    if (feedbackEl) {
      feedbackEl.textContent = copy.hintStart;
      feedbackEl.classList.remove('is-warn', 'is-done');
    }
    this.onProgress(0);
  }

  setLetter(letter, soundType = 'consonant') {
    this.clearSettleTimer();
    this.clearMissedHints();
    if (this.demoTimer) {
      clearTimeout(this.demoTimer);
      this.demoTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    this.letter = String(letter || 'А').toUpperCase();
    this.soundType = soundType;
    this.activeColor = soundType === 'vowel' ? TRACER_COLORS[0].hex : TRACER_COLORS[1].hex;
    this.completed = false;
    this.hasDrawn = false;
    this.isDrawing = false;
    this.activePointerId = null;
    this.lastPt = null;
    this.moveCount = 0;
    this.guideHighlightActive = false;
    this.glyphLayout = null;
    if (this.container) {
      this.render();
      this.setupCanvases();
      this.attachEvents();
      this.watchFonts();
    }
  }

  attachEvents() {
    if (!this.container || !this.canvasEl) return;

    this.container.querySelectorAll('[data-case]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playLetterClick();
        this.setMode({ letterCase: btn.dataset.case });
      });
    });

    this.container.querySelectorAll('[data-style]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playLetterClick();
        this.setMode({ letterStyle: btn.dataset.style });
      });
    });

    this.container.querySelectorAll('.lt-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeColor = btn.dataset.color || TRACER_COLORS[0].hex;
        sound.playLetterClick();
        this.container.querySelectorAll('.lt-color-btn').forEach(b => {
          const isAct = b === btn;
          b.classList.toggle('active', isAct);
          b.setAttribute('aria-pressed', isAct ? 'true' : 'false');
        });
      });
    });

    const clearBtn = this.container.querySelector('#lt-btn-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        sound.playLetterClick();
        this.clear();
      });
    }

    const guideBtn = this.container.querySelector('#lt-btn-guide');
    if (guideBtn) {
      guideBtn.addEventListener('click', () => {
        this.triggerGuideDemo();
      });
    }

    const canvas = this.canvasEl;

    const scheduleIdleComplete = () => {
      this.clearSettleTimer();
      this.settleTimer = setTimeout(() => {
        this.settleTimer = null;
        if (!this.destroyed && !this.completed && this.isDrawing) {
          this.evaluateCoverage({ allowComplete: true });
        }
      }, SETTLE_COMPLETE_MS);
    };

    canvas.addEventListener('pointerdown', (e) => {
      if (this.destroyed || this.completed) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      e.preventDefault();
      this.clearSettleTimer();
      this.clearMissedHints();
      this.isDrawing = true;
      this.hasDrawn = true;
      this.activePointerId = e.pointerId;
      this.moveCount = 0;

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (_) {}

      const pt = this.getNormalizedPoint(e);
      this.lastPt = pt;
      this.drawStrokeSegment(pt, pt);
      this.evaluateCoverage({ allowComplete: false });
      scheduleIdleComplete();
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!this.isDrawing || this.activePointerId !== e.pointerId || this.completed) return;
      e.preventDefault();
      this.clearSettleTimer();

      const pt = this.getNormalizedPoint(e);
      if (this.lastPt) {
        this.drawStrokeSegment(this.lastPt, pt);
      }
      this.lastPt = pt;
      this.moveCount++;
      if (this.moveCount % 4 === 0) {
        this.evaluateCoverage({ allowComplete: false });
      }
      scheduleIdleComplete();
    });

    const finishStroke = (e, allowComplete = true) => {
      if (!this.isDrawing || (e && e.pointerId !== undefined && this.activePointerId !== e.pointerId)) return;
      this.clearSettleTimer();
      this.isDrawing = false;
      this.activePointerId = null;
      this.lastPt = null;
      if (e && e.pointerId !== undefined) {
        try {
          if (canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
      }
      this.evaluateCoverage({ allowComplete, showHints: allowComplete });
    };

    canvas.addEventListener('pointerup', (e) => finishStroke(e, true));
    canvas.addEventListener('pointercancel', (e) => finishStroke(e, false));
    canvas.addEventListener('lostpointercapture', (e) => finishStroke(e, true));
  }

  destroy() {
    this.destroyed = true;
    this.clearSettleTimer();
    this.clearMissedHints();
    if (this.demoTimer) {
      clearTimeout(this.demoTimer);
      this.demoTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    this.isDrawing = false;
    this.activePointerId = null;
    this.canvasEl = null;
    this.ctx = null;
    this.paintCtx = null;
    this.guideCanvas = null;
    this.toleranceCanvas = null;
    this.paintCanvas = null;
  }
}
