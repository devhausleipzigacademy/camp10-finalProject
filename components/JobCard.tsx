import { HiDotsHorizontal, HiOutlineTrash } from 'react-icons/hi';
import { Id, Job } from '../types/boardMocks';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type JobCardProps = {
    job: Job;
    editJob: (id: Id) => void;
    updateJob: (id: Id, content: string) => void;
    colColor?: string;
};

export default function JobCard({
    job,
    editJob,
    updateJob,
    colColor,
}: JobCardProps) {
    const [mouseHover, setMouseHover] = useState<boolean>(false);
    const [cardSize, setCardSize] = useState<boolean>(false);
    // console.log(colColor);

    const toggleCardSize = () => {
        setCardSize(size => !size);
        setMouseHover(false);
    };
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: job.id,
        data: {
            type: 'Job',
            job,
        },
        disabled: cardSize,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        backgroundColor: colColor,
    };

    if (isDragging) {
        // console.log("DRAGGING:", colColor);
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-60 p-2.5 h-[110px] min-h-[110px] items-center flex text-left rounded-md rounded-tr-none cursor-grab relative "
            >
                <button
                    style={{ backgroundColor: colColor }}
                    className="absolute right-0 flex justify-center w-16 h-6 -translate-y-1/2 rounded-lg rounded-bl-none top-[5px] "
                />
            </div>
        );
    }

    // if (cardSize) {
    //     return (
    //         <div
    //             ref={setNodeRef}
    //             {...attributes}
    //             {...listeners}
    //             onClick={() => toggleCardSize()}
    //             className="p-2.5 cursor-grab relative rounded-md rounded-tr-none"
    //             style={style}
    //         >
    //             <button
    //                 style={{ backgroundColor: colColor }}
    //                 className="absolute right-0 flex justify-center w-16 h-6 rounded-lg rounded-bl-none top-[-7px] text-mainBG "
    //                 // onClick={() => editJob(job.id)}
    //             >
    //                 <HiDotsHorizontal
    //                     size={15}
    //                     className="hover:opacity-100 opacity-80"
    //                 />
    //             </button>
    //             <div className="flex flex-col">
    //                 <div>
    //                     <p className="text-xl font-semibold">{job.job_title}</p>
    //                     <p className="font-medium text-md"> {job.company} </p>
    //                 </div>
    //                 <div className="pt-6">
    //                     <p className="font-medium text-md">{job.city}</p>
    //                     <p className="font-medium text-md"> {job.location} </p>
    //                 </div>

    //                 <p className="self-end pr-2 text-xs place-self-end">
    //                     {job.deadline}
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={() => toggleCardSize()}
            style={style}
            onMouseEnter={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
            className="py-3 px-2 h-[110px] items-center flex text-left cursor-grab rounded-md rounded-tr-none relative"
        >
            <button
                style={{ backgroundColor: colColor }}
                className="absolute right-0 flex justify-center w-16 h-6 rounded-lg rounded-bl-none top-[-7px] text-mainBG"
                // onClick={() => editJob(job.id)}
            >
                {mouseHover && (
                    <HiDotsHorizontal
                        size={15}
                        className=" hover:opacity-100 opacity-80"
                    />
                )}
            </button>
            <div className="flex flex-col w-full h-full ">
                <p className="text-xl font-semibold truncate">
                    {job.job_title}
                </p>
                <p className="text-sm font-medium"> {job.company} </p>
                <p className="self-end pt-4 pr-2 text-xs">{job.deadline}</p>
            </div>
        </div>
    );
}
