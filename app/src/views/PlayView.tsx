import React, { useState } from 'react';
import { Container, Avatar, Grid, ListItem, List, Typography, Button as MuiButton } from '@material-ui/core';
import {
    Settings as SettingsIcon,
    AlternateEmail as AtIcon,
} from '@material-ui/icons';
import { Theme, makeStyles, createStyles, styled } from '@material-ui/core/styles';

import { VerticalButtonGroup } from '../components/settings/VerticalButtonGroup';
import { SectionHeading } from '../components/settings/SectionHeading';
import { UpdateFieldModal } from '../components/settings/UpdateFieldModal';
import clsx from 'clsx';
import { spacing } from '@material-ui/system';

const MaterialButton = styled(MuiButton)(spacing);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fillHeight: {
            height: '100%',
          },
        button: {
            backgroundColor: theme.palette.background.paper,
        },
        
    })
);

export const PlayView = () => {
    const classes = useStyles();

    return (
    
            <Grid
                container
                direction="column"
                justify="space-evenly"
                className={classes.fillHeight}
                spacing={1}
            >
                <Grid item>
                    <Typography variant="h4" color="textPrimary">Lets see what you go for Bob!</Typography>
                </Grid>

                <MaterialButton className={classes.button} endIcon={(<img src="/matchicon.svg" />)}>
                    <Grid item container direction="column" xs>
                        <Grid item container alignItems="flex-start" xs>
                            <Typography variant="h4" color="textPrimary">Create a Match</Typography>
                        </Grid>
                        <Grid item container alignItems="flex-start" xs>
                            <Typography variant="button" color="textPrimary">
                                Start a regular match
                </Typography>
                        </Grid>
                    </Grid>
                </MaterialButton>
                <MaterialButton className={classes.button} endIcon={(<img src="/matchicon.svg" />)}>
                    <Grid item container direction="column" xs>
                        <Grid item container alignItems="flex-start" xs>
                            <Typography variant="h4" color="textPrimary">Join a Match</Typography>
                        </Grid>
                        <Grid item container alignItems="flex-start" xs>
                            <Typography variant="button" color="textPrimary">
                                There are currently <b>18</b> rooms open
                </Typography>
                        </Grid>
                    </Grid>
                </MaterialButton>
                <MaterialButton className={classes.button} endIcon={(<img src="/aiicon.svg" />)}>
                    <Grid item container direction="column" xs>
                        <Grid item container alignItems="flex-start" xs>
                            <Typography variant="h4" color="textPrimary">Beat our AI</Typography>
                        </Grid>
                        <Grid item container alignItems="flex-start" xs>
                            <Typography variant="button" color="textPrimary">
                                Battle your way from a randomized blunder
                </Typography>
                        </Grid>
                    </Grid>
                </MaterialButton>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <MaterialButton className={classes.button} >
                        <Grid item container direction="column" xs>
                            <Grid item container justify="space-evenly" alignItems="center" xs>
                                <Typography variant="h4" color="textPrimary">104291</Typography>
                            </Grid>
                            <Grid item container justify="space-evenly" alignItems="center" xs>
                                <Typography variant="button" color="textPrimary">players</Typography>
                            </Grid>
                        </Grid>
                    </MaterialButton>
                    <MaterialButton className={classes.button} >
                        <Grid item container direction="column" xs>
                            <Grid item container justify="space-evenly" alignItems="center" xs >
                                <Typography variant="h4" color="textPrimary">41665</Typography>
                            </Grid>
                            <Grid item container justify="space-evenly" alignItems="center" xs>
                                <Typography variant="button" color="textPrimary">games in play</Typography>
                            </Grid>

                        </Grid>
                    </MaterialButton>
                </Grid>
            </Grid>
    );
};
