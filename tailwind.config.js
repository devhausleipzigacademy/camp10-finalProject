/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            transparent: {
                DEFAULT: 'rgba(0,0,0,0)'
            },
            basicColors: {
                dark: '#3D3D3D',
                light: '#F5F7FE',
                
            },
            hoverColors: {
                hoverMain: '#F5F7FE',
                hover: '#FE5A35',
            },
            borderColors: {
                borderLight: '#D8DDE7',
            },
            textColors: {
                textBody: '#1B2132',
            },
            cardColors: {
                red: '#FE5A35',
                blue: '#DAEDEB',
                purple: '#B4A0D1',
                green: '#CBE87E',
                yellow: '#FDC959',
                black: '#3D3D3D',
            },
        },
        fontFamily: {
            DEFAULT: ['Plus Jakarta Sans', 'sans-serif'],
        },
        fontSize: {
            headerOne: '7.5rem',
            xxxl: '3rem',
            xxl: '2.5rem',
            xl: '2.25rem',
            l: '1.875rem',
            m: '1.5rem',
            s: '1.125rem',
            xs: '1rem',
            xxs: '0.8125rem',
            xxxs: '0.75rem',
        },
        fontWeight: {
            800: '800',
            600: '600',
            500: '500',
            400: '400',
        },
        lineHeight: {
            xxl: '2.75rem',
            xl: '2.25rem',
            l: '1.75rem',
            m: '1.5rem',
            s: '1.25rem',
            xs: '1.125rem',
            xxs: '0.900rem',
        },
        spacing: {
            xxxl: '5rem',
            xxl: '4rem',
            xl: '2.5rem',
            l: '2rem',
            m: '1.5rem',
            s: '1rem',
            xs: '0.5rem',
            xxs: '0.25rem',
        },
        gridTemplateColumns: {
            headline: '15% 70% 15%',
        },
        extend: {},
    },
    plugins: [],
};
