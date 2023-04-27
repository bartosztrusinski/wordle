import Board from './Board';
import Keyboard from './Keyboard';
import styled from 'styled-components';
import {
  wordLength,
  createLetterCount,
  getRandomSolution,
  initWords,
  isValidLetter,
  isValidWord,
  maxGuesses,
} from './util';
import { LetterGuess, Word, WordGuess } from './interface';
import { useEffect, useState } from 'preact/hooks';

const StyledMain = styled.main`
  max-width: var(--game-width);
  height: calc(100% - var(--header-height));
  display: flex;
  flex-direction: column;
  margin-inline: auto;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const Game = () => {
  const [words, setWords] = useState<Word[]>(initWords());
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [solutionWord] = useState<string>(getRandomSolution());
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const wordGuesses: WordGuess[] = words
    .filter((_, wordIndex) => wordIndex < currentWordIndex)
    .map((word) => {
      const solutionLetterCount = createLetterCount(solutionWord);

      return word
        .map((letter, letterIndex) => {
          if (letter === solutionWord[letterIndex]) {
            solutionLetterCount[letter]--;
            return { letter, spot: 'correct' } as LetterGuess;
          }
          return letter;
        })
        .map((letter) => {
          if (typeof letter === 'object') return letter;

          if (
            solutionWord.includes(letter) &&
            solutionLetterCount[letter] > 0
          ) {
            solutionLetterCount[letter]--;
            return { letter, spot: 'wrong' } as LetterGuess;
          }
          return { letter, spot: 'none' } as LetterGuess;
        });
    });

  const letterGuesses: LetterGuess[] = wordGuesses.flat().sort((a, b) => {
    if (a.spot === 'correct') return -1;
    if (b.spot === 'correct') return 1;
    if (a.spot === 'wrong') return -1;
    if (b.spot === 'wrong') return 1;
    return 0;
  });

  const enterLetter = (letter: string) => {
    if (currentLetterIndex === wordLength || isGameOver) return;

    const newWords = [...words].map((word) => [...word]);
    newWords[currentWordIndex][currentLetterIndex] = letter;

    setWords(newWords);
    setCurrentLetterIndex(currentLetterIndex + 1);
  };

  const removeLetter = () => {
    if (currentLetterIndex === 0) return;

    const newWords = [...words].map((word) => [...word]);
    newWords[currentWordIndex][currentLetterIndex - 1] = '';

    setWords(newWords);
    setCurrentLetterIndex(currentLetterIndex - 1);
  };

  const submitWord = () => {
    if (isGameOver) return;

    if (currentLetterIndex < wordLength) {
      alert(`Word must be ${wordLength} letters long!`);
      return;
    }

    const submittedWord = words[currentWordIndex].join('').toLowerCase();

    if (!isValidWord(submittedWord)) {
      alert('Invalid word!');
      return;
    }

    setCurrentWordIndex(currentWordIndex + 1);
    setCurrentLetterIndex(0);
    guessWord(submittedWord);
  };

  const guessWord = (word: string) => {
    if (word === solutionWord) {
      setIsGameOver(true);
      alert('You win!');
      return;
    }

    if (currentWordIndex === maxGuesses - 1) {
      setIsGameOver(true);
      alert(
        `You lose! ${solutionWord} was the solution. Better luck next time!`
      );
    }
  };

  const handleKeyPress = ({ key, repeat }: KeyboardEvent) => {
    if (repeat || currentWordIndex === maxGuesses) return;

    const letter = key.toLowerCase();

    if (letter === 'enter') {
      submitWord();
      return;
    }

    if (letter === 'backspace') {
      removeLetter();
      return;
    }

    if (isValidLetter(letter)) {
      enterLetter(letter);
      return;
    }
  };

  const handleKeyClick = (key: string) =>
    key === 'backspace'
      ? removeLetter()
      : key === 'enter'
      ? submitWord()
      : enterLetter(key);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <StyledMain>
      <BoardContainer>
        <Board words={words} wordGuesses={wordGuesses} />
      </BoardContainer>
      <Keyboard letterGuesses={letterGuesses} onClick={handleKeyClick} />
    </StyledMain>
  );
};

export default Game;
