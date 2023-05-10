type LetterSpot = 'correct' | 'present' | 'absent';

type LetterGuess = { letter: string; spot: LetterSpot };

type WordGuess = LetterGuess[];

export type { LetterSpot, LetterGuess, WordGuess };
