import React, { useState } from "react";
import Navbar from "../components-customer/layout/Navbar";
import Footer from "../components-customer/layout/Footer";
import { useNavigate } from "react-router-dom";


export default function CheckoutPage() {
  const navigate = useNavigate();
  const price = 218;
  const quantity = 50;
  const deliveryFee = 80;

  const subtotal = price * quantity;

  const [contact, setContact] = useState("+63 9*********");
  const [address, setAddress] = useState(
    "43 Rosario St., Brgy. San Juan, Taytay, Rizal"
  );

  const [deliveryType, setDeliveryType] = useState("Pickup");
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [paymentType, setPaymentType] = useState("Full");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const isDownpaymentAllowed = quantity >= 50;

  const baseTotal =
    subtotal + (deliveryType === "Delivery" ? deliveryFee : 0);

  const total =
    paymentType === "Downpayment" ? baseTotal / 2 : baseTotal;

  const applyVoucher = () => {
    if (voucher === "SAVE10") {
      setDiscount(10);
      alert("Voucher applied!");
    } else {
      alert("Invalid voucher");
    }
  };

  return (
    <>
      <Navbar />

      <main className="checkout-root">
        <div className="checkout-layout">

          {/* LEFT */}
          <section className="checkout-left">
            <header>
              <h1>Checkout</h1>
              <p className="sub">
                Review your order and complete payment
              </p>
            </header>

            {/* PRODUCT */}
            <div className="card product-card">
              <img src="/assets/products/product1.jpg" alt="" />
              <div className="product-info">
                <h3>Basketball Jersey</h3>
                <span>Quantity: {quantity}</span>
              </div>
              <strong>₱{subtotal}</strong>
            </div>

            {/* CUSTOMER */}
            <div className="card">
              <h4>Customer Information</h4>

              <label>Contact Number</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />

              <label>Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <p className="hint">
                Please ensure your contact and address are correct.
              </p>
            </div>

            {/* DELIVERY */}
            <div className="card">
              <h4>Delivery Method</h4>

              <div className="options">
                {["Pickup", "Delivery"].map((type) => (
                  <button
                    key={type}
                    className={deliveryType === type ? "active" : ""}
                    onClick={() => setDeliveryType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {deliveryType === "Delivery" && (
                <p className="hint">
                  Delivery fee of ₱{deliveryFee} will be added.
                </p>
              )}
            </div>

            {/* PAYMENT */}
            <div className="card">
              <h4>Payment</h4>

              <label>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>GCash</option>
              </select>

              <div className="options">
                <button
                  className={paymentType === "Full" ? "active" : ""}
                  onClick={() => setPaymentType("Full")}
                >
                  Full Payment
                </button>

                {isDownpaymentAllowed && (
                  <button
                    className={paymentType === "Downpayment" ? "active" : ""}
                    onClick={() => setPaymentType("Downpayment")}
                  >
                    Downpayment (50%)
                  </button>
                )}
              </div>

              {!isDownpaymentAllowed && (
                <p className="hint">
                  Downpayment is available for 50 items and above.
                </p>
              )}
            </div>

            {/* VOUCHER */}
            <div className="card">
              <h4>Voucher</h4>

              <div className="voucher">
                <input
                  placeholder="Enter voucher code"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                />
                <button onClick={applyVoucher}>Apply</button>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <aside className="checkout-right">
            <div className="summary">
              <h3>Order Summary</h3>

              <div className="row">
                <span>Subtotal</span>
                <span>₱{subtotal}</span>
              </div>

              {deliveryType === "Delivery" && (
                <div className="row">
                  <span>Delivery Fee</span>
                  <span>₱{deliveryFee}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="row discount">
                  <span>Discount</span>
                  <span>-{discount}%</span>
                </div>
              )}

              <div className="total">
                <span>Total to Pay</span>
                <span>₱{total}</span>
              </div>

              <button className="place" onClick={() => navigate("/progress")}>
                Place Order
              </button>

              <button className="back" onClick={() => window.history.back()}>
                ← Back to cart
              </button>
            </div>
          </aside>

        </div>
      </main>

      <Footer />

      {/* ================= STYLES ================= */}
      <style>{`
        * {
          font-family: Inter, system-ui, sans-serif;
          box-sizing: border-box;
        }

        .checkout-root {
          background: linear-gradient(180deg,#f6f6fb,#fafafa);
          padding: 48px 20px;
        }

        .checkout-layout {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 36px;
        }

        h1 {
          font-size: 34px;
          margin-bottom: 6px;
        }

        .sub {
          color: #6b7280;
          margin-bottom: 28px;
        }

        .card {
          background: #fff;
          padding: 22px;
          border-radius: 18px;
          margin-bottom: 22px;
          box-shadow: 0 10px 28px rgba(0,0,0,.06);
        }

        .product-card {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .product-card img {
          width: 72px;
          height: 72px;
          border-radius: 14px;
          object-fit: cover;
        }

        .product-info h3 {
          margin: 0;
          font-size: 16px;
        }

        label {
          font-size: 13px;
          font-weight: 600;
          display: block;
          margin-top: 14px;
        }

        input, textarea, select {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ddd;
          margin-top: 6px;
        }

        textarea {
          resize: none;
          min-height: 90px;
        }

        .options {
          display: flex;
          gap: 12px;
          margin-top: 14px;
        }

        .options button {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: #fff;
          font-weight: 600;
          cursor: pointer;
        }

        .options .active {
          background: #6b5fa7;
          color: #fff;
          border-color: #6b5fa7;
        }

        .hint {
          font-size: 12px;
          color: #6b7280;
          margin-top: 8px;
        }

        .voucher {
          display: flex;
          gap: 10px;
        }

        .voucher button {
          background: #6b5fa7;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 12px 18px;
          font-weight: 600;
        }

        .summary {
          background: #fff;
          padding: 28px;
          border-radius: 22px;
          box-shadow: 0 14px 36px rgba(0,0,0,.08);
          position: sticky;
          top: 100px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          font-size: 14px;
        }

        .discount {
          color: #dc2626;
        }

        .total {
          display: flex;
          justify-content: space-between;
          margin: 22px 0;
          font-size: 20px;
          font-weight: 800;
        }

        .place {
          width: 100%;
          padding: 16px;
          border-radius: 18px;
          border: none;
          background: #6b5fa7;
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
        }

        .back {
          margin-top: 14px;
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
          .summary {
            position: static;
          }
        }
      `}</style>
    </>
  );
}
