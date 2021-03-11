import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import './index.css';
import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider';

const domRoot = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilizeDebugger root={domRoot} />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  domRoot
);
