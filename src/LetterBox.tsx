import styled from 'styled-components';

interface LetterBoxProps {
  letter: string;
  spot?: 'correct' | 'wrong' | 'none';
}

const Box = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
  aspect-ratio: 1;
  line-height: 1;
  font-weight: bold;
  user-select: none;
  border: ${({ spot, letter }: LetterBoxProps) =>
    spot ? '0' : `0.125rem solid var(--color-${letter ? 'gray' : 'none'})`};
  text-transform: uppercase;
  background-color: ${({ spot }: LetterBoxProps) =>
    `var(--color-${spot ?? 'dark'})`};
`;

const LetterBox = ({ letter, spot }: LetterBoxProps) => {
  return (
    <Box spot={spot} letter={letter}>
      {letter}
    </Box>
  );
};

export default LetterBox;
