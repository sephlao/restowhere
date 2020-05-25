import React from "react";

/**
 * stateless component; shows status text
 */
export default function StatusBox({ statusText }) {
  return (
    <div className="status-box">
      <p className="status-text">{statusText}</p>
    </div>
  );
}
