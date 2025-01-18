import useTaskStore from '../store/taskStore'

// Temporary solution without sound files
export const playSound = (soundName) => {
  const soundEnabled = useTaskStore.getState().soundEnabled
  if (soundEnabled) {
    // Just console log for now
    console.log(`Playing sound: ${soundName}`)
  }
}
