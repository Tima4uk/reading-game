// Модуль «Конструктор букв» для малышей 4.5 лет (Развивающий пазл букв с Drag-and-Drop)
import { LETTER_PUZZLES_DATA } from './data.js';
import { sound } from './audio.js';

export class LetterPuzzleGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.currentPuzzleIndex = 0;
    this.puzzles = [];
    this.placedParts = new Set();
    this.isCompleted = false;

    // Состояние перетаскивания (Drag-and-Drop)
    this.dragState = null;
  }

  setLanguage(lang) {
    this.lang = lang;
    this.start();
  }

  start() {
    const list = LETTER_PUZZLES_DATA[this.lang] || LETTER_PUZZLES_DATA['ru'];
    this.puzzles = [...list].sort(() => 0.5 - Math.random());
    this.currentPuzzleIndex = 0;
    this.loadPuzzle();
  }

  loadPuzzle() {
    this.cleanUpDrag();
    this.placedParts.clear();
    this.isCompleted = false;
    this.render();

    const puzzle = this.getCurrentPuzzle();
    setTimeout(() => {
      sound.speakLetter(puzzle.letter, this.lang);
    }, 350);
  }

  getCurrentPuzzle() {
    return this.puzzles[this.currentPuzzleIndex % this.puzzles.length];
  }

  render() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const puzzle = this.getCurrentPuzzle();

    const instructionText = isRu ? 'Собери букву' : (isPl ? 'Złóż literę' : 'Build the letter');
    const trayLabelText = this.isCompleted 
      ? (isRu ? '🎉 Буква собрана!' : (isPl ? '🎉 Litera ułożona!' : '🎉 Letter built!')) 
      : (isRu ? '🖐️ Перетаскивай детали на поле:' : (isPl ? '🖐️ Przeciągaj części na pole:' : '🖐️ Drag parts to the board:'));

    this.container.innerHTML = `
      <div class="lp-wrapper">
        <!-- Верхняя карточка подсказки -->
        <div class="lp-header-card">
          <div class="lp-target-info">
            <span class="lp-target-emoji">${puzzle.emoji}</span>
            <span class="lp-target-word">${puzzle.word}</span>
          </div>
          <div class="lp-instruction">
            ${instructionText} 
            <span class="lp-target-letter">${puzzle.letter}</span>
          </div>
        </div>

        <!-- Центральное поле сборки буквы -->
        <div class="lp-board-container">
          <div class="lp-letter-board ${this.isCompleted ? 'completed' : ''}" id="lp-board">
            <svg class="lp-board-svg" viewBox="0 0 240 240">
              <defs>
                <linearGradient id="lp-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38bdf8" />
                  <stop offset="100%" stop-color="#1d4ed8" />
                </linearGradient>
                <linearGradient id="lp-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#fde047" />
                  <stop offset="100%" stop-color="#f59e0b" />
                </linearGradient>
                <filter id="lp-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#1e3a8a" flood-opacity="0.25"/>
                </filter>
              </defs>
              ${puzzle.parts.map((part) => {
                const isPlaced = this.placedParts.has(part.id);
                return `
                  <g class="lp-part-slot ${isPlaced ? 'placed' : 'ghost'}" data-part-id="${part.id}">
                    <!-- Пунктирный контур-паз для сборки -->
                    <path class="lp-ghost-path" 
                          d="${part.path}" 
                          fill="none" 
                          stroke="#cbd5e1" 
                          stroke-width="24" 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-dasharray="8 8" />
                    
                    ${isPlaced ? `
                      <path class="lp-solid-path" 
                            d="${part.path}" 
                            fill="none" 
                            stroke="${this.isCompleted ? 'url(#lp-grad-gold)' : 'url(#lp-grad-blue)'}" 
                            stroke-width="24" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            filter="url(#lp-shadow)" />
                    ` : `
                      <!-- Прозрачная широкая область нажатия для легкого тапа пальцем на планшете -->
                      <path class="lp-hit-path" 
                            d="${part.path}" 
                            fill="none" 
                            stroke="transparent" 
                            stroke-width="46" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" />
                    `}
                  </g>
                `;
              }).join('')}
            </svg>
          </div>
        </div>

        <!-- Лоток с доступными деталями внизу -->
        <div class="lp-tray-panel">
          <div class="lp-tray-label">
            ${trayLabelText}
          </div>
          <div class="lp-parts-tray">
            ${puzzle.parts.map((part) => {
              const isUsed = this.placedParts.has(part.id);
              const pPath = part.previewPath || 'M 10 30 L 50 30';
              return `
                <button class="lp-tray-item ${isUsed ? 'used' : ''}" 
                        data-part-id="${part.id}" 
                        ${isUsed ? 'disabled' : ''}>
                  <div class="lp-tray-preview">
                    <svg viewBox="0 0 60 60" class="lp-tray-svg">
                      <path d="${pPath}" 
                            stroke="${isUsed ? '#94a3b8' : '#2563eb'}" 
                            stroke-width="12" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            fill="none" />
                    </svg>
                  </div>
                  <span class="lp-tray-item-label">${part.label}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  cleanUpDrag() {
    if (this.dragState) {
      if (this.dragState.avatar && this.dragState.avatar.parentNode) {
        this.dragState.avatar.remove();
      }
      if (this.dragState.btn) {
        this.dragState.btn.classList.remove('is-dragging');
      }
      this.clearDropHighlights();
      this.dragState = null;
    }
  }

  clearDropHighlights() {
    const slots = this.container.querySelectorAll('.lp-part-slot.drag-hover');
    slots.forEach(s => s.classList.remove('drag-hover'));
  }

  placePart(partId) {
    if (this.isCompleted) return;
    if (this.placedParts.has(partId)) return;

    this.placedParts.add(partId);
    sound.playLetterClick();

    const puzzle = this.getCurrentPuzzle();

    // Проверяем, собрана ли вся буква
    if (this.placedParts.size === puzzle.parts.length) {
      this.isCompleted = true;
      this.render();

      sound.playSuccess();
      sound.speakLetterAndWord(puzzle.letter, puzzle.word, this.lang);

      this.onStarEarned(2);
      this.onWinEffect();

      // Переход к следующей букве
      setTimeout(() => {
        this.currentPuzzleIndex++;
        this.loadPuzzle();
      }, 2800);
    } else {
      this.render();
    }
  }

  findMatchingSlot(clientX, clientY, draggedPart) {
    const boardEl = this.container.querySelector('#lp-board');
    if (!boardEl) return null;

    const boardRect = boardEl.getBoundingClientRect();
    // Проверяем, находится ли указатель в пределах или вблизи игрового поля
    if (
      clientX < boardRect.left - 40 ||
      clientX > boardRect.right + 40 ||
      clientY < boardRect.top - 40 ||
      clientY > boardRect.bottom + 40
    ) {
      return null;
    }

    const scaleX = 240 / boardRect.width;
    const scaleY = 240 / boardRect.height;
    const boardX = (clientX - boardRect.left) * scaleX;
    const boardY = (clientY - boardRect.top) * scaleY;

    const puzzle = this.getCurrentPuzzle();
    const unplaced = puzzle.parts.filter(p => !this.placedParts.has(p.id));

    // 1. Приоритет: точный слот той же детали
    if (!this.placedParts.has(draggedPart.id)) {
      const dist = Math.hypot(boardX - draggedPart.center.x, boardY - draggedPart.center.y);
      if (dist < 80) {
        return draggedPart.id;
      }
    }

    // 2. Если деталь взаимозаменяема по форме (например, два столбика в П или Н)
    for (const slotPart of unplaced) {
      const isSameShape = (slotPart.previewPath === draggedPart.previewPath);
      if (isSameShape) {
        const dist = Math.hypot(boardX - slotPart.center.x, boardY - slotPart.center.y);
        if (dist < 80) {
          return slotPart.id;
        }
      }
    }

    // 3. Если остался всего один незанятый слот и указатель над игровым полем
    if (unplaced.length === 1 && unplaced[0].id === draggedPart.id) {
      if (
        clientX >= boardRect.left && clientX <= boardRect.right &&
        clientY >= boardRect.top && clientY <= boardRect.bottom
      ) {
        return unplaced[0].id;
      }
    }

    return null;
  }

  attachEvents() {
    const puzzle = this.getCurrentPuzzle();
    const trayItems = this.container.querySelectorAll('.lp-tray-item');

    trayItems.forEach(btn => {
      const partId = btn.dataset.partId;
      const part = puzzle.parts.find(p => p.id === partId);
      if (!part) return;

      btn.addEventListener('pointerdown', (e) => {
        if (this.isCompleted || this.placedParts.has(partId)) return;
        if (e.button !== undefined && e.button !== 0) return;

        e.preventDefault();
        try {
          btn.setPointerCapture(e.pointerId);
        } catch (_) {}

        this.dragState = {
          partId,
          part,
          btn,
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          hasMoved: false,
          avatar: null,
          targetSlotId: null
        };
      });

      btn.addEventListener('pointermove', (e) => {
        if (!this.dragState || this.dragState.pointerId !== e.pointerId) return;

        const dx = e.clientX - this.dragState.startX;
        const dy = e.clientY - this.dragState.startY;

        if (!this.dragState.hasMoved && Math.hypot(dx, dy) >= 8) {
          this.dragState.hasMoved = true;
          btn.classList.add('is-dragging');

          // Создаем визуальный аватар для перетаскивания
          const avatar = document.createElement('div');
          avatar.className = 'lp-drag-avatar';
          const pPath = part.previewPath || 'M 10 30 L 50 30';
          avatar.innerHTML = `
            <svg viewBox="0 0 60 60" class="lp-drag-svg">
              <path d="${pPath}" 
                    stroke="#1d4ed8" 
                    stroke-width="13" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    fill="none" />
            </svg>
          `;
          document.body.appendChild(avatar);
          this.dragState.avatar = avatar;
        }

        if (this.dragState.hasMoved && this.dragState.avatar) {
          this.dragState.avatar.style.left = `${e.clientX - 34}px`;
          this.dragState.avatar.style.top = `${e.clientY - 34}px`;

          // Поиск целевого слота для подсветки
          const matchSlotId = this.findMatchingSlot(e.clientX, e.clientY, part);
          this.clearDropHighlights();
          if (matchSlotId) {
            this.dragState.targetSlotId = matchSlotId;
            const slotEl = this.container.querySelector(`.lp-part-slot[data-part-id="${matchSlotId}"]`);
            if (slotEl) slotEl.classList.add('drag-hover');
          } else {
            this.dragState.targetSlotId = null;
          }
        }
      });

      const handlePointerEnd = (e) => {
        if (!this.dragState || this.dragState.pointerId !== e.pointerId) return;

        try {
          btn.releasePointerCapture(e.pointerId);
        } catch (_) {}

        const { partId, hasMoved, avatar, targetSlotId, btn: dragBtn } = this.dragState;

        if (!hasMoved) {
          // Быстрый клик/тап (без перетаскивания) — сохраняем доступность для самых маленьких
          this.cleanUpDrag();
          this.placePart(partId);
          return;
        }

        if (targetSlotId) {
          // Успешный drop в подсвеченный слот!
          this.cleanUpDrag();
          this.placePart(targetSlotId);
        } else {
          // Промах: плавная анимация возврата в лоток
          if (avatar) {
            const btnRect = dragBtn.getBoundingClientRect();
            avatar.style.transition = 'all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)';
            avatar.style.left = `${btnRect.left + (btnRect.width - 68) / 2}px`;
            avatar.style.top = `${btnRect.top + (btnRect.height - 68) / 2}px`;
            avatar.style.opacity = '0.3';
            avatar.style.transform = 'scale(0.8)';
            setTimeout(() => {
              this.cleanUpDrag();
            }, 220);
          } else {
            this.cleanUpDrag();
          }
        }
      };

      btn.addEventListener('pointerup', handlePointerEnd);
      btn.addEventListener('pointercancel', handlePointerEnd);
    });

    // Дополнительно: можно кликать прямо по контурным слотам на доске
    const slots = this.container.querySelectorAll('.lp-part-slot.ghost');
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        const partId = slot.dataset.partId;
        this.placePart(partId);
      });
    });
  }
}
