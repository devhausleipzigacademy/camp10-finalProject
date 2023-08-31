import prisma from '@/utils/prismaClient';
import EditForm from './EditForm';
import { auth } from '@clerk/nextjs';
import { error } from 'console';

type Props = {
    params: {
        id: string;
    };
};

async function getData(jobId: string) {
    const { userId } = auth();

    if (!userId) throw new Error('Unauthorized');

    const singleJob = await prisma.job.findUnique({
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

export default async function EditPage({ params }: Props) {
    const jobId = params.id;
    const singleJobEdit = await getData(jobId);
    console.log(singleJobEdit);
    if (!singleJobEdit) {
        throw new Error('No job found');
    }

    return <EditForm editSingleJob={singleJobEdit} />;
}
