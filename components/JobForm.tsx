'use client';

import React from 'react';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import TagsInput from './TagsInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { JobSchema } from '@/schema/job';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useColumnStore } from '@/store/columns';

type Form = {
    title: string;
    companyName: string;
    url: string;
    location: string;
    companyWebsite: string;
    deadline: Date;
    remoteType: string[];
    priority: string[];
    currentStage: string[];
    description: string;
    labels: string[];
};

function JobForm() {
    const {existingColumns} = useColumnStore()
    const searchParams = useSearchParams()
    const columnId = searchParams.get('columnId')
    const columnTitle = searchParams.get('name')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>({
        mode: 'onSubmit',
        resolver: zodResolver(JobSchema),
    });

    const queryClient = useQueryClient()

    const router = useRouter()

    const newJob = useMutation({
        mutationFn: (data: Form) => axios.post("/api/job", {...data, columnId}).then((res) => res.data),
        onError: (error) => {
            toast.error("Something went wrong")
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["columns"])
            toast.success("Job created")
            router.push("/")
        }
    })

    const onSubmitHandler = async (data: Form) => {
        newJob.mutate(data)

    };

    return (
        <form
            className="flex flex-col gap-xl border px-xxxl py-xl ui-background"
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <div className='flex gap-xxl'>
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
                        defaultValue={''}
                        {...register('remoteType')}
                        error={errors.remoteType}
                    ></Select>
                    <Select
                        label="Current Stage"
                        id="currentStage"
                        isRequired={true}
                        defaultValue={columnTitle || existingColumns[0].title }
                        options={existingColumns.map((oneColumn) =>{
                            return oneColumn.title
                        })}
                        {...register('currentStage')}
                        error={errors.currentStage}
                    ></Select>
                    <Select
                        label="Priority"
                        id="priority"
                        isRequired={false}
                        options={['Low', 'Medium', 'High']}
                        defaultValue={''}
                        error={errors.priority}
                        {...register('priority')}
                    ></Select>
                    {/* <TagsInput /> */}
                </div>
            </div>
            <Button
                className="ml-auto"
                variant="primary"
                type="submit"
                size="small"
            >
                Create
            </Button>
        </form>
    );
}

export default JobForm;
