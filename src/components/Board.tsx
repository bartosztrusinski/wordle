import styled from 'styled-components';
import LetterBox from './LetterBox';
import useResizeBoard from '../hooks/useResizeBoard';
import { wordLength, maxGuesses, animations } from '../util';
import { Word, WordGuess } from '../interface';

const StyledBoard = styled.div`
  width: min(100%, var(--board-width));
  height: var(--board-height);
  place-self: center;
  display: grid;
  grid-template-rows: repeat(${maxGuesses}, 1fr);
  gap: 0.3125rem;
  padding: 0.625rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;

  @media (min-height: 37.5rem) {
    font-size: 2rem;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${wordLength}, 1fr);
  gap: 0.3125rem;
  animation: ${({ isShaking }) =>
    isShaking ? `shake ${animations.shake.duration}ms linear` : 'none'};
`;

interface BoardProps {
  words: Word[];
  wordGuesses: WordGuess[];
  isShaking: boolean;
  isRevealing: boolean;
  isGameWin: boolean;
  currentWordIndex: number;
}

const Board = ({
  words,
  wordGuesses,
  isShaking,
  isRevealing,
  isGameWin,
  currentWordIndex,
}: BoardProps) => {
  useResizeBoard();

  return (
    <StyledBoard>
      {words.map((word, wordIndex) => (
        <Row
          key={wordIndex}
          isShaking={isShaking && wordIndex === currentWordIndex}>
          {word.map((letter, letterIndex) => (
            <LetterBox
              key={letterIndex}
              index={letterIndex}
              letter={letter}
              spot={wordGuesses[wordIndex]?.[letterIndex]?.spot}
              isRevealing={isRevealing && wordIndex === currentWordIndex - 1}
              isBouncing={isGameWin && wordIndex === currentWordIndex - 1}
            />
          ))}
        </Row>
      ))}
    </StyledBoard>
  );
};

export default Board;
