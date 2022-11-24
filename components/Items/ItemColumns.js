import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Category",
    accessor: "categoryID",
    disableGlobalFilter: true,
  },
  {
    Header: "Name",
    accessor: "itemName",
  },
  {
    Header: "Model",
    accessor: "itemModel",
    disableGlobalFilter: true,
  },
  {
    Header: "Qty",
    accessor: "quantity",
    disableGlobalFilter: true,
  },
  {
    Header: "Min Qty",
    accessor: "minQuantity",
    disableGlobalFilter: true,
  },
  {
    Header: "Unit",
    accessor: "unitID",
    disableGlobalFilter: true,
  },
];