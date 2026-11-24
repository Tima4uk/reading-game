// Модуль аудио: Синтез звуковых эффектов (Web Audio API), локальные аудиоклипы (assets/audio/) и озвучивание речи (SpeechSynthesis API)

import { getLetterPhonics, getDigraphPhonics } from './phonics.js?v=27';

// Произношение отдельных букв (чтобы согласные не проглатывались как предлоги, а Ъ/Ь не молчали)
const RU_LETTER_SPOKEN = {
  'А': 'а',
  'Б': 'бэ',
  'В': 'вэ',
  'Г': 'гэ',
  'Д': 'дэ',
  'Е': 'е',
  'Ё': 'ё',
  'Ж': 'жэ',
  'З': 'зэ',
  'И': 'и',
  'Й': 'и краткое',
  'К': 'ка',
  'Л': 'эль',
  'М': 'эм',
  'Н': 'эн',
  'О': 'о',
  'П': 'пэ',
  'Р': 'эр',
  'С': 'эс',
  'Т': 'тэ',
  'У': 'у',
  'Ф': 'эф',
  'Х': 'ха',
  'Ц': 'цэ',
  'Ч': 'че',
  'Ш': 'ша',
  'Щ': 'ща',
  'Ъ': 'твёрдый знак',
  'Ы': 'ы',
  'Ь': 'мягкий знак',
  'Э': 'э',
  'Ю': 'ю',
  'Я': 'я'
};

const PL_LETTER_SPOKEN = {
  'A': 'a',
  'Ą': 'ą',
  'B': 'be',
  'C': 'ce',
  'Ć': 'cie',
  'D': 'de',
  'E': 'e',
  'Ę': 'ę',
  'F': 'ef',
  'G': 'gie',
  'H': 'ha',
  'I': 'i',
  'J': 'jot',
  'K': 'ka',
  'L': 'el',
  'Ł': 'eł',
  'M': 'em',
  'N': 'en',
  'Ń': 'eń',
  'O': 'o',
  'Ó': 'o z kreską',
  'P': 'pe',
  'R': 'er',
  'S': 'es',
  'Ś': 'eś',
  'T': 'te',
  'U': 'u',
  'W': 'wu',
  'Y': 'igrek',
  'Z': 'zet',
  'Ź': 'ziet',
  'Ż': 'żet'
};

const EN_LETTER_SPOKEN = {
  'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E',
  'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
  'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O',
  'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
  'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
};

