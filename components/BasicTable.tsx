'use client';
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    ColumnDef,
    SortingState,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { HiArchive, HiPencil, HiTrash } from 'react-icons/hi';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { BsArrowDownShort, BsArrowUpShort, BsSquare } from 'react-icons/bs';
import Button from './shared/Button';
import { JobsWithCols } from '@/app/(dashboard)/getJobs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Job } from '@prisma/client';

type TableViewProps = {
    jobData: JobsWithCols[];
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
};

type ColumnType = {
    title: string;
    color: string;
}

export default function BasicTable({
    jobData,
    filter,
    setFilter,
}: TableViewProps) {
    const { data: jobsData }: { data: JobsWithCols[] } = useQuery({
        queryKey: ['jobs'],
        queryFn: () => axios.get('/api/job').then(res => res.data),
        initialData: jobData,
    });

    const queryClient = useQueryClient();
    // delete job
    const deleteJob = useMutation({
        mutationFn: (id: string) => axios.delete(`/api/job/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs']);
            toast.success('Job deleted');
        },
    })
    const archiveJob = useMutation({
        mutationFn: (id: string) => axios.patch(`/api/job/${id}`, { isArchived: true }),
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs']);
            toast.success('Job archived');
        },
    })

    const data = useMemo(() => jobsData, [jobsData]);
    //define cols
    const columns: ColumnDef<JobsWithCols>[] = [
        {
            header: 'check',
            accessorKey: 'checked',
            cell: () => <BsSquare size={21} className="mx-auto" />,
            enableSorting: false,
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
            id: 'column',
            header: 'Status',
            accessorKey: 'column',
            cell: ({ cell }) => {
                const columnValues = cell.getValue() as ColumnType;
                return (
                    <span
                        style={{ backgroundColor: columnValues.color }}
                        className="text-cardColors-black py-xxs px-xs rounded-sm font-500"
                    >
                        {columnValues.title}
                    </span>
                );
            },
            sortingFn: (a, b) => {
                const aValue = a.getValue('column') as ColumnType;
                const bValue = b.getValue('column') as ColumnType;
                return aValue.title > bValue.title ? 1 : -1;
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
            cell: (cell) => {
                const jobId = cell.row.original.id;
                const isArchived = cell.row.original.isArchived;
                return (
                    <div className="flex justify-around cursor-pointer">
                        <HiPencil
                            size={20}
                            onClick={() => console.log('foo')}
                        />
                        <HiArchive
                            size={20}
                            onClick={() => isArchived ? null : archiveJob.mutate(jobId)}
                            className={`${isArchived ? 'text-basicColors-dark' : ''}`}
                        />
                        <HiTrash 
                            size={20}
                            className="hover:text-cardColors-red"
                            onClick={() => deleteJob.mutate(jobId)} 
                        />
                    </div>
                );
            },
        },
    ];
    let [sorting, setSorting] = useState<SortingState>([]);

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
                        variant="primary"
                        size="tiny"
                        onClick={() => jobDataTable.setPageIndex(0)}
                    >
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
                        Last Page
                    </Button>
                </div>
                <Link href="/new-job">
                    <Button size="tiny">New Job</Button>
                </Link>
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
