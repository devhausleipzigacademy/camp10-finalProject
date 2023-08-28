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
import { BsArrowDownShort, BsArrowUpShort, BsSquare } from 'react-icons/bs';
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
            cell: () => <BsSquare size={21} className="mx-auto" />,
        },
        {
            header: 'Job',
            accessorKey: 'title',
            footer: 'Job',
        },
        {
            header: 'Company',
            accessorKey: 'companyName',
        },
        {
            header: 'Location',
            accessorKey: 'location',
        },
        {
            header: 'Status',
            accessorKey: 'column',
            cell: ({ cell }) => {
                const column = cell.getValue() as {
                    title: string;
                    color: string;
                };
                return (
                    <span
                        style={{ backgroundColor: column.color }}
                        className="text-cardColors-black py-xxs px-xs rounded-sm font-500"
                    >
                        {column.title}
                    </span>
                );
            },
        },
        {
            header: 'Deadline',
            accessorKey: 'deadline',
            cell: ({ cell }) => {
                const formattedDate =
                    cell.getValue() === null
                        ? 'no deadline'
                        : new Date(cell.getValue() as string).toLocaleString(
                              'en-US',
                              {
                                  year: 'numeric',
                                  month: 'short',
                                  day: '2-digit',
                              }
                          );
                return <span>{formattedDate}</span>;
            },
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: () => {
                return (
                    <div className="flex gap-s cursor-pointer">
                        <HiArchive
                            size={20}
                            onClick={() => console.log('blupp')}
                        />{' '}
                        <HiPencil
                            size={20}
                            onClick={() => console.log('foo')}
                        />{' '}
                        <HiTrash size={20} onClick={() => console.log('bar')} />{' '}
                    </div>
                );
            },
        },
    ];
    // let sorting: any, setSorting: any;
    let [sorting, setSorting] = useState([]);

    const jobDataTable = useReactTable({
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
        <div className="ui-background border px-m py-m space-y-s min-h-[550px]">
            <div className="flex justify-between">
                <div className="flex gap-s">
                    <Button
                        size="tiny"
                        onClick={() => jobDataTable.setPageIndex(0)}
                    >
                        {' '}
                        First Page
                    </Button>
                    <button
                        onClick={() => jobDataTable.previousPage()}
                        disabled={!jobDataTable.getCanPreviousPage()}
                        className=" disabled:hover:bg-transparent disabled:opacity-30"
                    >
                        <BiMinus
                            size={26}
                            className=" border transition-colors ease-in-out bg-transparent rounded-full   text-basicColors-light hover:bg-hoverColors-hover hover:text-hoverColors-hoverMain"
                        />
                    </button>
                    <button
                        className="disabled:hover:bg-transparent disabled:opacity-30  "
                        onClick={() => jobDataTable.nextPage()}
                        disabled={!jobDataTable.getCanNextPage()}
                    >
                        <BiPlus
                            size={26}
                            className="border transition-colors ease-in-out bg-transparent rounded-full  text-basicColors-light hover:bg-hoverColors-hover hover:text-hoverColors-hoverMain"
                        />
                    </button>
                    <Button
                        size="tiny"
                        onClick={() =>
                            jobDataTable.setPageIndex(
                                jobDataTable.getPageCount() - 1
                            )
                        }
                    >
                        {' '}
                        Last Page{' '}
                    </Button>
                </div>
            </div>
            <table className="container">
                <thead className="">
                    {jobDataTable.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    className="border px-m py-s text-left font-600"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.column.columnDef.header ===
                                    'check' ? (
                                        <BsSquare
                                            size={21}
                                            className="mx-auto"
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
                    {jobDataTable.getRowModel().rows.map(row => (
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
                                        className="border h-[3.5rem] px-s"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
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
