import dbConnect from "../../../../lib/dbConnect";
import Supplier from "../../../../models/SupplierSchema";

export default async (req, res) => {
  await dbConnect();
  console.log(req.body);
  const supplierInfo = req.body;

  let invalidID = await Supplier.findOne({
    supplierID: supplierInfo.supplierID,
  });

  let invalidName = await Supplier.findOne({
    supplierName: supplierInfo.supplierName,
  });

  if (invalidID != null) {
    console.log("INVALID ID " + supplierInfo.supplierID);
    res.json(supplierInfo.supplierID);
  } else if (invalidName != null) {
    console.log("INVALID NAME " + supplierInfo.supplierName);
    res.json(supplierInfo.supplierName);
  } else {
    await Supplier.create(supplierInfo);
    res.json("created");
  }
};