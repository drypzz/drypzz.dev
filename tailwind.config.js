/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "electric-violet": "var(--electric-violet)",
        "neon-cyan": "var(--neon-cyan)",
        "void": "var(--bg-void)",
      },
      fontFamily: {
        // Space Grotesk se torna a padrão
        sans: ['var(--font-space)', 'sans-serif'],
        // JetBrains para detalhes técnicos
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')", // Ou uma imagem PNG local
      },
      // backgroundImage: {
      //   'nebula-gradient': 'radial-gradient(circle at 50% 0%, #1a0b2e 0%, #030014 60%)',
      //   'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%)',
      // },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};