// Главный модуль приложения: Управление режимами, языками, звездами и конфетти
import { WordSearchGame } from './word-search.js?v=7';
import { WordBuilderGame } from './word-builder.js?v=7';
import { WordLogicGame } from './word-logic.js?v=7';
import { AlphabetGame } from './alphabet.js?v=7';
import { WordTranslateGame } from './word-translate.js?v=7';
import { sound } from './audio.js?v=7';
import { PRAISE_PHRASES } from './data.js?v=7';

class App {
  constructor() {
    this.currentMode = 'search'; // 'search' | 'builder' | 'logic' | 'alphabet'
    this.currentLang = 'ru'; // 'ru' | 'pl'
    this.stars = parseInt(localStorage.getItem('reading_game_stars') || '0', 10);

    this.initDOM();
    this.initGames();
    this.attachGlobalEvents();
    this.updateLanguageUI();
    this.switchMode('search');
  }

  initDOM() {
    this.gameContainer = document.getElementById('game-area');
    this.starCountEl = document.getElementById('star-count');
    this.btnLangRu = document.getElementById('btn-lang-ru');
    this.btnLangPl = document.getElementById('btn-lang-pl');
    this.btnLangEn = document.getElementById('btn-lang-en');
    this.btnModeSearch = document.getElementById('tab-search');
    this.btnModeBuilder = document.getElementById('tab-builder');
    this.btnModeLogic = document.getElementById('tab-logic');
    this.btnModeAlphabet = document.getElementById('tab-alphabet');
    this.btnModeTranslate = document.getElementById('tab-translate');
    this.btnSound = document.getElementById('btn-sound');
    this.btnFullscreen = document.getElementById('btn-fullscreen');
    this.celebrationModal = document.getElementById('celebration-modal');

    this.updateStarsDisplay();
  }

  initGames() {
    // Режим Сетка-поиск
    this.wordSearch = new WordSearchGame({
      container: this.gameContainer,
      lang: this.currentLang,
      gridSize: 6,
      onWordFound: (word) => {
        this.addStars(1);
        this.launchMiniConfetti();
      },
      onGameComplete: () => {
        this.addStars(3);
        this.celebrateRoundWin();
      }
    });

    // Режим Собери слово
    this.wordBuilder = new WordBuilderGame({
      container: this.gameContainer,
      lang: this.currentLang,
      onWordCompleted: (word) => {
        this.addStars(2);
        this.launchMiniConfetti();
        this.speakPraise();
      }
    });

    // Режим Умные слова (для 7 лет: Рифмы + Лишнее слово)
    this.wordLogic = new WordLogicGame({
      container: this.gameContainer,
      lang: this.currentLang,
      onStarEarned: (count) => {
        this.addStars(count);
      },
      onWinEffect: () => {
        this.launchMiniConfetti();
      }
    });

    // Режим Азбука (для 4.5 лет)
    this.alphabetGame = new AlphabetGame({
      container: this.gameContainer,
      lang: this.currentLang,
      onStarEarned: (count) => {
        this.addStars(count);
      },
      onWinEffect: () => {
        this.launchMiniConfetti();
      }
    });

    // Режим Перевод слов (Пары карточек и Викторина 1 из 3)
    this.wordTranslate = new WordTranslateGame({
      container: this.gameContainer,
      lang: this.currentLang,
      onStarEarned: (count) => {
        this.addStars(count);
      },
      onWinEffect: () => {
        this.launchMiniConfetti();
      }
    });
  }

