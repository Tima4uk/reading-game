// Модуль фоники и чистых звуков (Science of Reading / Phonics):
// Фонемы (чистые звуки букв), артикуляционные подсказки, диграфы и ключи для локальных аудиоклипов.
// Зависимостей от других модулей не имеет (безопасно импортируется из audio.js и alphabet.js).

export const PHONEME_DATA = {
  ru: {
    'А': { fileKey: 'a', soundLabel: '[а]', spoken: 'ааа', cue: 'Широко открой ротик и тяни голос: «А-а-а!» — гласный звук 🔴.' },
    'Б': { fileKey: 'b', soundLabel: '[б]', spoken: 'б, банан', cue: 'Сомкни губы и звонко «лопни» воздух: коротко «Б!» — без «Бэ».' },
    'В': { fileKey: 'v', soundLabel: '[в-в]', spoken: 'ввв', cue: 'Верхние зубки легко касаются нижней губы, продуй голос: «В-в-в!».' },
    'Г': { fileKey: 'g', soundLabel: '[г]', spoken: 'г, гриб', cue: 'Спинка язычка звонко толкает воздух у горлышка: коротко «Г!».' },
    'Д': { fileKey: 'd', soundLabel: '[д]', spoken: 'д, дом', cue: 'Кончик языка звонко стучит за верхними зубками: коротко «Д!».' },
    'Е': { fileKey: 'e', soundLabel: '[йэ]', spoken: 'еее', cue: 'Улыбнись и мягко пропоём «Е-е-е!» — смягчает согласные перед собой 🔴.' },
    'Ё': { fileKey: 'yo', soundLabel: '[йо]', spoken: 'ёёё', cue: 'Вытяни губки вперёд и пропоём ударный звук «Ё-ё-ё!» 🔴.' },
    'Ж': { fileKey: 'zh', soundLabel: '[ж-ж]', spoken: 'жжж', cue: 'Округли губы и пожужжи как жук: «Ж-ж-ж!» — всегда твёрдый.' },
    'З': { fileKey: 'z', soundLabel: '[з-з]', spoken: 'ззз', cue: 'Улыбнись и позвени как комарик: «З-з-з!».' },
    'И': { fileKey: 'i', soundLabel: '[и]', spoken: 'иии', cue: 'Широко улыбнись и звонко потяни: «И-и-и!» — гласный звук 🔴.' },
    'Й': { fileKey: 'j', soundLabel: '[й]', spoken: 'ий', cue: 'Короткий и очень мягкий выдох с улыбкой: «Й!» (как в слове «чай»).' },
    'К': { fileKey: 'k', soundLabel: '[к]', spoken: 'к, кот', cue: 'Тихий толчок воздухом без голоса: коротко «К!» — без «Ка».' },
    'Л': { fileKey: 'l', soundLabel: '[л-л]', spoken: 'ллл', cue: 'Кончик языка упирается за верхние зубки, тянем голосом: «Л-л-л!».' },
    'М': { fileKey: 'm', soundLabel: '[м-м]', spoken: 'ммм', cue: 'Сожми губы и погуди в носик как коровка: «М-м-м!».' },
    'Н': { fileKey: 'n', soundLabel: '[н-н]', spoken: 'ннн', cue: 'Язычок за верхними зубками, звук летит в носик: «Н-н-н!».' },
    'О': { fileKey: 'o', soundLabel: '[о]', spoken: 'ооо', cue: 'Округли губки бубликом и пой: «О-о-о!» — гласный звук 🔴.' },
    'П': { fileKey: 'p', soundLabel: '[п]', spoken: 'п, птица', cue: 'Пусти пузырик губами тихо, без голоса: коротко «П!».' },
    'Р': { fileKey: 'r', soundLabel: '[р-р]', spoken: 'ррр', cue: 'Подними кончик язычка вверх и зарычи мотором: «Р-р-р!».' },
    'С': { fileKey: 's', soundLabel: '[с-с]', spoken: 'ссс', cue: 'Улыбнись и пусти прохладный ветерок сквозь зубки: «С-с-с!».' },
    'Т': { fileKey: 't', soundLabel: '[т]', spoken: 'т, тигр', cue: 'Кончик языка стучит за верхними зубками без голоса: коротко «Т!».' },
    'У': { fileKey: 'u', soundLabel: '[у]', spoken: 'ууу', cue: 'Вытяни губки узкой трубочкой и тяни как паровоз: «У-у-у!» 🔴.' },
    'Ф': { fileKey: 'f', soundLabel: '[ф-ф]', spoken: 'ффф', cue: 'Верхние зубки на нижней губке, тихо подуй без голоса: «Ф-ф-ф!».' },
    'Х': { fileKey: 'kh', soundLabel: '[х-х]', spoken: 'ххх', cue: 'Приоткрой ротик и погрей замёрзшие ладошки тёплым дыханием: «Х-х-х!».' },
    'Ц': { fileKey: 'ts', soundLabel: '[ц]', spoken: 'ц, цветок', cue: 'Соедини «т» и «с» вместе очень коротко и звонко: «Ц!».' },
    'Ч': { fileKey: 'ch', soundLabel: '[ч’]', spoken: 'ч, черепаха', cue: 'Язычок на бугорке, губки вперёд: позови паровозик «Ч!» — всегда мягкий.' },
    'Ш': { fileKey: 'sh', soundLabel: '[ш-ш]', spoken: 'шшш', cue: 'Язычок «чашечкой» кверху, зашурши как листочки: «Ш-ш-ш!».' },
    'Щ': { fileKey: 'shch', soundLabel: '[щ’]', spoken: 'щщщ', cue: 'Улыбнись с язычком «чашечкой» и мягко пошипи как щёточка: «Щ-щ-щ!».' },
    'Ъ': { fileKey: 'hard_sign', soundLabel: '[—]', spoken: 'без звука, разделяет', cue: 'Твёрдый знак не поёт — он держит согласный твёрдым перед гласной.' },
    'Ы': { fileKey: 'y', soundLabel: '[ы]', spoken: 'ыыы', cue: 'Улыбнись шире и чуть отодвинь язычок назад: тяни «Ы-ы-ы!» 🔴.' },
    'Ь': { fileKey: 'soft_sign', soundLabel: '[’]', spoken: 'без звука, смягчает', cue: 'Мягкий знак звука не имеет, но делает соседа-согласного мягким.' },
    'Э': { fileKey: 'eh', soundLabel: '[э]', spoken: 'эээ', cue: 'Приоткрой ротик как для улыбки и тяни ровно: «Э-э-э!» 🔴.' },
    'Ю': { fileKey: 'yu', soundLabel: '[йу]', spoken: 'ююю', cue: 'Сначала улыбнись, затем губки трубочкой — тяни: «Ю-ю-ю!» 🔴.' },
    'Я': { fileKey: 'ya', soundLabel: '[йа]', spoken: 'яяя', cue: 'Мягкая улыбка переходит в широкий звук: тяни «Я-я-я!» 🔴.' }
  },
  pl: {
    'A': { fileKey: 'a', soundLabel: '[a]', spoken: 'aaa', cue: 'Szeroko otwórz buzię i śpiewaj samogłoskę: «Aaa!» 🔴.' },
    'Ą': { fileKey: 'a_ogonek', soundLabel: '[ą]', spoken: 'ąąą', cue: 'Zaokrąglij usta i wyślij dźwięk przez nos: «Ąąą!» 🔴.' },
    'B': { fileKey: 'b', soundLabel: '[b]', spoken: 'b, balon', cue: 'Złącz wargi i wypowiedz krótko z głosem: «B!» (bez «be»).' },
    'C': { fileKey: 'c', soundLabel: '[c]', spoken: 'c, cytryna', cue: 'Czubek języka za dolnymi zębami, krótko i bez głosu: «C!».' },
    'Ć': { fileKey: 'c_acute', soundLabel: '[ć]', spoken: 'ć, liść', cue: 'Szeroki uśmiech i bardzo miękki syk z czubkiem języka: «Ć!».' },
    'D': { fileKey: 'd', soundLabel: '[d]', spoken: 'd, dom', cue: 'Uderz językiem za górnymi zębami z głosem: krótko «D!».' },
    'E': { fileKey: 'e', soundLabel: '[e]', spoken: 'eee', cue: 'Lekki uśmiech i wyraźna samogłoska: «Eee!» 🔴.' },
    'Ę': { fileKey: 'e_ogonek', soundLabel: '[ę]', spoken: 'ęęę', cue: 'Uśmiechnij się i puść dźwięk lekko przez nos: «Ęęę!» 🔴.' },
    'F': { fileKey: 'f', soundLabel: '[f-f]', spoken: 'f, foka', cue: 'Górne zęby na dolnej wardze, dmuchnij bez głosu: «Fff!».' },
    'G': { fileKey: 'g', soundLabel: '[g]', spoken: 'g, grzyb', cue: 'Tył języka odbija się krótko i dźwięcznie w gardle: «G!».' },
    'H': { fileKey: 'h', soundLabel: '[h-h]', spoken: 'h, herbata', cue: 'Otwórz buzię i chuchnij ciepłym powietrzem na dłonie: «H!».' },
    'I': { fileKey: 'i', soundLabel: '[i]', spoken: 'iii', cue: 'Szeroki uśmiech i cienki dźwięk samogłoski: «Iii!» 🔴.' },
    'J': { fileKey: 'j', soundLabel: '[j]', spoken: 'j, jabłko', cue: 'Środek języka unosi się miękko do góry: krótko «J!».' },
    'K': { fileKey: 'k', soundLabel: '[k]', spoken: 'k, kot', cue: 'Krótkie ciche kliknięcie tyłem języka bez głosu: «K!».' },
    'L': { fileKey: 'l', soundLabel: '[l-l]', spoken: 'lll', cue: 'Czubek języka na wałku za górnymi zębami, śpiewaj: «Lll!».' },
    'Ł': { fileKey: 'l_stroke', soundLabel: '[ł]', spoken: 'ł, łódź', cue: 'Zaokrąglij usta jak do «u» i powiedz krótko «Ł!».' },
    'M': { fileKey: 'm', soundLabel: '[m-m]', spoken: 'mmm', cue: 'Złącz wargi i pomrucz wesoło przez nos: «Mmm!».' },
    'N': { fileKey: 'n', soundLabel: '[n-n]', spoken: 'nnn', cue: 'Język za górnymi zębami, dźwięk płynie nosem: «Nnn!».' },
    'Ń': { fileKey: 'n_acute', soundLabel: '[ń]', spoken: 'ń, koń', cue: 'Uśmiech jak przy «i», miękki nosowy dźwięk: «Ń!».' },
    'O': { fileKey: 'o', soundLabel: '[o]', spoken: 'ooo', cue: 'Ułóż usta w okrągłe kółeczko: «Ooo!» 🔴.' },
    'Ó': { fileKey: 'o_acute', soundLabel: '[u]', spoken: 'uuu', cue: 'Usta w wąską rurkę — brzmi dokładnie tak jak «U» 🔴!' },
    'P': { fileKey: 'p', soundLabel: '[p]', spoken: 'p, pies', cue: 'Pęknij ustami cichą bańkę bez głosu: krótko «P!».' },
    'R': { fileKey: 'r', soundLabel: '[r-r]', spoken: 'rrr', cue: 'Zadrzyj język do góry i zawarcz jak motorek: «Rrr!».' },
    'S': { fileKey: 's', soundLabel: '[s-s]', spoken: 'sss', cue: 'Ząbki razem, uśmiech i syk małego węża: «Sss!».' },
    'Ś': { fileKey: 's_acute', soundLabel: '[ś]', spoken: 'ś, śnieg', cue: 'Szeroki uśmiech i miękkie, ciche «Ś!» jak w słowie «śnieg».' },
    'T': { fileKey: 't', soundLabel: '[t]', spoken: 't, tort', cue: 'Czubek języka lekko puka w górne zęby bez głosu: «T!».' },
    'U': { fileKey: 'u', soundLabel: '[u]', spoken: 'uuu', cue: 'Wyciągnij usta w małą rurkę jak pociąg: «Uuu!» 🔴.' },
    'W': { fileKey: 'w', soundLabel: '[w-w]', spoken: 'w, woda', cue: 'Górne zęby na dolnej wardze, dmuchnij z głosem: «W!».' },
    'Y': { fileKey: 'y', soundLabel: '[y]', spoken: 'yyy', cue: 'Usta lekko rozchylone, język płasko w środku: «Yyy!» 🔴.' },
    'Z': { fileKey: 'z', soundLabel: '[z-z]', spoken: 'zzz', cue: 'Zęby blisko, uśmiech i bzyczenie muchy z głosem: «Zzz!».' },
    'Ź': { fileKey: 'z_acute', soundLabel: '[ź]', spoken: 'ź, źrebię', cue: 'Uśmiech i miękkie, dźwięczne «Ź!» (z głosem jak brzęczyk).' },
    'Ż': { fileKey: 'z_dot', soundLabel: '[ż-ż]', spoken: 'ż, żaba', cue: 'Usta lekko wysunięte i głośne brzęczenie trzmiela: «Żżż!».' }
  },
  en: {
    'A': { fileKey: 'a', soundLabel: '/æ/', spoken: 'aah', cue: 'Drop your jaw wide and pretend to bite a crisp apple: short /æ/!' },
    'B': { fileKey: 'b', soundLabel: '/b/', spoken: 'buh', cue: 'Press lips gently and bounce the ball fast: crisp /b/, no extra "uhhh"!' },
    'C': { fileKey: 'c', soundLabel: '/k/', spoken: 'kuh', cue: 'Tap your finger like castanets in the back of the throat: crisp /k/!' },
    'D': { fileKey: 'd', soundLabel: '/d/', spoken: 'duh', cue: 'Tap your tongue behind top teeth like beating a drum: /d/!' },
    'E': { fileKey: 'e', soundLabel: '/ɛ/', spoken: 'eh', cue: 'Open slightly with a little smile and say /ɛ/ like cracking an egg!' },
    'F': { fileKey: 'f', soundLabel: '/f/', spoken: 'fuh', cue: 'Rest top teeth on bottom lip and blow soft air like a gentle fan!' },
    'G': { fileKey: 'g', soundLabel: '/ɡ/', spoken: 'guh', cue: 'Feel your throat rumble softly at the back of your tongue: /ɡ/!' },
    'H': { fileKey: 'h', soundLabel: '/h/', spoken: 'huh', cue: 'Hold a hand in front of your mouth and puff warm air softly!' },
    'I': { fileKey: 'i', soundLabel: '/ɪ/', spoken: 'ih', cue: 'Crinkle your nose like a silly igloo shiver: quick short /ɪ/!' },
    'J': { fileKey: 'j', soundLabel: '/dʒ/', spoken: 'juh', cue: 'Push lips into a little square and jump the sound out: /dʒ/!' },
    'K': { fileKey: 'k', soundLabel: '/k/', spoken: 'kuh', cue: 'Quick puff from the back of the throat — same crisp /k/ as kite!' },
    'L': { fileKey: 'l', soundLabel: '/l/', spoken: 'luh', cue: 'Lift the tip of your tongue right up behind top teeth: smooth /l/!' },
    'M': { fileKey: 'm', soundLabel: '/m/', spoken: 'mmm', cue: 'Press lips together and rub your tummy: yummy "mmm"!' },
    'N': { fileKey: 'n', soundLabel: '/n/', spoken: 'nnn', cue: 'Keep your tongue behind top teeth and hum through your nose: "nnn"!' },
    'O': { fileKey: 'o', soundLabel: '/ɒ/', spoken: 'aw', cue: 'Shape your mouth like a round O like an octopus: short /ɒ/!' },
    'P': { fileKey: 'p', soundLabel: '/p/', spoken: 'puh', cue: 'Put lips together and pop a tiny bubble of air with NO voice: /p/!' },
    'Q': { fileKey: 'q', soundLabel: '/kw/', spoken: 'kwuh', cue: 'Q and U are buddies! Round lips and say crisp /kw/ like a duck quack!' },
    'R': { fileKey: 'r', soundLabel: '/r/', spoken: 'ruh', cue: 'Curl tongue back slightly without touching roof of mouth: puppy /r/!' },
    'S': { fileKey: 's', soundLabel: '/s/', spoken: 'sss', cue: 'Smile and wiggle your hand like a hissing snake: "sss"!' },
    'T': { fileKey: 't', soundLabel: '/t/', spoken: 'tuh', cue: 'Tap tongue behind top teeth with air only: crisp tick-tock /t/!' },
    'U': { fileKey: 'u', soundLabel: '/ʌ/', spoken: 'uh', cue: 'Relax your mouth open and point UP with a short /ʌ/!' },
    'V': { fileKey: 'v', soundLabel: '/v/', spoken: 'vuh', cue: 'Top teeth on bottom lip — turn your voice ON so your lip tickles: /v/!' },
    'W': { fileKey: 'w', soundLabel: '/w/', spoken: 'wuh', cue: 'Pucker lips in a tiny circle and bounce out crisp /w/ like water!' },
    'X': { fileKey: 'x', soundLabel: '/ks/', spoken: 'ks', cue: 'Blend /k/ + /s/ together fast like taking an X-ray flash: /ks/!' },
    'Y': { fileKey: 'y', soundLabel: '/j/', spoken: 'yuh', cue: 'Slide the middle of your tongue softly like a yo-yo bouncing: /y/!' },
    'Z': { fileKey: 'z', soundLabel: '/z/', spoken: 'zzz', cue: 'Teeth together, turn your voice ON and buzz like a busy bee: "zzz"!' }
  }
};

