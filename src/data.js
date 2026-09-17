// Словари для обучающей игры: Русский и Польский (с полной поддержкой всех польских букв)

export const POLISH_ALPHABET = [
  'A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł',
  'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'
];

export const RUSSIAN_ALPHABET = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О',
  'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
];

export const ENGLISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Данные интерактивной Азбуки для 4.5 лет: Буква, Эмодзи, Слово-ассоциация
export const ALPHABET_DATA = {
  ru: [
    { letter: 'А', emoji: '🍉', word: 'Арбуз' },
    { letter: 'Б', emoji: '🍌', word: 'Банан' },
    { letter: 'В', emoji: '🐺', word: 'Волк' },
    { letter: 'Г', emoji: '🍄', word: 'Гриб' },
    { letter: 'Д', emoji: '🏠', word: 'Дом' },
    { letter: 'Е', emoji: '🌲', word: 'Ель' },
    { letter: 'Ё', emoji: '🦔', word: 'Ёжик' },
    { letter: 'Ж', emoji: '🪲', word: 'Жук' },
    { letter: 'З', emoji: '🐰', word: 'Заяц' },
    { letter: 'И', emoji: '🧸', word: 'Игрушка' },
    { letter: 'Й', emoji: '🍦', word: 'Йогурт' },
    { letter: 'К', emoji: '🐱', word: 'Кот' },
    { letter: 'Л', emoji: '🦁', word: 'Лев' },
    { letter: 'М', emoji: '🐻', word: 'Мишка' },
    { letter: 'Н', emoji: '👃', word: 'Нос' },
    { letter: 'О', emoji: '🏝️', word: 'Остров' },
    { letter: 'П', emoji: '🐦', word: 'Птица' },
    { letter: 'Р', emoji: '🐟', word: 'Рыба' },
    { letter: 'С', emoji: '🐘', word: 'Слон' },
    { letter: 'Т', emoji: '🐯', word: 'Тигр' },
    { letter: 'У', emoji: '🦆', word: 'Утка' },
    { letter: 'Ф', emoji: '🚩', word: 'Флаг' },
    { letter: 'Х', emoji: '🍞', word: 'Хлеб' },
    { letter: 'Ц', emoji: '🌸', word: 'Цветок' },
    { letter: 'Ч', emoji: '🐢', word: 'Черепаха' },
    { letter: 'Ш', emoji: '🎈', word: 'Шарик' },
    { letter: 'Щ', emoji: '🪥', word: 'Щетка' },
    { letter: 'Ъ', emoji: '🏢', word: 'Подъезд' },
    { letter: 'Ы', emoji: '🧀', word: 'Сыр' },
    { letter: 'Ь', emoji: '🐴', word: 'Конь' },
    { letter: 'Э', emoji: '🚜', word: 'Экскаватор' },
    { letter: 'Ю', emoji: '👗', word: 'Юбка' },
    { letter: 'Я', emoji: '🍎', word: 'Яблоко' }
  ],
  pl: [
    { letter: 'A', emoji: '🍉', word: 'Arbuz' },
    { letter: 'Ą', emoji: '🐍', word: 'Wąż' },
    { letter: 'B', emoji: '🎈', word: 'Balon' },
    { letter: 'C', emoji: '🍋', word: 'Cytryna' },
    { letter: 'Ć', emoji: '🍂', word: 'Liść' },
    { letter: 'D', emoji: '🏠', word: 'Dom' },
    { letter: 'E', emoji: '📺', word: 'Ekran' },
    { letter: 'Ę', emoji: '✋', word: 'Ręka' },
    { letter: 'F', emoji: '🦭', word: 'Foka' },
    { letter: 'G', emoji: '🍄', word: 'Grzyb' },
    { letter: 'H', emoji: '🍵', word: 'Herbata' },
    { letter: 'I', emoji: '🪡', word: 'Igła' },
    { letter: 'J', emoji: '🍎', word: 'Jabłko' },
    { letter: 'K', emoji: '🐱', word: 'Kot' },
    { letter: 'L', emoji: '🦊', word: 'Lis' },
    { letter: 'Ł', emoji: '⛵', word: 'Łódź' },
    { letter: 'M', emoji: '🧸', word: 'Miś' },
    { letter: 'N', emoji: '👃', word: 'Nos' },
    { letter: 'Ń', emoji: '🐎', word: 'Koń' },
    { letter: 'O', emoji: '🌻', word: 'Ogród' },
    { letter: 'Ó', emoji: '🐢', word: 'Żółw' },
    { letter: 'P', emoji: '🐶', word: 'Pies' },
    { letter: 'R', emoji: '🐟', word: 'Ryba' },
    { letter: 'S', emoji: '🧀', word: 'Ser' },
    { letter: 'Ś', emoji: '❄️', word: 'Śnieg' },
    { letter: 'T', emoji: '🎂', word: 'Tort' },
    { letter: 'U', emoji: '👂', word: 'Ucho' },
    { letter: 'W', emoji: '💧', word: 'Woda' },
    { letter: 'Y', emoji: '🦋', word: 'Motyl' },
    { letter: 'Z', emoji: '🏰', word: 'Zamek' },
    { letter: 'Ź', emoji: '🐴', word: 'Źrebię' },
    { letter: 'Ż', emoji: '🐸', word: 'Żaba' }
  ],
  en: [
    { letter: 'A', emoji: '🍎', word: 'Apple' },
    { letter: 'B', emoji: '🐻', word: 'Bear' },
    { letter: 'C', emoji: '🐱', word: 'Cat' },
    { letter: 'D', emoji: '🐶', word: 'Dog' },
    { letter: 'E', emoji: '🐘', word: 'Elephant' },
    { letter: 'F', emoji: '🐟', word: 'Fish' },
    { letter: 'G', emoji: '🦒', word: 'Giraffe' },
    { letter: 'H', emoji: '🏠', word: 'House' },
    { letter: 'I', emoji: '🍦', word: 'Ice cream' },
    { letter: 'J', emoji: '🧃', word: 'Juice' },
    { letter: 'K', emoji: '🪁', word: 'Kite' },
    { letter: 'L', emoji: '🦁', word: 'Lion' },
    { letter: 'M', emoji: '🐵', word: 'Monkey' },
    { letter: 'N', emoji: '👃', word: 'Nose' },
    { letter: 'O', emoji: '🍊', word: 'Orange' },
    { letter: 'P', emoji: '🐼', word: 'Panda' },
    { letter: 'Q', emoji: '👑', word: 'Queen' },
    { letter: 'R', emoji: '🚀', word: 'Rocket' },
    { letter: 'S', emoji: '☀️', word: 'Sun' },
    { letter: 'T', emoji: '🐯', word: 'Tiger' },
    { letter: 'U', emoji: '☂️', word: 'Umbrella' },
    { letter: 'V', emoji: '🎻', word: 'Violin' },
    { letter: 'W', emoji: '🐺', word: 'Wolf' },
    { letter: 'X', emoji: '📦', word: 'Fox / Box' },
    { letter: 'Y', emoji: '🪀', word: 'Yo-yo' },
    { letter: 'Z', emoji: '🦓', word: 'Zebra' }
  ]
};

// Гласные для цветового кодирования (гласные - розово-красные, согласные - сине-голубые)
export const VOWELS = {
  ru: new Set(['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я']),
  pl: new Set(['A', 'Ą', 'E', 'Ę', 'I', 'O', 'Ó', 'U', 'Y']),
  en: new Set(['A', 'E', 'I', 'O', 'U', 'Y'])
};

