import { ColumnWithJobs } from '@/app/(dashboard)/page';
import { create } from 'zustand';

type newColumnStore = {
    newColumns: ColumnWithJobs[];
    addNewColumn: (newCol: ColumnWithJobs) => void;
    removeColumn: (columnPosition: number) => void;
};

export const useNewColumnStore = create<newColumnStore>()(set => ({
    newColumns: [] as ColumnWithJobs[],
    addNewColumn: (newCol: ColumnWithJobs) =>
        set(state => ({ newColumns: [...state.newColumns, newCol] })),
    removeColumn: (columnPosition: number) =>
        set(state => ({
            newColumns: state.newColumns.filter(
                col => col.positionInBoard !== columnPosition
            ),
        })),
}));
