import dbConnect from "../../../../../../lib/dbConnect";
import ItemCategory from "../../../../../../models/ItemCategorySchema";

export default async (req, res) => {
    await dbConnect();

    let categoryInfo = await ItemCategory.findOne({ categoryID: req.query.categoryID })

    if (categoryInfo == null) {
        console.log("Cannot find item category");
    } else {
        console.log("category found")
    }

    res.json(categoryInfo);
}