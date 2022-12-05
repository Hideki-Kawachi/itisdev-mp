import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import ADDINV_MOCK_DATA from '../ADDINV_MOCK_DATA.json'


export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => ADDINV_MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    })

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        rows,
        prepareRow, 
    } = tableInstance

    return (
        <table id="btable" {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr 
                        id="btable"
                        className='btable'
                        {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th> 
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr id="btable" {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
