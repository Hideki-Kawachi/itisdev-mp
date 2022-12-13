import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";
import ItemBrandCombination from "../../../models/ItemBrandCombinationSchema"

export default async (req, res) => {
  await dbConnect();
  console.log(req.body.itemData);
  console.log(req.body.details);

  const itemInfo = req.body.itemData;
  const detailsInfo = req.body.details;

  let invalidCode = await Item.findOne({ itemID: itemInfo.itemID });
  let duplicateBrand;
    
	if (invalidCode != null) {
    console.log("INVALID");
    res.json(itemInfo.itemID);
  } else {
    await Item.create(itemInfo);

    for (var i = 0; i < detailsInfo.length; i++) {
      let brandCombination = {
        itemID: itemInfo.itemID,
        itemBrandID: detailsInfo[i].brand,
        partNumber: detailsInfo[i].partNum,
        quantity: parseInt(detailsInfo[i].quantity),
      }
      duplicateBrand = await ItemBrandCombination.find({itemID: itemInfo.itemID, itemBrandID: detailsInfo[i].brand})

      if (duplicateBrand.length == 0) {
        ItemBrandCombination.create(brandCombination)
      }
    }
  
    res.json("created");
  }
};
