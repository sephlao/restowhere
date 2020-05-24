// unified redux implementation since the app is fairly small (probably unnecessary)
// this is just to display how redux can be used in a react application
// source of truth;

import { createStore } from "redux";

// actions
export const actions = {
  ADD_RESTAURANTS: "ADD_RESTAURANTS",
};

// action type (for dispatch)
export const actionType = {
  setRestaurants(data) {
    return {
      type: actions.ADD_RESTAURANTS,
      payload: {
        restaurants: data,
      },
    };
  },
};

// reducer
export function reducer(state = {}, action) {
  switch (action.type) {
    case actions.ADD_RESTAURANTS:
      return { ...state, restaurants: action.payload.restaurants };

    // todo add more cases
    default:
      return state;
  }
}

// creating store
export const store = createStore(reducer);
