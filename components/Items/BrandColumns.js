import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Item Code",
    accessor: "itemCode",
    disableGlobalFilter: true,
  },
  {
    Header: "Part #",
    accessor: "partNum",
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