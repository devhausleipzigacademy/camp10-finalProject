'use client';

import JobForm from '@/components/JobForm';
import { Job } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import router from 'next/router';
import { toast } from 'react-toastify';
import { ColumnWithJobs } from '../../getColumns';

export default function EditJob({ params }: { params: { id: number } }) {
    // const queryClient = useQueryClient();
    // const newJob = useMutation({
    //     mutationFn: (
    //         data: Omit<Job, 'id' | 'userId' | 'positionInColumn' | 'createdAt'>
    //     ) => axios.patch('/api/job', data).then(res => res.data),
    //     onError: error => {
    //         toast.error('Something went wrong');
    //     },
    //     onSuccess: data => {
    //         queryClient.invalidateQueries(['columns']);
    //         toast.success('Job created');
    //         router.push('/');
    //     },
    // });

    const onSubmitHandler = e => {
        // let updatedJobData = {}
        // newJob.mutate(updatedJobData);
        e.preventDefault();
        console.log('ich update den Job');
    };

    return (
        <div className="text-x">
            Edit the Following Job: {params.id}
            <JobForm onSubmit={onSubmitHandler} />
        </div>
    );
}
