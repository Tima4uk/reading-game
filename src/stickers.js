// Модуль «Альбом наклеек» (Stickers Collection)
import { sound } from './audio.js?v=10';

export const STICKERS_CATALOG = [
  // 🦖 Динозавры
  { id: 'dino_trex', cat: 'dino', emoji: '🦖', name: { ru: 'Ти-Рекс', pl: 'T-Rex', en: 'T-Rex' } },
  { id: 'dino_brachio', cat: 'dino', emoji: '🦕', name: { ru: 'Диплодок', pl: 'Diplodok', en: 'Brachiosaurus' } },
  { id: 'dino_pterodactyl', cat: 'dino', emoji: '🦅', name: { ru: 'Птеродактиль', pl: 'Pterodaktyl', en: 'Pterodactyl' } },
  { id: 'dino_egg', cat: 'dino', emoji: '🥚', name: { ru: 'Яйцо динозавра', pl: 'Jajo dinozaura', en: 'Dino Egg' } },
  { id: 'dino_volcano', cat: 'dino', emoji: '🌋', name: { ru: 'Вулкан', pl: 'Wulkan', en: 'Volcano' } },
  { id: 'dino_foot', cat: 'dino', emoji: '🐾', name: { ru: 'След лапы', pl: 'Ślad łapy', en: 'Footprint' } },

  // 🚀 Космос
  { id: 'space_rocket', cat: 'space', emoji: '🚀', name: { ru: 'Ракета', pl: 'Rakieta', en: 'Rocket' } },
  { id: 'space_saturn', cat: 'space', emoji: '🪐', name: { ru: 'Сатурн', pl: 'Saturn', en: 'Saturn' } },
  { id: 'space_alien', cat: 'space', emoji: '👽', name: { ru: 'Пришелец', pl: 'Kosmita', en: 'Alien' } },
  { id: 'space_star', cat: 'space', emoji: '✨', name: { ru: 'Сверхновая', pl: 'Supernowa', en: 'Supernova' } },
  { id: 'space_moon', cat: 'space', emoji: '🌙', name: { ru: 'Луна', pl: 'Księżyc', en: 'Moon' } },
  { id: 'space_ufo', cat: 'space', emoji: '🛸', name: { ru: 'НЛО', pl: 'UFO', en: 'UFO' } },

  // 🐾 Животные
  { id: 'anim_lion', cat: 'animals', emoji: '🦁', name: { ru: 'Лев', pl: 'Lew', en: 'Lion' } },
  { id: 'anim_panda', cat: 'animals', emoji: '🐼', name: { ru: 'Панда', pl: 'Panda', en: 'Panda' } },
  { id: 'anim_unicorn', cat: 'animals', emoji: '🦄', name: { ru: 'Единорог', pl: 'Jednorożec', en: 'Unicorn' } },
  { id: 'anim_dolphin', cat: 'animals', emoji: '🐬', name: { ru: 'Дельфин', pl: 'Delfin', en: 'Dolphin' } },
  { id: 'anim_fox', cat: 'animals', emoji: '🦊', name: { ru: 'Лисичка', pl: 'Lisek', en: 'Fox' } },
  { id: 'anim_koala', cat: 'animals', emoji: '🐨', name: { ru: 'Коала', pl: 'Koala', en: 'Koala' } },

  // 🚗 Машинки и техника
  { id: 'veh_race', cat: 'vehicles', emoji: '🏎️', name: { ru: 'Болид', pl: 'Wyścigówka', en: 'Race Car' } },
  { id: 'veh_fire', cat: 'vehicles', emoji: '🚒', name: { ru: 'Пожарная', pl: 'Wóz strażacki', en: 'Fire Truck' } },
  { id: 'veh_police', cat: 'vehicles', emoji: '🚓', name: { ru: 'Полиция', pl: 'Radiowóz', en: 'Police Car' } },
  { id: 'veh_plane', cat: 'vehicles', emoji: '✈️', name: { ru: 'Самолёт', pl: 'Samolot', en: 'Airplane' } },
  { id: 'veh_train', cat: 'vehicles', emoji: '🚂', name: { ru: 'Паровоз', pl: 'Pociąg', en: 'Steam Train' } },
  { id: 'veh_boat', cat: 'vehicles', emoji: '🛥️', name: { ru: 'Катер', pl: 'Kuter', en: 'Speedboat' } }
];

