import { render } from 'preact';
import Game from './Game';
import './index.css';

render(<Game />, document.getElementById('app') as HTMLElement);
