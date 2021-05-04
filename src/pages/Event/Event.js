import React, { useState } from "react";
import { Card, Grid } from "@material-ui/core";
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

  const titleCard = {
    width: "100%",
    maxHeight: "fit-content",
    display: "flex",
    flexDirection: "column",
  };

  const dateCard = {
    width: "100%",
    height: "7  %",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "beige",
    paddingBottom: "5"
  };

  const headline = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  }

  const text = {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 18,
  }

  const dateText = {
    textAlign: "center",
    fontWeight: 'normal',
    fontSize: 16,
  }

  const cardAccordion = {
    width: "100%",
    height: "90%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const [title, setTitle] = useState("Upcoming Events!")
  const [picture, setPicture] = useState("https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/19/2016/11/15163142/winter-event-ideas.jpg")
  const [summary, setSummary] = useState("There's a lot of great events coming up! Click on any of them to find out more!")
  const [startDate, setStartDate] = useState("Click on an event to see details")
  const [endDate, setEndDate] = useState("")

  function changeTitle(evt) {
    setTitle(evt)
  }
  function changeStartDate(evt) {
    setStartDate(evt)
  }
  function changeEndDate(evt) {
    setEndDate(evt)
  }

  function changeSummary(evt) {
    setSummary(evt)
  }
  function changeImage(evt) {
    setPicture(evt)
  }

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
          <Card style={titleCard} raised>
            <h1 style={headline}>{title}</h1>
          </Card>
          <CardMedia
            className={classes.media}
            image={picture}
            title="TestImage"
          />
          <Card style={dateCard} raised>
            <h2 style={dateText}>{startDate} </h2>
            <h2 style={dateText}>{endDate} </h2>
            <h2 style={dateText}></h2>
          </Card>
          <h2 style={text}>{summary}</h2>
        </Card>
      </Grid>

      <Grid item container xs={9} height={1}>

        <Grid item style={grid2} xs={12}>
          <Card style={cardAccordion} raised>
            <ScheduleCalendar changeTitle={changeTitle} changeSummary={changeSummary} changeImage={changeImage} changeEndDate={changeEndDate} changeStartDate={changeStartDate} />
          </Card>
        </Grid>

      </Grid>

    </Grid>

  );
}
