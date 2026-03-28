import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
  variant?: 'fadeInUp' | 'slideInLeft' | 'slideInRight'
}

export function ScrollReveal({ children, delay = 0, variant = 'fadeInUp' }: ScrollRevealProps) {
  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants[variant]}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    >
      {children}
    </motion.div>
  )
}
