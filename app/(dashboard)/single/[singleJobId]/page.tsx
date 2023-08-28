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
        <div className="flex flex-col gap-xl border px-xxxl py-xl ui-background">
            Single job view:
            <div className="flex gap-xxl">
                <div className="flex flex-col w-1/2 gap-s text-s">
                    <div className="text-xs">
                        <h4 className="text-l">Job Title</h4>
                        {singleJob?.title}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Job URL</h4>
                        {singleJob?.url}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Company</h4>
                        {singleJob?.companyName}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Location</h4>
                        {singleJob?.location}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Deadline</h4>
                        {singleJob?.title}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Description</h4>
                        {singleJob?.description}
                    </div>
                </div>
                <div className="flex flex-col w-1/2 gap-s text-s">
                    <div className="text-xs">
                        <h4 className="text-l">Company Website</h4>
                        {singleJob?.companyWebsite}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Type</h4>
                        {singleJob?.remoteType}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Current Stage</h4>
                        {singleJob?.columnId}
                    </div>
                    <div className="text-xs">
                        <h4 className="text-l">Priority</h4>
                        {singleJob?.priority}
                    </div>
                </div>
            </div>
        </div>
    );
}
