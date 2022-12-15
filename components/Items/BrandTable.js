import React, { useMemo, useState, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import Link from "next/link";
import { COLUMNS } from "./BrandColumns";;


export const BrandTable = ({
  tableValues,
  convertFunc,
  isEditable, 
  deleteFunc,
  editFunc,
  pageType,
  }) => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => convertFunc(pageType, tableValues), [tableValues]);
  
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
    filters, 
    useFilters
	} = useTable(
		{
			columns,
			data,
      initialState: {
        hiddenColumns: ["combinationID", "status"],
        // filters: [
        //   {
        //     id: "status",
        //     value: "false"
        //   }
        // ]
      },
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
              {isEditable == true ? (<th></th>) : (<></>)}
              {(isEditable == true || pageType == false) ? (<th></th>) : (<></>)}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr id="btable"{...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <>
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    </>
                    
                  );
                })}
                {isEditable == true ? (<td><button type="button" onClick={() => editFunc(row.original)}>✏️</button></td>) : (<></>)}
                {(isEditable == true || pageType == false) ? (<td><button type="button" onClick={() => deleteFunc(row.original)}>X</button></td>) : (<></>)}
                
                
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
