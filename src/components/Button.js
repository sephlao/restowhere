import React from "react";

export default function Button({ label, className, children, ...rest }) {
  return (
    <button aria-label={label} className={"btn btn-" + className} {...rest}>
      {children}
    </button>
  );
}
