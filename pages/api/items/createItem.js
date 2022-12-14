import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";
import ItemBrandCombination from "../../../models/ItemBrandCombinationSchema"

export default async (req, res) => {
  await dbConnect();

  const itemInfo = req.body.itemData;
  const detailsInfo = req.body.details;

  let invalidCode = await Item.findOne({ itemID: itemInfo.itemID });
  let duplicateBrand, duplicateBrandID;
    
	if (invalidCode != null) {
    console.log("INVALID");
    res.json(itemInfo.itemID);
  } else {
    await Item.create(itemInfo);

    for (var i = 0; i < detailsInfo.length; i++) {
      let brandCombination = {
        combinationID: detailsInfo[i].combinationID,
        itemID: itemInfo.itemID,
        itemBrandID: detailsInfo[i].brand,
        partNumber: detailsInfo[i].partNumber,
        quantity: parseInt(detailsInfo[i].quantity),
        disabled: detailsInfo[i].disabled
      }
      duplicateBrandID = await ItemBrandCombination.findOne({combinationID: detailsInfo[i].combinationID})
      duplicateBrand = await ItemBrandCombination.find({itemID: itemInfo.itemID, itemBrandID: detailsInfo[i].brand})

      if (duplicateBrandID == null && duplicateBrand.length == 0) {
        await ItemBrandCombination.create(brandCombination)
      }
    }
  
    res.json("created");
  }
};
