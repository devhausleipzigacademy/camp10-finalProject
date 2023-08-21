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
import { HiArchive, HiPencil, HiTrash } from 'react-icons/hi';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

type Job = {
    id: number;
    state: boolean;
    job_title: string;
    company_name: string;
    location: string;
    status: string;
    deadline: string;
    action: string;
};

export default function BasicTable() {
    const data = useMemo(() => testDataTable, []);

    //define cols
    const columns: ColumnDef<Job>[] = [
        {
            header: '???',
            accessorKey: 'state',
            footer: '???',
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
            header: 'Location',
            accessorKey: 'location',
            footer: 'Location',
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
            // cell: cell => cell.getValue().split('/'),
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            footer: 'Actions',
        },
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
        <div className="ui-background border">
            <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
            />
            <table className="border mx-auto container ">
                <thead className="">
                    {exampleTable.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    className="border p-s text-left"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                    {header.column.getIsSorted() ===
                                    false ? null : header.column.getIsSorted() ===
                                      'asc' ? (
                                        <BsArrowUpShort
                                            size={18}
                                            className="inline-block ml-2"
                                        />
                                    ) : (
                                        <BsArrowDownShort
                                            size={18}
                                            className="inline-block ml-2"
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {exampleTable.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className="odd:bg-[#f2f2f2] odd:bg-opacity-5 hover:outline-none transition-transform ease-in-out hover:scale-y-[1.06] hover:scale-x-[1.01]"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border p-s">
                                    {cell.column.columnDef.header ===
                                    'Actions' ? (
                                        <div className="flex justify-between    ">
                                            {' '}
                                            <HiArchive size={20} />{' '}
                                            <HiPencil size={20} />{' '}
                                            <HiTrash size={20} />{' '}
                                        </div>
                                    ) : null}
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
