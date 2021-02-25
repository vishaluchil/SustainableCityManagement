import React, { useState, useEffect } from "react";
import "./BikesCarousel.css";
import Carousel from "react-elastic-carousel";

export default function BikesCarousel() {
  const [bikesData, setBikesData] = useState(null);

  useEffect(async () => {
    const bikes = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=4e4430ec0cbff179ef35047b4a05fd178d18b37f"
    ).then((res) => res.json());
    setBikesData(() => bikes);
  }, []);

  // console.log(bikesData[0].address);

  return (
    <div style={{ display: "inline-block", color: "black", width: "100%" }}>
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
