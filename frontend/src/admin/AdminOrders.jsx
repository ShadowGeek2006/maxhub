import React, { useCallback, useEffect, useState } from 'react';
import { LogOut, RefreshCw, Search, ChevronLeft, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { fetchOrders, updateOrderStatus, adminLogout, ORDER_STATUSES } from '../utils/adminApi.js';

const STATUS_STYLES = {
  PENDING: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  PREPARING: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  READY: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  COMPLETED: 'bg-green-500/20 text-green-300 border-green-500/40',
  CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/40',
};

export default function AdminOrders({ admin, onLoggedOut }) {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0, totalPages: 1 });
  const [statusFilter, setStatusFilter] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchOrders({
        status: statusFilter || undefined,
        orderType: orderTypeFilter || undefined,
        search: search || undefined,
        page,
        pageSize: pagination.pageSize,
      });
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      // Handoff rule: treat 401 as an expired session and return to login.
      if (err.status === 401) {
        onLoggedOut();
        return;
      }
      setError(err.message || 'Failed to load orders.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, orderTypeFilter, search, pagination.pageSize]);

  useEffect(() => {
    loadOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, orderTypeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadOrders(1);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (err) {
      if (err.status === 401) {
        onLoggedOut();
        return;
      }
      setError(err.message || 'Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    adminLogout();
    onLoggedOut();
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <header className="border-b border-white/10 bg-dark-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Max Pizza Hub — Orders</h1>
            <p className="text-xs text-gray-400">Signed in as {admin?.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadOrders(pagination.page)}
              aria-label="Refresh orders"
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-300 border border-white/10"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-gray-300 border border-white/10 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-end">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <label htmlFor="order-search" className="sr-only">Search orders</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="order-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, order #"
                className="bg-dark-800 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white w-64 focus:outline-none focus:border-brand-red"
              />
            </div>
            <button type="submit" className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-xs font-semibold text-gray-300 hover:bg-dark-700">
              Search
            </button>
          </form>

          <div>
            <label htmlFor="status-filter" className="block text-[10px] text-gray-500 mb-1">Status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
            >
              <option value="">All statuses</option>
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type-filter" className="block text-[10px] text-gray-500 mb-1">Order type</label>
            <select
              id="type-filter"
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className="bg-dark-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
            >
              <option value="">All types</option>
              <option value="PICKUP">Pickup</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>
        </div>

        {error && (
          <div role="alert" className="p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Orders table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-dark-800/60 text-gray-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th scope="col" className="text-left px-4 py-3">Order #</th>
                  <th scope="col" className="text-left px-4 py-3">Customer</th>
                  <th scope="col" className="text-left px-4 py-3">Type</th>
                  <th scope="col" className="text-right px-4 py-3">Total</th>
                  <th scope="col" className="text-left px-4 py-3">Placed</th>
                  <th scope="col" className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" aria-hidden="true" />
                      Loading orders…
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">No orders found.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-brand-orange">{order.orderNumber}</td>
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{order.customerName}</div>
                        <div className="text-gray-500">{order.customerPhone}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{order.orderType}</td>
                      <td className="px-4 py-3 text-right text-white font-semibold">₹{order.total}</td>
                      <td className="px-4 py-3 text-gray-400">
                        {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="px-4 py-3">
                        <label htmlFor={`status-${order.id}`} className="sr-only">
                          Update status for order {order.orderNumber}
                        </label>
                        <select
                          id={`status-${order.id}`}
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-[11px] font-bold rounded-full px-2.5 py-1 border ${STATUS_STYLES[order.status] || 'bg-dark-800 text-gray-300 border-white/10'} disabled:opacity-50`}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-dark-900 text-white">{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} orders)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => loadOrders(pagination.page - 1)}
                disabled={pagination.page <= 1}
                aria-label="Previous page"
                className="p-1.5 rounded bg-dark-800 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-700"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => loadOrders(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                aria-label="Next page"
                className="p-1.5 rounded bg-dark-800 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-700"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
