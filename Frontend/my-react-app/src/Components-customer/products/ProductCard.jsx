import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const soldCount = product.sold ?? 0;

  const handleHover = (e, type) => {
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.boxShadow =
      type === "buy"
        ? "0 10px 25px rgba(0,0,0,0.25)"
        : "0 10px 25px rgba(124,58,237,0.35)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.12)";
      }}
    >
      {/* IMAGE */}
      <div style={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
        />
      </div>

      {/* INFO */}
      <div style={styles.info}>
        {/* NAME + SOLD */}
        <div style={styles.nameRow}>
          <h3 style={styles.name}>{product.name}</h3>
          <span style={styles.sold}>
            🔥 {soldCount.toLocaleString()}
          </span>
        </div>

        <p style={styles.price}>
          ₱{product.price.toFixed(2)}
        </p>

        <div style={styles.meta}>
          <span>{product.category}</span>
          <span>•</span>
          <span>{product.fabric}</span>
        </div>

        {/* ACTIONS */}
        <div style={styles.actions}>
          <button
            style={styles.cartBtn}
            onMouseEnter={(e) => handleHover(e, "cart")}
            onMouseLeave={handleLeave}
          >
            Add to Cart
          </button>

          <button
            style={styles.buyBtn}
            onMouseEnter={(e) => handleHover(e, "buy")}
            onMouseLeave={handleLeave}
            onClick={() => navigate("/buynow")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  card: {
    width: "260px",
    borderRadius: "22px",
    background: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
  },

  imageWrapper: {
    width: "100%",
    height: "260px",
    background: "linear-gradient(135deg,#f4f2fb,#ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "88%",
    height: "88%",
    objectFit: "contain",
  },

  info: {
    padding: "18px 16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  nameRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },

  name: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    flex: 1,
  },

  sold: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#DC2626",
    whiteSpace: "nowrap",
  },

  price: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#6B5FA7",
  },

  meta: {
    display: "flex",
    gap: "6px",
    fontSize: "13px",
    color: "#6b7280",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },

  cartBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "14px",
    border: "none",
    background: "#EDE9FE",
    color: "#4c1d95",
    fontWeight: "700",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  buyBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "14px",
    border: "none",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
};
