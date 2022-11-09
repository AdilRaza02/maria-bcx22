import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getTemperatures = async () => {
  return await axios.get(`${BASE_URL}/devices`);
};

export const getLatestTempDashboard = async () => {
  return await axios.get(`${BASE_URL}/latest/devices`);
};


