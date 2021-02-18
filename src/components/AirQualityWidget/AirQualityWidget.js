import React, { useEffect, useState } from "react";
import { Card, Grid } from "@material-ui/core";
import "./AirQualityWidget.css";

export default function AirQualityWidget() {
    
      const [items, setItems] = useState([])
    // state = {
    //     loading = true
    // };
    
    useEffect(() => {
        const apiUrl = "http://api.openweathermap.org/data/2.5/air_pollution?lat=53.3498&lon=-6.2603&appid=5e07b28e16e9de3cbd9581baba28a49f";
        // const response = await fetch(url);
        // const data = await response.json();
        // console.log(data);

        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => 
        setItems(data.list[0].components)
        ).catch(console.log);
    });

    
        return (
            <>
            <Grid item>
              <Card style={{ width: 250, height: 200, margin: 20 }} raised>
              <div>
              <h3>Air Pollution Summary</h3>
              <ul>
              <li>Carbon Dioxide: { items.co }</li>
              <li>Nitrogen: { items.no }</li>
              <li>Nitrogen Oxide: { items.no2 }</li>
              <li>Ozone: { items.o3 }</li>
              <li>Sodium Oxide: { items.so2 }</li>
              <li>PM2_5: { items.pm2_5 }</li>
              <li>PM10: { items.pm10 }</li>
              <li>NH3: { items.nh3 }</li>
              </ul>
              </div> 
              </Card>
            </Grid>
          </>


        );
      
}