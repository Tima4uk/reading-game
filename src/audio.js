// Модуль аудио: Синтез звуковых эффектов (Web Audio API) и озвучивание речи (SpeechSynthesis API)

// Словарь точного фонетического произношения для русских слов (исправление Е -> Ё и ударений для TTS)
const RU_SPOKEN_OVERRIDES = {
  'МЕД': 'мёд',
  'МЁД': 'мёд',
  'ПЬЕТ': 'пьёт',
  'ПЬЁТ': 'пьёт',
  'ПОЕТ': 'поёт',
  'ПОЁТ': 'поёт',
  'ИДЕТ': 'идёт',
  'ИДЁТ': 'идёт',
  'ПЛЫВЕТ': 'плывёт',
  'ПЛЫВЁТ': 'плывёт',
  'ВЕРТОЛЕТ': 'вертолёт',
  'ВЕРТОЛЁТ': 'вертолёт',
  'САМОЛЕТ': 'самолёт',
  'САМОЛЁТ': 'самолёт',
  'БЕРЕЗА': 'берёза',
  'БЕРЁЗА': 'берёза',
  'ЩЕТКА': 'щётка',
  'ЩЁТКА': 'щётка',
  'ЕЖИК': 'ёжик',
  'ЁЖИК': 'ёжик',
  'ЛЕД': 'лёд',
  'ЛЁД': 'лёд',
  'КОТ': 'кот',
  'БЕЛКА': 'бе\u0301лка',
  'ЗАМОК': 'за\u0301мок',
  'МУХА': 'му\u0301ха',
  'УТКА': 'у\u0301тка',
  'ЧАСЫ': 'часы\u0301',
  'НОСКИ': 'носки\u0301',
  'ОКНО': 'окно\u0301',
  'ВОДА': 'вода\u0301',
  'НОГА': 'нога\u0301',
  'РУКА': 'рука\u0301',
  'ЗИМА': 'зима\u0301',
  'ЛИСА': 'лиса\u0301',
  'ТРАВА': 'трава\u0301',
  'СОВА': 'сова\u0301',
  'КОЗА': 'коза\u0301',
  'ГОРА': 'гора\u0301',
  'РЕКА': 'река\u0301',
  'ЛУНА': 'луна\u0301'
};