// Словарь точного фонетического произношения для русских слов и слогов (исправление Е -> Ё и ударений для TTS)
const RU_SPOKEN_OVERRIDES = {
  // Слова с Ё и сложными ударениями
  'МЕД': 'мёд',
  'МЁД': 'мёд',
  'ЛЕД': 'лёд',
  'ЛЁД': 'лёд',
  'ЕЖ': 'ёж',
  'ЁЖ': 'ёж',
  'ЕЖИК': 'ёжик',
  'ЁЖИК': 'ёжик',
  'ЕЛКА': 'ёлка',
  'ЁЛКА': 'ёлка',
  'БЕРЕЗА': 'берёза',
  'БЕРЁЗА': 'берёза',
  'ЩЕТКА': 'щётка',
  'ЩЁТКА': 'щётка',
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
  'КОТЕНОК': 'котёнок',
  'КОТЁНОК': 'котёнок',
  'ЦЫПЛЕНОК': 'цыплёнок',
  'ЦЫПЛЁНОК': 'цыплёнок',
  'ПОДЪЕЗД': 'подъе\u0301зд',
  'ВЪЕЗД': 'въе\u0301зд',
  'СЪЕЛ': 'съе\u0301л',
  'ОБЪЕМ': 'объём',
  'ОБЪЁМ': 'объём',
  'КОТ': 'кот',
  'ПОЛ': 'по\u0301л',
  'ЛЕС': 'ле\u0301с',
  'НОС': 'но\u0301с',
  'РОТ': 'ро\u0301т',
  'СОК': 'со\u0301к',
  'СУП': 'су\u0301п',
  'ДЕД': 'де\u0301д',
  'ЛУК': 'лу\u0301к',
  'ЛЕВ': 'ле\u0301в',
  'СТОЛ': 'сто\u0301л',
  'СТУЛ': 'сту\u0301л',
  'ВОЛК': 'во\u0301лк',
  'СЛОН': 'сло\u0301н',
  'ГРИБ': 'гри\u0301б',
  'СНЕГ': 'сне\u0301г',
  'ДВЕРЬ': 'две\u0301рь',
  'ДОЖДЬ': 'до\u0301ждь',
  'ЕЛЬ': 'е\u0301ль',
  'КОНЬ': 'ко\u0301нь',
  'СОЛЬ': 'со\u0301ль',
  'ТЕНЬ': 'те\u0301нь',
  'ДЕНЬ': 'де\u0301нь',
  'ПЕНЬ': 'пе\u0301нь',
  'ГУСЬ': 'гу\u0301сь',
  'РЫСЬ': 'ры\u0301сь',
  'МЫШЬ': 'мы\u0301шь',
  'ЕСТ': 'е\u0301ст',
  'СПИТ': 'спи\u0301т',
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
  'ЛУНА': 'луна\u0301',
  'ПИЛА': 'пила\u0301',
  'ЮЛА': 'юла\u0301',
  'МЫЛО': 'мы\u0301ло',
  'ДЕТИ': 'де\u0301ти',
  'РЫБА': 'ры\u0301ба',
  'ЛЕТО': 'ле\u0301то',
  'НЕБО': 'не\u0301бо',
  'РОЗА': 'ро\u0301за',
  'МОРЕ': 'мо\u0301ре',
  'ПОЛЕ': 'по\u0301ле',
  'РАМА': 'ра\u0301ма',
  'КАША': 'ка\u0301ша',
  'ПАПА': 'па\u0301па',
  'МАМА': 'ма\u0301ма',
  'ЛАПА': 'ла\u0301па',
  'ВАЗА': 'ва\u0301за',
  'ФАРА': 'фа\u0301ра',
  'ФОТО': 'фо\u0301то',
  'ТУЧА': 'ту\u0301ча',
  'ЖАБА': 'жа\u0301ба',
  'ГУСИ': 'гу\u0301си',
  'БУБЕН': 'бу\u0301бен',
  'ЯМА': 'я\u0301ма',
  'ЭХО': 'э\u0301хо',
  'ЭРА': 'э\u0301ра',
  'ЛОЖКА': 'ло\u0301жка',
  'ЧАШКА': 'ча\u0301шка',
  'ВИЛКА': 'ви\u0301лка',
  'КУКЛА': 'ку\u0301кла',
  'ШАПКА': 'ша\u0301пка',
  'КУРТКА': 'ку\u0301ртка',
  'ШКОЛА': 'шко\u0301ла',
  'КОШКА': 'ко\u0301шка',
  'СОЛНЦЕ': 'со\u0301лнце',
  'КНИГА': 'кни\u0301га',
  'ПОЕЗД': 'по\u0301езд',
  'ЛОДКА': 'ло\u0301дка',
  'ПТИЦА': 'пти\u0301ца',
  'ВИШНЯ': 'ви\u0301шня',
  'ШАРИК': 'ша\u0301рик',
  'ЗАЙКА': 'за\u0301йка',
  'ФИЛИН': 'фи\u0301лин',
  'ОСТРОВ': 'о\u0301стров',
  'МАЙКА': 'ма\u0301йка',
  'УХО': 'у\u0301хо',
  'ПЕТУХ': 'пету\u0301х',
  'ОРЕХ': 'оре\u0301х',
  'ХОМЯК': 'хомя\u0301к',
  'ПЛАЩ': 'пла\u0301щ',
  'ОВОЩИ': 'о\u0301вощи',
  'УТЮГ': 'утю\u0301г',
  'КЛЮЧ': 'клю\u0301ч',
  'ИНДЮК': 'индю\u0301к',
  'ЗМЕЯ': 'змея\u0301',
  'АНАНАС': 'анана\u0301с',
  'АВТОБУС': 'авто\u0301бус',
  'ОБЛАКО': 'о\u0301блако',
  'УЛИТКА': 'ули\u0301тка',
  'ИГЛА': 'игла\u0301',
  'БАБОЧКА': 'ба\u0301бочка',
  'ВАННА': 'ва\u0301нна',
  'ФУТБОЛ': 'футбо\u0301л',
  'ТЫКВА': 'ты\u0301ква',
  'ДЫНЯ': 'ды\u0301ня',
  'ПАУК': 'пау\u0301к',
  'ГИТАРА': 'гита\u0301ра',
  'ГРУША': 'гру\u0301ша',
  'СНЕЖОК': 'снежо\u0301к',
  'ЗЕМЛЯ': 'земля\u0301',
  'ЯГОДА': 'я\u0301года',
  'ПЧЕЛА': 'пчела\u0301',
  'ГОРОД': 'го\u0301род',
  'СЛАДКИЙ': 'сла\u0301дкий',
  'КУШАЕТ': 'ку\u0301шает',
  'ПОЭТ': 'поэ\u0301т',
  'ДУЭТ': 'дуэ\u0301т',
  'ГРЫЗЕТ': 'грызёт',
  'ГРЫЗЁТ': 'грызёт',
  'ПОРТФЕЛЬ': 'портфе\u0301ль',
  'РАСТУТ': 'расту\u0301т',
  'МОЕТ': 'мо\u0301ет',
  'БЕЖИТ': 'бежи\u0301т',
  'СИДИТ': 'сиди\u0301т',
  'ЛЕТИТ': 'лети\u0301т',
  'ЛЕЖИТ': 'лежи\u0301т',
  'ИГРАЕТ': 'игра\u0301ет',
  'ЧИТАЕТ': 'чита\u0301ет',
  'ПРЫГАЕТ': 'пры\u0301гает',
  // Слова историй «После букваря» (только слова, где без подсказки TTS может ошибиться с Ё или ударением)
  'СОВЁНОК': 'совёнок',
  'ЗВЕРЁК': 'зверёк',
  'ЛУЛА': 'лу\u0301ла',
  // Пары гласных, слоги и звукоподражания (ударение предотвращает редукцию О->А и чтение как аббревиатур)
  'АУ': 'ау\u0301',
  'УА': 'уа\u0301',
  'ИА': 'иа\u0301',
  'ОУ': 'о\u0301у',
  'ЭИ': 'э\u0301й',
  'ЭЙ': 'э\u0301й',
  'АИ': 'а\u0301й',
  'АЙ': 'а\u0301й',
  'ОЙ': 'о\u0301й',
  'МА': 'ма\u0301', 'МО': 'мо\u0301', 'МУ': 'му\u0301', 'МЭ': 'мэ\u0301', 'МИ': 'ми\u0301', 'МЫ': 'мы\u0301',
  'ПА': 'па\u0301', 'ПО': 'по\u0301', 'ПУ': 'пу\u0301', 'ПЭ': 'пэ\u0301', 'ПИ': 'пи\u0301', 'ПЫ': 'пы\u0301',
  'БА': 'ба\u0301', 'БО': 'бо\u0301', 'БУ': 'бу\u0301', 'БЭ': 'бэ\u0301', 'БИ': 'би\u0301', 'БЫ': 'бы\u0301',
  'ВА': 'ва\u0301', 'ВО': 'во\u0301', 'ВУ': 'ву\u0301', 'ВЭ': 'вэ\u0301', 'ВИ': 'ви\u0301', 'ВЫ': 'вы\u0301',
  'ФА': 'фа\u0301', 'ФО': 'фо\u0301', 'ФУ': 'фу\u0301', 'ФЭ': 'фэ\u0301', 'ФИ': 'фи\u0301', 'ФЫ': 'фы\u0301',
  'ТА': 'та\u0301', 'ТО': 'то\u0301', 'ТУ': 'ту\u0301', 'ТЭ': 'тэ\u0301', 'ТИ': 'ти\u0301', 'ТЫ': 'ты\u0301',
  'ДА': 'да\u0301', 'ДО': 'до\u0301', 'ДУ': 'ду\u0301', 'ДЭ': 'дэ\u0301', 'ДИ': 'ди\u0301', 'ДЫ': 'ды\u0301',
  'НА': 'на\u0301', 'НО': 'но\u0301', 'НУ': 'ну\u0301', 'НЭ': 'нэ\u0301', 'НИ': 'ни\u0301', 'НЫ': 'ны\u0301',
  'ЛА': 'ла\u0301', 'ЛО': 'ло\u0301', 'ЛУ': 'лу\u0301', 'ЛЭ': 'лэ\u0301', 'ЛИ': 'ли\u0301', 'ЛЫ': 'лы\u0301',
  'СА': 'са\u0301', 'СО': 'со\u0301', 'СУ': 'су\u0301', 'СЭ': 'сэ\u0301', 'СИ': 'си\u0301', 'СЫ': 'сы\u0301',
  'ЗА': 'за\u0301', 'ЗО': 'зо\u0301', 'ЗУ': 'зу\u0301', 'ЗЭ': 'зэ\u0301', 'ЗИ': 'зи\u0301', 'ЗЫ': 'зы\u0301',
  'КА': 'ка\u0301', 'КО': 'ко\u0301', 'КУ': 'ку\u0301', 'КЭ': 'кэ\u0301', 'КИ': 'ки\u0301', 'КЫ': 'кы\u0301',
  'ГА': 'га\u0301', 'ГО': 'го\u0301', 'ГУ': 'гу\u0301', 'ГЭ': 'гэ\u0301', 'ГИ': 'ги\u0301', 'ГЫ': 'гы\u0301',
  'РА': 'ра\u0301', 'РО': 'ро\u0301', 'РУ': 'ру\u0301', 'РЭ': 'рэ\u0301', 'РИ': 'ри\u0301', 'РЫ': 'ры\u0301',
  'АМ': 'а\u0301м', 'ОМ': 'о\u0301м', 'УМ': 'у\u0301м', 'ЭМ': 'э\u0301м', 'ИМ': 'и\u0301м', 'ЫМ': 'ы\u0301м',
  'АП': 'а\u0301п', 'ОП': 'о\u0301п', 'УП': 'у\u0301п', 'ЭП': 'э\u0301п', 'ИП': 'и\u0301п', 'ЫП': 'ы\u0301п',
  'АБ': 'а\u0301б', 'ОБ': 'о\u0301б', 'УБ': 'у\u0301б', 'ЭБ': 'э\u0301б', 'ИБ': 'и\u0301б', 'ЫБ': 'ы\u0301б',
  'АВ': 'а\u0301в', 'ОВ': 'о\u0301в', 'УВ': 'у\u0301в', 'ЭВ': 'э\u0301в', 'ИВ': 'и\u0301в', 'ЫВ': 'ы\u0301в',
  'АФ': 'а\u0301ф', 'ОФ': 'о\u0301ф', 'УФ': 'у\u0301ф', 'ЭФ': 'э\u0301ф', 'ИФ': 'и\u0301ф', 'ЫФ': 'ы\u0301ф',
  'АТ': 'а\u0301т', 'ОТ': 'о\u0301т', 'УТ': 'у\u0301т', 'ЭТ': 'э\u0301т', 'ИТ': 'и\u0301т', 'ЫТ': 'ы\u0301т',
  'АД': 'а\u0301д', 'ОД': 'о\u0301д', 'УД': 'у\u0301д', 'ЭД': 'э\u0301д', 'ИД': 'и\u0301д', 'ЫД': 'ы\u0301д',
  'АН': 'а\u0301н', 'ОН': 'о\u0301н', 'УН': 'у\u0301н', 'ЭН': 'э\u0301н', 'ИН': 'и\u0301н', 'ЫН': 'ы\u0301н',
  'АЛ': 'а\u0301л', 'ОЛ': 'о\u0301л', 'УЛ': 'у\u0301л', 'ЭЛ': 'э\u0301л', 'ИЛ': 'и\u0301л', 'ЫЛ': 'ы\u0301л',
  'АС': 'а\u0301с', 'ОС': 'о\u0301с', 'УС': 'у\u0301с', 'ЭС': 'э\u0301с', 'ИС': 'и\u0301с', 'ЫС': 'ы\u0301с',
  'АЗ': 'а\u0301з', 'ОЗ': 'о\u0301з', 'УЗ': 'у\u0301з', 'ЭЗ': 'э\u0301з', 'ИЗ': 'и\u0301з', 'ЫЗ': 'ы\u0301з',
  'АК': 'а\u0301к', 'ОК': 'о\u0301к', 'УК': 'у\u0301к', 'ЭК': 'э\u0301к', 'ИК': 'и\u0301к', 'ЫК': 'ы\u0301к',
  'АГ': 'а\u0301г', 'ОГ': 'о\u0301г', 'УГ': 'у\u0301г', 'ЭГ': 'э\u0301г', 'ИГ': 'и\u0301г', 'ЫГ': 'ы\u0301г',
  'АР': 'а\u0301р', 'ОР': 'о\u0301р', 'УР': 'у\u0301р', 'ЭР': 'э\u0301р', 'ИР': 'и\u0301р', 'ЫР': 'ы\u0301р',
  'ША': 'ша\u0301', 'ШО': 'шо\u0301', 'ШУ': 'шу\u0301', 'ШЕ': 'ше\u0301', 'ШИ': 'ши\u0301',
  'ЧА': 'ча\u0301', 'ЧО': 'чо\u0301', 'ЧУ': 'чу\u0301', 'ЧЕ': 'че\u0301', 'ЧИ': 'чи\u0301',
  'ЩА': 'ща\u0301', 'ЩО': 'що\u0301', 'ЩУ': 'щу\u0301', 'ЩЕ': 'ще\u0301', 'ЩИ': 'щи\u0301',
  'ЖА': 'жа\u0301', 'ЖО': 'жо\u0301', 'ЖУ': 'жу\u0301', 'ЖЕ': 'же\u0301', 'ЖИ': 'жи\u0301',
  'ЦА': 'ца\u0301', 'ЦО': 'цо\u0301', 'ЦУ': 'цу\u0301', 'ЦЕ': 'це\u0301', 'ЦЫ': 'цы\u0301', 'ЦИ': 'цы\u0301',
  'ХА': 'ха\u0301', 'ХО': 'хо\u0301', 'ХУ': 'ху\u0301', 'ХЭ': 'хэ\u0301', 'ХЕ': 'хе\u0301', 'ХИ': 'хи\u0301', 'ХЫ': 'хы\u0301',
  'ЖЁ': 'жё', 'ШЁ': 'шё', 'ЧЁ': 'чё', 'ЩЁ': 'щё',
  'АХ': 'а\u0301х', 'ОХ': 'о\u0301х', 'УХ': 'у\u0301х', 'ЭХ': 'э\u0301х', 'ИХ': 'и\u0301х', 'ЫХ': 'ы\u0301х',
  'АЖ': 'а\u0301ж', 'ОЖ': 'о\u0301ж', 'УЖ': 'у\u0301ж', 'ЭЖ': 'э\u0301ж', 'ИЖ': 'и\u0301ж', 'ЫЖ': 'ы\u0301ж',
  'АШ': 'а\u0301ш', 'ОШ': 'о\u0301ш', 'УШ': 'у\u0301ш', 'ЭШ': 'э\u0301ш', 'ИШ': 'и\u0301ш', 'ЫШ': 'ы\u0301ш',
  'АЦ': 'а\u0301ц', 'ОЦ': 'о\u0301ц', 'УЦ': 'у\u0301ц', 'ЭЦ': 'э\u0301ц', 'ИЦ': 'и\u0301ц', 'ЫЦ': 'ы\u0301ц',
  'ПОДЪЁМ': 'подъём', 'СЪЕЗД': 'съезд', 'БОРЩ': 'бо\u0301рщ',
  'МЯ': 'мя\u0301', 'МЁ': 'мё', 'МЮ': 'мю\u0301', 'МЕ': 'ме\u0301',
  'ЛЯ': 'ля\u0301', 'ЛЁ': 'лё', 'ЛЮ': 'лю\u0301', 'ЛЕ': 'ле\u0301',
  'НЯ': 'ня\u0301', 'НЁ': 'нё', 'НЮ': 'ню\u0301', 'НЕ': 'не\u0301',
  'СЯ': 'ся\u0301', 'СЮ': 'сю\u0301', 'СЕ': 'се\u0301', 'ТЁ': 'тё',
  'АЛЬ': 'а\u0301ль', 'ОЛЬ': 'о\u0301ль', 'УЛЬ': 'у\u0301ль',
  'АНЬ': 'а\u0301нь', 'ОНЬ': 'о\u0301нь', 'АТЬ': 'а\u0301ть',
  'КО-КО': 'ко ко',
  'ГА-ГА': 'га га',
  'ПИ-ПИ': 'пи пи',
  'БЕ-Е': 'бее',
  'МЕ-Е': 'мее',
  'ТУ-ТУ': 'ту ту',
  'ТИК-ТАК': 'тик так',
  'КАП-КАП': 'кап кап'
};

