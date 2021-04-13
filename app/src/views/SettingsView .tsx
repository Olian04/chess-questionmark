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
import { Gravatar } from '../components/common/Gravatar';
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
    list: {
      zIndex: 1,
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
    dialogs: [
      {
        title: '...',
        fieldName: '...',
        defaultValue: '...',
        description: '...',
        hint: '...',
      },
    ],
  });

  const [user, setUserState] = useRecoilState(userState);

  const updateUser = (key: string, value: any) => {
    userCollection.update(props.user.id, { [key]: value as string });
    setUserState({ ...user, [key]: value as string });
  };
  return (
    <>
      <UpdateFieldModal
        {...modal}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={(fieldValues) => {
          for (const [key, value] of Object.entries(fieldValues)) {
            switch (key) {
              case 'email':
                getUser()
                  ?.updateEmail(value as string)
                  .catch((e: { code: string; message: string }) =>
                    console.log(e)
                  );
                setUserState({ ...user, email: value as string });
                break;
              default:
                updateUser(key, value);
                break;
            }
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
        <List className={classes.list}>
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
                startIcon={<Gravatar alt="Bob" variant="rounded" />}
                onClick={() =>
                  setModal({
                    open: true,
                    dialogs: [
                      {
                        title: 'Update display name',
                        defaultValue: props.user.name,
                        fieldName: 'name',
                        description: 'Change display name',
                        hint: 'Display name',
                      },
                      {
                        title: 'Change team',
                        defaultValue: props.user.team,
                        fieldName: 'team',
                        description: 'Change team association',
                        hint: 'Change Team',
                      },
                      {
                        title: 'Change Avatar',
                        defaultValue: props.user.avatar,
                        fieldName: 'avatar',
                        description: 'Change avatar url (unsafe)',
                        hint: 'Change Avatar',
                      },
                    ],
                  })
                }
              />
              <TwoRowButton
                title="Email"
                subTitle={props.user.email}
                onClick={() =>
                  setModal({
                    open: true,
                    dialogs: [
                      {
                        title: 'Update Email',
                        defaultValue: props.user.email,
                        fieldName: 'email',
                        description:
                          'Change the email address associated with your account. Note that this change will update your login credentials.',
                        hint: 'Email Address',
                      },
                    ],
                  })
                }
              />
              <TwoRowButton
                title="Phone"
                subTitle={props.user.phone}
                onClick={() =>
                  setModal({
                    open: true,
                    dialogs: [
                      {
                        title: 'Update Phone Number',
                        fieldName: 'phone',
                        defaultValue: props.user.phone,
                        description: 'Update your registered phone number',
                        hint: 'Phone Number',
                      },
                    ],
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
