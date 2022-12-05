export const COLUMNS = [
    {
        Header: 'i',
        id: 'index',
        accessor:  (/** @type {any} */ _row, /** @type {number} */ i) => i + 1
    },
    {
        Header: 'Date',
        accessor: 'date', 
    },
    {
        Header: 'Item',
        accessor: 'item'
    },
    {
        Header: 'Model',
        accessor: 'model'
    },
    {
        Header: 'Quantity',
        accessor: 'quantity'
    },
    {
        Header: 'Unit',
        accessor: 'unit'
    }
]