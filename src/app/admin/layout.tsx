"use client"

import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AdminNavbar from '@/components/AdminNavbar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Don't show navbar on login page
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <AdminNavbar onLogout={handleLogout} />}
      <main className={!isLoginPage ? "lg:pt-0" : ""}>
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AdminLayoutContent>
          {children}
        </AdminLayoutContent>
      </AuthProvider>
    </LanguageProvider>
  );
}
