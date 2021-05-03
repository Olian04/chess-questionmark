import React from 'react';
import { AboutView } from '../views/AboutView';

const rickRollURL = 'https://youtu.be/dQw4w9WgXcQ';
const projectSourceURL = 'https://gits-15.sys.kth.se/oliverli/iprog-project';
const projectIssuesURL =
  'https://gits-15.sys.kth.se/oliverli/iprog-project/issues';

export const AboutPresenter = () => {
  const openNewWindow = (url: string) => {
    const openInNewWindow = '_blank';
    const removeAccessBackToThisPage = 'noopener';
    window.open(url, openInNewWindow, removeAccessBackToThisPage);
  };
  return (
    <AboutView
      onClickContactUs={() => openNewWindow(projectIssuesURL)}
      onClickFAQ={() => openNewWindow(rickRollURL)}
      onClickViewSource={() => openNewWindow(projectSourceURL)}
    />
  );
};
