import Navbar from '@/components/admin/Navbar';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Navbar session={session} />
      <main className="flex-1 p-6 md:ml-0 mt-16 md:mt-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
