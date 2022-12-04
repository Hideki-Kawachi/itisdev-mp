import dbConnect from "../../../../../lib/dbConnect";
import FuelSensor from "../../../../../models/FuelSensorSchema";

export default async (req, res) => {
  await dbConnect();

  const sensorInfo = req.body;

  let invalidName = await FuelSensor.findOne({
    name: sensorInfo.name,
  });

  if (invalidName != null && sensorInfo.FuelSensorID != invalidName.FuelSensorID) {
    console.log("NAME EXISTS " + sensorInfo.name);
    res.json(sensorInfo.name);
  } else {
    let result = await FuelSensor.updateOne(
      { FuelSensorID: sensorInfo.FuelSensorID},
      {
        FuelSensorID: sensorInfo.FuelSensorID,
        name: sensorInfo.name,
        disabled: sensorInfo.disabled,
      }
    );

    if (result.modifiedCount == 0 && result.matchedCount > 0) {
      res.json("No Fields Edited");
    } else if (result.modifiedCount == 0) {
      res.json("Edit is Invalid");
    } else {
      res.json("Successfully Edited!");
    }
  }
};
