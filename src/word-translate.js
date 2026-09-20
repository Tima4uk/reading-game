// Модуль «Перевод слов» (Word Translate / Tłumacz Słów)
// Поддерживает:
// 1. Пары карточек (Match Pairs)
// 2. Викторина 1 из 3 (Word Quiz)
// Направления: EN->RU, PL->RU, RU->EN, RU->PL
// Сложность: Легкий (3-4 буквы / базовый) и Мастер (детективные слова, фразовые глаголы)

import { TRANSLATIONS_DATA, PRAISE_PHRASES } from './data.js';
import { sound } from './audio.js';

export class WordTranslateGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'pairs'; // 'pairs' | 'quiz'
    this.direction = 'en-ru'; // 'en-ru' | 'pl-ru' | 'ru-en' | 'ru-pl'
    this.difficulty = 'easy'; // 'easy' | 'hard'

    // Состояние режима "Пары карточек"
    this.pairsCards = [];
    this.firstSelectedCard = null;
    this.matchedPairsCount = 0;
    this.totalPairsCount = 0;
    this.isLocked = false;

    // Состояние режима "Викторина"
    this.quizQuestion = null;
    this.quizOptions = [];
    this.quizAnswered = false;
    this.usedQuizIndexes = new Set();
    this.autoNextTimeout = null;
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
      // 'ru'
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
    clearTimeout(this.autoNextTimeout);
    if (this.subMode === 'pairs') {
      this.startPairsRound();
    } else {
      this.usedQuizIndexes.clear();
      this.startNewQuiz();
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
      if (this.difficulty === 'easy') {
        return item.level === 'easy';
      } else {
        return item.level === 'hard';
      }
    });
  }

  // ========================================================
  // ЛОГИКА РЕЖИМА 1: ПАРЫ КАРТОЧЕК (MATCH PAIRS)
  // ========================================================
  startPairsRound() {
    clearTimeout(this.autoNextTimeout);
    this.firstSelectedCard = null;
    this.matchedPairsCount = 0;
    this.isLocked = false;

    const pool = this.getPool();
    const count = this.difficulty === 'easy' ? 4 : 6;
    this.totalPairsCount = Math.min(count, pool.length);

    // Выбираем случайные слова для раунда
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const selectedItems = shuffledPool.slice(0, this.totalPairsCount);

    const { from, to, fromTag, toTag } = this.getLanguages();

    const cards = [];
    selectedItems.forEach((item, idx) => {
      // Карточка исходного языка
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
      // Карточка перевода
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

    // Перемешиваем карточки на поле
    this.pairsCards = cards.sort(() => 0.5 - Math.random());
    this.render();
  }

  handleCardClick(cardId) {
    if (this.isLocked) return;

    const card = this.pairsCards.find(c => c.id === cardId);
    if (!card || card.matched) return;

    sound.playLetterClick();
    sound.speakWord(card.text, card.lang);

    const cardEl = this.container.querySelector(`.wt-card[data-card-id="${cardId}"]`);

    // Если первая карточка еще не выбрана
    if (!this.firstSelectedCard) {
      this.firstSelectedCard = card;
      if (cardEl) cardEl.classList.add('selected');
      return;
    }

    // Если кликнули по той же самой карточке
    if (this.firstSelectedCard.id === card.id) {
      this.firstSelectedCard = null;
      if (cardEl) cardEl.classList.remove('selected');
      return;
    }

    const firstCardEl = this.container.querySelector(`.wt-card[data-card-id="${this.firstSelectedCard.id}"]`);

    // Проверяем совпадение: одинаковый pairId и разные типы (source + target)
    const isMatch = (card.pairId === this.firstSelectedCard.pairId && card.type !== this.firstSelectedCard.type);

    if (isMatch) {
      // СОВПАДЕНИЕ!
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
      // Озвучиваем перевод
      setTimeout(() => {
        sound.speakWord(card.text, card.lang);
      }, 250);

      this.firstSelectedCard = null;
      this.matchedPairsCount++;

      // Проверяем победу в раунде
      if (this.matchedPairsCount === this.totalPairsCount) {
        this.isLocked = true;
        setTimeout(() => {
          sound.playVictory();
          this.onStarEarned(3);
          this.onWinEffect();
          this.render();

          // Автоматический запуск следующего раунда через 3 секунды
          this.autoNextTimeout = setTimeout(() => {
            this.startPairsRound();
          }, 3000);
        }, 300);
      }
    } else {
      // ОШИБКА: карточки не совпадают
      this.isLocked = true;
      sound.playError();

      if (cardEl) cardEl.classList.add('shake', 'wrong');
      if (firstCardEl) firstCardEl.classList.add('shake', 'wrong');

      setTimeout(() => {
        if (cardEl) cardEl.classList.remove('selected', 'shake', 'wrong');
        if (firstCardEl) firstCardEl.classList.remove('selected', 'shake', 'wrong');
        this.firstSelectedCard = null;
        this.isLocked = false;
      }, 650);
    }
  }

  // ========================================================
  // ЛОГИКА РЕЖИМА 2: ВИКТОРИНА 1 ИЗ 3 (WORD QUIZ)
  // ========================================================
  startNewQuiz() {
    this.quizAnswered = false;
    const pool = this.getPool();
    const { from, to } = this.getLanguages();

    if (this.usedQuizIndexes.size >= pool.length) {
      this.usedQuizIndexes.clear();
    }

    const availableIndices = [];
    for (let i = 0; i < pool.length; i++) {
      if (!this.usedQuizIndexes.has(i)) availableIndices.push(i);
    }

    const targetIdx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    this.usedQuizIndexes.add(targetIdx);

    const questionItem = pool[targetIdx];
    this.quizQuestion = {
      emoji: questionItem.emoji,
      sourceWord: questionItem[from],
      targetWord: questionItem[to],
      fromLang: from,
      toLang: to
    };

    // Формируем варианты ответов (1 правильный + 2 дистрактора)
    const options = [questionItem[to]];
    const otherItems = pool.filter((_, idx) => idx !== targetIdx).sort(() => 0.5 - Math.random());

    for (const item of otherItems) {
      if (options.length >= 3) break;
      if (!options.includes(item[to])) {
        options.push(item[to]);
      }
    }

    this.quizOptions = options.sort(() => 0.5 - Math.random());
    this.render();

    // Озвучиваем слово вопроса
    setTimeout(() => {
      sound.speakWord(this.quizQuestion.sourceWord, this.quizQuestion.fromLang);
    }, 300);
  }

  handleQuizAnswer(selectedOption, btnEl) {
    if (this.quizAnswered) return;

    if (selectedOption === this.quizQuestion.targetWord) {
      // ПРАВИЛЬНЫЙ ОТВЕТ!
      this.quizAnswered = true;
      btnEl.classList.add('correct');
      sound.playSuccess();
      sound.speakWord(this.quizQuestion.targetWord, this.quizQuestion.toLang);

      this.onStarEarned(1);
      this.onWinEffect();

      // Через небольшую паузу переходим к следующему слову
      setTimeout(() => {
        this.startNewQuiz();
      }, 1500);
    } else {
      // НЕВЕРНЫЙ ВАРИАНТ
      btnEl.classList.add('shake', 'wrong');
      sound.playError();
      setTimeout(() => {
        btnEl.classList.remove('shake');
      }, 500);
    }
  }

  // ========================================================
  // ОТРИСОВКА ИНТЕРФЕЙСА (RENDER)
  // ========================================================
  render() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';

    const tabPairsLabel = isRu ? '🃏 Пары карточек' : (isPl ? '🃏 Pary kart' : '🃏 Match Pairs');
    const tabQuizLabel = isRu ? '🎯 Викторина 1 из 3' : (isPl ? '🎯 Quiz 1 z 3' : '🎯 Word Quiz');

    const easyLabel = isRu ? '🐣 Легкий' : (isPl ? '🐣 Łatwy' : '🐣 Easy');
    const hardLabel = isRu ? '🚀 Мастер' : (isPl ? '🚀 Mistrz' : '🚀 Master');

    const isRoundWon = (this.subMode === 'pairs' && this.matchedPairsCount === this.totalPairsCount && this.totalPairsCount > 0);

    this.container.innerHTML = `
      <div class="wt-wrapper">
        <!-- Верхняя панель переключения подрежимов и направления -->
        <div class="wt-header-bar">
          <!-- Подрежимы: Пары / Викторина -->
          <div class="wt-submode-tabs">
            <button class="wt-submode-btn ${this.subMode === 'pairs' ? 'active' : ''}" id="wt-btn-pairs">
              ${tabPairsLabel}
            </button>
            <button class="wt-submode-btn ${this.subMode === 'quiz' ? 'active' : ''}" id="wt-btn-quiz">
              ${tabQuizLabel}
            </button>
          </div>

          <!-- Сложность: Легкий / Мастер -->
          <div class="ws-diff-bar">
            <button class="ws-diff-btn ${this.difficulty === 'easy' ? 'active' : ''}" id="wt-diff-easy">
              ${easyLabel}
            </button>
            <button class="ws-diff-btn ${this.difficulty === 'hard' ? 'active' : ''}" id="wt-diff-hard">
              ${hardLabel}
            </button>
          </div>
        </div>

        <!-- Полоса выбора языкового направления -->
        <div class="wt-direction-bar">
          ${this.getAvailableDirections().map(dir => `
            <button class="wt-dir-btn ${this.direction === dir.id ? 'active' : ''}" data-dir="${dir.id}">
              ${dir.label}
            </button>
          `).join('')}
        </div>

        <!-- Основная игровая зона -->
        <div class="wt-content-area">
          ${this.subMode === 'pairs' ? this.renderPairsContent(isRoundWon) : this.renderQuizContent()}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderPairsContent(isRoundWon) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const nextRoundLabel = isRu ? 'Следующий раунд ➔' : (isPl ? 'Następna runda ➔' : 'Next Round ➔');
    const winTitle = isRu ? 'Все пары найдены! +3 ⭐' : (isPl ? 'Wszystkie pary dopasowane! +3 ⭐' : 'All pairs matched! +3 ⭐');

    return `
      <div class="wt-cards-grid ${this.difficulty === 'hard' ? 'grid-hard' : ''}">
        ${this.pairsCards.map(card => {
          return `
            <button class="wt-card ${card.matched ? 'matched' : ''} ${card.type}" 
                    data-card-id="${card.id}" 
                    ${card.matched ? 'disabled' : ''}>
              <div class="wt-card-badge">${card.tag}</div>
              <div class="wt-card-text">${card.text}</div>
            </button>
          `;
        }).join('')}
      </div>

      ${isRoundWon ? `
        <div class="wt-round-completed">
          <div class="wt-completed-banner">🎉 ${winTitle}</div>
          <button class="wb-ctrl-btn btn-next" id="wt-next-round-btn">
            ${nextRoundLabel}
          </button>
        </div>
      ` : ''}
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
        <!-- Карточка со словом вопроса -->
        <div class="wt-quiz-card">
          <div class="wt-quiz-hint">${questionHint}</div>
          <div class="wt-quiz-source">${this.quizQuestion.sourceWord}</div>
          <button class="wb-listen-btn" id="wt-listen-btn" title="${listenTitle}">
            🔊 ${listenTitle}
          </button>
        </div>

        <!-- 3 кнопки вариантов ответа -->
        <div class="wt-quiz-options">
          ${this.quizOptions.map(opt => `
            <button class="wt-quiz-btn" data-option="${opt}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Переключение подрежимов
    const btnPairs = this.container.querySelector('#wt-btn-pairs');
    const btnQuiz = this.container.querySelector('#wt-btn-quiz');

    if (btnPairs) {
      btnPairs.addEventListener('click', () => {
        this.subMode = 'pairs';
        sound.playLetterClick();
        this.start();
      });
    }

    if (btnQuiz) {
      btnQuiz.addEventListener('click', () => {
        this.subMode = 'quiz';
        sound.playLetterClick();
        this.start();
      });
    }

    // Переключение сложности
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

    // Переключение направления перевода
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

    // События режима 1: Пары карточек
    if (this.subMode === 'pairs') {
      const cards = this.container.querySelectorAll('.wt-card');
      cards.forEach(cardEl => {
        cardEl.addEventListener('click', () => {
          const cardId = cardEl.dataset.cardId;
          this.handleCardClick(cardId);
        });
      });

      const nextRoundBtn = this.container.querySelector('#wt-next-round-btn');
      if (nextRoundBtn) {
        nextRoundBtn.addEventListener('click', () => {
          clearTimeout(this.autoNextTimeout);
          sound.playLetterClick();
          this.startPairsRound();
        });
      }
    }

    // События режима 2: Викторина
    if (this.subMode === 'quiz') {
      const listenBtn = this.container.querySelector('#wt-listen-btn');
      if (listenBtn && this.quizQuestion) {
        listenBtn.addEventListener('click', () => {
          sound.speakWord(this.quizQuestion.sourceWord, this.quizQuestion.fromLang);
        });
      }

      const optBtns = this.container.querySelectorAll('.wt-quiz-btn');
      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const option = btn.dataset.option;
          this.handleQuizAnswer(option, btn);
        });
      });
    }
  }
}
