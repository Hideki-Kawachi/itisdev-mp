import * as React from 'react';

  // Component for Default Column Filter
  export function DefaultFilterColumn({
    column: {
      filterValue,
      preFilteredRows: { length },
      setFilter,
    },
   }) {
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          // Set undefined to remove the filter entirely
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${length} records..`}
        style={{ marginTop: "10px" }}
      />
    );
   }
    
   // Component for Custom Select Filter
   export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
   }) {
    
    // Use preFilteredRows to calculate the options
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
    
    // UI for Multi-Select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
   }

export const Dropdown = ({
    options, 
    title, 
    id, 
    name,
    filter, 
    setFilter,
    }) => {

    const [value, setValue] = React.useState(filter)
  
    return (
        <span className="form-item">
            <label className="form-labels">{title}:</label>
            <br />
            <select className="sort-dropdown" id="item-category-filter" value={filter} onChange={(e) => setFilter(e.target.value || "")}>
                <option value="" key="00000" defaultValue hidden>
                    {" "}
                    All{" "}
                </option>
                {options.map((option) => (
                    <option key={option[id]} value={option[id]}>
                        {option[name]}
                    </option>
                ))}
            </select>
        </span>
    );
  }
  
  export default Dropdown