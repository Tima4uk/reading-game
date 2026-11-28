// Интерактивный «Букварь: Комиксы, слоги, игры и задания» (по методике В. и А. Мельниковых / АСТ)
// Поддерживает поэтапное обучение не по алфавиту, а от простого к сложному для RU (33), PL (32), EN (26)

import { ALPHABET_DATA, WORDS_DATA, WORDS_DATA_HARD, VOWELS, RUSSIAN_ALPHABET, POLISH_ALPHABET, ENGLISH_ALPHABET, shuffleArray } from './data.js?v=31';

export const BUKVAR_STAGES = {
  ru: [
    {
      id: 'stage1',
      badge: 'Ступень 1 • Уроки 1–10',
      title: 'Первые звуки и первое слово',
      goal: '🎯 Учимся тянуть гласные и сливать первые слоги — читаем первое слово!',
      letters: ['А', 'У', 'О', 'М', 'С', 'Х'],
      milestones: ['АУ!', 'УА!', 'АМ', 'УМ', 'МА-МА', 'САМ', 'СОМ', 'У-ХА', 'МОХ']
    },
    {
      id: 'stage2',
      badge: 'Ступень 2 • Уроки 11–19',
      title: 'Плавные слоги и первое предложение',
      goal: '🎯 Различаем твёрдые и мягкие слоги (Ы–И) и читаем первое предложение!',
      letters: ['Ы', 'Л', 'Н', 'Ш', 'Р', 'И'],
      milestones: ['МЫ-ЛО', 'ЛУ-НА', 'ША-РЫ', 'НОС', 'СЫР', 'ЛИ-СА', 'Ма-ма мы-ла ра-му.', 'У Ро-мы ша-ры.']
    },
    {
      id: 'stage3',
      badge: 'Ступень 3 • Уроки 20–55',
      title: 'Звонкие и глухие друзья',
      goal: '🎯 Осваиваем короткие и звонкие согласные, читаем короткие истории',
      letters: ['К', 'П', 'Т', 'В', 'З', 'Ж', 'Б', 'Г', 'Д'],
      milestones: ['КОТ', 'ПА-ПА', 'ВО-ДА', 'ЗА-ЯЦ', 'ЖУК', 'БА-НАН', 'ДОМ', 'Кот пил мо-ло-ко.', 'В са-ду гу-си и жук.']
    },
    {
      id: 'stage4',
      badge: 'Ступень 4 • Уроки 56–82',
      title: 'Мягкие гласные и мягкий знак',
      goal: '🎯 Узнаём секрет букв Е, Ё, Ю, Я, Й и доброго мягкого знака Ь',
      letters: ['Е', 'Ё', 'Ю', 'Я', 'Й', 'Ь'],
      milestones: ['ЕЛЬ', 'Ё-ЖИК', 'Ю-ЛА', 'ЯБ-ЛО-КО', 'ЧАЙ', 'КОНЬ', 'Ё-жик несёт яб-ло-ко.']
    },
    {
      id: 'stage5',
      badge: 'Ступень 5 • Уроки 83–107',
      title: 'Сложные звуки — Финал Букваря!',
      goal: '🏆 Осваиваем шипящие и редкие буквы — теперь мы читаем всё!',
      letters: ['Э', 'Ц', 'Ч', 'Щ', 'Ф', 'Ъ'],
      milestones: ['Э-ХО', 'ЦВЕ-ТОК', 'ЧА-СЫ', 'ЩЕ-НОК', 'ФО-НА-РИК', 'ПОДЪ-ЕЗД', 'Ще-нок на-шёл яр-кий фо-на-рик!']
    }
  ],
  pl: [
    {
      id: 'stage1',
      badge: 'Etap 1 • Lekcje 1–12',
      title: 'Samogłoski i pierwsze sylaby',
      goal: '🎯 Śpiewamy samogłoski i łączymy je z M, T, L w pierwsze sylaby i słowa!',
      letters: ['A', 'O', 'U', 'E', 'I', 'Y', 'M', 'T', 'L'],
      milestones: ['MA-MA', 'TA-TA', 'TO', 'LA-MA', 'O-LA', 'TU', 'LO-TY', 'To ma-ma i ta-ta.']
    },
    {
      id: 'stage2',
      badge: 'Etap 2 • Lekcje 13–28',
      title: 'Nowe spółgłoski i proste zdania',
      goal: '🎯 Budujemy słowa z nowych głosek i czytamy pierwsze krótkie zdania!',
      letters: ['S', 'K', 'P', 'B', 'D', 'N', 'R'],
      milestones: ['KOT', 'DOM', 'SER', 'NOS', 'RAK', 'MA-PA', 'To kot i dom.', 'Ta-ta ma ser.']
    },
    {
      id: 'stage3',
      badge: 'Etap 3 • Lekcje 29–48',
      title: 'Trudniejsze głoski i opowieści',
      goal: '🎯 Ćwiczymy wyraziste spółgłoski i czytamy ciekawe historie!',
      letters: ['W', 'Z', 'G', 'F', 'J', 'Ł', 'C', 'H'],
      milestones: ['WO-DA', 'ZI-MA', 'FA-LA', 'JA-JO', 'MA-ŁY', 'E-CHO', 'Ma-ły kot ma łap-ki.']
    },
    {
      id: 'stage4',
      badge: 'Etap 4 • Lekcje 49–65',
      title: 'Polskie znaki — Mistrz Elementarza!',
      goal: '🏆 Opanowujemy ogonki i kreseczki (Ó, Ą, Ę, Ś, Ć, Ń, Ż, Ź) — czytamy płynnie!',
      letters: ['Ó', 'Ą', 'Ę', 'Ś', 'Ć', 'Ń', 'Ż', 'Ź'],
      milestones: ['STÓŁ', 'DĄB', 'RĘ-KA', 'MIŚ', 'KOŃ', 'ŻA-BA', 'ŹRE-BIĘ', 'Ma-ły miś lu-bi śnieg!']
    }
  ],
  en: [
    {
      id: 'stage1',
      badge: 'Stage 1 • Lessons 1–10',
      title: 'SATPIN Sounds & First Words',
      goal: '🎯 Blend the first 6 pure phonics sounds to read real words fast!',
      letters: ['S', 'A', 'T', 'P', 'I', 'N'],
      milestones: ['SAT', 'PAT', 'TAP', 'PIN', 'SIT', 'NAP', 'ANT', 'Pat sat in a pan.']
    },
    {
      id: 'stage2',
      badge: 'Stage 2 • Lessons 11–22',
      title: 'More Pure Sounds & Short Sentences',
      goal: '🎯 Add crisp consonants and short vowels to read mini stories!',
      letters: ['M', 'D', 'G', 'O', 'C', 'K', 'E'],
      milestones: ['DOG', 'CAT', 'MAP', 'PEN', 'KID', 'DAD', 'Ten men met a cat.', 'A cat on a mat.']
    },
    {
      id: 'stage3',
      badge: 'Stage 3 • Lessons 23–36',
      title: 'Action Sounds & Blending',
      goal: '🎯 Master smooth blending with U, R, H, B, F, L in fun words!',
      letters: ['U', 'R', 'H', 'B', 'F', 'L'],
      milestones: ['SUN', 'RUN', 'HAT', 'BUS', 'FROG', 'LAMP', 'Bob has a big bus.']
    },
    {
      id: 'stage4',
      badge: 'Stage 4 • Lessons 37–50',
      title: 'Trickier Letters — Reading Pro!',
      goal: '🏆 Conquer J, V, W, X, Y, Z, Q and read whole stories on your own!',
      letters: ['J', 'V', 'W', 'X', 'Y', 'Z', 'Q'],
      milestones: ['JAM', 'VAN', 'WEB', 'FOX', 'YES', 'ZOO', 'QUEEN', 'A quick fox jumps in a box!']
    }
  ]
};

function getBukvarMetaMap(lang = 'ru') {
  const stages = BUKVAR_STAGES[lang] || BUKVAR_STAGES.ru;
  const vowelSet = VOWELS[lang] || VOWELS.ru;
  const totalSteps = stages.reduce((sum, s) => sum + s.letters.length, 0);
  const map = new Map();
  let stepNumber = 1;

  for (const stage of stages) {
    for (const rawLetter of stage.letters) {
      const upper = rawLetter.toUpperCase();
      const isSign = (lang === 'ru' && (upper === 'Ъ' || upper === 'Ь'));
      const isVowel = !isSign && vowelSet.has(upper);
      const soundType = isSign ? 'sign' : (isVowel ? 'vowel' : 'consonant');
      map.set(upper, {
        stepNumber,
        totalSteps,
        stageId: stage.id,
        stageBadge: stage.badge,
        stageTitle: stage.title,
        soundType
      });
      stepNumber++;
    }
  }
  return map;
}

