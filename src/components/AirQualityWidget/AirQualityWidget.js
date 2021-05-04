import React, { useEffect, useState } from "react";
import { Card, Grid } from "@material-ui/core";
import "./AirQualityWidget.css";

export default function AirQualityWidget() {

  const [items, setItems] = useState([])

  useEffect(async() => {
    const apiUrl = "http://api.openweathermap.org/data/2.5/air_pollution?lat=53.3498&lon=-6.2603&appid=8a0cb8ba5d6bf102e8dd29295bdf968e";
    await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setItems(data.list[0].components))
      .catch(console.log);
  },[]);


  return (
    <>
      <Card style={{ width: 250, height: 200, margin: 20 }} raised>
        <div className="air-widget">
          <h2 className="title">Air Quality Summary</h2>
          <div className="summary-row">
            <div className="stat">
              <h3>Co2:</h3><h3> {items.co}</h3>
            </div>
            <div className="stat">
              <h3>O3:</h3><h3> {items.o3}</h3>
            </div>
          </div>
          <div className="summary-row">
            <div className="stat">
              <h3>PM 2.5: </h3><h3>{items.pm2_5}</h3>
            </div>
            <div className="stat">
              <h3>PM 10: </h3><h3>{items.pm10}</h3>
            </div>
          </div>
        </div>
      </Card>
    </>


  );

}