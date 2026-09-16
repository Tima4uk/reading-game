// Модуль «Азбука» для детей 4.5 лет: Говорящая Азбука + Викторина + Конструктор букв
import { ALPHABET_DATA } from './data.js';
import { sound } from './audio.js';
import { LetterPuzzleGame } from './letter-puzzle.js';

export class AlphabetGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'explore'; // 'explore' | 'quiz' | 'puzzle'
    this.selectedLetterItem = null;

    // Состояние викторины (Quiz)
    this.quizTarget = null;
    this.quizOptions = [];
    this.quizAnswered = false;

    // Конструктор букв
    this.puzzleGame = null;
  }

  setLanguage(lang) {
    this.lang = lang;
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
      this.puzzleGame = new LetterPuzzleGame({
        container: contentArea,
        lang: this.lang,
        onStarEarned: this.onStarEarned,
        onWinEffect: this.onWinEffect
      });
      this.puzzleGame.start();
    }
  }

  render() {
    const isRu = this.lang === 'ru';
    const data = ALPHABET_DATA[this.lang];

    this.container.innerHTML = `
      <div class="ab-wrapper">
        <!-- Мини-переключатель режимов Азбуки -->
        <div class="ab-subnav">
          <button class="ab-subnav-btn ${this.subMode === 'explore' ? 'active' : ''}" id="ab-btn-explore">
            📖 ${isRu ? 'Все буквы' : 'Wszystkie litery'}
          </button>
          <button class="ab-subnav-btn ${this.subMode === 'quiz' ? 'active' : ''}" id="ab-btn-quiz">
            🎯 ${isRu ? 'Где буква?' : 'Gdzie jest litera?'}
          </button>
          <button class="ab-subnav-btn ${this.subMode === 'puzzle' ? 'active' : ''}" id="ab-btn-puzzle">
            🧩 ${isRu ? 'Собери букву' : 'Złóż literkę'}
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
    return `
      <div class="ab-modal-backdrop" id="ab-modal-close-bg"></div>
      <div class="ab-modal-box">
        <button class="ab-modal-close" id="ab-modal-btn-close">✖</button>
        
        <div class="ab-modal-main">
          <div class="ab-modal-letter">${item.letter}</div>
          <div class="ab-modal-emoji">${item.emoji}</div>
          <div class="ab-modal-word">${item.word}</div>
        </div>

        <div class="ab-modal-actions">
          <button class="ab-action-btn" id="ab-btn-prev">◀</button>
          <button class="ab-sound-btn" id="ab-btn-speak">
            🔊 ${isRu ? 'Послушать' : 'Posłuchaj'}
          </button>
          <button class="ab-action-btn" id="ab-btn-next">▶</button>
        </div>
      </div>
    `;
  }

  openLetterModal(index) {
    const data = ALPHABET_DATA[this.lang];
    this.selectedLetterItem = data[index];
    this.selectedLetterIndex = index;

    sound.playLetterClick();
    sound.speakLetterAndWord(this.selectedLetterItem.letter, this.selectedLetterItem.word, this.lang);

    const modal = this.container.querySelector('#ab-modal');
    if (modal) {
      modal.innerHTML = this.renderLetterModalContent(this.selectedLetterItem);
      modal.classList.remove('hidden');
      this.attachModalEvents();
    }
  }

  closeLetterModal() {
    this.selectedLetterItem = null;
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

    if (prevBtn) prevBtn.addEventListener('click', () => this.navigateLetter(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.navigateLetter(1));
  }

  // ==========================================
  // РЕЖИМ 2: Викторина «Где буква?»
  // ==========================================
  startNewQuizRound() {
    this.quizAnswered = false;
    const data = ALPHABET_DATA[this.lang];

    // Выбираем случайную целевую букву
    const target = data[Math.floor(Math.random() * data.length)];
    this.quizTarget = target;

    // Выбираем 2 других случайных буквы в качестве дистракторов
    const otherLetters = data.filter(d => d.letter !== target.letter);
    const shuffledOthers = [...otherLetters].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 2);

    // Перемешиваем варианты ответов (3 больших варианта)
    this.quizOptions = [target, ...distractors].sort(() => 0.5 - Math.random());

    this.render();

    // Озвучиваем вопрос: "Где буква М?"
    setTimeout(() => {
      sound.speakQuestion(this.quizTarget.letter, this.lang);
    }, 300);
  }

  renderQuizHTML() {
    const isRu = this.lang === 'ru';
    return `
      <div class="ab-quiz-box">
        <div class="ab-quiz-header">
          <div class="ab-quiz-prompt">
            ${isRu ? 'Где буква' : 'Gdzie jest litera'} 
            <span class="ab-target-letter-badge">${this.quizTarget.letter}</span> ?
          </div>
          <button class="ab-quiz-repeat-btn" id="ab-quiz-repeat" title="Повторить вопрос">
            🔊 ${isRu ? 'Повторить' : 'Powtórz'}
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
          ${isRu ? 'Нажми на правильную букву!' : 'Kliknij na odpowiednią literę!'}
        </div>
      </div>
    `;
  }

  handleQuizChoice(btn, letter) {
    if (this.quizAnswered) return;

    const isRu = this.lang === 'ru';
    const feedbackEl = this.container.querySelector('#ab-quiz-feedback');

    if (letter === this.quizTarget.letter) {
      // ПРАВИЛЬНО!
      this.quizAnswered = true;
      btn.classList.add('correct');
      sound.playSuccess();
      sound.speakLetterAndWord(this.quizTarget.letter, this.quizTarget.word, this.lang);

      if (feedbackEl) {
        feedbackEl.innerHTML = `⭐ <strong>${isRu ? 'Ура! Правильно!' : 'Brawo! Dobrze!'}</strong>`;
        feedbackEl.style.color = '#10b981';
      }

      this.onStarEarned(1);
      this.onWinEffect();

      // Переход к следующему вопросу
      setTimeout(() => {
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
          : `To jest litera ${letter} (${chosenWord}). Spróbuj jeszcze raz!`;
        feedbackEl.style.color = '#ef4444';
      }

      // Голосовая подсказка
      setTimeout(() => {
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