export function getOrderedAlphabetData(lang = 'ru', orderMode = 'bukvar') {
  const rawList = ALPHABET_DATA[lang] || ALPHABET_DATA.ru;
  const metaMap = getBukvarMetaMap(lang);
  const byLetter = new Map(rawList.map(item => [item.letter.toUpperCase(), item]));

  const enrich = (item, fallbackStep) => {
    const upper = item.letter.toUpperCase();
    const meta = metaMap.get(upper) || {
      stepNumber: fallbackStep,
      totalSteps: rawList.length,
      stageId: 'stage1',
      stageBadge: '',
      stageTitle: '',
      soundType: (VOWELS[lang] && VOWELS[lang].has(upper)) ? 'vowel' : 'consonant'
    };
    return { ...item, ...meta };
  };

  if (orderMode === 'alphabet') {
    return rawList.map((item, idx) => enrich(item, idx + 1));
  }

  const stages = BUKVAR_STAGES[lang] || BUKVAR_STAGES.ru;
  const ordered = [];
  const seen = new Set();
  for (const stage of stages) {
    for (const rawLetter of stage.letters) {
      const upper = rawLetter.toUpperCase();
      const item = byLetter.get(upper);
      if (item && !seen.has(upper)) {
        seen.add(upper);
        ordered.push(enrich(item, ordered.length + 1));
      }
    }
  }
  for (const item of rawList) {
    const upper = item.letter.toUpperCase();
    if (!seen.has(upper)) {
      ordered.push(enrich(item, ordered.length + 1));
    }
  }
  return ordered;
}

const CUMULATIVE_WORDS = {
  ru: {
    'А': ['А!', 'А-а-а!', 'А?'],
    'У': ['АУ!', 'УА!', 'У-у-у!'],
    'О': ['О!', 'АУ!', 'УА!', 'О-о-о!'],
    'М': ['МА-МА', 'АМ!', 'УМ', 'МУ-МУ'],
    'С': ['САМ', 'СОМ', 'О-СА', 'СА-МА', 'Ма-ма са-ма.'],
    'Х': ['У-ХА', 'МОХ', 'МУ-ХА', 'СУ-ХО', 'Ах, сом!'],
    'Ы': ['МЫ', 'У-СЫ', 'СО-МЫ', 'О-СЫ', 'У ма-мы у-ха.'],
    'Л': ['МЫ-ЛО', 'ЛА-МА', 'МА-ЛО', 'СУ-МА', 'Ма-ма мы-ла ла-му.'],
    'Н': ['ЛУ-НА', 'НОС', 'СОН', 'СЛОН', 'У сло-на нос.'],
    'Ш': ['МА-ША', 'СА-ША', 'ШУМ', 'МА-ЛЫШ', 'Ма-ша мы-ла нос.'],
    'Р': ['СЫР', 'ШАР', 'РА-МА', 'НО-РА', 'Ма-ма мы-ла ра-му.', 'У Ро-мы ша-ры.'],
    'И': ['ЛИ-СА', 'МИР', 'ШИ-НА', 'МА-ШИ-НА', 'Мы са-ми мы-ли ши-ны.', 'У И-ры ша-ры и мы-ло.'],
    'К': ['СОК', 'МАК', 'РАК', 'КА-ША', 'У Ми-лы и Са-ши сок.'],
    'П': ['ПА-ПА', 'СУП', 'ПИ-ЛА', 'ЛА-ПА', 'Па-па пил сок.'],
    'Т': ['КОТ', 'КИТ', 'НО-ТЫ', 'УТ-КА', 'Кот спит у ма-мы.'],
    'В': ['СО-ВА', 'ТРА-ВА', 'СЛИ-ВА', 'ВОЛК', 'Волк спит у но-ры.'],
    'З': ['КО-ЗА', 'ЗИ-МА', 'ВА-ЗА', 'ЗА-МОК', 'Ко-за и о-са у ва-зы.'],
    'Ж': ['ЖУК', 'ЛУ-ЖА', 'ЛЫ-ЖИ', 'НО-ЖИ', 'У Ми-ши лы-жи, а у лу-жи жук.'],
    'Б': ['БА-НАН', 'РЫ-БА', 'БЫК', 'ЗУ-БЫ', 'Жа-ба и жук у ба-ра-ба-на.'],
    'Г': ['ГО-РА', 'ГУ-СИ', 'ГРИБ', 'НО-ГА', 'Гу-си и жук на лу-гу.'],
    'Д': ['ДОМ', 'САД', 'ДЫМ', 'ВО-ДА', 'У до-ма сад и гри-бы.'],
    'Е': ['ЛЕС', 'МО-РЕ', 'НЕ-БО', 'ЛЕ-ТО', 'Де-ти в ле-су и-гра-ли.'],
    'Ё': ['ЁЖ', 'МЁД', 'ЛЁД', 'ЁЛ-КА', 'В ле-су ё-жик на-шёл мёд.'],
    'Ю': ['Ю-ЛА', 'ЮГ', 'КЛЮВ', 'У-ТЮГ', 'Ю-ра лю-бит ю-лу.'],
    'Я': ['ЯБ-ЛО-КО', 'ЗМЕ-Я', 'ПО-ЛЯ-НА', 'НЯ-НЯ', 'Я-ша ку-ша-ет яб-ло-ко.'],
    'Й': ['МАЙ', 'МОЙ', 'ЗМЕЙ', 'ТРАМ-ВАЙ', 'В ма-е кра-си-вый май-ский лес.'],
    'Ь': ['ЕЛЬ', 'КОНЬ', 'ГУСЬ', 'МЕД-ВЕДЬ', 'Ё-жик не-сёт яб-ло-ко.', 'Мы ви-де-ли ло-ся в ле-су.'],
    'Э': ['Э-ХО', 'Э-РА', 'ПО-ЭТ', 'ЭК-РАН', 'В го-рах гром-кое э-хо!'],
    'Ц': ['ЦВЕ-ТОК', 'ПТИ-ЦА', 'ОВ-ЦА', 'ЯЙ-ЦО', 'У ов-цы цып-ля-та и цве-ты.'],
    'Ч': ['ЧАЙ', 'ЧА-СЫ', 'ТУ-ЧА', 'МЯЧ', 'Де-воч-ка пьёт тёп-лый чай.'],
    'Щ': ['ЩЕ-НОК', 'ЩЁТ-КА', 'ЩУ-КА', 'ПЛАЩ', 'Ще-нок и-гра-ет у реч-ки.'],
    'Ф': ['ФЛАГ', 'ФО-НА-РИК', 'ЖИ-РАФ', 'ШАРФ', 'Ще-нок на-шёл яр-кий фо-на-рик!'],
    'Ъ': ['СЪЕЛ', 'ВЪЕЗД', 'ОБЪ-ЁМ', 'ПОДЪ-ЕЗД', 'Кот объ-ел-ся и сел у подъ-ез-да.']
  },
  pl: {
    'A': ['A!', 'A-a-a!', 'A?'],
    'O': ['O!', 'A-O', 'O-o-o!'],
    'U': ['U!', 'AU!', 'UA!'],
    'E': ['E!', 'E-O', 'EU'],
    'I': ['I!', 'A-I', 'O-I'],
    'Y': ['Y!', 'A-Y', 'O-Y'],
    'M': ['MA-MA', 'MY', 'IM', 'UM'],
    'T': ['TA-TA', 'TO', 'TU', 'TY', 'Ma-ma i ta-ta.'],
    'L': ['LA-MA', 'O-LA', 'TU-LI', 'LO-TY', 'O-la ma lo-ty.'],
    'S': ['LAS', 'LIS', 'SOS', 'MOS-TY', 'O-la ma li-sa.'],
    'K': ['KOT', 'KO-TY', 'KO-TEK', 'KU-LA', 'O-la ma ko-ta.'],
    'P': ['PAS', 'MA-PA', 'PA-PA', 'PU-MA', 'Ta-ta ma pas.'],
    'B': ['BAL', 'BUT', 'BU-TY', 'BA-BA', 'Ku-ba ma bu-ty.'],
    'D': ['DOM', 'DYM', 'DA-TA', 'DO-MY', 'A-dam ma dom.'],
    'N': ['NOS', 'SON', 'LI-NA', 'SO-SNA', 'A-na ma ko-ta.'],
    'R': ['RAK', 'SER', 'RA-MA', 'RY-BY', 'Kot ma ser.'],
    'W': ['WO-DA', 'SO-WA', 'KRO-WA', 'NO-WY DOM', 'So-wa i li-sek.'],
    'Z': ['KO-ZA', 'ZI-MA', 'ZU-PA', 'WA-ZA', 'Zu-za ma bu-ty.'],
    'G': ['NO-GA', 'ZE-GAR', 'WA-GA', 'GU-MA', 'Li-sek ma ze-gar.'],
    'F': ['FO-KA', 'FA-LA', 'SO-FA', 'FO-TO', 'Fo-ka lu-bi fa-le.'],
    'J': ['JA-JO', 'MAJ', 'KLEJ', 'JA-MA', 'Ju-lek je ja-jo.'],
    'Ł': ['ŁA-PA', 'MY-DŁO', 'KO-ŁO', 'MA-ŁY', 'Ma-ły kot ma łap-ki.'],
    'C': ['NOC', 'CA-ŁY', 'CO', 'KO-CYK', 'Co ma A-li-cja?'],
    'H': ['E-CHO', 'HA-ŁAS', 'HU-LA', 'HAR-FA', 'Ha-na ma no-wy ko-cyk.'],
    'Ó': ['STÓŁ', 'BÓBR', 'KRÓL', 'GÓ-RA', 'Król ma stół.'],
    'Ą': ['WĄS', 'DĄB', 'ZĄB', 'MĄ-KA', 'Dąb ma li-sty.'],
    'Ę': ['RĘ-KA', 'BĘ-BEN', 'PĘK', 'TĘ-GI', 'Ka-sia ma bę-ben.'],
    'Ś': ['MIŚ', 'ŚNIEG', 'ŚLI-MAK', 'ŚWIAT', 'Ma-ły miś lu-bi śnieg.'],
    'Ć': ['PIĆ', 'BYĆ', 'NIĆ', 'PIĘĆ', 'Śli-mak lu-bi pić wo-dę.'],
    'Ń': ['KOŃ', 'SŁOŃ', 'CIEŃ', 'DZIEŃ', 'Słoń i koń to ko-le-dzy.'],
    'Ż': ['ŻA-BA', 'JEŻ', 'ŻÓŁW', 'PLA-ŻA', 'Du-ża ża-ba i ma-ły jeż.'],
    'Ź': ['ŹRE-BIĘ', 'WEŹ', 'GA-ŁĄŹ', 'ŹLE', 'Ma-łe źre-bię bie-ga po łą-ce.']
  },
  en: {
    'S': ['S!', 'SS!', 'SSS!'],
    'A': ['A', 'AS', 'A-S'],
    'T': ['AT', 'SAT', 'TAT'],
    'P': ['PAT', 'TAP', 'SAP', 'Pat a tap!'],
    'I': ['IT', 'SIT', 'PIT', 'TIP', 'Pat sat!'],
    'N': ['IN', 'PIN', 'NAP', 'ANT', 'Pat sat in a pan.'],
    'M': ['MAT', 'MAN', 'MAP', 'SAM', 'Tim is a man.'],
    'D': ['DAD', 'MAD', 'SAD', 'DIP', 'Dan did it!'],
    'G': ['PIG', 'DIG', 'TAG', 'NAG', 'A pig in a pit.'],
    'O': ['ON', 'TOP', 'POT', 'DOG', 'Tom got a dog.'],
    'C': ['CAT', 'CAP', 'COT', 'CAN', 'A cat on a mat.'],
    'K': ['KID', 'KIT', 'INK', 'KICK', 'Kim can kick it.'],
    'E': ['PET', 'PEN', 'TEN', 'MEN', 'Ten men met a cat.'],
    'U': ['UP', 'CUP', 'SUN', 'MUG', 'A pup in a mug!'],
    'R': ['RAT', 'RUN', 'RED', 'CAR', 'A red car ran!'],
    'H': ['HAT', 'HEN', 'HOT', 'HOP', 'He has a red hat.'],
    'B': ['BAT', 'BUS', 'BAG', 'BED', 'Bob has a big bus.'],
    'F': ['FAN', 'FUN', 'FAT', 'FROG', 'A fat frog on a mat.'],
    'L': ['LIP', 'LOG', 'LAMP', 'MILK', 'Sam can fill a cup.'],
    'J': ['JAM', 'JET', 'JOG', 'JUMP', 'Jim can jump up!'],
    'V': ['VAN', 'VET', 'VEST', 'FIVE', 'A red van for a vet!'],
    'W': ['WEB', 'WET', 'WIN', 'SWIM', 'A wet dog can swim!'],
    'X': ['BOX', 'FOX', 'SIX', 'MIX', 'Six foxes in a box!'],
    'Y': ['YES', 'YAM', 'BOY', 'FLY', 'My happy boy can fly!'],
    'Z': ['ZOO', 'ZIP', 'ZERO', 'BUZZ', 'A buzz at the zoo!'],
    'Q': ['QUIT', 'QUIZ', 'QUACK', 'QUEEN', 'A quick fox jumps in a box!']
  }
};

