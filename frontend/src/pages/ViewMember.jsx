import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMemberById } from '../services/MemberService';
import Loader from '../components/Loader';

const ViewMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMember = async () => {
      try {
        setMember(await getMemberById(id));
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadMember();
  }, [id]);

  if (loading) return <Loader message="Loading member details..." />;
  if (!member) return <div className="alert alert-danger">Member not found.</div>;

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MEMBER PROFILE</p>
          <h1>{member.name}</h1>
        </div>
        <div>
          <Link to={`/members/edit/${member.id}`} className="btn btn-primary me-2">Edit</Link>
          <Link to="/members" className="btn btn-outline-secondary">Back</Link>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <section className="content-card">
            <h4 className="mb-3">Personal Information</h4>
            <dl className="row mb-0">
              <dt className="col-sm-4">Full Name</dt>
              <dd className="col-sm-8">{member.name}</dd>
              <dt className="col-sm-4">Email</dt>
              <dd className="col-sm-8">{member.email}</dd>
              <dt className="col-sm-4">Phone</dt>
              <dd className="col-sm-8">{member.phoneNumber}</dd>
              <dt className="col-sm-4">Address</dt>
              <dd className="col-sm-8">{member.address}</dd>
            </dl>
          </section>
        </div>
        <div className="col-md-6">
          <section className="content-card">
            <h4 className="mb-3">Membership Details</h4>
            <dl className="row mb-0">
              <dt className="col-sm-4">Plan</dt>
              <dd className="col-sm-8"><span className="member-badge">{member.membershipPlan}</span></dd>
              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8"><span className={`badge bg-${member.status === 'Active' ? 'success' : member.status === 'Expired' ? 'danger' : 'warning'}`}>{member.status}</span></dd>
              <dt className="col-sm-4">Join Date</dt>
              <dd className="col-sm-8">{member.joinDate}</dd>
              <dt className="col-sm-4">Expiry Date</dt>
              <dd className="col-sm-8">{member.expiryDate}</dd>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewMember;
