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
  const [loading, setLoading] = useState(true);
  const days = [1, 2, 3, 4, 5];

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const tempWeekly = [],
      rainWeekly = [],
      humiWeekly = [],
      windWeekly = [];
    async function fetchpreDataJSON() {
      const response = await fetch(
        "https://citymanagement.herokuapp.com/weeklydata"
      );
      const preData = await response.json();
      setCloudStr(preData.cloudString);
      setIcon(preData.icon);
      for (let i = 0; i < 7; i++) {
        tempWeekly.push(preData.tempWeekly[i]);
        rainWeekly.push(preData.rainWeekly[i]);
        humiWeekly.push(preData.humidityWeekly[i]);
        windWeekly.push(preData.windWeekly[i]);
      }
      setTempWeeklyX(tempWeekly);
      setRainWeeklyX(rainWeekly);
      setHumiWeeklyX(humiWeekly);
      setWindWeeklyX(windWeekly);
      setLoading(false);
    }

    fetchpreDataJSON();
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
    <>
      {loading ? (
        <h2 className="loading-h2">Loading...</h2>
      ) : (
        <div data-testid="accordion" style={{ margin: 20 }}>
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
                  <Typography data-testid="date" className={classes.heading}>
                    {date}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {tempWeeklyX[index]}°C {cloudStr[index]}
                  </Typography>
                  <div className={icon[index]}></div>
                </AccordionSummary>
                <AccordionDetails
                  data-testid="details"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    paddingTop: 0,
                    paddingBottom: 8,
                  }}
                >
                  <Typography
                    data-testid="precipitation"
                    style={{ paddingTop: 0 }}
                  >
                    Precipitation Chance: {rainWeeklyX[index]}%
                  </Typography>
                  <Typography data-testid="humidity" style={{ paddingTop: 0 }}>
                    Humidity: {humiWeeklyX[index]}%
                  </Typography>
                  <Typography data-testid="wind" style={{ paddingTop: 0 }}>
                    Wind Speed: {windWeeklyX[index]} Km/H
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      )}
    </>
  );
}
