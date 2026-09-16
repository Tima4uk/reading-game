// Словари для обучающей игры: Русский и Польский (с полной поддержкой всех польских букв)

export const POLISH_ALPHABET = [
  'A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł',
  'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'
];

export const RUSSIAN_ALPHABET = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О',
  'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
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
    { letter: 'Ю', emoji: '🪀', word: 'Юла' },
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
    { letter: 'Ę', emoji: '🪿', word: 'Gęś' },
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
  ]
};

// Гласные для цветового кодирования (гласные - розово-красные, согласные - сине-голубые)
export const VOWELS = {
  ru: new Set(['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я']),
  pl: new Set(['A', 'Ą', 'E', 'Ę', 'I', 'O', 'Ó', 'U', 'Y'])
};

export const WORDS_DATA = {
  ru: [
    // 3 буквы
    { word: 'КОТ', emoji: '🐱', hint: 'Мяукает и ловит мышей' },
    { word: 'ДОМ', emoji: '🏠', hint: 'В нем мы живем' },
    { word: 'ЛЕС', emoji: '🌲', hint: 'Там растут деревья' },
    { word: 'СЫР', emoji: '🧀', hint: 'Вкусный сыр с дырочками' },
    { word: 'МЯЧ', emoji: '⚽', hint: 'Круглый, можно пинать' },
    { word: 'ЖУК', emoji: '🪲', hint: 'Жужжит и ползает' },
    { word: 'НОС', emoji: '👃', hint: 'Им мы нюхаем запахи' },
    { word: 'РОТ', emoji: '👄', hint: 'Им мы едим и говорим' },
    { word: 'СОК', emoji: '🧃', hint: 'Сладкий фруктовый напиток' },
    { word: 'МАК', emoji: '🌺', hint: 'Красный полевой цветок' },
    { word: 'КИТ', emoji: '🐋', hint: 'Огромный житель океана' },
    { word: 'МЕД', emoji: '🍯', hint: 'Сладкое лакомство пчел' },
    { word: 'ЛУК', emoji: '🧅', hint: 'От него плачут глазки' },
    { word: 'ЛЕВ', emoji: '🦁', hint: 'Царь зверей' },

    // 4 буквы
    { word: 'РЫБА', emoji: '🐟', hint: 'Плавает в воде' },
    { word: 'МАМА', emoji: '👩', hint: 'Самый дорогой человек' },
    { word: 'ПАПА', emoji: '👨', hint: 'Любимый папа' },
    { word: 'ЛИСА', emoji: '🦊', hint: 'Рыжая плутовка' },
    { word: 'ВОЛК', emoji: '🐺', hint: 'Серый лесной хищник' },
    { word: 'УТКА', emoji: '🦆', hint: 'Кря-кря' },
    { word: 'ЛУНА', emoji: '🌙', hint: 'Светит ночью в небе' },
    { word: 'СЛОН', emoji: '🐘', hint: 'Огромный с хоботом' },
    { word: 'ГРИБ', emoji: '🍄', hint: 'Растет в лесу под елкой' },
    { word: 'ЗИМА', emoji: '❄️', hint: 'Время снега и санок' },
    { word: 'ЛЕТО', emoji: '☀️', hint: 'Жаркое солнечное время' },
    { word: 'НЕБО', emoji: '☁️', hint: 'Синее над головой' },
    { word: 'ВОДА', emoji: '💧', hint: 'Ее мы пьем каждый день' },
    { word: 'РОЗА', emoji: '🌹', hint: 'Красивый цветок с шипами' },
    { word: 'СНЕГ', emoji: '⛄', hint: 'Белый и холодный' },
    { word: 'ЗВУК', emoji: '🎵', hint: 'То, что мы слышим' },

    // 5 букв
    { word: 'ЛОДКА', emoji: '🛶', hint: 'Плывет по реке с веслами' },
    { word: 'ЗЕМЛЯ', emoji: '🌍', hint: 'Наша планета' },
    { word: 'ТРАВА', emoji: '🌱', hint: 'Зеленый ковер во дворе' },
    { word: 'КОШКА', emoji: '🐈', hint: 'Ласковый пушистый друг' },
    { word: 'ПТИЦА', emoji: '🐦', hint: 'Летает высоко в небе' },
    { word: 'ВИШНЯ', emoji: '🍒', hint: 'Сладкая красная ягода' },
    { word: 'КНИГА', emoji: '📖', hint: 'В ней много сказок' },
    { word: 'ДОЖДЬ', emoji: '🌧️', hint: 'Капает с неба на зонтик' },
    { word: 'ШАРИК', emoji: '🎈', hint: 'Летит высоко в воздух' },
    { word: 'ЗАЙКА', emoji: '🐰', hint: 'Длинноухий прыгун' }
  ],

  pl: [
    // 3 litery (w tym z polskimi znakami!)
    { word: 'KOT', emoji: '🐱', hint: 'Mruczy i łapie myszy' },
    { word: 'DOM', emoji: '🏠', hint: 'Nasz ciepły dom' },
    { word: 'LAS', emoji: '🌲', hint: 'Rosną w nim drzewa' },
    { word: 'SER', emoji: '🧀', hint: 'Żółty i pyszny' },
    { word: 'SOK', emoji: '🧃', hint: 'Słodki napój z owoców' },
    { word: 'LIS', emoji: '🦊', hint: 'Rudy spryciarz w lesie' },
    { word: 'BÓB', emoji: '🫘', hint: 'Pyszne warzywo (litera Ó)' },
    { word: 'KOŃ', emoji: '🐎', hint: 'Biega kłusem i rży (litera Ń)' },
    { word: 'MIŚ', emoji: '🧸', hint: 'Pluszowy przyjaciel (litera Ś)' },
    { word: 'WĄŻ', emoji: '🐍', hint: 'Długi, syczy w trawie (litery Ą, Ż)' },
    { word: 'GĘŚ', emoji: '🪿', hint: 'Gęga na łące (litery Ę, Ś)' },
    { word: 'BYK', emoji: '🐂', hint: 'Silny z rogami' },
    { word: 'LÓD', emoji: '🧊', hint: 'Zimny jak zima (litera Ó)' },
    { word: 'RÓG', emoji: '📯', hint: 'Muzyczny lub u jelenia (litera Ó)' },

    // 4 litery (z polskimi znakami: Ł, Ó, Ż, Ę, Ą, Ć, Ś)
    { word: 'RYBA', emoji: '🐟', hint: 'Pływa szybko w wodzie' },
    { word: 'MAMA', emoji: '👩', hint: 'Najukochańsza mama' },
    { word: 'TATA', emoji: '👨', hint: 'Najlepszy tata' },
    { word: 'PIES', emoji: '🐶', hint: 'Wierny przyjaciel człowieka' },
    { word: 'WILK', emoji: '🐺', hint: 'Wyje do księżyca' },
    { word: 'WODA', emoji: '💧', hint: 'Krystaliczna do picia' },
    { word: 'LATO', emoji: '☀️', hint: 'Ciepła i słoneczna pora' },
    { word: 'ZIMA', emoji: '❄️', hint: 'Czas na bałwana i sanki' },
    { word: 'PTAK', emoji: '🐦', hint: 'Śpiewa rano na gałęzi' },
    { word: 'ŻABA', emoji: '🐸', hint: 'Kumka w stawie (litera Ż)' },
    { word: 'KOŁO', emoji: '🛞', hint: 'Kręci się w rowerze (litera Ł)' },
    { word: 'ŻÓŁW', emoji: '🐢', hint: 'Chodzi powoli w pancerzu (Ż, Ó, Ł!)' },
    { word: 'ŁÓDŹ', emoji: '⛵', hint: 'Płynie po jeziorze (Ł, Ó, Ź!)' },
    { word: 'DĄB', emoji: '🌳', hint: 'Mocarne drzewo (litera Ą)' },
    { word: 'LIŚĆ', emoji: '🍂', hint: 'Spada z drzewa jesienią (Ś, Ć!)' },
    { word: 'RÓŻA', emoji: '🌹', hint: 'Piękny kwiat pachnący (Ó, Ż)' },
    { word: 'GÓRA', emoji: '⛰️', hint: 'Wysoka ze śniegiem (litera Ó)' },
    { word: 'ZĄB', emoji: '🦷', hint: 'Myjemy go codziennie (litera Ą)' },
    { word: 'KOZA', emoji: '🐐', hint: 'Lubi skakać i daje mleko' },

    // 5-6 liter
    { word: 'KROWA', emoji: '🐄', hint: 'Daje pyszne mleko' },
    { word: 'JABŁKO', emoji: '🍎', hint: 'Czerwone, soczyste (litera Ł)' },
    { word: 'SŁOŃCE', emoji: '🌞', hint: 'Świeci wysoko na niebie (Ł, Ń)' },
    { word: 'KSIĄŻKA', emoji: '📖', hint: 'Czytamy z niej bajki (Ą, Ż)' },
    { word: 'BAŁWAN', emoji: '⛄', hint: 'Ulepiony ze śniegu (litera Ł)' },
    { word: 'CHLEB', emoji: '🍞', hint: 'Pachnący z piekarni' },
    { word: 'SERCE', emoji: '❤️', hint: 'Bije z miłości' },
    { word: 'DRZEWO', emoji: '🌳', hint: 'Zielone w ogrodzie' },
    { word: 'ŚNIEG', emoji: '🌨️', hint: 'Biały puch w zimie (litera Ś)' },
    { word: 'MOTYL', emoji: '🦋', hint: 'Kolorowy na łące' },
    { word: 'POCIĄG', emoji: '🚂', hint: 'Jedzie po torach (litera Ą)' },
    { word: 'ZAJĄC', emoji: '🐇', hint: 'Kica po trawie (litera Ą)' }
  ]
};