export const WORDS_DATA = {
  "ru": [
    {
      "word": "КОТ",
      "emoji": "🐱",
      "hint": "Мяукает и мурлычет"
    },
    {
      "word": "ДОМ",
      "emoji": "🏠",
      "hint": "В нем уютно и тепло"
    },
    {
      "word": "ЛЕС",
      "emoji": "🌲",
      "hint": "Там растут деревья и грибы"
    },
    {
      "word": "СЫР",
      "emoji": "🧀",
      "hint": "Желтый и вкусный"
    },
    {
      "word": "МЯЧ",
      "emoji": "⚽",
      "hint": "Круглый, можно пинать"
    },
    {
      "word": "ЖУК",
      "emoji": "🪲",
      "hint": "Жужжит в траве"
    },
    {
      "word": "НОС",
      "emoji": "👃",
      "hint": "Им мы нюхаем запахи"
    },
    {
      "word": "РОТ",
      "emoji": "👄",
      "hint": "Им мы кушаем и улыбаемся"
    },
    {
      "word": "СОК",
      "emoji": "🧃",
      "hint": "Сладкий фруктовый напиток"
    },
    {
      "word": "ЧАЙ",
      "emoji": "🍵",
      "hint": "Теплый вкусный напиток"
    },
    {
      "word": "СУП",
      "emoji": "🍲",
      "hint": "Горячий обед в тарелке"
    },
    {
      "word": "ДЕД",
      "emoji": "👴",
      "hint": "Любимый дедушка"
    },
    {
      "word": "МЕД",
      "emoji": "🍯",
      "hint": "Сладкое лакомство пчел"
    },
    {
      "word": "ЛУК",
      "emoji": "🧅",
      "hint": "От него щиплет глазки"
    },
    {
      "word": "ЛЕВ",
      "emoji": "🦁",
      "hint": "Царь зверей с гривой"
    },
    {
      "word": "ПОЛ",
      "emoji": "🧹",
      "hint": "По нему мы ходим дома"
    },
    {
      "word": "МУХА",
      "emoji": "🪰",
      "hint": "Летает и жужжит"
    },
    {
      "word": "ЛАПА",
      "emoji": "🐾",
      "hint": "Пушистая лапка котика или собачки"
    },
    {
      "word": "МАМА",
      "emoji": "👩",
      "hint": "Самый дорогой человек"
    },
    {
      "word": "ПАПА",
      "emoji": "👨",
      "hint": "Любимый папа"
    },
    {
      "word": "ВОДА",
      "emoji": "💧",
      "hint": "Ее мы пьем каждый день"
    },
    {
      "word": "ХЛЕБ",
      "emoji": "🍞",
      "hint": "Свежий и мягкий"
    },
    {
      "word": "СТОЛ",
      "emoji": "🪑",
      "hint": "За ним мы кушаем и рисуем"
    },
    {
      "word": "СТУЛ",
      "emoji": "🪑",
      "hint": "На нем мы сидим"
    },
    {
      "word": "ОКНО",
      "emoji": "🪟",
      "hint": "Смотрим через него на улицу"
    },
    {
      "word": "КАША",
      "emoji": "🥣",
      "hint": "Вкусный полезный завтрак"
    },
    {
      "word": "РУКА",
      "emoji": "✋",
      "hint": "Ей мы держим ложку и рисуем"
    },
    {
      "word": "НОГА",
      "emoji": "🦵",
      "hint": "Шагает по дорожке"
    },
    {
      "word": "МЫЛО",
      "emoji": "🧼",
      "hint": "Моет ручки до скрипа"
    },
    {
      "word": "ЧАСЫ",
      "emoji": "⏰",
      "hint": "Тикают и показывают время"
    },
    {
      "word": "ДЕТИ",
      "emoji": "👧",
      "hint": "Весело играют вместе"
    },
    {
      "word": "ШКАФ",
      "emoji": "🚪",
      "hint": "В нем висит одежда"
    },
    {
      "word": "РЫБА",
      "emoji": "🐟",
      "hint": "Плавает в воде"
    },
    {
      "word": "ЛИСА",
      "emoji": "🦊",
      "hint": "Рыжая плутовка"
    },
    {
      "word": "ВОЛК",
      "emoji": "🐺",
      "hint": "Серый лесной житель"
    },
    {
      "word": "УТКА",
      "emoji": "🦆",
      "hint": "Кря-кря"
    },
    {
      "word": "ЛУНА",
      "emoji": "🌙",
      "hint": "Светит ночью на небе"
    },
    {
      "word": "СЛОН",
      "emoji": "🐘",
      "hint": "Большой добрый великан"
    },
    {
      "word": "ГРИБ",
      "emoji": "🍄",
      "hint": "Растет в лесу под елкой"
    },
    {
      "word": "ЗИМА",
      "emoji": "❄️",
      "hint": "Время снега и санок"
    },
    {
      "word": "ЛЕТО",
      "emoji": "☀️",
      "hint": "Жаркое солнечное время"
    },
    {
      "word": "НЕБО",
      "emoji": "☁️",
      "hint": "Синее над головой"
    },
    {
      "word": "СНЕГ",
      "emoji": "⛄",
      "hint": "Белый и пушистый"
    },
    {
      "word": "РОЗА",
      "emoji": "🌹",
      "hint": "Красивый цветок с шипами"
    },
    {
      "word": "ЛОЖКА",
      "emoji": "🥄",
      "hint": "Ей мы кушаем кашу и суп"
    },
    {
      "word": "ЧАШКА",
      "emoji": "☕",
      "hint": "Из нее пьем чай или какао"
    },
    {
      "word": "ВИЛКА",
      "emoji": "🍴",
      "hint": "Помогает кушать макароны"
    },
    {
      "word": "ДВЕРЬ",
      "emoji": "🚪",
      "hint": "Вход в теплую комнату"
    },
    {
      "word": "КУКЛА",
      "emoji": "🪆",
      "hint": "Любимая игрушка"
    },
    {
      "word": "ШАПКА",
      "emoji": "🧢",
      "hint": "Надеваем на голову на прогулку"
    },
    {
      "word": "КУРТКА",
      "emoji": "🧥",
      "hint": "Греет нас на улице"
    },
    {
      "word": "НОСКИ",
      "emoji": "🧦",
      "hint": "Мягкие и теплые на ножках"
    },
    {
      "word": "ШКОЛА",
      "emoji": "🎒",
      "hint": "Там учатся и находят друзей"
    },
    {
      "word": "КОШКА",
      "emoji": "🐈",
      "hint": "Ласковый пушистый друг"
    },
    {
      "word": "СОБАКА",
      "emoji": "🐶",
      "hint": "Преданный друг, виляет хвостом"
    },
    {
      "word": "ЯБЛОКО",
      "emoji": "🍎",
      "hint": "Сочное, хрустящее и сладкое"
    },
    {
      "word": "БАНАН",
      "emoji": "🍌",
      "hint": "Желтый и сладкий фрукт"
    },
    {
      "word": "СОЛНЦЕ",
      "emoji": "☀️",
      "hint": "Дарит свет и тепло"
    },
    {
      "word": "КНИГА",
      "emoji": "📖",
      "hint": "В ней много картинок и сказок"
    },
    {
      "word": "ПОЕЗД",
      "emoji": "🚂",
      "hint": "Чух-чух, едет по рельсам"
    },
    {
      "word": "МАШИНА",
      "emoji": "🚗",
      "hint": "Едет по дороге, би-би"
    },
    {
      "word": "ЛОДКА",
      "emoji": "🛶",
      "hint": "Плывет по озеру"
    },
    {
      "word": "ТРАВА",
      "emoji": "🌱",
      "hint": "Зеленый ковер во дворе"
    },
    {
      "word": "ПТИЦА",
      "emoji": "🐦",
      "hint": "Поет звонкие песенки"
    },
    {
      "word": "ВИШНЯ",
      "emoji": "🍒",
      "hint": "Сладкая спелая ягода"
    },
    {
      "word": "ДОЖДЬ",
      "emoji": "🌧️",
      "hint": "Капает с неба на зонтик"
    },
    {
      "word": "ШАРИК",
      "emoji": "🎈",
      "hint": "Летит высоко в воздух"
    },
    {
      "word": "ЗАЙКА",
      "emoji": "🐰",
      "hint": "Прыг-скок с длинными ушками"
    },
    {
      "word": "ЕСТ",
      "emoji": "🍽️",
      "hint": "Кушает вкусный обед"
    },
    {
      "word": "СПИТ",
      "emoji": "😴",
      "hint": "Отдыхает с закрытыми глазками"
    },
    {
      "word": "ПЬЕТ",
      "emoji": "🧃",
      "hint": "Пьет сок или воду"
    },
    {
      "word": "ПОЕТ",
      "emoji": "🎤",
      "hint": "Поет красивую песенку"
    },
    {
      "word": "ИДЕТ",
      "emoji": "🚶",
      "hint": "Шагает ножками по дорожке"
    },
    {
      "word": "МОЕТ",
      "emoji": "🧼",
      "hint": "Моет ручки мылом до скрипа"
    },
    {
      "word": "БЕЖИТ",
      "emoji": "🏃",
      "hint": "Быстро мчит наперегонки"
    },
    {
      "word": "СИДИТ",
      "emoji": "🪑",
      "hint": "Сидит на стульчике"
    },
    {
      "word": "ЛЕТИТ",
      "emoji": "✈️",
      "hint": "Летит высоко в небе как птица"
    },
    {
      "word": "ПЛЫВЕТ",
      "emoji": "🏊",
      "hint": "Плывет в чистой воде"
    },
    {
      "word": "ИГРАЕТ",
      "emoji": "⚽",
      "hint": "Весело играет в мяч"
    },
    {
      "word": "ЧИТАЕТ",
      "emoji": "📖",
      "hint": "Читает интересную книжку"
    },
    {
      "word": "ПРЫГАЕТ",
      "emoji": "🦘",
      "hint": "Прыгает высоко как зайка"
    }
  ],
  "pl": [
    {
      "word": "KOT",
      "emoji": "🐱",
      "hint": "Mruczy i łapie myszy"
    },
    {
      "word": "DOM",
      "emoji": "🏠",
      "hint": "Nasz ciepły dom"
    },
    {
      "word": "LAS",
      "emoji": "🌲",
      "hint": "Rosną w nim drzewa"
    },
    {
      "word": "SER",
      "emoji": "🧀",
      "hint": "Żółty i pyszny"
    },
    {
      "word": "SOK",
      "emoji": "🧃",
      "hint": "Słodki napój z owoców"
    },
    {
      "word": "LIS",
      "emoji": "🦊",
      "hint": "Rudy spryciarz w lesie"
    },
    {
      "word": "KOŃ",
      "emoji": "🐎",
      "hint": "Biega kłusem i rży (litera Ń)"
    },
    {
      "word": "MIŚ",
      "emoji": "🧸",
      "hint": "Pluszowy przyjaciel (litera Ś)"
    },
    {
      "word": "WĄŻ",
      "emoji": "🐍",
      "hint": "Długi, syczy w trawie (litery Ą, Ż)"
    },
    {
      "word": "LÓD",
      "emoji": "🧊",
      "hint": "Zimny jak zima (litera Ó)"
    },
    {
      "word": "BUT",
      "emoji": "👟",
      "hint": "Wygodny na spacer"
    },
    {
      "word": "KOC",
      "emoji": "🛋️",
      "hint": "Ciepły do przykrycia"
    },
    {
      "word": "NOS",
      "emoji": "👃",
      "hint": "Czuje zapach ciasta"
    },
    {
      "word": "PAS",
      "emoji": "🥋",
      "hint": "Zapinamy w aucie"
    },
    {
      "word": "OKO",
      "emoji": "👁️",
      "hint": "Patrzy i widzi wszystko"
    },
    {
      "word": "MAMA",
      "emoji": "👩",
      "hint": "Najukochańsza mama"
    },
    {
      "word": "TATA",
      "emoji": "👨",
      "hint": "Najlepszy tata"
    },
    {
      "word": "PIES",
      "emoji": "🐶",
      "hint": "Wierny przyjaciel człowieka"
    },
    {
      "word": "WODA",
      "emoji": "💧",
      "hint": "Pyszna i zdrowa do picia"
    },
    {
      "word": "STÓŁ",
      "emoji": "🪑",
      "hint": "Jemy przy nim obiad (litery Ó, Ł!)"
    },
    {
      "word": "RĘKA",
      "emoji": "✋",
      "hint": "Rysuje i macha na powitanie (litera Ę)"
    },
    {
      "word": "NOGA",
      "emoji": "🦵",
      "hint": "Biega i skacze wysoko"
    },
    {
      "word": "OKNO",
      "emoji": "🪟",
      "hint": "Widać przez nie słońce"
    },
    {
      "word": "ZUPA",
      "emoji": "🍲",
      "hint": "Ciepła i smaczna na obiad"
    },
    {
      "word": "BUTY",
      "emoji": "👟",
      "hint": "Wkładamy przed wyjściem"
    },
    {
      "word": "OCZY",
      "emoji": "👀",
      "hint": "Widzą cały piękny świat"
    },
    {
      "word": "USZY",
      "emoji": "👂",
      "hint": "Słuchają bajek i muzyki"
    },
    {
      "word": "AUTO",
      "emoji": "🚗",
      "hint": "Jedzie szybko po drodze"
    },
    {
      "word": "MYSZ",
      "emoji": "🐭",
      "hint": "Mała, szara, lubi ser (litery SZ)"
    },
    {
      "word": "KOŁO",
      "emoji": "🛞",
      "hint": "Kręci się w rowerze (litera Ł)"
    },
    {
      "word": "ZĄB",
      "emoji": "🦷",
      "hint": "Myjemy rano i wieczorem (litera Ą)"
    },
    {
      "word": "DĄB",
      "emoji": "🌳",
      "hint": "Mocarne drzewo w lesie (litera Ą)"
    },
    {
      "word": "LIŚĆ",
      "emoji": "🍂",
      "hint": "Spada z drzewa jesienią (litery Ś, Ć)"
    },
    {
      "word": "RYBA",
      "emoji": "🐟",
      "hint": "Pływa szybko w wodzie"
    },
    {
      "word": "WILK",
      "emoji": "🐺",
      "hint": "Wyje do księżyca"
    },
    {
      "word": "PTAK",
      "emoji": "🐦",
      "hint": "Śpiewa rano na gałęzi"
    },
    {
      "word": "ŻABA",
      "emoji": "🐸",
      "hint": "Kumka wesoło w stawie (litera Ż)"
    },
    {
      "word": "ŻÓŁW",
      "emoji": "🐢",
      "hint": "Chodzi powoli w pancerzu (Ż, Ó, Ł!)"
    },
    {
      "word": "ŁÓDŹ",
      "emoji": "⛵",
      "hint": "Płynie po jeziorze (Ł, Ó, Ź!)"
    },
    {
      "word": "LATO",
      "emoji": "☀️",
      "hint": "Ciepła i słoneczna pora"
    },
    {
      "word": "ZIMA",
      "emoji": "❄️",
      "hint": "Czas na bałwana i sanki"
    },
    {
      "word": "RÓŻA",
      "emoji": "🌹",
      "hint": "Piękny pachnący kwiat (litery Ó, Ż)"
    },
    {
      "word": "GÓRA",
      "emoji": "⛰️",
      "hint": "Wysoka ze śniegiem (litera Ó)"
    },
    {
      "word": "KOZA",
      "emoji": "🐐",
      "hint": "Lubi skakać po łące"
    },
    {
      "word": "ŁÓŻKO",
      "emoji": "🛏️",
      "hint": "Ciepłe do spania (litery Ł, Ó, Ż!)"
    },
    {
      "word": "KUBEK",
      "emoji": "🥛",
      "hint": "Pijemy z niego mleko i herbatę"
    },
    {
      "word": "ŁYŻKA",
      "emoji": "🥄",
      "hint": "Jemy nią pyszną zupę (litery Ł, Ż)"
    },
    {
      "word": "CZAPKA",
      "emoji": "🧢",
      "hint": "Chroni głowę przed zimnem"
    },
    {
      "word": "PIŁKA",
      "emoji": "⚽",
      "hint": "Gramy nią wesoło w ogrodzie (litera Ł)"
    },
    {
      "word": "LALKA",
      "emoji": "🪆",
      "hint": "Ulubiona zabawka"
    },
    {
      "word": "SZKOŁA",
      "emoji": "🏫",
      "hint": "Uczymy się tam i bawimy (litera Ł)"
    },
    {
      "word": "PLECAK",
      "emoji": "🎒",
      "hint": "Pakujemy do niego skarby"
    },
    {
      "word": "KANAPKA",
      "emoji": "🥪",
      "hint": "Pyszne drugie śniadanie"
    },
    {
      "word": "MLEKO",
      "emoji": "🥛",
      "hint": "Białe i zdrowe"
    },
    {
      "word": "SPODNIE",
      "emoji": "👖",
      "hint": "Wygodne ubranie na co dzień"
    },
    {
      "word": "ROWER",
      "emoji": "🚲",
      "hint": "Jeździmy nim po parku"
    },
    {
      "word": "CHLEB",
      "emoji": "🍞",
      "hint": "Pachnący ze złocistą skórką"
    },
    {
      "word": "KROWA",
      "emoji": "🐄",
      "hint": "Daje świeże mleko"
    },
    {
      "word": "JABŁKO",
      "emoji": "🍎",
      "hint": "Czerwone i soczyste (litera Ł)"
    },
    {
      "word": "SŁOŃCE",
      "emoji": "🌞",
      "hint": "Świeci wysoko na niebie (litery Ł, Ń)"
    },
    {
      "word": "KSIĄŻKA",
      "emoji": "📖",
      "hint": "Czytamy z niej ciekawe bajki (litery Ą, Ż)"
    },
    {
      "word": "BAŁWAN",
      "emoji": "⛄",
      "hint": "Ulepiony ze śniegu (litera Ł)"
    },
    {
      "word": "SERCE",
      "emoji": "❤️",
      "hint": "Bije mocno z miłości"
    },
    {
      "word": "DRZEWO",
      "emoji": "🌳",
      "hint": "Zielone i wysokie w parku"
    },
    {
      "word": "ŚNIEG",
      "emoji": "🌨️",
      "hint": "Biały puch w zimie (litera Ś)"
    },
    {
      "word": "MOTYL",
      "emoji": "🦋",
      "hint": "Kolorowy na łące"
    },
    {
      "word": "POCIĄG",
      "emoji": "🚂",
      "hint": "Jedzie szybko po torach (litera Ą)"
    },
    {
      "word": "ZAJĄC",
      "emoji": "🐇",
      "hint": "Kica po zielonej trawie (litera Ą)"
    },
    {
      "word": "ŚPI",
      "emoji": "😴",
      "hint": "Śpi słodko w ciepłym łóżeczku"
    },
    {
      "word": "MYJE",
      "emoji": "🧼",
      "hint": "Myje rączki mydłem"
    },
    {
      "word": "PIJE",
      "emoji": "🧃",
      "hint": "Pije pyszny sok lub wodę"
    },
    {
      "word": "LECI",
      "emoji": "✈️",
      "hint": "Leci wysoko w niebie"
    },
    {
      "word": "BIEGA",
      "emoji": "🏃",
      "hint": "Biega szybko po zielonej trawie"
    },
    {
      "word": "CZYTA",
      "emoji": "📖",
      "hint": "Czyta piękną bajkę"
    },
    {
      "word": "SKACZE",
      "emoji": "🦘",
      "hint": "Skacze wysoko jak zajączek"
    },
    {
      "word": "PŁYWA",
      "emoji": "🏊",
      "hint": "Pływa wesoło w basenie"
    },
    {
      "word": "ŚPIEWA",
      "emoji": "🎤",
      "hint": "Śpiewa wesołą piosenkę"
    },
    {
      "word": "SIEDZI",
      "emoji": "🪑",
      "hint": "Siedzi wygodnie na fotelu"
    }
  ],
  "en": [
    {
      "word": "CAT",
      "emoji": "🐱",
      "hint": "Says meow and purrs"
    },
    {
      "word": "DOG",
      "emoji": "🐶",
      "hint": "Barks and wags tail"
    },
    {
      "word": "SUN",
      "emoji": "☀️",
      "hint": "Shines warm and bright"
    },
    {
      "word": "FOX",
      "emoji": "🦊",
      "hint": "Clever and orange"
    },
    {
      "word": "PIG",
      "emoji": "🐷",
      "hint": "Oink-oink on the farm"
    },
    {
      "word": "CAR",
      "emoji": "🚗",
      "hint": "Drives on the road, beep-beep"
    },
    {
      "word": "BUS",
      "emoji": "🚌",
      "hint": "Big yellow transport"
    },
    {
      "word": "HAT",
      "emoji": "🎩",
      "hint": "We wear it on head"
    },
    {
      "word": "BEE",
      "emoji": "🐝",
      "hint": "Bumbles and makes honey"
    },
    {
      "word": "BED",
      "emoji": "🛏️",
      "hint": "Where we sleep cozy at night"
    },
    {
      "word": "EGG",
      "emoji": "🥚",
      "hint": "Yummy breakfast"
    },
    {
      "word": "BOX",
      "emoji": "📦",
      "hint": "Holds toys and gifts"
    },
    {
      "word": "CUP",
      "emoji": "☕",
      "hint": "For warm milk or tea"
    },
    {
      "word": "MOM",
      "emoji": "👩",
      "hint": "Sweetest and dearest mother"
    },
    {
      "word": "DAD",
      "emoji": "👨",
      "hint": "Strong and loving father"
    },
    {
      "word": "BOY",
      "emoji": "👦",
      "hint": "Happy smiling kid"
    },
    {
      "word": "TOY",
      "emoji": "🧸",
      "hint": "Fun to play with"
    },
    {
      "word": "TEA",
      "emoji": "🍵",
      "hint": "Warm drink in a mug"
    },
    {
      "word": "JAM",
      "emoji": "🍓",
      "hint": "Sweet berry spread"
    },
    {
      "word": "PAN",
      "emoji": "🍳",
      "hint": "Used for cooking food"
    },
    {
      "word": "SHOE",
      "emoji": "👟",
      "hint": "We put on feet to walk"
    },
    {
      "word": "DOOR",
      "emoji": "🚪",
      "hint": "Open to enter the room"
    },
    {
      "word": "HAND",
      "emoji": "✋",
      "hint": "Five fingers to wave and hold"
    },
    {
      "word": "SOUP",
      "emoji": "🍲",
      "hint": "Warm dinner in a bowl"
    },
    {
      "word": "FORK",
      "emoji": "🍴",
      "hint": "Helps us eat tasty noodles"
    },
    {
      "word": "COAT",
      "emoji": "🧥",
      "hint": "Keeps us warm outdoors"
    },
    {
      "word": "DESK",
      "emoji": "🪑",
      "hint": "Where we draw and learn"
    },
    {
      "word": "PARK",
      "emoji": "🌳",
      "hint": "Fun green place to run and play"
    },
    {
      "word": "BABY",
      "emoji": "👶",
      "hint": "Cute little sister or brother"
    },
    {
      "word": "BALL",
      "emoji": "⚽",
      "hint": "Round toy to kick and catch"
    },
    {
      "word": "BOOK",
      "emoji": "📖",
      "hint": "Full of stories and pictures"
    },
    {
      "word": "FISH",
      "emoji": "🐟",
      "hint": "Swims in the clear water"
    },
    {
      "word": "BIRD",
      "emoji": "🐦",
      "hint": "Sings songs on green tree"
    },
    {
      "word": "FROG",
      "emoji": "🐸",
      "hint": "Jumps and ribbits in pond"
    },
    {
      "word": "DUCK",
      "emoji": "🦆",
      "hint": "Quack-quack in the pond"
    },
    {
      "word": "BEAR",
      "emoji": "🐻",
      "hint": "Big furry cuddly animal"
    },
    {
      "word": "LION",
      "emoji": "🦁",
      "hint": "Brave king of animals"
    },
    {
      "word": "WOLF",
      "emoji": "🐺",
      "hint": "Howls at the bright moon"
    },
    {
      "word": "STAR",
      "emoji": "⭐",
      "hint": "Twinkles at night in sky"
    },
    {
      "word": "MOON",
      "emoji": "🌙",
      "hint": "Glows gently in night sky"
    },
    {
      "word": "SNOW",
      "emoji": "⛄",
      "hint": "White and cold fluffy flakes"
    },
    {
      "word": "TREE",
      "emoji": "🌳",
      "hint": "Tall with fresh green leaves"
    },
    {
      "word": "CAKE",
      "emoji": "🎂",
      "hint": "Sweet birthday treat with candles"
    },
    {
      "word": "MILK",
      "emoji": "🥛",
      "hint": "Healthy white drink for kids"
    },
    {
      "word": "ROSE",
      "emoji": "🌹",
      "hint": "Fragrant beautiful flower"
    },
    {
      "word": "BOAT",
      "emoji": "⛵",
      "hint": "Sails smoothly on the lake"
    },
    {
      "word": "KITE",
      "emoji": "🪁",
      "hint": "Flies high up in the wind"
    },
    {
      "word": "CHAIR",
      "emoji": "🪑",
      "hint": "Comfortable to sit on"
    },
    {
      "word": "SPOON",
      "emoji": "🥄",
      "hint": "To eat soup and yogurt"
    },
    {
      "word": "PLATE",
      "emoji": "🍽️",
      "hint": "Holds our yummy dinner"
    },
    {
      "word": "SHIRT",
      "emoji": "👕",
      "hint": "Clean clothes to wear"
    },
    {
      "word": "SHOES",
      "emoji": "👟",
      "hint": "We put on our feet"
    },
    {
      "word": "SCHOOL",
      "emoji": "🎒",
      "hint": "Where we learn and meet friends"
    },
    {
      "word": "PENCIL",
      "emoji": "✏️",
      "hint": "Draws colorful pictures"
    },
    {
      "word": "GARDEN",
      "emoji": "🏡",
      "hint": "Full of flowers and green grass"
    },
    {
      "word": "ORANGE",
      "emoji": "🍊",
      "hint": "Juicy citrus round fruit"
    },
    {
      "word": "BANANA",
      "emoji": "🍌",
      "hint": "Sweet yellow fruit"
    },
    {
      "word": "APPLE",
      "emoji": "🍎",
      "hint": "Crunchy sweet and red"
    },
    {
      "word": "HOUSE",
      "emoji": "🏠",
      "hint": "Warm and cozy home"
    },
    {
      "word": "WATER",
      "emoji": "💧",
      "hint": "Fresh drink we need each day"
    },
    {
      "word": "PANDA",
      "emoji": "🐼",
      "hint": "Cuddly black and white bear"
    },
    {
      "word": "TIGER",
      "emoji": "🐯",
      "hint": "Big strong striped cat"
    },
    {
      "word": "ZEBRA",
      "emoji": "🦓",
      "hint": "Striped horse on the grass"
    },
    {
      "word": "TRAIN",
      "emoji": "🚂",
      "hint": "Choo-choo on the railroad"
    },
    {
      "word": "PLANE",
      "emoji": "✈️",
      "hint": "Flies high above the white clouds"
    },
    {
      "word": "CLOCK",
      "emoji": "⏰",
      "hint": "Tick-tock tells what time it is"
    },
    {
      "word": "BREAD",
      "emoji": "🍞",
      "hint": "Warm and fresh from bakery"
    },
    {
      "word": "SMILE",
      "emoji": "😊",
      "hint": "Happy joyful cheerful face"
    },
    {
      "word": "FLOWER",
      "emoji": "🌸",
      "hint": "Blooms brightly in the garden"
    },
    {
      "word": "MONKEY",
      "emoji": "🐵",
      "hint": "Playful and loves bananas"
    },
    {
      "word": "RABBIT",
      "emoji": "🐰",
      "hint": "Hops quickly with long ears"
    },
    {
      "word": "RUN",
      "emoji": "🏃",
      "hint": "Runs fast on feet"
    },
    {
      "word": "FLY",
      "emoji": "✈️",
      "hint": "Flies high in the sky"
    },
    {
      "word": "EAT",
      "emoji": "🍽️",
      "hint": "Eats yummy food"
    },
    {
      "word": "SIT",
      "emoji": "🪑",
      "hint": "Sits nicely on chair"
    },
    {
      "word": "HOP",
      "emoji": "🦘",
      "hint": "Hops like a green frog"
    },
    {
      "word": "WALK",
      "emoji": "🚶",
      "hint": "Walks with steps"
    },
    {
      "word": "SING",
      "emoji": "🎤",
      "hint": "Sings a happy song"
    },
    {
      "word": "SWIM",
      "emoji": "🏊",
      "hint": "Swims in the clear pool"
    },
    {
      "word": "PLAY",
      "emoji": "⚽",
      "hint": "Plays with friends and toys"
    },
    {
      "word": "JUMP",
      "emoji": "🦘",
      "hint": "Jumps high in the air"
    },
    {
      "word": "READ",
      "emoji": "📖",
      "hint": "Reads a wonderful fairy tale"
    },
    {
      "word": "WASH",
      "emoji": "🧼",
      "hint": "Washes face and hands"
    },
    {
      "word": "SLEEP",
      "emoji": "😴",
      "hint": "Sleeps peacefully in bed"
    },
    {
      "word": "DRINK",
      "emoji": "🧃",
      "hint": "Drinks water or fruit juice"
    },
    {
      "word": "DYE",
      "emoji": "🎨",
      "hint": "dye — краситель, краска / красить"
    },
    {
      "word": "CLUE",
      "emoji": "🔎",
      "hint": "clue — улика, зацепка"
    },
    {
      "word": "SOLVE",
      "emoji": "🧩",
      "hint": "solve — решать загадку"
    },
    {
      "word": "SEARCH",
      "emoji": "🔍",
      "hint": "search — искать, поиск"
    }
  ]
};

