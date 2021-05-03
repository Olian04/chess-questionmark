import React from 'react';
import { Grid, ListItem, List } from '@material-ui/core';
import { AlternateEmail as AtIcon } from '@material-ui/icons';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';
import { TwoRowButton } from '../components/settings/TwoRowButton';

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
  })
);

interface Props {
  onClickViewSource: () => void;
  onClickFAQ: () => void;
  onClickContactUs: () => void;
}

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
            <TwoRowButton
              title="Frequently asked question"
              onClick={props.onClickFAQ}
            />
            <TwoRowButton title="Contact us" onClick={props.onClickContactUs} />
            <TwoRowButton
              title="View Source"
              onClick={props.onClickViewSource}
            />
          </VerticalButtonGroup>
        </ListItem>
      </List>
    </Grid>
  );
};
