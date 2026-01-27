import React, { useState } from "react";
import DashboardLayout from "../components-customer/layout/DashboardLayout";
import SettingsMenu from "../components-customer/settings/SettingsMenu";
import SettingsContent from "../components-customer/settings/SettingsContent";

export default function SettingsPage() {
  const [active, setActive] = useState("account");

  return (
    <DashboardLayout>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Settings</h1>

        <SettingsMenu active={active} setActive={setActive} />

        <div style={styles.card}>
          <SettingsContent active={active} />
        </div>
      </div>
    </DashboardLayout>
  );
}

/* STYLES */
const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "18px",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
};