export const STICKER_CATEGORIES = {
  all: { ru: 'Все', pl: 'Wszystkie', en: 'All' },
  dino: { ru: '🦖 Динозавры', pl: '🦖 Dinozaury', en: '🦖 Dinosaurs' },
  space: { ru: '🚀 Космос', pl: '🚀 Kosmos', en: '🚀 Space' },
  animals: { ru: '🐾 Животные', pl: '🐾 Zwierzęta', en: '🐾 Animals' },
  vehicles: { ru: '🚗 Техника', pl: '🚗 Pojazdy', en: '🚗 Vehicles' }
};

export class StickersAlbum {
  constructor(options = {}) {
    this.app = options.app;
    this.modalEl = options.modalEl;
    this.currentCat = 'all';
    this.isRevealing = false;
  }

  get lang() {
    return this.app.currentLang || 'ru';
  }

  get activeProfile() {
    return this.app.profiles[this.app.activePlayerId];
  }

  get unlockedIds() {
    if (!this.activeProfile.stickers) {
      this.activeProfile.stickers = [];
    }
    return new Set(this.activeProfile.stickers);
  }

  getUnlockedCount() {
    return this.unlockedIds.size;
  }

  getTotalCount() {
    return STICKERS_CATALOG.length;
  }

  open() {
    sound.playLetterClick();
    this.render();
    this.modalEl.classList.remove('hidden');
  }

  close() {
    this.modalEl.classList.add('hidden');
  }

  buyPack() {
    if (this.isRevealing) return;
    if (this.app.stars < 10) {
      sound.playError();
      return;
    }

    const unlocked = this.unlockedIds;
    // Приоритетно выбираем еще не открытую наклейку, чтобы ребенок радовался новой
    const lockedStickers = STICKERS_CATALOG.filter(s => !unlocked.has(s.id));
    
    let chosenSticker = null;
    let isNew = false;

    if (lockedStickers.length > 0) {
      chosenSticker = lockedStickers[Math.floor(Math.random() * lockedStickers.length)];
      isNew = true;
    } else {
      // Все 24 наклейки уже собраны! Даем случайную
      chosenSticker = STICKERS_CATALOG[Math.floor(Math.random() * STICKERS_CATALOG.length)];
      isNew = false;
    }

    // Списываем 10 звезд
    this.app.stars -= 10;
    this.activeProfile.stars = this.app.stars;
    if (isNew) {
      this.activeProfile.stickers.push(chosenSticker.id);
    }
    this.app.saveProfile(this.app.activePlayerId);
    this.app.updateStarsDisplay();
    this.app.updateProfilesUI();

    // Анимация открытия
    this.revealSticker(chosenSticker, isNew);
  }