// Сложные слова для продвинутого уровня (8x8) — колоритный польский с переводами для взрослых и продвинутых
export const WORDS_DATA_HARD = {
  pl: [
    { word: 'CHRZĄSZCZ', emoji: '🪲', hint: 'хрущ / майский жук' },
    { word: 'SZCZĘŚCIE', emoji: '🍀', hint: 'счастье, удача' },
    { word: 'PSZCZOŁA', emoji: '🐝', hint: 'пчела' },
    { word: 'NIEDŹWIEDŹ', emoji: '🐻', hint: 'медведь' },
    { word: 'TRUSKAWKA', emoji: '🍓', hint: 'клубника' },
    { word: 'KSIĘŻYC', emoji: '🌙', hint: 'луна, месяц' },
    { word: 'BŁYSKAWICA', emoji: '⚡', hint: 'молния' },
    { word: 'CZEKOLADA', emoji: '🍫', hint: 'шоколад' },
    { word: 'DZIĘCIOŁ', emoji: '🪵', hint: 'дятел' },
    { word: 'SAMOCHÓD', emoji: '🚗', hint: 'автомобиль' },
    { word: 'PRZYJACIEL', emoji: '🤝', hint: 'друг' },
    { word: 'PRZYGODA', emoji: '🗺️', hint: 'приключение' },
    { word: 'ŚWIEŻOŚĆ', emoji: '🍃', hint: 'свежесть' },
    { word: 'PIEROGI', emoji: '🥟', hint: 'вареники' },
    { word: 'JARZĘBINA', emoji: '🍒', hint: 'рябина' },
    { word: 'JASTRZĄB', emoji: '🦅', hint: 'ястреб' },
    { word: 'WIELBŁĄD', emoji: '🐪', hint: 'верблюд' },
    { word: 'WIEWIÓRKA', emoji: '🐿️', hint: 'белочка' },
    { word: 'JASZCZURKA', emoji: '🦎', hint: 'ящерица' },
    { word: 'PARASOL', emoji: '☂️', hint: 'зонт' },
    { word: 'DROŻDŻE', emoji: '🍞', hint: 'дрожжи' },
    { word: 'ZMIERZCH', emoji: '🌆', hint: 'сумерки' },
    { word: 'DZWONECZEK', emoji: '🔔', hint: 'колокольчик' },
    { word: 'POZIOMKA', emoji: '🍓', hint: 'земляника' },
    { word: 'PORZECZKA', emoji: '🫐', hint: 'смородина' },
    { word: 'PRZEPIÓRKA', emoji: '🐦', hint: 'перепелка' },
    { word: 'KROKODYL', emoji: '🐊', hint: 'крокодил' },
    { word: 'SZCZYPIOREK', emoji: '🌱', hint: 'зеленый лук' }
  ],
  ru: [
    { word: 'КОСМОНАВТ', emoji: '👨‍🚀', hint: 'летит к далеким звездам' },
    { word: 'СОЛНЫШКО', emoji: '☀️', hint: 'теплое и ласковое' },
    { word: 'ЗЕМЛЯНИКА', emoji: '🍓', hint: 'сладкая лесная ягода' },
    { word: 'ВЕРТОЛЕТ', emoji: '🚁', hint: 'летает с винтом' },
    { word: 'ОДУВАНЧИК', emoji: '🌼', hint: 'желтый пушистый цветок' },
    { word: 'КРОКОДИЛ', emoji: '🐊', hint: 'зеленый в реке' },
    { word: 'МЕДВЕДИЦА', emoji: '🐻', hint: 'мама медвежат' },
    { word: 'ПРИКЛЮЧЕНИЕ', emoji: '🗺️', hint: 'увлекательный поход' },
    { word: 'ТЕЛЕВИЗОР', emoji: '📺', hint: 'показывает передачи' },
    { word: 'ЧЕРЕПАХА', emoji: '🐢', hint: 'с крепким панцирем' },
    { word: 'СНЕГОВИК', emoji: '⛄', hint: 'из снега с морковкой' }
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
  ]
};

