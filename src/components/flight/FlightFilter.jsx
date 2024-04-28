import React, { useEffect, useState } from "react";
import "./FlightFilter.css";
import FlightSearchResult from "./FlightSearchResult";
import Slider from "@mui/material/Slider";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

const FlightFilter = ({ flight }) => {
  const [sortBy, setSortBy] = useState("");
  const [sortedFlights, setSortedFlights] = useState(flight);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const MAX = 100;
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];
  const [val, setVal] = useState(MIN);
  const handleChange = (_, newValue) => {
    setVal(newValue);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };
  const clearFilter = () => {
    setSortBy("");
    setVal(MIN);
  };

  useEffect(() => {
    setSortedFlights(flight);
  }, [flight]);

  useEffect(() => {
    const sortedFlights = [...flight].sort((a, b) => {
      if (sortBy === "price") {
        return a.farepr - b.farepr;
      } else if (sortBy === "duration") {
        return a.ft - b.ft;
      } else if (sortBy === "depart") {
        const [aHours, aMinutes] = a.dt.split(":");
        const [bHours, bMinutes] = b.dt.split(":");
        return (
          parseInt(aHours) * 60 +
          parseInt(aMinutes) -
          (parseInt(bHours) * 60 + parseInt(bMinutes))
        );
      } else if (sortBy === "arrival") {
        const [aHours, aMinutes] = a.at.split(":");
        const [bHours, bMinutes] = b.at.split(":");
        return (
          parseInt(aHours) * 60 +
          parseInt(aMinutes) -
          (parseInt(bHours) * 60 + parseInt(bMinutes))
        );
      } else {
        return 0;
      }
    });
    setSortedFlights(sortedFlights);
  }, [sortBy, flight]);
  return (
    <div className="filter-container">
      <div className="filter-content">
        <select value={sortBy} onChange={handleSort}>
          <option value="" defaultValue={""}>
            Sort
          </option>
          <option value="price">Price Low to high</option>
          <option value="duration">Duration Shortest First</option>
          <option value="depart">Depart Earliest First</option>
          <option value="arrival">Arrival Earliest First</option>
        </select>
        <button onClick={openModal}>Price</button>
        {showModal && (
          <Modal onClose={closeModal}>
            <Box sx={{ width: 250 }}>
              <Slider
                marks={marks}
                step={10}
                value={val}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={handleChange}
              />
            </Box>
          </Modal>
        )}
        <button className="clear-btn" onClick={clearFilter}>
          Clear
        </button>
        <p>{`${sortedFlights.length} of ${flight.length} Flights`}</p>
      </div>
      <div>
        {sortedFlights.map((flight, index) => {
          return (
            <div key={index}>
              <FlightSearchResult flight={flight} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlightFilter;
