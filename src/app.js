// Главный модуль приложения: Управление режимами, языками, звездами и конфетти
import { AlphabetGame } from './alphabet.js?v=31';
import { ReadingHubGame } from './reading-hub.js?v=31';
import { WordsHubGame } from './words-hub.js?v=31';
import { WordTranslateGame } from './word-translate.js?v=31';
import { sound } from './audio.js?v=31';
import { PRAISE_PHRASES } from './data.js?v=31';
import { StickersAlbum } from './stickers.js?v=31';

class App {
  constructor() {
    this.praiseTimer = null;

    this.initProfiles();
    const activeProfile = this.profiles[this.activePlayerId];
    this.currentLang = activeProfile.lang || 'ru'; // 'ru' | 'pl' | 'en'
    this.currentMode = activeProfile.lastMode || 'words'; // 'letters' | 'reading' | 'words' | 'translate'
    this.syncDifficultyStorage(activeProfile.difficulty, { forceBuilder: true });

    this.initDOM();
    this.applyTheme(activeProfile.theme);
    this.initGames();
    this.wordTranslate.difficulty = activeProfile.difficulty;
    this.attachGlobalEvents();

    this.btnLangRu.classList.toggle('active', this.currentLang === 'ru');
    this.btnLangPl.classList.toggle('active', this.currentLang === 'pl');
    if (this.btnLangEn) {
      this.btnLangEn.classList.toggle('active', this.currentLang === 'en');
    }

    this.updateLanguageUI();
    this.updateProfilesUI();
    this.updateAlbumBadge();
    this.switchMode(this.currentMode, { silent: true });
  }

