import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// temporary store for moved jobs in dnd
type DashboardView = {
    isBaordView: boolean;
    setBoardView: () => void;
    setTableView: () => void;
};

export const useDashboardView = create<DashboardView>()(
    persist(
        set => ({
            isBaordView: true,
            setBoardView: () =>
                set(state => ({ isBaordView: true })),
            setTableView: () =>
                set(state => ({ isBaordView: false })),
        }),
        {
            name: 'dashboard-view'
        }
    )
);
