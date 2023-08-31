import JobForm from '@/components/JobForm';
import { auth } from '@clerk/nextjs';
import { getTags } from './getTags';

export default async function NewJob() {
    const { userId } = auth();
    const tags = await getTags(userId as string)
    return (
        <>
            <JobForm tagsData={tags}/>
        </>
    );
}
