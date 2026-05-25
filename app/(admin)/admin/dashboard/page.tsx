import DashboardCard from '@/components/admin/DashboardCard';
import { prisma } from '@/lib/prisma';
export default async function DashboardPage() {
  const [projectCount, messageCount] = await Promise.all([
    prisma.project.count(),
    prisma.message.count({ where: { read: false } }),
  ]);
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          label="Total Projects"
          value={projectCount}
          note="+2 this month"
          color="text-green-400"
        />
        <DashboardCard
          label="Messages"
          value={messageCount}
          note="Unread"
          color="text-red-400"
        />
      </div>
    </div>
  );
}
