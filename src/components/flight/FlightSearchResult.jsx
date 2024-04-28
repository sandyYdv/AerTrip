import React from "react";
import "./FlightSearchResult.css";
const FlightSearchResult = ({ flight }) => {
  const hours = Math.floor(flight.ft / 3600);
  const minutes = (flight.ft % 3600) / 60;

  return (
    <div>
      <div className="flight-search-result-card">
        <div className="flight-info">
          <div className="airline">
            <h3>{flight.al}</h3>
          </div>
          <div className="departure">
            <h3>{flight.fr}</h3>
            <p>{flight.dt}</p>
          </div>
          <div className="duration">
            <p>{`${hours}:${minutes}`}</p>
          </div>
          <div className="arrival">
            <h3>{flight.to}</h3>
            <p>{flight.at}</p>
          </div>
        </div>
        <div className="price">
          <h2>${flight.farepr}</h2>
        </div>
        <div>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResult;
