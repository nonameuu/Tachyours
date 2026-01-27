import React, { useState } from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import { useNavigate } from "react-router-dom";
 
export default function BuyNow() {
  const navigate = useNavigate();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  return (
    <>
      <Navbar />

      <main className="page">
        <div className="product-card">
          {/* LEFT – IMAGE */}
          <div className="image-section">
            <span className="brand">TACHYOURS</span>

            <div className="image-box">
              <img
                src="/assets/products/product1.jpg"
                alt="Bulls Design Short"
              />
            </div>

            <h3 className="product-name">BULLS Design Short</h3>
            <p className="price">₱1,499.00</p>
          </div>

          {/* RIGHT – DETAILS */}
          <div className="details-section">
            <div className="field">
              <label>Fabric</label>
              <input type="text" value="Cotton" readOnly />
            </div>

            <div className="field">
              <label>Select Size</label>
              <div className="sizes">
                {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                  <button
                    key={s}
                    className={`size ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Quantity</label>
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="field">
              <label>Additional Notes</label>
              <textarea
                placeholder="e.g. Print logo on left chest"
              />
            </div>

            <div className="actions">
              <button className="cart">Add to Cart</button>
              <button
                className="checkout"
                onClick={() => navigate("/checkout")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ================= STYLES ================= */}
        <style>{`
          * {
            box-sizing: border-box;
            font-family: Inter, system-ui, sans-serif;
          }

          .page {
            padding: 48px 20px;
            display: flex;
            justify-content: center;
            background: linear-gradient(180deg,#f5f5f7,#fafafa);
          }

          .product-card {
            width: 100%;
            max-width: 1200px;
            background: #fff;
            border-radius: 24px;
            padding: 36px;
            display: grid;
            grid-template-columns: 1fr 1.1fr;
            gap: 48px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }

          /* IMAGE */
          .image-section {
            text-align: center;
          }

          .brand {
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1px;
            color: #6b5fa7;
          }

          .image-box {
            margin: 18px auto;
            border-radius: 20px;
            padding: 24px;
            background: linear-gradient(135deg,#ede9fe,#ffffff);
          }

          .image-box img {
            width: 100%;
            max-width: 420px;
            display: block;
            margin: auto;
          }

          .product-name {
            margin-top: 14px;
            font-size: 20px;
            font-weight: 700;
          }

          .price {
            font-size: 18px;
            font-weight: 800;
            color: #6b5fa7;
          }

          /* DETAILS */
          .details-section {
            display: flex;
            flex-direction: column;
            gap: 22px;
          }

          .field label {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 6px;
            display: block;
          }

          .field input,
          .field textarea {
            width: 100%;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid #d1d5db;
            font-size: 14px;
          }

          textarea {
            min-height: 80px;
            resize: vertical;
          }

          /* SIZE */
          .sizes {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .size {
            padding: 8px 14px;
            border-radius: 10px;
            border: 1px solid #d1d5db;
            background: #fff;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
          }

          .size.active {
            background: #6b5fa7;
            color: #fff;
            border-color: #6b5fa7;
          }

          /* QTY */
          .qty {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .qty button {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            border: none;
            background: #e5e7eb;
            font-size: 18px;
            cursor: pointer;
          }

          .qty span {
            font-size: 16px;
            font-weight: 600;
          }

          /* ACTIONS */
          .actions {
            display: flex;
            gap: 18px;
            margin-top: 10px;
          }

          .cart {
            flex: 1;
            padding: 14px;
            border-radius: 16px;
            border: 1px solid #d1d5db;
            background: #fff;
            font-weight: 700;
            cursor: pointer;
          }

          .checkout {
            flex: 1;
            padding: 14px;
            border-radius: 16px;
            border: none;
            background: #6b5fa7;
            color: #fff;
            font-weight: 800;
            cursor: pointer;
          }

          @media (max-width: 900px) {
            .product-card {
              grid-template-columns: 1fr;
              padding: 28px;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}
