import { VNode } from 'preact';
import { useState } from 'preact/hooks';
import styled from 'styled-components';
import Toast from './Toast';
import ToastContext from './ToastContext';

const ToastContainer = styled.div`
  position: absolute;
  top: 3.5rem;
  left: 50%;
  width: fit-content;
  transform: translateX(-50%);
  user-select: none;
`;

interface ToasterProps {
  children: VNode;
}

const defaultDuration = 1000;

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

  const clearToasts = () => {
    setToasts([]);
  };

  const reversedToasts = [...toasts].reverse();

  return (
    <ToastContext.Provider value={{ toast, removeToast, clearToasts }}>
      {children}
      <ToastContainer>
        {reversedToasts.map(({ id, content, duration }) => (
          <Toast key={id} id={id} content={content} duration={duration} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export default Toaster;
