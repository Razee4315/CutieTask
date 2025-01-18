import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskList from './components/TaskList'
import AddTaskForm from './components/AddTaskForm'
import Header from './components/Header'
import RewardGallery from './components/RewardGallery'
import ThemeSelector from './components/ThemeSelector'
import Stats from './components/Stats'
import useTaskStore from './store/taskStore'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { playSound } from './utils/soundManager'

function AppContent() {
  const [view, setView] = useState('tasks') // tasks, rewards, stats
  const theme = useTheme()
  const soundEnabled = useTaskStore(state => state.soundEnabled)
  const toggleSound = useTaskStore(state => state.toggleSound)

  const handleViewChange = (newView) => {
    setView(newView)
    playSound('click')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="fixed top-4 right-4 space-x-4 flex items-center">
          <ThemeSelector />
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full ${theme.cardBg} ${theme.buttonHover} transition-all duration-300 shadow-md`}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => handleViewChange('tasks')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              view === 'tasks' ? theme.buttonBg : 'bg-white/50'
            } ${theme.buttonHover} ${theme.textPrimary} flex items-center space-x-2`}
          >
            <span>📝</span>
            <span>Tasks</span>
          </button>
          <button
            onClick={() => handleViewChange('rewards')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              view === 'rewards' ? theme.buttonBg : 'bg-white/50'
            } ${theme.buttonHover} ${theme.textPrimary} flex items-center space-x-2`}
          >
            <span>🌟</span>
            <span>Rewards</span>
          </button>
          <button
            onClick={() => handleViewChange('stats')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              view === 'stats' ? theme.buttonBg : 'bg-white/50'
            } ${theme.buttonHover} ${theme.textPrimary} flex items-center space-x-2`}
          >
            <span>📊</span>
            <span>Stats</span>
          </button>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {view === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <AddTaskForm />
              <TaskList />
            </motion.div>
          )}

          {view === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RewardGallery />
            </motion.div>
          )}

          {view === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Stats />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
