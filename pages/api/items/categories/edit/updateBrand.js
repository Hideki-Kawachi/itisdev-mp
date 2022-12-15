import dbConnect from "../../../../../lib/dbConnect";
import ItemBrands from "../../../../../models/ItemBrandSchema";

export default async (req, res) => {
    await dbConnect();
  
    const brandInfo = req.body;
  
    let invalidName = await ItemBrands.findOne({
      name: brandInfo.name,
    });
  
    if (
      invalidName != null &&
      brandInfo.itemBrandID != invalidName.itemBrandID
    ) {
      console.log("NAME EXISTS " + brandInfo.name);
      res.json(brandInfo.name);
    } else {
      let result = await ItemBrands.updateOne(
        { itemBrandID: brandInfo.itemBrandID },
        {
          itemBrandID: brandInfo.itemBrandID,
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