// custom hook utils
import { useState, useEffect, useRef } from "react";

// fetch data from api
export function useFetchWithAbort(url) {
  const [data, setData] = useState();
  const [status, setStatus] = useState("idle"); // idle | pending | resolved | rejected

  useEffect(() => {
    if (!Boolean(url)) return;
    setStatus("pending");
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then(
        (payload) => {
          setData(payload);
          setStatus("resolved");
        },
        (error) => {
          setStatus("rejected");
          console.log(error);
          //TODO error handling
          // throw error;
        }
      );

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, status };
}

// return city from coodinates using 3rd party api
export function useCityLocation(coordinates) {
  //useCityLocation
  const [city, setCity] = useState("");
  const [url, setUrl] = useState("");
  const { data, status } = useFetchWithAbort(url);
  useEffect(() => {
    if (!coordinates) return; //exit
    const { latitude, longitude } = coordinates;
    setUrl(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
    );

    if (status === "resolved") {
      setCity(data.locality);
    }

    // return () => {
    //   console.log("perform cleanup on useCityLocation");
    // };
  }, [coordinates, data, status]);

  return city;
}
