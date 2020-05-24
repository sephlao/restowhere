import React, { useState, useEffect, useRef } from "react";
import { useFetchWithAbort } from "../utils";
import { useDispatch } from "react-redux";
import { actionType } from "../redux";

/**
 * search for restaurants based on city value
 */

export default function SearchRestaurants({ initialValue }) {
  const [city, setCity] = useState(initialValue);
  const [url, setUrl] = useState();
  const dispatch = useDispatch();

  // a change in city will cause a change in url
  // change in url will trigger use fetch
  const { data, status } = useFetchWithAbort(url);
  const inputElRef = useRef();

  useEffect(() => {
    if (city)
      setUrl(`http://opentable.herokuapp.com/api/restaurants?city=${city}`);

    if (data && status === "resolved") {
      // set restaurants from city
      dispatch(actionType.setRestaurants(data.restaurants));
    }
  }, [city, data, status, dispatch]);

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
