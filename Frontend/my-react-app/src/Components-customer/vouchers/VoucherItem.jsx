import React from "react";
import { FaTag, FaCopy, FaCheckCircle } from "react-icons/fa";

export default function VoucherItem({ voucher, onCopy }) {
  const isAvailable = voucher.status === "available";

  return (
    <div className={`voucher-card ${voucher.status}`}>
      {/* LEFT */}
      <div className="voucher-left">
        <div className="voucher-icon">
          <FaTag />
        </div>

        <div className="details">
          <h3>{voucher.title}</h3>
          <p>{voucher.description}</p>
          <span className="expiry">Expires {voucher.expiry}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="voucher-right">
        <span className="code-pill">{voucher.code}</span>

        {isAvailable ? (
          <button className="copy-btn" onClick={() => onCopy(voucher.code)}>
            <FaCopy /> Copy
          </button>
        ) : (
          <span className="used-pill">
            <FaCheckCircle /> Used
          </span>
        )}
      </div>
    </div>
  );
}
