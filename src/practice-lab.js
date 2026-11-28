// Модуль «Практика» (6 не похожих друг на друга тактильных тренажёров для RU / PL / EN):
// 1. ✏️ Прописи (обводка буквы на Canvas)
// 2. 🚂 Магнит слогов (перетаскивание согласной к гласной для плавного слияния)
// 3. 🪢 Ниточки-дорожки (соединение слогов и картинок гибкой линией)
// 4. 🎰 Волшебный барабан слов (замена 1 буквы вращением колеса: КОТ -> КИТ)
// 5. 🥁 Барабан слогов (отстукивание слогов в ритм)
// 6. 🪞 Буквы-шалунишки (поиск и исправление отзеркаленных букв)

import { VOWELS, shuffleArray } from './data.js?v=31';
import { sound, getBlendStretchSound } from './audio.js?v=31';
import { getOrderedAlphabetData } from './letter-lessons.js?v=31';
import { SYLLABLE_WORDS_DATA } from './kocham-czytac.js?v=31';
import { LetterTracer, loadTracedLetters, loadTracerPrefs } from './letter-tracer.js?v=31';

// ==========================================
// 1. БАЗА ДАННЫХ ДЛЯ «МАГНИТА СЛОГОВ»
// ==========================================
export const BLENDING_SETS = {
  ru: [
    {
      c: 'М',
      pairs: [
        { v: 'А', syl: 'МА', word: 'МА·МА', emoji: '👩' },
        { v: 'О', syl: 'МО', word: 'МО·РЕ', emoji: '🌊' },
        { v: 'У', syl: 'МУ', word: 'МУ·ХА', emoji: '🪰' },
        { v: 'И', syl: 'МИ', word: 'МИШ·КА', emoji: '🐻' },
        { v: 'Ы', syl: 'МЫ', word: 'МЫ·ЛО', emoji: '🧼' }
      ]
    },
    {
      c: 'С',
      pairs: [
        { v: 'А', syl: 'СА', word: 'СА·НИ', emoji: '🛷' },
        { v: 'О', syl: 'СО', word: 'СО·ВА', emoji: '🦉' },
        { v: 'У', syl: 'СУ', word: 'СУП', emoji: '🍲' },
        { v: 'И', syl: 'СИ', word: 'СИ·ЛА', emoji: '💪' },
        { v: 'Ы', syl: 'СЫ', word: 'СЫР', emoji: '🧀' }
      ]
    },
    {
      c: 'Х',
      pairs: [
        { v: 'А', syl: 'ХА', word: 'ХА·ЛАТ', emoji: '🥋' },
        { v: 'О', syl: 'ХО', word: 'ХО·МЯК', emoji: '🐹' },
        { v: 'У', syl: 'ХУ', word: 'ХУР·МА', emoji: '🍊' },
        { v: 'И', syl: 'ХИ', word: 'ХИ·ЖИ·НА', emoji: '🛖' },
        { v: 'Е', syl: 'ХЕ', word: 'ХЕК', emoji: '🐟' }
      ]
    },
    {
      c: 'Л',
      pairs: [
        { v: 'А', syl: 'ЛА', word: 'ЛА·ПА', emoji: '🐾' },
        { v: 'О', syl: 'ЛО', word: 'ЛОД·КА', emoji: '⛵' },
        { v: 'У', syl: 'ЛУ', word: 'ЛУ·НА', emoji: '🌙' },
        { v: 'И', syl: 'ЛИ', word: 'ЛИ·СА', emoji: '🦊' },
        { v: 'Ы', syl: 'ЛЫ', word: 'ЛЫ·ЖИ', emoji: '🎿' }
      ]
    },
    {
      c: 'Н',
      pairs: [
        { v: 'А', syl: 'НА', word: 'НА·СОС', emoji: '🎈' },
        { v: 'О', syl: 'НО', word: 'НОС', emoji: '👃' },
        { v: 'Е', syl: 'НЕ', word: 'НЕ·БО', emoji: '☁️' },
        { v: 'И', syl: 'НИ', word: 'НИТ·КА', emoji: '🧵' },
        { v: 'Ы', syl: 'НЫ', word: 'НЫ·РЯТЬ', emoji: '🏊' }
      ]
    },
    {
      c: 'Ш',
      pairs: [
        { v: 'А', syl: 'ША', word: 'ШАР', emoji: '🎈' },
        { v: 'О', syl: 'ШО', word: 'ШО·КО·ЛАД', emoji: '🍫' },
        { v: 'У', syl: 'ШУ', word: 'ШУ·БА', emoji: '🧥' },
        { v: 'Е', syl: 'ШЕ', word: 'ШЕ·Я', emoji: '🦒' },
        { v: 'И', syl: 'ШИ', word: 'ШИ·НА', emoji: '🛞' }
      ]
    },
    {
      c: 'Р',
      pairs: [
        { v: 'А', syl: 'РА', word: 'РА·КЕ·ТА', emoji: '🚀' },
        { v: 'О', syl: 'РО', word: 'РО·ЗА', emoji: '🌹' },
        { v: 'У', syl: 'РУ', word: 'РУ·КА', emoji: '✋' },
        { v: 'И', syl: 'РИ', word: 'РИС', emoji: '🍚' },
        { v: 'Ы', syl: 'РЫ', word: 'РЫ·БА', emoji: '🐟' }
      ]
    },
    {
      c: 'К',
      pairs: [
        { v: 'А', syl: 'КА', word: 'КА·ША', emoji: '🥣' },
        { v: 'О', syl: 'КО', word: 'КОТ', emoji: '🐱' },
        { v: 'У', syl: 'КУ', word: 'КУК·ЛА', emoji: '🪆' },
        { v: 'И', syl: 'КИ', word: 'КИТ', emoji: '🐋' },
        { v: 'Е', syl: 'КЕ', word: 'КЕ·ДЫ', emoji: '👟' }
      ]
    },
    {
      c: 'П',
      pairs: [
        { v: 'А', syl: 'ПА', word: 'ПА·ПА', emoji: '👨' },
        { v: 'О', syl: 'ПО', word: 'ПО·ЕЗД', emoji: '🚂' },
        { v: 'У', syl: 'ПУ', word: 'ПУ·МА', emoji: '🐆' },
        { v: 'И', syl: 'ПИ', word: 'ПИ·ЛА', emoji: '🪚' },
        { v: 'Ы', syl: 'ПЫ', word: 'ПЫ·ЛЕ·СОС', emoji: '🧹' }
      ]
    },
    {
      c: 'Т',
      pairs: [
        { v: 'А', syl: 'ТА', word: 'ТА·РЕЛ·КА', emoji: '🍽️' },
        { v: 'О', syl: 'ТО', word: 'ТОРТ', emoji: '🎂' },
        { v: 'У', syl: 'ТУ', word: 'ТУ·ЧА', emoji: '☁️' },
        { v: 'И', syl: 'ТИ', word: 'ТИГР', emoji: '🐯' },
        { v: 'Ы', syl: 'ТЫ', word: 'ТЫК·ВА', emoji: '🎃' }
      ]
    },
    {
      c: 'В',
      pairs: [
        { v: 'А', syl: 'ВА', word: 'ВА·ЗА', emoji: '🏺' },
        { v: 'О', syl: 'ВО', word: 'ВО·ДА', emoji: '💧' },
        { v: 'У', syl: 'ВУ', word: 'ВУЛ·КАН', emoji: '🌋' },
        { v: 'И', syl: 'ВИ', word: 'ВИШ·НЯ', emoji: '🍒' },
        { v: 'Ы', syl: 'ВЫ', word: 'ВЫД·РА', emoji: '🦦' }
      ]
    },
    {
      c: 'З',
      pairs: [
        { v: 'А', syl: 'ЗА', word: 'ЗА·ЯЦ', emoji: '🐰' },
        { v: 'О', syl: 'ЗО', word: 'ЗОНТ', emoji: '☂️' },
        { v: 'У', syl: 'ЗУ', word: 'ЗУБ', emoji: '🦷' },
        { v: 'И', syl: 'ЗИ', word: 'ЗИ·МА', emoji: '❄️' },
        { v: 'Е', syl: 'ЗЕ', word: 'ЗЕБ·РА', emoji: '🦓' }
      ]
    },
    {
      c: 'Б',
      pairs: [
        { v: 'А', syl: 'БА', word: 'БА·НАН', emoji: '🍌' },
        { v: 'О', syl: 'БО', word: 'БО·БЁР', emoji: '🦫' },
        { v: 'У', syl: 'БУ', word: 'БУ·БЕН', emoji: '🥁' },
        { v: 'И', syl: 'БИ', word: 'БИ·НОКЛЬ', emoji: '🔭' },
        { v: 'Ы', syl: 'БЫ', word: 'БЫК', emoji: '🐂' }
      ]
    },
    {
      c: 'Г',
      pairs: [
        { v: 'А', syl: 'ГА', word: 'ГА·ЗЕ·ТА', emoji: '📰' },
        { v: 'О', syl: 'ГО', word: 'ГО·РА', emoji: '🏔️' },
        { v: 'У', syl: 'ГУ', word: 'ГУ·СИ', emoji: '🪿' },
        { v: 'И', syl: 'ГИ', word: 'ГИ·ТА·РА', emoji: '🎸' },
        { v: 'Е', syl: 'ГЕ', word: 'ГЕ·РОЙ', emoji: '🦸' }
      ]
    },
    {
      c: 'Д',
      pairs: [
        { v: 'А', syl: 'ДА', word: 'ДА·ЧА', emoji: '🏡' },
        { v: 'О', syl: 'ДО', word: 'ДОМ', emoji: '🏠' },
        { v: 'У', syl: 'ДУ', word: 'ДУБ', emoji: '🌳' },
        { v: 'И', syl: 'ДИ', word: 'ДИ·ВАН', emoji: '🛋️' },
        { v: 'Ы', syl: 'ДЫ', word: 'ДЫ·НЯ', emoji: '🍈' }
      ]
    }
  ],
  pl: [
    {
      c: 'M',
      pairs: [
        { v: 'A', syl: 'MA', word: 'MA·MA', emoji: '👩' },
        { v: 'O', syl: 'MO', word: 'MO·RZE', emoji: '🌊' },
        { v: 'U', syl: 'MU', word: 'MU·CHA', emoji: '🪰' },
        { v: 'E', syl: 'ME', word: 'ME·DAL', emoji: '🏅' },
        { v: 'Y', syl: 'MY', word: 'MY·DŁO', emoji: '🧼' },
        { v: 'Ą', syl: 'MĄ', word: 'MĄ·KA', emoji: '🌾' }
      ]
    },
    {
      c: 'T',
      pairs: [
        { v: 'A', syl: 'TA', word: 'TA·TA', emoji: '👨' },
        { v: 'O', syl: 'TO', word: 'TORT', emoji: '🎂' },
        { v: 'U', syl: 'TU', word: 'TU·LI·PAN', emoji: '🌷' },
        { v: 'E', syl: 'TE', word: 'TE·LE·FON', emoji: '📱' },
        { v: 'Y', syl: 'TY', word: 'TY·GRYS', emoji: '🐯' },
        { v: 'Ę', syl: 'TĘ', word: 'TĘ·CZA', emoji: '🌈' }
      ]
    },
    {
      c: 'L',
      pairs: [
        { v: 'A', syl: 'LA', word: 'LA·TO', emoji: '☀️' },
        { v: 'O', syl: 'LO', word: 'LO·DY', emoji: '🍦' },
        { v: 'U', syl: 'LU', word: 'LU·PA', emoji: '🔍' },
        { v: 'E', syl: 'LE', word: 'LEW', emoji: '🦁' },
        { v: 'I', syl: 'LI', word: 'LIS', emoji: '🦊' }
      ]
    },
    {
      c: 'S',
      pairs: [
        { v: 'A', syl: 'SA', word: 'SA·MO·LOT', emoji: '✈️' },
        { v: 'O', syl: 'SO', word: 'SO·WA', emoji: '🦉' },
        { v: 'U', syl: 'SU', word: 'SU·KIEN·KA', emoji: '👗' },
        { v: 'E', syl: 'SE', word: 'SER', emoji: '🧀' },
        { v: 'Y', syl: 'SY', word: 'SYN', emoji: '👦' }
      ]
    },
    {
      c: 'K',
      pairs: [
        { v: 'A', syl: 'KA', word: 'KA·WA', emoji: '☕' },
        { v: 'O', syl: 'KO', word: 'KOT', emoji: '🐱' },
        { v: 'U', syl: 'KU', word: 'KU·RA', emoji: '🐔' },
        { v: 'E', syl: 'KE', word: 'KE·FIR', emoji: '🥛' },
        { v: 'I', syl: 'KI', word: 'KI·WI', emoji: '🥝' }
      ]
    },
    {
      c: 'P',
      pairs: [
        { v: 'A', syl: 'PA', word: 'PA·PA', emoji: '👨' },
        { v: 'O', syl: 'PO', word: 'PO·MI·DOR', emoji: '🍅' },
        { v: 'U', syl: 'PU', word: 'PU·MA', emoji: '🐆' },
        { v: 'E', syl: 'PE', word: 'PE·LI·KAN', emoji: '🐦' },
        { v: 'I', syl: 'PI', word: 'PI·ŁA', emoji: '🪚' },
        { v: 'Ą', syl: 'PĄ', word: 'PĄ·CZEK', emoji: '🍩' }
      ]
    },
    {
      c: 'B',
      pairs: [
        { v: 'A', syl: 'BA', word: 'BA·NAN', emoji: '🍌' },
        { v: 'O', syl: 'BO', word: 'BO·CIAN', emoji: '🦢' },
        { v: 'Ó', syl: 'BÓ', word: 'BÓBR', emoji: '🦫' },
        { v: 'U', syl: 'BU', word: 'BUŁ·KA', emoji: '🥖' },
        { v: 'E', syl: 'BE', word: 'BE·RET', emoji: '👒' },
        { v: 'I', syl: 'BI', word: 'BI·LET', emoji: '🎫' }
      ]
    },
    {
      c: 'D',
      pairs: [
        { v: 'A', syl: 'DA', word: 'DACH', emoji: '🏠' },
        { v: 'O', syl: 'DO', word: 'DOM', emoji: '🏡' },
        { v: 'U', syl: 'DU', word: 'DUCH', emoji: '👻' },
        { v: 'E', syl: 'DE', word: 'DESZCZ', emoji: '🌧️' },
        { v: 'Y', syl: 'DY', word: 'DY·NIA', emoji: '🎃' }
      ]
    },
    {
      c: 'N',
      pairs: [
        { v: 'A', syl: 'NA', word: 'NA·MIOT', emoji: '⛺' },
        { v: 'O', syl: 'NO', word: 'NOS', emoji: '👃' },
        { v: 'U', syl: 'NU', word: 'NU·TA', emoji: '🎵' },
        { v: 'E', syl: 'NE', word: 'NEK·TAR', emoji: '🍯' },
        { v: 'I', syl: 'NI', word: 'NIT·KA', emoji: '🧵' }
      ]
    },
    {
      c: 'R',
      pairs: [
        { v: 'A', syl: 'RA', word: 'RA·KIE·TA', emoji: '🚀' },
        { v: 'O', syl: 'RO', word: 'RO·WER', emoji: '🚲' },
        { v: 'Ó', syl: 'RÓ', word: 'RÓ·ŻA', emoji: '🌹' },
        { v: 'U', syl: 'RU', word: 'RU·RA', emoji: '🪈' },
        { v: 'E', syl: 'RE', word: 'RE·KIN', emoji: '🦈' },
        { v: 'Y', syl: 'RY', word: 'RY·BA', emoji: '🐟' }
      ]
    },
    {
      c: 'W',
      pairs: [
        { v: 'A', syl: 'WA', word: 'WA·ZON', emoji: '🏺' },
        { v: 'O', syl: 'WO', word: 'WO·DA', emoji: '💧' },
        { v: 'Ó', syl: 'WÓ', word: 'WÓ·ZEK', emoji: '🛒' },
        { v: 'U', syl: 'WU', word: 'WU·JEK', emoji: '👨' },
        { v: 'E', syl: 'WE', word: 'WEŁ·NA', emoji: '🧶' },
        { v: 'I', syl: 'WI', word: 'WIŚ·NIA', emoji: '🍒' }
      ]
    },
    {
      c: 'Z',
      pairs: [
        { v: 'A', syl: 'ZA', word: 'ZA·MEK', emoji: '🏰' },
        { v: 'O', syl: 'ZO', word: 'ZOO', emoji: '🦁' },
        { v: 'U', syl: 'ZU', word: 'ZU·PA', emoji: '🍲' },
        { v: 'E', syl: 'ZE', word: 'ZE·BRA', emoji: '🦓' },
        { v: 'I', syl: 'ZI', word: 'ZI·MA', emoji: '❄️' },
        { v: 'Ą', syl: 'ZĄ', word: 'ZĄB', emoji: '🦷' }
      ]
    },
    {
      c: 'G',
      pairs: [
        { v: 'A', syl: 'GA', word: 'GA·ZE·TA', emoji: '📰' },
        { v: 'O', syl: 'GO', word: 'GO·ŁĄB', emoji: '🕊️' },
        { v: 'Ó', syl: 'GÓ', word: 'GÓ·RA', emoji: '🏔️' },
        { v: 'U', syl: 'GU', word: 'GU·ZIK', emoji: '🔘' },
        { v: 'E', syl: 'GE', word: 'GE·PARD', emoji: '🐆' },
        { v: 'I', syl: 'GI', word: 'GI·TA·RA', emoji: '🎸' }
      ]
    },
    {
      c: 'F',
      pairs: [
        { v: 'A', syl: 'FA', word: 'FA·LA', emoji: '🌊' },
        { v: 'O', syl: 'FO', word: 'FO·KA', emoji: '🦭' },
        { v: 'U', syl: 'FU', word: 'FU·TRO', emoji: '🧥' },
        { v: 'E', syl: 'FE', word: 'FE·RIE', emoji: '⛷️' },
        { v: 'I', syl: 'FI', word: 'FI·LI·ŻAN·KA', emoji: '☕' }
      ]
    },
    {
      c: 'J',
      pairs: [
        { v: 'A', syl: 'JA', word: 'JA·JO', emoji: '🥚' },
        { v: 'O', syl: 'JO', word: 'JO·GURT', emoji: '🥛' },
        { v: 'U', syl: 'JU', word: 'JU·TRO', emoji: '🌅' },
        { v: 'E', syl: 'JE', word: 'JEŻ', emoji: '🦔' },
        { v: 'Ę', syl: 'JĘ', word: 'JĘ·ZYK', emoji: '👅' }
      ]
    },
    {
      c: 'Ł',
      pairs: [
        { v: 'A', syl: 'ŁA', word: 'ŁA·PA', emoji: '🐾' },
        { v: 'O', syl: 'ŁO', word: 'ŁOŚ', emoji: '🫎' },
        { v: 'Ó', syl: 'ŁÓ', word: 'ŁÓDŹ', emoji: '⛵' },
        { v: 'U', syl: 'ŁU', word: 'ŁUK', emoji: '🏹' },
        { v: 'Y', syl: 'ŁY', word: 'ŁYŻ·KA', emoji: '🥄' }
      ]
    },
    {
      c: 'C',
      pairs: [
        { v: 'A', syl: 'CA', word: 'CA·ŁUS', emoji: '😘' },
        { v: 'O', syl: 'CO', word: 'CO·FAĆ', emoji: '⏪' },
        { v: 'U', syl: 'CU', word: 'CU·KIER', emoji: '🍬' },
        { v: 'E', syl: 'CE', word: 'CE·BU·LA', emoji: '🧅' },
        { v: 'Y', syl: 'CY', word: 'CY·TRY·NA', emoji: '🍋' }
      ]
    },
    {
      c: 'H',
      pairs: [
        { v: 'A', syl: 'HA', word: 'HA·MAK', emoji: '🏝️' },
        { v: 'O', syl: 'HO', word: 'HO·KEJ', emoji: '🏒' },
        { v: 'U', syl: 'HU', word: 'HUŚ·TAW·KA', emoji: '🛝' },
        { v: 'E', syl: 'HE', word: 'HER·BA·TA', emoji: '🍵' },
        { v: 'I', syl: 'HI', word: 'HI·PO·PO·TAM', emoji: '🦛' }
      ]
    },
    {
      c: 'Ż',
      pairs: [
        { v: 'A', syl: 'ŻA', word: 'ŻA·BA', emoji: '🐸' },
        { v: 'O', syl: 'ŻO', word: 'ŻO·ŁĄDŹ', emoji: '🌰' },
        { v: 'Ó', syl: 'ŻÓ', word: 'ŻÓŁW', emoji: '🐢' },
        { v: 'U', syl: 'ŻU', word: 'ŻUK', emoji: '🪲' },
        { v: 'Y', syl: 'ŻY', word: 'ŻY·RA·FA', emoji: '🦒' }
      ]
    },
    {
      c: 'Ś',
      mode: 'vc',
      pairs: [
        { v: 'I', syl: 'IŚ', word: 'MIŚ', emoji: '🐻' },
        { v: 'A', syl: 'AŚ', word: 'JAŚ', emoji: '👦' },
        { v: 'O', syl: 'OŚ', word: 'ŁOŚ', emoji: '🫎' },
        { v: 'Ę', syl: 'ĘŚ', word: 'GĘŚ', emoji: '🪿' },
        { v: 'U', syl: 'UŚ', word: 'UŚ·MIECH', emoji: '😊' }
      ]
    },
    {
      c: 'Ć',
      mode: 'vc',
      pairs: [
        { v: 'A', syl: 'AĆ', word: 'SPAĆ', emoji: '😴' },
        { v: 'E', syl: 'EĆ', word: 'SIEĆ', emoji: '🕸️' },
        { v: 'I', syl: 'IĆ', word: 'NIĆ', emoji: '🧵' },
        { v: 'Y', syl: 'YĆ', word: 'MYĆ', emoji: '🧼' },
        { v: 'U', syl: 'UĆ', word: 'CZUĆ', emoji: '👃' }
      ]
    },
    {
      c: 'Ń',
      mode: 'vc',
      pairs: [
        { v: 'O', syl: 'OŃ', word: 'KOŃ', emoji: '🐴' },
        { v: 'A', syl: 'AŃ', word: 'BAŃ·KA', emoji: '🫧' },
        { v: 'E', syl: 'EŃ', word: 'JE·LEŃ', emoji: '🦌' },
        { v: 'Y', syl: 'YŃ', word: 'PŁYŃ', emoji: '🏊' },
        { v: 'U', syl: 'UŃ', word: 'U·SUŃ', emoji: '🧹' }
      ]
    },
    {
      c: 'Ź',
      mode: 'vc',
      pairs: [
        { v: 'A', syl: 'AŹ', word: 'ŁAŹ·NIA', emoji: '🛁' },
        { v: 'E', syl: 'EŹ', word: 'WEŹ', emoji: '🤲' },
        { v: 'O', syl: 'OŹ', word: 'GWOŹ·DZIE', emoji: '🔨' },
        { v: 'U', syl: 'UŹ', word: 'KUŹ·NIA', emoji: '🔥' },
        { v: 'Ó', syl: 'ÓŹ', word: 'PÓŹ·NO', emoji: '🌙' }
      ]
    }
  ],
  en: [
    {
      c: 'S',
      pairs: [
        { v: 'A', syl: 'SA', word: 'SAND', emoji: '🏖️' },
        { v: 'E', syl: 'SE', word: 'SEV·EN', emoji: '7️⃣' },
        { v: 'I', syl: 'SI', word: 'SIX', emoji: '6️⃣' },
        { v: 'O', syl: 'SO', word: 'SO·FA', emoji: '🛋️' },
        { v: 'U', syl: 'SU', word: 'SUN', emoji: '☀️' }
      ]
    },
    {
      c: 'T',
      pairs: [
        { v: 'A', syl: 'TA', word: 'TAP', emoji: '🚰' },
        { v: 'E', syl: 'TE', word: 'TEN', emoji: '🔟' },
        { v: 'I', syl: 'TI', word: 'TI·GER', emoji: '🐯' },
        { v: 'O', syl: 'TO', word: 'TO·MA·TO', emoji: '🍅' },
        { v: 'U', syl: 'TU', word: 'TUR·TLE', emoji: '🐢' }
      ]
    },
    {
      c: 'P',
      pairs: [
        { v: 'A', syl: 'PA', word: 'PAN', emoji: '🍳' },
        { v: 'E', syl: 'PE', word: 'PEN', emoji: '🖊️' },
        { v: 'I', syl: 'PI', word: 'PIG', emoji: '🐷' },
        { v: 'O', syl: 'PO', word: 'POT', emoji: '🍲' },
        { v: 'U', syl: 'PU', word: 'PUP·PY', emoji: '🐶' }
      ]
    },
    {
      c: 'N',
      pairs: [
        { v: 'A', syl: 'NA', word: 'NAP', emoji: '😴' },
        { v: 'E', syl: 'NE', word: 'NEST', emoji: '🪹' },
        { v: 'I', syl: 'NI', word: 'NINE', emoji: '9️⃣' },
        { v: 'O', syl: 'NO', word: 'NOSE', emoji: '👃' },
        { v: 'U', syl: 'NU', word: 'NUT', emoji: '🥜' }
      ]
    },
    {
      c: 'M',
      pairs: [
        { v: 'A', syl: 'MA', word: 'MAP', emoji: '🗺️' },
        { v: 'E', syl: 'ME', word: 'MEL·ON', emoji: '🍈' },
        { v: 'I', syl: 'MI', word: 'MILK', emoji: '🥛' },
        { v: 'O', syl: 'MO', word: 'MON·KEY', emoji: '🐒' },
        { v: 'U', syl: 'MU', word: 'MUG', emoji: '☕' }
      ]
    },
    {
      c: 'D',
      pairs: [
        { v: 'A', syl: 'DA', word: 'DAD', emoji: '👨' },
        { v: 'E', syl: 'DE', word: 'DESK', emoji: '🪑' },
        { v: 'I', syl: 'DI', word: 'DISH', emoji: '🍽️' },
        { v: 'O', syl: 'DO', word: 'DOG', emoji: '🐶' },
        { v: 'U', syl: 'DU', word: 'DUCK', emoji: '🦆' }
      ]
    },
    {
      c: 'B',
      pairs: [
        { v: 'A', syl: 'BA', word: 'BAT', emoji: '🦇' },
        { v: 'E', syl: 'BE', word: 'BED', emoji: '🛏️' },
        { v: 'I', syl: 'BI', word: 'BIRD', emoji: '🐦' },
        { v: 'O', syl: 'BO', word: 'BOX', emoji: '📦' },
        { v: 'U', syl: 'BU', word: 'BUS', emoji: '🚌' }
      ]
    },
    {
      c: 'F',
      pairs: [
        { v: 'A', syl: 'FA', word: 'FAN', emoji: '🪭' },
        { v: 'E', syl: 'FE', word: 'FEATH·ER', emoji: '🪶' },
        { v: 'I', syl: 'FI', word: 'FISH', emoji: '🐟' },
        { v: 'O', syl: 'FO', word: 'FOX', emoji: '🦊' },
        { v: 'U', syl: 'FU', word: 'FUN', emoji: '🎉' }
      ]
    },
    {
      c: 'L',
      pairs: [
        { v: 'A', syl: 'LA', word: 'LAMP', emoji: '💡' },
        { v: 'E', syl: 'LE', word: 'LEM·ON', emoji: '🍋' },
        { v: 'I', syl: 'LI', word: 'LI·ON', emoji: '🦁' },
        { v: 'O', syl: 'LO', word: 'LOCK', emoji: '🔒' },
        { v: 'U', syl: 'LU', word: 'LUNCH', emoji: '🥪' }
      ]
    },
    {
      c: 'R',
      pairs: [
        { v: 'A', syl: 'RA', word: 'RAB·BIT', emoji: '🐰' },
        { v: 'E', syl: 'RE', word: 'RED', emoji: '🔴' },
        { v: 'I', syl: 'RI', word: 'RING', emoji: '💍' },
        { v: 'O', syl: 'RO', word: 'RO·BOT', emoji: '🤖' },
        { v: 'U', syl: 'RU', word: 'RUN', emoji: '🏃' }
      ]
    },
    {
      c: 'H',
      pairs: [
        { v: 'A', syl: 'HA', word: 'HAT', emoji: '👒' },
        { v: 'E', syl: 'HE', word: 'HEN', emoji: '🐔' },
        { v: 'I', syl: 'HI', word: 'HILL', emoji: '⛰️' },
        { v: 'O', syl: 'HO', word: 'HORSE', emoji: '🐴' },
        { v: 'U', syl: 'HU', word: 'HUG', emoji: '🤗' }
      ]
    }
  ]
};

