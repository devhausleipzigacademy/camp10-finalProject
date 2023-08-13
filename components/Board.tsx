'use client';
import { v4 as uuid } from 'uuid';
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

export type Column = {
    id: string;
    title: string;
    colour: string;
    jobs: Job[];
};
export type Job = {
    id: string;
    colId: string;
    job_title: string;
    company: string;
    deadline: string;
    location: string;
    city: string;
    url: string;
};

const DUMMY_JOBCARD_DATA_FROM_DB: Job[] = [
    {
        id: 'J1',
        colId: 'c3',
        job_title: 'Human Resources Manager',
        company: 'Kwideo',
        deadline: '01-Jul-2023',
        location: 'France',
        city: 'Moulins',
        url: 'https://dedecms.com/vestibulum/proin.json?lectus=at&suspendisse=velit&potenti=eu&in=est&eleifend=congue&quam=elementum&a=in&odio=hac&in=habitasse&hac=platea&habitasse=dictumst&platea=morbi&dictumst=vestibulum&maecenas=velit&ut=id&massa=pretium&quis=iaculis&augue=diam&luctus=erat&tincidunt=fermentum&nulla=justo&mollis=nec&molestie=condimentum&lorem=neque&quisque=sapien&ut=placerat&erat=ante&curabitur=nulla&gravida=justo&nisi=aliquam&at=quis&nibh=turpis&in=eget&hac=elit&habitasse=sodales&platea=scelerisque&dictumst=mauris&aliquam=sit&augue=amet&quam=eros&sollicitudin=suspendisse&vitae=accumsan&consectetuer=tortor&eget=quis&rutrum=turpis&at=sed&lorem=ante&integer=vivamus&tincidunt=tortor&ante=duis&vel=mattis&ipsum=egestas&praesent=metus&blandit=aenean&lacinia=fermentum&erat=donec&vestibulum=ut&sed=mauris&magna=eget&at=massa&nunc=tempor&commodo=convallis&placerat=nulla&praesent=neque&blandit=libero&nam=convallis&nulla=eget&integer=eleifend&pede=luctus&justo=ultricies&lacinia=eu&eget=nibh&tincidunt=quisque&eget=id&tempus=justo&vel=sit&pede=amet&morbi=sapien&porttitor=dignissim&lorem=vestibulum&id=vestibulum&ligula=ante&suspendisse=ipsum&ornare=primis&consequat=in&lectus=faucibus&in=orci',
    },
    {
        id: 'J2',
        colId: 'c3',
        job_title: 'Account Coordinator',
        company: 'Bluezoom',
        deadline: '21-Jan-2023',
        location: 'China',
        city: 'Chengbei',
        url: 'http://lulu.com/tempus/semper/est/quam/pharetra/magna.aspx?sed=nulla&ante=eget&vivamus=eros&tortor=elementum&duis=pellentesque&mattis=quisque&egestas=porta&metus=volutpat&aenean=erat&fermentum=quisque&donec=erat&ut=eros&mauris=viverra&eget=eget&massa=congue&tempor=eget&convallis=semper&nulla=rutrum&neque=nulla&libero=nunc&convallis=purus&eget=phasellus&eleifend=in&luctus=felis&ultricies=donec&eu=semper&nibh=sapien&quisque=a&id=libero&justo=nam&sit=dui&amet=proin&sapien=leo&dignissim=odio&vestibulum=porttitor&vestibulum=id&ante=consequat&ipsum=in&primis=consequat&in=ut&faucibus=nulla&orci=sed&luctus=accumsan&et=felis&ultrices=ut&posuere=at&cubilia=dolor&curae=quis&nulla=odio&dapibus=consequat&dolor=varius&vel=integer&est=ac&donec=leo&odio=pellentesque&justo=ultrices&sollicitudin=mattis&ut=odio&suscipit=donec&a=vitae&feugiat=nisi&et=nam&eros=ultrices&vestibulum=libero&ac=non&est=mattis&lacinia=pulvinar&nisi=nulla&venenatis=pede&tristique=ullamcorper&fusce=augue',
    },
];

const DUMMY_COLUMN_DATA_FROM_DB: Column[] = [
    { id: 'c1', title: 'Scouted', colour: '#B4A0D1', jobs: [] },
    { id: 'c2', title: 'Applied', colour: '#CBD87E', jobs: [] },
    {
        id: 'c3',
        title: 'Interview',
        colour: '#FDC959',
        jobs: DUMMY_JOBCARD_DATA_FROM_DB,
    },
    { id: 'c4', title: 'Offer', colour: '#FE5A35', jobs: [] },
];

export default function Board() {
    const [cols, setCols] = useState<Column[]>(DUMMY_COLUMN_DATA_FROM_DB);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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

    function createNewCol() {
        const colToAdd: Column = {
            id: uuid(),
            title: `Title`,
            colour: '#4c9a2a',
            jobs: [],
        };
        setCols([...cols, colToAdd]);
    }

    function deleteCol(id: string) {
        const filteredCol = cols.filter(col => col.id !== id);
        setCols(filteredCol);
    }

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
                color: findParent?.colour,
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
                                    deleteColumn={deleteCol}
                                >
                                    <SortableContext
                                        items={col.jobs.map(job => job.id)}
                                    >
                                        {col.jobs.map(job => {
                                            return (
                                                <JobCard
                                                    job={job}
                                                    key={job.id}
                                                    colColor={col.colour}
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
                        onClick={() => createNewCol()}
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
