import dbConnect from "../../../../../lib/dbConnect";
import gpsProvider from "../../../../../models/GPSSchema";

export default async (req, res) => {
  await dbConnect();

  const gpsInfo = req.body;

  let invalidName = await gpsProvider.findOne({
    name: gpsInfo.name,
  });

  if (invalidName != null) {
    console.log("NAME EXISTS " + gpsInfo.name);
    res.json(gpsInfo.name);
  } else {
    let result = await gpsProvider.updateOne(
      { GPSProviderID: gpsInfo.GPSProviderID },
      {
        GPSProviderID: gpsInfo.GPSProviderID,
        name: gpsInfo.name,
        disabled: gpsInfo.disabled,
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
