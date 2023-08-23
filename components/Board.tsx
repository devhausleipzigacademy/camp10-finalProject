'use client';
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import JobCard from './JobCard';
import Column from './Column';
import { Job, Column as ColumnType } from '@prisma/client';
import { useAuth } from '@clerk/nextjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useColumnStore } from '@/store/columns';
import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';

type BoardProps = {
    columnData: ColumnWithJobs[];
};

export default function Board({ columnData }: BoardProps) {
    const { userId } = useAuth();

    const [activeColumn, setActiveColumn] = useState<ColumnWithJobs | null>(
        null
    );
    const [activeJob, setActiveJob] = useState<
        (Job & { color: string }) | null
    >(null);

    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 30,
            },
        })
    );

    // Data Handling
    const queryClient = useQueryClient();
    const { data: columnsData }: { data: ColumnWithJobs[] } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get(`/api/column?userId=${userId}`).then(res => res.data),
        initialData: columnData,
        refetchInterval: 3000,
    });

    const { existingColumns, setColumns, addColumn } = useColumnStore();
    useEffect(() => {
        setColumns(columnsData);
    }, []);

    const patchColumn = useMutation({
        mutationFn: async (column: ColumnWithJobs) =>
            await axios
                .patch(`/api/column/${column.id}`, {
                    positionInBoard: column.positionInBoard,
                })
                .then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            console.log('patched column');
        },
        onError: err => {
            console.log(err);
            toast.error('Something went wrong, refresh the page!');
        },
    });

    const patchJob = useMutation({
        mutationFn: async (job: Job) =>
            await axios
                .patch(`/api/job/${job.id}`, {
                    positionInColumn: job.positionInColumn,
                    columnId: job.columnId,
                })
                .then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            console.log('patched job');
        },
        onError: err => {
            console.log(err);
            toast.error('Something went wrong, refresh the page!');
        },
    });

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            return setActiveColumn(event.active.data.current.column);
        }

        if (event.active.data.current?.type === 'Job') {
            const findParent = existingColumns.find(
                col => event.active.data.current?.parent === col.id
            );
            return setActiveJob({
                ...event.active.data.current.job,
                color: findParent?.color,
            });
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over || over.id === active.id) return;

        if (
            over.data.current?.type === 'Job' &&
            active.data.current?.type === 'Job'
        ) {
            // when job is draged in the same column
            if (over.data.current?.parent === active.data.current?.parent) {
                const parentIndex = existingColumns.findIndex(
                    col => col.id === over.data.current?.parent
                );
                const parentColumn = existingColumns[parentIndex];
                const movedArray = arrayMove(
                    parentColumn.jobs,
                    parentColumn.jobs.findIndex(
                        job => job.id === active.data.current?.job.id
                    ),
                    parentColumn.jobs.findIndex(
                        job => job.id === over.data.current?.job.id
                    )
                ).map((job, idx) => {
                    return {
                        ...job,
                        positionInColumn: idx,
                    };
                });

                setColumns([
                    ...existingColumns.slice(0, parentIndex),
                    { ...parentColumn, jobs: movedArray },
                    ...existingColumns.slice(parentIndex + 1),
                ]);

                movedArray.forEach(async job => {
                    patchJob.mutateAsync(job);
                });

                return;
            }

            const newColumns = existingColumns.map(column => {
                if (column.id === over.data.current?.parent) {
                    const currentJob = active.data.current?.job;
                    const findArrayPosition = column.jobs.findIndex(
                        col => col.id === over.data.current?.job.id
                    );
                    const movedJobs = [
                        ...column.jobs.slice(0, findArrayPosition),
                        currentJob,
                        ...column.jobs.slice(findArrayPosition),
                    ].map((job, idx) => {
                        return {
                            ...job,
                            columnId: column.id,
                            positonInColumn: idx,
                        };
                    });
                    console.log(movedJobs);
                    return {
                        ...column,
                        jobs: movedJobs,
                    };
                }

                if (column.id === active.data.current?.parent) {
                    const movedJobs = column.jobs
                        .filter(job => job.id !== active.data.current?.job.id)
                        .map((job, idx) => {
                            return {
                                ...job,
                                columnId: column.id,
                                positonInColumn: idx,
                            };
                        });
                    console.log(movedJobs);
                    return {
                        ...column,
                        jobs: movedJobs,
                    };
                }
                return column;
            });
            setColumns(newColumns);
            newColumns.forEach(col => {
                col.jobs.forEach(job => {
                    patchJob.mutateAsync(job);
                });
            });
        }

        if (
            over.data.current?.type === 'Column' &&
            active.data.current?.type === 'Job' &&
            over.data.current?.column.id !== active.data.current?.parent
        ) {
            const newColumns = existingColumns.map(column => {
                if (column.id === over.id) {
                    const newJobs = column.jobs
                        .concat({
                            ...active.data.current?.job,
                        })
                        .map((job, idx) => {
                            return {
                                ...job,
                                columnId: column.id,
                                positionInColumn: idx,
                            };
                        });
                    console.log('Switch column?', newJobs, column.id);
                    newJobs.forEach(async job => {
                        patchJob.mutateAsync(job);
                    });
                    return {
                        ...column,
                        jobs: newJobs,
                    };
                }

                if (column.id === active.data.current?.parent) {
                    const newJobs = column.jobs
                        .filter(job => job.id !== active.data.current?.job.id)
                        .map((job, idx) => {
                            return {
                                ...job,
                                columnId: column.id,
                                positionInColumn: idx,
                            };
                        });
                    return {
                        ...column,
                        jobs: newJobs,
                    };
                }
                return column;
            });
            setColumns(newColumns);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveJob(null);
        const { active, over } = event;
        if (!over || over.id === active.id) return;
        const movedArray = arrayMove(
            existingColumns,
            existingColumns.findIndex(col => col.id === active.id),
            existingColumns.findIndex(col => col.id === over.id)
        ).map((col, idx) => ({ ...col, positionInBoard: idx }));

        setColumns(movedArray);
        movedArray.forEach(async col => {
            await patchColumn.mutateAsync(col);
        });
    }

    return (
        <div className="flex py-xl w-full overflow-x-scroll">
            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                sensors={sensor}
                onDragOver={onDragOver}
            >
                <div className="flex gap-4">
                    <div className="flex gap-2">
                        <SortableContext
                            items={existingColumns.map(col => col.id)}
                            // [col_1, col_2,...]
                        >
                            {existingColumns.map(col => (
                                <Column
                                    key={col.id}
                                    column={col}
                                    isNewColumn={col.isNewColumn ?? false}
                                >
                                    <SortableContext
                                        items={col.jobs.map(job => job.id)}
                                    >
                                        {col.jobs.map(job => {
                                            return (
                                                <JobCard
                                                    job={job}
                                                    key={job.id}
                                                    colColor={col.color}
                                                    parent={col.id}
                                                />
                                            );
                                        })}
                                    </SortableContext>
                                </Column>
                            ))}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => {
                            addColumn({
                                id: '',
                                title: '',
                                positionInBoard: existingColumns.length,
                                color: '#AAAAAA',
                                userId: userId?.toString(),
                                createdAt: new Date(),
                                jobs: [] as Job[],
                                isNewColumn: true,
                            } as ColumnWithJobs);
                        }}
                        className="ring-rose-500 text-colBorder rounded-lg flex h-[60px] min-w-[60px] cursor-pointer items-center justify-center border-2 border-colBG bg-[#0D1117] p-4 hover:ring-2"
                    >
                        <HiOutlinePlusCircle size={30} />
                    </button>
                </div>
                {activeJob &&
                    createPortal(
                        <DragOverlay>
                            <JobCard
                                job={activeJob}
                                colColor={activeJob.color}
                            />
                        </DragOverlay>,
                        document.body
                    )}

                {activeColumn &&
                    createPortal(
                        <DragOverlay>
                            <Column
                                key={activeColumn.id}
                                column={activeColumn}
                                isNewColumn={false}
                                // eslint-disable-next-line react/no-children-prop
                                children={[]}
                            />
                        </DragOverlay>,
                        

                        document.body
                    )}
            </DndContext>
            
        </div>
    );
}
