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
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import JobCard from './JobCard';
import Column from './Column';
import { ColumnWithJobs } from '@/app/(dashboard)/page';
import { Job } from '@prisma/client';
import { useAuth } from '@clerk/nextjs';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

type BoardProps = {
    columnData: ColumnWithJobs[];
};

export default function Board({ columnData }: BoardProps) {
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

    // TODO: use react query to fetch data, if null, create templates and save to the database.
    const { userId } = useAuth();
    const queryClient = useQueryClient();
    const { data: columnsData }: { data: ColumnWithJobs[] } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get(`/api/column?userId=${userId}`).then(res => res.data),
        initialData: columnData,
    });

    const newColumnTemplate: ColumnWithJobs = {
        id: '',
        title: 'title',
        positionInBoard: columnData.length,
        color: '#4c9a2a',
        userId: userId as string,
        createdAt: new Date(),
        jobs: [] as Job[],
    };

    const [cols, setCols] = useState<ColumnWithJobs[]>(columnsData);
    const [newCols, setNewCols] = useState<ColumnWithJobs[]>([]);

    const createNewColumn = useMutation({
        mutationFn: async (userId: string) => {
            const newCol = await axios
                .post('/api/column', { ...newColumnTemplate } as Omit<
                    ColumnWithJobs,
                    'id' | 'createdAt' | 'jobs'
                >)
                .then(res => res.data);
            return newCol;
        },
        onSuccess: async res => {
            console.log('Fetched Cols:', columnsData);
            await queryClient.invalidateQueries(['columns']);
            console.log('Column added successfully');
        },
        onError: err => {
            console.log('errror');
        },
    });

    const deleteColumn = useMutation({
        mutationFn: async (columnId: string) =>
            await axios.delete(`/api/column/${columnId}`).then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            console.log('Column added successfully');
        },
        onError: err => {
            console.log('errror');
        },
    });

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            return setActiveColumn(event.active.data.current.column);
        }

        if (event.active.data.current?.type === 'Job') {
            const findParent = cols.find(
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
            if (over.data.current?.parent === active.data.current?.parent) {
                const parentIndex = cols.findIndex(
                    col => col.id === over.data.current?.parent
                );
                const parentColumn = cols[parentIndex];
                const movedArray = arrayMove(
                    parentColumn.jobs,
                    parentColumn.jobs.findIndex(
                        job => job.id === active.data.current?.job.id
                    ),
                    parentColumn.jobs.findIndex(
                        job => job.id === over.data.current?.job.id
                    )
                );
                setCols([
                    ...cols.slice(0, parentIndex),
                    { ...parentColumn, jobs: movedArray },
                    ...cols.slice(parentIndex + 1),
                ]);
                return;
            }

            const newColumns = cols.map(column => {
                if (column.id === over.data.current?.parent) {
                    const currentJob = active.data.current?.job;
                    const findArrayPosition = column.jobs.findIndex(
                        col => col.id === over.data.current?.job.id
                    );
                    return {
                        ...column,
                        jobs: [
                            ...column.jobs.slice(0, findArrayPosition),
                            currentJob,
                            ...column.jobs.slice(findArrayPosition),
                        ],
                    };
                }

                if (column.id === active.data.current?.parent) {
                    return {
                        ...column,
                        jobs: column.jobs.filter(
                            job => job.id !== active.data.current?.job.id
                        ),
                    };
                }
                return column;
            });
            setCols(newColumns);
        }

        if (
            over.data.current?.type === 'Column' &&
            active.data.current?.type === 'Job' &&
            over.data.current?.column.id !== active.data.current?.parent
        ) {
            const newColumns = cols.map(column => {
                if (column.id === over.id) {
                    return {
                        ...column,
                        jobs: column.jobs.concat(active.data.current?.job),
                    };
                }

                if (column.id === active.data.current?.parent) {
                    return {
                        ...column,
                        jobs: column.jobs.filter(
                            job => job.id !== active.data.current?.job.id
                        ),
                    };
                }
                return column;
            });
            setCols(newColumns);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveJob(null);
        const { active, over } = event;
        if (!over || over.id === active.id) return;
        const movedArray = arrayMove(
            cols,
            cols.findIndex(col => col.id === active.id),
            cols.findIndex(col => col.id === over.id)
        );
        setCols(movedArray);
    }

    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-auto px-[40px]">
            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                sensors={sensor}
                onDragOver={onDragOver}
            >
                <div className="flex gap-4 m-auto">
                    <div className="flex gap-2">
                        <SortableContext
                            items={cols.map(col => col.id)}
                            // [col_1, col_2,...]
                        >
                            {cols.map(col => (
                                <Column
                                    key={col.id}
                                    column={col}
                                    isNewColumn={false}
                                    deleteColumn={() => {
                                        deleteColumn.mutateAsync(col.id);
                                    }}
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
                            {newCols &&
                                newCols.map((col, idx) => {
                                    return (
                                        <Column
                                            key={idx}
                                            column={col}
                                            isNewColumn={true}
                                            deleteColumn={() => null}
                                        >
                                            <SortableContext
                                                items={col.jobs.map(
                                                    job => job.id
                                                )}
                                            >
                                                {col.jobs.map(job => {
                                                    return (
                                                        <JobCard
                                                            job={job}
                                                            key={job.id}
                                                            colColor={
                                                                col.color
                                                            }
                                                            parent={col.id}
                                                        />
                                                    );
                                                })}
                                            </SortableContext>
                                        </Column>
                                    );
                                })}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => {
                            setNewCols([
                                ...newCols,
                                {
                                    ...newColumnTemplate,
                                    id: '',
                                    userId: userId?.toString(),
                                    createdAt: new Date(),
                                    jobs: [] as Job[],
                                } as ColumnWithJobs,
                            ]);
                            // createNewColumn.mutateAsync(userId as string)
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
                                deleteColumn={() => null}
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
