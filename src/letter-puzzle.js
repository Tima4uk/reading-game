// Модуль «Конструктор букв» для малышей 4.5 лет (Развивающий пазл букв)
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
    const totalParts = puzzle.parts.length;
    const placedCount = this.placedParts.size;

    const instructionText = isRu ? 'Собери букву' : (isPl ? 'Złóż literę' : 'Build the letter');
    const trayLabelText = this.isCompleted 
      ? (isRu ? '🎉 Буква собрана!' : (isPl ? '🎉 Litera ułożona!' : '🎉 Letter built!')) 
      : (isRu ? 'Нажимай на детали, чтобы собрать букву:' : (isPl ? 'Klikaj na części, aby złożyć literę:' : 'Tap parts to build the letter:'));

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
                    <!-- Пунктирный контур для сборки -->
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
              return `
                <button class="lp-tray-item ${isUsed ? 'used' : ''}" 
                        data-part-id="${part.id}" 
                        ${isUsed ? 'disabled' : ''}>
                  <div class="lp-tray-preview">
                    <svg viewBox="0 0 240 240" class="lp-tray-svg">
                      <path d="${part.path}" 
                            stroke="${isUsed ? '#94a3b8' : '#2563eb'}" 
                            stroke-width="32" 
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

  attachEvents() {
    const trayItems = this.container.querySelectorAll('.lp-tray-item');
    trayItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const partId = btn.dataset.partId;
        this.placePart(partId);
      });
    });

    // Также можно кликать прямо по контурным слотам на доске
    const slots = this.container.querySelectorAll('.lp-part-slot.ghost');
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        const partId = slot.dataset.partId;
        this.placePart(partId);
      });
    });
  }
}
