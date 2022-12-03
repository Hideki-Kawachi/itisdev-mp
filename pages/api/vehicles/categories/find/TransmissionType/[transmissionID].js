import dbConnect from "../../../../../../lib/dbConnect";
import Transmission from "../../../../../../models/TransmissionSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.transmissionID);

  let transmissionInfo = await Transmission.findOne({
    transmissionID: req.query.transmissionID,
  });

  if (transmissionInfo == null) {
    console.log("error cannot find transmission");
  } else {
    console.log("transmission found");
  }

  res.json(transmissionInfo);
};
