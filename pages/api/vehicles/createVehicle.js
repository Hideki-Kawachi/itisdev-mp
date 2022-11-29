import dbConnect from "../../../lib/dbConnect";
import Vehicle from "../../../models/VehicleSchema";

export default async (req, res) => {
  await dbConnect();

  const vehicleInfo = req.body;
  var invalidplateNum = false;

  Vehicle.find({ plateNum: vehicleInfo.plateNum }, null, (err, result) => {
    if (err) {
      console.log(err);
      invalidplateNum = true;
    } else if (result.length > 0) {
      console.log(result);
      console.log("Plate Number is already present");
      invalidplateNum = true;
    }
  });

  if (invalidplateNum) {
    res.json("Plate Number " + vehicleInfo.plateNum + " is already taken");
  } else {
    await Vehicle.create(vehicleInfo);
    res.json("created");
  }
};
