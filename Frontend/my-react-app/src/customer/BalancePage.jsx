import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components-customer/layout/DashboardLayout";

export default function BalancePage() {
  const navigate = useNavigate();

  const order = {
    id: "ORD-2031",
    product: "Basketball Jersey",
    totalAmount: 1500,
    downpayment: 500,
    deliveryType: "Pickup",
    paymentStatus: "Partial",
  };

  const remainingBalance = order.totalAmount - order.downpayment;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [form, setForm] = useState({
    gcashNumber: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    reference: "",
  });

  const isFormValid = () => {
    if (paymentMethod === "GCash") {
      return form.gcashNumber && form.reference;
    }
    if (paymentMethod === "Bank") {
      return (
        form.bankName &&
        form.accountName &&
        form.accountNumber &&
        form.reference
      );
    }
    return false;
  };

  const handlePay = () => {
    alert("Payment successful! Redirecting...");
    navigate(order.deliveryType === "Pickup" ? "/pickup" : "/delivery");
  };

  return (
    <DashboardLayout>
      <div className="balance-layout">
        {/* LEFT */}
        <div>
          {/* SUMMARY */}
          <div className="summary-card">
            <div className="summary-top">
              <h3>Order Summary</h3>
              <span className="status-chip">PARTIAL</span>
            </div>

            <div className="summary-grid">
              <div>
                <span className="label">Order ID</span>
                <p>{order.id}</p>
              </div>
              <div>
                <span className="label">Product</span>
                <p>{order.product}</p>
              </div>
            </div>

            <div className="divider" />

            <div className="summary-amounts">
              <div>
                <span>Total</span>
                <strong>₱{order.totalAmount}</strong>
              </div>
              <div>
                <span>Paid</span>
                <strong className="paid">₱{order.downpayment}</strong>
              </div>
              <div className="remaining">
                <span>Remaining</span>
                <strong>₱{remainingBalance}</strong>
              </div>
            </div>
          </div>

          {/* HISTORY */}
          <div className="card">
            <h3>Payment History</h3>
            <div className="history-item">
              <span>Downpayment</span>
              <span>₱{order.downpayment} • GCash</span>
            </div>
            <small className="muted">Paid on Apr 12, 2026</small>
          </div>

          {/* NOTE */}
          <div className="note-card">
            <h4>What happens next?</h4>
            <p>
              After payment verification, your order will proceed to
              <strong>
                {order.deliveryType === "Pickup"
                  ? " Pick Up"
                  : " Delivery"}
              </strong>
              .
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="balance-highlight">
            <span className="label">Remaining Balance</span>
            <h1>₱{remainingBalance}</h1>
            <p>Already paid ₱{order.downpayment}</p>
          </div>

          <div className="card">
            <h3>Payment Method</h3>

            <div className="methods">
              {["GCash", "Bank"].map((method) => (
                <button
                  key={method}
                  className={`method ${
                    paymentMethod === method ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod && (
              <div className="form">
                {paymentMethod === "GCash" && (
                  <>
                    <input placeholder="GCash Number" />
                    <input placeholder="Reference Number" />
                  </>
                )}

                {paymentMethod === "Bank" && (
                  <>
                    <input placeholder="Bank Name" />
                    <input placeholder="Account Name" />
                    <input placeholder="Account Number" />
                    <input placeholder="Reference Number" />
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="pay-btn"
            disabled={!isFormValid()}
            onClick={handlePay}
          >
            Pay ₱{remainingBalance}
          </button>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        .balance-layout {
          max-width: 1100px;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 32px;
        }

        .card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(6px);
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }

        /* SUMMARY */
        .summary-card {
          background: linear-gradient(135deg,#faf9ff,#ffffff);
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 18px 40px rgba(0,0,0,0.1);
          margin-bottom: 22px;
        }

        .summary-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-chip {
          background: #efeafd;
          color: #6b5fa7;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 18px;
        }

        .summary-grid p {
          font-weight: 600;
          margin: 4px 0 0;
        }

        .summary-amounts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 18px;
          text-align: center;
        }

        .summary-amounts span {
          font-size: 13px;
          color: #777;
        }

        .summary-amounts strong {
          display: block;
          font-size: 18px;
          margin-top: 4px;
        }

        .summary-amounts .paid {
          color: #16a34a;
        }

        .summary-amounts .remaining strong {
          font-size: 22px;
          color: #6b5fa7;
        }

        .divider {
          height: 1px;
          background: rgba(0,0,0,0.08);
          margin: 20px 0;
        }

        /* BALANCE */
        .balance-highlight {
          background: linear-gradient(135deg,#6b5fa7,#9f8fe3);
          color: #fff;
          border-radius: 22px;
          padding: 28px;
          text-align: center;
          margin-bottom: 22px;
          box-shadow: 0 18px 40px rgba(107,95,167,0.4);
        }

        .balance-highlight h1 {
          font-size: 40px;
          margin: 8px 0;
        }

        /* METHODS */
        .methods {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .method {
          flex: 1;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid #ddd;
          background: #fff;
          cursor: pointer;
          font-weight: 600;
        }

        .method.active {
          background: #6b5fa7;
          color: #fff;
          border-color: #6b5fa7;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        input {
          padding: 14px;
          border-radius: 14px;
          border: 1px solid #ccc;
        }

        .pay-btn {
          width: 100%;
          margin-top: 10px;
          padding: 16px;
          border-radius: 18px;
          border: none;
          background: #6b5fa7;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .pay-btn:disabled {
          background: #bbb;
          cursor: not-allowed;
        }

        .note-card {
          background: #f3f1fb;
          border-radius: 18px;
          padding: 20px;
        }

        .muted {
          font-size: 12px;
          color: #666;
        }

        @media (max-width: 900px) {
          .balance-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
