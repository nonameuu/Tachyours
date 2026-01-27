import React from "react";
import DashboardLayout from "../components-customer/layout/DashboardLayout";
import MyNotification from "../components-customer/notifications/NotificationItem";

export default function NotificationPage() {
  return (
    <DashboardLayout>
      <MyNotification />
    </DashboardLayout>
  );
}
