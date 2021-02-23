import React from "react";

export default function BikesCarousel() {
  useEffect(() => {
    fetch(
      "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=4e4430ec0cbff179ef35047b4a05fd178d18b37f"
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return <div></div>;
}
