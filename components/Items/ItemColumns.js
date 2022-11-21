import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: 'index',
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1 
  },
  {
    Header: "Category",
    accessor: "categoryID",
  },
  {
    Header: "Name",
    accessor: "itemName",
  },
  {
    Header: "Model",
    accessor: "itemModel",
  },
  {
    Header: "Qty",
    accessor: "quantity",
  },
  {
    Header: "Min Qty",
    accessor: "minQuantity",
  },
  {
    Header: "Unit",
    accessor: "unitID",
  },
];