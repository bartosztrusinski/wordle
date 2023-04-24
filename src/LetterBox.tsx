import styled from 'styled-components';

interface LetterBoxProps {
  letter: string;
}

const Box = styled.div`
  border: 0.125rem solid #3a3a3c;
  font-size: 2rem;
  font-weight: bold;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LetterBox = ({ letter }: LetterBoxProps) => {
  return <Box>{letter}</Box>;
};

export default LetterBox;