  attachGlobalEvents() {
    // Переключение языков
    this.btnLangRu.addEventListener('click', () => this.setLanguage('ru'));
    this.btnLangPl.addEventListener('click', () => this.setLanguage('pl'));
    if (this.btnLangEn) {
      this.btnLangEn.addEventListener('click', () => this.setLanguage('en'));
    }

    // Переключение режимов игры
    this.btnModeSearch.addEventListener('click', () => this.switchMode('search'));
    this.btnModeBuilder.addEventListener('click', () => this.switchMode('builder'));
    if (this.btnModeLogic) {
      this.btnModeLogic.addEventListener('click', () => this.switchMode('logic'));
    }
    if (this.btnModeAlphabet) {
      this.btnModeAlphabet.addEventListener('click', () => this.switchMode('alphabet'));
    }
    if (this.btnModeTranslate) {
      this.btnModeTranslate.addEventListener('click', () => this.switchMode('translate'));
    }

    // Звук вкл/выкл
    this.btnSound.addEventListener('click', () => {
      const enabled = sound.toggleSound();
      this.btnSound.textContent = enabled ? '🔊' : '🔇';
      this.btnSound.classList.toggle('muted', !enabled);
    });

    // Полноэкранный режим (для планшетов)
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Модальное окно победы
    const nextRoundBtn = document.getElementById('btn-next-round');
    if (nextRoundBtn) {
      nextRoundBtn.addEventListener('click', () => {
        this.celebrationModal.classList.add('hidden');
        if (this.currentMode === 'search') {
          this.wordSearch.startNewGame();
        } else if (this.currentMode === 'builder') {
          this.wordBuilder.startNewWord();
        } else if (this.currentMode === 'logic') {
          this.wordLogic.start();
        } else if (this.currentMode === 'alphabet') {
          this.alphabetGame.start();
        } else if (this.currentMode === 'translate') {
          this.wordTranslate.start();
        }
      });
    }
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    sound.playLetterClick();

    this.btnLangRu.classList.toggle('active', lang === 'ru');
    this.btnLangPl.classList.toggle('active', lang === 'pl');
    if (this.btnLangEn) {
      this.btnLangEn.classList.toggle('active', lang === 'en');
    }

    this.updateLanguageUI();

    this.wordSearch.lang = lang;
    this.wordBuilder.lang = lang;
    this.wordLogic.lang = lang;
    this.alphabetGame.lang = lang;
    if (this.wordTranslate) {
      this.wordTranslate.lang = lang;
    }

    if (this.currentMode === 'search') {
      this.wordSearch.setLanguage(lang);
    } else if (this.currentMode === 'builder') {
      this.wordBuilder.setLanguage(lang);
    } else if (this.currentMode === 'logic') {
      this.wordLogic.setLanguage(lang);
    } else if (this.currentMode === 'alphabet') {
      this.alphabetGame.setLanguage(lang);
    } else if (this.currentMode === 'translate') {
      this.wordTranslate.setLanguage(lang);
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    sound.playLetterClick();

    this.btnModeSearch.classList.toggle('active', mode === 'search');
    this.btnModeBuilder.classList.toggle('active', mode === 'builder');
    if (this.btnModeLogic) {
      this.btnModeLogic.classList.toggle('active', mode === 'logic');
    }
    if (this.btnModeAlphabet) {
      this.btnModeAlphabet.classList.toggle('active', mode === 'alphabet');
    }
    if (this.btnModeTranslate) {
      this.btnModeTranslate.classList.toggle('active', mode === 'translate');
    }

    if (mode === 'search') {
      this.wordSearch.setLanguage(this.currentLang);
    } else if (mode === 'builder') {
      this.wordBuilder.setLanguage(this.currentLang);
    } else if (mode === 'logic') {
      this.wordLogic.setLanguage(this.currentLang);
    } else if (mode === 'alphabet') {
      this.alphabetGame.setLanguage(this.currentLang);
    } else if (mode === 'translate') {
      this.wordTranslate.setLanguage(this.currentLang);
    }
  }

  updateLanguageUI() {
    const lang = this.currentLang;
    const isRu = lang === 'ru';
    const isPl = lang === 'pl';
    const isEn = lang === 'en';

    document.getElementById('app-title').textContent = isRu 
      ? 'Словознайка' 
      : (isPl ? 'Słowotwórca' : 'WordQuest');

    this.btnModeSearch.querySelector('.tab-text').textContent = isRu 
      ? 'Сетка' 
      : (isPl ? 'Wykreślanka' : 'Search');

    this.btnModeBuilder.querySelector('.tab-text').textContent = isRu 
      ? 'Слово' 
      : (isPl ? 'Słowa' : 'Builder');

    if (this.btnModeLogic) {
      this.btnModeLogic.querySelector('.tab-text').textContent = isRu 
        ? 'Логика' 
        : (isPl ? 'Logika' : 'Logic');
    }
    if (this.btnModeAlphabet) {
      this.btnModeAlphabet.querySelector('.tab-text').textContent = isRu 
        ? 'Азбука' 
        : (isPl ? 'Alfabet' : 'ABC');
    }
    if (this.btnModeTranslate) {
      this.btnModeTranslate.querySelector('.tab-text').textContent = isRu 
        ? 'Перевод' 
        : (isPl ? 'Tłumacz' : 'Translate');
    }

    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.querySelector('.modal-subtitle');
    const modalBtn = document.getElementById('btn-next-round');
    if (modalTitle) {
      modalTitle.textContent = isRu 
        ? 'Ура! Все слова найдены!' 
        : (isPl ? 'Brawo! Wszystkie słowa odnalezione!' : 'Awesome! All words found!');
    }
    if (modalSubtitle) {
      modalSubtitle.textContent = isRu 
        ? '+3 ⭐ в копилку!' 
        : (isPl ? '+3 ⭐ do skarbonki!' : '+3 ⭐ added to bank!');
    }
    if (modalBtn) {
      modalBtn.textContent = isRu 
        ? 'Играть ещё! 🚀' 
        : (isPl ? 'Graj dalej! 🚀' : 'Play again! 🚀');
    }

    const footerSpan = document.querySelector('.app-footer span');
    if (footerSpan) {
      footerSpan.textContent = isRu 
        ? 'Нажимай на слова, чтобы услышать, как они звучат! 🔊' 
        : (isPl ? 'Dotknij słowa, aby usłyszeć jak brzmi! 🔊' : 'Tap on words to hear how they sound! 🔊');
    }
  }

  addStars(count) {
    this.stars += count;
    localStorage.setItem('reading_game_stars', this.stars.toString());
    this.updateStarsDisplay();

    // Анимация подпрыгивания счетчика звезд
    this.starCountEl.parentElement.classList.add('star-bump');
    setTimeout(() => {
      this.starCountEl.parentElement.classList.remove('star-bump');
    }, 400);
  }

  updateStarsDisplay() {
    this.starCountEl.textContent = this.stars;
  }

  speakPraise() {
    const phrases = PRAISE_PHRASES[this.currentLang];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    setTimeout(() => {
      sound.speakPhrase(phrase, this.currentLang);
    }, 1100);
  }

  celebrateRoundWin() {
    this.celebrationModal.classList.remove('hidden');
    this.launchFullConfetti();
    this.speakPraise();
  }

  // Конфетти анимация на Canvas
  launchMiniConfetti() {
    this.spawnConfettiParticles(25);
  }

  launchFullConfetti() {
    this.spawnConfettiParticles(80);
  }

  spawnConfettiParticles(count) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const colors = ['#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#7209B7', '#FFA07A'];
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // гравитация
        p.rotation += p.vr;
        if (frame > 20) p.alpha -= 0.02;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  }
}

// Запуск приложения после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
