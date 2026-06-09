import { useEffect, useState } from 'react';
import api from '../../api';

export default function Shipped() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipped = async () => {
      try {
        const { data } = await api.get('/admin/orders?status=shipped');
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load shipped orders.');
      }
    };
    fetchShipped();
  }, []);

  const markDelivered = async (id) => {
    try {
      await api.put(`/admin/orders/${id}`, { status: 'delivered' });
      setOrders(orders.filter(o => o._id !== id));
      alert('Order marked as delivered');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to mark order as delivered.');
    }
  };

  return (
    <div>
      <h1>Shipped Orders</h1>
      {error && <p className="admin-error">{error}</p>}
      {orders.length === 0 && <p>No shipped orders.</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Shipped Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order.orderNumber || order._id.slice(-6)}</td>
              <td>{order.customer?.email || order.email}</td>
              <td>{order.total}</td>
              <td>{order.shippedAt ? new Date(order.shippedAt).toLocaleDateString() : '-'}</td>
              <td>
                <button onClick={() => markDelivered(order._id)}>Mark Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}