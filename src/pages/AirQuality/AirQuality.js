import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import "./AirQuality.css";
import GaugeChart from 'react-gauge-chart'
import { Line } from "react-chartjs-2";

function AirQuality() {

      const [stations, setStations] = useState([])

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
            // allStations.forEach(async (station) => {

            // });
            setStations(stationData)
            // const city = stationData[0].city.name
            // const onlyCity = city.substr(0, city.indexOf(','))
            // console.log(onlyCity)
      }, [])

      const getCityName = (sta) => {
            return {
                  aqi: sta.aqi,
                  cityName: sta.city.name
            }
      }

      return (
            <>
                  <Card className="gauge-card" raised>
                        <h3 style={{ fontSize: "1.7em" }}>Air Quality</h3>
                        <div className="air-gauge-container">
                              {stations.map((el) => {
                                    return (<div key={el.cityName} className="air-gauge" >
                                          <GaugeChart style={{ width: "90%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} />
                                          <h3>{el.aqi}</h3>
                                    </div>)
                              })}
                              {/* <div className="air-gauge" style={{ width: "100%" }}>
                                    <GaugeChart style={{ width: "90%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} />
                                    <h3>CO2</h3>
                              </div>
                              <div className="air-gauge" style={{ width: "100%" }}>
                                    <GaugeChart style={{ width: "90%", fontWeight: 700 }} textColor="#696969" arcWidth={0.3} marginInPercent={0.02} />
                                    <h3>CO2</h3>
                              </div> */}
                        </div>
                  </Card>
                  <Card className="air-chart" raised>
                        blah blah
                  </Card>
            </>
      )
}

export default AirQuality