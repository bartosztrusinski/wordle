import 'preact/debug';
import './index.css';
import { render } from 'preact';
import App from './components/App';

render(<App />, document.getElementById('app') as HTMLElement);
