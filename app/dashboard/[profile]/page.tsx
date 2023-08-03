export default function Profile({ params }: { params: { id: number } }) {
    return <div>What Profile is this: {params.id}</div>
}