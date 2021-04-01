import React, { useState, useEffect, Component } from "react";
import { Card, Grid } from "@material-ui/core";
import "./AirQuality.css";
import { Line } from "react-chartjs-2";


class AirQualityRetriever extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount () {
    const apiUrl = 'http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=87f62a011040d2e6469b4332d4ec4a93';
 
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => 
      this.setState({ items: data.list[0].components })
      ).catch(console.log);
  }
  
  render () {
    const { items } = this.state;

    return (
        <Card raised>
            
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

    );
  }
}

export default AirQualityRetriever;