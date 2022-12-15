import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [

  {
    Header: "Date",
    accessor: "date",
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
    Header: "Item",
    accessor: "item",
    disableSortBy: true,
    filter: GlobalFilter
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
