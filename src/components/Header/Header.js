import React from "react";
import { Grid } from "@material-ui/core";
import "./Header.css"
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/")
  }
  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item lg={12} md={12} sm={12} style={{ textAlign: "center" }}>
          {/* Only used for title text */}
          <h1 id="Logo" onClick={handleClick} >Dublin Dashboard</h1>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
