import { HiDotsHorizontal } from 'react-icons/hi';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import { Job } from '@prisma/client';
import { BsChevronExpand } from 'react-icons/bs';

type JobCardProps = {
    job: Job;
    colColor?: string;
    parent?: string;
};

export default function JobCard({ job, colColor, parent }: JobCardProps) {
    const [cardSize, setCardSize] = useState<boolean>(true);
    const [mouseHover, setMouseHover] = useState<boolean>(false);

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
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        backgroundColor: colColor,
    };

    if (!cardSize) {
        return (
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                onMouseOver={() => setMouseHover(true)}
                onMouseLeave={() => setMouseHover(false)}
                className="text-left text-textColors-textBody cursor-pointer rounded-xl rounded-tr-none relative"
                style={style}
            >
                <button
                    style={{ backgroundColor: colColor }}
                    className="absolute right-[0px] flex justify-center w-[4.5rem] h-s rounded-xl rounded-bl-none top-[-6px] "
                >
                    {mouseHover && (
                        <HiDotsHorizontal
                            size={15}
                            className="hover:opacity-100 opacity-80"
                        />
                    )}
                </button>
                <div className="flex flex-col px-xs py-xs h-full font-500">
                    <p className="text-m font-600 leading-m truncate">
                        {job.title}
                    </p>
                    <p className="text-xs">{job.companyName} </p>

                    <p className="text-xs pt-l">{job.location ?? 'Location'}</p>
                    <p className="text-xs truncate">
                        {job.description ?? ' description.. '}
                    </p>
                    <a
                        href={job.url}
                        className="text-xs border-b border-b-transparent hover:border-b-hoverColors-hoverMain w-fit"
                    >
                        Link to job offer
                    </a>
                    <p className="self-end font-400 text-xxs">
                        {job.deadline ?? 'unknown'}
                    </p>
                    <BsChevronExpand
                        className="cursor-pointer self-center w-full"
                        onClick={() => setCardSize(true)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onMouseOver={() => setMouseHover(true)}
            onMouseLeave={() => setMouseHover(false)}
            style={style}
            className={cn(
                'text-left text-textColors-textBody cursor-grab rounded-xl rounded-tr-none relative',
                isDragging && 'opacity-25'
            )}
        >
            <button
                style={{ backgroundColor: colColor }}
                className="absolute right-[0px] flex justify-center w-[4.5rem] h-s rounded-xl rounded-bl-none top-[-6px] text-mainBG"
            >
                {mouseHover && (
                    <HiDotsHorizontal
                        size={15}
                        className=" hover:opacity-100 opacity-80"
                    />
                )}
            </button>
            <div className="flex flex-col px-xs py-xs w-full h-full">
                <p className="text-m font-600 leading-m truncate">
                    {job.title}
                </p>
                <p className="text-xs font-500">{job.companyName} </p>
                <p className="self-end text-xxs">{job.deadline ?? 'unknown'}</p>
                <BsChevronExpand
                    className="cursor-pointer self-center w-full"
                    onClick={() => setCardSize(false)}
                />
            </div>
        </div>
    );
}
