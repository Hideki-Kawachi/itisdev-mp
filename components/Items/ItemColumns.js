import { GlobalFilter } from '../GlobalFilter'
import {SelectColumnFilter} from "../Dropdown"

export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "",
    id: "itemID",
    accessor: "itemID",
    Filter: GlobalFilter,
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
    disableSortBy: true,
  },
  {
    Header: "Category",
    id: "categoryID",
    accessor: "categoryID",
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
    Header: "Name",
    accessor: "itemName",
    Filter: GlobalFilter,
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
    disableSortBy: true,
  },
  {
    Header: "Min Qty",
    accessor: "minQuantity",
    disableGlobalFilter: true,
    disableSortBy: true,
  },
  {
    Header: "Unit",
    accessor: "unitID",
    disableGlobalFilter: true,
  },
];