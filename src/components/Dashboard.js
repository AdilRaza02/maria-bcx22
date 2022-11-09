import React from "react";
import Map from "../assets/map1.jpg";

export default function Dashboard() {


  const sensorBaseStyle = {
    width: "80px",
    height: "50px",
  };

  const sensorOneStyle = {
    top: "130px",
    left: "150px",
    ...sensorBaseStyle
  };

  const sensorTwoStyle = {
    top: "135px",
    left: "385px",
    ...sensorBaseStyle
  };
  
  const sensorThreeStyle = {
    top: "245px",
    left: "140px",
    ...sensorBaseStyle
  };
  
  const sensorFourStyle = {
    top: "245px",
    left: "390px",
    ...sensorBaseStyle
  };
  
  const sensorFiveStyle = {
    bottom: "135px",
    left: "130px",
    ...sensorBaseStyle
  };
  
  const sensorSixStyle = {
    bottom: "135px",
    left: "265px",
    ...sensorBaseStyle
  };
  
  const sensorSevenStyle = {
    bottom: "135px",
    left: "395px",
    ...sensorBaseStyle
  };


  return (
    <div className="relative">
      <div onClick={()=>alert("Sensor 1")} style={sensorOneStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 1
      </div>
      <div onClick={()=>alert("Sensor 2")} style={sensorTwoStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 2
      </div>

      <div onClick={()=>alert("Sensor 3")} style={sensorThreeStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 3
      </div>

      <div onClick={()=>alert("Sensor 4")} style={sensorFourStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 4
      </div>
      <div onClick={()=>alert("Sensor 5")} style={sensorFiveStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 5
      </div>
      <div onClick={()=>alert("Sensor 6")} style={sensorSixStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 6
      </div>
      <div onClick={()=>alert("Sensor 7")} style={sensorSevenStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Sensor 7
      </div>

      <img height={1000} width={600} src={Map} alt="map" />
    </div>
  );
}
