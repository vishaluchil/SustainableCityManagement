import React, { useState, useEffect, useCallback } from "react";
import { Card, Grid } from "@material-ui/core";
import StarsRoundedIcon from "@material-ui/icons/StarsRounded";
import Button from "@material-ui/core/Button";
import BikesCarousel from "./BikesCarousel";
import {GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
const directionsUrl='https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJc-pZtZwOZ0gREjDIGajHACY&destination=place_id:ChIJ3Y7HLZsOZ0gRZ2FxjA3-ACc&mode=driving&key=AIzaSyB9cg4Hwx8RTcNsjQlrhUGS1KwX8pQfqYw';
export default function Traffic() {
  console.log(DirectionsService)
  const [currentResponse,setCurrentResponse] = useState(null);
useEffect(() => {
  if (currentResponse) {
    console.log("Distance & Duration have updated");
  }
}, [currentResponse]);
  
  const containerStyle = {
    width: "100%",
    height: "100%"
  };
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDRUrETccsBFX4-M-4hhUsja268r6Rz0AM"
  })

  const updateResponse = result=>{
    setCurrentResponse(result)
  }
  const style = {
    height: "95vh",
    margin: "20px",
  };

  const gridRight = {
    height: "98.7%",
  };

  const gridLeftTop = {
    width: "100%",
    height: "73%",
  };

  const gridLeftBottom = {
    width: "100%",
    height: "27%",
  };

  const cardLeft = {
    width: "95%",
    height: "95%",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    color: "white",
  };

  const card = {
    width: "90%",
    height: "100%",
    padding: "12px",
    margin: "10px",
  };

  const buttonStyle = {
    flex: "1 0 40%",
    margin: 10,
    height: 50,
    fontSize: "1.1rem",
  };

  return isLoaded ? (
    <>
      <Grid container style={style}>
        <Grid item container xs={8} height={1}>
          <Grid item style={gridLeftTop} xs={12}>
            <Card style={cardLeft} raised> 
            <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 53.3498,
          lng: -6.2603
        }}
        zoom={13}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      
      <DirectionsService
                    options={{ 
                      destination: '53.391176495085,-6.26219900048751',
                      origin: '53.3525169031735,-6.26392245064604',
                      travelMode: 'TRANSIT'
                    }}
                    // required
                    callback= {(result)=>{console.log(currentResponse);
                    if (currentResponse == null){
                      setCurrentResponse(result);
                    }}}
      >
      </DirectionsService>
                 
      {currentResponse!=null&&( 
        <DirectionsRenderer
          options={{ 
                    directions:currentResponse,
                  }}
                  
       > </DirectionsRenderer>
      )} 
      </GoogleMap>
      </Card>
          </Grid>
          <Grid item style={gridLeftBottom} xs={12}>
            <Card style={cardLeft} raised>
              <BikesCarousel />
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={4} height={1}>
          <Grid item style={gridRight} xs={12}>
            <Card style={card} raised>
              <div style={{ height: "50%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StarsRoundedIcon fontSize="large" />
                  <span style={{ fontSize: "1.8em", fontWeight: 700 }}>
                    Popular Routes
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
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    height: "90%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                  >
                    Route One
                  </Button>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                  >
                    Route One
                  </Button>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                  >
                    Route One
                  </Button>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                  >
                    Route One
                  </Button>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                  >
                    Route One
                  </Button>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="primary"
                  >
                    Route One
                  </Button>
                </div>
              </div>
              <div></div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : <>Loading..</>

}
