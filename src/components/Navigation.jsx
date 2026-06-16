import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

/**
 * Navigation component that renders the top navigation bar
 * Highlights the active route
 */
export function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className={`nav-link ${isActive("/")}`}>
          Home
        </Link>
        <Link to="/shop" className={`nav-link ${isActive("/shop")}`}>
          Shop
        </Link>
        <Link to="/admin" className={`nav-link ${isActive("/admin")}`}>
          Admin Portal
        </Link>
      </div>
    </nav>
  );
}
