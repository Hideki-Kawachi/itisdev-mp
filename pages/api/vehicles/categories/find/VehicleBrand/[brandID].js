import dbConnect from "../../../../../../lib/dbConnect";
import Brand from "../../../../../../models/BrandSchema";

export default async (req, res) => {
  await dbConnect();

  console.log("query is:", req.query.brandID);

  let vehicleBrandInfo = await Brand.findOne({
    brandID: req.query.brandID,
  });

  if (vehicleBrandInfo == null) {
    console.log("error cannot find brand");
  } else {
    console.log("engine brand");
  }

  res.json(vehicleBrandInfo);
};
