import React, { useState } from 'react';
import { Avatar, Grid, ListItem, List, Typography } from '@material-ui/core';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      overflowY: 'scroll',
      flexWrap: 'nowrap',
    },
    error: {
      backgroundColor: theme.palette.error.main,
    },
  })
);

interface Props {
  user: User;
}

export const SettingsView = (props: Props) => {
  const classes = useStyles();
  const [modal, setModal] = useState({
    open: false,
    title: '...',
    description: '...',
    hint: '...',
  });

  return (
    <>
      <UpdateFieldModal
        {...modal}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={() => setModal((curr) => ({ ...curr, open: false }))}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        justify="space-around"
        className={classes.container}
      >
        <List>
          <SectionHeading
            title="Account"
            subTitle="Edit and manage your details"
            icon={<SettingsIcon />}
          />
          <ListItem>
            <VerticalButtonGroup>
              <TwoRowButton
                title={props.user.name}
                subTitle="Team DH2642"
                startIcon={
                  <Avatar alt="Bob" variant="rounded" src="/assets/cat.jpg" />
                }
              />
              <TwoRowButton
                title="Email"
                subTitle={props.user.email}
                onClick={() =>
                  setModal({
                    open: true,
                    title: 'Update Email',
                    description:
                      'Change the email address associated with your account. Note that this change will update your login credentials.',
                    hint: 'Email Address',
                  })
                }
              />
              <TwoRowButton
                title="Phone"
                subTitle="080 8826 42"
                onClick={() =>
                  setModal({
                    open: true,
                    title: 'Update Phone Number',
                    description: 'Update your registered phone number',
                    hint: 'Phone Number',
                  })
                }
              />
            </VerticalButtonGroup>
          </ListItem>
          <SectionHeading
            title="Help & Feedback"
            subTitle="Reach out to us with your feedback and questions"
            icon={<AtIcon />}
          />
          <ListItem>
            <VerticalButtonGroup>
              <TwoRowButton title="Frequently asked question" />
              <TwoRowButton title="Contact us" />
            </VerticalButtonGroup>
          </ListItem>
          <ListItem>
            <VerticalButtonGroup>
              <TwoRowButton className={classes.error} title="Logout" />
            </VerticalButtonGroup>
          </ListItem>
        </List>
      </Grid>
    </>
  );
};
