import React from "react";

import { screen, prettyDOM } from "@testing-library/react";

import { Calendar } from "../";
import { makeServer } from "../../../api";
import { renderTest } from "../../../utils";

describe("Calendar Route", () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });
  afterEach(() => {
    server.shutdown();
  });
  it("should render correctly", () => {
    renderTest(<Calendar />);
    expect(screen.getByText(/RemindMe/i)).toBeInTheDocument();
  });
});
