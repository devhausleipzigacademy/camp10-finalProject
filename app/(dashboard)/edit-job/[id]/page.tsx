import prisma from "@/utils/prismaClient"
import EditForm from "./EditForm"

type Props = {
    params: {
        id: string
    }
}

export default async function Page({params}:Props) {
    const jobId = params.id

    const job = await prisma.job.findUnique({
        where: {
            id: jobId
        }
    })

    return <EditForm />
}