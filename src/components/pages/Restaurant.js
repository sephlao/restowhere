import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetchWithAbort } from "../../utils";

import store from "../store";

export default function Restaurant() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");

  const [restaurants, setRestaurants] = useState([]);

  // const { payload, loading, error } = useFecthWithAbort(
  //   `http://opentable.herokuapp.com/api/restaurants?city=${city}`
  // );
  useEffect(() => {
    //todo store in redux
    const unsub = store.subscribe(() => {
      setRestaurants(store.getState());
    });

    return () => unsub();
  }, []);

  //could use suspense in the future
  return (
    <main className="container">
      <SearchLocationContainer initialValue={search} />
      {restaurants && <RestaurantList data={restaurants} />}
    </main>
  );
}

//search location
function SearchLocationContainer({ initialValue }) {
  const [city, setCity] = useState(initialValue);
  const [url, setUrl] = useState();
  const { payload, loading, error } = useFetchWithAbort(url);

  useEffect(() => {
    if (city)
      setUrl(`http://opentable.herokuapp.com/api/restaurants?city=${city}`);

    console.log("payload", payload);
  }, [city]);

  const handleChange = ({ target }) => {
    console.log(target.value);
    setCity(target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input defaultValue={initialValue} onChange={handleChange} />

      {loading && <p className="status-text">Please wait...</p>}
      {error && (
        <p className="status-text">
          Something went wrong, please try again later.
        </p>
      )}
    </div>
  );
}

//restaurant list
function RestaurantList({ data }) {
  return (
    <ul>
      {data.map((r) => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  );
}
