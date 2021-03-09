import React from "react";
import Weather from "./Weather";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const server = setupServer(
  rest.get(
    "https://citymanagement.herokuapp.com/weatherdata",
    (req, res, ctx) => {
      return res(
        ctx.json({
          coord: {
            lon: -6.2672,
            lat: 53.344,
          },
          weather: [
            {
              id: 701,
              main: "Mist",
              description: "mist",
              icon: "50d",
            },
          ],
          base: "stations",
          main: {
            temp: 280.53,
            feels_like: 277.32,
            temp_min: 279.82,
            temp_max: 280.93,
            pressure: 1029,
            humidity: 87,
          },
          visibility: 6000,
          wind: {
            speed: 3.09,
            deg: 70,
          },
          clouds: {
            all: 75,
          },
          dt: 1614691660,
          sys: {
            type: 1,
            id: 1565,
            country: "IE",
            sunrise: 1614669020,
            sunset: 1614708263,
          },
          timezone: 0,
          id: 2964574,
          name: "Dublin",
          cod: 200,
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Weather Fetch", () => {
  it("Gets current weather", async () => {
    await act(async () => render(<Weather />));
    await waitFor(() => screen.getByTestId("currentTemp"));
    expect(screen.getByTestId("currentTemp").innerHTML).toBe("7°");
    expect(screen.getByTestId("currentFeelsLike").innerHTML).toBe(
      "Feels like 4°"
    );
    expect(screen.getByTestId("currentDesc").innerHTML).toBe("Mist");
  });
});
