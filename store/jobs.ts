import { Job } from '@prisma/client';
import { create } from 'zustand';

// temporary store for moved jobs in dnd
type movedJobsStore = {
    movedJobs: Job[];
    addJobs: (jobs: Job[]) => void;
    removeJob: (jobId: string) => void;
};

export const useMovedJobsStore = create<movedJobsStore>()(set => ({
    movedJobs: [] as Job[],
    addJobs: (jobs: Job[]) =>
        set(state => ({ movedJobs: [...state.movedJobs, ...jobs] })),
    removeJob: (jobId: string) =>
        set(state => ({
            movedJobs: state.movedJobs.filter(job => job.id !== jobId),
        })),
}));
