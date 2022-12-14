import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/ItemSchema";
import ItemBrandCombination from "../../../models/ItemBrandCombinationSchema";

export default async (req, res) => {
    await dbConnect();

    const itemInfo = (req.body.itemData);
    const detailsInfo = req.body.details;
    console.log(itemInfo)
    console.log(detailsInfo)

    let itemResult = await Item.updateOne(
        {   
            itemID: itemInfo.itemID
        },
        {
            categoryID: itemInfo.categoryID,
            itemName: itemInfo.itemName,
            itemModel: itemInfo.itemModel,
            unitID: itemInfo.unitID,
            quantity: itemInfo.quantity,
            minQuantity: itemInfo.minQuantity,
            disabled: itemInfo.disabled,
        },
    )
    console.log(itemResult)
    let detailsResult;
    for (var i = 0; i < detailsInfo.length; i++) {
        let updateFields = { 
            itemBrandID: detailsInfo[i].brand,
            partNumber: detailsInfo[i].partNumber,
            quantity: parseInt(detailsInfo[i].quantity),
        }
        detailsResult = await ItemBrandCombination.updateOne(
            {combinationID: detailsInfo[i].combinationID},
            { $set: updateFields },
            { upsert: true }
        )
    }

    res.json("item update")
    // if (itemResult.modifiedCount == 0 && itemResult.matchedCount > 0 
    //     || detailsResult.modifiedCount == 0 && detailsResult.matchedCount > 0) {
    //     res.json("No fields edited");
    // } 
    // else if (itemResult.modifiedCount == 0 || detailsResult.modifiedCount == 0) {
    //     res.json("Edit is invalid");
    // }
    // else {
    //     res.json("Item edited successfully");
    // }
};