export const WORDS_DATA_HARD = {
  "pl": [
    {
      "word": "CHRZĄSZCZ",
      "emoji": "🪲",
      "hint": "хрущ / майский жук"
    },
    {
      "word": "SZCZĘŚCIE",
      "emoji": "🍀",
      "hint": "счастье, удача"
    },
    {
      "word": "PSZCZOŁA",
      "emoji": "🐝",
      "hint": "пчела"
    },
    {
      "word": "NIEDŹWIEDŹ",
      "emoji": "🐻",
      "hint": "медведь"
    },
    {
      "word": "TRUSKAWKA",
      "emoji": "🍓",
      "hint": "клубника"
    },
    {
      "word": "KSIĘŻYC",
      "emoji": "🌙",
      "hint": "луна, месяц"
    },
    {
      "word": "BŁYSKAWICA",
      "emoji": "⚡",
      "hint": "молния"
    },
    {
      "word": "CZEKOLADA",
      "emoji": "🍫",
      "hint": "шоколад"
    },
    {
      "word": "DZIĘCIOŁ",
      "emoji": "🪵",
      "hint": "дятел"
    },
    {
      "word": "SAMOCHÓD",
      "emoji": "🚗",
      "hint": "автомобиль"
    },
    {
      "word": "PRZYJACIEL",
      "emoji": "🤝",
      "hint": "друг"
    },
    {
      "word": "PRZYGODA",
      "emoji": "🗺️",
      "hint": "приключение"
    },
    {
      "word": "ŚWIEŻOŚĆ",
      "emoji": "🍃",
      "hint": "свежесть"
    },
    {
      "word": "PIEROGI",
      "emoji": "🥟",
      "hint": "вареники"
    },
    {
      "word": "WIEWIÓRKA",
      "emoji": "🐿️",
      "hint": "белочка"
    },
    {
      "word": "JASZCZURKA",
      "emoji": "🦎",
      "hint": "ящерица"
    },
    {
      "word": "PARASOL",
      "emoji": "☂️",
      "hint": "зонт"
    },
    {
      "word": "DZWONECZEK",
      "emoji": "🔔",
      "hint": "колокольчик"
    },
    {
      "word": "POZIOMKA",
      "emoji": "🍓",
      "hint": "земляника"
    },
    {
      "word": "KROKODYL",
      "emoji": "🐊",
      "hint": "крокодил"
    },
    {
      "word": "ŚNIADANIE",
      "emoji": "🥞",
      "hint": "завтрак"
    },
    {
      "word": "HULAJNOGA",
      "emoji": "🛴",
      "hint": "самокат"
    },
    {
      "word": "PIÓRNIK",
      "emoji": "✏️",
      "hint": "пенал"
    },
    {
      "word": "CUKIERKI",
      "emoji": "🍬",
      "hint": "конфеты"
    },
    {
      "word": "ZABAWKI",
      "emoji": "🧸",
      "hint": "игрушки"
    },
    {
      "word": "TRAMWAJ",
      "emoji": "🚊",
      "hint": "трамвай"
    },
    {
      "word": "HERBATA",
      "emoji": "🍵",
      "hint": "чай"
    },
    {
      "word": "TELEFON",
      "emoji": "📱",
      "hint": "телефон"
    },
    {
      "word": "KOMPUTER",
      "emoji": "💻",
      "hint": "компьютер"
    },
    {
      "word": "PODUSZKA",
      "emoji": "🛋️",
      "hint": "подушка"
    }
  ],
  "ru": [
    {
      "word": "КОСМОНАВТ",
      "emoji": "👨‍🚀",
      "hint": "летит к далеким звездам"
    },
    {
      "word": "СОЛНЫШКО",
      "emoji": "☀️",
      "hint": "теплое и ласковое"
    },
    {
      "word": "ЗЕМЛЯНИКА",
      "emoji": "🍓",
      "hint": "сладкая лесная ягода"
    },
    {
      "word": "ВЕРТОЛЕТ",
      "emoji": "🚁",
      "hint": "летает с винтом"
    },
    {
      "word": "ОДУВАНЧИК",
      "emoji": "🌼",
      "hint": "желтый пушистый цветок"
    },
    {
      "word": "КРОКОДИЛ",
      "emoji": "🐊",
      "hint": "зеленый в реке"
    },
    {
      "word": "ПРИКЛЮЧЕНИЕ",
      "emoji": "🗺️",
      "hint": "увлекательный поход"
    },
    {
      "word": "ТЕЛЕВИЗОР",
      "emoji": "📺",
      "hint": "показывает мультики"
    },
    {
      "word": "ЧЕРЕПАХА",
      "emoji": "🐢",
      "hint": "с крепким панцирем"
    },
    {
      "word": "СНЕГОВИК",
      "emoji": "⛄",
      "hint": "из снега с морковкой"
    },
    {
      "word": "МОРОЖЕНОЕ",
      "emoji": "🍦",
      "hint": "холодное сладкое лакомство"
    },
    {
      "word": "БУТЕРБРОД",
      "emoji": "🥪",
      "hint": "сытный завтрак с сыром"
    },
    {
      "word": "ВЕЛОСИПЕД",
      "emoji": "🚲",
      "hint": "крутим педали и едем"
    },
    {
      "word": "САМОКАТ",
      "emoji": "🛴",
      "hint": "быстро мчит по дорожке"
    },
    {
      "word": "БУДИЛЬНИК",
      "emoji": "⏰",
      "hint": "звонит по утрам в садик"
    },
    {
      "word": "КАРАНДАШ",
      "emoji": "✏️",
      "hint": "рисует яркие картинки"
    },
    {
      "word": "ПЛАНШЕТ",
      "emoji": "📱",
      "hint": "на нем мы играем и учимся"
    },
    {
      "word": "АВТОБУС",
      "emoji": "🚌",
      "hint": "возит пассажиров по городу"
    },
    {
      "word": "САМОЛЕТ",
      "emoji": "✈️",
      "hint": "летит высоко над облаками"
    },
    {
      "word": "ШОКОЛАД",
      "emoji": "🍫",
      "hint": "вкусная сладкая плитка"
    },
    {
      "word": "ПРАЗДНИК",
      "emoji": "🎉",
      "hint": "шарики, торт и веселье"
    }
  ],
  "en": [
    {
      "word": "BUTTERFLY",
      "emoji": "🦋",
      "hint": "бабочка"
    },
    {
      "word": "ELEPHANT",
      "emoji": "🐘",
      "hint": "слон"
    },
    {
      "word": "RAINBOW",
      "emoji": "🌈",
      "hint": "радуга"
    },
    {
      "word": "SUNSHINE",
      "emoji": "☀️",
      "hint": "солнечный свет"
    },
    {
      "word": "PENGUIN",
      "emoji": "🐧",
      "hint": "пингвин"
    },
    {
      "word": "DOLPHIN",
      "emoji": "🐬",
      "hint": "дельфин"
    },
    {
      "word": "ASTRONAUT",
      "emoji": "👨‍🚀",
      "hint": "астронавт / космонавт"
    },
    {
      "word": "CHOCOLATE",
      "emoji": "🍫",
      "hint": "шоколад"
    },
    {
      "word": "DINOSAUR",
      "emoji": "🦖",
      "hint": "динозавр"
    },
    {
      "word": "STRAWBERRY",
      "emoji": "🍓",
      "hint": "клубника"
    },
    {
      "word": "ADVENTURE",
      "emoji": "🗺️",
      "hint": "приключение"
    },
    {
      "word": "FIRETRUCK",
      "emoji": "🚒",
      "hint": "пожарная машина"
    },
    {
      "word": "CROCODILE",
      "emoji": "🐊",
      "hint": "крокодил"
    },
    {
      "word": "WATERMELON",
      "emoji": "🍉",
      "hint": "арбуз"
    },
    {
      "word": "KANGAROO",
      "emoji": "🦘",
      "hint": "кенгуру"
    },
    {
      "word": "JELLYFISH",
      "emoji": "🪼",
      "hint": "медуза"
    },
    {
      "word": "LIGHTNING",
      "emoji": "⚡",
      "hint": "молния"
    },
    {
      "word": "SNOWMAN",
      "emoji": "⛄",
      "hint": "снеговик"
    },
    {
      "word": "GIRAFFE",
      "emoji": "🦒",
      "hint": "жираф"
    },
    {
      "word": "BREAKFAST",
      "emoji": "🥞",
      "hint": "завтрак"
    },
    {
      "word": "SANDWICH",
      "emoji": "🥪",
      "hint": "бутерброд"
    },
    {
      "word": "BICYCLE",
      "emoji": "🚲",
      "hint": "велосипед"
    },
    {
      "word": "SCOOTER",
      "emoji": "🛴",
      "hint": "самокат"
    },
    {
      "word": "BACKPACK",
      "emoji": "🎒",
      "hint": "рюкзак"
    },
    {
      "word": "COMPUTER",
      "emoji": "💻",
      "hint": "компьютер"
    },
    {
      "word": "AIRPLANE",
      "emoji": "✈️",
      "hint": "самолет"
    },
    {
      "word": "ICECREAM",
      "emoji": "🍦",
      "hint": "мороженое"
    },
    {
      "word": "DELIVER",
      "emoji": "📦",
      "hint": "to deliver — доставлять"
    },
    {
      "word": "IMPRESS",
      "emoji": "✨",
      "hint": "to impress — впечатлять"
    },
    {
      "word": "STUFF",
      "emoji": "🎒",
      "hint": "stuff — вещи, предметы"
    },
    {
      "word": "OFFER",
      "emoji": "🤝",
      "hint": "a good offer — выгодное предложение"
    },
    {
      "word": "FINDOUT",
      "emoji": "🔍",
      "hint": "to find out — выяснить, разузнать"
    },
    {
      "word": "GIVEAWAY",
      "emoji": "🎁",
      "hint": "to give away — раздавать, дарить"
    },
    {
      "word": "ENDUP",
      "emoji": "🏁",
      "hint": "to end up — оказаться в итоге"
    },
    {
      "word": "PAYFOR",
      "emoji": "💳",
      "hint": "to pay for — платить за"
    },
    {
      "word": "TURNINTO",
      "emoji": "🪄",
      "hint": "to turn into — превращаться в"
    },
    {
      "word": "GOON",
      "emoji": "⏩",
      "hint": "to go on — продолжать"
    },
    {
      "word": "OHMYWORD",
      "emoji": "😲",
      "hint": "oh my word! — вот это да! честное слово!"
    },
    {
      "word": "SECRET",
      "emoji": "🤫",
      "hint": "secret — секрет, тайна"
    },
    {
      "word": "EXPLORE",
      "emoji": "🗺️",
      "hint": "explore — исследовать, изучать"
    },
    {
      "word": "DISCOVER",
      "emoji": "🧭",
      "hint": "discover — открывать новое"
    },
    {
      "word": "MYSTERY",
      "emoji": "🔮",
      "hint": "mystery — тайна, загадка"
    },
    {
      "word": "DETECT",
      "emoji": "👀",
      "hint": "detect — обнаружить, заметить"
    }
  ]
};

