import { ColumnWithJobs } from '@/app/(dashboard)/page';
import { create } from 'zustand';

type ColumnStore = {
    columns: ColumnWithJobs[];
    setColumns: (columns: ColumnWithJobs[]) => void;
    addNewColumn: (newCol: ColumnWithJobs) => void;
    removeColumn: (columnPosition: number) => void;
};

export const useColumnStore = create<ColumnStore>()(set => ({
    columns: [] as ColumnWithJobs[],
    setColumns: (columns: ColumnWithJobs[]) => set({columns: columns}),
    addNewColumn: (newCol: ColumnWithJobs) =>
        set(state => ({ columns: [...state.columns, newCol] })),
    removeColumn: (columnPosition: number) =>
        set(state => ({
            columns: state.columns.filter(
                col => col.positionInBoard !== columnPosition
            ),
        })),
}));
