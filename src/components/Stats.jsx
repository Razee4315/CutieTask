import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import useTaskStore from '../store/taskStore'
import { useTheme } from '../contexts/ThemeContext'

const Stats = () => {
  const tasks = useTaskStore(state => state.tasks)
  const theme = useTheme()
  
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    byCategory: tasks.reduce((acc, task) => {
      acc[task.category] = acc[task.category] || { total: 0, completed: 0 }
      acc[task.category].total++
      if (task.completed) acc[task.category].completed++
      return acc
    }, {})
  }

  const completionRate = stats.total === 0 ? 0 : (stats.completed / stats.total) * 100

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const getMotivationalMessage = () => {
    if (stats.total === 0) return "Start adding tasks to track your progress! ✨"
    if (completionRate === 100) return "Amazing job! All tasks completed! 🎉"
    if (completionRate >= 75) return "Almost there! Keep going! 💪"
    if (completionRate >= 50) return "Halfway there! You're doing great! 🌟"
    if (completionRate >= 25) return "Good progress! Keep up the momentum! 🚀"
    return "Every small step counts! You've got this! 💫"
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-patrick ${theme.textPrimary}`}>📊 Your Progress</h2>
        <p className={theme.textSecondary}>Keep track of your productivity!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <motion.div
          variants={statCardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`${theme.cardBg} p-6 rounded-xl shadow-md flex flex-col items-center`}
        >
          <div className="w-32 h-32 mb-4">
            <CircularProgressbar
              value={completionRate}
              text={`${Math.round(completionRate)}%`}
              styles={buildStyles({
                textColor: theme.accent,
                pathColor: theme.accent,
                trailColor: theme.progressTrail
              })}
            />
          </div>
          <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>Overall Progress</h3>
          <p className={`${theme.textSecondary} text-sm mt-2`}>
            {stats.completed} of {stats.total} tasks completed
          </p>
        </motion.div>

        {/* Quick Facts */}
        <motion.div
          variants={statCardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className={`${theme.cardBg} p-6 rounded-xl shadow-md`}
        >
          <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>Quick Facts ✨</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className={theme.textSecondary}>Total Tasks</span>
              <span className={`font-medium ${theme.textPrimary}`}>{stats.total}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className={theme.textSecondary}>Completed</span>
              <span className={`font-medium ${theme.textPrimary}`}>{stats.completed}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className={theme.textSecondary}>Pending</span>
              <span className={`font-medium ${theme.textPrimary}`}>{stats.pending}</span>
            </li>
          </ul>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          variants={statCardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className={`${theme.cardBg} p-6 rounded-xl shadow-md`}
        >
          <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-4`}>Category Breakdown 📊</h3>
          <div className="space-y-4">
            {Object.entries(stats.byCategory).map(([category, data]) => {
              const percentage = (data.completed / data.total) * 100
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between">
                    <span className={theme.textSecondary}>{category}</span>
                    <span className={`font-medium ${theme.textPrimary}`}>
                      {data.completed}/{data.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-center ${theme.textSecondary} mt-6`}
      >
        {getMotivationalMessage()}
      </motion.div>
    </div>
  )
}

export default Stats
