import dbConnect from "../../../lib/dbConnect";
import Audit from "../../../models/AuditSchema";


export default async (req, res) => {
  await dbConnect();

  const auditInfo = req.body;
  let invalidAuditID = await Audit.findOne({ auditID: auditInfo.auditID });

  if(invalidAuditID == null){
          let auditData = {
            auditID: auditInfo.auditID,
            itemID: auditInfo.itemID,
            auditDate: auditInfo.auditDate,
            systemCount: auditInfo.systemCount,
            physicalCount: auditInfo.physicalCount,
            creatorID: auditInfo.creatorID,
            creationDate: auditInfo.auditIDcreationDate,
          }
          console.log("audit data " + auditData.auditID)
          await Audit.create(auditData);
          res.json("created");
  }
    else{
          console.log("INVALID");
          console.log(auditInfo.auditID);
          res.json(auditInfo.auditID);
    }
};
