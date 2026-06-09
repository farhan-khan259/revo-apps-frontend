import { useEffect, useState } from 'react';
import api from '../../api';

export default function ConfirmOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { data } = await api.get('/admin/orders?status=pending');
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load pending orders.');
      }
    };
    fetchPending();
  }, []);

  const confirmOrder = async (id) => {
    try {
      await api.put(`/admin/orders/${id}`, { status: 'processing' });
      setOrders(orders.filter(o => o._id !== id));
      alert('Order confirmed and moved to processing');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to confirm order.');
    }
  };

  const cancelOrder = async (id) => {
    if (window.confirm('Cancel this order?')) {
      try {
        await api.put(`/admin/orders/${id}`, { status: 'cancelled' });
        setOrders(orders.filter(o => o._id !== id));
        setError('');
      } catch (err) {
        console.error(err);
        setError('Unable to cancel order.');
      }
    }
  };

  return (
    <div>
      <h1>Confirm Orders (Pending)</h1>
      {error && <p className="admin-error">{error}</p>}
      {orders.length === 0 && <p>No pending orders.</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order.orderNumber || order._id.slice(-6)}</td>
              <td>{order.customer?.email || order.email}</td>
              <td>{order.total}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => confirmOrder(order._id)}>Confirm</button>
                <button onClick={() => cancelOrder(order._id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}