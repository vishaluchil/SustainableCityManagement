import React, { useState, useEffect } from "react";
import "./BikesCarousel.css";
import Carousel from "react-elastic-carousel";
import TextField from "@material-ui/core/TextField";

export default function BikesCarousel() {
  const [bikesData, setBikesData] = useState(null);
  const [bikesOriginal, setBikesOriginal] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchBikesData = async () => {
      const bikes = await fetch(
        "https://citymanagement.herokuapp.com/bikedata"
      ).then((res) => res.json());
      setBikesData(() => bikes);
      setBikesOriginal(() => bikes);
    };
    fetchBikesData();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();

    if (e.target.value.length > 0) {

      let bikesFiltered = bikesOriginal.filter((station) =>
        station.address.toLowerCase().match(e.target.value.toLowerCase())
          ? station
          : null
      );

      if (bikesFiltered.length < 1) {
        setBikesData(() => [...bikesOriginal]);
      } else {
        setBikesData(() => [...bikesFiltered]);
      }
    }
    setInput(e.target.value);
  };

  return (
    <div style={{ display: "inline-block", color: "black", width: "100%" }}>
      <TextField
        className="searchBox"
        id="standard-basic"
        label="Search Station Name"
        onChange={handleSearchChange}
        value={input}
      />
      {bikesData ? (
        <Carousel pagination={false}>
          {bikesData.map((obj) => {
            return (
              <div style={{ width: "100%", display: "inline-block" }}>
                <div data-testid="address" className="bikeAddress">{obj.address}</div>
                <div className="bikeContainer">
                  <div data-testid="availableBikes">Available Bikes: {obj.available_bikes}</div>
                  <div className="line"></div>
                  <div data-testid="availableStands">Available Stands: {obj.available_bike_stands}</div>
                </div>
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
