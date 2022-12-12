import dbConnect from "../../../../lib/dbConnect";
import ItemBrand from "../../../../models/ItemBrandSchema"

export default async (req, res) => {
    await dbConnect();
    console.log(req.body)
    const brandInfo = req.body;
  
    let invalidID = await ItemBrand.findOne({
        itemBrandID: brandInfo.itemBrandID,
    });
  
    let invalidName = await ItemBrand.findOne({
        name: brandInfo.name,
    });
  
    if (invalidID != null) {
      console.log("INVALID ID " + brandInfo.itemBrandID);
      res.json(brandInfo.itemBrandID);
    } else if (invalidName != null) {
      console.log("INVALID NAME " + brandInfo.name);
      res.json(brandInfo.name);
    } else {
      await ItemBrand.create(brandInfo);
      res.json("created");
    }
  };