export const PRAISE_PHRASES = {
  ru: [
    'Отлично!',
    'Молодец!',
    'Умница!',
    'Великолепно!',
    'Супер!',
    'У тебя отлично получается!',
    'Так держать!'
  ],
  pl: [
    'Brawo!',
    'Świetnie!',
    'Super!',
    'Wspaniale!',
    'Doskonale!',
    'Jesteś mistrzem!',
    'Bardzo ładnie!'
  ],
  en: [
    'Great job!',
    'Awesome!',
    'Well done!',
    'Superstar!',
    'Brilliant!',
    'Fantastic!',
    'Keep it up!'
  ]
};

// ==========================================
// ДАННЫЕ ДЛЯ РЕЖИМА «НАЙДИ РИФМУ» (7 ЛЕТ)
// ==========================================
export const RHYMES_DATA = {
  "ru": [
    {
      "target": {
        "word": "КОТ",
        "emoji": "🐱"
      },
      "correct": {
        "word": "РОТ",
        "emoji": "👄"
      },
      "distractors": [
        {
          "word": "ЛЕС",
          "emoji": "🌲"
        },
        {
          "word": "МЯЧ",
          "emoji": "⚽"
        }
      ]
    },
    {
      "target": {
        "word": "ДОМ",
        "emoji": "🏠"
      },
      "correct": {
        "word": "СОМ",
        "emoji": "🐟"
      },
      "distractors": [
        {
          "word": "СЫР",
          "emoji": "🧀"
        },
        {
          "word": "ЖУК",
          "emoji": "🪲"
        }
      ]
    },
    {
      "target": {
        "word": "МЫШКА",
        "emoji": "🐭"
      },
      "correct": {
        "word": "КРЫШКА",
        "emoji": "🫙"
      },
      "distractors": [
        {
          "word": "ЛОДКА",
          "emoji": "🛶"
        },
        {
          "word": "РЫБА",
          "emoji": "🐟"
        }
      ]
    },
    {
      "target": {
        "word": "ЛУК",
        "emoji": "🧅"
      },
      "correct": {
        "word": "ЖУК",
        "emoji": "🪲"
      },
      "distractors": [
        {
          "word": "НОС",
          "emoji": "👃"
        },
        {
          "word": "СЛОН",
          "emoji": "🐘"
        }
      ]
    },
    {
      "target": {
        "word": "ЛИМОН",
        "emoji": "🍋"
      },
      "correct": {
        "word": "БАТОН",
        "emoji": "🥖"
      },
      "distractors": [
        {
          "word": "ВОЛК",
          "emoji": "🐺"
        },
        {
          "word": "ГРИБ",
          "emoji": "🍄"
        }
      ]
    },
    {
      "target": {
        "word": "СНЕГ",
        "emoji": "❄️"
      },
      "correct": {
        "word": "БЕГ",
        "emoji": "🏃"
      },
      "distractors": [
        {
          "word": "УТКА",
          "emoji": "🦆"
        },
        {
          "word": "ЧАЙ",
          "emoji": "🍵"
        }
      ]
    },
    {
      "target": {
        "word": "КАША",
        "emoji": "🥣"
      },
      "correct": {
        "word": "ДАША",
        "emoji": "👧"
      },
      "distractors": [
        {
          "word": "ЗИМА",
          "emoji": "⛄"
        },
        {
          "word": "НЕБО",
          "emoji": "☁️"
        }
      ]
    },
    {
      "target": {
        "word": "МАК",
        "emoji": "🌺"
      },
      "correct": {
        "word": "РАК",
        "emoji": "🦞"
      },
      "distractors": [
        {
          "word": "КИТ",
          "emoji": "🐋"
        },
        {
          "word": "МЕД",
          "emoji": "🍯"
        }
      ]
    },
    {
      "target": {
        "word": "ШАР",
        "emoji": "🎈"
      },
      "correct": {
        "word": "ЖАР",
        "emoji": "🔥"
      },
      "distractors": [
        {
          "word": "ЛЕВ",
          "emoji": "🦁"
        },
        {
          "word": "СОК",
          "emoji": "🧃"
        }
      ]
    },
    {
      "target": {
        "word": "БЕЖИТ",
        "emoji": "🏃"
      },
      "correct": {
        "word": "ЛЕЖИТ",
        "emoji": "🛌"
      },
      "distractors": [
        {
          "word": "КОТ",
          "emoji": "🐱"
        },
        {
          "word": "ДОМ",
          "emoji": "🏠"
        }
      ]
    },
    {
      "target": {
        "word": "ПОЕТ",
        "emoji": "🎤"
      },
      "correct": {
        "word": "ПЛЫВЕТ",
        "emoji": "🏊"
      },
      "distractors": [
        {
          "word": "ЛЕС",
          "emoji": "🌲"
        },
        {
          "word": "МЯЧ",
          "emoji": "⚽"
        }
      ]
    }
  ],
  "pl": [
    {
      "target": {
        "word": "KOT",
        "emoji": "🐱"
      },
      "correct": {
        "word": "PŁOT",
        "emoji": "🪵"
      },
      "distractors": [
        {
          "word": "LAS",
          "emoji": "🌲"
        },
        {
          "word": "SER",
          "emoji": "🧀"
        }
      ]
    },
    {
      "target": {
        "word": "DOM",
        "emoji": "🏠"
      },
      "correct": {
        "word": "GROM",
        "emoji": "⚡"
      },
      "distractors": [
        {
          "word": "PIES",
          "emoji": "🐶"
        },
        {
          "word": "WODA",
          "emoji": "💧"
        }
      ]
    },
    {
      "target": {
        "word": "RYBA",
        "emoji": "🐟"
      },
      "correct": {
        "word": "SZYBA",
        "emoji": "🪟"
      },
      "distractors": [
        {
          "word": "WILK",
          "emoji": "🐺"
        },
        {
          "word": "PTAK",
          "emoji": "🐦"
        }
      ]
    },
    {
      "target": {
        "word": "DĄB",
        "emoji": "🌳"
      },
      "correct": {
        "word": "ZĄB",
        "emoji": "🦷"
      },
      "distractors": [
        {
          "word": "KOT",
          "emoji": "🐱"
        },
        {
          "word": "KOŃ",
          "emoji": "🐎"
        }
      ]
    },
    {
      "target": {
        "word": "KROWA",
        "emoji": "🐄"
      },
      "correct": {
        "word": "SOWA",
        "emoji": "🦉"
      },
      "distractors": [
        {
          "word": "LATO",
          "emoji": "☀️"
        },
        {
          "word": "ZIMA",
          "emoji": "❄️"
        }
      ]
    },
    {
      "target": {
        "word": "LAS",
        "emoji": "🌲"
      },
      "correct": {
        "word": "PAS",
        "emoji": "🥋"
      },
      "distractors": [
        {
          "word": "MIŚ",
          "emoji": "🧸"
        },
        {
          "word": "SOK",
          "emoji": "🧃"
        }
      ]
    },
    {
      "target": {
        "word": "ŻABA",
        "emoji": "🐸"
      },
      "correct": {
        "word": "BABA",
        "emoji": "👵"
      },
      "distractors": [
        {
          "word": "KOŁO",
          "emoji": "🛞"
        },
        {
          "word": "LIŚĆ",
          "emoji": "🍂"
        }
      ]
    },
    {
      "target": {
        "word": "RÓŻA",
        "emoji": "🌹"
      },
      "correct": {
        "word": "BURZA",
        "emoji": "⛈️"
      },
      "distractors": [
        {
          "word": "GÓRA",
          "emoji": "⛰️"
        },
        {
          "word": "CHLEB",
          "emoji": "🍞"
        }
      ]
    },
    {
      "target": {
        "word": "RAK",
        "emoji": "🦞"
      },
      "correct": {
        "word": "MAK",
        "emoji": "🌺"
      },
      "distractors": [
        {
          "word": "KROK",
          "emoji": "👣"
        },
        {
          "word": "LIS",
          "emoji": "🦊"
        }
      ]
    },
    {
      "target": {
        "word": "KOSZ",
        "emoji": "🧺"
      },
      "correct": {
        "word": "GROSZ",
        "emoji": "🪙"
      },
      "distractors": [
        {
          "word": "BUT",
          "emoji": "👞"
        },
        {
          "word": "SER",
          "emoji": "🧀"
        }
      ]
    },
    {
      "target": {
        "word": "BĄK",
        "emoji": "🐝"
      },
      "correct": {
        "word": "PĄK",
        "emoji": "🌷"
      },
      "distractors": [
        {
          "word": "PTAK",
          "emoji": "🐦"
        },
        {
          "word": "CHLEB",
          "emoji": "🍞"
        }
      ]
    },
    {
      "target": {
        "word": "KACZKA",
        "emoji": "🦆"
      },
      "correct": {
        "word": "PACZKA",
        "emoji": "📦"
      },
      "distractors": [
        {
          "word": "JAJKO",
          "emoji": "🥚"
        },
        {
          "word": "WODA",
          "emoji": "💧"
        }
      ]
    },
    {
      "target": {
        "word": "DZWON",
        "emoji": "🔔"
      },
      "correct": {
        "word": "TRON",
        "emoji": "👑"
      },
      "distractors": [
        {
          "word": "DOM",
          "emoji": "🏠"
        },
        {
          "word": "KOT",
          "emoji": "🐱"
        }
      ]
    },
    {
      "target": {
        "word": "KRET",
        "emoji": "🦔"
      },
      "correct": {
        "word": "BERET",
        "emoji": "🧢"
      },
      "distractors": [
        {
          "word": "LAS",
          "emoji": "🌲"
        },
        {
          "word": "SER",
          "emoji": "🧀"
        }
      ]
    },
    {
      "target": {
        "word": "KOS",
        "emoji": "🐦"
      },
      "correct": {
        "word": "NOS",
        "emoji": "👃"
      },
      "distractors": [
        {
          "word": "OKO",
          "emoji": "👁️"
        },
        {
          "word": "UCHO",
          "emoji": "👂"
        }
      ]
    },
    {
      "target": {
        "word": "BAL",
        "emoji": "🎉"
      },
      "correct": {
        "word": "SZAL",
        "emoji": "🧣"
      },
      "distractors": [
        {
          "word": "TORT",
          "emoji": "🎂"
        },
        {
          "word": "MIŚ",
          "emoji": "🧸"
        }
      ]
    },
    {
      "target": {
        "word": "LECI",
        "emoji": "✈️"
      },
      "correct": {
        "word": "ŚWIECI",
        "emoji": "☀️"
      },
      "distractors": [
        {
          "word": "DOM",
          "emoji": "🏠"
        },
        {
          "word": "KOT",
          "emoji": "🐱"
        }
      ]
    },
    {
      "target": {
        "word": "MYJE",
        "emoji": "🧼"
      },
      "correct": {
        "word": "PIJE",
        "emoji": "🧃"
      },
      "distractors": [
        {
          "word": "LAS",
          "emoji": "🌲"
        },
        {
          "word": "SER",
          "emoji": "🧀"
        }
      ]
    }
  ],
  "en": [
    {
      "target": {
        "word": "CAT",
        "emoji": "🐱"
      },
      "correct": {
        "word": "HAT",
        "emoji": "🎩"
      },
      "distractors": [
        {
          "word": "DOG",
          "emoji": "🐶"
        },
        {
          "word": "PIG",
          "emoji": "🐷"
        }
      ]
    },
    {
      "target": {
        "word": "DOG",
        "emoji": "🐶"
      },
      "correct": {
        "word": "FROG",
        "emoji": "🐸"
      },
      "distractors": [
        {
          "word": "CAR",
          "emoji": "🚗"
        },
        {
          "word": "BEE",
          "emoji": "🐝"
        }
      ]
    },
    {
      "target": {
        "word": "SUN",
        "emoji": "☀️"
      },
      "correct": {
        "word": "RUN",
        "emoji": "🏃"
      },
      "distractors": [
        {
          "word": "FOX",
          "emoji": "🦊"
        },
        {
          "word": "HAT",
          "emoji": "🎩"
        }
      ]
    },
    {
      "target": {
        "word": "FOX",
        "emoji": "🦊"
      },
      "correct": {
        "word": "BOX",
        "emoji": "📦"
      },
      "distractors": [
        {
          "word": "FISH",
          "emoji": "🐟"
        },
        {
          "word": "BOOK",
          "emoji": "📖"
        }
      ]
    },
    {
      "target": {
        "word": "BEAR",
        "emoji": "🐻"
      },
      "correct": {
        "word": "PEAR",
        "emoji": "🍐"
      },
      "distractors": [
        {
          "word": "WOLF",
          "emoji": "🐺"
        },
        {
          "word": "DUCK",
          "emoji": "🦆"
        }
      ]
    },
    {
      "target": {
        "word": "STAR",
        "emoji": "⭐"
      },
      "correct": {
        "word": "CAR",
        "emoji": "🚗"
      },
      "distractors": [
        {
          "word": "MOON",
          "emoji": "🌙"
        },
        {
          "word": "TREE",
          "emoji": "🌳"
        }
      ]
    },
    {
      "target": {
        "word": "FISH",
        "emoji": "🐟"
      },
      "correct": {
        "word": "DISH",
        "emoji": "🍽️"
      },
      "distractors": [
        {
          "word": "BOAT",
          "emoji": "⛵"
        },
        {
          "word": "BIRD",
          "emoji": "🐦"
        }
      ]
    },
    {
      "target": {
        "word": "BEE",
        "emoji": "🐝"
      },
      "correct": {
        "word": "TREE",
        "emoji": "🌳"
      },
      "distractors": [
        {
          "word": "ANT",
          "emoji": "🐜"
        },
        {
          "word": "FROG",
          "emoji": "🐸"
        }
      ]
    },
    {
      "target": {
        "word": "BOAT",
        "emoji": "⛵"
      },
      "correct": {
        "word": "COAT",
        "emoji": "🧥"
      },
      "distractors": [
        {
          "word": "SHIP",
          "emoji": "🚢"
        },
        {
          "word": "BOOT",
          "emoji": "🥾"
        }
      ]
    },
    {
      "target": {
        "word": "DUCK",
        "emoji": "🦆"
      },
      "correct": {
        "word": "TRUCK",
        "emoji": "🚚"
      },
      "distractors": [
        {
          "word": "BIRD",
          "emoji": "🐦"
        },
        {
          "word": "HORSE",
          "emoji": "🐎"
        }
      ]
    },
    {
      "target": {
        "word": "CAKE",
        "emoji": "🎂"
      },
      "correct": {
        "word": "SNAKE",
        "emoji": "🐍"
      },
      "distractors": [
        {
          "word": "BALL",
          "emoji": "⚽"
        },
        {
          "word": "RING",
          "emoji": "💍"
        }
      ]
    },
    {
      "target": {
        "word": "RING",
        "emoji": "💍"
      },
      "correct": {
        "word": "KING",
        "emoji": "👑"
      },
      "distractors": [
        {
          "word": "GOLD",
          "emoji": "🪙"
        },
        {
          "word": "CROWN",
          "emoji": "👑"
        }
      ]
    },
    {
      "target": {
        "word": "RUN",
        "emoji": "🏃"
      },
      "correct": {
        "word": "SUN",
        "emoji": "☀️"
      },
      "distractors": [
        {
          "word": "CAT",
          "emoji": "🐱"
        },
        {
          "word": "BED",
          "emoji": "🛏️"
        }
      ]
    },
    {
      "target": {
        "word": "SING",
        "emoji": "🎤"
      },
      "correct": {
        "word": "RING",
        "emoji": "💍"
      },
      "distractors": [
        {
          "word": "DOG",
          "emoji": "🐶"
        },
        {
          "word": "CUP",
          "emoji": "☕"
        }
      ]
    },
    {
      "target": {
        "word": "FLY",
        "emoji": "✈️"
      },
      "correct": {
        "word": "SKY",
        "emoji": "☁️"
      },
      "distractors": [
        {
          "word": "HAT",
          "emoji": "🎩"
        },
        {
          "word": "FOX",
          "emoji": "🦊"
        }
      ]
    },
    {
      "target": {
        "word": "CLUE",
        "emoji": "🔎"
      },
      "correct": {
        "word": "BLUE",
        "emoji": "🔵"
      },
      "distractors": [
        {
          "word": "RED",
          "emoji": "🔴"
        },
        {
          "word": "DOG",
          "emoji": "🐶"
        }
      ]
    }
  ]
};

