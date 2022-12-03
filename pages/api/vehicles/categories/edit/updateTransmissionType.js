import dbConnect from "../../../../../lib/dbConnect";
import Transmission from "../../../../../models/TransmissionSchema";

export default async (req, res) => {
  await dbConnect();

  const transmissionInfo = req.body;

  let invalidName = await Transmission.findOne({
    name: transmissionInfo.name,
  });

  if (invalidName != null) {
    console.log("NAME EXISTS " + transmissionInfo.name);
    res.json(transmissionInfo.name);
  } else {
    let result = await Transmission.updateOne(
      { transmissionID: transmissionInfo.transmissionID },
      {
        transmissionID: transmissionInfo.transmissionID,
        name: transmissionInfo.name,
        disabled: transmissionInfo.disabled,
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
