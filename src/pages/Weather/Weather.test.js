import React from "react";
import Weather from "./Weather";
import WeatherAccordion from "./WeatherAccordion";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
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
  ),
  rest.get(
    "https://citymanagement.herokuapp.com/weeklydata",
    (req, res, ctx) => {
      return res(
        ctx.json({
          tempWeekly: { 0: 4, 1: 4, 2: 4, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5 },
          rainWeekly: {
            0: 16,
            1: 23,
            2: 26,
            3: 28,
            4: 28,
            5: 28,
            6: 28,
            7: 29,
          },
          humidityWeekly: {
            0: 86,
            1: 88,
            2: 88,
            3: 86,
            4: 85,
            5: 86,
            6: 86,
            7: 86,
          },
          cloudWeekly: {
            0: 76,
            1: 74,
            2: 68,
            3: 62,
            4: 70,
            5: 75,
            6: 75,
            7: 74,
          },
          windWeekly: {
            0: 21,
            1: 23,
            2: 25,
            3: 27,
            4: 28,
            5: 29,
            6: 31,
            7: 31,
          },
          cloudString: [
            "Mostly Cloudy",
            "Mostly Cloudy",
            "Mostly Cloudy",
            "Mostly Cloudy",
            "Mostly Cloudy",
            "Mostly Cloudy",
            "Mostly Cloudy",
          ],
          icon: ["w03d", "w03d", "w03d", "w03d", "w03d", "w03d", "w03d"],
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

  it("Gets daily prediction", async () => {
    await act(async () => {
      render(<WeatherAccordion />);
      await waitFor(() => screen.getAllByTestId("accordion")[0]);
      fireEvent.click(screen.getAllByTestId("date")[0]);
      await waitFor(() => screen.getAllByTestId("details"));

      expect(screen.getAllByTestId("precipitation")[0]).toHaveTextContent(
        "Precipitation Chance: 16%"
      );
      expect(screen.getAllByTestId("humidity")[0]).toHaveTextContent(
        "Humidity: 86%"
      );
      expect(screen.getAllByTestId("wind")[0]).toHaveTextContent(
        "Wind Speed: 21 Km/H"
      );
    });
  });
});
