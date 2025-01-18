import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import useTaskStore from '../store/taskStore'

const AddTaskForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Personal')
  const theme = useTheme()
  const addTask = useTaskStore((state) => state.addTask)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting task:', { title, category }) // Debug log
    
    if (!title.trim()) {
      console.log('Title is empty, not submitting') // Debug log
      return
    }

    const newTask = {
      title: title.trim(),
      category
    }

    console.log('Adding task:', newTask) // Debug log
    addTask(newTask)
    
    setTitle('')
    setCategory('Personal')
    setIsOpen(false)
  }

  return (
    <div className="mb-8">
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className={`w-full px-6 py-3 rounded-xl ${theme.buttonBg} ${theme.buttonHover} transition-all duration-300 shadow-md flex items-center justify-center space-x-2 ${theme.textPrimary}`}
        >
          <span>✨</span>
          <span>Add New Task</span>
        </motion.button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className={`${theme.cardBg} rounded-xl p-6 shadow-lg`}
        >
          <div className="space-y-4">
            <div>
              <label className={`block mb-2 ${theme.textPrimary}`}>Task Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300"
                placeholder="What do you need to do?"
                autoFocus
              />
            </div>

            <div>
              <label className={`block mb-2 ${theme.textPrimary}`}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/90 border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-300"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="School">School</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                className={`flex-1 px-6 py-2 rounded-lg ${theme.buttonBg} ${theme.buttonHover} transition-all duration-300 shadow-md ${theme.textPrimary}`}
              >
                Add Task ✨
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.form>
      )}
    </div>
  )
}

export default AddTaskForm
