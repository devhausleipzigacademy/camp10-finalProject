'use client';

import { HiCube } from 'react-icons/hi';
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
import DropdownMenu from './shared/DropdownMenu';
import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';
import { HiCheck } from 'react-icons/hi';

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

    const { addColumn, removeColumn } = useColumnStore();

    const [isEditable, setIsEditable] = useState(isNewColumn);
    const queryClient = useQueryClient();

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const createNewColumn = useMutation({
        mutationFn: (col: Partial<ColumnWithJobs>) => axios.post('/api/column', { ...col } as Omit<
                ColumnWithJobs,
                'id' | 'createdAt' | 'jobs'
            >).then(res => res.data),
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
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    console.log(422);
                    toast.error('The title needs at least 3 characters.');
                    return;
                }
            }
            toast.error('Something went wrong in the server!');
        },
    });

    const deleteColumn = useMutation({
        mutationFn: (columnId: string) => axios.delete(`/api/column/${columnId}`).then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            removeColumn(column.positionInBoard);
            toast.success('Column deleted successfully', {
                toastId: 'succes2',
            });
        },
        onError: err => {
            console.log(err)
            toast.error('Something went wrong, try again!');
        },
    });

    const patchColumnTitle = useMutation({
        mutationFn: (column: Partial<ColumnWithJobs>) => axios
                .patch(`/api/column/${column.id}`, {
                    title: column.title,
                })
                .then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            toast.success('Title is updated successfully')
        },
        onError: err => {
            console.log(err);
            toast.error('Something went wrong, refresh the page!');
        },
    });

    const onSumitHandler: React.FormEventHandler<
        HTMLFormElement
    > = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const newTitle = data.get('title') as string;
        if (column.isNewColumn) {
            const { id, jobs, isNewColumn, ...newColumn } = column;
            newColumn.title = newTitle;
            column.title = newTitle;
            newColumn.color =
                colorSet[column.positionInBoard % colorSet.length];
            const newCol = createNewColumn.mutate(newColumn);
            console.log(newCol)
        } else {
            await patchColumnTitle.mutateAsync({ ...column, title: newTitle });
            column.title = newTitle;
            setIsEditable(false)
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                'ui-background px-m py-s w-[250px] h-[550px] border flex flex-col',
                isDragging && 'opacity-50 border-2 border-red-700'
            )}
        >
            <div
                style={{ borderColor: column.color }}
                className="h-[50px] cursor-grab border-b-8 flex justify-between items-center"
            >
                <div className="">
                    <HiCube size={24} />
                </div>
                <div className="text-basicColors-light">
                    {!isEditable && <h4> {column.title} </h4>}
                    {isEditable && (
                        <form
                            className="flex justify-around"
                            onSubmit={onSumitHandler}
                        >
                            <input
                                className="w-4/5 px-xs text-basicColors-dark focus:outline-none focus:ring-1 focus:ring-hoverColors-hover"
                                placeholder="confirm title"
                                name="title"
                                autoFocus
                                required
                                minLength={3}
                                maxLength={25}
                            />
                            <button
                                type="submit"
                                className="aspect-square w-m flex justify-center items-center rounded-full hover:bg-basicColors-light hover:text-textColors-textBody"
                            >
                                <HiCheck size={16} />
                            </button>
                        </form>
                    )}
                </div>
                {!isEditable && (
                    <button className="rounded overflow-visible">
                        <DropdownMenu
                            onDelete={() => {
                                if (column.jobs.length === 0) {
                                    deleteColumn.mutate(column.id)
                                    return
                                }
                                toast.info("You can't delete a column that has a job inside.")
                            }}
                            onEdit={() => {
                                setIsEditable(true);
                            }}
                        />
                    </button>
                )}
            </div>
            <div className="flex flex-col gap-s py-s overflow-x-hidden overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
