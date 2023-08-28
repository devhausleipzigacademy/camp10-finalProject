import prisma from "@/utils/prismaClient";

function getData (jobId:string) {
    prisma.job.findFirst()
}

export default function SingleJob({ params }: { params: { id: string } }) {
    const singlePost = getData(params.id)
    return <div>My Job: {params.id}</div>;

}


