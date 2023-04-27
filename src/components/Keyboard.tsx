import styled from 'styled-components';
import Key from './Key';
import BackspaceIcon from './BackspaceIcon';
import { LetterGuess } from '../interface';
import { keyboard } from '../util';

const Container = styled.div`
  height: var(--keyboard-height);
  display: grid;
  grid-template-rows: repeat(${keyboard.length}, 1fr);
  flex-direction: column;
  gap: 0.5rem;
  padding-inline: 0.5rem;
  padding-bottom: 0.5rem;
  font-family: 'Roboto', sans-serif;
`;

const Row = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const Space = styled.div`
  flex: 0.3;
`;

interface KeyboardProps {
  letterGuesses: LetterGuess[];
  onClick: (key: string) => void;
}

const Keyboard = ({ letterGuesses, onClick }: KeyboardProps) => {
  const findLetterSpot = (key: string) =>
    letterGuesses.find((letterType) => letterType.letter === key)?.spot;

  return (
    <Container>
      {keyboard.map((keyRow, rowIndex) => (
        <Row key={rowIndex}>
          {rowIndex === 1 && <Space />}
          {keyRow.map((key, keyIndex) => (
            <Key
              key={keyIndex}
              letter={key}
              value={key === 'backspace' ? <BackspaceIcon /> : key}
              size={key === 'backspace' || key === 'enter' ? 'big' : 'normal'}
              spot={findLetterSpot(key)}
              onClick={() => onClick(key)}
            />
          ))}
          {rowIndex === 1 && <Space />}
        </Row>
      ))}
    </Container>
  );
};

export default Keyboard;