// Словарь фонетического произношения польских слогов, двузнаков и звукоподражаний
const PL_SPOKEN_OVERRIDES = {
  'SZ': 'sz',
  'CZ': 'cz',
  'RZ': 'ż',
  'Ż': 'żet',
  'DZ': 'dz',
  'DŹ': 'dź',
  'DŻ': 'dż',
  'CH': 'ch',
  'Ł': 'eł',
  'Ś': 'eś',
  'Ć': 'cie',
  'Ź': 'ziet',
  'Ń': 'eń',
  'Ą': 'ą',
  'Ę': 'ę',
  'Ó': 'o z kreską',
  // Открытые слоги, которые TTS может прочитать как названия букв
  'BE': 'be', 'CE': 'ce', 'DE': 'de', 'GE': 'ge', 'KE': 'ke', 'PE': 'pe', 'TE': 'te', 'WE': 'we', 'ZE': 'ze',
  'KI': 'ki', 'GI': 'gi', 'PI': 'pi', 'CI': 'ci', 'SI': 'si', 'ZI': 'zi', 'NI': 'ni',
  'KY': 'ky', 'GY': 'gy', 'PY': 'py', 'FY': 'fy', 'JY': 'jy',
  // Закрытые слоги, которые польский TTS может расширить как сокращения (ulica, aleja, osiedle, imienia) или англицизмы (IT, ID, OK, UK, US)
  'AL': 'aal', 'EL': 'ell', 'IL': 'ill', 'OL': 'oll', 'UL': 'ull', 'YL': 'yll',
  'AM': 'amm', 'EM': 'emm', 'IM': 'imm', 'OM': 'omm', 'UM': 'umm', 'YM': 'ymm',
  'AN': 'an', 'EN': 'enn', 'IN': 'inn', 'ON': 'on', 'UN': 'unn', 'YN': 'ynn',
  'AP': 'app', 'EP': 'epp', 'IP': 'ipp', 'OP': 'opp', 'UP': 'upp', 'YP': 'ypp',
  'AB': 'abb', 'EB': 'ebb', 'IB': 'ibb', 'OB': 'obb', 'UB': 'ubb', 'YB': 'ybb',
  'AT': 'att', 'ET': 'ett', 'IT': 'itt', 'OT': 'ott', 'UT': 'utt', 'YT': 'ytt',
  'AD': 'add', 'ED': 'edd', 'ID': 'idd', 'OD': 'odd', 'UD': 'udd', 'YD': 'ydd',
  'AS': 'as', 'ES': 'ess', 'IS': 'iss', 'OS': 'oss', 'US': 'uss', 'YS': 'yss',
  'AZ': 'az', 'EZ': 'ez', 'IZ': 'iz', 'OZ': 'oz', 'UZ': 'uz', 'YZ': 'yz',
  'AK': 'ak', 'EK': 'ek', 'IK': 'ik', 'OK': 'okk', 'UK': 'ukk', 'YK': 'yk',
  'AG': 'ag', 'EG': 'egg', 'IG': 'igg', 'OG': 'ogg', 'UG': 'ugg', 'YG': 'ygg',
  'AF': 'aff', 'EF': 'eff', 'IF': 'iff', 'OF': 'off', 'UF': 'uff', 'YF': 'yff',
  'AW': 'aw', 'EW': 'ew', 'IW': 'iw', 'OW': 'ow', 'UW': 'uw', 'YW': 'yw',
  'AJ': 'aj', 'EJ': 'ej', 'IJ': 'ij', 'OJ': 'oj', 'UJ': 'uj', 'YJ': 'yj',
  // Двузнаки и слоги-фрагменты слов
  'SZA': 'sza', 'SZO': 'szo', 'SZU': 'szu', 'SZE': 'sze', 'SZY': 'szy',
  'CZA': 'cza', 'CZO': 'czo', 'CZU': 'czu', 'CZE': 'cze', 'CZY': 'czy',
  'RZA': 'ża', 'RZO': 'żo', 'RZU': 'żu', 'RZE': 'że',
  'ŻA': 'ża', 'ŻO': 'żo', 'ŻU': 'żu', 'ŻY': 'ży',
  'DZA': 'dza', 'DZO': 'dzo', 'DZU': 'dzu',
  'DŻA': 'dża', 'DŻE': 'dże', 'DŻU': 'dżu',
  'CHA': 'ha', 'CHO': 'ho', 'CHU': 'hu',
  'ŁA': 'ła', 'ŁO': 'ło', 'ŁU': 'łu',
  'SIA': 'sia', 'SIO': 'sio', 'CIA': 'cia', 'CIO': 'cio', 'ZIA': 'zia', 'NIA': 'nia',
  'MĄ': 'mą', 'MĘ': 'mę', 'KĄ': 'ką', 'KĘ': 'kę', 'SĄ': 'są', 'SĘ': 'sę',
  'CHÓD': 'chut', 'BUŁ': 'buł', 'DŁO': 'dło', 'KIE': 'kie',
  'TYL': 'tyl', 'DOR': 'dor', 'LOT': 'lot', 'NAN': 'nan', 'LON': 'lon', 'GAR': 'gar',
  'TEK': 'tek', 'SEK': 'sek',
  'HAU': 'hau',
  'MIAU': 'miau',
  'KWA': 'kwa',
  'KO-KO': 'ko ko',
  'PI-PI': 'pi pi',
  'GĘ-GĘ': 'gę gę',
  'KAP-KAP': 'kap kap',
  'TIK-TAK': 'tik tak'
};

