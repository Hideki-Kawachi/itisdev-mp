import React, { useMemo } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import PULLINV_MOCK_DATA from "../PULLINV_MOCK_DATA.json";
import { COLUMNS } from "./InventoryColumnsPull";
import GlobalFilter from "../GlobalFilter";
import Link from "next/link";

export const BasicTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => PULLINV_MOCK_DATA, []);

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
		<input type='number' defaultValue = {pageIndex + 1} onChange={e => {
			const pageNumber= e.target.value ? Number(e.target.value) - 1 : 0
			gotoPage(pageNumber)}
		}/>
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

export default BasicTable;
