import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiPlusCircle, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';
import { getAllMembers } from '../services/MemberService';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getAllMembers();
        setMembers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  if (loading) return <Loader message="Loading dashboard..." />;

  const today = new Date().toISOString().slice(0, 10);
  const thirtyDaysLater = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  const active = members.filter((m) => m.status === 'Active').length;
  const expired = members.filter((m) => m.status === 'Expired').length;
  const expiring = members.filter((m) => m.expiryDate >= today && m.expiryDate <= thirtyDaysLater).length;

  const cards = [
    { label: 'Total Members', value: members.length, note: 'Registered in system', icon: FiUsers, accent: 'primary' },
    { label: 'Active Members', value: active, note: 'Currently active', icon: FiTrendingUp, accent: 'success' },
    { label: 'Expired Members', value: expired, note: 'Membership expired', icon: FiCalendar, accent: 'danger' },
    { label: 'Expiring Soon', value: expiring, note: 'Next 30 days', icon: FiCalendar, accent: 'warning' },
  ];

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Operations Dashboard</h1>
          <p>Monitor memberships, renewals, and member activity.</p>
        </div>
        <Link to="/members/add" className="btn btn-primary">
          <FiPlusCircle className="me-2" />Add Member
        </Link>
      </div>
      {error ? <div className="alert alert-warning">{error}</div> : null}
      <div className="row g-4 mb-4">
        {cards.map((card) => (
          <div className="col-sm-6 col-xl-3" key={card.label}>
            <StatCard {...card} />
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="content-card">
          <div className="card-title-row">
            <h2>Recent Members</h2>
            <Link to="/members">View all <i className="bi bi-arrow-right" /></Link>
          </div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr><th>Member</th><th>Plan</th><th>Joined</th></tr>
              </thead>
              <tbody>
                {members.slice(-5).reverse().map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.name}</strong><br /><small>{m.email}</small></td>
                    <td><span className="member-badge">{m.membershipPlan}</span></td>
                    <td>{m.joinDate}</td>
                  </tr>
                ))}
                {!members.length && <tr><td colSpan="3" className="text-center text-muted py-4">No members found.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
        <div className="d-grid gap-3">
          <section className="content-card quick-actions">
            <h2>Quick Actions</h2>
            <Link to="/members/add"><i className="bi bi-person-plus-fill" />Register a new member</Link>
            <Link to="/members"><i className="bi bi-people-fill" />Manage members</Link>
          </section>
          <section className="content-card insight-card">
            <div className="d-flex align-items-center gap-2 text-primary mb-2">
              <FiShield />
              <strong>Security status</strong>
            </div>
            <p className="mb-0 text-muted">Protected routes, JWT validation, and encrypted credentials are enabled for portfolio-grade security.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
