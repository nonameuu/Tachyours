import React from "react";
import VoucherItem from "./VoucherItem";
import "./vouchers.css";

const vouchers = [
  {
    id: 1,
    title: "10% Discount",
    code: "TACHY10",
    description: "Valid for all products with no minimum spend",
    expiry: "31 Dec 2026",
    status: "available",
  },
  {
    id: 2,
    title: "Free Shipping",
    code: "FREESHIP",
    description: "Free shipping on selected items",
    expiry: "20 Feb 2026",
    status: "available",
  },
  {
    id: 3,
    title: "20% Discount",
    code: "SAVE20",
    description: "Voucher already used",
    expiry: "10 Jan 2026",
    status: "used",
  },
];

export default function VoucherList() {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Voucher code copied!");
  };

  return (
    <main className="voucher-content">
      <div className="content-header">
        <h2>My Vouchers</h2>
        <p>Use your vouchers to save more on your purchases</p>
      </div>

      <div className="voucher-list">
        {vouchers.map((voucher) => (
          <VoucherItem
            key={voucher.id}
            voucher={voucher}
            onCopy={copyCode}
          />
        ))}
      </div>
    </main>
  );
}
