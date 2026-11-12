// Интерактивный «Букварь: Комиксы, слоги, игры и задания» (по мотивам методики В. и А. Мельниковых / АСТ)
// Поддерживает все буквы RU (33), PL (32), EN (26)

import { ALPHABET_DATA, WORDS_DATA, VOWELS, shuffleArray } from './data.js';

const RU_CUSTOM_LESSONS = {
  'А': {
    tip: 'Широко открой ротик и пропоём песенку голосом: «А-А-А!». Воздух выходит свободно — это гласный звук 🔴.',
    syllables: ['АУ', 'АМ', 'МА', 'ПА', 'БА'],
    comic: [
      { avatar: '👧', scene: '🌲', bubble: 'А-У!', spoken: 'Ау!', caption: 'Аня гуляет в лесу и зовёт друзей:' },
      { avatar: '🐊', scene: '🍉', bubble: 'АМ! Вкусно!', spoken: 'Ам! Вкусно!', caption: 'Акула и крокодил кушают сладкий арбуз:' }
    ]
  },
  'Б': {
    tip: 'Сожми губы вместе и резко выдохни с голосом: «Б-Б-Б!». Губы лопаются как мыльный пузырь — согласный звук 🔵.',
    syllables: ['БА', 'БО', 'БУ', 'БЫ', 'БИ'],
    comic: [
      { avatar: '🐏', scene: '🥁', bubble: 'БУМ-БАМ!', spoken: 'Бум бам!', caption: 'Барашек бьёт в большой барабан:' },
      { avatar: '🐿️', scene: '🍌', bubble: 'Браво, Боб!', spoken: 'Браво, Боб!', caption: 'Белка угощает друзей спелым бананом:' }
    ]
  },
  'В': {
    tip: 'Верхние зубки легко касаются нижней губы, продуй ветерок с голосом: «В-В-В!» — согласный звук 🔵.',
    syllables: ['ВА', 'ВО', 'ВУ', 'ВЫ', 'ВИ'],
    comic: [
      { avatar: '🐺', scene: '🌬️', bubble: 'В-В-УУУ!', spoken: 'Вууу!', caption: 'Воет ветер и волк поёт луне:' },
      { avatar: '🐦‍⬛', scene: '🍒', bubble: 'Вот вода!', spoken: 'Вот вода!', caption: 'Ворона нашла вкусную вишню и воду:' }
    ]
  },
  'Г': {
    tip: 'Спинка язычка стучит у горлышка с голосом: «Г-Г-Г!», как гогочут гуси — согласный звук 🔵.',
    syllables: ['ГА', 'ГО', 'ГУ', 'ГЫ', 'ГИ'],
    comic: [
      { avatar: '🪿', scene: '🌧️', bubble: 'ГА-ГА-ГА!', spoken: 'Га-га-га!', caption: 'Гуси громко гогочут на лугу:' },
      { avatar: '🦔', scene: '🍄', bubble: 'Ого, гриб!', spoken: 'Ого, гриб!', caption: 'Под горой вырос огромный гриб:' }
    ]
  },
  'Д': {
    tip: 'Кончик языка звонко стучит за верхними зубками: «Д-Д-Д!», как дятел по дереву — согласный звук 🔵.',
    syllables: ['ДА', 'ДО', 'ДУ', 'ДЫ', 'ДИ'],
    comic: [
      { avatar: '🐦', scene: '🌳', bubble: 'ТУК-ДДД!', spoken: 'Тук, да-да!', caption: 'Дятел строит добрый дом на дубе:' },
      { avatar: '👦', scene: '🏠', bubble: 'Да! Наш дом!', spoken: 'Да! Наш дом!', caption: 'Дети рады: готов уютный дом!' }
    ]
  },
  'Е': {
    tip: 'Улыбнись губками и мягко пропоём: «ЙЭ-Е-Е!». Этот гласный звук 🔴 смягчает согласные перед собой.',
    syllables: ['МЕ', 'ЛЕ', 'НЕ', 'СЕ', 'ЕЛЬ'],
    comic: [
      { avatar: '🦝', scene: '🌲', bubble: 'Е-е! Ель!', spoken: 'Ель!', caption: 'Енот нашёл пушистую лесную ель:' },
      { avatar: '🦄', scene: '🫐', bubble: 'Ем ежевику!', spoken: 'Ем ежевику!', caption: 'Единорог угощается сладкими ягодами:' }
    ]
  },
  'Ё': {
    tip: 'Вытяни губки трубочкой вперёд и пропоём: «ЙО-Ё-Ё!». Буква Ё всегда ударная и гласная 🔴.',
    syllables: ['МЁ', 'ЛЁ', 'НЁ', 'ТЁ', 'ЁЖ'],
    comic: [
      { avatar: '🦔', scene: '🎄', bubble: 'Ой, ёлка!', spoken: 'Ой, ёлка!', caption: 'Колючий ёжик несёт фонарик к ёлке:' },
      { avatar: '🐻', scene: '🍯', bubble: 'Вкусный мёд!', spoken: 'Вкусный мёд!', caption: 'На ёлке зажглись яркие огоньки:' }
    ]
  },
  'Ж': {
    tip: 'Округли губы, подними язычок «чашечкой» кверху и пожужжи как жук: «Ж-Ж-Ж!» — всегда твёрдый согласный 🔵.',
    syllables: ['ЖА', 'ЖО', 'ЖУ', 'ЖИ', 'ЖЕ'],
    comic: [
      { avatar: '🪲', scene: '🌼', bubble: 'Ж-Ж-ЖУ!', spoken: 'Жу-жу!', caption: 'Большой жук жужжит над жёлтым цветком:' },
      { avatar: '🦒', scene: '🍦', bubble: 'Жарко жду!', spoken: 'Жарко!', caption: 'Жираф ждёт прохладный дождик:' }
    ]
  },
  'З': {
    tip: 'Улыбнись, кончик языка у нижних зубов, позвени как комарик: «З-З-З!» — звонкий согласный 🔵.',
    syllables: ['ЗА', 'ЗО', 'ЗУ', 'ЗЫ', 'ЗИ'],
    comic: [
      { avatar: '🦟', scene: '🌿', bubble: 'З-З-ЗВЕНЬ!', spoken: 'Ззз!', caption: 'Комарик звенит в зелёной траве:' },
      { avatar: '🐰', scene: '☂️', bubble: 'Зонт зайки!', spoken: 'Зонт зайки!', caption: 'Зайка спрятался под ярким зонтиком:' }
    ]
  },
  'И': {
    tip: 'Широко улыбнись, покажи зубки и пропоём звонко: «И-И-И!», как жеребёнок — гласный звук 🔴.',
    syllables: ['МИ', 'ЛИ', 'НИ', 'СИ', 'ТИ'],
    comic: [
      { avatar: '🐴', scene: '🌾', bubble: 'И-ГО-ГО!', spoken: 'И-го-го!', caption: 'Лошадка весело скачет по лугу:' },
      { avatar: '🧒', scene: '🧸', bubble: 'Играем!', spoken: 'Играем!', caption: 'У Иры любимые мягкие игрушки:' }
    ]
  },
  'Й': {
    tip: 'Короткий и мягкий согласный звук 🔵: улыбнись и коротко выдохни «Й!», как в словах «Ой!» и «Ай!».',
    syllables: ['ОЙ', 'АЙ', 'ЭЙ', 'МАЙ', 'ЧАЙ'],
    comic: [
      { avatar: '🦜', scene: '🍵', bubble: 'ЭЙ! Пей чай!', spoken: 'Эй! Пей чай!', caption: 'Попугай зовёт гостей к столу:' },
      { avatar: '🧒', scene: '🍦', bubble: 'ОЙ, йогурт!', spoken: 'Ой, йогурт!', caption: 'На завтрак вкусный ягодный йогурт:' }
    ]
  },
  'К': {
    tip: 'Спинка язычка коротко толкает воздух у горлышка без голоса: «К-К-К!», как капельки дождя — согласный 🔵.',
    syllables: ['КА', 'КО', 'КУ', 'КЫ', 'КИ'],
    comic: [
      { avatar: '🐔', scene: '🌾', bubble: 'КО-КО-КО!', spoken: 'Ко-ко-ко!', caption: 'Курочка зовёт маленьких цыплят:' },
      { avatar: '🐱', scene: '🥛', bubble: 'Кот и каша!', spoken: 'Кот и каша!', caption: 'Котёнок лакает молоко на кухне:' }
    ]
  },
  'Л': {
    tip: 'Прижми кончик языка к верхним зубкам и пропоём плавно: «Л-Л-Л!», как гудит пароход — согласный 🔵.',
    syllables: ['ЛА', 'ЛО', 'ЛУ', 'ЛЫ', 'ЛИ'],
    comic: [
      { avatar: '🦁', scene: '🚢', bubble: 'Л-Л-ЛА!', spoken: 'Ла-ла-ла!', caption: 'Лев плывёт на большой лодке по волнам:' },
      { avatar: '🦊', scene: '🌙', bubble: 'Луна в лесу!', spoken: 'Луна в лесу!', caption: 'Лисичка смотрит на золотую луну:' }
    ]
  },
  'М': {
    tip: 'Сомкни губы и помычи носом и голосом, как телёнок зовёт маму: «М-М-М!» — согласный звук 🔵.',
    syllables: ['МА', 'МО', 'МУ', 'МЫ', 'МИ'],
    comic: [
      { avatar: '🐮', scene: '🌼', bubble: 'МУ-У! Мама!', spoken: 'Муу! Мама!', caption: 'Телёнок гуляет на лугу и поёт:' },
      { avatar: '🐻', scene: '🍯', bubble: 'М-м, малина!', spoken: 'Ммм, малина!', caption: 'Мишка нашёл в лесу сладкую малину:' }
    ]
  },
  'Н': {
    tip: 'Кончик языка упирается в верхние зубки, воздух идёт через нос: «Н-Н-Н!» — согласный звук 🔵.',
    syllables: ['НА', 'НО', 'НУ', 'НЫ', 'НИ'],
    comic: [
      { avatar: '🦏', scene: '🧦', bubble: 'НО-НО! Носки!', spoken: 'Но-но! Носки!', caption: 'Носорог надел тёплые полосатые носки:' },
      { avatar: '👧', scene: '🎶', bubble: 'На-на, ноты!', spoken: 'На-на, ноты!', caption: 'Нина поёт весёлую песенку по нотам:' }
    ]
  },
  'О': {
    tip: 'Округли губки колечком, как бублик, и пропоём: «О-О-О!» — поющийся гласный звук 🔴.',
    syllables: ['ОХ', 'ОМ', 'МО', 'ТО', 'КО'],
    comic: [
      { avatar: '🫏', scene: '🏝️', bubble: 'О-ГО-ГО!', spoken: 'О-го-го!', caption: 'Ослик увидел чудесный зелёный остров:' },
      { avatar: '🐒', scene: '☁️', bubble: 'О! Облако!', spoken: 'О! Облако!', caption: 'В небе плывёт пушистое белое облако:' }
    ]
  },
  'П': {
    tip: 'Сомкни губы и выпусти ветерок толчком без голоса: «П-П-П!», как пыхтит паровозик — согласный 🔵.',
    syllables: ['ПА', 'ПО', 'ПУ', 'ПЫ', 'ПИ'],
    comic: [
      { avatar: '🚂', scene: '💨', bubble: 'ПЫХ-ПЫХ!', spoken: 'Пых-пых!', caption: 'Паровозик везёт подарки по рельсам:' },
      { avatar: '🐦', scene: '🥧', bubble: 'Пи-пи, пирог!', spoken: 'Пи-пи, пирог!', caption: 'Птичка клюёт вкусные крошки пирога:' }
    ]
  },
  'Р': {
    tip: 'Улыбнись, подними кончик языка за верхние зубки и заведи моторчик: «Р-Р-Р!» — звонкий согласный 🔵.',
    syllables: ['РА', 'РО', 'РУ', 'РЫ', 'РИ'],
    comic: [
      { avatar: '🐯', scene: '🚀', bubble: 'Р-Р-РЫК!', spoken: 'Ррр! Ракета!', caption: 'Рыжий тигрёнок заводит мотор ракеты:' },
      { avatar: '🐟', scene: '🌊', bubble: 'Ура, река!', spoken: 'Ура, река!', caption: 'Рыбка радостно плещется в реке:' }
    ]
  },
  'С': {
    tip: 'Улыбнись, кончик языка у нижних зубов, выпусти холодный ветерок: «С-С-С!», как насос — согласный 🔵.',
    syllables: ['СА', 'СО', 'СУ', 'СЫ', 'СИ'],
    comic: [
      { avatar: '🐘', scene: '☀️', bubble: 'С-С-СОК!', spoken: 'Вкусный сок!', caption: 'Слонёнок пьёт прохладный сок под солнцем:' },
      { avatar: '🦉', scene: '🧀', bubble: 'Сыр на столе!', spoken: 'Сыр на столе!', caption: 'Сова нашла кусочек жёлтого сыра:' }
    ]
  },
  'Т': {
    tip: 'Кончик языка стучит за верхними зубками без голоса: «Т-Т-Т!», как тикают часики — согласный 🔵.',
    syllables: ['ТА', 'ТО', 'ТУ', 'ТЫ', 'ТИ'],
    comic: [
      { avatar: '⏰', scene: '🐯', bubble: 'ТИК-ТАК!', spoken: 'Тик-так!', caption: 'Часики будят полосатого тигрёнка:' },
      { avatar: '🚜', scene: '🎂', bubble: 'Тут торт!', spoken: 'Тут торт!', caption: 'На праздничном столе большой торт:' }
    ]
  },
  'У': {
    tip: 'Вытяни губки длинной трубочкой вперёд и погуди как поезд: «У-У-У!» — гласный звук 🔴.',
    syllables: ['УХ', 'УМ', 'МУ', 'ПУ', 'ТУ'],
    comic: [
      { avatar: '🚂', scene: '🦆', bubble: 'У-У-У! Утка!', spoken: 'Ууу! Утка!', caption: 'Поезд гудит, а уточка плывёт в пруду:' },
      { avatar: '🐌', scene: '🌿', bubble: 'Ура, утро!', spoken: 'Ура, утро!', caption: 'Улитка греется в лучах утреннего солнца:' }
    ]
  },
  'Ф': {
    tip: 'Верхние зубки на нижней губе, выдохни воздух без голоса: «Ф-Ф-Ф!», как фыркает ёжик — согласный 🔵.',
    syllables: ['ФА', 'ФО', 'ФУ', 'ФЫ', 'ФИ'],
    comic: [
      { avatar: '🦔', scene: '🔦', bubble: 'ФЫР-ФЫР!', spoken: 'Фыр-фыр!', caption: 'Ёжик светит ярким фонариком в темноте:' },
      { avatar: '🦩', scene: '🚩', bubble: 'Флаг и фокус!', spoken: 'Флаг и фокус!', caption: 'Фламинго показывает весёлый фокус:' }
    ]
  },
  'Х': {
    tip: 'Открой рот и погрей ладошки тёплым дыханием: «Х-Х-Х!» — глухой согласный звук 🔵.',
    syllables: ['ХА', 'ХО', 'ХУ', 'ХИ', 'ХЕ'],
    comic: [
      { avatar: '🐹', scene: '🍞', bubble: 'ХА-ХА! Хлеб!', spoken: 'Ха-ха! Хлеб!', caption: 'Хомячок радуется свежему тёплому хлебу:' },
      { avatar: '🐷', scene: '🏡', bubble: 'Хрю-хрю, хор!', spoken: 'Хрю-хрю!', caption: 'Зверята поют в дружном лесном хоре:' }
    ]
  },
  'Ц': {
    tip: 'Улыбнись и быстро скажи слитно «ТС» -> «Ц-Ц-Ц!», как синичка: «Цып-цып!» — всегда твёрдый согласный 🔵.',
    syllables: ['ЦА', 'ЦО', 'ЦУ', 'ЦЫ', 'ЦЕ'],
    comic: [
      { avatar: '🐤', scene: '🌸', bubble: 'ЦЫП-ЦЫП!', spoken: 'Цып-цып!', caption: 'Жёлтый цыплёнок нюхает красивый цветок:' },
      { avatar: '🐦', scene: '🎪', bubble: 'Цирк и цапля!', spoken: 'Цирк и цапля!', caption: 'Цапля выступает на арене цирка:' }
    ]
  },
  'Ч': {
    tip: 'Губы округли, подними язычок кверху и скажи мягко: «Ч-Ч-Ч!», как едет поезд «Чух-чух» — всегда мягкий 🔵.',
    syllables: ['ЧА', 'ЧО', 'ЧУ', 'ЧИ', 'ЧЕ'],
    comic: [
      { avatar: '🚂', scene: '🐢', bubble: 'ЧУХ-ЧУХ!', spoken: 'Чух-чух!', caption: 'Черепашка едет на поезде пить чай:' },
      { avatar: '🫖', scene: '🍵', bubble: 'Чашка чая!', spoken: 'Чашка чая!', caption: 'На столе горячий душистый чай:' }
    ]
  },
  'Ш': {
    tip: 'Подними широкий язычок к нёбу, округли губы и пошурши как ветер в листве: «Ш-Ш-Ш!» — твёрдый согласный 🔵.',
    syllables: ['ША', 'ШО', 'ШУ', 'ШИ', 'ШЕ'],
    comic: [
      { avatar: '🐍', scene: '🎈', bubble: 'Ш-Ш-ШАР!', spoken: 'Шшш! Шарик!', caption: 'Воздушный шарик тихонько шипит и летит:' },
      { avatar: '🐻', scene: '🌲', bubble: 'Шишка в шапке!', spoken: 'Шишка в шапке!', caption: 'Мишка собрал сосновые шишки в шапку:' }
    ]
  },
  'Щ': {
    tip: 'Улыбнись и произнеси долгое мягкое шипение: «Щ-Щ-Щ!», как чистит зубки щётка — всегда мягкий согласный 🔵.',
    syllables: ['ЩА', 'ЩО', 'ЩУ', 'ЩИ', 'ЩЕ'],
    comic: [
      { avatar: '🐶', scene: '🪥', bubble: 'Щ-Щ! Щётка!', spoken: 'Щётка и щенок!', caption: 'Щенок чистит белые зубки щёткой:' },
      { avatar: '🐟', scene: '🍲', bubble: 'Щука и щи!', spoken: 'Щука и щи!', caption: 'В реке плывёт быстрая зубастая щука:' }
    ]
  },
  'Ъ': {
    tip: 'Твёрдый знак ⚪ сам звука не даёт, но делает паузу-разделитель перед гласными Е, Ё, Ю, Я!',
    syllables: ['СЪЕЛ', 'ВЪЕЗД', 'ПОДЪЕЗД', 'ОБЪЁМ'],
    comic: [
      { avatar: '🚗', scene: '🏢', bubble: 'Тут подъезд!', spoken: 'Тут подъезд!', caption: 'Машина подъехала прямо к подъезду дома:' },
      { avatar: '🐱', scene: '🐟', bubble: 'Кот всё съел!', spoken: 'Кот всё съел!', caption: 'Довольный котик съел весь свой обед:' }
    ]
  },
  'Ы': {
    tip: 'Улыбнись, отодвинь язычок чуть назад и пропоём низким голосом: «Ы-Ы-Ы!» — гласный звук 🔴.',
    syllables: ['МЫ', 'ТЫ', 'ВЫ', 'СЫР', 'ДЫМ'],
    comic: [
      { avatar: '🐭', scene: '🧀', bubble: 'МЫ и СЫР!', spoken: 'Мы и сыр!', caption: 'Мышата нашли большой вкусный сыр:' },
      { avatar: '🏠', scene: '💨', bubble: 'Пых, дым!', spoken: 'Пых, дым!', caption: 'Из печной трубы идёт пушистый дым:' }
    ]
  },
  'Ь': {
    tip: 'Мягкий знак ⚪ своего звука не имеет, но делает согласную букву перед собой доброй и мягкой!',
    syllables: ['КОНЬ', 'ДЕНЬ', 'ТЕНЬ', 'СОЛЬ', 'ПЕНЬ'],
    comic: [
      { avatar: '🐴', scene: '☀️', bubble: 'Добрый конь!', spoken: 'Добрый конь!', caption: 'Быстрый конь скачет в солнечный день:' },
      { avatar: '🦌', scene: '🌲', bubble: 'Олень и пень!', spoken: 'Олень и пень!', caption: 'Лесной олень отдыхает у старого пня:' }
    ]
  },
  'Э': {
    tip: 'Открой ротик в широкой улыбке, язычок внизу, пропоём: «Э-Э-Э!» — гласный звук 🔴.',
    syllables: ['ЭЙ', 'ЭХ', 'ЭХО', 'МЭР', 'ЭРА'],
    comic: [
      { avatar: '🏔️', scene: '🗣️', bubble: 'Э-Э-ЭХО!', spoken: 'Эхо в горах!', caption: 'В высоких горах громко звучит эхо:' },
      { avatar: '🚜', scene: '🏗️', bubble: 'Экскаватор!', spoken: 'Экскаватор!', caption: 'Большой экскаватор копает песок ковшом:' }
    ]
  },
  'Ю': {
    tip: 'Вытяни губки трубочкой и пропоём мягко: «ЙУ-Ю-Ю!», как крутится юла — гласный звук 🔴.',
    syllables: ['МЮ', 'ЛЮ', 'НЮ', 'СЮ', 'ЮЛА'],
    comic: [
      { avatar: '👧', scene: '🪀', bubble: 'Ю-ю, юла!', spoken: 'Юла крутится!', caption: 'Юля раскрутила быструю яркую юлу:' },
      { avatar: '👗', scene: '🏖️', bubble: 'Едем на юг!', spoken: 'Едем на юг!', caption: 'Красивая юбка для поездки на тёплый юг:' }
    ]
  },
  'Я': {
    tip: 'Улыбнись и широко открой ротик, пропоём звонко: «ЙА-Я-Я!» — гласный звук 🔴.',
    syllables: ['МЯ', 'ЛЯ', 'НЯ', 'СЯ', 'ЯМА'],
    comic: [
      { avatar: '🧒', scene: '🍎', bubble: 'Я ем яблоко!', spoken: 'Я ем яблоко!', caption: 'Яша сорвал в саду спелое красное яблоко:' },
      { avatar: '⛵', scene: '⚓', bubble: 'Яхта и якорь!', spoken: 'Яхта и якорь!', caption: 'Белая яхта бросила якорь у берега:' }
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

export function getLetterLesson(letter, lang = 'ru') {
  const upper = letter.toUpperCase();
  const alphabetList = ALPHABET_DATA[lang] || ALPHABET_DATA['ru'];
  const letterItem = alphabetList.find(a => a.letter.toUpperCase() === upper) || alphabetList[0];
  const vowelSet = VOWELS[lang] || VOWELS['ru'];

  const isSign = (lang === 'ru' && (upper === 'Ъ' || upper === 'Ь'));
  const isVowel = !isSign && vowelSet.has(upper);
  const soundType = isSign ? 'sign' : (isVowel ? 'vowel' : 'consonant');

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
      syllables = custom.syllables;
      comic = custom.comic;
    } else {
      tipText = isVowel
        ? `Спой звук «${upper}-${upper}-${upper}!» — воздух идёт свободно, звук поётся!`
        : `Произнеси чётко звук буквы «${upper}» в слове «${letterItem.word}».`;
      syllables = isVowel ? [`${upper}М`, `М${upper}`, `П${upper}`, `Т${upper}`, `К${upper}`] : [`${upper}А`, `${upper}О`, `${upper}У`, `${upper}И`, `${upper}Е`];
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
    if (isVowel) {
      syllables = [`M${upper}`, `L${upper}`, `T${upper}`, `K${upper}`, letterItem.word.toUpperCase()];
    } else if (['Ą', 'Ę', 'Ć', 'Ń', 'Ó', 'Ś', 'Ź'].includes(upper)) {
      syllables = [letterItem.word.toUpperCase(), `${upper}`, `M${isVowel ? upper : 'A'}`, `L${isVowel ? upper : 'O'}`];
    } else {
      syllables = [`${upper}A`, `${upper}O`, `${upper}U`, `${upper}E`, `${upper}I`];
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
    syllables = isVowel
      ? [`${upper}T`, `${upper}N`, `M${upper}`, `B${upper}`, letterItem.word.toUpperCase()]
      : [`${upper}A`, `${upper}O`, `${upper}E`, `${upper}I`, letterItem.word.toUpperCase()];
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
        bubble: `Let's read: ${letterItem.word.toUpperCase()}!`,
        spoken: `Let's read ${letterItem.word}!`,
        caption: `Tap the speech bubble to listen and repeat:`
      }
    ];
  }

  // 2. Задание 1: «Буквенный сыщик» (8 кружков: 3 целевые буквы + 5 букв-ловушек)
  const simPool = (SIMILAR_LETTERS[lang] && SIMILAR_LETTERS[lang][upper])
    ? SIMILAR_LETTERS[lang][upper]
    : alphabetList.map(a => a.letter.toUpperCase()).filter(l => l !== upper);
  const distractors = shuffleArray(simPool.filter(l => l !== upper)).slice(0, 5);
  const detectiveBubbles = shuffleArray([
    { id: 't1', letter: upper, isTarget: true },
    { id: 't2', letter: upper, isTarget: true },
    { id: 't3', letter: upper, isTarget: true },
    ...distractors.map((d, idx) => ({ id: `d${idx}`, letter: d, isTarget: false }))
  ]);

  // 3. Задание 2: «В каких словах живёт буква?» (3 слова с этой буквой + 1 слово без неё)
  const wordsPool = WORDS_DATA[lang] || WORDS_DATA['ru'] || [];
  const matchingWords = [];
  const seenWords = new Set();

  // Сначала добавляем главное слово из Азбуки
  const mainWordUpper = letterItem.word.toUpperCase();
  if (mainWordUpper.includes(upper)) {
    matchingWords.push({ word: mainWordUpper, emoji: letterItem.emoji, hasLetter: true });
    seenWords.add(mainWordUpper);
  }

  const shuffledDict = shuffleArray(wordsPool);
  for (const w of shuffledDict) {
    if (matchingWords.length >= 3) break;
    const wUp = w.word.toUpperCase();
    if (wUp.includes(upper) && !seenWords.has(wUp)) {
      matchingWords.push({ word: wUp, emoji: w.emoji, hasLetter: true });
      seenWords.add(wUp);
    }
  }

  // Если для редких букв (Ё, Щ, Ъ, Ź, Ń и т.д.) в базовом словаре меньше 3 слов — добираем из Азбуки или спец-слов
  if (matchingWords.length < 3) {
    const extraFallback = {
      'Ё': [{ word: 'ЁЛКА', emoji: '🎄' }, { word: 'МЁД', emoji: '🍯' }, { word: 'ЛЁД', emoji: '🧊' }],
      'Щ': [{ word: 'ЩЁТКА', emoji: '🪥' }, { word: 'ЩЕНОК', emoji: '🐶' }, { word: 'ЩУКА', emoji: '🐟' }],
      'Ъ': [{ word: 'ПОДЪЕЗД', emoji: '🏢' }, { word: 'СЪЕЛ', emoji: '🍽️' }, { word: 'ВЪЕЗД', emoji: '🚗' }],
      'Ы': [{ word: 'СЫР', emoji: '🧀' }, { word: 'РЫБА', emoji: '🐟' }, { word: 'МЫШЬ', emoji: '🐭' }],
      'Ь': [{ word: 'КОНЬ', emoji: '🐴' }, { word: 'МЕДВЕДЬ', emoji: '🐻' }, { word: 'СОЛЬ', emoji: '🧂' }],
      'Э': [{ word: 'ЭКСКАВАТОР', emoji: '🚜' }, { word: 'ЭХО', emoji: '🏔️' }, { word: 'ЭКРАН', emoji: '📺' }],
      'Й': [{ word: 'ЙОГУРТ', emoji: '🍦' }, { word: 'ЧАЙ', emoji: '🍵' }, { word: 'ПОПУГАЙ', emoji: '🦜' }],
      'Ф': [{ word: 'ФЛАГ', emoji: '🚩' }, { word: 'ФОКУС', emoji: '🎩' }, { word: 'ЖИРАФ', emoji: '🦒' }],
      'Ц': [{ word: 'ЦВЕТОК', emoji: '🌸' }, { word: 'ЦЫПЛЁНОК', emoji: '🐤' }, { word: 'ЗАЯЦ', emoji: '🐰' }]
    };
    const extras = extraFallback[upper] || [];
    for (const ex of extras) {
      if (matchingWords.length >= 3) break;
      if (!seenWords.has(ex.word)) {
        matchingWords.push({ word: ex.word, emoji: ex.emoji, hasLetter: true });
        seenWords.add(ex.word);
      }
    }
    for (const a of alphabetList) {
      if (matchingWords.length >= 3) break;
      const aUp = a.word.toUpperCase();
      if (aUp.includes(upper) && !seenWords.has(aUp)) {
        matchingWords.push({ word: aUp, emoji: a.emoji, hasLetter: true });
        seenWords.add(aUp);
      }
    }
  }

  // Подбираем 1 слово-ловушку, в котором НЕТ этой буквы
  let trapWord = null;
  for (const w of shuffledDict) {
    const wUp = w.word.toUpperCase();
    if (!wUp.includes(upper) && !seenWords.has(wUp)) {
      trapWord = { word: wUp, emoji: w.emoji, hasLetter: false };
      break;
    }
  }
  if (!trapWord) {
    trapWord = { word: 'ДОМ', emoji: '🏠', hasLetter: false };
  }

  const wordChoices = shuffleArray([...matchingWords, trapWord]);

  return {
    letter: upper,
    word: letterItem.word,
    emoji: letterItem.emoji,
    soundType,
    badgeText,
    tipText,
    comic,
    syllables,
    detectiveBubbles,
    targetBubblesCount: 3,
    wordChoices,
    targetWordsCount: matchingWords.length
  };
}
