import React, { useState, useEffect, useRef } from "react";
import { useFetchWithAbort } from "../utils";
import { useDispatch } from "react-redux";
import { actionType } from "../redux";

import StatusBox from "./StatusBox";

import { useHistory } from "react-router-dom";

/**
 * search for restaurants based on city value
 * accepts string as city as initial value
 * queries api for restaurants in the city
 */

export default function SearchRestaurants({ initialValue }) {
  const [city, setCity] = useState();
  const [url, setUrl] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  // a change in city will cause a change in url
  // change in url will trigger use fetch
  const { data, status } = useFetchWithAbort(url);
  const inputElRef = useRef();

  useEffect(() => {
    setCity(initialValue);

    // setUrl will trigger fetch; make sure city is not empty
    if (city)
      setUrl(`https://opentable.herokuapp.com/api/restaurants?city=${city}`);

    // set restaurants from city
    if (data && status === "resolved")
      dispatch(actionType.setRestaurants(data.restaurants));
  }, [city, data, status, dispatch, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = inputElRef.current.value;
    if (search) {
      setCity(search);
      history.push(`/restaurants?search=${search}`);
    }
  };

  //TODO form component
  return (
    <header className="container header">
      <form className="search-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="search">City</label> */}
        <input
          type="text"
          name="search"
          defaultValue={city}
          ref={inputElRef}
          aria-label="city"
          placeholder="Enter a city"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {status === "pending" && <StatusBox statusText="Please wait..." />}
      {status === "rejected" && (
        <StatusBox statusText="Something went wrong, please try again later." />
      )}
    </header>
  );
}
