import { LetterSpot } from '../interface';
import { animations } from '../util';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
  aspect-ratio: 1;
  line-height: 1;
  font-weight: bold;
  user-select: none;
  text-transform: uppercase;

  border: ${({ spot, letter }: LetterBoxProps) =>
    `0.125rem solid var(--color-${
      spot ? spot : letter ? 'light-gray' : 'dark-gray'
    })`};

  background-color: ${({ spot }: LetterBoxProps) =>
    spot ? `var(--color-${spot})` : 'inherit'};

  animation: ${({
    index,
    letter,
    spot,
    isRevealing,
    isBouncing,
  }: LetterBoxProps) =>
    isRevealing
      ? `reveal
          ${animations.reveal.duration}ms 
          linear 
          ${animations.reveal.delay * index}ms 
          backwards
        `
      : isBouncing
      ? `bounce
          ${animations.bounce.duration}ms
          linear 
          ${animations.bounce.delay * index}ms
        `
      : letter && !spot
      ? `pop ${animations.pop.duration}ms ease-in-out`
      : 'none'};
`;

interface LetterBoxProps {
  index: number;
  letter: string;
  spot?: LetterSpot;
  isRevealing: boolean;
  isBouncing: boolean;
}

const LetterBox = ({
  index,
  letter,
  spot,
  isRevealing,
  isBouncing,
}: LetterBoxProps) => {
  return (
    <Box
      spot={spot}
      letter={letter}
      index={index}
      isBouncing={isBouncing}
      isRevealing={isRevealing}>
      {letter}
    </Box>
  );
};

export default LetterBox;
