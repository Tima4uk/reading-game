// Модуль аудио: Синтез звуковых эффектов (Web Audio API) и озвучивание речи (SpeechSynthesis API)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.voices = [];
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
    // Ищем подходящий голос
    const match = this.voices.find(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
    return match || null;
  }

  // Озвучивание отдельной буквы
  speakLetter(letter, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // останавливаем предыдущую речь

    const utterance = new SpeechSynthesisUtterance(letter.toLowerCase());
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.85; // чуть медленнее для четкости
    utterance.pitch = 1.05;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Озвучивание слова целиком
  speakWord(word, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Для фразовых глаголов и составных выражений в английском (написанных слитно в карточках/сетке)
    const phrasalSpoken = {
      'FINDOUT': 'find out',
      'GIVEAWAY': 'give away',
      'ENDUP': 'end up',
      'PAYFOR': 'pay for',
      'TURNINTO': 'turn into',
      'GOON': 'go on',
      'OHMYWORD': 'oh my word',
      'ICECREAM': 'ice cream',
      'PUSHOVER': 'push over',
      'SETOFF': 'set off'
    };
    const upper = String(word).toUpperCase();
    const spokenText = (lang === 'en' && phrasalSpoken[upper])
      ? phrasalSpoken[upper]
      : word.toLowerCase();

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.8;
    utterance.pitch = 1.05;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Озвучивание буквы и слова для малыша: "К! Кот!" / "Ż! Żaba!" / "A! Apple!"
  speakLetterAndWord(letter, word, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = `${letter}! ${word}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Озвучивание вопроса викторины
  speakQuestion(letter, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = lang === 'ru' 
      ? `Где буква ${letter}?` 
      : (lang === 'pl' ? `Gdzie jest litera ${letter}?` : `Where is letter ${letter}?`);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Озвучивание рифмы
  speakRhyme(word1, word2, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text = lang === 'ru' 
      ? `${word1} и ${word2}! Звучит в рифму!` 
      : (lang === 'pl' ? `${word1} i ${word2}! To się rymuje!` : `${word1} and ${word2}! They rhyme!`);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.85;
    utterance.pitch = 1.05;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Озвучивание объяснения
  speakExplanation(explanation, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(explanation);
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.9;
    utterance.pitch = 1.05;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  }

  // Похвала
  speakPhrase(phrase, lang = 'ru') {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = this.getLangTag(lang);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    const voice = this.getVoice(lang);
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
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
    return this.soundEnabled;
  }
}

export const sound = new SoundEngine();
