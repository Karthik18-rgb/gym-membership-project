import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { getMemberById } from '../services/MemberService';
import useDocumentTitle from '../hooks/useDocumentTitle';

const ViewMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  useDocumentTitle('View Member');

  useEffect(() => {
    const loadMember = async () => {
      try {
        setMember(await getMemberById(id));
      } catch (e) {
        toast.error(e.message);
        navigate('/members');
      }
    };
    loadMember();
  }, [id, navigate]);

  if (!member) return <Loader message="Loading member profile..." />;

  const details = [
    { icon: 'bi-telephone-fill', label: 'Phone Number', value: member.phoneNumber },
    { icon: 'bi-envelope-fill', label: 'Email Address', value: member.email },
    { icon: 'bi-geo-alt-fill', label: 'Address', value: member.address },
    { icon: 'bi-calendar-check-fill', label: 'Join Date', value: member.joinDate },
    { icon: 'bi-calendar-x-fill', label: 'Expiry Date', value: member.expiryDate },
  ];

  return (
    <div className="page-container">
      <button className="btn btn-link px-0 mb-3" onClick={() => navigate('/members')}><i className="bi bi-arrow-left me-2" />Back to members</button>
      <section className="content-card member-profile">
        <div className="profile-header">
          <div className="profile-avatar">{member.name.charAt(0).toUpperCase()}</div>
          <div>
            <p className="eyebrow mb-1">MEMBER PROFILE</p>
            <h1>{member.name}</h1>
            <span className="member-badge">{member.membershipPlan} Plan</span>
          </div>
          <button className="btn btn-outline-primary ms-auto" onClick={() => navigate(`/members/edit/${id}`)}><i className="bi bi-pencil-square me-2" />Edit</button>
        </div>
        <hr className="my-4" />
        <div className="row g-4">
          {details.map((item) => (
            <div className="col-md-6" key={item.label}>
              <div className="detail-item">
                <i className={`bi ${item.icon}`} />
                <div>
                  <small>{item.label}</small>
                  <p>{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ViewMember;
