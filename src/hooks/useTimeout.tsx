import { useEffect, useRef } from 'preact/hooks';

const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const id = setTimeout(tick, delay);

      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
