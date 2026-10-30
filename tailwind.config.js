/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './assets/js/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                opensauce: ['Open Sauce One', 'sans-serif'],
            },
            colors: {
                brand: '#822621',
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                }
            }
        }
    }
}
