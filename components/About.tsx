'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Code,
  Database,
  Server,
  Palette,
  GitBranch,
  Container,
  Globe,
  Terminal,
} from 'lucide-react';

const skills = [
  { name: 'Next.js', icon: Globe },
  { name: 'React', icon: Code },
  { name: 'TypeScript', icon: Terminal },
  { name: 'MySQL', icon: Database },
  { name: 'Prisma', icon: Server },
  { name: 'Docker', icon: Container },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'Git', icon: GitBranch },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className={`min-h-screen flex flex-col justify-center px-4 py-24 bg-gray-900 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          ABOUT <span className="text-blue-400">ME</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          តោះស្គាល់ខ្ញុំបន្តិច!
        </p>
        <div className="w-16 h-1 bg-blue-400 rounded-full mx-auto mt-4" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Info */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Full Stack Developer 👋
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            ខ្ញុំជា Full Stack Developer មានបទពិសោធន៍ ក្នុងការបង្កើត Web
            Application ទំនើប។
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            ខ្ញុំចូលចិត្តរៀនបច្ចេកវិទ្យាថ្មីៗ និងដោះស្រាយបញ្ហាដ៏ស្មុគស្មាញ។
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-2">
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Experience', value: '0' },
              { label: 'Clients', value: '0' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700"
              >
                <p className="text-blue-400 text-xl sm:text-2xl font-bold">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Skills */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-white">
            Skills
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {skills.map(({ name, icon: Icon }, index) => (
              <div
                key={name}
                style={{ transitionDelay: `${index * 80}ms` }}
                className={`flex items-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 px-4 py-3 rounded-xl transition-all duration-500 ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Icon size={16} className="text-blue-400" />
                </div>
                <span className="text-white text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