// ==========================================
// 2. БАЗА ДАННЫХ ДЛЯ «ВОЛШЕБНОГО БАРАБАНА СЛОВ» (18 на язык)
// ==========================================
export const WORD_MORPH_DATA = {
  ru: [
    { start: 'КОТ', startEmoji: '🐱', target: 'КИТ', targetEmoji: '🐋', changeIdx: 1, reelLetters: ['А', 'О', 'И', 'У', 'Ы'], hint: 'Большой морской великан' },
    { start: 'КОТ', startEmoji: '🐱', target: 'РОТ', targetEmoji: '👄', changeIdx: 0, reelLetters: ['К', 'Р', 'М', 'Т', 'П'], hint: 'Им мы кушаем и улыбаемся' },
    { start: 'ДОМ', startEmoji: '🏠', target: 'ДЫМ', targetEmoji: '💨', changeIdx: 1, reelLetters: ['О', 'Ы', 'А', 'У', 'И'], hint: 'Идёт из трубы на крыше' },
    { start: 'ДОМ', startEmoji: '🏠', target: 'СОМ', targetEmoji: '🐟', changeIdx: 0, reelLetters: ['Д', 'С', 'К', 'Л', 'Р'], hint: 'Усатая речная рыба' },
    { start: 'СОМ', startEmoji: '🐟', target: 'СОК', targetEmoji: '🧃', changeIdx: 2, reelLetters: ['М', 'К', 'Н', 'Р', 'Т'], hint: 'Сладкий фруктовый напиток' },
    { start: 'СОК', startEmoji: '🧃', target: 'СОН', targetEmoji: '😴', changeIdx: 2, reelLetters: ['К', 'Н', 'М', 'Р', 'П'], hint: 'То, что снится ночью в кроватке' },
    { start: 'СЫР', startEmoji: '🧀', target: 'СЫН', targetEmoji: '👦', changeIdx: 2, reelLetters: ['Р', 'Н', 'Т', 'К', 'М'], hint: 'Мальчик для мамы и папы' },
    { start: 'ЛУК', startEmoji: '🧅', target: 'ЖУК', targetEmoji: '🪲', changeIdx: 0, reelLetters: ['Л', 'Ж', 'Р', 'С', 'Б'], hint: 'Жужжит летом в зелёной траве' },
    { start: 'МАК', startEmoji: '🌺', target: 'РАК', targetEmoji: '🦞', changeIdx: 0, reelLetters: ['М', 'Р', 'Л', 'С', 'Т'], hint: 'Живёт в речке с клешнями' },
    { start: 'ДУБ', startEmoji: '🌳', target: 'ЗУБ', targetEmoji: '🦷', changeIdx: 0, reelLetters: ['Д', 'З', 'К', 'Л', 'Р'], hint: 'Белый и крепкий во рту' },
    { start: 'МАМА', startEmoji: '👩', target: 'РАМА', targetEmoji: '🖼️', changeIdx: 0, reelLetters: ['М', 'Р', 'Л', 'П', 'Д'], hint: 'Вокруг окна или картины' },
    { start: 'ЛИСА', startEmoji: '🦊', target: 'ЛИПА', targetEmoji: '🌳', changeIdx: 2, reelLetters: ['С', 'П', 'М', 'Н', 'Т'], hint: 'Душистое дерево с жёлтыми цветами' },
    { start: 'КОЗА', startEmoji: '🐐', target: 'РОЗА', targetEmoji: '🌹', changeIdx: 0, reelLetters: ['К', 'Р', 'Л', 'М', 'П'], hint: 'Красивый цветок с шипами' },
    { start: 'КОЗА', startEmoji: '🐐', target: 'КОСА', targetEmoji: '👧', changeIdx: 2, reelLetters: ['З', 'С', 'М', 'Р', 'Т'], hint: 'Заплетённые длинные волосы' },
    { start: 'РУКА', startEmoji: '✋', target: 'РЕКА', targetEmoji: '🌊', changeIdx: 1, reelLetters: ['У', 'Е', 'А', 'О', 'И'], hint: 'Течёт среди лугов и лесов' },
    { start: 'МИШКА', startEmoji: '🐻', target: 'МЫШКА', targetEmoji: '🐭', changeIdx: 1, reelLetters: ['И', 'Ы', 'А', 'О', 'У'], hint: 'Маленькая серая пискля' },
    { start: 'ШАПКА', startEmoji: '🧢', target: 'ЛАПКА', targetEmoji: '🐾', changeIdx: 0, reelLetters: ['Ш', 'Л', 'П', 'М', 'Т'], hint: 'Мягкая ножка с подушечками у кота' },
    { start: 'КОРА', startEmoji: '🪵', target: 'ГОРА', targetEmoji: '🏔️', changeIdx: 0, reelLetters: ['К', 'Г', 'Н', 'М', 'П'], hint: 'Очень высокая со снежной вершиной' }
  ],
  pl: [
    { start: 'KOT', startEmoji: '🐱', target: 'LOT', targetEmoji: '✈️', changeIdx: 0, reelLetters: ['K', 'L', 'M', 'P', 'R'], hint: 'Podróż samolotem w chmurach' },
    { start: 'KOT', startEmoji: '🐱', target: 'KOŃ', targetEmoji: '🐎', changeIdx: 2, reelLetters: ['T', 'Ń', 'S', 'M', 'L'], hint: 'Duże zwierzę, które lubi galopować' },
    { start: 'DOM', startEmoji: '🏠', target: 'DYM', targetEmoji: '💨', changeIdx: 1, reelLetters: ['O', 'Y', 'A', 'E', 'U'], hint: 'Leci z komina na dachu' },
    { start: 'NOS', startEmoji: '👃', target: 'NOC', targetEmoji: '🌙', changeIdx: 2, reelLetters: ['S', 'C', 'K', 'T', 'R'], hint: 'Ciemna pora z gwiazdami i księżycem' },
    { start: 'LAS', startEmoji: '🌲', target: 'LIS', targetEmoji: '🦊', changeIdx: 1, reelLetters: ['A', 'I', 'O', 'E', 'U'], hint: 'Rudy sprytny zwierzak z kitą' },
    { start: 'LAS', startEmoji: '🌲', target: 'PAS', targetEmoji: '🥋', changeIdx: 0, reelLetters: ['L', 'P', 'R', 'M', 'K'], hint: 'Zakładamy go w talii' },
    { start: 'MAMA', startEmoji: '👩', target: 'RAMA', targetEmoji: '🖼️', changeIdx: 0, reelLetters: ['M', 'R', 'L', 'P', 'D'], hint: 'Dookoła obrazu albo okna' },
    { start: 'MAMA', startEmoji: '👩', target: 'MAPA', targetEmoji: '🗺️', changeIdx: 2, reelLetters: ['M', 'P', 'R', 'T', 'S'], hint: 'Pokazuje kraje, rzeki i drogi' },
    { start: 'MAMA', startEmoji: '👩', target: 'LAMA', targetEmoji: '🦙', changeIdx: 0, reelLetters: ['M', 'L', 'T', 'K', 'R'], hint: 'Puchate zwierzę z wysokich gór' },
    { start: 'KOZA', startEmoji: '🐐', target: 'KOSA', targetEmoji: '🌾', changeIdx: 2, reelLetters: ['Z', 'S', 'M', 'R', 'P'], hint: 'Narzędzie do koszenia trawy' },
    { start: 'WODA', startEmoji: '💧', target: 'MODA', targetEmoji: '👗', changeIdx: 0, reelLetters: ['W', 'M', 'K', 'R', 'S'], hint: 'Ładne ubrania i styl' },
    { start: 'TORT', startEmoji: '🎂', target: 'PORT', targetEmoji: '⚓', changeIdx: 0, reelLetters: ['T', 'P', 'R', 'M', 'K'], hint: 'Tam cumują statki i łódki' },
    { start: 'SER', startEmoji: '🧀', target: 'SEN', targetEmoji: '😴', changeIdx: 2, reelLetters: ['R', 'N', 'K', 'T', 'M'], hint: 'Gdy zamykamy oczy w nocy' },
    { start: 'RAK', startEmoji: '🦞', target: 'MAK', targetEmoji: '🌺', changeIdx: 0, reelLetters: ['R', 'M', 'L', 'P', 'S'], hint: 'Czerwony kwiat na łące' },
    { start: 'BUT', startEmoji: '🥾', target: 'BUS', targetEmoji: '🚌', changeIdx: 2, reelLetters: ['T', 'S', 'K', 'M', 'L'], hint: 'Mały pojazd wiozący pasażerów' },
    { start: 'FALA', startEmoji: '🌊', target: 'SALA', targetEmoji: '🏫', changeIdx: 0, reelLetters: ['F', 'S', 'M', 'L', 'T'], hint: 'Duży pokój do ćwiczeń lub lekcji' },
    { start: 'SOWA', startEmoji: '🦉', target: 'SOFA', targetEmoji: '🛋️', changeIdx: 2, reelLetters: ['W', 'F', 'K', 'M', 'T'], hint: 'Miękka kanapa w pokoju' },
    { start: 'LODY', startEmoji: '🍦', target: 'WODY', targetEmoji: '💧', changeIdx: 0, reelLetters: ['L', 'W', 'M', 'R', 'P'], hint: 'Błękitne jeziora i morza' }
  ],
  en: [
    { start: 'CAT', startEmoji: '🐱', target: 'HAT', targetEmoji: '👒', changeIdx: 0, reelLetters: ['C', 'H', 'B', 'M', 'S'], hint: 'You wear it on your head' },
    { start: 'HAT', startEmoji: '👒', target: 'BAT', targetEmoji: '🦇', changeIdx: 0, reelLetters: ['H', 'B', 'R', 'P', 'S'], hint: 'Flies at night in caves' },
    { start: 'CAT', startEmoji: '🐱', target: 'CAR', targetEmoji: '🚗', changeIdx: 2, reelLetters: ['T', 'R', 'N', 'P', 'B'], hint: 'Drives on roads with four wheels' },
    { start: 'DOG', startEmoji: '🐶', target: 'LOG', targetEmoji: '🪵', changeIdx: 0, reelLetters: ['D', 'L', 'F', 'B', 'M'], hint: 'A thick piece of a tree trunk' },
    { start: 'LOG', startEmoji: '🪵', target: 'FOG', targetEmoji: '🌫️', changeIdx: 0, reelLetters: ['L', 'F', 'D', 'B', 'H'], hint: 'Low misty cloud near the ground' },
    { start: 'SUN', startEmoji: '☀️', target: 'RUN', targetEmoji: '🏃', changeIdx: 0, reelLetters: ['S', 'R', 'B', 'F', 'M'], hint: 'Move super fast with your legs' },
    { start: 'RUN', startEmoji: '🏃', target: 'BUN', targetEmoji: '🥐', changeIdx: 0, reelLetters: ['R', 'B', 'S', 'F', 'G'], hint: 'A soft round baked bread roll' },
    { start: 'PIG', startEmoji: '🐷', target: 'BIG', targetEmoji: '🐘', changeIdx: 0, reelLetters: ['P', 'B', 'W', 'D', 'F'], hint: 'Huge, the opposite of small' },
    { start: 'BUS', startEmoji: '🚌', target: 'BUG', targetEmoji: '🪲', changeIdx: 2, reelLetters: ['S', 'G', 'N', 'T', 'P'], hint: 'A tiny crawling insect' },
    { start: 'BUG', startEmoji: '🪲', target: 'MUG', targetEmoji: '☕', changeIdx: 0, reelLetters: ['B', 'M', 'H', 'R', 'D'], hint: 'A big cup for warm cocoa' },
    { start: 'MUG', startEmoji: '☕', target: 'HUG', targetEmoji: '🤗', changeIdx: 0, reelLetters: ['M', 'H', 'J', 'L', 'T'], hint: 'A warm squeeze with both arms' },
    { start: 'FOX', startEmoji: '🦊', target: 'BOX', targetEmoji: '📦', changeIdx: 0, reelLetters: ['F', 'B', 'S', 'M', 'P'], hint: 'Square carton to pack toys in' },
    { start: 'PEN', startEmoji: '🖊️', target: 'HEN', targetEmoji: '🐔', changeIdx: 0, reelLetters: ['P', 'H', 'M', 'T', 'B'], hint: 'A farm bird that lays eggs' },
    { start: 'HEN', startEmoji: '🐔', target: 'TEN', targetEmoji: '🔟', changeIdx: 0, reelLetters: ['H', 'T', 'M', 'P', 'D'], hint: 'The number after nine' },
    { start: 'MAP', startEmoji: '🗺️', target: 'CAP', targetEmoji: '🧢', changeIdx: 0, reelLetters: ['M', 'C', 'N', 'T', 'L'], hint: 'A sporty hat with a visor' },
    { start: 'BED', startEmoji: '🛏️', target: 'RED', targetEmoji: '🔴', changeIdx: 0, reelLetters: ['B', 'R', 'L', 'F', 'W'], hint: 'Bright color of a strawberry' },
    { start: 'KING', startEmoji: '👑', target: 'RING', targetEmoji: '💍', changeIdx: 0, reelLetters: ['K', 'R', 'S', 'W', 'B'], hint: 'Shiny circle worn on a finger' },
    { start: 'FISH', startEmoji: '🐟', target: 'DISH', targetEmoji: '🍽️', changeIdx: 0, reelLetters: ['F', 'D', 'W', 'M', 'B'], hint: 'A plate for yummy dinner' }
  ]
};

