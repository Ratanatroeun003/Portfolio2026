'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGithub, FaTelegram } from 'react-icons/fa';
import { Mail } from 'lucide-react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col pt-16 md:flex-row items-center justify-between gap-8"
    >
      {/* Profile Image - ផ្នែកឆ្វេង */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center min-h-[40vh] md:min-h-screen transition-all duration-700 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="relative group">
          {/* Bottom Right Border */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border-r-4 border-b-4 border-blue-500 rounded-br-[40px] transition-all duration-500 group-hover:-bottom-2 group-hover:-right-2" />

          {/* Main Card */}
          <div className="relative overflow-hidden">
            {/* Glow Effect */}
            {/* <div className="absolute inset-0 bg-blue-500/10 blur-3xl opacity-60" /> */}

            {/* Image */}
            <Image
              className="
          object-contain
          p-6
          relative
          z-10
          w-[240px]
          h-[240px]
          sm:w-[300px]
          sm:h-[300px]
          md:w-[340px]
          md:h-[340px]
          transition-transform
          duration-500
          group-hover:scale-105
        "
              src="/canvas.png"
              alt="Profile Image"
              priority
              width={340}
              height={340}
            />
          </div>
        </div>
      </div>

      {/* Text Content - ផ្នែកស្តាំ */}
      <div
        className={`w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start justify-center px-6 md:px-12 pb-12 md:pb-0 text-center md:text-left transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        {/* Welcome Text */}
        <p className="text-blue-400 text-sm sm:text-base uppercase tracking-widest font-semibold">
          Welcome to my portfolio
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
          Hello, I am <span className="text-blue-400">Developer</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg md:text-xl">
          Full Stack Developer | Next.js | React | MySQL
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-blue-400 rounded-full" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
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
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mt-2">
          <a
            href="https://github.com/Ratanatroeun003"
            target="_blank"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <FaGithub size={20} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="https://t.me/TroeunRatana"
            target="_blank"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <FaTelegram size={20} />
            <span className="hidden sm:inline">Telegram</span>
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="mailto:troeunratana@gmail.com"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <Mail size={20} />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}
