import  { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedWrapperProps {
  children: ReactNode
  delay?: number
}

export const AnimatedTop: React.FC<AnimatedWrapperProps> = ({ children, delay = 0.3 }) => (
  <motion.div
    style={{
      height: '100%'
    }}
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
)

export const AnimatedBottom: React.FC<AnimatedWrapperProps> = ({ children, delay = 0.3 }) => (
  <motion.div
    style={{
      height: '100%'
    }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
)

export const AnimatedLeft: React.FC<AnimatedWrapperProps> = ({ children, delay = 0.3 }) => (
  <motion.div
    style={{
      height: '100%'
    }}
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
)

export const AnimatedRight: React.FC<AnimatedWrapperProps> = ({ children, delay = 0.3 }) => (
  <motion.div
    style={{
      height: '100%'
    }}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay }}
  >
    {children}
  </motion.div>
)
