import React from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../state/modal';
import { AboutView } from '../views/AboutView';

const rickRollURL = 'https://youtu.be/dQw4w9WgXcQ';
const projectSourceURL = 'https://gits-15.sys.kth.se/oliverli/iprog-project';
const projectIssuesURL =
  'https://gits-15.sys.kth.se/oliverli/iprog-project/issues';

export const AboutPresenter = () => {
  const setModal = useSetRecoilState(modalState);
  const openNewWindow = (url: string) => {
    const openInNewWindow = '_blank';
    const removeAccessBackToThisPage = 'noopener';
    window.open(url, openInNewWindow, removeAccessBackToThisPage);
  };

  return (
    <AboutView
      onClickContactUs={() =>
        setModal({
          open: true,
          title: 'Contact us',
          content: [
            'We are a diverse team of 4 KTH students who love to code. Especially on the web.',
            'The team consists of:',
            'Oliver Anteros - SCRUM Master',
            'John Landeholt - Lead Designer',
            'Riyam Jawad - QA Tester',
            'Adam Wiker - AI Designer',
          ],
        })
      }
      onClickFAQ={() => openNewWindow(rickRollURL)}
      onClickViewSource={() => openNewWindow(projectSourceURL)}
    />
  );
};