  revealSticker(sticker, isNew) {
    this.isRevealing = true;
    sound.playSuccess();
    try {
      sound.playVictory();
    } catch (_) {}

    this.app.launchFullConfetti();

    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const stickerName = sticker.name[this.lang] || sticker.name.ru;

    const overlay = document.createElement('div');
    overlay.className = 'sticker-reveal-overlay';
    overlay.innerHTML = `
      <div class="sticker-reveal-card">
        <div class="sticker-reveal-sparkles">✨🎉✨</div>
        <div class="sticker-reveal-icon">${sticker.emoji}</div>
        <div class="sticker-reveal-name">${stickerName}</div>
        <div class="sticker-reveal-tag">
          ${isNew ? (isRu ? '🎉 Новая наклейка в альбом!' : (isPl ? '🎉 Nowa naklejka w albumie!' : '🎉 New sticker in album!')) : (isRu ? '⭐ Коллекция уже собрана!' : (isPl ? '⭐ Kolekcja już zebrana!' : '⭐ Full collection!'))}
        </div>
        <button class="modal-btn sticker-reveal-btn" id="btn-reveal-ok">
          ${isRu ? 'Ура! В альбом 🚀' : (isPl ? 'Hura! Do albumu 🚀' : 'Awesome! To Album 🚀')}
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const okBtn = overlay.querySelector('#btn-reveal-ok');
    okBtn.addEventListener('click', () => {
      sound.playLetterClick();
      overlay.remove();
      this.isRevealing = false;
      this.render();
      if (this.app.updateAlbumBadge) {
        this.app.updateAlbumBadge();
      }
    });
  }

  render() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';

    const unlocked = this.unlockedIds;
    const unlockedCount = unlocked.size;
    const totalCount = STICKERS_CATALOG.length;
    const stars = this.app.stars;
    const canAfford = stars >= 10;

    const titleText = isRu ? 'Мой альбом наклеек' : (isPl ? 'Mój album naklejek' : 'My Sticker Album');
    const buyBtnText = isRu 
      ? `🎁 Открыть наклейку (10 ⭐)` 
      : (isPl ? `🎁 Otwórz naklejkę (10 ⭐)` : `🎁 Open Sticker (10 ⭐)`);

    const filtered = this.currentCat === 'all' 
      ? STICKERS_CATALOG 
      : STICKERS_CATALOG.filter(s => s.cat === this.currentCat);

    this.modalEl.innerHTML = `
      <div class="modal-card album-modal-card">
        <button class="modal-close-icon" id="btn-close-album" title="Закрыть">✖</button>
        
        <div class="album-header">
          <h2 class="album-title">${titleText}</h2>
          <div class="album-counter">
            ⭐ ${isRu ? 'Собрано' : (isPl ? 'Zebrano' : 'Collected')}: <strong>${unlockedCount} / ${totalCount}</strong>
          </div>
        </div>

        <!-- Кнопка покупки наклейки -->
        <div class="album-buy-bar">
          <button class="album-buy-btn ${canAfford ? 'can-afford' : 'disabled'}" id="btn-buy-sticker" ${!canAfford ? 'disabled' : ''}>
            ${buyBtnText}
          </button>
          ${!canAfford ? `
            <div class="album-buy-hint">
              ${isRu ? `Нужно ещё ${10 - stars} ⭐` : (isPl ? `Potrzebujesz jeszcze ${10 - stars} ⭐` : `Need ${10 - stars} more ⭐`)}
            </div>
          ` : ''}
        </div>

        <!-- Вкладки категорий -->
        <div class="album-cats-bar">
          ${Object.entries(STICKER_CATEGORIES).map(([catKey, labels]) => `
            <button class="album-cat-btn ${this.currentCat === catKey ? 'active' : ''}" data-cat="${catKey}">
              ${labels[this.lang] || labels.ru}
            </button>
          `).join('')}
        </div>

        <!-- Сетка наклеек -->
        <div class="album-grid">
          ${filtered.map(sticker => {
            const isUnlocked = unlocked.has(sticker.id);
            const name = sticker.name[this.lang] || sticker.name.ru;
            return `
              <div class="sticker-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="sticker-emoji">${isUnlocked ? sticker.emoji : '❓'}</div>
                <div class="sticker-name">${isUnlocked ? name : '???'}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const closeBtn = this.modalEl.querySelector('#btn-close-album');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    const buyBtn = this.modalEl.querySelector('#btn-buy-sticker');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => this.buyPack());
    }

    const catBtns = this.modalEl.querySelectorAll('.album-cat-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentCat = btn.dataset.cat;
        sound.playLetterClick();
        this.render();
      });
    });
  }
}
