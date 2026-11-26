// Раздел «Чтение»: Паровозик (слияние слогов), Ниточки, Ритм слогов, Тетради и Сказки
import { sound } from './audio.js?v=30';
import { PracticeLabGame } from './practice-lab.js?v=30';
import { KochamCzytacGame } from './kocham-czytac.js?v=30';
import { AfterPrimerGame } from './after-primer.js?v=30';

export class ReadingHubGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.subMode = 'blend'; // 'blend' | 'strings' | 'drum' | 'workbooks' | 'after_primer'
    this.practiceGame = null;
    this.workbooksGame = null;
    this.afterPrimerGame = null;
  }

  stop() {
    if (this.practiceGame && this.practiceGame.stop) {
      this.practiceGame.stop();
    }
    if (this.workbooksGame && this.workbooksGame.stop) {
      this.workbooksGame.stop();
    }
    if (this.afterPrimerGame && this.afterPrimerGame.stop) {
      this.afterPrimerGame.stop();
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
    if (this.subMode === mode && this.container.querySelector('#rh-content-area')) {
      return;
    }
    this.stop();
    sound.stopSpeech();
    sound.playLetterClick();
    this.subMode = mode;
    this.renderShell();
    this.mountActiveSubMode();
  }

  getSubnavItems() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    return [
      { id: 'blend', icon: '🚂', label: isRu ? 'Паровозик' : (isPl ? 'Pociąg' : 'Blend Train') },
      { id: 'strings', icon: '🪢', label: isRu ? 'Ниточки' : (isPl ? 'Nitki' : 'Strings') },
      { id: 'drum', icon: '🥁', label: isRu ? 'Ритм слогов' : (isPl ? 'Rytm sylab' : 'Syllable Beat') },
      { id: 'workbooks', icon: '📚', label: isRu ? 'Тетради' : (isPl ? 'Zeszyty' : 'Workbooks') },
      { id: 'after_primer', icon: '🦉', label: isRu ? 'Сказки' : (isPl ? 'Bajki' : 'Stories') }
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
                    id="rh-btn-${item.id}"
                    data-submode="${item.id}">
              ${item.icon} ${item.label}
            </button>
          `).join('')}
        </div>
        <div class="ab-content" id="rh-content-area"></div>
      </div>
    `;

    this.container.querySelectorAll('.ab-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchSubMode(btn.dataset.submode);
      });
    });
  }

  mountActiveSubMode() {
    const contentArea = this.container && this.container.querySelector('#rh-content-area');
    if (!contentArea) return;

    if (this.subMode === 'blend' || this.subMode === 'strings' || this.subMode === 'drum') {
      if (!this.practiceGame) {
        this.practiceGame = new PracticeLabGame({
          container: contentArea,
          lang: this.lang,
          showTabs: false,
          initialMode: this.subMode,
          onStarEarned: this.onStarEarned,
          onWinEffect: this.onWinEffect
        });
        this.practiceGame.start();
      } else {
        this.practiceGame.container = contentArea;
        if (this.practiceGame.lang !== this.lang) {
          this.practiceGame.gameMode = this.subMode;
          this.practiceGame.setLanguage(this.lang);
        } else {
          this.practiceGame.openMode(this.subMode);
        }
      }
      return;
    }

    if (this.subMode === 'workbooks') {
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
      return;
    }

    if (this.subMode === 'after_primer') {
      if (!this.afterPrimerGame) {
        this.afterPrimerGame = new AfterPrimerGame({
          container: contentArea,
          lang: this.lang,
          onStarEarned: this.onStarEarned,
          onWinEffect: this.onWinEffect
        });
        this.afterPrimerGame.start();
      } else {
        this.afterPrimerGame.container = contentArea;
        if (this.afterPrimerGame.lang !== this.lang) {
          this.afterPrimerGame.setLanguage(this.lang);
        } else {
          this.afterPrimerGame.start();
        }
      }
    }
  }
}
