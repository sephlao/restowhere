import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Restaurant from "./Restaurant";

import { Provider } from "react-redux";
import { store } from "../../redux";

describe("testing restaurant page", () => {
  it("renders search input", () => {
    const history = createMemoryHistory();
    const { getByPlaceholderText } = render(
      <Router history={history}>
        <Provider store={store}>
          <Restaurant />
        </Provider>
      </Router>
    );
    const linkElement = getByPlaceholderText(/Enter a city/i);
    expect(linkElement).toBeInTheDocument();
  });

  // TODO add more test ie RestaurantList diff states
  // TODO test for utils
});
