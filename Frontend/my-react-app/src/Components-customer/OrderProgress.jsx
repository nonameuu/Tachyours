import React, { useLayoutEffect, useRef, useState } from "react";

export default function OrderProgress({ activeTab, setActiveTab }) {
  const tabs = [
    "All",
    "To Confirm",
    "To Pay",
    "In Progress",
    "Released",
    "Completed",
    "Cancel",
  ];

  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({
    width: 0,
    x: 0,
  });

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const index = tabs.indexOf(activeTab);
    const btn = nav.children[index + 1]; // +1 because indicator is first

    if (btn) {
      setIndicator({
        width: btn.offsetWidth,
        x: btn.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div style={styles.page}>
      <div style={styles.navWrapper}>
        <div style={styles.nav} ref={navRef}>
          {/* 🔥 SLIDING INDICATOR (NO DELAY) */}
          <span
            style={{
              ...styles.indicator,
              width: indicator.width,
              transform: `translateX(${indicator.x}px)`,
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.navItem,
                ...(activeTab === tab ? styles.active : {}),
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "12px",
    background: "#fff",
  },

  navWrapper: {
    borderRadius: "16px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  nav: {
    position: "relative",
    display: "flex",
    gap: "8px",
    padding: "0 12px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },

  navItem: {
    background: "none",
    border: "none",
    padding: "18px 22px",
    fontSize: "14px",
    cursor: "pointer",
    color: "#666",
    whiteSpace: "nowrap",
    zIndex: 1,
  },

  active: {
    color: "#6A5ACD",
    fontWeight: "600",
  },

  /* 🚀 INSTANT + SMOOTH */
  indicator: {
    position: "absolute",
    bottom: "4px",
    left: 0,
    height: "3px",
    background: "#6A5ACD",
    borderRadius: "6px",

    /* NO DELAY, STILL SMOOTH */
    transition: "transform 0.25s ease-out, width 0.25s ease-out",
  },
};
