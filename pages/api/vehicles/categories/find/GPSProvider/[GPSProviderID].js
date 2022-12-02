import dbConnect from "../../../../../../lib/dbConnect";
import gpsProvider from "../../../../../../models/GPSSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.GPSProviderID);

  let gpsInfo = await gpsProvider.findOne({
    GPSProviderID: req.query.GPSProviderID,
  });

  if (gpsInfo == null) {
    console.log("error cannot find engine");
  } else {
    console.log("engine found");
  }

  res.json(gpsInfo);
};