// Словарь произношения английских слогов (предотвращает чтение как штатов США или аббревиатур) и составных слов
const EN_SPOKEN_OVERRIDES = {
  // Открытые слоги
  'MA': 'mah', 'ME': 'meh', 'MI': 'mee', 'MO': 'moh', 'MU': 'moo', 'MY': 'my',
  'PA': 'pah', 'PE': 'peh', 'PI': 'pee', 'PO': 'poh', 'PU': 'poo', 'PY': 'pie',
  'BA': 'bah', 'BE': 'beh', 'BI': 'bee', 'BO': 'boh', 'BU': 'boo', 'BY': 'by',
  'TA': 'tah', 'TE': 'teh', 'TI': 'tee', 'TO': 'toh', 'TU': 'too', 'TY': 'tie',
  'DA': 'dah', 'DE': 'deh', 'DI': 'dee', 'DO': 'doh', 'DU': 'doo', 'DY': 'die',
  'NA': 'nah', 'NE': 'neh', 'NI': 'nee', 'NO': 'noh', 'NU': 'noo', 'NY': 'nie',
  'LA': 'lah', 'LE': 'leh', 'LI': 'lee', 'LO': 'loh', 'LU': 'loo', 'LY': 'lie',
  'SA': 'sah', 'SE': 'seh', 'SI': 'see', 'SO': 'soh', 'SU': 'soo', 'SY': 'sigh',
  'KA': 'kah', 'KE': 'keh', 'KI': 'kee', 'KO': 'koh', 'KU': 'koo', 'KY': 'kie',
  'RA': 'rah', 'RE': 'reh', 'RI': 'ree', 'RO': 'roh', 'RU': 'roo', 'RY': 'rye',
  // Закрытые слоги
  'AM': 'am', 'EM': 'emm', 'IM': 'imm', 'OM': 'ohm', 'UM': 'um', 'YM': 'imm',
  'AP': 'app', 'EP': 'epp', 'IP': 'ipp', 'OP': 'opp', 'UP': 'up', 'YP': 'ipp',
  'AB': 'abb', 'EB': 'ebb', 'IB': 'ibb', 'OB': 'obb', 'UB': 'ubb', 'YB': 'ibb',
  'AT': 'at', 'ET': 'ett', 'IT': 'it', 'OT': 'ott', 'UT': 'utt', 'YT': 'it',
  'AD': 'add', 'ED': 'edd', 'ID': 'idd', 'OD': 'odd', 'UD': 'udd', 'YD': 'idd',
  'AN': 'an', 'EN': 'enn', 'IN': 'in', 'ON': 'ahn', 'UN': 'unn', 'YN': 'in',
  'AL': 'Al', 'EL': 'ell', 'IL': 'ill', 'OL': 'oll', 'UL': 'ull', 'YL': 'ill',
  'AS': 'ahs', 'ES': 'ess', 'IS': 'iss', 'OS': 'oss', 'US': 'uss', 'YS': 'iss',
  'AK': 'ack', 'EK': 'eck', 'IK': 'ick', 'OK': 'ock', 'UK': 'uck', 'YK': 'ick',
  'AR': 'ar', 'ER': 'err', 'IR': 'eer', 'OR': 'or', 'UR': 'urr', 'YR': 'eer',
  // Диграфы и фрагменты из «Собери слово»
  'SHA': 'shah', 'SHE': 'sheh', 'SHI': 'shee', 'SHO': 'shoh', 'SHU': 'shoo',
  'CHA': 'chah', 'CHE': 'cheh', 'CHI': 'chee', 'CHO': 'choh', 'CHU': 'choo',
  'THA': 'thah', 'THE': 'theh', 'THI': 'thee', 'THO': 'thoh', 'THU': 'thoo',
  'WHA': 'wah', 'WHE': 'weh', 'WHI': 'wee',
  'PHA': 'fah', 'PHO': 'foh', 'PHI': 'fee',
  'MOO': 'moo', 'BOO': 'boo', 'ZOO': 'zoo', 'BEE': 'bee', 'SEE': 'see', 'TEE': 'tee',
  'ACK': 'ack', 'OCK': 'ock', 'UCK': 'uck', 'ING': 'ing', 'ONG': 'ong', 'UNG': 'ung',
  'GER': 'ger', 'ZE': 'zeh', 'BRA': 'brah', 'PAN': 'pan', 'MON': 'mahn', 'KEY': 'key',
  'RAB': 'rab', 'BIT': 'bit', 'TUR': 'tur', 'TLE': 'tul', 'PUP': 'pup', 'KIT': 'kit',
  'TEN': 'ten', 'PLE': 'pul', 'LON': 'lahn', 'ROCK': 'rock', 'BOT': 'baht',
  'PLA': 'plah', 'NET': 'net', 'RAIN': 'rain', 'BOW': 'bow', 'SUN': 'sun', 'SET': 'set',
  'FLOW': 'flow', 'SPI': 'spy', 'DER': 'der', 'COOK': 'cook', 'IE': 'ee',
  'DOC': 'dahk', 'TOR': 'tor', 'WIN': 'win', 'DOW': 'dow',
  // Составные слова и фразовые глаголы
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
    this.audioManifest = null;
    this.audioClipCache = new Map();
    this.activeClip = null;
    this.initAudioContext();
    this.initVoices();
    this.loadAudioManifest();
  }

  async loadAudioManifest() {
    if (typeof window === 'undefined' || typeof fetch !== 'function') return;
    if (window.location && window.location.protocol === 'file:') return;
    try {
      const resp = await fetch('assets/audio/manifest.json?v=27');
      if (resp && resp.ok) {
        this.audioManifest = await resp.json();
      }
    } catch (e) {
      // Без манифеста используем стандартный синтезатор речи без ошибок в консоли
    }
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
    if (this.activeClip) {
      try {
        this.activeClip.pause();
        this.activeClip.currentTime = 0;
      } catch (e) {
        // Игнорируем ошибку остановки аудиотега
      }
      this.activeClip = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Проигрывание локального аудиофайла по манифесту с запасным переходом на TTS
  playCustomClip(category, lang, fileKey, onFallback) {
    if (!this.speechEnabled) return true;
    const relPath = fileKey &&
      this.audioManifest &&
      this.audioManifest[category] &&
      this.audioManifest[category][lang] &&
      this.audioManifest[category][lang][fileKey];

    if (!relPath || typeof Audio === 'undefined') {
      if (onFallback) onFallback();
      return false;
    }

    this.stopSpeech();
    const fullPath = `assets/audio/${relPath}`;
    let clip = this.audioClipCache.get(fullPath);
    if (!clip) {
      clip = new Audio(fullPath);
      this.audioClipCache.set(fullPath, clip);
    }

    try {
      clip.currentTime = 0;
    } catch (e) {
      // Игнорируем, если метаданные ещё не загружены
    }
    this.activeClip = clip;

    let fellBack = false;
    const triggerFallback = () => {
      if (fellBack || this.activeClip !== clip) return;
      fellBack = true;
      this.activeClip = null;
      if (onFallback) onFallback();
    };

    clip.addEventListener('error', triggerFallback, { once: true });
    clip.addEventListener('ended', () => {
      if (this.activeClip === clip) this.activeClip = null;
    }, { once: true });

    const playPromise = clip.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => triggerFallback());
    }
    return true;
  }

  // Безопасный запуск SpeechSynthesis без бага проглатывания после cancel() в браузерах
  _speakUtterance(text, lang, rate = 0.85, pitch = 1.05) {
    if (!this.speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (this.activeClip) {
      try {
        this.activeClip.pause();
        this.activeClip.currentTime = 0;
      } catch (e) {
        // Игнорируем ошибку остановки аудиотега
      }
      this.activeClip = null;
    }

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

  // Нормализация отдельной буквы перед отправкой в TTS
  normalizeLetterForSpeech(letter, lang = 'ru') {
    if (!letter) return '';
    const upper = String(letter).trim().toUpperCase();
    if (lang === 'ru' && RU_LETTER_SPOKEN[upper]) {
      return RU_LETTER_SPOKEN[upper];
    }
    if (lang === 'pl' && PL_LETTER_SPOKEN[upper]) {
      return PL_LETTER_SPOKEN[upper];
    }
    if (lang === 'en' && EN_LETTER_SPOKEN[upper]) {
      return EN_LETTER_SPOKEN[upper];
    }
    return String(letter).trim().toLowerCase();
  }

  // Нормализация слова или слога перед отправкой в TTS
  normalizeWordForSpeech(word, lang = 'ru') {
    if (!word) return '';
    const raw = String(word).trim().replace(/·/g, '');
    const upper = raw.toUpperCase();

    if (lang === 'ru' && RU_SPOKEN_OVERRIDES[upper]) {
      return RU_SPOKEN_OVERRIDES[upper];
    }
    if (lang === 'pl' && PL_SPOKEN_OVERRIDES[upper]) {
      return PL_SPOKEN_OVERRIDES[upper];
    }
    if (lang === 'en' && EN_SPOKEN_OVERRIDES[upper]) {
      return EN_SPOKEN_OVERRIDES[upper];
    }

    const lower = raw.toLowerCase();
    // Для любого короткого русского слога (2–3 буквы) с одной гласной ставим ударение,
    // чтобы TTS не редуцировал О->А и не читал слог как аббревиатуру
    if (lang === 'ru' && /^[а-яё]{2,3}$/.test(lower) && !lower.includes('ё')) {
      const vowels = lower.match(/[аеиоуыэюя]/g);
      if (vowels && vowels.length === 1) {
        return lower.replace(/([аеиоуыэюя])/, '$1\u0301');
      }
    }
    return lower;
  }

  // Нормализация фраз (очистка слоговых разделителей, мягкие паузы вместо тире и Е -> Ё для RU)
  normalizePhraseForSpeech(text, lang = 'ru') {
    if (!text) return '';
    const cleaned = String(text)
      .replace(/·/g, '')
      .replace(/\s*—\s*/g, ', ');
    if (lang !== 'ru') return cleaned;
    const yoMap = {
      'мед': 'мёд',
      'лед': 'лёд',
      'еж': 'ёж',
      'ежик': 'ёжик',
      'елка': 'ёлка',
      'пьет': 'пьёт',
      'поет': 'поёт',
      'идет': 'идёт',
      'плывет': 'плывёт',
      'грызет': 'грызёт',
      'растет': 'растёт',
      'несет': 'несёт',
      'зовет': 'зовёт',
      'клюет': 'клюёт',
      'бьет': 'бьёт'
    };
    return cleaned
      .replace(/самолет/gi, 'самолёт')
      .replace(/вертолет/gi, 'вертолёт')
      .replace(/берез/gi, 'берёз')
      .replace(/щетк/gi, 'щётк')
      .replace(/ежик/gi, 'ёжик')
      .replace(/цыплен/gi, 'цыплён')
      .replace(/котен/gi, 'котён')
      .replace(/(^|[^А-Яа-яЁё])(мед|лед|еж|ежик|елка|пьет|поет|идет|плывет|грызет|растет|несет|зовет|клюет|бьет)(?=$|[^А-Яа-яЁё])/gi,
        (match, prefix, word) => prefix + (yoMap[word.toLowerCase()] || word));
  }

  // Озвучивание отдельной буквы (приоритет локальному клипу, затем TTS)
  speakLetter(letter, lang = 'ru') {
    if (!letter) return;
    const info = getLetterPhonics(letter, lang);
    const fallback = () => {
      const spokenLetter = this.normalizeLetterForSpeech(letter, lang);
      this._speakUtterance(spokenLetter, lang, 0.85, 1.05);
    };
    if (info && info.fileKey) {
      this.playCustomClip('letters', lang, info.fileKey, fallback);
    } else {
      fallback();
    }
  }

  // Озвучивание чистого звука (фонемы) по методике Phonics / Science of Reading
  speakPhoneme(letter, lang = 'ru') {
    if (!letter) return;
    const info = getLetterPhonics(letter, lang);
    if (!info) {
      this.speakLetter(letter, lang);
      return;
    }
    this.playCustomClip('phonemes', lang, info.fileKey, () => {
      this._speakUtterance(info.spoken, lang, 0.85, 1.05);
    });
  }

  // Озвучивание звука диграфа / буквосочетания (ck, sh, th, sz, cz, жи, ши и т.д.)
  speakDigraph(code, lang = 'ru') {
    if (!code) return;
    const info = getDigraphPhonics(code, lang);
    if (!info) return;
    this.playCustomClip('digraphs', lang, info.fileKey, () => {
      this._speakUtterance(info.spokenPhoneme, lang, 0.85, 1.05);
    });
  }

  // Озвучивание слова целиком
  speakWord(word, lang = 'ru') {
    if (!word) return;
    const spokenText = this.normalizeWordForSpeech(word, lang);
    this._speakUtterance(spokenText, lang, 0.82, 1.05);
  }

  // Озвучивание буквы и слова для малыша: "Вэ! Волк!" / "Żet! Żaba!" / "A! Apple!"
  speakLetterAndWord(letter, word, lang = 'ru') {
    const cleanLetter = this.normalizeLetterForSpeech(letter, lang);
    const cleanWord = this.normalizeWordForSpeech(word, lang);
    const text = `${cleanLetter}! ${cleanWord}`;
    this._speakUtterance(text, lang, 0.85, 1.08);
  }

  // Озвучивание вопроса викторины
  speakQuestion(letter, lang = 'ru') {
    const cleanLetter = this.normalizeLetterForSpeech(letter, lang);
    const text = lang === 'ru'
      ? `Где буква ${cleanLetter}?`
      : (lang === 'pl' ? `Gdzie jest litera ${cleanLetter}?` : `Where is letter ${cleanLetter}?`);
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

  // Тёплый удар бонго / барабана для отбивания слогов
  playDrumBeat(beatIndex = 0) {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const startFreq = 210 + (beatIndex % 4) * 35;
    const endFreq = 95 + (beatIndex % 4) * 18;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(startFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(endFreq, now + 0.13);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(startFreq * 1.4, now);
    osc2.frequency.exponentialRampToValueAtTime(endFreq * 1.15, now + 0.11);

    gain.gain.setValueAtTime(0.26, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.15);
    osc2.stop(now + 0.15);
  }

  // Короткий механический щелчок барабана смены букв
  playReelTick() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.045);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Магнитный щелчок / слияние с искристым перезвоном
  playSnap() {
    if (!this.soundEnabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const oscMain = ctx.createOscillator();
    const gainMain = ctx.createGain();
    oscMain.type = 'sine';
    oscMain.frequency.setValueAtTime(480, now);
    oscMain.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    gainMain.gain.setValueAtTime(0.18, now);
    gainMain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    oscMain.connect(gainMain);
    gainMain.connect(ctx.destination);
    oscMain.start(now);
    oscMain.stop(now + 0.15);

    const oscSparkle = ctx.createOscillator();
    const gainSparkle = ctx.createGain();
    oscSparkle.type = 'sine';
    oscSparkle.frequency.setValueAtTime(1174, now + 0.04);
    gainSparkle.gain.setValueAtTime(0.001, now);
    gainSparkle.gain.setValueAtTime(0.14, now + 0.04);
    gainSparkle.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    oscSparkle.connect(gainSparkle);
    gainSparkle.connect(ctx.destination);
    oscSparkle.start(now + 0.04);
    oscSparkle.stop(now + 0.16);
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
