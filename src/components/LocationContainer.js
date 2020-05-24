import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useFecthWithAbort } from "../utils";
import Location from "./Location";

export default function LocationContainer() {
  const [showButton, setShowButton] = useState(true);
  const [location, setLocation] = useState();
  const [status, setStatus] = useState();
  const [url, setUrl] = useState("");
  const history = useHistory();

  // fetch location data
  const { payload, loading, error } = useFecthWithAbort(url);

  useEffect(() => {
    if (payload) setLocation(payload.locality);
    if (!loading) setStatus("");
    if (error) setStatus("Something went wrong! Please try again.");

    if (!error && !loading && location) {
      history.push(`/restaurants?search=${location}`);
    }
  }, [payload, location, loading, error, history]);

  const successCb = useCallback(({ coords: { latitude, longitude } }) => {
    const domain = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    setUrl(`${domain}?latitude=${latitude}&longitude=${longitude}`);
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
