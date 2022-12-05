import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Status",
    accessor: "disabled",
  },
  {
    Header: "Plate Number",
    accessor: "plateNum",
    Filter: GlobalFilter,
    width: 200,
  },
  {
    Header: "Transmission",
    accessor: "transmissionID",
    disableGlobalFilter: true,
    width: 200,
  },
  {
    Header: "Vehicle Type",
    accessor: "vehicleTypeID",
    disableGlobalFilter: true,
    width: 200,
  },
  {
    Header: "Brand",
    accessor: "brandID",
    width: 200,
  },
  {
    Header: "Insurance Expiry",
    accessor: "insuranceExpDate",
    disableGlobalFilter: true,
    width: 200,
  },
];