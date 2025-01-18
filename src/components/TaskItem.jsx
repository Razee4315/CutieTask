import { motion } from 'framer-motion'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../contexts/ThemeContext'

const TaskItem = ({ task, onToggle, onDelete }) => {
  const theme = useTheme()

  const handleToggle = () => {
    if (onToggle) {
      onToggle(task.id)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-xl ${theme.cardBg} shadow-md flex items-center justify-between transition-all duration-300`}
    >
      <div className="flex items-center flex-1">
        <button
          onClick={handleToggle}
          className={`relative w-6 h-6 mr-4 rounded-full border-2 transition-colors duration-300 
            ${task.completed ? theme.borderColor : 'border-gray-300'} 
            hover:border-opacity-100 hover:scale-110 transform`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0.5 rounded-full"
              style={{ backgroundColor: theme.accent }}
            >
              <motion.img
                src="/sparkles.svg"
                className="absolute -top-1 -right-1 w-4 h-4 animate-sparkle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          )}
        </button>

        <div className="flex-1">
          <h3 className={`text-lg transition-all duration-300 ${
            task.completed ? 'line-through text-gray-400' : theme.textPrimary
          }`}>
            {task.title}
          </h3>
          <p className={`text-sm ${theme.textSecondary}`}>
            {task.category} • {task.completed ? 'Completed' : 'In Progress'}
          </p>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className={`p-2 rounded-full hover:bg-red-100 group transition-all duration-300`}
      >
        <TrashIcon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
      </button>
    </motion.div>
  )
}

export default TaskItem
