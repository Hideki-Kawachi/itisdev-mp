import React, { useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useFilters,
} from "react-table";

export const DashboardTable = (props) => {
  const columns = useMemo(() => props.COLUMNS, []);
  const data = useMemo(() => props.ADDINV, []);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    pageCount,
    prepareRow,
    setPageSize,
    setFilter,
    filters,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      initialState: {
        sortBy: [
          {
            id: "date",
            desc: true,
          },
        ],
        pageSize : 13,
      },
      data,
    },

    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  // const handleFilter = () => {
  // 	const dateArray = [];
  // 	var d = dayjs(fromDate);

  // 	while (d.isBefore(toDate, "day") || d.isSame(toDate, "day")) {
  // 		dateArray.push(d.format("MM/DD/YYYY"));
  // 		d = d.add(1, "day");
  // 	}
  // 	filterTable(dateArray);
  // };

  const filterTable = (dates) => {
    //console.log("Dates are:", dates);
    setFilter("date", dates);
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const dateArray = [];
      var d = dayjs(fromDate);

      while (d.isBefore(toDate, "day") || d.isSame(toDate, "day")) {
        dateArray.push(d.format("MM/DD/YYYY"));
        d = d.add(1, "day");
      }
      filterTable(dateArray);
    }
  }, [fromDate, toDate]);

  return (
    <div>
    <br/>
      <table id="btable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              id="btable"
              className="btable"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : " "}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr id="btable" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />
    </div>
  );
};
