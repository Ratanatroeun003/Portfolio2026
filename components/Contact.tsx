'use client';
import { useState } from 'react';

import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Send,
  CheckCircle,
} from 'lucide-react';
import { BiLogoTelegram } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center px-4 py-24"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          CONTACT <span className="text-blue-400">ME</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          មានសំណួរ? ផ្ញើសារមកខ្ញុំ!
        </p>
        <div className="w-16 h-1 bg-blue-400 rounded-full mx-auto mt-4" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Contact Info */}
        <div className="flex flex-col gap-6 justify-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            តោះទាក់ទងគ្នា!
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            ខ្ញុំរីករាយទទួលស្វាគមន៍សំណួរ ឬ ការស្នើសុំសហការគ្រប់ប្រភេទ។
          </p>

          {/* Info Items */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <FaFacebookF size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Facebook</p>
                <a
                  href="https://www.facebook.com/share/18dBc1vvT5/?mibextid=wwXIfr"
                  target="_blank"
                  className="text-white underline text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  ទ្រឿន​ រតនា
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Phone size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <a
                  className="text-white underline text-sm font-medium hover:text-blue-400 transition-colors"
                  href="tel:+855714407205"
                >
                  +855714407205
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <BiLogoTelegram size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Telegram</p>
                <a
                  className="text-white underline text-sm font-medium hover:text-blue-400 transition-colors"
                  href="https://t.me/TroeunRatana"
                >
                  https://t.me/TroeunRatana
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Mail size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <a
                  className="text-white underline text-sm font-medium hover:text-blue-400 transition-colors"
                  href="mailto:troeunratana@gmail.com"
                >
                  troeunratana@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <User size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Location</p>
                <p className="text-white text-sm font-medium">
                  Phnom Penh, Cambodia
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <MessageSquare size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Response Time</p>
                <p className="text-white text-sm font-medium">
                  Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-gray-800/50 rounded-2xl p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
              <CheckCircle size={60} className="text-green-400" />
              <p className="text-green-400 text-xl font-semibold text-center">
                បានផ្ញើជោគជ័យ! ✅
              </p>
              <p className="text-gray-400 text-sm text-center">
                ខ្ញុំនឹងឆ្លើយតបក្នុងពេលឆាប់ៗ!
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
              >
                ផ្ញើម្តងទៀត
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-700/50 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-sm transition-all"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-gray-700/50 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-sm transition-all"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute left-3 top-4 text-gray-500"
                  />
                  <textarea
                    placeholder="Your message..."
                    rows={4}
                    className="w-full bg-gray-700/50 pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-sm transition-all resize-none"
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 py-3 rounded-lg font-semibold transition-colors text-white mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    កំពុងផ្ញើ...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
