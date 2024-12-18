import React, { useState, useEffect } from "react";
import "../../styles/admin.css"; // Import the CSS file
import Button from '@mui/material/Button';

const Admin = () => {
  const [year, setYear] = useState(1990);

  // Example data for the graph (random for now)
  const data = Array.from({ length: 135 }, (_, i) => ({
    year: 1990 + i,
    value: Math.floor(Math.random() * 100), // Random data value
  }));

  // Handle slider change
  const handleSliderChange = (event) => {
    setYear(event.target.value);
  };


  return (
    <div className="admin-container">
      <h3>Time Graph for viewing the {year} year website</h3>

      {/* Slider with visual progress */}
      <input
        type="range"
        min="1990"
        max="2024"
        value={year}
        onChange={handleSliderChange}
        step="1"
        className="admin-slider"
      />

      {/* Tooltip showing the current year */}
      <div
        className="admin-year-tooltip"
        style={{ left: `${((year - 1990) / (2024 - 1990)) * 100}%` }}
      ></div>

      <p>Selected Year: {year}</p>
      <Button color="secondary">Enter into Time Meachine</Button>
    </div>
  );
};

export default Admin;
