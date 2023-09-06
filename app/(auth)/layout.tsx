import Testimonial from '@/components/Testimonial';
import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col items-center">
            <div className="w-full border-b border-x-0 border-basicColors-light"></div>
            <div className="flex flex-col items-center w-full mb-xxl">
                <div className="w-full mt-m">
                    <div className="flex justify-between">
                        <h1 className="mainHeader">Streamline</h1>
                    </div>
                    <div className="relative flex justify-around left-xxl">
                        <h1 className="mainHeader text-cardColors-purple">
                            your
                        </h1>
                        <h1 className="mainHeader text-cardColors-red">
                            job hunt
                        </h1>
                    </div>
                    <div className="relative grid grid-cols-headline">
                        <h1 className="mainHeader text-cardColors-yellow">
                            with
                        </h1>
                        {/* TODO: replace this with clerk ui */}
                        {children}
                        <h1 className="flex justify-end mainHeader">us.</h1>
                    </div>
                </div>
            </div>
            <Testimonial />
        </main>
    );
}
