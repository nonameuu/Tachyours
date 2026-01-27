import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdMessage,
  MdReceiptLong,
  MdCalendarMonth,
  MdBarChart,
  MdPeople,
  MdShoppingCart,
  MdInventory,
  MdSettings,
  MdLogin,
} from "react-icons/md";

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <h3 className="menu-title">Menu</h3>

      <nav className="menu">
        {/* MAIN */}
        <NavItem to="/dashboard" icon={<MdDashboard />} label="Dashboard" end onNavigate={onNavigate} />

        <NavItem
          to="/messages"
          icon={<MdMessage />}
          label="Messages"
          badge={3}
          onNavigate={onNavigate}
        />

        {/* MANAGEMENT */}
        <NavItem to="/audit" icon={<MdReceiptLong />} label="Audit Trail" onNavigate={onNavigate} />
        <NavItem to="/calendar" icon={<MdCalendarMonth />} label="Calendar" onNavigate={onNavigate} />
        <NavItem to="/reports" icon={<MdBarChart />} label="Sales Report" onNavigate={onNavigate} />
        <NavItem to="/users" icon={<MdPeople />} label="User Management" onNavigate={onNavigate} />
        <NavItem to="/orders" icon={<MdShoppingCart />} label="Order Management" onNavigate={onNavigate} />
        <NavItem to="/products" icon={<MdInventory />} label="Product Management" onNavigate={onNavigate} />
        <NavItem to="/inventory" icon={<MdInventory />} label="Inventory Management" onNavigate={onNavigate} />
        <NavItem to="/settings" icon={<MdSettings />} label="Settings" onNavigate={onNavigate} />

        <div className="divider" />

        {/* LOGin */}
        <NavItem to="/login" icon={<MdLogin />} label="Login" onNavigate={onNavigate} />
      </nav>
    </aside>
  );
}

/* ---------- NAV ITEM ---------- */

function NavItem({ to, icon, label, badge, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={() => {
        // ⭐ close sidebar on mobile
        if (onNavigate) onNavigate();
      }}
      className={({ isActive }) =>
        isActive ? "menu-item active" : "menu-item"
      }
    >
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>

      {badge && <span className="badge">{badge}</span>}
    </NavLink>
  );
}
