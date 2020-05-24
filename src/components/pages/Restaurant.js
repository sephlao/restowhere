import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchRestaurants from "../SearchRestaurants";
import RestaurantList from "../RestaurantList";

export default function Restaurant() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  // getting restaurants state
  const store = useSelector(({ restaurants }) => restaurants);
  const [restaurants, setRestaurants] = useState([]);

  //listen to changes in store state
  useEffect(() => {
    setRestaurants(store);
  }, [store]);

  const handleFilter = ({ target }) => {
    // filter restaurants from store
    setRestaurants(
      store.filter((r) =>
        r.name.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  };

  //could use suspense in the future
  return (
    <main className="container" style={{ display: "block" }}>
      <SearchRestaurants initialValue={search} />
      <FilterResults callbackFn={handleFilter} />
      {restaurants && <RestaurantList data={restaurants} />}
    </main>
  );
}

//todo add css on filter
function FilterResults({ callbackFn }) {
  return <input type="text" onChange={callbackFn} />;
}
