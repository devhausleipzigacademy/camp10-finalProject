import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <p>Auth Layout</p>
      {children}
    </>
  );
}
