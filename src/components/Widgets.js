import React from "react";
import { Card, Grid } from "@material-ui/core";

const Widget = () => {
  return (
    <React.Fragment>
      <Grid item>
        <Card style={{ width: 250, height: 200, margin: 20 }} raised></Card>
      </Grid>
    </React.Fragment>
  );
};

export default function Widgets() {
  return (
    <React.Fragment>
      <Grid
        container
        justify="space-evenly"
        alignItems="flex-end"
        style={{ marginTop: 20 }}
      >
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
      </Grid>
    </React.Fragment>
  );
}
