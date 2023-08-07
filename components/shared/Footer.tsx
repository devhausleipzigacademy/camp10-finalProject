import Link from 'next/link';
import React from 'react';

export function Footer() {
    return (
        <div className="flex justify-between items-start w-full bg-slate-300">
            <div className="flex-col">
                <h1>EMPLEO.</h1>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                </ul>
                <span>Copyright © 2023 Camp #10. All rights reserved.</span>
            </div>
            <div className="flex-col">
                <p>Disclaimer</p>
                <p>Privacy Policy</p>
            </div>
            <div className="flex-col">
                <p>Address:</p>
                <p> 123 Main Street</p>
                <p>City, Country, ZIP Code </p>
                <p> Phone: +1(123) 456-7890</p>
                <p>mail: info@example.com</p>
            </div>
        </div>
    );
}
