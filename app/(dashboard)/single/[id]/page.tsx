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

    return <div>My Job: {singleJob?.title}</div>;
}
