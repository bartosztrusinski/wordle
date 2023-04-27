import styled from 'styled-components';
import { VNode } from 'preact';
import { Letter, LetterSpot } from '../interface';

const StyledButton = styled.button`
  display: flex;
  place-content: center;
  place-items: center;
  font-weight: bold;
  border: 0;
  padding: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  color: var(--color-light);
  background-color: ${({ spot }: KeyProps) =>
    `var(--color-${spot ?? 'light-gray'})`};
  flex: ${({ size }: KeyProps) => (size === 'big' ? 1.5 : 1)} 1 0;
  font-size: ${({ size }: KeyProps) =>
    size === 'big' ? '0.75rem' : '1.25rem'};
`;

interface KeyProps {
  letter: Letter;
  value: VNode | Letter;
  spot?: LetterSpot;
  size?: 'normal' | 'big';
  onClick: (letter?: Letter) => void;
}

const Key = ({ value, spot, onClick, letter, size = 'normal' }: KeyProps) => {
  return (
    <StyledButton
      type='button'
      size={size}
      spot={spot}
      onClick={() => onClick(letter)}>
      {value}
    </StyledButton>
  );
};

export default Key;
