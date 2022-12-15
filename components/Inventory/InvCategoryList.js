import React, { useMemo, useState } from "react";
import Modal from "react-modal";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { INVCAT_COLUMNS } from "./InvCategoryColumns";
import GlobalFilter from "../GlobalFilter";
import AddInventoryCategory from "./InvCategoryCreate";
// import EditInventoryCategory from "./InvCategoryEdit";

function InvCatTable({ trigger, setTrigger, name, type, id}) {
  const columns = useMemo(() => INVCAT_COLUMNS, []);
  const data = useMemo(() => type, []);
  const [InvAddOpen, setInvAddOpen] = useState(false);
 // const [InvEditOpen, setvEditOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [catname, setCatName] = useState("");
  const [status, setStatus] = useState("");

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

  function clickRow(rowid, rowname, rowstatus){
    setSelected(rowid);
    setCatName(rowname);
    setStatus(rowstatus)
    console.log("row id: " + rowid)
    // setvEditOpen(true);
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
                  onClick={() =>
                    clickRow(
                      row.original[id],
                      row.original.name,
                      row.original.disabled
                    )
                  }
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
            setInvAddOpen(true);
          }}
        >
          {" "}
          + Add Option
        </button>{" "}
        <Modal isOpen={InvAddOpen} className="modal" ariaHideApp={false}>
          {" "}
          <AddInventoryCategory
            trigger={InvAddOpen}
            setTrigger={setInvAddOpen}
            name={name}
            type={type}
            id={id}
          />{" "}
        </Modal>
       { /* } <Modal isOpen={vEditOpen} className="modal" ariaHideApp={false}>
          <EditVehicleCategory
            trigger={vEditOpen}
            setTrigger={setvEditOpen}
            name={name}
            type={type}
            status={status}
            catname={catname}
            id={id}
            selected={selected}
          />
        </Modal>
        */ }
      </div>
    </>
  );
};

export default InvCatTable;