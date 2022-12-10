import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: " ",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
    minWidth: 20,
    maxWidth: 30,
    width: 50,
    disableSortBy: true,
  },
  {
    Header: "Status",
    id: "disabled",
    accessor: "disabled",
    Cell: (props) => {
      return props.value == false ? (
        <span className="btable-enabled">⬤</span>
      ) : (
        <span className="btable-disabled">⬤</span>
      );
    },
    width: 50,
    disableSortBy: true,
  },
  {
    Header: "Plate Number",
    accessor: "plateNum",
    Filter: GlobalFilter,
    minWidth: 100,
    maxWidth: 100,
    width: 100,
  },
  {
    Header: "Transmission",
    accessor: "transmissionID",
    disableGlobalFilter: true,
    minWidth: 100,
    maxWidth: 100,
    width: 100,
  },
  {
    Header: "Vehicle Type",
    accessor: "vehicleTypeID",
    disableGlobalFilter: true,
    minWidth: 100,
    maxWidth: 100,
    width: 100,
  },
  {
    Header: "Brand",
    accessor: "brandID",
    width: 100,
  },
  {
    Header: "Insurance Expiry",
    accessor: "insuranceExpDate",
    disableGlobalFilter: true,
    width: 100,
  },
];