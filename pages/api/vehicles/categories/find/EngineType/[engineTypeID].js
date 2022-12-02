import dbConnect from "../../../../../../lib/dbConnect";
import EngineType from "../../../../../../models/EngineSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.engineTypeID);

  let engineTypeInfo = await EngineType.findOne({
    engineTypeID: req.query.engineTypeID,
  });

  if (engineTypeInfo == null) {
    console.log("error cannot find engine");
  } else {
    console.log("engine found");
  }

  res.json(engineTypeInfo);
};
