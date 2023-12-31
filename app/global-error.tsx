'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {}, [error]);

    return (
        <>
            <h2>Something went wrong in the Root folder!</h2>
            <button onClick={() => reset()}>Try again</button>
        </>
    );
}
