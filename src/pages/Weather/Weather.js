import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Weather.css";
import { Line } from "react-chartjs-2";
import WeatherAccordion from "./WeatherAccordion";

export default function Weather() {
  // const [details, setDetails] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [main, setMain] = useState(null);
  const [tempHoursX, setTempHoursX] = useState([]);
  const [windHoursX, setWindHoursX] = useState([]);
  const [humiHoursX, setHumiHoursX] = useState([]);

  useEffect(() => {
    fetch("https://citymanagement.herokuapp.com/weatherdata")
      .then((res) => res.json())
      .then((res) => {
        // setDetails(res.data);
        //console.log(res);
        setTemperature(res.main.temp);
        setIcon("w" + res.weather[0].icon);
        setFeelsLike(res.main.feels_like - 273);
        setMain(res.weather[0].main);
      });
  }, []);

  useEffect(() => {
    async function fetchpreDataJSON() {
      const response = await fetch(
        "https://citymanagement.herokuapp.com/predictdata"
      );
      const preData = await response.json();
      return preData;
    }

    fetchpreDataJSON().then((preData) => {
      for (let i = 0; i < 12; i++) {
        setTempHoursX((tempHoursX) => [
          ...tempHoursX,
          preData.tempPrediction[i],
        ]);
        setHumiHoursX((humiHoursX) => [
          ...humiHoursX,
          preData.humidityPrediction[i],
        ]);
        setWindHoursX((windHoursX) => [
          ...windHoursX,
          preData.windPrediction[i] * 1.852,
        ]);
      }
    });
  }, []);

  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  //console.log(new Date().getHours());

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Hourly temperature prediction",
        data: tempHoursX,
        backgroundColor: "#f44336bb",
        borderColor: "#3551b5bb",
        borderWidth: 5,
      },
      {
        label: "Hourly humidity prediction",
        data: humiHoursX,
        backgroundColor: "#29b6f6bb",
        borderColor: "#0288d1bb",
        borderWidth: 5,
        hidden: true,
      },
      {
        label: "Hourly wind speed prediction",
        data: windHoursX,
        backgroundColor: "#C0C0C0bb",
        borderColor: "#808080bb",
        borderWidth: 5,
        hidden: true,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            // suggestedMin: 0,
            // suggestedMax: 100,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

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
              <h3>Feels like {Math.floor(feelsLike)}°</h3>
              <div className="weather-desc">
                <h5>{main}</h5>
                <div className={icon}></div>
              </div>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={9} height={1}>
          <Grid item style={grid1} xs={12}>
            <Card style={card} raised>
              <Line data={data} options={options}></Line>
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
