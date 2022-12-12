import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Date",
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
    accessor: "Item Name",
    Filter: GlobalFilter,
    disableSortBy: true,
  },
  {
    Header: "Model",
    accessor: "Model",
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
    accessor: "Unit",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
  {
    Header: "Recorded by",
    accessor: "Recorded by",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
];
