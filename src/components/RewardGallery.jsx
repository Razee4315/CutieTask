import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import useTaskStore from '../store/taskStore'

const achievements = [
  {
    id: 1,
    name: 'First Step',
    emoji: '🌱',
    description: 'Complete your first task',
    requirement: tasks => tasks.filter(t => t.completed).length >= 1,
    background: 'from-green-100 to-green-50'
  },
  {
    id: 2,
    name: 'Task Master',
    emoji: '⭐',
    description: 'Complete 5 tasks',
    requirement: tasks => tasks.filter(t => t.completed).length >= 5,
    background: 'from-yellow-100 to-yellow-50'
  },
  {
    id: 3,
    name: 'Productivity Queen',
    emoji: '👑',
    description: 'Complete 10 tasks',
    requirement: tasks => tasks.filter(t => t.completed).length >= 10,
    background: 'from-purple-100 to-purple-50'
  },
  {
    id: 4,
    name: 'Super Organizer',
    emoji: '🌟',
    description: 'Create tasks in 3 different categories',
    requirement: tasks => new Set(tasks.map(t => t.category)).size >= 3,
    background: 'from-blue-100 to-blue-50'
  },
  {
    id: 5,
    name: 'Daily Champion',
    emoji: '🏆',
    description: 'Complete 3 tasks in one day',
    requirement: tasks => {
      const today = new Date().toDateString()
      return tasks.filter(t => 
        t.completed && 
        new Date(t.completedAt).toDateString() === today
      ).length >= 3
    },
    background: 'from-pink-100 to-pink-50'
  },
  {
    id: 6,
    name: 'Theme Explorer',
    emoji: '🎨',
    description: 'Try all available themes',
    requirement: (_, state) => state.themesExplored?.size >= 4,
    background: 'from-indigo-100 to-indigo-50'
  }
]

const RewardGallery = () => {
  const tasks = useTaskStore(state => state.tasks)
  const themesExplored = useTaskStore(state => state.themesExplored)
  const theme = useTheme()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-2xl font-patrick ${theme.textPrimary}`}>
          🏆 Achievements Gallery
        </h2>
        <p className={theme.textSecondary}>
          Unlock achievements by completing tasks and exploring features!
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {achievements.map((achievement) => {
          const isUnlocked = achievement.requirement(tasks, { themesExplored })
          
          return (
            <motion.div
              key={achievement.id}
              variants={item}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${achievement.background} 
                p-6 shadow-lg transition-transform duration-300 hover:scale-105 
                ${isUnlocked ? 'opacity-100' : 'opacity-60'}`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{achievement.emoji}</span>
                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-green-600"
                    >
                      Unlocked!
                    </motion.div>
                  )}
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${theme.textPrimary}`}>
                  {achievement.name}
                </h3>
                
                <p className={`text-sm ${theme.textSecondary}`}>
                  {achievement.description}
                </p>

                {!isUnlocked && (
                  <div className="mt-4 flex items-center">
                    <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-white/20"
                      />
                    </div>
                    <span className="ml-2 text-sm opacity-75">Locked</span>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-white/10 rounded-full" />
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-center ${theme.textSecondary}`}
      >
        Keep going! You're doing amazing! ✨
      </motion.div>
    </div>
  )
}

export default RewardGallery
