'use client';

import { motion, type Variants } from 'framer-motion';

interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.2, staggerChildren: 0.2 },
  },
};

const leftImageVariants: Variants = {
  initial: { rotate: 0, x: 0, y: 0 },
  animate: {
    rotate: -8, x: -150, y: 10,
    transition: { type: 'spring', stiffness: 120, damping: 12 },
  },
  hover: {
    rotate: 1, x: -160, y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

const middleImageVariants: Variants = {
  initial: { rotate: 0, x: 0, y: 0 },
  animate: {
    rotate: 6, x: 0, y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 12 },
  },
  hover: {
    rotate: 0, x: 0, y: -10,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

const rightImageVariants: Variants = {
  initial: { rotate: 0, x: 0, y: 0 },
  animate: {
    rotate: -6, x: 200, y: 20,
    transition: { type: 'spring', stiffness: 120, damping: 12 },
  },
  hover: {
    rotate: 3, x: 200, y: 10,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

export default function ImageReveal({ leftImage, middleImage, rightImage }: ImageRevealProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-64 h-64 my-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="absolute w-48 h-48 origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
        variants={leftImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 30 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={leftImage} alt="" aria-hidden="true" className="object-cover w-full h-full p-2 rounded-xl" loading="lazy" />
      </motion.div>

      <motion.div
        className="absolute w-48 h-48 origin-bottom-left overflow-hidden rounded-xl shadow-lg bg-white"
        variants={middleImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 20 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={middleImage} alt="" aria-hidden="true" className="object-cover w-full h-full p-2 rounded-2xl" loading="lazy" />
      </motion.div>

      <motion.div
        className="absolute w-48 h-48 origin-bottom-right overflow-hidden rounded-xl shadow-lg bg-white"
        variants={rightImageVariants}
        whileHover="hover"
        animate="animate"
        style={{ zIndex: 10 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={rightImage} alt="" aria-hidden="true" className="object-cover w-full h-full p-2 rounded-2xl" loading="lazy" />
      </motion.div>
    </motion.div>
  );
}
