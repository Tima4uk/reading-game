// Игровой режим: «Собери слово» (Word Builder / Ułóż słowo)
import { WORDS_DATA, WORDS_DATA_HARD, VOWELS, shuffleArray } from './data.js?v=19';
import { sound } from './audio.js?v=19';
import { SYLLABLE_WORDS_DATA } from './kocham-czytac.js?v=19';

export class WordBuilderGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    const savedDiff = localStorage.getItem('wb_difficulty');
    this.difficulty = ['easy', 'syllables', 'hard'].includes(savedDiff) ? savedDiff : 'easy'; // 'easy' | 'syllables' | 'hard'
    this.onWordCompleted = options.onWordCompleted || (() => {});

    this.currentWordItem = null;
    this.targetWord = '';
    this.targetUnits = [];
    this.lastWord = '';
    this.slots = []; // Массив букв/слогов в слотах: [ { letter, tileId } ]
    this.availableTiles = []; // Плитки для выбора: [ { id, letter, used } ]
    this.isCompleted = false;
    this.usedWords = new Set();
    this.speakTimer = null;
  }

  stop() {
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
  }

  setLanguage(lang) {
    if (this.lang !== lang) {
      this.lang = lang;
      this.usedWords.clear();
    }
    this.startNewWord();
  }

  setDifficulty(diff) {
    if (this.difficulty === diff) return;
    this.difficulty = diff;
    localStorage.setItem('wb_difficulty', diff);
    sound.playLetterClick();
    this.usedWords.clear();
    this.startNewWord();
  }

  startNewWord() {
    this.stop();
    this.isCompleted = false;

    const isSyllables = this.difficulty === 'syllables';
    let words = [];
    if (isSyllables) {
      words = SYLLABLE_WORDS_DATA[this.lang] || [];
    } else if (this.difficulty === 'hard') {
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
    let available = words.filter(w => !this.usedWords.has(w.word) && w.word !== this.lastWord);
    if (available.length === 0) {
      this.usedWords.clear();
      available = words.filter(w => w.word !== this.lastWord);
      if (available.length === 0) available = words;
    }

    const shuffledPool = shuffleArray(available);
    this.currentWordItem = shuffledPool[0];
    this.targetWord = this.currentWordItem.word;
    this.lastWord = this.targetWord;
    this.usedWords.add(this.targetWord);

    if (isSyllables && Array.isArray(this.currentWordItem.syllables)) {
      this.targetUnits = [...this.currentWordItem.syllables];
      this.slots = Array(this.targetUnits.length).fill(null);

      // Добавляем 1 слог-ловушку для тренировки внимательного чтения
      const traps = shuffleArray((this.currentWordItem.trapSyllables || []).filter(t => !this.targetUnits.includes(t)));
      const rawTiles = [...this.targetUnits];
      if (traps.length > 0) {
        rawTiles.push(traps[0]);
      }

      const tiles = rawTiles.map((unit, idx) => ({
        id: idx,
        letter: unit,
        used: false
      }));

      let shuffled = shuffleArray(tiles);
      for (let attempt = 0; attempt < 5; attempt++) {
        if (shuffled.slice(0, this.targetUnits.length).map(t => t.letter).join('') !== this.targetWord) break;
        shuffled = shuffleArray(tiles);
      }
      this.availableTiles = shuffled;
    } else {
      this.targetUnits = this.targetWord.split('');
      // Инициализируем пустые слоты
      this.slots = Array(this.targetUnits.length).fill(null);

      // Создаем плитки с буквами и перемешиваем их
      const letters = this.targetUnits.map((letter, idx) => ({
        id: idx,
        letter,
        used: false
      }));

      // Перемешиваем буквы по Фишеру-Йетсу (чтобы не совпадали сразу с ответом)
      let shuffled = shuffleArray(letters);
      for (let attempt = 0; attempt < 5; attempt++) {
        if (shuffled.map(t => t.letter).join('') !== this.targetWord) break;
        shuffled = shuffleArray(letters);
      }
      if (shuffled.map(t => t.letter).join('') === this.targetWord && this.targetWord.length > 2) {
        shuffled.reverse();
      }
      this.availableTiles = shuffled;
    }

    this.render();

    // Озвучиваем подсказку при старте нового слова
    const wordToSpeak = this.targetWord;
    const langToSpeak = this.lang;
    this.speakTimer = setTimeout(() => {
      this.speakTimer = null;
      sound.speakWord(wordToSpeak, langToSpeak);
    }, 350);
  }

  render() {
    const isCompleted = this.isCompleted;
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const isHard = this.difficulty === 'hard';
    const isSyllables = this.difficulty === 'syllables';
    const isExtraLong = !isSyllables && this.targetWord && this.targetWord.length >= 10;

    const easyLabel = isRu ? 'Легкий (3-4 буквы)' : (isPl ? 'Łatwy (3-4 litery)' : 'Easy (3-4 letters)');
    const syllablesLabel = isRu ? 'По слогам' : (isPl ? 'Sylaby' : 'Syllables');
    const hardLabel = isRu ? 'Мастер (5-12 букв)' : (isPl ? 'Mistrz (5-12 liter)' : 'Master (5-12 letters)');
    const listenTitle = isRu ? 'Послушать' : (isPl ? 'Posłuchaj' : 'Listen');
    const listenText = isRu ? 'Послушать слово' : (isPl ? 'Posłuchaj słowa' : 'Listen to word');
    const hintLabel = isRu ? 'Подсказка' : (isPl ? 'Podpowiedź' : 'Hint');
    const clearLabel = isRu ? 'Стереть' : (isPl ? 'Wyczyść' : 'Clear');
    const nextLabel = isRu ? 'Дальше' : (isPl ? 'Dalej' : 'Next');

    this.container.innerHTML = `
      <div class="wb-game ${isHard ? 'wb-hard-mode' : ''} ${isSyllables ? 'wb-syllables-mode' : ''} ${isExtraLong ? 'wb-extra-long' : ''}">
        <!-- Переключатель сложности -->
        <div class="ws-diff-bar">
          <button class="ws-diff-btn ${this.difficulty === 'easy' ? 'active' : ''}" id="wb-diff-easy">
            🐣 ${easyLabel}
          </button>
          <button class="ws-diff-btn ${isSyllables ? 'active' : ''}" id="wb-diff-syllables">
            🧱 ${syllablesLabel}
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
            const colorClass = !isSyllables && letter ? (VOWELS[this.lang].has(letter) ? 'vowel' : 'consonant') : '';
            return `
              <div class="wb-slot ${slot ? 'filled' : 'empty'} ${isCompleted ? 'success-anim' : ''} ${colorClass}" 
                   data-slot-index="${index}"
                   title="${isCompleted ? (isRu ? 'Нажми, чтобы послушать слово' : (isPl ? 'Kliknij, aby posłuchać' : 'Tap to listen')) : ''}">
                ${letter}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Доступные буквы или слоги для нажатия -->
        <div class="wb-tiles-container">
          ${this.availableTiles.map(tile => {
            const colorClass = !isSyllables ? (VOWELS[this.lang].has(tile.letter) ? 'vowel' : 'consonant') : '';
            return `
              <button class="wb-tile ${tile.used ? 'used' : ''} ${colorClass}" 
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
    const btnSyllables = this.container.querySelector('#wb-diff-syllables');
    const btnHard = this.container.querySelector('#wb-diff-hard');
    if (btnEasy) btnEasy.addEventListener('click', () => this.setDifficulty('easy'));
    if (btnSyllables) btnSyllables.addEventListener('click', () => this.setDifficulty('syllables'));
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

    // Проверяем, заполнено ли всё слово
    if (!this.slots.includes(null)) {
      this.checkWord(tile.letter);
    } else {
      if (this.difficulty === 'syllables') {
        sound.speakWord(tile.letter, this.lang);
      } else {
        sound.speakLetter(tile.letter, this.lang);
      }
      this.render();
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
    this.slots = Array(this.targetUnits.length).fill(null);
    this.availableTiles.forEach(t => (t.used = false));
    this.render();
  }

  applyHint() {
    // Находим первый слот, где буква/слог отсутствует или неверен
    let targetIdx = -1;
    for (let i = 0; i < this.targetUnits.length; i++) {
      if (!this.slots[i] || this.slots[i].letter !== this.targetUnits[i]) {
        targetIdx = i;
        break;
      }
    }

    if (targetIdx === -1) return;

    // Если в этом слоте уже была неправильная плитка - освобождаем ее
    if (this.slots[targetIdx]) {
      const wrongTile = this.availableTiles.find(t => t.id === this.slots[targetIdx].tileId);
      if (wrongTile) wrongTile.used = false;
      this.slots[targetIdx] = null;
    }

    const neededUnit = this.targetUnits[targetIdx];
    // Ищем доступную неиспользованную плитку с нужной буквой/слогом
    let candidateTile = this.availableTiles.find(t => !t.used && t.letter === neededUnit);

    // Если все такие плитки уже были ошибочно поставлены в другие слоты, найдем и снимем
    if (!candidateTile) {
      for (let s = 0; s < this.slots.length; s++) {
        if (this.slots[s] && this.slots[s].letter === neededUnit && s !== targetIdx) {
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

      if (!this.slots.includes(null)) {
        this.checkWord(candidateTile.letter);
      } else {
        sound.playSuccess();
        if (this.difficulty === 'syllables') {
          sound.speakWord(candidateTile.letter, this.lang);
        } else {
          sound.speakLetter(candidateTile.letter, this.lang);
        }
        this.render();
      }
    }
  }

  checkWord(lastLetter = '') {
    this.stop();
    const isExactMatch = this.slots.length === this.targetUnits.length &&
      this.slots.every((s, idx) => s && s.letter === this.targetUnits[idx]);
    if (isExactMatch) {
      // Победа!
      this.isCompleted = true;
      this.render();

      sound.playSuccess();
      sound.speakWord(this.targetWord, this.lang);
      this.onWordCompleted(this.targetWord);

      // Не переключаем автоматически: ребенок может еще раз проверить слово и нажать "Дальше"
    } else {
      // Ошибка
      this.render();
      sound.playError();
      if (lastLetter) {
        if (this.difficulty === 'syllables') {
          sound.speakWord(lastLetter, this.lang);
        } else {
          sound.speakLetter(lastLetter, this.lang);
        }
      }
      const slotsContainer = this.container.querySelector('.wb-slots-container');
      if (slotsContainer) {
        slotsContainer.classList.add('shake');
        setTimeout(() => slotsContainer.classList.remove('shake'), 600);
      }
    }
  }
}
