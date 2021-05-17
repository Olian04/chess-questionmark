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
      onClickFAQ={() =>
        setModal({
          open: true,
          title: 'FAQ',
          content: [
            'Q: Does the game start with random pieces?',
            'A: No, every game starts from a predefined puzzle, selected at random.',
            'Q: What is the point value based on?',
            'A: You gain or lose points based on the difference in material cost after the final move.',
            'Q: Is there an easier AI?',
            'A: The difficulty scales with your points, lose more games to face an opponent closer to your skill level.',
            'Q: Why does the game lag sometimes?',
            'A: They say money can\'t buy you happiness, but it can buy you a better phone or laptop.',
            'Q: Why did the AI not respond to my move?',
            'A: It simply didn\'t deem you worthy as an opponent, and considered the game to be a waste of its time.',
            'Q: Why did I not lose any points for my loss?',
            'A: Your performance was so poor that you were given pity points.',
            'Q: Why do I have more time left after refreshing the page?',
            'A: The judge figured you needed it and decided to look the other way.',
          ],
        })
      }
      onClickViewSource={() => openNewWindow(projectSourceURL)}
    />
  );
};
