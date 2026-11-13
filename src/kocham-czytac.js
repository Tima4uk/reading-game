// Модуль «Тетради Kocham Czytać» (по методике проф. Ягоды Цешиньской — Metoda Krakowska, Zeszyty 1–18)
// и база слов по слогам для «Собери слово»

import { shuffleArray } from './data.js?v=19';
import { sound } from './audio.js?v=19';

// Слова, разбитые на слоги, с лишним «слогом-ловушкой» (дистрактором)
export const SYLLABLE_WORDS_DATA = {
  ru: [
    { word: 'МАМА', syllables: ['МА', 'МА'], trapSyllables: ['ПА', 'МО', 'НА'], emoji: '👩', hint: 'Самый родной человек' },
    { word: 'ПАПА', syllables: ['ПА', 'ПА'], trapSyllables: ['МА', 'БА', 'ПО'], emoji: '👨', hint: 'Сильный и добрый отец' },
    { word: 'КАША', syllables: ['КА', 'ША'], trapSyllables: ['МА', 'КО', 'СА'], emoji: '🥣', hint: 'Вкусный завтрак' },
    { word: 'РЫБА', syllables: ['РЫ', 'БА'], trapSyllables: ['РА', 'БЫ', 'ЛА'], emoji: '🐟', hint: 'Плавает в реке и море' },
    { word: 'СОВА', syllables: ['СО', 'ВА'], trapSyllables: ['СА', 'ВО', 'КО'], emoji: '🦉', hint: 'Ухает в ночном лесу' },
    { word: 'КОЗА', syllables: ['КО', 'ЗА'], trapSyllables: ['СА', 'КА', 'ЗО'], emoji: '🐐', hint: 'Бодается рожками и даёт молоко' },
    { word: 'ЛИСА', syllables: ['ЛИ', 'СА'], trapSyllables: ['ЛА', 'СИ', 'ЗА'], emoji: '🦊', hint: 'Рыжая хитрая плутовка' },
    { word: 'ЛУНА', syllables: ['ЛУ', 'НА'], trapSyllables: ['ЛА', 'НУ', 'МА'], emoji: '🌙', hint: 'Светит ночью в небе' },
    { word: 'ВОДА', syllables: ['ВО', 'ДА'], trapSyllables: ['ВА', 'ДО', 'ЛА'], emoji: '💧', hint: 'Течёт из крана и в реке' },
    { word: 'ЗИМА', syllables: ['ЗИ', 'МА'], trapSyllables: ['ЗА', 'МО', 'МИ'], emoji: '❄️', hint: 'Холодное снежное время года' },
    { word: 'РУКА', syllables: ['РУ', 'КА'], trapSyllables: ['РА', 'КУ', 'НО'], emoji: '✋', hint: 'На ней пять пальцев' },
    { word: 'НОГА', syllables: ['НО', 'ГА'], trapSyllables: ['НА', 'ГО', 'РУ'], emoji: '🦶', hint: 'Помогает бегать и прыгать' },
    { word: 'РАМА', syllables: ['РА', 'МА'], trapSyllables: ['РО', 'ЛА', 'ПА'], emoji: '🖼️', hint: 'Вокруг окна или картины' },
    { word: 'МЫЛО', syllables: ['МЫ', 'ЛО'], trapSyllables: ['МА', 'ЛА', 'ВО'], emoji: '🧼', hint: 'Делает пену, когда моем руки' },
    { word: 'МОРЕ', syllables: ['МО', 'РЕ'], trapSyllables: ['МА', 'РА', 'ЛЕ'], emoji: '🌊', hint: 'Большая солёная вода с волнами' },
    { word: 'НЕБО', syllables: ['НЕ', 'БО'], trapSyllables: ['НА', 'БА', 'НО'], emoji: '☁️', hint: 'Голубое над головой' },
    { word: 'ЛЕТО', syllables: ['ЛЕ', 'ТО'], trapSyllables: ['ЛА', 'ТА', 'МО'], emoji: '☀️', hint: 'Тёплое и солнечное время года' },
    { word: 'ЧАСЫ', syllables: ['ЧА', 'СЫ'], trapSyllables: ['ЩА', 'СА', 'ЧИ'], emoji: '⏰', hint: 'Показывают время: тик-так' },
    { word: 'КОРОВА', syllables: ['КО', 'РО', 'ВА'], trapSyllables: ['ЛА', 'МУ', 'СА'], emoji: '🐄', hint: 'Говорит «МУ» и даёт молоко' },
    { word: 'МАШИНА', syllables: ['МА', 'ШИ', 'НА'], trapSyllables: ['ЛО', 'КА', 'ША'], emoji: '🚗', hint: 'Едет по дороге на колёсах' },
    { word: 'РАКЕТА', syllables: ['РА', 'КЕ', 'ТА'], trapSyllables: ['ЛО', 'КИ', 'МА'], emoji: '🚀', hint: 'Летит высоко в космос' },
    { word: 'СОБАКА', syllables: ['СО', 'БА', 'КА'], trapSyllables: ['ЗА', 'ЛА', 'КО'], emoji: '🐶', hint: 'Верный друг, лает «ГАВ»' },
    { word: 'МОЛОКО', syllables: ['МО', 'ЛО', 'КО'], trapSyllables: ['МА', 'ЛА', 'ВО'], emoji: '🥛', hint: 'Белый полезный напиток' },
    { word: 'ЯБЛОКО', syllables: ['ЯБ', 'ЛО', 'КО'], trapSyllables: ['АБ', 'ЛА', 'ТО'], emoji: '🍎', hint: 'Сочный хрустящий фрукт' },
    { word: 'БАБОЧКА', syllables: ['БА', 'БОЧ', 'КА'], trapSyllables: ['ПА', 'ЛА', 'МО'], emoji: '🦋', hint: 'Порхает над цветами' },
    { word: 'РАДУГА', syllables: ['РА', 'ДУ', 'ГА'], trapSyllables: ['ЛА', 'ДА', 'ГО'], emoji: '🌈', hint: 'Разноцветная дуга после дождя' },
    { word: 'САМОЛЁТ', syllables: ['СА', 'МО', 'ЛЁТ'], trapSyllables: ['ЗА', 'ЛО', 'МА'], emoji: '✈️', hint: 'Летает по небу с крыльями' },
    { word: 'КОТЁНОК', syllables: ['КО', 'ТЁ', 'НОК'], trapSyllables: ['КА', 'ТЕ', 'СО'], emoji: '🐱', hint: 'Маленький пушистый малыш кошки' },
    { word: 'ПОМИДОР', syllables: ['ПО', 'МИ', 'ДОР'], trapSyllables: ['ПА', 'МА', 'ТОР'], emoji: '🍅', hint: 'Красный круглый овощ' },
    { word: 'МАЛИНА', syllables: ['МА', 'ЛИ', 'НА'], trapSyllables: ['ЛА', 'МИ', 'КА'], emoji: '🫐', hint: 'Сладкая лесная ягода' },
    { word: 'ЧЕРЕПАХА', syllables: ['ЧЕ', 'РЕ', 'ПА', 'ХА'], trapSyllables: ['ША', 'ЛА', 'БА'], emoji: '🐢', hint: 'Носит свой домик-панцирь на спине' }
  ],
  pl: [
    { word: 'MAMA', syllables: ['MA', 'MA'], trapSyllables: ['TA', 'MO', 'NA'], emoji: '👩', hint: 'Najbliższa osoba' },
    { word: 'TATA', syllables: ['TA', 'TA'], trapSyllables: ['MA', 'TO', 'DA'], emoji: '👨', hint: 'Silny i kochany ojciec' },
    { word: 'KOTEK', syllables: ['KO', 'TEK'], trapSyllables: ['KA', 'TAK', 'MO'], emoji: '🐱', hint: 'Mały mruczący zwierzak' },
    { word: 'RYBA', syllables: ['RY', 'BA'], trapSyllables: ['RA', 'BY', 'LA'], emoji: '🐟', hint: 'Pływa w wodzie' },
    { word: 'SOWA', syllables: ['SO', 'WA'], trapSyllables: ['SA', 'WO', 'KO'], emoji: '🦉', hint: 'Mądry ptak nocny' },
    { word: 'KOZA', syllables: ['KO', 'ZA'], trapSyllables: ['KA', 'ZO', 'SA'], emoji: '🐐', hint: 'Ma rogi i mówi ME' },
    { word: 'LISEK', syllables: ['LI', 'SEK'], trapSyllables: ['LA', 'SAK', 'ZE'], emoji: '🦊', hint: 'Rudy sprytny zwierzak' },
    { word: 'WODA', syllables: ['WO', 'DA'], trapSyllables: ['WA', 'DO', 'LA'], emoji: '💧', hint: 'Płynie w rzece i kranie' },
    { word: 'ZIMA', syllables: ['ZI', 'MA'], trapSyllables: ['ZA', 'MI', 'MO'], emoji: '❄️', hint: 'Mroźna pora ze śniegiem' },
    { word: 'RĘKA', syllables: ['RĘ', 'KA'], trapSyllables: ['RA', 'KO', 'NĘ'], emoji: '✋', hint: 'Ma pięć palców' },
    { word: 'NOGA', syllables: ['NO', 'GA'], trapSyllables: ['NA', 'GO', 'RA'], emoji: '🦶', hint: 'Pomaga biegać i skakać' },
    { word: 'MYDŁO', syllables: ['MY', 'DŁO'], trapSyllables: ['MA', 'DŁA', 'WO'], emoji: '🧼', hint: 'Robi pianę przy myciu rąk' },
    { word: 'MORZE', syllables: ['MO', 'RZE'], trapSyllables: ['MA', 'ŻE', 'LA'], emoji: '🌊', hint: 'Duża słona woda z falami' },
    { word: 'LATO', syllables: ['LA', 'TO'], trapSyllables: ['LO', 'TA', 'MA'], emoji: '☀️', hint: 'Ciepła i słoneczna pora roku' },
    { word: 'ZEGAR', syllables: ['ZE', 'GAR'], trapSyllables: ['ZA', 'GOR', 'KAR'], emoji: '⏰', hint: 'Mierzy czas: tik-tak' },
    { word: 'ŻABA', syllables: ['ŻA', 'BA'], trapSyllables: ['ZA', 'BO', 'PA'], emoji: '🐸', hint: 'Zielona, skacze i mówi KWA' },
    { word: 'KAWA', syllables: ['KA', 'WA'], trapSyllables: ['KO', 'WO', 'MA'], emoji: '☕', hint: 'Ciepły napój dla dorosłych' },
    { word: 'BUŁKA', syllables: ['BUŁ', 'KA'], trapSyllables: ['BAŁ', 'KO', 'MA'], emoji: '🥖', hint: 'Świeże pieczywo na śniadanie' },
    { word: 'KROWA', syllables: ['KRO', 'WA'], trapSyllables: ['KRA', 'WO', 'MU'], emoji: '🐄', hint: 'Mówi MU i daje mleko' },
    { word: 'MLEKO', syllables: ['MLE', 'KO'], trapSyllables: ['MLA', 'KA', 'WO'], emoji: '🥛', hint: 'Biały zdrowy napój' },
    { word: 'MOTYL', syllables: ['MO', 'TYL'], trapSyllables: ['MA', 'TAL', 'SO'], emoji: '🦋', hint: 'Lata nad kolorowymi kwiatami' },
    { word: 'TĘCZA', syllables: ['TĘ', 'CZA'], trapSyllables: ['TA', 'SZA', 'KO'], emoji: '🌈', hint: 'Kolorowy łuk na niebie po deszczu' },
    { word: 'BANAN', syllables: ['BA', 'NAN'], trapSyllables: ['BO', 'MAN', 'KA'], emoji: '🍌', hint: 'Żółty słodki owoc' },
    { word: 'BALON', syllables: ['BA', 'LON'], trapSyllables: ['BO', 'LAN', 'PA'], emoji: '🎈', hint: 'Kolorowa lekka kula do zabawy' },
    { word: 'SAMOCHÓD', syllables: ['SA', 'MO', 'CHÓD'], trapSyllables: ['ZA', 'MA', 'LO'], emoji: '🚗', hint: 'Jedzie po drodze na kołach' },
    { word: 'RAKIETA', syllables: ['RA', 'KIE', 'TA'], trapSyllables: ['LA', 'KA', 'MO'], emoji: '🚀', hint: 'Leci wysoko w kosmos' },
    { word: 'POMIDOR', syllables: ['PO', 'MI', 'DOR'], trapSyllables: ['PA', 'MA', 'TOR'], emoji: '🍅', hint: 'Czerwone okrągłe warzywo' },
    { word: 'SAMOLOT', syllables: ['SA', 'MO', 'LOT'], trapSyllables: ['ZA', 'MA', 'LÓD'], emoji: '✈️', hint: 'Lata po niebie ze skrzydłami' },
    { word: 'ŻYRAFA', syllables: ['ŻY', 'RA', 'FA'], trapSyllables: ['ZY', 'LA', 'WA'], emoji: '🦒', hint: 'Ma bardzo długą szyję' },
    { word: 'MALINA', syllables: ['MA', 'LI', 'NA'], trapSyllables: ['MO', 'LA', 'KA'], emoji: '🫐', hint: 'Słodki różowy owoc z lasu' }
  ],
  en: [
    { word: 'MAMA', syllables: ['MA', 'MA'], trapSyllables: ['PA', 'MO', 'NA'], emoji: '👩', hint: 'Loving mother' },
    { word: 'PAPA', syllables: ['PA', 'PA'], trapSyllables: ['MA', 'PO', 'BA'], emoji: '👨', hint: 'Caring father' },
    { word: 'BABY', syllables: ['BA', 'BY'], trapSyllables: ['BO', 'MY', 'DA'], emoji: '👶', hint: 'Very young child' },
    { word: 'LION', syllables: ['LI', 'ON'], trapSyllables: ['LA', 'AN', 'MO'], emoji: '🦁', hint: 'King of the jungle' },
    { word: 'TIGER', syllables: ['TI', 'GER'], trapSyllables: ['TA', 'GAR', 'MA'], emoji: '🐯', hint: 'Striped big cat' },
    { word: 'ZEBRA', syllables: ['ZE', 'BRA'], trapSyllables: ['ZA', 'BRO', 'LI'], emoji: '🦓', hint: 'Black and white striped horse' },
    { word: 'PANDA', syllables: ['PAN', 'DA'], trapSyllables: ['PEN', 'DO', 'BA'], emoji: '🐼', hint: 'Black and white bear' },
    { word: 'MONKEY', syllables: ['MON', 'KEY'], trapSyllables: ['MAN', 'KAY', 'TO'], emoji: '🐒', hint: 'Loves bananas and climbing' },
    { word: 'RABBIT', syllables: ['RAB', 'BIT'], trapSyllables: ['ROB', 'BAT', 'CA'], emoji: '🐰', hint: 'Has long ears and hops' },
    { word: 'TURTLE', syllables: ['TUR', 'TLE'], trapSyllables: ['TAR', 'TAL', 'MO'], emoji: '🐢', hint: 'Carries its shell house' },
    { word: 'PUPPY', syllables: ['PUP', 'PY'], trapSyllables: ['PAP', 'MY', 'DO'], emoji: '🐶', hint: 'A cute baby dog' },
    { word: 'KITTEN', syllables: ['KIT', 'TEN'], trapSyllables: ['CAT', 'TAN', 'MO'], emoji: '🐱', hint: 'A cute baby cat' },
    { word: 'APPLE', syllables: ['AP', 'PLE'], trapSyllables: ['OP', 'PLA', 'TO'], emoji: '🍎', hint: 'Crispy sweet fruit' },
    { word: 'LEMON', syllables: ['LE', 'MON'], trapSyllables: ['LA', 'MAN', 'SO'], emoji: '🍋', hint: 'Sour yellow citrus' },
    { word: 'MELON', syllables: ['ME', 'LON'], trapSyllables: ['MA', 'LAN', 'PO'], emoji: '🍈', hint: 'Sweet round summer fruit' },
    { word: 'BANANA', syllables: ['BA', 'NA', 'NA'], trapSyllables: ['BO', 'MA', 'LA'], emoji: '🍌', hint: 'Long yellow fruit' },
    { word: 'TOMATO', syllables: ['TO', 'MA', 'TO'], trapSyllables: ['TA', 'MO', 'PA'], emoji: '🍅', hint: 'Red round salad fruit' },
    { word: 'POTATO', syllables: ['PO', 'TA', 'TO'], trapSyllables: ['PA', 'MA', 'LO'], emoji: '🥔', hint: 'Grows underground' },
    { word: 'ROCKET', syllables: ['ROCK', 'ET'], trapSyllables: ['RACK', 'AT', 'MO'], emoji: '🚀', hint: 'Flies into space' },
    { word: 'ROBOT', syllables: ['RO', 'BOT'], trapSyllables: ['RA', 'BAT', 'SO'], emoji: '🤖', hint: 'Smart metal helper' },
    { word: 'PLANET', syllables: ['PLA', 'NET'], trapSyllables: ['PLO', 'NAT', 'RO'], emoji: '🪐', hint: 'Orbits around a star' },
    { word: 'RAINBOW', syllables: ['RAIN', 'BOW'], trapSyllables: ['SUN', 'BOX', 'MA'], emoji: '🌈', hint: 'Colorful arc after rain' },
    { word: 'SUNSET', syllables: ['SUN', 'SET'], trapSyllables: ['SON', 'SAT', 'MOON'], emoji: '🌅', hint: 'Evening when sun goes down' },
    { word: 'FLOWER', syllables: ['FLOW', 'ER'], trapSyllables: ['FLY', 'AR', 'MO'], emoji: '🌸', hint: 'Blooms in the garden' },
    { word: 'SPIDER', syllables: ['SPI', 'DER'], trapSyllables: ['SPA', 'DAR', 'BO'], emoji: '🕷️', hint: 'Weaves a silky web' },
    { word: 'COOKIE', syllables: ['COOK', 'IE'], trapSyllables: ['CAKE', 'AY', 'MO'], emoji: '🍪', hint: 'Sweet baked treat' },
    { word: 'DOCTOR', syllables: ['DOC', 'TOR'], trapSyllables: ['DAC', 'TAR', 'PO'], emoji: '👩‍⚕️', hint: 'Helps people stay healthy' },
    { word: 'WINDOW', syllables: ['WIN', 'DOW'], trapSyllables: ['WAN', 'DO', 'MO'], emoji: '🪟', hint: 'Glass opening in a wall' }
  ]
};

