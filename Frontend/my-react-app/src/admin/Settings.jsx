import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import {
  MdSave,
  MdLock,
  MdNotifications,
  MdPerson,
  MdSecurity,
} from "react-icons/md";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* NAVBAR */}
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

      <div className="body-layout">

        {/* OVERLAY (mobile only) */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* MAIN CONTENT */}
        <main
          className="content"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <div className="main-content">

            {/* HEADER */}
            <div className="audit-header">
              <h2>Settings</h2>
              <p>Manage your account and system preferences</p>
            </div>

            {/* SETTINGS SECTIONS */}
            <div className="settings-grid">

              {/* PROFILE */}
              <SettingsCard
                icon={<MdPerson />}
                title="Profile Information"
              >
                <Input label="Full Name" defaultValue="Admin User" />
                <Input label="Email Address" defaultValue="admin@tachyons.com" />
                <Button />
              </SettingsCard>

              {/* PASSWORD */}
              <SettingsCard
                icon={<MdLock />}
                title="Change Password"
              >
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm Password" type="password" />
                <Button />
              </SettingsCard>

              {/* NOTIFICATIONS */}
              <SettingsCard
                icon={<MdNotifications />}
                title="Notifications"
              >
                <Toggle label="Email Notifications" />
                <Toggle label="Order Updates" />
                <Toggle label="Low Stock Alerts" />
                <Button />
              </SettingsCard>

              {/* SECURITY */}
              <SettingsCard
                icon={<MdSecurity />}
                title="Security"
              >
                <Toggle label="Two-Factor Authentication" />
                <Toggle label="Login Alerts" />
                <Button />
              </SettingsCard>

            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function SettingsCard({ icon, title, children }) {
  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <span className="settings-icon">{icon}</span>
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
}

function Input({ label, type = "text", defaultValue }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} defaultValue={defaultValue} />
    </div>
  );
}

function Toggle({ label }) {
  return (
    <div className="toggle-row">
      <span>{label}</span>
      <input type="checkbox" />
    </div>
  );
}

function Button() {
  return (
    <button className="primary-btn">
      <MdSave />
      Save Changes
    </button>
  );
}
