import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      theme: 'pink',
      soundEnabled: true,

      addTask: (task) => {
        console.log('Store: Adding task:', task) // Debug log
        if (!task.title.trim()) {
          console.log('Store: Empty title, not adding') // Debug log
          return
        }

        set((state) => {
          console.log('Store: Current state:', state) // Debug log
          const newTask = {
            id: Date.now(),
            title: task.title.trim(),
            category: task.category || 'Personal',
            completed: false,
            createdAt: new Date().toISOString()
          }
          console.log('Store: Created new task:', newTask) // Debug log
          
          const newTasks = [...state.tasks, newTask]
          console.log('Store: New tasks array:', newTasks) // Debug log
          
          return { tasks: newTasks }
        })
      },

      toggleTask: (taskId) => 
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          )
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== taskId)
        })),

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'cutie-task-storage',
      getStorage: () => localStorage,
    }
  )
)

export default useTaskStore