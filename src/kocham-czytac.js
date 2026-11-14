// Модуль «Тетради Kocham Czytać» (по методике проф. Ягоды Цешиньской — Metoda Krakowska, Zeszyty 1–18)
// и база слов по слогам для «Собери слово»

import { shuffleArray } from './data.js?v=22';
import { sound } from './audio.js?v=22';

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
      ],
      vowelWords: [
        { emoji: '🍉', word: 'АРБУЗ', vowel: 'А' },
        { emoji: '🍍', word: 'АНАНАС', vowel: 'А' },
        { emoji: '🚌', word: 'АВТОБУС', vowel: 'А' },
        { emoji: '🏝️', word: 'ОСТРОВ', vowel: 'О' },
        { emoji: '☁️', word: 'ОБЛАКО', vowel: 'О' },
        { emoji: '🪟', word: 'ОКНО', vowel: 'О' },
        { emoji: '🦆', word: 'УТКА', vowel: 'У' },
        { emoji: '🐌', word: 'УЛИТКА', vowel: 'У' },
        { emoji: '🧺', word: 'УТЮГ', vowel: 'У' },
        { emoji: '🚜', word: 'ЭКСКАВАТОР', vowel: 'Э' },
        { emoji: '🏔️', word: 'ЭХО', vowel: 'Э' },
        { emoji: '🧸', word: 'ИГРУШКА', vowel: 'И' },
        { emoji: '🪡', word: 'ИГЛА', vowel: 'И' },
        { emoji: '🧀', word: 'СЫР', vowel: 'Ы', maskedIndex: 1 }
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
      intro: 'Тетради 3–9: Прошагай открытые и закрытые слоги (+2 ⭐), поймай слог и собери слово!',
      groups: [
        { c: 'М', open: ['МА', 'МО', 'МУ', 'МЭ', 'МИ', 'МЫ'], closed: ['АМ', 'ОМ', 'УМ', 'ЭМ', 'ИМ', 'ЫМ'], words: [{ emoji: '👩', display: 'МА·МА', word: 'МАМА' }, { emoji: '🌊', display: 'МО·РЕ', word: 'МОРЕ' }, { emoji: '🧼', display: 'МЫ·ЛО', word: 'МЫЛО' }, { emoji: '🫐', display: 'МА·ЛИ·НА', word: 'МАЛИНА' }] },
        { c: 'П', open: ['ПА', 'ПО', 'ПУ', 'ПЭ', 'ПИ', 'ПЫ'], closed: ['АП', 'ОП', 'УП', 'ЭП', 'ИП', 'ЫП'], words: [{ emoji: '👨', display: 'ПА·ПА', word: 'ПАПА' }, { emoji: '🌾', display: 'ПО·ЛЕ', word: 'ПОЛЕ' }, { emoji: '🪚', display: 'ПИ·ЛА', word: 'ПИЛА' }, { emoji: '🕷️', display: 'ПА·УК', word: 'ПАУК' }] },
        { c: 'Б', open: ['БА', 'БО', 'БУ', 'БЭ', 'БИ', 'БЫ'], closed: ['АБ', 'ОБ', 'УБ', 'ЭБ', 'ИБ', 'ЫБ'], words: [{ emoji: '🍌', display: 'БА·НАН', word: 'БАНАН' }, { emoji: '🥁', display: 'БУ·БЕН', word: 'БУБЕН' }, { emoji: '🐂', display: 'БЫК', word: 'БЫК' }, { emoji: '🦋', display: 'БА·БОЧ·КА', word: 'БАБОЧКА' }] },
        { c: 'В', open: ['ВА', 'ВО', 'ВУ', 'ВЭ', 'ВИ', 'ВЫ'], closed: ['АВ', 'ОВ', 'УВ', 'ЭВ', 'ИВ', 'ЫВ'], words: [{ emoji: '💧', display: 'ВО·ДА', word: 'ВОДА' }, { emoji: '🏺', display: 'ВА·ЗА', word: 'ВАЗА' }, { emoji: '🐺', display: 'ВОЛК', word: 'ВОЛК' }, { emoji: '🛁', display: 'ВАН·НА', word: 'ВАННА' }] },
        { c: 'Ф', open: ['ФА', 'ФО', 'ФУ', 'ФЭ', 'ФИ', 'ФЫ'], closed: ['АФ', 'ОФ', 'УФ', 'ЭФ', 'ИФ', 'ЫФ'], words: [{ emoji: '🔦', display: 'ФА·РА', word: 'ФАРА' }, { emoji: '📸', display: 'ФО·ТО', word: 'ФОТО' }, { emoji: '🦉', display: 'ФИ·ЛИН', word: 'ФИЛИН' }, { emoji: '⚽', display: 'ФУТ·БОЛ', word: 'ФУТБОЛ' }] },
        { c: 'Т', open: ['ТА', 'ТО', 'ТУ', 'ТЭ', 'ТИ', 'ТЫ'], closed: ['АТ', 'ОТ', 'УТ', 'ЭТ', 'ИТ', 'ЫТ'], words: [{ emoji: '🎂', display: 'ТОРТ', word: 'ТОРТ' }, { emoji: '🐯', display: 'ТИГР', word: 'ТИГР' }, { emoji: '☁️', display: 'ТУ·ЧА', word: 'ТУЧА' }, { emoji: '🎃', display: 'ТЫК·ВА', word: 'ТЫКВА' }] },
        { c: 'Д', open: ['ДА', 'ДО', 'ДУ', 'ДЭ', 'ДИ', 'ДЫ'], closed: ['АД', 'ОД', 'УД', 'ЭД', 'ИД', 'ЫД'], words: [{ emoji: '🏠', display: 'ДОМ', word: 'ДОМ' }, { emoji: '🌳', display: 'ДУБ', word: 'ДУБ' }, { emoji: '💨', display: 'ДЫМ', word: 'ДЫМ' }, { emoji: '🍈', display: 'ДЫ·НЯ', word: 'ДЫНЯ' }] },
        { c: 'Н', open: ['НА', 'НО', 'НУ', 'НЭ', 'НИ', 'НЫ'], closed: ['АН', 'ОН', 'УН', 'ЭН', 'ИН', 'ЫН'], words: [{ emoji: '👃', display: 'НОС', word: 'НОС' }, { emoji: '🌙', display: 'ЛУ·НА', word: 'ЛУНА' }, { emoji: '☁️', display: 'НЕ·БО', word: 'НЕБО' }, { emoji: '🧦', display: 'НОС·КИ', word: 'НОСКИ' }] },
        { c: 'Л', open: ['ЛА', 'ЛО', 'ЛУ', 'ЛЭ', 'ЛИ', 'ЛЫ'], closed: ['АЛ', 'ОЛ', 'УЛ', 'ЭЛ', 'ИЛ', 'ЫЛ'], words: [{ emoji: '🦊', display: 'ЛИ·СА', word: 'ЛИСА' }, { emoji: '🌙', display: 'ЛУ·НА', word: 'ЛУНА' }, { emoji: '☀️', display: 'ЛЕ·ТО', word: 'ЛЕТО' }, { emoji: '🐾', display: 'ЛА·ПА', word: 'ЛАПА' }] },
        { c: 'С', open: ['СА', 'СО', 'СУ', 'СЭ', 'СИ', 'СЫ'], closed: ['АС', 'ОС', 'УС', 'ЭС', 'ИС', 'ЫС'], words: [{ emoji: '🦉', display: 'СО·ВА', word: 'СОВА' }, { emoji: '🧀', display: 'СЫР', word: 'СЫР' }, { emoji: '🍲', display: 'СУП', word: 'СУП' }, { emoji: '🐶', display: 'СО·БА·КА', word: 'СОБАКА' }] },
        { c: 'З', open: ['ЗА', 'ЗО', 'ЗУ', 'ЗЭ', 'ЗИ', 'ЗЫ'], closed: ['АЗ', 'ОЗ', 'УЗ', 'ЭЗ', 'ИЗ', 'ЫЗ'], words: [{ emoji: '❄️', display: 'ЗИ·МА', word: 'ЗИМА' }, { emoji: '🐐', display: 'КО·ЗА', word: 'КОЗА' }, { emoji: '🦷', display: 'ЗУБ', word: 'ЗУБ' }, { emoji: '☂️', display: 'ЗОНТ', word: 'ЗОНТ' }] },
        { c: 'К', open: ['КА', 'КО', 'КУ', 'КЭ', 'КИ', 'КЫ'], closed: ['АК', 'ОК', 'УК', 'ЭК', 'ИК', 'ЫК'], words: [{ emoji: '🐱', display: 'КОТ', word: 'КОТ' }, { emoji: '🥣', display: 'КА·ША', word: 'КАША' }, { emoji: '🐋', display: 'КИТ', word: 'КИТ' }, { emoji: '🐄', display: 'КО·РО·ВА', word: 'КОРОВА' }] },
        { c: 'Г', open: ['ГА', 'ГО', 'ГУ', 'ГЭ', 'ГИ', 'ГЫ'], closed: ['АГ', 'ОГ', 'УГ', 'ЭГ', 'ИГ', 'ЫГ'], words: [{ emoji: '🏔️', display: 'ГО·РА', word: 'ГОРА' }, { emoji: '🪿', display: 'ГУ·СИ', word: 'ГУСИ' }, { emoji: '🍄', display: 'ГРИБ', word: 'ГРИБ' }, { emoji: '🎸', display: 'ГИ·ТА·РА', word: 'ГИТАРА' }] },
        { c: 'Х', open: ['ХА', 'ХО', 'ХУ', 'ХЭ', 'ХИ', 'ХЫ'], closed: ['АХ', 'ОХ', 'УХ', 'ЭХ', 'ИХ', 'ЫХ'], words: [{ emoji: '🍞', display: 'ХЛЕБ', word: 'ХЛЕБ' }, { emoji: '🪰', display: 'МУ·ХА', word: 'МУХА' }, { emoji: '👂', display: 'У·ХО', word: 'УХО' }, { emoji: '🐹', display: 'ХО·МЯК', word: 'ХОМЯК' }] },
        { c: 'Р', open: ['РА', 'РО', 'РУ', 'РЭ', 'РИ', 'РЫ'], closed: ['АР', 'ОР', 'УР', 'ЭР', 'ИР', 'ЫР'], words: [{ emoji: '🐟', display: 'РЫ·БА', word: 'РЫБА' }, { emoji: '✋', display: 'РУ·КА', word: 'РУКА' }, { emoji: '🚀', display: 'РА·КЕ·ТА', word: 'РАКЕТА' }, { emoji: '🌈', display: 'РА·ДУ·ГА', word: 'РАДУГА' }] },
        { c: 'Ж', open: ['ЖА', 'ЖО', 'ЖУ', 'ЖЕ', 'ЖИ', 'ЖЁ'], closed: ['АЖ', 'ОЖ', 'УЖ', 'ЭЖ', 'ИЖ', 'ЫЖ'], words: [{ emoji: '🪲', display: 'ЖУК', word: 'ЖУК' }, { emoji: '🐸', display: 'ЖА·БА', word: 'ЖАБА' }, { emoji: '🦒', display: 'ЖИ·РАФ', word: 'ЖИРАФ' }, { emoji: '🦔', display: 'Ё·ЖИК', word: 'ЁЖИК' }] },
        { c: 'Ш', open: ['ША', 'ШО', 'ШУ', 'ШЕ', 'ШИ', 'ШЁ'], closed: ['АШ', 'ОШ', 'УШ', 'ЭШ', 'ИШ', 'ЫШ'], words: [{ emoji: '🎈', display: 'ШАР', word: 'ШАР' }, { emoji: '🧣', display: 'ШАРФ', word: 'ШАРФ' }, { emoji: '🥣', display: 'КА·ША', word: 'КАША' }, { emoji: '🚗', display: 'МА·ШИ·НА', word: 'МАШИНА' }] },
        { c: 'Ц', open: ['ЦА', 'ЦО', 'ЦУ', 'ЦЕ', 'ЦИ', 'ЦЫ'], closed: ['АЦ', 'ОЦ', 'УЦ', 'ЭЦ', 'ИЦ', 'ЫЦ'], words: [{ emoji: '🎪', display: 'ЦИРК', word: 'ЦИРК' }, { emoji: '🌸', display: 'ЦВЕ·ТОК', word: 'ЦВЕТОК' }, { emoji: '🐰', display: 'ЗА·ЯЦ', word: 'ЗАЯЦ' }, { emoji: '🐦', display: 'ПТИ·ЦА', word: 'ПТИЦА' }] }
      ]
    },
    digraphs: {
      intro: 'Тетради 10–17: Тренируем шипящие, йотированные и мягкие слоги, угадываем слова и вставляем пропущенный слог!',
      groups: [
        {
          id: 'sha', label: 'ША / ШИ', title: 'Твёрдое Ш (Шу-ша-ши)', tip: 'Звук [Ш] всегда твёрдый! После Ш пишем И, а читаем как ШЫ.',
          syllables: ['ША', 'ШО', 'ШУ', 'ШЕ', 'ШИ'],
          words: [{ emoji: '🧣', display: 'ШАРФ', word: 'ШАРФ' }, { emoji: '🎈', display: 'ШАР', word: 'ШАР' }, { emoji: '🚗', display: 'МА·ШИ·НА', word: 'МАШИНА' }, { emoji: '🧢', display: 'ШАП·КА', word: 'ШАПКА' }, { emoji: '🍐', display: 'ГРУ·ША', word: 'ГРУША' }]
        },
        {
          id: 'cha', label: 'ЧА / ЩА', title: 'Мягкие Ч и Щ', tip: 'Звуки [Ч] и [Щ] всегда мягкие! ЧА и ЩА пишем с А, ЧУ и ЩУ пишем с У.',
          syllables: ['ЧА', 'ЧУ', 'ЧИ', 'ЩА', 'ЩУ', 'ЩИ'],
          words: [{ emoji: '🍵', display: 'ЧАШ·КА', word: 'ЧАШКА' }, { emoji: '⏰', display: 'ЧА·СЫ', word: 'ЧАСЫ' }, { emoji: '🧹', display: 'ЩЁТ·КА', word: 'ЩЁТКА' }, { emoji: '☁️', display: 'ТУ·ЧА', word: 'ТУЧА' }, { emoji: '🐢', display: 'ЧЕ·РЕ·ПА·ХА', word: 'ЧЕРЕПАХА' }]
        },
        {
          id: 'zha', label: 'ЖА / ЖИ', title: 'Твёрдое Ж', tip: 'Звук [Ж] всегда твёрдый, но в ЖИ пишется буква И!',
          syllables: ['ЖА', 'ЖО', 'ЖУ', 'ЖЕ', 'ЖИ'],
          words: [{ emoji: '🐸', display: 'ЖА·БА', word: 'ЖАБА' }, { emoji: '🪲', display: 'ЖУК', word: 'ЖУК' }, { emoji: '🦒', display: 'ЖИ·РАФ', word: 'ЖИРАФ' }, { emoji: '🥄', display: 'ЛОЖ·КА', word: 'ЛОЖКА' }, { emoji: '❄️', display: 'СНЕ·ЖОК', word: 'СНЕЖОК' }]
        },
        {
          id: 'mya', label: 'МЯ / МЁ / МЮ', title: 'Мягкие слияния с М', tip: 'Гласные Я, Ё, Ю, Е делают согласный перед ними мягким.',
          syllables: ['МЯ', 'МЁ', 'МЮ', 'МЕ', 'МИ'],
          words: [{ emoji: '⚽', display: 'МЯЧ', word: 'МЯЧ' }, { emoji: '🍯', display: 'МЁД', word: 'МЁД' }, { emoji: '🐻', display: 'МИШ·КА', word: 'МИШКА' }, { emoji: '🌍', display: 'ЗЕМ·ЛЯ', word: 'ЗЕМЛЯ' }, { emoji: '🍅', display: 'ПО·МИ·ДОР', word: 'ПОМИДОР' }]
        },
        {
          id: 'lya', label: 'ЛЯ / ЛЁ / ЛЮ', title: 'Мягкие слияния с Л', tip: 'Тянем мягко: ЛЯ-ЛЁ-ЛЮ-ЛЕ-ЛИ!',
          syllables: ['ЛЯ', 'ЛЁ', 'ЛЮ', 'ЛЕ', 'ЛИ'],
          words: [{ emoji: '🧊', display: 'ЛЁД', word: 'ЛЁД' }, { emoji: '🦁', display: 'ЛЕВ', word: 'ЛЕВ' }, { emoji: '🍋', display: 'ЛИ·МОН', word: 'ЛИМОН' }, { emoji: '✈️', display: 'СА·МО·ЛЁТ', word: 'САМОЛЁТ' }, { emoji: '🦊', display: 'ЛИ·СА', word: 'ЛИСА' }]
        },
        {
          id: 'soft', label: 'АЛЬ / ОЛЬ / АНЬ', title: 'Мягкий знак Ь после гласных', tip: 'Буква Ь смягчает предыдущий согласный звук!',
          syllables: ['АЛЬ', 'ОЛЬ', 'УЛЬ', 'АНЬ', 'ОНЬ', 'АТЬ'],
          words: [{ emoji: '🐎', display: 'КОНЬ', word: 'КОНЬ' }, { emoji: '🌲', display: 'ЕЛЬ', word: 'ЕЛЬ' }, { emoji: '🦢', display: 'ГУСЬ', word: 'ГУСЬ' }, { emoji: '🐻', display: 'МЕД·ВЕДЬ', word: 'МЕДВЕДЬ' }, { emoji: '🎒', display: 'ПОРТ·ФЕЛЬ', word: 'ПОРТФЕЛЬ' }]
        },
        {
          id: 'tsy', label: 'ЦА / ЦЫ / ЦИ', title: 'Твёрдое Ц', tip: 'Звук [Ц] всегда твёрдый!',
          syllables: ['ЦА', 'ЦО', 'ЦУ', 'ЦЕ', 'ЦЫ', 'ЦИ'],
          words: [{ emoji: '🌸', display: 'ЦВЕ·ТОК', word: 'ЦВЕТОК' }, { emoji: '🐥', display: 'ЦЫП·ЛЁ·НОК', word: 'ЦЫПЛЁНОК' }, { emoji: '🎪', display: 'ЦИРК', word: 'ЦИРК' }, { emoji: '🐦', display: 'ПТИ·ЦА', word: 'ПТИЦА' }, { emoji: '☀️', display: 'СОЛН·ЦЕ', word: 'СОЛНЦЕ' }]
        }
      ]
    },
    sentences: {
      intro: 'Тетрадь 18: Прочитай фразу по слогам, выбери картинку и дополни предложение словом!',
      items: [
        { id: 's1', display: 'МА·МА МО·ЕТ РА·МУ', spoken: 'Мама моет раму', correctEmoji: '🪟', distractors: ['⚽', '🐱', '🚀'] },
        { id: 's2', display: 'КОТ ПЬЁТ МО·ЛО·КО', spoken: 'Кот пьёт молоко', correctEmoji: '🐱', distractors: ['🐶', '🚗', '🍌'] },
        { id: 's3', display: 'ПА·ПА ЧИ·ТА·ЕТ КНИ·ГУ', spoken: 'Папа читает книгу', correctEmoji: '📖', distractors: ['🍌', '🐸', '🚂'] },
        { id: 's4', display: 'СО·БА·КА ГРЫ·ЗЁТ КОСТЬ', spoken: 'Собака грызёт кость', correctEmoji: '🐶', distractors: ['🦉', '🌸', '⏰'] },
        { id: 's5', display: 'РЫ·БА ПЛЫ·ВЁТ В ВО·ДЕ', spoken: 'Рыба плывёт в воде', correctEmoji: '🐟', distractors: ['✈️', '🍎', '🎂'] },
        { id: 's6', display: 'ЖА·БА ПРЫ·ГА·ЕТ В ПРУД', spoken: 'Жаба прыгает в пруд', correctEmoji: '🐸', distractors: ['🚂', '🎂', '🐻'] },
        { id: 's7', display: 'РА·КЕ·ТА ЛЕ·ТИТ В КОС·МОС', spoken: 'Ракета летит в космос', correctEmoji: '🚀', distractors: ['🐟', '🐮', '🍄'] },
        { id: 's8', display: 'МА·ЛЫШ ЕСТ КА·ШУ', spoken: 'Малыш ест кашу', correctEmoji: '🥣', distractors: ['🌙', '🚗', '🦊'] },
        { id: 's9', display: 'НА НЕ·БЕ ЯР·КА·Я РА·ДУ·ГА', spoken: 'На небе яркая радуга', correctEmoji: '🌈', distractors: ['🥾', '🧀', '🐘'] },
        { id: 's10', display: 'БЕЛ·КА ГРЫ·ЗЁТ О·РЕХ', spoken: 'Белка грызёт орех', correctEmoji: '🐿️', distractors: ['🐢', '🚌', '🍉'] },
        { id: 's11', display: 'В ЛЕ·СУ РАС·ТУТ ГРИ·БЫ', spoken: 'В лесу растут грибы', correctEmoji: '🍄', distractors: ['✈️', '⏰', '🧦'] },
        { id: 's12', display: 'ЛИ·СА И·ДЁТ ПО СНЕ·ГУ', spoken: 'Лиса идёт по снегу', correctEmoji: '🦊', distractors: ['🍉', '🚢', '🎹'] },
        { id: 's13', display: 'СЛОН ПЬЁТ СЛАД·КИЙ СОК', spoken: 'Слон пьёт сладкий сок', correctEmoji: '🐘', distractors: ['🐝', '🌙', '🔔'] },
        { id: 's14', display: 'МИШ·КА КУ·ША·ЕТ МЁД', spoken: 'Мишка кушает мёд', correctEmoji: '🐻', distractors: ['🚑', '🐟', '🧢'] },
        { id: 's15', display: 'ПО·ЕЗД Е·ДЕТ В ГО·РОД', spoken: 'Поезд едет в город', correctEmoji: '🚂', distractors: ['🍓', '🐸', '🌵'] },
        { id: 's16', display: 'ПЧЕ·ЛА ЛЕ·ТИТ НА ЦВЕ·ТОК', spoken: 'Пчела летит на цветок', correctEmoji: '🐝', distractors: ['🐧', '🚗', '🧅'] }
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
      ],
      vowelWords: [
        { emoji: '🍉', word: 'ARBUZ', vowel: 'A' },
        { emoji: '🍍', word: 'ANANAS', vowel: 'A' },
        { emoji: '🚌', word: 'AUTOBUS', vowel: 'A' },
        { emoji: '🪟', word: 'OKNO', vowel: 'O' },
        { emoji: '🐑', word: 'OWCA', vowel: 'O' },
        { emoji: '👁️', word: 'OKO', vowel: 'O' },
        { emoji: '👂', word: 'UCHO', vowel: 'U' },
        { emoji: '🛣️', word: 'ULICA', vowel: 'U' },
        { emoji: '📺', word: 'EKRAN', vowel: 'E' },
        { emoji: '🐘', word: 'ELF', vowel: 'E' },
        { emoji: '🪡', word: 'IGŁA', vowel: 'I' },
        { emoji: '🦋', word: 'MOTYL', vowel: 'Y', maskedIndex: 3 }
      ]
    },
    onomatopoeia: {
      intro: 'Zeszyt 2: Poznaj wyrażenia dźwiękonaśladowcze, a potem przeczytaj dymek i odgadnij bohatera!',
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
      intro: 'Zeszyty 3–9: Przeczytaj sylaby otwarte i zamknięte (+2 ⭐), złap sylabę i ułóż słowo!',
      groups: [
        { c: 'P', open: ['PA', 'PO', 'PU', 'PE', 'PI', 'PY'], closed: ['AP', 'OP', 'UP', 'EP', 'IP', 'YP'], words: [{ emoji: '👨', display: 'PA·PA', word: 'PAPA' }, { emoji: '🐆', display: 'PU·MA', word: 'PUMA' }, { emoji: '🌾', display: 'PO·LE', word: 'POLE' }, { emoji: '🪚', display: 'PI·ŁA', word: 'PIŁA' }] },
        { c: 'M', open: ['MA', 'MO', 'MU', 'ME', 'MI', 'MY'], closed: ['AM', 'OM', 'UM', 'EM', 'IM', 'YM'], words: [{ emoji: '👩', display: 'MA·MA', word: 'MAMA' }, { emoji: '🌊', display: 'MO·RZE', word: 'MORZE' }, { emoji: '🧼', display: 'MY·DŁO', word: 'MYDŁO' }, { emoji: '🫐', display: 'MA·LI·NA', word: 'MALINA' }] },
        { c: 'B', open: ['BA', 'BO', 'BU', 'BE', 'BI', 'BY'], closed: ['AB', 'OB', 'UB', 'EB', 'IB', 'YB'], words: [{ emoji: '🍌', display: 'BA·NAN', word: 'BANAN' }, { emoji: '🎈', display: 'BA·LON', word: 'BALON' }, { emoji: '🥖', display: 'BUŁ·KA', word: 'BUŁKA' }, { emoji: '🥁', display: 'BĘ·BEN', word: 'BĘBEN' }] },
        { c: 'L', open: ['LA', 'LO', 'LU', 'LE', 'LI', 'LY'], closed: ['AL', 'OL', 'UL', 'EL', 'IL', 'YL'], words: [{ emoji: '☀️', display: 'LA·TO', word: 'LATO' }, { emoji: '🦊', display: 'LI·SEK', word: 'LISEK' }, { emoji: '🦁', display: 'LEW', word: 'LEW' }, { emoji: '🍦', display: 'LO·DY', word: 'LODY' }] },
        { c: 'F', open: ['FA', 'FO', 'FU', 'FE', 'FI', 'FY'], closed: ['AF', 'OF', 'UF', 'EF', 'IF', 'YF'], words: [{ emoji: '🌊', display: 'FA·LA', word: 'FALA' }, { emoji: '🦭', display: 'FO·KA', word: 'FOKA' }, { emoji: '🦒', display: 'ŻY·RA·FA', word: 'ŻYRAFA' }, { emoji: '☕', display: 'FI·LI·ŻAN·KA', word: 'FILIŻANKA' }] },
        { c: 'W', open: ['WA', 'WO', 'WU', 'WE', 'WI', 'WY'], closed: ['AW', 'OW', 'UW', 'EW', 'IW', 'YW'], words: [{ emoji: '💧', display: 'WO·DA', word: 'WODA' }, { emoji: '🏺', display: 'WA·ZON', word: 'WAZON' }, { emoji: '🐺', display: 'WILK', word: 'WILK' }, { emoji: '🧶', display: 'WEŁ·NA', word: 'WEŁNA' }] },
        { c: 'T', open: ['TA', 'TO', 'TU', 'TE', 'TI', 'TY'], closed: ['AT', 'OT', 'UT', 'ET', 'IT', 'YT'], words: [{ emoji: '👨', display: 'TA·TA', word: 'TATA' }, { emoji: '🎂', display: 'TORT', word: 'TORT' }, { emoji: '🦋', display: 'MO·TYL', word: 'MOTYL' }, { emoji: '🍅', display: 'TO·MAT', word: 'TOMAT' }] },
        { c: 'D', open: ['DA', 'DO', 'DU', 'DE', 'DI', 'DY'], closed: ['AD', 'OD', 'UD', 'ED', 'ID', 'YD'], words: [{ emoji: '🏠', display: 'DOM', word: 'DOM' }, { emoji: '🍉', display: 'DY·NIA', word: 'DYNIA' }, { emoji: '🌳', display: 'DĄB', word: 'DĄB' }, { emoji: '🌧️', display: 'DESZCZ', word: 'DESZCZ' }] },
        { c: 'S', open: ['SA', 'SO', 'SU', 'SE', 'SI', 'SY'], closed: ['AS', 'OS', 'US', 'ES', 'IS', 'YS'], words: [{ emoji: '🦉', display: 'SO·WA', word: 'SOWA' }, { emoji: '🧀', display: 'SER', word: 'SER' }, { emoji: '✈️', display: 'SA·MO·LOT', word: 'SAMOLOT' }, { emoji: '🦊', display: 'LI·SEK', word: 'LISEK' }] },
        { c: 'Z', open: ['ZA', 'ZO', 'ZU', 'ZE', 'ZI', 'ZY'], closed: ['AZ', 'OZ', 'UZ', 'EZ', 'IZ', 'YZ'], words: [{ emoji: '❄️', display: 'ZI·MA', word: 'ZIMA' }, { emoji: '⏰', display: 'ZE·GAR', word: 'ZEGAR' }, { emoji: '🦓', display: 'ZE·BRA', word: 'ZEBRA' }, { emoji: '🏰', display: 'ZA·MEK', word: 'ZAMEK' }] },
        { c: 'K', open: ['KA', 'KO', 'KU', 'KE', 'KI', 'KY'], closed: ['AK', 'OK', 'UK', 'EK', 'IK', 'YK'], words: [{ emoji: '🐱', display: 'KO·TEK', word: 'KOTEK' }, { emoji: '☕', display: 'KA·WA', word: 'KAWA' }, { emoji: '🐄', display: 'KRO·WA', word: 'KROWA' }, { emoji: '🐔', display: 'KU·RA', word: 'KURA' }] },
        { c: 'G', open: ['GA', 'GO', 'GU', 'GE', 'GI', 'GY'], closed: ['AG', 'OG', 'UG', 'EG', 'IG', 'YG'], words: [{ emoji: '🏔️', display: 'GÓ·RA', word: 'GÓRA' }, { emoji: '🍄', display: 'GRZYB', word: 'GRZYB' }, { emoji: '🕊️', display: 'GO·ŁĄB', word: 'GOŁĄB' }, { emoji: '🎸', display: 'GI·TA·RA', word: 'GITARA' }] },
        { c: 'N', open: ['NA', 'NO', 'NU', 'NE', 'NI', 'NY'], closed: ['AN', 'ON', 'UN', 'EN', 'IN', 'YN'], words: [{ emoji: '👃', display: 'NOS', word: 'NOS' }, { emoji: '🦶', display: 'NO·GA', word: 'NOGA' }, { emoji: '🌙', display: 'NOC', word: 'NOC' }, { emoji: '🍌', display: 'BA·NAN', word: 'BANAN' }] },
        { c: 'R', open: ['RA', 'RO', 'RU', 'RE', 'RY', 'RÓ'], closed: ['AR', 'OR', 'UR', 'ER', 'IR', 'YR'], words: [{ emoji: '🐟', display: 'RY·BA', word: 'RYBA' }, { emoji: '✋', display: 'RĘ·KA', word: 'RĘKA' }, { emoji: '🚲', display: 'RO·WER', word: 'ROWER' }, { emoji: '🚀', display: 'RA·KIE·TA', word: 'RAKIETA' }] },
        { c: 'C', open: ['CA', 'CO', 'CU', 'CE', 'CY', 'CÓ'], closed: ['AC', 'OC', 'UC', 'EC', 'IC', 'YC'], words: [{ emoji: '🌙', display: 'NOC', word: 'NOC' }, { emoji: '🍋', display: 'CY·TRY·NA', word: 'CYTRYNA' }, { emoji: '🧅', display: 'CE·BU·LA', word: 'CEBULA' }, { emoji: '🧱', display: 'CE·GŁA', word: 'CEGŁA' }] },
        { c: 'H', open: ['HA', 'HO', 'HU', 'HE', 'HI', 'HY'], closed: ['AH', 'OH', 'UH', 'EH', 'IH', 'YH'], words: [{ emoji: '🍵', display: 'HER·BA·TA', word: 'HERBATA' }, { emoji: '🛌', display: 'HA·MAK', word: 'HAMAK' }, { emoji: '🚁', display: 'HE·LI·KOP·TER', word: 'HELIKOPTER' }, { emoji: '🐶', display: 'HAU', word: 'HAU' }] },
        { c: 'Ł', open: ['ŁA', 'ŁO', 'ŁU', 'ŁE', 'ŁY', 'ŁÓ'], closed: ['AŁ', 'OŁ', 'UŁ', 'EŁ', 'IŁ', 'YŁ'], words: [{ emoji: '🪵', display: 'ŁA·WA', word: 'ŁAWA' }, { emoji: '⛵', display: 'ŁÓD·KA', word: 'ŁÓDKA' }, { emoji: '🍎', display: 'JABŁ·KO', word: 'JABŁKO' }, { emoji: '🪑', display: 'STÓŁ', word: 'STÓŁ' }] },
        { c: 'J', open: ['JA', 'JO', 'JU', 'JE', 'JI', 'JY'], closed: ['AJ', 'OJ', 'UJ', 'EJ', 'IJ', 'YJ'], words: [{ emoji: '🥚', display: 'JAJ·KO', word: 'JAJKO' }, { emoji: '🦔', display: 'JEŻ', word: 'JEŻ' }, { emoji: '🍎', display: 'JABŁ·KO', word: 'JABŁKO' }, { emoji: '🍓', display: 'JA·GO·DA', word: 'JAGODA' }] }
      ]
    },
    digraphs: {
      intro: 'Zeszyty 10–17: Dwuznaki, głoski miękkie, quiz ze słuchu oraz uzupełnianie brakującej sylaby!',
      groups: [
        {
          id: 'sz', label: 'SZ', title: 'Dwuznak SZ (Zeszyt 10)', tip: 'Dwie litery S + Z czytamy razem jako jeden dźwięk [SZ]!',
          syllables: ['SZA', 'SZO', 'SZU', 'SZE', 'SZY'],
          words: [{ emoji: '🧣', display: 'SZA·LIK', word: 'SZALIK' }, { emoji: '🚪', display: 'SZA·FA', word: 'SZAFA' }, { emoji: '🐭', display: 'MYSZ·KA', word: 'MYSZKA' }, { emoji: '🌰', display: 'KA·SZTAN', word: 'KASZTAN' }, { emoji: '🥄', display: 'ŁYŻ·KA', word: 'ŁYŻKA' }]
        },
        {
          id: 'cz', label: 'CZ', title: 'Dwuznak CZ (Zeszyt 12)', tip: 'Litery C + Z czytamy razem jak twarde [CZ]!',
          syllables: ['CZA', 'CZO', 'CZU', 'CZE', 'CZY'],
          words: [{ emoji: '🧢', display: 'CZAP·KA', word: 'CZAPKA' }, { emoji: '🌈', display: 'TĘ·CZA', word: 'TĘCZA' }, { emoji: '🔑', display: 'KLUCZ', word: 'KLUCZ' }, { emoji: '☕', display: 'CZAJ·NIK', word: 'CZAJNIK' }, { emoji: '🐝', display: 'PSZCZO·ŁA', word: 'PSZCZOŁA' }]
        },
        {
          id: 'rz_z', label: 'RZ / Ż', title: 'RZ oraz Ż (Zeszyt 10–11)', tip: 'Dwuznak RZ i litera Ż brzmią tak samo — jak bzyczenie żuka!',
          syllables: ['RZA', 'RZO', 'RZU', 'ŻA', 'ŻO', 'ŻU'],
          words: [{ emoji: '🐸', display: 'ŻA·BA', word: 'ŻABA' }, { emoji: '🌊', display: 'RZE·KA', word: 'RZEKA' }, { emoji: '🍄', display: 'GRZYB', word: 'GRZYB' }, { emoji: '🌳', display: 'DRZE·WO', word: 'DRZEWO' }, { emoji: '🦒', display: 'ŻY·RA·FA', word: 'ŻYRAFA' }]
        },
        {
          id: 'dz', label: 'DZ / DŻ', title: 'Dwuznaki DZ i DŻ (Zeszyt 11–13)', tip: 'Czytamy razem bez rozdzielania liter!',
          syllables: ['DZA', 'DZO', 'DZU', 'DŻA', 'DŻE', 'DŻU'],
          words: [{ emoji: '🔔', display: 'DZWON', word: 'DZWON' }, { emoji: '🍓', display: 'DŻEM', word: 'DŻEM' }, { emoji: '👖', display: 'DŻIN·SY', word: 'DŻINSY' }, { emoji: '🌴', display: 'DŻUN·GLA', word: 'DŻUNGLA' }, { emoji: '🔔', display: 'DZWON·EK', word: 'DZWONEK' }]
        },
        {
          id: 'ch_l', label: 'CH / Ł', title: 'CH i Ł (Zeszyt 12–13)', tip: 'CH czytamy jak H, a Ł wymawiamy zaokrąglając usta!',
          syllables: ['CHA', 'CHO', 'CHU', 'ŁA', 'ŁO', 'ŁU'],
          words: [{ emoji: '🍞', display: 'CHLEB', word: 'CHLEB' }, { emoji: '☁️', display: 'CHMU·RA', word: 'CHMURA' }, { emoji: '🚣', display: 'ŁÓD·KA', word: 'ŁÓDKA' }, { emoji: '🥐', display: 'BUŁ·KA', word: 'BUŁKA' }, { emoji: '🍎', display: 'JABŁ·KO', word: 'JABŁKO' }]
        },
        {
          id: 'soft', label: 'Ś / Ć / Ź / Ń', title: 'Miękkie głoski z kreską i „i” (Zeszyt 14–16)', tip: 'Ś i SI, Ć i CI, Ź i ZI, Ń i NI brzmią bardzo miękko!',
          syllables: ['SIA', 'SIO', 'CIA', 'CIO', 'ZIA', 'NIA'],
          words: [{ emoji: '❄️', display: 'ŚNIEG', word: 'ŚNIEG' }, { emoji: '🐎', display: 'KOŃ', word: 'KOŃ' }, { emoji: '🐻', display: 'MIŚ', word: 'MIŚ' }, { emoji: '🐌', display: 'ŚLI·MAK', word: 'ŚLIMAK' }, { emoji: '☀️', display: 'SŁOŃ·CE', word: 'SŁOŃCE' }]
        },
        {
          id: 'nasal', label: 'Ą / Ę', title: 'Samogłoski nosowe Ą i Ę (Zeszyt 17)', tip: 'Samogłoski z ogonkiem czytamy nosowo: WĄŻ, RĘKA!',
          syllables: ['MĄ', 'MĘ', 'KĄ', 'KĘ', 'SĄ', 'SĘ'],
          words: [{ emoji: '🐍', display: 'WĄŻ', word: 'WĄŻ' }, { emoji: '✋', display: 'RĘ·KA', word: 'RĘKA' }, { emoji: '🌳', display: 'DĄB', word: 'DĄB' }, { emoji: '🍩', display: 'PĄ·CZEK', word: 'PĄCZEK' }, { emoji: '🥁', display: 'BĘ·BEN', word: 'BĘBEN' }]
        }
      ]
    },
    sentences: {
      intro: 'Zeszyt 18: Przeczytaj zdanie sylabami, wybierz obrazek i uzupełnij brakujące słowo!',
      items: [
        { id: 'pl1', display: 'MA·MA MA KO·TA', spoken: 'Mama ma kota', correctEmoji: '🐱', distractors: ['🐶', '🚗', '🍌'] },
        { id: 'pl2', display: 'TA·TA PI·JE KA·WĘ', spoken: 'Tata pije kawę', correctEmoji: '☕', distractors: ['🐸', '🎈', '🚂'] },
        { id: 'pl3', display: 'ŻA·BA SKA·CZE DO WO·DY', spoken: 'Żaba skacze do wody', correctEmoji: '🐸', distractors: ['✈️', '🍎', '🎂'] },
        { id: 'pl4', display: 'KO·TEK PI·JE MLE·KO', spoken: 'Kotek pije mleko', correctEmoji: '🥛', distractors: ['🚌', '🍄', '🦊'] },
        { id: 'pl5', display: 'PIES BIE·GA PO PAR·KU', spoken: 'Pies biega po parku', correctEmoji: '🐶', distractors: ['🌙', '🍅', '🦉'] },
        { id: 'pl6', display: 'RY·BA PŁY·WA W MO·RZU', spoken: 'Ryba pływa w morzu', correctEmoji: '🐟', distractors: ['🧀', '🚀', '🐻'] },
        { id: 'pl7', display: 'RA·KIE·TA LE·CI W KOS·MOS', spoken: 'Rakieta leci w kosmos', correctEmoji: '🚀', distractors: ['🐢', '🥖', '🌻'] },
        { id: 'pl8', display: 'NA NIE·BIE ŚWIE·CI SŁOŃ·CE', spoken: 'Na niebie świeci słońce', correctEmoji: '☀️', distractors: ['🧦', '🐻', '🚕'] },
        { id: 'pl9', display: 'MO·TYL SIA·DA NA KWIA·TKU', spoken: 'Motyl siada na kwiatku', correctEmoji: '🦋', distractors: ['⏰', '🚲', '🐟'] },
        { id: 'pl10', display: 'JA·NEK JE SŁOD·KIE JABŁ·KO', spoken: 'Janek je słodkie jabłko', correctEmoji: '🍎', distractors: ['🦊', '🥁', '🚢'] },
        { id: 'pl11', display: 'LI·SEK I·DZIE PRZEZ LAS', spoken: 'Lisek idzie przez las', correctEmoji: '🦊', distractors: ['🌊', '🎂', '🎹'] },
        { id: 'pl12', display: 'PO DESZ·CZU JEST TĘ·CZA', spoken: 'Po deszczu jest tęcza', correctEmoji: '🌈', distractors: ['🐘', '🔑', '🥖'] },
        { id: 'pl13', display: 'SŁOŃ PI·JE ZIM·NĄ WO·DĘ', spoken: 'Słoń pije zimną wodę', correctEmoji: '🐘', distractors: ['🐝', '🧀', '🚀'] },
        { id: 'pl14', display: 'MIŚ LU·BI SŁOD·KI MIÓD', spoken: 'Miś lubi słodki miód', correctEmoji: '🐻', distractors: ['🚗', '🍄', '🧢'] },
        { id: 'pl15', display: 'PO·CIĄG JE·DZIE PO TO·RACH', spoken: 'Pociąg jedzie po torach', correctEmoji: '🚂', distractors: ['🍓', '🐸', '🌵'] },
        { id: 'pl16', display: 'PSZCZO·ŁA LE·CI NA KWIAT', spoken: 'Pszczoła leci na kwiat', correctEmoji: '🐝', distractors: ['🐧', '🚗', '🧅'] }
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
        { letter: 'A', cue: 'Open wide: A-A-A', emoji: '😮', spoken: 'ah' },
        { letter: 'E', cue: 'Big smile: E-E-E', emoji: '😜', spoken: 'eh' },
        { letter: 'I', cue: 'Tiny smile: I-I-I', emoji: '😁', spoken: 'eee' },
        { letter: 'O', cue: 'Round mouth: O-O-O', emoji: '⭕', spoken: 'oh' },
        { letter: 'U', cue: 'Round lips: U-U-U', emoji: '🚂', spoken: 'ooh' },
        { letter: 'Y', cue: 'Wave hello: Y-Y-Y', emoji: '🌟', spoken: 'why' }
      ],
      pairs: [
        { text: 'AU', scene: '🌲', caption: 'Calling out: AU!', spoken: 'aw' },
        { text: 'UA', scene: '👶', caption: 'Baby cries: UA!', spoken: 'wah' },
        { text: 'IA', scene: '🫏', caption: 'Donkey says: EE-AH!', spoken: 'ee-ah' },
        { text: 'OU', scene: '😮', caption: 'Ouchie: OW!', spoken: 'ow' },
        { text: 'OI', scene: '👋', caption: 'Look here: OI!', spoken: 'oy' },
        { text: 'AI', scene: '🌵', caption: 'Ouch: AI!', spoken: 'eye' }
      ],
      vowelWords: [
        { emoji: '🍎', word: 'APPLE', vowel: 'A' },
        { emoji: '🐜', word: 'ANT', vowel: 'A' },
        { emoji: '🐘', word: 'ELEPHANT', vowel: 'E' },
        { emoji: '🥚', word: 'EGG', vowel: 'E' },
        { emoji: '🍦', word: 'IGLOO', vowel: 'I' },
        { emoji: '🦎', word: 'IGUANA', vowel: 'I' },
        { emoji: '🍊', word: 'ORANGE', vowel: 'O' },
        { emoji: '🦉', word: 'OWL', vowel: 'O' },
        { emoji: '☂️', word: 'UMBRELLA', vowel: 'U' },
        { emoji: '🦄', word: 'UNICORN', vowel: 'U' },
        { emoji: '💛', word: 'YELLOW', vowel: 'Y' },
        { emoji: '🪀', word: 'YOYO', vowel: 'Y' }
      ]
    },
    onomatopoeia: {
      intro: 'Book 2: Learn animal & object sounds, then solve both reading & listening quizzes!',
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
      intro: 'Books 3–9: Walk open & closed syllables (+2 ⭐), catch syllables, and build words by syllables!',
      groups: [
        { c: 'M', open: ['MA', 'ME', 'MI', 'MO', 'MU', 'MY'], closed: ['AM', 'EM', 'IM', 'OM', 'UM', 'YM'], words: [{ emoji: '👩', display: 'MA·MA', word: 'MAMA' }, { emoji: '🌙', display: 'MOON', word: 'MOON' }, { emoji: '🐒', display: 'MON·KEY', word: 'MONKEY' }, { emoji: '🍈', display: 'ME·LON', word: 'MELON' }] },
        { c: 'P', open: ['PA', 'PE', 'PI', 'PO', 'PU', 'PY'], closed: ['AP', 'EP', 'IP', 'OP', 'UP', 'YP'], words: [{ emoji: '👨', display: 'PA·PA', word: 'PAPA' }, { emoji: '🐼', display: 'PAN·DA', word: 'PANDA' }, { emoji: '🐶', display: 'PUP·PY', word: 'PUPPY' }, { emoji: '🪐', display: 'PLA·NET', word: 'PLANET' }] },
        { c: 'B', open: ['BA', 'BE', 'BI', 'BO', 'BU', 'BY'], closed: ['AB', 'EB', 'IB', 'OB', 'UB', 'YB'], words: [{ emoji: '👶', display: 'BA·BY', word: 'BABY' }, { emoji: '🍌', display: 'BA·NA·NA', word: 'BANANA' }, { emoji: '🚌', display: 'BUS', word: 'BUS' }, { emoji: '🐻', display: 'BEAR', word: 'BEAR' }] },
        { c: 'T', open: ['TA', 'TE', 'TI', 'TO', 'TU', 'TY'], closed: ['AT', 'ET', 'IT', 'OT', 'UT', 'YT'], words: [{ emoji: '🐯', display: 'TI·GER', word: 'TIGER' }, { emoji: '🐢', display: 'TUR·TLE', word: 'TURTLE' }, { emoji: '🍅', display: 'TO·MA·TO', word: 'TOMATO' }, { emoji: '🚕', display: 'TA·XI', word: 'TAXI' }] },
        { c: 'D', open: ['DA', 'DE', 'DI', 'DO', 'DU', 'DY'], closed: ['AD', 'ED', 'ID', 'OD', 'UD', 'YD'], words: [{ emoji: '🐶', display: 'DOG', word: 'DOG' }, { emoji: '🦆', display: 'DUCK', word: 'DUCK' }, { emoji: '👩‍⚕️', display: 'DOC·TOR', word: 'DOCTOR' }, { emoji: '🍩', display: 'DO·NUT', word: 'DONUT' }] },
        { c: 'N', open: ['NA', 'NE', 'NI', 'NO', 'NU', 'NY'], closed: ['AN', 'EN', 'IN', 'ON', 'UN', 'YN'], words: [{ emoji: '👃', display: 'NOSE', word: 'NOSE' }, { emoji: '🥚', display: 'NEST', word: 'NEST' }, { emoji: '🥜', display: 'NUT', word: 'NUT' }, { emoji: '🍌', display: 'BA·NA·NA', word: 'BANANA' }] },
        { c: 'L', open: ['LA', 'LE', 'LI', 'LO', 'LU', 'LY'], closed: ['AL', 'EL', 'IL', 'OL', 'UL', 'YL'], words: [{ emoji: '🦁', display: 'LI·ON', word: 'LION' }, { emoji: '🍋', display: 'LE·MON', word: 'LEMON' }, { emoji: '🍃', display: 'LEAF', word: 'LEAF' }, { emoji: '🐞', display: 'LA·DY·BUG', word: 'LADYBUG' }] },
        { c: 'S', open: ['SA', 'SE', 'SI', 'SO', 'SU', 'SY'], closed: ['AS', 'ES', 'IS', 'OS', 'US', 'YS'], words: [{ emoji: '☀️', display: 'SUN', word: 'SUN' }, { emoji: '🕷️', display: 'SPI·DER', word: 'SPIDER' }, { emoji: '⭐', display: 'STAR', word: 'STAR' }, { emoji: '🌅', display: 'SUN·SET', word: 'SUNSET' }] },
        { c: 'K', open: ['KA', 'KE', 'KI', 'KO', 'KU', 'KY'], closed: ['AK', 'EK', 'IK', 'OK', 'UK', 'YK'], words: [{ emoji: '🐱', display: 'KIT·TEN', word: 'KITTEN' }, { emoji: '🔑', display: 'KEY', word: 'KEY' }, { emoji: '👑', display: 'KING', word: 'KING' }, { emoji: '🐨', display: 'KO·A·LA', word: 'KOALA' }] },
        { c: 'R', open: ['RA', 'RE', 'RI', 'RO', 'RU', 'RY'], closed: ['AR', 'ER', 'IR', 'OR', 'UR', 'YR'], words: [{ emoji: '🐰', display: 'RAB·BIT', word: 'RABBIT' }, { emoji: '🤖', display: 'RO·BOT', word: 'ROBOT' }, { emoji: '🌈', display: 'RAIN·BOW', word: 'RAINBOW' }, { emoji: '🚀', display: 'ROCK·ET', word: 'ROCKET' }] },
        { c: 'F', open: ['FA', 'FE', 'FI', 'FO', 'FU', 'FY'], closed: ['AF', 'EF', 'IF', 'OF', 'UF', 'YF'], words: [{ emoji: '🐟', display: 'FISH', word: 'FISH' }, { emoji: '🦊', display: 'FOX', word: 'FOX' }, { emoji: '🐸', display: 'FROG', word: 'FROG' }, { emoji: '🌸', display: 'FLOW·ER', word: 'FLOWER' }] },
        { c: 'G', open: ['GA', 'GE', 'GI', 'GO', 'GU', 'GY'], closed: ['AG', 'EG', 'IG', 'OG', 'UG', 'YG'], words: [{ emoji: '🐐', display: 'GOAT', word: 'GOAT' }, { emoji: '🎁', display: 'GIFT', word: 'GIFT' }, { emoji: '🏡', display: 'GAR·DEN', word: 'GARDEN' }, { emoji: '🦒', display: 'GI·RAFFE', word: 'GIRAFFE' }] },
        { c: 'H', open: ['HA', 'HE', 'HI', 'HO', 'HU', 'HY'], closed: ['AH', 'EH', 'IH', 'OH', 'UH', 'YH'], words: [{ emoji: '🎩', display: 'HAT', word: 'HAT' }, { emoji: '✋', display: 'HAND', word: 'HAND' }, { emoji: '🍯', display: 'HO·NEY', word: 'HONEY' }, { emoji: '😊', display: 'HAP·PY', word: 'HAPPY' }] },
        { c: 'J', open: ['JA', 'JE', 'JI', 'JO', 'JU', 'JY'], closed: ['AJ', 'EJ', 'IJ', 'OJ', 'UJ', 'YJ'], words: [{ emoji: '🍓', display: 'JAM', word: 'JAM' }, { emoji: '✈️', display: 'JET', word: 'JET' }, { emoji: '🧃', display: 'JUICE', word: 'JUICE' }, { emoji: '🧥', display: 'JACK·ET', word: 'JACKET' }] },
        { c: 'V', open: ['VA', 'VE', 'VI', 'VO', 'VU', 'VY'], closed: ['AV', 'EV', 'IV', 'OV', 'UV', 'YV'], words: [{ emoji: '🚐', display: 'VAN', word: 'VAN' }, { emoji: '🦺', display: 'VEST', word: 'VEST' }, { emoji: '🏺', display: 'VA·SE', word: 'VASE' }, { emoji: '🎻', display: 'VI·O·LIN', word: 'VIOLIN' }] },
        { c: 'W', open: ['WA', 'WE', 'WI', 'WO', 'WU', 'WY'], closed: ['AW', 'EW', 'IW', 'OW', 'UW', 'YW'], words: [{ emoji: '🕸️', display: 'WEB', word: 'WEB' }, { emoji: '🐺', display: 'WOLF', word: 'WOLF' }, { emoji: '💧', display: 'WA·TER', word: 'WATER' }, { emoji: '🪟', display: 'WIN·DOW', word: 'WINDOW' }] },
        { c: 'Z', open: ['ZA', 'ZE', 'ZI', 'ZO', 'ZU', 'ZY'], closed: ['AZ', 'EZ', 'IZ', 'OZ', 'UZ', 'YZ'], words: [{ emoji: '🦁', display: 'ZOO', word: 'ZOO' }, { emoji: '0️⃣', display: 'ZE·RO', word: 'ZERO' }, { emoji: '🦓', display: 'ZE·BRA', word: 'ZEBRA' }, { emoji: '🍕', display: 'PIZ·ZA', word: 'PIZZA' }] }
      ]
    },
    digraphs: {
      intro: 'Books 10–17: Master English digraphs & vowel teams, listen for words, and fill missing syllables!',
      groups: [
        {
          id: 'sh', label: 'SH', title: 'Digraph SH', tip: 'S + H together make the quiet "shhh" sound!',
          syllables: ['SHA', 'SHE', 'SHI', 'SHO', 'SHU'],
          words: [{ emoji: '🐚', display: 'SHELL', word: 'SHELL' }, { emoji: '🐑', display: 'SHEEP', word: 'SHEEP' }, { emoji: '🦈', display: 'SHARK', word: 'SHARK' }, { emoji: '🚿', display: 'SHO·WER', word: 'SHOWER' }, { emoji: '🧴', display: 'SHAM·POO', word: 'SHAMPOO' }]
        },
        {
          id: 'ch', label: 'CH', title: 'Digraph CH', tip: 'C + H together sound like a train: choo-choo!',
          syllables: ['CHA', 'CHE', 'CHI', 'CHO', 'CHU'],
          words: [{ emoji: '🧀', display: 'CHEESE', word: 'CHEESE' }, { emoji: '🍒', display: 'CHER·RY', word: 'CHERRY' }, { emoji: '🪑', display: 'CHAIR', word: 'CHAIR' }, { emoji: '🐥', display: 'CHICK·EN', word: 'CHICKEN' }, { emoji: '🍑', display: 'PEACH', word: 'PEACH' }]
        },
        {
          id: 'th', label: 'TH', title: 'Digraph TH', tip: 'Put your tongue gently between your teeth for TH!',
          syllables: ['THA', 'THE', 'THI', 'THO', 'THU'],
          words: [{ emoji: '👍', display: 'THUMB', word: 'THUMB' }, { emoji: '3️⃣', display: 'THREE', word: 'THREE' }, { emoji: '⚡', display: 'THUN·DER', word: 'THUNDER' }, { emoji: '🪶', display: 'FEA·THER', word: 'FEATHER' }, { emoji: '🪥', display: 'TOOTH', word: 'TOOTH' }]
        },
        {
          id: 'wh', label: 'WH / PH', title: 'Digraphs WH & PH', tip: 'PH sounds like F (dolphin), WH makes a breezy W sound!',
          syllables: ['WHA', 'WHE', 'WHI', 'PHA', 'PHO', 'PHI'],
          words: [{ emoji: '🐋', display: 'WHALE', word: 'WHALE' }, { emoji: '🎡', display: 'WHEEL', word: 'WHEEL' }, { emoji: '🐬', display: 'DOL·PHIN', word: 'DOLPHIN' }, { emoji: '🐘', display: 'E·LE·PHANT', word: 'ELEPHANT' }, { emoji: '📱', display: 'PHONE', word: 'PHONE' }]
        },
        {
          id: 'oo', label: 'OO / EE', title: 'Long Vowel Teams OO & EE', tip: 'Two O letters say "oo" (moon), two E letters say "ee" (tree)!',
          syllables: ['MOO', 'BOO', 'ZOO', 'BEE', 'SEE', 'TEE'],
          words: [{ emoji: '🌙', display: 'MOON', word: 'MOON' }, { emoji: '🌳', display: 'TREE', word: 'TREE' }, { emoji: '🐝', display: 'BEE', word: 'BEE' }, { emoji: '🍪', display: 'COOK·IE', word: 'COOKIE' }, { emoji: '🎈', display: 'BAL·LOON', word: 'BALLOON' }]
        },
        {
          id: 'ck', label: 'CK / NG', title: 'Ending Blends CK & NG', tip: 'CK says crisp /k/, NG hums like a bell!',
          syllables: ['ACK', 'OCK', 'UCK', 'ING', 'ONG', 'UNG'],
          words: [{ emoji: '🦆', display: 'DUCK', word: 'DUCK' }, { emoji: '🧥', display: 'JACK·ET', word: 'JACKET' }, { emoji: '👑', display: 'KING', word: 'KING' }, { emoji: '💍', display: 'RING', word: 'RING' }, { emoji: '🚀', display: 'ROCK·ET', word: 'ROCKET' }]
        }
      ]
    },
    sentences: {
      intro: 'Book 18: Read the short sentence, pick the right picture, and complete the missing word!',
      items: [
        { id: 'en1', display: 'THE CAT SLEEPS', spoken: 'The cat sleeps', correctEmoji: '🐱', distractors: ['🚀', '🍎', '🐸'] },
        { id: 'en2', display: 'MOM DRINKS TEA', spoken: 'Mom drinks tea', correctEmoji: '🍵', distractors: ['🐸', '🚌', '🐝'] },
        { id: 'en3', display: 'THE DOG RUNS FAST', spoken: 'The dog runs fast', correctEmoji: '🐶', distractors: ['🦉', '🍌', '🌙'] },
        { id: 'en4', display: 'A FROG JUMPS HIGH', spoken: 'A frog jumps high', correctEmoji: '🐸', distractors: ['⏰', '🎂', '🚂'] },
        { id: 'en5', display: 'THE FISH SWIMS', spoken: 'The fish swims', correctEmoji: '🐟', distractors: ['✈️', '🧤', '🐻'] },
        { id: 'en6', display: 'DAD READS A BOOK', spoken: 'Dad reads a book', correctEmoji: '📖', distractors: ['🧀', '🐑', '🚕'] },
        { id: 'en7', display: 'A BEE LIKES FLOWERS', spoken: 'A bee likes flowers', correctEmoji: '🐝', distractors: ['🚂', '🥕', '🧦'] },
        { id: 'en8', display: 'THE MOON SHINES', spoken: 'The moon shines', correctEmoji: '🌙', distractors: ['🍔', '🐢', '🎈'] },
        { id: 'en9', display: 'LOOK AT THE RAINBOW', spoken: 'Look at the rainbow', correctEmoji: '🌈', distractors: ['🧦', '🥁', '🐶'] },
        { id: 'en10', display: 'MONKEY EATS BANANA', spoken: 'Monkey eats banana', correctEmoji: '🐒', distractors: ['❄️', '🚢', '⏰'] },
        { id: 'en11', display: 'A RAB·BIT HOPS FAST', spoken: 'A rabbit hops fast', correctEmoji: '🐰', distractors: ['🐟', '🚌', '🍎'] },
        { id: 'en12', display: 'THE TUR·TLE WALKS SLOW', spoken: 'The turtle walks slow', correctEmoji: '🐢', distractors: ['🚀', '🍦', '🦉'] },
        { id: 'en13', display: 'A RO·BOT HELPS US', spoken: 'A robot helps us', correctEmoji: '🤖', distractors: ['🍓', '🐸', '🌻'] },
        { id: 'en14', display: 'THE BEAR LIKES HONEY', spoken: 'The bear likes honey', correctEmoji: '🐻', distractors: ['🚂', '🥕', '🧦'] }
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
    this.nextTimer2 = null;
    this.speakTimer = null;

    // Глава 1: Гласные — мини-викторина (6 вариантов) + буква в начале слова
    this.vowelQuizTarget = null;
    this.vowelQuizOptions = [];
    this.vowelQuizAnswered = false;
    this.usedVowels = new Set();
    this.vowelStreak = 0;

    this.vowelWordTarget = null;
    this.vowelWordOptions = [];
    this.vowelWordAnswered = false;
    this.usedVowelWords = new Set();
    this.vowelWordStreak = 0;

    // Глава 2: Звукоподражания — подрежим (учим | угадай) + 2 викторины
    this.onomatSubMode = 'learn'; // 'learn' | 'quiz'
    this.onomatTarget = null;
    this.onomatOptions = [];
    this.onomatAnswered = false;
    this.usedOnomat = new Set();
    this.onomatStreak = 0;

    this.onomatReadTarget = null;
    this.onomatReadOptions = [];
    this.onomatReadAnswered = false;
    this.usedOnomatRead = new Set();
    this.onomatReadStreak = 0;

    // Глава 3: Слоги — шаги по открытым и закрытым слогам + угадай + конструктор слова
    this.selectedConsonantIdx = 0;
    this.walkedSyllables = new Set();
    this.syllablesRewardedGroups = new Set();
    this.syllablesRewardedClosed = new Set();
    this.syllableQuizTarget = null;
    this.syllableQuizOptions = [];
    this.syllableQuizAnswered = false;
    this.syllableStreak = 0;

    this.sylBuildTarget = null;
    this.sylBuildTiles = [];
    this.sylBuildFilledCount = 0;
    this.sylBuildDone = false;
    this.usedSylBuilds = new Set();
    this.sylBuildStreak = 0;

    // Глава 4: Двузнаки / Слияния — прохождение + угадай слово + вставь слог
    this.selectedDigraphIdx = 0;
    this.walkedDigraphSyllables = new Set();
    this.digraphRewardedGroups = new Set();
    this.digraphQuizTarget = null;
    this.digraphQuizOptions = [];
    this.digraphQuizAnswered = false;
    this.digraphStreak = 0;

    this.digFillTarget = null;
    this.digFillOptions = [];
    this.digFillAnswered = false;
    this.usedDigFills = new Set();
    this.digFillStreak = 0;

    // Глава 5: Первые фразы — выбери картинку + дополни последнее слово
    this.sentenceItem = null;
    this.sentenceOptions = [];
    this.sentenceAnswered = false;
    this.usedSentences = new Set();
    this.sentenceStreak = 0;

    this.senWordItem = null;
    this.senWordPromptDisplay = '';
    this.senWordAnswer = '';
    this.senWordOptions = [];
    this.senWordAnswered = false;
    this.usedSenWords = new Set();
    this.senWordStreak = 0;
  }

  stop() {
    if (this.nextTimer) {
      clearTimeout(this.nextTimer);
      this.nextTimer = null;
    }
    if (this.nextTimer2) {
      clearTimeout(this.nextTimer2);
      this.nextTimer2 = null;
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
    this.syllablesRewardedClosed.clear();
    this.walkedDigraphSyllables.clear();
    this.digraphRewardedGroups.clear();

    this.usedVowels.clear();
    this.usedVowelWords.clear();
    this.usedOnomat.clear();
    this.usedOnomatRead.clear();
    this.usedSylBuilds.clear();
    this.usedDigFills.clear();
    this.usedSentences.clear();
    this.usedSenWords.clear();

    this.vowelQuizTarget = null;
    this.vowelWordTarget = null;
    this.onomatTarget = null;
    this.onomatReadTarget = null;
    this.syllableQuizTarget = null;
    this.sylBuildTarget = null;
    this.digraphQuizTarget = null;
    this.digFillTarget = null;
    this.sentenceItem = null;
    this.senWordItem = null;

    this.vowelStreak = 0;
    this.vowelWordStreak = 0;
    this.onomatStreak = 0;
    this.onomatReadStreak = 0;
    this.syllableStreak = 0;
    this.sylBuildStreak = 0;
    this.digraphStreak = 0;
    this.digFillStreak = 0;
    this.sentenceStreak = 0;
    this.senWordStreak = 0;
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
    if (this.activeChapter === 'vowels') {
      if (!this.vowelQuizTarget) this.prepareVowelQuiz(false);
      if (!this.vowelWordTarget) this.prepareVowelWordGame();
    } else if (this.activeChapter === 'onomatopoeia' && this.onomatSubMode === 'quiz') {
      if (!this.onomatTarget) this.prepareOnomatQuiz();
      if (!this.onomatReadTarget) this.prepareOnomatReadQuiz();
    } else if (this.activeChapter === 'syllables') {
      if (!this.syllableQuizTarget) this.prepareSyllableQuiz(false);
      if (!this.sylBuildTarget) this.prepareSyllableBuild();
    } else if (this.activeChapter === 'digraphs') {
      if (!this.digraphQuizTarget) this.prepareDigraphQuiz(false);
      if (!this.digFillTarget) this.prepareDigraphFill();
    } else if (this.activeChapter === 'sentences') {
      if (!this.sentenceItem) this.prepareSentenceRound();
      if (!this.senWordItem) this.prepareSentenceWordFill();
    }
  }

  _bumpStreak(prop, goal = 5) {
    this[prop] = (this[prop] || 0) + 1;
    let bonus = 0;
    if (this[prop] >= goal) {
      this[prop] = 0;
      bonus = 2;
      this.onStarEarned(bonus);
    }
    return bonus;
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
    const others = shuffleArray(pool.filter(x => x.label !== target.label)).slice(0, 5);
    this.vowelQuizOptions = shuffleArray([target, ...others]);

    if (shouldSpeak) {
      this._scheduleSpeak(target.spoken, 180);
    }
  }

  prepareVowelWordGame() {
    const data = WORKBOOKS_DATA[this.lang].vowels;
    const pool = data.vowelWords || [];
    if (!pool.length) return;
    let avail = pool.filter(x => !this.usedVowelWords.has(x.word) && (!this.vowelWordTarget || x.word !== this.vowelWordTarget.word));
    if (avail.length === 0) {
      this.usedVowelWords.clear();
      avail = pool.filter(x => !this.vowelWordTarget || x.word !== this.vowelWordTarget.word);
      if (avail.length === 0) avail = pool;
    }
    const target = shuffleArray(avail)[0];
    this.vowelWordTarget = target;
    this.usedVowelWords.add(target.word);
    this.vowelWordAnswered = false;
    this.vowelWordOptions = data.singles.map(s => ({ letter: s.letter, spoken: s.spoken }));
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
    const others = shuffleArray(items.filter(it => it.id !== target.id)).slice(0, 3);
    this.onomatOptions = shuffleArray([target, ...others]);
  }

  prepareOnomatReadQuiz() {
    const items = WORKBOOKS_DATA[this.lang].onomatopoeia.items;
    let avail = items.filter(it => !this.usedOnomatRead.has(it.id) && (!this.onomatReadTarget || it.id !== this.onomatReadTarget.id));
    if (avail.length === 0) {
      this.usedOnomatRead.clear();
      avail = items.filter(it => !this.onomatReadTarget || it.id !== this.onomatReadTarget.id);
      if (avail.length === 0) avail = items;
    }
    const target = shuffleArray(avail)[0];
    this.onomatReadTarget = target;
    this.usedOnomatRead.add(target.id);
    this.onomatReadAnswered = false;
    const others = shuffleArray(items.filter(it => it.id !== target.id)).slice(0, 3);
    this.onomatReadOptions = shuffleArray([target, ...others]);
  }

  // ---------- ГЛАВА 3: СЛОГИ ----------
  prepareSyllableQuiz(shouldSpeak = true) {
    const groups = WORKBOOKS_DATA[this.lang].syllables.groups;
    const group = groups[this.selectedConsonantIdx] || groups[0];
    const pool = [...group.open, ...group.closed];
    const avail = pool.filter(s => s !== this.syllableQuizTarget);
    const target = shuffleArray(avail.length ? avail : pool)[0];
    this.syllableQuizTarget = target;
    this.syllableQuizAnswered = false;
    const others = shuffleArray(pool.filter(s => s !== target)).slice(0, 5);
    this.syllableQuizOptions = shuffleArray([target, ...others]);

    if (shouldSpeak) {
      this._scheduleSpeak(target, 180);
    }
  }

  prepareSyllableBuild() {
    const groups = WORKBOOKS_DATA[this.lang].syllables.groups;
    const group = groups[this.selectedConsonantIdx] || groups[0];
    const groupSylSet = new Set([...group.open, ...group.closed]);

    // Слова из текущей группы (с 2+ слогами) + подходящие слова из базы конструктора слогов
    const groupMulti = (group.words || [])
      .filter(w => w.display.includes('·'))
      .map(w => ({ word: w.word, emoji: w.emoji, syllables: w.display.split('·') }));

    const bankWords = (SYLLABLE_WORDS_DATA[this.lang] || []).filter(w =>
      w.syllables && w.syllables.length >= 2 &&
      (w.syllables.some(s => groupSylSet.has(s)) || w.word.includes(group.c))
    );

    const allFallback = groups.flatMap(g =>
      (g.words || []).filter(w => w.display.includes('·')).map(w => ({ word: w.word, emoji: w.emoji, syllables: w.display.split('·') }))
    );

    let candidates = [...groupMulti, ...bankWords];
    const uniqueByWord = new Map();
    candidates.forEach(c => { if (!uniqueByWord.has(c.word)) uniqueByWord.set(c.word, c); });
    candidates = Array.from(uniqueByWord.values());
    if (candidates.length === 0) candidates = allFallback;

    let avail = candidates.filter(c => !this.usedSylBuilds.has(c.word) && (!this.sylBuildTarget || c.word !== this.sylBuildTarget.word));
    if (avail.length === 0) {
      candidates.forEach(c => this.usedSylBuilds.delete(c.word));
      avail = candidates.filter(c => !this.sylBuildTarget || c.word !== this.sylBuildTarget.word);
      if (avail.length === 0) avail = candidates;
    }

    const target = shuffleArray(avail)[0];
    this.sylBuildTarget = target;
    this.usedSylBuilds.add(target.word);
    this.sylBuildFilledCount = 0;
    this.sylBuildDone = false;

    const needed = [...target.syllables];
    const distractorPool = shuffleArray([
      ...group.open,
      ...group.closed,
      ...(target.trapSyllables || [])
    ].filter(s => !needed.includes(s)));

    const extras = [];
    for (const d of distractorPool) {
      if (needed.length + extras.length >= 6) break;
      if (!extras.includes(d)) extras.push(d);
    }

    this.sylBuildTiles = shuffleArray(
      [...needed, ...extras].map((text, idx) => ({ id: idx, text, used: false }))
    );
  }

  // ---------- ГЛАВА 4: ДВУЗНАКИ / СЛИЯНИЯ ----------
  prepareDigraphQuiz(shouldSpeak = true) {
    const groups = WORKBOOKS_DATA[this.lang].digraphs.groups;
    const group = groups[this.selectedDigraphIdx] || groups[0];
    const targetPool = group.words;
    const avail = targetPool.filter(w => !this.digraphQuizTarget || w.word !== this.digraphQuizTarget.word);
    const target = shuffleArray(avail.length ? avail : targetPool)[0];
    const otherWords = groups
      .flatMap(g => g.words)
      .filter(w => w.word !== target.word);
    const distractors = shuffleArray(otherWords).slice(0, 3);

    this.digraphQuizTarget = target;
    this.digraphQuizOptions = shuffleArray([target, ...distractors]);
    this.digraphQuizAnswered = false;

    if (shouldSpeak) {
      this._scheduleSpeak(target.word, 180);
    }
  }

  prepareDigraphFill() {
    const groups = WORKBOOKS_DATA[this.lang].digraphs.groups;
    const group = groups[this.selectedDigraphIdx] || groups[0];
    let multiWords = (group.words || []).filter(w => w.display.includes('·'));
    if (multiWords.length === 0) {
      multiWords = groups.flatMap(g => g.words).filter(w => w.display.includes('·'));
    }

    let avail = multiWords.filter(w => !this.usedDigFills.has(w.word) && (!this.digFillTarget || w.word !== this.digFillTarget.word));
    if (avail.length === 0) {
      multiWords.forEach(w => this.usedDigFills.delete(w.word));
      avail = multiWords.filter(w => !this.digFillTarget || w.word !== this.digFillTarget.word);
      if (avail.length === 0) avail = multiWords;
    }

    const picked = shuffleArray(avail)[0];
    const syllables = picked.display.split('·');
    // Предпочитаем прятать слог, относящийся к текущей группе, иначе последний слог
    const matchingIdx = syllables.findIndex(s => group.syllables.some(gs => s.includes(gs) || gs === s));
    const maskIdx = matchingIdx !== -1 ? matchingIdx : syllables.length - 1;
    const missingSyl = syllables[maskIdx];

    this.digFillTarget = {
      word: picked.word,
      emoji: picked.emoji,
      syllables,
      maskIdx,
      missingSyl
    };
    this.usedDigFills.add(picked.word);
    this.digFillAnswered = false;

    const allOtherSyls = shuffleArray(
      [...group.syllables, ...groups.flatMap(g => g.syllables)]
        .filter(s => s !== missingSyl)
    );
    const distractors = [];
    for (const s of allOtherSyls) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(s)) distractors.push(s);
    }
    this.digFillOptions = shuffleArray([missingSyl, ...distractors]);
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
      ...(item.distractors || []).slice(0, 3).map(emoji => ({ emoji, isCorrect: false }))
    ];
    this.sentenceOptions = shuffleArray(opts);
  }

  prepareSentenceWordFill() {
    const items = WORKBOOKS_DATA[this.lang].sentences.items;
    let avail = items.filter(it => !this.usedSenWords.has(it.id) && (!this.senWordItem || it.id !== this.senWordItem.id));
    if (avail.length === 0) {
      this.usedSenWords.clear();
      avail = items.filter(it => !this.senWordItem || it.id !== this.senWordItem.id);
      if (avail.length === 0) avail = items;
    }
    const item = shuffleArray(avail)[0];
    this.senWordItem = item;
    this.usedSenWords.add(item.id);
    this.senWordAnswered = false;

    const words = item.display.trim().split(/\s+/);
    const answer = words[words.length - 1];
    this.senWordPromptDisplay = words.slice(0, -1).join(' ');
    this.senWordAnswer = answer;

    const otherLastWords = shuffleArray(
      items
        .filter(it => it.id !== item.id)
        .map(it => {
          const w = it.display.trim().split(/\s+/);
          return w[w.length - 1];
        })
        .filter(w => w !== answer)
    );
    const distractors = [];
    for (const w of otherLastWords) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(w)) distractors.push(w);
    }

    this.senWordOptions = shuffleArray([
      { display: answer, spoken: answer.replace(/·/g, ''), isCorrect: true },
      ...distractors.map(d => ({ display: d, spoken: d.replace(/·/g, ''), isCorrect: false }))
    ]);
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

  // Визуально разделяет слова (карточки с широким интервалом) и слоги внутри слова (через аккуратную точку)
  formatSyllableText(displayStr) {
    if (!displayStr) return '';
    return String(displayStr)
      .trim()
      .split(/\s+/)
      .map(wordPart => {
        const syllablesHTML = wordPart
          .split('·')
          .map(syl => `<span class="kc-syl-part">${syl}</span>`)
          .join('<span class="kc-syl-dot" aria-hidden="true">·</span>');
        return `<span class="kc-word-chip">${syllablesHTML}</span>`;
      })
      .join('');
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

  _renderStreakBadge(prop, goal = 5) {
    const val = this[prop] || 0;
    return `<span class="kc-streak-badge" title="Серия без подсказок">🔥 ${val}/${goal}</span>`;
  }

  _maskVowelWordHTML(item) {
    if (!item) return '';
    const idx = typeof item.maskedIndex === 'number' ? item.maskedIndex : 0;
    return item.word
      .split('')
      .map((ch, i) => (i === idx ? '<span class="kc-word-blank">_</span>' : `<span>${ch}</span>`))
      .join('');
  }

  renderVowelsHTML(vData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const singlesTitle = isRu ? '1. Пропой гласные:' : (isPl ? '1. Zaśpiewaj samogłoski:' : '1. Sing the vowels:');
    const pairsTitle = isRu ? '2. Прочитай пары гласных:' : (isPl ? '2. Przeczytaj pary samogłosek:' : '2. Read vowel pairs:');
    const quizTitle = isRu ? '🎯 Игра 1: Послушай и нажми!' : (isPl ? '🎯 Gra 1: Posłuchaj i wskaż!' : '🎯 Game 1: Listen & tap!');
    const wordGameTitle = isRu ? '🧩 Игра 2: Вставь гласную в слово!' : (isPl ? '🧩 Gra 2: Wstaw samogłoskę do słowa!' : '🧩 Game 2: Missing vowel in the word!');
    const listenLabel = isRu ? 'Послушать звук' : (isPl ? 'Posłuchaj dźwięku' : 'Listen to sound');
    const listenWordLabel = isRu ? 'Послушать слово' : (isPl ? 'Posłuchaj słowa' : 'Listen to word');
    const newSoundLabel = isRu ? 'Новый' : (isPl ? 'Nowy' : 'New');
    const vwTarget = this.vowelWordTarget;

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
          <div class="kc-quiz-title-wrap">
            <span class="kc-sec-title" style="margin:0">${quizTitle}</span>
            ${this._renderStreakBadge('vowelStreak', 5)}
          </div>
          <div class="kc-quiz-actions">
            <button class="kc-audio-btn" id="kc-vowel-speak">🔊 ${listenLabel}</button>
            <button class="kc-next-mini-btn" id="kc-vowel-next">↻ ${newSoundLabel}</button>
          </div>
        </div>
        <div class="kc-quiz-options-6" id="kc-vowel-options">
          ${this.vowelQuizOptions.map(opt => `
            <button class="kc-quiz-pill ${this.vowelQuizAnswered && opt.label === this.vowelQuizTarget?.label ? 'correct' : ''}" data-label="${opt.label}">${opt.label}</button>
          `).join('')}
        </div>
      </div>

      ${vwTarget ? `
        <div class="kc-card kc-quiz-card kc-game2-card">
          <div class="kc-quiz-top">
            <div class="kc-quiz-title-wrap">
              <span class="kc-sec-title" style="margin:0">${wordGameTitle}</span>
              ${this._renderStreakBadge('vowelWordStreak', 5)}
            </div>
            <div class="kc-quiz-actions">
              <button class="kc-audio-btn" id="kc-vw-speak">🔊 ${listenWordLabel}</button>
              <button class="kc-next-mini-btn" id="kc-vw-next">↻ ${newSoundLabel}</button>
            </div>
          </div>
          <div class="kc-vowel-word-stage">
            <span class="kc-vw-emoji">${vwTarget.emoji}</span>
            <div class="kc-vw-letters">${this._maskVowelWordHTML(vwTarget)}</div>
          </div>
          <div class="kc-quiz-options-6" id="kc-vw-options">
            ${this.vowelWordOptions.map(opt => `
              <button class="kc-quiz-pill ${this.vowelWordAnswered && opt.letter === vwTarget.vowel ? 'correct' : ''}" data-letter="${opt.letter}" data-spoken="${opt.spoken}">${opt.letter}</button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  renderOnomatHTML(oData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const learnLabel = isRu ? '📖 Учим звуки' : (isPl ? '📖 Uczymy się' : '📖 Learn Sounds');
    const quizLabel = isRu ? '🎯 Игры: Угадай звуки (2 игры)' : (isPl ? '🎯 Gry: Odgadnij dźwięki (2 gry)' : '🎯 Games: Guess Sounds (2 games)');
    const readPrompt = isRu ? 'Игра 1: Прочитай облачко и выбери, кто это:' : (isPl ? 'Gra 1: Przeczytaj dymek i wskaż, kto to:' : 'Game 1: Read the bubble & tap who it is:');
    const readBubblePrompt = isRu ? 'Игра 2: Посмотри на героя и прочитай его облачко!' : (isPl ? 'Gra 2: Spójrz na bohatera i wybierz właściwy dymek!' : 'Game 2: Look at the character & read their speech bubble!');
    const hintBtnLabel = isRu ? 'Подсказка' : (isPl ? 'Podpowiedź' : 'Hint');
    const newLabel = isRu ? 'Другой' : (isPl ? 'Inny' : 'New');

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
          <div class="kc-quiz-top">
            <div class="kc-quiz-title-wrap">
              <span class="kc-sec-title" style="margin:0">${readPrompt}</span>
              ${this._renderStreakBadge('onomatStreak', 5)}
            </div>
            <button class="kc-hint-audio-btn" id="kc-onomat-hint" title="${hintBtnLabel}">🔊 ${hintBtnLabel}</button>
          </div>
          <div class="kc-onomat-target-row">
            <div class="kc-giant-bubble">💬 ${this.onomatTarget.soundText}!</div>
          </div>
          <div class="kc-onomat-choices kc-choices-4" id="kc-onomat-options1">
            ${this.onomatOptions.map(opt => `
              <button class="kc-actor-choice ${this.onomatAnswered && opt.id === this.onomatTarget.id ? 'correct' : ''}" data-id="${opt.id}">
                <span class="kc-actor-emoji">${opt.emoji}</span>
                <span class="kc-actor-name">${opt.actor}</span>
              </button>
            `).join('')}
          </div>
        </div>

        ${this.onomatReadTarget ? `
          <div class="kc-card kc-onomat-quiz-box kc-game2-card">
            <div class="kc-quiz-top">
              <div class="kc-quiz-title-wrap">
                <span class="kc-sec-title" style="margin:0">${readBubblePrompt}</span>
                ${this._renderStreakBadge('onomatReadStreak', 5)}
              </div>
              <div class="kc-quiz-actions">
                <button class="kc-hint-audio-btn" id="kc-onomat-read-hint">🔊 ${hintBtnLabel}</button>
                <button class="kc-next-mini-btn" id="kc-onomat-read-next">↻ ${newLabel}</button>
              </div>
            </div>
            <div class="kc-onomat-actor-stage">
              <span class="kc-onomat-big-emoji">${this.onomatReadTarget.emoji}</span>
              <span class="kc-onomat-big-name">${this.onomatReadTarget.actor}</span>
            </div>
            <div class="kc-bubble-choices" id="kc-onomat-read-options">
              ${this.onomatReadOptions.map(opt => `
                <button class="kc-bubble-choice-btn ${this.onomatReadAnswered && opt.id === this.onomatReadTarget.id ? 'correct' : ''}" data-id="${opt.id}">
                  💬 ${opt.soundText}!
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `}
    `;
  }

  renderSyllablesHTML(sData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const group = sData.groups[this.selectedConsonantIdx] || sData.groups[0];
    const consKey = `${this.lang}_${group.c}`;
    const openDone = this.syllablesRewardedGroups.has(consKey);
    const closedDone = this.syllablesRewardedClosed.has(consKey);

    const openTitle = isRu ? 'Открытые слоги (прочитай все для +1 ⭐):' : (isPl ? 'Sylaby otwarte (przeczytaj wszystkie za +1 ⭐):' : 'Open syllables (tap all for +1 ⭐):');
    const closedTitle = isRu ? 'Закрытые слоги (прочитай все для +1 ⭐):' : (isPl ? 'Sylaby zamknięte (przeczytaj wszystkie za +1 ⭐):' : 'Closed syllables (tap all for +1 ⭐):');
    const wordsTitle = isRu ? 'Первые слова:' : (isPl ? 'Pierwsze słowa:' : 'First words:');
    const quizTitle = isRu ? '🎯 Игра 1: Поймай слог на слух!' : (isPl ? '🎯 Gra 1: Złap sylabę ze słuchu!' : '🎯 Game 1: Catch the spoken syllable!');
    const buildTitle = isRu ? '🧩 Игра 2: Собери слово по слогам!' : (isPl ? '🧩 Gra 2: Ułóż słowo z sylab!' : '🧩 Game 2: Build the word from syllables!');
    const listenLabel = isRu ? 'Слушать слог' : (isPl ? 'Posłuchaj sylaby' : 'Listen syllable');
    const listenWordLabel = isRu ? 'Послушать слово' : (isPl ? 'Posłuchaj słowa' : 'Listen word');
    const newLabel = isRu ? 'Другой' : (isPl ? 'Inna' : 'New');
    const bt = this.sylBuildTarget;

    return `
      <div class="kc-intro-banner">${sData.intro}</div>

      <div class="kc-consonant-bar">
        ${sData.groups.map((g, idx) => {
          const k = `${this.lang}_${g.c}`;
          const bothDone = this.syllablesRewardedGroups.has(k) && this.syllablesRewardedClosed.has(k);
          return `
            <button class="kc-cons-btn ${idx === this.selectedConsonantIdx ? 'active' : ''} ${bothDone ? 'done' : ''}" data-cons-idx="${idx}">
              ${g.c}
            </button>
          `;
        }).join('')}
      </div>

      <div class="kc-card ${(openDone && closedDone) ? 'kc-card-done' : ''}">
        <div class="kc-sec-title" id="kc-open-title">
          <span>${openTitle}</span>
          ${openDone ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
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

        <div class="kc-sec-title" id="kc-closed-title" style="margin-top:14px;">
          <span>${closedTitle}</span>
          ${closedDone ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
        </div>
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
              <span class="kc-mini-word-txt">${this.formatSyllableText(w.display)}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="kc-card kc-quiz-card">
        <div class="kc-quiz-top">
          <div class="kc-quiz-title-wrap">
            <span class="kc-sec-title" style="margin:0">${quizTitle}</span>
            ${this._renderStreakBadge('syllableStreak', 5)}
          </div>
          <div class="kc-quiz-actions">
            <button class="kc-audio-btn" id="kc-syl-speak">🔊 ${listenLabel}</button>
            <button class="kc-next-mini-btn" id="kc-syl-next">↻ ${newLabel}</button>
          </div>
        </div>
        <div class="kc-quiz-options-6" id="kc-syl-options">
          ${this.syllableQuizOptions.map(syl => `
            <button class="kc-quiz-pill ${this.syllableQuizAnswered && syl === this.syllableQuizTarget ? 'correct' : ''}" data-syl="${syl}">${syl}</button>
          `).join('')}
        </div>
      </div>

      ${bt ? `
        <div class="kc-card kc-quiz-card kc-game2-card">
          <div class="kc-quiz-top">
            <div class="kc-quiz-title-wrap">
              <span class="kc-sec-title" style="margin:0">${buildTitle}</span>
              ${this._renderStreakBadge('sylBuildStreak', 4)}
            </div>
            <div class="kc-quiz-actions">
              <button class="kc-audio-btn" id="kc-syl-build-speak">🔊 ${listenWordLabel}</button>
              <button class="kc-next-mini-btn" id="kc-syl-build-next">↻ ${newLabel}</button>
            </div>
          </div>
          <div class="kc-build-stage">
            <span class="kc-build-emoji">${bt.emoji}</span>
            <div class="kc-build-slots" id="kc-syl-build-slots">
              ${bt.syllables.map((s, idx) => `
                <div class="kc-build-slot ${idx < this.sylBuildFilledCount ? 'filled' : ''}">${idx < this.sylBuildFilledCount ? s : '___'}</div>
              `).join('<span class="kc-syl-dot" aria-hidden="true">·</span>')}
            </div>
          </div>
          <div class="kc-build-tiles" id="kc-syl-build-tiles">
            ${this.sylBuildTiles.map(tile => `
              <button class="kc-build-tile ${tile.used ? 'used' : ''}" data-tile-id="${tile.id}" data-syl="${tile.text}" ${tile.used ? 'disabled' : ''}>
                ${tile.text}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  renderDigraphsHTML(dData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const group = dData.groups[this.selectedDigraphIdx] || dData.groups[0];
    const digKey = `${this.lang}_dig_${group.id}`;
    const isDigDone = this.digraphRewardedGroups.has(digKey);

    const sylTapTitle = isRu ? `${group.title} (нажми все слоги для +1 ⭐)` : (isPl ? `${group.title} (kliknij wszystkie sylaby za +1 ⭐)` : `${group.title} (tap all syllables for +1 ⭐)`);
    const wordsTitle = isRu ? 'Слова с этим слиянием:' : (isPl ? 'Słowa z tym dźwiękiem:' : 'Words with this sound:');
    const quizTitle = isRu ? '🎯 Игра 1: Послушай слово и найди его!' : (isPl ? '🎯 Gra 1: Posłuchaj słowa i wskaż je!' : '🎯 Game 1: Listen & find the word!');
    const fillTitle = isRu ? '🧩 Игра 2: Вставь пропущенный слог!' : (isPl ? '🧩 Gra 2: Wstaw brakującą sylabę!' : '🧩 Game 2: Fill the missing syllable!');
    const listenLabel = isRu ? 'Послушать' : (isPl ? 'Posłuchaj' : 'Listen');
    const newLabel = isRu ? 'Новое' : (isPl ? 'Nowe' : 'New');
    const df = this.digFillTarget;

    return `
      <div class="kc-intro-banner">${dData.intro}</div>

      <div class="kc-consonant-bar">
        ${dData.groups.map((g, idx) => `
          <button class="kc-cons-btn wide ${idx === this.selectedDigraphIdx ? 'active' : ''} ${this.digraphRewardedGroups.has(`${this.lang}_dig_${g.id}`) ? 'done' : ''}" data-dig-idx="${idx}">
            ${g.label}
          </button>
        `).join('')}
      </div>

      <div class="kc-card ${isDigDone ? 'kc-card-done' : ''}">
        <div class="kc-sec-title" id="kc-dig-title">
          <span>${sylTapTitle}</span>
          ${isDigDone ? '<span class="primer-done-badge">⭐ +1</span>' : ''}
        </div>
        <div class="kc-digraph-tip">💡 ${group.tip}</div>
        <div class="kc-syl-row" style="margin-top:10px;">
          ${group.syllables.map(syl => {
            const walked = this.walkedDigraphSyllables.has(`${digKey}_${syl}`);
            return `
              <button class="kc-syl-stone open ${walked ? 'walked' : ''}" data-syl="${syl}">
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
              <span class="kc-mini-word-txt">${this.formatSyllableText(w.display)}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="kc-card kc-quiz-card">
        <div class="kc-quiz-top">
          <div class="kc-quiz-title-wrap">
            <span class="kc-sec-title" style="margin:0">${quizTitle}</span>
            ${this._renderStreakBadge('digraphStreak', 5)}
          </div>
          <div class="kc-quiz-actions">
            <button class="kc-audio-btn" id="kc-dig-speak">🔊 ${listenLabel}</button>
            <button class="kc-next-mini-btn" id="kc-dig-next">↻ ${newLabel}</button>
          </div>
        </div>
        <div class="kc-digraph-quiz-row kc-choices-4" id="kc-dig-options">
          ${this.digraphQuizOptions.map(opt => `
            <button class="kc-dig-choice-btn ${this.digraphQuizAnswered && opt.word === this.digraphQuizTarget?.word ? 'correct' : ''}" data-word="${opt.word}">
              <span class="kc-dig-emoji">${opt.emoji}</span>
              <span class="kc-dig-word">${opt.word}</span>
            </button>
          `).join('')}
        </div>
      </div>

      ${df ? `
        <div class="kc-card kc-quiz-card kc-game2-card">
          <div class="kc-quiz-top">
            <div class="kc-quiz-title-wrap">
              <span class="kc-sec-title" style="margin:0">${fillTitle}</span>
              ${this._renderStreakBadge('digFillStreak', 5)}
            </div>
            <div class="kc-quiz-actions">
              <button class="kc-audio-btn" id="kc-df-speak">🔊 ${listenLabel}</button>
              <button class="kc-next-mini-btn" id="kc-df-next">↻ ${newLabel}</button>
            </div>
          </div>
          <div class="kc-fill-stage">
            <span class="kc-fill-emoji">${df.emoji}</span>
            <div class="kc-fill-word">
              ${df.syllables.map((s, idx) => (
                idx === df.maskIdx
                  ? `<span class="kc-fill-blank ${this.digFillAnswered ? 'filled' : ''}">${this.digFillAnswered ? s : '___'}</span>`
                  : `<span class="kc-syl-part">${s}</span>`
              )).join('<span class="kc-syl-dot" aria-hidden="true">·</span>')}
            </div>
          </div>
          <div class="kc-quiz-options-4" id="kc-df-options">
            ${this.digFillOptions.map(syl => `
              <button class="kc-quiz-pill ${this.digFillAnswered && syl === df.missingSyl ? 'correct' : ''}" data-syl="${syl}">${syl}</button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  }

  renderSentencesHTML(senData) {
    const isRu = this.lang === 'ru';
    const isPl = this.lang === 'pl';
    const game1Title = isRu ? '🎯 Игра 1: Прочитай фразу и выбери картинку!' : (isPl ? '🎯 Gra 1: Przeczytaj zdanie i wskaż obrazek!' : '🎯 Game 1: Read & pick the picture!');
    const game2Title = isRu ? '🧩 Игра 2: Закончи фразу подходящим словом!' : (isPl ? '🧩 Gra 2: Dokończ zdanie właściwym słowem!' : '🧩 Game 2: Finish the sentence with the right word!');
    const hintLabel = isRu ? 'Послушать (если трудно)' : (isPl ? 'Posłuchaj (podpowiedź)' : 'Listen (hint)');
    const nextLabel = isRu ? 'Следующая фраза ➔' : (isPl ? 'Następne zdanie ➔' : 'Next story ➔');
    const sw = this.senWordItem;

    return `
      <div class="kc-intro-banner">${senData.intro}</div>

      <div class="kc-card kc-sentence-box">
        <div class="kc-quiz-top">
          <div class="kc-quiz-title-wrap">
            <span class="kc-sec-title" style="margin:0">${game1Title}</span>
            ${this._renderStreakBadge('sentenceStreak', 5)}
          </div>
          <button class="kc-hint-audio-btn" id="kc-sen-hint">🔊 ${hintLabel}</button>
        </div>

        <div class="kc-sentence-text">${this.formatSyllableText(this.sentenceItem.display)}</div>

        <div class="kc-sentence-options kc-choices-4" id="kc-sen-options">
          ${this.sentenceOptions.map(opt => `
            <button class="kc-sen-pic-btn ${this.sentenceAnswered && opt.isCorrect ? 'correct' : ''}" data-correct="${opt.isCorrect}">
              <span class="kc-sen-emoji">${opt.emoji}</span>
            </button>
          `).join('')}
        </div>

        <div class="kc-sen-feedback" id="kc-sen-feedback"></div>
        <div style="text-align:center; margin-top:12px;">
          <button class="kc-next-mini-btn" id="kc-sen-next">${nextLabel}</button>
        </div>
      </div>

      ${sw ? `
        <div class="kc-card kc-sentence-box kc-game2-card">
          <div class="kc-quiz-top">
            <div class="kc-quiz-title-wrap">
              <span class="kc-sec-title" style="margin:0">${game2Title}</span>
              ${this._renderStreakBadge('senWordStreak', 5)}
            </div>
            <button class="kc-hint-audio-btn" id="kc-sw-hint">🔊 ${hintLabel}</button>
          </div>

          <div class="kc-sentence-text kc-sen-fill-prompt">
            ${this.formatSyllableText(this.senWordPromptDisplay)}
            <span class="kc-sen-blank ${this.senWordAnswered ? 'filled' : ''}">${this.senWordAnswered ? this.formatSyllableText(this.senWordAnswer) : '_____'}</span>
          </div>

          <div class="kc-sen-word-choices" id="kc-sw-options">
            ${this.senWordOptions.map(opt => `
              <button class="kc-sen-word-btn ${this.senWordAnswered && opt.isCorrect ? 'correct' : ''}" data-correct="${opt.isCorrect}" data-spoken="${opt.spoken}">
                ${this.formatSyllableText(opt.display)}
              </button>
            `).join('')}
          </div>

          <div class="kc-sen-feedback" id="kc-sw-feedback"></div>
          <div style="text-align:center; margin-top:12px;">
            <button class="kc-next-mini-btn" id="kc-sw-next">${nextLabel}</button>
          </div>
        </div>
      ` : ''}
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
          const bonus = this._bumpStreak('vowelStreak', 5);
          this.onStarEarned(1 + bonus);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareVowelQuiz(true);
            this.render();
          }, 1300);
        } else {
          this.vowelStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });

    // Игра 2: Вставь гласную в слово
    const vwSpeak = this.container.querySelector('#kc-vw-speak');
    if (vwSpeak && this.vowelWordTarget) {
      vwSpeak.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.vowelWordTarget.word, this.lang);
      });
    }

    const vwNext = this.container.querySelector('#kc-vw-next');
    if (vwNext) {
      vwNext.addEventListener('click', () => {
        if (this.nextTimer2) { clearTimeout(this.nextTimer2); this.nextTimer2 = null; }
        sound.playLetterClick();
        this.prepareVowelWordGame();
        this.render();
      });
    }

    this.container.querySelectorAll('#kc-vw-options .kc-quiz-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.vowelWordAnswered || !this.vowelWordTarget) return;
        const letter = btn.dataset.letter;
        if (letter === this.vowelWordTarget.vowel) {
          this.vowelWordAnswered = true;
          btn.classList.add('correct');
          const blankEl = this.container.querySelector('.kc-vw-letters .kc-word-blank');
          if (blankEl) {
            blankEl.textContent = letter;
            blankEl.classList.add('filled');
          }
          sound.playSuccess();
          sound.speakWord(this.vowelWordTarget.word, this.lang);
          const bonus = this._bumpStreak('vowelWordStreak', 5);
          this.onStarEarned(1 + bonus);
          this.onWinEffect();
          if (this.nextTimer2) clearTimeout(this.nextTimer2);
          this.nextTimer2 = setTimeout(() => {
            this.nextTimer2 = null;
            this.prepareVowelWordGame();
            this.render();
          }, 1450);
        } else {
          this.vowelWordStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(btn.dataset.spoken, this.lang);
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
        if (!this.onomatReadTarget) this.prepareOnomatReadQuiz();
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

      this.container.querySelectorAll('#kc-onomat-options1 .kc-actor-choice').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.onomatAnswered) return;
          if (btn.dataset.id === this.onomatTarget.id) {
            this.onomatAnswered = true;
            btn.classList.add('correct');
            sound.playSuccess();
            sound.speakWord(this.onomatTarget.spoken, this.lang);
            const bonus = this._bumpStreak('onomatStreak', 5);
            this.onStarEarned(1 + bonus);
            this.onWinEffect();
            if (this.nextTimer) clearTimeout(this.nextTimer);
            this.nextTimer = setTimeout(() => {
              this.nextTimer = null;
              this.prepareOnomatQuiz();
              this.render();
            }, 1450);
          } else {
            this.onomatStreak = 0;
            btn.classList.add('wrong');
            sound.playError();
            setTimeout(() => btn.classList.remove('wrong'), 450);
          }
        });
      });

      // Игра 2: Выбери облачко звука для героя
      const readHintBtn = this.container.querySelector('#kc-onomat-read-hint');
      if (readHintBtn && this.onomatReadTarget) {
        readHintBtn.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakWord(this.onomatReadTarget.actor, this.lang);
        });
      }

      const readNextBtn = this.container.querySelector('#kc-onomat-read-next');
      if (readNextBtn) {
        readNextBtn.addEventListener('click', () => {
          if (this.nextTimer2) { clearTimeout(this.nextTimer2); this.nextTimer2 = null; }
          sound.playLetterClick();
          this.prepareOnomatReadQuiz();
          this.render();
        });
      }

      this.container.querySelectorAll('#kc-onomat-read-options .kc-bubble-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.onomatReadAnswered || !this.onomatReadTarget) return;
          if (btn.dataset.id === this.onomatReadTarget.id) {
            this.onomatReadAnswered = true;
            btn.classList.add('correct');
            sound.playSuccess();
            sound.speakWord(this.onomatReadTarget.spoken, this.lang);
            const bonus = this._bumpStreak('onomatReadStreak', 5);
            this.onStarEarned(1 + bonus);
            this.onWinEffect();
            if (this.nextTimer2) clearTimeout(this.nextTimer2);
            this.nextTimer2 = setTimeout(() => {
              this.nextTimer2 = null;
              this.prepareOnomatReadQuiz();
              this.render();
            }, 1450);
          } else {
            this.onomatReadStreak = 0;
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
        this.prepareSyllableBuild();
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

        // Проверяем раздельное прохождение открытых и закрытых слогов
        if (type === 'open' && !this.syllablesRewardedGroups.has(consKey)) {
          const allOpen = group.open.every(s => this.walkedSyllables.has(`${consKey}_open_${s}`));
          if (allOpen) {
            this.syllablesRewardedGroups.add(consKey);
            sound.playSuccess();
            this.onStarEarned(1);
            this.onWinEffect();
            const openTitleEl = this.container.querySelector('#kc-open-title');
            if (openTitleEl && !openTitleEl.querySelector('.primer-done-badge')) {
              openTitleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
            }
          }
        } else if (type === 'closed' && !this.syllablesRewardedClosed.has(consKey)) {
          const allClosed = group.closed.every(s => this.walkedSyllables.has(`${consKey}_closed_${s}`));
          if (allClosed) {
            this.syllablesRewardedClosed.add(consKey);
            sound.playSuccess();
            this.onStarEarned(1);
            this.onWinEffect();
            const closedTitleEl = this.container.querySelector('#kc-closed-title');
            if (closedTitleEl && !closedTitleEl.querySelector('.primer-done-badge')) {
              closedTitleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
            }
          }
        }

        if (this.syllablesRewardedGroups.has(consKey) && this.syllablesRewardedClosed.has(consKey)) {
          const consBtn = this.container.querySelector(`[data-cons-idx="${this.selectedConsonantIdx}"]`);
          if (consBtn) consBtn.classList.add('done');
          const cardEl = stone.closest('.kc-card');
          if (cardEl) cardEl.classList.add('kc-card-done');
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
          const bonus = this._bumpStreak('syllableStreak', 5);
          this.onStarEarned(1 + bonus);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareSyllableQuiz(true);
            this.render();
          }, 1350);
        } else {
          this.syllableStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(syl, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });

    // Игра 2: Собери слово по слогам
    const buildSpeak = this.container.querySelector('#kc-syl-build-speak');
    if (buildSpeak && this.sylBuildTarget) {
      buildSpeak.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.sylBuildTarget.word, this.lang);
      });
    }

    const buildNext = this.container.querySelector('#kc-syl-build-next');
    if (buildNext) {
      buildNext.addEventListener('click', () => {
        if (this.nextTimer2) { clearTimeout(this.nextTimer2); this.nextTimer2 = null; }
        sound.playLetterClick();
        this.prepareSyllableBuild();
        this.render();
      });
    }

    this.container.querySelectorAll('#kc-syl-build-tiles .kc-build-tile').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.sylBuildDone || !this.sylBuildTarget) return;
        const tileId = parseInt(btn.dataset.tileId, 10);
        const tileObj = this.sylBuildTiles.find(t => t.id === tileId);
        if (!tileObj || tileObj.used) return;

        const expectedSyl = this.sylBuildTarget.syllables[this.sylBuildFilledCount];
        if (btn.dataset.syl === expectedSyl) {
          tileObj.used = true;
          btn.classList.add('used');
          btn.disabled = true;

          const slotEls = this.container.querySelectorAll('#kc-syl-build-slots .kc-build-slot');
          const targetSlot = slotEls[this.sylBuildFilledCount];
          if (targetSlot) {
            targetSlot.textContent = expectedSyl;
            targetSlot.classList.add('filled');
          }
          this.sylBuildFilledCount += 1;

          if (this.sylBuildFilledCount >= this.sylBuildTarget.syllables.length) {
            this.sylBuildDone = true;
            sound.playSuccess();
            sound.speakWord(this.sylBuildTarget.word, this.lang);
            const bonus = this._bumpStreak('sylBuildStreak', 4);
            this.onStarEarned(2 + bonus);
            this.onWinEffect();
            if (this.nextTimer2) clearTimeout(this.nextTimer2);
            this.nextTimer2 = setTimeout(() => {
              this.nextTimer2 = null;
              this.prepareSyllableBuild();
              this.render();
            }, 1500);
          } else {
            sound.playLetterClick();
            sound.speakWord(expectedSyl, this.lang);
          }
        } else {
          this.sylBuildStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(btn.dataset.syl, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachDigraphEvents() {
    const groups = WORKBOOKS_DATA[this.lang].digraphs.groups;
    const group = groups[this.selectedDigraphIdx] || groups[0];
    const digKey = `${this.lang}_dig_${group.id}`;

    this.container.querySelectorAll('[data-dig-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.stop();
        sound.playLetterClick();
        this.selectedDigraphIdx = parseInt(btn.dataset.digIdx, 10);
        this.prepareDigraphQuiz(false);
        this.prepareDigraphFill();
        this.render();
      });
    });

    this.container.querySelectorAll('.kc-syl-stone').forEach(btn => {
      btn.addEventListener('click', () => {
        const syl = btn.dataset.syl;
        sound.playLetterClick();
        sound.speakWord(syl, this.lang);

        this.walkedDigraphSyllables.add(`${digKey}_${syl}`);
        btn.classList.add('walked');
        const markEl = btn.querySelector('.kc-syl-mark');
        if (markEl) markEl.textContent = '✓';

        if (!this.digraphRewardedGroups.has(digKey)) {
          const allDone = group.syllables.every(s => this.walkedDigraphSyllables.has(`${digKey}_${s}`));
          if (allDone) {
            this.digraphRewardedGroups.add(digKey);
            sound.playSuccess();
            this.onStarEarned(1);
            this.onWinEffect();
            const digBtn = this.container.querySelector(`[data-dig-idx="${this.selectedDigraphIdx}"]`);
            if (digBtn) digBtn.classList.add('done');
            const cardEl = btn.closest('.kc-card');
            if (cardEl) cardEl.classList.add('kc-card-done');
            const titleEl = this.container.querySelector('#kc-dig-title');
            if (titleEl && !titleEl.querySelector('.primer-done-badge')) {
              titleEl.insertAdjacentHTML('beforeend', '<span class="primer-done-badge">⭐ +1</span>');
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
          const bonus = this._bumpStreak('digraphStreak', 5);
          this.onStarEarned(1 + bonus);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareDigraphQuiz(true);
            this.render();
          }, 1450);
        } else {
          this.digraphStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(word, this.lang);
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });

    // Игра 2: Вставь пропущенный слог
    const dfSpeak = this.container.querySelector('#kc-df-speak');
    if (dfSpeak && this.digFillTarget) {
      dfSpeak.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(this.digFillTarget.word, this.lang);
      });
    }

    const dfNext = this.container.querySelector('#kc-df-next');
    if (dfNext) {
      dfNext.addEventListener('click', () => {
        if (this.nextTimer2) { clearTimeout(this.nextTimer2); this.nextTimer2 = null; }
        sound.playLetterClick();
        this.prepareDigraphFill();
        this.render();
      });
    }

    this.container.querySelectorAll('#kc-df-options .kc-quiz-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.digFillAnswered || !this.digFillTarget) return;
        const syl = btn.dataset.syl;
        if (syl === this.digFillTarget.missingSyl) {
          this.digFillAnswered = true;
          btn.classList.add('correct');
          const blankEl = this.container.querySelector('.kc-fill-word .kc-fill-blank');
          if (blankEl) {
            blankEl.textContent = syl;
            blankEl.classList.add('filled');
          }
          sound.playSuccess();
          sound.speakWord(this.digFillTarget.word, this.lang);
          const bonus = this._bumpStreak('digFillStreak', 5);
          this.onStarEarned(1 + bonus);
          this.onWinEffect();
          if (this.nextTimer2) clearTimeout(this.nextTimer2);
          this.nextTimer2 = setTimeout(() => {
            this.nextTimer2 = null;
            this.prepareDigraphFill();
            this.render();
          }, 1450);
        } else {
          this.digFillStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(syl, this.lang);
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
          const bonus = this._bumpStreak('sentenceStreak', 5);
          if (feedbackEl) {
            const total = 2 + bonus;
            feedbackEl.textContent = isRu ? `🎉 Отлично прочитано! +${total} ⭐` : (isPl ? `🎉 Świetnie przeczytane! +${total} ⭐` : `🎉 Great reading! +${total} ⭐`);
            feedbackEl.style.color = '#10b981';
          }
          this.onStarEarned(2 + bonus);
          this.onWinEffect();
          if (this.nextTimer) clearTimeout(this.nextTimer);
          this.nextTimer = setTimeout(() => {
            this.nextTimer = null;
            this.prepareSentenceRound();
            this.render();
          }, 1850);
        } else {
          this.sentenceStreak = 0;
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

    // Игра 2: Закончи фразу словом по смыслу
    const swHintBtn = this.container.querySelector('#kc-sw-hint');
    if (swHintBtn && this.senWordItem) {
      swHintBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakPhrase(this.senWordItem.spoken, this.lang);
      });
    }

    const swNextBtn = this.container.querySelector('#kc-sw-next');
    if (swNextBtn) {
      swNextBtn.addEventListener('click', () => {
        if (this.nextTimer2) { clearTimeout(this.nextTimer2); this.nextTimer2 = null; }
        sound.playLetterClick();
        this.prepareSentenceWordFill();
        this.render();
      });
    }

    const swFeedbackEl = this.container.querySelector('#kc-sw-feedback');
    this.container.querySelectorAll('#kc-sw-options .kc-sen-word-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.senWordAnswered || !this.senWordItem) return;
        const isCorrect = btn.dataset.correct === 'true';
        if (isCorrect) {
          this.senWordAnswered = true;
          btn.classList.add('correct');
          const blankEl = this.container.querySelector('.kc-sen-fill-prompt .kc-sen-blank');
          if (blankEl) {
            blankEl.innerHTML = this.formatSyllableText(this.senWordAnswer);
            blankEl.classList.add('filled');
          }
          sound.playSuccess();
          sound.speakPhrase(this.senWordItem.spoken, this.lang);
          const bonus = this._bumpStreak('senWordStreak', 5);
          if (swFeedbackEl) {
            const total = 2 + bonus;
            swFeedbackEl.textContent = isRu ? `🎉 Верно! Фраза собрана! +${total} ⭐` : (isPl ? `🎉 Brawo! Zdanie gotowe! +${total} ⭐` : `🎉 Awesome! Sentence complete! +${total} ⭐`);
            swFeedbackEl.style.color = '#10b981';
          }
          this.onStarEarned(2 + bonus);
          this.onWinEffect();
          if (this.nextTimer2) clearTimeout(this.nextTimer2);
          this.nextTimer2 = setTimeout(() => {
            this.nextTimer2 = null;
            this.prepareSentenceWordFill();
            this.render();
          }, 1850);
        } else {
          this.senWordStreak = 0;
          btn.classList.add('wrong');
          sound.playError();
          sound.speakWord(btn.dataset.spoken, this.lang);
          if (swFeedbackEl) {
            swFeedbackEl.textContent = isRu ? 'Это слово не подходит, попробуй другое!' : (isPl ? 'To słowo nie pasuje, spróbuj inne!' : 'Not that word, try another one!');
            swFeedbackEl.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }
}
