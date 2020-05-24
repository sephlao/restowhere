import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useCityLocation } from "../utils";
import Button from "./Button";

/**!! merged two related components in single files since both are used once in the entire app !!**/

/**
 * usage: import UseLocationContainer from './UseLocation'
 * <UseLocationContainer />
 * statefull component - renders a button and accesses location base on coordinates when clicked
 */
export default function UseLocationContainer() {
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

/**
 * usage: import {UseLocation} from './UseLocation'
 * <UseLocation options={{}} />
 * stateless component
 */
export function Location({ options }) {
  const { showButton, handleClick, status } = options;
  return (
    <>
      {showButton && (
        <Button label="use-location" className="primary" onClick={handleClick}>
          Use current location
        </Button>
      )}

      {status && <p className="status-text">{status}</p>}
    </>
  );
}
