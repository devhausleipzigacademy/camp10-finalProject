import prisma from '@/utils/prismaClient';

async function getData(jobId: string) {
    const singleJob = await prisma.job.findFirst({
        where: {
            id: jobId,
        },
    });
    return singleJob;
}

export default async function SingleJob({
    params,
}: {
    params: { id: string };
}) {
    const singleJob = await getData(params.id);

    return (
        <div className="flex gap-xxl">
            <div className="flex flex-col w-1/2 gap-s text-s">
                <div>My Job: {singleJob?.title}</div>
            </div>
        </div>
    );
}
