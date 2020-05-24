import React from "react";

//restaurant list
export default function RestaurantList({ data }) {
  return (
    <ul>
      {data.map((r) => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
