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
import DropDownFrame, {
    DropDownItems,
    DropDownList,
    DropDownTrigger,
} from '@/components/shared/DropDownCompositional';

type JobCardProps = {
    job: Job;
    colColor?: string;
    parent?: string;
};

export default function JobCard({ job, colColor, parent }: JobCardProps) {
    const [cardSize, setCardSize] = useState<boolean>(true);

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
            toast.success('Job deleted successfully');
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
                className="relative text-left rounded-tr-none cursor-pointer text-textColors-textBody rounded-xl"
                style={style}
            >
                <DropDownFrame>
                    <DropDownTrigger
                        style={{ backgroundColor: colColor }}
                        className="cursor-pointer flex justify-center w-[4.5rem] h-s rounded-xl rounded-bl-none absolute top-[-6px] right-[0px]"
                    >
                        <HiDotsHorizontal
                            size={15}
                            className="hover:opacity-100 opacity-80"
                        />
                    </DropDownTrigger>

                    <DropDownList className="w-[7rem] border text-basicColors-light rounded-lg text-s text-left p-xs top-s ui-background-dark ">
                        <DropDownItems>
                            <Link
                                href={`/single/${job.id}`}
                                className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light"
                            >
                                View
                            </Link>
                        </DropDownItems>
                        <DropDownItems>
                            <Link
                                href={`/edit-job/${job.id}`}
                                className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light"
                            >
                                Edit
                            </Link>
                        </DropDownItems>
                        <DropDownItems>
                            <div
                                onClick={() => deleteJob.mutate(job.id)}
                                className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light"
                            >
                                Delete
                            </div>
                        </DropDownItems>
                    </DropDownList>
                </DropDownFrame>
                <div className="flex flex-col h-full px-xs py-xs font-500">
                    <p className="truncate text-m font-600 leading-l">
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
                        {job.deadline?.toString().split('T')[0] ??
                            'no deadline'}
                    </p>
                    <BsChevronExpand
                        className="self-center w-full cursor-pointer"
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
            style={style}
            className={cn(
                'text-left text-textColors-textBody cursor-grab rounded-xl rounded-tr-none relative',
                isDragging && 'opacity-25'
            )}
        >
            <DropDownFrame>
                <DropDownTrigger
                    className="cursor-pointer flex justify-center w-[4.5rem] h-s rounded-xl rounded-bl-none text-mainBG absolute top-[-6px] right-[0px] "
                    style={{ backgroundColor: colColor }}
                >
                    <HiDotsHorizontal
                        size={15}
                        className=" hover:opacity-100 opacity-80"
                    />
                </DropDownTrigger>

                <DropDownList className="w-[7rem] border text-basicColors-light rounded-lg text-s text-left p-xs top-s ui-background-dark">
                    <DropDownItems>
                        <Link
                            href={`/single/${job.id}`}
                            className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light "
                        >
                            View
                        </Link>
                    </DropDownItems>
                    <DropDownItems>
                        <Link
                            href={`/edit-job/${job.id}`}
                            className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light "
                        >
                            Edit
                        </Link>
                    </DropDownItems>
                    <DropDownItems>
                        <div
                            onClick={() => deleteJob.mutate(job.id)}
                            className="inline-block w-full rounded-sm cursor-pointer hover:bg-hoverColors-hover text-basicColors-light "
                        >
                            Delete
                        </div>
                    </DropDownItems>
                </DropDownList>
            </DropDownFrame>

            <div className="flex flex-col w-full h-full px-xs py-xs">
                <p className="truncate text-m font-600 leading-l">
                    {job.title}
                </p>
                <p className="text-xs font-500">{job.companyName} </p>
                <p className="self-end font-[300] leading-s text-xxs">
                    {job.deadline?.toString().split('T')[0] ?? 'no deadline'}
                </p>
                <BsChevronExpand
                    className="self-center w-full cursor-pointer"
                    onClick={() => setCardSize(false)}
                />
            </div>
        </div>
    );
}
