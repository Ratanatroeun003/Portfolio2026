import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProjectList from '@/components/admin/ProjectList';
const ProjectsPage = async () => {
  const data = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-white">All Projects</h1>
          <p className="text-sm text-gray-400 mt-0.5">{data.length}</p>
        </div>
        <Link
          href="/admin/projects/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + New Project
        </Link>
      </div>
      {/* Table */}
      <ProjectList data={data} />
    </div>
  );
};

export default ProjectsPage;
