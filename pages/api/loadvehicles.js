import dbConnect from "../../../lib/dbConnect";
import Vehicle from "../../../models/VehicleSchema";

export default async () => {
  await dbConnect();

  let vehicleList = await Vehicle.find();

  res.json(vehicleList);
};
