import React, { useState, useEffect } from "react";

export default function BikesCarousel() {
  const [bikesData, setBikesData] = useState({});

  useEffect(async () => {
    const bikes = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=4e4430ec0cbff179ef35047b4a05fd178d18b37f"
    ).then((res) => res.json());
    setBikesData(() => bikes);
  }, []);

  return (
    <div style={{ color: "black" }}>
      <div></div>
      <div>
        <div>Availabke Bikes</div>
        <div></div>
        <div>Available Stands</div>
      </div>
    </div>
  );
}
