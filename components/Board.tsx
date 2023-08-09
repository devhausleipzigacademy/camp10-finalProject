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
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { Column, Id, Job } from '../types/boardMocks';
import userColSet from '../app/(dashboard)/colDb.json';
import userJobsSettings from '../app/(dashboard)/user_jobs.json';
import StageColumn from './StageColumn';
import JobCard from './JobCard';

export default function Board() {
    const [cols, setCols] = useState<Column[]>(() => userColSet);
    const [jobs, setJobs] = useState<Job[]>(() => userJobsSettings);
    const currentCoslIds = useMemo(() => cols.map(col => col.id), [cols]);
    const [dragCol, setDragCol] = useState<Column | null>(null);
    const [dragJobCard, setDragJobCard] = useState<Job | null>(null);

    // distinguish clicks (drag/normal) on drag-event
    const sensor = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-auto px-[40px]">
            {typeof window === 'object' && (
                <DndContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    sensors={sensor}
                    onDragOver={onDragOver}
                >
                    <div className="flex gap-4 m-auto">
                        <div className="flex gap-2">
                            <SortableContext items={currentCoslIds}>
                                {cols.map(col => (
                                    <StageColumn
                                        key={col.id}
                                        column={col}
                                        deleteColumn={deleteCol}
                                        updateCol={updateCol}
                                        createJob={addJob}
                                        jobs={jobs.filter(
                                            job => job.colId === col.id
                                        )}
                                        editJob={editJob}
                                        updateJob={updateJob}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                        <button
                            onClick={() => createNewCol()}
                            className="ring-rose-500 text-colBorder rounded-lg flex h-[60px] min-w-[60px] cursor-pointer items-center justify-center border-2 border-colBG bg-[#0D1117] p-4 hover:ring-2"
                        >
                            <HiOutlinePlusCircle size={30} />
                        </button>
                    </div>
                    {createPortal(
                        <DragOverlay>
                            {dragCol && (
                                <StageColumn
                                    column={dragCol}
                                    deleteColumn={deleteCol}
                                    updateCol={updateCol}
                                    createJob={addJob}
                                    jobs={jobs.filter(
                                        job => job.colId === dragCol.id
                                    )}
                                    editJob={editJob}
                                    updateJob={updateJob}
                                />
                            )}
                            {dragJobCard && (
                                <JobCard
                                    job={dragJobCard}
                                    editJob={editJob}
                                    updateJob={updateJob}
                                />
                            )}
                        </DragOverlay>,

                        document.body // <-- container for createPortal(children,container)
                    )}
                </DndContext>
            )}
        </div>
    );

    function createNewCol() {
        const colToAdd: Column = {
            id: generateId(),
            title: `Title`,
            colour: '#4c9a2a',
        };

        setCols([...cols, colToAdd]);
    }

    function generateId() {
        return Math.floor(Math.random() * 10001);
    }

    function deleteCol(id: Id) {
        const filteredCol = cols.filter(col => col.id !== id);
        setCols(filteredCol);

        const filteredJobCard = jobs.filter(j => j.colId !== id);
        setJobs(filteredJobCard);
    }
    function updateCol(id: Id, title: string) {
        const updatedCols = cols.map(col => {
            if (col.id !== id) return col;
            return { ...col, title };
        });
        setCols(updatedCols);
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            setDragCol(event.active.data.current.column);
            return;
        }
        if (event.active.data.current?.type === 'Job') {
            setDragJobCard(event.active.data.current.job);
            return;
        }
    }
    function onDragEnd(event: DragEndEvent) {
        setDragCol(null);
        setDragJobCard(null);
        const { active, over } = event;
        if (!over) return;
        const activeColId = active.id;
        const overColId = over.id;
        if (activeColId === overColId) return;
        setCols(cols => {
            const activeColIndex = cols.findIndex(
                col => col.id === activeColId
            );
            const overColIndex = cols.findIndex(col => col.id === overColId);
            return arrayMove(cols, activeColIndex, overColIndex);
        });
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;

        const isActiveIdJob = active.data.current?.type === 'Job';
        const isOverJob = over.data.current?.type === 'Job';
        const isIdOverCol = over.data.current?.type === 'Column';

        if (!isActiveIdJob) return; // JobCarts only

        // Job in one Col
        if (isActiveIdJob && isOverJob) {
            setJobs(jobs => {
                const activeIdx = jobs.findIndex(j => j.id === activeId);
                const overIdx = jobs.findIndex(j => j.id === overId);

                // ColID-update
                jobs[activeIdx].colId = jobs[overIdx].colId;

                return arrayMove(jobs, activeIdx, overIdx);
            });
        }

        // JobCart to another Col
        if (isActiveIdJob && isIdOverCol) {
            setJobs(jobs => {
                const activeIdx = jobs.findIndex(j => j.id === activeId);

                jobs[activeIdx].colId = overId;

                return arrayMove(jobs, activeIdx, activeIdx);
            });
        }
    }

    function addJob(columnId: Id) {
        const newJob: Job = {
            id: generateId(),
            colId: columnId,
            job_title: ' New Job ',
        };
        setJobs([...jobs, newJob]);
    }

    function editJob(id: Id) {
        // delete
        const newJobs_del = jobs.filter(job => job.id !== id);
        setJobs(newJobs_del);
    }

    function updateJob(id: Id, content: string) {
        const updatedJobCard = jobs.map(job => {
            if (job.id !== id) return job;
            return { ...job, content };
        });
        setJobs(updatedJobCard);
    }
}
