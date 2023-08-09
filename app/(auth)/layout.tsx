import Testimonial from '@/components/Testimonial';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center">
      <div className="border-x-0 border-b border-basicColors-light w-full"></div>
      <div className="flex flex-col items-center w-full mb-xxl">
        <div className="w-full mt-m">
          <div className="flex justify-between">
            <h1 className="mainHeader">Streamline</h1>
          </div>
          <div className="flex justify-around relative left-xxl">
            <h1 className="mainHeader">your</h1>
            <h1 className="mainHeader">job hunt</h1>
          </div>
          <div className="grid grid-cols-headline relative">
            <h1 className="mainHeader">with</h1>
            {/* TODO: replace this with clerk ui */}
            {children}
            <h1 className="mainHeader flex justify-end">us.</h1>
          </div>
        </div>
      </div>
      <Testimonial />
    </main>
  );
}
