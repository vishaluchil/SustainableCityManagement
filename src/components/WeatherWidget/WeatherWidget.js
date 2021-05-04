import React, { useEffect, useState } from "react";
import { Card, Grid } from "@material-ui/core";
import "./WeatherWidget.css";

export default function WeatherWidget() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    fetch("https://citymanagement.herokuapp.com/weatherdata")
      .then((res) => res.json())
      .then((res) => {
        setTemperature(Math.round(res.main.temp) - 273);
      });
  }, []);

  return (
    <>
      <Grid item>
        <Card style={{ width: 250, height: 200, margin: 20 }} raised>
          <div className="weather-card">
            <div className="weather-icon sun"></div>
            <h1>{temperature}°</h1>
            <p>Dublin</p>
          </div>
        </Card>
      </Grid>
    </>
  );
}
