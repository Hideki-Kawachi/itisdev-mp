import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Date",
    accessor: "acquireDate",
    Filter: GlobalFilter,
  },
  {
    Header: "Invoice Number",
    accessor: "invoiceNumber",
    Filter: GlobalFilter,
  },
  {
    Header: "Item",
    accessor: "itemID",
    disableGlobalFilter: true,
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    disableGlobalFilter: true,
  },
  {
    Header: "Unit",
    accessor: "unitID",
    disableGlobalFilter: true,
  },
];