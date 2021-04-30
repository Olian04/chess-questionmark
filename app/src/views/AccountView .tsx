import React, { useState } from 'react';
import { Grid, ListItem, List } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';
import { UpdateFieldModal } from '../components/settings/UpdateFieldModal';
import { TwoRowButton } from '../components/settings/TwoRowButton';
import { User } from '../types/User';
import { Gravatar } from '../components/common/Gravatar';

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
  onChangeTeam: (newTeam: string) => void;
  onChangeName: (newName: string) => void;
  onChangeEmail: (newEmail: string) => void;
  onChangePhone: (newPhone: string) => void;
  onChangeAvatar: (newAvatar: string) => void;
  onChangePassword: (newPassword: string) => void;
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
        open={modal.open}
        dialogs={modal.dialogs as any}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={(fieldValues) => {
          if (fieldValues.name) {
            props.onChangeName(fieldValues.name);
          }
          if (fieldValues.avatar) {
            props.onChangeAvatar(fieldValues.avatar);
          }
          if (fieldValues.email) {
            props.onChangeEmail(fieldValues.email);
          }
          if (fieldValues.phone) {
            props.onChangePhone(fieldValues.phone);
          }
          if (fieldValues.team) {
            props.onChangeTeam(fieldValues.team);
          }
          if (fieldValues.password) {
            props.onChangePassword(fieldValues.password);
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
