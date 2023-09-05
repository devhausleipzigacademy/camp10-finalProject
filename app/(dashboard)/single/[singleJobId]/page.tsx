import prisma from '@/utils/prismaClient';
import Button from '@/components/shared/Button';
import { auth } from '@clerk/nextjs';
import { HiArrowCircleRight, HiArrowCircleLeft } from 'react-icons/hi';
import Link from 'next/link';

async function getData(jobId: string) {
    const { userId } = auth();

    if (!userId) throw new Error('Unauthorized');

    const singleJob = await prisma.job.findFirst({
        where: {
            id: jobId,
            userId: userId,
        },
        include: {
            column: {
                select: {
                    color: true,
                    title: true,
                },
            },
            tag: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
    return singleJob;
}

export default async function SingleJob({
    params,
}: {
    params: { singleJobId: string };
}) {
    const singleJob = await getData(params.singleJobId);
    console.log(singleJob);
    if (!singleJob) {
        return (
            <div className="flex flex-col items-center text-xl border gap-xl px-xxxl py-xl ui-background font-600 text-basicColors-light">
                <h1>Sorry, no jobs found!</h1>
                <div className="font-400 text-s">
                    <Button variant="primary">Go back</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col border gap-xl px-xxxl py-xl ui-background">
                <div className="flex gap-xxl">
                    <div className="flex flex-col w-1/2 gap-[50px] text-s">
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Job Title</h4>
                            {singleJob?.title}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Job URL</h4>
                            {singleJob?.url}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Company</h4>
                            {singleJob?.companyName}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Location</h4>
                            {singleJob?.location}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Deadline</h4>
                            {singleJob?.deadline?.toLocaleDateString('de-DE', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Description</h4>
                            <p>{singleJob?.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around w-1/2 gap-xxl text-s">
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Company Website</h4>
                            {singleJob?.companyWebsite}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Type</h4>
                            {singleJob?.remoteType}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Current Stage</h4>
                            {singleJob?.column.title}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Priority</h4>
                            {singleJob?.priority}
                        </div>
                        {singleJob.tag.length !== 0 && (
                            <div className="flex flex-wrap items-center rounded-[0.3125rem] border border-borderColors-borderLight px-s py-s gap-s">
                                <HiArrowCircleLeft size={24} />
                                {singleJob?.tag.map(tag => {
                                    return (
                                        <span
                                            className="flex items-center bg-opacity-0 border rounded-full text-xxs h-m px-s py-xxs my-xs gap-xxs"
                                            key={tag.id}
                                        >
                                            {tag.name}
                                        </span>
                                    );
                                })}{' '}
                                <HiArrowCircleRight size={24} />
                            </div>
                        )}
                        <div className="flex items-end justify-end flex-1 mt-xxxl gap-l">
                            <Link href="/">
                                <Button variant="primary">Go back</Button>
                            </Link>
                            <Link href={`/edit-job/${params.singleJobId}`}>
                                <Button variant="primary">Edit</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="w-full h-xl"
                style={{ background: singleJob?.column.color }}
            ></div>
        </>
    );
}
