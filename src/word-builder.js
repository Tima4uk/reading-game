// Игровой режим: «Собери слово» (Word Builder / Ułóż słowo)
import { WORDS_DATA, WORDS_DATA_HARD, VOWELS } from './data.js';
import { sound } from './audio.js';

export class WordBuilderGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.difficulty = localStorage.getItem('wb_difficulty') || 'easy'; // 'easy' | 'hard'
    this.onWordCompleted = options.onWordCompleted || (() => {});

    this.currentWordItem = null;
    this.targetWord = '';
    this.slots = []; // Массив букв в слотах: [ { letter, tileId } ]
    this.availableTiles = []; // Буквы для выбора: [ { id, letter, used } ]
    this.isCompleted = false;
    this.usedWordIndexes = new Set();
  }

  setLanguage(lang) {
    this.lang = lang;
    this.usedWordIndexes.clear();
    this.startNewWord();
  }

  setDifficulty(diff) {
    if (this.difficulty === diff) return;
    this.difficulty = diff;
    localStorage.setItem('wb_difficulty', diff);
    sound.playLetterClick();
    this.usedWordIndexes.clear();
    this.startNewWord();
  }

  startNewWord() {
    this.isCompleted = false;
    
    let words = [];
    if (this.difficulty === 'hard') {
      const hardPool = WORDS_DATA_HARD[this.lang] || [];
      const normalPool = WORDS_DATA[this.lang] || [];
      words = [...hardPool, ...normalPool.filter(w => w.word.length >= 5)];
    } else {
      const normalPool = WORDS_DATA[this.lang] || [];
      words = normalPool.filter(w => w.word.length <= 4);
    }
    if (words.length === 0) {
      words = WORDS_DATA[this.lang] || [];
    }

    // Выбираем неиспользованное слово
    if (this.usedWordIndexes.size >= words.length) {
      this.usedWordIndexes.clear();
    }

    let availableIndices = [];
    for (let i = 0; i < words.length; i++) {
      if (!this.usedWordIndexes.has(i)) availableIndices.push(i);
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this.usedWordIndexes.add(randomIndex);
    this.currentWordItem = words[randomIndex];
    this.targetWord = this.currentWordItem.word;

    // Инициализируем пустые слоты
    this.slots = Array(this.targetWord.length).fill(null);

    // Создаем плитки с буквами и перемешиваем их
    const letters = this.targetWord.split('').map((letter, idx) => ({
      id: idx,
      letter,
      used: false
    }));

    // Перемешиваем буквы (чтобы не совпадали сразу с ответом)
    let shuffled = [...letters].sort(() => 0.5 - Math.random());
    if (shuffled.map(t => t.letter).join('') === this.targetWord && this.targetWord.length > 2) {
      shuffled.reverse();
    }
    this.availableTiles = shuffled;

    this.render();

    // Озвучиваем подсказку при старте нового слова
    setTimeout(() => {
      sound.speakWord(this.targetWord, this.lang);
    }, 400);
  }

  render() {
    const isCompleted = this.isCompleted;
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const isHard = this.difficulty === 'hard';

    const easyLabel = isRu ? 'Легкий (3-4 буквы)' : (isPl ? 'Łatwy (3-4 litery)' : 'Easy (3-4 letters)');
    const hardLabel = isRu ? 'Мастер (5-9 букв)' : (isPl ? 'Mistrz (5-9 liter)' : 'Master (5-9 letters)');
    const listenTitle = isRu ? 'Послушать' : (isPl ? 'Posłuchaj' : 'Listen');
    const listenText = isRu ? 'Послушать слово' : (isPl ? 'Posłuchaj słowa' : 'Listen to word');
    const hintLabel = isRu ? 'Подсказка' : (isPl ? 'Podpowiedź' : 'Hint');
    const clearLabel = isRu ? 'Стереть' : (isPl ? 'Wyczyść' : 'Clear');
    const nextLabel = isRu ? 'Дальше' : (isPl ? 'Dalej' : 'Next');

    this.container.innerHTML = `
      <div class="wb-game ${isHard ? 'wb-hard-mode' : ''}">
        <!-- Переключатель сложности -->
        <div class="ws-diff-bar">
          <button class="ws-diff-btn ${!isHard ? 'active' : ''}" id="wb-diff-easy">
            🐣 ${easyLabel}
          </button>
          <button class="ws-diff-btn ${isHard ? 'active' : ''}" id="wb-diff-hard">
            🚀 ${hardLabel}
          </button>
        </div>

        <!-- Картинка и подсказка -->
        <div class="wb-card">
          <div class="wb-emoji-wrapper">
            <span class="wb-emoji">${this.currentWordItem.emoji}</span>
          </div>
          <div class="wb-hint-text">${this.currentWordItem.hint}</div>
          <button class="wb-listen-btn" id="wb-listen-btn" title="${listenTitle}">
            🔊 ${listenText}
          </button>
        </div>

        <!-- Слоты для сборки слова -->
        <div class="wb-slots-container">
          ${this.slots.map((slot, index) => {
            const letter = slot ? slot.letter : '';
            const isVowel = letter ? VOWELS[this.lang].has(letter) : false;
            return `
              <div class="wb-slot ${slot ? 'filled' : 'empty'} ${isCompleted ? 'success-anim' : ''} ${isVowel ? 'vowel' : 'consonant'}" 
                   data-slot-index="${index}"
                   title="${isCompleted ? (isRu ? 'Нажми, чтобы послушать слово' : (isPl ? 'Kliknij, aby posłuchać' : 'Tap to listen')) : ''}">
                ${letter}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Доступные буквы для нажатия -->
        <div class="wb-tiles-container">
          ${this.availableTiles.map(tile => {
            const isVowel = VOWELS[this.lang].has(tile.letter);
            return `
              <button class="wb-tile ${tile.used ? 'used' : ''} ${isVowel ? 'vowel' : 'consonant'}" 
                      data-tile-id="${tile.id}" 
                      ${tile.used ? 'disabled' : ''}>
                ${tile.letter}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Кнопки управления: Подсказка и Очистить (или кнопка ДАЛЬШЕ при победе) -->
        <div class="wb-controls">
          ${isCompleted ? `
            <button class="wb-ctrl-btn btn-next" id="wb-next-btn">
              ${nextLabel} ➔
            </button>
          ` : `
            <button class="wb-ctrl-btn btn-hint" id="wb-hint-btn">
              💡 ${hintLabel}
            </button>
            <button class="wb-ctrl-btn btn-clear" id="wb-clear-btn">
              ↺ ${clearLabel}
            </button>
          `}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Переключение уровня сложности
    const btnEasy = this.container.querySelector('#wb-diff-easy');
    const btnHard = this.container.querySelector('#wb-diff-hard');
    if (btnEasy) btnEasy.addEventListener('click', () => this.setDifficulty('easy'));
    if (btnHard) btnHard.addEventListener('click', () => this.setDifficulty('hard'));

    // Клик на плитку буквы
    const tileBtns = this.container.querySelectorAll('.wb-tile');
    tileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isCompleted) return;
        const tileId = parseInt(btn.dataset.tileId);
        this.selectTile(tileId);
      });
    });

    // Клик на уже заполненный слот (возвращает букву обратно, а при собранном слове — повторяет произношение)
    const slotEls = this.container.querySelectorAll('.wb-slot');
    slotEls.forEach(slotEl => {
      slotEl.addEventListener('click', () => {
        if (this.isCompleted) {
          sound.playLetterClick();
          sound.speakWord(this.targetWord, this.lang);
          return;
        }
        const slotIdx = parseInt(slotEl.dataset.slotIndex);
        this.removeTileFromSlot(slotIdx);
      });
    });

    // Кнопка послушать
    const listenBtn = this.container.querySelector('#wb-listen-btn');
    if (listenBtn) {
      listenBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.targetWord, this.lang);
      });
    }

    // Кнопка подсказки (ставит следующую правильную букву)
    const hintBtn = this.container.querySelector('#wb-hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        if (this.isCompleted) return;
        this.applyHint();
      });
    }

    // Кнопка очистки
    const clearBtn = this.container.querySelector('#wb-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (this.isCompleted) return;
        sound.playLetterClick();
        this.resetSlots();
      });
    }

    // Кнопка перехода к следующему слову (появляется после успешной сборки)
    const nextBtn = this.container.querySelector('#wb-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playLetterClick();
        this.startNewWord();
      });
    }
  }

  selectTile(tileId) {
    const tile = this.availableTiles.find(t => t.id === tileId);
    if (!tile || tile.used) return;

    // Находим первый свободный слот
    const emptySlotIdx = this.slots.findIndex(s => s === null);
    if (emptySlotIdx === -1) return;

    // Помещаем букву в слот
    tile.used = true;
    this.slots[emptySlotIdx] = { letter: tile.letter, tileId: tile.id };

    sound.playLetterClick();
    sound.speakLetter(tile.letter, this.lang);

    this.render();

    // Проверяем, заполнено ли всё слово
    if (!this.slots.includes(null)) {
      this.checkWord();
    }
  }

  removeTileFromSlot(slotIdx) {
    const slot = this.slots[slotIdx];
    if (!slot) return;

    const tile = this.availableTiles.find(t => t.id === slot.tileId);
    if (tile) tile.used = false;

    this.slots[slotIdx] = null;
    sound.playLetterClick();
    this.render();
  }

  resetSlots() {
    this.slots = Array(this.targetWord.length).fill(null);
    this.availableTiles.forEach(t => (t.used = false));
    this.render();
  }

  applyHint() {
    // Находим первый слот, где буква отсутствует или неверна
    let targetIdx = -1;
    for (let i = 0; i < this.targetWord.length; i++) {
      if (!this.slots[i] || this.slots[i].letter !== this.targetWord[i]) {
        targetIdx = i;
        break;
      }
    }

    if (targetIdx === -1) return;

    // Если в этом слоте уже была неправильная буква - освобождаем ее
    if (this.slots[targetIdx]) {
      const wrongTile = this.availableTiles.find(t => t.id === this.slots[targetIdx].tileId);
      if (wrongTile) wrongTile.used = false;
      this.slots[targetIdx] = null;
    }

    const neededChar = this.targetWord[targetIdx];
    // Ищем доступную неиспользованную плитку с нужной буквой
    let candidateTile = this.availableTiles.find(t => !t.used && t.letter === neededChar);

    // Если все такие плитки уже были ошибочно поставлены в другие слоты, найдем и снимем
    if (!candidateTile) {
      for (let s = 0; s < this.slots.length; s++) {
        if (this.slots[s] && this.slots[s].letter === neededChar && s !== targetIdx) {
          const t = this.availableTiles.find(tile => tile.id === this.slots[s].tileId);
          t.used = false;
          this.slots[s] = null;
          candidateTile = t;
          break;
        }
      }
    }

    if (candidateTile) {
      candidateTile.used = true;
      this.slots[targetIdx] = { letter: candidateTile.letter, tileId: candidateTile.id };
      sound.playSuccess();
      sound.speakLetter(candidateTile.letter, this.lang);
      this.render();

      if (!this.slots.includes(null)) {
        this.checkWord();
      }
    }
  }

  checkWord() {
    const currentWord = this.slots.map(s => s.letter).join('');
    if (currentWord === this.targetWord) {
      // Победа!
      this.isCompleted = true;
      this.render();

      sound.playSuccess();
      setTimeout(() => {
        sound.speakWord(this.targetWord, this.lang);
        this.onWordCompleted(this.targetWord);
      }, 400);

      // Не переключаем автоматически: ребенок может еще раз проверить слово и нажать "Дальше"
    } else {
      // Ошибка
      sound.playError();
      const slotsContainer = this.container.querySelector('.wb-slots-container');
      if (slotsContainer) {
        slotsContainer.classList.add('shake');
        setTimeout(() => slotsContainer.classList.remove('shake'), 600);
      }
    }
  }
}
