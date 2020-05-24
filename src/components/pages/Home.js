import React from "react";
import location_img from "../../assets/images/my_location.svg";
import UseLocationContainer from "../UseLocation";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <div className="landing content">
        <div className="content-img">
          <img src={location_img} alt="location" />
        </div>
        <div className="content-msg">
          <h1>Welcome to RestoWhere</h1>
          <p>
            The easiest way to find restaurants near you! Enable device to
            access location for better suggestions.
          </p>
        </div>
        <div className="content-action">
          <UseLocationContainer />
          <Link to="/restaurants" className="skip">
            Skip >
          </Link>
        </div>
      </div>
    </main>
  );
}
