import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "primary": "#1D4ED8",
                "primary-dark": "#1E40AF",
                "primary-superdark": "#1E3A8A",
                "error": "#DC2626",
                "error-dark": "#B91C1C",
                "danger": "#DC2626",
                "danger-dark": "#B91C1C",
                "gray": {
                    "50": "#F9FAFB"
                }
            },
            maxWidth: {
                'container': "1280px",
                '128': "512px"
            },
            width: {
                'feature-card': "384px",
                '38': "152px"
            },
            height: {
                '18': "76px"
            },
            scale: {
                'flip': '-1'
            },
            opacity: {
                '15': '0.15',
            },
        },
    },

    plugins: [forms],
};
