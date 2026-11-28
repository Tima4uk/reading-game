// Раздел «Слова»: Сетка слов, Собери слово, Барабан слов, Прочитай сам, Рифмы и Лишнее слово
import { sound } from './audio.js?v=31';
import { WordSearchGame } from './word-search.js?v=31';
import { WordBuilderGame } from './word-builder.js?v=31';
import { WordLogicGame } from './word-logic.js?v=31';
import { PracticeLabGame } from './practice-lab.js?v=31';

export class WordsHubGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});
    this.onWordFound = options.onWordFound || (() => {});
    this.onWordSearchComplete = options.onWordSearchComplete || (() => {});
    this.onWordBuilt = options.onWordBuilt || (() => {});

    this.subMode = 'search'; // 'search' | 'builder' | 'reel' | 'read' | 'rhyme' | 'odd'
    this.wordSearch = null;
    this.wordBuilder = null;
    this.wordLogic = null;
    this.practiceGame = null;
  }

  stop() {
    if (this.wordSearch && this.wordSearch.stop) {
      this.wordSearch.stop();
    }
    if (this.wordBuilder && this.wordBuilder.stop) {
      this.wordBuilder.stop();
    }
    if (this.wordLogic && this.wordLogic.stop) {
      this.wordLogic.stop();
    }
    if (this.practiceGame && this.practiceGame.stop) {
      this.practiceGame.stop();
    }
  }

  setLanguage(lang) {
    this.stop();
    this.lang = lang;
    this.start();
  }

  start() {
    this.stop();
    this.renderShell();
    this.mountActiveSubMode();
  }

  switchSubMode(mode) {
    if (this.subMode === mode && this.container.querySelector('#wh-content-area')) {
      return;
    }
    this.stop();
    sound.stopSpeech();
    sound.playLetterClick();
    this.subMode = mode;
    this.renderShell();
    this.mountActiveSubMode();
  }

  restartCurrentGame() {
    if (this.subMode === 'search' && this.wordSearch) {
      this.wordSearch.startNewGame();
    } else if (this.subMode === 'builder' && this.wordBuilder) {
      this.wordBuilder.startNewWord();
    } else {
      this.start();
    }
  }

  setDifficulty(diff, { forceBuilder = false, rerender = false } = {}) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ws_difficulty', diff);
      const curWb = localStorage.getItem('wb_difficulty');
      if (forceBuilder || curWb !== 'syllables') {
        localStorage.setItem('wb_difficulty', diff);
      }
    }
    if (this.wordSearch && this.wordSearch.difficulty !== diff) {
      this.wordSearch.difficulty = diff;
      this.wordSearch.gridSize = diff === 'hard' ? 8 : 6;
      this.wordSearch.usedWords.clear();
      if (rerender && this.subMode === 'search') {
        this.wordSearch.startNewGame();
      }
    }
    if (this.wordBuilder && (forceBuilder || this.wordBuilder.difficulty !== 'syllables')) {
      if (this.wordBuilder.difficulty !== diff) {
        this.wordBuilder.difficulty = diff;
        this.wordBuilder.usedWords.clear();
        if (rerender && this.subMode === 'builder') {
          this.wordBuilder.startNewWord();
        }
      }
    }
  }

  getSubnavItems() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    return [
      { id: 'search', icon: '🔍', label: isRu ? 'Сетка' : (isPl ? 'Wykreślanka' : 'Word Search') },
      { id: 'builder', icon: '🧩', label: isRu ? 'Собери слово' : (isPl ? 'Ułóż słowo' : 'Word Builder') },
      { id: 'reel', icon: '🎰', label: isRu ? 'Барабан слов' : (isPl ? 'Bęben słów' : 'Word Reel') },
      { id: 'read', icon: '👁️', label: isRu ? 'Прочитай сам' : (isPl ? 'Czytam sam' : 'Read & Match') },
      { id: 'rhyme', icon: '🎵', label: isRu ? 'Рифмы' : (isPl ? 'Rymy' : 'Rhymes') },
      { id: 'odd', icon: '🧠', label: isRu ? 'Лишнее слово' : (isPl ? 'Co nie pasuje?' : 'Odd One Out') }
    ];
  }

  renderShell() {
    if (!this.container) return;
    const items = this.getSubnavItems();

    this.container.innerHTML = `
      <div class="ab-wrapper">
        <div class="ab-subnav">
          ${items.map(item => `
            <button type="button"
                    class="ab-subnav-btn ${this.subMode === item.id ? 'active' : ''}"
                    id="wh-btn-${item.id}"
                    data-submode="${item.id}">
              ${item.icon} ${item.label}
            </button>
          `).join('')}
        </div>
        <div class="ab-content" id="wh-content-area"></div>
      </div>
    `;

    this.container.querySelectorAll('.ab-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchSubMode(btn.dataset.submode);
      });
    });
  }

  mountActiveSubMode() {
    const contentArea = this.container && this.container.querySelector('#wh-content-area');
    if (!contentArea) return;

    if (this.subMode === 'search') {
      if (!this.wordSearch) {
        this.wordSearch = new WordSearchGame({
          container: contentArea,
          lang: this.lang,
          gridSize: 6,
          onWordFound: this.onWordFound,
          onGameComplete: this.onWordSearchComplete
        });
        this.wordSearch.startNewGame();
      } else {
        this.wordSearch.container = contentArea;
        if (this.wordSearch.lang !== this.lang) {
          this.wordSearch.setLanguage(this.lang);
        } else {
          this.wordSearch.startNewGame();
        }
      }
      return;
    }

    if (this.subMode === 'builder') {
      if (!this.wordBuilder) {
        this.wordBuilder = new WordBuilderGame({
          container: contentArea,
          lang: this.lang,
          onWordCompleted: this.onWordBuilt
        });
        this.wordBuilder.startNewWord();
      } else {
        this.wordBuilder.container = contentArea;
        if (this.wordBuilder.lang !== this.lang) {
          this.wordBuilder.setLanguage(this.lang);
        } else {
          this.wordBuilder.startNewWord();
        }
      }
      return;
    }

    if (this.subMode === 'reel') {
      if (!this.practiceGame) {
        this.practiceGame = new PracticeLabGame({
          container: contentArea,
          lang: this.lang,
          showTabs: false,
          initialMode: 'reel',
          onStarEarned: this.onStarEarned,
          onWinEffect: this.onWinEffect
        });
        this.practiceGame.start();
      } else {
        this.practiceGame.container = contentArea;
        if (this.practiceGame.lang !== this.lang) {
          this.practiceGame.gameMode = 'reel';
          this.practiceGame.setLanguage(this.lang);
        } else {
          this.practiceGame.openMode('reel');
        }
      }
      return;
    }

    // 'read' | 'rhyme' | 'odd' -> WordLogicGame без собственной навигации
    if (!this.wordLogic) {
      this.wordLogic = new WordLogicGame({
        container: contentArea,
        lang: this.lang,
        showSubnav: false,
        initialSubMode: this.subMode,
        onStarEarned: this.onStarEarned,
        onWinEffect: this.onWinEffect
      });
      this.wordLogic.start();
    } else {
      this.wordLogic.container = contentArea;
      if (this.wordLogic.lang !== this.lang) {
        this.wordLogic.subMode = this.subMode;
        this.wordLogic.setLanguage(this.lang);
      } else {
        this.wordLogic.openSubMode(this.subMode);
      }
    }
  }
}
