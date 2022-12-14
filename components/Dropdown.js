import * as React from 'react';

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
            <select 
              className="sort-dropdown" 
              id="item-category-filter" 
              value={filter} 
              name={id}
              onChange={(e) => setFilter(e.target.name, e.target.value || "")}
            >
                <option value="" key="00000" defaultValue>
                    {" "}
                    All{" "}
                </option>
                {options.map((option) => (
                    <option key={option[id]} value={option[name]}>
                        {option[name]}
                    </option>
                ))}
            </select>
        </span>
    );
  }
  
  export default Dropdown