// ==========================================
// 3. БАЗА ДАННЫХ ДЛЯ «БАРАБАНА СЛОГОВ» (24 слова: по 6 на 1, 2, 3 и 4 слога)
// ==========================================
export const DRUM_WORDS_DATA = {
  ru: [
    { word: 'ДОМ', syllables: ['ДОМ'], emoji: '🏠' },
    { word: 'КОТ', syllables: ['КОТ'], emoji: '🐱' },
    { word: 'СЫР', syllables: ['СЫР'], emoji: '🧀' },
    { word: 'ШАР', syllables: ['ШАР'], emoji: '🎈' },
    { word: 'ЛЕВ', syllables: ['ЛЕВ'], emoji: '🦁' },
    { word: 'ЖУК', syllables: ['ЖУК'], emoji: '🪲' },
    { word: 'МАМА', syllables: ['МА', 'МА'], emoji: '👩' },
    { word: 'ЛИСА', syllables: ['ЛИ', 'СА'], emoji: '🦊' },
    { word: 'ЛУНА', syllables: ['ЛУ', 'НА'], emoji: '🌙' },
    { word: 'РЫБА', syllables: ['РЫ', 'БА'], emoji: '🐟' },
    { word: 'СОВА', syllables: ['СО', 'ВА'], emoji: '🦉' },
    { word: 'КОЗА', syllables: ['КО', 'ЗА'], emoji: '🐐' },
    { word: 'РАКЕТА', syllables: ['РА', 'КЕ', 'ТА'], emoji: '🚀' },
    { word: 'МАШИНА', syllables: ['МА', 'ШИ', 'НА'], emoji: '🚗' },
    { word: 'СОБАКА', syllables: ['СО', 'БА', 'КА'], emoji: '🐶' },
    { word: 'КОРОВА', syllables: ['КО', 'РО', 'ВА'], emoji: '🐄' },
    { word: 'РАДУГА', syllables: ['РА', 'ДУ', 'ГА'], emoji: '🌈' },
    { word: 'МАЛИНА', syllables: ['МА', 'ЛИ', 'НА'], emoji: '🫐' },
    { word: 'ЧЕРЕПАХА', syllables: ['ЧЕ', 'РЕ', 'ПА', 'ХА'], emoji: '🐢' },
    { word: 'ПИРАМИДА', syllables: ['ПИ', 'РА', 'МИ', 'ДА'], emoji: '🔺' },
    { word: 'ВЕЛОСИПЕД', syllables: ['ВЕ', 'ЛО', 'СИ', 'ПЕД'], emoji: '🚲' },
    { word: 'МАКАРОНЫ', syllables: ['МА', 'КА', 'РО', 'НЫ'], emoji: '🍝' },
    { word: 'БУРАТИНО', syllables: ['БУ', 'РА', 'ТИ', 'НО'], emoji: '🤥' },
    { word: 'КАПИБАРА', syllables: ['КА', 'ПИ', 'БА', 'РА'], emoji: '🦫' }
  ],
  pl: [
    { word: 'KOT', syllables: ['KOT'], emoji: '🐱' },
    { word: 'DOM', syllables: ['DOM'], emoji: '🏠' },
    { word: 'SER', syllables: ['SER'], emoji: '🧀' },
    { word: 'LEW', syllables: ['LEW'], emoji: '🦁' },
    { word: 'NOS', syllables: ['NOS'], emoji: '👃' },
    { word: 'RAK', syllables: ['RAK'], emoji: '🦞' },
    { word: 'MAMA', syllables: ['MA', 'MA'], emoji: '👩' },
    { word: 'RYBA', syllables: ['RY', 'BA'], emoji: '🐟' },
    { word: 'SOWA', syllables: ['SO', 'WA'], emoji: '🦉' },
    { word: 'ŻABA', syllables: ['ŻA', 'BA'], emoji: '🐸' },
    { word: 'KROWA', syllables: ['KRO', 'WA'], emoji: '🐄' },
    { word: 'TĘCZA', syllables: ['TĘ', 'CZA'], emoji: '🌈' },
    { word: 'RAKIETA', syllables: ['RA', 'KIE', 'TA'], emoji: '🚀' },
    { word: 'SAMOLOT', syllables: ['SA', 'MO', 'LOT'], emoji: '✈️' },
    { word: 'POMIDOR', syllables: ['PO', 'MI', 'DOR'], emoji: '🍅' },
    { word: 'MALINA', syllables: ['MA', 'LI', 'NA'], emoji: '🫐' },
    { word: 'ŻYRAFA', syllables: ['ŻY', 'RA', 'FA'], emoji: '🦒' },
    { word: 'SAMOCHÓD', syllables: ['SA', 'MO', 'CHÓD'], emoji: '🚗' },
    { word: 'CZEKOLADA', syllables: ['CZE', 'KO', 'LA', 'DA'], emoji: '🍫' },
    { word: 'POMARAŃCZA', syllables: ['PO', 'MA', 'RAŃ', 'CZA'], emoji: '🍊' },
    { word: 'HELIKOPTER', syllables: ['HE', 'LI', 'KOP', 'TER'], emoji: '🚁' },
    { word: 'WINOGRONA', syllables: ['WI', 'NO', 'GRO', 'NA'], emoji: '🍇' },
    { word: 'TELEWIZOR', syllables: ['TE', 'LE', 'WI', 'ZOR'], emoji: '📺' },
    { word: 'PARASOLKA', syllables: ['PA', 'RA', 'SOL', 'KA'], emoji: '☂️' }
  ],
  en: [
    { word: 'CAT', syllables: ['CAT'], emoji: '🐱' },
    { word: 'DOG', syllables: ['DOG'], emoji: '🐶' },
    { word: 'SUN', syllables: ['SUN'], emoji: '☀️' },
    { word: 'BUS', syllables: ['BUS'], emoji: '🚌' },
    { word: 'FOX', syllables: ['FOX'], emoji: '🦊' },
    { word: 'HAT', syllables: ['HAT'], emoji: '👒' },
    { word: 'PANDA', syllables: ['PAN', 'DA'], emoji: '🐼' },
    { word: 'ROBOT', syllables: ['RO', 'BOT'], emoji: '🤖' },
    { word: 'LEMON', syllables: ['LE', 'MON'], emoji: '🍋' },
    { word: 'RABBIT', syllables: ['RAB', 'BIT'], emoji: '🐰' },
    { word: 'ROCKET', syllables: ['ROCK', 'ET'], emoji: '🚀' },
    { word: 'TIGER', syllables: ['TI', 'GER'], emoji: '🐯' },
    { word: 'BANANA', syllables: ['BA', 'NA', 'NA'], emoji: '🍌' },
    { word: 'TOMATO', syllables: ['TO', 'MA', 'TO'], emoji: '🍅' },
    { word: 'ELEPHANT', syllables: ['EL', 'E', 'PHANT'], emoji: '🐘' },
    { word: 'KANGAROO', syllables: ['KAN', 'GA', 'ROO'], emoji: '🦘' },
    { word: 'UMBRELLA', syllables: ['UM', 'BREL', 'LA'], emoji: '☂️' },
    { word: 'DINOSAUR', syllables: ['DI', 'NO', 'SAUR'], emoji: '🦕' },
    { word: 'WATERMELON', syllables: ['WA', 'TER', 'MEL', 'ON'], emoji: '🍉' },
    { word: 'CATERPILLAR', syllables: ['CAT', 'ER', 'PIL', 'LAR'], emoji: '🐛' },
    { word: 'HELICOPTER', syllables: ['HEL', 'I', 'COP', 'TER'], emoji: '🚁' },
    { word: 'ALLIGATOR', syllables: ['AL', 'LI', 'GA', 'TOR'], emoji: '🐊' },
    { word: 'AVOCADO', syllables: ['AV', 'O', 'CA', 'DO'], emoji: '🥑' },
    { word: 'SALAMANDER', syllables: ['SAL', 'A', 'MAN', 'DER'], emoji: '🦎' }
  ]
};

