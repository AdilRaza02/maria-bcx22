import React from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function DashboardTable({ devices }) {
  return (
    <>
      <div className="px-4">
        <div className="border rounded-lg border pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
            <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">Connected Devices</p>
          </div>
          <div className="px-6 pt-6 overflow-x-auto">
            <table className=" whitespace-nowrap">
              <tbody>
                {devices.map((device, index) => {
                  return (
                    <tr key={uuidv4()} className="p-6">
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="bg-gray-800 rounded-sm p-1">
                            <p className="text-white"> {index + 1}</p>
                          </div>
                          <div className="pl-3">
                            <div className="flex items-center text-sm leading-none">
                              <p className="text-blue-500 mr-1">(ID)</p>
                              <p className="font-semibold text-gray-800">{device.deviceId}</p>
                            </div>
                            <p className="text-md leading-none text-gray-600 mt-2">{device.temp.toFixed(1)}°C</p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-16">
                        <div>
                          <p className="text-sm font-semibold leading-none text-right text-gray-800">{moment(device.createdAt).fromNow()}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: `#${device.color.toString(16)}` }}></div>
                            <p className="text-sm text-gray-700">Space Light Color</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardTable;
