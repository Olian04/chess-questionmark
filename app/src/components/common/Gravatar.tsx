import React from 'react';
import { Avatar } from '@material-ui/core';
import {Md5} from "md5-typescript";

interface Props {
    email: string
    variant?: string
}

export const Gravatar = (props: Props) => {
    const hash = "https://www.gravatar.com/avatar/" + Md5.init(props.email) + "?d=mp"
    return ( 
        <Avatar alt="Bob" variant={props.variant ? "rounded": undefined} src={hash} />
    )
}