// ==========================================
// ДАННЫЕ ДЛЯ РЕЖИМА «НАЙДИ РИФМУ» (7 ЛЕТ)
// ==========================================
export const RHYMES_DATA = {
  ru: [
    {
      target: { word: 'КОТ', emoji: '🐱' },
      correct: { word: 'РОТ', emoji: '👄' },
      distractors: [
        { word: 'ЛЕС', emoji: '🌲' },
        { word: 'МЯЧ', emoji: '⚽' }
      ]
    },
    {
      target: { word: 'ДОМ', emoji: '🏠' },
      correct: { word: 'СОМ', emoji: '🐟' },
      distractors: [
        { word: 'СЫР', emoji: '🧀' },
        { word: 'ЖУК', emoji: '🪲' }
      ]
    },
    {
      target: { word: 'МЫШКА', emoji: '🐭' },
      correct: { word: 'КРЫШКА', emoji: '🫙' },
      distractors: [
        { word: 'ЛОДКА', emoji: '🛶' },
        { word: 'РЫБА', emoji: '🐟' }
      ]
    },
    {
      target: { word: 'ЛУК', emoji: '🧅' },
      correct: { word: 'ЖУК', emoji: '🪲' },
      distractors: [
        { word: 'НОС', emoji: '👃' },
        { word: 'СЛОН', emoji: '🐘' }
      ]
    },
    {
      target: { word: 'ЛИМОН', emoji: '🍋' },
      correct: { word: 'БАТОН', emoji: '🥖' },
      distractors: [
        { word: 'ВОЛК', emoji: '🐺' },
        { word: 'ГРИБ', emoji: '🍄' }
      ]
    },
    {
      target: { word: 'СНЕГ', emoji: '❄️' },
      correct: { word: 'БЕГ', emoji: '🏃' },
      distractors: [
        { word: 'УТКА', emoji: '🦆' },
        { word: 'ЧАЙ', emoji: '🍵' }
      ]
    },
    {
      target: { word: 'КАША', emoji: '🥣' },
      correct: { word: 'ДАША', emoji: '👧' },
      distractors: [
        { word: 'ЗИМА', emoji: '⛄' },
        { word: 'НЕБО', emoji: '☁️' }
      ]
    },
    {
      target: { word: 'МАК', emoji: '🌺' },
      correct: { word: 'РАК', emoji: '🦞' },
      distractors: [
        { word: 'КИТ', emoji: '🐋' },
        { word: 'МЕД', emoji: '🍯' }
      ]
    },
    {
      target: { word: 'ШАР', emoji: '🎈' },
      correct: { word: 'ЖАР', emoji: '🔥' },
      distractors: [
        { word: 'ЛЕВ', emoji: '🦁' },
        { word: 'СОК', emoji: '🧃' }
      ]
    }
  ],
  pl: [
    {
      target: { word: 'KOT', emoji: '🐱' },
      correct: { word: 'PŁOT', emoji: '🪵' },
      distractors: [
        { word: 'LAS', emoji: '🌲' },
        { word: 'SER', emoji: '🧀' }
      ]
    },
    {
      target: { word: 'DOM', emoji: '🏠' },
      correct: { word: 'GROM', emoji: '⚡' },
      distractors: [
        { word: 'PIES', emoji: '🐶' },
        { word: 'WODA', emoji: '💧' }
      ]
    },
    {
      target: { word: 'RYBA', emoji: '🐟' },
      correct: { word: 'SZYBA', emoji: '🪟' },
      distractors: [
        { word: 'WILK', emoji: '🐺' },
        { word: 'PTAK', emoji: '🐦' }
      ]
    },
    {
      target: { word: 'DĄB', emoji: '🌳' },
      correct: { word: 'ZĄB', emoji: '🦷' },
      distractors: [
        { word: 'BÓB', emoji: '🫘' },
        { word: 'KOŃ', emoji: '🐎' }
      ]
    },
    {
      target: { word: 'KROWA', emoji: '🐄' },
      correct: { word: 'SOWA', emoji: '🦉' },
      distractors: [
        { word: 'LATO', emoji: '☀️' },
        { word: 'ZIMA', emoji: '❄️' }
      ]
    },
    {
      target: { word: 'LAS', emoji: '🌲' },
      correct: { word: 'PAS', emoji: '🥋' },
      distractors: [
        { word: 'MIŚ', emoji: '🧸' },
        { word: 'BYK', emoji: '🐂' }
      ]
    },
    {
      target: { word: 'ŻABA', emoji: '🐸' },
      correct: { word: 'BABA', emoji: '👵' },
      distractors: [
        { word: 'KOŁO', emoji: '🛞' },
        { word: 'LIŚĆ', emoji: '🍂' }
      ]
    },
    {
      target: { word: 'RÓŻA', emoji: '🌹' },
      correct: { word: 'BURZA', emoji: '⛈️' },
      distractors: [
        { word: 'GÓRA', emoji: '⛰️' },
        { word: 'CHLEB', emoji: '🍞' }
      ]
    },
    {
      target: { word: 'RAK', emoji: '🦞' },
      correct: { word: 'MAK', emoji: '🌺' },
      distractors: [
        { word: 'KROK', emoji: '👣' },
        { word: 'LIS', emoji: '🦊' }
      ]
    },
    {
      target: { word: 'KOSZ', emoji: '🧺' },
      correct: { word: 'GROSZ', emoji: '🪙' },
      distractors: [
        { word: 'BUT', emoji: '👞' },
        { word: 'SER', emoji: '🧀' }
      ]
    },
    {
      target: { word: 'BĄK', emoji: '🐝' },
      correct: { word: 'PĄK', emoji: '🌷' },
      distractors: [
        { word: 'PTAK', emoji: '🐦' },
        { word: 'CHLEB', emoji: '🍞' }
      ]
    },
    {
      target: { word: 'KACZKA', emoji: '🦆' },
      correct: { word: 'PACZKA', emoji: '📦' },
      distractors: [
        { word: 'JAJKO', emoji: '🥚' },
        { word: 'WODA', emoji: '💧' }
      ]
    },
    {
      target: { word: 'DZWON', emoji: '🔔' },
      correct: { word: 'TRON', emoji: '👑' },
      distractors: [
        { word: 'DOM', emoji: '🏠' },
        { word: 'KOT', emoji: '🐱' }
      ]
    },
    {
      target: { word: 'KRET', emoji: '🦔' },
      correct: { word: 'BERET', emoji: '🧢' },
      distractors: [
        { word: 'LAS', emoji: '🌲' },
        { word: 'SER', emoji: '🧀' }
      ]
    },
    {
      target: { word: 'KOS', emoji: '🐦' },
      correct: { word: 'NOS', emoji: '👃' },
      distractors: [
        { word: 'OKO', emoji: '👁️' },
        { word: 'UCHO', emoji: '👂' }
      ]
    },
    {
      target: { word: 'BAL', emoji: '🎉' },
      correct: { word: 'SZAL', emoji: '🧣' },
      distractors: [
        { word: 'TORT', emoji: '🎂' },
        { word: 'MIŚ', emoji: '🧸' }
      ]
    }
  ]
};

