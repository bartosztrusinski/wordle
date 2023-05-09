import { createContext } from 'preact';
import Toast from './Toast';

interface ToastContext {
  toast: (
    newToast: Toast['content'],
    duration?: Toast['duration']
  ) => Toast['id'];
  removeToast: (id: Toast['id']) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContext>({
  toast: (_newToast: Toast['content']) => 0,
  removeToast: (_id: Toast['id']) => {},
  clearToasts: () => {},
});

export default ToastContext;
