import React from "react";

export default function ContentSection({ children }) {
  return <section style={styles.container}>{children}</section>;
}

/* ================= STYLES ================= */

const styles = {
  container: {
    background: "#ffffff",
    maxWidth: "1340px",
    margin: "0 auto 40px",
    padding: "24    px",
    borderRadius: "18px",
    minHeight: "300px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
};
