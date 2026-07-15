import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBarChart2, FiGrid, FiPlusCircle, FiSettings, FiUsers } from 'react-icons/fi';

const links = [
  { to: '/', icon: FiGrid, label: 'Dashboard' },
  { to: '/members', icon: FiUsers, label: 'Members' },
  { to: '/members/add', icon: FiPlusCircle, label: 'Add Member' },
  { to: '#reports', icon: FiBarChart2, label: 'Reports' },
  { to: '#settings', icon: FiSettings, label: 'Settings' },
];

const Sidebar = ({ isOpen, onClose }) => (
  <>
    <div className={`sidebar-backdrop ${isOpen ? 'show' : ''}`} onClick={onClose} />
    <motion.aside initial={false} animate={{ x: isOpen ? 0 : 0 }} className={`app-sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-welcome">
        <span>WORKSPACE</span>
        <strong>Gym Management</strong>
        <small>Operations Console</small>
      </div>
      <nav className="sidebar-nav">
        {links.map(({ to, icon: Icon, label }) => (
          to.startsWith('#') ? (
            <a key={label} href={to} className="sidebar-link" onClick={onClose}><Icon />{label}</a>
          ) : (
            <NavLink key={label} to={to} end={to === '/'} className="sidebar-link" onClick={onClose}><Icon />{label}</NavLink>
          )
        ))}
      </nav>
      <div className="sidebar-help">
        <span className="help-icon">?</span>
        <div><strong>Need help?</strong><small>Contact support</small></div>
      </div>
    </motion.aside>
  </>
);

export default Sidebar;
