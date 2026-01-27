import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import {
  MdEdit,
  MdPersonAdd,
  MdArchive,
  MdClose,
  MdMoreVert,
} from "react-icons/md";

export default function UserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* USERS */
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Maria Santos",
      phone: "0912345678",
      username: "santos_123",
      role: "Customer",
      status: "Active",
      joined: "November 17, 2024",
    },
    {
      id: 2,
      name: "John Doe",
      phone: "0987654321",
      username: "doejh15",
      role: "Customer",
      status: "Active",
      joined: "November 17, 2024",
    },
    {
      id: 3,
      name: "Anna Cruz",
      phone: "09789654324",
      username: "cruzcute",
      role: "Customer",
      status: "Deactivated",
      joined: "November 17, 2024",
    },
  ]);

  /* ARCHIVE MODE */
  const [archiveMode, setArchiveMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  /* ADD USER MODAL */
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    phone: "",
    username: "",
    role: "Customer",
  });

  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const confirmArchive = () => {
    if (selectedUsers.length === 0) return;

    setUsers((prev) =>
      prev.map((u) =>
        selectedUsers.includes(u.id)
          ? { ...u, status: "Deactivated" }
          : u
      )
    );

    setSelectedUsers([]);
    setArchiveMode(false);
  };

  const addUser = () => {
    if (!newUser.name || !newUser.username) return;

    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newUser,
        status: "Active",
        joined: "Today",
      },
    ]);

    setNewUser({
      name: "",
      phone: "",
      username: "",
      role: "Customer",
    });

    setShowAdd(false);
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Deactivated" : "Active",
            }
          : u
      )
    );
  };

  return (
    <div className="app-layout">
      <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />

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
            <div className="audit-header user-header">
              <div>
                <h2>User Management</h2>
                <p>See information about all users</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  className="add-user-btn"
                  onClick={() => setShowAdd(true)}
                >
                  <MdPersonAdd /> Add User
                </button>

                <button
                  className="add-user-btn"
                  style={{ background: "#fde2e2", color: "#b91c1c" }}
                  onClick={() => {
                    if (!archiveMode) {
                      setArchiveMode(true);
                      return;
                    }
                    if (selectedUsers.length > 0) confirmArchive();
                    else setArchiveMode(false);
                  }}
                >
                  {archiveMode
                    ? selectedUsers.length > 0
                      ? "Archive"
                      : "Cancel"
                    : "Archive"}
                </button>
              </div>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="user-cards mobile-only">
              {users.map((u) => (
                <div key={u.id} className="user-card">
                  <div className="user-card-header">
                    <div className="user-left">
                      {archiveMode && (
                        <input
                          type="checkbox"
                          className="user-checkbox"
                          checked={selectedUsers.includes(u.id)}
                          onChange={() => toggleSelectUser(u.id)}
                        />
                      )}

                      <div className="user-avatar">👤</div>

                      <div className="user-main">
                        <div className="user-name">{u.name}</div>
                        <div className="user-username">@{u.username}</div>
                        <div className="user-phone">{u.phone}</div>
                        <div className="user-role">{u.role}</div>
                      </div>
                    </div>

                    {!archiveMode && (
                      <button
                        className="user-menu-btn"
                        onClick={() => toggleStatus(u.id)}
                      >
                        <MdMoreVert />
                      </button>
                    )}
                  </div>

                  <div className="user-divider" />

                  <div className="user-row">
                    <span className="user-label">Status</span>
                    <span
                      className={`status-pill ${
                        u.status === "Active" ? "active" : "deactivated"
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>

                  <div className="user-row">
                    <span className="user-label">Joined</span>
                    <span className="user-value">{u.joined}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="audit-table-wrapper desktop-only">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="user-cell">
                          {archiveMode && (
                            <input
                              type="checkbox"
                              className="user-checkbox"
                              checked={selectedUsers.includes(u.id)}
                              onChange={() => toggleSelectUser(u.id)}
                            />
                          )}

                          <div>
                            <strong>{u.name}</strong>
                            <div className="sub-text">{u.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td>{u.username}</td>
                      <td>{u.role}</td>
                      <td>
                        <span className={`status ${u.status.toLowerCase()}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>{u.joined}</td>
                      <td>
                        {!archiveMode && (
                          <button
                            className="icon-action"
                            onClick={() => toggleStatus(u.id)}
                          >
                            <MdEdit />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      <Footer />

      {/* ================= ADD USER MODAL ================= */}
{showAdd && (
  <div className="modal-overlay">
    <div className="modal modal-md">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Add New User</h3>
        <button
          className="modal-close"
          onClick={() => setShowAdd(false)}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="modal-body">

        <div className="form-group">
          <label>
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="09XXXXXXXXX"
            value={newUser.phone}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }
          />
        </div>

        <div className="form-group">
          <label>
            Username <span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
          <small className="helper-text">
            Select user access level
          </small>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="modal-divider" />

      {/* ACTIONS */}
      <div className="modal-actions">
        <button
          className="btn-secondary"
          onClick={() => setShowAdd(false)}
        >
          Cancel
        </button>

        <button
          className="primary-btn"
          onClick={addUser}
          disabled={!newUser.name || !newUser.username}
        >
          Save User
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}