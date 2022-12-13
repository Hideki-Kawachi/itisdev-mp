import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";

export default async (req, res) => {
    await dbConnect();

    let itemInfo = await Item.findOne({ itemID: req.query.itemID })

    if (itemInfo == null) {
        console.log("Cannot find item");
    } else {
        console.log("item found")
    }

    res.json(itemInfo);
}