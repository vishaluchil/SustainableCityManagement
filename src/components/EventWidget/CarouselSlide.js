import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

export default function CarouselSlide(props) {

    const useStyles = makeStyles({
        root: {
            width: 250,
            height: 200,
            padding: 2
        },
        media: {
            height: 100,
        },
    });

    const classes = useStyles();

    return (
        <Card className={classes.root} raised>
            <CardContent>
                <CardMedia
                    className={classes.media}
                    image={props.item.link} 
                    title="TestImage"
                />
                <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                {props.item.name}   
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Event Date: {props.item.date}
                </Typography>
            </CardContent>
        </Card>
    );
}