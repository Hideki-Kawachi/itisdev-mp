import dbConnect from "../../../../../lib/dbConnect";
import VehicleType from "../../../../../models/VehicleTypeSchema";

export default async (req, res) => {
await dbConnect();

const vehicleTypeInfo = req.body;

 let invalidName = await VehicleType.findOne({
   name: vehicleTypeInfo.name,
 });

  if (invalidName != null) {
    console.log("NAME EXISTS " + vehicleTypeInfo.name);
    res.json(vehicleTypeInfo.name);
  } 
  else{
    let result = await VehicleType.updateOne(
      { vehicleTypeID: vehicleTypeInfo.vehicleTypeID },
      {
        vehicleTypeID: vehicleTypeInfo.vehicleTypeID,
        name: vehicleTypeInfo.name,
        disabled: vehicleTypeInfo.disabled,
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
