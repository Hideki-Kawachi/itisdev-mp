import dbConnect from "../../../../lib/dbConnect";
import VehicleType from "../../../../models/VehicleTypeSchema";

export default async (req, res) => {
  await dbConnect();

  const vehicleTypeInfo = req.body;
  
  let invalidID = await VehicleType.findOne({
    vehicleTypeID: vehicleTypeInfo.vehicleTypeID,
  });

  let invalidName = await VehicleType.findOne({
    name: vehicleTypeInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + vehicleTypeInfo.vehicleTypeID);
    res.json(vehicleTypeInfo.vehicleTypeID);
  } 
  else if(invalidName != null){
    console.log("INVALID NAME " + vehicleTypeInfo.name);
    res.json(vehicleTypeInfo.name);  
  }
  else {
    await VehicleType.create(vehicleTypeInfo);
    res.json("created");
  }
};
