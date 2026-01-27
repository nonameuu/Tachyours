import React from "react";

export default function AccountSummary() {
  const profile = {
    username: "raymond",
    name: "Raymond Silayan",
    email: "raymond@email.com",
    phone: "09*********",
    gender: "Male",
    dob: "August 7, 2004",
    address: "Not provided",
    status: "Active",
    orders: 18,
    memberSince: 2024,
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>Account Overview</h2>
        <p style={styles.pageSubtitle}>
          Summary of your account information
        </p>
      </div>

      {/* MAIN GRID — SAME AS BEFORE */}
      <div style={styles.grid}>
        {/* LEFT — DETAILS */}
        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>Personal Details</h3>

          <Info label="Username" value={`@${profile.username}`} />
          <Info label="Full Name" value={profile.name} />
          <Info label="Email" value={profile.email} />
          <Info label="Phone" value={profile.phone} />
          <Info label="Gender" value={profile.gender} />
          <Info label="Birthday" value={profile.dob} />
          <Info label="Address" value={profile.address} />
        </div>

        {/* RIGHT — ACCOUNT CARD */}
        <div style={styles.sidePanel}>
          <div style={styles.avatar}>👤</div>

          <h4 style={styles.name}>{profile.name}</h4>
          <span style={styles.username}>@{profile.username}</span>

          {/* STATS */}
          <div style={styles.stats}>
            <Stat label="Status" value={profile.status} />
            <Stat label="Member Since" value={profile.memberSince} />
            <Stat label="Orders" value={profile.orders} />
          </div>

          {/* SECURITY INFO */}
          <div style={styles.securityBox}>
            <h5 style={styles.securityTitle}>Security</h5>
            <p style={styles.securityText}>
              Manage your password and security settings from the settings page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */
const Info = ({ label, value }) => (
  <div style={styles.field}>
    <span style={styles.label}>{label}</span>
    <div style={styles.readonly}>{value}</div>
  </div>
);

const Stat = ({ label, value }) => (
  <div style={styles.statItem}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

/* ================= STYLES (MATCHED) ================= */

const styles = {
  container: {
    flex: 1,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    padding: "28px",
    borderRadius: "22px",
    boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
    minHeight: "520px",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    marginBottom: "26px",
  },

  pageTitle: {
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },

  pageSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "32px",
  },

  panel: {
    background: "#fff",
    borderRadius: "20px",
    padding: "26px",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
  },

  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "16px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },

  readonly: {
    background: "#f3f4f6",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: "600",
    fontSize: "14px",
  },

  /* RIGHT PANEL */
  sidePanel: {
    background: "linear-gradient(180deg,#faf9ff,#ffffff)",
    borderRadius: "20px",
    padding: "28px",
    textAlign: "center",
    boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
  },

  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6b5fa7,#9f8fe3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    color: "#fff",
    margin: "0 auto 16px",
    boxShadow: "0 18px 40px rgba(107,95,167,0.45)",
  },

  name: {
    margin: 0,
    fontWeight: "700",
    fontSize: "16px",
  },

  username: {
    display: "block",
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "16px",
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "24px",
  },

  statItem: {
    flex: 1,
    background: "#f9fafb",
    padding: "12px 10px",
    borderRadius: "14px",
    fontSize: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  securityBox: {
    background: "#f3f4f6",
    padding: "18px",
    borderRadius: "16px",
  },

  securityTitle: {
    margin: "0 0 6px",
    fontSize: "14px",
    fontWeight: "700",
  },

  securityText: {
    fontSize: "13px",
    color: "#4b5563",
  },
};
