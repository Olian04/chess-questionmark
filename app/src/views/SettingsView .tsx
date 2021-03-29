import React, { useState } from 'react';
import { Avatar, Grid, ListItem, List } from '@material-ui/core';
import {
  Settings as SettingsIcon,
  AlternateEmail as AtIcon,
} from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/settings/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';
import { UpdateFieldModal } from '../components/settings/UpdateFieldModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fillHeight: {
      height: '100%',
    },
  })
);

// TODO: Center the settings buttons vertically

export const SettingsView = () => {
  const classes = useStyles();
  const [modal, setModal] = useState({
    open: false,
    title: '...',
    description: '...',
    hint: '...',
  });

  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.fillHeight}
      >
        <Grid item xs>
          <List>
            <SectionHeading
              title="Account"
              subTitle="Edit and manage your details"
              icon={<SettingsIcon />}
            />
            <ListItem>
              <VerticalButtonGroup
                buttonData={[
                  {
                    title: 'Bob',
                    subTitle: 'Team DH2642',
                    icon: (
                      <Avatar
                        alt="Bob"
                        variant="rounded"
                        src="/assets/cat.jpg"
                      />
                    ),
                    onClick: () => {},
                  },
                  {
                    title: 'Email',
                    subTitle: 'bob@kth.se',
                    onClick: () =>
                      setModal({
                        open: true,
                        title: 'Update Email',
                        description:
                          'Change the email address associated with your account. Note that this change will update your login credentials.',
                        hint: 'Email Address',
                      }),
                  },
                  {
                    title: 'Phone',
                    subTitle: '080 8826 42',
                    onClick: () =>
                      setModal({
                        open: true,
                        title: 'Update Phone Number',
                        description: 'Update your registered phone number',
                        hint: 'Phone Number',
                      }),
                  },
                ]}
              />
            </ListItem>
            <SectionHeading
              title="Help & Feedback"
              subTitle="Reach out to us with your feedback and questions"
              icon={<AtIcon />}
            />
            <ListItem>
              <VerticalButtonGroup
                buttonData={[
                  {
                    title: 'Frequently asked question',
                    onClick: () => {},
                  },
                  {
                    title: 'Contact us',
                    onClick: () => {},
                  },
                ]}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item container direction="column" justify="flex-end" xs>
          <List>
            <ListItem>
              <VerticalButtonGroup
                buttonData={[
                  {
                    title: 'Logout',
                    specialRole: 'error',
                    onClick: () => {},
                  },
                ]}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <UpdateFieldModal
        {...modal}
        onDiscard={() => setModal((curr) => ({ ...curr, open: false }))}
        onSave={() => setModal((curr) => ({ ...curr, open: false }))}
      />
    </>
  );
};
