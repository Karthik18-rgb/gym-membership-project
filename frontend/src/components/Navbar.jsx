import { Link, NavLink } from 'react-router-dom';
import { FiBell, FiMenu, FiSearch, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar app-navbar sticky-top">
      <div className="container-fluid px-3 px-lg-4">
        <button className="icon-button d-lg-none" onClick={onMenuClick} aria-label="Open navigation"><FiMenu /></button>
        <Link className="navbar-brand brand-mark" to="/">
          <span className="brand-icon">G</span>
          <span>Gym<span>OS</span></span>
        </Link>
        <div className="navbar-search d-none d-md-flex">
          <FiSearch />
          <input aria-label="Search" placeholder="Search members, pages..." />
        </div>
        <div className="navbar-actions">
          <NavLink className="nav-link d-none d-xl-block" to="/">Dashboard</NavLink>
          <NavLink className="nav-link d-none d-xl-block" to="/members">Members</NavLink>
          <button className="icon-button notification-button" aria-label="Notifications"><FiBell /></button>
          <button className="profile-button" aria-label="Open profile menu" onClick={logout}>
            <span className="profile-avatar"><FiUser /></span>
            <span className="d-none d-sm-block text-start">
              <strong>{user?.username || 'Admin'}</strong>
              <small>Administrator</small>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
