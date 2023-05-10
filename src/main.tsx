import 'preact/debug';
import './index.css';
import { render } from 'preact';
import Wordle from './components/Wordle';

render(<Wordle />, document.getElementById('app') as HTMLElement);
