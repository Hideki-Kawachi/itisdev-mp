import React , { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const TempSearch = ({filter, setFilter, placeholder}) => {

  const [value, setValue] = useState(filter)

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <input
      type="search"
      className="search-bar"
      placeholder={placeholder}
      value = {value || ""}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
    />
  );
}

export default TempSearch