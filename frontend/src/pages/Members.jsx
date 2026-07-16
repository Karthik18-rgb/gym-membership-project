import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteMember, getAllMembers } from '../services/MemberService';
import Loader from '../components/Loader';
import DeleteModal from '../components/DeleteModal';

const PAGE_SIZE = 8;

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setMembers(await getAllMembers());
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => members.filter((m) => {
    const haystack = `${m.name} ${m.email} ${m.phoneNumber} ${m.membershipPlan}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (!plan || m.membershipPlan === plan);
  }).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    return (a[sort] || '').localeCompare(b[sort] || '');
  }), [members, query, plan, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [query, plan, sort]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteMember(selected.id);
      toast.success('Member deleted successfully.');
      setSelected(null);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MEMBER DIRECTORY</p>
          <h1>Members</h1>
          <p>Search, sort, and manage every member record.</p>
        </div>
        <Link className="btn btn-primary" to="/members/add"><i className="bi bi-person-plus-fill me-2" />Add Member</Link>
      </div>
      <section className="content-card">
        <div className="member-toolbar">
          <div className="input-group search-box">
            <span className="input-group-text"><i className="bi bi-search" /></span>
            <input className="form-control" placeholder="Search by name, email, phone or plan..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <select className="form-select" value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="">All plans</option>
            <option value="Premium">Premium</option>
            <option value="Gold">Gold</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Sort by name</option>
            <option value="joinDate">Sort by join date</option>
            <option value="expiryDate">Sort by expiry</option>
          </select>
          <button className="btn btn-outline-primary" onClick={load} title="Refresh"><i className="bi bi-arrow-clockwise me-2" />Refresh</button>
        </div>
        {error ? <div className="alert alert-warning">{error}</div> : null}
        {loading ? <Loader message="Loading members..." /> : (
          <>
            <div className="table-responsive">
              <table className="table align-middle mb-0 members-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Contact</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Expiry</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <strong>{member.name}</strong><br />
                        <small>{member.address}</small>
                      </td>
                      <td>
                        <small>{member.email}</small><br />
                        <small>{member.phoneNumber}</small>
                      </td>
                      <td><span className="member-badge">{member.membershipPlan}</span></td>
                      <td><span className={`badge bg-${member.status === 'Active' ? 'success' : member.status === 'Expired' ? 'danger' : 'warning'}`}>{member.status}</span></td>
                      <td>{member.joinDate}</td>
                      <td>{member.expiryDate}</td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => navigate(`/members/view/${member.id}`)}><i className="bi bi-eye" /></button>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/members/edit/${member.id}`)}><i className="bi bi-pencil" /></button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setSelected(member)}><i className="bi bi-trash" /></button>
                      </td>
                    </tr>
                  ))}
                  {!rows.length && <tr><td colSpan="7" className="text-center text-muted py-4">No members match this search.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="text-muted small">Showing {rows.length} of {filtered.length} members</span>
              <div className="btn-group">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>Previous</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>Next</button>
              </div>
            </div>
          </>
        )}
      </section>
      <DeleteModal member={selected} isDeleting={deleting} onCancel={() => setSelected(null)} onConfirm={confirmDelete} />
    </div>
  );
};

export default Members;
