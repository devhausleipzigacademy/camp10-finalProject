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
import { BiPlus, BiMinus } from 'react-icons/bi';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import Button from './shared/Button';

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
            header: '☐',
            accessorKey: 'checked',
            footer: ' ',
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
    let sorting: any, setSorting: any;
    [sorting, setSorting] = useState([]);
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
        <div className="ui-background border px-m pb-m">
            <div className="flex justify-between p-s">
                <input
                    type="text"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="border bg-transparent rounded-full outline-none py-xxs px-s"
                />
                <div className="flex gap-s">
                    <Button
                        size="tiny"
                        onClick={() => exampleTable.setPageIndex(0)}
                    >
                        {' '}
                        First Page
                    </Button>
                    <button
                        onClick={() => exampleTable.previousPage()}
                        disabled={!exampleTable.getCanPreviousPage()}
                        className=" disabled:hover:bg-transparent disabled:opacity-30"
                    >
                        <BiMinus
                            size={26}
                            className=" border transition-colors ease-in-out bg-transparent rounded-full   text-basicColors-light hover:bg-hoverColors-hover hover:text-hoverColors-hoverMain"
                        />
                    </button>
                    <button
                        className="disabled:hover:bg-transparent disabled:opacity-30  "
                        onClick={() => exampleTable.nextPage()}
                        disabled={!exampleTable.getCanNextPage()}
                    >
                        <BiPlus
                            size={26}
                            className="border transition-colors ease-in-out bg-transparent rounded-full  text-basicColors-light hover:bg-hoverColors-hover hover:text-hoverColors-hoverMain"
                        />
                    </button>
                    <Button
                        size="tiny"
                        onClick={() =>
                            exampleTable.setPageIndex(
                                exampleTable.getPageCount() - 1
                            )
                        }
                    >
                        {' '}
                        Last Page{' '}
                    </Button>
                </div>
            </div>
            <table className=" container ">
                <thead className="">
                    {exampleTable.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    className="border px-m py-s text-left first:text-center font-600"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
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
                            className="odd:bg-[#f2f2f2] odd:bg-opacity-5"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className="border px-m py-s first:text-center "
                                >
                                    {cell.column.columnDef.header ===
                                    'Actions' ? (
                                        <div className="flex gap-s cursor-pointer">
                                            {' '}
                                            <HiArchive
                                                size={20}
                                                onClick={() =>
                                                    console.log('blupp')
                                                }
                                            />{' '}
                                            <HiPencil
                                                size={20}
                                                onClick={() =>
                                                    console.log('foo')
                                                }
                                            />{' '}
                                            <HiTrash
                                                size={20}
                                                onClick={() =>
                                                    console.log('bar')
                                                }
                                            />{' '}
                                        </div>
                                    ) : null}
                                    {cell.column.columnDef.footer === ' ' ? (
                                        <input
                                            type="checkbox"
                                            className="h-s w-s "
                                        />
                                    ) : (
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
