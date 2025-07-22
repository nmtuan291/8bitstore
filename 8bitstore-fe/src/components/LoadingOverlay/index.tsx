import React from "react";
import Loader from "./Loader";
import "./LoadingOverlay.scss";

const LoadingOverlay: React.FC = () => {

  return (
    <div className="loading-overlay">
      <Loader></Loader>
    </div>
  );
}

export default LoadingOverlay;