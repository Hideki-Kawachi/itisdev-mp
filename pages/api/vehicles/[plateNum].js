import dbConnect from "../../../lib/dbConnect";
import Vehicle from "../../../models/VehicleSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.plateNum);

  let vehicleInfo = await Vehicle.findOne({ plateNum: req.query.plateNum });

  if (vehicleInfo == null) {
    console.log("error cannot find vehicle");
  } else {
    console.log("vehicle found");
  }

  res.json(vehicleInfo);
};
