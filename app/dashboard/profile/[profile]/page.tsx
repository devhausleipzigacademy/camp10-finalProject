export default function Profile({ params }: { params: { profile: number } }) {
    return <div>Whos Profile is this: {params.profile}</div>
}