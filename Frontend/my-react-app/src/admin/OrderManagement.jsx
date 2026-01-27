import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import {
  MdAdd,
  MdClose,
  MdDelete,
  MdEdit,
  MdArchive,
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
      total: 850,
      date: "November 1, 2024",
      payment: "Gcash",
      status: "Delivered",
    },
  ]);

  /* EDIT MODE */
  const [editingId, setEditingId] = useState(null);

  /* ORDER FORM */
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);

  /* TOGGLE SELECT */
  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* CONFIRM ARCHIVE */
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

  /* ADD ITEM */
  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  /* REMOVE ITEM */
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  /* UPDATE ITEM */
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "qty" || field === "price" ? Number(value) : value;
    setItems(updated);
  };

  /* TOTAL */
  const total = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  /* OPEN NEW */
  const openNewOrder = () => {
    setEditingId(null);
    setCustomer("");
    setItems([{ name: "", qty: 1, price: 0 }]);
    setShowOrderModal(true);
  };

  /* OPEN EDIT */
  const openEditOrder = (order) => {
    setEditingId(order.id);
    setCustomer(order.customer);
    setItems(order.items);
    setShowOrderModal(true);
  };

  /* SAVE / UPDATE */
  const saveOrder = () => {
    if (!customer || items.some((i) => !i.name)) return;

    if (editingId) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingId ? { ...o, customer, items, total } : o
        )
      );
    } else {
      setOrders((prev) => [
        ...prev,
        {
          id: Date.now().toString().slice(-5),
          customer,
          items,
          total,
          date: "Today",
          payment: "Gcash",
          status: "Processing",
        },
      ]);
    }

    setShowOrderModal(false);
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
                  className="add-user-btn"
                  style={{ background: "#fde2e2", color: "#b91c1c" }}
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

            {/* ================= MOBILE ORDER CARDS ================= */}
            <div className="order-cards mobile-only">
              {orders.map((o) => (
                <div key={o.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div className="order-id">Order #{o.id}</div>
                      <div className="order-customer">{o.customer}</div>
                    </div>

                    <span className={`order-status ${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </div>

                  <div className="order-card-body">
                    <div className="order-row">
                      <span>Total</span>
                      <strong>₱{o.total}</strong>
                    </div>

                    <div className="order-row">
                      <span>Date</span>
                      <span>{o.date}</span>
                    </div>

                    <div className="order-row">
                      <span>Payment</span>
                      <span>{o.payment}</span>
                    </div>
                  </div>

                  <div className="order-card-actions">
                    <button
                      className="icon-action"
                      onClick={() => openEditOrder(o)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="audit-table-wrapper desktop-only">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        {archiveMode && (
                          <input
                            type="checkbox"
                            className="user-checkbox"
                            checked={selectedOrders.includes(o.id)}
                            onChange={() => toggleSelectOrder(o.id)}
                          />
                        )}
                      </td>
                      <td>{o.id}</td>
                      <td>{o.customer}</td>
                      <td>₱{o.total}</td>
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

      {/* ================= ORDER MODAL ================= */}
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
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>

              <label>Order Items</label>

              {items.map((item, i) => (
                <div key={i} className="order-item-card">
                  <input
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(i, "name", e.target.value)
                    }
                  />

                  <div className="order-item-row">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        updateItem(i, "qty", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(i, "price", e.target.value)
                      }
                    />
                    {items.length > 1 && (
                      <button
                        className="icon-action danger"
                        onClick={() => removeItem(i)}
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button className="btn-secondary" onClick={addItem}>
                + Add Item
              </button>

              <div className="modal-divider" />

              <div className="order-total">
                <span>Total</span>
                <strong>₱{total}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowOrderModal(false)}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={saveOrder}
                disabled={!customer || items.some((i) => !i.name)}
              >
                {editingId ? "Update Order" : "Save Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