const RU_CUSTOM_LESSONS = {
  'А': {
    tip: 'Широко открой ротик и пропоём песенку голосом: «А-А-А!». Воздух выходит свободно — это гласный звук 🔴.',
    syllables: ['А', 'АА', 'ААА', 'А-А', 'А!', 'А?'],
    comic: [
      { avatar: '👧', scene: '🌲', bubble: 'А-А-А!', spoken: 'ааа!', caption: 'Аня широко открыла ротик и поёт первый звук:' },
      { avatar: '🐊', scene: '🍉', bubble: 'А! Арбуз!', spoken: 'А! Арбуз!', caption: 'Крокодил увидел сладкий красный арбуз:' }
    ]
  },
  'Б': {
    tip: 'Сожми губы вместе и резко выдохни с голосом: «Б-Б-Б!». Губы лопаются как мыльный пузырь — согласный звук 🔵.',
    syllables: ['БА', 'БО', 'БУ', 'БЫ', 'БИ', 'АБ'],
    comic: [
      { avatar: '🐏', scene: '🥁', bubble: 'БУМ-БАМ!', spoken: 'Бум бам!', caption: 'Барашек бьёт в большой барабан:' },
      { avatar: '🐿️', scene: '🍌', bubble: 'Браво, Боб!', spoken: 'Браво, Боб!', caption: 'Белка угощает друзей спелым бананом:' }
    ]
  },
  'В': {
    tip: 'Верхние зубки легко касаются нижней губы, продуй ветерок с голосом: «В-В-В!» — согласный звук 🔵.',
    syllables: ['ВА', 'ВО', 'ВУ', 'ВЫ', 'ВИ', 'АВ'],
    comic: [
      { avatar: '🐺', scene: '🌬️', bubble: 'В-В-УУУ!', spoken: 'Вууу!', caption: 'Воет ветер и волк поёт луне:' },
      { avatar: '🐦‍⬛', scene: '🍒', bubble: 'Вот вода!', spoken: 'Вот вода!', caption: 'Ворона нашла вкусную вишню и воду:' }
    ]
  },
  'Г': {
    tip: 'Спинка язычка стучит у горлышка с голосом: «Г-Г-Г!», как гогочут гуси — согласный звук 🔵.',
    syllables: ['ГА', 'ГО', 'ГУ', 'ГИ', 'АГ', 'ГОЛ'],
    comic: [
      { avatar: '🪿', scene: '🌧️', bubble: 'ГА-ГА-ГА!', spoken: 'Га-га-га!', caption: 'Гуси громко гогочут на лугу:' },
      { avatar: '🦔', scene: '🍄', bubble: 'Ого, гриб!', spoken: 'Ого, гриб!', caption: 'Под горой вырос огромный гриб:' }
    ]
  },
  'Д': {
    tip: 'Кончик языка звонко стучит за верхними зубками: «Д-Д-Д!», как дятел по дереву — согласный звук 🔵.',
    syllables: ['ДА', 'ДО', 'ДУ', 'ДЫ', 'ДИ', 'ДОМ'],
    comic: [
      { avatar: '🐦', scene: '🌳', bubble: 'ТУК-ДДД!', spoken: 'Тук, да-да!', caption: 'Дятел строит добрый дом на дубе:' },
      { avatar: '👦', scene: '🏠', bubble: 'Да! Наш дом!', spoken: 'Да! Наш дом!', caption: 'Дети рады: готов уютный дом!' }
    ]
  },
  'Е': {
    tip: 'Улыбнись губками и мягко пропоём: «ЙЭ-Е-Е!». Этот гласный звук 🔴 смягчает согласные перед собой.',
    syllables: ['МЕ', 'ЛЕ', 'НЕ', 'СЕ', 'ТЕ', 'ЛЕС'],
    comic: [
      { avatar: '🦝', scene: '🌲', bubble: 'Е-е! Лес!', spoken: 'Лес!', caption: 'Енот побежал гулять в зелёный лес:' },
      { avatar: '🦄', scene: '🫐', bubble: 'Ем ежевику!', spoken: 'Ем ежевику!', caption: 'Единорог угощается сладкими ягодами:' }
    ]
  },
  'Ё': {
    tip: 'Вытяни губки трубочкой вперёд и пропоём: «ЙО-Ё-Ё!». Буква Ё всегда ударная и гласная 🔴.',
    syllables: ['МЁ', 'ЛЁ', 'НЁ', 'ТЁ', 'МЁД', 'ЁЖ'],
    comic: [
      { avatar: '🦔', scene: '🎄', bubble: 'Ой, ёлка!', spoken: 'Ой, ёлка!', caption: 'Колючий ёжик несёт фонарик к ёлке:' },
      { avatar: '🐻', scene: '🍯', bubble: 'Вкусный мёд!', spoken: 'Вкусный мёд!', caption: 'На ёлке зажглись яркие огоньки:' }
    ]
  },
  'Ж': {
    tip: 'Округли губы, подними язычок «чашечкой» кверху и пожужжи как жук: «Ж-Ж-Ж!» — всегда твёрдый согласный 🔵.',
    syllables: ['ЖА', 'ЖО', 'ЖУ', 'ЖИ', 'УЖ', 'НОЖ'],
    comic: [
      { avatar: '🪲', scene: '🌼', bubble: 'Ж-Ж-ЖУ!', spoken: 'Жу-жу!', caption: 'Большой жук жужжит над жёлтым цветком:' },
      { avatar: '🦒', scene: '🍦', bubble: 'Жарко жду!', spoken: 'Жарко!', caption: 'Жираф ждёт прохладный дождик:' }
    ]
  },
  'З': {
    tip: 'Улыбнись, кончик языка у нижних зубов, позвени как комарик: «З-З-З!» — звонкий согласный 🔵.',
    syllables: ['ЗА', 'ЗО', 'ЗУ', 'ЗЫ', 'ЗИ', 'АЗ'],
    comic: [
      { avatar: '🦟', scene: '🌿', bubble: 'З-З-ЗВЕНЬ!', spoken: 'Ззз!', caption: 'Комарик звенит в зелёной траве:' },
      { avatar: '🐰', scene: '☂️', bubble: 'Зонт зайки!', spoken: 'Зонт зайки!', caption: 'Зайка спрятался под ярким зонтиком:' }
    ]
  },
  'И': {
    tip: 'Широко улыбнись, покажи зубки и пропоём звонко: «И-И-И!», как жеребёнок — гласный звук 🔴.',
    syllables: ['МИ', 'СИ', 'ЛИ', 'НИ', 'РИ', 'ШИ'],
    comic: [
      { avatar: '🐴', scene: '🌾', bubble: 'И-ГО-ГО!', spoken: 'И-го-го!', caption: 'Лошадка весело скачет по лугу:' },
      { avatar: '🦊', scene: '🪵', bubble: 'Ли-са и ши-ны!', spoken: 'Лиса и шины!', caption: 'После Ы мягко поём И — получается: Ми, Си, Ли, Ши!' }
    ]
  },
  'Й': {
    tip: 'Короткий и мягкий согласный звук 🔵: улыбнись и коротко выдохни «Й!», как в словах «Ой!» и «Май!».',
    syllables: ['ОЙ', 'АЙ', 'МАЙ', 'МОЙ', 'ЛАЙ', 'РОЙ'],
    comic: [
      { avatar: '🐶', scene: '🌸', bubble: 'ЛАЙ-ЛАЙ! МАЙ!', spoken: 'Лай-лай! Май!', caption: 'Щенок радуется тёплому месяцу маю:' },
      { avatar: '🧒', scene: '🍦', bubble: 'ОЙ, мой змей!', spoken: 'Ой, мой змей!', caption: 'Бумажный змей взлетает высоко в небо:' }
    ]
  },
  'К': {
    tip: 'Спинка язычка коротко толкает воздух у горлышка без голоса: «К-К-К!», как капельки дождя — согласный 🔵.',
    syllables: ['КА', 'КО', 'КУ', 'КИ', 'АК', 'ОК'],
    comic: [
      { avatar: '🐔', scene: '🌾', bubble: 'КО-КО-КО!', spoken: 'Ко-ко-ко!', caption: 'Курочка зовёт маленьких цыплят:' },
      { avatar: '🐱', scene: '🥛', bubble: 'Кот и каша!', spoken: 'Кот и каша!', caption: 'Котёнок лакает молоко на кухне:' }
    ]
  },
  'Л': {
    tip: 'Прижми кончик языка к верхним зубкам и пропоём плавно: «Л-Л-Л!», как гудит пароход — согласный 🔵.',
    syllables: ['ЛА', 'ЛО', 'ЛУ', 'ЛЫ', 'АЛ', 'ОЛ'],
    comic: [
      { avatar: '🦁', scene: '🚢', bubble: 'ЛА-ЛА-ЛА!', spoken: 'Ла-ла-ла!', caption: 'Лев плывёт на лодке и поёт песенку:' },
      { avatar: '🦙', scene: '🧼', bubble: 'Мы-ло и ла-ма!', spoken: 'Мыло и лама!', caption: 'Мама мыла маленькую ламу душистым мылом:' }
    ]
  },
  'М': {
    tip: 'Сомкни губы и помычи носом и голосом, как телёнок зовёт маму: «М-М-М!» — согласный звук 🔵.',
    syllables: ['АМ', 'УМ', 'ОМ', 'МА', 'МУ', 'МО'],
    comic: [
      { avatar: '🐮', scene: '🌼', bubble: 'МУ-У! МА-МА!', spoken: 'Муу! Мама!', caption: 'Телёнок слил М и А и прочитал первое слово — МАМА!' },
      { avatar: '🐻', scene: '🍯', bubble: 'АМ! УМ!', spoken: 'Ам! Ум!', caption: 'Мишка поёт слоги М с гласными А, У, О:' }
    ]
  },
  'Н': {
    tip: 'Кончик языка упирается в верхние зубки, воздух идёт через нос: «Н-Н-Н!» — согласный звук 🔵.',
    syllables: ['НА', 'НО', 'НУ', 'НЫ', 'АН', 'ОН'],
    comic: [
      { avatar: '🐘', scene: '🌙', bubble: 'ЛУ-НА И СЛОН!', spoken: 'Луна и слон!', caption: 'Слонёнок смотрит на ночную луну:' },
      { avatar: '🦏', scene: '👃', bubble: 'НОС — СОН!', spoken: 'Нос, сон!', caption: 'Носорог засыпает и видит сладкий сон:' }
    ]
  },
  'О': {
    tip: 'Округли губки колечком, как бублик, и пропоём: «О-О-О!» — поющийся гласный звук 🔴.',
    syllables: ['О', 'ОО', 'АО', 'ОА', 'ОУ', 'АУ'],
    comic: [
      { avatar: '🐒', scene: '☁️', bubble: 'О-О-О!', spoken: 'ооо!', caption: 'Мартышка округлила губки бубликом и поёт:' },
      { avatar: '👧', scene: '🌲', bubble: 'АУ! О!', spoken: 'Ау! О!', caption: 'Теперь мы знаем три гласные — А, У, О!' }
    ]
  },
  'П': {
    tip: 'Сомкни губы и выпусти ветерок толчком без голоса: «П-П-П!», как пыхтит паровозик — согласный 🔵.',
    syllables: ['ПА', 'ПО', 'ПУ', 'ПЫ', 'ПИ', 'АП'],
    comic: [
      { avatar: '🚂', scene: '💨', bubble: 'ПЫХ-ПЫХ!', spoken: 'Пых-пых!', caption: 'Паровозик везёт подарки по рельсам:' },
      { avatar: '👨', scene: '🍲', bubble: 'ПА-ПА И СУП!', spoken: 'Папа и суп!', caption: 'Папа приготовил вкусный горячий суп:' }
    ]
  },
  'Р': {
    tip: 'Улыбнись, подними кончик языка за верхние зубки и заведи моторчик: «Р-Р-Р!» — звонкий согласный 🔵.',
    syllables: ['РА', 'РО', 'РУ', 'РЫ', 'АР', 'ОР'],
    comic: [
      { avatar: '🐯', scene: '🎈', bubble: 'РА-МА И ШАР!', spoken: 'Рама и шар!', caption: 'Рома поймал большой воздушный шар:' },
      { avatar: '🐭', scene: '🧀', bubble: 'УРА! СЫР!', spoken: 'Ура! Сыр!', caption: 'Мышка обрадовалась ароматному сыру:' }
    ]
  },
  'С': {
    tip: 'Улыбнись, кончик языка у нижних зубов, выпусти холодный ветерок: «С-С-С!», как насос — согласный 🔵.',
    syllables: ['АС', 'УС', 'ОС', 'СА', 'СУ', 'СО'],
    comic: [
      { avatar: '🐝', scene: '🌻', bubble: 'С-С-САМ!', spoken: 'Сам!', caption: 'Насос качает ветерок — получается слово САМ!' },
      { avatar: '🐟', scene: '🌊', bubble: 'О-СА И СОМ!', spoken: 'Оса и сом!', caption: 'Слон и сом уже читают короткие слова с С:' }
    ]
  },
  'Т': {
    tip: 'Кончик языка стучит за верхними зубками без голоса: «Т-Т-Т!», как тикают часики — согласный 🔵.',
    syllables: ['ТА', 'ТО', 'ТУ', 'ТЫ', 'ТИ', 'АТ'],
    comic: [
      { avatar: '⏰', scene: '🐱', bubble: 'ТИК-ТАК! КОТ!', spoken: 'Тик-так! Кот!', caption: 'Часики будят пушистого кота:' },
      { avatar: '🐳', scene: '🌊', bubble: 'ТУТ КИТ!', spoken: 'Тут кит!', caption: 'В синем море плывёт большой кит:' }
    ]
  },
  'У': {
    tip: 'Вытяни губки длинной трубочкой вперёд и погуди как поезд: «У-У-У!» — гласный звук 🔴.',
    syllables: ['У', 'УУ', 'АУ', 'УА', 'АУ!', 'УА!'],
    comic: [
      { avatar: '🚂', scene: '💨', bubble: 'У-У-У!', spoken: 'ууу!', caption: 'Паровозик гудит длинным голосом У:' },
      { avatar: '👧', scene: '👶', bubble: 'АУ! УА!', spoken: 'Ау! Уа!', caption: 'Складываем А и У — получается АУ и УА!' }
    ]
  },
  'Ф': {
    tip: 'Верхние зубки на нижней губе, выдохни воздух без голоса: «Ф-Ф-Ф!», как фыркает ёжик — согласный 🔵.',
    syllables: ['ФА', 'ФО', 'ФУ', 'ФИ', 'ФЕ', 'ШАРФ'],
    comic: [
      { avatar: '🦔', scene: '🔦', bubble: 'ФЫР-ФЫР!', spoken: 'Фыр-фыр!', caption: 'Ёжик светит ярким фонариком в темноте:' },
      { avatar: '🚩', scene: '🧣', bubble: 'Флаг и шарф!', spoken: 'Флаг и шарф!', caption: 'Зверята надели тёплый шарф и несут флаг:' }
    ]
  },
  'Х': {
    tip: 'Открой рот и погрей ладошки тёплым дыханием: «Х-Х-Х!» — глухой согласный звук 🔵.',
    syllables: ['АХ', 'УХ', 'ОХ', 'ХА', 'ХУ', 'ХО'],
    comic: [
      { avatar: '🍲', scene: '🐟', bubble: 'АХ! У-ХА!', spoken: 'Ах! Уха!', caption: 'Сварили вкусную уху — читаем: АХ, ОХ, УХА!' },
      { avatar: '🪰', scene: '🌿', bubble: 'МУ-ХА И МОХ!', spoken: 'Муха и мох!', caption: 'Первая ступень позади — мы уже читаем целые слова!' }
    ]
  },
  'Ц': {
    tip: 'Улыбнись и быстро скажи слитно «ТС» -> «Ц-Ц-Ц!», как синичка: «Цып-цып!» — всегда твёрдый согласный 🔵.',
    syllables: ['ЦА', 'ЦО', 'ЦУ', 'ЦЫ', 'ЦЕ', 'АЦ'],
    comic: [
      { avatar: '🐤', scene: '🌸', bubble: 'ЦЫП-ЦЫП!', spoken: 'Цып-цып!', caption: 'Жёлтый цыплёнок нюхает красивый цветок:' },
      { avatar: '🐑', scene: '🥚', bubble: 'Овца и яйцо!', spoken: 'Овца и яйцо!', caption: 'Во дворе овца смотрит на цыплят:' }
    ]
  },
  'Ч': {
    tip: 'Губы округли, подними язычок кверху и скажи мягко: «Ч-Ч-Ч!», как едет поезд «Чух-чух» — всегда мягкий 🔵.',
    syllables: ['ЧА', 'ЧУ', 'ЧИ', 'ЧЕ', 'ЧЁ', 'МЕЧ'],
    comic: [
      { avatar: '🚂', scene: '🐢', bubble: 'ЧУХ-ЧУХ!', spoken: 'Чух-чух!', caption: 'Черепашка едет на поезде пить чай:' },
      { avatar: '🫖', scene: '🍵', bubble: 'Чашка чая!', spoken: 'Чашка чая!', caption: 'На столе горячий душистый чай:' }
    ]
  },
  'Ш': {
    tip: 'Подними широкий язычок к нёбу, округли губы и пошурши как ветер в листве: «Ш-Ш-Ш!» — твёрдый согласный 🔵.',
    syllables: ['ША', 'ШО', 'ШУ', 'АШ', 'ОШ', 'УШ'],
    comic: [
      { avatar: '👧', scene: '🎈', bubble: 'МА-ША И ША-РЫ!', spoken: 'Маша и шары!', caption: 'Листья шуршат: Ш-ш-ш! Маша несёт шары:' },
      { avatar: '👶', scene: '🍯', bubble: 'ШУМ! МА-ЛЫШ!', spoken: 'Шум! Малыш!', caption: 'Малыш слышит весёлый шум ветра:' }
    ]
  },
  'Щ': {
    tip: 'Улыбнись и произнеси долгое мягкое шипение: «Щ-Щ-Щ!», как чистит зубки щётка — всегда мягкий согласный 🔵.',
    syllables: ['ЩА', 'ЩУ', 'ЩИ', 'ЩЕ', 'ЩЁ', 'БОРЩ'],
    comic: [
      { avatar: '🐶', scene: '🪥', bubble: 'Щ-Щ! Щётка!', spoken: 'Щётка и щенок!', caption: 'Щенок чистит белые зубки щёткой:' },
      { avatar: '🐟', scene: '🍲', bubble: 'Щука и щи!', spoken: 'Щука и щи!', caption: 'В реке плывёт быстрая зубастая щука:' }
    ]
  },
  'Ъ': {
    tip: 'Твёрдый знак ⚪ сам звука не даёт, но делает паузу-разделитель перед гласными Е, Ё, Ю, Я!',
    syllables: ['СЪЕЛ', 'ВЪЕЗД', 'СЪЕЗД', 'ОБЪЁМ', 'ПОДЪЁМ', 'ПОДЪЕЗД'],
    comic: [
      { avatar: '🚗', scene: '🏢', bubble: 'Тут подъезд!', spoken: 'Тут подъезд!', caption: 'Машина подъехала прямо к подъезду дома:' },
      { avatar: '🐱', scene: '🐟', bubble: 'Кот всё съел!', spoken: 'Кот всё съел!', caption: 'Довольный котик съел весь свой обед:' }
    ]
  },
  'Ы': {
    tip: 'Улыбнись, отодвинь язычок чуть назад и пропоём низким голосом: «Ы-Ы-Ы!» — гласный звук 🔴.',
    syllables: ['МЫ', 'СЫ', 'ХЫ', 'ЫМ', 'ЫС', 'МА-МЫ'],
    comic: [
      { avatar: '👨', scene: '🧔', bubble: 'МЫ И У-СЫ!', spoken: 'Мы и усы!', caption: 'Тянем твёрдую песенку Ы: мы, сы, усы!' },
      { avatar: '🐝', scene: '🐟', bubble: 'О-СЫ И СО-МЫ!', spoken: 'Осы и сомы!', caption: 'Осы жужжат над сомами в пруду:' }
    ]
  },
  'Ь': {
    tip: 'Мягкий знак ⚪ своего звука не имеет, но делает согласную букву перед собой доброй и мягкой!',
    syllables: ['КОНЬ', 'ДЕНЬ', 'ТЕНЬ', 'СОЛЬ', 'ГУСЬ', 'ЛОСЬ'],
    comic: [
      { avatar: '🐴', scene: '☀️', bubble: 'Добрый конь!', spoken: 'Добрый конь!', caption: 'Быстрый конь скачет в солнечный день:' },
      { avatar: '🦌', scene: '🌲', bubble: 'Лось и ель!', spoken: 'Лось и ель!', caption: 'Лесной лось отдыхает под высокой елью:' }
    ]
  },
  'Э': {
    tip: 'Открой ротик в широкой улыбке, язычок внизу, пропоём: «Э-Э-Э!» — гласный звук 🔴.',
    syllables: ['ЭЙ', 'ЭХ', 'МЭР', 'СЭР', 'ЭХО', 'ЭРА'],
    comic: [
      { avatar: '🏔️', scene: '🗣️', bubble: 'Э-Э-ЭХО!', spoken: 'Эхо в горах!', caption: 'В высоких горах громко звучит эхо:' },
      { avatar: '🚜', scene: '🏗️', bubble: 'Экскаватор!', spoken: 'Экскаватор!', caption: 'Большой экскаватор копает песок ковшом:' }
    ]
  },
  'Ю': {
    tip: 'Вытяни губки трубочкой и пропоём мягко: «ЙУ-Ю-Ю!», как крутится юла — гласный звук 🔴.',
    syllables: ['МЮ', 'ЛЮ', 'НЮ', 'СЮ', 'ЮГ', 'ЮЛА'],
    comic: [
      { avatar: '👧', scene: '🪀', bubble: 'Ю-ю, юла!', spoken: 'Юла крутится!', caption: 'Юля раскрутила быструю яркую юлу:' },
      { avatar: '👗', scene: '🏖️', bubble: 'Едем на юг!', spoken: 'Едем на юг!', caption: 'Красивая юбка для поездки на тёплый юг:' }
    ]
  },
  'Я': {
    tip: 'Улыбнись и широко открой ротик, пропоём звонко: «ЙА-Я-Я!» — гласный звук 🔴.',
    syllables: ['МЯ', 'ЛЯ', 'НЯ', 'СЯ', 'РЯ', 'ЯМА'],
    comic: [
      { avatar: '🧒', scene: '🍎', bubble: 'Я ем яблоко!', spoken: 'Я ем яблоко!', caption: 'Яша сорвал в саду спелое красное яблоко:' },
      { avatar: '🐍', scene: '🌿', bubble: 'Яма и змея!', spoken: 'Яма и змея!', caption: 'Длинная змея ползёт по лесной поляне:' }
    ]
  }
};

