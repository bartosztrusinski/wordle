import { useEffect } from 'preact/hooks';

const useListenKeyPress = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [callback]);
};

export default useListenKeyPress;
