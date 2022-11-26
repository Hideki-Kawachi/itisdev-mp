import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Date",
    accessor: "date",
    Filter: GlobalFilter,
  },
  {
    Header: "Plate Number",
    accessor: "plateNum",
    Filter: GlobalFilter,
  },
  {
    Header: "Item",
    accessor: "item",
    disableGlobalFilter: true,
  },
  {
    Header: "Model",
    accessor: "model",
    disableGlobalFilter: true,
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    disableGlobalFilter: true,
  },
  {
    Header: "Unit",
    accessor: "unit",
    disableGlobalFilter: true,
  },
];