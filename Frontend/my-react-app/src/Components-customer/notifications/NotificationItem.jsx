import React, { useState } from "react";

export default function MyNotification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "🚚",
      title: "Order Shipped",
      description: "Your order #1234 is on the way",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      icon: "🧾",
      title: "Order Placed",
      description: "Order #1233 has been placed successfully",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      icon: "📦",
      title: "Order Completed",
      description: "Order #1232 has been delivered",
      time: "Yesterday",
      unread: false,
    },
  ]);

  /* 🔥 MARK AS READ */
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div style={styles.box}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Notifications</h2>
        {unreadCount > 0 && (
          <span style={styles.badge}>{unreadCount}</span>
        )}
      </div>

      <p style={styles.subtitle}>
        Stay updated with your order progress
      </p>

      {/* LIST */}
      <div style={styles.list}>
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            style={{
              ...styles.notification,
              ...(item.unread ? styles.unread : styles.read),
            }}
          >
            {/* ICON */}
            <div style={styles.iconWrapper}>
              <span style={styles.icon}>{item.icon}</span>
            </div>

            {/* CONTENT */}
            <div style={styles.content}>
              <div>
                <div style={styles.row}>
                  <strong style={styles.titleText}>
                    {item.title}
                  </strong>
                  {item.unread && <span style={styles.dot} />}
                </div>

                <p style={styles.description}>
                  {item.description}
                </p>
              </div>

              <span style={styles.time}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  box: {
    flex: 1,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    minHeight: "520px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  badge: {
    background: "#6b5fa7",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "999px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "700",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "22px",
    fontSize: "14px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    overflowY: "auto",
  },

  /* NOTIFICATION CARD */
  notification: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "background 0.35s ease, box-shadow 0.35s ease",
  },

  /* 🔵 UNREAD */
  unread: {
    background: "#eef2ff",
    boxShadow: "0 10px 25px rgba(99,102,241,0.15)",
  },

  /* ⚪ READ (FADED) */
  read: {
    background: "#f9fafb",
    opacity: 0.85,
  },

  iconWrapper: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#6b5fa7,#9f8fe3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 18px rgba(107,95,167,0.35)",
  },

  icon: {
    fontSize: "22px",
    color: "#fff",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#ef4444",
  },

  titleText: {
    fontSize: "15px",
  },

  description: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#4b5563",
  },

  time: {
    fontSize: "12px",
    color: "#9ca3af",
  },
};
