import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../features/auth/auth.context.jsx";
import { logoutUser } from "../features/auth/services/auth.api.js";
import "./navbar.scss";

const Navbar = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      const result = await logoutUser();
      setUser(null);
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Logout failed.");
    } finally {
      setLoggingOut(false);
      closeMenu();
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" to="/" onClick={closeMenu} aria-label="Pandit home">
          <span className="site-brand__mark" aria-hidden="true">P</span>
          <span>Pandit</span>
        </Link>

        <button
          className={`site-menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`site-navigation${menuOpen ? " is-open" : ""}`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          <div className="site-navigation__links">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/create" onClick={closeMenu}>Create</NavLink>
            <NavLink to="/reports" onClick={closeMenu}>All reports</NavLink>
          </div>

          <div className="site-navigation__account">
            {loading ? (
              <span className="site-navigation__loading" aria-label="Checking sign-in status" />
            ) : user ? (
              <>
                <span className="site-navigation__username">
                  Hi, {user.username}
                </span>
                <button
                  className="site-navigation__auth"
                  type="button"
                  onClick={logout}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <Link
                className="site-navigation__auth"
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
