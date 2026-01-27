import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaWallet,
  FaBell,
  FaEnvelope,
  FaTicketAlt,
  FaCog, // 🔥 SETTINGS ICON
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 🔴 Example flags
  const hasAccountUpdate = true;
  const hasNewNotification = true;
  const hasNewMessage = true;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menu = [
    {
      label: "Account",
      icon: <FaUser />,
      path: "/profile",
      dot: hasAccountUpdate,
    },
    {
      label: "Orders",
      icon: <FaClipboardList />,
      path: "/purchase",
    },
    {
      label: "Balance",
      icon: <FaWallet />,
      path: "/balance",
    },
    {
      label: "Notifications",
      icon: <FaBell />,
      path: "/notification",
      dot: hasNewNotification,
    },
    {
      label: "Messages",
      icon: <FaEnvelope />,
      path: "/message",
      dot: hasNewMessage,
    },
    {
      label: "Voucher",
      icon: <FaTicketAlt />,
      path: "/voucher",
    },
    {
      label: "Settings", // 🔥 NEW
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside
      style={{
        ...styles.sidebar,
        ...(isMobile ? styles.mobileSidebar : styles.desktopSidebar),
      }}
    >
      {/* PROFILE — DESKTOP ONLY */}
      {!isMobile && (
        <div style={styles.profile}>
          <div style={styles.avatar} />
          <div>
            <div style={styles.name}>Raymond</div>
            <div style={styles.edit}>Edit Profile</div>
          </div>
        </div>
      )}

      {/* MENU */}
      <ul
        style={{
          ...styles.menu,
          flexDirection: isMobile ? "row" : "column",
        }}
      >
        {menu.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <li key={item.path}>
              <div
                onClick={() => navigate(item.path)}
                style={{
                  ...styles.menuItem,
                  ...(active ? styles.active : {}),
                  justifyContent: isMobile ? "center" : "flex-start",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <div style={styles.iconWrapper}>
                  <span style={styles.icon}>{item.icon}</span>
                  {item.dot && <span style={styles.dot} />}
                </div>

                <span
                  style={isMobile ? styles.mobileLabel : styles.label}
                >
                  {item.label}
                </span>
              </div>

              {/* 🔥 BREAK LINE (DESKTOP ONLY) */}
              {!isMobile && index !== menu.length - 1 && (
                <div style={styles.divider} />
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: {
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif",
    background: "#D8CEEB",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  /* DESKTOP */
  desktopSidebar: {
    width: "260px",
    minHeight: "100vh",
    padding: "24px 20px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  /* MOBILE */
  mobileSidebar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "72px",
    borderRadius: "16px 16px 0 0",
    padding: "6px 12px",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
  },

  /* PROFILE */
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#f2b6c6",
  },

  name: {
    fontSize: "15px",
    fontWeight: "600",
  },

  edit: {
    fontSize: "12px",
    color: "#555",
    cursor: "pointer",
  },

  /* MENU */
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    gap: "6px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1f1f1f",
    transition: "background 0.2s ease",
  },

  divider: {
    height: "1px",
    backgroundColor: "rgba(0,0,0,0.08)",
    margin: "6px 0",
  },

  iconWrapper: {
    position: "relative",
    width: "22px",
    display: "flex",
    justifyContent: "center",
  },

  icon: {
    fontSize: "18px",
    color: "#4B5563", // lighter icon
  },

  dot: {
    position: "absolute",
    top: "-3px",
    right: "-3px",
    width: "8px",
    height: "8px",
    backgroundColor: "#EF4444",
    borderRadius: "50%",
  },

  label: {
    whiteSpace: "nowrap",
  },

  mobileLabel: {
    fontSize: "11px",
    marginTop: "4px",
  },

  active: {
    backgroundColor: "#ECE6F6",
    fontWeight: "600",
  },
};
