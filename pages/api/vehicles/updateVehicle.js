import dbConnect from "../../../lib/dbConnect";
import Vehicle from "../../../models/VehicleSchema";

export default async (req, res) => {
  await dbConnect();

  const vehicleInfo = req.body;

  let result = await Vehicle.updateOne(
    { plateNum: vehicleInfo.plateNum },
    {
      vehicleTypeID: vehicleInfo.vehicleTypeID,
      brandID: vehicleInfo.brandID,
      manufacturingYear: vehicleInfo.manufacturingYear,
      transmissionID: vehicleInfo.transmissionID,
      engineNum: vehicleInfo.engineNum,
      engineTypeID: vehicleInfo.engineTypeID,
      chassisID: vehicleInfo.chassisID,
      gpsID: vehicleInfo.gpsID,
      fuelSensorID: vehicleInfo.fuelSensorID,
      insuranceAmount: vehicleInfo.insuranceAmount,
      insuranceExpDate: vehicleInfo.insuranceExpDate,
      disabled: vehicleInfo.disabled,
    }
  );

  if (result.modifiedCount == 0 && result.matchedCount > 0) {
    res.json("No Fields Edited");
  } else if (result.modifiedCount == 0) {
    res.json("Edit is Invalid");
  } else {
    res.json("Vehicle Successfully Edited!");
  }
};