// Полная 5-этапная программа «Kocham Czytać» (Zeszyty 1–18) для RU, PL, EN
export const WORKBOOKS_DATA = {
  ru: {
    chapters: [
      { id: 'vowels', badge: 'Тетр. 1', title: 'Гласные', icon: '🗣️' },
      { id: 'onomatopoeia', badge: 'Тетр. 2', title: 'Звуки', icon: '🐮' },
      { id: 'syllables', badge: 'Тетр. 3–9', title: 'Слоги', icon: '🚂' },
      { id: 'digraphs', badge: 'Тетр. 10–17', title: 'Слияния', icon: '✨' },
      { id: 'sentences', badge: 'Тетр. 18', title: 'Фразы', icon: '📖' }
    ],
    vowels: {
      intro: 'Тетрадь 1 (Samogłoski): нажми и пропой гласные звуки, а потом прочитай пары!',
      singles: [
        { letter: 'А', cue: 'Рот широко: А-А-А', emoji: '😮', spoken: 'а' },
        { letter: 'О', cue: 'Губы колечком: О-О-О', emoji: '⭕', spoken: 'о' },
        { letter: 'У', cue: 'Губы трубочкой: У-У-У', emoji: '🚂', spoken: 'у' },
        { letter: 'Э', cue: 'Язык внизу: Э-Э-Э', emoji: '😜', spoken: 'э' },
        { letter: 'И', cue: 'Улыбка: И-И-И', emoji: '😁', spoken: 'и' },
        { letter: 'Ы', cue: 'Тянем из глубины: Ы-Ы-Ы', emoji: '🐻', spoken: 'ы' }
      ],
      pairs: [
        { text: 'АУ', scene: '🌲', caption: 'В лесу: АУ!', spoken: 'ау' },
        { text: 'УА', scene: '👶', caption: 'Малыш: УА!', spoken: 'уа' },
        { text: 'ИА', scene: '🫏', caption: 'Ослик: ИА!', spoken: 'иа' },
        { text: 'ОУ', scene: '😮', caption: 'Удивление: ОУ!', spoken: 'оу' },
        { text: 'ЭИ', scene: '👋', caption: 'Привет: ЭЙ!', spoken: 'эй' },
        { text: 'АИ', scene: '🌵', caption: 'Укололся: АЙ!', spoken: 'ай' }
      ]
    },
    onomatopoeia: {
      intro: 'Тетрадь 2: Сначала изучи звуки зверей и предметов, а затем отгадай их без подсказки!',
      items: [
        { id: 'cow', soundText: 'МУ', spoken: 'му', emoji: '🐮', actor: 'Корова' },
        { id: 'dog', soundText: 'ГАВ', spoken: 'гав', emoji: '🐶', actor: 'Собака' },
        { id: 'cat', soundText: 'МЯУ', spoken: 'мяу', emoji: '🐱', actor: 'Кошка' },
        { id: 'frog', soundText: 'КВА', spoken: 'ква', emoji: '🐸', actor: 'Лягушка' },
        { id: 'hen', soundText: 'КО-КО', spoken: 'ко-ко', emoji: '🐔', actor: 'Курица' },
        { id: 'mouse', soundText: 'ПИ-ПИ', spoken: 'пи-пи', emoji: '🐭', actor: 'Мышка' },
        { id: 'sheep', soundText: 'БЕ-Е', spoken: 'бее', emoji: '🐑', actor: 'Овечка' },
        { id: 'goat', soundText: 'МЕ-Е', spoken: 'мее', emoji: '🐐', actor: 'Коза' },
        { id: 'goose', soundText: 'ГА-ГА', spoken: 'га-га', emoji: '🪿', actor: 'Гусь' },
        { id: 'drum', soundText: 'БАХ', spoken: 'бах', emoji: '🥁', actor: 'Барабан' },
        { id: 'drop', soundText: 'КАП-КАП', spoken: 'кап-кап', emoji: '💧', actor: 'Капелька' },
        { id: 'clock', soundText: 'ТИК-ТАК', spoken: 'тик-так', emoji: '⏰', actor: 'Часы' }
      ]
    },
    syllables: {
      intro: 'Тетради 3–9: Выбери согласную, прошагай открытые и закрытые слоги и поймай слог на слух!',
      groups: [
        { c: 'М', open: ['МА', 'МО', 'МУ', 'МЭ', 'МИ', 'МЫ'], closed: ['АМ', 'ОМ', 'УМ', 'ЭМ', 'ИМ', 'ЫМ'], words: [{ emoji: '👩', display: 'МА·МА', word: 'МАМА' }, { emoji: '🌊', display: 'МО·РЕ', word: 'МОРЕ' }, { emoji: '🧼', display: 'МЫ·ЛО', word: 'МЫЛО' }] },
        { c: 'П', open: ['ПА', 'ПО', 'ПУ', 'ПЭ', 'ПИ', 'ПЫ'], closed: ['АП', 'ОП', 'УП', 'ЭП', 'ИП', 'ЫП'], words: [{ emoji: '👨', display: 'ПА·ПА', word: 'ПАПА' }, { emoji: '🌾', display: 'ПО·ЛЕ', word: 'ПОЛЕ' }, { emoji: '🐝', display: 'ПЫ·ЛЬ', word: 'ПЫЛЬ' }] },
        { c: 'Б', open: ['БА', 'БО', 'БУ', 'БЭ', 'БИ', 'БЫ'], closed: ['АБ', 'ОБ', 'УБ', 'ЭБ', 'ИБ', 'ЫБ'], words: [{ emoji: '🍌', display: 'БА·НАН', word: 'БАНАН' }, { emoji: '🥁', display: 'БУ·БЕН', word: 'БУБЕН' }, { emoji: '🐂', display: 'БЫК', word: 'БЫК' }] },
        { c: 'В', open: ['ВА', 'ВО', 'ВУ', 'ВЭ', 'ВИ', 'ВЫ'], closed: ['АВ', 'ОВ', 'УВ', 'ЭВ', 'ИВ', 'ЫВ'], words: [{ emoji: '💧', display: 'ВО·ДА', word: 'ВОДА' }, { emoji: '🏺', display: 'ВА·ЗА', word: 'ВАЗА' }, { emoji: '🐺', display: 'ВОЛК', word: 'ВОЛК' }] },
        { c: 'Ф', open: ['ФА', 'ФО', 'ФУ', 'ФЭ', 'ФИ', 'ФЫ'], closed: ['АФ', 'ОФ', 'УФ', 'ЭФ', 'ИФ', 'ЫФ'], words: [{ emoji: '🔦', display: 'ФА·РА', word: 'ФАРА' }, { emoji: '📸', display: 'ФО·ТО', word: 'ФОТО' }, { emoji: '🦉', display: 'ФИ·ЛИН', word: 'ФИЛИН' }] },
        { c: 'Т', open: ['ТА', 'ТО', 'ТУ', 'ТЭ', 'ТИ', 'ТЫ'], closed: ['АТ', 'ОТ', 'УТ', 'ЭТ', 'ИТ', 'ЫТ'], words: [{ emoji: '🎂', display: 'ТОРТ', word: 'ТОРТ' }, { emoji: '🐯', display: 'ТИГР', word: 'ТИГР' }, { emoji: '☁️', display: 'ТУ·ЧА', word: 'ТУЧА' }] },
        { c: 'Д', open: ['ДА', 'ДО', 'ДУ', 'ДЭ', 'ДИ', 'ДЫ'], closed: ['АД', 'ОД', 'УД', 'ЭД', 'ИД', 'ЫД'], words: [{ emoji: '🏠', display: 'ДОМ', word: 'ДОМ' }, { emoji: '🌳', display: 'ДУБ', word: 'ДУБ' }, { emoji: '💨', display: 'ДЫМ', word: 'ДЫМ' }] },
        { c: 'Н', open: ['НА', 'НО', 'НУ', 'НЭ', 'НИ', 'НЫ'], closed: ['АН', 'ОН', 'УН', 'ЭН', 'ИН', 'ЫН'], words: [{ emoji: '👃', display: 'НОС', word: 'НОС' }, { emoji: '🌙', display: 'ЛУ·НА', word: 'ЛУНА' }, { emoji: '☁️', display: 'НЕ·БО', word: 'НЕБО' }] },
        { c: 'Л', open: ['ЛА', 'ЛО', 'ЛУ', 'ЛЭ', 'ЛИ', 'ЛЫ'], closed: ['АЛ', 'ОЛ', 'УЛ', 'ЭЛ', 'ИЛ', 'ЫЛ'], words: [{ emoji: '🦊', display: 'ЛИ·СА', word: 'ЛИСА' }, { emoji: '🌙', display: 'ЛУ·НА', word: 'ЛУНА' }, { emoji: '☀️', display: 'ЛЕ·ТО', word: 'ЛЕТО' }] },
        { c: 'С', open: ['СА', 'СО', 'СУ', 'СЭ', 'СИ', 'СЫ'], closed: ['АС', 'ОС', 'УС', 'ЭС', 'ИС', 'ЫС'], words: [{ emoji: '🦉', display: 'СО·ВА', word: 'СОВА' }, { emoji: '🧀', display: 'СЫР', word: 'СЫР' }, { emoji: '🍲', display: 'СУП', word: 'СУП' }] },
        { c: 'З', open: ['ЗА', 'ЗО', 'ЗУ', 'ЗЭ', 'ЗИ', 'ЗЫ'], closed: ['АЗ', 'ОЗ', 'УЗ', 'ЭЗ', 'ИЗ', 'ЫЗ'], words: [{ emoji: '❄️', display: 'ЗИ·МА', word: 'ЗИМА' }, { emoji: '🐐', display: 'КО·ЗА', word: 'КОЗА' }, { emoji: '🦷', display: 'ЗУБ', word: 'ЗУБ' }] },
        { c: 'К', open: ['КА', 'КО', 'КУ', 'КЭ', 'КИ', 'КЫ'], closed: ['АК', 'ОК', 'УК', 'ЭК', 'ИК', 'ЫК'], words: [{ emoji: '🐱', display: 'КОТ', word: 'КОТ' }, { emoji: '🥣', display: 'КА·ША', word: 'КАША' }, { emoji: '🐋', display: 'КИТ', word: 'КИТ' }] },
        { c: 'Г', open: ['ГА', 'ГО', 'ГУ', 'ГЭ', 'ГИ', 'ГЫ'], closed: ['АГ', 'ОГ', 'УГ', 'ЭГ', 'ИГ', 'ЫГ'], words: [{ emoji: '🏔️', display: 'ГО·РА', word: 'ГОРА' }, { emoji: '🪿', display: 'ГУ·СИ', word: 'ГУСИ' }, { emoji: '🍄', display: 'ГРИБ', word: 'ГРИБ' }] },
        { c: 'Р', open: ['РА', 'РО', 'РУ', 'РЭ', 'РИ', 'РЫ'], closed: ['АР', 'ОР', 'УР', 'ЭР', 'ИР', 'ЫР'], words: [{ emoji: '🐟', display: 'РЫ·БА', word: 'РЫБА' }, { emoji: '✋', display: 'РУ·КА', word: 'РУКА' }, { emoji: '🚀', display: 'РА·КЕ·ТА', word: 'РАКЕТА' }] }
      ]
    },
    digraphs: {
      intro: 'Тетради 10–17: Тренируем шипящие, йотированные и мягкие слоги!',
      groups: [
        {
          id: 'sha', label: 'ША / ШИ', title: 'Твёрдое Ш (Шу-ша-ши)', tip: 'Звук [Ш] всегда твёрдый! После Ш пишем И, а читаем как ШЫ.',
          syllables: ['ША', 'ШО', 'ШУ', 'ШЕ', 'ШИ'],
          words: [{ emoji: '🧣', display: 'ШАРФ', word: 'ШАРФ' }, { emoji: '🎈', display: 'ШАР', word: 'ШАР' }, { emoji: '🚗', display: 'МА·ШИ·НА', word: 'МАШИНА' }]
        },
        {
          id: 'cha', label: 'ЧА / ЩА', title: 'Мягкие Ч и Щ', tip: 'Звуки [Ч] и [Щ] всегда мягкие! ЧА и ЩА пишем с А, ЧУ и ЩУ пишем с У.',
          syllables: ['ЧА', 'ЧУ', 'ЧИ', 'ЩА', 'ЩУ', 'ЩИ'],
          words: [{ emoji: '🍵', display: 'ЧАШ·КА', word: 'ЧАШКА' }, { emoji: '⏰', display: 'ЧА·СЫ', word: 'ЧАСЫ' }, { emoji: '🧹', display: 'ЩЁТ·КА', word: 'ЩЁТКА' }]
        },
        {
          id: 'zha', label: 'ЖА / ЖИ', title: 'Твёрдое Ж', tip: 'Звук [Ж] всегда твёрдый, но в ЖИ пишется буква И!',
          syllables: ['ЖА', 'ЖО', 'ЖУ', 'ЖЕ', 'ЖИ'],
          words: [{ emoji: '🐸', display: 'ЖА·БА', word: 'ЖАБА' }, { emoji: '🪲', display: 'ЖУК', word: 'ЖУК' }, { emoji: '🦒', display: 'ЖИ·РАФ', word: 'ЖИРАФ' }]
        },
        {
          id: 'mya', label: 'МЯ / МЁ / МЮ', title: 'Мягкие слияния с М', tip: 'Гласные Я, Ё, Ю, Е делают согласный перед ними мягким.',
          syllables: ['МЯ', 'МЁ', 'МЮ', 'МЕ', 'МИ'],
          words: [{ emoji: '⚽', display: 'МЯЧ', word: 'МЯЧ' }, { emoji: '🍯', display: 'МЁД', word: 'МЁД' }, { emoji: '🐻', display: 'МИ·ШКА', word: 'МИШКА' }]
        },
        {
          id: 'lya', label: 'ЛЯ / ЛЁ / ЛЮ', title: 'Мягкие слияния с Л', tip: 'Тянем мягко: ЛЯ-ЛЁ-ЛЮ-ЛЕ-ЛИ!',
          syllables: ['ЛЯ', 'ЛЁ', 'ЛЮ', 'ЛЕ', 'ЛИ'],
          words: [{ emoji: '🧊', display: 'ЛЁД', word: 'ЛЁД' }, { emoji: '🦁', display: 'ЛЕВ', word: 'ЛЕВ' }, { emoji: '🍋', display: 'ЛИ·МОН', word: 'ЛИМОН' }]
        },
        {
          id: 'soft', label: 'ЛЬ / НЬ / ТЬ', title: 'Мягкий знак Ь на конце', tip: 'Буква Ь смягчает предыдущий согласный звук!',
          syllables: ['ЛЬ', 'НЬ', 'ТЬ', 'СЬ', 'РЬ'],
          words: [{ emoji: '🐎', display: 'КОНЬ', word: 'КОНЬ' }, { emoji: '🌲', display: 'ЕЛЬ', word: 'ЕЛЬ' }, { emoji: '🦢', display: 'ГУСЬ', word: 'ГУСЬ' }]
        },
        {
          id: 'tsy', label: 'ЦА / ЦЫ / ЦИ', title: 'Твёрдое Ц', tip: 'Звук [Ц] всегда твёрдый!',
          syllables: ['ЦА', 'ЦО', 'ЦУ', 'ЦЕ', 'ЦЫ', 'ЦИ'],
          words: [{ emoji: '🌸', display: 'ЦВЕ·ТОК', word: 'ЦВЕТОК' }, { emoji: '🐥', display: 'ЦЫП·ЛЁ·НОК', word: 'ЦЫПЛЁНОК' }, { emoji: '🎪', display: 'ЦИРК', word: 'ЦИРК' }]
        }
      ]
    },
    sentences: {
      intro: 'Тетрадь 18: Прочитай фразу по слогам сам и выбери подходящую картинку!',
      items: [
        { id: 's1', display: 'МА·МА МО·ЕТ РА·МУ', spoken: 'Мама моет раму', correctEmoji: '🪟', distractors: ['⚽', '🐱'] },
        { id: 's2', display: 'КОТ ПЬЁТ МО·ЛО·КО', spoken: 'Кот пьёт молоко', correctEmoji: '🐱', distractors: ['🐶', '🚗'] },
        { id: 's3', display: 'ПА·ПА ЧИ·ТА·ЕТ КНИ·ГУ', spoken: 'Папа читает книгу', correctEmoji: '📖', distractors: ['🍌', '🐸'] },
        { id: 's4', display: 'СО·БА·КА ГРЫ·ЗЁТ КОСТЬ', spoken: 'Собака грызёт кость', correctEmoji: '🐶', distractors: ['🦉', '🌸'] },
        { id: 's5', display: 'РЫ·БА ПЛЫ·ВЁТ В ВО·ДЕ', spoken: 'Рыба плывёт в воде', correctEmoji: '🐟', distractors: ['✈️', '🍎'] },
        { id: 's6', display: 'ЖА·БА ПРЫ·ГА·ЕТ В ПРУД', spoken: 'Жаба прыгает в пруд', correctEmoji: '🐸', distractors: ['🚂', '🎂'] },
        { id: 's7', display: 'РА·КЕ·ТА ЛЕ·ТИТ В КОС·МОС', spoken: 'Ракета летит в космос', correctEmoji: '🚀', distractors: ['🐟', '🐮'] },
        { id: 's8', display: 'МА·ЛЫШ ЕСТ КА·ШУ', spoken: 'Малыш ест кашу', correctEmoji: '🥣', distractors: ['🌙', '🚗'] },
        { id: 's9', display: 'НА НЕ·БЕ ЯР·КА·Я РА·ДУ·ГА', spoken: 'На небе яркая радуга', correctEmoji: '🌈', distractors: ['🥾', '🧀'] },
        { id: 's10', display: 'БЕЛ·КА ГРЫ·ЗЁТ О·РЕХ', spoken: 'Белка грызёт орех', correctEmoji: '🐿️', distractors: ['🐢', '🚌'] },
        { id: 's11', display: 'В ЛЕ·СУ РАС·ТУТ ГРИ·БЫ', spoken: 'В лесу растут грибы', correctEmoji: '🍄', distractors: ['✈️', '⏰'] },
        { id: 's12', display: 'ЛИ·СА И·ДЁТ ПО СНЕ·ГУ', spoken: 'Лиса идёт по снегу', correctEmoji: '🦊', distractors: ['🍉', '🚢'] }
      ]
    }
  },
  pl: {
    chapters: [
      { id: 'vowels', badge: 'Zesz. 1', title: 'Samogłoski', icon: '🗣️' },
      { id: 'onomatopoeia', badge: 'Zesz. 2', title: 'Dźwięki', icon: '🐮' },
      { id: 'syllables', badge: 'Zesz. 3–9', title: 'Sylaby', icon: '🚂' },
      { id: 'digraphs', badge: 'Zesz. 10–17', title: 'Dwuznaki', icon: '✨' },
      { id: 'sentences', badge: 'Zesz. 18', title: 'Zdania', icon: '📖' }
    ],
    vowels: {
      intro: 'Zeszyt 1 (Samogłoski): kliknij i zaśpiewaj samogłoski, a potem przeczytaj pary!',
      singles: [
        { letter: 'A', cue: 'Szeroko otwarta buzia: A-A-A', emoji: '😮', spoken: 'a' },
        { letter: 'O', cue: 'Usta w kółeczko: O-O-O', emoji: '⭕', spoken: 'o' },
        { letter: 'U', cue: 'Dzióbek z ust: U-U-U', emoji: '🚂', spoken: 'u' },
        { letter: 'E', cue: 'Szeroko i miękko: E-E-E', emoji: '😜', spoken: 'e' },
        { letter: 'I', cue: 'Uśmiech: I-I-I', emoji: '😁', spoken: 'i' },
        { letter: 'Y', cue: 'Język w dół: Y-Y-Y', emoji: '🐻', spoken: 'y' }
      ],
      pairs: [
        { text: 'AU', scene: '🌲', caption: 'Wołamy w lesie: AU!', spoken: 'au' },
        { text: 'UA', scene: '👶', caption: 'Dzidziuś płacze: UA!', spoken: 'ua' },
        { text: 'IA', scene: '🫏', caption: 'Osiołek krzyczy: IA!', spoken: 'ia' },
        { text: 'OU', scene: '😮', caption: 'Zdziwienie: OU!', spoken: 'ou' },
        { text: 'EJ', scene: '👋', caption: 'Zawołanie: EJ!', spoken: 'ej' },
        { text: 'AJ', scene: '🌵', caption: 'Kłuje: AJ!', spoken: 'aj' }
      ]
    },
    onomatopoeia: {
      intro: 'Zeszyt 2: Poznaj wyrażenia dźwiękonaśladowcze, a potem przeczytaj dymek i zgadnij, kto tak mówi!',
      items: [
        { id: 'cow', soundText: 'MU', spoken: 'mu', emoji: '🐮', actor: 'Krowa' },
        { id: 'dog', soundText: 'HAU', spoken: 'hau', emoji: '🐶', actor: 'Pies' },
        { id: 'cat', soundText: 'MIAU', spoken: 'miau', emoji: '🐱', actor: 'Kot' },
        { id: 'frog', soundText: 'KWA', spoken: 'kwa', emoji: '🐸', actor: 'Żaba' },
        { id: 'hen', soundText: 'KO-KO', spoken: 'ko-ko', emoji: '🐔', actor: 'Kura' },
        { id: 'mouse', soundText: 'PI-PI', spoken: 'pi-pi', emoji: '🐭', actor: 'Myszka' },
        { id: 'sheep', soundText: 'BE', spoken: 'be', emoji: '🐑', actor: 'Owca' },
        { id: 'goat', soundText: 'ME', spoken: 'me', emoji: '🐐', actor: 'Koza' },
        { id: 'goose', soundText: 'GĘ-GĘ', spoken: 'gę-gę', emoji: '🪿', actor: 'Gęś' },
        { id: 'drum', soundText: 'BACH', spoken: 'bach', emoji: '🥁', actor: 'Bęben' },
        { id: 'drop', soundText: 'KAP-KAP', spoken: 'kap-kap', emoji: '💧', actor: 'Kropla' },
        { id: 'clock', soundText: 'TIK-TAK', spoken: 'tik-tak', emoji: '⏰', actor: 'Zegar' }
      ]
    },
    syllables: {
      intro: 'Zeszyty 3–9: Wybierz spółgłoskę, przeczytaj sylaby otwarte i zamknięte oraz złap sylabę ze słuchu!',
      groups: [
        { c: 'P', open: ['PA', 'PO', 'PU', 'PE', 'PI', 'PY'], closed: ['AP', 'OP', 'UP', 'EP', 'IP', 'YP'], words: [{ emoji: '👨', display: 'PA·PA', word: 'PAPA' }, { emoji: '🐆', display: 'PU·MA', word: 'PUMA' }, { emoji: '🌾', display: 'PO·LE', word: 'POLE' }] },
        { c: 'M', open: ['MA', 'MO', 'MU', 'ME', 'MI', 'MY'], closed: ['AM', 'OM', 'UM', 'EM', 'IM', 'YM'], words: [{ emoji: '👩', display: 'MA·MA', word: 'MAMA' }, { emoji: '🌊', display: 'MO·RZE', word: 'MORZE' }, { emoji: '🧼', display: 'MY·DŁO', word: 'MYDŁO' }] },
        { c: 'B', open: ['BA', 'BO', 'BU', 'BE', 'BI', 'BY'], closed: ['AB', 'OB', 'UB', 'EB', 'IB', 'YB'], words: [{ emoji: '🍌', display: 'BA·NAN', word: 'BANAN' }, { emoji: '🎈', display: 'BA·LON', word: 'BALON' }, { emoji: '🥖', display: 'BUŁ·KA', word: 'BUŁKA' }] },
        { c: 'L', open: ['LA', 'LO', 'LU', 'LE', 'LI', 'LY'], closed: ['AL', 'OL', 'UL', 'EL', 'IL', 'YL'], words: [{ emoji: '☀️', display: 'LA·TO', word: 'LATO' }, { emoji: '🦊', display: 'LI·SEK', word: 'LISEK' }, { emoji: '🦁', display: 'LEW', word: 'LEW' }] },
        { c: 'F', open: ['FA', 'FO', 'FU', 'FE', 'FI', 'FY'], closed: ['AF', 'OF', 'UF', 'EF', 'IF', 'YF'], words: [{ emoji: '🌊', display: 'FA·LA', word: 'FALA' }, { emoji: '🦭', display: 'FO·KA', word: 'FOKA' }, { emoji: '🦒', display: 'ŻY·RA·FA', word: 'ŻYRAFA' }] },
        { c: 'W', open: ['WA', 'WO', 'WU', 'WE', 'WI', 'WY'], closed: ['AW', 'OW', 'UW', 'EW', 'IW', 'YW'], words: [{ emoji: '💧', display: 'WO·DA', word: 'WODA' }, { emoji: '🏺', display: 'WA·ZON', word: 'WAZON' }, { emoji: '🐺', display: 'WILK', word: 'WILK' }] },
        { c: 'T', open: ['TA', 'TO', 'TU', 'TE', 'TI', 'TY'], closed: ['AT', 'OT', 'UT', 'ET', 'IT', 'YT'], words: [{ emoji: '👨', display: 'TA·TA', word: 'TATA' }, { emoji: '🎂', display: 'TORT', word: 'TORT' }, { emoji: '🦋', display: 'MO·TYL', word: 'MOTYL' }] },
        { c: 'D', open: ['DA', 'DO', 'DU', 'DE', 'DI', 'DY'], closed: ['AD', 'OD', 'UD', 'ED', 'ID', 'YD'], words: [{ emoji: '🏠', display: 'DOM', word: 'DOM' }, { emoji: '🍉', display: 'DY·NIA', word: 'DYNIA' }, { emoji: '🌳', display: 'DĄB', word: 'DĄB' }] },
        { c: 'S', open: ['SA', 'SO', 'SU', 'SE', 'SI', 'SY'], closed: ['AS', 'OS', 'US', 'ES', 'IS', 'YS'], words: [{ emoji: '🦉', display: 'SO·WA', word: 'SOWA' }, { emoji: '🧀', display: 'SER', word: 'SER' }, { emoji: '✈️', display: 'SA·MO·LOT', word: 'SAMOLOT' }] },
        { c: 'Z', open: ['ZA', 'ZO', 'ZU', 'ZE', 'ZI', 'ZY'], closed: ['AZ', 'OZ', 'UZ', 'EZ', 'IZ', 'YZ'], words: [{ emoji: '❄️', display: 'ZI·MA', word: 'ZIMA' }, { emoji: '⏰', display: 'ZE·GAR', word: 'ZEGAR' }, { emoji: '🦓', display: 'ZE·BRA', word: 'ZEBRA' }] },
        { c: 'K', open: ['KA', 'KO', 'KU', 'KE', 'KI', 'KY'], closed: ['AK', 'OK', 'UK', 'EK', 'IK', 'YK'], words: [{ emoji: '🐱', display: 'KO·TEK', word: 'KOTEK' }, { emoji: '☕', display: 'KA·WA', word: 'KAWA' }, { emoji: '🐄', display: 'KRO·WA', word: 'KROWA' }] },
        { c: 'G', open: ['GA', 'GO', 'GU', 'GE', 'GI', 'GY'], closed: ['AG', 'OG', 'UG', 'EG', 'IG', 'YG'], words: [{ emoji: '🏔️', display: 'GÓ·RA', word: 'GÓRA' }, { emoji: '🍄', display: 'GRZYB', word: 'GRZYB' }, { emoji: '🕊️', display: 'GO·ŁĄB', word: 'GOŁĄB' }] },
        { c: 'N', open: ['NA', 'NO', 'NU', 'NE', 'NI', 'NY'], closed: ['AN', 'ON', 'UN', 'EN', 'IN', 'YN'], words: [{ emoji: '👃', display: 'NOS', word: 'NOS' }, { emoji: '🦶', display: 'NO·GA', word: 'NOGA' }, { emoji: '🌙', display: 'NOC', word: 'NOC' }] },
        { c: 'J', open: ['JA', 'JO', 'JU', 'JE', 'JI', 'JY'], closed: ['AJ', 'OJ', 'UJ', 'EJ', 'IJ', 'YJ'], words: [{ emoji: '🥚', display: 'JAJ·KO', word: 'JAJKO' }, { emoji: '🦔', display: 'JEŻ', word: 'JEŻ' }, { emoji: '🍎', display: 'JABŁ·KO', word: 'JABŁKO' }] }
      ]
    },
    digraphs: {
      intro: 'Zeszyty 10–17: Dwuznaki (SZ, CZ, RZ, DZ, CH, Ł), głoski miękkie (Ś, Ć, Ź, Ń) oraz Ą i Ę!',
      groups: [
        {
          id: 'sz', label: 'SZ', title: 'Dwuznak SZ (Zeszyt 10)', tip: 'Dwie litery S + Z czytamy razem jako jeden dźwięk [SZ]!',
          syllables: ['SZA', 'SZO', 'SZU', 'SZE', 'SZY'],
          words: [{ emoji: '🧣', display: 'SZA·LIK', word: 'SZALIK' }, { emoji: '🚪', display: 'SZA·FA', word: 'SZAFA' }, { emoji: '🐭', display: 'MYSZ·KA', word: 'MYSZKA' }]
        },
        {
          id: 'cz', label: 'CZ', title: 'Dwuznak CZ (Zeszyt 12)', tip: 'Litery C + Z czytamy razem jak twarde [CZ]!',
          syllables: ['CZA', 'CZO', 'CZU', 'CZE', 'CZY'],
          words: [{ emoji: '🧢', display: 'CZAP·KA', word: 'CZAPKA' }, { emoji: '🌈', display: 'TĘ·CZA', word: 'TĘCZA' }, { emoji: '🔑', display: 'KLUCZ', word: 'KLUCZ' }]
        },
        {
          id: 'rz_z', label: 'RZ / Ż', title: 'RZ oraz Ż (Zeszyt 10–11)', tip: 'Dwuznak RZ i litera Ż brzmią tak samo — jak bzyczenie żuka!',
          syllables: ['RZA', 'RZO', 'RZU', 'ŻA', 'ŻO', 'ŻU'],
          words: [{ emoji: '🐸', display: 'ŻA·BA', word: 'ŻABA' }, { emoji: '🌊', display: 'RZE·KA', word: 'RZEKA' }, { emoji: '🍄', display: 'GRZYB', word: 'GRZYB' }]
        },
        {
          id: 'dz', label: 'DZ / DŻ', title: 'Dwuznaki DZ i DŻ (Zeszyt 11–13)', tip: 'Czytamy razem bez rozdzielania liter!',
          syllables: ['DZA', 'DZO', 'DZU', 'DŻA', 'DŻE', 'DŻU'],
          words: [{ emoji: '🔔', display: 'DZWON', word: 'DZWON' }, { emoji: '🍓', display: 'DŻEM', word: 'DŻEM' }, { emoji: '👖', display: 'DŻIN·SY', word: 'DŻINSY' }]
        },
        {
          id: 'ch_l', label: 'CH / Ł', title: 'CH i Ł (Zeszyt 12–13)', tip: 'CH czytamy jak H, a Ł wymawiamy zaokrąglając usta!',
          syllables: ['CHA', 'CHO', 'CHU', 'ŁA', 'ŁO', 'ŁU'],
          words: [{ emoji: '🍞', display: 'CHLEB', word: 'CHLEB' }, { emoji: '☁️', display: 'CHMU·RA', word: 'CHMURA' }, { emoji: '🚣', display: 'ŁÓD·KA', word: 'ŁÓDKA' }]
        },
        {
          id: 'soft', label: 'Ś / Ć / Ź / Ń', title: 'Miękkie głoski z kreską i „i” (Zeszyt 14–16)', tip: 'Ś i SI, Ć i CI, Ź i ZI, Ń i NI brzmią bardzo miękko!',
          syllables: ['SIA', 'SIO', 'CIA', 'CIO', 'ZIA', 'NIA'],
          words: [{ emoji: '❄️', display: 'ŚNIEG', word: 'ŚNIEG' }, { emoji: '🐎', display: 'KOŃ', word: 'KOŃ' }, { emoji: '🐻', display: 'MIŚ', word: 'MIŚ' }]
        },
        {
          id: 'nasal', label: 'Ą / Ę', title: 'Samogłoski nosowe Ą i Ę (Zeszyt 17)', tip: 'Samogłoski z ogonkiem czytamy nosowo: WĄŻ, RĘKA!',
          syllables: ['MĄ', 'MĘ', 'KĄ', 'KĘ', 'SĄ', 'SĘ'],
          words: [{ emoji: '🐍', display: 'WĄŻ', word: 'WĄŻ' }, { emoji: '✋', display: 'RĘ·KA', word: 'RĘKA' }, { emoji: '🌳', display: 'DĄB', word: 'DĄB' }]
        }
      ]
    },
    sentences: {
      intro: 'Zeszyt 18: Przeczytaj zdanie sylabami samodzielnie i wybierz właściwy obrazek!',
      items: [
        { id: 'pl1', display: 'MA·MA MA KO·TA', spoken: 'Mama ma kota', correctEmoji: '🐱', distractors: ['🐶', '🚗'] },
        { id: 'pl2', display: 'TA·TA PI·JE KA·WĘ', spoken: 'Tata pije kawę', correctEmoji: '☕', distractors: ['🐸', '🎈'] },
        { id: 'pl3', display: 'ŻA·BA SKA·CZE DO WO·DY', spoken: 'Żaba skacze do wody', correctEmoji: '🐸', distractors: ['✈️', '🍎'] },
        { id: 'pl4', display: 'KO·TEK PI·JE MLE·KO', spoken: 'Kotek pije mleko', correctEmoji: '🥛', distractors: ['🚌', '🍄'] },
        { id: 'pl5', display: 'PIES BIE·GA PO PAR·KU', spoken: 'Pies biega po parku', correctEmoji: '🐶', distractors: ['🌙', '🍅'] },
        { id: 'pl6', display: 'RY·BA PŁY·WA W MO·RZU', spoken: 'Ryba pływa w morzu', correctEmoji: '🐟', distractors: ['🧀', '🚀'] },
        { id: 'pl7', display: 'RA·KIE·TA LE·CI W KOS·MOS', spoken: 'Rakieta leci w kosmos', correctEmoji: '🚀', distractors: ['🐢', '🥖'] },
        { id: 'pl8', display: 'NA NIE·BIE ŚWIE·CI SŁOŃ·CE', spoken: 'Na niebie świeci słońce', correctEmoji: '☀️', distractors: ['🧦', '🐻'] },
        { id: 'pl9', display: 'MO·TYL SIA·DA NA KWIA·TKU', spoken: 'Motyl siada na kwiatku', correctEmoji: '🦋', distractors: ['⏰', '🚲'] },
        { id: 'pl10', display: 'JA·NEK JE SŁOD·KIE JABŁ·KO', spoken: 'Janek je słodkie jabłko', correctEmoji: '🍎', distractors: ['🦊', '🥁'] },
        { id: 'pl11', display: 'LI·SEK I·DZIE PRZEZ LAS', spoken: 'Lisek idzie przez las', correctEmoji: '🦊', distractors: ['🌊', '🎂'] },
        { id: 'pl12', display: 'PO DESZ·CZU JEST TĘ·CZA', spoken: 'Po deszczu jest tęcza', correctEmoji: '🌈', distractors: ['🐘', '🔑'] }
      ]
    }
  },
  en: {
    chapters: [
      { id: 'vowels', badge: 'Book 1', title: 'Vowels', icon: '🗣️' },
      { id: 'onomatopoeia', badge: 'Book 2', title: 'Sounds', icon: '🐮' },
      { id: 'syllables', badge: 'Books 3–9', title: 'Syllables', icon: '🚂' },
      { id: 'digraphs', badge: 'Books 10–17', title: 'Digraphs', icon: '✨' },
      { id: 'sentences', badge: 'Book 18', title: 'Stories', icon: '📖' }
    ],
    vowels: {
      intro: 'Book 1 (Vowels): tap & sing each vowel, then blend two vowels together!',
      singles: [
        { letter: 'A', cue: 'Open wide: A-A-A', emoji: '😮', spoken: 'a' },
        { letter: 'E', cue: 'Big smile: E-E-E', emoji: '😜', spoken: 'eh' },
        { letter: 'I', cue: 'Tiny smile: I-I-I', emoji: '😁', spoken: 'ih' },
        { letter: 'O', cue: 'Round mouth: O-O-O', emoji: '⭕', spoken: 'oh' },
        { letter: 'U', cue: 'Round lips: U-U-U', emoji: '🚂', spoken: 'oo' },
        { letter: 'Y', cue: 'Happy end: Y-Y-Y', emoji: '🌟', spoken: 'ee' }
      ],
      pairs: [
        { text: 'AU', scene: '🌲', caption: 'Calling out: AU!', spoken: 'aw' },
        { text: 'UA', scene: '👶', caption: 'Baby cries: UA!', spoken: 'wah' },
        { text: 'IA', scene: '🫏', caption: 'Donkey says: EE-AH!', spoken: 'ee-ah' },
        { text: 'OU', scene: '😮', caption: 'Surprise: OH!', spoken: 'oh' },
        { text: 'OI', scene: '👋', caption: 'Look here: OI!', spoken: 'oy' },
        { text: 'AI', scene: '🌵', caption: 'Ouch: AI!', spoken: 'eye' }
      ]
    },
    onomatopoeia: {
      intro: 'Book 2: Learn animal & object sounds, then switch to Quiz and read who makes the sound!',
      items: [
        { id: 'cow', soundText: 'MOO', spoken: 'moo', emoji: '🐮', actor: 'Cow' },
        { id: 'dog', soundText: 'WOOF', spoken: 'woof', emoji: '🐶', actor: 'Dog' },
        { id: 'cat', soundText: 'MEOW', spoken: 'meow', emoji: '🐱', actor: 'Cat' },
        { id: 'frog', soundText: 'RIBBIT', spoken: 'ribbit', emoji: '🐸', actor: 'Frog' },
        { id: 'hen', soundText: 'CLUCK', spoken: 'cluck', emoji: '🐔', actor: 'Hen' },
        { id: 'mouse', soundText: 'SQUEAK', spoken: 'squeak', emoji: '🐭', actor: 'Mouse' },
        { id: 'sheep', soundText: 'BAA', spoken: 'baa', emoji: '🐑', actor: 'Sheep' },
        { id: 'duck', soundText: 'QUACK', spoken: 'quack', emoji: '🦆', actor: 'Duck' },
        { id: 'bee', soundText: 'BUZZ', spoken: 'buzz', emoji: '🐝', actor: 'Bee' },
        { id: 'drum', soundText: 'BOOM', spoken: 'boom', emoji: '🥁', actor: 'Drum' },
        { id: 'drop', soundText: 'DRIP-DROP', spoken: 'drip drop', emoji: '💧', actor: 'Raindrop' },
        { id: 'clock', soundText: 'TICK-TOCK', spoken: 'tick tock', emoji: '⏰', actor: 'Clock' }
      ]
    },
    syllables: {
      intro: 'Books 3–9: Pick a consonant, walk open & closed syllables, and catch the spoken syllable!',
      groups: [
        { c: 'M', open: ['MA', 'ME', 'MI', 'MO', 'MU', 'MY'], closed: ['AM', 'EM', 'IM', 'OM', 'UM', 'YM'], words: [{ emoji: '👩', display: 'MA·MA', word: 'MAMA' }, { emoji: '🌙', display: 'MOON', word: 'MOON' }, { emoji: '🐒', display: 'MON·KEY', word: 'MONKEY' }] },
        { c: 'P', open: ['PA', 'PE', 'PI', 'PO', 'PU', 'PY'], closed: ['AP', 'EP', 'IP', 'OP', 'UP', 'YP'], words: [{ emoji: '👨', display: 'PA·PA', word: 'PAPA' }, { emoji: '🐼', display: 'PAN·DA', word: 'PANDA' }, { emoji: '🐶', display: 'PUP·PY', word: 'PUPPY' }] },
        { c: 'B', open: ['BA', 'BE', 'BI', 'BO', 'BU', 'BY'], closed: ['AB', 'EB', 'IB', 'OB', 'UB', 'YB'], words: [{ emoji: '👶', display: 'BA·BY', word: 'BABY' }, { emoji: '🍌', display: 'BA·NA·NA', word: 'BANANA' }, { emoji: '🚌', display: 'BUS', word: 'BUS' }] },
        { c: 'T', open: ['TA', 'TE', 'TI', 'TO', 'TU', 'TY'], closed: ['AT', 'ET', 'IT', 'OT', 'UT', 'YT'], words: [{ emoji: '🐯', display: 'TI·GER', word: 'TIGER' }, { emoji: '🐢', display: 'TUR·TLE', word: 'TURTLE' }, { emoji: '🍅', display: 'TO·MA·TO', word: 'TOMATO' }] },
        { c: 'D', open: ['DA', 'DE', 'DI', 'DO', 'DU', 'DY'], closed: ['AD', 'ED', 'ID', 'OD', 'UD', 'YD'], words: [{ emoji: '🐶', display: 'DOG', word: 'DOG' }, { emoji: '🦆', display: 'DUCK', word: 'DUCK' }, { emoji: '👩‍⚕️', display: 'DOC·TOR', word: 'DOCTOR' }] },
        { c: 'N', open: ['NA', 'NE', 'NI', 'NO', 'NU', 'NY'], closed: ['AN', 'EN', 'IN', 'ON', 'UN', 'YN'], words: [{ emoji: '👃', display: 'NOSE', word: 'NOSE' }, { emoji: '🥚', display: 'NEST', word: 'NEST' }, { emoji: '🥜', display: 'NUT', word: 'NUT' }] },
        { c: 'L', open: ['LA', 'LE', 'LI', 'LO', 'LU', 'LY'], closed: ['AL', 'EL', 'IL', 'OL', 'UL', 'YL'], words: [{ emoji: '🦁', display: 'LI·ON', word: 'LION' }, { emoji: '🍋', display: 'LE·MON', word: 'LEMON' }, { emoji: '🍃', display: 'LEAF', word: 'LEAF' }] },
        { c: 'S', open: ['SA', 'SE', 'SI', 'SO', 'SU', 'SY'], closed: ['AS', 'ES', 'IS', 'OS', 'US', 'YS'], words: [{ emoji: '☀️', display: 'SUN', word: 'SUN' }, { emoji: '🕷️', display: 'SPI·DER', word: 'SPIDER' }, { emoji: '⭐', display: 'STAR', word: 'STAR' }] },
        { c: 'K', open: ['KA', 'KE', 'KI', 'KO', 'KU', 'KY'], closed: ['AK', 'EK', 'IK', 'OK', 'UK', 'YK'], words: [{ emoji: '🐱', display: 'KIT·TEN', word: 'KITTEN' }, { emoji: '🔑', display: 'KEY', word: 'KEY' }, { emoji: '👑', display: 'KING', word: 'KING' }] },
        { c: 'R', open: ['RA', 'RE', 'RI', 'RO', 'RU', 'RY'], closed: ['AR', 'ER', 'IR', 'OR', 'UR', 'YR'], words: [{ emoji: '🐰', display: 'RAB·BIT', word: 'RABBIT' }, { emoji: '🤖', display: 'RO·BOT', word: 'ROBOT' }, { emoji: '🌈', display: 'RAIN·BOW', word: 'RAINBOW' }] }
      ]
    },
    digraphs: {
      intro: 'Books 10–17: Master English digraphs & vowel teams (SH, CH, TH, WH, OO, EE)!',
      groups: [
        {
          id: 'sh', label: 'SH', title: 'Digraph SH', tip: 'S + H together make the quiet "shhh" sound!',
          syllables: ['SHA', 'SHE', 'SHI', 'SHO', 'SHU'],
          words: [{ emoji: '🐚', display: 'SHELL', word: 'SHELL' }, { emoji: '🐑', display: 'SHEEP', word: 'SHEEP' }, { emoji: '🦈', display: 'SHARK', word: 'SHARK' }]
        },
        {
          id: 'ch', label: 'CH', title: 'Digraph CH', tip: 'C + H together sound like a train: choo-choo!',
          syllables: ['CHA', 'CHE', 'CHI', 'CHO', 'CHU'],
          words: [{ emoji: '🧀', display: 'CHEESE', word: 'CHEESE' }, { emoji: '🍒', display: 'CHER·RY', word: 'CHERRY' }, { emoji: '🪑', display: 'CHAIR', word: 'CHAIR' }]
        },
        {
          id: 'th', label: 'TH', title: 'Digraph TH', tip: 'Put your tongue gently between your teeth for TH!',
          syllables: ['THA', 'THE', 'THI', 'THO', 'THU'],
          words: [{ emoji: '👍', display: 'THUMB', word: 'THUMB' }, { emoji: '3️⃣', display: 'THREE', word: 'THREE' }, { emoji: '⚡', display: 'THUN·DER', word: 'THUNDER' }]
        },
        {
          id: 'wh', label: 'WH / PH', title: 'Digraphs WH & PH', tip: 'PH sounds like F (dolphin), WH makes a breezy W sound!',
          syllables: ['WHA', 'WHE', 'WHI', 'PHA', 'PHO', 'PHI'],
          words: [{ emoji: '🐋', display: 'WHALE', word: 'WHALE' }, { emoji: '🎡', display: 'WHEEL', word: 'WHEEL' }, { emoji: '🐬', display: 'DOL·PHIN', word: 'DOLPHIN' }]
        },
        {
          id: 'oo', label: 'OO / EE', title: 'Long Vowel Teams OO & EE', tip: 'Two O letters say "oo" (moon), two E letters say "ee" (tree)!',
          syllables: ['MOO', 'BOO', 'ZOO', 'BEE', 'SEE', 'TEE'],
          words: [{ emoji: '🌙', display: 'MOON', word: 'MOON' }, { emoji: '🌳', display: 'TREE', word: 'TREE' }, { emoji: '🐝', display: 'BEE', word: 'BEE' }]
        },
        {
          id: 'ck', label: 'CK / NG', title: 'Ending Blends CK & NG', tip: 'CK says crisp /k/, NG hums like a bell!',
          syllables: ['ACK', 'OCK', 'UCK', 'ING', 'ONG', 'UNG'],
          words: [{ emoji: '🦆', display: 'DUCK', word: 'DUCK' }, { emoji: '🧦', display: 'SOCK', word: 'SOCK' }, { emoji: '👑', display: 'KING', word: 'KING' }]
        }
      ]
    },
    sentences: {
      intro: 'Book 18: Read the short sentence yourself and tap the matching picture!',
      items: [
        { id: 'en1', display: 'THE CAT SLEEPS', spoken: 'The cat sleeps', correctEmoji: '🐱', distractors: ['🚀', '🍎'] },
        { id: 'en2', display: 'MOM DRINKS TEA', spoken: 'Mom drinks tea', correctEmoji: '🍵', distractors: ['🐸', '🚌'] },
        { id: 'en3', display: 'THE DOG RUNS FAST', spoken: 'The dog runs fast', correctEmoji: '🐶', distractors: ['🦉', '🍌'] },
        { id: 'en4', display: 'A FROG JUMPS HIGH', spoken: 'A frog jumps high', correctEmoji: '🐸', distractors: ['⏰', '🎂'] },
        { id: 'en5', display: 'THE FISH SWIMS', spoken: 'The fish swims', correctEmoji: '🐟', distractors: ['✈️', '🧤'] },
        { id: 'en6', display: 'DAD READS A BOOK', spoken: 'Dad reads a book', correctEmoji: '📖', distractors: ['🧀', '🐑'] },
        { id: 'en7', display: 'A BEE LIKES FLOWERS', spoken: 'A bee likes flowers', correctEmoji: '🐝', distractors: ['🚂', '🥕'] },
        { id: 'en8', display: 'THE MOON SHINES', spoken: 'The moon shines', correctEmoji: '🌙', distractors: ['🍔', '🐢'] },
        { id: 'en9', display: 'LOOK AT THE RAINBOW', spoken: 'Look at the rainbow', correctEmoji: '🌈', distractors: ['🧦', '🥁'] },
        { id: 'en10', display: 'MONKEY EATS BANANA', spoken: 'Monkey eats banana', correctEmoji: '🐒', distractors: ['❄️', '🚢'] }
      ]
    }
  }
};

