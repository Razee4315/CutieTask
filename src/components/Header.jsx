import { motion } from 'framer-motion'

const Header = () => {
  const quotes = [
    "✨ Every small task completed is progress made!",
    "🌸 You're doing amazing, keep going!",
    "🌟 Today is a perfect day to be productive!",
    "🎀 Small steps lead to big achievements!",
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <header className="text-center mb-12">
      <motion.h1 
        className="text-4xl font-patrick text-gray-800 mb-4"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ✨ CutieTask ✨
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {randomQuote}
      </motion.p>
    </header>
  )
}

export default Header
