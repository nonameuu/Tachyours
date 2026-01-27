import React from "react";
import DashboardLayout from "../components-customer/layout/DashboardLayout";
import VoucherList from "../components-customer/vouchers/VoucherList";

export default function Voucher() {
  return (
    <DashboardLayout>
      <VoucherList />
    </DashboardLayout>
  );
}
