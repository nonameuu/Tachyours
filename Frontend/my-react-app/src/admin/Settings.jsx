import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import {
  MdLocalOffer,
  MdArrowForward,
  MdCheckCircle,
  MdCancel,
  MdPerson,
  MdClose,
} from "react-icons/md";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("special");

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

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

            <div className="settings-header">
              <h2>Settings</h2>
              <p>Administrative configuration and controls</p>
            </div>

            <div className="settings-grid">

              {/* DISCOUNTS */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <MdLocalOffer />
                  <h4>Discounts</h4>
                </div>

                <p className="hint">
                  Discounts apply system-wide to eligible orders.
                </p>

                <div className="discount-type">
                  <div>
                    <strong>Special Discount</strong>
                    <p>Manual discounts (Senior, PWD, VIP).</p>
                  </div>
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      setActiveTab("special");
                      setShowModal(true);
                    }}
                  >
                    Manage Rules <MdArrowForward />
                  </button>
                </div>

                <div className="discount-type">
                  <div>
                    <strong>Bulk Discount</strong>
                    <p>Automatic discounts based on quantity.</p>
                  </div>
                  <button
                    className="secondary-btn"
                    onClick={() => {
                      setActiveTab("bulk");
                      setShowModal(true);
                    }}
                  >
                    Manage Rules <MdArrowForward />
                  </button>
                </div>
              </div>

              {/* ADMIN ACCOUNT */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <MdPerson />
                  <h4>Admin Account</h4>
                </div>

                <div className="readonly-row">
                  <span>Name</span>
                  <strong>Admin User</strong>
                </div>

                <div className="readonly-row">
                  <span>Email</span>
                  <strong>admin@tachyons.com</strong>
                </div>

                <div className="readonly-row">
                  <span>Role</span>
                  <strong>Administrator</strong>
                </div>

                <button className="primary-btn full-width">
                  Go to Profile
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Manage Discount Rules</h3>
              <button onClick={() => setShowModal(false)}>
                <MdClose />
              </button>
            </div>

            <div className="modal-tabs">
              <button
                className={activeTab === "special" ? "active" : ""}
                onClick={() => setActiveTab("special")}
              >
                Special Discount
              </button>
              <button
                className={activeTab === "bulk" ? "active" : ""}
                onClick={() => setActiveTab("bulk")}
              >
                Bulk Discount
              </button>
            </div>

            <div className="modal-content">
              {activeTab === "special" && (
                <>
                  <RuleItem
                    title="Senior / PWD"
                    description="Manual discount applied per order."
                    active
                  />
                  <RuleItem
                    title="VIP Customer"
                    description="Special pricing for VIP clients."
                  />
                </>
              )}

              {activeTab === "bulk" && (
                <>
                  <RuleItem
                    title="10–19 items"
                    description="5% discount"
                    active
                  />
                  <RuleItem
                    title="20–49 items"
                    description="10% discount"
                    active
                  />
                </>
              )}

              <button className="primary-btn full-width">
                + Add Rule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CSS ================= */}
      <style>{`
        .settings-header { margin-bottom: 24px; }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }

        .settings-card {
          background: #fff;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        }

        .settings-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .settings-card-header svg { color: #6c63ff; }

        .discount-type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fafafa;
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 12px;
        }

        .discount-type p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #666;
        }

        .readonly-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .primary-btn {
          background: #6c63ff;
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
        }

        .secondary-btn {
          background: #f1f0ff;
          color: #4b3fd1;
          border: none;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          gap: 6px;
        }

        .full-width { width: 100%; margin-top: 16px; }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: #fff;
          width: 420px;
          border-radius: 16px;
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-header button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
        }

        .modal-tabs {
          display: flex;
          border-bottom: 1px solid #eee;
        }

        .modal-tabs button {
          flex: 1;
          padding: 12px;
          border: none;
          background: none;
          cursor: pointer;
          font-weight: 600;
        }

        .modal-tabs .active {
          color: #6c63ff;
          border-bottom: 2px solid #6c63ff;
        }

        .modal-content {
          padding: 20px;
        }

        .rule-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #fafafa;
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .rule-item p {
          font-size: 13px;
          color: #666;
        }

        .rule-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }

        .rule-status.active { color: #1e7f43; }
        .rule-status.inactive { color: #b42318; }
      `}</style>
    </div>
  );
}

/* ===== RULE ITEM ===== */
function RuleItem({ title, description, active }) {
  return (
    <div className="rule-item">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <span className={`rule-status ${active ? "active" : "inactive"}`}>
        {active ? <MdCheckCircle /> : <MdCancel />}
        {active ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
