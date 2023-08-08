export default function EditJob({ params }: { params: { id: number } }) {
    return <div className="text-x">Edit the Following Job: {params.id}</div>
}