// ==========================================
// 4. АСИММЕТРИЧНЫЕ БУКВЫ ДЛЯ «БУКВ-ШАЛУНИШЕК»
// ==========================================
export const MIRROR_LETTERS = {
  ru: ['Б', 'В', 'Г', 'Е', 'Ё', 'З', 'И', 'Й', 'К', 'Р', 'С', 'У', 'Ц', 'Ч', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
  pl: ['B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'J', 'K', 'L', 'Ł', 'N', 'Ń', 'P', 'R', 'S', 'Ś', 'Z', 'Ź', 'Ż'],
  en: ['B', 'C', 'D', 'E', 'F', 'G', 'J', 'K', 'L', 'N', 'P', 'Q', 'R', 'S', 'Z']
};

export const UPSIDE_DOWN_SAFE = {
  ru: ['Б', 'Г', 'Й', 'Р', 'У', 'Ц', 'Ч', 'Щ', 'Ъ', 'Ы', 'Ь', 'Я'],
  pl: ['F', 'G', 'J', 'L', 'Ł', 'N', 'Ń', 'P', 'R', 'S', 'Ś', 'Z', 'Ź', 'Ż'],
  en: ['F', 'G', 'J', 'L', 'N', 'P', 'Q', 'R', 'S', 'Z']
};

const RIBBON_COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

const LAB_TEXT = {
  ru: {
    games: [
      { id: 'trace', icon: '✏️', label: 'Прописи' },
      { id: 'blend', icon: '🚂', label: 'Магнит' },
      { id: 'strings', icon: '🪢', label: 'Ниточки' },
      { id: 'reel', icon: '🎰', label: 'Барабан слов' },
      { id: 'drum', icon: '🥁', label: 'Слоги-ритм' },
      { id: 'mirror', icon: '🪞', label: 'Шалунишки' }
    ],
    traceTitle: 'Прописи: обведи букву пальцем или мышкой',
    blendTitle: 'Магнит слогов: перевези согласную к гласной!',
    blendHint: 'Тяни паровозик по рельсам направо или нажми на станцию справа!',
    blendDone: (syl, word, emoji) => `🎉 Слилось в ${syl}! Слово: ${emoji} ${word}`,
    blendRailHint: 'Тяни-и-и...',
    stringsTitle: 'Ниточки-дорожки: соедини половинки!',
    stringsModeSyl: '🧩 Слог + Слог',
    stringsModePic: '🖼️ Картинка + Начало',
    stringsHint: 'Проведи ниточку пальцем от левой карточки к правой (или нажми по очереди)!',
    stringsWin: '🎉 Все ниточки соединены правильно! +2 ⭐',
    stringsNext: 'Новые карточки ➡️',
    reelTitle: 'Волшебный барабан: преврати слово за 1 шаг!',
    reelFromLabel: 'Было:',
    reelTargetLabel: 'Преврати в:',
    reelCheck: '✨ Проверить!',
    reelWin: (a, b) => `🎉 Волшебство! ${a} превратилось в ${b}! +1 ⭐`,
    reelTry: (got) => `Получилось «${got}». Покрути букву ещё чуть-чуть!`,
    reelUpLabel: 'Предыдущая буква',
    reelDownLabel: 'Следующая буква',
    drumTitle: 'Барабан слогов: прохлопай ритм слова!',
    drumBeatBtn: 'БАМ! Ударь слог',
    drumReset: '↺ Сбросить',
    drumCheck: '✅ Проверить!',
    drumBeatsLabel: 'Ударов:',
    drumTapFirst: 'Сначала ударь по барабану на каждый слог! 🥁',
    drumTryAgain: (got) => `Ты ударил ${got}. Произнеси слово медленно по слогам и попробуй ещё! 👏`,
    drumWin: (split, countLabel) => `🎉 Суперритм! ${split} — ${countLabel}! +1 ⭐`,
    mirrorTitle: 'Буквы-шалунишки: переверни перевёрнутые буквы!',
    mirrorSingle: '🪞 Одна буква',
    mirrorMix: '🎲 Микс',
    mirrorCount: (done) => `Починено букв: ${done} / 4`,
    mirrorHint: 'Найди 4 буквы, которые смотрят не в ту сторону, и нажми на них!',
    mirrorAlreadyRight: 'Эта буква уже стоит правильно! Ищи перевёрнутые 😉',
    mirrorWin: '🎉 Все шалунишки пойманы и исправлены! +2 ⭐',
    nextBtn: 'Дальше ➡️'
  },
  pl: {
    games: [
      { id: 'trace', icon: '✏️', label: 'Pisanie' },
      { id: 'blend', icon: '🚂', label: 'Magnes' },
      { id: 'strings', icon: '🪢', label: 'Nitki' },
      { id: 'reel', icon: '🎰', label: 'Bęben słów' },
      { id: 'drum', icon: '🥁', label: 'Sylaby-rytm' },
      { id: 'mirror', icon: '🪞', label: 'Psotniki' }
    ],
    traceTitle: 'Pisanie: obrysuj literę palcem lub myszką',
    blendTitle: 'Magnes sylab: dowieź spółgłoskę do samogłoski!',
    blendHint: 'Przeciągnij lokomotywę po torach w prawo albo kliknij stację po prawej!',
    blendDone: (syl, word, emoji) => `🎉 Połączono w ${syl}! Słowo: ${emoji} ${word}`,
    blendRailHint: 'Cią-ą-ągnij...',
    stringsTitle: 'Nitki: połącz pasujące połówki!',
    stringsModeSyl: '🧩 Sylaba + Sylaba',
    stringsModePic: '🖼️ Obrazek + Początek',
    stringsHint: 'Przeciągnij nitkę od lewej karty do prawej (albo kliknij po kolei)!',
    stringsWin: '🎉 Wszystkie nitki połączone! +2 ⭐',
    stringsNext: 'Nowe karty ➡️',
    reelTitle: 'Magiczny bęben: zamień słowo jedną literą!',
    reelFromLabel: 'Było:',
    reelTargetLabel: 'Zamień na:',
    reelCheck: '✨ Sprawdź!',
    reelWin: (a, b) => `🎉 Czary! ${a} zmieniło się w ${b}! +1 ⭐`,
    reelTry: (got) => `Wyszło „${got}”. Pokręć literą jeszcze raz!`,
    reelUpLabel: 'Poprzednia litera',
    reelDownLabel: 'Następna litera',
    drumTitle: 'Bębenek sylab: wystukaj rytm słowa!',
    drumBeatBtn: 'BAM! Uderz sylabę',
    drumReset: '↺ Od nowa',
    drumCheck: '✅ Sprawdź!',
    drumBeatsLabel: 'Uderzeń:',
    drumTapFirst: 'Najpierw uderz w bębenek na każdą sylabę! 🥁',
    drumTryAgain: (got) => `Uderzyłeś ${got}. Powiedz słowo powoli sylabami i spróbuj znów! 👏`,
    drumWin: (split, countLabel) => `🎉 Super rytm! ${split} — ${countLabel}! +1 ⭐`,
    mirrorTitle: 'Psotne litery: odwróć lustrzane litery!',
    mirrorSingle: '🪞 Jedna litera',
    mirrorMix: '🎲 Miks',
    mirrorCount: (done) => `Naprawione litery: ${done} / 4`,
    mirrorHint: 'Znajdź 4 odwrócone litery i kliknij je, aby stanęły prosto!',
    mirrorAlreadyRight: 'Ta litera już stoi dobrze! Szukaj odwróconych 😉',
    mirrorWin: '🎉 Wszystkie psotnice naprawione! +2 ⭐',
    nextBtn: 'Dalej ➡️'
  },
  en: {
    games: [
      { id: 'trace', icon: '✏️', label: 'Tracing' },
      { id: 'blend', icon: '🚂', label: 'Blend Train' },
      { id: 'strings', icon: '🪢', label: 'Connect' },
      { id: 'reel', icon: '🎰', label: 'Word Wheel' },
      { id: 'drum', icon: '🥁', label: 'Syllable Drum' },
      { id: 'mirror', icon: '🪞', label: 'Mirror Fix' }
    ],
    traceTitle: 'Letter Tracing: follow the dotted shape!',
    blendTitle: 'Blending Train: slide consonant to vowel!',
    blendHint: 'Drag the engine along the track to the right, or tap a vowel station!',
    blendDone: (syl, word, emoji) => `🎉 Blended ${syl}! Word: ${emoji} ${word}`,
    blendRailHint: 'Slide-e-e...',
    stringsTitle: 'Thread Connect: join matching halves!',
    stringsModeSyl: '🧩 Syllable + Syllable',
    stringsModePic: '🖼️ Picture + Start',
    stringsHint: 'Drag a ribbon from a left card to a right card (or tap one after the other)!',
    stringsWin: '🎉 All pairs connected! +2 ⭐',
    stringsNext: 'More Cards ➡️',
    reelTitle: 'Magic Word Wheel: spin 1 letter to morph the word!',
    reelFromLabel: 'Start:',
    reelTargetLabel: 'Turn into:',
    reelCheck: '✨ Check!',
    reelWin: (a, b) => `🎉 Magic! ${a} turned into ${b}! +1 ⭐`,
    reelTry: (got) => `That spells "${got}". Spin the letter a little more!`,
    reelUpLabel: 'Previous letter',
    reelDownLabel: 'Next letter',
    drumTitle: 'Syllable Drum: tap out each syllable beat!',
    drumBeatBtn: 'TAP! Beat Syllable',
    drumReset: '↺ Reset',
    drumCheck: '✅ Check!',
    drumBeatsLabel: 'Beats:',
    drumTapFirst: 'Tap the drum once for each syllable first! 🥁',
    drumTryAgain: (got) => `You tapped ${got}. Say the word slowly and clap each beat! 👏`,
    drumWin: (split, countLabel) => `🎉 Awesome beat! ${split} — ${countLabel}! +1 ⭐`,
    mirrorTitle: 'Mirror Mischief: tap backwards letters to flip them right!',
    mirrorSingle: '🪞 One Letter',
    mirrorMix: '🎲 Mix',
    mirrorCount: (done) => `Letters fixed: ${done} / 4`,
    mirrorHint: 'Spot the 4 flipped letters and tap them to turn upright!',
    mirrorAlreadyRight: 'That letter is already upright! Find the flipped ones 😉',
    mirrorWin: '🎉 All backwards letters fixed! +2 ⭐',
    nextBtn: 'Next ➡️'
  }
};

export function formatSyllableCount(count, lang = 'ru') {
  if (lang === 'ru') {
    if (count === 1) return '1 слог';
    if (count >= 2 && count <= 4) return `${count} слога`;
    return `${count} слогов`;
  }
  if (lang === 'pl') {
    if (count === 1) return '1 sylaba';
    if (count >= 2 && count <= 4) return `${count} sylaby`;
    return `${count} sylab`;
  }
  return count === 1 ? '1 syllable' : `${count} syllables`;
}

// Семплер 4 бесконфликтных пар из двусложных слов (никакие два слова не делят левую или правую часть)
export function pickConflictFreePairs(lang = 'ru', count = 4) {
  const source = (SYLLABLE_WORDS_DATA[lang] || []).filter(
    item => Array.isArray(item.syllables) && item.syllables.length === 2
  );
  for (let attempt = 0; attempt < 24; attempt++) {
    const shuffled = shuffleArray(source);
    const chosen = [];
    const usedLeft = new Set();
    const usedRight = new Set();
    const usedEmojis = new Set();
    const usedWords = new Set();

    for (const item of shuffled) {
      const left = item.syllables[0];
      const right = item.syllables[1];
      if (!left || !right) continue;
      if (usedLeft.has(left) || usedRight.has(right) || usedEmojis.has(item.emoji) || usedWords.has(item.word)) {
        continue;
      }
      chosen.push(item);
      usedLeft.add(left);
      usedRight.add(right);
      usedEmojis.add(item.emoji);
      usedWords.add(item.word);
      if (chosen.length === count) return chosen;
    }
  }
  return shuffleArray(source).slice(0, count);
}

export class PracticeLabGame {
  constructor(options = {}) {
    this.container = options.container;
    this.lang = options.lang || 'ru';
    this.onStarEarned = options.onStarEarned || (() => {});
    this.onWinEffect = options.onWinEffect || (() => {});

    this.showTabs = options.showTabs !== false;
    this.gameMode = options.initialMode || 'trace'; // 'trace' | 'blend' | 'strings' | 'reel' | 'drum' | 'mirror'

    // 1. Tracing state
    this.tracer = null;
    this.traceLetterIdx = 0;
    this.traceRewardedSession = new Set();

    // 2. Blending train state
    this.blendConsIdx = 0;
    this.blendPairIdx = 0;
    this.blendProgress = 0;
    this.blendCompleted = false;
    this.completedBlends = new Set();
    this.blendPhonemeSpoken = false;
    this.blendLeftSpokenAudio = false;

    // 3. Elastic strings state
    this.stringsSubMode = 'syllables'; // 'syllables' | 'pic_start'
    this.stringPairs = [];
    this.stringLeftOrder = [];
    this.stringRightOrder = [];
    this.stringMatches = new Map(); // pairIdx -> color
    this.stringSelected = null; // { side: 'left'|'right', pairIdx }
    this.stringWon = false;

    // 4. Word morph reel state
    this.reelDeck = [];
    this.reelDeckIdx = 0;
    this.reelWheelLetters = [];
    this.reelLetterIdx = 0;
    this.reelSolved = false;

    // 5. Syllable drum state
    this.drumDeck = [];
    this.drumDeckIdx = 0;
    this.drumBeats = 0;
    this.drumSolved = false;

    // 6. Mirror fixer state
    this.mirrorSubMode = 'single'; // 'single' | 'mix'
    this.mirrorTiles = [];
    this.mirrorFixedCount = 0;
    this.mirrorSolved = false;
    this.lastMirrorSingleLetter = '';

    // Timers and global listeners
    this.timers = new Set();
    this._onWindowResize = null;
    this._onWindowKeyDown = null;
  }

  addTimer(fn, delay) {
    const id = setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, delay);
    this.timers.add(id);
    return id;
  }

  clearAllTimers() {
    for (const id of this.timers) {
      clearTimeout(id);
    }
    this.timers.clear();
  }

  cleanupListeners() {
    if (this._onWindowResize && typeof window !== 'undefined') {
      window.removeEventListener('resize', this._onWindowResize);
      this._onWindowResize = null;
    }
    if (this._onWindowKeyDown && typeof window !== 'undefined') {
      window.removeEventListener('keydown', this._onWindowKeyDown);
      this._onWindowKeyDown = null;
    }
  }

  destroyTracer() {
    if (this.tracer) {
      this.tracer.destroy();
      this.tracer = null;
    }
  }

  stop() {
    this.clearAllTimers();
    this.cleanupListeners();
    this.destroyTracer();
  }

  announce(msg) {
    const el = this.container && this.container.querySelector('#pl-live-region');
    if (el) {
      el.textContent = msg;
    }
  }

  getCopy() {
    return LAB_TEXT[this.lang] || LAB_TEXT.ru;
  }

  setLanguage(lang) {
    this.stop();
    if (this.lang !== lang) {
      this.lang = lang;
      this.traceLetterIdx = 0;
      this.blendConsIdx = 0;
      this.blendPairIdx = 0;
      this.blendCompleted = false;
      this.blendPhonemeSpoken = false;
      this.blendLeftSpokenAudio = false;
      this.reelDeck = [];
      this.drumDeck = [];
      this.stringPairs = [];
      this.mirrorTiles = [];
      this.lastMirrorSingleLetter = '';
    }
    this.start();
  }

  start() {
    this.stop();
    this.ensureGameState();
    this.render();
  }

  switchGame(mode) {
    if (this.gameMode === mode) return;
    this.stop();
    sound.stopSpeech();
    sound.playLetterClick();
    this.gameMode = mode;
    this.ensureGameState();
    this.render();
  }

  openMode(mode) {
    this.stop();
    this.gameMode = mode;
    this.ensureGameState();
    this.render();
  }

  ensureGameState() {
    if (this.gameMode === 'blend') {
      this.blendProgress = 0;
      this.blendCompleted = false;
      this.blendPhonemeSpoken = false;
    } else if (this.gameMode === 'strings' && this.stringPairs.length === 0) {
      this.prepareStringsRound();
    } else if (this.gameMode === 'reel' && this.reelDeck.length === 0) {
      this.prepareReelDeck();
    } else if (this.gameMode === 'drum' && this.drumDeck.length === 0) {
      this.prepareDrumDeck();
    } else if (this.gameMode === 'mirror' && this.mirrorTiles.length === 0) {
      this.prepareMirrorRound();
    }
  }

  render() {
    if (!this.container) return;
    this.cleanupListeners();
    this.destroyTracer();

    const copy = this.getCopy();
    let bodyHTML = '';

    if (this.gameMode === 'trace') bodyHTML = this.renderTraceHTML();
    else if (this.gameMode === 'blend') bodyHTML = this.renderBlendHTML();
    else if (this.gameMode === 'strings') bodyHTML = this.renderStringsHTML();
    else if (this.gameMode === 'reel') bodyHTML = this.renderReelHTML();
    else if (this.gameMode === 'drum') bodyHTML = this.renderDrumHTML();
    else if (this.gameMode === 'mirror') bodyHTML = this.renderMirrorHTML();

    this.container.innerHTML = `
      <div class="pl-wrapper">
        <div class="sr-only" aria-live="polite" id="pl-live-region"></div>

        ${this.showTabs ? `
          <div class="pl-tabs" role="tablist" aria-label="Practice games">
            ${copy.games.map(g => `
              <button type="button"
                      role="tab"
                      aria-selected="${this.gameMode === g.id ? 'true' : 'false'}"
                      class="pl-tab ${this.gameMode === g.id ? 'active' : ''}"
                      data-game="${g.id}">
                <span class="pl-tab-icon" aria-hidden="true">${g.icon}</span>
                <span class="pl-tab-lbl">${g.label}</span>
              </button>
            `).join('')}
          </div>
        ` : ''}

        <div class="pl-stage" id="pl-stage">
          ${bodyHTML}
        </div>
      </div>
    `;

    this.attachCommonEvents();
    if (this.gameMode === 'trace') this.mountTraceMode();
    else if (this.gameMode === 'blend') this.attachBlendEvents();
    else if (this.gameMode === 'strings') this.attachStringsEvents();
    else if (this.gameMode === 'reel') this.attachReelEvents();
    else if (this.gameMode === 'drum') this.attachDrumEvents();
    else if (this.gameMode === 'mirror') this.attachMirrorEvents();
  }

  attachCommonEvents() {
    this.container.querySelectorAll('.pl-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchGame(btn.dataset.game);
      });
    });
  }

  // ==========================================
  // ИГРА 1: ✏️ ПРОПИСИ
  // ==========================================
  renderTraceHTML() {
    const copy = this.getCopy();
    const list = getOrderedAlphabetData(this.lang, 'bukvar');
    const safeIdx = ((this.traceLetterIdx % list.length) + list.length) % list.length;
    this.traceLetterIdx = safeIdx;
    const current = list[safeIdx];
    const tracedSet = loadTracedLetters(this.lang);
    const prefs = loadTracerPrefs();
    const heroGlyph = prefs.letterCase === 'lower'
      ? current.letter.toLowerCase()
      : current.letter.toUpperCase();
    const heroCursiveCls = prefs.letterStyle === 'cursive' ? `is-cursive lang-${this.lang}` : '';

    return `
      <div class="pl-game-card">
        <h3 class="pl-game-title">✏️ ${copy.traceTitle}</h3>

        <div class="pl-trace-nav-row">
          <button type="button" class="pl-circle-btn" id="pl-trace-prev" aria-label="Previous letter">◀</button>
          <button type="button" class="pl-trace-hero sound-${current.soundType}" id="pl-trace-speak">
            <span class="pl-trace-big ${heroCursiveCls}" id="pl-trace-hero-glyph">${heroGlyph}</span>
            <span class="pl-trace-word">${current.emoji} ${current.word}</span>
            <span class="pl-trace-audio" aria-hidden="true">🔊</span>
          </button>
          <button type="button" class="pl-circle-btn" id="pl-trace-next" aria-label="Next letter">▶</button>
        </div>

        <div class="pl-trace-chips" role="list">
          ${list.map((item, idx) => {
            const done = tracedSet.has(item.letter.toUpperCase());
            return `
              <button type="button"
                      class="pl-chip ${idx === safeIdx ? 'active' : ''} ${done ? 'done' : ''} sound-${item.soundType}"
                      data-trace-idx="${idx}">
                ${item.letter}${done ? '<span class="pl-chip-chk">✓</span>' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <div id="pl-tracer-host"></div>
      </div>
    `;
  }

  mountTraceMode() {
    const list = getOrderedAlphabetData(this.lang, 'bukvar');
    const current = list[this.traceLetterIdx] || list[0];
    const host = this.container.querySelector('#pl-tracer-host');

    const prevBtn = this.container.querySelector('#pl-trace-prev');
    const nextBtn = this.container.querySelector('#pl-trace-next');
    const speakBtn = this.container.querySelector('#pl-trace-speak');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        sound.playLetterClick();
        this.traceLetterIdx = (this.traceLetterIdx - 1 + list.length) % list.length;
        this.render();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playLetterClick();
        this.traceLetterIdx = (this.traceLetterIdx + 1) % list.length;
        this.render();
      });
    }
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakPhoneme(current.letter, this.lang);
      });
    }

    this.container.querySelectorAll('[data-trace-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.traceIdx, 10);
        if (!Number.isNaN(idx) && idx !== this.traceLetterIdx) {
          sound.playLetterClick();
          this.traceLetterIdx = idx;
          this.render();
        }
      });
    });

    if (host) {
      this.tracer = new LetterTracer({
        container: host,
        letter: current.letter,
        lang: this.lang,
        compact: false,
        soundType: current.soundType,
        onModeChange: ({ letterStyle, glyph }) => {
          const heroEl = this.container.querySelector('#pl-trace-hero-glyph');
          if (!heroEl) return;
          heroEl.textContent = glyph;
          const isCursive = letterStyle === 'cursive';
          heroEl.classList.toggle('is-cursive', isCursive);
          heroEl.classList.toggle(`lang-${this.lang}`, isCursive);
        },
        onComplete: (ltr, meta = {}) => {
          const rewardKey = `${this.lang}_${ltr}_${meta.letterCase || 'upper'}_${meta.letterStyle || 'print'}`;
          if (!this.traceRewardedSession.has(rewardKey)) {
            this.traceRewardedSession.add(rewardKey);
            this.onStarEarned(1);
          }
          this.onWinEffect();
          const activeChip = this.container.querySelector(`[data-trace-idx="${this.traceLetterIdx}"]`);
          if (activeChip && !activeChip.classList.contains('done')) {
            activeChip.classList.add('done');
            activeChip.insertAdjacentHTML('beforeend', '<span class="pl-chip-chk">✓</span>');
          }
        }
      });
    }
  }

  // ==========================================
  // ИГРА 2: 🚂 МАГНИТ СЛОГОВ
  // ==========================================
  getBlendTrailText(leftChar, rightChar, syl, mode, progressPct, fused) {
    if (fused) {
      if (mode === 'vc') {
        return `${leftChar.toLowerCase().repeat(4)}...${rightChar.toLowerCase()} ➔ ${syl}!`;
      }
      if (getBlendStretchSound(leftChar, this.lang)) {
        return `${leftChar.toLowerCase().repeat(4)}...${rightChar.toLowerCase().repeat(4)} ➔ ${syl}!`;
      }
      return `${leftChar.toLowerCase()}${rightChar.toLowerCase().repeat(4)} ➔ ${syl}!`;
    }
    if (progressPct >= 0.12) {
      if (getBlendStretchSound(leftChar, this.lang)) {
        const count = Math.max(2, Math.min(6, Math.round(2 + progressPct * 5)));
        return `${leftChar.toLowerCase().repeat(count)}...`;
      }
      return `${leftChar} ➔ ${rightChar}...`;
    }
    return this.getCopy().blendRailHint;
  }

  renderBlendHTML() {
    const copy = this.getCopy();
    const sets = BLENDING_SETS[this.lang] || BLENDING_SETS.ru;
    const consIdx = Math.min(this.blendConsIdx, sets.length - 1);
    this.blendConsIdx = consIdx;
    const consObj = sets[consIdx];
    const pairIdx = Math.min(this.blendPairIdx, consObj.pairs.length - 1);
    this.blendPairIdx = pairIdx;
    const pair = consObj.pairs[pairIdx];
    const mode = consObj.mode || 'cv';
    const isVC = mode === 'vc';
    const leftChar = isVC ? pair.v : consObj.c;
    const rightChar = isVC ? consObj.c : pair.v;
    const initialRailText = this.blendCompleted
      ? this.getBlendTrailText(leftChar, rightChar, pair.syl, mode, 1, true)
      : copy.blendRailHint;

    return `
      <div class="pl-game-card">
        <h3 class="pl-game-title">🚂 ${copy.blendTitle}</h3>
        <p class="pl-game-sub">${copy.blendHint}</p>

        <div class="pl-cons-bar">
          ${sets.map((s, idx) => `
            <button type="button"
                    class="pl-pill-btn ${idx === consIdx ? 'active' : ''}"
                    data-blend-c="${idx}">
              ${s.c}
            </button>
          `).join('')}
        </div>

        <div class="pl-vowel-bar">
          ${consObj.pairs.map((p, idx) => {
            const done = this.completedBlends.has(`${this.lang}_${consObj.c}_${p.v}`);
            return `
              <button type="button"
                      class="pl-vowel-pill ${idx === pairIdx ? 'active' : ''} ${done ? 'done' : ''}"
                      data-blend-v="${idx}">
                ${p.v}${done ? ' ✓' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <div class="pl-blend-track ${this.blendCompleted ? 'is-fused' : ''}" id="pl-blend-track">
          <div class="pl-rail-line">
            <span class="pl-rail-whisper" id="pl-rail-whisper">${initialRailText}</span>
          </div>

          <button type="button"
                  class="pl-loco-handle ${isVC ? 'is-vowel' : ''}"
                  id="pl-loco-handle"
                  aria-label="${leftChar} → ${rightChar} (ArrowRight)">
            <span class="pl-loco-train" aria-hidden="true">🚂</span>
            <span class="pl-loco-letter">${leftChar}</span>
          </button>

          <button type="button"
                  class="pl-vowel-station ${isVC ? 'is-cons' : ''} ${this.blendCompleted ? 'fused' : ''}"
                  id="pl-vowel-station"
                  aria-label="${pair.syl}">
            ${this.blendCompleted ? `<span class="pl-fused-syl">${pair.syl}</span>` : `<span class="pl-station-vowel">${rightChar}</span>`}
          </button>
        </div>

        <div class="pl-blend-result ${this.blendCompleted ? 'visible' : ''}" id="pl-blend-result">
          ${this.blendCompleted ? `
            <button type="button" class="pl-reward-word-btn" id="pl-blend-word-btn" data-word="${pair.word.replace(/·/g, '')}">
              <span class="pl-rw-syl">${pair.syl}</span>
              <span class="pl-rw-arrow">➔</span>
              <span class="pl-rw-emoji">${pair.emoji}</span>
              <span class="pl-rw-word">${pair.word}</span>
              <span class="pl-rw-sound" aria-hidden="true">🔊</span>
            </button>
            <div class="pl-feedback-ok">${copy.blendDone(pair.syl, pair.word.replace(/·/g, ''), pair.emoji)}</div>
          ` : ''}
        </div>
      </div>
    `;
  }

  completeBlend(consObj, pair) {
    if (this.blendCompleted) return;
    this.blendCompleted = true;
    const copy = this.getCopy();
    const mode = consObj.mode || 'cv';
    const isVC = mode === 'vc';
    const leftChar = isVC ? pair.v : consObj.c;
    const rightChar = isVC ? consObj.c : pair.v;

    const track = this.container.querySelector('#pl-blend-track');
    const handle = this.container.querySelector('#pl-loco-handle');
    const station = this.container.querySelector('#pl-vowel-station');
    const whisper = this.container.querySelector('#pl-rail-whisper');
    const resultEl = this.container.querySelector('#pl-blend-result');

    if (whisper) {
      whisper.textContent = this.getBlendTrailText(leftChar, rightChar, pair.syl, mode, 1, true);
    }

    if (track && handle && station) {
      const maxTravel = Math.max(0, track.clientWidth - handle.offsetWidth - station.offsetWidth - 16);
      handle.style.transform = `translate3d(${maxTravel}px, 0, 0)`;
      track.classList.add('is-fused');
      station.classList.add('fused');
      station.innerHTML = `<span class="pl-fused-syl">${pair.syl}</span>`;
    }

    const blendKey = `${this.lang}_${consObj.c}_${pair.v}`;
    const isNew = !this.completedBlends.has(blendKey);
    if (isNew) {
      this.completedBlends.add(blendKey);
      this.onStarEarned(1);
    }
    this.onWinEffect();

    const alreadySpokeLeft = this.blendLeftSpokenAudio;
    sound.playSnap();
    this.addTimer(() => {
      sound.speakSyllableBlend({
        left: leftChar,
        right: rightChar,
        syl: pair.syl,
        lang: this.lang,
        mode,
        alreadySpokeLeft
      });
    }, 140);

    const activeVBtn = this.container.querySelector(`[data-blend-v="${this.blendPairIdx}"]`);
    if (activeVBtn && !activeVBtn.classList.contains('done')) {
      activeVBtn.classList.add('done');
      activeVBtn.textContent = `${pair.v} ✓`;
    }

    if (resultEl) {
      resultEl.classList.add('visible');
      resultEl.innerHTML = `
        <button type="button" class="pl-reward-word-btn" id="pl-blend-word-btn" data-word="${pair.word.replace(/·/g, '')}">
          <span class="pl-rw-syl">${pair.syl}</span>
          <span class="pl-rw-arrow">➔</span>
          <span class="pl-rw-emoji">${pair.emoji}</span>
          <span class="pl-rw-word">${pair.word}</span>
          <span class="pl-rw-sound" aria-hidden="true">🔊</span>
        </button>
        <div class="pl-feedback-ok">${copy.blendDone(pair.syl, pair.word.replace(/·/g, ''), pair.emoji)}</div>
      `;
      const wordBtn = resultEl.querySelector('#pl-blend-word-btn');
      if (wordBtn) {
        wordBtn.addEventListener('click', () => {
          sound.playLetterClick();
          sound.speakWord(wordBtn.dataset.word, this.lang);
        });
      }
    }

    this.announce(`${pair.syl}. ${pair.word.replace(/·/g, '')}`);
  }

  attachBlendEvents() {
    const copy = this.getCopy();
    const sets = BLENDING_SETS[this.lang] || BLENDING_SETS.ru;
    const consObj = sets[this.blendConsIdx] || sets[0];
    const pair = consObj.pairs[this.blendPairIdx] || consObj.pairs[0];
    const mode = consObj.mode || 'cv';
    const isVC = mode === 'vc';
    const leftChar = isVC ? pair.v : consObj.c;
    const rightChar = isVC ? consObj.c : pair.v;

    this.container.querySelectorAll('[data-blend-c]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.stopSpeech();
        sound.playLetterClick();
        this.blendConsIdx = parseInt(btn.dataset.blendC, 10) || 0;
        this.blendPairIdx = 0;
        this.blendCompleted = false;
        this.blendPhonemeSpoken = false;
        this.blendLeftSpokenAudio = false;
        this.render();
      });
    });

    this.container.querySelectorAll('[data-blend-v]').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.stopSpeech();
        sound.playLetterClick();
        this.blendPairIdx = parseInt(btn.dataset.blendV, 10) || 0;
        this.blendCompleted = false;
        this.blendPhonemeSpoken = false;
        this.blendLeftSpokenAudio = false;
        this.render();
      });
    });

    const wordBtn = this.container.querySelector('#pl-blend-word-btn');
    if (wordBtn) {
      wordBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(wordBtn.dataset.word, this.lang);
      });
    }

    const track = this.container.querySelector('#pl-blend-track');
    const handle = this.container.querySelector('#pl-loco-handle');
    const station = this.container.querySelector('#pl-vowel-station');
    if (!track || !handle || !station) return;

    const getMaxTravel = () => Math.max(10, track.clientWidth - handle.offsetWidth - station.offsetWidth - 16);

    const snapOrFinish = () => {
      if (!this.blendCompleted) {
        this.completeBlend(consObj, pair);
      } else {
        sound.playLetterClick();
        sound.speakSyllableBlend({
          left: leftChar,
          right: rightChar,
          syl: pair.syl,
          lang: this.lang,
          mode,
          alreadySpokeLeft: false
        });
      }
    };

    station.addEventListener('click', snapOrFinish);

    handle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        snapOrFinish();
      }
    });

    let dragActive = false;
    let pointerId = null;
    let startX = 0;
    let moved = false;

    const resetEarlyDrag = () => {
      handle.style.transform = 'translate3d(0px, 0, 0)';
      this.blendPhonemeSpoken = false;
      this.blendLeftSpokenAudio = false;
      const whisper = this.container.querySelector('#pl-rail-whisper');
      if (whisper) whisper.textContent = copy.blendRailHint;
      sound.stopSpeech();
    };

    handle.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (this.blendCompleted) {
        sound.speakSyllableBlend({
          left: leftChar,
          right: rightChar,
          syl: pair.syl,
          lang: this.lang,
          mode,
          alreadySpokeLeft: false
        });
        return;
      }
      e.preventDefault();
      dragActive = true;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      try {
        handle.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    handle.addEventListener('pointermove', (e) => {
      if (!dragActive || pointerId !== e.pointerId || this.blendCompleted) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) >= 4) {
        moved = true;
        handle.classList.add('dragging');
      }
      if (!moved) return;

      const maxTravel = getMaxTravel();
      const clampedX = Math.max(0, Math.min(maxTravel, dx));
      handle.style.transform = `translate3d(${clampedX}px, 0, 0)`;

      const pct = maxTravel > 0 ? clampedX / maxTravel : 0;
      const whisper = this.container.querySelector('#pl-rail-whisper');
      if (whisper) {
        whisper.textContent = this.getBlendTrailText(leftChar, rightChar, pair.syl, mode, pct, false);
      }

      if (pct >= 0.12 && !this.blendPhonemeSpoken) {
        this.blendPhonemeSpoken = true;
        this.blendLeftSpokenAudio = sound.speakBlendStart(leftChar, this.lang);
      }
      if (pct >= 0.78) {
        dragActive = false;
        handle.classList.remove('dragging');
        this.completeBlend(consObj, pair);
      }
    });

    const endDrag = (e) => {
      if (!dragActive || (e && e.pointerId !== undefined && pointerId !== e.pointerId)) return;
      dragActive = false;
      handle.classList.remove('dragging');
      if (!moved) {
        sound.playLetterClick();
        const spoke = sound.speakBlendStart(leftChar, this.lang);
        if (!spoke) sound.speakLetter(leftChar, this.lang);
      } else if (!this.blendCompleted) {
        resetEarlyDrag();
      }
    };

    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
    handle.addEventListener('lostpointercapture', () => {
      if (dragActive) {
        dragActive = false;
        handle.classList.remove('dragging');
        if (!this.blendCompleted) {
          resetEarlyDrag();
        }
      }
    });
  }

  // ==========================================
  // ИГРА 3: 🪢 НИТОЧКИ-ДОРОЖКИ
  // ==========================================
  prepareStringsRound() {
    this.stringPairs = pickConflictFreePairs(this.lang, 4);
    this.stringLeftOrder = shuffleArray(this.stringPairs.map((_, i) => i));
    let rightOrder = shuffleArray(this.stringPairs.map((_, i) => i));
    if (rightOrder.every((val, pos) => val === this.stringLeftOrder[pos]) && rightOrder.length > 1) {
      [rightOrder[0], rightOrder[1]] = [rightOrder[1], rightOrder[0]];
    }
    this.stringRightOrder = rightOrder;
    this.stringMatches = new Map();
    this.stringSelected = null;
    this.stringWon = false;
  }

  renderStringsHTML() {
    const copy = this.getCopy();
    if (this.stringPairs.length === 0) {
      this.prepareStringsRound();
    }

    const isPicMode = this.stringsSubMode === 'pic_start';

    return `
      <div class="pl-game-card">
        <h3 class="pl-game-title">🪢 ${copy.stringsTitle}</h3>
        <div class="pl-mode-toggle">
          <button type="button" class="pl-pill-btn ${!isPicMode ? 'active' : ''}" id="pl-str-mode-syl">${copy.stringsModeSyl}</button>
          <button type="button" class="pl-pill-btn ${isPicMode ? 'active' : ''}" id="pl-str-mode-pic">${copy.stringsModePic}</button>
        </div>
        <p class="pl-game-sub">${copy.stringsHint}</p>

        <div class="pl-strings-board" id="pl-strings-board">
          <svg class="pl-strings-svg" id="pl-strings-svg" aria-hidden="true"></svg>

          <div class="pl-strings-col pl-strings-left">
            ${this.stringLeftOrder.map(pairIdx => {
              const pair = this.stringPairs[pairIdx];
              const isMatched = this.stringMatches.has(pairIdx);
              const color = isMatched ? this.stringMatches.get(pairIdx) : '';
              const isSelected = this.stringSelected && this.stringSelected.side === 'left' && this.stringSelected.pairIdx === pairIdx;
              return `
                <button type="button"
                        class="pl-str-card ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                        data-side="left"
                        data-pair-idx="${pairIdx}"
                        style="${isMatched ? `--str-color: ${color};` : ''}">
                  <span class="pl-str-content">
                    ${isPicMode ? `<span class="pl-str-emoji">${pair.emoji}</span>` : `<span class="pl-str-text">${pair.syllables[0]}</span>`}
                    ${isMatched && !isPicMode ? `<span class="pl-str-revealed">${pair.emoji}</span>` : ''}
                  </span>
                  <span class="pl-str-pin" aria-hidden="true">●</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="pl-strings-col pl-strings-right">
            ${this.stringRightOrder.map(pairIdx => {
              const pair = this.stringPairs[pairIdx];
              const isMatched = this.stringMatches.has(pairIdx);
              const color = isMatched ? this.stringMatches.get(pairIdx) : '';
              const isSelected = this.stringSelected && this.stringSelected.side === 'right' && this.stringSelected.pairIdx === pairIdx;
              const rightLabel = isPicMode ? pair.syllables[0] : pair.syllables[1];
              return `
                <button type="button"
                        class="pl-str-card ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                        data-side="right"
                        data-pair-idx="${pairIdx}"
                        style="${isMatched ? `--str-color: ${color};` : ''}">
                  <span class="pl-str-pin" aria-hidden="true">●</span>
                  <span class="pl-str-content">
                    <span class="pl-str-text">${rightLabel}</span>
                    ${isMatched ? `<span class="pl-str-fullword">${pair.word}</span>` : ''}
                  </span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="pl-strings-footer" id="pl-strings-footer">
          ${this.stringWon ? `
            <div class="pl-feedback-ok">${copy.stringsWin}</div>
            <button type="button" class="pl-primary-btn" id="pl-str-next">${copy.stringsNext}</button>
          ` : ''}
        </div>
      </div>
    `;
  }

  getPinCenterInBoard(cardEl, boardRect) {
    const pinEl = cardEl.querySelector('.pl-str-pin') || cardEl;
    const pr = pinEl.getBoundingClientRect();
    return {
      x: pr.left + pr.width / 2 - boardRect.left,
      y: pr.top + pr.height / 2 - boardRect.top
    };
  }

  buildBezierPath(p1, p2) {
    const dx = Math.abs(p2.x - p1.x);
    const offset = Math.max(36, dx * 0.45);
    const c1x = p1.x <= p2.x ? p1.x + offset : p1.x - offset;
    const c2x = p1.x <= p2.x ? p2.x - offset : p2.x + offset;
    return `M ${p1.x} ${p1.y} C ${c1x} ${p1.y}, ${c2x} ${p2.y}, ${p2.x} ${p2.y}`;
  }

  redrawStringsSVG(liveDrag = null) {
    const board = this.container && this.container.querySelector('#pl-strings-board');
    const svg = this.container && this.container.querySelector('#pl-strings-svg');
    if (!board || !svg) return;

    const boardRect = board.getBoundingClientRect();
    if (boardRect.width === 0 || boardRect.height === 0) return;

    svg.setAttribute('viewBox', `0 0 ${boardRect.width} ${boardRect.height}`);

    const paths = [];
    this.stringMatches.forEach((color, pairIdx) => {
      const leftCard = board.querySelector(`.pl-str-card[data-side="left"][data-pair-idx="${pairIdx}"]`);
      const rightCard = board.querySelector(`.pl-str-card[data-side="right"][data-pair-idx="${pairIdx}"]`);
      if (leftCard && rightCard) {
        const p1 = this.getPinCenterInBoard(leftCard, boardRect);
        const p2 = this.getPinCenterInBoard(rightCard, boardRect);
        paths.push(`<path class="pl-str-path locked" d="${this.buildBezierPath(p1, p2)}" stroke="${color}" />`);
      }
    });

    if (liveDrag) {
      paths.push(`<path class="pl-str-path preview" d="${this.buildBezierPath(liveDrag.start, liveDrag.current)}" stroke="${liveDrag.color}" />`);
    }

    svg.innerHTML = paths.join('');
  }

  tryConnectStrings(pairIdxA, sideA, pairIdxB, sideB) {
    if (sideA === sideB) return false;
    if (this.stringMatches.has(pairIdxA)) return false;

    const board = this.container.querySelector('#pl-strings-board');
    if (pairIdxA === pairIdxB) {
      const pair = this.stringPairs[pairIdxA];
      const color = RIBBON_COLORS[pairIdxA % RIBBON_COLORS.length];
      this.stringMatches.set(pairIdxA, color);
      this.stringSelected = null;

      sound.playSnap();
      sound.speakWord(pair.word, this.lang);

      if (this.stringMatches.size >= this.stringPairs.length && !this.stringWon) {
        this.stringWon = true;
        this.onStarEarned(2);
        this.onWinEffect();
        this.addTimer(() => {
          sound.playSuccess();
        }, 220);
      }

      this.render();
      return true;
    }

    // Ошибка соединения
    sound.playError();
    this.stringSelected = null;
    if (board) {
      const cardA = board.querySelector(`.pl-str-card[data-side="${sideA}"][data-pair-idx="${pairIdxA}"]`);
      const cardB = board.querySelector(`.pl-str-card[data-side="${sideB}"][data-pair-idx="${pairIdxB}"]`);
      [cardA, cardB].forEach(c => {
        if (c) {
          c.classList.remove('selected');
          c.classList.add('wrong');
          this.addTimer(() => c.classList.remove('wrong'), 450);
        }
      });
    }
    return false;
  }

  attachStringsEvents() {
    const btnSyl = this.container.querySelector('#pl-str-mode-syl');
    const btnPic = this.container.querySelector('#pl-str-mode-pic');
    const nextBtn = this.container.querySelector('#pl-str-next');

    if (btnSyl) {
      btnSyl.addEventListener('click', () => {
        if (this.stringsSubMode === 'syllables') return;
        sound.playLetterClick();
        this.stringsSubMode = 'syllables';
        this.prepareStringsRound();
        this.render();
      });
    }
    if (btnPic) {
      btnPic.addEventListener('click', () => {
        if (this.stringsSubMode === 'pic_start') return;
        sound.playLetterClick();
        this.stringsSubMode = 'pic_start';
        this.prepareStringsRound();
        this.render();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playLetterClick();
        this.prepareStringsRound();
        this.render();
      });
    }

    const board = this.container.querySelector('#pl-strings-board');
    if (!board) return;

    this.redrawStringsSVG();
    if (typeof window !== 'undefined') {
      this._onWindowResize = () => this.redrawStringsSVG();
      window.addEventListener('resize', this._onWindowResize);
    }

    let dragInfo = null;

    board.querySelectorAll('.pl-str-card').forEach(card => {
      const side = card.dataset.side;
      const pairIdx = parseInt(card.dataset.pairIdx, 10);

      card.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (this.stringMatches.has(pairIdx) || this.stringWon) return;

        e.preventDefault();
        const boardRect = board.getBoundingClientRect();
        const start = this.getPinCenterInBoard(card, boardRect);

        dragInfo = {
          card,
          side,
          pairIdx,
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          hasMoved: false,
          start,
          color: RIBBON_COLORS[pairIdx % RIBBON_COLORS.length]
        };

        try {
          card.setPointerCapture(e.pointerId);
        } catch (_) {}
      });

      card.addEventListener('pointermove', (e) => {
        if (!dragInfo || dragInfo.card !== card || dragInfo.pointerId !== e.pointerId) return;
        const dist = Math.hypot(e.clientX - dragInfo.startX, e.clientY - dragInfo.startY);
        if (!dragInfo.hasMoved && dist >= 8) {
          dragInfo.hasMoved = true;
          card.classList.add('dragging');
        }
        if (!dragInfo.hasMoved) return;

        const boardRect = board.getBoundingClientRect();
        const current = {
          x: e.clientX - boardRect.left,
          y: e.clientY - boardRect.top
        };
        this.redrawStringsSVG({
          start: dragInfo.start,
          current,
          color: dragInfo.color
        });
      });

      const handleEnd = (e) => {
        if (!dragInfo || dragInfo.card !== card || (e && e.pointerId !== undefined && dragInfo.pointerId !== e.pointerId)) return;
        const info = dragInfo;
        dragInfo = null;
        card.classList.remove('dragging');
        this.redrawStringsSVG();

        if (!info.hasMoved) {
          // Одиночное нажатие (доступная альтернатива перетаскиванию)
          if (this.stringSelected) {
            if (this.stringSelected.side === info.side && this.stringSelected.pairIdx === info.pairIdx) {
              this.stringSelected = null;
              card.classList.remove('selected');
              sound.playLetterClick();
              return;
            }
            if (this.stringSelected.side === info.side) {
              board.querySelectorAll('.pl-str-card.selected').forEach(c => c.classList.remove('selected'));
              this.stringSelected = { side: info.side, pairIdx: info.pairIdx };
              card.classList.add('selected');
              sound.playLetterClick();
              return;
            }
            const prev = this.stringSelected;
            this.tryConnectStrings(prev.pairIdx, prev.side, info.pairIdx, info.side);
          } else {
            this.stringSelected = { side: info.side, pairIdx: info.pairIdx };
            card.classList.add('selected');
            sound.playLetterClick();
            const pair = this.stringPairs[info.pairIdx];
            if (this.stringsSubMode === 'syllables') {
              sound.speakWord(info.side === 'left' ? pair.syllables[0] : pair.syllables[1], this.lang);
            } else if (info.side === 'right') {
              sound.speakWord(pair.syllables[0], this.lang);
            }
          }
          return;
        }

        // Определяем целевую карточку под пальцем/курсором
        const hitEl = (typeof document !== 'undefined' && e)
          ? document.elementFromPoint(e.clientX, e.clientY)
          : null;
        const targetCard = hitEl ? hitEl.closest('.pl-str-card') : null;
        if (targetCard && targetCard !== card) {
          const targetSide = targetCard.dataset.side;
          const targetIdx = parseInt(targetCard.dataset.pairIdx, 10);
          if (targetSide !== info.side && !this.stringMatches.has(targetIdx)) {
            this.tryConnectStrings(info.pairIdx, info.side, targetIdx, targetSide);
          }
        }
      };

      card.addEventListener('pointerup', handleEnd);
      card.addEventListener('pointercancel', handleEnd);
      card.addEventListener('lostpointercapture', () => {
        if (dragInfo && dragInfo.card === card) {
          dragInfo = null;
          card.classList.remove('dragging');
          this.redrawStringsSVG();
        }
      });
    });
  }

  // ==========================================
  // ИГРА 4: 🎰 ВОЛШЕБНЫЙ БАРАБАН СЛОВ
  // ==========================================
  prepareReelDeck() {
    this.reelDeck = shuffleArray(WORD_MORPH_DATA[this.lang] || WORD_MORPH_DATA.ru);
    this.reelDeckIdx = 0;
    this.setupCurrentReelRound();
  }

  setupCurrentReelRound() {
    const item = this.reelDeck[this.reelDeckIdx % this.reelDeck.length];
    const startCh = item.start[item.changeIdx];
    const rest = shuffleArray(item.reelLetters.filter(l => l !== startCh));
    this.reelWheelLetters = [startCh, ...rest];
    this.reelLetterIdx = 0;
    this.reelSolved = false;
  }

  getReelFormedWord(item) {
    const chars = item.start.split('');
    chars[item.changeIdx] = this.reelWheelLetters[this.reelLetterIdx];
    return chars.join('');
  }

  renderReelHTML() {
    const copy = this.getCopy();
    if (this.reelDeck.length === 0) this.prepareReelDeck();

    const item = this.reelDeck[this.reelDeckIdx % this.reelDeck.length];
    const len = this.reelWheelLetters.length;
    const prevCh = this.reelWheelLetters[(this.reelLetterIdx - 1 + len) % len];
    const currCh = this.reelWheelLetters[this.reelLetterIdx];
    const nextCh = this.reelWheelLetters[(this.reelLetterIdx + 1) % len];
    const vowelSet = VOWELS[this.lang] || VOWELS.ru;

    return `
      <div class="pl-game-card">
        <h3 class="pl-game-title">🎰 ${copy.reelTitle}</h3>

        <div class="pl-reel-clues">
          <div class="pl-reel-from">
            <span class="pl-clue-lbl">${copy.reelFromLabel}</span>
            <span class="pl-clue-pill">${item.startEmoji} ${item.start}</span>
          </div>
          <div class="pl-reel-arrow-sep" aria-hidden="true">➔</div>
          <div class="pl-reel-to ${this.reelSolved ? 'solved' : ''}">
            <span class="pl-clue-lbl">${copy.reelTargetLabel}</span>
            <span class="pl-clue-target-emoji">${item.targetEmoji}</span>
            <span class="pl-clue-hint">${item.hint}</span>
          </div>
        </div>

        <div class="pl-reel-word ${this.reelSolved ? 'is-solved' : ''}" id="pl-reel-word">
          ${item.start.split('').map((ch, idx) => {
            if (idx !== item.changeIdx) {
              const isV = vowelSet.has(ch);
              return `<div class="pl-reel-static ${isV ? 'vowel' : 'consonant'}">${ch}</div>`;
            }
            return `
              <div class="pl-reel-slot">
                <button type="button" class="pl-reel-arrow" id="pl-reel-up" aria-label="${copy.reelUpLabel}">▲</button>
                <div class="pl-reel-window" id="pl-reel-window" tabindex="0" role="spinbutton" aria-valuenow="${this.reelLetterIdx}" aria-valuetext="${currCh}">
                  <span class="pl-reel-peek" id="pl-reel-prev">${prevCh}</span>
                  <span class="pl-reel-letter" id="pl-reel-current">${currCh}</span>
                  <span class="pl-reel-peek" id="pl-reel-next">${nextCh}</span>
                </div>
                <button type="button" class="pl-reel-arrow" id="pl-reel-down" aria-label="${copy.reelDownLabel}">▼</button>
              </div>
            `;
          }).join('')}
        </div>

        <div class="pl-reel-actions">
          ${this.reelSolved ? `
            <button type="button" class="pl-primary-btn" id="pl-reel-next-round">${copy.nextBtn}</button>
          ` : `
            <button type="button" class="pl-primary-btn" id="pl-reel-check">${copy.reelCheck}</button>
          `}
        </div>

        <div class="pl-reel-feedback" id="pl-reel-feedback" aria-live="polite">
          ${this.reelSolved ? `<div class="pl-feedback-ok">${copy.reelWin(item.start, item.target)}</div>` : ''}
        </div>
      </div>
    `;
  }

  spinReel(delta) {
    if (this.reelSolved) return;
    const len = this.reelWheelLetters.length;
    this.reelLetterIdx = (this.reelLetterIdx + delta + len) % len;
    sound.playReelTick();

    const prevCh = this.reelWheelLetters[(this.reelLetterIdx - 1 + len) % len];
    const currCh = this.reelWheelLetters[this.reelLetterIdx];
    const nextCh = this.reelWheelLetters[(this.reelLetterIdx + 1) % len];

    const prevEl = this.container.querySelector('#pl-reel-prev');
    const currEl = this.container.querySelector('#pl-reel-current');
    const nextEl = this.container.querySelector('#pl-reel-next');
    const winEl = this.container.querySelector('#pl-reel-window');

    if (prevEl) prevEl.textContent = prevCh;
    if (currEl) {
      currEl.textContent = currCh;
      currEl.classList.remove('spin-pop');
      void currEl.offsetWidth;
      currEl.classList.add('spin-pop');
    }
    if (nextEl) nextEl.textContent = nextCh;
    if (winEl) {
      winEl.setAttribute('aria-valuenow', String(this.reelLetterIdx));
      winEl.setAttribute('aria-valuetext', currCh);
    }
  }

  checkReelWord() {
    if (this.reelSolved) return;
    const copy = this.getCopy();
    const item = this.reelDeck[this.reelDeckIdx % this.reelDeck.length];
    const formed = this.getReelFormedWord(item);
    const feedbackEl = this.container.querySelector('#pl-reel-feedback');
    const wordEl = this.container.querySelector('#pl-reel-word');

    if (formed === item.target) {
      this.reelSolved = true;
      sound.playSuccess();
      this.onStarEarned(1);
      this.onWinEffect();
      this.addTimer(() => {
        sound.speakWord(item.target, this.lang);
      }, 220);

      this.render();
      this.addTimer(() => {
        this.reelDeckIdx++;
        if (this.reelDeckIdx >= this.reelDeck.length) {
          this.prepareReelDeck();
        } else {
          this.setupCurrentReelRound();
        }
        this.render();
      }, 2200);
    } else {
      sound.playError();
      sound.speakWord(formed, this.lang);
      if (wordEl) {
        wordEl.classList.add('shake');
        this.addTimer(() => wordEl.classList.remove('shake'), 450);
      }
      if (feedbackEl) {
        feedbackEl.innerHTML = `<div class="pl-feedback-err">${copy.reelTry(formed)}</div>`;
      }
    }
  }

  attachReelEvents() {
    const upBtn = this.container.querySelector('#pl-reel-up');
    const downBtn = this.container.querySelector('#pl-reel-down');
    const checkBtn = this.container.querySelector('#pl-reel-check');
    const nextBtn = this.container.querySelector('#pl-reel-next-round');
    const winEl = this.container.querySelector('#pl-reel-window');

    if (upBtn) upBtn.addEventListener('click', () => this.spinReel(-1));
    if (downBtn) downBtn.addEventListener('click', () => this.spinReel(1));
    if (checkBtn) checkBtn.addEventListener('click', () => this.checkReelWord());
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.clearAllTimers();
        sound.playLetterClick();
        this.reelDeckIdx++;
        if (this.reelDeckIdx >= this.reelDeck.length) {
          this.prepareReelDeck();
        } else {
          this.setupCurrentReelRound();
        }
        this.render();
      });
    }

    if (winEl) {
      winEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.spinReel(-1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.spinReel(1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.checkReelWord();
        }
      });

      winEl.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.spinReel(e.deltaY > 0 ? 1 : -1);
      }, { passive: false });

      let swipeY = 0;
      let swiping = false;
      let swipePtr = null;

      winEl.addEventListener('pointerdown', (e) => {
        if (this.reelSolved) return;
        swiping = true;
        swipePtr = e.pointerId;
        swipeY = e.clientY;
        try {
          winEl.setPointerCapture(e.pointerId);
        } catch (_) {}
      });

      winEl.addEventListener('pointermove', (e) => {
        if (!swiping || swipePtr !== e.pointerId || this.reelSolved) return;
        const dy = e.clientY - swipeY;
        if (Math.abs(dy) >= 24) {
          this.spinReel(dy < 0 ? 1 : -1);
          swipeY = e.clientY;
        }
      });

      const stopSwipe = () => {
        swiping = false;
        swipePtr = null;
      };
      winEl.addEventListener('pointerup', stopSwipe);
      winEl.addEventListener('pointercancel', stopSwipe);
      winEl.addEventListener('lostpointercapture', stopSwipe);
    }
  }

  // ==========================================
  // ИГРА 5: 🥁 БАРАБАН СЛОГОВ
  // ==========================================
  prepareDrumDeck() {
    this.drumDeck = shuffleArray(DRUM_WORDS_DATA[this.lang] || DRUM_WORDS_DATA.ru);
    this.drumDeckIdx = 0;
    this.drumBeats = 0;
    this.drumSolved = false;
  }

  renderDrumHTML() {
    const copy = this.getCopy();
    if (this.drumDeck.length === 0) this.prepareDrumDeck();

    const item = this.drumDeck[this.drumDeckIdx % this.drumDeck.length];
    const dotsCount = Math.max(4, this.drumBeats);

    return `
      <div class="pl-game-card">
        <h3 class="pl-game-title">🥁 ${copy.drumTitle}</h3>

        <button type="button" class="pl-drum-word-card ${this.drumSolved ? 'solved' : ''}" id="pl-drum-speak">
          <span class="pl-drum-emoji">${item.emoji}</span>
          ${this.drumSolved
            ? `<div class="pl-drum-syllables">
                ${item.syllables.map((s, idx) => `<span class="pl-drum-syl c-${idx % 4}">${s}</span>`).join('<span class="pl-syl-dot">·</span>')}
               </div>`
            : `<span class="pl-drum-word">${item.word}</span>`}
          <span class="pl-drum-audio" aria-hidden="true">🔊</span>
        </button>

        <div class="pl-drum-beats-row">
          <span class="pl-drum-beats-lbl">${copy.drumBeatsLabel} <strong id="pl-drum-count">${this.drumBeats}</strong></span>
          <div class="pl-drum-beats" id="pl-drum-beats">
            ${Array.from({ length: dotsCount }, (_, idx) => `
              <span class="pl-drum-beat ${idx < this.drumBeats ? 'lit' : ''}"></span>
            `).join('')}
          </div>
        </div>

        <button type="button" class="pl-drum-pad" id="pl-drum-pad">
          <span class="pl-drum-icon" aria-hidden="true">🥁</span>
          <span class="pl-drum-pad-lbl">${copy.drumBeatBtn}</span>
        </button>

        <div class="pl-drum-actions">
          ${this.drumSolved ? `
            <button type="button" class="pl-primary-btn" id="pl-drum-next">${copy.nextBtn}</button>
          ` : `
            <button type="button" class="pl-secondary-btn" id="pl-drum-reset">${copy.drumReset}</button>
            <button type="button" class="pl-primary-btn" id="pl-drum-check">${copy.drumCheck}</button>
          `}
        </div>

        <div class="pl-drum-feedback" id="pl-drum-feedback" aria-live="polite">
          ${this.drumSolved
            ? `<div class="pl-feedback-ok">${copy.drumWin(item.syllables.join(' · '), formatSyllableCount(item.syllables.length, this.lang))}</div>`
            : ''}
        </div>
      </div>
    `;
  }

  beatDrum() {
    if (this.drumSolved) return;
    if (this.drumBeats >= 6) return;

    sound.playDrumBeat(this.drumBeats);
    this.drumBeats++;

    const pad = this.container.querySelector('#pl-drum-pad');
    if (pad) {
      pad.classList.remove('drum-hit');
      void pad.offsetWidth;
      pad.classList.add('drum-hit');
    }

    const countEl = this.container.querySelector('#pl-drum-count');
    const beatsEl = this.container.querySelector('#pl-drum-beats');
    if (countEl) countEl.textContent = String(this.drumBeats);
    if (beatsEl) {
      const dotsCount = Math.max(4, this.drumBeats);
      beatsEl.innerHTML = Array.from({ length: dotsCount }, (_, idx) => `
        <span class="pl-drum-beat ${idx < this.drumBeats ? 'lit' : ''}"></span>
      `).join('');
    }
  }

  checkDrumBeats() {
    if (this.drumSolved) return;
    const copy = this.getCopy();
    const item = this.drumDeck[this.drumDeckIdx % this.drumDeck.length];
    const feedbackEl = this.container.querySelector('#pl-drum-feedback');

    if (this.drumBeats === 0) {
      sound.playError();
      if (feedbackEl) {
        feedbackEl.innerHTML = `<div class="pl-feedback-err">${copy.drumTapFirst}</div>`;
      }
      return;
    }

    if (this.drumBeats === item.syllables.length) {
      this.drumSolved = true;
      sound.playSuccess();
      this.onStarEarned(1);
      this.onWinEffect();
      this.addTimer(() => {
        sound.speakWord(item.word, this.lang);
      }, 220);

      this.render();
      this.addTimer(() => {
        this.drumDeckIdx++;
        if (this.drumDeckIdx >= this.drumDeck.length) {
          this.prepareDrumDeck();
        } else {
          this.drumBeats = 0;
          this.drumSolved = false;
        }
        this.render();
      }, 2200);
    } else {
      const got = this.drumBeats;
      this.drumBeats = 0;
      sound.playError();
      sound.speakWord(item.word, this.lang);

      const beatsEl = this.container.querySelector('#pl-drum-beats');
      const countEl = this.container.querySelector('#pl-drum-count');
      if (countEl) countEl.textContent = '0';
      if (beatsEl) {
        beatsEl.innerHTML = Array.from({ length: 4 }, () => `<span class="pl-drum-beat"></span>`).join('');
        beatsEl.classList.add('shake');
        this.addTimer(() => beatsEl.classList.remove('shake'), 450);
      }
      if (feedbackEl) {
        feedbackEl.innerHTML = `<div class="pl-feedback-err">${copy.drumTryAgain(formatSyllableCount(got, this.lang))}</div>`;
      }
    }
  }

  attachDrumEvents() {
    const item = this.drumDeck[this.drumDeckIdx % this.drumDeck.length];
    const speakBtn = this.container.querySelector('#pl-drum-speak');
    const padBtn = this.container.querySelector('#pl-drum-pad');
    const resetBtn = this.container.querySelector('#pl-drum-reset');
    const checkBtn = this.container.querySelector('#pl-drum-check');
    const nextBtn = this.container.querySelector('#pl-drum-next');

    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playLetterClick();
        sound.speakWord(item.word, this.lang);
      });
    }
    if (padBtn) {
      padBtn.addEventListener('click', () => this.beatDrum());
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sound.playLetterClick();
        this.drumBeats = 0;
        this.render();
      });
    }
    if (checkBtn) {
      checkBtn.addEventListener('click', () => this.checkDrumBeats());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.clearAllTimers();
        sound.playLetterClick();
        this.drumDeckIdx++;
        if (this.drumDeckIdx >= this.drumDeck.length) {
          this.prepareDrumDeck();
        } else {
          this.drumBeats = 0;
          this.drumSolved = false;
        }
        this.render();
      });
    }

    if (typeof window !== 'undefined') {
      this._onWindowKeyDown = (e) => {
        if (this.gameMode !== 'drum' || this.drumSolved) return;
        const active = document.activeElement;
        if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || (active.tagName === 'BUTTON' && active !== padBtn))) {
          return;
        }
        if (e.code === 'Space' && !e.repeat) {
          e.preventDefault();
          this.beatDrum();
        } else if (e.key === 'Enter' && this.drumBeats > 0 && (!active || active !== checkBtn)) {
          e.preventDefault();
          this.checkDrumBeats();
        }
      };
      window.addEventListener('keydown', this._onWindowKeyDown);
    }
  }

  // ==========================================
  // ИГРА 6: 🪞 БУКВЫ-ШАЛУНИШКИ
  // ==========================================
  prepareMirrorRound() {
    this.mirrorFixedCount = 0;
    this.mirrorSolved = false;
    const pool = MIRROR_LETTERS[this.lang] || MIRROR_LETTERS.ru;
    const verticalPool = UPSIDE_DOWN_SAFE[this.lang] || UPSIDE_DOWN_SAFE.ru;

    if (this.mirrorSubMode === 'single') {
      const candidates = pool.filter(l => l !== this.lastMirrorSingleLetter);
      const chosen = shuffleArray(candidates.length ? candidates : pool)[0];
      this.lastMirrorSingleLetter = chosen;

      const cards = [];
      for (let i = 0; i < 4; i++) {
        cards.push({ id: i, letter: chosen, flipType: 'x', fixed: false });
      }
      for (let i = 4; i < 8; i++) {
        cards.push({ id: i, letter: chosen, flipType: 'none', fixed: false });
      }
      this.mirrorTiles = shuffleArray(cards);
    } else {
      const flippedLetters = shuffleArray(pool).slice(0, 4);
      const uprightLetters = shuffleArray(pool).slice(0, 4);
      const cards = [];
      flippedLetters.forEach((l, i) => {
        const useY = verticalPool.includes(l) && (i % 2 === 1);
        cards.push({ id: i, letter: l, flipType: useY ? 'y' : 'x', fixed: false });
      });
      uprightLetters.forEach((l, i) => {
        cards.push({ id: i + 4, letter: l, flipType: 'none', fixed: false });
      });
      this.mirrorTiles = shuffleArray(cards);
    }
  }

  renderMirrorHTML() {
    const copy = this.getCopy();
    if (this.mirrorTiles.length === 0) this.prepareMirrorRound();
    const isMix = this.mirrorSubMode === 'mix';

    return `
      <div class="pl-game-card">
        <h3 class="pl-game-title">🪞 ${copy.mirrorTitle}</h3>

        <div class="pl-mode-toggle">
          <button type="button" class="pl-pill-btn ${!isMix ? 'active' : ''}" id="pl-mir-single">${copy.mirrorSingle}</button>
          <button type="button" class="pl-pill-btn ${isMix ? 'active' : ''}" id="pl-mir-mix">${copy.mirrorMix}</button>
        </div>

        <div class="pl-mirror-status">
          <span class="pl-mirror-counter" id="pl-mirror-counter">${copy.mirrorCount(this.mirrorFixedCount)}</span>
          <p class="pl-game-sub">${copy.mirrorHint}</p>
        </div>

        <div class="pl-mirror-grid">
          ${this.mirrorTiles.map(tile => {
            const flipClass = tile.fixed ? '' : (tile.flipType === 'x' ? 'flip-x' : (tile.flipType === 'y' ? 'flip-y' : ''));
            return `
              <button type="button"
                      class="pl-mirror-card ${tile.fixed ? 'fixed' : ''}"
                      data-tile-id="${tile.id}">
                <span class="pl-mirror-glyph ${flipClass}">${tile.letter}</span>
                ${tile.fixed ? '<span class="pl-mirror-chk" aria-hidden="true">✓</span>' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <div class="pl-mirror-actions">
          ${this.mirrorSolved ? `
            <button type="button" class="pl-primary-btn" id="pl-mir-next">${copy.nextBtn}</button>
          ` : ''}
        </div>

        <div class="pl-mirror-feedback" id="pl-mirror-feedback" aria-live="polite">
          ${this.mirrorSolved ? `<div class="pl-feedback-ok">${copy.mirrorWin}</div>` : ''}
        </div>
      </div>
    `;
  }

  attachMirrorEvents() {
    const copy = this.getCopy();
    const btnSingle = this.container.querySelector('#pl-mir-single');
    const btnMix = this.container.querySelector('#pl-mir-mix');
    const nextBtn = this.container.querySelector('#pl-mir-next');
    const feedbackEl = this.container.querySelector('#pl-mirror-feedback');
    const counterEl = this.container.querySelector('#pl-mirror-counter');

    if (btnSingle) {
      btnSingle.addEventListener('click', () => {
        if (this.mirrorSubMode === 'single') return;
        sound.playLetterClick();
        this.mirrorSubMode = 'single';
        this.prepareMirrorRound();
        this.render();
      });
    }
    if (btnMix) {
      btnMix.addEventListener('click', () => {
        if (this.mirrorSubMode === 'mix') return;
        sound.playLetterClick();
        this.mirrorSubMode = 'mix';
        this.prepareMirrorRound();
        this.render();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.clearAllTimers();
        sound.playLetterClick();
        this.prepareMirrorRound();
        this.render();
      });
    }

    this.container.querySelectorAll('.pl-mirror-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.mirrorSolved) return;
        const tileId = parseInt(btn.dataset.tileId, 10);
        const tile = this.mirrorTiles.find(t => t.id === tileId);
        if (!tile) return;

        if (tile.flipType !== 'none' && !tile.fixed) {
          tile.fixed = true;
          this.mirrorFixedCount++;

          btn.classList.add('fixed');
          const glyph = btn.querySelector('.pl-mirror-glyph');
          if (glyph) glyph.classList.remove('flip-x', 'flip-y');
          if (!btn.querySelector('.pl-mirror-chk')) {
            btn.insertAdjacentHTML('beforeend', '<span class="pl-mirror-chk" aria-hidden="true">✓</span>');
          }

          if (counterEl) {
            counterEl.textContent = copy.mirrorCount(this.mirrorFixedCount);
          }
          if (feedbackEl) {
            feedbackEl.textContent = '';
          }

          sound.playSnap();
          sound.speakPhoneme(tile.letter, this.lang);

          if (this.mirrorFixedCount >= 4 && !this.mirrorSolved) {
            this.mirrorSolved = true;
            this.onStarEarned(2);
            this.onWinEffect();
            this.addTimer(() => sound.playSuccess(), 200);

            if (feedbackEl) {
              feedbackEl.innerHTML = `<div class="pl-feedback-ok">${copy.mirrorWin}</div>`;
            }
            const actBox = this.container.querySelector('.pl-mirror-actions');
            if (actBox) {
              actBox.innerHTML = `<button type="button" class="pl-primary-btn" id="pl-mir-next">${copy.nextBtn}</button>`;
              const nb = actBox.querySelector('#pl-mir-next');
              if (nb) {
                nb.addEventListener('click', () => {
                  this.clearAllTimers();
                  sound.playLetterClick();
                  this.prepareMirrorRound();
                  this.render();
                });
              }
            }

            this.addTimer(() => {
              this.prepareMirrorRound();
              this.render();
            }, 2200);
          }
        } else {
          // Уже стоит правильно
          btn.classList.remove('nod');
          void btn.offsetWidth;
          btn.classList.add('nod');
          sound.playLetterClick();
          sound.speakPhoneme(tile.letter, this.lang);
          if (feedbackEl && !tile.fixed) {
            feedbackEl.innerHTML = `<div class="pl-feedback-hint">${copy.mirrorAlreadyRight}</div>`;
          }
        }
      });
    });
  }
}
