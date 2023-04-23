import styled from 'styled-components';

const Container = styled.header`
  background-color: #121213;
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #3a3a3c;
`;

const Title = styled.h1`
  color: #fafafa;
  font-size: 2.25rem;
`;

const Header = () => {
  return (
    <Container>
      <Title>Wordle</Title>
    </Container>
  );
};

export default Header;
