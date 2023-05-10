import Board from './Board';
import Keyboard from './Keyboard';
import styled from 'styled-components';
import useListenKeyPress from '../hooks/useListenKeyPress';
import {
  wordLength,
  createLetterCount,
  getRandomSolution,
  initWords,
  isValidKey,
  isValidWord,
  maxGuesses,
  animations,
} from '../util';
import { Letter, LetterGuess, Word, WordGuess } from '../interface';
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

const Game = () => {
  const [words, setWords] = useState<Word[]>(initWords());
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [solutionWord, setSolutionWord] = useState<string>(getRandomSolution());
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const { toast, clearToasts } = useToast();

  const isGameWin = solutionWord === words[currentWordIndex - 1]?.join('');
  const isGameOver = isGameWin || currentWordIndex === maxGuesses;

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

    const submittedWord = words[currentWordIndex].join('');

    if (!isValidWord(submittedWord)) {
      toast('Not in word list');
      setIsShaking(true);
      return;
    }

    setIsRevealing(true);
    setCurrentWordIndex(currentWordIndex + 1);
    setCurrentLetterIndex(0);
  };

  const resetGame = () => {
    setWords(initWords());
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setSolutionWord(getRandomSolution());
    clearToasts();
  };

  const removeLetter = () => {
    if (currentLetterIndex === 0) return;

    const newWords = words.map((word) => [...word]);
    newWords[currentWordIndex][currentLetterIndex - 1] = '';

    setWords(newWords);
    setCurrentLetterIndex(currentLetterIndex - 1);
  };

  const enterLetter = (letter: Letter) => {
    if (currentLetterIndex === wordLength) return;

    const newWords = words.map((word) => [...word]);
    newWords[currentWordIndex][currentLetterIndex] = letter;

    setWords(newWords);
    setCurrentLetterIndex(currentLetterIndex + 1);
  };

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

  useTimeout(
    () =>
      toast(
        <>
          {isGameWin ? 'Splendid' : solutionWord.toUpperCase()}{' '}
          <button onClick={resetGame}>Play Again</button>
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

  return (
    <StyledMain>
      <BoardContainer>
        <Board
          words={words}
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
