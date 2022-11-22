import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "Plate Number",
    accessor: "plateNum",
    Filter: GlobalFilter 
    
  },
  {
    Header: "Transmission",
    accessor: "transmissionID",
  },
  {
    Header: "Vehicle Type",
    accessor: "vehicleType",
  },
  {
    Header: "Brand",
    accessor: "Brand",
  },
  {
    Header: "Insurance Expiry",
    accessor: "insuranceExpDate",
  },
];