import { VNode } from 'preact';
import { useEffect } from 'preact/hooks';
import styled from 'styled-components';
import useToast from './useToast';

const StyledToast = styled.div`
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

interface Toast {
  id: number;
  content: string | VNode;
  duration: number;
}

const Toast = ({ id, content, duration }: Toast) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return <StyledToast>{content}</StyledToast>;
};

export default Toast;
