import React from 'react';
import './RetroLoader.css';

const RetroLoader = ({hidden}) => {
  return (
    <div className={`loader-container-retro ${hidden ? "hidden" : ""} old-loader`}>
      <p className="neon">Loading...</p>
    </div>
  );
};

export default RetroLoader;
