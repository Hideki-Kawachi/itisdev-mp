import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Date",
    id: "date",
    accessor: "pulloutDate",
    disableGlobalFilter: true,
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
    Header: "Plate #",
    accessor: "plateNum",
    Filter: GlobalFilter,
    disableSortBy: true,
  },
  {
    Header: "Item",
    accessor: "itemName",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
  {
    Header: "Model",
    accessor: "itemModel",
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
    disableSortBy: true,
  },
];
