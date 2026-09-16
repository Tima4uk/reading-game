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
    const puzzle = this.getCurrentPuzzle();
    const totalParts = puzzle.parts.length;
    const placedCount = this.placedParts.size;

    this.container.innerHTML = `
      <div class="lp-wrapper">
        <!-- Верхняя карточка подсказки -->
        <div class="lp-header-card">
          <div class="lp-target-info">
            <span class="lp-target-emoji">${puzzle.emoji}</span>
            <span class="lp-target-word">${puzzle.word}</span>
          </div>
          <div class="lp-instruction">
            ${isRu ? 'Собери букву' : 'Złóż literę'} 
            <span class="lp-target-letter">${puzzle.letter}</span>
          </div>
        </div>

        <!-- Центральное поле сборки буквы -->
        <div class="lp-board-container">
          <div class="lp-letter-board ${this.isCompleted ? 'completed' : ''}" id="lp-board">
            ${puzzle.parts.map((part) => {
              const isPlaced = this.placedParts.has(part.id);
              return `
                <div class="lp-slot lp-part-${part.type} ${isPlaced ? 'placed' : 'ghost'}" 
                     data-part-id="${part.id}" 
                     data-part-type="${part.type}">
                  ${isPlaced ? `<div class="lp-part-solid lp-part-${part.type}"></div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Лоток с доступными деталями внизу -->
        <div class="lp-tray-panel">
          <div class="lp-tray-label">
            ${this.isCompleted 
              ? (isRu ? '🎉 Буква собрана!' : '🎉 Litera ułożona!') 
              : (isRu ? 'Нажимай на детали, чтобы собрать букву:' : 'Klikaj na części, aby złożyć literę:')}
          </div>
          <div class="lp-parts-tray">
            ${puzzle.parts.map((part) => {
              const isUsed = this.placedParts.has(part.id);
              return `
                <button class="lp-tray-item ${isUsed ? 'used' : ''}" 
                        data-part-id="${part.id}" 
                        data-part-type="${part.type}"
                        ${isUsed ? 'disabled' : ''}>
                  <div class="lp-tray-preview lp-part-${part.type}"></div>
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
    const slots = this.container.querySelectorAll('.lp-slot.ghost');
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        const partId = slot.dataset.partId;
        this.placePart(partId);
      });
    });
  }
}
