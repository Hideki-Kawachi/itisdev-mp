
export const COLUMNS = [
  {
    Header: "Date",
    id: "date",
    accessor: "transactionDate",
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
  {
    Header: "Transaction",
    accessor: "transactType",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
];
