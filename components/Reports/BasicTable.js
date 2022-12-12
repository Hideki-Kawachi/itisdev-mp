import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { COLUMNS } from "./columns";
import GlobalFilter from "../GlobalFilter";

import ADDINV_MOCK_DATA from "../ADDINV_MOCK_DATA.json";

export const BasicTable = () => {
      const columns = useMemo(() => COLUMNS, []);
      const data = useMemo(() => ADDINV_MOCK_DATA, []);
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
   state,
   setGlobalFilter,
 } = useTable(
   {
     columns,
     data,
   },

   useGlobalFilter,
   useSortBy,
   usePagination
 );

 const { globalFilter } = state;
 const { pageIndex } = state;

  return (
    <div>
      <br />
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <span className="calendar-range-container">
        <input type="date" className="form-fields form-fields-calendar-range" />{" "}
        to{" "}
        <input type="date" className="form-fields form-fields-calendar-range" />
      </span>
      <table id="btable" {...getTableProps()}>
        <thead>
          <br />
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
              <tr
                id="btable"
                {...row.getRowProps()}
                onClick={() => router.push("vehicles/" + row.original.plateNum)}
              >
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
