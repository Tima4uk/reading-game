// Переиспользуемый модуль «Прописи» (Canvas Letter Tracer)
// Позволяет обводить букву пальцем или мышкой по пунктирному контуру с проверкой заполнения

import { sound } from './audio.js?v=27';

export const TRACER_COLORS = [
  { hex: '#f43f5e', names: { ru: 'Розовый мелок', pl: 'Różowa kredka', en: 'Pink crayon' } },
  { hex: '#2563eb', names: { ru: 'Синий мелок', pl: 'Niebieska kredka', en: 'Blue crayon' } },
  { hex: '#10b981', names: { ru: 'Зелёный мелок', pl: 'Zielona kredka', en: 'Green crayon' } },
  { hex: '#8b5cf6', names: { ru: 'Фиолетовый мелок', pl: 'Fioletowa kredka', en: 'Purple crayon' } },
  { hex: '#f59e0b', names: { ru: 'Оранжевый мелок', pl: 'Pomarańczowa kredka', en: 'Orange crayon' } }
];

const MASK_SIZE = 120;
const GUIDE_FONT = '900 84px "Nunito", "Comfortaa", Arial, sans-serif';

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

const UI_COPY = {
  ru: {
    hintStart: 'Веди пальцем или мышкой по букве!',
    hintOffTrack: 'Старайся вести прямо по контуру буквы! ✨',
    hintAlmost: 'Ещё чуть-чуть — докрась контур до конца!',
    doneText: '⭐ Отлично! Буква красиво обведена!',
    clearLabel: 'Очистить',
    guideLabel: 'Подсказка',
    guideTitle: 'Показать контур и послушать звук',
    progressLabel: 'Обведено'
  },
  pl: {
    hintStart: 'Prowadź palcem lub myszką po literze!',
    hintOffTrack: 'Staraj się prowadzić po śladzie litery! ✨',
    hintAlmost: 'Jeszcze troszkę — dokończ cały ślad!',
    doneText: '⭐ Brawo! Litera pięknie napisana!',
    clearLabel: 'Wyczyść',
    guideLabel: 'Podpowiedź',
    guideTitle: 'Pokaż ślad i posłuchaj głoski',
    progressLabel: 'Ślad'
  },
  en: {
    hintStart: 'Trace along the dotted letter with your finger or mouse!',
    hintOffTrack: 'Try to stay right on the letter outline! ✨',
    hintAlmost: 'Almost there — fill in the rest of the letter!',
    doneText: '⭐ Awesome! Letter traced cleanly!',
    clearLabel: 'Clear',
    guideLabel: 'Guide',
    guideTitle: 'Highlight guide and hear sound',
    progressLabel: 'Traced'
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
    this.toleranceMask = new Uint8Array(MASK_SIZE * MASK_SIZE);

    this.canvasEl = null;
    this.ctx = null;
    this.paintCtx = null;
    this.demoTimer = null;
    this.speakTimer = null;
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

  watchFonts() {
    if (typeof document === 'undefined' || !document.fonts || !document.fonts.ready) return;
    document.fonts.ready.then(() => {
      if (this.destroyed || this.hasDrawn || this.completed || !this.canvasEl) return;
      this.buildMasks();
      this.drawBaseGuide();
    }).catch(() => {});
  }

  render() {
    const copy = this.getCopy();
    const isPreviouslyTraced = loadTracedLetters(this.lang).has(this.letter);

    this.container.innerHTML = `
      <div class="lt-wrap ${this.compact ? 'lt-compact' : ''}">
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
          <canvas class="lt-canvas" id="lt-canvas" aria-label="${this.letter}"></canvas>
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

  buildMasks() {
    if (!this.guideCanvas || !this.toleranceCanvas) return;

    const gCtx = this.guideCanvas.getContext('2d', { willReadFrequently: true });
    gCtx.clearRect(0, 0, MASK_SIZE, MASK_SIZE);
    gCtx.fillStyle = '#000000';
    gCtx.font = GUIDE_FONT;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    gCtx.fillText(this.letter, 60, 65);

    const gData = gCtx.getImageData(0, 0, MASK_SIZE, MASK_SIZE).data;
    const indices = [];
    for (let i = 0; i < MASK_SIZE * MASK_SIZE; i++) {
      if (gData[i * 4 + 3] > 120) {
        indices.push(i);
      }
    }
    this.targetIndices = indices;
    this.targetCount = indices.length;

    const tCtx = this.toleranceCanvas.getContext('2d', { willReadFrequently: true });
    tCtx.clearRect(0, 0, MASK_SIZE, MASK_SIZE);
    tCtx.font = GUIDE_FONT;
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.lineJoin = 'round';
    tCtx.lineCap = 'round';
    tCtx.lineWidth = 16;
    tCtx.strokeStyle = '#000000';
    tCtx.fillStyle = '#000000';
    tCtx.strokeText(this.letter, 60, 65);
    tCtx.fillText(this.letter, 60, 65);

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
    const topY = Math.round(s * 0.22);
    const midY = Math.round(s * 0.54);
    const baseY = Math.round(s * 0.80);

    ctx.save();
    // Мягкие строки прописи
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#dbeafe';
    ctx.beginPath();
    ctx.moveTo(14, topY);
    ctx.lineTo(s - 14, topY);
    ctx.moveTo(14, baseY);
    ctx.lineTo(s - 14, baseY);
    ctx.stroke();

    ctx.setLineDash([5, 6]);
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(14, midY);
    ctx.lineTo(s - 14, midY);
    ctx.stroke();
    ctx.restore();
  }

  drawBaseGuide() {
    if (!this.ctx) return;
    const s = this.displaySize;
    const scale = s / MASK_SIZE;
    const cx = 60 * scale;
    const cy = 65 * scale;
    const fontPx = Math.round(84 * scale);

    this.ctx.clearRect(0, 0, s, s);
    this.drawGuidelines(this.ctx);

    this.ctx.save();
    this.ctx.font = `900 ${fontPx}px "Nunito", "Comfortaa", Arial, sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    // Мягкая заливка-призрак
    this.ctx.fillStyle = this.guideHighlightActive ? '#fef08a' : '#e2e8f0';
    this.ctx.fillText(this.letter, cx, cy);

    // Пунктирный контур
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.guideHighlightActive ? 3.5 : 2.5;
    this.ctx.setLineDash([6, 6]);
    this.ctx.strokeStyle = this.guideHighlightActive ? '#f59e0b' : '#94a3b8';
    this.ctx.strokeText(this.letter, cx, cy);
    this.ctx.restore();
  }

  drawCelebrationFill() {
    if (!this.ctx) return;
    const s = this.displaySize;
    const scale = s / MASK_SIZE;
    const cx = 60 * scale;
    const cy = 65 * scale;
    const fontPx = Math.round(84 * scale);

    this.ctx.save();
    this.ctx.font = `900 ${fontPx}px "Nunito", "Comfortaa", Arial, sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.shadowColor = 'rgba(16, 185, 129, 0.35)';
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = '#10b981';
    this.ctx.fillText(this.letter, cx, cy);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#059669';
    this.ctx.strokeText(this.letter, cx, cy);
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

    // Видимый штрих на основном холсте
    this.ctx.save();
    this.ctx.strokeStyle = this.activeColor;
    this.ctx.fillStyle = this.activeColor;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.lineWidth = 15 * scale;

    if (fromPt.x === toPt.x && fromPt.y === toPt.y) {
      this.ctx.beginPath();
      this.ctx.arc(toPt.x, toPt.y, (15 * scale) / 2, 0, Math.PI * 2);
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
    this.paintCtx.lineWidth = 15;

    if (mx1 === mx2 && my1 === my2) {
      this.paintCtx.beginPath();
      this.paintCtx.arc(mx2, my2, 7.5, 0, Math.PI * 2);
      this.paintCtx.fill();
    } else {
      this.paintCtx.beginPath();
      this.paintCtx.moveTo(mx1, my1);
      this.paintCtx.lineTo(mx2, my2);
      this.paintCtx.stroke();
    }
    this.paintCtx.restore();
  }

  evaluateCoverage() {
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
    for (let i = 0; i < MASK_SIZE * MASK_SIZE; i++) {
      if (pData[i * 4 + 3] > 60 && this.toleranceMask[i] === 0) {
        offTargetCount++;
      }
    }

    const rawCoverage = covered / this.targetCount;
    const displayPct = this.completed ? 100 : Math.min(100, Math.round((rawCoverage / 0.72) * 100));

    const pctEl = this.container.querySelector('#lt-pct-val');
    const fillEl = this.container.querySelector('#lt-progress-fill');
    if (pctEl) pctEl.textContent = `${displayPct}%`;
    if (fillEl) fillEl.style.width = `${displayPct}%`;

    this.onProgress(displayPct);

    if (this.completed) return;

    const copy = this.getCopy();
    const feedbackEl = this.container.querySelector('#lt-feedback');
    const offLimit = Math.max(this.targetCount * 2.6, 500);

    if (offTargetCount > offLimit) {
      if (feedbackEl) {
        feedbackEl.textContent = copy.hintOffTrack;
        feedbackEl.classList.remove('is-done');
        feedbackEl.classList.add('is-warn');
      }
      return;
    }

    if (rawCoverage >= 0.72) {
      this.completed = true;
      this.isDrawing = false;
      this.drawCelebrationFill();
      markLetterTraced(this.letter, this.lang);

      if (pctEl) pctEl.textContent = '100%';
      if (fillEl) fillEl.style.width = '100%';

      const boxEl = this.container.querySelector('#lt-canvas-box');
      if (boxEl) boxEl.classList.add('is-completed');

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

      this.onComplete(this.letter);
    } else if (rawCoverage >= 0.45 && feedbackEl) {
      feedbackEl.textContent = copy.hintAlmost;
      feedbackEl.classList.remove('is-warn', 'is-done');
    } else if (feedbackEl) {
      feedbackEl.textContent = copy.hintStart;
      feedbackEl.classList.remove('is-warn', 'is-done');
    }
  }

  triggerGuideDemo() {
    sound.playLetterClick();
    sound.speakPhoneme(this.letter, this.lang);

    if (this.completed || this.hasDrawn) return;

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
    const feedbackEl = this.container.querySelector('#lt-feedback');
    const boxEl = this.container.querySelector('#lt-canvas-box');

    if (pctEl) pctEl.textContent = '0%';
    if (fillEl) fillEl.style.width = '0%';
    if (boxEl) boxEl.classList.remove('is-completed', 'guide-flash');
    if (feedbackEl) {
      feedbackEl.textContent = copy.hintStart;
      feedbackEl.classList.remove('is-warn', 'is-done');
    }
    this.onProgress(0);
  }

  setLetter(letter, soundType = 'consonant') {
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
    if (this.container) {
      this.render();
      this.setupCanvases();
      this.attachEvents();
      this.watchFonts();
    }
  }

  attachEvents() {
    if (!this.container || !this.canvasEl) return;

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

    canvas.addEventListener('pointerdown', (e) => {
      if (this.destroyed || this.completed) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      e.preventDefault();
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
      this.evaluateCoverage();
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!this.isDrawing || this.activePointerId !== e.pointerId || this.completed) return;
      e.preventDefault();

      const pt = this.getNormalizedPoint(e);
      if (this.lastPt) {
        this.drawStrokeSegment(this.lastPt, pt);
      }
      this.lastPt = pt;
      this.moveCount++;
      if (this.moveCount % 6 === 0) {
        this.evaluateCoverage();
      }
    });

    const finishStroke = (e) => {
      if (!this.isDrawing || (e && e.pointerId !== undefined && this.activePointerId !== e.pointerId)) return;
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
      this.evaluateCoverage();
    };

    canvas.addEventListener('pointerup', finishStroke);
    canvas.addEventListener('pointercancel', finishStroke);
    canvas.addEventListener('lostpointercapture', finishStroke);
  }

  destroy() {
    this.destroyed = true;
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
