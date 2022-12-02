import dbConnect from "../../../../lib/dbConnect";
import gpsProvider from "../../../../models/GPSSchema";

export default async (req, res) => {
  await dbConnect();

  const gpsInfo = req.body;

  let invalidID = await gpsProvider.findOne({
    GPSProviderID: gpsInfo.GPSProviderID,
  });

  let invalidName = await gpsProvider.findOne({
    name: gpsInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + gpsInfo.GPSProviderID);
    res.json(gpsInfo.GPSProviderID);
  } else if (invalidName != null) {
    console.log("INVALID NAME " + gpsInfo.name);
    res.json(gpsInfo.name);
  } else {
    await gpsProvider.create(gpsInfo);
    res.json("created");
  }
};
