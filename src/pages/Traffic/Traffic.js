import React, { useState, useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import tt from '@tomtom-international/web-sdk-maps';
import "./../../assets/ui-library/index.css";
import "../../maps.css";
export default function Traffic() {
  useEffect(()=>{ 
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + "/sdk/tomtom.min.js";
    document.body.appendChild(script);
    script.async = true;
    script.onload = function () {
      var map = tt.map({
          //source: 'vector',
          key: 'ikSdz6fUg3KdfAz8A7TJtdSHxGDcHP9p',
          container: 'map',
          //style: 'tomtom://vector/1/basic-main'
          stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true
          }
        });
       
      //map.project(new tt.LngLat.convert([-7.77832031,53.3498]))
      map.setCenter(new tt.LngLat.convert([-7.77832031,53.3498]));
      
       map.flyTo({
         center:{
           lng: -6.27,
           lat: 53.342,
         },
         zoom: 12,

       });
      
      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
        
      }});
  const style = {
    height: "95vh",
    margin: "20px",
  };

  const gridRight = {
    height: "95%",
  };

  const gridLeftTop = {
    width: "100%",
    height: "73%",
  };

  const gridLeftBottom = {
    width: "100%",
    height: "20%",
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

  const cardAccordion = {
    width: "90%",
    height: "100%",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  
  const map={
    width: "97%",
    height: "95%",
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    color: "white",
  }

  return (
    <>
      <Grid container style={style}>
        <Grid item container xs={8} height={1}>
          <Grid item style={gridLeftTop} xs={12}>
            <Card style={cardLeft} raised><div id = "map" style={map} > </div></Card>
          </Grid>
          <Grid item style={gridLeftBottom} xs={12}>
            <Card style={cardLeft} raised></Card>
          </Grid>
        </Grid>
        <Grid item container xs={4} height={1}>
          <Grid item style={gridRight} xs={12}>
            <Card style={card} raised></Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
