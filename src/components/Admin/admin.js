import React, { useState, useEffect } from "react";
import "./admin.css"; // Import the CSS file
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";

const Admin = () => {
  const adminPageReducer = useSelector(state => state.adminPageReducer);
  const [year, setYear] = useState(1990);
  const [isVideoVisible, setIsVideoVisible] = useState(false); // State for video visibility
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out effect

  const dispatch = useDispatch();
  console.log('In admin ', adminPageReducer.isAdminPage)

  // Preload images for background themes
  useEffect(() => {
    preloadImages();
  }, []);

  // Preload function to ensure background images are loaded
  const preloadImages = () => {
    const images = [
      "/oldenMusic.jpg", 
      "/retroMusic.jpg", 
      "/b1.jpg"
    ];
    images.forEach(image => {
      const img = new Image();
      img.src = image;
    });
  };

  // Handle slider change
  const handleSliderChange = (event) => {
    setYear(event.target.value);
  };

  let timeValue = -2;

  // Determine the theme based on the year
  const getTheme = () => {
    if (year >= 1950 && year <= 1980) {
      timeValue = -1;
      return {
        backgroundImage: "url('/oldenMusic.jpg')",
        fontFamily: "'Cinzel', serif",
        color: "brown",
      };
    } else if (year >= 1981 && year <= 2010) {
      timeValue = 0;
      return {
        backgroundImage: "url('/retroMusic.jpg')",
        fontFamily: "'Courier New', monospace",
        color: "yellow",
      };
    } else if (year >= 2011 && year <= 2024) {
      timeValue = 1;
      return {
        backgroundImage: "url('/b1.jpg')",
        fontFamily: "'Roboto', sans-serif",
        color: "#FFFFFF",
      };
    }
  };

  const theme = getTheme();

  const handleTravelClick = () => {
    setIsFadingOut(true); // Start fade-out effect on the current screen
    setTimeout(() => {
      setIsVideoVisible(true); // Show video after fade-out
      setIsFadingOut(false); // Stop fade-out effect
    }, 0);
    
    dispatch({type:'TIME_TRAVEL_FROM_ADMIN_PAGE_SAGA', payload: year});
    setIsVideoVisible(false)
  };

  if(!adminPageReducer.isAdminPage){
    console.log('Out from admin')
    return <Layout />
  }

  return (
    <div className="admin-container" style={{ fontFamily: theme.fontFamily, color: theme.color }}>
      {/* Video element for effects */}
      {isVideoVisible && (
        <div className="video-overlay">
          <video
            src="./tt.mp4"
            autoPlay
            muted
            onEnded={() => setIsVideoVisible(false)} // Hide video when it ends
          />
          <div className="video-text">Travelling to the year {year}</div>
        </div>
      )}

      {/* Background overlay with smooth transition */}
      <div
        className={`background-overlay ${isFadingOut ? "fade-out" : ""}`}
        style={{
          backgroundImage: theme.backgroundImage,
          opacity: timeValue == 1 ? 1 : 0.8,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          transition: "background-image 1s ease-in-out, opacity 1s ease-in-out", // Smooth transition
        }}
      ></div>

      <div className="year-display" style={timeValue == -1 ? { color: "brown" } : timeValue == 0 ? { color: "yellow" } : { color: "gray" }}>
        {year}
      </div>

      <h3 style={{ top: 0, left: 0, width: "100%", fontSize: "5rem" }}>Travel across time and discover the music of :</h3>

      {/* Styled Slider */}
      <div className="slider-container">
        <input
          type="range"
          min="1950"
          max="2024"
          value={year}
          onChange={handleSliderChange}
          step="1"
          className="styled-slider"
        />
        <div id="container">
          <button className="learn-more" onClick={handleTravelClick}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Travel Here</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
