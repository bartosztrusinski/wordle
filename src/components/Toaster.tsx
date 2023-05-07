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

const ToastContext = createContext<{
  toast: (newToast: string | VNode, duration?: number) => number;
  removeToast: (id: number) => void;
}>({
  toast: (_newToast: string | VNode, _duration = 500) => 0,
  removeToast: (_id: number) => {},
});

const Toaster = ({ children }: ToasterProps) => {
  const [toasts, setToasts] = useState<
    { id: number; toast: string | VNode; duration: number }[]
  >([]);

  const toast = (newToast: string | VNode, duration = 500) => {
    const id = Math.floor(Math.random() * 1000000);

    setToasts((prevToasts) => {
      const newToasts = [...prevToasts].map((toast) => ({ ...toast }));
      newToasts.push({ id, toast: newToast, duration });
      return newToasts;
    });

    return id;
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) =>
      [...prevToasts]
        .map((toast) => ({ ...toast }))
        .filter((toast) => toast.id !== id)
    );
  };

  useEffect(() => {
    const toastToRemove = [...toasts]
      .reverse()
      .sort((a, b) => a.duration - b.duration)[0];

    if (!toastToRemove) return;

    const id = setTimeout(
      () => removeToast(toastToRemove.id),
      toastToRemove.duration
    );

    console.log(toasts, toastToRemove);

    return () => clearTimeout(id);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <ToastContainer>
        {toasts.map(({ toast, duration }, index) => (
          <Toast key={index} duration={duration}>
            {toast}
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export default Toaster;
export { useToast };
