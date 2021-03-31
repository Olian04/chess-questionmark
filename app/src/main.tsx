import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize';
import './index.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { App } from './App';

const domRoot = document.getElementById('root');

/*
I think theres a bug with the recolize debugger that prevents it from working correctly.
Try moving this line down inside the RecoilRoot, then try to log in, and look in the console.
<RecoilizeDebugger root={domRoot} />
*/
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
