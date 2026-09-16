// Модуль «Умные слова» для 7 лет: «Найди рифму» и «Лишнее слово»
import { RHYMES_DATA, ODD_ONE_OUT_DATA } from './data.js';
import { sound } from './audio.js';

export class WordLogicGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'rhyme'; // 'rhyme' | 'odd'
    this.currentRhymeIndex = 0;
    this.currentOddIndex = 0;

    this.shuffledRhymes = [];
    this.shuffledOdds = [];
    this.roundAnswered = false;
  }

  setLanguage(lang) {
    this.lang = lang;
    this.start();
  }

  start() {
    this.roundAnswered = false;
    this.shuffledRhymes = [...RHYMES_DATA[this.lang]].sort(() => 0.5 - Math.random());
    this.shuffledOdds = [...ODD_ONE_OUT_DATA[this.lang]].sort(() => 0.5 - Math.random());
    this.currentRhymeIndex = 0;
    this.currentOddIndex = 0;
    this.render();
  }

  switchSubMode(mode) {
    this.subMode = mode;
    sound.playLetterClick();
    this.roundAnswered = false;
    this.render();
  }

  render() {
    const isRu = this.lang === 'ru';

    this.container.innerHTML = `
      <div class="wl-wrapper">
        <!-- Переключатель подрежимов -->
        <div class="wl-subnav">
          <button class="wl-subnav-btn ${this.subMode === 'rhyme' ? 'active' : ''}" id="wl-btn-rhyme">
            🎵 ${isRu ? 'Найди рифму' : 'Znajdź rym'}
          </button>
          <button class="wl-subnav-btn ${this.subMode === 'odd' ? 'active' : ''}" id="wl-btn-odd">
            🧠 ${isRu ? 'Лишнее слово' : 'Co nie pasuje?'}
          </button>
        </div>

        <div class="wl-content">
          ${this.subMode === 'rhyme' ? this.renderRhymeHTML() : this.renderOddHTML()}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  // ==========================================
  // РЕЖИМ: НАЙДИ РИФМУ
  // ==========================================
  renderRhymeHTML() {
    const isRu = this.lang === 'ru';
    const round = this.shuffledRhymes[this.currentRhymeIndex % this.shuffledRhymes.length];

    // Варианты ответов: 1 правильный + дистракторы
    if (!round.optionsCache) {
      round.optionsCache = [round.correct, ...round.distractors].sort(() => 0.5 - Math.random());
    }

    return `
      <div class="wl-box">
        <div class="wl-prompt">
          ${isRu ? 'Подбери рифму к слову:' : 'Dobierz rym do słowa:'}
        </div>

        <div class="wl-target-card" id="wl-target-rhyme">
          <span class="wl-target-emoji">${round.target.emoji}</span>
          <span class="wl-target-word">${round.target.word}</span>
          <span class="wl-sound-icon" title="Послушать">🔊</span>
        </div>

        <div class="wl-options-grid">
          ${round.optionsCache.map((opt, i) => `
            <button class="wl-option-btn" data-word="${opt.word}" data-is-correct="${opt.word === round.correct.word}">
              <span class="wl-option-emoji">${opt.emoji}</span>
              <span class="wl-option-word">${opt.word}</span>
            </button>
          `).join('')}
        </div>

        <div class="wl-feedback" id="wl-feedback">
          ${isRu ? 'Что звучит складно?' : 'Co brzmi podobnie?'}
        </div>
      </div>
    `;
  }

  handleRhymeChoice(btn, isCorrect, chosenWord) {
    if (this.roundAnswered) return;

    const isRu = this.lang === 'ru';
    const round = this.shuffledRhymes[this.currentRhymeIndex % this.shuffledRhymes.length];
    const feedbackEl = this.container.querySelector('#wl-feedback');

    if (isCorrect) {
      this.roundAnswered = true;
      btn.classList.add('correct');
      sound.playSuccess();
      sound.speakRhyme(round.target.word, round.correct.word, this.lang);

      if (feedbackEl) {
        feedbackEl.innerHTML = `⭐ <strong>${round.target.word} — ${round.correct.word}! ${isRu ? 'В рифму!' : 'Rymuje się!'}</strong>`;
        feedbackEl.style.color = '#10b981';
      }

      this.onStarEarned(2);
      this.onWinEffect();

      setTimeout(() => {
        this.currentRhymeIndex++;
        this.roundAnswered = false;
        this.render();
      }, 2300);

    } else {
      btn.classList.add('wrong');
      sound.playError();

      if (feedbackEl) {
        feedbackEl.textContent = isRu 
          ? `«${chosenWord}» не рифмуется с «${round.target.word}». Попробуй еще!` 
          : `«${chosenWord}» nie rymuje się z «${round.target.word}». Spróbuj jeszcze!`;
        feedbackEl.style.color = '#ef4444';
      }

      sound.speakWord(chosenWord, this.lang);
    }
  }

  // ==========================================
  // РЕЖИМ: ЛИШНЕЕ СЛОВО
  // ==========================================
  renderOddHTML() {
    const isRu = this.lang === 'ru';
    const round = this.shuffledOdds[this.currentOddIndex % this.shuffledOdds.length];

    return `
      <div class="wl-box">
        <div class="wl-prompt">
          ${isRu ? 'Какое слово здесь лишнее?' : 'Które słowo tu nie pasuje?'}
        </div>

        <div class="wl-odd-grid">
          ${round.items.map(item => `
            <button class="wl-odd-btn" data-word="${item.word}" data-is-odd="${item.word === round.oddWord}">
              <span class="wl-odd-emoji">${item.emoji}</span>
              <span class="wl-odd-word">${item.word}</span>
            </button>
          `).join('')}
        </div>

        <div class="wl-feedback" id="wl-feedback">
          ${isRu ? 'Прочитай слова и найди то, что не подходит к остальным!' : 'Przeczytaj słowa i wskaż to, które nie pasuje!'}
        </div>
      </div>
    `;
  }

  handleOddChoice(btn, isOdd, chosenWord) {
    if (this.roundAnswered) return;

    const isRu = this.lang === 'ru';
    const round = this.shuffledOdds[this.currentOddIndex % this.shuffledOdds.length];
    const feedbackEl = this.container.querySelector('#wl-feedback');

    if (isOdd) {
      this.roundAnswered = true;
      btn.classList.add('correct');
      sound.playSuccess();
      sound.speakExplanation(round.explanation, this.lang);

      if (feedbackEl) {
        feedbackEl.innerHTML = `⭐ <strong>${round.explanation}</strong>`;
        feedbackEl.style.color = '#10b981';
      }

      this.onStarEarned(2);
      this.onWinEffect();

      setTimeout(() => {
        this.currentOddIndex++;
        this.roundAnswered = false;
        this.render();
      }, 3000);

    } else {
      btn.classList.add('wrong');
      sound.playError();

      if (feedbackEl) {
        feedbackEl.textContent = isRu 
          ? `«${chosenWord}» подходит к группе. Ищи другое!` 
          : `«${chosenWord}» pasuje do reszty. Szukaj dalej!`;
        feedbackEl.style.color = '#ef4444';
      }

      sound.speakWord(chosenWord, this.lang);
    }
  }

  attachEvents() {
    const btnRhyme = this.container.querySelector('#wl-btn-rhyme');
    const btnOdd = this.container.querySelector('#wl-btn-odd');

    if (btnRhyme) btnRhyme.addEventListener('click', () => this.switchSubMode('rhyme'));
    if (btnOdd) btnOdd.addEventListener('click', () => this.switchSubMode('odd'));

    if (this.subMode === 'rhyme') {
      const targetCard = this.container.querySelector('#wl-target-rhyme');
      const round = this.shuffledRhymes[this.currentRhymeIndex % this.shuffledRhymes.length];

      if (targetCard) {
        targetCard.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakWord(round.target.word, this.lang);
        });
      }

      const optBtns = this.container.querySelectorAll('.wl-option-btn');
      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const isCorrect = btn.dataset.isCorrect === 'true';
          const word = btn.dataset.word;
          this.handleRhymeChoice(btn, isCorrect, word);
        });
      });

    } else {
      // Режим «Лишнее слово»
      const oddBtns = this.container.querySelectorAll('.wl-odd-btn');
      oddBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const isOdd = btn.dataset.isOdd === 'true';
          const word = btn.dataset.word;
          this.handleOddChoice(btn, isOdd, word);
        });
      });
    }
  }
}