export const ODD_ONE_OUT_DATA = {
  "ru": [
    {
      "items": [
        {
          "word": "ЯБЛОКО",
          "emoji": "🍎"
        },
        {
          "word": "БАНАН",
          "emoji": "🍌"
        },
        {
          "word": "ГРУША",
          "emoji": "🍐"
        },
        {
          "word": "МАШИНА",
          "emoji": "🚗"
        }
      ],
      "oddWord": "МАШИНА",
      "explanation": "Машина — это транспорт, а остальные — фрукты!"
    },
    {
      "items": [
        {
          "word": "КОТ",
          "emoji": "🐱"
        },
        {
          "word": "СОБАКА",
          "emoji": "🐶"
        },
        {
          "word": "ЛИСА",
          "emoji": "🦊"
        },
        {
          "word": "САМОЛЕТ",
          "emoji": "✈️"
        }
      ],
      "oddWord": "САМОЛЕТ",
      "explanation": "Самолет летает на моторе, а остальные — животные!"
    },
    {
      "items": [
        {
          "word": "ШАПКА",
          "emoji": "🧢"
        },
        {
          "word": "КУРТКА",
          "emoji": "🧥"
        },
        {
          "word": "БОТИНКИ",
          "emoji": "👞"
        },
        {
          "word": "ТАРЕЛКА",
          "emoji": "🍽️"
        }
      ],
      "oddWord": "ТАРЕЛКА",
      "explanation": "Тарелка — это посуда, а остальные — одежда!"
    },
    {
      "items": [
        {
          "word": "БЕРЕЗА",
          "emoji": "🌳"
        },
        {
          "word": "ЕЛЬ",
          "emoji": "🌲"
        },
        {
          "word": "ДУБ",
          "emoji": "🪵"
        },
        {
          "word": "МЯЧИК",
          "emoji": "⚽"
        }
      ],
      "oddWord": "МЯЧИК",
      "explanation": "Мячик — это игрушка, а остальные — деревья!"
    },
    {
      "items": [
        {
          "word": "МОРКОВЬ",
          "emoji": "🥕"
        },
        {
          "word": "ОГУРЕЦ",
          "emoji": "🥒"
        },
        {
          "word": "ПОМИДОР",
          "emoji": "🍅"
        },
        {
          "word": "МЕДВЕДЬ",
          "emoji": "🐻"
        }
      ],
      "oddWord": "МЕДВЕДЬ",
      "explanation": "Медведь — это зверь, а остальные — овощи!"
    },
    {
      "items": [
        {
          "word": "БЕЖИТ",
          "emoji": "🏃"
        },
        {
          "word": "СПИТ",
          "emoji": "😴"
        },
        {
          "word": "ПОЕТ",
          "emoji": "🎤"
        },
        {
          "word": "СТОЛ",
          "emoji": "🪑"
        }
      ],
      "oddWord": "СТОЛ",
      "explanation": "Стол — это мебель, а остальные слова — это действия!"
    },
    {
      "items": [
        {
          "word": "ЛОЖКА",
          "emoji": "🥄"
        },
        {
          "word": "ЧАШКА",
          "emoji": "☕"
        },
        {
          "word": "ТАРЕЛКА",
          "emoji": "🍽️"
        },
        {
          "word": "ПЛЫВЕТ",
          "emoji": "🏊"
        }
      ],
      "oddWord": "ПЛЫВЕТ",
      "explanation": "Плывет — это действие, а остальные — посуда!"
    }
  ],
  "pl": [
    {
      "items": [
        {
          "word": "JABŁKO",
          "emoji": "🍎"
        },
        {
          "word": "BANAN",
          "emoji": "🍌"
        },
        {
          "word": "GRUSZKA",
          "emoji": "🍐"
        },
        {
          "word": "SAMOCHÓD",
          "emoji": "🚗"
        }
      ],
      "oddWord": "SAMOCHÓD",
      "explanation": "Samochód to pojazd, a reszta to owoce!"
    },
    {
      "items": [
        {
          "word": "KOT",
          "emoji": "🐱"
        },
        {
          "word": "PIES",
          "emoji": "🐶"
        },
        {
          "word": "WILK",
          "emoji": "🐺"
        },
        {
          "word": "SAMOLOT",
          "emoji": "✈️"
        }
      ],
      "oddWord": "SAMOLOT",
      "explanation": "Samolot lata w powietrzu, a reszta to zwierzęta!"
    },
    {
      "items": [
        {
          "word": "CZAPKA",
          "emoji": "🧢"
        },
        {
          "word": "KURTKA",
          "emoji": "🧥"
        },
        {
          "word": "BUTY",
          "emoji": "👞"
        },
        {
          "word": "TALERZ",
          "emoji": "🍽️"
        }
      ],
      "oddWord": "TALERZ",
      "explanation": "Talerz to naczynie, a reszta to ubrania!"
    },
    {
      "items": [
        {
          "word": "DĄB",
          "emoji": "🌳"
        },
        {
          "word": "SOSNA",
          "emoji": "🌲"
        },
        {
          "word": "BRZOZA",
          "emoji": "🪵"
        },
        {
          "word": "PIŁKA",
          "emoji": "⚽"
        }
      ],
      "oddWord": "PIŁKA",
      "explanation": "Piłka to zabawka, a reszta to drzewa!"
    },
    {
      "items": [
        {
          "word": "MARCHEW",
          "emoji": "🥕"
        },
        {
          "word": "OGÓREK",
          "emoji": "🥒"
        },
        {
          "word": "POMIDOR",
          "emoji": "🍅"
        },
        {
          "word": "NIEDŹWIEDŹ",
          "emoji": "🐻"
        }
      ],
      "oddWord": "NIEDŹWIEDŹ",
      "explanation": "Niedźwiedź to leśne zwierzę, a reszta to warzywa!"
    },
    {
      "items": [
        {
          "word": "WRÓBEL",
          "emoji": "🐦"
        },
        {
          "word": "GOŁĄB",
          "emoji": "🕊️"
        },
        {
          "word": "BOCIAN",
          "emoji": "🪶"
        },
        {
          "word": "KROWA",
          "emoji": "🐄"
        }
      ],
      "oddWord": "KROWA",
      "explanation": "Krowa to ssak, a reszta to ptaki!"
    },
    {
      "items": [
        {
          "word": "STÓŁ",
          "emoji": "🪑"
        },
        {
          "word": "SZAFA",
          "emoji": "🚪"
        },
        {
          "word": "ŁÓŻKO",
          "emoji": "🛏️"
        },
        {
          "word": "BUŁKA",
          "emoji": "🥐"
        }
      ],
      "oddWord": "BUŁKA",
      "explanation": "Bułka to pieczywo do jedzenia, a reszta to meble!"
    },
    {
      "items": [
        {
          "word": "POCIĄG",
          "emoji": "🚂"
        },
        {
          "word": "STATEK",
          "emoji": "🚢"
        },
        {
          "word": "ROWER",
          "emoji": "🚲"
        },
        {
          "word": "ŻABA",
          "emoji": "🐸"
        }
      ],
      "oddWord": "ŻABA",
      "explanation": "Żaba to małe zwierzątko, a reszta to pojazdy!"
    },
    {
      "items": [
        {
          "word": "GITARA",
          "emoji": "🎸"
        },
        {
          "word": "BĘBEN",
          "emoji": "🥁"
        },
        {
          "word": "TRĄBKA",
          "emoji": "🎺"
        },
        {
          "word": "ŁYŻKA",
          "emoji": "🥄"
        }
      ],
      "oddWord": "ŁYŻKA",
      "explanation": "Łyżka to sztuciec do obiadu, a reszta to instrumenty!"
    },
    {
      "items": [
        {
          "word": "WIOSNA",
          "emoji": "🌱"
        },
        {
          "word": "LATO",
          "emoji": "☀️"
        },
        {
          "word": "ZIMA",
          "emoji": "❄️"
        },
        {
          "word": "ZEGAR",
          "emoji": "⏰"
        }
      ],
      "oddWord": "ZEGAR",
      "explanation": "Zegar odmierza czas, a reszta to pory roku!"
    },
    {
      "items": [
        {
          "word": "OŁÓWEK",
          "emoji": "✏️"
        },
        {
          "word": "ZESZYT",
          "emoji": "📓"
        },
        {
          "word": "PIÓRNIK",
          "emoji": "🎒"
        },
        {
          "word": "OGÓREK",
          "emoji": "🥒"
        }
      ],
      "oddWord": "OGÓREK",
      "explanation": "Ogórek to warzywo, a reszta to przybory szkolne!"
    },
    {
      "items": [
        {
          "word": "ŚNIEŻYNKA",
          "emoji": "❄️"
        },
        {
          "word": "SANKI",
          "emoji": "🛷"
        },
        {
          "word": "BAŁWAN",
          "emoji": "⛄"
        },
        {
          "word": "PALMA",
          "emoji": "🌴"
        }
      ],
      "oddWord": "PALMA",
      "explanation": "Palma rośnie w ciepłych krajach, a reszta to zima!"
    },
    {
      "items": [
        {
          "word": "BIEGA",
          "emoji": "🏃"
        },
        {
          "word": "ŚPI",
          "emoji": "😴"
        },
        {
          "word": "ŚPIEWA",
          "emoji": "🎤"
        },
        {
          "word": "STÓŁ",
          "emoji": "🪑"
        }
      ],
      "oddWord": "STÓŁ",
      "explanation": "Stół to mebel, a pozostałe słowa to czynności!"
    },
    {
      "items": [
        {
          "word": "ŁYŻKA",
          "emoji": "🥄"
        },
        {
          "word": "KUBEK",
          "emoji": "🥛"
        },
        {
          "word": "TALERZ",
          "emoji": "🍽️"
        },
        {
          "word": "PŁYWA",
          "emoji": "🏊"
        }
      ],
      "oddWord": "PŁYWA",
      "explanation": "Pływa to czynność, a reszta to naczynia!"
    }
  ],
  "en": [
    {
      "items": [
        {
          "word": "APPLE",
          "emoji": "🍎"
        },
        {
          "word": "BANANA",
          "emoji": "🍌"
        },
        {
          "word": "ORANGE",
          "emoji": "🍊"
        },
        {
          "word": "CAR",
          "emoji": "🚗"
        }
      ],
      "oddWord": "CAR",
      "explanation": "Car is a vehicle, the rest are fruits!"
    },
    {
      "items": [
        {
          "word": "CAT",
          "emoji": "🐱"
        },
        {
          "word": "DOG",
          "emoji": "🐶"
        },
        {
          "word": "LION",
          "emoji": "🦁"
        },
        {
          "word": "AIRPLANE",
          "emoji": "✈️"
        }
      ],
      "oddWord": "AIRPLANE",
      "explanation": "Airplane flies with wings, the rest are animals!"
    },
    {
      "items": [
        {
          "word": "HAT",
          "emoji": "🧢"
        },
        {
          "word": "SHIRT",
          "emoji": "👕"
        },
        {
          "word": "BOOTS",
          "emoji": "👞"
        },
        {
          "word": "PLATE",
          "emoji": "🍽️"
        }
      ],
      "oddWord": "PLATE",
      "explanation": "Plate is for food, the rest are clothes!"
    },
    {
      "items": [
        {
          "word": "OAK",
          "emoji": "🌳"
        },
        {
          "word": "PINE",
          "emoji": "🌲"
        },
        {
          "word": "BIRCH",
          "emoji": "🪵"
        },
        {
          "word": "BALL",
          "emoji": "⚽"
        }
      ],
      "oddWord": "BALL",
      "explanation": "Ball is a toy, the rest are trees!"
    },
    {
      "items": [
        {
          "word": "CARROT",
          "emoji": "🥕"
        },
        {
          "word": "CUCUMBER",
          "emoji": "🥒"
        },
        {
          "word": "TOMATO",
          "emoji": "🍅"
        },
        {
          "word": "BEAR",
          "emoji": "🐻"
        }
      ],
      "oddWord": "BEAR",
      "explanation": "Bear is an animal, the rest are vegetables!"
    },
    {
      "items": [
        {
          "word": "TABLE",
          "emoji": "🪑"
        },
        {
          "word": "CHAIR",
          "emoji": "🪑"
        },
        {
          "word": "BED",
          "emoji": "🛏️"
        },
        {
          "word": "BREAD",
          "emoji": "🍞"
        }
      ],
      "oddWord": "BREAD",
      "explanation": "Bread is food to eat, the rest are furniture!"
    },
    {
      "items": [
        {
          "word": "GUITAR",
          "emoji": "🎸"
        },
        {
          "word": "DRUM",
          "emoji": "🥁"
        },
        {
          "word": "TRUMPET",
          "emoji": "🎺"
        },
        {
          "word": "SPOON",
          "emoji": "🥄"
        }
      ],
      "oddWord": "SPOON",
      "explanation": "Spoon is cutlery, the rest are musical instruments!"
    },
    {
      "items": [
        {
          "word": "SPRING",
          "emoji": "🌱"
        },
        {
          "word": "SUMMER",
          "emoji": "☀️"
        },
        {
          "word": "WINTER",
          "emoji": "❄️"
        },
        {
          "word": "CLOCK",
          "emoji": "⏰"
        }
      ],
      "oddWord": "CLOCK",
      "explanation": "Clock tells time, the rest are seasons!"
    },
    {
      "items": [
        {
          "word": "RUN",
          "emoji": "🏃"
        },
        {
          "word": "SLEEP",
          "emoji": "😴"
        },
        {
          "word": "SING",
          "emoji": "🎤"
        },
        {
          "word": "DESK",
          "emoji": "🪑"
        }
      ],
      "oddWord": "DESK",
      "explanation": "Desk is furniture, while the other words are actions!"
    },
    {
      "items": [
        {
          "word": "SPOON",
          "emoji": "🥄"
        },
        {
          "word": "CUP",
          "emoji": "☕"
        },
        {
          "word": "PLATE",
          "emoji": "🍽️"
        },
        {
          "word": "SWIM",
          "emoji": "🏊"
        }
      ],
      "oddWord": "SWIM",
      "explanation": "Swim is an action, while the other words are tableware!"
    },
    {
      "items": [
        {
          "word": "DELIVER",
          "emoji": "📦"
        },
        {
          "word": "EXPLORE",
          "emoji": "🗺️"
        },
        {
          "word": "DISCOVER",
          "emoji": "🧭"
        },
        {
          "word": "BANANA",
          "emoji": "🍌"
        }
      ],
      "oddWord": "BANANA",
      "explanation": "Banana is a fruit, while the others are action verbs!"
    }
  ]
};

