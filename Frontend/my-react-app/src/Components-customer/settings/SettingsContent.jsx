import React, { useState } from "react";

/* ================= SETTINGS SECTIONS ================= */

export default function SettingsContent({ active }) {
  switch (active) {
    case "account":
      return <AccountSettings />;
    case "notifications":
      return <NotificationSettings />;
    case "security":
      return <SecuritySettings />;
    case "payment":
      return <PaymentSettings />;
    case "logout":
      return <LogoutSettings />;
    default:
      return null;
  }
}

/* ================= ACCOUNT ================= */

function AccountSettings() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <>
      <h2 style={styles.sectionTitle}>Account Information</h2>
      <p style={styles.text}>Manage your personal details and preferences.</p>

      {/* AVATAR */}
      <div style={styles.avatarSection}>
        <div style={styles.avatarWrapper}>
          {avatar ? (
            <img src={avatar} alt="Avatar" style={styles.avatarImg} />
          ) : (
            <div style={styles.avatarPlaceholder}>👤</div>
          )}
        </div>

        <div>
          <label style={styles.avatarLabel}>Profile Photo</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          <p style={styles.helperText}>PNG or JPG, max 5MB</p>
        </div>
      </div>

      {/* BASIC INFO */}
      <div style={styles.grid2}>
        <div style={styles.field}>
          <label>Full Name</label>
          <input style={styles.input} placeholder="Juan Dela Cruz" />
        </div>

        <div style={styles.field}>
          <label>Phone Number</label>
          <input style={styles.input} placeholder="09XXXXXXXXX" />
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.field}>
          <label>Username</label>
          <input style={styles.input} value="@raymond" disabled />
        </div>

        <div style={styles.field}>
          <label>Email Address</label>
          <input style={styles.input} value="raymond@email.com" disabled />
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.field}>
          <label>Gender</label>
          <div style={styles.radioGroup}>
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} style={styles.radio}>
                <input type="radio" name="gender" /> {g}
              </label>
            ))}
          </div>
        </div>

        <div style={styles.field}>
          <label>Date of Birth</label>
          <input type="date" style={styles.input} />
        </div>
      </div>

      <div style={styles.field}>
        <label>Address</label>
        <textarea
          style={styles.textarea}
          rows={3}
          placeholder="Enter your complete address"
        />
      </div>

      {/* PREFERENCES */}
      <h3 style={styles.subTitle}>Preferences</h3>

      <div style={styles.grid2}>
        <div style={styles.field}>
          <label>Language</label>
          <select style={styles.select}>
            <option>English</option>
            <option>Filipino</option>
          </select>
        </div>

        <div style={styles.field}>
          <label>Timezone</label>
          <select style={styles.select}>
            <option>GMT+8 (Asia/Manila)</option>
            <option>UTC</option>
          </select>
        </div>
      </div>

      <div style={styles.field}>
        <label>Account Status</label>
        <input style={styles.input} value="Active" disabled />
      </div>

      <button style={styles.save}>Save Changes</button>
    </>
  );
}

/* ================= OTHER SECTIONS ================= */

function NotificationSettings() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Notifications</h2>
      <p style={styles.text}>Choose which notifications you want to receive.</p>

      {/* SYSTEM & SECURITY */}
      <h3 style={styles.subTitle}>System & Security</h3>
      <label style={styles.toggle}>
        <input type="checkbox" defaultChecked />
        Account security alerts (new device login)
      </label>

      <label style={styles.toggle}>
        <input type="checkbox" defaultChecked />
        System updates & maintenance notices
      </label>

      {/* ORDERS */}
      <h3 style={styles.subTitle}>Orders</h3>
      <label style={styles.toggle}>
        <input type="checkbox" defaultChecked />
        Order status updates
      </label>

      {/* MESSAGES */}
      <h3 style={styles.subTitle}>Messages</h3>
      <label style={styles.toggle}>
        <input type="checkbox" defaultChecked />
        Messages from admin
      </label>

      {/* PROMOTIONS */}
      <h3 style={styles.subTitle}>Promotions</h3>
      <label style={styles.toggle}>
        <input type="checkbox" />
        Vouchers & special offers
      </label>

      {/* SMS */}
      <h3 style={styles.subTitle}>SMS Notifications</h3>
      <label style={styles.toggle}>
        <input type="checkbox" />
        Receive important notifications via SMS
      </label>
    </>
  );
}

