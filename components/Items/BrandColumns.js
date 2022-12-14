import { GlobalFilter } from '../GlobalFilter'



export const COLUMNS = [
  {
    Header: "",
    id: "index",
    accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
  },
  {
    Header: "",
    id: "status",
    accessor: "disabled",
  },
  {
    Header: "",
    id: "combinationID",
    accessor: "combinationID",
  },
  {
    Header: "Brand",
    accessor: "brand",
    disableGlobalFilter: true,
  },
  {
    Header: "Part #",
    accessor: "partNumber",
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
  },
  // {
  //   Header: "",
  //   id: "edit",
  //   // Cell: (props) => {
  //   //   props.
  //   // }
  // },
  // {
  //   Header: "",
  //   id: "delete",
  //   onClick: (props) => {props.deleteFunc},
  //   Cell: (props) => {
  //     return (<span>X</span>)
  //   }
  // },
];