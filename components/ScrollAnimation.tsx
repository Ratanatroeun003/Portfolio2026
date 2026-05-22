'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ScrollAnimation({
  children,
  delay = 0,
  direction = 'up',
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
