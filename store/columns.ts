import { ColumnWithJobs } from '@/app/(dashboard)/getColumns';
import { create } from 'zustand';

type ColumnStore = {
    existingColumns: ColumnWithJobs[];

    setColumns: (columns: ColumnWithJobs[]) => void;
    addColumn: (newCol: ColumnWithJobs) => void;
    removeColumn: (columnPosition: number) => void;
    setColumnColor: (columnId:string, color:string) => void;
 
};

export const useColumnStore = create<ColumnStore>()(set => ({
    existingColumns: [] as ColumnWithJobs[],
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
    setColumnColor: (columnId:string, color:string) =>
        set (state => ({existingColumns: state.existingColumns.map(column => columnId === column.id? {...column, color} : column) }))
})); 

