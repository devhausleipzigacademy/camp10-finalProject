import React from "react";
import LoginForm from "./page";

export default function Registration ({
    children,
}:{
    children: React.ReactNode
}) {
    return (
        <>
            <p>Login Layout</p>
            {children}
        </>
    )
}