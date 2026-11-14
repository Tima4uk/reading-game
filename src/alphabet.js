// Модуль «Азбука» для детей 4.5 лет: Говорящая Азбука + Викторина + Конструктор букв
import { ALPHABET_DATA, shuffleArray } from './data.js?v=21';
import { sound } from './audio.js?v=21';
import { LetterPuzzleGame } from './letter-puzzle.js?v=21';
import { getLetterLesson } from './letter-lessons.js?v=21';
import { KochamCzytacGame } from './kocham-czytac.js?v=21';

export class AlphabetGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'explore'; // 'explore' | 'quiz' | 'puzzle' | 'workbooks'
    this.selectedLetterItem = null;
    this.currentLesson = null;
    this.lessonState = null;

    // Состояние викторины (Quiz)
    this.quizTarget = null;
    this.quizOptions = [];
    this.quizAnswered = false;
    this.usedQuizLetters = new Set();
    this.lastQuizLetter = null;

    // Конструктор букв и Тетради Kocham Czytać
    this.puzzleGame = null;
    this.workbooksGame = null;
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
    if (this.workbooksGame && this.workbooksGame.stop) {
      this.workbooksGame.stop();
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
    } else if (this.subMode === 'workbooks') {
      this.startWorkbooksMode();
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
    } else if (this.subMode === 'workbooks') {
      this.startWorkbooksMode();
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
    } else if (mode === 'workbooks') {
      this.startWorkbooksMode();
    } else {
      this.render();
    }
  }

  startWorkbooksMode() {
    this.render();
    const contentArea = this.container.querySelector('#ab-content-area');
    if (contentArea) {
      if (!this.workbooksGame) {
        this.workbooksGame = new KochamCzytacGame({
          container: contentArea,
          lang: this.lang,
          onStarEarned: this.onStarEarned,
          onWinEffect: this.onWinEffect
        });
        this.workbooksGame.start();
      } else {
        this.workbooksGame.container = contentArea;
        if (this.workbooksGame.lang !== this.lang) {
          this.workbooksGame.setLanguage(this.lang);
        } else {
          this.workbooksGame.start();
        }
      }
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
    const workbooksTab = isRu ? 'Тетради' : (isPl ? 'Zeszyty' : 'Workbooks');

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
          <button class="ab-subnav-btn ${this.subMode === 'workbooks' ? 'active' : ''}" id="ab-btn-workbooks">
            📚 ${workbooksTab}
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

  renderMissingWordHTML(roundObj, revealed = false) {
    if (!roundObj) return '';
    return roundObj.word
      .split('')
      .map((ch, idx) => {
        if (idx === roundObj.maskIndex) {
          return revealed
            ? `<span class="primer-word-hl">${ch}</span>`
            : `<span class="primer-missing-slot">?</span>`;
        }
        return ch;
      })
      .join('');
  }

  renderPosBodyHTML(lesson, state) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const rounds = lesson.positionRounds || [];
    if (state.posRewarded || state.posRoundIdx >= rounds.length) {
      const doneMsg = isRu ? '🎉 Отлично! Все позиции найдены!' : (isPl ? '🎉 Brawo! Wszystkie pozycje znalezione!' : '🎉 Great! All positions found!');
      return `<div class="primer-mini-done">${doneMsg}</div>`;
    }
    const r = rounds[state.posRoundIdx];
    const labels = isRu
      ? { start: '🚂 В начале', middle: '🚃 В середине', end: '🚋 В конце' }
      : (isPl
        ? { start: '🚂 Na początku', middle: '🚃 W środku', end: '🚋 Na końcu' }
        : { start: '🚂 Beginning', middle: '🚃 Middle', end: '🚋 End' });
    return `
      <button class="primer-pos-word-card" id="primer-pos-word-speak" data-word="${r.word}">
        <span class="primer-pos-emoji">${r.emoji}</span>
        <span class="primer-pos-word">${r.word}</span>
        <span class="primer-pos-audio">🔊</span>
      </button>
      <div class="primer-pos-btns">
        <button class="primer-pos-btn" data-pos="start">${labels.start}</button>
        <button class="primer-pos-btn" data-pos="middle">${labels.middle}</button>
        <button class="primer-pos-btn" data-pos="end">${labels.end}</button>
      </div>
    `;
  }

  renderMissingBodyHTML(lesson, state) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const rounds = lesson.missingLetterRounds || [];
    if (state.missingRewarded || state.missingRoundIdx >= rounds.length) {
      const doneMsg = isRu ? '🎉 Супер! Все слова починены!' : (isPl ? '🎉 Super! Wszystkie słowa naprawione!' : '🎉 Awesome! All words fixed!');
      return `<div class="primer-mini-done">${doneMsg}</div>`;
    }
    const r = rounds[state.missingRoundIdx];
    return `
      <button class="primer-missing-card" id="primer-missing-word-speak" data-word="${r.word}">
        <span class="primer-missing-emoji">${r.emoji}</span>
        <span class="primer-missing-word" id="primer-missing-word">${this.renderMissingWordHTML(r, false)}</span>
        <span class="primer-pos-audio">🔊</span>
      </button>
      <div class="primer-missing-options">
        ${r.options.map(opt => `
          <button class="primer-missing-btn" data-letter="${opt}">${opt}</button>
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
      activeSyllableIdx: -1,
      posRoundIdx: 0,
      posRewarded: false,
      missingRoundIdx: 0,
      missingRewarded: false
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
    const posDoneCount = Math.min(state.posRoundIdx, (lesson.positionRounds || []).length);
    const posTaskTitle = isRu
      ? `🚂 Где стоит буква «${lesson.letter}» в слове? (${posDoneCount}/${(lesson.positionRounds || []).length})`
      : (isPl
        ? `🚂 Gdzie jest litera «${lesson.letter}» w słowie? (${posDoneCount}/${(lesson.positionRounds || []).length})`
        : `🚂 Where is "${lesson.letter}" in the word? (${posDoneCount}/${(lesson.positionRounds || []).length})`);
    const missDoneCount = Math.min(state.missingRoundIdx, (lesson.missingLetterRounds || []).length);
    const missTaskTitle = isRu
      ? `🧩 Почини слово: вставь букву! (${missDoneCount}/${(lesson.missingLetterRounds || []).length})`
      : (isPl
        ? `🧩 Napraw słowo: wstaw literę! (${missDoneCount}/${(lesson.missingLetterRounds || []).length})`
        : `🧩 Fix the word: pick the missing letter! (${missDoneCount}/${(lesson.missingLetterRounds || []).length})`);

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

        <!-- Сетка разворота: Комикс + Дорожка слогов + 4 Игровых задания -->
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

          <!-- БЛОК 5: ЗАДАНИЕ 3 — ПОЗИЦИЯ БУКВЫ В СЛОВЕ -->
          <div class="primer-section primer-pos-section ${state.posRewarded ? 'section-completed' : ''}">
            <div class="primer-section-title">
              <span id="primer-pos-title">${posTaskTitle}</span>
              ${state.posRewarded ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
            </div>
            <div id="primer-pos-body">
              ${this.renderPosBodyHTML(lesson, state)}
            </div>
          </div>

          <!-- БЛОК 6: ЗАДАНИЕ 4 — ПОЧИНИ СЛОВО -->
          <div class="primer-section primer-missing-section ${state.missingRewarded ? 'section-completed' : ''}">
            <div class="primer-section-title">
              <span id="primer-missing-title">${missTaskTitle}</span>
              ${state.missingRewarded ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
            </div>
            <div id="primer-missing-body">
              ${this.renderMissingBodyHTML(lesson, state)}
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
      activeSyllableIdx: -1,
      posRoundIdx: 0,
      posRewarded: false,
      missingRoundIdx: 0,
      missingRewarded: false
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

    // 5 и 6. Задания 3 (Позиция буквы) и 4 (Вставь букву)
    this.attachPosEvents();
    this.attachMissingEvents();
  }

  attachPosEvents() {
    const body = this.container.querySelector('#primer-pos-body');
    if (!body || !this.lessonState || !this.currentLesson) return;

    const speakWordBtn = body.querySelector('#primer-pos-word-speak');
    if (speakWordBtn) {
      speakWordBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(speakWordBtn.dataset.word, this.lang);
      });
    }

    let locked = false;
    body.querySelectorAll('.primer-pos-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (locked || !this.lessonState || !this.currentLesson || this.lessonState.posRewarded) return;
        const rounds = this.currentLesson.positionRounds || [];
        const curRound = rounds[this.lessonState.posRoundIdx];
        if (!curRound) return;

        if (btn.dataset.pos === curRound.pos) {
          locked = true;
          btn.classList.add('found');
          sound.playSuccess();
          sound.speakWord(curRound.word, this.lang);

          const savedIdx = this.selectedLetterIndex;
          setTimeout(() => {
            if (!this.lessonState || this.selectedLetterIndex !== savedIdx) return;
            this.lessonState.posRoundIdx += 1;
            const total = rounds.length;
            const isRu = this.lang === 'ru';
            const isPl = this.lang === 'pl';
            const titleEl = this.container.querySelector('#primer-pos-title');
            if (titleEl) {
              const done = Math.min(this.lessonState.posRoundIdx, total);
              titleEl.textContent = isRu
                ? `🚂 Где стоит буква «${this.currentLesson.letter}» в слове? (${done}/${total})`
                : (isPl
                  ? `🚂 Gdzie jest litera «${this.currentLesson.letter}» w słowie? (${done}/${total})`
                  : `🚂 Where is "${this.currentLesson.letter}" in the word? (${done}/${total})`);
            }
            if (this.lessonState.posRoundIdx >= total && !this.lessonState.posRewarded) {
              this.lessonState.posRewarded = true;
              this.onStarEarned(1);
              this.onWinEffect();
              const sec = this.container.querySelector('.primer-pos-section');
              if (sec) {
                sec.classList.add('section-completed');
                const st = sec.querySelector('.primer-section-title');
                if (st && !st.querySelector('.primer-done-badge')) {
                  st.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
                }
              }
            }
            const curBody = this.container.querySelector('#primer-pos-body');
            if (curBody) {
              curBody.innerHTML = this.renderPosBodyHTML(this.currentLesson, this.lessonState);
              this.attachPosEvents();
            }
          }, 700);
        } else {
          btn.classList.add('wrong');
          sound.playError();
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachMissingEvents() {
    const body = this.container.querySelector('#primer-missing-body');
    if (!body || !this.lessonState || !this.currentLesson) return;

    const speakWordBtn = body.querySelector('#primer-missing-word-speak');
    if (speakWordBtn) {
      speakWordBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(speakWordBtn.dataset.word, this.lang);
      });
    }

    let locked = false;
    body.querySelectorAll('.primer-missing-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (locked || !this.lessonState || !this.currentLesson || this.lessonState.missingRewarded) return;
        const rounds = this.currentLesson.missingLetterRounds || [];
        const curRound = rounds[this.lessonState.missingRoundIdx];
        if (!curRound) return;

        const chosen = btn.dataset.letter;
        if (chosen === curRound.correctLetter) {
          locked = true;
          btn.classList.add('found');
          const wordEl = body.querySelector('#primer-missing-word');
          if (wordEl) {
            wordEl.innerHTML = this.renderMissingWordHTML(curRound, true);
          }
          sound.playSuccess();
          sound.speakWord(curRound.word, this.lang);

          const savedIdx = this.selectedLetterIndex;
          setTimeout(() => {
            if (!this.lessonState || this.selectedLetterIndex !== savedIdx) return;
            this.lessonState.missingRoundIdx += 1;
            const total = rounds.length;
            const isRu = this.lang === 'ru';
            const isPl = this.lang === 'pl';
            const titleEl = this.container.querySelector('#primer-missing-title');
            if (titleEl) {
              const done = Math.min(this.lessonState.missingRoundIdx, total);
              titleEl.textContent = isRu
                ? `🧩 Почини слово: вставь букву! (${done}/${total})`
                : (isPl
                  ? `🧩 Napraw słowo: wstaw literę! (${done}/${total})`
                  : `🧩 Fix the word: pick the missing letter! (${done}/${total})`);
            }
            if (this.lessonState.missingRoundIdx >= total && !this.lessonState.missingRewarded) {
              this.lessonState.missingRewarded = true;
              this.onStarEarned(1);
              this.onWinEffect();
              const sec = this.container.querySelector('.primer-missing-section');
              if (sec) {
                sec.classList.add('section-completed');
                const st = sec.querySelector('.primer-section-title');
                if (st && !st.querySelector('.primer-done-badge')) {
                  st.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
                }
              }
            }
            const curBody = this.container.querySelector('#primer-missing-body');
            if (curBody) {
              curBody.innerHTML = this.renderMissingBodyHTML(this.currentLesson, this.lessonState);
              this.attachMissingEvents();
            }
          }, 800);
        } else {
          btn.classList.add('wrong');
          sound.playError();
          sound.speakLetter(chosen, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
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
    const btnWorkbooks = this.container.querySelector('#ab-btn-workbooks');

    if (btnExplore) btnExplore.addEventListener('click', () => this.switchSubMode('explore'));
    if (btnQuiz) btnQuiz.addEventListener('click', () => this.switchSubMode('quiz'));
    if (btnPuzzle) btnPuzzle.addEventListener('click', () => this.switchSubMode('puzzle'));
    if (btnWorkbooks) btnWorkbooks.addEventListener('click', () => this.switchSubMode('workbooks'));

    if (this.subMode === 'explore') {
      const cards = this.container.querySelectorAll('.ab-letter-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const idx = parseInt(card.dataset.index);
          this.openLetterModal(idx);
        });
      });
    } else if (this.subMode === 'quiz') {
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
