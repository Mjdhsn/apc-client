import React from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import css from "./PollingTable.module.scss";
import { matchSorter } from "match-sorter";
import Loader from "../../../compononts/Loader/Loader";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

const PollingTable = ({ columns, data, handleSubmitProp, source }) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 30 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useGlobalFilter,
    usePagination
  );

  if (data.length === 0) return <Loader />;

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()} className={css.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                if (
                  source !== "dashboard" &&
                  (column.Header === "Images" || column.Header === "Videos")
                ) {
                  return null;
                } else {
                  return (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  );
                }
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                onClick={() => handleSubmitProp(row.cells[1].value)}
                {...row.getRowProps()}
                className={css.tableRow}
              >
                {row.cells.map((cell) => {
                  if (
                    source !== "dashboard" &&
                    (cell.column.Header === "Images" ||
                      cell.column.Header === "Videos")
                  ) {
                    return null;
                  } else {
                    return (
                      <td {...cell.getCellProps()} className={css.tableCell}>
                        {cell.column.id === "pu_id" ? (
                          <button className={`button ${css.clickMe}`}>
                            {source === "dashboard" ? "See More" : "Collate"}
                          </button>
                        ) : cell.column.Header === "Images" ? (
                          <div className={`${css.badge} imageBadge`}>
                            0/{cell.value}
                          </div>
                        ) : cell.column.Header === "Videos" ? (
                          <div className={`${css.badge} videoBadge`}>
                            0/{cell.value}
                          </div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* pagination */}
      <div className="pagination">
        <button
          className="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          className="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          className="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          className="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PollingTable;
