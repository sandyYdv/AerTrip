import React, { useState } from "react";
import "./FlightSearch.css";
import jsonData from "../../data/api-data.json";
import FlightFilter from "./FlightFilter";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [trip, setTrip] = useState("OneWay");
  const [searchedFlight, setSearchedFlight] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  let flights = [];
  let price = {};

  jsonData.data.flights.map((items) => {
    return items.results.j.map((j) => {
      return j.leg.map((leg) => {
        return leg.flights.forEach((i) => {
          flights.push(i);
        });
      });
    });
  });

  jsonData.data.flights.map((items) => {
    return items.results.j.forEach((item) => {
      price[item.al] = item.farepr;
    });
  });

  const filteredData = flights.map((item) => {
    return { ...item, farepr: price[item.al] };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedFlight(
      filteredData.filter((flight) => {
        return flight.fr === from && flight.to === to;
      })
    );
    setIsSearched(true);
    console.log(passengers);
    console.log(filteredData);
  };

  return (
    <div>
      <div className="search">
        <div className="input-container">
          <div className="input-content">
            <select onChange={(e) => setTrip(e.target.value)}>
              <option value="OneWay">OneWay</option>
              <option value="Return">Return</option>
              <option value="MultiCity">MultiCity</option>
            </select>
            <select onChange={(e) => setPassengers(e.target.value)}>
              <option value="1">1 Passanger</option>
              <option value="2">2 Passanger</option>
              <option value="3">3 Passanger</option>
              <option value="4">4 Passanger</option>
            </select>
            <select>
              <option value="Economy">Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
            </select>
          </div>
          <div className="recent-search">
            <button>Recent Search</button>
          </div>
        </div>
        <div className="search-form-container">
          <form onSubmit={handleSubmit} className="flight-search">
            <div className="search-container">
              <div className="search-box">
                <label htmlFor="from">From</label>
                <input
                  type="text"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter origin city"
                  required
                />
              </div>
              <div className="search-box">
                <label htmlFor="to">To</label>
                <input
                  type="text"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Enter destination city"
                  required
                />
              </div>
            </div>
            <div className="search-container">
              <div className="search-box">
                <label htmlFor="depart-date">Depart</label>
                <input
                  type="date"
                  id="depart-date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  required
                  
                />
              </div>
              {trip === "Return" && (
                <div className="search-box">
                  <label htmlFor="return-date">Return</label>
                  <input
                    type="date"
                    id="return-date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    optional // Indicate optional return date
                  />
                </div>
              )}
            </div>
            <button className="search-btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      {isSearched && <FlightFilter flight={searchedFlight} />}
      {/* {searchedFlight.map((flight, index) => {
        return (
          <div key={index}>
            <FlightSearchResult flight={flight} />
          </div>
        );
      })} */}
    </div>
  );
};

export default FlightSearch;
