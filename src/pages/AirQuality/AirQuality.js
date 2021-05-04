import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
import "./AirQuality.css";
import Carousel from "react-elastic-carousel";
import GaugeChart from 'react-gauge-chart'
import { Line } from "react-chartjs-2";

function AirQuality() {

      const [stations, setStations] = useState([])
      const [loading, setLoading] = useState(true)

      const getAllStations = async (lat, lon) => {
            const res = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=6bcfce6dc7b7e60a29aefc22f649a96ee0f6ce0d`)
            const stationData = await res.json();
            return stationData.data
      }

      useEffect(async () => {
            const api_url = "https://citymanagement.herokuapp.com/pollutiondata";
            const res = await fetch(api_url)
            const data = await res.json()
            const allStations = data.data.map(station => {
                  return [station.lat, station.lon]
            })
            const stationData = []
            for (const station of allStations) {
                  stationData.push(getCityName(await getAllStations(station[0], station[1])))
            }
            setStations(stationData)
            setLoading(false)
      }, [])

      const getCityName = (sta) => {
            return {
                  cityName: sta.city.name.substring(0, sta.city.name.indexOf(",")),
                  aqi: sta.aqi,
                  pm10: sta.iaqi.pm10.v,
                  pm25: sta.iaqi.pm25.v,
                  forecastO3: sta.forecast.daily.o3,
                  forecastPM10: sta.forecast.daily.pm10,
                  forecastPM25: sta.forecast.daily.pm25,
            }
      }

      const getForecast = (forecast) => {
            const forecastArray = forecast.map(el => {
                  return el.avg
            })
            return forecastArray
      }

      const join = (t, a, s) => {
            const format = (m) => {
                  let f = new Intl.DateTimeFormat('en', m);
                  return f.format(t);
            }
            return a.map(format).join(s);
      }

      const getForecastDates = () => {
            const fiveDays = [];
            let a = [{ day: 'numeric' }, { month: 'short' }];

            for (let i = 0; i < 5; i++) {
                  const d = new Date();
                  d.setDate(d.getDate() + i);
                  let s = join(d, a, '-');
                  fiveDays.push(s)
            }

            return fiveDays;
      };

      return (
            <>
                  <Card className="gauge-card" raised>
                        {loading ? (
                              <h3>Loading...</h3>
                        ) : (
                              <>
                                    <Carousel pagination={false}>
                                          {stations.map((station, i) => {
                                                return (
                                                      <div key={i}>
                                                            <h3 style={{ fontSize: "1.7em", marginBottom: "1em" }}>Air Quality in {station.cityName} </h3>
                                                            <div className="air-gauge-container">
                                                                  <div className="air-gauge" >
                                                                        <GaugeChart id={`${i}a`} percent={station.aqi / 100} style={{ width: "100%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} formatTextValue={value => value} arcsLength={[0.5, 0.25, 0.25]} />
                                                                        <h3>AQI</h3>
                                                                  </div>
                                                                  <div className="air-gauge" style={{ width: "100%" }}>
                                                                        <GaugeChart id={`${i}b`} percent={station.pm10 / 100} style={{ width: "100%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} formatTextValue={value => value} arcsLength={[0.4, 0.4, 0.2]} />
                                                                        <h3>PM 10</h3>
                                                                  </div>
                                                                  <div className="air-gauge" style={{ width: "100%" }}>
                                                                        <GaugeChart id={`${i}c`} percent={station.pm25 / 100} style={{ width: "100%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} formatTextValue={value => value} arcsLength={[0.25, 0.25, 0.5]} />
                                                                        <h3>PM 2.5</h3>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </Carousel>
                              </>
                        )}
                  </Card>
                  <Card className="air-chart" raised>
                        {loading ? (
                              <h3>Loading...</h3>
                        ) : (
                              <div style={{ height: "100%", width: "100%" }}>
                                    <Carousel pagination={false} style={{ height: "100%", width: "100%" }}>
                                          {stations.map((station, i) => {
                                                return (
                                                      <div key={i} className="air-gauge">
                                                            <h3>Air Quality forecast for {station.cityName}</h3>
                                                            <div style={{ height: "330px", width: "100%" }} >
                                                                  <Line height={"320px"} width={"100%"} data={{
                                                                        labels: getForecastDates(),
                                                                        datasets: [
                                                                              {
                                                                                    label: "O3",
                                                                                    data: getForecast(station.forecastO3),
                                                                                    backgroundColor: "#f44336bb",
                                                                                    borderColor: "#3551b5bb",
                                                                                    borderWidth: 5,
                                                                              },
                                                                              {
                                                                                    label: "PM 10",
                                                                                    data: getForecast(station.forecastPM10),
                                                                                    backgroundColor: "#29b6f6bb",
                                                                                    borderColor: "#0288d1bb",
                                                                                    borderWidth: 5,
                                                                                    hidden: true,
                                                                              },
                                                                              {
                                                                                    label: "PM 2.5",
                                                                                    data: getForecast(station.forecastPM25),
                                                                                    backgroundColor: "#C0C0C0bb",
                                                                                    borderColor: "#808080bb",
                                                                                    borderWidth: 5,
                                                                                    hidden: true,
                                                                              },
                                                                        ],
                                                                  }} options={{ maintainAspectRatio: false }}>
                                                                  </Line>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </Carousel>
                              </div>
                        )}
                  </Card>
            </>
      )
}

export default AirQuality