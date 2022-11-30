import dbConnect from "../../../lib/dbConnect";
import Vehicle from "../../../models/VehicleSchema";

export default async (req, res) => {
  await dbConnect();

  const vehicleInfo = req.body;

  let result = await Vehicle.updateOne(
    { plateNum: vehicleInfo.plateNum },
    {
      disabled: vehicleInfo.disabled,
    }
  );

  if (result.modifiedCount == 0) {
    res.json("Edit is Invalid");
  } else {
    res.json("Vehicle Successfully Edited!");
  }
};
