import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { RecoilRoot } from 'recoil';
import './index.css';
import { App } from './App';

const domRoot = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  domRoot
);
