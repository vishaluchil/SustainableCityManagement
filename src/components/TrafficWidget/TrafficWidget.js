import React from "react";
import { Card, Grid } from "@material-ui/core";
import "./TrafficWidget.css";

export default function TrafficWidget() {
  return (
    <>
      <Grid item>
        <Card style={{ width: 250, height: 200, margin: 20 }} raised>
          <div className="image-wrapper">
            <div className="traffic-card">
            </div>
            <div className="bike-card">
            </div>
          </div>
          <p className="traffic-text">Traffic Updates</p>
        </Card>
      </Grid>
    </>
  );
}
