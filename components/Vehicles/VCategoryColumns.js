import { GlobalFilter } from "../GlobalFilter";

export const VCAT_COLUMNS = [
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
    accessor: "name",
    Filter: GlobalFilter,
  },
];
