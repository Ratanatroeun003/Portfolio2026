'use client';
import {
  Edit,
  Trash2,
  ExternalLink,
  FolderKanban,
  Loader2,
} from 'lucide-react';
import type { Project } from '@prisma/client';
import { deleteProject } from '@/app/actions/project';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import Image from 'next/image';

type Props = {
  data: Project[];
};

const ProjectList = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    const isConfirm = confirm(
      'Are you sure you want to delete this project? This action cannot be undone.',
    );
    if (isConfirm) {
      setDeletingId(id);
      startTransition(async () => {
        try {
          await deleteProject(id);
        } catch (error) {
          console.error('Failed to delete project:', error);
          alert('ការលុបគម្រោងមានបញ្ហា!');
        } finally {
          setDeletingId(null);
        }
      });
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="text-left px-6 py-3 text-gray-400 font-medium">
                Project
              </th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium">
                Description
              </th>
              <th className="text-left px-4 py-3 text-gray-400 font-medium">
                Links
              </th>
              <th className="text-right px-6 py-3 text-gray-400 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <FolderKanban size={36} className="mb-3 opacity-30" />
                    <p className="text-sm">no project</p>
                    <Link
                      href="/admin/projects/create"
                      className="mt-3 text-xs text-blue-400 hover:underline"
                    >
                      + create first
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((project) => {
                const isCurrentDeleting =
                  isPending && deletingId === project.id;

                return (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={48}
                            height={48}
                            className="object-contain w-12 h-12 rounded-full p-1 border border-white/10 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-700 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <FolderKanban size={16} className="text-gray-500" />
                          </div>
                        )}
                        <span className="font-medium text-white truncate max-w-[180px]">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    {/* Description */}
                    <td className="px-4 py-4 max-w-[200px]">
                      <p className="text-gray-400 text-xs truncate">
                        {project.description}
                      </p>
                    </td>

                    {/* Links */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3 text-xs">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 hover:underline flex items-center gap-1"
                          >
                            GitHub <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            Demo <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          disabled={isPending}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {isCurrentDeleting ? (
                            <Loader2
                              size={16}
                              className="animate-spin text-red-400"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
