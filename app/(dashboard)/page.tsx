import Link from "next/link";


export default function Dashboard () {
    return (
        <>
            <div>Dashboard Page</div>
            <Link href="/dashboard/new-job"> Link to New Job</ Link>
        </>
    )
}