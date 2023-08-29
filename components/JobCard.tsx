import { HiDotsHorizontal } from 'react-icons/hi';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/utils/cn';
import { Job } from '@prisma/client';
import { BsChevronExpand } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

type JobCardProps = {
    job: Job;
    colColor?: string;
    parent?: string;
};

export default function JobCard({ job, colColor, parent }: JobCardProps) {
    const [cardSize, setCardSize] = useState<boolean>(true);
    const [mouseHover, setMouseHover] = useState<boolean>(false);
    const [dropDownMenu, setdropDownMenu] = useState<boolean>(false);

    const queryClient = useQueryClient();

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

    const deleteJob = useMutation({
        mutationFn: (jobId: string) =>
            axios.delete(`/api/job/${jobId}`).then(res => res.data),
        onSuccess: async res => {
            await queryClient.invalidateQueries(['columns']);
            toast.success('Job deleted successfully', {
                toastId: 'succes2',
            });
        },
        onError: err => {
            console.log(err);
            toast.error('Something went wrong, try again!');
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
                    onClick={() => setdropDownMenu(!dropDownMenu)}
                >
                    <HiDotsHorizontal
                        size={15}
                        className=" hover:opacity-100 opacity-80"
                    />
                    {dropDownMenu && (
                        <div className="w-[7rem] border text-basicColors-light rounded-lg text-s text-left p-xs absolute top-m ui-background-dark right-[0] z-10">
                            <ul className="w-full">
                                <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                    <Link href={`/`}>view</Link>
                                </li>
                                <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                    <Link href={`/`}>edit</Link>
                                </li>
                                <li
                                    className="hover:bg-hoverColors-hover rounded-sm p-xxs"
                                    onClick={() => deleteJob.mutate(job.id)}
                                >
                                    delete
                                </li>
                            </ul>
                        </div>
                    )}
                </button>
                <div className="flex flex-col px-xs py-xs h-full font-500">
                    <p className="text-m font-600 leading-m truncate">
                        {job.title}
                    </p>
                    <p className="text-xs">{job.companyName} </p>

                    <p className="text-xs pt-l">{job.location ?? 'Location'}</p>
                    <p className="text-xs truncate">
                        {/* {job.description ?? ' description.. '} */}
                    </p>
                    {/* <p className="text-xs font-600 truncate">
                        {job.description ?? 'no description'}
                    </p> */}
                    <a
                        href={job.url}
                        className="text-xs border-b border-b-transparent hover:border-b-hoverColors-hoverMain w-fit"
                    >
                        Link to job offer
                    </a>
                    <p className="self-end font-400 text-xxs">
                        {job.deadline?.toString().split('T')[0] ?? 'unknown'}
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
                onClick={() => setdropDownMenu(!dropDownMenu)}
            >
                <HiDotsHorizontal
                    size={15}
                    className=" hover:opacity-100 opacity-80"
                />
                {dropDownMenu && (
                    <div className="w-[7rem] border text-basicColors-light rounded-lg text-s text-left p-xs absolute top-m ui-background-dark right-[0] z-10">
                        <ul className="w-full">
                            <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                <Link href={`/`}> view </Link>
                            </li>
                            <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                <Link href={`/`}> edit </Link>
                            </li>
                            <li
                                className="hover:bg-hoverColors-hover rounded-sm p-xxs"
                                onClick={() => deleteJob.mutate(job.id)}
                            >
                                delete
                            </li>
                        </ul>
                    </div>
                )}
            </button>
            <div className="flex flex-col px-xs py-xs w-full h-full">
                <p className="text-m font-600 leading-m truncate">
                    {job.title}
                </p>
                <p className="text-xs font-500">{job.companyName} </p>
                <p className="self-end font-[300] leading-s text-xxs">
                    {job.deadline?.toString().split('T')[0] ?? 'unknown'}
                </p>
                <BsChevronExpand
                    className="cursor-pointer self-center w-full"
                    onClick={() => setCardSize(false)}
                />
            </div>
        </div>
    );
}
