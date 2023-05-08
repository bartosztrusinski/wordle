import { VNode, createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: absolute;
  top: 3.5rem;
  left: 50%;
  width: fit-content;
  transform: translateX(-50%);
  pointer-events: none;
`;

const Toast = styled.div`
  background-color: var(--color-light);
  color: var(--color-dark);
  text-align: center;
  font-weight: 700;
  font-size: 0.8125rem;
  border-radius: 0.25rem;
  padding: 0.8125rem;
  margin-bottom: 1rem;
  line-height: 1rem;
  border: 0;
`;

interface ToasterProps {
  children: VNode;
}

interface Toast {
  id: number;
  content: string | VNode;
  duration: number;
}

interface ToastContext {
  toast: (
    newToast: Toast['content'],
    duration?: Toast['duration']
  ) => Toast['id'];
  removeToast: (id: Toast['id']) => void;
}

const defaultDuration = 1000;

const ToastContext = createContext<ToastContext>({
  toast: (_newToast: Toast['content']) => 0,
  removeToast: (_id: Toast['id']) => {},
});

const Toaster = ({ children }: ToasterProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [id, setId] = useState<Toast['id']>(0);

  const toast = (newToast: Toast['content'], duration = defaultDuration) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, content: newToast, duration },
    ]);

    setId((prevId) => prevId + 1);

    return id;
  };

  const removeToast = (id: Toast['id']) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const lastToast = toasts[toasts.length - 1];

    if (!lastToast || lastToast.duration === Infinity) return;

    setTimeout(() => removeToast(lastToast.id), lastToast.duration);
  }, [removeToast]);

  const reversedToasts = [...toasts].reverse();

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer>
        {reversedToasts.map(({ id, content, duration }) => (
          <Toast key={id} duration={duration}>
            {content}
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export default Toaster;
export { useToast };
