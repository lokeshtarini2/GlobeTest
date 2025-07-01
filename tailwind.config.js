
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from your Material-UI theme
        brand: {
          50: 'hsl(210, 100%, 95%)',
          100: 'hsl(210, 100%, 92%)',
          200: 'hsl(210, 100%, 80%)',
          300: 'hsl(210, 100%, 65%)',
          400: 'hsl(210, 98%, 48%)',
          500: 'hsl(210, 98%, 42%)',
          600: 'hsl(210, 98%, 55%)',
          700: 'hsl(210, 100%, 35%)',
          800: 'hsl(210, 100%, 16%)',
          900: 'hsl(210, 100%, 21%)',
        },
        // Gray colors from your Material-UI theme
        gray: {
          50: 'hsl(220, 35%, 97%)',
          100: 'hsl(220, 30%, 94%)',
          200: 'hsl(220, 20%, 88%)',
          300: 'hsl(220, 20%, 80%)',
          400: 'hsl(220, 20%, 65%)',
          500: 'hsl(220, 20%, 42%)',
          600: 'hsl(220, 20%, 35%)',
          700: 'hsl(220, 20%, 25%)',
          800: 'hsl(220, 30%, 6%)',
          900: 'hsl(220, 35%, 3%)',
        },
        // Green colors from your Material-UI theme
        green: {
          50: 'hsl(120, 80%, 98%)',
          100: 'hsl(120, 75%, 94%)',
          200: 'hsl(120, 75%, 87%)',
          300: 'hsl(120, 61%, 77%)',
          400: 'hsl(120, 44%, 53%)',
          500: 'hsl(120, 59%, 30%)',
          600: 'hsl(120, 70%, 25%)',
          700: 'hsl(120, 75%, 16%)',
          800: 'hsl(120, 84%, 10%)',
          900: 'hsl(120, 87%, 6%)',
        },
        // Orange colors from your Material-UI theme
        orange: {
          50: 'hsl(45, 100%, 97%)',
          100: 'hsl(45, 92%, 90%)',
          200: 'hsl(45, 94%, 80%)',
          300: 'hsl(45, 90%, 65%)',
          400: 'hsl(45, 90%, 40%)',
          500: 'hsl(45, 90%, 35%)',
          600: 'hsl(45, 91%, 25%)',
          700: 'hsl(45, 94%, 20%)',
          800: 'hsl(45, 95%, 16%)',
          900: 'hsl(45, 93%, 12%)',
        },
        // Red colors from your Material-UI theme
        red: {
          50: 'hsl(0, 100%, 97%)',
          100: 'hsl(0, 92%, 90%)',
          200: 'hsl(0, 94%, 80%)',
          300: 'hsl(0, 90%, 65%)',
          400: 'hsl(0, 90%, 40%)',
          500: 'hsl(0, 90%, 30%)',
          600: 'hsl(0, 91%, 25%)',
          700: 'hsl(0, 94%, 18%)',
          800: 'hsl(0, 95%, 12%)',
          900: 'hsl(0, 93%, 6%)',
        },
        // Background colors for light/dark mode
        background: {
          light: 'hsl(0, 0%, 99%)',
          'light-paper': 'hsl(220, 35%, 97%)',
          dark: 'hsl(220, 35%, 3%)',
          'dark-paper': 'hsl(220, 30%, 7%)',
        },
        // Text colors for light/dark mode
        text: {
          primary: 'hsl(220, 30%, 6%)',
          secondary: 'hsl(220, 20%, 35%)',
          'primary-dark': 'hsl(0, 0%, 100%)',
          'secondary-dark': 'hsl(220, 20%, 65%)',
          warning: 'hsl(45, 90%, 40%)',
        }
      },
      fontFamily: {
        'mona': ['"Mona Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1': '3rem',
        'h2': '2.25rem',
        'h3': '1.875rem',
        'h4': '1.5rem',
        'h5': '1.25rem',
        'h6': '1.125rem',
        'subtitle1': '1.125rem',
        'subtitle2': '0.875rem',
        'body1': '0.875rem',
        'body2': '0.875rem',
        'caption': '0.75rem',
      },
      borderRadius: {
        'theme': '8px',
      },
      boxShadow: {
        'custom': 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        'custom-dark': 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
