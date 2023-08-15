// import BasicTable from '@/components/BasicTable';
// import Board from '@/components/Board';
import dynamic from 'next/dynamic';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });

export default function KanbanBoard() {
    
    return (
        <>
       <DashboardHeader/>
        {/* <BoardNoSSR />; */}
        </>

    ) 
    // return <BasicTable />;
}