export const PHONICS_DIGRAPHS = {
  en: [
    {
      code: 'CK',
      fileKey: 'ck',
      soundLabel: '/k/',
      emoji: '🔒',
      word: 'Lock',
      spokenPhoneme: 'kuh',
      cue: 'When C and K team up at the end of a short vowel word, they make ONE quick /k/ sound!',
      examples: [
        { word: 'LOCK', emoji: '🔒' },
        { word: 'DUCK', emoji: '🦆' },
        { word: 'SOCK', emoji: '🧦' }
      ]
    },
    {
      code: 'SH',
      fileKey: 'sh',
      soundLabel: '/ʃ/',
      emoji: '🐚',
      word: 'Shell',
      spokenPhoneme: 'shh',
      cue: 'S and H together make the quiet "hush, finger to lips" sound: "shh!"',
      examples: [
        { word: 'SHELL', emoji: '🐚' },
        { word: 'SHIP', emoji: '🚢' },
        { word: 'FISH', emoji: '🐟' }
      ]
    },
    {
      code: 'CH',
      fileKey: 'ch',
      soundLabel: '/tʃ/',
      emoji: '🧀',
      word: 'Cheese',
      spokenPhoneme: 'chuh',
      cue: 'C and H chug forward like a choo-choo train: crisp /ch/!',
      examples: [
        { word: 'CHEESE', emoji: '🧀' },
        { word: 'CHICK', emoji: '🐥' },
        { word: 'BENCH', emoji: '🪑' }
      ]
    },
    {
      code: 'TH',
      fileKey: 'th',
      soundLabel: '/θ/',
      emoji: '👍',
      word: 'Thumb',
      spokenPhoneme: 'thuh',
      cue: 'Peek just the tip of your tongue gently between teeth and blow air softly!',
      examples: [
        { word: 'THUMB', emoji: '👍' },
        { word: 'THREE', emoji: '3️⃣' },
        { word: 'BATH', emoji: '🛁' }
      ]
    },
    {
      code: 'NG',
      fileKey: 'ng',
      soundLabel: '/ŋ/',
      emoji: '💍',
      word: 'Ring',
      spokenPhoneme: 'ng',
      cue: 'N and G ring together in the nose at the end of a word like a bell: "ding-dong"!',
      examples: [
        { word: 'RING', emoji: '💍' },
        { word: 'KING', emoji: '👑' },
        { word: 'SONG', emoji: '🎵' }
      ]
    },
    {
      code: 'WH',
      fileKey: 'wh',
      soundLabel: '/w/',
      emoji: '🐳',
      word: 'Whale',
      spokenPhoneme: 'wuh',
      cue: 'W and H blow together softly into /w/ — great for question words and whale!',
      examples: [
        { word: 'WHALE', emoji: '🐳' },
        { word: 'WHEEL', emoji: '🎡' },
        { word: 'WHITE', emoji: '⬜' }
      ]
    },
    {
      code: 'PH',
      fileKey: 'ph',
      soundLabel: '/f/',
      emoji: '📱',
      word: 'Phone',
      spokenPhoneme: 'fuh',
      cue: 'When P and H team up, they borrow the /f/ sound just like fish!',
      examples: [
        { word: 'PHONE', emoji: '📱' },
        { word: 'PHOTO', emoji: '📸' },
        { word: 'DOLPHIN', emoji: '🐬' }
      ]
    },
    {
      code: 'QU',
      fileKey: 'qu',
      soundLabel: '/kw/',
      emoji: '👑',
      word: 'Queen',
      spokenPhoneme: 'kwuh',
      cue: 'Q almost always holds hands with U to say crisp /kw/ as in Queen!',
      examples: [
        { word: 'QUEEN', emoji: '👑' },
        { word: 'QUILT', emoji: '🛏️' },
        { word: 'QUACK', emoji: '🦆' }
      ]
    },
    {
      code: 'OO',
      fileKey: 'oo',
      soundLabel: '/uː/',
      emoji: '🌙',
      word: 'Moon',
      spokenPhoneme: 'ooo',
      cue: 'Two Os together round your lips like the full moon: smooth /uː/ (or short /ʊ/ in book)!',
      examples: [
        { word: 'MOON', emoji: '🌙' },
        { word: 'BOOK', emoji: '📖' },
        { word: 'ZOO', emoji: '🦁' }
      ]
    },
    {
      code: 'EE',
      fileKey: 'ee',
      soundLabel: '/iː/',
      emoji: '🐝',
      word: 'Bee',
      spokenPhoneme: 'eee',
      cue: 'Double E smiles wide together to say its long name /iː/ like a busy bee!',
      examples: [
        { word: 'BEE', emoji: '🐝' },
        { word: 'TREE', emoji: '🌳' },
        { word: 'FEET', emoji: '🦶' }
      ]
    }
  ],
  pl: [
    {
      code: 'SZ',
      fileKey: 'sz',
      soundLabel: '[sz]',
      emoji: '🧣',
      word: 'Szalik',
      spokenPhoneme: 'szu',
      cue: 'S i Z razem szumią jak jesienny wiatr lub drzewa w lesie: twarde «SZ»!',
      examples: [
        { word: 'SZALIK', emoji: '🧣' },
        { word: 'SZKOŁA', emoji: '🏫' },
        { word: 'MYSZ', emoji: '🐭' }
      ]
    },
    {
      code: 'CZ',
      fileKey: 'cz',
      soundLabel: '[cz]',
      emoji: '🎩',
      word: 'Czapka',
      spokenPhoneme: 'cza',
      cue: 'C i Z razem stukają jak wesoła lokomotywa: «CZ»!',
      examples: [
        { word: 'CZAPKA', emoji: '🎩' },
        { word: 'CZAS', emoji: '⏰' },
        { word: 'KLUCZ', emoji: '🔑' }
      ]
    },
    {
      code: 'RZ',
      fileKey: 'rz',
      soundLabel: '[ż]',
      emoji: '🌊',
      word: 'Rzeka',
      spokenPhoneme: 'żżż',
      cue: 'R i Z razem dają dokładnie taki sam dźwięk jak kropkowane «Ż»!',
      examples: [
        { word: 'RZEKA', emoji: '🌊' },
        { word: 'GRZYB', emoji: '🍄' },
        { word: 'MORZE', emoji: '⛵' }
      ]
    },
    {
      code: 'CH',
      fileKey: 'ch',
      soundLabel: '[h]',
      emoji: '🍞',
      word: 'Chleb',
      spokenPhoneme: 'ha',
      cue: 'C i H razem brzmią miękko i chuchają jak samo «H»!',
      examples: [
        { word: 'CHLEB', emoji: '🍞' },
        { word: 'CHMURA', emoji: '☁️' },
        { word: 'ORZECH', emoji: '🌰' }
      ]
    },
    {
      code: 'DZ',
      fileKey: 'dz',
      soundLabel: '[dz]',
      emoji: '🔔',
      word: 'Dzwonek',
      spokenPhoneme: 'dza',
      cue: 'D i Z brzmią razem jednym krótkim dźwiękiem — dzwonią jak dzwoneczek!',
      examples: [
        { word: 'DZWONEK', emoji: '🔔' },
        { word: 'DZBAN', emoji: '🏺' },
        { word: 'JEDZENIE', emoji: '🍽️' }
      ]
    },
    {
      code: 'DŻ',
      fileKey: 'dz_dot',
      soundLabel: '[dż]',
      emoji: '🍓',
      word: 'Dżem',
      spokenPhoneme: 'dżem',
      cue: 'D i Ż tworzą razem mocny, dźwięczny dźwięk — jak w pysznym słowie «dżem»!',
      examples: [
        { word: 'DŻEM', emoji: '🍓' },
        { word: 'DŻUNGLA', emoji: '🌴' },
        { word: 'DŻINSY', emoji: '👖' }
      ]
    },
    {
      code: 'DŹ',
      fileKey: 'dz_acute',
      soundLabel: '[dź]',
      emoji: '🐻',
      word: 'Niedźwiedź',
      spokenPhoneme: 'dźwięk',
      cue: 'D i Ź dają uśmiechnięty, bardzo miękki dźwięk — bez kropki, z kreską u góry!',
      examples: [
        { word: 'NIEDŹWIEDŹ', emoji: '🐻' },
        { word: 'DŹWIG', emoji: '🏗️' },
        { word: 'ŁÓDŹ', emoji: '⛵' }
      ]
    }
  ],
  ru: [
    {
      code: 'ЖИ',
      fileKey: 'zhi',
      soundLabel: '[жы]',
      emoji: '🦒',
      word: 'Жираф',
      spokenPhoneme: 'жы\u0301',
      cue: 'Ж всегда твёрдый! Слышится [жы], но пишется только с буквой И: ЖИ!',
      examples: [
        { word: 'ЖИРАФ', emoji: '🦒' },
        { word: 'ЖИВОТ', emoji: '🐻' },
        { word: 'ЛЫЖИ', emoji: '🎿' }
      ]
    },
    {
      code: 'ШИ',
      fileKey: 'shi',
      soundLabel: '[шы]',
      emoji: '🚗',
      word: 'Машина',
      spokenPhoneme: 'шы\u0301',
      cue: 'Ш всегда твёрдый! Слышится [шы], а на письме дружит только с И: ШИ!',
      examples: [
        { word: 'МАШИНА', emoji: '🚗' },
        { word: 'ШИШКА', emoji: '🌲' },
        { word: 'МЫШИ', emoji: '🐭' }
      ]
    },
    {
      code: 'ЧА',
      fileKey: 'cha',
      soundLabel: '[ч’а]',
      emoji: '🍵',
      word: 'Чашка',
      spokenPhoneme: 'ча\u0301',
      cue: 'Ч всегда мягкий — ему не нужна «Я»! ЧА и ЩА пиши с буквой А!',
      examples: [
        { word: 'ЧАШКА', emoji: '🍵' },
        { word: 'ЧАСЫ', emoji: '⏰' },
        { word: 'ТУЧА', emoji: '☁️' }
      ]
    },
    {
      code: 'ЩА',
      fileKey: 'shcha',
      soundLabel: '[щ’а]',
      emoji: '🌿',
      word: 'Щавель',
      spokenPhoneme: 'ща\u0301',
      cue: 'Щ всегда мягкий — смело пиши только с А: ЩА!',
      examples: [
        { word: 'ЩАВЕЛЬ', emoji: '🌿' },
        { word: 'РОЩА', emoji: '🌳' },
        { word: 'ПИЩА', emoji: '🥣' }
      ]
    },
    {
      code: 'ЧУ',
      fileKey: 'chu',
      soundLabel: '[ч’у]',
      emoji: '✨',
      word: 'Чудо',
      spokenPhoneme: 'чу\u0301',
      cue: 'Мягкий Ч дружит с буквой У — вместе поют «ЧУ»!',
      examples: [
        { word: 'ЧУДО', emoji: '✨' },
        { word: 'ЧУЛОК', emoji: '🧦' },
        { word: 'ЧУТКИЙ', emoji: '👂' }
      ]
    },
    {
      code: 'ЩУ',
      fileKey: 'shchu',
      soundLabel: '[щ’у]',
      emoji: '🐟',
      word: 'Щука',
      spokenPhoneme: 'щу\u0301',
      cue: 'Мягкий Щ также дружит только с У — вместе читаем «ЩУ»!',
      examples: [
        { word: 'ЩУКА', emoji: '🐟' },
        { word: 'ИЩУ', emoji: '🔎' },
        { word: 'ПИЩУ', emoji: '🐥' }
      ]
    },
    {
      code: 'ЧК',
      fileKey: 'chk',
      soundLabel: '[ч’к]',
      emoji: '☁️',
      word: 'Тучка',
      spokenPhoneme: 'тучка',
      cue: 'Ч само мягкое, поэтому в сочетаниях ЧК и ЧН мягкий знак никогда не нужен!',
      examples: [
        { word: 'ТУЧКА', emoji: '☁️' },
        { word: 'ДОЧКА', emoji: '👧' },
        { word: 'РЕЧКА', emoji: '🌊' }
      ]
    },
    {
      code: 'ЙО',
      fileKey: 'yo_digraph',
      soundLabel: '[йо]',
      emoji: '🍦',
      word: 'Йогурт',
      spokenPhoneme: 'йогурт',
      cue: 'В редких заимствованных словах звук [йо] в начале пишется двумя буквами: ЙО!',
      examples: [
        { word: 'ЙОГУРТ', emoji: '🍦' },
        { word: 'ЙОД', emoji: '🩹' },
        { word: 'МАЙОР', emoji: '⭐' }
      ]
    }
  ]
};

export function getLetterPhonics(letter, lang = 'ru') {
  if (!letter) return null;
  const upper = String(letter).trim().toUpperCase();
  const map = PHONEME_DATA[lang] || PHONEME_DATA.ru;
  return map[upper] || null;
}

export function getDigraphPhonics(code, lang = 'ru') {
  if (!code) return null;
  const upper = String(code).trim().toUpperCase();
  const list = PHONICS_DIGRAPHS[lang] || PHONICS_DIGRAPHS.ru;
  return list.find(d => d.code.toUpperCase() === upper) || null;
}
