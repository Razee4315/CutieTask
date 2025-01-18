import { createContext, useContext } from 'react'
import useTaskStore from '../store/taskStore'

const themes = {
  pink: {
    primary: '#FDE2E4',
    secondary: '#FFAFCC',
    accent: '#FF8DC7',
    background: 'from-pink-200 via-pink-50 to-purple-100',
    buttonBg: 'bg-pink-100',
    buttonHover: 'hover:bg-pink-200',
    cardBg: 'bg-pink-50/80',
    borderColor: 'border-pink-200',
    textPrimary: 'text-pink-900',
    textSecondary: 'text-pink-600',
    progressBar: '#FF8DC7',
    progressTrail: '#FDE2E4'
  },
  mint: {
    primary: '#B9FBC0',
    secondary: '#98F5E1',
    accent: '#7DDCD3',
    background: 'from-green-200 via-green-50 to-blue-100',
    buttonBg: 'bg-green-100',
    buttonHover: 'hover:bg-green-200',
    cardBg: 'bg-green-50/80',
    borderColor: 'border-green-200',
    textPrimary: 'text-green-900',
    textSecondary: 'text-green-600',
    progressBar: '#7DDCD3',
    progressTrail: '#B9FBC0'
  },
  lavender: {
    primary: '#E2E0FF',
    secondary: '#DCD6F7',
    accent: '#A6B1E1',
    background: 'from-purple-200 via-purple-50 to-blue-100',
    buttonBg: 'bg-purple-100',
    buttonHover: 'hover:bg-purple-200',
    cardBg: 'bg-purple-50/80',
    borderColor: 'border-purple-200',
    textPrimary: 'text-purple-900',
    textSecondary: 'text-purple-600',
    progressBar: '#A6B1E1',
    progressTrail: '#E2E0FF'
  },
  peach: {
    primary: '#FFE5D9',
    secondary: '#FFD7BA',
    accent: '#FEC89A',
    background: 'from-orange-200 via-orange-50 to-yellow-100',
    buttonBg: 'bg-orange-100',
    buttonHover: 'hover:bg-orange-200',
    cardBg: 'bg-orange-50/80',
    borderColor: 'border-orange-200',
    textPrimary: 'text-orange-900',
    textSecondary: 'text-orange-600',
    progressBar: '#FEC89A',
    progressTrail: '#FFE5D9'
  }
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const currentTheme = useTaskStore(state => state.theme)
  const themeColors = themes[currentTheme]

  return (
    <ThemeContext.Provider value={themeColors}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
