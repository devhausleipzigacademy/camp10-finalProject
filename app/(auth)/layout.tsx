import React from 'react';

const headerText = 'Streamline your job hunt with us.';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex flex-col relative">
      <div className="border-x-0 border-b border-basicColors-light"></div>
      <div className="flex justify-center">
        <div className="w-full mt-m">
          <div className="flex justify-between">
            <h1 className="mainHeader">Streamline</h1>
          </div>
          <div className='flex justify-around relative left-xxl'>
            <h1 className="mainHeader">your</h1>
            <h1 className="mainHeader">job hunt</h1>
          </div>
          <div className='flex justify-between'>
            <h1 className="mainHeader">with</h1>
            <h1 className="mainHeader">us.</h1>
          </div>
        </div>
        <div className="absolute top-[280px] w-[560px] h-[360px] border border-basicColors-light m-auto ui-background rounded-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
