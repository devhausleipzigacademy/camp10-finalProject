'use client';

import JobForm from '@/components/JobForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Job, remoteType } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobInputs } from '@/schema/job';
import { ColumnWithJobs } from '../../getColumns';

type Column = { column: { color: string; title: string } };

type Tag = { tag: Array<{ name: string; id: number }> };

type EditProps = {
    editSingleJob: Job & Column & Tag;
};

export default function EditForm({ editSingleJob }: EditProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const columnTitle = searchParams.get('name');
    const columnId = searchParams.get('columnId');

    const queryClient = useQueryClient();
    const { data: existingColumns } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get<ColumnWithJobs[]>(`/api/column`).then(res => res.data),
        // refetchInterval: 3000,
    });

    const editJob = useMutation({
        mutationFn: (data: JobInputs) =>
            axios.patch('/api/job', data).then(res => res.data),
        onError: error => {
            toast.error('Something went wrong');
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['columns']);
            toast.success('Job saved');
            router.push('/');
        },
    });

    const onSubmitHandler = async (data: JobInputs) => {
        editJob.mutate(data);
    };

    if (!editSingleJob) {
        return null;
    }

    return (
        <>
            <JobForm
                onSubmit={onSubmitHandler}
                initialValues={{
                    title: editSingleJob.title,
                    url: editSingleJob.url,
                    location: editSingleJob.location!,
                    deadline: editSingleJob.deadline
                        ?.toISOString()
                        .split('T')[0],
                    description: editSingleJob.description!,
                    remoteType: editSingleJob.remoteType!,
                    companyName: editSingleJob.companyName,
                    companyWebsite: editSingleJob.companyWebsite!,
                    currentStage: editSingleJob.column.title,
                    priority: editSingleJob.priority!,
                    tags: editSingleJob.tag,
                }}
            />
        </>
    );
}
