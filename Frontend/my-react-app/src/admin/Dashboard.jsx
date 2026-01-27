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
        {/* OVERLAY (mobile only) */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={closeSidebar}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()} // ✅ prevent auto-close
        >
          <Sidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="content" onClick={closeSidebar}>
          <div className="main-content dashboard-layout">

            {/* ===== TOP STATS ===== */}
            <div className="dashboard-stats">
              <StatCard value="PHP 74,776.00" label="Monthly Sales" />
              <StatCard value="500" label="Active Orders" />
              <StatCard value="50" label="Products Available" />
            </div>

            {/* ===== SALES OVERVIEW ===== */}
            <section className="dashboard-section">
              <h3 className="section-title">Sales Overview</h3>
              <div className="card large-card">
                <SalesLineChart />
              </div>
            </section>

            {/* ===== BOTTOM ROW ===== */}
            <div className="dashboard-bottom">
              <section className="dashboard-section">
                <h3 className="section-title">Inventory Overview</h3>
                <div className="card">
                  <InventoryBarChart />
                </div>
              </section>

              <section className="dashboard-section">
                <h3 className="section-title">Performance</h3>
                <div className="card">
                  <PerformancePieChart />
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