// Словарь составных английских слов и фразовых глаголов
const EN_SPOKEN_OVERRIDES = {
  'FINDOUT': 'find out',
  'GIVEAWAY': 'give away',
  'ENDUP': 'end up',
  'PAYFOR': 'pay for',
  'TURNINTO': 'turn into',
  'GOON': 'go on',
  'OHMYWORD': 'oh my word',
  'ICECREAM': 'ice cream',
  'FIRETRUCK': 'fire truck',
  'PUSHOVER': 'push over',
  'SETOFF': 'set off',
  'FOX / BOX': 'box'
};

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.voices = [];
    this.speakTimer = null;
    this.initAudioContext();
    this.initVoices();
  }

  initAudioContext() {
    if (typeof window === 'undefined') return;
    // Инициализация при первом взаимодействии пользователя (требование браузеров)
    const unlock = () => {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  initVoices() {
    if (typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }

  getLangTag(lang) {
    if (lang === 'pl') return 'pl-PL';
    if (lang === 'en') return 'en-US';
    return 'ru-RU';
  }

  getVoice(langCode) {
    if (!this.voices || this.voices.length === 0) {
      this.voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    }
    const prefix = langCode === 'ru' ? 'ru' : (langCode === 'pl' ? 'pl' : 'en');
    const matchingVoices = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    if (matchingVoices.length === 0) return null;

    // Приоритет качественным голосам (Google, Microsoft Natural, Apple Milena/Yuri/Zosia/Samantha)
    const preferred = matchingVoices.find(v =>
      /google|natural|milena|yuri|zosia|paulina|samantha|daniel/i.test(v.name)
    );
    return preferred || matchingVoices[0];
  }

  // Полная остановка текущей и запланированной озвучки
  stopSpeech() {
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Безопасный запуск SpeechSynthesis без бага проглатывания после cancel() в браузерах
  _speakUtterance(text, lang, rate = 0.85, pitch = 1.05) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }

    const synth = window.speechSynthesis;
    const wasBusy = synth.speaking || synth.pending;
    synth.cancel();

    const startSpeak = () => {
      this.speakTimer = null;
      if (!this.speechEnabled) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.getLangTag(lang);
      utterance.rate = rate;
      utterance.pitch = pitch;

      const voice = this.getVoice(lang);
      if (voice) utterance.voice = voice;

      synth.speak(utterance);
    };

    if (wasBusy) {
      this.speakTimer = setTimeout(startSpeak, 35);
    } else {
      startSpeak();
    }
  }

  // Нормализация слова перед отправкой в TTS
  normalizeWordForSpeech(word, lang = 'ru') {
    if (!word) return '';
    const raw = String(word).trim();
    const upper = raw.toUpperCase();

    if (lang === 'ru' && RU_SPOKEN_OVERRIDES[upper]) {
      return RU_SPOKEN_OVERRIDES[upper];
    }
    if (lang === 'en' && EN_SPOKEN_OVERRIDES[upper]) {
      return EN_SPOKEN_OVERRIDES[upper];
    }
    return raw.toLowerCase();
  }

  // Нормализация русских фраз (замена Е на Ё в частых словах)
  normalizePhraseForSpeech(text, lang = 'ru') {
    if (!text) return '';
    if (lang !== 'ru') return text;
    return text
      .replace(/самолет/gi, 'самолёт')
      .replace(/вертолет/gi, 'вертолёт')
      .replace(/береза/gi, 'берёза')
      .replace(/щетка/gi, 'щётка')
      .replace(/ежик/gi, 'ёжик')
      .replace(/\bмед\b/gi, 'мёд')
      .replace(/\bпьет\b/gi, 'пьёт')
      .replace(/\bпоет\b/gi, 'поёт')
      .replace(/\bидет\b/gi, 'идёт')
      .replace(/\bплывет\b/gi, 'плывёт');
  }

  // Озвучивание отдельной буквы
  speakLetter(letter, lang = 'ru') {
    if (!letter) return;
    this._speakUtterance(String(letter).toLowerCase(), lang, 0.85, 1.05);
  }

  // Озвучивание слова целиком
  speakWord(word, lang = 'ru') {
    if (!word) return;
    const spokenText = this.normalizeWordForSpeech(word, lang);
    this._speakUtterance(spokenText, lang, 0.82, 1.05);
  }

  // Озвучивание буквы и слова для малыша: "К! Кот!" / "Ż! Żaba!" / "A! Apple!"
  speakLetterAndWord(letter, word, lang = 'ru') {
    const cleanWord = this.normalizeWordForSpeech(word, lang);
    const text = `${letter}! ${cleanWord}`;
    this._speakUtterance(text, lang, 0.85, 1.08);
  }

  // Озвучивание вопроса викторины
  speakQuestion(letter, lang = 'ru') {
    const text = lang === 'ru'
      ? `Где буква ${letter}?`
      : (lang === 'pl' ? `Gdzie jest litera ${letter}?` : `Where is letter ${letter}?`);
    this._speakUtterance(text, lang, 0.85, 1.08);
  }

  // Озвучивание рифмы
  speakRhyme(word1, word2, lang = 'ru') {
    const w1 = this.normalizeWordForSpeech(word1, lang);
    const w2 = this.normalizeWordForSpeech(word2, lang);
    const text = lang === 'ru'
      ? `${w1} и ${w2}! Звучит в рифму!`
      : (lang === 'pl' ? `${w1} i ${w2}! To się rymuje!` : `${w1} and ${w2}! They rhyme!`);
    this._speakUtterance(text, lang, 0.85, 1.05);
  }

  // Озвучивание объяснения
  speakExplanation(explanation, lang = 'ru') {
    const cleanText = this.normalizePhraseForSpeech(explanation, lang);
    this._speakUtterance(cleanText, lang, 0.9, 1.05);
  }

  // Похвала
  speakPhrase(phrase, lang = 'ru') {
    const cleanText = this.normalizePhraseForSpeech(phrase, lang);
    this._speakUtterance(cleanText, lang, 0.95, 1.1);
  }

  // Звуковые эффекты через Web Audio (без внешних файлов)
  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Приятный короткий "плюх" / клик при нажатии на букву
  playLetterClick() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Звук успешного нахождения слова (мажорный перезвон)
  playSuccess() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime + index * 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    });
  }

  // Мягкий звук ошибки/отмены
  playError() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Победный фанфар при завершении раунда
  playFanfare() {
    this.playVictory();
  }

  playVictory() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];

    let t = ctx.currentTime;
    melody.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.005, t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + n.d + 0.05);

      t += n.d;
    });
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.speechEnabled = this.soundEnabled;
    if (!this.soundEnabled) {
      this.stopSpeech();
    }
    return this.soundEnabled;
  }
}

// Гарантируем единый синглтон SoundEngine даже при разных query-параметрах импорта (?v=...)
export const sound = (typeof window !== 'undefined' && window.__readingGameSound)
  ? window.__readingGameSound
  : (typeof window !== 'undefined' ? (window.__readingGameSound = new SoundEngine()) : new SoundEngine());
