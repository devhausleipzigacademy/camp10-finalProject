'use client';

import JobForm from '@/components/JobForm';
import { ColumnWithJobs } from '../getColumns';

const onSubmitHandler = async (data: Form) => {
    const { id: columnId, jobs } = existingColumns?.find(
        column => column.title === data.currentStage
    ) as ColumnWithJobs;
    const { currentStage, ...dataWithoutStage } = data;
    const newJobData = {
        ...dataWithoutStage,
        columnId,
        positionInColumn: jobs.length,
    };
    newJob.mutate(newJobData);
};

export default function NewJob() {
    const onSubmitHandler = e => {
        // let updatedJobData = {}
        // newJob.mutate(updatedJobData);
        e.preventDefault();
        console.log('ich erstelle den Job');
    };
    return (
        <>
            <JobForm onSubmit={onSubmitHandler} />
        </>
    );
}
