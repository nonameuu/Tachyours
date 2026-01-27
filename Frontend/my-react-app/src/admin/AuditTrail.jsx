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
  return "";
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
              <p>See information about all audit logs</p>
            </div>

            {/* SEARCH */}
            <div className="audit-search">
              <input
                type="text"
                placeholder="Search audit logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* ================= MOBILE CARDS ================= */}
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
                  <div className="audit-action">
                    <span
                      className={`action-badge ${getActionClass(
                        audit.action
                      )}`}
                    >
                      {audit.action}
                    </span>
                  </div>

                  <div className="audit-user">{audit.name}</div>

                  <div className="audit-module">{audit.module}</div>

                  <div className="audit-time">{audit.time}</div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="audit-table-wrapper desktop-only">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Audit ID</th>
                    <th>Name</th>
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
    </div>
  );
}
