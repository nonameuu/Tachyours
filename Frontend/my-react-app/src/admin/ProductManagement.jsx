import { useState } from "react";
import Sidebar from "../components-admin/Sidebar";
import Navbar from "../components-admin/Navbar";
import Footer from "../components-admin/Footer";
import {
  MdAdd,
  MdEdit,
  MdArchive,
  MdClose,
} from "react-icons/md";

export default function ProductManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* PRODUCTS */
  const [products, setProducts] = useState([
    {
      id: "TC-DRF-001",
      name: "Dri-fit Jersey",
      category: "Jersey",
      price: 350,
      date: "November 1, 2024",
    },
    {
      id: "TC-MSH-002",
      name: "Mesh Shorts",
      category: "Shorts",
      price: 280,
      date: "November 2, 2024",
    },
  ]);

  /* ARCHIVE MODE */
  const [archiveMode, setArchiveMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  /* ADD / EDIT MODAL */
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
  });

  /* TOGGLE SELECT */
  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  /* ARCHIVE */
  const confirmArchive = () => {
    if (selectedProducts.length === 0) return;

    setProducts((prev) =>
      prev.filter((p) => !selectedProducts.includes(p.id))
    );

    setSelectedProducts([]);
    setArchiveMode(false);
  };

  /* OPEN ADD */
  const openAddProduct = () => {
    setEditingId(null);
    setProductForm({
      id: "",
      name: "",
      category: "",
      price: "",
    });
    setShowModal(true);
  };

  /* OPEN EDIT */
  const openEditProduct = (product) => {
    setEditingId(product.id);
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    });
    setShowModal(true);
  };

  /* SAVE */
  const saveProduct = () => {
    if (!productForm.name || !productForm.category || !productForm.price)
      return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...productForm } : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id:
            productForm.id ||
            `PRD-${Date.now().toString().slice(-4)}`,
          name: productForm.name,
          category: productForm.category,
          price: Number(productForm.price),
          date: "Today",
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
                <h2>Product Management</h2>
                <p>See information about all products</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="add-user-btn" onClick={openAddProduct}>
                  <MdAdd /> Add Product
                </button>

                <button
                  className="add-user-btn"
                  style={{ background: "#fde2e2", color: "#b91c1c" }}
                  onClick={() => {
                    if (!archiveMode) {
                      setArchiveMode(true);
                      return;
                    }
                    if (selectedProducts.length > 0) confirmArchive();
                    else setArchiveMode(false);
                  }}
                >
                  <MdArchive />
                  {archiveMode
                    ? selectedProducts.length > 0
                      ? "Archive"
                      : "Cancel"
                    : "Archive"}
                </button>
              </div>
            </div>

            {/* ================= MOBILE PRODUCT CARDS ================= */}
            <div className="product-cards mobile-only">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-card-header">
                    <div>
                      <div className="product-name">{p.name}</div>
                      <div className="product-id">{p.id}</div>
                    </div>

                    <button
                      className="icon-action"
                      onClick={() => openEditProduct(p)}
                    >
                      <MdEdit />
                    </button>
                  </div>

                  <span className="product-category">{p.category}</span>

                  <div className="product-price">
                    ₱{p.price.toFixed(2)}
                  </div>

                  <div className="product-date">{p.date}</div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="audit-table-wrapper desktop-only">
              <table className="audit-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {archiveMode && (
                          <input
                            type="checkbox"
                            className="user-checkbox"
                            checked={selectedProducts.includes(p.id)}
                            onChange={() => toggleSelectProduct(p.id)}
                          />
                        )}
                      </td>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.date}</td>
                      <td>{p.category}</td>
                      <td>₱{p.price.toFixed(2)}</td>
                      <td>
                        <button
                          className="icon-action"
                          onClick={() => openEditProduct(p)}
                        >
                          <MdEdit />
                        </button>
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

      {/* ================= ADD / EDIT PRODUCT MODAL ================= */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal modal-md">
            <div className="modal-header">
              <h3>{editingId ? "Edit Product" : "Add Product"}</h3>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Product ID</label>
                <input
                  placeholder="Auto-generated if empty"
                  value={productForm.id}
                  onChange={(e) =>
                    setProductForm({ ...productForm, id: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={productForm.category}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select category</option>
                  <option>Jersey</option>
                  <option>Shorts</option>
                  <option>T-shirt</option>
                  <option>Sando</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price (₱) *</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                />
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
                onClick={saveProduct}
                disabled={
                  !productForm.name ||
                  !productForm.category ||
                  !productForm.price
                }
              >
                {editingId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
