import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import EditProjectForm from '@/components/admin/EditProjectForm';

import { updateProject } from '../../_action';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditProjectPage = async ({ params }: Props) => {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Edit Project</h1>

          <p className="text-sm text-gray-400 mt-1">
            Update your portfolio project
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back
        </Link>
      </div>

      <EditProjectForm project={project} updateProject={updateProject} />
    </div>
  );
};

export default EditProjectPage;
