const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const devices = new Schema({}, { strict: false, timestamps: true });
const Devices = mongoose.models.devices || mongoose.model("devices", devices);

const addDeviceData = async (data) => {
  const device = new Devices(data);
  return await device.save();
};

const getDevicesData = async () => {
  const devices = await Devices.find({}).sort({ createdAt: "desc" });
  return devices;
};

const getDeviceData = async (deviceId) => {
  const device = await Devices.find({ deviceId }).sort({ createdAt: "desc" });
  return device;
};

const getLatestDevicesData = async () => {
  const devices = await Devices.distinct("deviceId");
  const latestEntries = await Devices.find({ deviceId: { $in: devices } })
    .sort({ createdAt: "desc" })
    .limit(devices.length);
  return latestEntries;
};

exports.ADD_DEVICE_DATA = addDeviceData;
exports.GET_DEVICES_DATA = getDevicesData;
exports.GET_DEVICE_DATA = getDeviceData;
exports.GET_LATEST_DEVICES_DATA = getLatestDevicesData;
