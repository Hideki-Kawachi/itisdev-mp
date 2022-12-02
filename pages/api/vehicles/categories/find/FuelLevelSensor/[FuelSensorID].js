import dbConnect from "../../../../../../lib/dbConnect";
import FuelSensor from "../../../../../../models/FuelSensorSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.FuelSensorID);

  let sensorInfo = await FuelSensor.findOne({
    FuelSensorID: req.query.FuelSensorID,
  });

  if (sensorInfo == null) {
    console.log("error cannot find sensor");
  } else {
    console.log("sensor found");
  }

  res.json(sensorInfo);
};