  syncDifficultyStorage(diff, { forceBuilder = false } = {}) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('ws_difficulty', diff);
    if (forceBuilder || localStorage.getItem('wb_difficulty') !== 'syllables') {
      localStorage.setItem('wb_difficulty', diff);
    }
  }

  normalizeProfile(raw, fallback) {
    const base = raw && typeof raw === 'object' ? { ...fallback, ...raw } : { ...fallback };
    if (!Array.isArray(base.stickers)) base.stickers = [];
    if (!['ru', 'pl', 'en'].includes(base.lang)) base.lang = fallback.lang;
    if (base.difficulty !== 'hard' && base.difficulty !== 'easy') base.difficulty = fallback.difficulty;
    if (!['letters', 'reading', 'words', 'translate'].includes(base.lastMode)) base.lastMode = fallback.lastMode;
    if (!['day', 'forest', 'cozy', 'space'].includes(base.theme)) base.theme = fallback.theme || 'day';
    base.stars = Number.isFinite(Number(base.stars)) ? Number(base.stars) : 0;
    return base;
  }

  initProfiles() {
    const legacyStars = parseInt(localStorage.getItem('reading_game_stars') || '0', 10) || 0;
    const defaultProfiles = {
      player1: { id: 'player1', name: 'Игрок 1', avatar: '👦', stars: legacyStars, stickers: [], lang: 'ru', difficulty: 'easy', lastMode: 'words', theme: 'day' },
      player2: { id: 'player2', name: 'Игрок 2', avatar: '👧', stars: 0, stickers: [], lang: 'ru', difficulty: 'easy', lastMode: 'words', theme: 'day' }
    };

    let p1 = null;
    let p2 = null;
    try {
      p1 = JSON.parse(localStorage.getItem('reading_game_profile_player1'));
    } catch (_) {}
    try {
      p2 = JSON.parse(localStorage.getItem('reading_game_profile_player2'));
    } catch (_) {}

    this.profiles = {
      player1: this.normalizeProfile(p1, defaultProfiles.player1),
      player2: this.normalizeProfile(p2, defaultProfiles.player2)
    };

    this.activePlayerId = localStorage.getItem('reading_game_active_player') || 'player1';
    if (!this.profiles[this.activePlayerId]) {
      this.activePlayerId = 'player1';
    }

    this.stars = this.profiles[this.activePlayerId].stars || 0;
    this.saveProfile(this.activePlayerId);
  }

  saveProfile(playerId) {
    if (!this.profiles[playerId]) return;
    localStorage.setItem(`reading_game_profile_${playerId}`, JSON.stringify(this.profiles[playerId]));
    localStorage.setItem('reading_game_active_player', this.activePlayerId);
    if (this.activePlayerId === playerId) {
      localStorage.setItem('reading_game_stars', this.profiles[playerId].stars.toString());
    }
  }

  switchPlayer(playerId) {
    if (!this.profiles[playerId] || this.activePlayerId === playerId) return;
    this.stopAllGames();
    this.activePlayerId = playerId;
    const p = this.profiles[playerId];
    this.stars = p.stars || 0;
    const targetLang = ['ru', 'pl', 'en'].includes(p.lang) ? p.lang : 'ru';
    const targetDiff = p.difficulty === 'hard' ? 'hard' : 'easy';
    const targetMode = ['letters', 'reading', 'words', 'translate'].includes(p.lastMode) ? p.lastMode : 'words';

    this.currentLang = targetLang;
    this.currentMode = targetMode;
    this.saveProfile(this.activePlayerId);

    sound.playLetterClick();
    this.syncDifficultyStorage(targetDiff, { forceBuilder: true });

    if (this.wordsHub) {
      this.wordsHub.lang = targetLang;
      this.wordsHub.setDifficulty(targetDiff, { forceBuilder: true, rerender: false });
    }
    if (this.alphabetGame) this.alphabetGame.lang = targetLang;
    if (this.readingHub) this.readingHub.lang = targetLang;
    if (this.wordTranslate) {
      this.wordTranslate.lang = targetLang;
      this.wordTranslate.difficulty = targetDiff;
    }

    this.btnLangRu.classList.toggle('active', targetLang === 'ru');
    this.btnLangPl.classList.toggle('active', targetLang === 'pl');
    if (this.btnLangEn) {
      this.btnLangEn.classList.toggle('active', targetLang === 'en');
    }

    this.updateLanguageUI();
    this.updateProfilesUI();
    this.updateStarsDisplay();
    this.updateAlbumBadge();
    this.applyTheme(p.theme);
    this.switchMode(targetMode, { silent: true });
  }

  applyTheme(themeId) {
    const allowed = ['day', 'forest', 'cozy', 'space'];
    const safeTheme = allowed.includes(themeId) ? themeId : 'day';
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = safeTheme;
      const themeColors = {
        day: '#3B82F6',
        forest: '#10B981',
        cozy: '#D97706',
        space: '#1E2235'
      };
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', themeColors[safeTheme] || '#3B82F6');
      }
      document.querySelectorAll('.theme-pick-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.themeId === safeTheme);
      });
    }
  }

  setProfileTheme(themeId) {
    if (!['day', 'forest', 'cozy', 'space'].includes(themeId)) return;
    if (this.profiles && this.profiles[this.activePlayerId]) {
      this.profiles[this.activePlayerId].theme = themeId;
      this.saveProfile(this.activePlayerId);
    }
    this.applyTheme(themeId);
    sound.playLetterClick();
  }

  setProfileDifficulty(diff) {
    if (diff !== 'easy' && diff !== 'hard') return;
    const profile = this.profiles[this.activePlayerId];
    if (!profile) return;
    profile.difficulty = diff;
    this.saveProfile(this.activePlayerId);
    sound.playLetterClick();

    if (this.wordsHub) {
      this.wordsHub.setDifficulty(diff, { forceBuilder: true, rerender: this.currentMode === 'words' });
    } else {
      this.syncDifficultyStorage(diff, { forceBuilder: true });
    }
    if (this.wordTranslate) {
      this.wordTranslate.difficulty = diff;
      if (this.currentMode === 'translate') {
        this.wordTranslate.start();
      }
    }
    this.updateProfilesUI();
  }

  updateAlbumBadge() {
    const countEl = document.getElementById('header-album-text');
    const albumBtn = document.getElementById('btn-album');
    if (countEl && this.stickersAlbum) {
      countEl.textContent = `${this.stickersAlbum.getUnlockedCount()}/${this.stickersAlbum.getTotalCount()}`;
    }
    if (albumBtn && this.stickersAlbum) {
      albumBtn.classList.toggle('can-buy', this.stars >= this.stickersAlbum.getNextStickerPrice());
    }
  }

  updateProfilesUI() {
    const current = this.profiles[this.activePlayerId];
    const headerAvatar = document.getElementById('header-profile-avatar');
    const headerName = document.getElementById('header-profile-name');
    if (headerAvatar) headerAvatar.textContent = current.avatar;
    if (headerName) headerName.textContent = current.name;

    // Карточки внутри модалки
    ['player1', 'player2'].forEach(id => {
      const p = this.profiles[id];
      const card = document.getElementById(`card-${id}`);
      const av = document.getElementById(`avatar-${id}`);
      const nm = document.getElementById(`name-${id}`);
      const st = document.getElementById(`stars-${id}`);
      const stk = document.getElementById(`stickers-${id}`);
      const meta = document.getElementById(`meta-${id}`);
      const btn = document.getElementById(`select-${id}`);

      if (av) av.textContent = p.avatar;
      if (nm) nm.textContent = p.name;
      if (st) st.textContent = p.stars;
      if (stk) {
        const count = Array.isArray(p.stickers) ? p.stickers.length : 0;
        const total = this.stickersAlbum ? this.stickersAlbum.getTotalCount() : 24;
        stk.textContent = `${count}/${total}`;
      }
      if (meta) {
        const flag = p.lang === 'pl' ? '🇵🇱' : (p.lang === 'en' ? '🇬🇧' : '🇷🇺');
        const diffIcon = p.difficulty === 'hard' ? '🚀' : '🐣';
        meta.textContent = `${flag} ${diffIcon}`;
      }

      const isActive = (this.activePlayerId === id);
      if (card) card.classList.toggle('active', isActive);
      if (btn) {
        btn.textContent = isActive 
          ? (this.currentLang === 'ru' ? 'Активен ✓' : (this.currentLang === 'pl' ? 'Aktywny ✓' : 'Active ✓'))
          : (this.currentLang === 'ru' ? 'Выбрать' : (this.currentLang === 'pl' ? 'Wybierz' : 'Select'));
      }
    });

    // Поле ввода имени активного игрока
    const nameInput = document.getElementById('profile-name-input');
    if (nameInput && document.activeElement !== nameInput) {
      nameInput.value = current.name;
    }

    // Подсветка уровня сложности активного игрока
    const btnDiffEasy = document.getElementById('btn-profile-diff-easy');
    const btnDiffHard = document.getElementById('btn-profile-diff-hard');
    if (btnDiffEasy) btnDiffEasy.classList.toggle('active', current.difficulty !== 'hard');
    if (btnDiffHard) btnDiffHard.classList.toggle('active', current.difficulty === 'hard');

    // Подсветка активной аватарки в сетке выбора
    const avatarBtns = document.querySelectorAll('.avatar-pick-btn');
    avatarBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.avatar === current.avatar);
    });

    this.updateAlbumBadge();
  }

  initDOM() {
    this.gameContainer = document.getElementById('game-area');
    this.starCountEl = document.getElementById('star-count');
    this.btnProfile = document.getElementById('btn-profile');
    this.profileModal = document.getElementById('profile-modal');
    this.btnCloseProfile = document.getElementById('btn-close-profile');
    this.btnSettings = document.getElementById('btn-settings');
    this.settingsModal = document.getElementById('settings-modal');
    this.btnCloseSettings = document.getElementById('btn-close-settings');
    this.headerLangFlag = document.getElementById('header-lang-flag');
    this.btnLangRu = document.getElementById('btn-lang-ru');
    this.btnLangPl = document.getElementById('btn-lang-pl');
    this.btnLangEn = document.getElementById('btn-lang-en');
    this.btnModeLetters = document.getElementById('tab-letters');
    this.btnModeReading = document.getElementById('tab-reading');
    this.btnModeWords = document.getElementById('tab-words');
    this.btnModeTranslate = document.getElementById('tab-translate');
    this.btnSound = document.getElementById('btn-sound');
    this.btnFullscreen = document.getElementById('btn-fullscreen');
    this.celebrationModal = document.getElementById('celebration-modal');

    this.albumModal = document.getElementById('album-modal');
    if (this.albumModal) {
      this.stickersAlbum = new StickersAlbum({
        app: this,
        modalEl: this.albumModal
      });
    }

    this.updateStarsDisplay();
  }

  initGames() {
    // Режим «Буквы» (Букварь, Прописи, Собери букву, Где буква?, Шалунишки)
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

    // Режим «Чтение» (Паровозик, Ниточки, Ритм слогов, Тетради, Сказки)
    this.readingHub = new ReadingHubGame({
      container: this.gameContainer,
      lang: this.currentLang,
      onStarEarned: (count) => {
        this.addStars(count);
      },
      onWinEffect: () => {
        this.launchMiniConfetti();
      }
    });

    // Режим «Слова» (Сетка, Собери слово, Барабан слов, Прочитай сам, Рифмы, Лишнее)
    this.wordsHub = new WordsHubGame({
      container: this.gameContainer,
      lang: this.currentLang,
      onStarEarned: (count) => {
        this.addStars(count);
      },
      onWinEffect: () => {
        this.launchMiniConfetti();
      },
      onWordFound: () => {
        this.addStars(1);
        this.launchMiniConfetti();
      },
      onWordSearchComplete: () => {
        this.addStars(3);
        this.celebrateRoundWin();
      },
      onWordBuilt: () => {
        this.addStars(2);
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
    if (this.btnModeLetters) {
      this.btnModeLetters.addEventListener('click', () => this.switchMode('letters'));
    }
    if (this.btnModeReading) {
      this.btnModeReading.addEventListener('click', () => this.switchMode('reading'));
    }
    if (this.btnModeWords) {
      this.btnModeWords.addEventListener('click', () => this.switchMode('words'));
    }
    if (this.btnModeTranslate) {
      this.btnModeTranslate.addEventListener('click', () => this.switchMode('translate'));
    }

    // Звук вкл/выкл
    if (this.btnSound) {
      this.btnSound.addEventListener('click', () => {
        const enabled = sound.toggleSound();
        this.updateSoundButtonUI(enabled);
      });
    }

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

    // Модальное окно настроек (Язык, звук, экран)
    if (this.btnSettings && this.settingsModal) {
      this.btnSettings.addEventListener('click', () => {
        sound.playLetterClick();
        this.settingsModal.classList.remove('hidden');
      });
      this.settingsModal.addEventListener('click', (e) => {
        if (e.target === this.settingsModal) {
          this.settingsModal.classList.add('hidden');
        }
      });
    }
    if (this.btnCloseSettings && this.settingsModal) {
      this.btnCloseSettings.addEventListener('click', () => {
        this.settingsModal.classList.add('hidden');
      });
    }

    document.querySelectorAll('.theme-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setProfileTheme(btn.dataset.themeId);
      });
    });

    // Модальное окно победы
    const nextRoundBtn = document.getElementById('btn-next-round');
    if (nextRoundBtn) {
      nextRoundBtn.addEventListener('click', () => {
        this.stopAllGames();
        this.celebrationModal.classList.add('hidden');
        if (this.currentMode === 'words') {
          this.wordsHub.restartCurrentGame();
        } else if (this.currentMode === 'letters') {
          this.alphabetGame.start();
        } else if (this.currentMode === 'reading') {
          this.readingHub.start();
        } else if (this.currentMode === 'translate') {
          this.wordTranslate.start();
        }
      });
    }

    // Профиль игрока
    if (this.btnProfile && this.profileModal) {
      this.btnProfile.addEventListener('click', () => {
        sound.playLetterClick();
        this.updateProfilesUI();
        this.profileModal.classList.remove('hidden');
      });
      this.profileModal.addEventListener('click', (e) => {
        if (e.target === this.profileModal) {
          this.profileModal.classList.add('hidden');
        }
      });
    }

    if (this.btnCloseProfile && this.profileModal) {
      this.btnCloseProfile.addEventListener('click', () => {
        this.profileModal.classList.add('hidden');
      });
    }

    // Уровень сложности активного профиля
    const btnProfileDiffEasy = document.getElementById('btn-profile-diff-easy');
    const btnProfileDiffHard = document.getElementById('btn-profile-diff-hard');
    if (btnProfileDiffEasy) {
      btnProfileDiffEasy.addEventListener('click', () => this.setProfileDifficulty('easy'));
    }
    if (btnProfileDiffHard) {
      btnProfileDiffHard.addEventListener('click', () => this.setProfileDifficulty('hard'));
    }

    // Кнопки выбора профиля
    const btnSelectP1 = document.getElementById('select-player1');
    const btnSelectP2 = document.getElementById('select-player2');
    if (btnSelectP1) btnSelectP1.addEventListener('click', () => {
      this.switchPlayer('player1');
      setTimeout(() => this.profileModal.classList.add('hidden'), 200);
    });
    if (btnSelectP2) btnSelectP2.addEventListener('click', () => {
      this.switchPlayer('player2');
      setTimeout(() => this.profileModal.classList.add('hidden'), 200);
    });

    // Сохранение имени игрока
    const btnSaveName = document.getElementById('btn-save-name');
    const nameInput = document.getElementById('profile-name-input');
    const saveNameAction = () => {
      if (!nameInput) return;
      const val = nameInput.value.trim();
      if (val) {
        this.profiles[this.activePlayerId].name = val;
        this.saveProfile(this.activePlayerId);
        this.updateProfilesUI();
        sound.playSuccess();
      }
    };
    if (btnSaveName) btnSaveName.addEventListener('click', saveNameAction);
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveNameAction();
      });
    }

    // Выбор аватарки игрока
    const avatarPickBtns = document.querySelectorAll('.avatar-pick-btn');
    avatarPickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const av = btn.dataset.avatar;
        if (av) {
          this.profiles[this.activePlayerId].avatar = av;
          this.saveProfile(this.activePlayerId);
          this.updateProfilesUI();
          sound.playLetterClick();
        }
      });
    });

    // Кнопка альбома наклеек в шапке
    const btnAlbum = document.getElementById('btn-album');
    if (btnAlbum) {
      btnAlbum.addEventListener('click', () => {
        if (this.stickersAlbum) {
          this.stickersAlbum.open();
        }
      });
    }
  }

  stopAllGames() {
    if (this.praiseTimer) {
      clearTimeout(this.praiseTimer);
      this.praiseTimer = null;
    }
    sound.stopSpeech();
    if (this.alphabetGame && this.alphabetGame.stop) this.alphabetGame.stop();
    if (this.readingHub && this.readingHub.stop) this.readingHub.stop();
    if (this.wordsHub && this.wordsHub.stop) this.wordsHub.stop();
    if (this.wordTranslate && this.wordTranslate.stop) this.wordTranslate.stop();
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return;
    this.stopAllGames();
    this.currentLang = lang;
    if (this.profiles && this.profiles[this.activePlayerId]) {
      this.profiles[this.activePlayerId].lang = lang;
      this.saveProfile(this.activePlayerId);
    }
    sound.playLetterClick();

    this.btnLangRu.classList.toggle('active', lang === 'ru');
    this.btnLangPl.classList.toggle('active', lang === 'pl');
    if (this.btnLangEn) {
      this.btnLangEn.classList.toggle('active', lang === 'en');
    }

    this.updateLanguageUI();

    if (this.stickersAlbum && this.albumModal && !this.albumModal.classList.contains('hidden')) {
      this.stickersAlbum.render();
    }

    this.alphabetGame.lang = lang;
    this.readingHub.lang = lang;
    this.wordsHub.lang = lang;
    if (this.wordTranslate) {
      this.wordTranslate.lang = lang;
    }

    if (this.currentMode === 'letters') {
      this.alphabetGame.setLanguage(lang);
    } else if (this.currentMode === 'reading') {
      this.readingHub.setLanguage(lang);
    } else if (this.currentMode === 'words') {
      this.wordsHub.setLanguage(lang);
    } else if (this.currentMode === 'translate') {
      this.wordTranslate.setLanguage(lang);
    }
  }

  switchMode(mode, { silent = false } = {}) {
    this.stopAllGames();
    this.currentMode = mode;
    if (this.profiles && this.profiles[this.activePlayerId]) {
      this.profiles[this.activePlayerId].lastMode = mode;
      this.saveProfile(this.activePlayerId);
    }
    if (!silent) {
      sound.playLetterClick();
    }

    if (this.btnModeLetters) {
      this.btnModeLetters.classList.toggle('active', mode === 'letters');
    }
    if (this.btnModeReading) {
      this.btnModeReading.classList.toggle('active', mode === 'reading');
    }
    if (this.btnModeWords) {
      this.btnModeWords.classList.toggle('active', mode === 'words');
    }
    if (this.btnModeTranslate) {
      this.btnModeTranslate.classList.toggle('active', mode === 'translate');
    }

    this.updateFooterHint();

    if (mode === 'letters') {
      this.alphabetGame.setLanguage(this.currentLang);
    } else if (mode === 'reading') {
      this.readingHub.setLanguage(this.currentLang);
    } else if (mode === 'words') {
      this.wordsHub.setLanguage(this.currentLang);
    } else if (mode === 'translate') {
      this.wordTranslate.setLanguage(this.currentLang);
    }
  }

  updateSoundButtonUI(enabled = sound.soundEnabled) {
    if (!this.btnSound) return;
    const isRu = this.currentLang === 'ru';
    const isPl = this.currentLang === 'pl';
    this.btnSound.classList.toggle('muted', !enabled);
    this.btnSound.textContent = enabled
      ? (isRu ? '🔊 Звук вкл.' : (isPl ? '🔊 Dźwięk wł.' : '🔊 Sound ON'))
      : (isRu ? '🔇 Звук выкл.' : (isPl ? '🔇 Dźwięk wył.' : '🔇 Sound OFF'));
  }

  updateFooterHint() {
    const footerEl = document.getElementById('footer-hint');
    if (!footerEl) return;
    const hints = {
      letters: {
        ru: 'Нажимай на буквы, слушай чистые звуки и обводи прописи! ✏️',
        pl: 'Dotykaj liter, słuchaj głosek i ćwicz pisanie! ✏️',
        en: 'Tap letters, listen to pure phonics and trace! ✏️'
      },
      reading: {
        ru: 'Тяни паровозик, отстукивай слоги и читай первые сказки! 🚂',
        pl: 'Łącz głoski w pociągu, wyklaskuj sylaby i czytaj bajki! 🚂',
        en: 'Slide the train, tap syllable beats and read stories! 🚂'
      },
      words: {
        ru: 'Нажимай на слова, чтобы услышать, как они звучат! 🔊',
        pl: 'Dotknij słowa, aby usłyszeć jak brzmi! 🔊',
        en: 'Tap on words to hear how they sound! 🔊'
      },
      translate: {
        ru: 'Собирай звёздочки — открывай новые наклейки 🎁 в альбоме!',
        pl: 'Zbieraj gwiazdki — otwieraj nowe naklejki 🎁 w albumie!',
        en: 'Collect stars to unlock new stickers 🎁 in your album!'
      }
    };
    const modeHints = hints[this.currentMode] || hints.words;
    footerEl.textContent = modeHints[this.currentLang] || modeHints.ru;
  }

  updateLanguageUI() {
    const lang = this.currentLang;
    const isRu = lang === 'ru';
    const isPl = lang === 'pl';

    document.getElementById('app-title').textContent = isRu 
      ? 'Словознайка' 
      : (isPl ? 'Słowotwórca' : 'WordQuest');

    if (this.headerLangFlag) {
      this.headerLangFlag.textContent = isRu ? '🇷🇺' : (isPl ? '🇵🇱' : '🇬🇧');
    }
    if (this.btnSettings) {
      this.btnSettings.title = isRu ? 'Настройки' : (isPl ? 'Ustawienia' : 'Settings');
    }

    if (this.btnModeLetters) {
      this.btnModeLetters.querySelector('.tab-text').textContent = isRu
        ? 'Буквы'
        : (isPl ? 'Litery' : 'Letters');
    }
    if (this.btnModeReading) {
      this.btnModeReading.querySelector('.tab-text').textContent = isRu
        ? 'Чтение'
        : (isPl ? 'Czytanie' : 'Reading');
    }
    if (this.btnModeWords) {
      this.btnModeWords.querySelector('.tab-text').textContent = isRu
        ? 'Слова'
        : (isPl ? 'Słowa' : 'Words');
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

    this.updateFooterHint();
    this.updateSoundButtonUI();

    const settingsTitle = document.getElementById('settings-modal-title');
    if (settingsTitle) {
      settingsTitle.textContent = isRu ? '⚙️ Настройки' : (isPl ? '⚙️ Ustawienia' : '⚙️ Settings');
    }
    const settingsLangLbl = document.getElementById('settings-lang-label');
    if (settingsLangLbl) {
      settingsLangLbl.textContent = isRu ? 'Язык игры:' : (isPl ? 'Język gry:' : 'Game language:');
    }
    const settingsCtrlsLbl = document.getElementById('settings-controls-label');
    if (settingsCtrlsLbl) {
      settingsCtrlsLbl.textContent = isRu ? 'Звук и экран:' : (isPl ? 'Dźwięk i ekran:' : 'Sound & display:');
    }
    const settingsThemeLbl = document.getElementById('settings-theme-label');
    if (settingsThemeLbl) {
      settingsThemeLbl.textContent = isRu ? 'Тема оформления:' : (isPl ? 'Motyw kolorystyczny:' : 'Color theme:');
    }
    const themeLabels = {
      day: isRu ? '☀️ День' : (isPl ? '☀️ Dzień' : '☀️ Day'),
      forest: isRu ? '🌿 Лес' : (isPl ? '🌿 Las' : '🌿 Forest'),
      cozy: isRu ? '🌙 Вечер' : (isPl ? '🌙 Wieczór' : '🌙 Cozy'),
      space: isRu ? '🚀 Космос' : (isPl ? '🚀 Kosmos' : '🚀 Space')
    };
    Object.entries(themeLabels).forEach(([id, label]) => {
      const btn = document.getElementById(`btn-theme-${id}`);
      if (btn) btn.textContent = label;
    });
    if (this.btnFullscreen) {
      this.btnFullscreen.textContent = isRu ? '⛶ Полный экран' : (isPl ? '⛶ Pełny ekran' : '⛶ Fullscreen');
    }

    const modalProfileTitle = document.getElementById('profile-modal-title');
    if (modalProfileTitle) {
      modalProfileTitle.textContent = isRu 
        ? 'Кто сейчас играет?' 
        : (isPl ? 'Kto teraz gra?' : 'Who is playing?');
    }
    const editTitle = document.getElementById('profile-edit-title');
    if (editTitle) {
      editTitle.textContent = isRu 
        ? 'Настроить профиль:' 
        : (isPl ? 'Ustawienia profilu:' : 'Customize profile:');
    }
    const diffLabel = document.getElementById('profile-diff-label');
    if (diffLabel) {
      diffLabel.textContent = isRu ? 'Уровень сложности:' : (isPl ? 'Poziom trudności:' : 'Difficulty level:');
    }
    const diffEasyBtn = document.getElementById('btn-profile-diff-easy');
    if (diffEasyBtn) {
      diffEasyBtn.textContent = isRu ? '🐣 Лёгкий (3–4)' : (isPl ? '🐣 Łatwy (3–4)' : '🐣 Easy (3–4)');
    }
    const diffHardBtn = document.getElementById('btn-profile-diff-hard');
    if (diffHardBtn) {
      diffHardBtn.textContent = isRu ? '🚀 Мастер (5+)' : (isPl ? '🚀 Mistrz (5+)' : '🚀 Master (5+)');
    }
    const avLabel = document.getElementById('profile-avatars-label');
    if (avLabel) {
      avLabel.textContent = isRu 
        ? 'Выбери значок:' 
        : (isPl ? 'Wybierz ikonkę:' : 'Choose icon:');
    }
    const saveNameBtn = document.getElementById('btn-save-name');
    if (saveNameBtn) {
      saveNameBtn.textContent = isRu ? 'Сохранить' : (isPl ? 'Zapisz' : 'Save');
    }
    const nameInput = document.getElementById('profile-name-input');
    if (nameInput) {
      nameInput.placeholder = isRu ? 'Имя игрока' : (isPl ? 'Imię gracza' : 'Player name');
    }
    if (this.profiles) {
      this.updateProfilesUI();
    }
  }

  addStars(count) {
    this.stars += count;
    if (this.profiles && this.profiles[this.activePlayerId]) {
      this.profiles[this.activePlayerId].stars = this.stars;
      this.saveProfile(this.activePlayerId);
      this.updateProfilesUI();
    } else {
      localStorage.setItem('reading_game_stars', this.stars.toString());
    }
    this.updateStarsDisplay();

    // Анимация подпрыгивания счетчика звезд и всплывающий бейдж +⭐
    const starBadge = this.starCountEl && this.starCountEl.parentElement;
    if (starBadge) {
      starBadge.classList.add('star-bump');
      setTimeout(() => {
        starBadge.classList.remove('star-bump');
      }, 400);

      if (count > 0 && typeof document !== 'undefined') {
        const toast = document.createElement('span');
        toast.className = 'star-float-toast';
        toast.textContent = `+${count} ⭐`;
        starBadge.appendChild(toast);
        setTimeout(() => {
          toast.remove();
        }, 950);
      }
    }
  }

  updateStarsDisplay() {
    this.starCountEl.textContent = this.stars;
  }

  speakPraise() {
    if (this.praiseTimer) clearTimeout(this.praiseTimer);
    const phrases = PRAISE_PHRASES[this.currentLang];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    this.praiseTimer = setTimeout(() => {
      this.praiseTimer = null;
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
