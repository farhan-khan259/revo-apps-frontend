import { useEffect, useState } from 'react';
import api from '../../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filterStatus, startDate, endDate]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data.orders || []);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    }
  };

  const applyFilters = () => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }

    if (startDate) {
      filtered = filtered.filter((o) => new Date(o.createdAt) >= new Date(startDate));
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59);
      filtered = filtered.filter((o) => new Date(o.createdAt) <= end);
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(orderId);
      await api.put(`/admin/orders/${orderId}`, { status: newStatus });
      const updated = orders.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      );
      setOrders(updated);
      if (selectedOrder?._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Delete order?')) {
      try {
        await api.delete(`/admin/orders/${orderId}`);
        setOrders(orders.filter((o) => o._id !== orderId));
        setShowModal(false);
      } catch (err) {
        setError('Failed to delete order');
      }
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      {error && <div className="admin-error">{error}</div>}

      <div className="filter-bar">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End date"
        />
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-8)}</td>
                <td>{order.customerName || 'N/A'}</td>
                <td>${order.total?.toFixed(2) || '0.00'}</td>
                <td>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button onClick={() => { setSelectedOrder(order); setShowModal(true); }}>
                      View
                    </button>
                    <button onClick={() => handleDelete(order._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order {selectedOrder._id.slice(-8)}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="order-details">
              <div className="detail-row">
                <strong>Customer:</strong> {selectedOrder.customerName || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {selectedOrder.customerEmail || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {selectedOrder.customerPhone || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {selectedOrder.shippingAddress || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Total:</strong> ${selectedOrder.total?.toFixed(2) || '0.00'}
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  disabled={updating === selectedOrder._id}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="detail-row" style={{ gridColumn: '1 / -1' }}>
                  <strong>Items:</strong>
                  <ul>
                    {selectedOrder.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x{item.quantity} @ ${item.price?.toFixed(2) || '0.00'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-footer">
                <button onClick={() => handleDelete(selectedOrder._id)} className="danger">
                  Delete Order
                </button>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
