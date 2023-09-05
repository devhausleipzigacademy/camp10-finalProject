'use client';

import JobForm from '@/components/JobForm';
import { ColumnWithJobs } from '../getColumns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobInputs } from '@/schema/job';
import { TagType, useAddedTagsStore } from '@/store/tags';

export default function NewJob() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const columnTitle = searchParams.get('name');
    const { addedTags } = useAddedTagsStore();

    const queryClient = useQueryClient();
    const { data: existingColumns } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get<ColumnWithJobs[]>(`/api/column`).then(res => res.data),
        // refetchInterval: 3000,
    });

    const newJob = useMutation({
        mutationFn: (data: JobInputs) =>
            axios
                .post('/api/job', {
                    ...data,
                })
                .then(res => {
                    return res;
                })
                .then(res => res.data),
        onError: error => {
            toast.error('Something went wrong');
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['columns']);
            toast.success('Job created');
            router.push('/');
        },
    });

    const onSubmitHandler = async (data: JobInputs) => {
        const mutateData = {
            ...data,
            columnId: existingColumns?.find(
                col => col.title === data.currentStage
            )?.id,
            positionInColumn: existingColumns?.find(
                col => col.title === data.currentStage
            )?.jobs.length,
            tag: addedTags,
        };

        newJob.mutate(mutateData);
    };
    const getDefaultDeadline = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split('T')[0];
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
                    title: '',
                    url: '',
                    location: '',
                    deadline: getDefaultDeadline(),
                    description: '',
                    remoteType: 'Onsite',
                    companyName: '',
                    companyWebsite: '',
                    currentStage: columnTitle || existingColumns[0].title,
                    priority: 'Low',
                    tag: [],
                }}
            />
        </>
    );
}
