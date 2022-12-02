import dbConnect from "../../../../../../lib/dbConnect";
import VehicleType from "../../../../../../models/VehicleTypeSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.vehicleTypeID);

  let vehicleTypeInfo = await VehicleType.findOne({
    vehicleTypeID: req.query.vehicleTypeID,
  });

  if (vehicleTypeInfo == null) {
    console.log("error cannot find vehicle type ");
  } else {
    console.log("vehicle type found");
  }

  res.json(vehicleTypeInfo);
};
