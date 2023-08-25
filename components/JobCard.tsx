import { HiDotsHorizontal } from 'react-icons/hi';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import { Job } from '@prisma/client';

type JobCardProps = {
    job: Job;
    setDndToggle: Dispatch<SetStateAction<boolean>>;
    colColor?: string;
    parent?: string;
};

export default function JobCard({
    job,
    colColor,
    parent,
    setDndToggle,
}: JobCardProps) {
    const [cardSize, setCardSize] = useState<boolean>(true);
    const [mouseHover, setMouseHover] = useState<boolean>(false);

    function cardSizeHandler(b: boolean) {
        setCardSize(b);
        setDndToggle(b);
    }

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
        disabled: !cardSize,
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
                onClick={() => cardSizeHandler(true)}
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
                <div className="flex flex-col px-xs py-xs h-full">
                    <p className="text-m font-600 leading-m truncate">
                        {job.title}
                    </p>
                    <p className="text-xs font-500">{job.companyName} </p>

                    <p className="text-xs pt-l font-500">
                        {job.location ?? 'Location'}
                    </p>
                    <p className="text-xs font-600 truncate">
                        {job.description ?? ' description.. '}
                    </p>
                    <a
                        href={job.url}
                        className="text-xxs border-b border-b-transparent hover:border-b-hoverColors-hoverMain w-fit font-500"
                    >
                        Link to job offer
                    </a>
                    <p className="self-end font-400 text-xxs">
                        {' '}
                        {job.deadline ?? 'unknown'}{' '}
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
            onClick={() => cardSizeHandler(false)}
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
                <p className="self-end font-[300] leading-s text-xxs">
                    {job.deadline ?? 'unknown'}
                </p>
            </div>
        </div>
    );
}
