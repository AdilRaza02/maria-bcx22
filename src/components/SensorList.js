import React from "react";
import { getTemperatures } from "../services";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function SensorList() {
  const [devices, setDevices] = React.useState([]);

  const getDevicesData = async () => {
    try {
      const { data } = await getTemperatures();
      setDevices(data);
    } catch (error) {
      alert("Error in fetching devices...");
    }
  };

  React.useEffect(() => {
    getDevicesData();
  }, []);

  return (
    <>
      <div className="flex ">
        <div className="w-full rounded shadow overflow-auto" style={{ height: "32rem" }}>
          <table className="w-full">
            <thead className="dark:bg-gray-900 bg-gray-100 sticky top-0">
              <tr>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase sm:py-8 py-4 sm:pl-6 pl-4">
                  <div className="flex items-center">Device ID</div>
                </td>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">TEMP (Current)</div>
                </td>
                {/* <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">LIGHT INTENSTY</div>
                </td>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">LIGHT COLOR</div>
                </td> */}
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">TIME</div>
                </td>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 h-">
              {devices.map((device) => {
                return (
                  <tr className="border-b border-gray-200 dark:border-gray-900" key={uuidv4()}>
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">DEVICE-{device.id}</p>
                    </td>

                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">{device.temperature} °C</p>
                    </td>
                    {/* <td className="py-4 sm:px-6 px-4">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold pr-3 leading-none text-gray-800 dark:text-gray-100">{device.lightIntensity}%</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                          <path
                            d="M16 12.0002C16 12.0668 16 12.2002 15.9333 12.2668C15.8667 12.4002 15.7333 12.5335 15.6 12.6002C15.5333 12.6668 15.4 12.6668 15.3333 12.6668H11.3333C10.9333 12.6668 10.6667 12.4002 10.6667 12.0002C10.6667 11.6002 10.9333 11.3335 11.3333 11.3335H13.7333L9 6.60016L6.13333 9.46683C5.86667 9.7335 5.46667 9.7335 5.2 9.46683L0.2 4.46683C-0.0666667 4.20016 -0.0666667 3.80016 0.2 3.5335C0.466667 3.26683 0.866667 3.26683 1.13333 3.5335L5.66667 8.06683L8.53333 5.20016C8.8 4.9335 9.2 4.9335 9.46667 5.20016L14.6667 10.4002V8.00016C14.6667 7.60016 14.9333 7.3335 15.3333 7.3335C15.7333 7.3335 16 7.60016 16 8.00016V12.0002Z"
                            fill="#EA5455"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100 capitalize">{device.lightColor}</p>
                    </td> */}
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">{moment.unix(device.timestamp).fromNow()}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!devices.length && <p className="p-2">Loading...</p>}
        </div>
      </div>
    </>
  );
}