// Похожие буквы-ловушки для задания «Буквенный сыщик»
const SIMILAR_LETTERS = {
  ru: {
    'А': ['Л', 'Д', 'О', 'У'], 'Б': ['В', 'Р', 'Г', 'Д'], 'В': ['Б', 'Р', 'З', 'Ф'],
    'Г': ['П', 'Т', 'Б', 'К'], 'Д': ['Л', 'А', 'Т', 'Б'], 'Е': ['Ё', 'З', 'Э', 'В'],
    'Ё': ['Е', 'Э', 'О', 'Ю'], 'Ж': ['К', 'Х', 'Ш', 'З'], 'З': ['В', 'Е', 'Э', 'С'],
    'И': ['Н', 'Й', 'П', 'Ы'], 'Й': ['И', 'Н', 'Ы', 'У'], 'К': ['Ж', 'Х', 'Р', 'Г'],
    'Л': ['А', 'Д', 'П', 'М'], 'М': ['Н', 'Л', 'Ш', 'И'], 'Н': ['И', 'П', 'М', 'К'],
    'О': ['С', 'Ю', 'А', 'Э'], 'П': ['Н', 'Г', 'Т', 'Л'], 'Р': ['В', 'Б', 'Ф', 'Ь'],
    'С': ['О', 'Э', 'З', 'Ц'], 'Т': ['Г', 'П', 'Д', 'К'], 'У': ['Ч', 'Х', 'А', 'И'],
    'Ф': ['Р', 'В', 'О', 'Ю'], 'Х': ['Ж', 'К', 'У', 'А'], 'Ц': ['Щ', 'Ш', 'И', 'С'],
    'Ч': ['У', 'Т', 'Ш', 'Щ'], 'Ш': ['Щ', 'Ц', 'М', 'Е'], 'Щ': ['Ш', 'Ц', 'Ч', 'Ж'],
    'Ъ': ['Ь', 'Ы', 'Б', 'Р'], 'Ы': ['Ь', 'Ъ', 'И', 'Н'], 'Ь': ['Ъ', 'Ы', 'Б', 'Р'],
    'Э': ['З', 'С', 'Е', 'О'], 'Ю': ['О', 'Ф', 'Я', 'Ё'], 'Я': ['Р', 'А', 'Ю', 'В']
  }
};

