import { useEffect, useState } from 'react';
import api from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load dashboard stats. Please check your backend connection.');
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <div className="login-error">{error}</div>}
      <div className="stats-grid">
        <div className="stat-card">Products: {stats.products}</div>
        <div className="stat-card">Orders: {stats.orders}</div>
        <div className="stat-card">Users: {stats.users}</div>
      </div>
    </div>
  );
}