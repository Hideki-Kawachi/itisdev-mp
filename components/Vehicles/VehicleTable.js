import React, { useMemo, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import { COLUMNS } from "./VehicleColumns";
import GlobalFilter from "../GlobalFilter";
import Link from "next/link";
import { useRouter }  from 'next/router';


export const BasicTable = ({vehicle} ) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => vehicle, []);
  const router = useRouter();
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
 
    // useEffect(() =>{
    //   vehicle.map((vehicle) => {
        
    //   })
      
    // });
  return (
    <>
      <div className="user-left-container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <span className="user-right-container">
          <button className="add-button">
            {" "}
            <Link href="vehicles/addvehicle">Add Vehicle + </Link>
          </button>{" "}
        </span>
      </div>
      <br />
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
    </>
  );
};

export default BasicTable;
