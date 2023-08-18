import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';
import { create } from 'zustand';

type ColumnStore = {
    existingColumns: ColumnWithJobs[];
    newColumns: ColumnWithJobs[];
    setColumns: (columns: ColumnWithJobs[]) => void;
    addColumn: (newCol: ColumnWithJobs) => void;
    removeColumn: (columnPosition: number) => void;
    addNewColumn: (newCol: ColumnWithJobs) => void;
    removeNewColumn: (columnPosition: number) => void;
};

export const useColumnStore = create<ColumnStore>()(set => ({
    existingColumns: [] as ColumnWithJobs[],
    newColumns: [] as ColumnWithJobs[],
    setColumns: (columns: ColumnWithJobs[]) =>
        set({ existingColumns: columns }),
    addColumn: (newCol: ColumnWithJobs) =>
        set(state => ({ existingColumns: [...state.existingColumns, newCol] })),
    removeColumn: (columnPosition: number) =>
        set(state => ({
            existingColumns: state.existingColumns.filter(
                col => col.positionInBoard !== columnPosition
            ),
        })),
    addNewColumn: (newCol: ColumnWithJobs) =>
        set(state => ({ newColumns: [...state.existingColumns, newCol] })),
    removeNewColumn: (columnPosition: number) =>
        set(state => ({
            newColumns: state.newColumns.filter(
                col => col.positionInBoard !== columnPosition
            ),
        })),
}));
