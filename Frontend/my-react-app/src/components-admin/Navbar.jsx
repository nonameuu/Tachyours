import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="navbar">
      <button className="menu-toggle" onClick={onToggleSidebar}>
        <MdMenu />
      </button>

      {/* BRAND → DASHBOARD */}
      <Link to="/dashboard" className="brand-link">
        <h1 className="brand">TACHYONS</h1>
      </Link>

      <div className="admin-info">
        <div className="avatar">🙎‍♂️</div>
        <span>Admin</span>
      </div>

      <style jsx>{`
        /* ================= NAVBAR ================= */

        .navbar {
          width: 100%;
          height: 64px;
          background: #e6def4;
          padding: 0 24px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid #cbbfe8;
          position: relative;
          z-index: 1000;
        }

        /* ✅ REMOVE LINK DEFAULT STYLES */
        .brand-link {
          text-decoration: none;
        }

        .brand {
          font-family: "Playfair Display", serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;

          color: #000;          /* ✅ black text */
          text-decoration: none; /* ✅ no underline */
        }

        /* ❌ no hover color change */
        .brand-link:hover .brand {
          color: #000;
        }

        .admin-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #000;
        }

        .avatar {
          width: 32px;
          height: 32px;
          background: #6f5cc3;
          color: #fff;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 16px;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 26px;
          cursor: pointer;
          color: #000;
        }
      `}</style>
    </header>
  );
}
