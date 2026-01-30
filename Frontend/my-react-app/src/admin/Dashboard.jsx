import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import StatCard from "../components-admin/StatCard";

// Charts
import SalesLineChart from "../components-admin/charts/SalesLineChart";
import InventoryBarChart from "../components-admin/charts/InventoryBarChart";
import PerformancePieChart from "../components-admin/charts/PerformancePieChart";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-layout">
      {/* NAVBAR */}
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

      <div className="body-layout">
        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={closeSidebar}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="content" onClick={closeSidebar}>
          <div className="main-content dashboard-layout">

            {/* ===== PAGE HEADER ===== */}
            <div className="dashboard-header">
              <div>
                <h2>Dashboard</h2>
                <p className="subtext">
                  Overview of sales, orders, and inventory performance
                </p>
              </div>
            </div>

            {/* ===== TOP STATS ===== */}
            <div className="dashboard-stats">
              <StatCard value="PHP 74,776.00" label="Monthly Sales" />
              <StatCard value="500" label="Active Orders" />
              <StatCard value="50" label="Products Available" />
            </div>

            {/* ===== SALES OVERVIEW ===== */}
            <section className="dashboard-section">
              <div className="section-header">
                <h3 className="section-title">Sales Overview</h3>
              </div>
              <div className="card large-card">
                <SalesLineChart />
              </div>
            </section>

            {/* ===== LOWER ROW ===== */}
            <div className="dashboard-bottom">
              <section className="dashboard-section">
                <div className="section-header">
                  <h3 className="section-title">Inventory Overview</h3>
                </div>
                <div className="card">
                  <InventoryBarChart />
                </div>
              </section>

              <section className="dashboard-section">
                <div className="section-header">
                  <h3 className="section-title">Performance</h3>
                </div>
                <div className="card">
                  <PerformancePieChart />
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .dashboard-layout {
          padding: 28px 32px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .dashboard-header h2 {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .subtext {
          font-size: 14px;
          color: #666;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .dashboard-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.4px;
        }

        .dashboard-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .card {
          background: #ffffff;
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.16);
        }

        .large-card {
          min-height: 320px;
        }

        @media (max-width: 1024px) {
          .dashboard-bottom {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-layout {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
