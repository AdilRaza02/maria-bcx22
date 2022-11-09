const { SerialPort } = require("serialport");
const mongoose = require("mongoose");
const { ADD_DEVICE_DATA } = require("./db");

const dotenv = require("dotenv");
dotenv.config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION_STRING;


const getDevices = async () => {
  const MICROSOFT_VENDOR_ID = "239A";
  const devices = await SerialPort.list();
  const adafruitDevices = devices.filter((device) => {
    if (device.hasOwnProperty("vendorId") && device.vendorId === MICROSOFT_VENDOR_ID) {
      return device;
    }
    return null;
  });
  return adafruitDevices;
};

const collectDeviceData = async () => {
  const devices = await getDevices();
  devices.forEach(({ path }) => {
    const port = new SerialPort({
      path,
      baudRate: 9600,
    }).setEncoding("utf8");

    port.on("data", async (data) => {
      try {
        const Data = JSON.parse(data);
        ADD_DEVICE_DATA(Data)
        console.log(Data);
      } catch (error) {
        console.log(error);
      }
    });
    port.on("error", (error) => console.log(error));
  });
};

const connectDB = () => {
  mongoose.connect(MONGO_CONNECTION);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

exports.START_DEVICE_DATA_COLLECTER = collectDeviceData;
exports.CONNECT_DB = connectDB;
