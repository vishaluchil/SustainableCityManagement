import React from "react";
import { Card, Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';

import WeatherWidget from "./WeatherWidget/WeatherWidget";
import EventWidget from "./EventWidget/EventWidget";
import AirQualityWidget from "./AirQualityWidget/AirQualityWidget";


const Widget = () => {
  return (
    <React.Fragment>
      <Grid item>
        <Card style={{ width: 250, height: 200, margin: 20 }} raised></Card>
      </Grid>
    </React.Fragment>
  );
};

export default function Widgets() {
  return (

    <React.Fragment>
      <Grid
        container
        justify="space-evenly"
        alignItems="flex-end"
        style={{ marginTop: 20 }}
      >
        <Link to="/weather">
          <WeatherWidget />
        </Link>
        <Link to="/event">
          <EventWidget />
        </Link>
        <Link to="/air">
          <AirQualityWidget />
        </Link>
        <Link to="/traffic">
          <Widget />
        </Link>
      </Grid>

    </React.Fragment>

  );
}
