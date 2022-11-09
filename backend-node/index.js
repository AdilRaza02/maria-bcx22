const express = require("express");
const { GET_DEVICES_DATA, GET_DEVICE_DATA, GET_LATEST_DEVICES_DATA } = require("./db");
const utils = require("./utils");
const app = express();
const port = 3000;
utils.CONNECT_DB();

app.get("/devices", async (req, res) => {
  try {
    const devices = await GET_DEVICES_DATA();
    res.json(devices).status(200);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong" }).status(500);
  }
});

app.get("/device/:id", async (req, res) => {
  try {
    const deviceId = req.params.id;
    const devices = await GET_DEVICE_DATA(deviceId);
    res.json(devices).status(200);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong" }).status(500);
  }
});

app.get("/latest/devices", async (req, res) => {
  try {
    const devices = await GET_LATEST_DEVICES_DATA();
    res.json(devices).status(200);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong" }).status(500);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  utils.START_DEVICE_DATA_COLLECTER();
});
