import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getToken, fetchAdminSession, clearToken } from '../utils/adminApi.js';
import AdminLogin from './AdminLogin.jsx';
import AdminOrders from './AdminOrders.jsx';

// Root of the /admin route. Restores an existing session on load (handoff
// checklist item: "Call GET /api/admin/me when restoring an existing admin
// session"), otherwise shows the login screen.
export default function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (!getToken()) {
        setCheckingSession(false);
        return;
      }
      try {
        const sessionAdmin = await fetchAdminSession();
        setAdmin(sessionAdmin);
      } catch {
        clearToken();
      } finally {
        setCheckingSession(false);
      }
    }
    restoreSession();
  }, []);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onLoggedIn={setAdmin} />;
  }

  return <AdminOrders admin={admin} onLoggedOut={() => setAdmin(null)} />;
}
