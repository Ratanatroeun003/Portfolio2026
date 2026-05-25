import Navbar from '@/components/admin/Navbar';
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Navbar />

      <main className="flex-1 p-6 md:ml-0 mt-16 md:mt-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
