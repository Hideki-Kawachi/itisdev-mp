import { GlobalFilter } from "../GlobalFilter";

export const INVBRAND_COLUMNS = [
  {
    Header: "Status",
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
    accessor: "name",
    Filter: GlobalFilter,
  },
];
