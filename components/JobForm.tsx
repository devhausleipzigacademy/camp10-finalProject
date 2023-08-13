'use client';

import React from 'react';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import TagsInput from './TagsInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { JobSchema } from '@/schema/job';

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>({
        mode: 'onSubmit',
        resolver: zodResolver(JobSchema),
    });
    const onSubmitHandler = (data: Form) => {
        console.log(data);
    };

    return (
        <form
            className="flex flex-col gap-xl border px-xxxl py-xxl ui-background"
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <div className='flex gap-xxl'>
                <div className="flex flex-col w-1/2 gap-xs text-s">
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
                        rows={8}
                        {...register('description')}
                    ></textarea>
                </div>
                <div className="flex flex-col w-1/2 gap-xs text-s">
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
                        isRequired={false}
                        options={[
                            'Scouted',
                            'Applied',
                            'Interview',
                            'Offer',
                            'Rejected',
                        ]}
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
                    <TagsInput />
                </div>
            </div>
            <Button
                className="ml-auto"
                variant="hover"
                type="submit"
                size="small"
            >
                Create
            </Button>
        </form>
    );
}

export default JobForm;