function SecuritySettings() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Security</h2>
      <div style={styles.field}>
        <label>Current Password</label>
        <input type="password" style={styles.input} />
      </div>
      <div style={styles.field}>
        <label>New Password</label>
        <input type="password" style={styles.input} />
      </div>
      <button style={styles.save}>Update Password</button>
    </>
  );
}

function PaymentSettings() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Payment Methods</h2>
      <p style={styles.text}>Manage your linked payment accounts.</p>

      {/* GCASH */}
      <div style={{ ...styles.paymentCard, ...styles.gcashCard }}>
        <div>
          <strong style={styles.paymentTitle}>GCash</strong>
          <p style={styles.paymentSubText}>Linked to: 09••• ••••123</p>
        </div>
        <button style={styles.changeBtn}>Change</button>
      </div>

      {/* BANK */}
      <div style={{ ...styles.paymentCard, ...styles.bankCard }}>
        <div>
          <strong style={styles.paymentTitle}>Bank Account</strong>
          <p style={styles.paymentSubText}>BDO •••• 4567</p>
        </div>
        <button style={styles.changeBtn}>Change</button>
      </div>

      <button style={styles.save}>Link New Payment Method</button>

      <p style={styles.paymentNote}>
        Your payment details are securely encrypted.
      </p>
    </>
  );
}

function LogoutSettings() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Logout</h2>
      <p style={styles.text}>You are about to sign out of your account.</p>

      <p style={styles.logoutMessage}>
        We’ll be here when you come back. Log in again anytime to continue where
        you left off.
      </p>

      <button style={styles.logout}>Logout</button>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  sectionTitle: { fontSize: "20px", fontWeight: "700" },
  subTitle: { marginTop: "28px", fontSize: "16px", fontWeight: "700" },
  text: { fontSize: "14px", color: "#6b7280", marginBottom: "10px" },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    marginBottom: "18px",
  },

  field: { display: "flex", flexDirection: "column", gap: "6px" },

  input: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    resize: "vertical",
  },

  select: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },

  avatarSection: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    padding: "18px",
    borderRadius: "18px",
    background: "#f9fafb",
    marginBottom: "22px",
  },

  avatarWrapper: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#6B5FA7,#8b7cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    boxShadow: "0 12px 30px rgba(107,95,167,0.35)",
  },

  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  avatarPlaceholder: { fontSize: "36px" },
  avatarLabel: { fontWeight: "600" },
  helperText: { fontSize: "12px", color: "#6b7280" },

  radioGroup: { display: "flex", gap: "16px" },
  radio: { display: "flex", alignItems: "center", gap: "6px" },
  toggle: { display: "flex", gap: "10px", fontSize: "14px" },

  save: {
    marginTop: "22px",
    padding: "14px 28px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg,#6B5FA7,#8b7cf6)",
    color: "#fff",
    fontWeight: "700",
    boxShadow: "0 12px 30px rgba(107,95,167,0.35)",
    cursor: "pointer",
  },
  paymentCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: "14px",
    marginBottom: "10px",
    border: "1px solid transparent",
  },

  paymentTitle: {
    fontSize: "14px",
    fontWeight: "700",
  },

  paymentSubText: {
    fontSize: "13px",
    marginTop: "2px",
    color: "#4b5563",
  },

  /* GCASH */
  gcashCard: {
    background: "#ecfdf5",
    borderColor: "#34d399",
  },

  /* BANK */
  bankCard: {
    background: "#eff6ff",
    borderColor: "#60a5fa",
  },

  changeBtn: {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B5FA7",
    cursor: "pointer",
  },

  paymentNote: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#6b7280",
  },
  logoutMessage: {
    marginTop: "-10px",
    fontSize: "13px",
    color: "#4b5563",
    lineHeight: "1.5",
  },

  logout: {
    marginTop: "1px",
    padding: "14px 28px",
    borderRadius: "999px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
};
