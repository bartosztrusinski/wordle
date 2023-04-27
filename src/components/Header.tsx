import styled from 'styled-components';

const StyledHeader = styled.header`
  height: var(--header-height);
  display: flex;
  place-content: center;
  place-items: center;
  background-color: var(--color-dark);
  border-bottom: 0.0625rem solid var(--color-none);
`;

const Title = styled.h1`
  font-size: min(1.5rem + 1vw, 2.25rem);
  font-family: 'Roboto Slab', sans-serif;
  font-weight: 900;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Title>Wordle</Title>
    </StyledHeader>
  );
};

export default Header;
