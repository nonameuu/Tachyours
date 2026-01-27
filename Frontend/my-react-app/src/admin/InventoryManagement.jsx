import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import { MdAdd, MdEdit, MdArchive } from "react-icons/md";

export default function InventoryManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* MATERIALS */
  const [materials, setMaterials] = useState([
    {
      id: "MAT-TEL-001",
      name: "Dri-Fit Fabric (White)",
      qty: 50,
      unit: "Rolls",
      status: "in",
    },
    {
      id: "MAT-TEL-002",
      name: "Mesh Fabric (Black)",
      qty: 10,
      unit: "Rolls",
      status: "low",
    },
    {
      id: "MAT-SIN-003",
      name: "Sewing Thread",
      qty: 35,
      unit: "Spools",
      status: "in",
    },
  ]);

  /* ARCHIVE MODE */
  const [archiveMode, setArchiveMode] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  /* ADD / EDIT MODAL */
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [materialForm, setMaterialForm] = useState({
    id: "",
    name: "",
    qty: "",
    unit: "Rolls",
  });

  /* STATUS MAP */
  const statusMap = {
    in: { label: "In Stock", class: "status-in" },
    low: { label: "Low Stock", class: "status-low" },
  };

  /* TOGGLE SELECT */
  const toggleSelectMaterial = (id) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ARCHIVE */
  const confirmArchive = () => {
    if (selectedMaterials.length === 0) return;

    setMaterials((prev) =>
      prev.filter((m) => !selectedMaterials.includes(m.id))
    );

    setSelectedMaterials([]);
    setArchiveMode(false);
  };

  /* OPEN ADD */
  const openAddMaterial = () => {
    setEditingId(null);
    setMaterialForm({
      id: "",
      name: "",
      qty: "",
      unit: "Rolls",
    });
    setShowModal(true);
  };

  /* OPEN EDIT */
  const openEditMaterial = (material) => {
    setEditingId(material.id);
    setMaterialForm({
      id: material.id,
      name: material.name,
      qty: material.qty,
      unit: material.unit,
    });
    setShowModal(true);
  };

  /* SAVE */
  const saveMaterial = () => {
    if (!materialForm.name || !materialForm.qty) return;

    const qty = Number(materialForm.qty);
    const status = qty > 10 ? "in" : "low";

    if (editingId) {
      setMaterials((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, ...materialForm, qty, status }
            : m
        )
      );
    } else {
      setMaterials((prev) => [
        ...prev,
        {
          id:
            materialForm.id ||
            `MAT-${Date.now().toString().slice(-4)}`,
          name: materialForm.name,
          qty,
          unit: materialForm.unit,
          status,
        },
      ]);
    }

    setShowModal(false);
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
                <h2>Inventory Management</h2>
                <p>See information about all inventory</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="add-user-btn" onClick={openAddMaterial}>
                  <MdAdd /> Add Material
                </button>

                <button
                  className="add-user-btn"
                  style={{ background: "#fde2e2", color: "#b91c1c" }}
                  onClick={() => {
                    if (!archiveMode) {
                      setArchiveMode(true);
                      return;
                    }
                    if (selectedMaterials.length > 0) confirmArchive();
                    else setArchiveMode(false);
                  }}
                >
                  <MdArchive />
                  {archiveMode
                    ? selectedMaterials.length > 0
                      ? "Archive"
                      : "Cancel"
                    : "Archive"}
                </button>
              </div>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="mobile-only">
              {materials.length === 0 ? (
                <div className="empty-state">
                  <p>No materials available</p>
                  <button className="add-user-btn" onClick={openAddMaterial}>
                    <MdAdd /> Add Material
                  </button>
                </div>
              ) : (
                materials.map((m) => (
                  <div key={m.id} className="inventory-card">
                    <div className="inventory-card-header">
                      <div>
                        <div className="inventory-name">{m.name}</div>
                        <div className="inventory-id">{m.id}</div>
                      </div>

                      {!archiveMode && (
                        <button
                          className="icon-action"
                          onClick={() => openEditMaterial(m)}
                        >
                          <MdEdit />
                        </button>
                      )}
                    </div>

                    <div className="inventory-row">
                      <span>Quantity</span>
                      <strong>
                        {m.qty} {m.unit}
                      </strong>
                    </div>

                    <div className="inventory-row">
                      <span>Status</span>
                      <span
                        className={`status-dot ${statusMap[m.status].class}`}
                      >
                        {statusMap[m.status].label}
                      </span>
                    </div>

                    {archiveMode && (
                      <div className="inventory-archive">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(m.id)}
                          onChange={() => toggleSelectMaterial(m.id)}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="audit-table-wrapper desktop-only">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Material ID</th>
                    <th>Material Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {materials.map((m) => (
                    <tr key={m.id}>
                      <td>
                        {archiveMode && (
                          <input
                            type="checkbox"
                            className="user-checkbox"
                            checked={selectedMaterials.includes(m.id)}
                            onChange={() => toggleSelectMaterial(m.id)}
                          />
                        )}
                      </td>
                      <td>{m.id}</td>
                      <td>{m.name}</td>
                      <td>{m.qty}</td>
                      <td>{m.unit}</td>
                      <td>
                        <span
                          className={`status-badge ${statusMap[m.status].class}`}
                        >
                          {statusMap[m.status].label}
                        </span>
                      </td>
                      <td>
                        {!archiveMode && (
                          <button
                            className="icon-action"
                            onClick={() => openEditMaterial(m)}
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

      {/* ================= ADD / EDIT MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal modal-md">
            <div className="modal-header">
              <h3>{editingId ? "Edit Material" : "Add Material"}</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Material ID</label>
                <input
                  placeholder="Auto-generated if empty"
                  value={materialForm.id}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      id: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Material Name <span className="required">*</span>
                </label>
                <input
                  value={materialForm.name}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>
                  Quantity <span className="required">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={materialForm.qty}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      qty: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Unit</label>
                <select
                  value={materialForm.unit}
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      unit: e.target.value,
                    })
                  }
                >
                  <option>Rolls</option>
                  <option>Spools</option>
                  <option>Bottles</option>
                  <option>Bundles</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="primary-btn"
                onClick={saveMaterial}
                disabled={!materialForm.name || !materialForm.qty}
              >
                Save Material
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
