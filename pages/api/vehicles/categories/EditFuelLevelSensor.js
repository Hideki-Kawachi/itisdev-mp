import dbConnect from "../../../lib/dbConnect";
import FuelSensor from "../../../../models/FuelSensorSchema";

export default async (req, res) => {
  await dbConnect();

  const sensorInfo = req.body;

  let result = await FuelSensor.updateOne(
    { FuelSensorID: sensorInfo.FuelSensorID },
    {
      name: sensorInfo.name,
      disabled: sensorInfo.disabled,
    }
  );

  if (result.modifiedCount == 0 && result.matchedCount > 0) {
    res.json("No Fields Edited");
  } else if (result.modifiedCount == 0) {
    res.json("Edit is Invalid");
  } else {
    res.json("Option Successfully Edited!");
  }
};
