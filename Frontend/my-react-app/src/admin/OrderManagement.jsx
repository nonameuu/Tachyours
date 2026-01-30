import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import {
  MdAdd,
  MdEdit,
  MdArchive,
  MdDelete,
} from "react-icons/md";

export default function OrderManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  /* ARCHIVE MODE */
  const [archiveMode, setArchiveMode] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  /* ORDERS */
  const [orders, setOrders] = useState([
    {
      id: "1001",
      customer: "John Doe",
      items: [{ name: "Jersey", qty: 2, price: 425 }],
      subtotal: 850,
      discount: {
        type: "Bulk Discount",
        amount: 85,
      },
      total: 765,
      date: "November 1, 2024",
      payment: "Gcash",
      status: "Delivered",
    },
    {
      id: "1002",
      customer: "Maria Santos",
      items: [{ name: "Jersey", qty: 1, price: 425 }],
      subtotal: 425,
      discount: null,
      total: 425,
      date: "Today",
      payment: "Gcash",
      status: "Processing",
    },
  ]);

  /* FORM */
  const [editingId, setEditingId] = useState(null);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);

  /* HELPERS */
  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirmArchive = () => {
    if (selectedOrders.length === 0) return;

    setOrders((prev) =>
      prev.map((o) =>
        selectedOrders.includes(o.id)
          ? { ...o, status: "Archived" }
          : o
      )
    );

    setSelectedOrders([]);
    setArchiveMode(false);
  };

  const addItem = () =>
    setItems([...items, { name: "", qty: 1, price: 0 }]);

  const removeItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "qty" || field === "price" ? Number(value) : value;
    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const openNewOrder = () => {
    setEditingId(null);
    setCustomer("");
    setItems([{ name: "", qty: 1, price: 0 }]);
    setShowOrderModal(true);
  };

  const openEditOrder = (order) => {
    setEditingId(order.id);
    setCustomer(order.customer);
    setItems(order.items);
    setShowOrderModal(true);
  };

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />

      <div className="body-layout">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        <main className="content">
          <div className="main-content">

            {/* HEADER */}
            <div className="audit-header user-header">
              <div>
                <h2>Order Management</h2>
                <p>See information about all orders</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="add-user-btn" onClick={openNewOrder}>
                  <MdAdd /> New Order
                </button>

                <button
                  className="add-user-btn archive"
                  onClick={() => {
                    if (!archiveMode) {
                      setArchiveMode(true);
                      return;
                    }
                    if (selectedOrders.length > 0) confirmArchive();
                    else setArchiveMode(false);
                  }}
                >
                  <MdArchive />
                  {archiveMode
                    ? selectedOrders.length > 0
                      ? "Archive"
                      : "Cancel"
                    : "Archive"}
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="audit-table-wrapper">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        {archiveMode && (
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(o.id)}
                            onChange={() => toggleSelectOrder(o.id)}
                          />
                        )}
                      </td>
                      <td>{o.id}</td>
                      <td>{o.customer}</td>
                      <td>
                        {o.discount ? (
                          <span className="discount-badge">
                            {o.discount.type}
                          </span>
                        ) : (
                          <span className="no-discount">—</span>
                        )}
                      </td>
                      <td>₱{o.total.toFixed(2)}</td>
                      <td>{o.date}</td>
                      <td>{o.payment}</td>
                      <td>
                        <span className={`status ${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                      <td>
                        {!archiveMode && (
                          <button
                            className="icon-action"
                            onClick={() => openEditOrder(o)}
                          >
                            <MdEdit />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* MODAL */}
      {showOrderModal && (
        <div className="modal-overlay">
          <div className="modal modal-md">
            <div className="modal-header">
              <h3>{editingId ? "Edit Order" : "New Order"}</h3>
              <button
                className="modal-close"
                onClick={() => setShowOrderModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <label>Customer Name *</label>
              <input value={customer} />

              <label>Order Items</label>

              {items.map((item, i) => (
                <div key={i} className="order-item-row">
                  <input value={item.name} />
                  <input type="number" value={item.qty} />
                  <input type="number" value={item.price} />
                  {items.length > 1 && (
                    <button className="icon-action danger">
                      <MdDelete />
                    </button>
                  )}
                </div>
              ))}

              <div className="order-summary">
                <div>
                  <span>Subtotal</span>
                  <strong>₱{subtotal.toFixed(2)}</strong>
                </div>
                <div className="discount-row">
                  <span>Discount</span>
                  <strong className="discount-value">₱0.00</strong>
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <strong>₱{subtotal.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        .discount-badge {
          background: #f1f0ff;
          color: #4b3fd1;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
        }

        .no-discount {
          color: #999;
        }

        .order-summary {
          margin-top: 16px;
          border-top: 1px solid #eee;
          padding-top: 12px;
        }

        .order-summary div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .discount-row strong {
          color: #4b3fd1;
        }

                .add-user-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 30px;
          padding: 0 18px;
          border-radius: 12px;
          border: none;
          background: #e6def4;
          color: #4c1d95;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-user-btn:hover {
          background: #ddd3f0;
        }

        .add-user-btn.archive {
          background: #fde8e8;
          color: #dc2626;
        }

        .add-user-btn.archive:hover {
          background: #fbd5d5;
        }
      `}</style>
    </div>
  );
}
