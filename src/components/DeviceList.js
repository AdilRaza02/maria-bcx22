import React from "react";
import { getTemperatures } from "../services";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function DeviceList() {
  const [devices, setDevices] = React.useState([]);

  const getDevicesData = async () => {
    try {
      const { data } = await getTemperatures();
      setDevices(data);
    } catch (error) {
      alert(`Something went wrong! Code: ${error.code}`);
    }
  };

  React.useEffect(() => {
    getDevicesData();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-full rounded shadow overflow-auto" style={{ height: "32rem" }}>
          <table className="w-full">
            <thead className="dark:bg-gray-900 bg-gray-100 sticky top-0 items-center">
              <tr>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 uppercase sm:py-8 py-4 sm:pl-6 pl-4">
                  <div className="flex items-center">ID</div>
                </td>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">TEMP (Current)</div>
                </td>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">LIGHT INTENSTY (LUX)</div>
                </td>
                <td className="text-xs font-semibold text-gray-800 dark:text-gray-100 pl-6 uppercase">
                  <div className="flex items-center">LIGHT COLOR</div>
                </td>
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
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">{device.deviceId}</p>
                    </td>

                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">{device.temp.toFixed(1)} °C</p>
                    </td>
                    <td className="py-4 sm:px-6 px-4">
                      <div className="flex items-center">
                        <p className="text-sm font-semibold pr-3 leading-none text-gray-800 dark:text-gray-100">{device.lux}</p>
                      </div>
                    </td>
                    <td className="py-4 sm:pl-6 pl-4">
                      <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: `#${device.color.toString(16)}` }}></div>
                    </td>
                    <td className="py-4 sm:pl-6 pl-4">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-100">{moment(device.createdAt).fromNow()}</p>
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
