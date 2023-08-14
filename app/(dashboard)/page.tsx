// import BasicTable from '@/components/BasicTable';
// import Board from '@/components/Board';
import dynamic from 'next/dynamic';
// import { PrismaClient } from '@prisma/client';

const BoardNoSSR = dynamic(() => import('@/components/Board'), { ssr: false });
// const getData = async () => {
//     // select title of column from job table based on the relation
//     const prisma = new PrismaClient()
//     prisma.job.findMany({
//         select: {
//             column: {
//                 select: {
//                     title: true
//                 }
//             }
//         }
//     })
// };
export default function KanbanBoard() {
    return <BoardNoSSR />;
    // return <BasicTable />;
}
