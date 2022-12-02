import dbConnect from "../../../../lib/dbConnect";
import FuelSensor from "../../../../models/FuelSensorSchema";

export default async (req, res) => {
  await dbConnect();

  const sensorInfo = req.body;

  let invalidID = await FuelSensor.findOne({
    FuelSensorID: sensorInfo.FuelSensorID,
  });

  let invalidName = await FuelSensor.findOne({
    name: sensorInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + sensorInfo.FuelSensorID);
    res.json(sensorInfo.FuelSensorID);
  } else if (invalidName != null) {
    console.log("INVALID NAME " + sensorInfo.name);
    res.json(sensorInfo.name);
  } else {
    await FuelSensor.create(sensorInfo);
    res.json("created");
  }
};
