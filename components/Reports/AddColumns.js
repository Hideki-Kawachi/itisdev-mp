import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [

  {
    Header: "Date",
    id: "date",
    accessor: "acquireDate",
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
    Header: "Invoice #",
    accessor: "invoiceNumber",
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
