import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useCityLocation } from "../utils";
import Location from "./Location";

export default function LocationContainer() {
  const [showButton, setShowButton] = useState(true);
  const [status, setStatus] = useState();
  const [coordinates, setCoordinates] = useState("");
  const history = useHistory();

  //returns city from coordinates
  const city = useCityLocation(coordinates);

  useEffect(() => {
    if (city) {
      history.push(`/restaurants?search=${city}`);
    }
  }, [city, history]);

  const successCb = useCallback(({ coords }) => {
    setCoordinates(coords);
  }, []);

  const errorCb = useCallback(() => {
    setStatus("Unable to retrieve your location");
  }, []);

  const handleClick = () => {
    // on click hide button and check if geolocation is supported
    setShowButton(false);
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported in your browser");
      return;
    }
    // if supported get coordinates
    setStatus("Locating, please wait...");
    navigator.geolocation.getCurrentPosition(successCb, errorCb);
  };

  return (
    <Location
      options={{
        showButton,
        handleClick,
        status,
      }}
    />
  );
}
