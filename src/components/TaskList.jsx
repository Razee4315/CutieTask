import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTaskStore from '../store/taskStore'
import TaskItem from './TaskItem'
import { useTheme } from '../contexts/ThemeContext'

const TaskList = () => {
  const tasks = useTaskStore(state => state.tasks)
  console.log('TaskList: Current tasks:', tasks) // Debug log
  
  const toggleTask = useTaskStore(state => state.toggleTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const theme = useTheme()

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAndSortedTasks = useMemo(() => {
    console.log('TaskList: Filtering and sorting tasks') // Debug log
    let result = [...tasks]

    // Filter tasks
    if (filter === 'completed') {
      result = result.filter(task => task.completed)
    } else if (filter === 'active') {
      result = result.filter(task => !task.completed)
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      )
    }

    // Sort tasks
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'category':
          return a.category.localeCompare(b.category)
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    console.log('TaskList: Filtered and sorted tasks:', result) // Debug log
    return result
  }, [tasks, filter, sortBy, searchQuery])

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-200 
            focus:border-gray-300 focus:ring-2 focus:ring-gray-200 outline-none 
            transition-all duration-300 ${theme.textPrimary}`}
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              filter === 'all'
                ? `${theme.buttonBg} ${theme.textPrimary}`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              filter === 'active'
                ? `${theme.buttonBg} ${theme.textPrimary}`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              filter === 'completed'
                ? `${theme.buttonBg} ${theme.textPrimary}`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`ml-auto px-4 py-2 rounded-lg bg-white/90 border border-gray-200 
              focus:border-gray-300 focus:ring-2 focus:ring-gray-200 outline-none 
              transition-all duration-300 ${theme.textPrimary}`}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="category">By Category</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <AnimatePresence mode="popLayout">
        {filteredAndSortedTasks.length > 0 ? (
          <motion.div
            layout
            className="space-y-4"
          >
            {filteredAndSortedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center py-8 ${theme.textSecondary}`}
          >
            {searchQuery
              ? "No tasks found matching your search 🔍"
              : filter === 'completed'
              ? "No completed tasks yet. Keep going! 💪"
              : filter === 'active'
              ? "No active tasks. Time to add some! ✨"
              : "No tasks yet. Let's add some! ✨"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskList
