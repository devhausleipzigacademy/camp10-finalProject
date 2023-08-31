'use client';

import React from 'react';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { JobSchema } from '@/schema/job';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';
import Link from 'next/link';
import FormTags from './FormTags';
import { TagType, useAddedTagsStore } from '@/store/tags';
import { JobToTag } from '@prisma/client';
import { Job } from '@prisma/client';

type Form = Job & { currentStage: string };

type TagProps = {
    tagsData: TagType[];
};

function JobForm({ tagsData }: TagProps) {
    const searchParams = useSearchParams();
    const columnTitle = searchParams.get('name');
    const { addedTags, setAddedTags } = useAddedTagsStore();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>({
        mode: 'onSubmit',
        resolver: zodResolver(JobSchema),
    });

    const queryClient = useQueryClient();

    const newJob = useMutation({
        mutationFn: (
            data: Omit<Job, 'id' | 'userId' | 'positionInColumn' | 'createdAt'>
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

    const newJobToTag = useMutation({
        mutationFn: (data: JobToTag[]) =>
            axios.post('/api/jobtotag', data).then(res => res.data),
        onError: error => {
            toast.error('Something went wrong on adding tags to Job.');
        },
        onSuccess: data => {
            setAddedTags([]);
            console.log('Tags updated.');
        },
    });

    const { data: existingColumns } = useQuery({
        queryKey: ['columns'],
        queryFn: () =>
            axios.get<ColumnWithJobs[]>(`/api/column`).then(res => res.data),
        // refetchInterval: 3000,
    });
    console.log(existingColumns);

    if (!existingColumns) {
        return null;
    }

    const onSubmitHandler = async (data: Form) => {
        const { id: columnId, jobs } = existingColumns.find(
            column => column.title === data.currentStage
        ) as ColumnWithJobs;
        const { currentStage, ...dataWithoutStage } = data;
        const newJobData = {
            ...dataWithoutStage,
            columnId,
            positionInColumn: jobs.length,
        };
        const { id: jobId } = await newJob.mutateAsync(newJobData);
        console.log('New job submitted:', jobId);
        const tagtojobs = addedTags.map(tag => ({ jobId, tagId: tag.id }));
        console.log('tagtojobs:', tagtojobs);
        const response = await newJobToTag.mutateAsync(tagtojobs);
        console.log('jobtotags added', response);
        // setAddedTags([]);
    };

    const getDefaultDeadline = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split('T')[0];
    };

    return (
        <form
            className="flex flex-col gap-xl border px-xxxl py-xl ui-background"
            onSubmit={handleSubmit(onSubmitHandler)}
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
                        defaultValue={getDefaultDeadline()}
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
                        defaultValue={'Onsite'}
                        {...register('remoteType')}
                        error={errors.remoteType}
                    ></Select>
                    <Select
                        label="Current Stage"
                        id="currentStage"
                        isRequired={true}
                        defaultValue={columnTitle || existingColumns[0].title}
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
                        defaultValue={'Low'}
                        error={errors.priority}
                        {...register('priority')}
                    ></Select>
                    {/* <TagsInput /> */}
                    <FormTags tagsData={tagsData} />
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
