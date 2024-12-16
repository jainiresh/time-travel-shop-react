import React from "react";
import "./ModernLoader.css";
import { GridLoader } from "react-spinners";

const ModernLoader = ({ hidden }) => {
  return (
    <div className={`loader-container-modern ${hidden ? "hidden" : ""}`}>
      <GridLoader size={50} color="white" />
    </div>
  );
};

export default ModernLoader;
