import Link from 'next/link';
import React from 'react';

export function Footer() {
    return (
        <>
            <footer className="flex flex-col text-xxxs mx-xl leading-xxs text-basicColors-light bg-basicColors-dark">
                <hr className="h-[1px] my-m  bg-basicColors-light border-hidden "></hr>
                <div className="flex items-start justify-between w-full gap-m">
                    <div className="flex flex-col gap-s">
                        <h1 className="text-xl leading-m">EMPLEO.</h1>
                        <ul>
                            <Link href="/">Home</Link>
                            <li>About Us</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-s">
                        <p>
                            Disclaimer: The information provided on this website
                            is for general informational purposes only and
                            should not be considered as professional advice.
                            Please consult with a qualified expert for specific
                            advice.
                        </p>
                        <p>
                            Subscribe to Our Newsletter: Stay updated with our
                            latest news and offers by subscribing to our
                            newsletter.
                        </p>
                    </div>
                    <div className="flex flex-col min-w-max gap-s">
                        <div className="text-right">
                            <p>Facebook</p>
                            <p>Even older social media</p>
                        </div>
                    </div>
                    <div className="flex flex-col min-w-max gap-s">
                        <div className="text-right">
                            <p>Privacy Policy</p>
                            <p>Terms of use</p>
                        </div>
                    </div>
                    <div className="flex flex-col text-right min-w-max">
                        <p>Address: 123 Main Street</p>
                        <p>City, Country, ZIP Code </p>
                        <p> Phone: +1(123) 456-7890</p>
                        <p>mail: info@example.com</p>
                    </div>
                </div>
                <span className="my-s">
                    Copyright © 2023 Camp #10. All rights reserved.
                </span>
                <hr className="h-[1px] mb-m bg-basicColors-light border-hidden "></hr>
            </footer>
        </>
    );
}
