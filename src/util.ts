import { Letter, Word } from './interface';
import validWords from './validWords.json';
import solutions from './solutions.json';

const keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

const maxGuesses = 6;
const wordLength = 5;

const maxBoardHeightRem = 26.25;

const animations = {
  pop: {
    duration: 80,
  },
  fade: {
    duration: 200,
  },
  shake: {
    duration: 300,
  },
  reveal: {
    duration: 300,
    delay: 300,
  },
  bounce: {
    duration: 300,
    delay: 100,
  },
};

const getCSSVariable = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

const setCSSVariable = (name: string, value: string) =>
  document.documentElement.style.setProperty(name, value);

const initWords = (): Word[] =>
  Array(maxGuesses).fill(Array(wordLength).fill(''));

const getRandomSolution = () => {
  const randomIndex = Math.floor(Math.random() * solutions.length);
  return solutions[randomIndex];
};

const createLetterCount = (word: string) =>
  word.split('').reduce((acc, letter) => {
    if (acc[letter]) {
      acc[letter]++;
    } else {
      acc[letter] = 1;
    }

    return acc;
  }, {} as Record<Letter, number>);

const isValidLetter = (letter: Letter) =>
  keyboard.flat().includes(letter) && letter.length === 1;

const isValidWord = (word: string) => validWords.includes(word);

export {
  keyboard,
  maxGuesses,
  wordLength,
  maxBoardHeightRem,
  getCSSVariable,
  setCSSVariable,
  initWords,
  getRandomSolution,
  createLetterCount,
  isValidLetter,
  isValidWord,
  animations,
};
