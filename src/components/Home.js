import React from "react";
import location_img from "../assets/images/my_location.svg";

export default function Home() {
  return (
    <main className="container">
      <div className="landing content">
        <div className="content-img">
          <img src={location_img} alt="location" />
        </div>
        <div className="content-msg">
          <h1>Welcome to RestoWhere</h1>
          <p>Enable device to access location for better suggestions.</p>
        </div>
        <div className="content-action">
          <button aria-label="enable" className="btn btn-primary">
            Enable location
          </button>
        </div>
      </div>
    </main>
  );
}
