import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { borders, borderRadius, border } from '@material-ui/system';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            padding: '10px',
            backgroundColor: theme.palette.background.paper,
            border: "0px ",
            borderRadius: "5px",
        },
    })
);

interface Props {
    text: string;
    subtext: string;
}

export const Graph = (props: Props) => {
    const classes = useStyles();

    return (
        
        <Grid item container direction="column" xs className={classes.background} >
                <Typography variant="h5" color="textPrimary">
                    <b>{props.text}</b>
                </Typography>
                <Typography variant="caption" color="textPrimary">
                    <b>{props.subtext}</b>
                </Typography>
                <img src="/graph.svg"/>
        </Grid>
        
    );
};