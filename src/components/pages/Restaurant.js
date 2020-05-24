import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useFetchWithAbort } from "../../utils";

// import store from "../store";
import { store, actionType } from "../redux";

export default function Restaurant() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setRestaurants(store.getState());
    });

    return () => unsub();
  }, []);

  const handleFilter = ({ target }) => {
    // filter restaurants from store
    const filteredRestaurants = store
      .getState()
      .filter((r) => r.name.includes(target.value));
    setRestaurants(filteredRestaurants);
  };

  //could use suspense in the future
  return (
    <main className="container" style={{ display: "block" }}>
      <SearchLocationContainer initialValue={search} />
      <input type="text" onKeyUp={handleFilter} />
      {restaurants && <RestaurantList data={restaurants} />}
    </main>
  );
}

//search location
function SearchLocationContainer({ initialValue }) {
  const [city, setCity] = useState(initialValue);
  const [url, setUrl] = useState();

  // a change in city will cause a change in url
  // change in url will trigger use fetch
  const { data, status } = useFetchWithAbort(url);
  const inputElRef = useRef();

  useEffect(() => {
    if (city)
      setUrl(`http://opentable.herokuapp.com/api/restaurants?city=${city}`);

    if (data && status === "resolved") {
      // set restaurants from city
      store.dispatch(actionType.setRestaurants(data.restaurants));
    }
  }, [city, data, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = inputElRef.current.value;
    setCity(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">City:</label>
      <input defaultValue={initialValue} id="search" ref={inputElRef} />

      {status === "pending" && <p className="status-text">Please wait...</p>}
      {status === "rejected" && (
        <p className="status-text">
          Something went wrong, please try again later.
        </p>
      )}
    </form>
  );
}

//restaurant list
function RestaurantList({ data }) {
  console.log(data);
  return (
    <ul>
      {data.map((r) => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
