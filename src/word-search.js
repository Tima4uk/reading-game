// Игровой режим: Сетка-поиск (Word Search / Wykreślanka)
import { WORDS_DATA, WORDS_DATA_HARD, POLISH_ALPHABET, RUSSIAN_ALPHABET, VOWELS } from './data.js';
import { sound } from './audio.js';

export class WordSearchGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.difficulty = localStorage.getItem('ws_difficulty') || 'easy'; // 'easy' (6x6) | 'hard' (8x8)
    this.gridSize = this.difficulty === 'hard' ? 8 : 6;
    this.onWordFound = options.onWordFound || (() => { });
    this.onGameComplete = options.onGameComplete || (() => { });

    this.wordsToFind = [];
    this.foundWords = new Set();
    this.grid = []; // 2D массив { letter, row, col, foundColor }
    this.selectedCells = [];
    this.isSelecting = false;
    this.selectionStart = null;

    // Палитра мягких цветов для выделения найденных слов
    this.colors = [
      '#FFD166', // солнечный желтый
      '#06D6A0', // мятный
      '#118AB2', // небесный
      '#FF6B6B', // коралловый
      '#B388FF', // лавандовый
      '#FFA07A', // персиковый
      '#4ADE80', // светло-зеленый
      '#F472B6'  // розовый
    ];
  }

  setLanguage(lang) {
    this.lang = lang;
    this.startNewGame();
  }

  setDifficulty(diff) {
    if (this.difficulty === diff) return;
    this.difficulty = diff;
    this.gridSize = diff === 'hard' ? 8 : 6;
    localStorage.setItem('ws_difficulty', diff);
    sound.playLetterClick();
    this.startNewGame();
  }

  startNewGame() {
    this.foundWords.clear();
    this.selectedCells = [];
    this.isSelecting = false;

    let candidateWords = [];
    let targetCount = 4;

    if (this.difficulty === 'hard') {
      this.gridSize = 8;
      targetCount = 5;
      const hardPool = WORDS_DATA_HARD[this.lang] || [];
      const normalPool = WORDS_DATA[this.lang] || [];
      candidateWords = [...hardPool, ...normalPool.filter(w => w.word.length >= 5 && w.word.length <= 8)];
    } else {
      this.gridSize = 6;
      targetCount = 4;
      const normalPool = WORDS_DATA[this.lang] || [];
      candidateWords = normalPool.filter(w => w.word.length <= 6);
    }

    // Перемешиваем
    const shuffled = [...candidateWords].sort(() => 0.5 - Math.random());
    this.wordsToFind = [];

    // Генерируем поле и размещаем слова
    this.generateBoard(shuffled, targetCount);
    this.render();
  }

  generateBoard(candidateWords, targetCount = 4) {
    const size = this.gridSize;
    let placedWords = [];

    // Пробуем сгенерировать поле (до 30 попыток при коллизиях)
    for (let attempt = 0; attempt < 30; attempt++) {
      this.grid = Array.from({ length: size }, (_, r) =>
        Array.from({ length: size }, (_, c) => ({
          letter: '',
          row: r,
          col: c,
          foundColor: null
        }))
      );

      placedWords = [];
      for (const item of candidateWords) {
        if (placedWords.length >= targetCount) break;
        // Избегаем дубликатов одинаковых слов
        if (placedWords.some(p => p.word === item.word)) continue;

        if (this.placeWord(item.word, item)) {
          placedWords.push(item);
        }
      }

      if (placedWords.length >= (targetCount - 1)) break;
    }

    this.wordsToFind = placedWords;

    // Заполняем пустые клетки случайными буквами соответствующего алфавита
    const alphabet = this.lang === 'ru' ? RUSSIAN_ALPHABET : POLISH_ALPHABET;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!this.grid[r][c].letter) {
          const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
          this.grid[r][c].letter = randomChar;
        }
      }
    }
  }

  placeWord(word, meta) {
    const size = this.gridSize;
    const len = word.length;

    // Направления: в простом режиме только → и ↓. В сложном режиме: диагонали и назад!
    let directions = [
      { dr: 0, dc: 1 }, // вправо ->
      { dr: 1, dc: 0 }  // вниз |
    ];

    if (this.difficulty === 'hard') {
      directions.push(
        { dr: 1, dc: 1 },  // диагональ вправо-вниз ↘
        { dr: 1, dc: -1 }, // диагональ влево-вниз ↙
        { dr: 0, dc: -1 }  // назад влево <-
      );
    }

    directions.sort(() => 0.5 - Math.random());

    const positions = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        positions.push({ r, c });
      }
    }
    positions.sort(() => 0.5 - Math.random());

    for (const dir of directions) {
      for (const pos of positions) {
        const endR = pos.r + dir.dr * (len - 1);
        const endC = pos.c + dir.dc * (len - 1);

        if (endR >= 0 && endR < size && endC >= 0 && endC < size) {
          // Проверяем, можно ли положить слово
          let canPlace = true;
          for (let i = 0; i < len; i++) {
            const curR = pos.r + dir.dr * i;
            const curC = pos.c + dir.dc * i;
            const curCell = this.grid[curR][curC];
            if (curCell.letter !== '' && curCell.letter !== word[i]) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            // Размещаем слово
            for (let i = 0; i < len; i++) {
              const curR = pos.r + dir.dr * i;
              const curC = pos.c + dir.dc * i;
              this.grid[curR][curC].letter = word[i];
            }
            return true;
          }
        }
      }
    }

    return false;
  }

  render() {
    const isRu = this.lang === 'ru';
    const isHard = this.difficulty === 'hard';

    this.container.innerHTML = `
      <div class="ws-game ${isHard ? 'ws-hard-mode' : ''}">
        <!-- Компактная панель управления сетки: Сложность + Слова для поиска -->
        <div class="ws-toolbar">
          <div class="ws-diff-bar">
            <button class="ws-diff-btn ${!isHard ? 'active' : ''}" id="ws-diff-easy">
              🐣 ${isRu ? 'Легкий 6×6' : 'Łatwy 6×6'}
            </button>
            <button class="ws-diff-btn ${isHard ? 'active' : ''}" id="ws-diff-hard">
              🚀 ${isRu ? 'Мастер 8×8' : 'Mistrz 8×8'}
            </button>
          </div>

          <div class="ws-words-list">
            ${this.wordsToFind.map((item, idx) => {
              const isFound = this.foundWords.has(item.word);
              const color = isFound ? this.colors[idx % this.colors.length] : 'transparent';
              return `
                <button class="ws-word-badge ${isFound ? 'found' : ''}" 
                        data-word="${item.word}"
                        style="${isFound ? `background-color: ${color}; border-color: ${color};` : ''}">
                  <span class="ws-word-emoji">${item.emoji}</span>
                  <div class="ws-word-text-group">
                    <span class="ws-word-text">${item.word}</span>
                    ${item.hint ? `<span class="ws-word-subhint">(${item.hint})</span>` : ''}
                  </div>
                  <span class="ws-sound-icon" title="${isRu ? 'Послушать' : 'Posłuchaj'}">🔊</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="ws-grid-container">
          <div class="ws-grid ws-grid-${this.gridSize}" 
               style="grid-template-columns: repeat(${this.gridSize}, 1fr);" 
               id="ws-grid-board">
            ${this.grid.flatMap((row, r) =>
              row.map((cell, c) => {
                const bg = cell.foundColor ? `background-color: ${cell.foundColor};` : '';
                const foundCls = cell.foundColor ? 'cell-found' : '';
                return `
                  <div class="ws-cell ${foundCls}" 
                       data-r="${r}" data-c="${c}" 
                       style="${bg}">
                    ${cell.letter}
                  </div>
                `;
              })
            ).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Переключение уровня сложности
    const btnEasy = this.container.querySelector('#ws-diff-easy');
    const btnHard = this.container.querySelector('#ws-diff-hard');
    if (btnEasy) btnEasy.addEventListener('click', () => this.setDifficulty('easy'));
    if (btnHard) btnHard.addEventListener('click', () => this.setDifficulty('hard'));

    const gridEl = this.container.querySelector('#ws-grid-board');
    const wordBadges = this.container.querySelectorAll('.ws-word-badge');

    // Клик на карточку слова в списке (произносит слово)
    wordBadges.forEach(badge => {
      badge.addEventListener('click', () => {
        const word = badge.dataset.word;
        sound.speakWord(word, this.lang);
        sound.playLetterClick();
      });
    });

    // Оптимизация для планшета: поддержка как свайпа, так и последовательных тапов
    let didMove = false;
    let autoClearTimer = null;

    const resetAutoClear = () => {
      if (autoClearTimer) clearTimeout(autoClearTimer);
      autoClearTimer = setTimeout(() => {
        if (!this.isSelecting && this.selectedCells.length > 0) {
          this.selectedCells = [];
          this.updateSelectionVisuals();
        }
      }, 4000);
    };

    const onPointerDown = (e) => {
      e.preventDefault();
      const cell = this.getCellFromEvent(e);
      if (!cell) return;

      const r = parseInt(cell.dataset.r);
      const c = parseInt(cell.dataset.c);
      didMove = false;

      // Если уже была начата пошаговая цепочка тапов (без перетаскивания)
      if (this.selectedCells.length >= 1 && !this.isSelecting) {
        // Проверяем линию от первого элемента к текущему
        const line = this.getLineCells(this.selectedCells[0], { r, c });
        if (line && line.length > 1) {
          this.selectedCells = line;
          this.updateSelectionVisuals();
          const letter = this.grid[r][c].letter;
          sound.playLetterClick();
          sound.speakLetter(letter, this.lang);
          this.checkSelectedWord(true); // true = сохранять подсветку при неудаче ненадолго
          resetAutoClear();
          return;
        }
      }

      // Начинаем новое выделение
      this.isSelecting = true;
      this.selectionStart = { r, c };
      this.selectedCells = [this.selectionStart];
      this.updateSelectionVisuals();

      const letter = this.grid[r][c].letter;
      sound.playLetterClick();
      sound.speakLetter(letter, this.lang);
      resetAutoClear();
    };

    const onPointerMove = (e) => {
      if (!this.isSelecting) return;
      e.preventDefault();

      const cell = this.getCellFromEvent(e);
      if (!cell) return;

      const r = parseInt(cell.dataset.r);
      const c = parseInt(cell.dataset.c);

      if (r !== this.selectionStart.r || c !== this.selectionStart.c) {
        didMove = true;
      }

      const lineCells = this.getLineCells(this.selectionStart, { r, c });
      if (lineCells) {
        if (lineCells.length !== this.selectedCells.length ||
          !lineCells.every((pt, i) => pt.r === this.selectedCells[i]?.r && pt.c === this.selectedCells[i]?.c)) {
          this.selectedCells = lineCells;
          this.updateSelectionVisuals();

          const lastPt = lineCells[lineCells.length - 1];
          const curLetter = this.grid[lastPt.r][lastPt.c].letter;
          sound.speakLetter(curLetter, this.lang);
        }
      }
    };

    const onPointerUp = () => {
      if (!this.isSelecting) return;
      this.isSelecting = false;

      // Если было реальное движение пальцем/мышкой (свайп)
      if (didMove) {
        this.checkSelectedWord(false);
        this.selectedCells = [];
        this.updateSelectionVisuals();
      } else {
        // Одиночный тап: оставляем ячейку выбранной, ребенок может нажать следующую
        resetAutoClear();
      }
    };

    gridEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  getCellFromEvent(e) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el && el.classList.contains('ws-cell')) {
      return el;
    }
    return null;
  }

  // Расчет прямой линии (горизонталь, вертикаль или диагональ)
  getLineCells(start, end) {
    const dr = end.r - start.r;
    const dc = end.c - start.c;

    // Горизонтально (слева направо или справа налево)
    if (dr === 0) {
      const step = dc > 0 ? 1 : -1;
      const count = Math.abs(dc) + 1;
      return Array.from({ length: count }, (_, i) => ({ r: start.r, c: start.c + i * step }));
    }

    // Вертикально (сверху вниз или снизу вверх)
    if (dc === 0) {
      const step = dr > 0 ? 1 : -1;
      const count = Math.abs(dr) + 1;
      return Array.from({ length: count }, (_, i) => ({ r: start.r + i * step, c: start.c }));
    }

    // Диагональ 45 градусов
    if (Math.abs(dr) === Math.abs(dc)) {
      const stepR = dr > 0 ? 1 : -1;
      const stepC = dc > 0 ? 1 : -1;
      const count = Math.abs(dr) + 1;
      return Array.from({ length: count }, (_, i) => ({ r: start.r + i * stepR, c: start.c + i * stepC }));
    }

    return null;
  }

  updateSelectionVisuals() {
    const gridEl = this.container.querySelector('#ws-grid-board');
    if (!gridEl) return;

    const allCells = gridEl.querySelectorAll('.ws-cell');
    allCells.forEach(cell => cell.classList.remove('selecting'));

    this.selectedCells.forEach(pt => {
      const el = gridEl.querySelector(`.ws-cell[data-r="${pt.r}"][data-c="${pt.c}"]`);
      if (el) el.classList.add('selecting');
    });

    // Обновляем текущее читаемое слово в статусе
    const statusEl = this.container.querySelector('#ws-status');
    if (statusEl && this.selectedCells.length > 0) {
      const curWord = this.selectedCells.map(pt => this.grid[pt.r][pt.c].letter).join('');
      statusEl.textContent = curWord;
    }
  }

  checkSelectedWord(fromTap = false) {
    if (this.selectedCells.length < 2) return;

    const selectedWord = this.selectedCells.map(pt => this.grid[pt.r][pt.c].letter).join('');
    const reversedWord = [...this.selectedCells].reverse().map(pt => this.grid[pt.r][pt.c].letter).join('');

    // Ищем совпадение
    const matchedItem = this.wordsToFind.find(item =>
      !this.foundWords.has(item.word) && (item.word === selectedWord || item.word === reversedWord)
    );

    if (matchedItem) {
      // УРА! Слово найдено!
      this.foundWords.add(matchedItem.word);
      const colorIndex = (this.foundWords.size - 1) % this.colors.length;
      const highlightColor = this.colors[colorIndex];

      // Закрепляем цвет за ячейками
      this.selectedCells.forEach(pt => {
        this.grid[pt.r][pt.c].foundColor = highlightColor;
      });

      this.selectedCells = [];

      sound.playSuccess();
      sound.speakWord(matchedItem.word, this.lang);

      this.onWordFound(matchedItem.word);

      // Перерисовываем
      this.render();

      // Проверка на победу в раунде
      if (this.foundWords.size === this.wordsToFind.length) {
        setTimeout(() => {
          sound.playVictory();
          this.onGameComplete();
        }, 500);
      }
    } else {
      sound.playError();
      const statusEl = this.container.querySelector('#ws-status');
      if (statusEl) {
        statusEl.textContent = this.lang === 'ru' ? 'Попробуй еще раз!' : 'Spróbuj jeszcze raz!';
      }
      if (fromTap) {
        setTimeout(() => {
          this.selectedCells = [];
          this.updateSelectionVisuals();
        }, 700);
      }
    }
  }
}
