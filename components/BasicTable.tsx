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
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { HiArchive, HiPencil, HiTrash } from 'react-icons/hi';
import { BiPlus, BiMinus } from 'react-icons/bi';
import {
    BsArrowDownShort,
    BsArrowUpShort,
    BsCheckSquare,
    BsSquare,
} from 'react-icons/bs';
import Button from './shared/Button';
import { JobsWithCols } from '@/app/(dashboard)/getJobs';

type TableViewProps = {
    jobData: JobsWithCols[];
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
};

export default function BasicTable({
    jobData,
    filter,
    setFilter,
}: TableViewProps) {
    const data = useMemo(() => jobData, [jobData]);

    //define cols
    const columns: ColumnDef<JobsWithCols>[] = [
        {
            header: 'check',
            accessorKey: 'checked',
            footer: 'check',
        },
        {
            header: 'Job',
            accessorKey: 'title',
            footer: 'Job',
        },
        {
            header: 'Company',
            accessorKey: 'companyName',
            footer: 'Company',
        },
        {
            header: 'Location',
            accessorKey: 'location',
            footer: 'Location',
        },
        {
            header: 'Status',
            accessorKey: 'column',
        },
        {
            header: 'Deadline',
            accessorKey: 'deadline',
            footer: 'Deadline',
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            footer: 'Actions',
        },
    ];
    let sorting: any, setSorting: any;
    [sorting, setSorting] = useState([]);

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
            <table className="container ">
                <thead className="">
                    {exampleTable.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    className="border px-m py-s text-left font-600"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.column.columnDef.footer ===
                                    'check' ? (
                                        <BsSquare
                                            size={21}
                                            className="inline-block"
                                        />
                                    ) : (
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    )}
                                    {header.column.getIsSorted() ===
                                    false ? null : header.column.getIsSorted() ===
                                      'asc' ? (
                                        <BsArrowUpShort
                                            size={18}
                                            className="inline-block ml-xs"
                                        />
                                    ) : (
                                        <BsArrowDownShort
                                            size={18}
                                            className="inline-block ml-xs"
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
                            className="odd:bg-[#f2f2f2] odd:bg-opacity-5 "
                        >
                            {row.getVisibleCells().map(cell => {
                                const values = cell.getValue() as {
                                    title: string;
                                    color: string;
                                };

                                return (
                                    <td
                                        key={cell.id}
                                        className="border px-m py-s"
                                    >
                                        {cell.column.columnDef.header ===
                                        'Actions' ? (
                                            <div className="flex gap-s cursor-pointer">
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

                                        {cell.column.columnDef.footer ===
                                        'check' ? (
                                            <BsSquare size={21} />
                                        ) : cell.column.columnDef.header ===
                                          'Status' ? (
                                            <span
                                                style={{ color: values.color }}
                                            >
                                                {values.title}
                                            </span>
                                        ) : (
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
