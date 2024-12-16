import React from 'react';
import './VintageLoader.css';

const VintageLoader = ({hidden}) => {
  return (
    <div className={`loader-container-vintage ${hidden ? "hidden" : ""} very-old-loader`}>
      <div className="cog"></div>
      <p>Loading...</p>
    </div>
  );
};

export default VintageLoader;
