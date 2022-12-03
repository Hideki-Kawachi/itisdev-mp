import dbConnect from "../../../../../lib/dbConnect";
import Brand from "../../../../../models/BrandSchema";

export default async (req, res) => {
  await dbConnect();

  const brandInfo = req.body;

  let invalidName = await Brand.findOne({
    name: brandInfo.name,
  });
    console.log("NAME " + brandInfo.name + "Found " + invalidName);
  if (invalidName != null) {
    console.log("NAME EXISTS " + brandInfo.name);
    res.json(brandInfo.name);
  } else {
    let result = await Brand.updateOne(
      { brandID: brandInfo.brandID },
      {
        brandID: brandInfo.brandID,
        name: brandInfo.name,
        disabled: brandInfo.disabled,
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
