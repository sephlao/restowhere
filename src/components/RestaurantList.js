import React from "react";
import RestaurantItem from "./RestaurantItem";

/**
 * stateless component; accepts data as props
 * loops through data to display restaurant info
 */
export default function RestaurantList({ data }) {
  return (
    <ul className="restaurant-list">
      {data.map((r) => (
        <RestaurantItem data={r} key={r.id} />
      ))}
    </ul>
  );
}
