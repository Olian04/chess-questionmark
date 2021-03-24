import React from 'react';
import { Container, Avatar, Grid, ListItem, List } from '@material-ui/core';
import {
  Settings as SettingsIcon,
  AlternateEmail as AtIcon,
} from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/settings/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fillHeight: {
      height: '100%',
    },
  })
);

export const SettingsView = () => {
  const classes = useStyles();
  return (
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
                    <Avatar alt="Bob" variant="rounded" src="/assets/cat.jpg" />
                  ),
                },
                { title: 'Email', subTitle: 'bob@kth.se' },
                { title: 'Phone', subTitle: '080 8826 42' },
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
                },
                { title: 'Contact us' },
              ]}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item container direction="column" justify="flex-end" xs>
        <List>
          <ListItem>
            <VerticalButtonGroup
              buttonData={[{ title: 'Logout', specialRole: 'error' }]}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
