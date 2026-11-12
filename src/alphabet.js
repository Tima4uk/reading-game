// Модуль «Азбука» для детей 4.5 лет: Говорящая Азбука + Викторина + Конструктор букв
import { ALPHABET_DATA, shuffleArray } from './data.js?v=17';
import { sound } from './audio.js?v=17';
import { LetterPuzzleGame } from './letter-puzzle.js?v=17';
import { getLetterLesson } from './letter-lessons.js?v=17';

export class AlphabetGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'explore'; // 'explore' | 'quiz' | 'puzzle'
    this.selectedLetterItem = null;
    this.currentLesson = null;
    this.lessonState = null;

    // Состояние викторины (Quiz)
    this.quizTarget = null;
    this.quizOptions = [];
    this.quizAnswered = false;
    this.usedQuizLetters = new Set();
    this.lastQuizLetter = null;

    // Конструктор букв
    this.puzzleGame = null;
    this.quizTimer = null;
    this.speakTimer = null;
  }

  stop() {
    if (this.quizTimer) {
      clearTimeout(this.quizTimer);
      this.quizTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    if (this.puzzleGame && this.puzzleGame.destroy) {
      this.puzzleGame.destroy();
    }
  }

  setLanguage(lang) {
    this.stop();
    if (this.lang !== lang) {
      this.lang = lang;
      this.usedQuizLetters.clear();
      this.lastQuizLetter = null;
      if (this.puzzleGame) {
        this.puzzleGame.setLanguage(lang);
      }
    }
    this.selectedLetterItem = null;
    if (this.subMode === 'quiz') {
      this.startNewQuizRound();
    } else if (this.subMode === 'puzzle') {
      this.startPuzzleMode();
    } else {
      this.render();
    }
  }

  start() {
    this.stop();
    this.selectedLetterItem = null;
    if (this.subMode === 'quiz') {
      this.startNewQuizRound();
    } else if (this.subMode === 'puzzle') {
      this.startPuzzleMode();
    } else {
      this.render();
    }
  }

  switchSubMode(mode) {
    this.stop();
    sound.stopSpeech();
    this.subMode = mode;
    sound.playLetterClick();
    if (mode === 'quiz') {
      this.startNewQuizRound();
    } else if (mode === 'puzzle') {
      this.startPuzzleMode();
    } else {
      this.render();
    }
  }

  startPuzzleMode() {
    this.render();
    const contentArea = this.container.querySelector('#ab-content-area');
    if (contentArea) {
      if (!this.puzzleGame || this.puzzleGame.lang !== this.lang) {
        if (this.puzzleGame && this.puzzleGame.destroy) {
          this.puzzleGame.destroy();
        }
        this.puzzleGame = new LetterPuzzleGame({
          container: contentArea,
          lang: this.lang,
          onStarEarned: this.onStarEarned,
          onWinEffect: this.onWinEffect
        });
        this.puzzleGame.start();
      } else {
        this.puzzleGame.container = contentArea;
        this.puzzleGame.loadPuzzle();
      }
    }
  }

  render() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const data = ALPHABET_DATA[this.lang];

    const exploreTab = isRu ? 'Все буквы' : (isPl ? 'Wszystkie litery' : 'All Letters');
    const quizTab = isRu ? 'Где буква?' : (isPl ? 'Gdzie jest litera?' : 'Where is Letter?');
    const puzzleTab = isRu ? 'Собери букву' : (isPl ? 'Złóż literkę' : 'Build a Letter');

    this.container.innerHTML = `
      <div class="ab-wrapper">
        <!-- Мини-переключатель режимов Азбуки -->
        <div class="ab-subnav">
          <button class="ab-subnav-btn ${this.subMode === 'explore' ? 'active' : ''}" id="ab-btn-explore">
            📖 ${exploreTab}
          </button>
          <button class="ab-subnav-btn ${this.subMode === 'quiz' ? 'active' : ''}" id="ab-btn-quiz">
            🎯 ${quizTab}
          </button>
          <button class="ab-subnav-btn ${this.subMode === 'puzzle' ? 'active' : ''}" id="ab-btn-puzzle">
            🧩 ${puzzleTab}
          </button>
        </div>

        <!-- Контент режима -->
        <div class="ab-content" id="ab-content-area">
          ${this.subMode === 'explore' 
            ? this.renderExploreHTML(data) 
            : (this.subMode === 'quiz' ? this.renderQuizHTML() : '')}
        </div>

        <!-- Большое модальное окно для детального просмотра буквы -->
        <div class="ab-card-modal ${this.selectedLetterItem ? '' : 'hidden'}" id="ab-modal">
          ${this.selectedLetterItem ? this.renderLetterModalContent(this.selectedLetterItem) : ''}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  // ==========================================
  // РЕЖИМ 1: Говорящая Азбука (Все буквы)
  // ==========================================
  renderExploreHTML(data) {
    return `
      <div class="ab-grid">
        ${data.map((item, index) => `
          <button class="ab-letter-card" data-index="${index}">
            <span class="ab-card-letter">${item.letter}</span>
            <span class="ab-card-emoji">${item.emoji}</span>
          </button>
        `).join('')}
      </div>
    `;
  }

  renderLetterModalContent(item) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const lesson = this.currentLesson || getLetterLesson(item.letter, this.lang);
    const state = this.lessonState || {
      readSyllables: new Set(),
      syllablesRewarded: false,
      foundBubbles: new Set(),
      bubblesRewarded: false,
      foundWords: new Set(),
      wordsRewarded: false,
      activeSyllableIdx: -1
    };

    const speakText = isRu ? 'Слушать' : (isPl ? 'Posłuchaj' : 'Listen');
    const tipTitle = isRu ? 'Совет логопеда:' : (isPl ? 'Wskazówka logopedy:' : 'Speech tip:');
    const comicTitle = isRu ? '📖 Комикс: нажми на облачко со словами!' : (isPl ? '📖 Komiks: kliknij dymek!' : '📖 Comic: tap the speech bubble!');
    const syllablesTitle = isRu ? '👣 Дорожка слогов: прошагай и прочитай все!' : (isPl ? '👣 Ścieżka sylab: przeczytaj wszystkie!' : '👣 Syllable track: tap & read all!');
    const detectiveTitle = isRu
      ? `🔎 Сыщик: найди все буквы «${lesson.letter}» (${state.foundBubbles.size}/${lesson.targetBubblesCount})`
      : (isPl
        ? `🔎 Detektyw: znajdź wszystkie litery «${lesson.letter}» (${state.foundBubbles.size}/${lesson.targetBubblesCount})`
        : `🔎 Detective: find all "${lesson.letter}" letters (${state.foundBubbles.size}/${lesson.targetBubblesCount})`);
    const wordsTaskTitle = isRu
      ? `🎯 В каких словах спряталась буква «${lesson.letter}»? (${state.foundWords.size}/${lesson.targetWordsCount})`
      : (isPl
        ? `🎯 W których słowach kryje się litera «${lesson.letter}»? (${state.foundWords.size}/${lesson.targetWordsCount})`
        : `🎯 Which words have the letter "${lesson.letter}"? (${state.foundWords.size}/${lesson.targetWordsCount})`);

    const highlightLetterInWord = (word, targetLetter, isFound) => {
      if (!isFound) return word;
      return word
        .split('')
        .map(ch => ch.toUpperCase() === targetLetter.toUpperCase()
          ? `<span class="primer-word-hl">${ch}</span>`
          : ch)
        .join('');
    };

    return `
      <div class="ab-modal-backdrop" id="ab-modal-close-bg"></div>
      <div class="ab-modal-box primer-modal-box">
        <button class="ab-modal-close" id="ab-modal-btn-close" title="Закрыть">✖</button>

        <!-- Шапка разворота Букваря -->
        <div class="primer-header">
          <button class="ab-action-btn" id="ab-btn-prev" title="Предыдущая буква">◀</button>

          <div class="primer-hero-card sound-${lesson.soundType}">
            <div class="primer-letter-big">${lesson.letter}</div>
            <div class="primer-hero-info">
              <span class="primer-sound-badge ${lesson.soundType}">${lesson.badgeText}</span>
              <div class="primer-key-word">
                <span class="primer-key-emoji">${lesson.emoji}</span>
                <span class="primer-key-text">${lesson.word}</span>
              </div>
            </div>
            <button class="primer-listen-btn" id="ab-btn-speak" title="${speakText}">
              🔊 ${speakText}
            </button>
          </div>

          <button class="ab-action-btn" id="ab-btn-next" title="Следующая буква">▶</button>
        </div>

        <!-- Логопедическая подсказка -->
        <div class="primer-tip-box" id="primer-tip-box">
          <span class="primer-tip-icon">👩‍⚕️</span>
          <div class="primer-tip-content">
            <strong>${tipTitle}</strong> ${lesson.tipText}
          </div>
          <button class="primer-tip-audio-btn" id="primer-btn-tip-speak" title="${speakText}">🔊</button>
        </div>

        <!-- Сетка разворота: Комикс + Дорожка слогов + 2 Игровых задания -->
        <div class="primer-spread-grid">
          <!-- БЛОК 1: КОМИКС -->
          <div class="primer-section primer-comic-section">
            <div class="primer-section-title">${comicTitle}</div>
            <div class="primer-comic-panels">
              ${lesson.comic.map((panel, idx) => `
                <div class="primer-comic-panel" data-panel-idx="${idx}">
                  <div class="primer-comic-caption">${panel.caption}</div>
                  <div class="primer-comic-stage">
                    <div class="primer-comic-avatars">
                      <span class="primer-comic-avatar">${panel.avatar}</span>
                      <span class="primer-comic-scene">${panel.scene}</span>
                    </div>
                    <button class="primer-speech-bubble" data-spoken="${panel.spoken}">
                      <span class="primer-bubble-text">${panel.bubble}</span>
                      <span class="primer-bubble-sound">🔊</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- БЛОК 2: ДОРОЖКА СЛОГОВ -->
          <div class="primer-section primer-syllables-section ${state.syllablesRewarded ? 'section-completed' : ''}">
            <div class="primer-section-title">
              <span>${syllablesTitle}</span>
              ${state.syllablesRewarded ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
            </div>
            <div class="primer-syllable-track">
              ${lesson.syllables.map((syl, idx) => {
                const isRead = state.readSyllables.has(idx);
                const isWalkerHere = state.activeSyllableIdx === idx;
                return `
                  <button class="primer-syllable-stone ${isRead ? 'read' : ''} ${isWalkerHere ? 'active-walker' : ''}" data-syl="${syl}" data-idx="${idx}">
                    <span class="primer-walker-icon">${isWalkerHere ? '🐾' : (isRead ? '✓' : '•')}</span>
                    <span class="primer-syllable-text">${syl}</span>
                  </button>
                `;
              }).join('<span class="primer-track-arrow">➔</span>')}
            </div>
          </div>

          <!-- БЛОК 3: ЗАДАНИЕ 1 — БУКВЕННЫЙ СЫЩИК -->
          <div class="primer-section primer-detective-section ${state.bubblesRewarded ? 'section-completed' : ''}">
            <div class="primer-section-title">
              <span id="primer-detective-title">${detectiveTitle}</span>
              ${state.bubblesRewarded ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
            </div>
            <div class="primer-detective-grid">
              ${lesson.detectiveBubbles.map((b) => {
                const isFound = state.foundBubbles.has(b.id);
                return `
                  <button class="primer-bubble-btn ${isFound ? 'found' : ''}"
                          data-bubble-id="${b.id}"
                          data-letter="${b.letter}"
                          data-is-target="${b.isTarget}">
                    ${b.letter}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- БЛОК 4: ЗАДАНИЕ 2 — СЛОВА С ЭТОЙ БУКВОЙ -->
          <div class="primer-section primer-words-section ${state.wordsRewarded ? 'section-completed' : ''}">
            <div class="primer-section-title">
              <span id="primer-words-title">${wordsTaskTitle}</span>
              ${state.wordsRewarded ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
            </div>
            <div class="primer-words-grid">
              ${lesson.wordChoices.map((w, idx) => {
                const isFound = state.foundWords.has(idx);
                return `
                  <button class="primer-word-card ${isFound ? 'found' : ''}"
                          data-word-idx="${idx}"
                          data-word="${w.word}"
                          data-has-letter="${w.hasLetter}">
                    <span class="primer-word-emoji">${w.emoji}</span>
                    <span class="primer-word-label">${highlightLetterInWord(w.word, lesson.letter, isFound)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  openLetterModal(index) {
    const data = ALPHABET_DATA[this.lang];
    this.selectedLetterItem = data[index];
    this.selectedLetterIndex = index;
    this.currentLesson = getLetterLesson(this.selectedLetterItem.letter, this.lang);
    this.lessonState = {
      readSyllables: new Set(),
      syllablesRewarded: false,
      foundBubbles: new Set(),
      bubblesRewarded: false,
      foundWords: new Set(),
      wordsRewarded: false,
      activeSyllableIdx: -1
    };

    sound.playLetterClick();
    sound.speakLetterAndWord(this.selectedLetterItem.letter, this.selectedLetterItem.word, this.lang);

    const modal = this.container.querySelector('#ab-modal');
    if (modal) {
      const wasOpen = !modal.classList.contains('hidden');
      modal.innerHTML = this.renderLetterModalContent(this.selectedLetterItem);
      if (wasOpen) {
        const box = modal.querySelector('.primer-modal-box');
        if (box) box.classList.add('no-pop');
      }
      modal.classList.remove('hidden');
      this.attachModalEvents();
    }
  }

  highlightLetterInWord(word, targetLetter, isFound) {
    if (!isFound) return word;
    return word
      .split('')
      .map(ch => ch.toUpperCase() === targetLetter.toUpperCase()
        ? `<span class="primer-word-hl">${ch}</span>`
        : ch)
      .join('');
  }

  closeLetterModal() {
    this.selectedLetterItem = null;
    this.currentLesson = null;
    this.lessonState = null;
    sound.stopSpeech();
    const modal = this.container.querySelector('#ab-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.innerHTML = '';
    }
  }

  navigateLetter(offset) {
    const data = ALPHABET_DATA[this.lang];
    let nextIndex = this.selectedLetterIndex + offset;
    if (nextIndex < 0) nextIndex = data.length - 1;
    if (nextIndex >= data.length) nextIndex = 0;
    this.openLetterModal(nextIndex);
  }

  attachModalEvents() {
    const closeBtn = this.container.querySelector('#ab-modal-btn-close');
    const closeBg = this.container.querySelector('#ab-modal-close-bg');
    const speakBtn = this.container.querySelector('#ab-btn-speak');
    const tipSpeakBtn = this.container.querySelector('#primer-btn-tip-speak');
    const prevBtn = this.container.querySelector('#ab-btn-prev');
    const nextBtn = this.container.querySelector('#ab-btn-next');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLetterModal());
    if (closeBg) closeBg.addEventListener('click', () => this.closeLetterModal());

    if (speakBtn && this.selectedLetterItem) {
      speakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakLetterAndWord(this.selectedLetterItem.letter, this.selectedLetterItem.word, this.lang);
      });
    }

    if (tipSpeakBtn && this.currentLesson) {
      tipSpeakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        const cleanTip = this.currentLesson.tipText.replace(/[🔴🔵⚪]/g, '');
        sound.speakExplanation(cleanTip, this.lang);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => this.navigateLetter(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.navigateLetter(1));

    // 1. Облачка комикса (Speech Bubbles)
    const comicBubbles = this.container.querySelectorAll('.primer-speech-bubble');
    comicBubbles.forEach(bubble => {
      bubble.addEventListener('click', () => {
        sound.playLetterClick();
        bubble.classList.remove('bubble-pop');
        void bubble.offsetWidth;
        bubble.classList.add('bubble-pop');
        const text = bubble.dataset.spoken || '';
        sound.speakPhrase(text, this.lang);
      });
    });

    // 2. Дорожка слогов
    const syllableStones = this.container.querySelectorAll('.primer-syllable-stone');
    syllableStones.forEach(stone => {
      stone.addEventListener('click', () => {
        if (!this.lessonState || !this.currentLesson) return;
        const idx = parseInt(stone.dataset.idx, 10);
        const syl = stone.dataset.syl;

        sound.playLetterClick();
        sound.speakWord(syl, this.lang);

        this.lessonState.activeSyllableIdx = idx;
        this.lessonState.readSyllables.add(idx);

        // Обновляем кочки на месте без перерисовки модалки
        syllableStones.forEach(s => {
          const sIdx = parseInt(s.dataset.idx, 10);
          const isRead = this.lessonState.readSyllables.has(sIdx);
          const isWalker = this.lessonState.activeSyllableIdx === sIdx;
          s.classList.toggle('read', isRead);
          s.classList.toggle('active-walker', isWalker);
          const iconEl = s.querySelector('.primer-walker-icon');
          if (iconEl) {
            iconEl.textContent = isWalker ? '🐾' : (isRead ? '✓' : '•');
          }
        });

        if (!this.lessonState.syllablesRewarded &&
            this.lessonState.readSyllables.size >= this.currentLesson.syllables.length) {
          this.lessonState.syllablesRewarded = true;
          sound.playSuccess();
          this.onStarEarned(1);
          this.onWinEffect();

          const sec = this.container.querySelector('.primer-syllables-section');
          if (sec) {
            sec.classList.add('section-completed');
            const titleEl = sec.querySelector('.primer-section-title');
            if (titleEl && !titleEl.querySelector('.primer-done-badge')) {
              titleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
            }
          }
        }
      });
    });

    // 3. Задание 1: Буквенный сыщик
    const detectiveBtns = this.container.querySelectorAll('.primer-bubble-btn');
    detectiveBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.lessonState || !this.currentLesson) return;
        const bId = btn.dataset.bubbleId;
        const isTarget = btn.dataset.isTarget === 'true';
        const clickedLetter = btn.dataset.letter;

        if (this.lessonState.foundBubbles.has(bId)) {
          sound.speakLetter(clickedLetter, this.lang);
          return;
        }

        if (isTarget) {
          this.lessonState.foundBubbles.add(bId);
          btn.classList.add('found');
          sound.playSuccess();
          sound.speakLetter(clickedLetter, this.lang);

          const isRu = this.lang === 'ru';
          const isPl = this.lang === 'pl';
          const lesson = this.currentLesson;
          const titleSpan = this.container.querySelector('#primer-detective-title');
          if (titleSpan) {
            titleSpan.textContent = isRu
              ? `🔎 Сыщик: найди все буквы «${lesson.letter}» (${this.lessonState.foundBubbles.size}/${lesson.targetBubblesCount})`
              : (isPl
                ? `🔎 Detektyw: znajdź wszystkie litery «${lesson.letter}» (${this.lessonState.foundBubbles.size}/${lesson.targetBubblesCount})`
                : `🔎 Detective: find all "${lesson.letter}" letters (${this.lessonState.foundBubbles.size}/${lesson.targetBubblesCount})`);
          }

          if (!this.lessonState.bubblesRewarded &&
              this.lessonState.foundBubbles.size >= this.currentLesson.targetBubblesCount) {
            this.lessonState.bubblesRewarded = true;
            this.onStarEarned(1);
            this.onWinEffect();

            const sec = this.container.querySelector('.primer-detective-section');
            if (sec) {
              sec.classList.add('section-completed');
              const titleEl = sec.querySelector('.primer-section-title');
              if (titleEl && !titleEl.querySelector('.primer-done-badge')) {
                titleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
              }
            }
          }
        } else {
          btn.classList.add('wrong');
          sound.playError();
          sound.speakLetter(clickedLetter, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });

    // 4. Задание 2: Слова с изучаемой буквой
    const wordCards = this.container.querySelectorAll('.primer-word-card');
    wordCards.forEach(card => {
      card.addEventListener('click', () => {
        if (!this.lessonState || !this.currentLesson) return;
        const idx = parseInt(card.dataset.wordIdx, 10);
        const word = card.dataset.word;
        const hasLetter = card.dataset.hasLetter === 'true';

        if (this.lessonState.foundWords.has(idx)) {
          sound.speakWord(word, this.lang);
          return;
        }

        if (hasLetter) {
          this.lessonState.foundWords.add(idx);
          card.classList.add('found');
          const labelEl = card.querySelector('.primer-word-label');
          if (labelEl) {
            labelEl.innerHTML = this.highlightLetterInWord(word, this.currentLesson.letter, true);
          }

          sound.playSuccess();
          sound.speakWord(word, this.lang);

          const isRu = this.lang === 'ru';
          const isPl = this.lang === 'pl';
          const lesson = this.currentLesson;
          const titleSpan = this.container.querySelector('#primer-words-title');
          if (titleSpan) {
            titleSpan.textContent = isRu
              ? `🎯 В каких словах спряталась буква «${lesson.letter}»? (${this.lessonState.foundWords.size}/${lesson.targetWordsCount})`
              : (isPl
                ? `🎯 W których słowach kryje się litera «${lesson.letter}»? (${this.lessonState.foundWords.size}/${lesson.targetWordsCount})`
                : `🎯 Which words have the letter "${lesson.letter}"? (${this.lessonState.foundWords.size}/${lesson.targetWordsCount})`);
          }

          if (!this.lessonState.wordsRewarded &&
              this.lessonState.foundWords.size >= this.currentLesson.targetWordsCount) {
            this.lessonState.wordsRewarded = true;
            this.onStarEarned(1);
            this.onWinEffect();

            const sec = this.container.querySelector('.primer-words-section');
            if (sec) {
              sec.classList.add('section-completed');
              const titleEl = sec.querySelector('.primer-section-title');
              if (titleEl && !titleEl.querySelector('.primer-done-badge')) {
                titleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
              }
            }
          }
        } else {
          card.classList.add('wrong');
          sound.playError();
          sound.speakWord(word, this.lang);
          setTimeout(() => card.classList.remove('wrong'), 450);
        }
      });
    });
  }

  // ==========================================
  // РЕЖИМ 2: Викторина «Где буква?»
  // ==========================================
  startNewQuizRound() {
    if (this.quizTimer) {
      clearTimeout(this.quizTimer);
      this.quizTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    this.quizAnswered = false;
    const data = ALPHABET_DATA[this.lang];

    // Выбираем неиспользованную целевую букву (без повторов подряд)
    let available = data.filter(d => !this.usedQuizLetters.has(d.letter) && d.letter !== this.lastQuizLetter);
    if (available.length === 0) {
      this.usedQuizLetters.clear();
      available = data.filter(d => d.letter !== this.lastQuizLetter);
      if (available.length === 0) available = data;
    }

    const shuffledTargets = shuffleArray(available);
    const target = shuffledTargets[0];
    this.quizTarget = target;
    this.lastQuizLetter = target.letter;
    this.usedQuizLetters.add(target.letter);

    // Выбираем 2 других случайных буквы в качестве дистракторов
    const otherLetters = data.filter(d => d.letter !== target.letter);
    const shuffledOthers = shuffleArray(otherLetters);
    const distractors = shuffledOthers.slice(0, 2);

    // Перемешиваем варианты ответов (3 больших варианта)
    this.quizOptions = shuffleArray([target, ...distractors]);

    this.render();

    // Озвучиваем вопрос: "Где буква М?"
    this.speakTimer = setTimeout(() => {
      this.speakTimer = null;
      sound.speakQuestion(this.quizTarget.letter, this.lang);
    }, 300);
  }

  renderQuizHTML() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const promptText = isRu ? 'Где буква' : (isPl ? 'Gdzie jest litera' : 'Where is letter');
    const repeatText = isRu ? 'Повторить' : (isPl ? 'Powtórz' : 'Repeat');
    const repeatTitle = isRu ? 'Повторить вопрос' : (isPl ? 'Powtórz pytanie' : 'Repeat question');
    const feedbackDefault = isRu 
      ? 'Нажми на правильную букву!' 
      : (isPl ? 'Kliknij na odpowiednią literę!' : 'Tap the correct letter!');

    return `
      <div class="ab-quiz-box">
        <div class="ab-quiz-header">
          <div class="ab-quiz-prompt">
            ${promptText} 
            <span class="ab-target-letter-badge">${this.quizTarget.letter}</span> ?
          </div>
          <button class="ab-quiz-repeat-btn" id="ab-quiz-repeat" title="${repeatTitle}">
            🔊 ${repeatText}
          </button>
        </div>

        <div class="ab-quiz-options">
          ${this.quizOptions.map((opt, i) => `
            <button class="ab-quiz-btn" data-letter="${opt.letter}" data-idx="${i}">
              <span class="ab-quiz-btn-letter">${opt.letter}</span>
              <span class="ab-quiz-btn-emoji">${opt.emoji}</span>
              <span class="ab-quiz-btn-word">${opt.word}</span>
            </button>
          `).join('')}
        </div>

        <div class="ab-quiz-feedback" id="ab-quiz-feedback">
          ${feedbackDefault}
        </div>
      </div>
    `;
  }

  handleQuizChoice(btn, letter) {
    if (this.quizAnswered) return;

    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const feedbackEl = this.container.querySelector('#ab-quiz-feedback');

    if (letter === this.quizTarget.letter) {
      // ПРАВИЛЬНО!
      this.quizAnswered = true;
      btn.classList.add('correct');
      sound.playSuccess();
      sound.speakLetterAndWord(this.quizTarget.letter, this.quizTarget.word, this.lang);

      const successExcl = isRu ? 'Ура! Правильно!' : (isPl ? 'Brawo! Dobrze!' : 'Great job! Correct!');
      if (feedbackEl) {
        feedbackEl.innerHTML = `⭐ <strong>${successExcl}</strong>`;
        feedbackEl.style.color = '#10b981';
      }

      this.onStarEarned(1);
      this.onWinEffect();

      // Переход к следующему вопросу
      if (this.quizTimer) clearTimeout(this.quizTimer);
      this.quizTimer = setTimeout(() => {
        this.quizTimer = null;
        this.startNewQuizRound();
      }, 2000);

    } else {
      // НЕПРАВИЛЬНО (мягкая подсказка без штрафа)
      btn.classList.add('wrong');
      sound.playError();

      const chosenItem = this.quizOptions.find(o => o.letter === letter);
      const chosenWord = chosenItem ? chosenItem.word : '';

      if (feedbackEl) {
        feedbackEl.textContent = isRu 
          ? `Это буква ${letter} (${chosenWord}). Попробуй еще!` 
          : (isPl
              ? `To jest litera ${letter} (${chosenWord}). Spróbuj jeszcze raz!`
              : `That is letter ${letter} (${chosenWord}). Try again!`);
        feedbackEl.style.color = '#ef4444';
      }

      // Голосовая подсказка
      if (this.speakTimer) clearTimeout(this.speakTimer);
      this.speakTimer = setTimeout(() => {
        this.speakTimer = null;
        sound.speakLetterAndWord(letter, chosenWord, this.lang);
      }, 250);
    }
  }

  attachEvents() {
    // Переключение подрежимов
    const btnExplore = this.container.querySelector('#ab-btn-explore');
    const btnQuiz = this.container.querySelector('#ab-btn-quiz');
    const btnPuzzle = this.container.querySelector('#ab-btn-puzzle');

    if (btnExplore) btnExplore.addEventListener('click', () => this.switchSubMode('explore'));
    if (btnQuiz) btnQuiz.addEventListener('click', () => this.switchSubMode('quiz'));
    if (btnPuzzle) btnPuzzle.addEventListener('click', () => this.switchSubMode('puzzle'));

    if (this.subMode === 'explore') {
      const cards = this.container.querySelectorAll('.ab-letter-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.dataset.index);
          this.openLetterModal(idx);
        });
      });
    } else {
      // Викторина
      const repeatBtn = this.container.querySelector('#ab-quiz-repeat');
      if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakQuestion(this.quizTarget.letter, this.lang);
        });
      }

      const choiceBtns = this.container.querySelectorAll('.ab-quiz-btn');
      choiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const letter = btn.dataset.letter;
          this.handleQuizChoice(btn, letter);
        });
      });
    }
  }
}
