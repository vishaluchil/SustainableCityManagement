import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Event.css";
import ScheduleCalendar from "./ScheduleCalender";
import { makeStyles } from '@material-ui/core/styles';



export default function Event() {
  const style = {
    height: "95vh",
    margin: "20px",
  };


  const grid2 = {
    height: "100%",
  };


  const cardLeft = {
    width: "100%",
    height: "95%",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    background: "linear-gradient(to top, #3551b5ee 0%, #f44336ee 100%)",
    color: "white",
  };

  const card = {
    width: "90%",
    height: "80%",
    padding: "10px",
    margin: "10px",
  };

  const cardAccordion = {
    width: "100%",
    height: "90%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <Grid container style={style}>

      <Grid item container xs={3} height={1}>

          <Card className={cardLeft} raised>
            SANDOWLADLSANdsldnawl
          </Card>
      </Grid>

      <Grid item container xs={9} height={1}>
        <Grid item style={grid2} xs={12}>
          <Card style={cardAccordion} raised>
            <div class="rbc"><ScheduleCalendar/></div>
          
          </Card>
        </Grid>
      </Grid>
    </Grid>

  );
}
