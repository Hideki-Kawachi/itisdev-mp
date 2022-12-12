import React, { useMemo, useState } from "react";
import Modal from "react-modal";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import ITEM_CAT_MOCK_DATA from "./Temp/ITEM_CAT_MOCK_DATA.json"
import { COLUMNS } from "./CategoryColumns";
import GlobalFilter from "../GlobalFilter";
import AddItemCategory from "./CategoryCreate";
import Link from "next/link";

function ItemCatTable({ trigger, setTrigger, name, type, id}) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => ITEM_CAT_MOCK_DATA, []);
  const [iAddOpen, setIAddOpen] = useState(false);
  const [iEditOpen, setIEditOpen] = useState(false);
  const [selected, setSelected] = useState("");

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

  function clickRow(rowid){
    setSelected(rowid);
    console.log("row id: " + rowid)
    setIEditOpen(true);
  }
  const { globalFilter } = state;
  const { pageIndex } = state;

  return (
    <>
      <div className="item-modal">
        <div className="item-header item-modal-header">
          <div className="item-column-container">
            <h1>{name}</h1>
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
                <tr
                  id="btable"
                  {...row.getRowProps()}
                  onClick={() => clickRow(row.original[id])}
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
        <div className="page-buttons">
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
          onClick={() => {
            setIAddOpen(true);
          }}
        >
          {" "}
          + Add Option
        </button>{" "}
        <Modal isOpen={iAddOpen} className="modal" ariaHideApp={false}>
          {" "}
          <AddItemCategory
            trigger={iAddOpen}
            setTrigger={setIAddOpen}
            name={name}
            type={type}
            id={id}
          />{" "}
        </Modal>
        {/* <Modal isOpen={vEditOpen} className="modal">
          <EditVehicleCategory
            trigger={vEditOpen}
            setTrigger={setvEditOpen}
            name={name}
            type={type}
            id={id}
            selected={selected}
          />
        </Modal> */}
      </div>
    </>
  );
};

export default ItemCatTable;
