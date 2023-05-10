import styled from 'styled-components';
import useToast from './useToast';
import useTimeout from '../../hooks/useTimeout';
import { animations } from '../../util';
import { VNode } from 'preact';

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
  animation: ${({ duration }: Toast) =>
    `fade ${animations.fade.duration}ms linear ${
      duration - animations.fade.duration
    }ms forwards`};
`;

interface Toast {
  id: number;
  content: string | VNode;
  duration: number;
}

const Toast = ({ id, content, duration }: Toast) => {
  const { removeToast } = useToast();

  useTimeout(() => removeToast(id), duration);

  return <StyledToast duration={duration}>{content}</StyledToast>;
};

export default Toast;
