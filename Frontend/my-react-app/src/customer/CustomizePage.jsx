
import React, { useState } from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import { useNavigate } from "react-router-dom";

export default function Customize() {
  const navigate = useNavigate();
  const [size, setSize] = useState("M");
  const [file, setFile] = useState(null);

  return (
    <>
    {/* NAVBAR */}
      <Navbar />
    <div className="page">
      <div className="card">
        {/* LEFT UPLOAD */}
        <div className="upload-section">
          <p className="brand">TACHYOURS</p>

          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

            {!file ? (
              <>
                <div className="upload-icon">⬇️</div>
                <p className="upload-title">Upload Sample/ Design</p>
                <p className="upload-sub">
                  Drag and drop your design or upload file
                </p>
              </>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded design"
                className="preview-image"
              />
            )}
          </label>
        </div>

        {/* RIGHT FORM */}
        <div className="form-section">
          <div className="field">
            <label>Product type</label>
            <select>
              <option>Dri-fit Short</option>
              <option>Cotton Shirt</option>
              <option>Jersey</option>
            </select>
          </div>

          <div className="field">
            <label>Fabric type</label>
            <select>
              <option>Cotton</option>
              <option>Polyester</option>
            </select>
          </div>

          <div className="field">
            <label>Size</label>
            <div className="sizes">
              {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                <button
                  key={s}
                  className={size === s ? "size active" : "size"}
                  onClick={() => setSize(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Quantity</label>
            <input type="number" min="1" defaultValue="1" />
          </div>

          <div className="field">
            <label>Additional Notes</label>
            <input
              type="text"
              placeholder="Please print logo on left chest"
            />
          </div>

          <div className="actions">
            <button className="cart" type="button">
              Add to Cart
            </button>
            <button className="buy" type="button" onClick={() => navigate("/checkout")}>
              Check Out
            </button>
          </div>
        </div>
      </div>
      

      {/* STYLES */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Inter, Segoe UI, sans-serif;
        }

        .page {
          padding: 40px;
          display: flex;
          justify-content: center;
          background: #f5f5f7;
        }

        .card {
          max-width: 1100px;
          width: 100%;
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e5e5e5;
          padding: 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .brand {
          font-weight: 600;
          margin-bottom: 16px;
        }

        /* Upload */
        .upload-box {
          border: 2px dashed #ccc;
          border-radius: 14px;
          padding: 40px 20px;
          text-align: center;
          cursor: pointer;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .upload-icon {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .upload-title {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .upload-sub {
          font-size: 13px;
          color: #666;
        }

        .preview-image {
          width: 100%;
          max-height: 300px;
          object-fit: contain;
          border-radius: 10px;
        }

        /* Form */
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field label {
          display: block;
          font-size: 14px;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        .sizes {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .size {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: #fff;
          font-size: 13px;
          cursor: pointer;
        }

        .size.active {
          background: #d8ceeb;
          border-color: #6b5fa7;
          font-weight: 600;
        }

        .actions {
          display: flex;
          gap: 14px;
          margin-top: 10px;
        }

        .cart {
          padding: 10px 18px;
          border-radius: 10px;
          border: none;
          background: #e5e5e5;
          cursor: pointer;
        }

        .buy {
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          background: #d8ceeb;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>

    {/* FOOTER */}
          <Footer />
    </>
  );
  
}
