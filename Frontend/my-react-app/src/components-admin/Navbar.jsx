import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="navbar">
      <button className="menu-toggle" onClick={onToggleSidebar}>
        <MdMenu />
      </button>

      {/* BRAND → DASHBOARD */}
      <Link to="/" className="brand-link">
        <h1 className="brand">TACHYONS</h1>
      </Link>

      <div className="admin-info">
        <div className="avatar">🙎‍♂️</div>
        <span>Admin</span>
      </div>
    </header>
  );
}
