export default function Profile({ params }: { params: { profile: number } }) {
  return <div>Whose Profile is this: {params.profile}</div>;
}
