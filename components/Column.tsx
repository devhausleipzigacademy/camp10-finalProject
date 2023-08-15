import { FcLikePlaceholder } from 'react-icons/fc';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useSortable } from '@dnd-kit/sortable';
import { Column } from './Board';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import React from 'react';
import { ColumnWithJobs } from '@/app/(dashboard)/page';

type ColumnProps = {
    column: ColumnWithJobs;
    deleteColumn: (id: string) => void;
    children: React.ReactNode;
};

export default function Column({
    column,
    deleteColumn,
    children,
}: ColumnProps) {
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
        // disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                'bg-[#0D1117] border px-4 py-2 gap-3 w-[320px] h-[5500px] max-h-[560px] rounded-md flex flex-col',
                isDragging && 'opacity-50 border-2 border-red-700'
            )}
        >
            <div
                style={{ borderColor: column.color }}
                // onClick={() => setEditMode(true)}
                className="py-6 h-[50px] cursor-grab border-b-8 flex justify-between items-center"
            >
                <div className="">
                    <FcLikePlaceholder />
                </div>
                <div className="text-3xl font-medium text-[#F2F2F2]">
                    <h1> {column.title} </h1>
                    {/* {!editMode && column.title} */}
                    {/* {editMode && (
                        <input
                            className="px-2 bg-black border rounded outline-none focus:border-rose-500"
                            value={column.title}
                            onChange={(e) =>
                                updateCol(column.id, e.target.value)
                            }
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }}
                        />
                    )} */}
                </div>
                <button
                    onClick={() => deleteColumn(column.id)}
                    className="px-1 py-2 rounded text-colBorder stroke-gray-300 hover:stroke-white hover:bg-colBG"
                >
                    <HiDotsHorizontal size={20} />
                </button>
            </div>

            <div className="flex flex-col flex-grow gap-6 p-3 overflow-x-hidden overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
