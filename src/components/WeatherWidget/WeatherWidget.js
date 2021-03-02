import React, { useEffect, useState } from "react";
import { Card, Grid } from "@material-ui/core";
import "./WeatherWidget.css";

export default function WeatherWidget() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    fetch("https://citymanagement.herokuapp.com/weatherdata")
      .then((res) => res.json())
      .then((res) => {
        // setDetails(res.data);
        //console.log(res);
        setTemperature(Math.round(res.main.temp) - 273);
      });
  }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=Dublin,IE&appid=ef272ce5c18fd04114b31684fe8f50e1",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => setTemperature(Math.floor(response.main.temp - 273)))
  //     .catch((err) => console.log(err));
  // });

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
