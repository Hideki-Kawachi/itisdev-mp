import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [
  {
    Header: "i",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Date",
    accessor: "acquireDate",
    filter: (rows, id, filterValue) => {
      return rows.filter(
        (row) =>
          filterValue.length <= 0 ||
          !filterValue ||
          filterValue.includes(row.values[id])
      );
    },
  },
  {
    Header: "Invoice #",
    accessor: "invoiceNumber",
    disableSortBy: true,
    filter: GlobalFilter
  },
  {
    Header: "Item",
    accessor: "itemName",
    disableSortBy: true,
    disableGlobalFilter: true,
  },
  {
    Header: "Item Model",
    accessor: "itemModel",
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
