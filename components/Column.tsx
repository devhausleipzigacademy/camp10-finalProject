'use client';

import { HiCube, HiDotsHorizontal } from 'react-icons/hi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import React from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useColumnStore } from '@/store/columns';
import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';
import Button from './shared/Button';
import Link from 'next/link';
import { HiCheck } from 'react-icons/hi';
import DropDownFrame, {
    DropDownItems,
    DropDownList,
    DropDownTrigger,
} from '@/components/shared/DropDownCompositional';

type ColumnProps = {
    column: ColumnWithJobs;
    children: React.ReactNode;
    isNewColumn: boolean;
};

const colorSet = ['#B4A0D1', '#CBD87E', '#FDC959', '#FE5A35', '#4C9A2A'];

export default function Column({ column, children, isNewColumn }: ColumnProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    const { addColumn, removeColumn, setColumnColor, existingColumns } =
        useColumnStore();

    const [isEditable, setIsEditable] = useState(isNewColumn);

    const queryClient = useQueryClient();

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const updateColor = useMutation({
        mutationFn: (color: string) =>
            axios
                .patch(`/api/column/${column.id}`, {
                    color,
                })
                .then(res => res.data),
        onSuccess: res => {
            queryClient.invalidateQueries(['columns']);
        },
    });

    const createNewColumn = useMutation({
        mutationFn: (col: Partial<ColumnWithJobs>) =>
            axios
                .post('/api/column', { ...col } as Omit<
                    ColumnWithJobs,
                    'id' | 'createdAt' | 'jobs'
                >)
                .then(res => res.data),
        onSuccess: async res => {
            setIsEditable(false);
            column.isNewColumn = false;
            await queryClient.invalidateQueries(['columns']);
            // update local state
            removeColumn(column.positionInBoard);
            addColumn({
                ...column,
                id: res.id,
                color: colorSet[column.positionInBoard % colorSet.length],
            });
            toast.success('Created a new column successfully.');
        },
        onError: error => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    toast.error('The title needs at least 3 characters.');
                    return;
                }
            }
            toast.error('Something went wrong in the server!');
        },
    });

    const deleteColumn = useMutation({
        mutationFn: (columnId: string) =>
            axios.delete(`/api/column/${columnId}`).then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            removeColumn(column.positionInBoard);
            toast.success('Column deleted successfully', {
                toastId: 'succes2',
            });
        },
        onError: err => {
            toast.error('Something went wrong, try again!');
        },
    });

    const { isLoading, ...patchColumnTitle } = useMutation({
        mutationFn: (column: Partial<ColumnWithJobs>) =>
            axios
                .patch(`/api/column/${column.id}`, {
                    title: column.title,
                })
                .then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            toast.success('Title is updated successfully');
        },
        onError: err => {
            toast.error('Something went wrong, refresh the page!');
        },
    });

    const onSumitHandler: React.FormEventHandler<
        HTMLFormElement
    > = async event => {
        event.preventDefault();
        if (isLoading) return;
        const data = new FormData(event.target as HTMLFormElement);
        const newTitle = data.get('title') as string;
        if (newTitle.trim() === column.title) {
            setIsEditable(false);
            return;
        }
        const log = existingColumns.filter(col => col.title === newTitle);

        if (column.isNewColumn) {
            const { id, jobs, isNewColumn, ...newColumn } = column;
            newColumn.title = newTitle;
            column.title = newTitle;
            newColumn.color =
                colorSet[column.positionInBoard % colorSet.length];
            const newCol = createNewColumn.mutate(newColumn);
        } else {
            if (log[0]) {
                toast.info('Title is existing, please chose another one');
                return;
            }
            await patchColumnTitle.mutateAsync({ ...column, title: newTitle });
            column.title = newTitle;
            setIsEditable(false);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                'ui-background px-m py-s w-[256px] h-[550px] border flex flex-col',
                isDragging && 'opacity-50 border-2 border-red-700'
            )}
            id={column.isNewColumn ? 'newColumn' : undefined}
        >
            <div
                style={{ borderColor: column.color }}
                className="h-[50px] cursor-grab border-b-8 flex justify-between items-center"
            >
                <HiCube size={24} />

                <div className="text-basicColors-light w-4/5">
                    {!isEditable && (
                        <h4 className="text-center truncate mx-xxs">
                            {' '}
                            {column.title}{' '}
                        </h4>
                    )}
                    {isEditable && (
                        <form
                            className="flex justify-around"
                            onSubmit={onSumitHandler}
                        >
                            <input
                                className="w-4/5 h-[2rem] text-basicColors-dark focus:outline-none focus:ring-1 focus:ring-hoverColors-hover focus:border-hoverColors-hover rounded-lg form-input"
                                placeholder="confirm title"
                                name="title"
                                autoFocus
                                required
                                minLength={3}
                                maxLength={25}
                                defaultValue={column.title}
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center rounded-full aspect-square w-m hover:bg-basicColors-light hover:text-textColors-textBody"
                            >
                                <HiCheck size={16} />
                            </button>
                        </form>
                    )}
                </div>
                {!isEditable && (
                    <DropDownFrame>
                        <DropDownTrigger className="flex justify-center rounded-bl-none cursor-pointer rounded-xl text-mainBG">
                            <HiDotsHorizontal
                                size={15}
                                className=" hover:opacity-100 opacity-80"
                            />
                        </DropDownTrigger>

                        <DropDownList className="w-[7rem] border text-basicColors-light text-s text-left p-xs top-[3.2rem] ui-background-dark">
                            <DropDownItems>
                                <div
                                    className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light"
                                    onClick={() => {
                                        setIsEditable(true);
                                    }}
                                >
                                    Edit
                                </div>
                            </DropDownItems>
                            <DropDownItems>
                                <div
                                    className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light"
                                    onClick={() => {
                                        if (column.jobs.length === 0) {
                                            deleteColumn.mutate(column.id);
                                            return;
                                        }
                                        toast.info(
                                            "You can't delete a column that has a job inside."
                                        );
                                    }}
                                >
                                    Delete
                                </div>
                            </DropDownItems>
                            <DropDownItems className="flex flex-wrap justify-around gap-xs p-xxs hover:bg-transparent mt-xs">
                                <div
                                    onClick={() => {
                                        updateColor.mutate('#FE5A35');
                                        setColumnColor(column.id, '#FE5A35');
                                    }}
                                    className="rounded-full w-s h-s bg-cardColors-red hover:scale-150"
                                />
                                <div
                                    onClick={() => {
                                        updateColor.mutate('#CBE87E');
                                        setColumnColor(column.id, '#CBE87E');
                                    }}
                                    className="rounded-full w-s h-s bg-cardColors-green hover:scale-150"
                                />
                                <div
                                    onClick={() => {
                                        updateColor.mutate('#DAEDEB');
                                        setColumnColor(column.id, '#DAEDEB');
                                    }}
                                    className="rounded-full w-s h-s bg-cardColors-blue hover:scale-150"
                                />
                                <div
                                    onClick={() => {
                                        updateColor.mutate('#B4A0D1');
                                        setColumnColor(column.id, '#B4A0D1');
                                    }}
                                    className="rounded-full w-s h-s bg-cardColors-purple hover:scale-150"
                                />
                                <div
                                    onClick={() => {
                                        updateColor.mutate('#FDC959');
                                        setColumnColor(column.id, '#FDC959');
                                    }}
                                    className="rounded-full w-s h-s bg-cardColors-yellow hover:scale-150"
                                />
                                <div
                                    onClick={() => {
                                        updateColor.mutate('#99B1ED');
                                        setColumnColor(column.id, '#99B1ED');
                                    }}
                                    className="rounded-full w-s h-s bg-cardColors-darkblue hover:scale-150"
                                />
                            </DropDownItems>
                        </DropDownList>
                    </DropDownFrame>
                )}
            </div>
            <div className="flex flex-col h-full overflow-x-hidden gap-s py-s scrollbar-track-transparent scrollbar-thumb-basicColors-dark scrollbar-thin">
                <Link href={`/new-job?name=${column.title}`}>
                    <Button size="square" variant="primary">
                        +
                    </Button>
                </Link>
                {children}
            </div>
        </div>
    );
}
