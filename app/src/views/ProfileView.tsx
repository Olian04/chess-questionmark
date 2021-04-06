import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { User } from '../types/User';
import { Graph } from '../components/profile/Graph';
import { Tile } from '../components/play/Tile';
import { VerticalButtonGroup } from '../components/common/VerticalButtonGroup';
import { MatchesButton } from '../components/profile/MatchesButton';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
        },
        background: {
            background: 'linear-gradient(180deg, #918F99 14.58%, #28262F 79.69%)',
        },
        padding:{
            padding:'5px',
        },
    })
);

interface Props {
    user: User;
}

export const ProfileView = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container
            direction="column"
            justify="space-between"
            className={classes.container}>
            <Grid item xs container alignContent="center">
                <Typography variant="h4" color="textPrimary">
                    Looking good {props.user.name}!
        </Typography>
            </Grid>

            <Graph text="Ranking" subtext="#2280 +17" />
            <Grid
                item
                xs
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <Tile text="42" subText="Wins" />
                <Tile text="3" subText="Losses" />
                <Tile text="5" subText="Draws" />
            </Grid>

            <Typography className={classes.padding} variant="button" color="textPrimary">
                Recent Matches
        </Typography>

            <Grid item xs container direction="column" justify="space-evenly">
                <Grid item className={classes.padding} xs>
                    <MatchesButton
                        text={props.user.name}
                        subText="Ranking Title"
                        subSubText="+12 points"
                        startIcon={
                            <img className={classes.padding} src="/preview.svg" />
                        }
                        endIcon={<img className={classes.padding} src="/playicon.svg" />}
                    />
                </Grid>
                <Grid item className={classes.padding} xs>
                    <MatchesButton
                        text={props.user.name}
                        subText="Ranking Title"
                        subSubText="+8 points"
                        startIcon={
                            <img className={classes.padding} src="/preview.svg" />
                        }
                        endIcon={<img className={classes.padding} src="/playicon.svg" />}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};