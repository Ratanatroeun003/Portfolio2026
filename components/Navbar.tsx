'use client';
import { useState, useEffect } from 'react';
import {
  Home,
  User,
  FolderOpen,
  Mail,
  Menu,
  X,
  ShieldUser,
} from 'lucide-react';
import Link from 'next/link'; // 🔑 ត្រូវ import នេះដើម្បីធ្វើលីងទៅកាន់ទំព័រ admin

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // ពិនិត្យ Section ណាដែល Active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full border-b border-blue-500/30 bg-gray-900/90 backdrop-blur-sm text-white z-50">
      {/* កំណត់ទំហំរត់កណ្តាលអេក្រង់ធំ */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🏷️ ១. Logo ផ្នែកខាងឆ្វេង */}
        <button
          onClick={() => scrollTo('home')}
          className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-80 transition"
        >
          My Portfolio
        </button>

        {/* 💻 ២. ម៉ឺនុយសម្រាប់អេក្រង់កុំព្យូទ័រ (Desktop Menu) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  active === id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* 🔑 ប៊ូតុង Admin សម្រាប់អេក្រង់ Desktop (លេងម៉ូត Icon ស្រស់ស្អាត) */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
            title="Go to Admin Panel"
          >
            <ShieldUser size={14} />
            <span>Admin only</span>
          </Link>
        </div>
        <div className="flex md:hidden items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="text-blue-400 hover:text-blue-300 transition"
            title="Admin Panel"
          >
            <ShieldUser size={22} />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 ៤. ផ្ទាំងទម្លាក់ចុះលើទូរស័ព្ទ (Mobile Menu Dropdown) */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen
            ? 'max-h-80 opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 pb-6 gap-2 bg-gray-950 border-b border-blue-600/40">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                active === id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}

          {/* បន្ថែមលីង Admin មួយជួរទៀតក្នុង Mobile Menu ដើម្បីឱ្យងាយស្រួលចុច */}
          <Link
            href="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium bg-gray-900 border border-gray-800 text-blue-400 hover:bg-gray-800 transition-all duration-300 mt-2"
          >
            <ShieldUser size={18} />
            <span>Admin only</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
