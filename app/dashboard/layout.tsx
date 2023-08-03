import React from "react";
import NewJob from "./page";

export default function Registration ({
    children,
}:{
    children: React.ReactNode
}) {
    return (
        <>
            <p>Dashboard Layout</p>
            {children}
        </>
    )
}