import React from 'react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details">
        <h2>{hotel.name}</h2>
        <p>{hotel.description}</p>
        <p>Rating: {hotel.rating}</p>
        <p>Location: {hotel.address}</p>
        {/* More hotel details can go here */}
      </div>
    </div>
  );
};

export default HotelCard;
