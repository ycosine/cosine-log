'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { HiSun, HiMoon } from 'react-icons/hi'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        relative inline-flex h-10 w-10 items-center justify-center 
        rounded-lg border border-gray-200 bg-white text-gray-700
        transition-all duration-200 ease-in-out
        hover:bg-gray-50 hover:border-gray-300
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300
        dark:hover:bg-gray-700 dark:hover:border-gray-600
        dark:focus:ring-blue-400
      "
      aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
    >
      <span className="sr-only">
        {theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
      </span>
      
      {/* Sun icon for light mode */}
      <HiSun 
        className={`
          absolute h-5 w-5 transition-all duration-300 ease-in-out
          ${theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
          }
        `}
      />
      
      {/* Moon icon for dark mode */}
      <HiMoon 
        className={`
          absolute h-5 w-5 transition-all duration-300 ease-in-out
          ${theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
          }
        `}
      />
    </button>
  )
}