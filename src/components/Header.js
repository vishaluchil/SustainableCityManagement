import React from "react";
import { Grid, Button } from "@material-ui/core";
import "./Header.css";
export default function Header() {
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item lg={6} md={6} sm={6}>
          {/* Only used for title text */}
          <h1 id='Logo'>Smart Dublin</h1>
        </Grid>

        <Grid /* All Icons/Buttons for navigation */
          container
          item
          lg={6}
          md={6}
          sm={6}
          justify="flex-end"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Button variant="contained" color="primary">
              One
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Two
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Three
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Four
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Five
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
