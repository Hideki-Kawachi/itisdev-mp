import dbConnect from "../../../../../../lib/dbConnect";
import ItemBrand from "../../../../../../models/ItemBrandSchema";

export default async (req, res) => {
  await dbConnect();

  let itemBrandInfo = await ItemBrand.findOne({
    itemBrandID: req.query.itemBrandID,
  });

  if (itemBrandInfo == null) {
    console.log("error cannot find item brand");
  } else {
    console.log("item brand found");
  }

  res.json(itemBrandInfo);
};
