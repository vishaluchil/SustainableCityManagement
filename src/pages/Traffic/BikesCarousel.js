import React, { useState, useEffect } from "react";
import "./BikesCarousel.css";
import Carousel from "react-elastic-carousel";
import TextField from "@material-ui/core/TextField";

export default function BikesCarousel() {
  const [bikesData, setBikesData] = useState(null);
  const [bikesOriginal, setBikesOriginal] = useState(null);
  const [input, setInput] = useState("");

  useEffect(async () => {
    const bikes = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=4e4430ec0cbff179ef35047b4a05fd178d18b37f"
    ).then((res) => res.json());
    setBikesData(() => bikes);
    setBikesOriginal(() => bikes);
  }, []);

  // console.log(bikesData[0].address);

  const handleSearchChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    if (e.target.value.length > 0) {
      let bikesFiltered = bikesOriginal.filter((station) =>
        station.address.toLowerCase().match(e.target.value.toLowerCase())
          ? station
          : null
      );
      console.log(bikesFiltered);
      if (bikesFiltered) {
        setBikesData([...bikesFiltered]);
        console.log(bikesFiltered);
      } else if (bikesFiltered == null || bikesFiltered == []) {
        setBikesData([...bikesOriginal]);
        console.log(bikesFiltered);
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
      {/* <input
        className="searchBox"
        type="text"
        placeholder="Search Station Name"
        onChange={handleSearchChange}
        value={input}
      /> */}
      {bikesData ? (
        <Carousel pagination={false}>
          {bikesData.map((obj) => {
            return (
              <div style={{ width: "100%", display: "inline-block" }}>
                <div className="bikeAddress">{obj.address}</div>
                <div className="bikeContainer">
                  <div>Available Bikes: {obj.available_bikes}</div>
                  <div className="line"></div>
                  <div>Available Stands: {obj.available_bike_stands}</div>
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
