import React from "react";
import BikesCarousel from "./BikesCarousel";
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
        "https://citymanagement.herokuapp.com/bikedata",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        number: 42,
                        contract_name: "dublin",
                        name: "SMITHFIELD NORTH",
                        address: "Smithfield North",
                        position: {
                            lat: 53.349562,
                            lng: -6.278198
                        },
                        banking: false,
                        bonus: false,
                        bike_stands: 30,
                        available_bike_stands: 9,
                        available_bikes: 21,
                        status: "OPEN",
                        last_update: 1620125974000
                    }
                ])
            );
        }
    ))

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Display Bikes Carousel", () => {
    it("Gets current station name", async () => {
        await act(async () => render(<BikesCarousel />));
        await waitFor(() => screen.getByTestId("address"));
        expect(screen.getByTestId("address").innerHTML).toBe("Smithfield North");
    });

    it("Gets current available bikes", async () => {
        await act(async () => render(<BikesCarousel />));
        await waitFor(() => screen.getByTestId("availableBikes"));
        expect(screen.getByTestId("availableBikes").innerHTML).toBe("Available Bikes: 21");
    });

    it("Gets current available stands", async () => {
        await act(async () => render(<BikesCarousel />));
        await waitFor(() => screen.getByTestId("availableStands"));
        expect(screen.getByTestId("availableStands").innerHTML).toBe("Available Stands: 9");
    });

})