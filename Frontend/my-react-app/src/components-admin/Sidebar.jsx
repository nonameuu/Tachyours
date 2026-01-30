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
      <h3 className="menu-title">MENU</h3>

      <nav className="menu">
        {/* MAIN */}
        <NavItem to="/dashboard" icon={<MdDashboard />} label="Dashboard" end onNavigate={onNavigate} />
        <NavItem to="/messages" icon={<MdMessage />} label="Messages" badge={3} onNavigate={onNavigate} />

        <div className="section">MANAGEMENT</div>

        <NavItem to="/audit" icon={<MdReceiptLong />} label="Audit Trail" onNavigate={onNavigate} />
        <NavItem to="/calendar" icon={<MdCalendarMonth />} label="Calendar" onNavigate={onNavigate} />
        <NavItem to="/reports" icon={<MdBarChart />} label="Sales Report" onNavigate={onNavigate} />
        <NavItem to="/users" icon={<MdPeople />} label="User Management" onNavigate={onNavigate} />
        <NavItem to="/orders" icon={<MdShoppingCart />} label="Order Management" onNavigate={onNavigate} />
        <NavItem to="/products" icon={<MdInventory />} label="Product Management" onNavigate={onNavigate} />
        <NavItem to="/inventory" icon={<MdInventory />} label="Inventory Management" onNavigate={onNavigate} />
        <NavItem to="/settings" icon={<MdSettings />} label="Settings" onNavigate={onNavigate} />

        <div className="divider" />

        {/* AUTH */}
        <NavItem to="/login" icon={<MdLogin />} label="Login" onNavigate={onNavigate} />
      </nav>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: #ece7f8;
          padding: 20px 14px;
          border-right: 1px solid #d8d0f0;
          display: flex;
          flex-direction: column;
        }

        .menu-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #555;
          margin-bottom: 14px;
          padding-left: 10px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .section {
          margin: 14px 0 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #777;
          padding-left: 10px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 12px;
          text-decoration: none;
          color: #333;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .menu-item:hover {
          background: #ded7f5;
        }

        .menu-item.active {
          background: #cfc3f5;
          color: #2a2140;
          font-weight: 600;
        }

        .icon {
          font-size: 20px;
        }

        .label {
          flex: 1;
        }

        .badge {
          background: #7b5cff;
          color: #fff;
          font-size: 11px;
          padding: 2px 7px;
          border-radius: 999px;
          font-weight: 600;
        }

        .divider {
          height: 1px;
          background: #d6cff0;
          margin: 14px 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 64px;
            height: calc(100vh - 64px);
            z-index: 1000;
          }
        }
      `}</style>
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
