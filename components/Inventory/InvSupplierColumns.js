import { GlobalFilter } from "../GlobalFilter";

export const INVSUPP_COLUMNS = [
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
    Header: "Name",
    id: "name",
    accessor: "supplierName",
    Filter: GlobalFilter,
  },
];