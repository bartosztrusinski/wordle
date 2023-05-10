import Board from './Board';
import Keyboard from './Keyboard';
import styled from 'styled-components';
import useListenKeyPress from '../hooks/useListenKeyPress';
import {
  wordLength,
  createLetterCount,
  getRandomSolution,
  isValidKey,
  isValidWord,
  maxGuesses,
  animations,
} from '../util';
import { LetterGuess, WordGuess } from '../interface';
import { useState } from 'preact/hooks';
import useToast from './toast/useToast';
import useTimeout from '../hooks/useTimeout';

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

const ToastButton = styled.button`
  font-family: 'Roboto Slab', sans-serif;
  margin: 0.2rem;
  padding: 0.2rem 0.5rem;
  border: 0.125rem solid var(--color-dark-gray);
  border-radius: 0.25rem;
  outline: 0;
  cursor: pointer;

  &:focus-visible {
    border-color: teal;
  }
`;

const Game = () => {
  const [wordHistory, setWordHistory] = useState<string[]>(['']);
  const [solutionWord, setSolutionWord] = useState<string>(getRandomSolution());
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const { toast, clearToasts } = useToast();

  const currentWordIndex = wordHistory.length - 1;
  const currentLetterIndex = wordHistory[currentWordIndex].length;
  const isGameWin = solutionWord === wordHistory[currentWordIndex - 1];
  const isGameOver = isGameWin || currentWordIndex === maxGuesses;

  useTimeout(
    () =>
      toast(
        <>
          <div>{isGameWin ? 'Splendid' : solutionWord.toUpperCase()}</div>
          <ToastButton type='button' onClick={resetGame}>
            Play Again
          </ToastButton>
        </>,
        Infinity
      ),
    isGameOver ? animations.reveal.duration * wordLength : null
  );

  useTimeout(
    () => setIsShaking(false),
    isShaking ? animations.shake.duration : null
  );

  useTimeout(
    () => setIsRevealing(false),
    isRevealing ? animations.reveal.duration * wordLength : null
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    const lowerCaseKey = e.key.toLowerCase();

    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.repeat ||
      isGameOver ||
      isRevealing ||
      !isValidKey(lowerCaseKey)
    ) {
      return;
    }

    handleKey(lowerCaseKey);
  };

  useListenKeyPress(handleKeyPress);

  const handleKeyClick = (key: string) => {
    if (isGameOver || isRevealing) return;

    handleKey(key);
  };

  const handleKey = (key: string) =>
    key === 'enter'
      ? submitWord()
      : key === 'backspace'
      ? removeLetter()
      : enterLetter(key);

  const submitWord = () => {
    if (currentLetterIndex < wordLength) {
      toast('Not enough letters');
      setIsShaking(true);
      return;
    }

    const submittedWord = wordHistory[currentWordIndex];

    if (!isValidWord(submittedWord)) {
      toast('Not in word list');
      setIsShaking(true);
      return;
    }

    setIsRevealing(true);
    setWordHistory([...wordHistory, '']);
  };

  const resetGame = () => {
    setWordHistory(['']);
    setSolutionWord(getRandomSolution());
    clearToasts();
  };

  const removeLetter = () => {
    if (currentLetterIndex === 0) return;

    const newWords = [...wordHistory];
    newWords[currentWordIndex] = newWords[currentWordIndex].slice(0, -1);
    setWordHistory(newWords);
  };

  const enterLetter = (letter: string) => {
    if (currentLetterIndex === wordLength) return;

    const newWords = [...wordHistory];
    newWords[currentWordIndex] += letter;
    setWordHistory(newWords);
  };

  const wordGuesses: WordGuess[] = wordHistory
    .filter((_, wordIndex) => wordIndex < currentWordIndex)
    .map((word) => {
      const solutionLetterCount = createLetterCount(solutionWord);

      return word
        .split('')
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
            return { letter, spot: 'present' } as LetterGuess;
          }
          return { letter, spot: 'absent' } as LetterGuess;
        });
    });

  const letterGuesses: LetterGuess[] = wordGuesses
    .slice(0, isRevealing ? -1 : undefined)
    .flat()
    .sort((a, b) => {
      if (a.spot === 'correct') return -1;
      if (b.spot === 'correct') return 1;
      if (a.spot === 'present') return -1;
      if (b.spot === 'present') return 1;
      return 0;
    });

  return (
    <StyledMain>
      <BoardContainer>
        <Board
          wordHistory={wordHistory}
          wordGuesses={wordGuesses}
          isShaking={isShaking}
          isRevealing={isRevealing}
          isGameWin={isGameWin}
          currentWordIndex={currentWordIndex}
        />
      </BoardContainer>
      <Keyboard letterGuesses={letterGuesses} onClick={handleKeyClick} />
    </StyledMain>
  );
};

export default Game;
