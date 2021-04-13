import React from 'react';
import { Avatar, AvatarProps } from '@material-ui/core';
import { Md5 } from 'md5-typescript';

interface Props extends AvatarProps {
  email: string;
  forceDefault: 'retro' | 'robohash';
}

export const Gravatar = (props: Props) => {
  const { email, forceDefault, ...innerProps } = props;
  const hash = Md5.init(props.email);
  const url =
    'https://www.gravatar.com/avatar/' + hash + '?d=' + forceDefault + '&f=y';
  return <Avatar {...innerProps} src={url} />;
};
