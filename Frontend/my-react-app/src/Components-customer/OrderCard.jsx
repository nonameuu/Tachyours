import React, { useState } from "react";

export default function OrderCard({
  image,
  productName,
  variation = "Default",
  quantity = 1,
  orderId,
  total,
  status = "Completed",
  statusMessage = "Order has been delivered",
  paymentMethod = "GCash",
  paymentType = "Full",
}) {
  const [showPayment, setShowPayment] = useState(false);

  const statusStyle = {
    Completed: { bg: "#dcfce7", color: "#166534" },
    "To Pay": { bg: "#ffedd5", color: "#9a3412" },
    "To Confirm": { bg: "#e0f2fe", color: "#075985" },
    "In Progress": { bg: "#eef2ff", color: "#3730a3" },
    Released: { bg: "#e0f2fe", color: "#075985" },
    Cancel: { bg: "#fee2e2", color: "#991b1b" },
  };

  return (
    <>
      {/* CARD */}
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <span
            style={{
              ...styles.statusBadge,
              background: statusStyle[status].bg,
              color: statusStyle[status].color,
            }}
          >
            {status}
          </span>

          <span style={styles.orderId}>Order ID: {orderId}</span>
        </div>

        {/* BODY */}
        <div style={styles.body}>
          <img src={image} alt="product" style={styles.image} />

          <div style={styles.info}>
            <h4 style={styles.name}>{productName}</h4>

            <div style={styles.meta}>
              <span>Variation: {variation}</span>
              <span>Qty: {quantity}</span>
            </div>

            <p style={styles.statusMsg}>{statusMessage}</p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <div>
            <span style={styles.totalLabel}>Order Total</span>
            <div style={styles.total}>₱{total}.00</div>
          </div>

          {status === "To Pay" && (
            <button
              style={styles.payBtn}
              onClick={() => setShowPayment(!showPayment)}
            >
              {showPayment ? "Cancel" : "Pay Now"}
            </button>
          )}
        </div>
      </div>

      {/* PAYMENT SLIDE */}
      <div
        style={{
          ...styles.paymentWrapper,
          ...(showPayment ? styles.open : styles.closed),
        }}
      >
        <div style={styles.paymentBox}>
          <h4>Payment Details</h4>

          <p>
            <strong>Method:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Type:</strong> {paymentType}
          </p>

          {paymentMethod === "GCash" && (
            <>
              <input style={styles.input} placeholder="GCash Number" />
              <input style={styles.input} placeholder="Reference Number" />
            </>
          )}

          {paymentMethod === "Bank" && (
            <>
              <input style={styles.input} placeholder="Bank Name" />
              <input style={styles.input} placeholder="Account Name" />
              <input style={styles.input} placeholder="Account Number" />
              <input style={styles.input} placeholder="Reference Number" />
            </>
          )}

          <button style={styles.submitBtn}>Submit Payment</button>
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
    marginBottom: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusBadge: {
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  },

  orderId: {
    fontSize: "12px",
    color: "#777",
  },

  body: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  image: {
    width: "90px",
    height: "90px",
    borderRadius: "16px",
    objectFit: "cover",
    border: "1px solid #eee",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },

  name: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
  },

  meta: {
    display: "flex",
    gap: "14px",
    fontSize: "13px",
    color: "#555",
  },

  statusMsg: {
    fontSize: "13px",
    color: "#666",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #eee",
    paddingTop: "12px",
  },

  totalLabel: {
    fontSize: "12px",
    color: "#777",
  },

  total: {
    fontSize: "20px",
    fontWeight: "700",
  },

  payBtn: {
    background: "#6B5FA7",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  /* PAYMENT */
  paymentWrapper: {
    overflow: "hidden",
    transition: "max-height 0.35s ease, opacity 0.25s ease",
  },

  open: {
    maxHeight: "600px",
    opacity: 1,
  },

  closed: {
    maxHeight: 0,
    opacity: 0,
  },

  paymentBox: {
    background: "#faf9ff",
    border: "1px dashed #d6cff0",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  submitBtn: {
    marginTop: "8px",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "#6B5FA7",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
};