// Запас слов для редких букв (минимум 4–6 слов для заданий на позицию и вставку буквы)
const EXTRA_LETTER_WORDS = {
  ru: {
    'А': [{ word: 'АРБУЗ', emoji: '🍉' }, { word: 'БАНАН', emoji: '🍌' }, { word: 'КОЗА', emoji: '🐐' }, { word: 'ШАР', emoji: '🎈' }],
    'Ё': [{ word: 'ЁЛКА', emoji: '🎄' }, { word: 'МЁД', emoji: '🍯' }, { word: 'ЛЁД', emoji: '🧊' }, { word: 'ЁЖИК', emoji: '🦔' }, { word: 'САМОЛЁТ', emoji: '✈️' }],
    'Й': [{ word: 'ЙОГУРТ', emoji: '🍦' }, { word: 'ЧАЙ', emoji: '🍵' }, { word: 'ПОПУГАЙ', emoji: '🦜' }, { word: 'ЗАЙКА', emoji: '🐰' }, { word: 'МАЙКА', emoji: '👕' }],
    'Ф': [{ word: 'ФЛАГ', emoji: '🚩' }, { word: 'ФОКУС', emoji: '🎩' }, { word: 'ЖИРАФ', emoji: '🦒' }, { word: 'ФАРА', emoji: '🔦' }, { word: 'ШКАФ', emoji: '🚪' }],
    'Х': [{ word: 'ХЛЕБ', emoji: '🍞' }, { word: 'МУХА', emoji: '🪰' }, { word: 'УХО', emoji: '👂' }, { word: 'ПЕТУХ', emoji: '🐓' }, { word: 'ХОМЯК', emoji: '🐹' }],
    'Ц': [{ word: 'ЦВЕТОК', emoji: '🌸' }, { word: 'ЦЫПЛЁНОК', emoji: '🐤' }, { word: 'ЗАЯЦ', emoji: '🐰' }, { word: 'СОЛНЦЕ', emoji: '☀️' }, { word: 'ЦИРК', emoji: '🎪' }],
    'Ч': [{ word: 'ЧАЙ', emoji: '🍵' }, { word: 'МЯЧ', emoji: '⚽' }, { word: 'ЧАШКА', emoji: '☕' }, { word: 'ТУЧА', emoji: '☁️' }, { word: 'ЧАСЫ', emoji: '⏰' }],
    'Ш': [{ word: 'ШАРИК', emoji: '🎈' }, { word: 'ШАРФ', emoji: '🧣' }, { word: 'КАША', emoji: '🥣' }, { word: 'МЫШЬ', emoji: '🐭' }, { word: 'МАШИНА', emoji: '🚗' }],
    'Щ': [{ word: 'ЩЁТКА', emoji: '🪥' }, { word: 'ЩЕНОК', emoji: '🐶' }, { word: 'ЩУКА', emoji: '🐟' }, { word: 'ПЛАЩ', emoji: '🧥' }, { word: 'ОВОЩИ', emoji: '🥕' }],
    'Ъ': [{ word: 'ПОДЪЕЗД', emoji: '🏢' }, { word: 'СЪЕЛ', emoji: '🍽️' }, { word: 'ВЪЕЗД', emoji: '🚗' }, { word: 'ОБЪЁМ', emoji: '📦' }, { word: 'СЪЁМКА', emoji: '📷' }],
    'Ы': [{ word: 'СЫР', emoji: '🧀' }, { word: 'РЫБА', emoji: '🐟' }, { word: 'МЫШЬ', emoji: '🐭' }, { word: 'МЫЛО', emoji: '🧼' }, { word: 'ЧАСЫ', emoji: '⏰' }],
    'Ь': [{ word: 'КОНЬ', emoji: '🐴' }, { word: 'МЕДВЕДЬ', emoji: '🐻' }, { word: 'СОЛЬ', emoji: '🧂' }, { word: 'ЕЛЬ', emoji: '🌲' }, { word: 'ГУСЬ', emoji: '🦢' }],
    'Э': [{ word: 'ЭКСКАВАТОР', emoji: '🚜' }, { word: 'ЭХО', emoji: '🏔️' }, { word: 'ЭКРАН', emoji: '📺' }, { word: 'ПОЭТ', emoji: '📖' }, { word: 'ДУЭТ', emoji: '🎶' }],
    'Ю': [{ word: 'ЮБКА', emoji: '👗' }, { word: 'ЮЛА', emoji: '🪀' }, { word: 'УТЮГ', emoji: '🧺' }, { word: 'КЛЮЧ', emoji: '🔑' }, { word: 'ИНДЮК', emoji: '🦃' }],
    'Я': [{ word: 'ЯБЛОКО', emoji: '🍎' }, { word: 'ЗАЯЦ', emoji: '🐰' }, { word: 'ЯМА', emoji: '🕳️' }, { word: 'ЗМЕЯ', emoji: '🐍' }, { word: 'ВИШНЯ', emoji: '🍒' }]
  },
  pl: {
    'Ą': [{ word: 'WĄŻ', emoji: '🐍' }, { word: 'PĄCZEK', emoji: '🍩' }, { word: 'MĄKA', emoji: '🌾' }, { word: 'ZĄB', emoji: '🦷' }, { word: 'GOŁĄB', emoji: '🕊️' }],
    'Ć': [{ word: 'LIŚĆ', emoji: '🍂' }, { word: 'ĆMA', emoji: '🦋' }, { word: 'KOŚĆ', emoji: '🦴' }, { word: 'NIĆ', emoji: '🧵' }, { word: 'SIEĆ', emoji: '🕸️' }],
    'Ę': [{ word: 'RĘKA', emoji: '✋' }, { word: 'TĘCZA', emoji: '🌈' }, { word: 'GĘŚ', emoji: '🪿' }, { word: 'BĘBEN', emoji: '🥁' }, { word: 'PIĘĆ', emoji: '5️⃣' }],
    'Ń': [{ word: 'KOŃ', emoji: '🐎' }, { word: 'SŁOŃ', emoji: '🐘' }, { word: 'SŁOŃCE', emoji: '☀️' }, { word: 'CIEŃ', emoji: '👤' }, { word: 'OGIEŃ', emoji: '🔥' }],
    'Ó': [{ word: 'ŻÓŁW', emoji: '🐢' }, { word: 'ŁÓDKA', emoji: '🚣' }, { word: 'STÓŁ', emoji: '🪑' }, { word: 'OGÓREK', emoji: '🥒' }, { word: 'CHÓD', emoji: '🚶' }],
    'Ś': [{ word: 'ŚNIEG', emoji: '❄️' }, { word: 'MIŚ', emoji: '🧸' }, { word: 'GĘŚ', emoji: '🪿' }, { word: 'ŚLIMAK', emoji: '🐌' }, { word: 'WIŚNIA', emoji: '🍒' }],
    'Ź': [{ word: 'ŹREBIĘ', emoji: '🐴' }, { word: 'GAŁĄŹ', emoji: '🌿' }, { word: 'KUŹNIA', emoji: '🔨' }, { word: 'ŹRÓDŁO', emoji: '💧' }, { word: 'RZEŹBA', emoji: '🗿' }],
    'Ż': [{ word: 'ŻABA', emoji: '🐸' }, { word: 'JEŻ', emoji: '🦔' }, { word: 'ŻYRAFA', emoji: '🦒' }, { word: 'RÓŻA', emoji: '🌹' }, { word: 'PLAŻA', emoji: '🏖️' }]
  },
  en: {
    'Q': [{ word: 'QUEEN', emoji: '👑' }, { word: 'QUILT', emoji: '🛏️' }, { word: 'QUIZ', emoji: '❓' }, { word: 'SQUARE', emoji: '🟦' }, { word: 'SQUIRREL', emoji: '🐿️' }],
    'V': [{ word: 'VIOLIN', emoji: '🎻' }, { word: 'VAN', emoji: '🚐' }, { word: 'VEST', emoji: '🦺' }, { word: 'WAVE', emoji: '🌊' }, { word: 'FIVE', emoji: '5️⃣' }],
    'X': [{ word: 'BOX', emoji: '📦' }, { word: 'FOX', emoji: '🦊' }, { word: 'SIX', emoji: '6️⃣' }, { word: 'TAXI', emoji: '🚕' }, { word: 'AXE', emoji: '🪓' }],
    'Y': [{ word: 'YELLOW', emoji: '💛' }, { word: 'KEY', emoji: '🔑' }, { word: 'BOY', emoji: '👦' }, { word: 'MONKEY', emoji: '🐒' }, { word: 'BABY', emoji: '👶' }],
    'Z': [{ word: 'ZEBRA', emoji: '🦓' }, { word: 'ZOO', emoji: '🦁' }, { word: 'ZERO', emoji: '0️⃣' }, { word: 'PIZZA', emoji: '🍕' }, { word: 'PRIZE', emoji: '🏆' }]
  }
};

