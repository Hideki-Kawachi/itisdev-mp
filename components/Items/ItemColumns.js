import { GlobalFilter } from '../GlobalFilter'

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "Status",
    id: "disabled",
    accessor: "disabled",
    Cell: (props) => {
      return props.value == false ? (
        <span className="btable-enabled">⬤</span>
      ) : (
        <span className="btable-disabled">⬤</span>
      );
    },
    width: 50,
    disableSortBy: true,
  },
  {
    Header: "Category",
    accessor: "categoryID",

  },
  {
    Header: "Name",
    accessor: "itemName",
    disableGlobalFilter: true,
  },
  {
    Header: "Model",
    accessor: "itemModel",
    Filter: GlobalFilter,
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