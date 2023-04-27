import { useEffect } from 'preact/hooks';
import { getCSSVariable, maxBoardHeightRem, setCSSVariable } from '../util';

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

const useResizeBoard = () => {
  useEffect(() => {
    adjustBoardSize();
    window.addEventListener('resize', adjustBoardSize);

    return () => window.removeEventListener('resize', adjustBoardSize);
  }, []);
};

export default useResizeBoard;
