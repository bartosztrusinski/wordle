import Game from './Game';
import Header from './Header';
import Toaster from './toast/Toaster';

const Wordle = () => {
  return (
    <>
      <Header />
      <Toaster>
        <Game />
      </Toaster>
    </>
  );
};

export default Wordle;
