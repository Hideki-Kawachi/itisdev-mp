import dbConnect from "../../../../lib/dbConnect";
import Unit from "../../../../models/UnitTypeSchema";

export default async (req, res) => {
  await dbConnect();

  const unitInfo = req.body;

  let invalidID = await Unit.findOne({
    UnitTypeID: unitInfo.UnitTypeID,
  });

  let invalidName = await Unit.findOne({
    name: unitInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + unitInfo.UnitTypeID);
    res.json(unitInfo.UnitTypeID);
  } else if (invalidName != null) {
    console.log("INVALID NAME " + unitInfo.name);
    res.json(unitInfo.name);
  } else {
    await Unit.create(unitInfo);
    res.json("created");
  }
};