// ==========================================
// ДАННЫЕ ДЛЯ РЕЖИМА «ЛИШНЕЕ СЛОВО» (7 ЛЕТ)
// ==========================================
export const ODD_ONE_OUT_DATA = {
  ru: [
    {
      items: [
        { word: 'ЯБЛОКО', emoji: '🍎' },
        { word: 'БАНАН', emoji: '🍌' },
        { word: 'ГРУША', emoji: '🍐' },
        { word: 'МАШИНА', emoji: '🚗' }
      ],
      oddWord: 'МАШИНА',
      explanation: 'Машина — это транспорт, а остальные — фрукты!'
    },
    {
      items: [
        { word: 'КОТ', emoji: '🐱' },
        { word: 'СОБАКА', emoji: '🐶' },
        { word: 'ЛИСА', emoji: '🦊' },
        { word: 'САМОЛЕТ', emoji: '✈️' }
      ],
      oddWord: 'САМОЛЕТ',
      explanation: 'Самолет летает на моторе, а остальные — животные!'
    },
    {
      items: [
        { word: 'ШАПКА', emoji: '🧢' },
        { word: 'КУРТКА', emoji: '🧥' },
        { word: 'БОТИНКИ', emoji: '👞' },
        { word: 'ТАРЕЛКА', emoji: '🍽️' }
      ],
      oddWord: 'ТАРЕЛКА',
      explanation: 'Тарелка — это посуда, а остальные — одежда!'
    },
    {
      items: [
        { word: 'БЕРЕЗА', emoji: '🌳' },
        { word: 'ЕЛЬ', emoji: '🌲' },
        { word: 'ДУБ', emoji: '🪵' },
        { word: 'МЯЧИК', emoji: '⚽' }
      ],
      oddWord: 'МЯЧИК',
      explanation: 'Мячик — это игрушка, а остальные — деревья!'
    },
    {
      items: [
        { word: 'МОРКОВЬ', emoji: '🥕' },
        { word: 'ОГУРЕЦ', emoji: '🥒' },
        { word: 'ПОМИДОР', emoji: '🍅' },
        { word: 'МЕДВЕДЬ', emoji: '🐻' }
      ],
      oddWord: 'МЕДВЕДЬ',
      explanation: 'Медведь — это зверь, а остальные — овощи!'
    }
  ],
  pl: [
    {
      items: [
        { word: 'JABŁKO', emoji: '🍎' },
        { word: 'BANAN', emoji: '🍌' },
        { word: 'GRUSZKA', emoji: '🍐' },
        { word: 'SAMOCHÓD', emoji: '🚗' }
      ],
      oddWord: 'SAMOCHÓD',
      explanation: 'Samochód to pojazd, a reszta to owoce!'
    },
    {
      items: [
        { word: 'KOT', emoji: '🐱' },
        { word: 'PIES', emoji: '🐶' },
        { word: 'WILK', emoji: '🐺' },
        { word: 'SAMOLOT', emoji: '✈️' }
      ],
      oddWord: 'SAMOLOT',
      explanation: 'Samolot lata w powietrzu, a reszta to zwierzęta!'
    },
    {
      items: [
        { word: 'CZAPKA', emoji: '🧢' },
        { word: 'KURTKA', emoji: '🧥' },
        { word: 'BUTY', emoji: '👞' },
        { word: 'TALERZ', emoji: '🍽️' }
      ],
      oddWord: 'TALERZ',
      explanation: 'Talerz to naczynie, a reszta to ubrania!'
    },
    {
      items: [
        { word: 'DĄB', emoji: '🌳' },
        { word: 'SOSNA', emoji: '🌲' },
        { word: 'BRZOZA', emoji: '🪵' },
        { word: 'PIŁKA', emoji: '⚽' }
      ],
      oddWord: 'PIŁKA',
      explanation: 'Piłka to zabawka, a reszta to drzewa!'
    },
    {
      items: [
        { word: 'MARCHEW', emoji: '🥕' },
        { word: 'OGÓREK', emoji: '🥒' },
        { word: 'POMIDOR', emoji: '🍅' },
        { word: 'NIEDŹWIEDŹ', emoji: '🐻' }
      ],
      oddWord: 'NIEDŹWIEDŹ',
      explanation: 'Niedźwiedź to leśne zwierzę, a reszta to warzywa!'
    },
    {
      items: [
        { word: 'WRÓBEL', emoji: '🐦' },
        { word: 'GOŁĄB', emoji: '🕊️' },
        { word: 'BOCIAN', emoji: '🪶' },
        { word: 'KROWA', emoji: '🐄' }
      ],
      oddWord: 'KROWA',
      explanation: 'Krowa to ssak, a reszta to ptaki!'
    },
    {
      items: [
        { word: 'STÓŁ', emoji: '🪑' },
        { word: 'SZAFA', emoji: '🚪' },
        { word: 'ŁÓŻKO', emoji: '🛏️' },
        { word: 'BUŁKA', emoji: '🥐' }
      ],
      oddWord: 'BUŁKA',
      explanation: 'Bułka to pieczywo do jedzenia, a reszta to meble!'
    },
    {
      items: [
        { word: 'POCIĄG', emoji: '🚂' },
        { word: 'STATEK', emoji: '🚢' },
        { word: 'ROWER', emoji: '🚲' },
        { word: 'ŻABA', emoji: '🐸' }
      ],
      oddWord: 'ŻABA',
      explanation: 'Żaba to małe zwierzątko, a reszta to pojazdy!'
    },
    {
      items: [
        { word: 'GITARA', emoji: '🎸' },
        { word: 'BĘBEN', emoji: '🥁' },
        { word: 'TRĄBKA', emoji: '🎺' },
        { word: 'ŁYŻKA', emoji: '🥄' }
      ],
      oddWord: 'ŁYŻKA',
      explanation: 'Łyżka to sztuciec do obiadu, a reszta to instrumenty!'
    },
    {
      items: [
        { word: 'WIOSNA', emoji: '🌱' },
        { word: 'LATO', emoji: '☀️' },
        { word: 'ZIMA', emoji: '❄️' },
        { word: 'ZEGAR', emoji: '⏰' }
      ],
      oddWord: 'ZEGAR',
      explanation: 'Zegar odmierza czas, a reszta to pory roku!'
    },
    {
      items: [
        { word: 'OŁÓWEK', emoji: '✏️' },
        { word: 'ZESZYT', emoji: '📓' },
        { word: 'PIÓRNIK', emoji: '🎒' },
        { word: 'OGÓREK', emoji: '🥒' }
      ],
      oddWord: 'OGÓREK',
      explanation: 'Ogórek to warzywo, a reszta to przybory szkolne!'
    },
    {
      items: [
        { word: 'ŚNIEŻYNKA', emoji: '❄️' },
        { word: 'SANKI', emoji: '🛷' },
        { word: 'BAŁWAN', emoji: '⛄' },
        { word: 'PALMA', emoji: '🌴' }
      ],
      oddWord: 'PALMA',
      explanation: 'Palma rośnie w ciepłych krajach, a reszta to zima!'
    }
  ]
};

