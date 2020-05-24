// custom hook utils
import { useState, useRef, useEffect } from "react";

export function useFecthWithAbort(url) {
  const [payload, setPayload] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);
  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then(
        (result) => {
          if (isMountedRef.current) {
            setPayload(result);
            setLoading(false);
          }
        },
        (error) => {
          if (isMountedRef.current) {
            setError(error);
            setLoading(false);
          }
        }
      );

    return () => {
      isMountedRef.current = false;
      controller.abort();
    };
  }, [url]);
  return { payload, error, loading };
}
