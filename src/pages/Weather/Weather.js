import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Weather.css";
import { Line } from "react-chartjs-2";
import WeatherAccordion from "./WeatherAccordion";

export default function Weather() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [main, setMain] = useState(null);
  const [tempHoursX, setTempHoursX] = useState([]);
  const [windHoursX, setWindHoursX] = useState([]);
  const [humiHoursX, setHumiHoursX] = useState([]);

  //Current Weather Data
  useEffect(() => {
    const fetchWeather = async () => {
      const weatherData = await fetch(
        "https://citymanagement.herokuapp.com/weatherdata"
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .catch((error) => console.log(error));

      setTemperature(weatherData.main.temp - 273);
      setIcon("w" + weatherData.weather[0].icon);
      setFeelsLike(weatherData.main.feels_like - 273);
      setMain(weatherData.weather[0].main);

    };
    fetchWeather()
  }, []);

  //Hourly Prediction Data
  useEffect(() => {
    async function fetchpreDataJSON() {
      const response = await fetch(
        "https://citymanagement.herokuapp.com/predictdata"
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .catch((error) => console.log(error));
      setLoading(false);
      return response;
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

  //Function to calculate next 12 hours
  const hours = () => {
    const twelveHours = [];
    const d = new Date();
    let currentHour = d.getHours();
    for (let i = 0; i < 12; i++) {
      twelveHours.push(currentHour + ":00");
      currentHour++;
      if (currentHour === 24) {
        currentHour = 0;
      }
    }

    return twelveHours;
  };

  //Chart Data
  const data = {
    labels: hours(),
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

  const min = Math.min(...tempHoursX) - 2;
  const max = Math.max(...tempHoursX) + 2;

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: min,
            suggestedMax: max,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      {loading ? (
        <div className="loading-div">
          <h2 className="loading-h2">Loading...</h2>
        </div>
      ) : (
        <Grid container className="style">
          <Grid item container xs={3} height={1}>
            <Grid item className="grid-left" xs={12}>
              <Card className="card-left" style={{ color: "white" }} raised>
                { }
                <h1 data-testid="currentTemp">{Math.round(temperature)}°</h1>
                <h3 data-testid="currentFeelsLike">
                  Feels like {Math.round(feelsLike)}°
                </h3>
                <div className="weather-desc">
                  <h5 data-testid="currentDesc">{main}</h5>
                  <div className={icon}></div>
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid item container xs={9} height={1}>
            <Grid item className="grid1" xs={12}>
              <Card className="card" raised>
                <Line data={data} options={options}></Line>
              </Card>
            </Grid>
            <Grid item className="grid2" xs={12}>
              <Card className="card-accordion" raised>
                <h2>Prediction for the next 5 days</h2>
                <WeatherAccordion />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
