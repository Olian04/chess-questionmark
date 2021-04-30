import React, { useState } from 'react';
import { Grid, ListItem, List } from '@material-ui/core';
import {
  Settings as SettingsIcon,
  AlternateEmail as AtIcon,
} from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';
import { UpdateFieldModal } from '../components/settings/UpdateFieldModal';
import { TwoRowButton } from '../components/settings/TwoRowButton';
import { User } from '../types/User';
import { Gravatar } from '../components/common/Gravatar';
import { useUserState } from '../hooks/use-user-state';
import { userCollection } from '../services/firebase/storage';
import { userState } from '../state/user';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      overflowY: 'scroll',
      flexWrap: 'nowrap',
    },
    list: {
      zIndex: 1,
      width: '100%',
    },
  })
);

interface Props {}

export const AboutView = (props: Props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      alignContent="center"
      justify="flex-start"
      className={classes.container}
    >
      <List className={classes.list}>
        <SectionHeading
          title="Help & Feedback"
          subTitle="Reach out to us with your feedback and questions"
          icon={<AtIcon />}
        />
        <ListItem>
          <VerticalButtonGroup>
            <TwoRowButton title="Frequently asked question" />
            <TwoRowButton title="Contact us" />
            <TwoRowButton title="View Source" />
          </VerticalButtonGroup>
        </ListItem>
      </List>
    </Grid>
  );
};
