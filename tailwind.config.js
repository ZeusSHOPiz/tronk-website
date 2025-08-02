/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        troll: {
          yellow: '#FFDD00',
          red: '#FF0000',
          blue: '#0000FF',
          green: '#00FF00',
          pink: '#FF00FF',
          cyan: '#00FFFF',
        }
      },
      fontFamily: {
        'luckiest': ['var(--font-luckiest-guy)', 'Comic Sans MS', 'cursive'],
        'bangers': ['var(--font-bangers)', 'Comic Sans MS', 'cursive'],
        'comic': ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'troll-bounce': 'troll-bounce 2s ease-in-out infinite',
        'troll-shake': 'troll-shake 0.5s ease-in-out infinite',
        'troll-spin': 'troll-spin 3s linear infinite',
        'troll-pulse': 'troll-pulse 1s ease-in-out infinite',
        'troll-float': 'troll-float 4s ease-in-out infinite',
        'troll-glitch': 'troll-glitch 0.3s ease-in-out infinite',
      },
      backgroundImage: {
        'troll-gradient': 'linear-gradient(45deg, #FFDD00, #FF6B6B, #4ECDC4, #45B7D1)',
      },
      boxShadow: {
        'troll': '0 0 20px rgba(255, 0, 0, 0.5)',
        'troll-lg': '0 0 40px rgba(255, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
} 