export function getLetterLesson(letter, lang = 'ru') {
  const upper = letter.toUpperCase();
  const alphabetList = ALPHABET_DATA[lang] || ALPHABET_DATA['ru'];
  const letterItem = alphabetList.find(a => a.letter.toUpperCase() === upper) || alphabetList[0];
  const vowelSet = VOWELS[lang] || VOWELS['ru'];

  const isSign = (lang === 'ru' && (upper === 'Ъ' || upper === 'Ь'));
  const isVowel = !isSign && vowelSet.has(upper);
  const soundType = isSign ? 'sign' : (isVowel ? 'vowel' : 'consonant');

  const metaMap = getBukvarMetaMap(lang);
  const meta = metaMap.get(upper) || {
    stepNumber: 1,
    totalSteps: alphabetList.length,
    stageId: 'stage1',
    stageBadge: '',
    stageTitle: ''
  };
  const cumulativeWords = (CUMULATIVE_WORDS[lang] && CUMULATIVE_WORDS[lang][upper])
    ? [...CUMULATIVE_WORDS[lang][upper]]
    : [letterItem.word.toUpperCase()];

  // 1. Тип звука, бейдж и логопедический совет
  let badgeText = '';
  let tipText = '';
  let syllables = [];
  let comic = [];

  if (lang === 'ru') {
    badgeText = isSign ? '⚪ Буква-знак' : (isVowel ? '🔴 Гласный звук (поётся)' : '🔵 Согласный звук');
    const custom = RU_CUSTOM_LESSONS[upper];
    if (custom) {
      tipText = custom.tip;
      syllables = [...custom.syllables];
      comic = custom.comic;
    } else {
      tipText = isVowel
        ? `Спой звук «${upper}-${upper}-${upper}!» — воздух идёт свободно, звук поётся!`
        : `Произнеси чётко звук буквы «${upper}» в слове «${letterItem.word}».`;
      syllables = isVowel ? [`${upper}М`, `М${upper}`, `П${upper}`, `Т${upper}`, `К${upper}`, `${upper}С`] : [`${upper}А`, `${upper}О`, `${upper}У`, `${upper}И`, `${upper}Е`, `А${upper}`];
      comic = [
        { avatar: letterItem.emoji, scene: '✨', bubble: `${upper}! ${letterItem.word}!`, spoken: `${letterItem.word}!`, caption: `Познакомься с буквой ${upper}:` },
        { avatar: '🧒', scene: '📖', bubble: `Читаю: ${syllables[0]}!`, spoken: syllables[0], caption: `Соединяем букву ${upper} в слоги:` }
      ];
    }
  } else if (lang === 'pl') {
    badgeText = isVowel ? '🔴 Samogłoska (śpiewana)' : '🔵 Spółgłoska';
    tipText = isVowel
      ? `Otwórz buzię i zaśpiewaj dźwięcznie głoskę «${upper}-${upper}-${upper}!» jak w słowie «${letterItem.word}».`
      : `Wymów wyraźnie głoskę «${upper}» na początku lub w środku słowa «${letterItem.word}» ${letterItem.emoji}.`;
    const PL_CUSTOM_SYLLABLES = {
      'A': ['A', 'AA', 'AAA', 'A!', 'A?', 'A-A'],
      'O': ['O', 'OO', 'AO', 'OA', 'AO!', 'OA!'],
      'U': ['U', 'UU', 'AU', 'UA', 'OU', 'AU!'],
      'E': ['E', 'EE', 'AE', 'EA', 'EO', 'EU'],
      'I': ['I', 'II', 'AI', 'IA', 'OI', 'UI'],
      'Y': ['Y', 'YY', 'AY', 'OY', 'EY', 'IY'],
      'M': ['MA', 'MO', 'MU', 'ME', 'MI', 'MY'],
      'T': ['TA', 'TO', 'TU', 'TE', 'TI', 'TY'],
      'L': ['LA', 'LO', 'LU', 'LE', 'LI', 'LY'],
      'Ą': ['MĄ', 'WĄ', 'BĄ', 'SĄ', 'DĄB', 'ZĄB'],
      'Ć': ['ĆMA', 'NIĆ', 'SIEĆ', 'PIĆ', 'BYĆ', 'PIĘĆ'],
      'Ę': ['RĘ', 'BĘ', 'TĘ', 'GĘ', 'MĘ', 'SĘ'],
      'Ł': ['ŁA', 'ŁO', 'ŁU', 'ŁE', 'ŁY', 'MAŁY'],
      'Ń': ['KOŃ', 'SŁOŃ', 'CIEŃ', 'DZIEŃ', 'DŁOŃ', 'OGIEŃ'],
      'Ó': ['BÓ', 'GÓ', 'KÓ', 'MÓ', 'RÓ', 'STÓŁ'],
      'Ś': ['ŚNIEG', 'MIŚ', 'ŚLIWA', 'OŚ', 'ŚWIAT', 'GĘŚ'],
      'Ź': ['ŹLE', 'WEŹ', 'ŹREBIĘ', 'GAŁĄŹ', 'RZEŹBA', 'KUŹNIA'],
      'Ż': ['ŻA', 'ŻO', 'ŻU', 'ŻE', 'ŻY', 'JEŻ'],
      'C': ['CA', 'CO', 'CU', 'CE', 'CY', 'NOC'],
      'R': ['RA', 'RO', 'RU', 'RE', 'RY', 'SER'],
      'G': ['GA', 'GO', 'GU', 'GE', 'GI', 'NOGA'],
      'H': ['HA', 'HO', 'HU', 'HE', 'HI', 'ECHO']
    };
    if (PL_CUSTOM_SYLLABLES[upper]) {
      syllables = PL_CUSTOM_SYLLABLES[upper];
    } else if (isVowel) {
      syllables = [`M${upper}`, `L${upper}`, `T${upper}`, `K${upper}`, `S${upper}`, letterItem.word.toUpperCase()];
    } else {
      syllables = [`${upper}A`, `${upper}O`, `${upper}U`, `${upper}E`, `${upper}I`, `${upper}Y`];
    }
    comic = [
      {
        avatar: letterItem.emoji,
        scene: '🌟',
        bubble: `${upper}! ${letterItem.word}!`,
        spoken: `${letterItem.word}!`,
        caption: `Poznaj literę ${upper} w słowie «${letterItem.word}»:`
      },
      {
        avatar: '🧒',
        scene: '🎈',
        bubble: `${syllables[0]}! Brawo!`,
        spoken: `${syllables[0]}! Brawo!`,
        caption: `Przeczytaj głośno dymek w komiksie:`
      }
    ];
  } else {
    // 'en'
    badgeText = isVowel ? '🔴 Vowel sound' : '🔵 Consonant sound';
    tipText = isVowel
      ? `Open your mouth and sing the vowel sound "${upper}" cleanly as in "${letterItem.word}" ${letterItem.emoji}!`
      : `Say the crisp sound of letter "${upper}" clearly as in "${letterItem.word}" ${letterItem.emoji}!`;
    const EN_CUSTOM_SYLLABLES = {
      'S': ['S', 'SS', 'SSS', 'S!', 'SS!', 'SSS!'],
      'A': ['A', 'AA', 'AS', 'SA', 'AS!', 'SAS'],
      'T': ['AT', 'TA', 'SAT', 'TAT', 'TAS', 'AST'],
      'P': ['PA', 'AP', 'PAT', 'TAP', 'SAP', 'PAP'],
      'I': ['IT', 'IS', 'PI', 'TI', 'SIT', 'TIP'],
      'N': ['NA', 'NI', 'IN', 'AN', 'PIN', 'NAP'],
      'M': ['MA', 'MI', 'AM', 'IM', 'MAT', 'MAN'],
      'D': ['DA', 'DI', 'AD', 'ID', 'DAD', 'MAD'],
      'G': ['GA', 'GI', 'AG', 'IG', 'PIG', 'DIG'],
      'O': ['ON', 'OT', 'OP', 'MO', 'NO', 'DOG'],
      'C': ['CA', 'CO', 'CI', 'CAT', 'CAP', 'COT'],
      'K': ['KA', 'KO', 'KI', 'KID', 'KIT', 'INK'],
      'E': ['ET', 'EN', 'EM', 'PET', 'PEN', 'TEN'],
      'Q': ['QUA', 'QUE', 'QUI', 'QUO', 'SQU', 'QUEEN'],
      'X': ['AX', 'EX', 'IX', 'OX', 'UX', 'BOX'],
      'Y': ['YES', 'YAM', 'YUM', 'MY', 'BY', 'FLY'],
      'W': ['WA', 'WE', 'WI', 'WO', 'WET', 'WEB']
    };
    if (EN_CUSTOM_SYLLABLES[upper]) {
      syllables = EN_CUSTOM_SYLLABLES[upper];
    } else if (isVowel) {
      syllables = [`${upper}T`, `${upper}N`, `M${upper}`, `B${upper}`, `S${upper}`, letterItem.word.toUpperCase()];
    } else {
      syllables = [`${upper}A`, `${upper}O`, `${upper}E`, `${upper}I`, `${upper}U`, letterItem.word.toUpperCase()];
    }
    comic = [
      {
        avatar: letterItem.emoji,
        scene: '🌈',
        bubble: `${upper} is for ${letterItem.word}!`,
        spoken: `${letterItem.word}!`,
        caption: `Look! ${letterItem.emoji} says:`
      },
      {
        avatar: '🧒',
        scene: '🚀',
        bubble: `Let's read: ${cumulativeWords[0]}!`,
        spoken: `Let's read ${cumulativeWords[0].replace(/-/g, '')}!`,
        caption: `Tap the speech bubble to listen and repeat:`
      }
    ];
  }

  // 2. Задание 1: «Буквенный сыщик» (12 кружков: 5 целевых букв + 7 букв-ловушек)
  const allAlphabetLetters = alphabetList.map(a => a.letter.toUpperCase()).filter(l => l !== upper);
  const simPoolRaw = (SIMILAR_LETTERS[lang] && SIMILAR_LETTERS[lang][upper])
    ? SIMILAR_LETTERS[lang][upper].filter(l => l !== upper)
    : [];
  const remainingOthers = shuffleArray(allAlphabetLetters.filter(l => !simPoolRaw.includes(l)));
  const distractorsPool = [...shuffleArray(simPoolRaw), ...remainingOthers];
  const distractors = [];
  for (let i = 0; i < 7; i++) {
    distractors.push(distractorsPool[i % distractorsPool.length]);
  }
  const detectiveBubbles = shuffleArray([
    { id: 't1', letter: upper, isTarget: true },
    { id: 't2', letter: upper, isTarget: true },
    { id: 't3', letter: upper, isTarget: true },
    { id: 't4', letter: upper, isTarget: true },
    { id: 't5', letter: upper, isTarget: true },
    ...distractors.map((d, idx) => ({ id: `d${idx}`, letter: d, isTarget: false }))
  ]);

  // Собираем богатый пул слов с изучаемой буквой (без пробелов/дефисов)
  const wordsPool = [
    ...(WORDS_DATA[lang] || WORDS_DATA['ru'] || []),
    ...((WORDS_DATA_HARD && WORDS_DATA_HARD[lang]) ? WORDS_DATA_HARD[lang] : [])
  ];
  const candidateMatches = [];
  const seenWords = new Set();

  const mainWordUpper = letterItem.word.toUpperCase();
  if (!mainWordUpper.includes(' ') && !mainWordUpper.includes('-') && mainWordUpper.includes(upper)) {
    candidateMatches.push({ word: mainWordUpper, emoji: letterItem.emoji, hasLetter: true });
    seenWords.add(mainWordUpper);
  }

  const shuffledDict = shuffleArray(wordsPool);
  for (const w of shuffledDict) {
    const wUp = w.word.toUpperCase();
    if (!wUp.includes(' ') && !wUp.includes('-') && wUp.includes(upper) && !seenWords.has(wUp)) {
      candidateMatches.push({ word: wUp, emoji: w.emoji, hasLetter: true });
      seenWords.add(wUp);
    }
  }

  const langExtras = (EXTRA_LETTER_WORDS[lang] && EXTRA_LETTER_WORDS[lang][upper]) ? EXTRA_LETTER_WORDS[lang][upper] : [];
  for (const ex of langExtras) {
    if (!seenWords.has(ex.word)) {
      candidateMatches.push({ word: ex.word, emoji: ex.emoji, hasLetter: true });
      seenWords.add(ex.word);
    }
  }

  for (const a of alphabetList) {
    const aUp = a.word.toUpperCase();
    if (!aUp.includes(' ') && !aUp.includes('-') && aUp.includes(upper) && !seenWords.has(aUp)) {
      candidateMatches.push({ word: aUp, emoji: a.emoji, hasLetter: true });
      seenWords.add(aUp);
    }
  }

  // 3. Задание 2: «В каких словах живёт буква?» (4 слова с буквой + 2 слова-ловушки = 6 карточек)
  const matchingWords = candidateMatches.slice(0, 4);
  const trapWords = [];
  for (const w of shuffledDict) {
    if (trapWords.length >= 2) break;
    const wUp = w.word.toUpperCase();
    if (!wUp.includes(' ') && !wUp.includes('-') && !wUp.includes(upper) && !seenWords.has(wUp)) {
      trapWords.push({ word: wUp, emoji: w.emoji, hasLetter: false });
      seenWords.add(wUp);
    }
  }
  if (trapWords.length < 2) {
    const fallbackTraps = lang === 'ru'
      ? [{ word: 'ДОМ', emoji: '🏠' }, { word: 'КОТ', emoji: '🐱' }, { word: 'ЛУК', emoji: '🧅' }]
      : (lang === 'pl'
        ? [{ word: 'DOM', emoji: '🏠' }, { word: 'KOT', emoji: '🐱' }, { word: 'LAS', emoji: '🌲' }]
        : [{ word: 'DOG', emoji: '🐶' }, { word: 'CAT', emoji: '🐱' }, { word: 'SUN', emoji: '☀️' }]);
    for (const ft of fallbackTraps) {
      if (trapWords.length >= 2) break;
      if (!ft.word.includes(upper) && !seenWords.has(ft.word)) {
        trapWords.push({ word: ft.word, emoji: ft.emoji, hasLetter: false });
        seenWords.add(ft.word);
      }
    }
  }
  const wordChoices = shuffleArray([...matchingWords, ...trapWords]);

  // 4. Задание 3 (НОВОЕ): «Где спряталась буква: в начале, в середине или в конце?» (3 слова)
  const getLetterPos = (wStr, target) => {
    if (wStr.startsWith(target)) return 'start';
    if (wStr.endsWith(target)) return 'end';
    return 'middle';
  };
  const posWordsSelected = [];
  const usedPosWords = new Set();
  for (const desiredPos of ['start', 'middle', 'end']) {
    const found = candidateMatches.find(m => !usedPosWords.has(m.word) && getLetterPos(m.word, upper) === desiredPos);
    if (found) {
      posWordsSelected.push({ word: found.word, emoji: found.emoji, pos: desiredPos });
      usedPosWords.add(found.word);
    }
  }
  for (const m of candidateMatches) {
    if (posWordsSelected.length >= 3) break;
    if (!usedPosWords.has(m.word)) {
      posWordsSelected.push({ word: m.word, emoji: m.emoji, pos: getLetterPos(m.word, upper) });
      usedPosWords.add(m.word);
    }
  }
  const positionRounds = shuffleArray(posWordsSelected.slice(0, 3));

  // 5. Задание 4 (НОВОЕ): «Почини слово: вставь пропущенную букву!» (3 слова)
  const fullAlpha = lang === 'ru' ? RUSSIAN_ALPHABET : (lang === 'pl' ? POLISH_ALPHABET : ENGLISH_ALPHABET);
  const missingSource = candidateMatches.slice(0, 3);
  const missingLetterRounds = missingSource.map((item, rIdx) => {
    const chars = item.word.split('');
    // В 1-м и 3-м раунде прячем изучаемую букву, во 2-м раунде прячем другую букву слова (чтобы ребёнок читал, а не жал вслепую)
    let maskIdx = chars.indexOf(upper);
    if (rIdx === 1 && chars.length >= 3) {
      const altIdx = chars.findIndex((c, i) => c !== upper && i > 0);
      if (altIdx !== -1) maskIdx = altIdx;
    }
    if (maskIdx < 0) maskIdx = 0;
    const correctLetter = chars[maskIdx];
    const optPool = shuffleArray(fullAlpha.filter(l => l !== correctLetter));
    const options = shuffleArray([correctLetter, ...optPool.slice(0, 3)]);
    return {
      word: item.word,
      emoji: item.emoji,
      maskIndex: maskIdx,
      correctLetter,
      options
    };
  });

  return {
    letter: upper,
    word: letterItem.word,
    emoji: letterItem.emoji,
    soundType,
    stepNumber: meta.stepNumber,
    totalSteps: meta.totalSteps,
    stageId: meta.stageId,
    stageBadge: meta.stageBadge,
    stageTitle: meta.stageTitle,
    cumulativeWords,
    badgeText,
    tipText,
    comic,
    syllables,
    detectiveBubbles,
    targetBubblesCount: 5,
    wordChoices,
    targetWordsCount: matchingWords.length,
    positionRounds,
    missingLetterRounds
  };
}
