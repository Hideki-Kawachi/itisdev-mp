import dbConnect from "../../../../../lib/dbConnect";
import EngineType from "../../../../../models/EngineSchema";

export default async (req, res) => {
  await dbConnect();

  const engineTypeInfo = req.body;

  let invalidName = await EngineType.findOne({
    name: engineTypeInfo.name,
  });

  if (
    invalidName != null &&
    engineTypeInfo.engineTypeID != invalidName.engineTypeID
  ) {
    console.log("NAME EXISTS " + engineTypeInfo.name);
    res.json(engineTypeInfo.name);
  } else {
    let result = await EngineType.updateOne(
      { engineTypeID: engineTypeInfo.engineTypeID },
      {
        engineTypeID: engineTypeInfo.engineTypeID,
        name: engineTypeInfo.name,
        disabled: engineTypeInfo.disabled,
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
