import React from "react"

 import "../assets/Timer.css";

const Win = ({ name }) => {

  return (
    <div className="container d-flex flex-column align-items-center h-100 ">
        <div className="row  align-self-center justify-content-center my-auto mb-1">
          <h1 className="green typewriter">Well Played, {name}.</h1>
          
        </div>
      <div className="row d-flex align-self-center mt-4">
        <div className="col d-flex justify-content-center ">
          <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/mqqft2x_Aa4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullscreen></iframe>
          </div>
        </div> 
      </div>
      <div className="row d-flex align-self-center my-auto mt-3">
        <div className="col d-flex justify-content-center ">
            
        </div> 
      </div>
    </div>
  );
};

export default Win