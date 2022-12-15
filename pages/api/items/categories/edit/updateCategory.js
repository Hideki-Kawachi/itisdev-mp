import dbConnect from "../../../../../lib/dbConnect";
import ItemCategory from "../../../../../models/ItemCategorySchema";

export default async (req, res) => {
    await dbConnect();
  
    const categoryInfo = req.body;
  
    let invalidName = await ItemCategory.findOne({
      name: categoryInfo.name,
    });
  
    if (
      invalidName != null &&
      categoryInfo.categoryID != invalidName.categoryID
    ) {
      console.log("NAME EXISTS " + categoryInfo.name);
      res.json(categoryInfo.name);
    } else {
      let result = await ItemCategory.updateOne(
        { categoryID: categoryInfo.categoryID },
        {
          categoryID: categoryInfo.categoryID,
          name: categoryInfo.name,
          disabled: categoryInfo.disabled,
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