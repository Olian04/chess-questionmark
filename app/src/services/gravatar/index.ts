import { Md5 } from 'md5-typescript';

const baseUrl = 'https://www.gravatar.com/avatar/';

interface GravatarProps {
  defaultImage: 'retro' | 'robohash';
  email: string;
}

export const getGravatarUrl = (props: GravatarProps) => {
  const hash = Md5.init(props.email);
  return `${baseUrl}${hash}?d=${props.defaultImage}&f=y`;
};
