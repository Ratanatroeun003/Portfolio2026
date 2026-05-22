'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-white/10 px-4 py-4 flex items-center justify-between">
        <h1 className="text-white font-bold text-lg">ADMIN</h1>

        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed md:static top-0 left-0 z-50
          w-72 min-h-screen bg-gray-950 border-r border-white/10
          p-6 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-500 p-2 rounded-xl">
            <LayoutDashboard size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-white font-bold text-xl">Admin Panel</h1>

            <p className="text-gray-400 text-sm">Portfolio Dashboard</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-3">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl transition-all"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/admin/projects"
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl transition-all"
          >
            <FolderKanban size={20} />
            Projects
          </Link>

          <Link
            href="/admin/messages"
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl transition-all"
          >
            <Mail size={20} />
            Messages
          </Link>
        </div>

        {/* Bottom */}
        <button className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </>
  );
};

export default Navbar;
