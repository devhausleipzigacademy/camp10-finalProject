'use client';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnDef,
} from '@tanstack/react-table';
import testDataTable from '@/app/(dashboard)/testDataTable.json';
import { useMemo, useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

type Job = {
    id: number;
    job_title: string;
    company_name: string;
    priority: string;
    deadline: string;
    status: string;
};

export default function BasicTable() {
    const data = useMemo(() => testDataTable, []);

    //define cols
    const columns: ColumnDef<Job>[] = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID',
        },
        {
            header: 'Job',
            accessorKey: 'job_title',
            footer: 'Job',
        },
        {
            header: 'Company',
            accessorKey: 'company_name',
            footer: 'Company',
        },
        {
            header: 'Priority',
            accessorKey: 'priority',
            footer: 'Priority',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            footer: 'Status',
        },
        {
            header: 'Deadline',
            accessorKey: 'deadline',
            footer: 'Deadline',
            cell: cell => cell.getValue().split('/'), // An example to format a col
        },

        // Combine 2 cols example:
        // {
        //   header: "First Name",
        //   accessorKey: "first_name",
        //   footer: "First Name",
        // },
        // {
        //   header: "Last Name",
        //   accessorKey: "last_name",
        //   footer: "Last Name",
        // },
        // {
        //   header: "Name",
        //   accessorFn: (row) => ` ${row.first_name}  ${row.last_name}`,  // accessorFn: (callback)
        //   footer: "Name",
        // },

        // nested headerGroups example.
        // Note: You need to add 'header.isPlaceholder ? null : flexRender()' ternary to header flexRender.
        // {
        //   header: "Positions",
        //   columns: [
        //     {
        //       header: "Job Title",
        //       accessorKey: "first_name",
        //       footer: "Job Title",
        //     },
        //     {
        //       header: "Company",
        //       accessorKey: "last_name",
        //       footer: "Company",
        //     },
        //   ],
        // },
        // {
        //   header: "Mail",
        //   accessorKey: "email",
        //   footer: "Mail",
        // },
    ];
    const [sorting, setSorting] = useState([]);
    const [filter, setFilter] = useState('');

    const exampleTable = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilter,
    });

    return (
        <div className="w3-container">
            <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <table className="w3-table-all w3-hoverable">
                <thead>
                    {exampleTable.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                    {
                                        {
                                            asc: <BsArrowUpShort />,
                                            desc: <BsArrowDownShort />,
                                        }[header.column.getIsSorted() ?? null]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {exampleTable.getRowModel().rows.map(row => (
                        <tr key={row.id} draggable>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => exampleTable.setPageIndex(0)}>
                    {' '}
                    First Page
                </button>
                <button
                    onClick={() => exampleTable.previousPage()}
                    disabled={!exampleTable.getCanPreviousPage()}
                >
                    <AiOutlineMinusCircle />
                </button>
                <button
                    onClick={() => exampleTable.nextPage()}
                    disabled={!exampleTable.getCanNextPage()}
                >
                    <AiOutlinePlusCircle />
                </button>
                <button
                    onClick={() =>
                        exampleTable.setPageIndex(
                            exampleTable.getPageCount() - 1
                        )
                    }
                >
                    {' '}
                    Last Page{' '}
                </button>
            </div>
        </div>
    );
}
