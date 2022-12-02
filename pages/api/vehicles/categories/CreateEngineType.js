import dbConnect from "../../../../lib/dbConnect";
import EngineType from "../../../../models/EngineSchema";

export default async (req, res) => {
  await dbConnect();

  const engineTypeInfo = req.body;

  let invalidID = await EngineType.findOne({
    engineTypeID: engineTypeInfo.engineTypeID,
  });

  let invalidName = await EngineType.findOne({
    name: engineTypeInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + engineTypeInfo.engineTypeID);
    res.json(engineTypeInfo.engineTypeID);
  } else if (invalidName != null) {
    console.log("INVALID NAME " + engineTypeInfo.name);
    res.json(engineTypeInfo.name);
  } else {
    await EngineType.create(engineTypeInfo);
    res.json("created");
  }
};
