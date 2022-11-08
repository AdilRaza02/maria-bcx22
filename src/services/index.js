import axios from "axios";

const BASE_URL = "https://c5cd-2a0c-7285-4c04-222-acc1-c892-ff92-487e.ngrok.io/api";

export const getTemperatures = async () => {
  return await axios.get(`${BASE_URL}/temperature`);
};
