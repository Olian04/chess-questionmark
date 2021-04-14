const greetings = (person: string): string[] => [
  `Hey ${person}`,
  `Hello ${person}`,
  `Greetings ${person}`,
  `G'day ${person}`,
  `Welcome ${person}`,
  `One pawn a day, keeps the doctor away`,
  `Wanna play ${person}?`,
  `${person}, you are dominating!`,
  `Hi ${person}`,
  `Up for a match?`,
  `Keep it up ${person}`,
  `Life is like chess; You can never find a mate`,
  `Dont be a rookie, ${person}!`,
  `Check mate, ${person}!`,
];

const rand = (array: string[]): string =>
  array[(array.length * Math.random()) | 0];
export const greet = (person: string): string => {
  return rand(greetings(person));
};
