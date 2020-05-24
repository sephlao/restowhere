export default function reducer(state = [], action) {
  switch (action.type) {
    case "SET":
      return [...action.payload.restaurants];

    case "FILTER":
      return [...state];
    default:
      return state;
  }
}