// ==========================================
// ДАННЫЕ ДЛЯ «КОНСТРУКТОРА БУКВ» (4.5 ГОДА)
// ==========================================
export const LETTER_PUZZLES_DATA = {
  ru: [
    {
      letter: 'Т',
      word: 'Тигр',
      emoji: '🐯',
      parts: [
        { id: 'p1', type: 'h-bar', label: 'Перекладина' },
        { id: 'p2', type: 'v-bar', label: 'Ножка' }
      ]
    },
    {
      letter: 'Г',
      word: 'Гриб',
      emoji: '🍄',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Столбик' },
        { id: 'p2', type: 'h-half-bar', label: 'Козырек' }
      ]
    },
    {
      letter: 'П',
      word: 'Птица',
      emoji: '🐦',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Левый столбик' },
        { id: 'p2', type: 'v-bar', label: 'Правый столбик' },
        { id: 'p3', type: 'h-bar', label: 'Крыша' }
      ]
    },
    {
      letter: 'Н',
      word: 'Нос',
      emoji: '👃',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Левый столбик' },
        { id: 'p2', type: 'v-bar', label: 'Правый столбик' },
        { id: 'p3', type: 'h-mid-bar', label: 'Поясок' }
      ]
    },
    {
      letter: 'А',
      word: 'Арбуз',
      emoji: '🍉',
      parts: [
        { id: 'p1', type: 'diag-left', label: 'Левая горка' },
        { id: 'p2', type: 'diag-right', label: 'Правая горка' },
        { id: 'p3', type: 'h-mid-bar', label: 'Мостик' }
      ]
    },
    {
      letter: 'О',
      word: 'Остров',
      emoji: '🏝️',
      parts: [
        { id: 'p1', type: 'arc-left', label: 'Левая дуга' },
        { id: 'p2', type: 'arc-right', label: 'Правая дуга' }
      ]
    },
    {
      letter: 'Р',
      word: 'Рыба',
      emoji: '🐟',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Столбик' },
        { id: 'p2', type: 'arc-top-right', label: 'Кружочек' }
      ]
    },
    {
      letter: 'В',
      word: 'Волк',
      emoji: '🐺',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Столбик' },
        { id: 'p2', type: 'arc-top-right', label: 'Верхнее ушко' },
        { id: 'p3', type: 'arc-bot-right', label: 'Нижнее ушко' }
      ]
    }
  ],
  pl: [
    {
      letter: 'T',
      word: 'Tort',
      emoji: '🎂',
      parts: [
        { id: 'p1', type: 'h-bar', label: 'Daszek' },
        { id: 'p2', type: 'v-bar', label: 'Nóżka' }
      ]
    },
    {
      letter: 'L',
      word: 'Lis',
      emoji: '🦊',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Słupek' },
        { id: 'p2', type: 'h-half-bar', label: 'Podstawka' }
      ]
    },
    {
      letter: 'Ł',
      word: 'Łódź',
      emoji: '⛵',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Słupek' },
        { id: 'p2', type: 'h-half-bar', label: 'Podstawka' },
        { id: 'p3', type: 'cross-tick', label: 'Kreska Ł' }
      ]
    },
    {
      letter: 'A',
      word: 'Arbuz',
      emoji: '🍉',
      parts: [
        { id: 'p1', type: 'diag-left', label: 'Lewa rampa' },
        { id: 'p2', type: 'diag-right', label: 'Prawa rampa' },
        { id: 'p3', type: 'h-mid-bar', label: 'Mostek' }
      ]
    },
    {
      letter: 'O',
      word: 'Ogród',
      emoji: '🌻',
      parts: [
        { id: 'p1', type: 'arc-left', label: 'Lewy łuk' },
        { id: 'p2', type: 'arc-right', label: 'Prawy łuk' }
      ]
    },
    {
      letter: 'P',
      word: 'Pies',
      emoji: '🐶',
      parts: [
        { id: 'p1', type: 'v-bar', label: 'Słupek' },
        { id: 'p2', type: 'arc-top-right', label: 'Kółeczko' }
      ]
    },
    {
      letter: 'Ż',
      word: 'Żaba',
      emoji: '🐸',
      parts: [
        { id: 'p1', type: 'h-bar', label: 'Góra Z' },
        { id: 'p2', type: 'diag-left', label: 'Skos Z' },
        { id: 'p3', type: 'h-bar', label: 'Dół Z' },
        { id: 'p4', type: 'dot-mark', label: 'Kropka Ż' }
      ]
    }
  ]
};

