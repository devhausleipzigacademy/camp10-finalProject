import { Job } from '@prisma/client';
import { create } from 'zustand';

type newJobStore = {
    newJobs: Job[];
    addNewJobs: (jobs: Job[]) => void;
    removeJob: (jobId: string) => void;
};

export const useNewColumnStore = create<newJobStore>()(set => ({
    newJobs: [] as Job[],
    addNewJobs: (jobs: Job[]) =>
        set(state => ({ newJobs: [...state.newJobs, ...jobs] })),
    removeJob: (jobId: string) =>
        set(state => ({
            newJobs: state.newJobs.filter(job => job.id !== jobId),
        })),
}));
