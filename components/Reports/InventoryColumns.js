import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [
  {
    Header: "i",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Date",
    accessor: "date",
    disableGlobalFilter: true,
   // filter: ,
  },
  {
    Header: "Item",
    accessor: "item",
    disableSortBy: true,
    filter: GlobalFilter,
  },
  {
    Header: "Model",
    accessor: "model",
    disableSortBy: true,
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
    disableSortBy: true,
    disableGlobalFilter: true,
  },
];
