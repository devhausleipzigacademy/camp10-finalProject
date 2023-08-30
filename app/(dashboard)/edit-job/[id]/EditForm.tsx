'use client';

import JobForm from '@/components/JobForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Job, remoteType } from '@prisma/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobInputs } from '@/schema/job';
import { ColumnWithJobs } from '../../getColumns';

export default function EditForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const columnTitle = searchParams.get('name');

    const queryClient = useQueryClient();
    const { data: existingColumns } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get<ColumnWithJobs[]>(`/api/column`).then(res => res.data),
        // refetchInterval: 3000,
    });

    const newJob = useMutation({
        mutationFn: (
            data: JobInputs
        ) => axios.post('/api/job', data).then(res => res.data),
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
        newJob.mutate(data);
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
                onSubmit={onSubmitHandler}
                initialValues={{
                    title: '',
                    url: '',
                    location: '',
                    deadline: new Date(getDefaultDeadline()),
                    description: '',
                    remoteType: remoteType.Onsite,
                    companyName: '',
                    companyWebsite: '',
                    currentStage: columnTitle || existingColumns[0].title,
                    priority:'Low'
                }}
            />
        </>
    );
}