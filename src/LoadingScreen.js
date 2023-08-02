import React from "react";
import loadingGif from "./img/loading.gif";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={loadingGif} alt="Loading" />
    </div>
  );
}

export default LoadingScreen;
