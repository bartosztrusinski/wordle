import styled from 'styled-components';
import LetterBox from './LetterBox';
import { useEffect } from 'preact/hooks';
import {
  wordLength,
  getCSSVariable,
  maxGuesses,
  setCSSVariable,
} from '../util';
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
`;

const maxBoardHeightRem = 26.25;

const adjustBoardSize = () => {
  const headerHeight = parseFloat(getCSSVariable('--header-height'));
  const keyboardHeight = parseFloat(getCSSVariable('--keyboard-height'));
  const windowHeightRem = window.innerHeight / 16;
  const newBoardHeight = Math.min(
    windowHeightRem - headerHeight - keyboardHeight,
    maxBoardHeightRem
  );

  setCSSVariable('--board-height', newBoardHeight + 'rem');
  setCSSVariable('--board-width', (newBoardHeight * 5) / 6 + 'rem');
};

interface BoardProps {
  words: Word[];
  wordGuesses: WordGuess[];
}

const Board = ({ words, wordGuesses }: BoardProps) => {
  useEffect(() => {
    adjustBoardSize();
    window.addEventListener('resize', adjustBoardSize);

    return () => window.removeEventListener('resize', adjustBoardSize);
  }, []);

  return (
    <StyledBoard>
      {words.map((word, rowIndex) => (
        <Row key={rowIndex}>
          {word.map((letter, letterIndex) => (
            <LetterBox
              key={letterIndex}
              letter={letter}
              spot={wordGuesses[rowIndex]?.[letterIndex]?.spot}
            />
          ))}
        </Row>
      ))}
    </StyledBoard>
  );
};

export default Board;
