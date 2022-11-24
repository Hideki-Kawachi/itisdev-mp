import { GlobalFilter } from "../GlobalFilter";

export const VCAT_COLUMNS = [
  {
    Header: " ",
    accessor: "row",
    disableGlobalFilter: true,
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: GlobalFilter,
  },
];
