/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主色调 - 深蓝色系
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // 辅助色 - 青绿色系
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // 强调色 - 橙色系
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // 背景色
        background: {
          primary: {
            light: "#ffffff",
            dark: "#0f172a",
          },
          secondary: {
            light: "#fafafa",
            dark: "#1e293b",
          },
          tertiary: {
            light: "#f5f5f5",
            dark: "#334155",
          },
          card: {
            light: "#ffffff",
            dark: "#1e293b",
          },
        },
        // 文字颜色
        text: {
          primary: {
            light: "#1f2937",
            dark: "#f8fafc",
          },
          secondary: {
            light: "#6b7280",
            dark: "#cbd5e1",
          },
          tertiary: {
            light: "#9ca3af",
            dark: "#94a3b8",
          },
          link: {
            light: "#0ea5e9",
            dark: "#60a5fa",
          },
          linkHover: {
            light: "#0284c7",
            dark: "#3b82f6",
          },
        },
        // 边框色
        border: {
          primary: {
            light: "#e5e7eb",
            dark: "#334155",
          },
          secondary: {
            light: "#d1d5db",
            dark: "#475569",
          },
          tertiary: {
            light: "#f3f4f6",
            dark: "#64748b",
          },
        },
        // 状态色
        status: {
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
        // Typo 主题特定颜色
        typo: {
          light: {
            font: "#252525",
            fontSecondary: "#5A5A5A",
            fontExtra: "#969696",
            background: "#fff",
            hr: "#e8e8e8",
            active: "#0ea5e9",
            unactive: "#969696",
            listItem: "#f7f7f7",
            codeBlock: "#f7f7f7",
          },
          dark: {
            font: "#fff",
            fontSecondary: "#c9c9c9",
            fontExtra: "#969696",
            background: "#3b3e4a",
            hr: "#585c69",
            active: "#60a5fa",
            unactive: "#969696",
            listItem: "#4a4d59",
            codeBlock: "#4a4d59",
          },
        },
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        montserrat: [
          '"Montserrat"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'Consolas',
          '"Liberation Mono"',
          'Menlo',
          'Courier',
          'monospace',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
