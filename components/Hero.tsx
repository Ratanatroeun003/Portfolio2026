'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaTelegram } from 'react-icons/fa';
import { Mail } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col pt-16 md:flex-row items-center justify-between gap-8"
    >
      {/* Profile Image - ផ្នែកឆ្វេង */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex items-center justify-center min-h-[40vh] md:min-h-screen"
      >
        <div className="relative group">
          {/* Bottom Right Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -bottom-4 -right-4 w-full h-full border-r-4 border-b-4 border-blue-500 rounded-br-[40px] transition-all duration-500 group-hover:-bottom-2 group-hover:-right-2"
          />

          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <Image
              className="object-contain p-6 relative z-10 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px]"
              src="/github.png"
              alt="Profile Image"
              priority
              width={340}
              height={340}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content - ផ្នែកស្តាំ */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start justify-center px-6 md:px-12 pb-12 md:pb-0 text-center md:text-left"
      >
        {/* Welcome Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-blue-400 text-sm sm:text-base uppercase tracking-widest font-semibold"
        >
          Welcome to my portfolio
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
        >
          Hello, I am <span className="text-blue-400">Developer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 text-base sm:text-lg md:text-xl"
        >
          Full Stack Developer | Next.js | React | MySQL
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="h-1 bg-blue-400 rounded-full"
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="w-full sm:w-auto border border-blue-500 hover:bg-blue-600 px-6 py-3 rounded-md font-semibold transition-colors text-white"
          >
            View My Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto border border-blue-500 hover:bg-blue-500 px-6 py-3 rounded-md font-semibold transition-colors text-white"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex items-center gap-4 mt-2"
        >
          <a
            href="https://github.com/Ratanatroeun003"
            target="_blank"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <FaGithub
              size={25}
              className="border p-1 border-blue-600 rounded-full"
            />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="https://t.me/TroeunRatana"
            target="_blank"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <FaTelegram
              size={25}
              className="border p-1 border-blue-600 rounded-full"
            />
            <span className="hidden sm:inline">Telegram</span>
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="mailto:troeunratana@gmail.com"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <Mail
              size={25}
              className="border p-1 border-blue-600 rounded-full"
            />
            <span className="hidden sm:inline">Email</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
