import React, { useState } from 'react';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';
import { adminLogin } from '../utils/adminApi.js';

export default function AdminLogin({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const data = await adminLogin(username, password);
      onLoggedIn(data.admin);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm glass-card rounded-2xl p-8 space-y-5"
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-brand-red/20 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-brand-red" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-white">Max Pizza Hub Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Order management dashboard</p>
        </div>

        {error && (
          <div role="alert" className="p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label htmlFor="admin-username" className="block text-xs font-semibold text-gray-300 mb-1">
            Username
          </label>
          <input
            id="admin-username"
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-xs font-semibold text-gray-300 mb-1">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-red hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
          <span>{isSubmitting ? 'Signing in…' : 'Sign In'}</span>
        </button>
      </form>
    </div>
  );
}
