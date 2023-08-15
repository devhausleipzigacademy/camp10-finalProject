// import BasicTable from '@/components/BasicTable';
// import Board from '@/components/Board';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { auth } from '@clerk/nextjs';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });
const initalColumns = [{
    "title": "Scouted"
}]

export default async function KanbanBoard() {
    const { userId } = auth()
    return <BoardNoSSR />;
    // return <BasicTable />;
}
