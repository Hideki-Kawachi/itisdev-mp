import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useFilters
} from "react-table";

import GlobalFilter from "../GlobalFilter";

export const BasicTable = (props) => {

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
     data,
   },

   useGlobalFilter,
   useFilters,
   useSortBy,
   usePagination
 );

 const { globalFilter } = state;
 const { pageIndex } = state;

 const handleFilter = () => {
    const dateArray = [];
    var d = dayjs(fromDate);

      while (d.isBefore(toDate, "day") || d.isSame(toDate, "day")) {
        console.log("Date: " + d);
        dateArray.push(d.format("MM/DD/YYYY"));
        d = d.add(1, "day");
      }
      console.log(dateArray);
      filterTable(dateArray);
      console.log("From Date: " + fromDate + " To Date: " + toDate);
 };

const filterTable = (dates) => {
     if (useTable.current) {
       useTable.current.setFilter("date", dates);
    }
 };
 
  return (
    <div>
      <br />
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <span className="calendar-range-container">
        <input
          type="date"
          className="form-fields form-fields-calendar-range"
          onChange={(e) =>
            setFromDate(dayjs(e.target.value, "MM/DD/YYYY"))
          }
        />{" "}
        to{" "}
        <input
          type="date"
          className="form-fields form-fields-calendar-range"
          onChange={(e) =>
            setToDate(dayjs(e.target.value, "MM/DD/YYYY"))
          }
        />
        <button onClick={handleFilter}>Check Date</button>
      </span>

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

      <div className="page-buttons">
        {/* <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
        /> */}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>

        <span className="vehicle-nav-buttons-div">
          <button
            className="navigate-page"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>

          <button
            className="navigate-page"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>
          <button
            className="navigate-page"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>
          <button
            className="navigate-page"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </span>
      </div>
    </div>
  );
};
