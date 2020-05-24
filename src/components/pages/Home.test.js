import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

describe("testing home page", () => {
  it("renders welcome to restowhere", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const linkElement = getByText(/Welcome to RestoWhere/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders use current location buttonn", () => {
    const history = createMemoryHistory();
    const { getByLabelText } = render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const linkElement = getByLabelText(/use-location/i);
    expect(linkElement).toBeInTheDocument();
  });
});
