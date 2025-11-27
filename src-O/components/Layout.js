
import { NavLink, Outlet } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  marginRight: '1rem',
  textDecoration: isActive ? 'underline' : 'none',
  fontWeight: isActive ? 'bold' : 'normal',
});

export default function Layout() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Redux Demo App</h1>
      <nav>
        <NavLink to="/cart" style={linkStyle}>Shopping Cart</NavLink>
        <NavLink to="/todos" style={linkStyle}>Todo List</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
