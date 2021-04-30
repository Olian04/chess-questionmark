import { Md5 } from 'md5-typescript';

const baseUrl = 'https://www.gravatar.com/avatar';

interface GravatarProps {
  email: string;
  defaultImage: 'retro' | 'robohash';
  forceDefault?: boolean;
}

export const getGravatarUrl = (props: GravatarProps) => {
  const hash = Md5.init(props.email);
  return `${baseUrl}/${hash}?d=${props.defaultImage}${
    props.forceDefault ? '&f=y' : ''
  }`;
};
