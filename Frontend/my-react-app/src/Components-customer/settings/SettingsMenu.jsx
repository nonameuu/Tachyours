import React from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaCreditCard,
  FaPalette,
  FaSignOutAlt,
} from "react-icons/fa";

export default function SettingsMenu({ active, setActive }) {
  const menu = [
    { key: "account", label: "Account", icon: <FaUser /> },
    { key: "notifications", label: "Notifications", icon: <FaBell /> },
    { key: "security", label: "Security", icon: <FaLock /> },
    { key: "payment", label: "Payment", icon: <FaCreditCard /> },
    { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div style={styles.menu}>
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActive(item.key)}
          style={{
            ...styles.menuBtn,
            ...(active === item.key ? styles.activeBtn : {}),
          }}
        >
          <span style={styles.menuIcon}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* STYLES */
const styles = {
  menu: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },

  menuBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    background: "#f9fafb",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },

  menuIcon: {
    fontSize: "14px",
  },

  activeBtn: {
    background: "#D8CEEB",
    borderColor: "#D8CEEB",
  },
};
