'use client';

import Link from 'next/link';
import { Code, Mail, ArrowUp } from 'lucide-react';
import { BiLogoTelegram } from 'react-icons/bi';
import { FaFacebookMessenger } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              Ratana
              <span className="text-blue-400"> Troeun</span>
            </h2>

            <p className="text-gray-400 mt-2 text-sm max-w-md">
              Full Stack Developer passionate about building modern web
              applications and beautiful user experiences.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/"
              target="_blank"
              className="bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 p-3 rounded-xl text-gray-300 hover:text-blue-400 transition-all duration-300"
            >
              <Code size={20} />
            </Link>

            <Link
              href="https://facebook.com/"
              target="_blank"
              className="bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 p-3 rounded-xl text-gray-300 hover:text-blue-400 transition-all duration-300"
            >
              <FaFacebookMessenger size={20} />
            </Link>

            <Link
              href="https://t.me/"
              target="_blank"
              className="bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 p-3 rounded-xl text-gray-300 hover:text-blue-400 transition-all duration-300"
            >
              <BiLogoTelegram size={20} />
            </Link>

            <Link
              href="mailto:your@email.com"
              className="bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 p-3 rounded-xl text-gray-300 hover:text-blue-400 transition-all duration-300"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Ratana Troeun. All rights reserved.
          </p>

          {/* Back To Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
          >
            <ArrowUp size={16} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
