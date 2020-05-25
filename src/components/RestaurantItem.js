import React from "react";

/**
 * stateless; accepts data object for restaurant info
 * returns template with all relevant data
 */
export default function RestaurantItem({ data }) {
  const { name, address, city, image_url, price, reserve_url } = data;
  return (
    <li className="restaurant-item">
      <div className="content restaurant">
        <div className="content-img">
          <img src={image_url} alt={name} />
        </div>
        <div className="content-msg">
          <h2>{name}</h2>
          <h3>
            Address: {address}, {city}
          </h3>
          <p>Price: ${price}</p>
          <a target="_blank" rel="noopener noreferrer" href={reserve_url}>
            Reserve
          </a>
        </div>
      </div>
    </li>
  );
}
