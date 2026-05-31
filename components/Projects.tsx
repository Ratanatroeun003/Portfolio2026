// components/Projects.tsx
import { prisma } from '@/lib/prisma';
import { Code, ExternalLink, FolderOpen, FolderKanban } from 'lucide-react';
import Image from 'next/image';
export const dynamic = 'force-dynamic';
export default async function Projects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-4 py-24 bg-gray-900"
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          MY <span className="text-blue-400">PROJECTS</span>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Projects ដែលខ្ញុំបានបង្កើត
        </p>
        <div className="w-16 h-1 bg-blue-400 rounded-full mx-auto mt-4" />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto w-full">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <FolderOpen size={60} className="text-gray-600" />
            <p className="text-gray-500 text-lg">គ្មាន Project នៅឡើយ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-800 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-blue-500/50"
              >
                {/* Mac-style Header */}
                <div className="bg-gray-700/50 px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-400 text-xs truncate">
                    {project.title}
                  </span>
                </div>

                {/* Image */}
                <div className="relative overflow-hidden h-48 bg-gray-900">
                  {' '}
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className=" object-contain w-full group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FolderKanban size={40} className="text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  {/* Buttons */}
                  <div className="flex gap-3 mt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-white"
                      >
                        <Code size={14} />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-white"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
