import React from "react";
import DashboardLayout from "../components-customer/layout/DashboardLayout";
import MyProfile from "../components-customer/profile/ProfileInfo";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <MyProfile />
    </DashboardLayout>
  );
}
