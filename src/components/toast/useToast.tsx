import { useContext } from 'preact/hooks';
import ToastContext from './ToastContext';

const useToast = () => useContext(ToastContext);

export default useToast;
