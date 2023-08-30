'use client';

import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';
import { JobInputs, JobSchema } from '@/schema/job';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from './shared/Button';
import Input from './shared/Input';
import Select from './shared/Select';

type Props = { onSubmit: (data:JobInputs) => void; initialValues: JobInputs };

function JobForm({ onSubmit, initialValues }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JobInputs>({
        mode: 'onSubmit',
        values: initialValues,
        resolver: zodResolver(JobSchema),
    });

    const queryClient = useQueryClient();
    const { data: existingColumns } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get<ColumnWithJobs[]>(`/api/column`).then(res => res.data),
        // refetchInterval: 3000,
    });
    console.log(existingColumns);

    const newJob = useMutation({
        mutationFn: (data: JobInputs) =>
            axios.post('/api/job', data).then(res => res.data),
        onError: error => {
            toast.error('Something went wrong');
        },
        onSuccess: data => {
            queryClient.invalidateQueries(['columns']);
            toast.success('Job created');
            router.push('/');
        },
    });
    if (!existingColumns) {
        return null;
    }

    return (
        <form
            className="flex flex-col gap-xl border px-xxxl py-xl ui-background"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex gap-xxl">
                <div className="flex flex-col w-1/2 gap-s text-s">
                    <Input
                        label="Job Title"
                        id="title"
                        type="string"
                        isRequired={true}
                        error={errors.title}
                        {...register('title')}
                    ></Input>
                    <Input
                        label="Job URL"
                        type="string"
                        id="url"
                        isRequired={true}
                        error={errors.url}
                        {...register('url')}
                    ></Input>
                    <Input
                        label="Company"
                        id="companyName"
                        type="string"
                        isRequired={true}
                        error={errors.companyName}
                        {...register('companyName')}
                    ></Input>
                    <Input
                        label="Location"
                        id="location"
                        type="string"
                        isRequired={false}
                        error={errors.location}
                        {...register('location')}
                    ></Input>
                    <Input
                        label="Deadline"
                        id="deadline"
                        type="date"
                        isRequired={false}
                        error={errors.deadline}
                        {...register('deadline')}
                    ></Input>
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="bg-basicColors-dark bg-opacity-0 border p-xs rounded-[0.3125rem] border-borderColors-borderLight focus:outline focus:outline-2 focus:outline-basicColors-light"
                        id="description"
                        rows={5}
                        {...register('description')}
                    ></textarea>
                </div>
                <div className="flex flex-col w-1/2 gap-s text-s">
                    <Input
                        label="Company Website"
                        id="companyWebsite"
                        type="string"
                        isRequired={false}
                        error={errors.companyWebsite}
                        {...register('companyWebsite')}
                    ></Input>
                    <Select
                        label="Type"
                        id="remoteType"
                        isRequired={false}
                        options={['Onsite', 'Remote', 'Hybrid']}
                        {...register('remoteType')}
                        error={errors.remoteType}
                    ></Select>
                    <Select
                        label="Current Stage"
                        id="currentStage"
                        isRequired={true}
                        options={existingColumns.map(col => {
                            return col.title;
                        })}
                        {...register('currentStage')}
                        error={errors.currentStage}
                    ></Select>
                    <Select
                        label="Priority"
                        id="priority"
                        isRequired={false}
                        options={['Low', 'Medium', 'High']}
                        error={errors.priority}
                        {...register('priority')}
                    ></Select>
                    {/* <TagsInput /> */}
                </div>
            </div>
            <div className="flex justify-end gap-m">
                <Link href={'/'}>
                    <Button variant="primary" type="button" size="small">
                        Cancel
                    </Button>
                </Link>
                <Button variant="primary" type="submit" size="small">
                    Create
                </Button>
            </div>
        </form>
    );
}

export default JobForm;
