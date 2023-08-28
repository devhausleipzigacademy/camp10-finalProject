/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        colors: {},
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
            700: '700',
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
        extend: {
            colors: {
                transparent: {
                    DEFAULT: 'rgba(0,0,0,0)',
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
                    darkblue: '#99B1ED',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },

    plugins: [require('tailwind-scrollbar')],
};
