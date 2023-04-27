type Letter = string;

type Word = Letter[];

type LetterSpot = 'correct' | 'present' | 'absent';

type LetterGuess = { letter: Letter; spot: LetterSpot };

type WordGuess = LetterGuess[];

export type { Letter, Word, LetterSpot, LetterGuess, WordGuess };
