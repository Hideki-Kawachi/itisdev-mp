import React , { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({filter, setFilter}) => {

  const [value, setValue] = useState(filter)


  return (
    <span>
      <input
        type="search"
        className="search-bar"
        placeholder="Search"
        value = {filter || ""}
        onChange={(e) => {
          setFilter(e.target.value) 
        }}
      />
    </span>
  );
}

export default GlobalFilter