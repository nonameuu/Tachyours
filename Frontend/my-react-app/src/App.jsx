import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Messages from "./admin/Messages";
import AuditTrail from "./admin/AuditTrail";
import Calendar from "./admin/Calendar";
import SalesReport from "./admin/SalesReport"; // ⭐ IMPORT
import UserManagement from "./admin/UserManagement";
import OrderManagement from "./admin/OrderManagement";
import ProductManagement from "./admin/ProductManagement";
import InventoryManagement from "./admin/InventoryManagement";
import Settings from "./admin/Settings";  
import Login from "./admin/Login";
import Register from "./admin/Register";
import ForgotPassword from "./admin/ForgotPassword";
//customer routes//
import Home from "./customer/HomePage";
import Products from "./customer/ProductsPage";
import About from "./customer/AboutPage";
import Message from "./customer/MessagePage";
import ProfilePage from "./customer/ProfilePage";
import MessagePage from "./customer/MessagePage";
import NotificationPage from "./customer/NotificationPage";
import Cart from "./customer/CartPage";
import Progress from "./customer/ProgressPage";
import CheckoutPage from "./customer/CheckoutPage";
import BuyNow from "./customer/BuyNowPage";
import Customize from "./customer/CustomizePage";
import Voucher from "./customer/VoucherPage";
import Balance from "./customer/BalancePage";
import SettingsPage from "./customer/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/audit" element={<AuditTrail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<SalesReport />} /> 
        <Route path="/users" element={<UserManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        
        {/* customer routes */}
        <Route path="/" element={<Home />} />
        <Route path="/customer-products" element={<Products />} />
        <Route path="/customer-about" element={<About />} />
        <Route path="/customer-messages" element={<Message />} />
        <Route path="/customer-profile" element={<ProfilePage />} />
        <Route path="/customer-purchase" element={<Progress />} />
        <Route path="/customer-notification" element={<NotificationPage />} />
        <Route path="/customer-message" element={<MessagePage />} />
        <Route path="/customer-cart" element={<Cart />} />
        <Route path="/customer-checkout" element={<CheckoutPage/>} />
        <Route path="/customer-buynow" element={<BuyNow/>} />  
        <Route path="/customer-customize" element={<Customize/>} />  
        <Route path="/customer-voucher" element={<Voucher/>} />  
        <Route path="/customer-balance" element={<Balance/>} />
        <Route path="/customer-progress" element={<Progress />} />
        <Route path="/customer-settings" element={<SettingsPage />} />


      </Routes>
    </BrowserRouter>
  );
}
