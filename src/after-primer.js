// Модуль «Первая книга для чтения после букваря» (7 историй с комиксами, мини-квестами, эмоциями и логикой)
// Поддерживает RU / PL / EN и переключатель «По слогам / Обычный текст».

import { shuffleArray } from './data.js?v=29';
import { sound } from './audio.js?v=29';

const UI_TEXTS = {
  ru: {
    intro: '📖 Короткие сказки-комиксы: тренируй чтение, разгадывай эмоции героев и собирай звёздочки!',
    storyPrefix: 'История',
    modeSyllables: '🧩 По слогам',
    modePlain: '📖 Обычный текст',
    steps: ['Разминка', 'Сцена 1', 'Эмоции', 'Финал', 'Порядок'],
    ladderTitle: '🪜 Лесенка чтения: нажимай на слова и читай от коротких к длинным',
    huntTitle: '🔎 Найди слово из истории',
    speakScene: '🔊 Прочитать сцену',
    questTitle: '🗺️ Мини-квест по сюжету',
    emotionTitle: '💛 Тренажёр эмоций',
    empathyLabel: '💡 Подсказка для суперчитателя:',
    factsTitle: '🕵️ Логика и внимание: правда или выдумка?',
    factTrue: '✅ Правда',
    factFalse: '❌ Выдумка',
    seqTitle: '🎬 Пересказ по порядку: что было сначала, а что потом?',
    seqHint: 'Нажимай на события по очереди: 1 → 2 → 3',
    seqSlot: 'Событие',
    storyDoneTitle: 'История пройдена! Ты настоящий суперчитатель!',
    nextStep: 'Дальше ➡️',
    nextStory: 'Следующая история ➡️',
    finishBook: '🏆 Все истории прочитаны! Выбери любимую выше',
    greatJob: 'Молодец! Верно!',
    tryAgain: 'Подумай ещё чуть-чуть!',
    readDone: 'Прочитано'
  },
  pl: {
    intro: '📖 Krótkie komiksy po elementarzu: ćwicz czytanie, odkrywaj emocje bohaterów i zbieraj gwiazdki!',
    storyPrefix: 'Historia',
    modeSyllables: '🧩 Sylabami',
    modePlain: '📖 Zwykły tekst',
    steps: ['Rozgrzewka', 'Scena 1', 'Emocje', 'Finał', 'Kolejność'],
    ladderTitle: '🪜 Drabinka słów: klikaj słowa i czytaj od krótkich do długich',
    huntTitle: '🔎 Znajdź słowo z opowieści',
    speakScene: '🔊 Przeczytaj scenę',
    questTitle: '🗺️ Mini-quest fabularny',
    emotionTitle: '💛 Trener emocji',
    empathyLabel: '💡 Wskazówka dla superczytelnika:',
    factsTitle: '🕵️ Logika i uwaga: prawda czy zmyślenie?',
    factTrue: '✅ Prawda',
    factFalse: '❌ Zmyślenie',
    seqTitle: '🎬 Opowiedz po kolei: co było najpierw, a co potem?',
    seqHint: 'Klikaj wydarzenia po kolei: 1 → 2 → 3',
    seqSlot: 'Krok',
    storyDoneTitle: 'Historia ukończona! Jesteś superczytelnikiem!',
    nextStep: 'Dalej ➡️',
    nextStory: 'Następna historia ➡️',
    finishBook: '🏆 Wszystkie historie przeczytane! Wybierz ulubioną wyżej',
    greatJob: 'Brawo! Znakomicie!',
    tryAgain: 'Sprawdź jeszcze raz!',
    readDone: 'Przeczytane'
  },
  en: {
    intro: '📖 Short comic stories after the primer: practice reading, explore feelings, and earn stars!',
    storyPrefix: 'Story',
    modeSyllables: '🧩 Syllables',
    modePlain: '📖 Plain Text',
    steps: ['Warmup', 'Scene 1', 'Feelings', 'Finale', 'Order'],
    ladderTitle: '🪜 Reading Ladder: tap each word and read from short to long',
    huntTitle: '🔎 Spot the story word',
    speakScene: '🔊 Read scene aloud',
    questTitle: '🗺️ Story Mini-Quest',
    emotionTitle: '💛 Emotion Explorer',
    empathyLabel: '💡 Super-reader tip:',
    factsTitle: '🕵️ Logic Check: True or Fiction?',
    factTrue: '✅ True',
    factFalse: '❌ Fiction',
    seqTitle: '🎬 Put the story in order: what happened 1 → 2 → 3?',
    seqHint: 'Tap the story cards in order: 1 → 2 → 3',
    seqSlot: 'Part',
    storyDoneTitle: 'Story complete! You are a super reader!',
    nextStep: 'Next ➡️',
    nextStory: 'Next Story ➡️',
    finishBook: '🏆 All 7 stories finished! Pick any story above',
    greatJob: 'Great job! Spot on!',
    tryAgain: 'Have another look!',
    readDone: 'Read'
  }
};

