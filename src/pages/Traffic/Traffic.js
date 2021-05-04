import React, { useState, useEffect, useCallback } from "react";
import { Card, Grid } from "@material-ui/core";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import Button from "@material-ui/core/Button";
import BikesCarousel from "./BikesCarousel";
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import RouteCleaner from './RouteCleaner.js';
import { EmojiObjects } from "@material-ui/icons";
import "./Traffic.css"
export default function Traffic() {

  const [currentResponse, setCurrentResponse] = useState(null);
  const [currentBusRoute, setBusRoute] = useState({
    startpoint: ['53.391176495085,-6.26219900048751'],
    endpoint: ['53.3525169031735,-6.26392245064604'],
    waypoints: {}
  });

  const [changed, setChanged] = useState(false)

  const [urgentTraffic, setTrafficUpdate] = useState(null)

  const [extraBikes, setExtraBikes] = useState(null);

  const [needBikes, setNeedBikes] = useState(null);

  const [trafficAlerts, setTrafficAlerts] = useState(null);


  // Bus Routes
  let routeObj = RouteCleaner();

  useEffect(() => {

  }, [currentBusRoute]);

  // Style for maps
  const containerStyle = {
    width: "100%",
    height: "100%"
  };

  // Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDRUrETccsBFX4-M-4hhUsja268r6Rz0AM"
  })

  // Route number handler 
  const handleButtonClick = (key) => {
    setChanged(true);
    setBusRoute(routeObj[key]);
  }

  // Check traffic alerts

  useEffect(() => {
    const traffic_response = async () => {
      const traffic_data = await fetch("https://citymanagement.herokuapp.com/trafficdata").then((res) => {
        if (res.ok) {
          return res.json()
        }
      });

      // console.log(traffic_response.json())

      if (traffic_data != null) {

        setTrafficAlerts(Array(Object.keys(traffic_data).length).fill(true));
      }
      setTrafficUpdate(traffic_data);
      console.log(Array(Object.keys(traffic_data).length).fill(true));


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
      console.log(final_data_mediocre, final_data_urgent);
      setExtraBikes(final_data_mediocre);
      setNeedBikes(final_data_urgent);
    }
    checkBikes();
    traffic_response();
  }, [])

  const handleToggle = (i) => {
    let curr_array = trafficAlerts;
    curr_array[i] = false
    setTrafficAlerts(curr_array);
    console.log(trafficAlerts);
  }

  const handleClick = (e) => {
    e.target.parentNode.style.display = 'none';

  }
  return isLoaded ? (
    <>
      <Grid container className="style" justify="space-evenly">
        <Grid item container xs={8}>
          <Grid item className="gridLeftTop" xs={12}>
            <Card className="cardLeft" raised>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{
                  lat: 53.3498,
                  lng: -6.2603
                }}
                zoom={13}
              >
                {changed ? (<DirectionsService
                  options={{
                    origin: currentBusRoute.startpoint.toString(),
                    destination: currentBusRoute.endpoint.toString(),
                    travelMode: 'TRANSIT',
                    transitOptions: {
                      modes: ['BUS'],
                      routingPreference: 'FEWER_TRANSFERS'
                    },
                  }}
                  // required
                  callback={(result) => {
                    console.log(currentResponse, result);
                    if (result !== null) {
                      if (result.status === 'OK' && currentResponse === null) {
                        setCurrentResponse(result);
                      }
                      else if (result.status === 'OK' && result.geocoded_waypoints[0].place_id != currentResponse.geocoded_waypoints[0].place_id) {
                        setCurrentResponse(result);
                      }
                    }
                  }}
                >
                </DirectionsService>) : (null)}

                {currentResponse != null && (
                  <DirectionsRenderer
                    options={{
                      directions: currentResponse,
                    }}

                  > </DirectionsRenderer>
                )}
              </GoogleMap>
            </Card>
          </Grid>
          <Grid item className="gridLeftBottom" xs={12} style={{ marginTop: "1%" }}>
            <Card className="cardLeft-traffic" raised>
              <BikesCarousel />
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={4} height={0.3}>
          <Grid item className="gridRight-traffic" xs={12}>
            <Card className="card-traffic" raised>
              <div >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StarsRoundedIcon fontSize="large" />
                  <span style={{ fontSize: "1.5em", fontWeight: 700 }}>
                    Popular Bus Routes
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
                <div
                  className="button-wrapper"
                >
                  <ul id="box-wrapper">
                    {Object.keys(routeObj).map((key, i) => {
                      let e = routeObj[key];
                      return (
                        <li key={key}><button

                          className="buttonStyle"

                          onClick={() => handleButtonClick(key)}>
                          {e.routenumber}
                        </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <hr
                  style={{
                    color: "#000000",
                    backgroundColor: "#000000",
                    height: 0.5,
                    borderColor: "#000000",
                  }}
                />
              </div>
              <div className="suggestions-wrapper">
                < div className='suggestion-title'>
                  <StarsRoundedIcon fontSize="large" />
                  <span style={{ fontSize: "1.5em", fontWeight: 700 }}>
                    Recommendations
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


                <div className='notifications-wrapper-traffic' style={{
                  height: "40vh",
                  display: "block"
                }}>
                  {/* For Traffic */}
                  {
                    (urgentTraffic != null && trafficAlerts != null) ?
                      Object.keys(urgentTraffic).map((key, i) => {
                        let new_key = key.split('-')[1];
                        console.log(trafficAlerts)
                        if (trafficAlerts[i] === true) {
                          return (
                            <div key={key} className="alert-severe-traffic">
                              <span className="closebtn" onClick={(e) => { handleClick(e) }} >&times;</span>
                              <i className="start-icon fa fa-exclamation-triangle faa-flash animated"></i> Potential Traffic Jam at route {new_key}
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
                          <div key={value.address} className="alert-mediocre">
                            <span className="closebtn" onClick={(e) => { handleClick(e) }}>&times;</span>
                            <i className="start-icon fa fa-exclamation-triangle faa-flash animated"></i> Low Available Bikes at {value.address}
                          </div>
                        )
                      })
                      : "Null"

                  }
                  {
                    (extraBikes != null) ?
                      extraBikes.map((value, index, array) => {
                        return (
                          <div key={value.address} className="alert-low">
                            <span className="closebtn" onClick={(e) => { handleClick(e) }}>&times;</span>
                            <i className="start-icon fa fa-check-circle"></i> Extra Bikes are available at {value.address}
                          </div>
                        )
                      })
                      : "Null"

                  }
                </div>
              </div>

            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : <>Loading..</>

}
