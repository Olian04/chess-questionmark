import React from 'react';
import { Avatar, AvatarProps } from '@material-ui/core';
import { Md5 } from 'md5-typescript';
import { useRecoilValue } from 'recoil';
import { userState } from '../../state/user';

const baseUrl = 'https://www.gravatar.com/avatar/';

interface Props extends AvatarProps {
  forceDefault?: 'retro' | 'robohash';
  opponent?: {
    email: string;
    avatar?: string;
  };
}

interface GravatarProps {
  defaultImage: 'retro' | 'robohash';
  email: string;
}

const getGravatarUrl = (props: GravatarProps) => {
  const hash = Md5.init(props.email);
  return `${baseUrl}${hash}?d=${props.defaultImage}&f=y`;
};

export const Gravatar = (props: Props) => {
  const { forceDefault, opponent, ...innerProps } = props;

  const defaultImage = forceDefault ? forceDefault : 'retro';
  if (opponent) {
    if (!opponent.avatar || opponent.avatar === 'N/A') {
      const url = getGravatarUrl({
        defaultImage,
        email: opponent.email,
      });
      return <Avatar {...innerProps} src={url} />;
    }

    const url = opponent.avatar;
    return <Avatar {...innerProps} src={url} />;
  }

  const { email, avatar } = useRecoilValue(userState);

  if (!avatar || avatar === 'N/A') {
    const url = getGravatarUrl({ defaultImage, email });
    return <Avatar {...innerProps} src={url} />;
  }

  const url = avatar;
  return <Avatar {...innerProps} src={url} />;
};
