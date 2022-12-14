import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Item Code",
    accessor: "itemCode",
    Filter: GlobalFilter,
  },
  {
    Header: "Item Name",
    accessor: "itemName",
    Filter: GlobalFilter,
  },
  {
    Header: "Part #",
    accessor: "partNum",
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
