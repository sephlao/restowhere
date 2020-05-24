import React from "react";
import RestaurantItem from "./RestaurantItem";

//restaurant list
export default function RestaurantList({ data }) {
  return (
    <ul className="restaurant-list">
      {data.map((r) => (
        <RestaurantItem data={r} key={r.id} />
      ))}
    </ul>
  );
}
