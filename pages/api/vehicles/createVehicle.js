import dbConnect from "../../../lib/dbConnect";
import Vehicle from "../../../models/VehicleSchema";

export default async (req, res) => {
  await dbConnect();

  const vehicleInfo = req.body;
  let invalidPlateNum = await Vehicle.findOne({ plateNum: vehicleInfo.plateNum });

	if (invalidPlateNum != null) {
    console.log("INVALID");
    res.json(vehicleInfo.plateNum);
  } else {
    await Vehicle.create(vehicleInfo);
    res.json("created");
  }

};
