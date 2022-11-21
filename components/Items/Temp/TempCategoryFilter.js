import React from 'react'

function TempCategoryFilter({filter, setFilter, placeholder, identifier}) {
  return (
    <select
        className="sort-dropdown"
        id={identifier}
        defaultValue={"0000"}
        onChange={(e) => setFilter(e.target.value)}
    >

        <option key="All" value="All">All</option>
        <option key="Engine" value="Engine">Engine</option>
        <option key="Clutch" value="Clutch">Clutch</option>
        <option key="Under Chassis" value="Under Chassis">Under Chassis</option>
        <option key="Brakes" value="Brakes">Brakes</option>
        <option key="Electrical" value="Electrical">Electrical</option>
        <option key="Others" value="Others">Others</option>
        
        {/* {categories.map((category) => (
            <option key={category.categoryID} value={category.categoryName}>
                {category.categoryName}
            </option>
        ))} */}
    </select>
  )
}

export default TempCategoryFilter;
