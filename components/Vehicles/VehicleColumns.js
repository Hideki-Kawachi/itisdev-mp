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
    accessor: "vehicleTypeID",
  },
  {
    Header: "Brand",
    accessor: "brandID",
  },
  {
    Header: "Insurance Expiry",
    accessor: "insuranceExpDate",
  },
];