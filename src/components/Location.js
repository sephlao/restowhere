import React from "react";
import Button from "./Button";

export default function Location({ options }) {
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
