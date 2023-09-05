'use client';

import JobForm from '@/components/JobForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Column, Job, remoteType } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobInputs } from '@/schema/job';
import { ColumnWithJobs } from '../../getColumns';
import { TagType, useAddedTagsStore } from '@/store/tags';

export type JobType = Job & { column: Pick<Column, 'title' | 'color'> } & {
    tag: TagType[];
};

type EditProps = {
    editSingleJob: JobType;
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
    const { data: singleJob } = useQuery({
        queryKey: ['job', editSingleJob.id],
        queryFn: () =>
            axios
                .get<JobType>(`/api/job/${editSingleJob.id}`)
                .then(res => res.data as JobType),
        initialData: editSingleJob,
    });

    const { addedTags } = useAddedTagsStore();

    const editJob = useMutation({
        mutationFn: async (data: JobInputs) => {
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
            queryClient.invalidateQueries(['job', editSingleJob.id]);
            toast.success('Job saved');
            router.push('/');
        },
    });

    const onSubmitHandler = async (data: JobInputs) => {
        editJob.mutate({
            ...data,
            tag: addedTags,
        });
    };

    if (!existingColumns) {
        return null;
    }

    return (
        <>
            <JobForm
                existingColumns={existingColumns}
                onSubmit={onSubmitHandler}
                initialValues={{
                    title: singleJob.title,
                    url: singleJob.url,
                    location: singleJob.location!,
                    deadline: new Date(singleJob.deadline!)
                        .toISOString()
                        .split('T')[0],
                    description: singleJob.description!,
                    remoteType: singleJob.remoteType!,
                    companyName: singleJob.companyName,
                    companyWebsite: singleJob.companyWebsite!,
                    currentStage: singleJob.column.title,
                    priority: singleJob.priority!,
                    tag: singleJob.tag,
                }}
            />
        </>
    );
}
