import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        {/* Quote */}
        <p style={styles.quote}>
          "Keep moving forward — even when the thread gets tangled."
        </p>

        {/* Info Section */}
        <div style={styles.infoContainer}>
          <div style={styles.infoItem}>
            <FaMapMarkerAlt style={styles.icon} />
            <a
              href="https://www.google.com/maps/place/Tachyons+Clothing/@14.5652646,121.1269611,17z"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              43 Rosario St. Brgy. San Juan, Taytay Rizal
            </a>
          </div>

          <div style={styles.infoItem}>
            <FaPhoneAlt style={styles.icon} />
            <a href="tel:091232212" style={styles.link}>
              091232212
            </a>
          </div>

          <div style={styles.infoItem}>
            <FaFacebookF style={styles.icon} />
            <a
              href="https://www.facebook.com/TachyonsClothing"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Tachyons Clothing
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p style={styles.copy}>
          © 2025 Tachyons Clothing. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#D8CEEB",
    padding: "12px 16px", // 🔥 REDUCED HEIGHT (key change)
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Roboto', sans-serif",
    color: "#000",
  },

  inner: {
    width: "100%",
    maxWidth: "900px",
    textAlign: "center",
  },

  quote: {
    fontSize: "14px",
    marginBottom: "8px", // 🔥 smaller gap
    fontStyle: "italic",
  },

  infoContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px", // 🔥 smaller gap
    marginBottom: "8px", // 🔥 smaller gap
  },

  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
  },

  icon: {
    fontSize: "14px",
  },

  link: {
    color: "#000",
    textDecoration: "none",
  },

  copy: {
    fontSize: "12px",
    color: "#333",
    margin: 0, // 🔥 remove extra space
  },
};
