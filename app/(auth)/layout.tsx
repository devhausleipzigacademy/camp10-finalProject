import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex flex-col">
      <h1 className="text-headerOne flex uppercase text-justify leading-[1] font-800 py-s">
        Streamline your job hunt with us.
      </h1>
      {/* TODO: style the auth ui after clerk is set up */}
      <div className="w-[560px] h-[360px] border border-basicColors-light -mt-xl relative m-auto ui-background rounded-xl">
        {children}
      </div>
    </main>
  );
}