export const AFTER_PRIMER_STORIES = {
  ru: [
    {
      id: 'hedgehog-lantern',
      num: 1,
      emoji: '🦔',
      shortTitle: 'Ё·жик и фо·на·рик',
      title: 'Ё·жик Ти·ша и по·те·рян·ный фо·на·рик',
      color: '#f59e0b',
      ladder: [
        { syl: 'ЛЕС', emoji: '🌲' },
        { syl: 'ТИ·ША', emoji: '🦔' },
        { syl: 'ФО·НА·РИК', emoji: '🔦' },
        { syl: 'ТРО·ПИН·КА', emoji: '🥾' },
        { syl: 'СВЕТ·ЛЯ·ЧОК', emoji: '✨' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Най·ди сло·во, ко·то·ро·е по·мо·га·ет све·тить в тем·но·те:',
      scene1: {
        backdrop: '🌲🌙🦉',
        caption: 'На ле·сной по·ля·не бы·стро на·сту·пал ве·чер.',
        panels: [
          { speaker: '🦔 Ти·ша', text: 'Ой! Я по·те·рял свой жёл·тый фо·на·рик!' },
          { speaker: '🐿️ Бе·лоч·ка', text: 'Не гру·сти! Мо·жет, он о·стал·ся у ру·чья?' }
        ],
        questQuestion: 'Ку·да бе·лоч·ка по·со·ве·то·ва·ла спер·ва за·гля·нуть?',
        questOptions: ['К ру·чью', 'На кры·шу', 'В нор·ку'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🌊🌿😟',
        caption: 'У ру·чья фо·на·ри·ка не бы·ло. Ста·ло со·всем тем·но.',
        panels: [
          { speaker: '🦔 Ти·ша', text: 'Тут пу·сто... Мне страш·но од·но·му в тем·но·те.' },
          { speaker: '🦉 Со·ва', text: 'Я с то·бой! По·смо·три вон на тот ста·рый пень!' }
        ],
        emotionQuestion: 'Что по·чув·ство·вал Ти·ша, ко·гда не на·шёл фо·на·рик?',
        emotions: [
          { emoji: '😟', label: 'Тре·во·гу и страх' },
          { emoji: '😂', label: 'Ве·сё·лый смех' },
          { emoji: '😴', label: 'Сон·ли·вость' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Ес·ли ста·ло страш·но — ска·жи дру·гу! Вме·сте ис·кать го·раз·до сме·ле·е.'
      },
      scene3: {
        backdrop: '🪵✨🎉',
        caption: 'На ста·ром пне ми·гал кро·шеч·ный жёл·тый о·го·нёк!',
        panels: [
          { speaker: '🐞 Свет·ля·чок', text: 'При·вет! Я о·хра·нял твой фо·на·рик, по·ка ты вер·нёшь·ся!' },
          { speaker: '🦔 Ти·ша', text: 'Спа·си·бо! Те·перь у нас це·лых два о·гонь·ка!' }
        ],
        facts: [
          { statement: 'Фо·на·рик ле·жал на ста·ром пне.', isTrue: true },
          { statement: 'Фо·на·рик у·та·щи·ла хи·тра·я ли·са.', isTrue: false }
        ]
      },
      sequence: [
        'Ти·ша по·те·рял жёл·тый фо·на·рик и по·шёл к ру·чью.',
        'Со·ва под·дер·жа·ла ё·жи·ка и за·ме·ти·ла о·го·нёк на пне.',
        'Свет·ля·чок вер·нул фо·на·рик, и все друж·но по·шли до·мой.'
      ]
    },
    {
      id: 'kitten-umbrella',
      num: 2,
      emoji: '🐱',
      shortTitle: 'Ко·тё·нок и зонт',
      title: 'Ко·тё·нок Пу·шок и боль·шой зонт',
      color: '#3b82f6',
      ladder: [
        { syl: 'ЗОНТ', emoji: '☂️' },
        { syl: 'ТУ·ЧА', emoji: '🌧️' },
        { syl: 'ПУ·ШОК', emoji: '🐱' },
        { syl: 'ЛА·ВОЧ·КА', emoji: '🪑' },
        { syl: 'ПО·ДРУЖ·КИ', emoji: '🤝' }
      ],
      wordHuntIdx: 1,
      wordHuntPrompt: 'Най·ди сло·во, из ко·то·ро·го по·шёл дождь:',
      scene1: {
        backdrop: '☀️🌸☂️',
        caption: 'Ко·тё·нок Пу·шок вы·шел гу·лять с крас·ным зон·том.',
        panels: [
          { speaker: '🐱 Пу·шок', text: 'По·го·да я·сна·я, за·чем мне э·тот боль·шой зонт?' },
          { speaker: '🌧️ Ве·тер', text: 'Шу-шу-шу! На·бе·жа·ла си·ня·я ту·ча, кап-кап-кап!' }
        ],
        questQuestion: 'Ка·ко·го цве·та был зонт у ко·тён·ка?',
        questOptions: ['Си·ний', 'Крас·ный', 'Зе·лё·ный'],
        correctOptIdx: 1
      },
      scene2: {
        backdrop: '🌧️🪑🐥',
        caption: 'Под до·ждём на ла·воч·ке мок ма·лень·кий цып·лё·нок.',
        panels: [
          { speaker: '🐥 Цып·лё·нок', text: 'Пи-пи! Мо·и пё·рыш·ки ста·ли хо·лод·ны·ми!' },
          { speaker: '🐱 Пу·шок', text: 'Бе·ги ско·ре·е сю·да! Под мо·им зон·том су·хо!' }
        ],
        emotionQuestion: 'Как се·бя по·чув·ство·вал Пу·шок, ко·гда по·мог ма·лы·шу?',
        emotions: [
          { emoji: '😠', label: 'Сер·ди·тым' },
          { emoji: '😊', label: 'Те·пло и ра·дост·но' },
          { emoji: '😨', label: 'Ис·пу·ган·ным' }
        ],
        correctEmotionIdx: 1,
        empathyTip: 'Де·лить·ся с тем, ко·му труд·но, — зна·чит да·рить ра·дость и се·бе, и дру·гу.'
      },
      scene3: {
        backdrop: '🌈🐾☕',
        caption: 'Дождь кон·чил·ся, и над са·дом вспых·ну·ла ра·ду·га.',
        panels: [
          { speaker: '🐥 Цып·лё·нок', text: 'Спа·си·бо, Пу·шок! Твой зонт спас ме·ня от лив·ня!' },
          { speaker: '🐱 Пу·шок', text: 'Пой·дём пить тёп·лый чай с ме·до·вым пря·ни·ком!' }
        ],
        facts: [
          { statement: 'Под до·ждём про·мок ма·лень·кий цып·лё·нок.', isTrue: true },
          { statement: 'Пу·шок не пу·стил ни·ко·го под свой зонт.', isTrue: false }
        ]
      },
      sequence: [
        'Вне·зап·но по·шёл дождь, и Пу·шок от·крыл крас·ный зонт.',
        'Ко·тё·нок у·ви·дел цып·лён·ка и у·крыл е·го от лив·ня.',
        'Вы·гля·ну·ла ра·ду·га, и дру·зья по·шли пить тёп·лый чай.'
      ]
    },
    {
      id: 'fox-treasure-map',
      num: 3,
      emoji: '🦊',
      shortTitle: 'Ли·сё·нок и кар·та',
      title: 'Ли·сё·нок Ры·жик и кар·та со·кро·вищ',
      color: '#ea580c',
      ladder: [
        { syl: 'КЛАД', emoji: '🎁' },
        { syl: 'КАР·ТА', emoji: '🗺️' },
        { syl: 'РЫ·ЖИК', emoji: '🦊' },
        { syl: 'БЕ·РЁ·ЗА', emoji: '🌳' },
        { syl: 'МА·ЛИ·НА', emoji: '🫐' }
      ],
      wordHuntIdx: 1,
      wordHuntPrompt: 'Най·ди сло·во, ко·то·ро·е по·ка·зы·ва·ет до·ро·гу к кла·ду:',
      scene1: {
        backdrop: '📜🌳🔍',
        caption: 'У ста·рой бе·рё·зы ли·сё·нок на·шёл свёр·ток.',
        panels: [
          { speaker: '🦊 Ры·жик', text: 'У·ра! Э·то кар·та! Там на·ри·со·ван слад·кий клад!' },
          { speaker: '🐰 Зай·ка', text: 'Чи·тай под·сказ·ку: три ша·га на·ле·во от реч·ки!' }
        ],
        questQuestion: 'Ку·да нуж·но по·вер·нуть по кар·те от реч·ки?',
        questOptions: ['Три ша·га на·ле·во', 'Пять ша·гов на·зад', 'Вверх на со·сну'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🤨🌿⏳',
        caption: 'Ры·жик то·ро·пил·ся и про·бе·жал ми·мо ку·ста.',
        panels: [
          { speaker: '🦊 Ры·жик', text: 'Где же клад?! Я бе·гу, бе·гу, а сун·ду·ка нет!' },
          { speaker: '🐰 Зай·ка', text: 'Не спе·ши! Про·чи·тай кар·ту ещё раз спо·кой·но.' }
        ],
        emotionQuestion: 'Что сби·ло ли·сён·ка с пу·ти на по·ис·ках?',
        emotions: [
          { emoji: '😤', label: 'Спеш·ка и не·тер·пе·ни·е' },
          { emoji: '😌', label: 'Глу·бо·кий сон' },
          { emoji: '😭', label: 'Зуб·на·я боль' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Ко·гда мы то·ро·пим·ся, лег·ко про·пу·стить важ·ную де·таль. О·ста·но·вись и вдох·ни!'
      },
      scene3: {
        backdrop: '🫐🧺🥳',
        caption: 'За зе·лё·ным ку·стом рос·ла спе·ла·я ле·сна·я ма·ли·на!',
        panels: [
          { speaker: '🦊 Ры·жик', text: 'Вот он, вкус·ный клад! Кор·зин·ка со слад·кой ма·ли·ной!' },
          { speaker: '🐰 Зай·ка', text: 'На·сто·я·ще·е чу·до, е·сли чи·тать вни·ма·тель·но!' }
        ],
        facts: [
          { statement: 'Кла·дом о·ка·за·лась вкус·на·я ле·сна·я ма·ли·на.', isTrue: true },
          { statement: 'Ли·сё·нок на·шёл зо·ло·ту·ю ко·ро·ну под во·дой.', isTrue: false }
        ]
      },
      sequence: [
        'Ры·жик на·шёл у бе·рё·зы кар·ту с под·сказ·кой.',
        'От спеш·ки он про·бе·жал ми·мо, но зай·ка по·мог о·ста·но·вить·ся.',
        'Дру·зья вни·ма·тель·но про·чи·та·ли кар·ту и на·шли ма·ли·ну.'
      ]
    },
    {
      id: 'panda-bridge',
      num: 4,
      emoji: '🐼',
      shortTitle: 'Пан·да и мост',
      title: 'Пан·да Бам·бук и сло·ман·ный мост',
      color: '#10b981',
      ladder: [
        { syl: 'МОСТ', emoji: '🌉' },
        { syl: 'ПАН·ДА', emoji: '🐼' },
        { syl: 'БРЕВ·НО', emoji: '🪵' },
        { syl: 'КО·МАН·ДА', emoji: '🤝' },
        { syl: 'ПО·СТРО·И·ЛИ', emoji: '🛠️' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Най·ди сло·во — ко·гда дру·зья ра·бо·та·ют вме·сте:',
      scene1: {
        backdrop: '🏞️🪵💧',
        caption: 'По·сле гро·зы че·рез ру·чей сло·мал·ся мо·стик.',
        panels: [
          { speaker: '🐼 Бам·бук', text: 'Как же мне по·пасть в шко·лу на том бе·ре·гу?' },
          { speaker: '🦫 Бо·бёр', text: 'Нуж·но по·ло·жить но·во·е креп·ко·е брев·но!' }
        ],
        questQuestion: 'По·че·му пан·да не мог·ла пе·рей·ти ру·чей?',
        questOptions: ['Сло·мал·ся мо·стик', 'При·ле·тел дра·кон', 'Вы·пал глу·бо·кий снег'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '😣💪🪵',
        caption: 'Бам·бук про·бо·вал под·нять брев·но о·дин.',
        panels: [
          { speaker: '🐼 Бам·бук', text: 'Ух! О·но слиш·ком тя·жё·ло·е! У ме·ня не по·лу·ча·ет·ся...' },
          { speaker: '🐻 Ми·ша', text: 'Не злись и не сда·вай·ся! Да·вай по·зо·вём всех дру·зей!' }
        ],
        emotionQuestion: 'Ка·ко·е чув·ство ис·пы·тал Бам·бук, ко·гда брев·но не под·да·лось?',
        emotions: [
          { emoji: '😣', label: 'О·гор·че·ни·е и у·ста·лость' },
          { emoji: '🥳', label: 'Ве·се·лье' },
          { emoji: '🤩', label: 'Вос·торг' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Ко·гда де·ло не вы·хо·дит сра·зу — не ви·ни се·бя. Про·сить по·мо·щи у дру·зей мож·но и нуж·но!'
      },
      scene3: {
        backdrop: '🌉🎈🏫',
        caption: 'Пан·да, бо·бёр и мед·ведь друж·но взя·лись вме·сте.',
        panels: [
          { speaker: '🦫 Бо·бёр', text: 'Раз, два, три! Вот и но·вый креп·кий мост го·тов!' },
          { speaker: '🐼 Бам·бук', text: 'Ко·ман·да спо·соб·на на всё! По·шли в класс!' }
        ],
        facts: [
          { statement: 'Мост по·мог·ли по·чи·нить бо·бёр и мед·ведь.', isTrue: true },
          { statement: 'Пан·да ре·ши·ла о·стать·ся до·ма на весь год.', isTrue: false }
        ]
      },
      sequence: [
        'По·сле гро·зы мо·стик че·рез ру·чей сло·мал·ся.',
        'Бам·бук не смог под·нять брев·но о·дин и рас·стро·ил·ся.',
        'Дру·зья объ·е·ди·ни·лись и по·стро·и·ли но·вый мост.'
      ]
    },
    {
      id: 'owl-night-post',
      num: 5,
      emoji: '🦉',
      shortTitle: 'Со·вё·нок и поч·та',
      title: 'Со·вё·нок Ух и ноч·на·я поч·та',
      color: '#8b5cf6',
      ladder: [
        { syl: 'НОЧЬ', emoji: '🌌' },
        { syl: 'ПИСЬ·МО', emoji: '✉️' },
        { syl: 'СО·ВЁ·НОК', emoji: '🦉' },
        { syl: 'СУМ·КА', emoji: '🎒' },
        { syl: 'ДО·СТА·ВИЛ', emoji: '📬' }
      ],
      wordHuntIdx: 1,
      wordHuntPrompt: 'Най·ди сло·во, ко·то·ро·е кла·дут в кон·верт:',
      scene1: {
        backdrop: '🌌📮🦉',
        caption: 'У со·вён·ка У·ха бы·ло пер·во·е де·жур·ство на поч·те.',
        panels: [
          { speaker: '🦉 Ух', text: 'У ме·ня в сум·ке три важ·ных пись·ма для зве·рят!' },
          { speaker: '🦌 О·лень', text: 'Пер·во·е пись·мо — для бар·су·ка под ста·рой е·лью.' }
        ],
        questQuestion: 'Сколь·ко пи·сем ле·жа·ло в сум·ке у со·вён·ка?',
        questOptions: ['Три пись·ма', 'Де·сять по·сы·лок', 'Од·на га·зе·та'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🌲😳✉️',
        caption: 'Пе·ред до·ми·ком бар·су·ка со·вё·нок за·стес·нял·ся.',
        panels: [
          { speaker: '🦉 Ух', text: 'Ой, а вдруг я пе·ре·пу·та·ю ад·рес и все бу·дут сме·ять·ся?' },
          { speaker: '🦡 Бар·сук', text: 'Здрав·ствуй, поч·та·льон! Я так ждал ве·сточ·ку от ба·буш·ки!' }
        ],
        emotionQuestion: 'Что чув·ство·вал Ух пе·ред тем, как по·сту·чать в дверь?',
        emotions: [
          { emoji: '😳', label: 'Стес·не·ни·е и вол·не·ни·е' },
          { emoji: '😡', label: 'Злость' },
          { emoji: '🤪', label: 'Ба·лов·ство' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Вол·но·вать·ся пе·ред но·вым де·лом — нор·маль·но. О·дин сме·лый шаг пре·вра·ща·ет страх в гор·дость!'
      },
      scene3: {
        backdrop: '📬🌟🏅',
        caption: 'К у·тру все пись·ма ле·жа·ли в поч·то·вых я·щи·ках.',
        panels: [
          { speaker: '🦉 Ух', text: 'Я спра·вил·ся! Каж·до·му зве·рён·ку при·нёс доб·ру·ю весть!' },
          { speaker: '🦡 Бар·сук', text: 'Ты луч·ший ноч·ной поч·та·льон в ле·су!' }
        ],
        facts: [
          { statement: 'Бар·сук ждал пись·мо от ба·буш·ки.', isTrue: true },
          { statement: 'Ух раз·но·сил пись·ма под яр·ким по·лу·ден·ным солн·цем.', isTrue: false }
        ]
      },
      sequence: [
        'Со·вё·нок по·лу·чил сум·ку с тре·мя пись·ма·ми.',
        'Он стес·нял·ся, но сме·ло по·сту·чал в дом к бар·су·ку.',
        'Все пись·ма до·шли по ад·ре·су, и Ух по·чув·ство·вал гор·дость.'
      ]
    },
    {
      id: 'turtle-wind',
      num: 6,
      emoji: '🐢',
      shortTitle: 'Че·ре·паш·ка Лу·ла',
      title: 'Че·ре·паш·ка Лу·ла и бы·стрый ве·тер',
      color: '#06b6d4',
      ladder: [
        { syl: 'ВЕ·ТЕР', emoji: '💨' },
        { syl: 'ЛУ·ЛА', emoji: '🐢' },
        { syl: 'ПАН·ЦИРЬ', emoji: '🛡️' },
        { syl: 'ВОЗ·ДУШ·НЫЙ', emoji: '🪁' },
        { syl: 'ЧЕ·РЕ·ПАШ·КА', emoji: '🐢' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Най·ди сло·во — креп·кий до·мик на спи·не че·ре·паш·ки:',
      scene1: {
        backdrop: '🌬️🪁🐰',
        caption: 'На хол·ме звер·я·та за·пу·ска·ли воз·душ·но·го зме·я.',
        panels: [
          { speaker: '🐇 Кро·лик', text: 'Смо·три, как бы·стро я бе·гу! До·го·няй, Лу·ла!' },
          { speaker: '💨 Ве·тер', text: 'Фью! Ни·точ·ка вы·рва·лась из лап кро·ли·ка!' }
        ],
        questQuestion: 'Что слу·чи·лось со зме·ем на хол·ме?',
        questOptions: ['Ни·точ·ка вы·рва·лась от вет·ра', 'Змей у·пал в чай', 'На·чал·ся снег'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '😔🐢🌪️',
        caption: 'Лу·ла ша·га·ла мед·лен·но и гля·де·ла на бы·стрых дру·зей.',
        panels: [
          { speaker: '🐢 Лу·ла', text: 'Я не у·ме·ю бе·гать стре·лой... Мо·жет, я тут лиш·ня·я?' },
          { speaker: '🌪️ По·рыв', text: 'Вжух! Ка·туш·ка зме·я по·ле·те·ла пря·мо к Лу·ле!' }
        ],
        emotionQuestion: 'Что по·чув·ство·ва·ла че·ре·паш·ка, ко·гда о·ста·лась по·за·ди?',
        emotions: [
          { emoji: '😔', label: 'Со·мне·ни·е в сво·их си·лах' },
          { emoji: '🤩', label: 'Лю·бо·пыт·ство к кни·ге' },
          { emoji: '🥱', label: 'Зе·во·ту' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'У каж·до·го свой та·лант! Бы·стро·та — не е·дин·ствен·на·я су·пер·си·ла: важ·ны на·дёж·ность и вни·ма·ни·е.'
      },
      scene3: {
        backdrop: '🛡️🪁👏',
        caption: 'Лу·ла лов·ко при·жа·ла ка·туш·ку лап·кой и не у·ле·те·ла!',
        panels: [
          { speaker: '🐢 Лу·ла', text: 'Мой тя·жё·лый пан·цирь у·дер·жал зме·я про·тив вет·ра!' },
          { speaker: '🐇 Кро·лик', text: 'Бра·во, Лу·ла! Без те·бя мы бы не схва·ти·ли ка·туш·ку!' }
        ],
        facts: [
          { statement: 'Тя·жё·лый пан·цирь по·мог Лу·ле у·дер·жать зме·я.', isTrue: true },
          { statement: 'Че·ре·паш·ка о·бо·гна·ла кро·ли·ка на ста·ди·о·не.', isTrue: false }
        ]
      },
      sequence: [
        'Ве·тер вы·рвал воз·душ·но·го зме·я из лап кро·ли·ка.',
        'Лу·ла гру·сти·ла, что не у·ме·ет бы·стро бе·гать.',
        'Е·ё креп·кий пан·цирь у·дер·жал ка·туш·ку и спас и·гру.'
      ]
    },
    {
      id: 'captain-star-pie',
      num: 7,
      emoji: '🚀',
      shortTitle: 'Звёзд·ный пи·рог',
      title: 'Ка·пи·тан Марс и звёзд·ный пи·рог',
      color: '#ec4899',
      ladder: [
        { syl: 'ПИ·РОГ', emoji: '🥧' },
        { syl: 'ЗВЕЗ·ДА', emoji: '⭐' },
        { syl: 'РА·КЕ·ТА', emoji: '🚀' },
        { syl: 'СЮР·ПРИЗ', emoji: '🎉' },
        { syl: 'ПУ·ТЕ·ШЕ·СТВИ·Е', emoji: '🌌' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Най·ди сло·во — не·о·жи·дан·ный доб·рый по·да·рок:',
      scene1: {
        backdrop: '🚀🛸🪐',
        caption: 'Ка·пи·тан Марс го·то·вил боль·шой празд·ник для э·ки·па·жа.',
        panels: [
          { speaker: '🧑‍🚀 Марс', text: 'Се·го·дня ве·че·ром у нас кос·ми·че·ский у·жин!' },
          { speaker: '🤖 Ро·бот Бип', text: 'Ой! На бор·ту за·кон·чи·лись звёзд·ны·е я·го·ды для пи·ро·га!' }
        ],
        questQuestion: 'Че·го не хва·та·ло ро·бо·ту Би·пу для пи·ро·га?',
        questOptions: ['Звёзд·ных я·год', 'За·пас·ных ко·лёс', 'Бу·маж·ных ко·раб·лей'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🪐✨🧺',
        caption: 'Ра·ке·та при·зем·ли·лась на тёп·лой Лун·ной по·ля·не.',
        panels: [
          { speaker: '👽 Зве·рёк Пик', text: 'При·вет, го·сти! Бе·ри·те я·го·ды, а я по·мо·гу ме·сить те·сто!' },
          { speaker: '🧑‍🚀 Марс', text: 'Вот э·то да! Мы да·же не о·жи·да·ли та·ко·го го·сте·при·им·ства!' }
        ],
        emotionQuestion: 'Ка·ку·ю ра·дост·ну·ю э·мо·ци·ю вы·звал по·сту·пок но·во·го дру·га?',
        emotions: [
          { emoji: '🤩', label: 'Ра·дост·но·е у·див·ле·ни·е' },
          { emoji: '😠', label: 'До·са·ду' },
          { emoji: '😨', label: 'Ис·пуг' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Дру·же·лю·би·е и доб·ры·е сло·ва по·мо·га·ют на·хо·дить дру·зей да·же на да·лё·ких пла·не·тах!'
      },
      scene3: {
        backdrop: '🥧⭐🎊',
        caption: 'Над сто·лом за·сиял ру·мя·ный пи·рог в фор·ме звез·ды!',
        panels: [
          { speaker: '🤖 Ро·бот Бип', text: 'Бип-бип! Э·то са·мый вкус·ный сюр·приз во Все·лен·ной!' },
          { speaker: '🧑‍🚀 Марс', text: 'По·здра·вля·ем! Все семь ис·то·рий про·чи·та·ны вме·сте!' }
        ],
        facts: [
          { statement: 'Пи·рог и·спек·ли в фор·ме яр·кой звез·ды.', isTrue: true },
          { statement: 'Ро·бот Бип съел те·сто сы·рым в о·ди·ноч·ку.', isTrue: false }
        ]
      },
      sequence: [
        'В ра·ке·те за·кон·чи·лись я·го·ды для празд·нич·но·го пи·ро·га.',
        'На Лун·ной по·ля·не зве·рёк Пик по·де·лил·ся я·го·да·ми и по·мог.',
        'Весь э·ки·паж у·стро·ил ве·сё·лый пир со звёзд·ным пи·ро·гом!'
      ]
    }
  ],
  pl: [
    {
      id: 'hedgehog-lantern',
      num: 1,
      emoji: '🦔',
      shortTitle: 'Je·żyk i la·tar·ka',
      title: 'Je·żyk Ta·dek i zgu·bio·na la·tar·ka',
      color: '#f59e0b',
      ladder: [
        { syl: 'LAS', emoji: '🌲' },
        { syl: 'TA·DEK', emoji: '🦔' },
        { syl: 'LA·TAR·KA', emoji: '🔦' },
        { syl: 'ŚCIEŻ·KA', emoji: '🥾' },
        { syl: 'ŚWIE·TLIK', emoji: '✨' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Znajdź sło·wo, któ·re da·je świa·tło w ciem·no·ści:',
      scene1: {
        backdrop: '🌲🌙🦉',
        caption: 'Na le·śnej po·la·nie szyb·ko za·pa·dał zmrok.',
        panels: [
          { speaker: '🦔 Ta·dek', text: 'O·jej! Zgu·bi·łem mo·ją żół·tą la·tar·kę!' },
          { speaker: '🐿️ Wie·wiór·ka', text: 'Sprawdź nad stru·mie·niem, mo·że tam zo·sta·ła?' }
        ],
        questQuestion: 'Gdzie wie·wiór·ka po·ra·dzi·ła naj·pierw zaj·rzeć?',
        questOptions: ['Nad stru·mień', 'Na dach', 'Do dziu·pli'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🌊🌿😟',
        caption: 'Nad stru·mie·niem nie by·ło la·tar·ki. Zro·bi·ło się ciem·no.',
        panels: [
          { speaker: '🦔 Ta·dek', text: 'Pu·sto... Tro·chę się bo·ję sam w ciem·nym le·sie.' },
          { speaker: '🦉 So·wa', text: 'Je·stem tu! Spójrz tam na ten sta·ry pień!' }
        ],
        emotionQuestion: 'Co po·czuł Ta·dek, gdy nie zna·lazł la·tar·ki?',
        emotions: [
          { emoji: '😟', label: 'Strach i smu·tek' },
          { emoji: '😂', label: 'Gło·śny śmiech' },
          { emoji: '😴', label: 'Sen·ność' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Gdy się bo·isz, po·wiedz o tym przy·ja·cie·lo·wi! Ra·zem szu·ka się o wie·le raź·niej.'
      },
      scene3: {
        backdrop: '🪵✨🎉',
        caption: 'Na sta·rym pniu mi·ga·ło ma·łe żół·te świa·teł·ko!',
        panels: [
          { speaker: '🐞 Świe·tlik', text: 'Cześć! Pil·no·wa·łem two·jej la·tar·ki, aż wró·cisz!' },
          { speaker: '🦔 Ta·dek', text: 'Dzię·ku·ję! Te·raz ma·my aż dwa świa·teł·ka!' }
        ],
        facts: [
          { statement: 'La·tar·ka le·ża·ła na sta·rym pniu.', isTrue: true },
          { statement: 'La·tar·kę za·brał spry·tny lis.', isTrue: false }
        ]
      },
      sequence: [
        'Ta·dek zgu·bił żół·tą la·tar·kę i szu·kał jej nad stru·mie·niem.',
        'So·wa do·da·ła mu o·tu·chy i wska·za·ła świa·tło na pniu.',
        'Świe·tlik od·dał la·tar·kę i przy·ja·cie·le wró·ci·li do do·mu.'
      ]
    },
    {
      id: 'kitten-umbrella',
      num: 2,
      emoji: '🐱',
      shortTitle: 'Ko·tek i pa·ra·sol',
      title: 'Ko·tek Pu·szek i wiel·ki pa·ra·sol',
      color: '#3b82f6',
      ladder: [
        { syl: 'DESZCZ', emoji: '🌧️' },
        { syl: 'PU·SZEK', emoji: '🐱' },
        { syl: 'CHMU·RA', emoji: '☁️' },
        { syl: 'PA·RA·SOL', emoji: '☂️' },
        { syl: 'PRZY·JA·CIEL', emoji: '🤝' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Znajdź sło·wo, któ·re chro·ni przed desz·czem:',
      scene1: {
        backdrop: '☀️🌸☂️',
        caption: 'Ko·tek Pu·szek wy·szedł na spa·cer z czer·wo·nym pa·ra·so·lem.',
        panels: [
          { speaker: '🐱 Pu·szek', text: 'Świe·ci słoń·ce! Po co mi ten wiel·ki pa·ra·sol?' },
          { speaker: '🌧️ Wiatr', text: 'Szu-szu! Na·pły·nę·ła chmu·ra i pa·da deszcz!' }
        ],
        questQuestion: 'Ja·kie·go ko·lo·ru był pa·ra·sol kot·ka?',
        questOptions: ['Nie·bie·ski', 'Czer·wo·ny', 'Zie·lo·ny'],
        correctOptIdx: 1
      },
      scene2: {
        backdrop: '🌧️🪑🐥',
        caption: 'Na ław·ce w desz·czu mokł ma·ły kur·cza·czek.',
        panels: [
          { speaker: '🐥 Kur·czak', text: 'Pi-pi! Mo·je piór·ka są ca·łe mo·kre i zim·ne!' },
          { speaker: '🐱 Pu·szek', text: 'Chodź szyb·ko tu·taj! Pod pa·ra·so·lem jest su·cho!' }
        ],
        emotionQuestion: 'Jak po·czuł się Pu·szek, gdy po·mógł ma·lu·cho·wi?',
        emotions: [
          { emoji: '😠', label: 'Zły i na·bur·mu·szo·ny' },
          { emoji: '😊', label: 'Cie·pło i ra·do·śnie' },
          { emoji: '😨', label: 'Prze·stra·szo·ny' }
        ],
        correctEmotionIdx: 1,
        empathyTip: 'Dzie·le·nie się z in·ny·mi spra·wia, że i ko·le·ga, i ty czu·je·cie wiel·ką ra·dość!'
      },
      scene3: {
        backdrop: '🌈🐾☕',
        caption: 'Deszcz u·stał, a nad o·gro·dem za·świe·ci·ła tę·cza.',
        panels: [
          { speaker: '🐥 Kur·czak', text: 'Dzię·ki, Pu·szek! Twój pa·ra·sol u·ra·to·wał mnie przed u·le·wą!' },
          { speaker: '🐱 Pu·szek', text: 'Chodź·my na cie·płą her·bat·kę z pier·ni·kiem!' }
        ],
        facts: [
          { statement: 'W desz·czu zmokł ma·ły kur·cza·czek.', isTrue: true },
          { statement: 'Pu·szek nie wpu·ścił ni·ko·go pod pa·ra·sol.', isTrue: false }
        ]
      },
      sequence: [
        'Na·gle za·czął pa·dać deszcz i Pu·szek o·two·rzył czer·wo·ny pa·ra·sol.',
        'Ko·tek za·uwa·żył kur·cza·ka i schro·nił go przed u·le·wą.',
        'Wyj·rza·ła tę·cza, a przy·ja·cie·le po·szli na cie·pły na·pój.'
      ]
    },
    {
      id: 'fox-treasure-map',
      num: 3,
      emoji: '🦊',
      shortTitle: 'Li·sek i ma·pa',
      title: 'Li·sek Ru·dek i ma·pa skar·bu',
      color: '#ea580c',
      ladder: [
        { syl: 'SKARB', emoji: '🎁' },
        { syl: 'MA·PA', emoji: '🗺️' },
        { syl: 'RU·DEK', emoji: '🦊' },
        { syl: 'BRZO·ZA', emoji: '🌳' },
        { syl: 'MA·LI·NY', emoji: '🫐' }
      ],
      wordHuntIdx: 1,
      wordHuntPrompt: 'Znajdź sło·wo, któ·re wska·zu·je dro·gę do skar·bu:',
      scene1: {
        backdrop: '📜🌳🔍',
        caption: 'Pod sta·rą brzo·zą li·sek zna·lazł zwi·tek.',
        panels: [
          { speaker: '🦊 Ru·dek', text: 'Hu·ra! To ma·pa! Wska·zu·je słod·ki skarb!' },
          { speaker: '🐰 Za·jąc', text: 'Czy·taj u·waż·nie: trzy kro·ki w le·wo od rze·ki!' }
        ],
        questQuestion: 'Gdzie trze·ba skrę·cić we·dług ma·py od rze·ki?',
        questOptions: ['Trzy kro·ki w le·wo', 'Pięć kro·ków do ty·łu', 'Na czu·bek so·sny'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🤨🌿⏳',
        caption: 'Ru·dek bar·dzo się śpie·szył i mi·nął krzak.',
        panels: [
          { speaker: '🦊 Ru·dek', text: 'Gdzie ten skarb?! Bie·gnę i bie·gnę, a skrzyn·ki brak!' },
          { speaker: '🐰 Za·jąc', text: 'Nie spiesz się! Prze·czy·taj ma·pę spo·koj·nie jesz·cze raz.' }
        ],
        emotionQuestion: 'Co zmy·li·ło li·ska pod·czas po·szu·ki·wań?',
        emotions: [
          { emoji: '😤', label: 'Po·śpiech i nie·cier·pli·wość' },
          { emoji: '😌', label: 'Głę·bo·ki sen' },
          { emoji: '😭', label: 'Ból zę·ba' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Gdy się za bar·dzo śpie·szy·my, ła·two mi·nąć waż·ny szcze·gół. Za·trzy·maj się na chwi·lę!'
      },
      scene3: {
        backdrop: '🫐🧺🥳',
        caption: 'Za zie·lo·nym krza·kiem ro·sły doj·rza·łe le·śne ma·li·ny!',
        panels: [
          { speaker: '🦊 Ru·dek', text: 'Oto pysz·ny skarb! Ca·ły ko·szyk słod·kich ma·lin!' },
          { speaker: '🐰 Za·jąc', text: 'Jak do·brze czy·tać po·wo·li i z u·wa·gą!' }
        ],
        facts: [
          { statement: 'Skar·bem by·ły pysz·ne le·śne ma·li·ny.', isTrue: true },
          { statement: 'Li·sek zna·lazł zło·tą ko·ro·nę pod wo·dą.', isTrue: false }
        ]
      },
      sequence: [
        'Ru·dek zna·lazł pod brzo·zą ma·pę ze wska·zów·ką.',
        'Przez po·śpiech mi·nął cel, ale za·jąc po·mógł mu zwol·nić.',
        'Przy·ja·cie·le do·kład·nie od·czy·ta·li ma·pę i zna·leź·li ma·li·ny.'
      ]
    },
    {
      id: 'panda-bridge',
      num: 4,
      emoji: '🐼',
      shortTitle: 'Pan·da i mo·stek',
      title: 'Pan·da Bam·bus i zła·ma·ny mo·stek',
      color: '#10b981',
      ladder: [
        { syl: 'MOST', emoji: '🌉' },
        { syl: 'PAN·DA', emoji: '🐼' },
        { syl: 'KŁO·DA', emoji: '🪵' },
        { syl: 'ZE·SPÓŁ', emoji: '🤝' },
        { syl: 'ZBU·DO·WA·LI', emoji: '🛠️' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Znajdź sło·wo, któ·re o·zna·cza gru·pę dzia·ła·ją·cą ra·zem:',
      scene1: {
        backdrop: '🏞️🪵💧',
        caption: 'Po bu·rzy nad po·to·kiem pękł drew·nia·ny mo·stek.',
        panels: [
          { speaker: '🐼 Bam·bus', text: 'Jak przej·dę do szko·ły na dru·gi brzeg?' },
          { speaker: '🦫 Bóbr', text: 'Trze·ba po·ło·żyć no·wą, moc·ną kło·dę!' }
        ],
        questQuestion: 'Dla·cze·go pan·da nie mo·gła przejść przez po·tok?',
        questOptions: ['Zła·mał się mo·stek', 'Nad·le·ciał smok', 'Spa·dło du·żo śnie·gu'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '😣💪🪵',
        caption: 'Bam·bus pró·bo·wał sam pod·nieść kło·dę.',
        panels: [
          { speaker: '🐼 Bam·bus', text: 'Uff! Jest za cięż·ka! Chy·ba nie dam ra·dy...' },
          { speaker: '🐻 Miś', text: 'Nie martw się! Za·wo·łaj·my przy·ja·ciół do po·mo·cy!' }
        ],
        emotionQuestion: 'Co po·czuł Bam·bus, gdy sa·me·mu nie u·da·ło się pod·nieść kło·dy?',
        emotions: [
          { emoji: '😣', label: 'Znie·chę·ce·nie i zmę·cze·nie' },
          { emoji: '🥳', label: 'Wiel·ką u·ciechę' },
          { emoji: '🤩', label: 'Za·chwyt' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Gdy coś jest za trud·ne w po·je·dyn·kę, po·pro·sić przy·ja·ciół o po·moc to świet·ny po·mysł!'
      },
      scene3: {
        backdrop: '🌉🎈🏫',
        caption: 'Pan·da, bóbr i miś zła·pa·li kło·dę ra·zem.',
        panels: [
          { speaker: '🦫 Bóbr', text: 'Raz, dwa, trzy! No·wy moc·ny mo·stek go·to·wy!' },
          { speaker: '🐼 Bam·bus', text: 'Z ze·spo·łem da się wszyst·ko! Czas na lek·cje!' }
        ],
        facts: [
          { statement: 'Mo·stek po·mo·gli na·pra·wić bóbr i miś.', isTrue: true },
          { statement: 'Pan·da zo·sta·ła w do·mu na ca·ły rok.', isTrue: false }
        ]
      },
      sequence: [
        'Po bu·rzy zła·mał się mo·stek nad po·to·kiem.',
        'Bam·bus zmę·czył się sam i był znie·chę·co·ny.',
        'Przy·ja·cie·le po·mo·gli so·bie i zbu·do·wa·li no·wy mo·stek.'
      ]
    },
    {
      id: 'owl-night-post',
      num: 5,
      emoji: '🦉',
      shortTitle: 'Sów·ka i pocz·ta',
      title: 'Sów·ka U·hu i noc·na pocz·ta',
      color: '#8b5cf6',
      ladder: [
        { syl: 'NOC', emoji: '🌌' },
        { syl: 'LIST', emoji: '✉️' },
        { syl: 'SÓW·KA', emoji: '🦉' },
        { syl: 'TOR·BA', emoji: '🎒' },
        { syl: 'DO·STAR·CZY·ŁA', emoji: '📬' }
      ],
      wordHuntIdx: 1,
      wordHuntPrompt: 'Znajdź sło·wo, któ·re wkła·da·my do ko·per·ty:',
      scene1: {
        backdrop: '🌌📮🦉',
        caption: 'Sów·ka U·hu mia·ła swój pierw·szy dy·żur na pocz·cie.',
        panels: [
          { speaker: '🦉 U·hu', text: 'W tor·bie mam trzy waż·ne li·sty dla zwie·rzą·tek!' },
          { speaker: '🦌 Je·leń', text: 'Pierw·szy list jest dla bor·su·ka pod sta·rym świer·kiem.' }
        ],
        questQuestion: 'I·le li·stów by·ło w tor·bie sów·ki?',
        questOptions: ['Trzy li·sty', 'Dzie·sięć pa·czek', 'Jed·na ga·ze·ta'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🌲😳✉️',
        caption: 'Przed drzwia·mi bor·su·ka sów·ka tro·chę się za·wsty·dzi·ła.',
        panels: [
          { speaker: '🦉 U·hu', text: 'A co, je·śli po·my·lę a·dres i wszy·scy się ro·ze·śmie·ją?' },
          { speaker: '🦡 Bor·suk', text: 'Wi·taj, li·sto·no·szu! Tak cze·ka·łem na list od bab·ci!' }
        ],
        emotionQuestion: 'Co czu·ła sów·ka za·nim za·pu·ka·ła do drzwi?',
        emotions: [
          { emoji: '😳', label: 'Nie·śmia·łość i tre·mę' },
          { emoji: '😡', label: 'Złość' },
          { emoji: '🤪', label: 'Żar·ty' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Tre·ma przed no·wym za·da·niem to coś na·tu·ral·ne·go. Je·den od·waż·ny krok za·mie·nia ją w du·mę!'
      },
      scene3: {
        backdrop: '📬🌟🏅',
        caption: 'Przed ra·nem wszyst·kie li·sty tra·fi·ły do skrzy·nek.',
        panels: [
          { speaker: '🦉 U·hu', text: 'U·da·ło się! Ka·żdy do·stał do·brą wia·do·mość!' },
          { speaker: '🦡 Bor·suk', text: 'Je·steś naj·lep·szym noc·nym li·sto·no·szem w le·sie!' }
        ],
        facts: [
          { statement: 'Bor·suk cze·kał na list od bab·ci.', isTrue: true },
          { statement: 'U·hu no·sił li·sty w sa·mo po·łu·dnie na pla·ży.', isTrue: false }
        ]
      },
      sequence: [
        'Sów·ka do·sta·ła tor·bę z trze·ma li·sta·mi.',
        'Po·ko·na·ła nie·śmia·łość i za·pu·ka·ła do bor·su·ka.',
        'Wszyst·kie li·sty do·tar·ły na czas, a sów·ka by·ła dum·na.'
      ]
    },
    {
      id: 'turtle-wind',
      num: 6,
      emoji: '🐢',
      shortTitle: 'Żół·wik Lu·la',
      title: 'Żół·wik Lu·la i szyb·ki wiatr',
      color: '#06b6d4',
      ladder: [
        { syl: 'WIATR', emoji: '💨' },
        { syl: 'LU·LA', emoji: '🐢' },
        { syl: 'SKO·RU·PA', emoji: '🛡️' },
        { syl: 'LA·TA·WIEC', emoji: '🪁' },
        { syl: 'ŻÓŁ·WIK', emoji: '🐢' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Znajdź sło·wo — twar·dy do·mek na grzbie·cie żół·wia:',
      scene1: {
        backdrop: '🌬️🪁🐰',
        caption: 'Na wzgó·rzu zwie·rzę·ta pu·szcza·ły la·taw·ca.',
        panels: [
          { speaker: '🐇 Kró·lik', text: 'Patrz, jak szyb·ko bie·gnę! Goń nas, Lu·la!' },
          { speaker: '💨 Wiatr', text: 'Fiu-fiu! Sznu·rek wy·rwał się z ła·pek kró·li·ka!' }
        ],
        questQuestion: 'Co sta·ło się z la·taw·cem na wzgó·rzu?',
        questOptions: ['Sznu·rek wy·rwał się od wia·tru', 'La·ta·wiec wpadł do her·ba·ty', 'Spadł śnieg'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '😔🐢🌪️',
        caption: 'Lu·la szła po·wo·li i pa·trzy·ła na szyb·kich ko·le·gów.',
        panels: [
          { speaker: '🐢 Lu·la', text: 'Nie u·miem biec jak strza·ła... Mo·że je·stem tu zbęd·na?' },
          { speaker: '🌪️ Po·dmuch', text: 'Szu-szu! Szpul·ka la·taw·ca po·le·cia·ła pro·sto ku Lu·li!' }
        ],
        emotionQuestion: 'Ja·ką przy·krość od·czu·ła Lu·la na po·cząt·ku?',
        emotions: [
          { emoji: '😔', label: 'Zwąt·pie·nie w swo·je si·ły' },
          { emoji: '🤩', label: 'Za·cie·ka·wie·nie książ·ką' },
          { emoji: '🥱', label: 'Zie·wa·nie' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Ka·żdy ma swój ta·lent! Szyb·kość nie jest je·dy·ną mo·cą — li·czy się też spo·kój i si·ła!'
      },
      scene3: {
        backdrop: '🛡️🪁👏',
        caption: 'Lu·la przy·ci·snę·ła szpul·kę łap·ką i nie po·le·cia·ła z wia·trem!',
        panels: [
          { speaker: '🐢 Lu·la', text: 'Mo·ja cięż·ka sko·ru·pa u·trzy·ma·ła la·taw·ca pod wiatr!' },
          { speaker: '🐇 Kró·lik', text: 'Bra·wo, Lu·la! Bez cie·bie la·ta·wiec by u·le·ciał!' }
        ],
        facts: [
          { statement: 'Cięż·ka sko·ru·pa po·mo·gła Lu·li za·trzy·mać la·taw·ca.', isTrue: true },
          { statement: 'Żół·wik prze·ści·gnął kró·li·ka w bie·gu.', isTrue: false }
        ]
      },
      sequence: [
        'Sil·ny wiatr wy·rwał la·taw·ca z ła·pek kró·li·ka.',
        'Lu·la smu·ci·ła się, że cho·dzi wol·niej od in·nych.',
        'Jej moc·na sko·ru·pa za·trzy·ma·ła szpul·kę i u·ra·to·wa·ła za·ba·wę.'
      ]
    },
    {
      id: 'captain-star-pie',
      num: 7,
      emoji: '🚀',
      shortTitle: 'Gwiezd·ne cia·sto',
      title: 'Ka·pi·tan Maks i gwiezd·ne cia·sto',
      color: '#ec4899',
      ladder: [
        { syl: 'CIA·STO', emoji: '🥧' },
        { syl: 'GWIAZ·DA', emoji: '⭐' },
        { syl: 'RA·KIE·TA', emoji: '🚀' },
        { syl: 'NIE·SPO·DZIAN·KA', emoji: '🎉' },
        { syl: 'KO·SMICZ·NY', emoji: '🌌' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Znajdź sło·wo o·zna·cza·ją·ce mi·ły, nie·ocze·ki·wa·ny pre·zent:',
      scene1: {
        backdrop: '🚀🛸🪐',
        caption: 'Ka·pi·tan Maks pla·no·wał wiel·kie świę·to dla za·ło·gi.',
        panels: [
          { speaker: '🧑‍🚀 Maks', text: 'Dziś wie·czo·rem ma·my ko·smicz·ną ko·la·cję!' },
          { speaker: '🤖 Ro·bot Bip', text: 'O·jej! Za·bra·kło gwiezd·nych ja·gód na na·sze cia·sto!' }
        ],
        questQuestion: 'Cze·go za·bra·kło ro·bo·to·wi Bi·po·wi do cia·sta?',
        questOptions: ['Gwiezd·nych ja·gód', 'Za·pa·so·wych kół', 'Łó·dek z pa·pie·ru'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🪐✨🧺',
        caption: 'Ra·kie·ta wy·lą·do·wa·ła na cie·płej Księ·ży·co·wej łą·ce.',
        panels: [
          { speaker: '👽 Stwo·rek Pik', text: 'Cześć, go·ście! Weź·cie ja·go·dy, po·mo·gę wam u·gnieść cia·sto!' },
          { speaker: '🧑‍🚀 Maks', text: 'O ra·ny! Nie spo·dzie·wa·li·śmy się ta·kiej go·ścin·no·ści!' }
        ],
        emotionQuestion: 'Ja·ką ra·do·sną e·mo·cję wy·wo·łał gest no·we·go przy·ja·cie·la?',
        emotions: [
          { emoji: '🤩', label: 'Ra·do·sne za·sko·cze·nie' },
          { emoji: '😠', label: 'I·ry·ta·cję' },
          { emoji: '😨', label: 'Lęk' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Życz·li·wość i do·bre sło·wa po·ma·ga·ją zna·leźć przy·ja·ciół na·wet na da·le·kich pla·ne·tach!'
      },
      scene3: {
        backdrop: '🥧⭐🎊',
        caption: 'Na sto·le po·ja·wił się ru·mia·ny wy·piek w kształ·cie gwiaz·dy!',
        panels: [
          { speaker: '🤖 Ro·bot Bip', text: 'Bip-bip! To naj·pysz·niej·sza nie·spo·dzian·ka w ca·łym ko·smo·sie!' },
          { speaker: '🧑‍🚀 Maks', text: 'Bra·wo! Wszyst·kie sie·dem hi·sto·rii prze·czy·ta·ne!' }
        ],
        facts: [
          { statement: 'Cia·sto u·pie·czo·no w kształ·cie ja·snej gwiaz·dy.', isTrue: true },
          { statement: 'Ro·bot Bip zjadł su·ro·we cia·sto sam w ką·cie.', isTrue: false }
        ]
      },
      sequence: [
        'W ra·kie·cie za·bra·kło ja·gód na świą·tecz·ne cia·sto.',
        'Na Księ·ży·co·wej łą·ce stwo·rek Pik po·dzie·lił się ja·go·da·mi.',
        'Ca·ła za·ło·ga świę·to·wa·ła przy gwiezd·nym cie·ście!'
      ]
    }
  ],
  en: [
    {
      id: 'hedgehog-lantern',
      num: 1,
      emoji: '🦔',
      shortTitle: 'Lan·tern Quest',
      title: 'Tim the Hedge·hog and the Lost Lan·tern',
      color: '#f59e0b',
      ladder: [
        { syl: 'TIM', emoji: '🦔' },
        { syl: 'PATH', emoji: '🥾' },
        { syl: 'LAN·TERN', emoji: '🔦' },
        { syl: 'FOR·EST', emoji: '🌲' },
        { syl: 'FIRE·FLY', emoji: '✨' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Tap the word that helps light up the dark:',
      scene1: {
        backdrop: '🌲🌙🦉',
        caption: 'Dusk fell quick·ly o·ver the qui·et for·est clear·ing.',
        panels: [
          { speaker: '🦔 Tim', text: 'Oh no! I lost my bright yel·low lan·tern!' },
          { speaker: '🐿️ Squir·rel', text: 'Do not wor·ry! May·be you left it near the brook?' }
        ],
        questQuestion: 'Where did Squir·rel sug·gest look·ing first?',
        questOptions: ['Near the brook', 'On the roof', 'In the cave'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🌊🌿😟',
        caption: 'No lan·tern lay by the wa·ter. Sha·dows grew deep.',
        panels: [
          { speaker: '🦔 Tim', text: 'It is not here... I feel scared in the dark a·lone.' },
          { speaker: '🦉 Owl', text: 'I am right here! Look o·ver on that old tree stump!' }
        ],
        emotionQuestion: 'How did Tim feel when the lan·tern was not at the brook?',
        emotions: [
          { emoji: '😟', label: 'Wor·ried and scared' },
          { emoji: '😂', label: 'Sil·ly laugh·ter' },
          { emoji: '😴', label: 'Slee·py' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'When you feel scared, tell a friend! Search·ing to·geth·er makes you much brav·er.'
      },
      scene3: {
        backdrop: '🪵✨🎉',
        caption: 'A ti·ny gold·en spark winked from top of the old stump!',
        panels: [
          { speaker: '🐞 Fire·fly', text: 'Hel·lo! I kept watch o·ver your lan·tern un·til you came back!' },
          { speaker: '🦔 Tim', text: 'Thank you! Now we have two bright lights for the walk!' }
        ],
        facts: [
          { statement: 'The lan·tern was sit·ting on an old tree stump.', isTrue: true },
          { statement: 'A snea·ky fox hid the lan·tern in a boat.', isTrue: false }
        ]
      },
      sequence: [
        'Tim lost his yel·low lan·tern and checked near the brook.',
        'Owl com·fort·ed him and spot·ted a glow on a stump.',
        'Fire·fly gave back the lan·tern, and they walked home hap·pi·ly.'
      ]
    },
    {
      id: 'kitten-umbrella',
      num: 2,
      emoji: '🐱',
      shortTitle: 'Big Um·brel·la',
      title: 'Fluf·fy the Kit·ten and the Big Um·brel·la',
      color: '#3b82f6',
      ladder: [
        { syl: 'RAIN', emoji: '🌧️' },
        { syl: 'BENCH', emoji: '🪑' },
        { syl: 'KIT·TEN', emoji: '🐱' },
        { syl: 'UM·BREL·LA', emoji: '☂️' },
        { syl: 'FRIEND·SHIP', emoji: '🤝' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Tap the word that keeps you dry in the rain:',
      scene1: {
        backdrop: '☀️🌸☂️',
        caption: 'Fluf·fy went out for a walk with a big red um·brel·la.',
        panels: [
          { speaker: '🐱 Fluf·fy', text: 'The sky is blue! Why am I car·ry·ing this big um·brel·la?' },
          { speaker: '🌧️ Wind', text: 'Whoosh! A dark cloud rolled in — drip, drop, splash!' }
        ],
        questQuestion: 'What col·or was the kit·ten’s um·brel·la?',
        questOptions: ['Blue', 'Red', 'Green'],
        correctOptIdx: 1
      },
      scene2: {
        backdrop: '🌧️🪑🐥',
        caption: 'On a park bench, a ti·ny chick was get·ting wet.',
        panels: [
          { speaker: '🐥 Chick', text: 'Peep! My feath·ers are cold and soaked!' },
          { speaker: '🐱 Fluf·fy', text: 'Hop un·der here quick·ly! My um·brel·la has room for two!' }
        ],
        emotionQuestion: 'How did Fluf·fy feel af·ter help·ing the ti·ny chick?',
        emotions: [
          { emoji: '😠', label: 'Grump·y' },
          { emoji: '😊', label: 'Warm and joy·ful' },
          { emoji: '😨', label: 'Fright·ened' }
        ],
        correctEmotionIdx: 1,
        empathyTip: 'Shar·ing with some·one in need fills both hearts with warm sun·shine!'
      },
      scene3: {
        backdrop: '🌈🐾☕',
        caption: 'Soon the rain stopped and a bright rain·bow arched a·bove.',
        panels: [
          { speaker: '🐥 Chick', text: 'Thank you, Fluf·fy! Your um·brel·la saved me from the storm!' },
          { speaker: '🐱 Fluf·fy', text: 'Let us sip warm co·coa and share hon·ey cook·ies!' }
        ],
        facts: [
          { statement: 'A ti·ny chick got caught in the rain.', isTrue: true },
          { statement: 'Fluf·fy re·fused to share his um·brel·la.', isTrue: false }
        ]
      },
      sequence: [
        'Sud·den rain fell, so Fluf·fy o·pened his big red um·brel·la.',
        'He spot·ted a cold chick and shared his dry shel·ter.',
        'A rain·bow ap·peared, and both friends went for warm co·coa.'
      ]
    },
    {
      id: 'fox-treasure-map',
      num: 3,
      emoji: '🦊',
      shortTitle: 'Trea·sure Map',
      title: 'Rus·ty the Fox and the Trea·sure Map',
      color: '#ea580c',
      ladder: [
        { syl: 'MAP', emoji: '🗺️' },
        { syl: 'CLUE', emoji: '🔍' },
        { syl: 'RUS·TY', emoji: '🦊' },
        { syl: 'TREA·SURE', emoji: '🎁' },
        { syl: 'RASP·BER·RY', emoji: '🫐' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Tap the word for a spe·cial hid·den prize:',
      scene1: {
        backdrop: '📜🌳🔍',
        caption: 'Un·der a sil·ver birch, Rus·ty found a rolled-up scroll.',
        panels: [
          { speaker: '🦊 Rus·ty', text: 'Hur·ray! It is a map! It points to a sweet trea·sure!' },
          { speaker: '🐰 Bun·ny', text: 'Read the clue: three steps left past the riv·er!' }
        ],
        questQuestion: 'Which way did the map say to turn at the riv·er?',
        questOptions: ['Three steps left', 'Five steps back', 'Up a pine tree'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🤨🌿⏳',
        caption: 'Rus·ty rushed a·head too fast and dashed past a bush.',
        panels: [
          { speaker: '🦊 Rus·ty', text: 'Where is it?! I ran so fast, yet there is no chest!' },
          { speaker: '🐰 Bun·ny', text: 'Slow down! Let us read the map calm·ly one more time.' }
        ],
        emotionQuestion: 'What caused Rus·ty to miss the clue on his hunt?',
        emotions: [
          { emoji: '😤', label: 'Rush·ing and im·pa·tience' },
          { emoji: '😌', label: 'A deep nap' },
          { emoji: '😭', label: 'A sore tooth' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'When we rush too much, we skip im·por·tant clues. Pause, breathe, and check care·ful·ly!'
      },
      scene3: {
        backdrop: '🫐🧺🥳',
        caption: 'Be·hind the green bush grew ripe, juic·y wild ber·ries!',
        panels: [
          { speaker: '🦊 Rus·ty', text: 'Here is the sweet trea·sure! A full bas·ket of ber·ries!' },
          { speaker: '🐰 Bun·ny', text: 'Care·ful read·ing leads to the tas·ti·est re·wards!' }
        ],
        facts: [
          { statement: 'The trea·sure turned out to be ripe wild ber·ries.', isTrue: true },
          { statement: 'Rus·ty dug up a gold·en crown un·der·wa·ter.', isTrue: false }
        ]
      },
      sequence: [
        'Rus·ty found a trea·sure map un·der a birch tree.',
        'He rushed too fast at first, so Bun·ny helped him slow down.',
        'They read the clue with care and found sweet wild ber·ries.'
      ]
    },
    {
      id: 'panda-bridge',
      num: 4,
      emoji: '🐼',
      shortTitle: 'Bam·boo Bridge',
      title: 'Bam·boo Pan·da and the Bro·ken Bridge',
      color: '#10b981',
      ladder: [
        { syl: 'LOG', emoji: '🪵' },
        { syl: 'BRIDGE', emoji: '🌉' },
        { syl: 'PAN·DA', emoji: '🐼' },
        { syl: 'TEAM·WORK', emoji: '🤝' },
        { syl: 'TO·GETH·ER', emoji: '🛠️' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Tap the word that means help·ing each oth·er as a team:',
      scene1: {
        backdrop: '🏞️🪵💧',
        caption: 'Af·ter the storm, the wood·en stream bridge snapped.',
        panels: [
          { speaker: '🐼 Bam·boo', text: 'How will I cross o·ver to school on the oth·er side?' },
          { speaker: '🦫 Bea·ver', text: 'We need to place a strong new log a·cross!' }
        ],
        questQuestion: 'Why could Pan·da not cross the stream?',
        questOptions: ['The bridge broke', 'A dra·gon land·ed', 'Deep snow fell'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '😣💪🪵',
        caption: 'Bam·boo tried lift·ing the big log all by him·self.',
        panels: [
          { speaker: '🐼 Bam·boo', text: 'Ugh! It is way too heav·y! I can·not do it...' },
          { speaker: '🐻 Bear', text: 'Do not give up! Let us call our friends to help!' }
        ],
        emotionQuestion: 'What did Bam·boo feel when the log would not budge?',
        emotions: [
          { emoji: '😣', label: 'Frus·tra·tion and tired·ness' },
          { emoji: '🥳', label: 'Par·ty joy' },
          { emoji: '🤩', label: 'A·maze·ment' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'If a job is too big a·lone, ask·ing friends for help is smart — not a sign of weak·ness!'
      },
      scene3: {
        backdrop: '🌉🎈🏫',
        caption: 'Pan·da, Bea·ver, and Bear lift·ed stead·y as one team.',
        panels: [
          { speaker: '🦫 Bea·ver', text: 'One, two, three! Our stur·dy new bridge is read·y!' },
          { speaker: '🐼 Bam·boo', text: 'Team·work can fix an·y·thing! Off to school we go!' }
        ],
        facts: [
          { statement: 'Bea·ver and Bear helped re·build the bridge.', isTrue: true },
          { statement: 'Pan·da stayed home for the en·tire year.', isTrue: false }
        ]
      },
      sequence: [
        'A storm broke the old bridge a·cross the stream.',
        'Bam·boo felt frus·trat·ed try·ing to lift the log a·lone.',
        'Friends teamed up and built a strong new bridge.'
      ]
    },
    {
      id: 'owl-night-post',
      num: 5,
      emoji: '🦉',
      shortTitle: 'Night Post',
      title: 'Hoot the Owl and the Night Post',
      color: '#8b5cf6',
      ladder: [
        { syl: 'OWL', emoji: '🦉' },
        { syl: 'NIGHT', emoji: '🌌' },
        { syl: 'LET·TER', emoji: '✉️' },
        { syl: 'POST·BAG', emoji: '🎒' },
        { syl: 'DE·LIV·ERED', emoji: '📬' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Tap the word for what goes in·side an en·ve·lope:',
      scene1: {
        backdrop: '🌌📮🦉',
        caption: 'Lit·tle owl Hoot had his ve·ry first night-post shift.',
        panels: [
          { speaker: '🦉 Hoot', text: 'My bag holds three spe·cial let·ters for wood·land friends!' },
          { speaker: '🦌 Deer', text: 'The first let·ter goes to Badg·er un·der the tall pine.' }
        ],
        questQuestion: 'How ma·ny let·ters were in Hoot’s post·bag?',
        questOptions: ['Three let·ters', 'Ten par·cels', 'One news·pa·per'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🌲😳✉️',
        caption: 'Out·side Badg·er’s door, Hoot felt a lit·tle shy.',
        panels: [
          { speaker: '🦉 Hoot', text: 'What if I mix up the house and eve·ry·one laughs?' },
          { speaker: '🦡 Badg·er', text: 'Wel·come, post·man! I wait·ed all day for news from Grand·ma!' }
        ],
        emotionQuestion: 'How did Hoot feel right be·fore knock·ing on the door?',
        emotions: [
          { emoji: '😳', label: 'Shy and ner·vous' },
          { emoji: '😡', label: 'An·gry' },
          { emoji: '🤪', label: 'Goof·y' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Feel·ing ner·vous be·fore try·ing some·thing new is nor·mal. One brave knock turns fear in·to pride!'
      },
      scene3: {
        backdrop: '📬🌟🏅',
        caption: 'By dawn, eve·ry let·ter sat safe·ly in its mail·box.',
        panels: [
          { speaker: '🦉 Hoot', text: 'I did it! Eve·ry friend got kind news be·fore sun·rise!' },
          { speaker: '🦡 Badg·er', text: 'You are the fin·est night post·man in the woods!' }
        ],
        facts: [
          { statement: 'Badg·er was wait·ing for a let·ter from Grand·ma.', isTrue: true },
          { statement: 'Hoot de·liv·ered let·ters at bright noon on a beach.', isTrue: false }
        ]
      },
      sequence: [
        'Hoot packed a post·bag with three im·por·tant let·ters.',
        'He o·ver·came his shy·ness and knocked on Badg·er’s door.',
        'All let·ters ar·rived on time, and Hoot felt proud.'
      ]
    },
    {
      id: 'turtle-wind',
      num: 6,
      emoji: '🐢',
      shortTitle: 'Lu·la Tur·tle',
      title: 'Lu·la the Tur·tle and the Gust·y Wind',
      color: '#06b6d4',
      ladder: [
        { syl: 'KITE', emoji: '🪁' },
        { syl: 'WIND', emoji: '💨' },
        { syl: 'SHELL', emoji: '🛡️' },
        { syl: 'TUR·TLE', emoji: '🐢' },
        { syl: 'STEAD·Y', emoji: '⚓' }
      ],
      wordHuntIdx: 2,
      wordHuntPrompt: 'Tap the word for the strong home on a tur·tle’s back:',
      scene1: {
        backdrop: '🌬️🪁🐰',
        caption: 'Up on the hill, friends were fly·ing a bright kite.',
        panels: [
          { speaker: '🐇 Rab·bit', text: 'Watch how fast I sprint! Catch up, Lu·la!' },
          { speaker: '💨 Wind', text: 'Whoosh! A strong gust tugged the string from Rab·bit’s paws!' }
        ],
        questQuestion: 'What hap·pened to the kite on the hill?',
        questOptions: ['The wind blew the string loose', 'It fell in hot tea', 'It start·ed snow·ing'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '😔🐢🌪️',
        caption: 'Lu·la walked slow·ly and watched her fast friends.',
        panels: [
          { speaker: '🐢 Lu·la', text: 'I can·not dash like an ar·row... Do they need me here?' },
          { speaker: '🌪️ Gust', text: 'Zoom! The kite spool rolled straight to·ward Lu·la!' }
        ],
        emotionQuestion: 'What sad thought crossed Lu·la’s mind at first?',
        emotions: [
          { emoji: '😔', label: 'Doubt·ing her own strength' },
          { emoji: '🤩', label: 'Ex·cite·ment o·ver a book' },
          { emoji: '🥱', label: 'Yawn·ing' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Eve·ry·one has their own gift! Speed is not the on·ly strength — be·ing stead·y mat·ters too!'
      },
      scene3: {
        backdrop: '🛡️🪁👏',
        caption: 'Lu·la pinned the spool tight and stood firm a·gainst the gale!',
        panels: [
          { speaker: '🐢 Lu·la', text: 'My heav·y shell an·chored the kite safe·ly in the wind!' },
          { speaker: '🐇 Rab·bit', text: 'Bra·vo, Lu·la! With·out you, our kite would be gone!' }
        ],
        facts: [
          { statement: 'Lu·la’s heav·y shell helped an·chor the fly·ing kite.', isTrue: true },
          { statement: 'The tur·tle out·ran Rab·bit in a track race.', isTrue: false }
        ]
      },
      sequence: [
        'A strong gust pulled the kite string out of Rab·bit’s paws.',
        'Lu·la felt sad for walk·ing more slow·ly than oth·ers.',
        'Her stead·y shell held the spool fast and saved the day.'
      ]
    },
    {
      id: 'captain-star-pie',
      num: 7,
      emoji: '🚀',
      shortTitle: 'Star·light Pie',
      title: 'Cap·tain Max and the Star·light Pie',
      color: '#ec4899',
      ladder: [
        { syl: 'PIE', emoji: '🥧' },
        { syl: 'STAR', emoji: '⭐' },
        { syl: 'ROCK·ET', emoji: '🚀' },
        { syl: 'SUR·PRISE', emoji: '🎉' },
        { syl: 'GAL·AX·Y', emoji: '🌌' }
      ],
      wordHuntIdx: 3,
      wordHuntPrompt: 'Tap the word for a won·der·ful un·ex·pect·ed gift:',
      scene1: {
        backdrop: '🚀🛸🪐',
        caption: 'Cap·tain Max planned a big feast for his space crew.',
        panels: [
          { speaker: '🧑‍🚀 Max', text: 'To·night we cel·e·brate with a grand space din·ner!' },
          { speaker: '🤖 Ro·bot Beep', text: 'Oh my! We are all out of star·ber·ries for our pie!' }
        ],
        questQuestion: 'What was Beep miss·ing for the space pie?',
        questOptions: ['Star·ber·ries', 'Spare tires', 'Pa·per boats'],
        correctOptIdx: 0
      },
      scene2: {
        backdrop: '🪐✨🧺',
        caption: 'The rock·et land·ed soft·ly on a warm Moon Mead·ow.',
        panels: [
          { speaker: '👽 Moon Pip', text: 'Wel·come, trav·el·ers! Take these ber·ries — let us bake to·geth·er!' },
          { speaker: '🧑‍🚀 Max', text: 'Wow! We nev·er dreamed of such warm friend·li·ness!' }
        ],
        emotionQuestion: 'What bright feel·ing did Pip’s kind act spark in the crew?',
        emotions: [
          { emoji: '🤩', label: 'Joy·ful won·der' },
          { emoji: '😠', label: 'An·noy·ance' },
          { emoji: '😨', label: 'Fear' }
        ],
        correctEmotionIdx: 0,
        empathyTip: 'Kind·ness and a warm smile make new friends ev·en on the far·thest stars!'
      },
      scene3: {
        backdrop: '🥧⭐🎊',
        caption: 'A gold·en pie shaped like a shi·ny star cooled on the ta·ble!',
        panels: [
          { speaker: '🤖 Ro·bot Beep', text: 'Beep-boop! Best sweet sur·prise in the whole gal·ax·y!' },
          { speaker: '🧑‍🚀 Max', text: 'Hoo·ray! All sev·en sto·ries read from start to fin·ish!' }
        ],
        facts: [
          { statement: 'They baked a pie shaped like a bright star.', isTrue: true },
          { statement: 'Ro·bot Beep ate the raw dough a·lone.', isTrue: false }
        ]
      },
      sequence: [
        'The space crew ran out of star·ber·ries for their feast pie.',
        'On Moon Mead·ow, kind Pip shared ber·ries and helped bake.',
        'Eve·ry·one cheered a·round the gold·en star·light pie!'
      ]
    }
  ]
};

const STORAGE_KEY = 'ap_completed_stories_v1';

export class AfterPrimerGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.storyIdx = 0;
    this.stepIdx = 0; // 0: Разминка | 1: Сцена 1 | 2: Эмоции | 3: Финал | 4: Порядок
    this.syllableMode = true; // true = По слогам | false = Обычный текст

    this.completedStories = this.loadCompleted();
    this.progress = this.createFreshProgress();

    this.advanceTimer = null;
  }

  loadCompleted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch (e) {
      // Игнорируем ошибку доступа к localStorage
    }
    return new Set();
  }

  saveCompleted() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.completedStories]));
    } catch (e) {
      // Игнорируем ошибку записи
    }
  }

  createFreshProgress() {
    const stories = AFTER_PRIMER_STORIES[this.lang] || AFTER_PRIMER_STORIES.ru;
    const story = stories[this.storyIdx] || stories[0];
    const ladderItems = story ? story.ladder : [];
    const huntOptions = shuffleArray(ladderItems.map((item, idx) => ({ ...item, origIdx: idx })));
    const seqItems = story
      ? shuffleArray(story.sequence.map((text, idx) => ({ text, origIdx: idx })))
      : [];

    return {
      ladderRead: new Set(),
      huntOptions,
      huntDone: false,
      questDone: false,
      emotionDone: false,
      factsAnswered: new Set(), // индексы правильно отвеченных фактов (0, 1)
      factsDone: false,
      seqOptions: seqItems,
      seqPlaced: [], // индексы правильного порядка [0, 1, 2]
      seqDone: false
    };
  }

  stop() {
    if (this.advanceTimer) {
      clearTimeout(this.advanceTimer);
      this.advanceTimer = null;
    }
    sound.stopSpeech();
  }

  setLanguage(lang) {
    this.lang = lang;
    this.storyIdx = 0;
    this.stepIdx = 0;
    this.progress = this.createFreshProgress();
    this.start();
  }

  start() {
    this.stop();
    if (!this.container) return;
    this.render();
  }

  selectStory(idx) {
    const stories = AFTER_PRIMER_STORIES[this.lang] || AFTER_PRIMER_STORIES.ru;
    if (idx < 0 || idx >= stories.length) return;
    this.stop();
    this.storyIdx = idx;
    this.stepIdx = 0;
    this.progress = this.createFreshProgress();
    sound.playLetterClick();
    this.render();
  }

  setStep(idx) {
    if (idx < 0 || idx > 4) return;
    this.stop();
    this.stepIdx = idx;
    sound.playLetterClick();
    this.render();
  }

  toggleReadingMode(useSyllables) {
    if (this.syllableMode === useSyllables) return;
    this.syllableMode = useSyllables;
    sound.playLetterClick();
    this.render();
  }

  escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\x22/g, '&quot;');
  }

  plainText(sylStr) {
    return String(sylStr || '').replace(/·/g, '');
  }

  // Форматирует текст в режиме «По слогам» (карточки слов + аккуратная точка) или «Обычный текст»
  formatText(sylStr) {
    if (!sylStr) return '';
    if (!this.syllableMode) {
      return `<span class="ap-plain-text">${this.escapeHTML(this.plainText(sylStr))}</span>`;
    }
    const chips = String(sylStr)
      .trim()
      .split(/\s+/)
      .map(wordPart => {
        const sylsHTML = wordPart
          .split('·')
          .map(s => `<span class="ap-syl-part">${this.escapeHTML(s)}</span>`)
          .join('<span class="ap-syl-dot" aria-hidden="true">·</span>');
        return `<span class="ap-word-chip">${sylsHTML}</span>`;
      })
      .join('');
    return `<span class="ap-syl-flow">${chips}</span>`;
  }

  render() {
    const t = UI_TEXTS[this.lang] || UI_TEXTS.ru;
    const stories = AFTER_PRIMER_STORIES[this.lang] || AFTER_PRIMER_STORIES.ru;
    const story = stories[this.storyIdx] || stories[0];
    const doneKey = `${this.lang}:${story.id}`;
    const isStoryCompleted = this.completedStories.has(doneKey);

    this.container.innerHTML = `
      <div class="ap-wrapper">
        <div class="ap-top-row">
          <div class="ap-intro-pill">${t.intro}</div>
          <div class="ap-mode-switch" role="group" aria-label="Reading mode">
            <button class="ap-mode-btn ${this.syllableMode ? 'active' : ''}" id="ap-btn-syl">${t.modeSyllables}</button>
            <button class="ap-mode-btn ${!this.syllableMode ? 'active' : ''}" id="ap-btn-plain">${t.modePlain}</button>
          </div>
        </div>

        <!-- Выбор одной из 7 историй -->
        <div class="ap-stories-nav">
          ${stories.map((st, idx) => {
            const stDone = this.completedStories.has(`${this.lang}:${st.id}`);
            return `
              <button class="ap-story-pill ${idx === this.storyIdx ? 'active' : ''} ${stDone ? 'done' : ''}"
                      data-story="${idx}"
                      style="--ap-accent: ${st.color};">
                <span class="ap-pill-emoji">${st.emoji}</span>
                <span class="ap-pill-meta">
                  <span class="ap-pill-num">${st.num}/7 ${stDone ? '✅' : ''}</span>
                  <span class="ap-pill-name">${this.escapeHTML(this.plainText(st.shortTitle))}</span>
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Заголовок текущей истории и шаги приключения -->
        <div class="ap-chapter-card" style="--ap-accent: ${story.color};">
          <div class="ap-chapter-head">
            <div class="ap-chapter-title-wrap">
              <span class="ap-chapter-hero">${story.emoji}</span>
              <div>
                <div class="ap-chapter-sub">${t.storyPrefix} ${story.num} / 7 ${isStoryCompleted ? '⭐ ✅' : ''}</div>
                <h3 class="ap-chapter-title">${this.formatText(story.title)}</h3>
              </div>
            </div>
          </div>

          <div class="ap-steps-bar">
            ${t.steps.map((label, sIdx) => {
              const stepDone = this.isStepCompleted(sIdx);
              return `
                <button class="ap-step-tab ${sIdx === this.stepIdx ? 'active' : ''} ${stepDone ? 'done' : ''}"
                        data-step="${sIdx}">
                  <span class="ap-step-num">${stepDone ? '✓' : (sIdx + 1)}</span>
                  <span class="ap-step-lbl">${label}</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="ap-stage" id="ap-stage">
            ${this.renderCurrentStepHTML(story, t)}
          </div>
        </div>
      </div>
    `;

    this.attachEvents(story, t);
  }

  isStepCompleted(idx) {
    if (idx === 0) return this.progress.huntDone;
    if (idx === 1) return this.progress.questDone;
    if (idx === 2) return this.progress.emotionDone;
    if (idx === 3) return this.progress.factsDone;
    if (idx === 4) return this.progress.seqDone;
    return false;
  }

  renderCurrentStepHTML(story, t) {
    if (this.stepIdx === 0) return this.renderWarmupHTML(story, t);
    if (this.stepIdx === 1) return this.renderScene1HTML(story, t);
    if (this.stepIdx === 2) return this.renderScene2HTML(story, t);
    if (this.stepIdx === 3) return this.renderScene3HTML(story, t);
    return this.renderSequenceHTML(story, t);
  }

  // Шаг 1: Тренажёр чтения (лесенка слов + поиск слова)
  renderWarmupHTML(story, t) {
    const targetWord = story.ladder[story.wordHuntIdx];
    const readCount = this.progress.ladderRead.size;
    return `
      <div class="ap-card">
        <div class="ap-sec-header">
          <span>${t.ladderTitle}</span>
          <span class="ap-badge">${t.readDone}: ${readCount}/${story.ladder.length}</span>
        </div>
        <div class="ap-ladder">
          ${story.ladder.map((item, idx) => {
            const read = this.progress.ladderRead.has(idx);
            return `
              <button class="ap-ladder-rung ${read ? 'read' : ''}"
                      data-rung="${idx}"
                      style="--rung-step: ${idx};">
                <span class="ap-rung-emoji">${item.emoji}</span>
                <span class="ap-rung-word">${this.formatText(item.syl)}</span>
                <span class="ap-rung-audio" aria-hidden="true">${read ? '✅' : '🔊'}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="ap-card ${this.progress.huntDone ? 'ap-card-done' : ''}">
        <div class="ap-sec-header">
          <span>${t.huntTitle} ${this.progress.huntDone ? '<span class="ap-star-tag">⭐ +1</span>' : ''}</span>
          <button class="ap-mini-speak" id="ap-hunt-speak">🔊</button>
        </div>
        <div class="ap-prompt-box">${this.formatText(story.wordHuntPrompt)}</div>
        <div class="ap-hunt-grid">
          ${this.progress.huntOptions.map(opt => {
            const isTarget = opt.origIdx === story.wordHuntIdx;
            const cls = (this.progress.huntDone && isTarget) ? 'correct' : '';
            return `
              <button class="ap-choice-btn ${cls}" data-hunt-orig="${opt.origIdx}">
                <span class="ap-hunt-emoji">${opt.emoji}</span>
                <span>${this.formatText(opt.syl)}</span>
              </button>
            `;
          }).join('')}
        </div>
        <div class="ap-feedback" id="ap-step-feedback">
          ${this.progress.huntDone ? `🎉 ${t.greatJob} (${targetWord.emoji} ${this.plainText(targetWord.syl)})` : ''}
        </div>
        ${this.progress.huntDone ? `
          <div class="ap-next-wrap">
            <button class="ap-next-btn" id="ap-next-step">${t.nextStep}</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderComicBoxHTML(scene, t, sceneId) {
    return `
      <div class="ap-comic-box">
        <div class="ap-comic-top">
          <div class="ap-comic-backdrop">${scene.backdrop}</div>
          <button class="ap-scene-speak-btn" id="ap-speak-scene-${sceneId}">${t.speakScene}</button>
        </div>
        <div class="ap-comic-caption">${this.formatText(scene.caption)}</div>
        <div class="ap-panels">
          ${scene.panels.map((p, idx) => `
            <div class="ap-panel ${idx % 2 === 1 ? 'right' : ''}">
              <div class="ap-speaker-tag">${this.formatText(p.speaker)}</div>
              <div class="ap-speech-bubble">
                <div class="ap-bubble-text">${this.formatText(p.text)}</div>
                <button class="ap-bubble-speak" data-bubble-idx="${idx}" title="🔊">🔊</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Шаг 2: Комикс-сцена 1 + Мини-квест по сюжету
  renderScene1HTML(story, t) {
    const s = story.scene1;
    return `
      ${this.renderComicBoxHTML(s, t, '1')}
      <div class="ap-card ${this.progress.questDone ? 'ap-card-done' : ''}">
        <div class="ap-sec-header">
          <span>${t.questTitle} ${this.progress.questDone ? '<span class="ap-star-tag">⭐ +1</span>' : ''}</span>
          <button class="ap-mini-speak" id="ap-quest-speak">🔊</button>
        </div>
        <div class="ap-prompt-box">${this.formatText(s.questQuestion)}</div>
        <div class="ap-options-col">
          ${s.questOptions.map((opt, idx) => {
            const cls = (this.progress.questDone && idx === s.correctOptIdx) ? 'correct' : '';
            return `
              <button class="ap-choice-btn wide ${cls}" data-quest-opt="${idx}">
                ${this.formatText(opt)}
              </button>
            `;
          }).join('')}
        </div>
        <div class="ap-feedback" id="ap-step-feedback">
          ${this.progress.questDone ? `⭐ ${t.greatJob}` : ''}
        </div>
        ${this.progress.questDone ? `
          <div class="ap-next-wrap">
            <button class="ap-next-btn" id="ap-next-step">${t.nextStep}</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Шаг 3: Комикс-сцена 2 + Тренажёр эмоций
  renderScene2HTML(story, t) {
    const s = story.scene2;
    return `
      ${this.renderComicBoxHTML(s, t, '2')}
      <div class="ap-card ${this.progress.emotionDone ? 'ap-card-done' : ''}">
        <div class="ap-sec-header">
          <span>${t.emotionTitle} ${this.progress.emotionDone ? '<span class="ap-star-tag">⭐ +1</span>' : ''}</span>
          <button class="ap-mini-speak" id="ap-emotion-speak">🔊</button>
        </div>
        <div class="ap-prompt-box">${this.formatText(s.emotionQuestion)}</div>
        <div class="ap-emotion-grid">
          ${s.emotions.map((em, idx) => {
            const cls = (this.progress.emotionDone && idx === s.correctEmotionIdx) ? 'correct' : '';
            return `
              <button class="ap-emotion-btn ${cls}" data-emo-opt="${idx}">
                <span class="ap-emo-face">${em.emoji}</span>
                <span class="ap-emo-label">${this.formatText(em.label)}</span>
              </button>
            `;
          }).join('')}
        </div>
        ${this.progress.emotionDone ? `
          <div class="ap-empathy-tip">
            <div class="ap-empathy-head">
              <strong>${t.empathyLabel}</strong>
              <button class="ap-mini-speak" id="ap-tip-speak">🔊</button>
            </div>
            <div>${this.formatText(s.empathyTip)}</div>
          </div>
          <div class="ap-next-wrap">
            <button class="ap-next-btn" id="ap-next-step">${t.nextStep}</button>
          </div>
        ` : `<div class="ap-feedback" id="ap-step-feedback"></div>`}
      </div>
    `;
  }

  // Шаг 4: Финал комикса + Логика и внимание («Правда или выдумка?»)
  renderScene3HTML(story, t) {
    const s = story.scene3;
    return `
      ${this.renderComicBoxHTML(s, t, '3')}
      <div class="ap-card ${this.progress.factsDone ? 'ap-card-done' : ''}">
        <div class="ap-sec-header">
          <span>${t.factsTitle} ${this.progress.factsDone ? '<span class="ap-star-tag">⭐ +1</span>' : ''}</span>
        </div>
        <div class="ap-facts-list">
          ${s.facts.map((f, fIdx) => {
            const answered = this.progress.factsAnswered.has(fIdx);
            return `
              <div class="ap-fact-row ${answered ? 'solved' : ''}">
                <div class="ap-fact-top">
                  <div class="ap-fact-text">${this.formatText(f.statement)}</div>
                  <button class="ap-mini-speak" data-fact-speak="${fIdx}">🔊</button>
                </div>
                <div class="ap-fact-btns">
                  <button class="ap-fact-btn ${answered && f.isTrue ? 'correct' : ''}"
                          data-fact-idx="${fIdx}" data-val="true">${t.factTrue}</button>
                  <button class="ap-fact-btn ${answered && !f.isTrue ? 'correct' : ''}"
                          data-fact-idx="${fIdx}" data-val="false">${t.factFalse}</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="ap-feedback" id="ap-step-feedback">
          ${this.progress.factsDone ? `⭐ ${t.greatJob}` : ''}
        </div>
        ${this.progress.factsDone ? `
          <div class="ap-next-wrap">
            <button class="ap-next-btn" id="ap-next-step">${t.nextStep}</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Шаг 5: Пересказ по порядку (1 → 2 → 3) + Финал главы
  renderSequenceHTML(story, t) {
    const stories = AFTER_PRIMER_STORIES[this.lang] || AFTER_PRIMER_STORIES.ru;
    const hasNextStory = this.storyIdx < stories.length - 1;
    const placedSet = new Set(this.progress.seqPlaced);

    return `
      <div class="ap-card ${this.progress.seqDone ? 'ap-card-done' : ''}">
        <div class="ap-sec-header">
          <span>${t.seqTitle} ${this.progress.seqDone ? '<span class="ap-star-tag">⭐ +2</span>' : ''}</span>
        </div>
        <p class="ap-seq-hint">${t.seqHint}</p>

        <!-- Слоты 1, 2, 3 -->
        <div class="ap-seq-slots">
          ${[0, 1, 2].map(slotIdx => {
            const placedOrigIdx = this.progress.seqPlaced[slotIdx];
            const filled = placedOrigIdx !== undefined;
            return `
              <div class="ap-seq-slot ${filled ? 'filled' : ''}">
                <span class="ap-slot-badge">${slotIdx + 1}</span>
                <div class="ap-slot-body">
                  ${filled
                    ? this.formatText(story.sequence[placedOrigIdx])
                    : `<span class="ap-slot-placeholder">${t.seqSlot} ${slotIdx + 1}</span>`}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Карточки событий для выбора -->
        ${!this.progress.seqDone ? `
          <div class="ap-seq-pool">
            ${this.progress.seqOptions.map((item, poolIdx) => {
              const used = placedSet.has(item.origIdx);
              if (used) return '';
              return `
                <button class="ap-seq-card" data-seq-orig="${item.origIdx}" data-pool="${poolIdx}">
                  <span class="ap-seq-card-text">${this.formatText(item.text)}</span>
                  <span class="ap-mini-speak ap-seq-speak" data-seq-speak="${item.origIdx}" title="🔊">🔊</span>
                </button>
              `;
            }).join('')}
          </div>
        ` : ''}

        <div class="ap-feedback" id="ap-step-feedback">
          ${this.progress.seqDone ? `🎉 ${t.storyDoneTitle}` : ''}
        </div>

        ${this.progress.seqDone ? `
          <div class="ap-victory-box">
            ${hasNextStory
              ? `<button class="ap-next-btn big" id="ap-next-story">${t.nextStory}</button>`
              : `<div class="ap-all-done-banner">${t.finishBook}</div>`}
          </div>
        ` : ''}
      </div>
    `;
  }

  speakClean(text) {
    sound.playLetterClick();
    sound.speakExplanation(this.plainText(text), this.lang);
  }

  attachEvents(story, t) {
    // Переключатель «По слогам / Обычный текст»
    const btnSyl = this.container.querySelector('#ap-btn-syl');
    const btnPlain = this.container.querySelector('#ap-btn-plain');
    if (btnSyl) btnSyl.addEventListener('click', () => this.toggleReadingMode(true));
    if (btnPlain) btnPlain.addEventListener('click', () => this.toggleReadingMode(false));

    // Навигация по 7 историям
    this.container.querySelectorAll('.ap-story-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.story, 10);
        this.selectStory(idx);
      });
    });

    // Шаги внутри истории (1..5)
    this.container.querySelectorAll('.ap-step-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.step, 10);
        this.setStep(idx);
      });
    });

    // Кнопка «Дальше»
    const nextStepBtn = this.container.querySelector('#ap-next-step');
    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', () => this.setStep(this.stepIdx + 1));
    }

    // Озвучка комикс-сцены целиком и отдельных облачков
    const currentScene = this.stepIdx === 1
      ? story.scene1
      : (this.stepIdx === 2 ? story.scene2 : (this.stepIdx === 3 ? story.scene3 : null));
    if (currentScene) {
      const sceneSpeakBtn = this.container.querySelector(`#ap-speak-scene-${this.stepIdx}`);
      if (sceneSpeakBtn) {
        sceneSpeakBtn.addEventListener('click', () => {
          const fullText = [
            this.plainText(currentScene.caption),
            ...currentScene.panels.map(p => this.plainText(p.text))
          ].join(' ');
          sound.playLetterClick();
          sound.speakExplanation(fullText, this.lang);
        });
      }
      this.container.querySelectorAll('.ap-bubble-speak').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const bIdx = parseInt(btn.dataset.bubbleIdx, 10);
          const panel = currentScene.panels[bIdx];
          if (panel) this.speakClean(panel.text);
        });
      });
    }

    // События текущего шага
    if (this.stepIdx === 0) this.attachStep0Events(story, t);
    else if (this.stepIdx === 1) this.attachStep1Events(story, t);
    else if (this.stepIdx === 2) this.attachStep2Events(story, t);
    else if (this.stepIdx === 3) this.attachStep3Events(story, t);
    else if (this.stepIdx === 4) this.attachStep4Events(story, t);
  }

  attachStep0Events(story, t) {
    // Лесенка слов
    this.container.querySelectorAll('.ap-ladder-rung').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.rung, 10);
        const item = story.ladder[idx];
        if (!item) return;
        this.progress.ladderRead.add(idx);
        btn.classList.add('read');
        const audioTag = btn.querySelector('.ap-rung-audio');
        if (audioTag) audioTag.textContent = '✅';
        const badge = this.container.querySelector('.ap-badge');
        if (badge) badge.textContent = `${t.readDone}: ${this.progress.ladderRead.size}/${story.ladder.length}`;
        sound.playLetterClick();
        sound.speakWord(this.plainText(item.syl), this.lang);
      });
    });

    const huntSpeak = this.container.querySelector('#ap-hunt-speak');
    if (huntSpeak) {
      huntSpeak.addEventListener('click', () => this.speakClean(story.wordHuntPrompt));
    }

    // Поиск целевого слова
    this.container.querySelectorAll('[data-hunt-orig]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.progress.huntDone) return;
        const origIdx = parseInt(btn.dataset.huntOrig, 10);
        const fb = this.container.querySelector('#ap-step-feedback');
        if (origIdx === story.wordHuntIdx) {
          this.progress.huntDone = true;
          sound.playSuccess();
          sound.speakWord(this.plainText(story.ladder[origIdx].syl), this.lang);
          this.onStarEarned(1);
          this.render();
        } else {
          btn.classList.add('wrong');
          sound.playError();
          if (fb) {
            fb.textContent = `❌ ${t.tryAgain}`;
            fb.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachStep1Events(story, t) {
    const qSpeak = this.container.querySelector('#ap-quest-speak');
    if (qSpeak) {
      qSpeak.addEventListener('click', () => this.speakClean(story.scene1.questQuestion));
    }

    this.container.querySelectorAll('[data-quest-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.progress.questDone) return;
        const optIdx = parseInt(btn.dataset.questOpt, 10);
        const fb = this.container.querySelector('#ap-step-feedback');
        if (optIdx === story.scene1.correctOptIdx) {
          this.progress.questDone = true;
          sound.playSuccess();
          this.onStarEarned(1);
          this.render();
        } else {
          btn.classList.add('wrong');
          sound.playError();
          if (fb) {
            fb.textContent = `❌ ${t.tryAgain}`;
            fb.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachStep2Events(story, t) {
    const eSpeak = this.container.querySelector('#ap-emotion-speak');
    if (eSpeak) {
      eSpeak.addEventListener('click', () => this.speakClean(story.scene2.emotionQuestion));
    }
    const tipSpeak = this.container.querySelector('#ap-tip-speak');
    if (tipSpeak) {
      tipSpeak.addEventListener('click', () => this.speakClean(story.scene2.empathyTip));
    }

    this.container.querySelectorAll('[data-emo-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.progress.emotionDone) return;
        const idx = parseInt(btn.dataset.emoOpt, 10);
        const fb = this.container.querySelector('#ap-step-feedback');
        if (idx === story.scene2.correctEmotionIdx) {
          this.progress.emotionDone = true;
          sound.playSuccess();
          this.onStarEarned(1);
          this.render();
        } else {
          btn.classList.add('wrong');
          sound.playError();
          if (fb) {
            fb.textContent = `❌ ${t.tryAgain}`;
            fb.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachStep3Events(story, t) {
    this.container.querySelectorAll('[data-fact-speak]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fIdx = parseInt(btn.dataset.factSpeak, 10);
        const fact = story.scene3.facts[fIdx];
        if (fact) this.speakClean(fact.statement);
      });
    });

    this.container.querySelectorAll('.ap-fact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const fIdx = parseInt(btn.dataset.factIdx, 10);
        if (this.progress.factsAnswered.has(fIdx)) return;
        const val = btn.dataset.val === 'true';
        const fact = story.scene3.facts[fIdx];
        if (!fact) return;

        const fb = this.container.querySelector('#ap-step-feedback');
        if (val === fact.isTrue) {
          this.progress.factsAnswered.add(fIdx);
          sound.playSuccess();
          if (this.progress.factsAnswered.size >= story.scene3.facts.length && !this.progress.factsDone) {
            this.progress.factsDone = true;
            this.onStarEarned(1);
          }
          this.render();
        } else {
          btn.classList.add('wrong');
          sound.playError();
          if (fb) {
            fb.textContent = `❌ ${t.tryAgain}`;
            fb.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });
  }

  attachStep4Events(story, t) {
    this.container.querySelectorAll('.ap-seq-speak').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const origIdx = parseInt(btn.dataset.seqSpeak, 10);
        const text = story.sequence[origIdx];
        if (text) this.speakClean(text);
      });
    });

    this.container.querySelectorAll('.ap-seq-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.progress.seqDone) return;
        const origIdx = parseInt(btn.dataset.seqOrig, 10);
        const expectedIdx = this.progress.seqPlaced.length;
        const fb = this.container.querySelector('#ap-step-feedback');

        if (origIdx === expectedIdx) {
          this.progress.seqPlaced.push(origIdx);
          sound.playSuccess();
          if (this.progress.seqPlaced.length >= story.sequence.length) {
            this.progress.seqDone = true;
            this.completedStories.add(`${this.lang}:${story.id}`);
            this.saveCompleted();
            this.onStarEarned(2);
            this.onWinEffect();
          }
          this.render();
        } else {
          btn.classList.add('wrong');
          sound.playError();
          if (fb) {
            fb.textContent = `❌ ${t.tryAgain}`;
            fb.style.color = '#ef4444';
          }
          setTimeout(() => btn.classList.remove('wrong'), 450);
        }
      });
    });

    const nextStoryBtn = this.container.querySelector('#ap-next-story');
    if (nextStoryBtn) {
      nextStoryBtn.addEventListener('click', () => {
        this.selectStory(this.storyIdx + 1);
      });
    }
  }
}
