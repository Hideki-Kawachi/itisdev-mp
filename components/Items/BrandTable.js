import React, { useMemo, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import Link from "next/link";
import { COLUMNS } from "./BrandColumns";
import { useState } from "react";

// Temporary Assets
import ITEM_BRAND_MOCK_DATA from "./Temp/ITEM_BRAND_MOCK_DATA.json";


export const BrandTable = ({detailsArray}) => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => detailsArray, [detailsArray]);
  
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
    <>
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

	  <br/>
      <div className="page-buttons">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length} 
          </strong>
        </span>
		{/* <input type='number' defaultValue = {pageIndex + 1} onChange={e => {
			const pageNumber= e.target.value ? Number(e.target.value) - 1 : 0
			gotoPage(pageNumber)}
		}/> */}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
  
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
 		{">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default BrandTable;
