import React, { useState } from 'react';
import { Grid, ListItem, List, Avatar } from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';
import {
  UpdateFieldModal,
  DialogProps,
  FieldValues,
} from '../components/settings/UpdateFieldModal';
import { TwoRowButton } from '../components/settings/TwoRowButton';
import { User } from '../types/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
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
  onChange: (fields: Partial<FieldValues>) => void;
  validateNewPassword: (newPassword: string) => string | null;
}

export const AccountView = (props: Props) => {
  const classes = useStyles();
  const [modal, setModal] = useState<{
    open: boolean;
    dialogs: DialogProps[];
  }>({
    open: false,
    dialogs: [],
  });
  return (
    <>
      <UpdateFieldModal
        open={modal.open}
        dialogs={modal.dialogs as any}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={(fieldValues) => {
          props.onChange(fieldValues);
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
                startIcon={
                  <Avatar alt="Bob" variant="rounded" src={props.user.avatar} />
                }
                onClick={() =>
                  setModal({
                    open: true,
                    dialogs: [
                      {
                        title: 'Update display name',
                        defaultValue: props.user.name,
                        fieldType: 'text',
                        fieldName: 'name',
                        description: 'Change display name',
                        hint: 'Display name',
                      },
                      {
                        title: 'Change team',
                        defaultValue: props.user.team,
                        fieldType: 'text',
                        fieldName: 'team',
                        description: 'Change team association',
                        hint: 'Change Team',
                      },
                      {
                        title: 'Change Avatar',
                        defaultValue: props.user.avatar,
                        fieldType: 'text',
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
                        fieldType: 'text',
                        fieldName: 'email',
                        description:
                          'Change the email address associated with your account. Note that this change will update your login credentials.',
                        hint: 'Email Address',
                      },
                      {
                        fieldType: 'password',
                        fieldName: 'password',
                        hint: 'Password',
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
                        fieldType: 'text',
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
                        title: 'Login',
                        fieldType: 'text',
                        fieldName: 'email',
                        description: 'Login again to re-authenticate your self',
                        hint: 'Email',
                      },
                      {
                        fieldType: 'password',
                        fieldName: 'password',
                        hint: 'Current Password',
                      },
                      {
                        title: 'New Password',
                        fieldType: 'password',
                        fieldName: 'newPassword',
                        description: 'The desired new password',
                        hint: 'New Password',
                        validate: props.validateNewPassword,
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
