import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api';
import { useConfig } from '../../context/ConfigContext';

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const { config } = useConfig();

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const { data: response } = await api.get('/admin/stats/sales?days=30');
        if (!mounted) return;
        setData(response || []);
      } catch (err) {
        console.error('Failed to fetch sales data:', err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="admin-dashboard section-shell">
      <h1>Dashboard</h1>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke={config?.theme?.primaryColor || '#1976d2'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

