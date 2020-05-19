import React from "react";
import Pizza from './Assets/Pizza.jpg'

function HomePage() {
  return (
    <div className="home-wrapper">
      <img className="home-image" src={Pizza} alt="Pizza Image" 
      />
    </div>
  )
}

export default HomePage
