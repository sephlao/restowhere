import React from "react";
import { useParams } from "react-router-dom";

export default function RestaurantList() {
  const { city } = useParams();
  return <p>hello restaurant {city}</p>;
}
