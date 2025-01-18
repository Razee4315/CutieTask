import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Transition } from '@headlessui/react'
import useTaskStore from '../store/taskStore'
import { useTheme } from '../contexts/ThemeContext'

const themes = [
  { 
    id: 'pink', 
    name: 'Pink Paradise', 
    emoji: '🌸',
    description: 'Sweet and dreamy pink theme',
    preview: ['#FDE2E4', '#FFAFCC', '#FF8DC7']
  },
  { 
    id: 'mint', 
    name: 'Mint Dream', 
    emoji: '🌿',
    description: 'Fresh and calming mint theme',
    preview: ['#B9FBC0', '#98F5E1', '#7DDCD3']
  },
  { 
    id: 'lavender', 
    name: 'Lovely Lavender', 
    emoji: '💜',
    description: 'Soft and soothing lavender theme',
    preview: ['#E2E0FF', '#DCD6F7', '#A6B1E1']
  },
  { 
    id: 'peach', 
    name: 'Peachy Keen', 
    emoji: '🍑',
    description: 'Warm and cozy peach theme',
    preview: ['#FFE5D9', '#FFD7BA', '#FEC89A']
  }
]

const ThemeSelector = () => {
  const currentTheme = useTaskStore(state => state.theme)
  const setTheme = useTaskStore(state => state.setTheme)
  const theme = useTheme()

  const handleThemeChange = (themeId) => {
    setTheme(themeId)
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <div className="relative">
          {themes.find(t => t.id === currentTheme)?.emoji}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cutie-peach"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
          <div className="p-2">
            {themes.map((themeOption, index) => (
              <Menu.Item key={themeOption.id}>
                {({ active }) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeChange(themeOption.id)}
                    className={`
                      w-full flex items-center p-3 rounded-xl transition-all duration-300
                      ${currentTheme === themeOption.id ? 'bg-gray-100' : 'hover:bg-gray-50'}
                    `}
                  >
                    <span className="text-xl mr-3">{themeOption.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-left">
                        {themeOption.name}
                      </p>
                      <p className="text-sm text-gray-500 text-left">
                        {themeOption.description}
                      </p>
                    </div>
                    <div className="flex space-x-1 ml-3">
                      {themeOption.preview.map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ThemeSelector
