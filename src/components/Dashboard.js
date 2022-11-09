import React from "react";
import Map from "../assets/map1.jpg";
import DashboardTable from "./DashboardTable";
import { getLatestTempDashboard } from "../services";

export default function Dashboard() {
  const sensorBaseStyle = {
    width: "80px",
    height: "50px",
  };

  const sensorOneStyle = {
    top: "130px",
    left: "150px",
    ...sensorBaseStyle,
  };

  const sensorTwoStyle = {
    top: "135px",
    left: "385px",
    ...sensorBaseStyle,
  };

  const sensorThreeStyle = {
    top: "245px",
    left: "140px",
    ...sensorBaseStyle,
  };

  const sensorFourStyle = {
    top: "245px",
    left: "390px",
    ...sensorBaseStyle,
  };

  const sensorFiveStyle = {
    bottom: "135px",
    left: "130px",
    ...sensorBaseStyle,
  };

  const sensorSixStyle = {
    bottom: "135px",
    left: "265px",
    ...sensorBaseStyle,
  };

  const sensorSevenStyle = {
    bottom: "135px",
    left: "395px",
    ...sensorBaseStyle,
  };

  const [deviceData, setDeviceData] = React.useState([]);

  const getLatestConnectedDevicesData = async () => {
    try {
      const { data } = await getLatestTempDashboard();
      const sortedData = data.sort((e1, e2) => e1.deviceId.toLowerCase().localeCompare(e2.deviceId.toLowerCase()));
      setDeviceData(sortedData);
      if (!sortedData.length) {
        alert("No Devices Connected!");
      }
    } catch (error) {
      console.log(error)
      alert(`Something went wrong! Code: ${error.code}`);
    }
  };

  React.useEffect(() => {
    getLatestConnectedDevicesData();
    // setInterval(() => {
    //   getLatestConnectedDevicesData();
    // }, 5000);
  }, []);

  return (
    <div className="relative flex items-center">
      <img height={200} width={200} src={Map} alt="map" className="w-fit" />
      <div onClick={() => alert("Device 1")} style={{ ...sensorOneStyle }} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Device01
      </div>
      <div style={sensorTwoStyle} className="text-white text-xs p-2 text-center absolute cursor-pointer">
        Device N/A
      </div>

      <div style={sensorThreeStyle} className="text-white text-xs p-2 text-center absolute cursor-pointer">
        Device N/A
      </div>

      <div style={sensorFourStyle} className="text-white text-xs p-2 text-center absolute cursor-pointer">
        Device N/A
      </div>
      <div onClick={() => alert("Device 5")} style={sensorFiveStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Device03
      </div>
      <div style={sensorSixStyle} className="text-white text-xs p-2 text-center absolute cursor-pointer">
        Device N/A
      </div>
      <div onClick={() => alert("Device 7")} style={sensorSevenStyle} className="text-white text-sm p-2 text-center absolute cursor-pointer">
        Device02
      </div>

      {deviceData.length ? <DashboardTable devices={deviceData} className="w-fit" /> : <span></span>}
    </div>
  );
}
