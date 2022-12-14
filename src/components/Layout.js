/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  let location = useLocation();

  const routes = ['/', '/devices', '/performance', '/settings']

  const getActiveClass = (path) => {
    if (location.pathname === path) {
      return "text-gray-300";
    }
    return "text-gray-400";
  };

  const getPageHeader = () => {
    if(!routes.includes(location.pathname)) return "Not Found"
    if (location.pathname === "/") return "DASHBOARD";
    return location.pathname.replace("/", "").toLocaleUpperCase();
  };

  return (
    <div className="flex flex-no-wrap">
      <div style={{ minHeight: "716px" }} className="w-64 absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between hidden sm:flex">
        <div className="px-6">
          <h2 className="text-white text-2xl mt-4 text-left">Maria 1.0</h2>

          <ul className="mt-8">
            <li className={`flex w-full justify-between cursor-pointer items-center mb-6 ${getActiveClass("/")}`}>
              <Link to="/">
                <div className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-grid"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                    <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                    <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                    <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                  </svg>
                  <span className="text-sm ml-2">Dashboard</span>
                </div>
              </Link>
            </li>
            <li className={`flex w-full justify-between hover:text-gray-300 cursor-pointer items-center mb-6 ${getActiveClass("/devices")}`}>
              <Link to="/devices">
                <div className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-puzzle"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
                  </svg>
                  <span className="text-sm ml-2">Devices</span>
                </div>
              </Link>
            </li>
            <li className={`flex w-full justify-between hover:text-gray-300 cursor-pointer items-center mb-6 ${getActiveClass("/performance")}`}>
              <Link to="/performance">
                <div className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-compass"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                  <span className="text-sm ml-2">Performance</span>
                </div>
              </Link>
            </li>

            <li className={`flex w-full justify-between hover:text-gray-300 cursor-pointer items-center ${getActiveClass("/settings")}`}>
              <Link to="/settings">
                <div className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-settings"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-sm ml-2">Settings</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto py-10 px-6">
        <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100 mb-4">{getPageHeader()}</h4>

        <Outlet />
      </div>
    </div>
  );
}
