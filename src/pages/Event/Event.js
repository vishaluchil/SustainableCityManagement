import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Event.css";
import ScheduleCalendar from "./ScheduleCalender";
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';



export default function Event() {
  const style = {
    height: "95vh",
    margin: "20px",
  };


  const grid2 = {
    height: "100%",
  };


  const card = {
    width: "100%",
    height: "90%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",

  };

  //    justifyContent: "flex-end",
  //alignItems: "flex-start",

  const cardAccordion = {
    width: "100%",
    height: "90%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const [title, setTitle] = useState("Titledadsadsa")
  const [picture, setPicture] = useState("https://i.imgur.com/DTxieS1.png")
  const [summary, setSummary] = useState("SOME TEXT AND STUFF")

  function changeTitle(evt) {
    setTitle(evt)
  }

  function changeSummary(evt) {
    setSummary(evt)
  }
  function changeImage(evt) {
    setPicture(evt)
  }

  function handleSelectEvent(evt,target) {
    let obj = target.currentTarget
    obj.getElementsByTagName('strong')[0].click()
  }

     // <BookTitle onTitleChange={handleTitleChange} title={title} />


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
    <Grid container spacing={1} style={style}>

      <Grid item container xs={3}>
        <Card style={card} raised>
          {title}
          <CardMedia
                    className={classes.media}
                    image={picture} 
                    title="TestImage"
                />
          {summary}
        </Card>
      </Grid>

      <Grid item container xs={9} height={1}>

        <Grid item style={grid2} xs={12}>
          <Card style={cardAccordion} raised>
            <ScheduleCalendar  changeTitle={changeTitle} changeSummary={changeSummary} changeImage = {changeImage}/>
          </Card>
        </Grid>

      </Grid>

    </Grid>

  );
}
