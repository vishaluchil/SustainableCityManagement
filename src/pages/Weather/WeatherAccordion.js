import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Weather.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    // color: theme.palette.text.secondary,
    flexBasis: "40%",
    textAlign: "end",
  },
}));

export default function WeatherAccordion() {
  const classes = useStyles();

  const [windWeeklyX, setWindWeeklyX] = useState([]);
  const [humiWeeklyX, setHumiWeeklyX] = useState([]);
  const [rainWeeklyX, setRainWeeklyX] = useState([]);
  const [tempWeeklyX, setTempWeeklyX] = useState([]);
  const [cloudStr, setCloudStr] = useState([]);
  const [icon, setIcon] = useState([]);
  const days = [1, 2, 3, 4, 5];

  const options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    async function fetchpreDataJSON() {
      const response = await fetch(
        "https://citymanagement.herokuapp.com/weeklydata"
      );
      const preData = await response.json();
      return preData;
    }

    fetchpreDataJSON().then((preData) => {
      setCloudStr(preData.cloudString);
      setIcon(preData.icon);
      for (let i = 0; i < 7; i++) {
        setTempWeeklyX((tempWeeklyX) => [
          ...tempWeeklyX,
          preData.tempWeekly[i],
        ]);
        setRainWeeklyX((rainWeeklyX) => [
          ...rainWeeklyX,
          preData.rainWeekly[i],
        ]);
        setHumiWeeklyX((humiWeeklyX) => [
          ...humiWeeklyX,
          preData.humidityWeekly[i],
        ]);
        setWindWeeklyX((windWeeklyX) => [
          ...windWeeklyX,
          preData.windWeekly[i],
        ]); //uncomment
      }
    });
  }, []);

  const fiveDays = days.map((i) => {
    const day = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    return day.toLocaleString("en-US", options);
  });

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ margin: 20 }}>
      {fiveDays.map((date, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{date}</Typography>
              <Typography className={classes.secondaryHeading}>
                {tempWeeklyX[index]}°C {cloudStr[index]}
              </Typography>
              <div className={icon[index]}></div>
            </AccordionSummary>
            <AccordionDetails
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 0,
                paddingBottom: 8,
              }}
            >
              <Typography style={{ paddingTop: 0 }}>
                Precipitation Chance: {rainWeeklyX[index]}%
              </Typography>
              <Typography style={{ paddingTop: 0 }}>
                Humidity: {humiWeeklyX[index]}%
              </Typography>
              <Typography style={{ paddingTop: 0 }}>
                Wind Speed: {windWeeklyX[index]} Km/H
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {/* <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        square="false"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
