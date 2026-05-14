/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5B5FED',
                secondary: '#F5F6FA',
                accent: '#E8E9F3',
            },
        },
    },
    plugins: [],
}
