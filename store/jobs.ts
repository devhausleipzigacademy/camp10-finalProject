import { JobsWithCols } from '@/app/(dashboard)/getJobs';
import { create } from 'zustand';

// temporary store for moved jobs in dnd
type JobsStore = {
    existingJobs: JobsWithCols[];
    setJobs: (jobs: JobsWithCols[]) => void;
    removeJob: (jobId: string) => void;
};

export const useJobsStore = create<JobsStore>()(set => ({
    existingJobs: [] as JobsWithCols[],
    setJobs: (jobs: JobsWithCols[]) =>
        set(() => ({ existingJobs: jobs })),
    removeJob: (jobId: string) =>
        set(state => ({
            existingJobs: state.existingJobs.filter(job => job.id !== jobId),
        })),
}));
