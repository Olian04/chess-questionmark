import React, { useState } from 'react';
import { Avatar, Grid, ListItem, List } from '@material-ui/core';
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
import { getUser } from '../services/firebase/auth';

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
    error: {
      backgroundColor: theme.palette.error.main,
    },
  })
);

interface Props {
  user: User;
  onLogoutAttempt: () => void;
}

export const SettingsView = (props: Props) => {
  const classes = useStyles();
  const [modal, setModal] = useState({
    open: false,
    title: '...',
    value: '...',
    description: '...',
    hint: '...',
  });

  const [user, setUserState] = useRecoilState(userState);
  return (
    <>
      <UpdateFieldModal
        {...modal}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={(fieldValue) => {
          switch (modal.hint) {
            case 'Email Address':
              getUser()
                ?.updateEmail(fieldValue)
                .catch((e) => console.log(e));
              setUserState({
                ...user,
                email: fieldValue,
              });
              break;
            case 'Phone Number':
              userCollection.update(props.user.id, { phone: fieldValue });
              setUserState({
                ...user,
                phone: fieldValue,
              });
              break;
          }
          setModal((curr) => ({ ...curr, open: false }));
        }}
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
                subTitle={props.user.team}
                startIcon={
                  <Avatar
                    alt="Bob"
                    variant="rounded"
                    src={
                      props.user.avatar !== 'N/A'
                        ? props.user.avatar
                        : '/assets/cat.jpg'
                    }
                  />
                }
              />
              <TwoRowButton
                title="Email"
                subTitle={props.user.email}
                onClick={() =>
                  setModal({
                    open: true,
                    title: 'Update Email',
                    value: props.user.email,
                    description:
                      'Change the email address associated with your account. Note that this change will update your login credentials.',
                    hint: 'Email Address',
                  })
                }
              />
              <TwoRowButton
                title="Phone"
                subTitle={props.user.phone}
                onClick={() =>
                  setModal({
                    open: true,
                    title: 'Update Phone Number',
                    value: props.user.phone,
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
              <TwoRowButton
                className={classes.error}
                title="Logout"
                onClick={props.onLogoutAttempt}
              />
            </VerticalButtonGroup>
          </ListItem>
        </List>
      </Grid>
    </>
  );
};
