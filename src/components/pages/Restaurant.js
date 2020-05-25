import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchRestaurants from "../SearchRestaurants";
import RestaurantList from "../RestaurantList";
import StatusBox from "../StatusBox";

export default function Restaurant() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  // getting restaurants state
  const store = useSelector(({ restaurants }) => restaurants);
  const [restaurants, setRestaurants] = useState([]);
  const [refine, setRefine] = useState(false);

  //listen to changes in store state
  useEffect(() => {
    setRestaurants(store);
  }, [store]);

  const handleFilter = ({ target }) => {
    // filter restaurants from store
    const keyword = target.value.toLowerCase();
    const hasKeyword = ({ name, address, price }) => {
      return (
        name.toLowerCase().includes(keyword) ||
        address.toLowerCase().includes(keyword) ||
        price.toString().includes(keyword)
      );
    };

    const equalsKeyword = ({ name, address, price }) => {
      if (keyword.length < 2) return true; // start refined search when keyworld has more than 3 characters
      return (
        name.toLowerCase() === keyword ||
        address.toLowerCase() === keyword ||
        price.toString() === keyword
      );
    };

    setRestaurants(store.filter(refine ? equalsKeyword : hasKeyword));
  };

  const handleRefineClick = ({ target }) => {
    setRefine(target.checked);
  };

  // could use suspense in the future
  // renders search bar on header,
  // main component for restaurant page
  return (
    <>
      <SearchRestaurants initialValue={search} />
      <main className="container restaurants">
        {store && store.length > 0 && (
          <FilterResults
            filterCallbackFn={handleFilter}
            refineCallbackFn={handleRefineClick}
          />
        )}
        {restaurants && <RestaurantList data={restaurants} />}
      </main>
      {store && store.length === 0 && <StatusBox statusText={`No results`} />}
    </>
  );
}

function FilterResults({ filterCallbackFn, refineCallbackFn }) {
  return (
    <form className="filter-form">
      <input
        type="text"
        onChange={filterCallbackFn}
        name="filter"
        aria-label="filter"
        placeholder="Filter by name, address or price"
      />
      <input
        type="checkbox"
        name="refine"
        id="refine"
        onChange={refineCallbackFn}
      />
      <label htmlFor="refine">Refine</label>
    </form>
  );
}
