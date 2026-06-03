'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />
      {/* Card */}
      <div className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Login</h1>

          <p className="text-gray-400 mt-2 text-sm">
            Login to manage your portfolio
          </p>
        </div>
        {state?.errors?.global && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm p-3 rounded-xl">
            {state.errors.global}
          </div>
        )}
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                name="email"
                type="email"
                placeholder="admin@gmail.com"
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 transition-all"
              />
              {state?.errors?.email && (
                <p className="text-red-400 text-xs mt-1.5 ml-1">
                  {state.errors.email}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Password</label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 focus:border-blue-500 outline-none rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 transition-all"
              />
              {state?.errors?.password && (
                <p className="text-red-400 text-xs mt-1.5 ml-1">
                  {state.errors.password}
                </p>
              )}
            </div>
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 py-3 rounded-xl font-semibold text-white transition-colors"
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
