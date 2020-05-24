import React from "react";
import { useLocation } from "react-router-dom";

export default function Restaurant() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  console.log(search);
  return <main className="container">{/*  */} sdfsdf</main>;
}
