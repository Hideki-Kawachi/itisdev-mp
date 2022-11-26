import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Plate Number",
    accessor: "plateNum",
    Filter: GlobalFilter,
  },
  {
    Header: "Transmission",
    accessor: "transmissionID",
    disableGlobalFilter: true,
  },
  {
    Header: "Vehicle Type",
    accessor: "vehicleTypeID",
    disableGlobalFilter: true,
  },
  {
    Header: "Brand",
    accessor: "brandID",
  },
  {
    Header: "Insurance Expiry",
    accessor: "insuranceExpDate",
    disableGlobalFilter: true,
  },
];