import dbConnect from "../../../../lib/dbConnect";
import Brand from "../../../../models/BrandSchema";

export default async (req, res) => {
  await dbConnect();

  const vehicleBrandInfo = req.body;

  let invalidID = await Brand.findOne({
    brandID: vehicleBrandInfo.brandID,
  });

  let invalidName = await Brand.findOne({
    name: vehicleBrandInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID " + vehicleBrandInfo.brandID);
    res.json(vehicleBrandInfo.brandID);
  } else if (invalidName != null) {
    console.log("INVALID" + vehicleBrandInfo.name);
    res.json(vehicleBrandInfo.name);
  } else {
    await Brand.create(vehicleBrandInfo);
    res.json("created");
  }
};
