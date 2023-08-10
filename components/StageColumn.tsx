import { HiDotsHorizontal } from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';
import { FcLikePlaceholder } from 'react-icons/fc';
import { Column, Id, Job } from '../types/boardMocks';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import JobCard from './JobCard';

type ColWrapperProps = {
    column: Column;
    jobs: Job[];
    deleteColumn: (id: Id) => void;
    updateCol: (id: Id, title: string) => void;
    createJob: (columnId: Id) => void;
    editJob: (id: Id) => void;
    updateJob: (id: Id, content: string) => void;
};

function StageColumn(props: ColWrapperProps) {
    const {
        column,
        deleteColumn,
        updateCol,
        createJob,
        jobs,
        editJob,
        updateJob,
    } = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const currentJobsIds = useMemo(() => {
        return jobs.map(job => job.id);
    }, [jobs]);

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
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-40 border-2 border-rose-500 p-2 w-[350px] h-[500px] max-h-[500px] rounded-lg"
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-[#0D1117] border px-4 py-2 gap-3 w-[320px] h-[5500px] max-h-[560px] rounded-md flex flex-col"
        >
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                style={{ borderColor: column.colour }}
                className="py-6 h-[50px] cursor-grab border-b-8 flex justify-between items-center"
            >
                <div className="">
                    <FcLikePlaceholder />
                </div>
                <div className="text-3xl font-medium text-[#F2F2F2]">
                    {!editMode && column.title}
                    {editMode && (
                        <input
                            className="px-2 bg-black border rounded outline-none focus:border-rose-500"
                            value={column.title}
                            onChange={e => updateCol(column.id, e.target.value)}
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            onKeyDown={e => {
                                if (e.key !== 'Enter') return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => deleteColumn(column.id)}
                    className="px-1 py-2 rounded text-colBorder stroke-gray-300 hover:stroke-white hover:bg-colBG"
                >
                    <HiDotsHorizontal size={20} />
                </button>
            </div>
            {/* ### Add Jobs-Button for testing purposes ### */}
            <button
                className=" flex items-center justify-center p-4 border-[1px] rounded-md hover:border-rose-500 hover:text-rose-500 active:bg-black"
                onClick={() => {
                    createJob(column.id);
                }}
            >
                <FaPlus className="max-h-max text-[#F2F2F2]" />
            </button>

            <div className="flex flex-col flex-grow gap-6 p-3 overflow-x-hidden overflow-y-auto">
                <SortableContext items={currentJobsIds}>
                    {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            editJob={editJob}
                            updateJob={updateJob}
                            colColor={column.colour}
                        />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

export default StageColumn;
