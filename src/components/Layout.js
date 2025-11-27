
import { NavLink, Outlet } from 'react-router-dom';

const getNavClass = ({ isActive }) =>
  ['nav-link', isActive ? 'nav-link-active' : ''].join(' ');

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <div className="top-bar-title">
            React Redux Demo – Shopping Cart &amp; TO-DO App
          </div>
          <div className="top-bar-subtitle">
            Oklahoma City University · CSCI 6333 – Assignment 05
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div className="badge-name">
            <span className="badge-dot" />
            <span>
              Built by <strong>Jeshwin William James</strong>
            </span>
          </div>

          <nav className="nav-bar" style={{ marginTop: '0.5rem' }}>
            <NavLink to="/cart" className={getNavClass}>
              <span className="icon">🛒</span>
              <span>Shopping Cart</span>
            </NavLink>
            <NavLink to="/todos" className={getNavClass}>
              <span className="icon">✅</span>
              <span>TO-DO App</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
