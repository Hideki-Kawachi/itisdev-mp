import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";
import ItemBrandCombination from "../../../models/ItemBrandCombinationSchema";

export default async (req, res) => {
    await dbConnect();

    let itemInfo = await Item.findOne({ itemID: req.query.itemID })
    let brandInfo = await ItemBrandCombination.find({ itemID: req.query.itemID })

    if (itemInfo == null) {
        console.log("Cannot find item");
    } 
    if (brandInfo == null) {
        brandInfo = [{}];
    }
    else {
        console.log("item found");
    }

    res.json({itemInfo, brandInfo});
}