export const LETTER_PUZZLES_DATA = {
  ru: [
    {
      letter: 'Т',
      word: 'Тигр',
      emoji: '🐯',
      parts: [
        { id: 'p1', label: 'Перекладина', path: 'M 45 45 L 195 45' },
        { id: 'p2', label: 'Ножка', path: 'M 120 45 L 120 200' }
      ]
    },
    {
      letter: 'Г',
      word: 'Гриб',
      emoji: '🍄',
      parts: [
        { id: 'p1', label: 'Столбик', path: 'M 75 45 L 75 200' },
        { id: 'p2', label: 'Козырек', path: 'M 75 45 L 170 45' }
      ]
    },
    {
      letter: 'П',
      word: 'Птица',
      emoji: '🐦',
      parts: [
        { id: 'p1', label: 'Левый столбик', path: 'M 65 45 L 65 200' },
        { id: 'p2', label: 'Правый столбик', path: 'M 175 45 L 175 200' },
        { id: 'p3', label: 'Крыша', path: 'M 65 45 L 175 45' }
      ]
    },
    {
      letter: 'Н',
      word: 'Нос',
      emoji: '👃',
      parts: [
        { id: 'p1', label: 'Левый столбик', path: 'M 65 45 L 65 200' },
        { id: 'p2', label: 'Правый столбик', path: 'M 175 45 L 175 200' },
        { id: 'p3', label: 'Поясок', path: 'M 65 122 L 175 122' }
      ]
    },
    {
      letter: 'А',
      word: 'Арбуз',
      emoji: '🍉',
      parts: [
        { id: 'p1', label: 'Левая горка', path: 'M 120 42 L 55 200' },
        { id: 'p2', label: 'Правая горка', path: 'M 120 42 L 185 200' },
        { id: 'p3', label: 'Мостик', path: 'M 80 142 L 160 142' }
      ]
    },
    {
      letter: 'О',
      word: 'Остров',
      emoji: '🏝️',
      parts: [
        { id: 'p1', label: 'Левая дуга', path: 'M 120 45 A 58 75 0 0 0 120 195' },
        { id: 'p2', label: 'Правая дуга', path: 'M 120 45 A 58 75 0 0 1 120 195' }
      ]
    },
    {
      letter: 'Р',
      word: 'Рыба',
      emoji: '🐟',
      parts: [
        { id: 'p1', label: 'Столбик', path: 'M 70 42 L 70 200' },
        { id: 'p2', label: 'Кружочек', path: 'M 70 42 L 125 42 A 40 40 0 0 1 125 122 L 70 122' }
      ]
    },
    {
      letter: 'В',
      word: 'Волк',
      emoji: '🐺',
      parts: [
        { id: 'p1', label: 'Столбик', path: 'M 68 42 L 68 200' },
        { id: 'p2', label: 'Верхнее ушко', path: 'M 68 42 L 122 42 A 38 38 0 0 1 122 118 L 68 118' },
        { id: 'p3', label: 'Нижнее ушко', path: 'M 68 118 L 126 118 A 40 40 0 0 1 126 198 L 68 198' }
      ]
    }
  ],
  pl: [
    {
      letter: 'T',
      word: 'Tort',
      emoji: '🎂',
      parts: [
        { id: 'p1', label: 'Daszek', path: 'M 45 45 L 195 45' },
        { id: 'p2', label: 'Nóżka', path: 'M 120 45 L 120 200' }
      ]
    },
    {
      letter: 'L',
      word: 'Lis',
      emoji: '🦊',
      parts: [
        { id: 'p1', label: 'Słupek', path: 'M 75 42 L 75 198' },
        { id: 'p2', label: 'Podstawka', path: 'M 75 198 L 170 198' }
      ]
    },
    {
      letter: 'Ł',
      word: 'Łódź',
      emoji: '⛵',
      parts: [
        { id: 'p1', label: 'Słupek', path: 'M 75 42 L 75 198' },
        { id: 'p2', label: 'Podstawka', path: 'M 75 198 L 170 198' },
        { id: 'p3', label: 'Kreska Ł', path: 'M 50 130 L 105 105' }
      ]
    },
    {
      letter: 'A',
      word: 'Arbuz',
      emoji: '🍉',
      parts: [
        { id: 'p1', label: 'Lewa rampa', path: 'M 120 42 L 55 200' },
        { id: 'p2', label: 'Prawa rampa', path: 'M 120 42 L 185 200' },
        { id: 'p3', label: 'Mostek', path: 'M 80 142 L 160 142' }
      ]
    },
    {
      letter: 'O',
      word: 'Ogród',
      emoji: '🌻',
      parts: [
        { id: 'p1', label: 'Lewy łuk', path: 'M 120 45 A 58 75 0 0 0 120 195' },
        { id: 'p2', label: 'Prawy łuk', path: 'M 120 45 A 58 75 0 0 1 120 195' }
      ]
    },
    {
      letter: 'P',
      word: 'Pies',
      emoji: '🐶',
      parts: [
        { id: 'p1', label: 'Słupek', path: 'M 70 42 L 70 200' },
        { id: 'p2', label: 'Kółeczko', path: 'M 70 42 L 125 42 A 40 40 0 0 1 125 122 L 70 122' }
      ]
    },
    {
      letter: 'Ż',
      word: 'Żaba',
      emoji: '🐸',
      parts: [
        { id: 'p1', label: 'Góra Z', path: 'M 65 52 L 175 52' },
        { id: 'p2', label: 'Skos Z', path: 'M 175 52 L 65 192' },
        { id: 'p3', label: 'Dół Z', path: 'M 65 192 L 175 192' },
        { id: 'p4', label: 'Kropka Ż', path: 'M 120 22 L 120 22.1' }
      ]
    }
  ],
  en: [
    {
      letter: 'T',
      word: 'Tiger',
      emoji: '🐯',
      parts: [
        { id: 'p1', label: 'Top bar', path: 'M 45 45 L 195 45' },
        { id: 'p2', label: 'Stem', path: 'M 120 45 L 120 200' }
      ]
    },
    {
      letter: 'L',
      word: 'Lion',
      emoji: '🦁',
      parts: [
        { id: 'p1', label: 'Tall bar', path: 'M 75 42 L 75 198' },
        { id: 'p2', label: 'Foot', path: 'M 75 198 L 170 198' }
      ]
    },
    {
      letter: 'A',
      word: 'Apple',
      emoji: '🍎',
      parts: [
        { id: 'p1', label: 'Left slide', path: 'M 120 42 L 55 200' },
        { id: 'p2', label: 'Right slide', path: 'M 120 42 L 185 200' },
        { id: 'p3', label: 'Cross bridge', path: 'M 80 142 L 160 142' }
      ]
    },
    {
      letter: 'O',
      word: 'Orange',
      emoji: '🍊',
      parts: [
        { id: 'p1', label: 'Left curve', path: 'M 120 45 A 58 75 0 0 0 120 195' },
        { id: 'p2', label: 'Right curve', path: 'M 120 45 A 58 75 0 0 1 120 195' }
      ]
    },
    {
      letter: 'P',
      word: 'Panda',
      emoji: '🐼',
      parts: [
        { id: 'p1', label: 'Straight stem', path: 'M 70 42 L 70 200' },
        { id: 'p2', label: 'Round loop', path: 'M 70 42 L 125 42 A 40 40 0 0 1 125 122 L 70 122' }
      ]
    },
    {
      letter: 'H',
      word: 'Horse',
      emoji: '🐴',
      parts: [
        { id: 'p1', label: 'Left bar', path: 'M 65 45 L 65 200' },
        { id: 'p2', label: 'Right bar', path: 'M 175 45 L 175 200' },
        { id: 'p3', label: 'Middle bridge', path: 'M 65 122 L 175 122' }
      ]
    }
  ]
};

