import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import EventWidget from "./EventWidget/EventWidget";
import AirQualityWidget from "./AirQualityWidget/AirQualityWidget";
import TrafficWidget from "./TrafficWidget/TrafficWidget";
import Recommendations from "./RecommendationPanel/Recommendations";

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
          <TrafficWidget />
        </Link>
        <Recommendations />
      </Grid>
    </React.Fragment>
  );
}
