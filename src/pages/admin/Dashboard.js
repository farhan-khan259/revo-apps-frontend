import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        setStats((prev) => ({ ...prev, loading: true, error: null }));

        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get('/admin/users').catch((err) => {
            console.error('Users API error:', err.response && err.response.status, err.message);
            return { data: { users: [] } };
          }),
          api.get('/products').catch((err) => {
            console.error('Products API error:', err.response && err.response.status, err.message);
            return { data: { products: [] } };
          }),
          api.get('/admin/orders').catch((err) => {
            console.error('Orders API error:', err.response && err.response.status, err.message);
            return { data: { orders: [] } };
          }),
        ]);

        if (!mounted) return;

        const users = Array.isArray(usersRes.data && usersRes.data.users) ? usersRes.data.users : [];
        const products = Array.isArray(productsRes.data && productsRes.data.products) ? productsRes.data.products : [];
        const orders = Array.isArray(ordersRes.data && ordersRes.data.orders) ? ordersRes.data.orders : [];

        const pendingCount = orders.filter((o) => o && o.status === 'pending').length;
        const completedCount = orders.filter((o) => o && o.status === 'completed').length;

        setStats({
          totalUsers: users.length,
          totalProducts: products.length,
          totalOrders: orders.length,
          pendingOrders: pendingCount,
          completedOrders: completedCount,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (mounted) {
          setStats((prev) => ({
            ...prev,
            loading: false,
            error: 'Failed to load dashboard stats',
          }));
        }
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <div
      style={{
        flex: 1,
        minWidth: '200px',
        padding: '1.5rem',
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1976d2' }}>{value}</div>
      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>{title}</div>
    </div>
  );

  return (
    <div className="admin-dashboard section-shell">
      <h1>Dashboard</h1>

      {stats.error && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            background: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
          }}
        >
          {stats.error}
        </div>
      )}

      {stats.loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading stats...</div>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <StatCard title="Registered Users" value={stats.totalUsers} icon="👥" />
          <StatCard title="Total Products" value={stats.totalProducts} icon="📦" />
          <StatCard title="Total Orders" value={stats.totalOrders} icon="📋" />
          <StatCard title="Pending Orders" value={stats.pendingOrders} icon="⏳" />
          <StatCard title="Completed Orders" value={stats.completedOrders} icon="✅" />
        </div>
      )}
    </div>
  );
}

