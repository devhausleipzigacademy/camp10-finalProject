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
    const [cardSize, setCardSize] = useState<boolean>(true);
    const [mouseHover, setMouseHover] = useState<boolean>(false);

    const toggleCardSize = () => {
        setCardSize(size => !size);
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

    if (cardSize) {
        return (
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                onClick={() => toggleCardSize()}
                onMouseOver={() => setMouseHover(true)}
                onMouseLeave={() => setMouseHover(false)}
                className="text-left text-textColors-textBody cursor-grab rounded-xl rounded-tr-none relative"
                style={style}
            >
                <button
                    style={{ backgroundColor: colColor }}
                    className="absolute right-[0px] flex justify-center w-[4.5rem] h-s rounded-xl rounded-bl-none top-[-6px] hover:text-hoverColors-hoverMain text-mainBG "
                >
                    {mouseHover && (
                        <HiDotsHorizontal
                            size={13}
                            className="hover:opacity-100 opacity-80"
                        />
                    )}
                </button>
                <div className="flex flex-col px-xs py-xxs gap-xs w-full h-full">
                    <p className="text-m font-600 flex-1 leading-l truncate">
                        {job.title}
                    </p>
                    <p className="text-xs leading-xxs flex-1 font-500">
                        {job.companyName}{' '}
                    </p>
                    <p className="text-xs leading-xxs pt-m font-500">
                        Location {job.location}
                    </p>
                    <a
                        href={job.url}
                        className="text-xxs leading-xxs border-b border-b-transparent hover:border-b-hoverColors-hoverMain w-fit font-500"
                    >
                        Link to job offer
                    </a>
                    <p className="self-end font-[300] leading-s text-xxs">
                        32.13.22
                    </p>
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
            onClick={() => toggleCardSize()}
            style={style}
            className={cn(
                'h-[5.25rem] text-left text-textColors-textBody cursor-grab rounded-xl rounded-tr-none relative',
                isDragging && 'opacity-25'
            )}
        >
            <button
                style={{ backgroundColor: colColor }}
                className="absolute right-[0px] flex justify-center w-[4.5rem] h-s rounded-xl rounded-bl-none top-[-6px] text-mainBG"
            >
                {mouseHover && (
                    <HiDotsHorizontal
                        size={13}
                        className=" hover:opacity-100 opacity-80"
                    />
                )}
            </button>
            <div className="flex flex-col px-xs py-xxs w-full h-full">
                <p className="text-m font-600 flex-1 leading-l truncate">
                    {job.title}
                </p>
                <p className="text-xs leading-xxs flex-1 font-500">
                    {job.companyName}{' '}
                </p>
                <p className="self-end font-[300] leading-s text-xxs">
                    32.13.22
                </p>
            </div>
        </div>
    );
}
