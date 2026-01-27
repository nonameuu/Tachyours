import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function MyCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1499,
      quantity: 1,
      image: "https://via.placeholder.com/90",
      checked: true,
    },
    {
      id: 2,
      name: "Denim Shorts",
      price: 2599,
      quantity: 2,
      image: "https://via.placeholder.com/90",
      checked: true,
    },
  ]);

  const allChecked = cart.every((item) => item.checked);
  const hasChecked = cart.some((item) => item.checked);

  const toggleAll = () =>
    setCart(cart.map((i) => ({ ...i, checked: !allChecked })));

  const toggleItem = (id) =>
    setCart(cart.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i
    ));

  const updateQty = (id, type) =>
    setCart(cart.map((i) =>
      i.id === id
        ? {
            ...i,
            quantity:
              type === "add"
                ? i.quantity + 1
                : Math.max(1, i.quantity - 1),
          }
        : i
    ));

  const deleteItem = (id) =>
    setCart(cart.filter((i) => i.id !== id));

  const deleteSelected = () =>
    setCart(cart.filter((i) => !i.checked));

  const selectedItems = cart.filter((i) => i.checked);
  const totalItems = selectedItems.reduce((a, b) => a + b.quantity, 0);
  const totalPrice = selectedItems.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>My Cart</h2>

        <div style={styles.actionsRow}>
          <label style={styles.selectAll}>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={toggleAll}
            />
            Select all
          </label>

          {hasChecked && (
            <button
              style={styles.deleteAll}
              title="Delete selected"
              onClick={deleteSelected}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      {/* ITEMS */}
      <div style={styles.list}>
        {cart.map((item) => (
          <div key={item.id} style={styles.card}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
            />

            <img src={item.image} alt="" style={styles.image} />

            <div style={styles.info}>
              <h4>{item.name}</h4>
              <span style={styles.price}>
                ₱{item.price.toFixed(2)}
              </span>
            </div>

            {/* QTY */}
            <div style={styles.qty}>
              <button
                style={styles.qtyBtn}
                onClick={() => updateQty(item.id, "minus")}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                style={styles.qtyBtn}
                onClick={() => updateQty(item.id, "add")}
              >
                +
              </button>
            </div>

            <div style={styles.total}>
              ₱{(item.price * item.quantity).toFixed(2)}
            </div>

            {/* DELETE ITEM */}
            <button
              style={styles.remove}
              onClick={() => deleteItem(item.id)}
              title="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={styles.checkoutBox}>
          <span style={styles.summary}>
            Selected ({totalItems})
          </span>

          <span style={styles.grandTotal}>
            ₱{totalPrice.toFixed(2)}
          </span>

          <button
            style={styles.checkout}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg,#6B5FA7,#8b7cf6)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e5e7eb";
              e.currentTarget.style.color = "#111";
            }}
            onClick={() => navigate("/checkout")}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    background: "#fff",
    padding: "24px",
    borderRadius: "22px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.08)",
    fontFamily: "Inter, system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "26px",
    fontWeight: "800",
  },

  actionsRow: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },

  selectAll: {
    display: "flex",
    gap: "6px",
    fontSize: "14px",
    fontWeight: "600",
  },

  deleteAll: {
    border: "none",
    background: "none",
    color: "#dc2626",
    fontSize: "18px",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  card: {
    display: "grid",
    gridTemplateColumns: "24px 90px 1fr auto auto 28px",
    gap: "14px",
    alignItems: "center",
    padding: "16px",
    background: "#fafaff",
    borderRadius: "16px",
  },

  image: {
    width: "90px",
    height: "90px",
    borderRadius: "14px",
    objectFit: "cover",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  price: {
    fontSize: "14px",
    color: "#6b7280",
  },

  qty: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  qtyBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

  total: {
    fontWeight: "700",
    color: "#000",
  },

  remove: {
    border: "none",
    background: "none",
    fontSize: "18px",
    color: "#9ca3af",
    cursor: "pointer",
  },

  footer: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "flex-end",
  },

  checkoutBox: {
    width: "100%",
    maxWidth: "360px",
    background: "#fafaff",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  summary: {
    fontSize: "13px",
    color: "#6b7280",
  },

  grandTotal: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#000",
  },

  checkout: {
    marginTop: "6px",
    background: "#e5e7eb",
    color: "#111",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
};
