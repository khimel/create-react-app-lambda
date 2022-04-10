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
          <iframe
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />
          </div>
        </div> 
      </div>
      <div className="row d-flex align-self-center my-auto mt-3">
        <div className="col d-flex justify-content-center ">
            <h2 className="white">Try watching the new Batman movie, it's worth it!</h2>
        </div> 
      </div>
    </div>
  );
};

export default Win