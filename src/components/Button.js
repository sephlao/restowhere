import React from "react";

/**
 * stateless;
 * renders button element with label
 */
export default function Button({ label, className, children, ...rest }) {
  return (
    <button aria-label={label} className={"btn btn-" + className} {...rest}>
      {children}
    </button>
  );
}
