// Модуль «Перевод слов» (Word Translate / Tłumacz Słów)
// Поддерживает 5 режимов:
// 1. Пары карточек (Match Pairs)
// 2. Викторина 1 из 3 (Word Quiz)
// 3. Угадай на слух (Listen & Match)
// 4. Собери перевод (Spell Translation)
// 5. Правда или ловушка? (True / Trap Blitz)
// Направления: EN<->RU, PL<->RU, EN<->PL
// Сложность: Легкий (базовая лексика) и Мастер (продвинутые слова и фразы)

import { TRANSLATIONS_DATA, RUSSIAN_ALPHABET, POLISH_ALPHABET, ENGLISH_ALPHABET, shuffleArray } from './data.js?v=31';
import { sound } from './audio.js?v=31';

export class WordTranslateGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'pairs'; // 'pairs' | 'quiz' | 'listen' | 'spell' | 'blitz'
    this.direction = 'en-ru';
    this.difficulty = 'easy'; // 'easy' | 'hard'

    // Режим 1: Пары карточек
    this.pairsCards = [];
    this.firstSelectedCard = null;
    this.matchedPairsCount = 0;
    this.totalPairsCount = 0;
    this.isLocked = false;
    this.usedPairsWords = new Set();

    // Режим 2: Викторина 1 из 3
    this.quizQuestion = null;
    this.quizOptions = [];
    this.quizAnswered = false;
    this.usedQuizIndexes = new Set();
    this.lastQuizIdx = -1;

    // Режим 3: Угадай на слух
    this.listenQuestion = null;
    this.listenOptions = [];
    this.listenAnswered = false;
    this.usedListenIndexes = new Set();
    this.lastListenIdx = -1;

    // Режим 4: Собери перевод
    this.spellQuestion = null;
    this.spellSlots = [];
    this.spellTiles = [];
    this.spellCompleted = false;
    this.usedSpellIndexes = new Set();
    this.lastSpellIdx = -1;

    // Режим 5: Правда или ловушка?
    this.blitzQuestion = null;
    this.blitzAnswered = false;
    this.blitzResult = null;
    this.blitzStreak = 0;
    this.blitzBest = this.loadBlitzBest();
    this.usedBlitzIndexes = new Set();
    this.lastBlitzIdx = -1;

    this.autoNextTimeout = null;
    this.speakTimeout = null;
    this.feedbackTimeout = null;
  }

  loadBlitzBest() {
    try {
      if (typeof localStorage !== 'undefined') {
        return parseInt(localStorage.getItem('wt_blitz_best') || '0', 10) || 0;
      }
    } catch (_) {}
    return 0;
  }

  saveBlitzBest(val) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('wt_blitz_best', String(val));
      }
    } catch (_) {}
  }

  stop() {
    if (this.autoNextTimeout) {
      clearTimeout(this.autoNextTimeout);
      this.autoNextTimeout = null;
    }
    if (this.speakTimeout) {
      clearTimeout(this.speakTimeout);
      this.speakTimeout = null;
    }
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
      this.feedbackTimeout = null;
    }
  }

  getAvailableDirections() {
    if (this.lang === 'pl') {
      return [
        { id: 'pl-en', label: '🇵🇱 ➔ 🇬🇧 PL → EN' },
        { id: 'en-pl', label: '🇬🇧 ➔ 🇵🇱 EN → PL' },
        { id: 'pl-ru', label: '🇵🇱 ➔ 🇷🇺 PL → RU' },
        { id: 'ru-pl', label: '🇷🇺 ➔ 🇵🇱 RU → PL' }
      ];
    } else if (this.lang === 'en') {
      return [
        { id: 'en-pl', label: '🇬🇧 ➔ 🇵🇱 EN → PL' },
        { id: 'pl-en', label: '🇵🇱 ➔ 🇬🇧 PL → EN' },
        { id: 'en-ru', label: '🇬🇧 ➔ 🇷🇺 EN → RU' },
        { id: 'ru-en', label: '🇷🇺 ➔ 🇬🇧 RU → EN' }
      ];
    } else {
      return [
        { id: 'en-ru', label: '🇬🇧 ➔ 🇷🇺 EN → RU' },
        { id: 'ru-en', label: '🇷🇺 ➔ 🇬🇧 RU → EN' },
        { id: 'pl-ru', label: '🇵🇱 ➔ 🇷🇺 PL → RU' },
        { id: 'ru-pl', label: '🇷🇺 ➔ 🇵🇱 RU → PL' },
        { id: 'pl-en', label: '🇵🇱 ➔ 🇬🇧 PL → EN' },
        { id: 'en-pl', label: '🇬🇧 ➔ 🇵🇱 EN → PL' }
      ];
    }
  }

  setLanguage(lang) {
    this.lang = lang;
    const availableDirs = this.getAvailableDirections().map(d => d.id);
    if (!availableDirs.includes(this.direction)) {
      this.direction = availableDirs[0];
    }
    this.start();
  }

  start() {
    this.stop();
    if (this.subMode === 'pairs') {
      this.startPairsRound();
    } else if (this.subMode === 'quiz') {
      this.startNewQuiz();
    } else if (this.subMode === 'listen') {
      this.startNewListen();
    } else if (this.subMode === 'spell') {
      this.startNewSpell();
    } else {
      this.startNewBlitz();
    }
  }

  getLanguages() {
    switch (this.direction) {
      case 'en-ru': return { from: 'en', to: 'ru', fromTag: 'EN', toTag: 'RU', fromFlag: '🇬🇧', toFlag: '🇷🇺' };
      case 'pl-ru': return { from: 'pl', to: 'ru', fromTag: 'PL', toTag: 'RU', fromFlag: '🇵🇱', toFlag: '🇷🇺' };
      case 'ru-en': return { from: 'ru', to: 'en', fromTag: 'RU', toTag: 'EN', fromFlag: '🇷🇺', toFlag: '🇬🇧' };
      case 'ru-pl': return { from: 'ru', to: 'pl', fromTag: 'RU', toTag: 'PL', fromFlag: '🇷🇺', toFlag: '🇵🇱' };
      case 'pl-en': return { from: 'pl', to: 'en', fromTag: 'PL', toTag: 'EN', fromFlag: '🇵🇱', toFlag: '🇬🇧' };
      case 'en-pl': return { from: 'en', to: 'pl', fromTag: 'EN', toTag: 'PL', fromFlag: '🇬🇧', toFlag: '🇵🇱' };
      default: return { from: 'en', to: 'ru', fromTag: 'EN', toTag: 'RU', fromFlag: '🇬🇧', toFlag: '🇷🇺' };
    }
  }

  getPool() {
    return TRANSLATIONS_DATA.filter(item => {
      return this.difficulty === 'easy' ? item.level === 'easy' : item.level === 'hard';
    });
  }

  pickNextPoolIndex(poolLen, usedSet, lastIdx) {
    let available = [];
    for (let i = 0; i < poolLen; i++) {
      if (!usedSet.has(i) && i !== lastIdx) available.push(i);
    }
    if (available.length === 0) {
      usedSet.clear();
      for (let i = 0; i < poolLen; i++) {
        if (i !== lastIdx) available.push(i);
      }
      if (available.length === 0) available = [0];
    }
    const chosenIdx = shuffleArray(available)[0];
    usedSet.add(chosenIdx);
    return chosenIdx;
  }

  getAlphabetForLang(lang) {
    if (lang === 'ru') return RUSSIAN_ALPHABET;
    if (lang === 'pl') return POLISH_ALPHABET;
    return ENGLISH_ALPHABET;
  }

  // ========================================================
  // РЕЖИМ 1: ПАРЫ КАРТОЧЕК (MATCH PAIRS)
  // ========================================================
  startPairsRound() {
    this.stop();
    this.firstSelectedCard = null;
    this.matchedPairsCount = 0;
    this.isLocked = false;

    const pool = this.getPool();
    const count = this.difficulty === 'easy' ? 4 : 6;
    this.totalPairsCount = Math.min(count, pool.length);

    let freshPool = pool.filter(item => !this.usedPairsWords.has(item.en));
    if (freshPool.length < this.totalPairsCount) {
      this.usedPairsWords.clear();
      freshPool = pool;
    }
    const shuffledPool = shuffleArray(freshPool);
    const selectedItems = shuffledPool.slice(0, this.totalPairsCount);
    selectedItems.forEach(item => this.usedPairsWords.add(item.en));

    const { from, to, fromTag, toTag } = this.getLanguages();

    const cards = [];
    selectedItems.forEach((item, idx) => {
      cards.push({
        id: `from-${idx}`,
        pairId: idx,
        text: item[from],
        emoji: item.emoji,
        lang: from,
        tag: fromTag,
        type: 'source',
        matched: false
      });
      cards.push({
        id: `to-${idx}`,
        pairId: idx,
        text: item[to],
        emoji: item.emoji,
        lang: to,
        tag: toTag,
        type: 'target',
        matched: false
      });
    });

    this.pairsCards = shuffleArray(cards);
    this.render();
  }

  handleCardClick(cardId) {
    if (this.isLocked) return;

    const card = this.pairsCards.find(c => c.id === cardId);
    if (!card || card.matched) return;

    sound.playLetterClick();
    sound.speakWord(card.text, card.lang);

    const cardEl = this.container.querySelector(`.wt-card[data-card-id="${cardId}"]`);

    if (!this.firstSelectedCard) {
      this.firstSelectedCard = card;
      if (cardEl) cardEl.classList.add('selected');
      return;
    }

    if (this.firstSelectedCard.id === card.id) {
      this.firstSelectedCard = null;
      if (cardEl) cardEl.classList.remove('selected');
      return;
    }

    const firstCardEl = this.container.querySelector(`.wt-card[data-card-id="${this.firstSelectedCard.id}"]`);
    const isMatch = (card.pairId === this.firstSelectedCard.pairId && card.type !== this.firstSelectedCard.type);

    if (isMatch) {
      card.matched = true;
      this.firstSelectedCard.matched = true;

      if (cardEl) {
        cardEl.classList.remove('selected');
        cardEl.classList.add('matched');
      }
      if (firstCardEl) {
        firstCardEl.classList.remove('selected');
        firstCardEl.classList.add('matched');
      }

      sound.playSuccess();
      this.firstSelectedCard = null;
      this.matchedPairsCount++;

      if (this.matchedPairsCount === this.totalPairsCount) {
        this.firstSelectedCard = null;
        try {
          sound.playVictory();
        } catch (e) {
          console.warn(e);
        }
        try {
          this.onStarEarned(3);
        } catch (e) {}
        try {
          this.onWinEffect();
        } catch (e) {}

        this.render();
      }
    } else {
      this.isLocked = true;
      sound.playError();

      if (cardEl) cardEl.classList.add('shake', 'wrong');
      if (firstCardEl) firstCardEl.classList.add('shake', 'wrong');

      this.feedbackTimeout = setTimeout(() => {
        this.feedbackTimeout = null;
        if (cardEl) cardEl.classList.remove('selected', 'shake', 'wrong');
        if (firstCardEl) firstCardEl.classList.remove('selected', 'shake', 'wrong');
        this.firstSelectedCard = null;
        this.isLocked = false;
      }, 650);
    }
  }

  // ========================================================
  // РЕЖИМ 2: ВИКТОРИНА 1 ИЗ 3 (WORD QUIZ)
  // ========================================================
  startNewQuiz() {
    this.stop();
    this.quizAnswered = false;
    const pool = this.getPool();
    const { from, to } = this.getLanguages();

    const targetIdx = this.pickNextPoolIndex(pool.length, this.usedQuizIndexes, this.lastQuizIdx);
    this.lastQuizIdx = targetIdx;

    const questionItem = pool[targetIdx];
    this.quizQuestion = {
      emoji: questionItem.emoji,
      sourceWord: questionItem[from],
      targetWord: questionItem[to],
      fromLang: from,
      toLang: to
    };

    const options = [questionItem[to]];
    const otherItems = shuffleArray(pool.filter((_, idx) => idx !== targetIdx));

    for (const item of otherItems) {
      if (options.length >= 3) break;
      if (!options.includes(item[to])) {
        options.push(item[to]);
      }
    }

    this.quizOptions = shuffleArray(options);
    this.render();

    const wordToSpeak = this.quizQuestion.sourceWord;
    const langToSpeak = this.quizQuestion.fromLang;
    this.speakTimeout = setTimeout(() => {
      this.speakTimeout = null;
      sound.speakWord(wordToSpeak, langToSpeak);
    }, 300);
  }

  handleQuizAnswer(selectedOption, btnEl) {
    if (this.quizAnswered) return;

    if (selectedOption === this.quizQuestion.targetWord) {
      this.stop();
      this.quizAnswered = true;
      if (btnEl) btnEl.classList.add('correct');
      sound.playSuccess();
      sound.speakWord(this.quizQuestion.targetWord, this.quizQuestion.toLang);

      this.onStarEarned(1);
      this.onWinEffect();

      this.autoNextTimeout = setTimeout(() => {
        this.autoNextTimeout = null;
        this.startNewQuiz();
      }, 1700);
    } else {
      if (btnEl) btnEl.classList.add('shake', 'wrong');
      sound.playError();
      this.feedbackTimeout = setTimeout(() => {
        this.feedbackTimeout = null;
        if (btnEl) btnEl.classList.remove('shake');
      }, 500);
    }
  }

  // ========================================================
  // РЕЖИМ 3: УГАДАЙ НА СЛУХ (LISTEN & MATCH)
  // ========================================================
  startNewListen() {
    this.stop();
    this.listenAnswered = false;
    const pool = this.getPool();
    const { from, to, fromTag, toTag, fromFlag, toFlag } = this.getLanguages();

    const targetIdx = this.pickNextPoolIndex(pool.length, this.usedListenIndexes, this.lastListenIdx);
    this.lastListenIdx = targetIdx;

    const item = pool[targetIdx];
    this.listenQuestion = {
      emoji: item.emoji,
      sourceWord: item[from],
      targetWord: item[to],
      fromLang: from,
      toLang: to,
      fromTag,
      toTag,
      fromFlag,
      toFlag
    };

    const options = [{ emoji: item.emoji, text: item[to], isCorrect: true }];
    const otherItems = shuffleArray(pool.filter((_, idx) => idx !== targetIdx));

    for (const other of otherItems) {
      if (options.length >= 4) break;
      if (!options.some(o => o.text === other[to])) {
        options.push({ emoji: other.emoji, text: other[to], isCorrect: false });
      }
    }

    this.listenOptions = shuffleArray(options);
    this.render();

    const wordToSpeak = this.listenQuestion.sourceWord;
    const langToSpeak = this.listenQuestion.fromLang;
    this.speakTimeout = setTimeout(() => {
      this.speakTimeout = null;
      sound.speakWord(wordToSpeak, langToSpeak);
    }, 300);
  }

  handleListenAnswer(idx, btnEl) {
    if (this.listenAnswered || !this.listenQuestion) return;
    const opt = this.listenOptions[idx];
    if (!opt) return;

    if (opt.isCorrect) {
      this.stop();
      this.listenAnswered = true;
      if (btnEl) btnEl.classList.add('correct');

      const revealEl = this.container && this.container.querySelector('#wt-listen-reveal');
      if (revealEl) {
        revealEl.textContent = this.listenQuestion.sourceWord;
        revealEl.classList.add('revealed');
      }

      sound.playSuccess();
      sound.speakWord(this.listenQuestion.targetWord, this.listenQuestion.toLang);

      this.onStarEarned(1);
      this.onWinEffect();

      this.autoNextTimeout = setTimeout(() => {
        this.autoNextTimeout = null;
        this.startNewListen();
      }, 1700);
    } else {
      if (btnEl) btnEl.classList.add('shake', 'wrong');
      sound.playError();
      const q = this.listenQuestion;
      this.feedbackTimeout = setTimeout(() => {
        this.feedbackTimeout = null;
        if (btnEl) btnEl.classList.remove('shake');
        if (!this.listenAnswered && this.listenQuestion === q) {
          sound.speakWord(q.sourceWord, q.fromLang);
        }
      }, 450);
    }
  }

  // ========================================================
  // РЕЖИМ 4: СОБЕРИ ПЕРЕВОД (SPELL TRANSLATION)
  // ========================================================
  getSpellPool() {
    const { to } = this.getLanguages();
    const pool = this.getPool();
    const singleWords = pool.filter(item => {
      const target = item[to];
      return target && !target.includes(' ') && target.length <= 12;
    });
    return singleWords.length > 0 ? singleWords : pool;
  }

  startNewSpell() {
    this.stop();
    this.spellCompleted = false;

    const pool = this.getSpellPool();
    const { from, to, fromTag, toTag, fromFlag, toFlag } = this.getLanguages();

    const targetIdx = this.pickNextPoolIndex(pool.length, this.usedSpellIndexes, this.lastSpellIdx);
    this.lastSpellIdx = targetIdx;

    const item = pool[targetIdx];
    const targetWord = item[to].toUpperCase();

    this.spellQuestion = {
      emoji: item.emoji,
      sourceWord: item[from],
      targetWord,
      fromLang: from,
      toLang: to,
      fromTag,
      toTag,
      fromFlag,
      toFlag
    };

    this.spellSlots = Array(targetWord.length).fill(null);

    const rawLetters = targetWord.split('');
    if (this.difficulty === 'hard') {
      const trapCount = targetWord.length <= 10 ? 2 : 1;
      const alphabet = this.getAlphabetForLang(to);
      const traps = shuffleArray(alphabet.filter(ch => !rawLetters.includes(ch)));
      for (let i = 0; i < trapCount && i < traps.length; i++) {
        rawLetters.push(traps[i]);
      }
    }

    const tiles = rawLetters.map((letter, idx) => ({
      id: idx,
      letter,
      used: false
    }));

    let shuffled = shuffleArray(tiles);
    for (let attempt = 0; attempt < 5; attempt++) {
      if (shuffled.slice(0, targetWord.length).map(t => t.letter).join('') !== targetWord) break;
      shuffled = shuffleArray(tiles);
    }
    if (shuffled.slice(0, targetWord.length).map(t => t.letter).join('') === targetWord && targetWord.length > 2) {
      shuffled.reverse();
    }

    this.spellTiles = shuffled;
    this.render();

    const wordToSpeak = this.spellQuestion.sourceWord;
    const langToSpeak = this.spellQuestion.fromLang;
    this.speakTimeout = setTimeout(() => {
      this.speakTimeout = null;
      sound.speakWord(wordToSpeak, langToSpeak);
    }, 300);
  }

  handleSpellTileClick(tileId) {
    if (this.spellCompleted) return;
    const tile = this.spellTiles.find(t => t.id === tileId);
    if (!tile || tile.used) return;

    const emptyIdx = this.spellSlots.findIndex(s => s === null);
    if (emptyIdx === -1) return;

    tile.used = true;
    this.spellSlots[emptyIdx] = { id: tile.id, letter: tile.letter };
    sound.playLetterClick();
    this.checkSpellWord();
  }

  handleSpellSlotClick(slotIdx) {
    if (this.spellCompleted) {
      if (this.spellQuestion) {
        sound.speakWord(this.spellQuestion.targetWord, this.spellQuestion.toLang);
      }
      return;
    }

    const slot = this.spellSlots[slotIdx];
    if (!slot) return;

    const tile = this.spellTiles.find(t => t.id === slot.id);
    if (tile) tile.used = false;
    this.spellSlots[slotIdx] = null;
    sound.playLetterClick();
    this.render();
  }

  handleSpellHint() {
    if (this.spellCompleted || !this.spellQuestion) return;

    const target = this.spellQuestion.targetWord;
    let targetSlotIdx = -1;
    for (let i = 0; i < target.length; i++) {
      if (!this.spellSlots[i] || this.spellSlots[i].letter !== target[i]) {
        targetSlotIdx = i;
        break;
      }
    }
    if (targetSlotIdx === -1) return;

    // Если в целевом слоте стоит неверная буква, возвращаем её на лоток
    if (this.spellSlots[targetSlotIdx]) {
      const prevTile = this.spellTiles.find(t => t.id === this.spellSlots[targetSlotIdx].id);
      if (prevTile) prevTile.used = false;
      this.spellSlots[targetSlotIdx] = null;
    }

    const neededChar = target[targetSlotIdx];
    let tile = this.spellTiles.find(t => !t.used && t.letter === neededChar);

    // Если нужная буква уже поставлена в неверный слот дальше, освобождаем её оттуда
    if (!tile) {
      for (let j = targetSlotIdx + 1; j < this.spellSlots.length; j++) {
        if (this.spellSlots[j] && this.spellSlots[j].letter === neededChar) {
          const movedTile = this.spellTiles.find(t => t.id === this.spellSlots[j].id);
          if (movedTile) movedTile.used = false;
          this.spellSlots[j] = null;
          tile = movedTile;
          break;
        }
      }
    }

    if (!tile) return;

    tile.used = true;
    this.spellSlots[targetSlotIdx] = { id: tile.id, letter: tile.letter };
    sound.playLetterClick();
    this.checkSpellWord();
  }

  handleSpellClear() {
    if (this.spellCompleted) return;
    this.spellSlots.fill(null);
    this.spellTiles.forEach(t => { t.used = false; });
    sound.playLetterClick();
    this.render();
  }

  checkSpellWord() {
    if (!this.spellQuestion) return;
    const allFilled = this.spellSlots.every(s => s !== null);

    if (!allFilled) {
      this.render();
      return;
    }

    const assembled = this.spellSlots.map(s => s.letter).join('');
    if (assembled === this.spellQuestion.targetWord) {
      this.stop();
      this.spellCompleted = true;
      sound.playSuccess();
      sound.speakWord(this.spellQuestion.targetWord, this.spellQuestion.toLang);

      this.onStarEarned(2);
      this.onWinEffect();
      this.render();

      this.autoNextTimeout = setTimeout(() => {
        this.autoNextTimeout = null;
        this.startNewSpell();
      }, 2000);
    } else {
      this.render();
      sound.playError();
      const slotsEl = this.container && this.container.querySelector('.wb-slots-container');
      if (slotsEl) {
        slotsEl.classList.add('shake');
        this.feedbackTimeout = setTimeout(() => {
          this.feedbackTimeout = null;
          slotsEl.classList.remove('shake');
        }, 500);
      }
    }
  }

  // ========================================================
  // РЕЖИМ 5: ПРАВДА ИЛИ ЛОВУШКА? (TRUE / TRAP BLITZ)
  // ========================================================
  startNewBlitz() {
    this.stop();
    this.blitzAnswered = false;
    this.blitzResult = null;

    const pool = this.getPool();
    const { from, to, fromTag, toTag, fromFlag, toFlag } = this.getLanguages();

    const targetIdx = this.pickNextPoolIndex(pool.length, this.usedBlitzIndexes, this.lastBlitzIdx);
    this.lastBlitzIdx = targetIdx;

    const item = pool[targetIdx];
    const isTrue = Math.random() < 0.5;
    let shownTarget = item[to];

    if (!isTrue) {
      const distractors = shuffleArray(pool.filter((_, idx) => idx !== targetIdx));
      const alt = distractors.find(other => other[to] !== item[to]);
      if (alt) {
        shownTarget = alt[to];
      }
    }

    this.blitzQuestion = {
      emoji: item.emoji,
      sourceWord: item[from],
      correctTarget: item[to],
      shownTarget,
      isTrue: shownTarget === item[to],
      fromLang: from,
      toLang: to,
      fromTag,
      toTag,
      fromFlag,
      toFlag
    };

    this.render();

    const wordToSpeak = this.blitzQuestion.sourceWord;
    const langToSpeak = this.blitzQuestion.fromLang;
    this.speakTimeout = setTimeout(() => {
      this.speakTimeout = null;
      sound.speakWord(wordToSpeak, langToSpeak);
    }, 250);
  }

  handleBlitzAnswer(userSaysTrue) {
    if (this.blitzAnswered || !this.blitzQuestion) return;

    this.stop();
    this.blitzAnswered = true;

    const isRight = (userSaysTrue === this.blitzQuestion.isTrue);
    this.blitzResult = { isRight, chosenTrue: userSaysTrue };

    if (isRight) {
      this.blitzStreak++;
      if (this.blitzStreak > this.blitzBest) {
        this.blitzBest = this.blitzStreak;
        this.saveBlitzBest(this.blitzBest);
      }
      sound.playSuccess();
      sound.speakWord(this.blitzQuestion.correctTarget, this.blitzQuestion.toLang);

      const stars = (this.blitzStreak > 0 && this.blitzStreak % 5 === 0) ? 2 : 1;
      this.onStarEarned(stars);
      this.onWinEffect();
      this.render();

      this.autoNextTimeout = setTimeout(() => {
        this.autoNextTimeout = null;
        this.startNewBlitz();
      }, 1500);
    } else {
      this.blitzStreak = 0;
      sound.playError();
      sound.speakWord(this.blitzQuestion.correctTarget, this.blitzQuestion.toLang);
      this.render();

      this.autoNextTimeout = setTimeout(() => {
        this.autoNextTimeout = null;
        this.startNewBlitz();
      }, 2200);
    }
  }

  // ========================================================
  // ОТРИСОВКА ИНТЕРФЕЙСА (RENDER)
  // ========================================================
  getSubnavItems() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    return [
      { id: 'pairs', icon: '🃏', label: isRu ? 'Пары' : (isPl ? 'Pary' : 'Pairs') },
      { id: 'quiz', icon: '🎯', label: isRu ? 'Викторина' : 'Quiz' },
      { id: 'listen', icon: '🎧', label: isRu ? 'На слух' : (isPl ? 'Ze słuchu' : 'Listen') },
      { id: 'spell', icon: '✍️', label: isRu ? 'Собери перевод' : (isPl ? 'Ułóż słowo' : 'Spell') },
      { id: 'blitz', icon: '⚡', label: isRu ? 'Правда / Ловушка' : (isPl ? 'Prawda / Pułapka' : 'True / False') }
    ];
  }

  render() {
    if (!this.container) return;
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';

    const easyLabel = isRu ? '🐣 Легкий' : (isPl ? '🐣 Łatwy' : '🐣 Easy');
    const hardLabel = isRu ? '🚀 Мастер' : (isPl ? '🚀 Mistrz' : '🚀 Master');
    const isRoundWon = (this.subMode === 'pairs' && this.matchedPairsCount === this.totalPairsCount && this.totalPairsCount > 0);
    const subnavItems = this.getSubnavItems();

    let modeHTML = '';
    if (this.subMode === 'pairs') modeHTML = this.renderPairsContent(isRoundWon);
    else if (this.subMode === 'quiz') modeHTML = this.renderQuizContent();
    else if (this.subMode === 'listen') modeHTML = this.renderListenContent();
    else if (this.subMode === 'spell') modeHTML = this.renderSpellContent();
    else modeHTML = this.renderBlitzContent();

    this.container.innerHTML = `
      <div class="wt-wrapper">
        <!-- 5 подрежимов в едином стиле .ab-subnav -->
        <div class="ab-subnav">
          ${subnavItems.map(item => `
            <button type="button"
                    class="ab-subnav-btn wt-subnav-btn ${this.subMode === item.id ? 'active' : ''}"
                    id="wt-btn-${item.id}"
                    data-submode="${item.id}">
              ${item.icon} ${item.label}
            </button>
          `).join('')}
        </div>

        <!-- Сложность: Легкий / Мастер -->
        <div class="wt-controls-row">
          <div class="ws-diff-bar">
            <button type="button" class="ws-diff-btn ${this.difficulty === 'easy' ? 'active' : ''}" id="wt-diff-easy">
              ${easyLabel}
            </button>
            <button type="button" class="ws-diff-btn ${this.difficulty === 'hard' ? 'active' : ''}" id="wt-diff-hard">
              ${hardLabel}
            </button>
          </div>
        </div>

        <!-- Полоса выбора языкового направления -->
        <div class="wt-direction-bar">
          ${this.getAvailableDirections().map(dir => `
            <button type="button" class="wt-dir-btn ${this.direction === dir.id ? 'active' : ''}" data-dir="${dir.id}">
              ${dir.label}
            </button>
          `).join('')}
        </div>

        <!-- Основная игровая зона -->
        <div class="wt-content-area">
          ${modeHTML}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderPairsContent(isRoundWon) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const nextRoundLabel = isRu ? 'Следующий раунд ➔' : (isPl ? 'Następna runda ➔' : 'Next Round ➔');
    const newCardsLabel = isRu ? 'Новые карточки 🔄' : (isPl ? 'Nowe karty 🔄' : 'New cards 🔄');
    const winTitle = isRu ? 'Все пары найдены! +3 ⭐' : (isPl ? 'Wszystkie pary dopasowane! +3 ⭐' : 'All pairs matched! +3 ⭐');

    return `
      <div class="wt-cards-grid ${this.difficulty === 'hard' ? 'grid-hard' : ''}">
        ${this.pairsCards.map(card => `
          <button type="button" class="wt-card ${card.matched ? 'matched' : ''} ${card.type}"
                  data-card-id="${card.id}"
                  ${card.matched ? 'disabled' : ''}>
            <div class="wt-card-badge">${card.tag}</div>
            ${this.difficulty === 'easy' && card.type === 'source' ? `<div class="wt-card-emoji">${card.emoji}</div>` : ''}
            <div class="wt-card-text">${card.text}</div>
          </button>
        `).join('')}
      </div>

      <div class="wt-controls-bar">
        ${isRoundWon ? `
          <div class="wt-completed-banner">🎉 ${winTitle}</div>
          <button type="button" class="wb-ctrl-btn btn-next wt-pulse-btn" id="wt-next-round-btn">
            ${nextRoundLabel}
          </button>
        ` : `
          <button type="button" class="wb-ctrl-btn btn-refresh" id="wt-next-round-btn">
            ${newCardsLabel}
          </button>
        `}
      </div>
    `;
  }

  renderQuizContent() {
    if (!this.quizQuestion) return '';

    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const questionHint = isRu ? 'Как переводится это слово?' : (isPl ? 'Jak to przetłumaczyć?' : 'What is the translation?');
    const listenTitle = isRu ? 'Послушать слово' : (isPl ? 'Posłuchaj słowa' : 'Listen');

    return `
      <div class="wt-quiz-container">
        <div class="wt-quiz-card">
          <div class="wt-quiz-hint">${questionHint}</div>
          ${this.difficulty === 'easy' ? `<div class="wt-quiz-emoji">${this.quizQuestion.emoji}</div>` : ''}
          <div class="wt-quiz-source">${this.quizQuestion.sourceWord}</div>
          <button type="button" class="wb-listen-btn" id="wt-listen-btn" title="${listenTitle}">
            🔊 ${listenTitle}
          </button>
        </div>

        <div class="wt-quiz-options">
          ${this.quizOptions.map(opt => `
            <button type="button" class="wt-quiz-btn" data-option="${opt}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderListenContent() {
    if (!this.listenQuestion) return '';

    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const q = this.listenQuestion;
    const promptText = isRu
      ? 'Послушай слово и выбери перевод:'
      : (isPl ? 'Posłuchaj słowa i wskaż tłumaczenie:' : 'Listen to the word and pick the translation:');
    const listenTitle = isRu ? 'Послушать ещё раз' : (isPl ? 'Posłuchaj jeszcze raz' : 'Listen again');

    return `
      <div class="wt-quiz-container">
        <div class="wt-quiz-card wt-listen-card">
          <div class="wt-quiz-hint">${promptText}</div>
          <button type="button" class="wt-listen-play-btn" id="wt-listen-play-btn" title="${listenTitle}">
            <span class="wt-listen-play-icon">🔊</span>
            <span class="wt-listen-play-lang">${q.fromFlag} ${q.fromTag}</span>
          </button>
          <div class="wt-listen-reveal ${this.listenAnswered ? 'revealed' : ''}" id="wt-listen-reveal">
            ${this.listenAnswered ? q.sourceWord : '• • •'}
          </div>
        </div>

        <div class="wt-listen-grid">
          ${this.listenOptions.map((opt, idx) => `
            <button type="button" class="wt-listen-opt" data-opt-idx="${idx}">
              <span class="wt-listen-emoji">${opt.emoji}</span>
              <span class="wt-listen-word">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderSpellContent() {
    if (!this.spellQuestion) return '';

    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const q = this.spellQuestion;
    const isLong = q.targetWord.length >= 6;
    const isExtraLong = q.targetWord.length >= 10;

    const hintLabel = isRu ? 'Подсказка' : (isPl ? 'Podpowiedź' : 'Hint');
    const clearLabel = isRu ? 'Стереть' : (isPl ? 'Wyczyść' : 'Clear');
    const nextLabel = isRu ? 'Дальше' : (isPl ? 'Dalej' : 'Next');
    const listenTitle = isRu ? 'Послушать' : (isPl ? 'Posłuchaj' : 'Listen');
    const promptLabel = isRu
      ? `Собери перевод (${q.toFlag} ${q.toTag}):`
      : (isPl ? `Ułóż tłumaczenie (${q.toFlag} ${q.toTag}):` : `Spell the translation (${q.toFlag} ${q.toTag}):`);

    return `
      <div class="wt-spell-container ${isLong ? 'wb-hard-mode' : ''} ${isExtraLong ? 'wb-extra-long' : ''}">
        <div class="wt-quiz-card wt-spell-card">
          <div class="wt-spell-pair-badge">${q.fromFlag} ${q.fromTag} ➔ ${q.toFlag} ${q.toTag}</div>
          <div class="wt-quiz-emoji">${q.emoji}</div>
          <div class="wt-quiz-source">${q.sourceWord}</div>
          <div class="wt-quiz-hint">${promptLabel}</div>
          <button type="button" class="wb-listen-btn" id="wt-spell-listen" title="${listenTitle}">
            🔊 ${q.fromFlag} ${listenTitle}
          </button>
        </div>

        <div class="wb-slots-container">
          ${this.spellSlots.map((slot, index) => `
            <div class="wb-slot ${slot ? 'filled' : 'empty'} ${this.spellCompleted ? 'success-anim' : ''}"
                 data-slot-index="${index}">
              ${slot ? slot.letter : ''}
            </div>
          `).join('')}
        </div>

        <div class="wb-tiles-container">
          ${this.spellTiles.map(tile => `
            <button type="button" class="wb-tile ${tile.used ? 'used' : ''}"
                    data-tile-id="${tile.id}"
                    ${tile.used ? 'disabled' : ''}>
              ${tile.letter}
            </button>
          `).join('')}
        </div>

        <div class="wb-controls">
          ${this.spellCompleted ? `
            <button type="button" class="wb-ctrl-btn btn-next" id="wt-spell-next">
              ${nextLabel} ➔
            </button>
          ` : `
            <button type="button" class="wb-ctrl-btn btn-hint" id="wt-spell-hint">
              💡 ${hintLabel}
            </button>
            <button type="button" class="wb-ctrl-btn btn-clear" id="wt-spell-clear">
              ↺ ${clearLabel}
            </button>
          `}
        </div>
      </div>
    `;
  }

  renderBlitzContent() {
    if (!this.blitzQuestion) return '';

    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const q = this.blitzQuestion;

    const streakText = isRu
      ? `🔥 Серия: ${this.blitzStreak}`
      : (isPl ? `🔥 Seria: ${this.blitzStreak}` : `🔥 Streak: ${this.blitzStreak}`);
    const bestText = isRu
      ? `🏆 Рекорд: ${this.blitzBest}`
      : (isPl ? `🏆 Rekord: ${this.blitzBest}` : `🏆 Best: ${this.blitzBest}`);
    const promptText = isRu
      ? 'Верный перевод или ловушка?'
      : (isPl ? 'Prawdziwe tłumaczenie czy pułapka?' : 'True translation or trap?');
    const trueLabel = isRu ? '✅ Верно' : (isPl ? '✅ Prawda' : '✅ True');
    const falseLabel = isRu ? '❌ Ловушка' : (isPl ? '❌ Pułapka' : '❌ Trap');
    const listenTitle = isRu ? 'Послушать' : (isPl ? 'Posłuchaj' : 'Listen');

    let cardStateClass = '';
    if (this.blitzAnswered && this.blitzResult) {
      cardStateClass = this.blitzResult.isRight ? 'is-correct' : 'is-wrong';
    }

    let feedbackHTML = '';
    if (this.blitzAnswered && this.blitzResult) {
      if (this.blitzResult.isRight) {
        const praise = isRu ? 'Точно!' : (isPl ? 'Brawo!' : 'Spot on!');
        feedbackHTML = `<div class="wt-blitz-feedback is-ok">${q.emoji} ${praise} <strong>${q.sourceWord} = ${q.correctTarget}</strong></div>`;
      } else {
        const rightAnswerLbl = isRu ? 'Правильно:' : (isPl ? 'Poprawnie:' : 'Correct:');
        feedbackHTML = `<div class="wt-blitz-feedback is-bad">${q.emoji} ${rightAnswerLbl} <strong>${q.sourceWord} = ${q.correctTarget}</strong></div>`;
      }
    }

    return `
      <div class="wt-blitz-container">
        <div class="wt-blitz-streak-bar">
          <span class="wt-streak-pill">${streakText}</span>
          <span class="wt-streak-pill best">${bestText}</span>
        </div>

        <div class="wt-blitz-card ${cardStateClass}">
          <div class="wt-quiz-hint">${promptText}</div>
          <div class="wt-blitz-pair">
            <span class="wt-blitz-word-pill">${q.fromFlag} ${q.sourceWord}</span>
            <span class="wt-blitz-eq">=</span>
            <span class="wt-blitz-word-pill target">${q.toFlag} ${q.shownTarget}</span>
          </div>
          <button type="button" class="wb-listen-btn" id="wt-blitz-listen" title="${listenTitle}">
            🔊 ${q.fromFlag} ${listenTitle}
          </button>
          ${feedbackHTML}
        </div>

        <div class="wt-blitz-actions">
          <button type="button"
                  class="wt-blitz-btn btn-true ${this.blitzAnswered && this.blitzResult && this.blitzResult.chosenTrue ? 'is-picked' : ''}"
                  id="wt-blitz-true"
                  ${this.blitzAnswered ? 'disabled' : ''}>
            ${trueLabel}
          </button>
          <button type="button"
                  class="wt-blitz-btn btn-false ${this.blitzAnswered && this.blitzResult && !this.blitzResult.chosenTrue ? 'is-picked' : ''}"
                  id="wt-blitz-false"
                  ${this.blitzAnswered ? 'disabled' : ''}>
            ${falseLabel}
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    this.container.querySelectorAll('.wt-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextMode = btn.dataset.submode;
        if (!nextMode || this.subMode === nextMode) return;
        this.subMode = nextMode;
        sound.playLetterClick();
        this.start();
      });
    });

    const btnEasy = this.container.querySelector('#wt-diff-easy');
    const btnHard = this.container.querySelector('#wt-diff-hard');

    if (btnEasy) {
      btnEasy.addEventListener('click', () => {
        if (this.difficulty === 'easy') return;
        this.difficulty = 'easy';
        sound.playLetterClick();
        this.start();
      });
    }

    if (btnHard) {
      btnHard.addEventListener('click', () => {
        if (this.difficulty === 'hard') return;
        this.difficulty = 'hard';
        sound.playLetterClick();
        this.start();
      });
    }

    const dirBtns = this.container.querySelectorAll('.wt-dir-btn');
    dirBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.dir;
        if (this.direction === dir) return;
        this.direction = dir;
        sound.playLetterClick();
        this.start();
      });
    });

    if (this.subMode === 'pairs') {
      this.container.querySelectorAll('.wt-card').forEach(cardEl => {
        cardEl.addEventListener('click', () => {
          this.handleCardClick(cardEl.dataset.cardId);
        });
      });

      const nextRoundBtn = this.container.querySelector('#wt-next-round-btn');
      if (nextRoundBtn) {
        nextRoundBtn.addEventListener('click', () => {
          sound.playLetterClick();
          this.startPairsRound();
        });
      }
      return;
    }

    if (this.subMode === 'quiz') {
      const listenBtn = this.container.querySelector('#wt-listen-btn');
      if (listenBtn && this.quizQuestion) {
        listenBtn.addEventListener('click', () => {
          sound.speakWord(this.quizQuestion.sourceWord, this.quizQuestion.fromLang);
        });
      }

      this.container.querySelectorAll('.wt-quiz-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.handleQuizAnswer(btn.dataset.option, btn);
        });
      });
      return;
    }

    if (this.subMode === 'listen') {
      const playBtn = this.container.querySelector('#wt-listen-play-btn');
      if (playBtn && this.listenQuestion) {
        playBtn.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakWord(this.listenQuestion.sourceWord, this.listenQuestion.fromLang);
        });
      }

      this.container.querySelectorAll('.wt-listen-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.optIdx, 10);
          this.handleListenAnswer(idx, btn);
        });
      });
      return;
    }

    if (this.subMode === 'spell') {
      const listenBtn = this.container.querySelector('#wt-spell-listen');
      if (listenBtn && this.spellQuestion) {
        listenBtn.addEventListener('click', () => {
          sound.speakWord(this.spellQuestion.sourceWord, this.spellQuestion.fromLang);
        });
      }

      this.container.querySelectorAll('.wb-tile').forEach(btn => {
        btn.addEventListener('click', () => {
          const tileId = parseInt(btn.dataset.tileId, 10);
          this.handleSpellTileClick(tileId);
        });
      });

      this.container.querySelectorAll('.wb-slot').forEach(slotEl => {
        slotEl.addEventListener('click', () => {
          const slotIdx = parseInt(slotEl.dataset.slotIndex, 10);
          this.handleSpellSlotClick(slotIdx);
        });
      });

      const hintBtn = this.container.querySelector('#wt-spell-hint');
      if (hintBtn) hintBtn.addEventListener('click', () => this.handleSpellHint());

      const clearBtn = this.container.querySelector('#wt-spell-clear');
      if (clearBtn) clearBtn.addEventListener('click', () => this.handleSpellClear());

      const nextBtn = this.container.querySelector('#wt-spell-next');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          sound.playLetterClick();
          this.startNewSpell();
        });
      }
      return;
    }

    if (this.subMode === 'blitz') {
      const listenBtn = this.container.querySelector('#wt-blitz-listen');
      if (listenBtn && this.blitzQuestion) {
        listenBtn.addEventListener('click', () => {
          sound.speakWord(this.blitzQuestion.sourceWord, this.blitzQuestion.fromLang);
        });
      }

      const trueBtn = this.container.querySelector('#wt-blitz-true');
      const falseBtn = this.container.querySelector('#wt-blitz-false');
      if (trueBtn) trueBtn.addEventListener('click', () => this.handleBlitzAnswer(true));
      if (falseBtn) falseBtn.addEventListener('click', () => this.handleBlitzAnswer(false));
    }
  }
}
