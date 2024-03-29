import React, { useMemo, useState } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import Link from "next/link";
import { useRouter }  from 'next/router';
import { COLUMNS } from "./ItemColumns";
import GlobalFilter from "../GlobalFilter";
import { Dropdown } from "../Dropdown";
import Info from "../../components/Pop-up/info";
import Modal from "react-modal";

export const ItemTable = ({itemData, categoryData, unitData}) => {
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => itemData, []);
  const router = useRouter();
  const [infoPop, setInfoPop] = useState(false);
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
    setFilter,
    filters,
	} = useTable(
		{
			columns,
			data,
      initialState: {
        hiddenColumns: ["itemID"]
      },
		},
		useGlobalFilter,
    useFilters,
		useSortBy,
		usePagination
	);
  
  const { filter } = state;
	const { globalFilter } = state;
	const { pageIndex } = state;

	return (
    <>
      <Modal isOpen={infoPop} className="modal" ariaHideApp={false}>
        <Info trigger={infoPop} setTrigger={setInfoPop}></Info>
      </Modal>
      <div className="item-header item-table-header">
        <span className="item-table-left-container">
          <Dropdown
            title="Item Category"
            options={categoryData}
            id="categoryID"
            name="name"
            filter={filter}
            setFilter={setFilter}
          ></Dropdown>
          <span className="form-item" id="search-item-code-container">
            <br />
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <button
              type="button"
              className="table-info-button"
              onClick={() => setInfoPop(!infoPop)}
            >
              i
            </button>
          </span>
        </span>
        <span className="item-table-right-container">
          <button className="green-button-container add-button">
            {" "}
            <Link href="items/additem">Add Item + </Link>
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
                onClick={() => router.push("items/" + row.original.itemID)}
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

export default ItemTable;
