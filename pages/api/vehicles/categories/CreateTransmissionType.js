import dbConnect from "../../../../lib/dbConnect";
import Transmission from "../../../../models/TransmissionSchema";

export default async (req, res) => {
  await dbConnect();

  const transmissionInfo = req.body;

  let invalidID = await Transmission.findOne({
    transmissionID: transmissionInfo.transmissionID,
  });

  let invalidName = await Transmission.findOne({
    name: transmissionInfo.name,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + transmissionInfo.transmissionID);
    res.json(transmissionInfo.transmissionID);
  } else if (invalidName != null) {
    console.log("INVALID NAME " + transmissionInfo.name);
    res.json(transmissionInfo.name);
  } else {
    await Transmission.create(transmissionInfo);
    res.json("created");
  }
};
