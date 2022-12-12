import dbConnect from "../../../../lib/dbConnect";
import ItemCategory from "../../../../models/ItemCategorySchema";

export default async (req, res) => {
    await dbConnect();
    console.log(req.body)
    const categoryInfo = req.body;
  
    let invalidID = await ItemCategory.findOne({
        categoryID: categoryInfo.categoryID,
    });
  
    let invalidName = await ItemCategory.findOne({
        name: categoryInfo.name,
    });
  
    if (invalidID != null) {
      console.log("INVALID ID " + categoryInfo.categoryID);
      res.json(categoryInfo.categoryID);
    } else if (invalidName != null) {
      console.log("INVALID NAME " + categoryInfo.name);
      res.json(categoryInfo.name);
    } else {
      await ItemCategory.create(categoryInfo);
      res.json("created");
    }
  };