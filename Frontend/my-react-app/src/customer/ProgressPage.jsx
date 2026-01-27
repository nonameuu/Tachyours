import React, { useState } from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import Sidebar from "../components-customer/Sidebar";
import OrderProgress from "../components-customer/OrderProgress";
import OrderList from "../components-customer/OrderList";

export default function Progress() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="content">
          <OrderProgress
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <OrderList activeTab={activeTab} />
        </div>
      </div>

      <Footer />

      {/* ================= CSS ================= */}
      <style>{`
        .page-wrapper {
          display: flex;
          gap: 24px;
          padding: 24px;
          background: #f7f7fb;
          min-height: 100vh;
        }

        .content {
          flex: 1;
          max-width: 1100px;
        }

        @media (max-width: 900px) {
          .page-wrapper {
            flex-direction: column;
            padding-bottom: 90px; /* space for mobile sidebar */
          }
        }
      `}</style>
    </>
  );
}
