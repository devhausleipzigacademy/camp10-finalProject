import { HiDotsHorizontal } from 'react-icons/hi';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
// import { Job } from './Board';
import { Job } from '@prisma/client';

type JobCardProps = {
    job: Job;
    editJob?: (id: string) => void;
    updateJob?: (id: string, content: string) => void;
    colColor?: string;
    parent?: string;
};

export default function JobCard({
    job,
    editJob,
    updateJob,
    colColor,
    parent,
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
            parent,
        },
        disabled: cardSize,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        backgroundColor: colColor,
    };

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
            // onClick={() => toggleCardSize()}
            style={style}
            className={cn(
                'py-3 px-2 h-[110px] items-center flex text-left cursor-grab rounded-md rounded-tr-none relative',
                isDragging && 'opacity-25'
            )}
        >
            <button
                style={{ backgroundColor: colColor }}
                className="absolute right-0 flex justify-center w-16 h-6 rounded-lg rounded-bl-none top-[-7px] text-mainBG"
                // onClick={() => editJob(job.id)}
            >
                {/* {mouseHover && ( */}
                <HiDotsHorizontal
                    size={15}
                    className=" hover:opacity-100 opacity-80"
                />
                {/* )} */}
            </button>
            <div className="flex flex-col w-full h-full text-white">
                <p className="text-xl font-semibold truncate">
                    {job.title}
                </p>
                <p className="text-sm font-medium"> {job.companyName} </p>
                <p className="self-end pt-4 pr-2 text-xs">{job.deadline?.toISOString()}</p>
            </div>
        </div>
    );
}
