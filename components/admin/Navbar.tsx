'use client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Menu,
  Home,
  X,
  LogOut,
} from 'lucide-react';

const Navbar = () => {
  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { href: '/admin/messages', label: 'Messages', icon: Mail },
    { href: '/', label: 'Home', icon: Home },
  ];

  const pathname = usePathname();
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
          fixed md:sticky md:top-0
          top-0 left-0 z-50
          w-72 h-screen flex-shrink-0
          bg-gray-950 border-r border-white/10
          p-6 flex flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 mt-2">
          <div className="bg-blue-500 p-2 rounded-xl">
            <LayoutDashboard size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Admin Panel</h1>
            <p className="text-gray-400 text-sm">Portfolio Dashboard</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-3 flex-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`transition-transform duration-200
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  `}
                />
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </>
  );
};

export default Navbar;
