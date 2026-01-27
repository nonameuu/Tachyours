import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "../Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="dashboard-wrapper">
        {/* SIDEBAR */}
        <Sidebar />

        {/* PAGE CONTENT */}
        <main className="dashboard-content">
          {children}
        </main>
      </div>

      <Footer />

      {/* GLOBAL DASHBOARD LAYOUT STYLES */}
      <style>{`
        .dashboard-wrapper {
          display: flex;
          gap: 24px;
          padding: 24px;
          background: #f7f7fb;
          min-height: 100vh;
        }

        .dashboard-content {
          flex: 1;
          max-width: 1100px;
        }

        @media (max-width: 900px) {
          .dashboard-wrapper {
            flex-direction: column;
            padding-bottom: 90px; /* space for mobile sidebar */
          }

          .dashboard-content {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
