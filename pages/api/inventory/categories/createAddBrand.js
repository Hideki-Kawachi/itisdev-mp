import dbConnect from "../../../../lib/dbConnect";
import Brand from "../../../../models/ItemBrandCombinationSchema";

export default async (req, res) => {
  await dbConnect();

  const inventoryBrandInfo = req.body;

  let invalidID = await Brand.findOne({
    brandID: inventoryBrandInfo.brandID,
  });

  let invalidName = await Brand.findOne({
    name: inventoryBrandInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID " + inventoryBrandInfo.brandID);
    res.json(inventoryBrandInfo.brandID);
  } else if (invalidName != null) {
    console.log("INVALID" + inventoryBrandInfo.name);
    res.json(inventoryBrandInfo.name);
  } else {
    await Brand.create(inventoryBrandInfo);
    res.json("created");
  }
};