import React, { useEffect, useState } from "react";
import { Card, Grid } from "@material-ui/core";
import "./Recommendations.css";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";

export default function Recommendations() {

  const [urgentTraffic, setTrafficUpdate] = useState(null)
  const [extraBikes, setExtraBikes] = useState(null);
  const [needBikes, setNeedBikes] = useState(null);
  const [trafficAlerts, setTrafficAlerts] = useState(null);

  // Check traffic alerts
  useEffect(() => {
    const traffic_response = async () => {
      const traffic_data = await fetch("https://citymanagement.herokuapp.com/trafficdata").then((res) => {
        if (res.ok) {
          return res.json()
        }
      });

      if (traffic_data != null) {
        setTrafficAlerts(Array(Object.keys(traffic_data).length).fill(true));
      }
      setTrafficUpdate(traffic_data);
    }

    const checkBikes = async () => {
      let final_data_urgent = []
      let final_data_mediocre = []
      const bike_data = await fetch("https://citymanagement.herokuapp.com/bikedata").then((res) => {
        if (res.ok) {
          return res.json()
        }
      });
      for (let bike of bike_data) {
        if (bike.available_bikes < 5) {
          final_data_urgent.push(bike);
        }
        if (bike.available_bike_stands < 5) {
          final_data_mediocre.push(bike);
        }
      }
      setExtraBikes(final_data_mediocre);
      setNeedBikes(final_data_urgent);
    }
    checkBikes();
    traffic_response();
  }, [])

  const handleClick = (e) => {
    e.target.parentNode.style.display = 'none';
  }

  return (
    <>
      <Grid item container xs={11}>
        <Card className="cardLeft" raised>
          <div className="suggestions-wrapper">
            < div className='suggestion-title'>
              <StarsRoundedIcon fontSize="large" />
              <span style={{ fontSize: "1.5em", fontWeight: 700 }}>
                Alerts and Suggestions
              </span>
            </div>
            <hr
              style={{
                color: "#000000",
                backgroundColor: "#000000",
                height: 0.5,
                borderColor: "#000000",
              }}
            />

            <div className='notifications-wrapper'>
              {/* For Weather */}
              <div key={"weather"} className="alert-severe" style={{ padding: "2%" }}>
                <span className="closebtn" onClick={(e) => { handleClick(e) }} >&times;</span>
                <i className="fa fa-exclamation-triangle faa-flash animated fa-blink"></i>
                <span> High Chance of Precipitation Today</span>
              </div>

              {/* For Traffic */}
              {
                (urgentTraffic != null && trafficAlerts != null) ?
                  Object.keys(urgentTraffic).map((key, i) => {
                    let new_key = key.split('-')[1];
                    console.log(trafficAlerts)
                    if (trafficAlerts[i] === true) {
                      return (
                        <div key={key} className="alert-severe" style={{ padding: "2%" }}>
                          <span className="closebtn" onClick={(e) => { handleClick(e) }} >&times;</span>
                          <i className="fa fa-exclamation-triangle faa-flash animated fa-blink"></i> <span>Potential Traffic Jam at route {new_key}</span>
                        </div>
                      );
                    }
                    else {
                      return (null);
                    }

                  })
                  : ""
              }
              {/* For Cycle */}

              {
                (needBikes != null) ?
                  needBikes.map((value, index, array) => {
                    return (
                      <div key={value.address} className="alert-mediocre" style={{ padding: "2%" }}>
                        <span className="closebtn" onClick={(e) => { handleClick(e) }}>&times;</span>
                        <i className="start-icon fa fa-exclamation-triangle faa-flash animated"></i> Low Available Bikes at {value.address}
                      </div>
                    )
                  })
                  : "..Fetching Data"

              }
              {
                (extraBikes != null) ?
                  extraBikes.map((value, index, array) => {
                    return (
                      <div key={value.address} className="alert-low" style={{ padding: "2%" }}>
                        <span className="closebtn" onClick={(e) => { handleClick(e) }}>&times;</span>
                        <i className="start-icon fa fa-check-circle"></i> Extra Bikes are available at {value.address}
                      </div>
                    )
                  })
                  : ""

              }
            </div>
          </div>
        </Card>
      </Grid>
    </>
  );
}
