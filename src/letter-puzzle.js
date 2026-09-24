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
      : (isRu ? '🖐️ Перетаскивай детали на букву:' : (isPl ? '🖐️ Przeciągaj części na literę:' : '🖐️ Drag parts onto the letter:'));

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
                            stroke="${this.isCompleted ? '#f59e0b' : '#2563eb'}" 
                            stroke-width="24" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" />
                    ` : ''}
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
    // Проверяем, находится ли указатель в пределах или вблизи игрового поля (щедрая зона захвата для детей)
    const margin = 50;
    if (
      clientX < boardRect.left - margin ||
      clientX > boardRect.right + margin ||
      clientY < boardRect.top - margin ||
      clientY > boardRect.bottom + margin
    ) {
      return null;
    }

    const scaleX = 240 / boardRect.width;
    const scaleY = 240 / boardRect.height;
    // Координаты в системе viewBox (0..240)
    const boardX = Math.max(0, Math.min(240, (clientX - boardRect.left) * scaleX));
    const boardY = Math.max(0, Math.min(240, (clientY - boardRect.top) * scaleY));

    const puzzle = this.getCurrentPuzzle();
    const unplaced = puzzle.parts.filter(p => !this.placedParts.has(p.id));
    if (unplaced.length === 0) return null;

    // Ищем незанятые слоты, совместимые с перетаскиваемой деталью:
    // 1. Точно этот слот
    // 2. Либо слот такой же формы (например, два одинаковых столбика в П/Н или две перекладины в Ż)
    const compatibleSlots = unplaced.filter(slot => 
      slot.id === draggedPart.id || slot.previewPath === draggedPart.previewPath
    );

    if (compatibleSlots.length === 0) {
      // Если остался ровно один незанятый слот и эта деталь еще не выставлена
      if (unplaced.length === 1 && !this.placedParts.has(draggedPart.id)) {
        return unplaced[0].id;
      }
      return null;
    }

    // Если точный слот еще не занят и расстояние к нему меньше 110px — отдаем приоритет ему
    if (!this.placedParts.has(draggedPart.id)) {
      const exactSlot = compatibleSlots.find(s => s.id === draggedPart.id);
      if (exactSlot) {
        const dist = Math.hypot(boardX - exactSlot.center.x, boardY - exactSlot.center.y);
        if (dist < 110) {
          return exactSlot.id;
        }
      }
    }

    if (compatibleSlots.length === 1) {
      return compatibleSlots[0].id;
    }

    // Если есть несколько подходящих слотов (например, левый и правый столбик):
    // выбираем тот, к которому ближе всего палец ребенка
    let closestSlot = compatibleSlots[0];
    let minDistance = Infinity;

    for (const slot of compatibleSlots) {
      const dist = Math.hypot(boardX - slot.center.x, boardY - slot.center.y);
      if (dist < minDistance) {
        minDistance = dist;
        closestSlot = slot;
      }
    }

    return closestSlot.id;
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
        this.cleanUpDrag();

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

          // Поиск целевого слота для динамической подсветки
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

        // ВАЖНО: добавление через тап полностью отключено!
        // Деталь ставится ТОЛЬКО перетаскиванием (drag-and-drop)
        if (!hasMoved) {
          this.cleanUpDrag();
          return;
        }

        // Проверяем слот прямо в момент отпускания пальца
        const finalSlotId = this.findMatchingSlot(e.clientX, e.clientY, part) || targetSlotId;

        if (finalSlotId) {
          // Успешный drop в слот буквы!
          this.cleanUpDrag();
          this.placePart(finalSlotId);
        } else {
          // Промах: анимация возврата в лоток
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

    // Клики по контурным слотам отключены — только Drag and Drop
  }

  destroy() {
    this.cleanUpDrag();
  }
}
