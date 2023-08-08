import Testimonial from '@/components/Testimonial';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex flex-col relative items-center">
      <div className="border-x-0 border-b border-basicColors-light w-full"></div>
      <div className="flex justify-center h-[80vh] w-full">
        <div className="w-full mt-m">
          <div className="flex justify-between">
            <h1 className="mainHeader">Streamline</h1>
          </div>
          <div className="flex justify-around relative left-xxl">
            <h1 className="mainHeader">your</h1>
            <h1 className="mainHeader">job hunt</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="mainHeader">with</h1>
            <h1 className="mainHeader">us.</h1>
          </div>
        </div>
      </div>
      <div className='absolute top-[280px] flex flex-col gap-[6rem] items-center'>
        {/* TODO: replace this with clerk ui */}
        <div className="w-[560px] h-[360px] border border-basicColors-light m-auto ui-background rounded-xl">
          {children}
        </div>
        <Testimonial />
      </div>
    </main>
  );
}
