import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";

import InventoryBarChart from "../components-admin/charts/InventoryBarChart";
import PerformancePieChart from "../components-admin/charts/PerformancePieChart";

export default function SalesReport() {
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
            <div className="sales-report-header">
              <h2>Sales Report</h2>

              <div className="sales-report-actions">
                <select className="month-select">
                  <option>November 2025</option>
                  <option>October 2025</option>
                  <option>September 2025</option>
                </select>

                <button className="export-btn">
                  ⬇ Export as PDF
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="sales-stats">
              <div className="stat-card">
                <h4>PHP 200,000</h4>
                <p>Total Sales</p>
              </div>

              <div className="stat-card">
                <h4>10,000</h4>
                <p>Total Orders</p>
              </div>

              <div className="stat-card">
                <h4>67</h4>
                <p>Rush Orders</p>
              </div>

              <div className="stat-card">
                <h4>Mesh Shorts</h4>
                <p>Top Product</p>
              </div>
            </div>

            {/* CHARTS */}
            <div className="sales-charts">
              <div>
                <h3 className="section-title">
                  Product Category Breakdown
                </h3>
                <div className="card">
                  <InventoryBarChart />
                </div>
              </div>

              <div>
                <h3 className="section-title">
                  Order Distribution
                </h3>
                <div className="card">
                  <PerformancePieChart />
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="card">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Nov 2</td>
                    <td>#0248</td>
                    <td>Dri-fit Jersey</td>
                    <td>15</td>
                    <td className="status completed">Completed</td>
                  </tr>
                  <tr>
                    <td>Nov 7</td>
                    <td>#0249</td>
                    <td>Mesh Shorts</td>
                    <td>10</td>
                    <td className="status progress">In Progress</td>
                  </tr>
                  <tr>
                    <td>Nov 16</td>
                    <td>#0250</td>
                    <td>Election Shirt</td>
                    <td>25</td>
                    <td className="status completed">Completed</td>
                  </tr>
                  <tr>
                    <td>Nov 21</td>
                    <td>#0251</td>
                    <td>Mesh Shorts</td>
                    <td>20</td>
                    <td className="status rush">Rush</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
