import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
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
                  console.log(stationData)
            }
            // allStations.forEach(async (station) => {

            // });
            setStations(stationData)
            setLoading(false)
            // const city = stationData[0].city.name
            // const onlyCity = city.substr(0, city.indexOf(','))
            // console.log(onlyCity)
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

      return (
            <>
                  <Card className="gauge-card" raised>
                        {loading ? (
                              <h3>loading</h3>
                        ) : (
                              <>
                                    <Carousel pagination={false}>
                                          {stations.map((station, i) => {
                                                return (
                                                      <div key={i}>
                                                            <h3 style={{ fontSize: "1.7em", marginBottom: "1em" }}>Air Quality in {station.cityName} </h3>
                                                            <div className="air-gauge-container">
                                                                  <div className="air-gauge" >
                                                                        <GaugeChart id={`${i}a`} percent={station.aqi / 100} style={{ width: "100%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} formatTextValue={value => value} />
                                                                        <h3>AQI</h3>
                                                                  </div>
                                                                  <div className="air-gauge" style={{ width: "100%" }}>
                                                                        <GaugeChart id={`${i}b`} percent={station.pm10 / 100} style={{ width: "100%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} formatTextValue={value => value} />
                                                                        <h3>PM 10</h3>
                                                                  </div>
                                                                  <div className="air-gauge" style={{ width: "100%" }}>
                                                                        <GaugeChart id={`${i}c`} percent={station.pm25 / 100} style={{ width: "100%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} formatTextValue={value => value} />
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
                        blah blah
                  </Card>
            </>
      )
}

export default AirQuality