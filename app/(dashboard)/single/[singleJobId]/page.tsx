import prisma from '@/utils/prismaClient';
import { getJobs } from '../../getJobs';
import { cn } from '@/lib/utils';
import DashboardHeader from '@/components/shared/DashboardHeader';
import { SetStateAction } from 'react';
import Button from '@/components/shared/Button';
import { auth } from '@clerk/nextjs';

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
        return <h1>No jobs found</h1>;
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
                            {singleJob?.title}
                        </div>
                        <div className="text-xs gap-xxs">
                            <h4 className="text-l">Description</h4>
                            <p>{singleJob?.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around w-1/2 gap-s text-s">
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
                        <div className="flex items-end justify-end flex-1 gap-l">
                            <Button variant="primary">Go back</Button>
                            <Button variant="primary">Edit</Button>
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
