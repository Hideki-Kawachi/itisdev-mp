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
    accessor: "auditDate",
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
    Header: "Item Name",
    accessor: "itemName",
    Filter: GlobalFilter,
    disableSortBy: true,
  },
  {
    Header: "Model",
    accessor: "itemModel",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
  {
    Header: "System",
    accessor: "systemCount",
    disableGlobalFilter: true,
  },
  {
    Header: "Physical",
    accessor: "physicalCount",
    disableGlobalFilter: true,
  },
  {
    Header: "Unit",
    accessor: "unit",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
  {
    Header: "Recorded by",
    accessor: "creatorID",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
];
