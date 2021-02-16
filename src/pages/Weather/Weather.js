import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Weather.css";
import { Line } from "react-chartjs-2";
import WeatherAccordion from "./WeatherAccordion";

export default function Weather() {
  const details = JSON.parse(
    '{"coord":{"lon":"-6.2672","lat":"53.344"},"weather":[{"id":"803","main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":"275.42","feels_like":"266.46","temp_min":"274.82","temp_max":"275.93","pressure":"1009","humidity":"64"},"visibility":"10000","wind":{"speed":"9.26","deg":"80"},"clouds":{"all":"75"},"dt":"1612778129","sys":{"type":"1","id":"1565","country":"IE","sunrise":"1612771025","sunset":"1612804891"},"timezone":"0","id":"2964574","name":"Dublin","cod":"200"}'
  );

  const hours = [11, 12, 13, 14, 15];
  //   for (let i = 11; i <= 16; i++) {
  //     hours.push(i);
  //   }
  console.log(new Date().getHours());

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Hourly temperature prediction",
        data: [2, 3, 5, 1.5, 4],
        backgroundColor: "#f44336bb",
        borderColor: "#3551b5bb",
        borderWidth: 5,
      },
    ],
  };

  const [temperature, setTemperature] = useState(details.main.temp);
  const [icon, setIcon] = useState("w" + details.weather[0].icon);
  console.log(icon);

  //   useEffect(() => {
  //     fetch("http://18.234.214.108:8001/weatherdata", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((response) => setTemperature(Math.floor(response.main.temp - 273)))
  //       .catch((err) => console.log(err));
  //   });

  const style = {
    height: "95vh",
    margin: "20px",
  };

  const grid1 = {
    height: "30%",
  };

  const grid2 = {
    height: "60%",
  };

  const gridLeft = {
    width: "100%",
  };

  const cardLeft = {
    width: "90%",
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
    height: "100%",
    padding: "10px",
    margin: "10px",
  };

  const cardAccordion = {
    width: "90%",
    height: "100%",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      <Grid container style={style}>
        <Grid item container xs={3} height={1}>
          <Grid item style={gridLeft} xs={12}>
            <Card style={cardLeft} raised>
              <h1>{Math.floor(temperature - 273)}°</h1>
              <h3>Feels like {Math.floor(details.main.feels_like - 273)}°</h3>
              <div className="weather-desc">
                <h5>{details.weather[0].main}</h5>
                <div className={icon}></div>
              </div>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={9} height={1}>
          <Grid item style={grid1} xs={12}>
            <Card style={card} raised>
              <Line data={data} options={{ maintainAspectRatio: false }}></Line>
            </Card>
          </Grid>
          <Grid item style={grid2} xs={12}>
            <Card style={cardAccordion} raised>
              <h2>Prediction for the next 5 days</h2>
              <WeatherAccordion />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
