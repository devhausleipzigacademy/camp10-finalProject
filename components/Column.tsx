'use client';

import { FcLikePlaceholder } from 'react-icons/fc';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import React from 'react';
import { ColumnWithJobs } from '@/app/(dashboard)/page';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const [isEditable, setIsEditable] = useState(isNewColumn);
    const queryClient = useQueryClient();

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const createNewColumn = useMutation({
        mutationFn: async (userId: string) => {
            const newCol = await axios
                .post('/api/column', { ...column } as Omit<
                    ColumnWithJobs,
                    'id' | 'createdAt' | 'jobs'
                >)
                .then(res => res.data);
            return newCol;
        },
        onSuccess: async res => {
            setIsEditable(false);
            queryClient.invalidateQueries(['columns']);
            toast.success('Created a new column successfully.');
            await queryClient.invalidateQueries(['columns']);
        },
        onError: err => {
            toast.error('Something went wrong, try again.');
        },
    });

    const deleteColumn = useMutation({
        mutationFn: async (columnId: string) =>
            await axios.delete(`/api/column/${columnId}`).then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            toast.success('Column deleted successfully');
        },
        onError: err => {
            toast.error('Something went wrong, try again!');
        },
    });

    const onSumitHandler: React.FormEventHandler<
        HTMLFormElement
    > = async event => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const newTitle = data.get('title');
        const { id, jobs, isNewColumn, ...newColumn } = column;
        newColumn.title = newTitle as string;
        column.title = newTitle as string; // Note: this line can be deleted after react query is fully implemented
        // const col = await axios.post('/api/column', newColumn);
        column.color = colorSet[column.positionInBoard % colorSet.length];
        createNewColumn.mutateAsync(column.userId);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                'bg-[#0D1117] border px-4 py-2 gap-3 w-[250px] h-[5500px] max-h-[560px] rounded-md flex flex-col',
                isDragging && 'opacity-50 border-2 border-red-700'
            )}
        >
            <div
                style={{ borderColor: column.color }}
                className="py-6 h-[50px] cursor-grab border-b-8 flex justify-between items-center"
            >
                <div className="">
                    <FcLikePlaceholder />
                </div>
                <div className="text-3xl font-medium text-[#F2F2F2]">
                    {!isEditable && <h3> {column.title} </h3>}
                    {isEditable && (
                        <form
                            className="flex justify-around rounded"
                            onSubmit={onSumitHandler}
                        >
                            <input
                                className="w-3/4 px-xs rounded-md text-basicColors-dark"
                                placeholder="confirm title"
                                name="title"
                                autoFocus
                                required
                                minLength={3}
                                maxLength={25}
                            />
                            <button
                                type="submit"
                                className="aspect-square bg-cardColors-yellow rounded-lg"
                            >
                                Add
                            </button>
                        </form>
                    )}
                </div>
                <button
                    onClick={() => {
                        deleteColumn.mutateAsync(column.id);
                    }}
                    className="px-1 py-2 rounded text-colBorder stroke-gray-300 hover:stroke-white hover:bg-colBG"
                >
                    <HiDotsHorizontal size={20} />
                </button>
            </div>
            <div className="flex flex-col flex-grow gap-6 p-3 overflow-x-hidden overflow-y-auto">
                {children}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            ;{/* Same as */}
            <ToastContainer />;
        </div>
    );
}
