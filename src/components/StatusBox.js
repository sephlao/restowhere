import React from "react";

export default function StatusBox({ statusText }) {
  return (
    <div className="status-box">
      <p className="status-text">{statusText}</p>
    </div>
  );
}
