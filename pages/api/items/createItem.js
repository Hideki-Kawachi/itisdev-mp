import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";

export default async (req, res) => {
  await dbConnect();
  console.log(req.body)
  const itemInfo = req.body;
  let invalidCode = await Item.findOne({ itemID: itemInfo.itemID });

	if (invalidCode != null) {
    console.log("INVALID");
    res.json(itemInfo.itemID);
  } else {
    await Item.create(itemInfo);
    res.json("created");
  }

};
