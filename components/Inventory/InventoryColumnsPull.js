import { GlobalFilter } from "../GlobalFilter";

export const COLUMNS = [
	{
		Header: "",
		id: "index",
		accessor: (/** @type {any} */ _row, /** @type {number} */ i) => i + 1,
	},
	{
		Header: "Date",
		accessor: "pullDate",
		Filter: GlobalFilter,
	},
	{
		Header: "JO Number",
		accessor: "JOnumber",
		Filter: GlobalFilter,
	},
	{
		Header: "Plate Number",
		accessor: "plateNum",
		Filter: GlobalFilter,
	},
	{
		Header: "Item Name",
		accessor: "itemName",
		disableGlobalFilter: true,
	},
	{
		Header: "Brand",
		accessor: "brandName",
		disableGlobalFilter: true,
	},
	{
		Header: "Quantity",
		accessor: "quantity",
		disableGlobalFilter: true,
	},
	{
		Header: "Unit",
		accessor: "unit",
		disableGlobalFilter: true,
	},
];
