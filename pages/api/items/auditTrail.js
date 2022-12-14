import dbConnect from "../../../lib/dbConnect";


export default async (req, res) => {
  await dbConnect();

};
