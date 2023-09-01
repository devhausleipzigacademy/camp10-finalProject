'use client';

import JobForm from '@/components/JobForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Job, remoteType } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobInputs } from '@/schema/job';
import { ColumnWithJobs } from '../../getColumns';
import { TagType } from '@/store/tags';

type Column = { column: { color: string; title: string } };

type Tag = { tag: TagType[] };

type EditProps = {
    editSingleJob: Job & Column & Tag;
};

export default function EditForm({ editSingleJob }: EditProps) {
    const router = useRouter();

    const queryClient = useQueryClient();
    const { data: existingColumns } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get<ColumnWithJobs[]>(`/api/column`).then(res => res.data),
        // refetchInterval: 3000,
    });

    const editJob = useMutation({
        mutationFn: (data: JobInputs) => {
            const deadline = new Date(data.deadline!);
            return axios
                .patch(`/api/job/${editSingleJob.id}`, {
                    ...data,
                    deadline,
                    columnId: existingColumns?.find(
                        col => col.title === data.currentStage
                    )?.id,
                })
                .then(res => res.data);
        },
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

    if (!editSingleJob || !existingColumns) {
        return null;
    }

    return (
        <>
            <JobForm
                existingColumns={existingColumns}
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
                    tag: editSingleJob.tag,  
                }}
            />
        </>
    );
}