export class KochamCzytacGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.activeChapter = 'vowels'; // 'vowels' | 'onomatopoeia' | 'syllables' | 'digraphs' | 'sentences'
    this.nextTimer = null;
    this.speakTimer = null;

    // Глава 1: Гласные — мини-викторина
    this.vowelQuizTarget = null;
    this.vowelQuizOptions = [];
    this.vowelQuizAnswered = false;
    this.usedVowels = new Set();

    // Глава 2: Звукоподражания — подрежим (учим | угадай)
    this.onomatSubMode = 'learn'; // 'learn' | 'quiz'
    this.onomatTarget = null;
    this.onomatOptions = [];
    this.onomatAnswered = false;
    this.usedOnomat = new Set();

    // Глава 3: Слоги — текущая согласная + прогресс + мини-игра
    this.selectedConsonantIdx = 0;
    this.walkedSyllables = new Set();
    this.syllablesRewardedGroups = new Set();
    this.syllableQuizTarget = null;
    this.syllableQuizOptions = [];
    this.syllableQuizAnswered = false;

    // Глава 4: Двузнаки / Слияния
    this.selectedDigraphIdx = 0;
    this.digraphQuizTarget = null;
    this.digraphQuizOptions = [];
    this.digraphQuizAnswered = false;

    // Глава 5: Первые фразы
    this.sentenceItem = null;
    this.sentenceOptions = [];
    this.sentenceAnswered = false;
    this.usedSentences = new Set();
  }

  stop() {
    if (this.nextTimer) {
      clearTimeout(this.nextTimer);
      this.nextTimer = null;
    }
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    sound.stopSpeech();
  }

  _scheduleSpeak(text, delay = 180) {
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    const lang = this.lang;
    this.speakTimer = setTimeout(() => {
      this.speakTimer = null;
      sound.speakWord(text, lang);
    }, delay);
  }

  setLanguage(lang) {
    if (this.lang !== lang) {
      this.lang = lang;
      this.resetProgressForLang();
    }
    this.start();
  }

  resetProgressForLang() {
    this.selectedConsonantIdx = 0;
    this.selectedDigraphIdx = 0;
    this.walkedSyllables.clear();
    this.syllablesRewardedGroups.clear();
    this.usedVowels.clear();
    this.usedOnomat.clear();
    this.usedSentences.clear();
    this.vowelQuizTarget = null;
    this.onomatTarget = null;
    this.syllableQuizTarget = null;
    this.digraphQuizTarget = null;
    this.sentenceItem = null;
  }

  start() {
    this.stop();
    this.ensureChapterData();
    this.render();
  }

  switchChapter(chapterId) {
    if (this.activeChapter === chapterId) return;
    this.stop();
    sound.playLetterClick();
    this.activeChapter = chapterId;
    this.ensureChapterData();
    this.render();
  }

  ensureChapterData() {
    if (this.activeChapter === 'vowels' && !this.vowelQuizTarget) {
      this.prepareVowelQuiz(false);
    } else if (this.activeChapter === 'onomatopoeia' && this.onomatSubMode === 'quiz' && !this.onomatTarget) {
      this.prepareOnomatQuiz();
    } else if (this.activeChapter === 'syllables' && !this.syllableQuizTarget) {
      this.prepareSyllableQuiz(false);
    } else if (this.activeChapter === 'digraphs' && !this.digraphQuizTarget) {
      this.prepareDigraphQuiz(false);
    } else if (this.activeChapter === 'sentences' && !this.sentenceItem) {
      this.prepareSentenceRound();
    }
  }

  // ---------- ГЛАВА 1: ГЛАСНЫЕ ----------
  prepareVowelQuiz(shouldSpeak = true) {
    const data = WORKBOOKS_DATA[this.lang].vowels;
    const pool = [
      ...data.singles.map(s => ({ label: s.letter, spoken: s.spoken })),
      ...data.pairs.map(p => ({ label: p.text, spoken: p.spoken }))
    ];
    let avail = pool.filter(x => !this.usedVowels.has(x.label) && (!this.vowelQuizTarget || x.label !== this.vowelQuizTarget.label));
    if (avail.length === 0) {
      this.usedVowels.clear();
      avail = pool;
    }
    const target = shuffleArray(avail)[0];
    this.vowelQuizTarget = target;
    this.usedVowels.add(target.label);
    this.vowelQuizAnswered = false;
    const others = shuffleArray(pool.filter(x => x.label !== target.label)).slice(0, 3);
    this.vowelQuizOptions = shuffleArray([target, ...others]);

    if (shouldSpeak) {
      this._scheduleSpeak(target.spoken, 180);
    }
  }

  // ---------- ГЛАВА 2: ЗВУКОПОДРАЖАНИЯ ----------
  prepareOnomatQuiz() {
    const items = WORKBOOKS_DATA[this.lang].onomatopoeia.items;
    let avail = items.filter(it => !this.usedOnomat.has(it.id) && (!this.onomatTarget || it.id !== this.onomatTarget.id));
    if (avail.length === 0) {
      this.usedOnomat.clear();
      avail = items;
    }
    const target = shuffleArray(avail)[0];
    this.onomatTarget = target;
    this.usedOnomat.add(target.id);
    this.onomatAnswered = false;
    const others = shuffleArray(items.filter(it => it.id !== target.id)).slice(0, 2);
    this.onomatOptions = shuffleArray([target, ...others]);
  }

  // ---------- ГЛАВА 3: СЛОГИ ----------
  prepareSyllableQuiz(shouldSpeak = true) {
    const groups = WORKBOOKS_DATA[this.lang].syllables.groups;
    const group = groups[this.selectedConsonantIdx] || groups[0];
    const pool = [...group.open, ...group.closed.slice(0, 3)];
    const avail = pool.filter(s => s !== this.syllableQuizTarget);
    const target = shuffleArray(avail.length ? avail : pool)[0];
    this.syllableQuizTarget = target;
    this.syllableQuizAnswered = false;
    const others = shuffleArray(pool.filter(s => s !== target)).slice(0, 3);
    this.syllableQuizOptions = shuffleArray([target, ...others]);

    if (shouldSpeak) {
      this._scheduleSpeak(target, 180);
    }
  }

  // ---------- ГЛАВА 4: ДВУЗНАКИ / СЛИЯНИЯ ----------
  prepareDigraphQuiz(shouldSpeak = true) {
    const groups = WORKBOOKS_DATA[this.lang].digraphs.groups;
    const group = groups[this.selectedDigraphIdx] || groups[0];
    // Собираем слова текущего и соседних блоков для дистракторов
    const targetPool = group.words;
    const avail = targetPool.filter(w => !this.digraphQuizTarget || w.word !== this.digraphQuizTarget.word);
    const target = shuffleArray(avail.length ? avail : targetPool)[0];
    const otherWords = groups
      .flatMap(g => g.words)
      .filter(w => w.word !== target.word);
    const distractors = shuffleArray(otherWords).slice(0, 2);

    this.digraphQuizTarget = target;
    this.digraphQuizOptions = shuffleArray([target, ...distractors]);
    this.digraphQuizAnswered = false;

    if (shouldSpeak) {
      this._scheduleSpeak(target.word, 180);
    }
  }

  // ---------- ГЛАВА 5: ПЕРВЫЕ ФРАЗЫ ----------
  prepareSentenceRound() {
    const items = WORKBOOKS_DATA[this.lang].sentences.items;
    let avail = items.filter(it => !this.usedSentences.has(it.id) && (!this.sentenceItem || it.id !== this.sentenceItem.id));
    if (avail.length === 0) {
      this.usedSentences.clear();
      avail = items;
    }
    const item = shuffleArray(avail)[0];
    this.sentenceItem = item;
    this.usedSentences.add(item.id);
    this.sentenceAnswered = false;

    const opts = [
      { emoji: item.correctEmoji, isCorrect: true },
      { emoji: item.distractors[0], isCorrect: false },
      { emoji: item.distractors[1], isCorrect: false }
    ];
    this.sentenceOptions = shuffleArray(opts);
  }

  // ---------- РЕНДЕР ----------
  render() {
    if (!this.container) return;
    const langData = WORKBOOKS_DATA[this.lang];

    this.container.innerHTML = `
      <div class="kc-wrapper">
        <div class="kc-chapters-nav">
          ${langData.chapters.map(ch => `
            <button class="kc-chapter-btn ${this.activeChapter === ch.id ? 'active' : ''}" data-chapter="${ch.id}">
              <span class="kc-ch-badge">${ch.badge}</span>
              <span class="kc-ch-title">${ch.icon} ${ch.title}</span>
            </button>
          `).join('')}
        </div>

        <div class="kc-stage-body" id="kc-stage-body">
          ${this.renderActiveChapterHTML(langData)}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderActiveChapterHTML(langData) {
    switch (this.activeChapter) {
      case 'vowels': return this.renderVowelsHTML(langData.vowels);
      case 'onomatopoeia': return this.renderOnomatHTML(langData.onomatopoeia);
      case 'syllables': return this.renderSyllablesHTML(langData.syllables);
      case 'digraphs': return this.renderDigraphsHTML(langData.digraphs);
      case 'sentences': return this.renderSentencesHTML(langData.sentences);
      default: return '';
    }
  }

  renderVowelsHTML(vData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const singlesTitle = isRu ? '1. Пропой гласные:' : (isPl ? '1. Zaśpiewaj samogłoski:' : '1. Sing the vowels:');
    const pairsTitle = isRu ? '2. Прочитай пары гласных:' : (isPl ? '2. Przeczytaj pary samogłosek:' : '2. Read vowel pairs:');
    const quizTitle = isRu ? '🎯 Игра: Послушай и нажми!' : (isPl ? '🎯 Gra: Posłuchaj i wskaż!' : '🎯 Game: Listen & tap!');
    const listenLabel = isRu ? 'Послушать звук' : (isPl ? 'Posłuchaj dźwięku' : 'Listen to sound');
    const newSoundLabel = isRu ? 'Новый' : (isPl ? 'Nowy' : 'New');

    return `
      <div class="kc-intro-banner">${vData.intro}</div>

      <div class="kc-card">
        <div class="kc-sec-title">${singlesTitle}</div>
        <div class="kc-vowel-grid">
          ${vData.singles.map(v => `
            <button class="kc-vowel-btn" data-spoken="${v.spoken}">
              <span class="kc-vowel-letter">${v.letter}</span>
              <span class="kc-vowel-emoji">${v.emoji}</span>
              <span class="kc-vowel-cue">${v.cue}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="kc-card">
        <div class="kc-sec-title">${pairsTitle}</div>
        <div class="kc-pairs-grid">
          ${vData.pairs.map(p => `
            <button class="kc-pair-btn" data-spoken="${p.spoken}">
              <span class="kc-pair-scene">${p.scene}</span>
              <span class="kc-pair-text">${p.text}</span>
              <span class="kc-pair-cap">${p.caption}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="kc-card kc-quiz-card">
        <div class="kc-quiz-top">
          <span class="kc-sec-title" style="margin:0">${quizTitle}</span>
          <div class="kc-quiz-actions">
            <button class="kc-audio-btn" id="kc-vowel-speak">🔊 ${listenLabel}</button>
            <button class="kc-next-mini-btn" id="kc-vowel-next">↻ ${newSoundLabel}</button>
          </div>
        </div>
        <div class="kc-quiz-options-4" id="kc-vowel-options">
          ${this.vowelQuizOptions.map(opt => `
            <button class="kc-quiz-pill" data-label="${opt.label}">${opt.label}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderOnomatHTML(oData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const learnLabel = isRu ? '📖 Учим звуки' : (isPl ? '📖 Uczymy się' : '📖 Learn Sounds');
    const quizLabel = isRu ? '🎯 Угадай, кто так говорит!' : (isPl ? '🎯 Kto tak mówi?' : '🎯 Who says that?');
    const readPrompt = isRu ? 'Прочитай сам и выбери, кто это:' : (isPl ? 'Przeczytaj sam i wskaż, kto to:' : 'Read it yourself and tap who it is:');
    const hintBtnLabel = isRu ? 'Подсказка' : (isPl ? 'Podpowiedź' : 'Hint');

    return `
      <div class="kc-intro-banner">${oData.intro}</div>

      <div class="kc-mode-toggle">
        <button class="kc-toggle-btn ${this.onomatSubMode === 'learn' ? 'active' : ''}" id="kc-onomat-learn">${learnLabel}</button>
        <button class="kc-toggle-btn ${this.onomatSubMode === 'quiz' ? 'active' : ''}" id="kc-onomat-quiz">${quizLabel}</button>
      </div>

      ${this.onomatSubMode === 'learn' ? `
        <div class="kc-onomat-grid">
          ${oData.items.map(it => `
            <button class="kc-onomat-card" data-spoken="${it.spoken}">
              <span class="kc-onomat-bubble">${it.soundText}</span>
              <span class="kc-onomat-emoji">${it.emoji}</span>
              <span class="kc-onomat-actor">${it.actor}</span>
            </button>
          `).join('')}
        </div>
      ` : `
        <div class="kc-card kc-onomat-quiz-box">
          <div class="kc-sec-title" style="text-align:center;">${readPrompt}</div>
          <div class="kc-onomat-target-row">
            <div class="kc-giant-bubble">💬 ${this.onomatTarget.soundText}!</div>
            <button class="kc-hint-audio-btn" id="kc-onomat-hint" title="${hintBtnLabel}">🔊 ${hintBtnLabel}</button>
          </div>
          <div class="kc-onomat-choices">
            ${this.onomatOptions.map(opt => `
              <button class="kc-actor-choice" data-id="${opt.id}">
                <span class="kc-actor-emoji">${opt.emoji}</span>
                <span class="kc-actor-name">${opt.actor}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `}
    `;
  }

  renderSyllablesHTML(sData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const group = sData.groups[this.selectedConsonantIdx] || sData.groups[0];
    const consKey = `${this.lang}_${group.c}`;
    const isGroupDone = this.syllablesRewardedGroups.has(consKey);

    const openTitle = isRu ? 'Открытые слоги (прочитай все для +1 ⭐):' : (isPl ? 'Sylaby otwarte (przeczytaj wszystkie za +1 ⭐):' : 'Open syllables (tap all for +1 ⭐):');
    const closedTitle = isRu ? 'Закрытые (обратные) слоги:' : (isPl ? 'Sylaby zamknięte:' : 'Closed syllables:');
    const wordsTitle = isRu ? 'Первые слова:' : (isPl ? 'Pierwsze słowa:' : 'First words:');
    const quizTitle = isRu ? '🎯 Поймай слог на слух:' : (isPl ? '🎯 Złap sylabę ze słuchu:' : '🎯 Catch the spoken syllable:');
    const listenLabel = isRu ? 'Слушать слог' : (isPl ? 'Posłuchaj sylaby' : 'Listen syllable');
    const newLabel = isRu ? 'Другой' : (isPl ? 'Inna' : 'New');

    return `
      <div class="kc-intro-banner">${sData.intro}</div>

      <div class="kc-consonant-bar">
        ${sData.groups.map((g, idx) => `
          <button class="kc-cons-btn ${idx === this.selectedConsonantIdx ? 'active' : ''} ${this.syllablesRewardedGroups.has(`${this.lang}_${g.c}`) ? 'done' : ''}" data-cons-idx="${idx}">
            ${g.c}
          </button>
        `).join('')}
      </div>

      <div class="kc-card ${isGroupDone ? 'kc-card-done' : ''}">
        <div class="kc-sec-title">
          <span>${openTitle}</span>
          ${isGroupDone ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
        </div>
        <div class="kc-syl-row">
          ${group.open.map(syl => {
            const key = `${consKey}_open_${syl}`;
            const walked = this.walkedSyllables.has(key);
            return `
              <button class="kc-syl-stone open ${walked ? 'walked' : ''}" data-syl="${syl}" data-type="open">
                <span class="kc-syl-mark">${walked ? '🐾' : '•'}</span>
                <span class="kc-syl-txt">${syl}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="kc-sec-title" style="margin-top:14px;">${closedTitle}</div>
        <div class="kc-syl-row">
          ${group.closed.map(syl => {
            const key = `${consKey}_closed_${syl}`;
            const walked = this.walkedSyllables.has(key);
            return `
              <button class="kc-syl-stone closed ${walked ? 'walked' : ''}" data-syl="${syl}" data-type="closed">
                <span class="kc-syl-mark">${walked ? '✓' : '•'}</span>
                <span class="kc-syl-txt">${syl}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="kc-sec-title" style="margin-top:14px;">${wordsTitle}</div>
        <div class="kc-mini-words-row">
          ${group.words.map(w => `
            <button class="kc-mini-word-btn" data-word="${w.word}">
              <span class="kc-mini-word-emoji">${w.emoji}</span>
              <span class="kc-mini-word-txt">${w.display}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="kc-card kc-quiz-card">
        <div class="kc-quiz-top">
          <span class="kc-sec-title" style="margin:0">${quizTitle}</span>
          <div class="kc-quiz-actions">
            <button class="kc-audio-btn" id="kc-syl-speak">🔊 ${listenLabel}</button>
            <button class="kc-next-mini-btn" id="kc-syl-next">↻ ${newLabel}</button>
          </div>
        </div>
        <div class="kc-quiz-options-4" id="kc-syl-options">
          ${this.syllableQuizOptions.map(syl => `
            <button class="kc-quiz-pill" data-syl="${syl}">${syl}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderDigraphsHTML(dData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const group = dData.groups[this.selectedDigraphIdx] || dData.groups[0];
    const wordsTitle = isRu ? 'Слова с этим слиянием:' : (isPl ? 'Słowa z tym dźwiękiem:' : 'Words with this sound:');
    const quizTitle = isRu ? '🎯 Послушай слово и найди его:' : (isPl ? '🎯 Posłuchaj słowa i wskaż je:' : '🎯 Listen and find the word:');
    const listenLabel = isRu ? 'Послушать' : (isPl ? 'Posłuchaj' : 'Listen');
    const newLabel = isRu ? 'Новое' : (isPl ? 'Nowe' : 'New');

    return `
      <div class="kc-intro-banner">${dData.intro}</div>

      <div class="kc-consonant-bar">
        ${dData.groups.map((g, idx) => `
          <button class="kc-cons-btn wide ${idx === this.selectedDigraphIdx ? 'active' : ''}" data-dig-idx="${idx}">
            ${g.label}
          </button>
        `).join('')}
      </div>

      <div class="kc-card">
        <div class="kc-sec-title">${group.title}</div>
        <div class="kc-digraph-tip">💡 ${group.tip}</div>
        <div class="kc-syl-row" style="margin-top:10px;">
          ${group.syllables.map(syl => `
            <button class="kc-syl-stone open" data-syl="${syl}">
              <span class="kc-syl-txt">${syl}</span>
            </button>
          `).join('')}
        </div>

        <div class="kc-sec-title" style="margin-top:14px;">${wordsTitle}</div>
        <div class="kc-mini-words-row">
          ${group.words.map(w => `
            <button class="kc-mini-word-btn" data-word="${w.word}">
              <span class="kc-mini-word-emoji">${w.emoji}</span>
              <span class="kc-mini-word-txt">${w.display}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="kc-card kc-quiz-card">
        <div class="kc-quiz-top">
          <span class="kc-sec-title" style="margin:0">${quizTitle}</span>
          <div class="kc-quiz-actions">
            <button class="kc-audio-btn" id="kc-dig-speak">🔊 ${listenLabel}</button>
            <button class="kc-next-mini-btn" id="kc-dig-next">↻ ${newLabel}</button>
          </div>
        </div>
        <div class="kc-digraph-quiz-row" id="kc-dig-options">
          ${this.digraphQuizOptions.map(opt => `
            <button class="kc-dig-choice-btn" data-word="${opt.word}">
              <span class="kc-dig-emoji">${opt.emoji}</span>
              <span class="kc-dig-word">${opt.word}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderSentencesHTML(senData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const hintLabel = isRu ? 'Послушать (если трудно)' : (isPl ? 'Posłuchaj (podpowiedź)' : 'Listen (hint)');
    const nextLabel = isRu ? 'Следующая фраза ➔' : (isPl ? 'Następne zdanie ➔' : 'Next story ➔');

    return `
      <div class="kc-intro-banner">${senData.intro}</div>

      <div class="kc-card kc-sentence-box">
        <div class="kc-sentence-text">${this.sentenceItem.display}</div>
        <button class="kc-hint-audio-btn" id="kc-sen-hint" style="margin: 0 auto 14px;">
          🔊 ${hintLabel}
        </button>

        <div class="kc-sentence-options" id="kc-sen-options">
          ${this.sentenceOptions.map(opt => `
            <button class="kc-sen-pic-btn" data-correct="${opt.isCorrect}">
              <span class="kc-sen-emoji">${opt.emoji}</span>
            </button>
          `).join('')}
        </div>

        <div class="kc-sen-feedback" id="kc-sen-feedback"></div>
        <div style="text-align:center; margin-top:12px;">
          <button class="kc-next-mini-btn" id="kc-sen-next">${nextLabel}</button>
        </div>
      </div>
    `;
  }

  // ---------- СОБЫТИЯ ----------
  attachEvents() {
    // Переключатель 5 этапов-тетрадей
    const chBtns = this.container.querySelectorAll('.kc-chapter-btn');
    chBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchChapter(btn.dataset.chapter);
      });
    });

    if (this.activeChapter === 'vowels') {
      this.attachVowelEvents();
    } else if (this.activeChapter === 'onomatopoeia') {
      this.attachOnomatEvents();
    } else if (this.activeChapter === 'syllables') {
      this.attachSyllableEvents();
    } else if (this.activeChapter === 'digraphs') {
      this.attachDigraphEvents();
    } else if (this.activeChapter === 'sentences') {
      this.attachSentenceEvents();
    }
  }

  attachVowelEvents() {
    this.container.querySelectorAll('.kc-vowel-btn, .kc-pair-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(btn.dataset.spoken, this.lang);
      });
    });

    const speakBtn = this.container.querySelector('#kc-vowel-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.vowelQuizTarget.spoken, this.lang);
      });
    }

    const nextBtn = this.container.querySelector('#kc-vowel-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.nextTimer) { clearTimeout(this.nextTimer); this.nextTimer = null; }
        sound.playLetterClick();
        this.prepareVowelQuiz(true);
        this.render();
      });
    }

    this.container.querySelectorAll('#kc-vowel-options .kc-quiz-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.vowelQuizAnswered) return;
        const label = btn.dataset.label;
        if (label === this.vowelQuizTarget.label) {
          this.vowelQuizAnswered = true;
          btn.classList.add('correct');
          sound.playSuccess();
          sound.speakWord(this.vowelQuizTarget.spoken, this.lang);
          this.onStarEarned(1);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareVowelQuiz(true);
            this.render();
          }, 1400);
        } else {
          btn.classList.add('wrong');
          sound.playError();
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachOnomatEvents() {
    const btnLearn = this.container.querySelector('#kc-onomat-learn');
    const btnQuiz = this.container.querySelector('#kc-onomat-quiz');
    if (btnLearn) {
      btnLearn.addEventListener('click', () => {
        this.stop();
        sound.playLetterClick();
        this.onomatSubMode = 'learn';
        this.render();
      });
    }
    if (btnQuiz) {
      btnQuiz.addEventListener('click', () => {
        this.stop();
        sound.playLetterClick();
        this.onomatSubMode = 'quiz';
        if (!this.onomatTarget) this.prepareOnomatQuiz();
        this.render();
      });
    }

    if (this.onomatSubMode === 'learn') {
      this.container.querySelectorAll('.kc-onomat-card').forEach(card => {
        card.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakWord(card.dataset.spoken, this.lang);
        });
      });
    } else {
      const hintBtn = this.container.querySelector('#kc-onomat-hint');
      if (hintBtn) {
        hintBtn.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakWord(this.onomatTarget.spoken, this.lang);
        });
      }

      this.container.querySelectorAll('.kc-actor-choice').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.onomatAnswered) return;
          if (btn.dataset.id === this.onomatTarget.id) {
            this.onomatAnswered = true;
            btn.classList.add('correct');
            sound.playSuccess();
            sound.speakWord(this.onomatTarget.spoken, this.lang);
            this.onStarEarned(1);
            this.onWinEffect();
            if (this.nextTimer) clearTimeout(this.nextTimer);
            this.nextTimer = setTimeout(() => {
              this.nextTimer = null;
              this.prepareOnomatQuiz();
              this.render();
            }, 1500);
          } else {
            btn.classList.add('wrong');
            sound.playError();
            setTimeout(() => btn.classList.remove('wrong'), 450);
          }
        });
      });
    }
  }

  attachSyllableEvents() {
    const groups = WORKBOOKS_DATA[this.lang].syllables.groups;
    const group = groups[this.selectedConsonantIdx] || groups[0];
    const consKey = `${this.lang}_${group.c}`;

    this.container.querySelectorAll('[data-cons-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.stop();
        sound.playLetterClick();
        this.selectedConsonantIdx = parseInt(btn.dataset.consIdx, 10);
        this.prepareSyllableQuiz(false);
        this.render();
      });
    });

    this.container.querySelectorAll('.kc-syl-stone').forEach(stone => {
      stone.addEventListener('click', () => {
        const syl = stone.dataset.syl;
        const type = stone.dataset.type || 'open';
        sound.playLetterClick();
        sound.speakWord(syl, this.lang);

        const key = `${consKey}_${type}_${syl}`;
        this.walkedSyllables.add(key);
        stone.classList.add('walked');
        const markEl = stone.querySelector('.kc-syl-mark');
        if (markEl) markEl.textContent = type === 'open' ? '🐾' : '✓';

        // Проверяем, все ли открытые слоги для этой согласной прочитаны
        if (type === 'open' && !this.syllablesRewardedGroups.has(consKey)) {
          const allRead = group.open.every(s => this.walkedSyllables.has(`${consKey}_open_${s}`));
          if (allRead) {
            this.syllablesRewardedGroups.add(consKey);
            sound.playSuccess();
            this.onStarEarned(1);
            this.onWinEffect();
            const consBtn = this.container.querySelector(`[data-cons-idx="${this.selectedConsonantIdx}"]`);
            if (consBtn) consBtn.classList.add('done');
            const cardEl = stone.closest('.kc-card');
            if (cardEl) {
              cardEl.classList.add('kc-card-done');
              const titleEl = cardEl.querySelector('.kc-sec-title');
              if (titleEl && !titleEl.querySelector('.primer-done-badge')) {
                titleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
              }
            }
          }
        }
      });
    });

    this.container.querySelectorAll('.kc-mini-word-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(btn.dataset.word, this.lang);
      });
    });

    const speakBtn = this.container.querySelector('#kc-syl-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.syllableQuizTarget, this.lang);
      });
    }

    const nextBtn = this.container.querySelector('#kc-syl-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.nextTimer) { clearTimeout(this.nextTimer); this.nextTimer = null; }
        sound.playLetterClick();
        this.prepareSyllableQuiz(true);
        this.render();
      });
    }

    this.container.querySelectorAll('#kc-syl-options .kc-quiz-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.syllableQuizAnswered) return;
        const syl = btn.dataset.syl;
        if (syl === this.syllableQuizTarget) {
          this.syllableQuizAnswered = true;
          btn.classList.add('correct');
          sound.playSuccess();
          sound.speakWord(syl, this.lang);
          this.onStarEarned(1);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareSyllableQuiz(true);
            this.render();
          }, 1400);
        } else {
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(syl, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachDigraphEvents() {
    this.container.querySelectorAll('[data-dig-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.stop();
        sound.playLetterClick();
        this.selectedDigraphIdx = parseInt(btn.dataset.digIdx, 10);
        this.prepareDigraphQuiz(false);
        this.render();
      });
    });

    this.container.querySelectorAll('.kc-syl-stone').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(btn.dataset.syl, this.lang);
      });
    });

    this.container.querySelectorAll('.kc-mini-word-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(btn.dataset.word, this.lang);
      });
    });

    const speakBtn = this.container.querySelector('#kc-dig-speak');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.digraphQuizTarget.word, this.lang);
      });
    }

    const nextBtn = this.container.querySelector('#kc-dig-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.nextTimer) { clearTimeout(this.nextTimer); this.nextTimer = null; }
        sound.playLetterClick();
        this.prepareDigraphQuiz(true);
        this.render();
      });
    }

    this.container.querySelectorAll('#kc-dig-options .kc-dig-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.digraphQuizAnswered) return;
        const word = btn.dataset.word;
        if (word === this.digraphQuizTarget.word) {
          this.digraphQuizAnswered = true;
          btn.classList.add('correct');
          sound.playSuccess();
          sound.speakWord(word, this.lang);
          this.onStarEarned(1);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareDigraphQuiz(true);
            this.render();
          }, 1500);
        } else {
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(word, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachSentenceEvents() {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';

    const hintBtn = this.container.querySelector('#kc-sen-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakPhrase(this.sentenceItem.spoken, this.lang);
      });
    }

    const nextBtn = this.container.querySelector('#kc-sen-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.nextTimer) { clearTimeout(this.nextTimer); this.nextTimer = null; }
        sound.playLetterClick();
        this.prepareSentenceRound();
        this.render();
      });
    }

    const feedbackEl = this.container.querySelector('#kc-sen-feedback');
    this.container.querySelectorAll('#kc-sen-options .kc-sen-pic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.sentenceAnswered) return;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
          this.sentenceAnswered = true;
          btn.classList.add('correct');
          sound.playSuccess();
          sound.speakPhrase(this.sentenceItem.spoken, this.lang);
          if (feedbackEl) {
            feedbackEl.textContent = isRu ? '🎉 Отлично прочитано! +2 ⭐' : (isPl ? '🎉 Świetnie przeczytane! +2 ⭐' : '🎉 Great reading! +2 ⭐');
            feedbackEl.style.color = '#10b981';
          }
          this.onStarEarned(2);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareSentenceRound();
            this.render();
          }, 1900);
        } else {
          btn.classList.add('wrong');
          sound.playError();
          if (feedbackEl) {
            feedbackEl.textContent = isRu ? 'Попробуй ещё раз прочитать фразу!' : (isPl ? 'Spróbuj przeczytać jeszcze raz!' : 'Try reading the sentence again!');
            feedbackEl.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }
}
