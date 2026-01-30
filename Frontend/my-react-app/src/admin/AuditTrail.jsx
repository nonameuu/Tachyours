import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";

/* helper para sa action badge */
function getActionClass(action) {
  const text = action.toLowerCase();
  if (text.includes("login")) return "login";
  if (text.includes("transaction")) return "transaction";
  if (text.includes("update")) return "update";
  return "default";
}

export default function AuditTrail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const audits = [
    {
      id: "10012",
      name: "ADMIN",
      action: "Logged In",
      module: "Login",
      time: "June 1, 2025, 6:40 PM",
    },
    {
      id: "10023",
      name: "ADMIN",
      action: "Completed a Gcash Transaction",
      module: "Order Management",
      time: "June 1, 2025, 6:40 PM",
    },
    {
      id: "10034",
      name: "ADMIN",
      action: "Logged In",
      module: "Login",
      time: "June 1, 2025, 6:40 PM",
    },
    {
      id: "10045",
      name: "ADMIN",
      action: "Logged In",
      module: "Login",
      time: "June 1, 2025, 6:40 PM",
    },
    {
      id: "10056",
      name: "ADMIN",
      action: "Updated a product",
      module: "Product Management",
      time: "June 1, 2025, 6:40 PM",
    },
  ];

  const filteredAudits = audits.filter(
    (a) =>
      a.id.includes(search) ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="body-layout">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        <main className="content">
          <div className="main-content">

            {/* HEADER */}
            <div className="audit-header">
              <h2>Audit Trail</h2>
              <p>System and administrative activity logs</p>
            </div>

            {/* SEARCH */}
            <div className="audit-search">
              <input
                type="text"
                placeholder="Search by ID, action, module, or user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* MOBILE CARDS */}
            <div className="audit-cards mobile-only">
              {filteredAudits.length === 0 && (
                <div className="empty-state">
                  No audit logs available
                </div>
              )}

              {filteredAudits.map((audit, index) => (
                <div
                  key={audit.id}
                  className={`audit-card ${
                    index === 0 ? "latest-audit" : ""
                  }`}
                >
                  <span
                    className={`action-badge ${getActionClass(audit.action)}`}
                  >
                    {audit.action}
                  </span>

                  <div className="audit-meta">
                    <strong>{audit.name}</strong>
                    <span>{audit.module}</span>
                  </div>

                  <div className="audit-time">{audit.time}</div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="audit-table-wrapper desktop-only">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Audit ID</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Module</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAudits.map((audit, index) => (
                    <tr
                      key={audit.id}
                      className={index === 0 ? "latest-audit" : ""}
                    >
                      <td>{audit.id}</td>
                      <td>{audit.name}</td>
                      <td>
                        <span
                          className={`action-badge ${getActionClass(
                            audit.action
                          )}`}
                        >
                          {audit.action}
                        </span>
                      </td>
                      <td>{audit.module}</td>
                      <td>{audit.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* ================= CSS ================= */}
      <style>{`
        .audit-header {
          margin-bottom: 20px;
        }

        .audit-header p {
          font-size: 14px;
          color: #666;
        }

        .audit-search {
          margin-bottom: 20px;
        }

        .audit-search input {
          width: 100%;
          max-width: 420px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        .action-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .action-badge.login {
          background: #eef2ff;
          color: #4338ca;
        }

        .action-badge.transaction {
          background: #ecfeff;
          color: #0f766e;
        }

        .action-badge.update {
          background: #fef3c7;
          color: #92400e;
        }

        .action-badge.default {
          background: #f3f4f6;
          color: #374151;
        }

        .audit-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .audit-card {
          background: #fff;
          padding: 14px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .audit-card.latest-audit {
          border-left: 4px solid #6c63ff;
        }

        .audit-meta {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #555;
        }

        .audit-time {
          margin-top: 6px;
          font-size: 12px;
          color: #888;
        }

        .audit-table-wrapper {
          background: #fff;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        }

        .audit-table {
          width: 100%;
          border-collapse: collapse;
        }

        .audit-table th {
          text-align: left;
          font-size: 13px;
          color: #666;
          padding: 12px;
          border-bottom: 1px solid #eee;
        }

        .audit-table td {
          padding: 14px 12px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
        }

        .audit-table tr.latest-audit {
          background: #fafaff;
        }

        .empty-state {
          text-align: center;
          color: #999;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
