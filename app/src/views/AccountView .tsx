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
    error: {
      backgroundColor: theme.palette.error.main,
    },
  })
);

interface Props {
  user: User;
  onClickLogout: () => void;
  onChangeEmail: (newEmail: string) => void;
  onChangePhone: (newPhone: string) => void;
  onChangePassword: (currentPassword: string, newPassword: string) => void;
  onChangeTeam: (newTeam: string) => void;
  onChangeName: (newName: string) => void;
  onChangeAvatar: (newAvatar: string) => void;
}

export const AccountView = (props: Props) => {
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
  return (
    <>
      <UpdateFieldModal
        {...modal}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={(fieldValues) => {
          for (const [key, value] of Object.entries(fieldValues)) {
          }
          setModal((curr) => ({ ...curr, open: false }));
        }}
      />
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
              <TwoRowButton
                title="Change Password"
                onClick={() =>
                  setModal({
                    open: true,
                    dialogs: [
                      {
                        title: 'Current Password',
                        fieldName: 'password',
                        defaultValue: '',
                        description: 'Your current password',
                        hint: 'Current Password',
                      },
                      {
                        title: 'New Password',
                        fieldName: 'password',
                        defaultValue: '',
                        description: 'The desired new password',
                        hint: 'New Password',
                      },
                    ],
                  })
                }
              />
            </VerticalButtonGroup>
          </ListItem>
          <ListItem>
            <VerticalButtonGroup>
              <TwoRowButton
                className={classes.error}
                title="Logout"
                onClick={props.onClickLogout}
              />
            </VerticalButtonGroup>
          </ListItem>
        </List>
      </Grid>
    </>
  );
};
