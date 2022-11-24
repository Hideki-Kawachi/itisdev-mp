import React, { useMemo, useState } from "react";
import Modal from "react-modal";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import VCAT_MOCK_DATA from "../VCAT_MOCK_DATA.json";
import { VCAT_COLUMNS } from "./VCategoryColumns";
import GlobalFilter from "../GlobalFilter";
import AddVehicleCategory from "./vCategoryCreate";
import Link from "next/link";

function VCatTable({ trigger, setTrigger }) {
  const columns = useMemo(() => VCAT_COLUMNS, []);
  const data = useMemo(() => VCAT_MOCK_DATA, []);
  const [vAddOpen, setvAddOpen] = useState(false);

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
      initialState: { pageSize: 5 },
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;
  const { pageIndex } = state;

  return (
    <>
      <div className="item-modal">
        <div className="item-header item-modal-header">
          <div className="item-column-container">
            <h1>VEHICLE TYPES</h1>
          </div>
          <button
            className="item-icon-button item-x-button"
            onClick={() => {
              setTrigger(false);
            }}
          >
            X
          </button>
        </div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <span className="user-right-container"></span>
        <table id="ctable" {...getTableProps()}>
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
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "▼"
                          : "▲"
                        : " "}
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
        <div className="page-buttons">
          {/* <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <input
            type="number"
            className="page-input"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          /> */}
          <br />
          <div className="navigate-page-group">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
              |
            </span>

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
          </div>
        </div>
        <button
          className="add-button add-button-modal"
          onClick={() => {setvAddOpen(true)}}
        >
          {" "}
          + Add Option
        </button>{" "}
        <Modal isOpen={vAddOpen} className="modal">
          {" "}
          <AddVehicleCategory
            trigger={vAddOpen}
            setTrigger={setvAddOpen}
          />{" "}
        </Modal>
      </div>
    </>
  );
};

export default VCatTable;
